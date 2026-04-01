from sqlalchemy import text, func, and_
from sqlalchemy.orm import Session, selectinload
from datetime import datetime, date
from ..entities.shoutout import Shoutout
from ..entities.shoutout_recipient import ShoutOutRecipient
from ..entities.reaction import Reaction, ReactionType
from ..entities.comment import Comment
from ..entities.user import User

# ============ BATCH QUERY HELPERS (N+1 OPTIMIZATION) ============

def get_comments_counts_batch(db: Session, shoutout_ids: list) -> dict:
    """
    Fetch comment counts for multiple shoutouts in a single query.
    
    Args:
        db: Database session
        shoutout_ids: List of shoutout IDs
        
    Returns:
        Dict mapping shoutout_id → comments_count
    """
    if not shoutout_ids:
        return {}
    
    results = db.query(
        Comment.shoutout_id,
        func.count(Comment.id).label('count')
    ).filter(Comment.shoutout_id.in_(shoutout_ids)).group_by(Comment.shoutout_id).all()
    
    return {result[0]: result[1] for result in results}


def get_reactions_counts_batch(db: Session, shoutout_ids: list) -> dict:
    """
    Fetch reaction counts (by type) for multiple shoutouts in a single query.
    
    Args:
        db: Database session
        shoutout_ids: List of shoutout IDs
        
    Returns:
        Dict mapping shoutout_id → {like_count, clap_count, star_count}
    """
    if not shoutout_ids:
        return {}
    
    results = db.query(
        Reaction.shoutout_id,
        Reaction.reaction_type,
        func.count(Reaction.id).label('count')
    ).filter(Reaction.shoutout_id.in_(shoutout_ids)).group_by(
        Reaction.shoutout_id,
        Reaction.reaction_type
    ).all()
    
    # Initialize all shoutouts with zero counts
    reactions_map = {sid: {"like": 0, "clap": 0, "star": 0} for sid in shoutout_ids}
    
    # Populate with actual counts
    for shoutout_id, reaction_type, count in results:
        reaction_key = reaction_type.value if hasattr(reaction_type, 'value') else str(reaction_type)
        reactions_map[shoutout_id][reaction_key] = count
    
    return reactions_map


def get_user_reactions_batch(db: Session, user_id: int, shoutout_ids: list) -> dict:
    """
    Fetch current user's reactions for multiple shoutouts in a single query.
    
    Args:
        db: Database session
        user_id: Current user ID
        shoutout_ids: List of shoutout IDs
        
    Returns:
        Dict mapping shoutout_id → reaction_type (or None)
    """
    if not shoutout_ids:
        return {}
    
    reactions = db.query(
        Reaction.shoutout_id,
        Reaction.reaction_type
    ).filter(
        Reaction.user_id == user_id,
        Reaction.shoutout_id.in_(shoutout_ids)
    ).all()
    
    return {
        r[0]: r[1].value if hasattr(r[1], 'value') else str(r[1])
        for r in reactions
    }


def get_all_shoutouts(db: Session):
    result = db.execute(text("""
        SELECT id, sender, message, department, date
        FROM shoutouts
        ORDER BY id DESC
    """))

    rows = result.fetchall()

    return [
        {
            "id": row.id,
            "sender": row.sender,
            "message": row.message,
            "department": row.department,
            "date": str(row.date),
        }
        for row in rows
    ]


# ============ PUBLIC SHOUTOUT FEED (NEW) ============

def get_all_shoutouts_feed(
    db: Session,
    limit: int = 20,
    offset: int = 0,
    sender_id: int = None,
    department: str = None,
    date_from: date = None,
    date_to: date = None,
    after_datetime: datetime = None,
    current_user_id: int = None
):
    """
    Get all approved shoutouts with optional filters and user engagement data.
    Optimized to avoid N+1 queries using batch operations.
    
    Args:
        db: Database session
        limit: Number of results to return (1-100)
        offset: Number of results to skip
        sender_id: Filter by sender ID
        department: Filter by sender's department
        date_from: Filter shoutouts from this date (YYYY-MM-DD)
        date_to: Filter shoutouts until this date (YYYY-MM-DD)
        after_datetime: Return shoutouts created after this timestamp (for "new posts")
        current_user_id: Current user ID for including their reaction in response
    
    Returns:
        List of shoutouts with sender info, recipients, and engagement metrics
    """
    
    # Start with base query - filter for APPROVED shoutouts only
    query = db.query(Shoutout).filter(
        Shoutout.status == "APPROVED"
    ).options(
        selectinload(Shoutout.sender),
        selectinload(Shoutout.recipients).selectinload(ShoutOutRecipient.user)
    )
    
    # Apply filters
    if sender_id:
        query = query.filter(Shoutout.sender_id == sender_id)
    
    if department:
        query = query.filter(Shoutout.sender.has(User.department == department))
    
    if date_from:
        # Convert date to datetime for comparison (start of day)
        start_dt = datetime.combine(date_from, datetime.min.time())
        query = query.filter(Shoutout.created_at >= start_dt)
    
    if date_to:
        # Convert date to datetime for comparison (end of day)
        end_dt = datetime.combine(date_to, datetime.max.time())
        query = query.filter(Shoutout.created_at <= end_dt)
    
    # Filter for posts after specific timestamp (new posts only)
    if after_datetime:
        query = query.filter(Shoutout.created_at > after_datetime)
    
    # Sort by latest first and apply pagination
    shoutouts = query.order_by(
        Shoutout.created_at.desc()
    ).limit(limit).offset(offset).all()
    
    # Get shoutout IDs for batch queries
    shoutout_ids = [s.id for s in shoutouts]
    
    # BATCH QUERIES (avoiding N+1) - single query per type
    comments_counts = get_comments_counts_batch(db, shoutout_ids)
    reactions_counts = get_reactions_counts_batch(db, shoutout_ids)
    user_reactions = get_user_reactions_batch(db, current_user_id, shoutout_ids) if current_user_id else {}
    
    # Build response with all details
    feed = []
    for shoutout in shoutouts:
        # Build recipients list
        recipients_list = [
            {
                "id": recipient.user_id,
                "name": recipient.user.name if recipient.user else "Unknown",
                "email": recipient.user.email if recipient.user else None,
                "department": recipient.user.department if recipient.user else None
            }
            for recipient in shoutout.recipients
        ]
        
        # Build sender info
        sender_info = {
            "id": shoutout.sender_id,
            "name": shoutout.sender.name if shoutout.sender else "Unknown",
            "email": shoutout.sender.email if shoutout.sender else None,
            "department": shoutout.sender.department if shoutout.sender else None
        }
        
        feed_item = {
            "id": shoutout.id,
            "message": shoutout.message,
            "category": shoutout.category,
            "points": shoutout.points,
            "status": shoutout.status,
            "created_at": shoutout.created_at.isoformat(),
            "sender": sender_info,
            "recipients": recipients_list,
            "recipients_count": len(recipients_list),
            "reactions_count": reactions_counts.get(shoutout.id, {"like": 0, "clap": 0, "star": 0}),
            "comments_count": comments_counts.get(shoutout.id, 0)
        }
        
        # Include user's reaction only if authenticated
        if current_user_id:
            feed_item["my_reaction"] = user_reactions.get(shoutout.id)
        
        feed.append(feed_item)
    
    return feed


def delete_shoutout(db: Session, shoutout_id: int):
    db.execute(
        text("DELETE FROM shoutouts WHERE id = :id"),
        {"id": shoutout_id}
    )
    db.commit()
    return {"message": "Shoutout deleted successfully"}


# ============ NEW FUNCTIONS BELOW ============

def get_user_feed(db: Session, user_id: int, limit: int = 20, offset: int = 0):
    """Get shoutouts for user's feed (received + team shoutouts with engagement counts)"""
    
    shoutouts = db.query(Shoutout).filter(
        (Shoutout.receiver_id == user_id) | 
        (Shoutout.status == "APPROVED")
    ).options(
        selectinload(Shoutout.sender),
        selectinload(Shoutout.recipients).selectinload(ShoutOutRecipient.user)
    ).order_by(Shoutout.created_at.desc()).limit(limit).offset(offset).all()
    
    # Get shoutout IDs for batch queries
    shoutout_ids = [s.id for s in shoutouts]
    
    # BATCH QUERIES (avoiding N+1)
    comments_counts = get_comments_counts_batch(db, shoutout_ids)
    reactions_counts = get_reactions_counts_batch(db, shoutout_ids)
    
    feed = []
    for shoutout in shoutouts:
        feed.append({
            "id": shoutout.id,
            "sender_id": shoutout.sender_id,
            "receiver_id": shoutout.receiver_id,
            "sender_name": shoutout.sender.name if shoutout.sender else "Unknown",
            "receiver_name": shoutout.receiver.name if shoutout.receiver else "Unknown",
            "message": shoutout.message,
            "category": shoutout.category,
            "points": shoutout.points,
            "status": shoutout.status,
            "created_at": shoutout.created_at.isoformat(),
            "reactions_count": reactions_counts.get(shoutout.id, {"like": 0, "clap": 0, "star": 0}),
            "comments_count": comments_counts.get(shoutout.id, 0),
        })
    
    return feed


def get_user_stats(db: Session, user_id: int):
    """Get user stats: points, level, shoutouts received/sent, rank"""
    
    # Allow PENDING and APPROVED shoutouts, but exclude rejected/shadow states.
    valid_statuses = ["APPROVED", "PENDING"]

    # Count shoutouts RECEIVED using the ShoutOutRecipient table (new multi-recipient system)
    shoutouts_received = db.query(ShoutOutRecipient).filter(
        ShoutOutRecipient.user_id == user_id
    ).join(Shoutout).filter(
        Shoutout.status.in_(valid_statuses)
    ).count()
    
    # Count shoutouts SENT
    shoutouts_sent = db.query(Shoutout).filter(
        Shoutout.sender_id == user_id,
        Shoutout.status.in_(valid_statuses)
    ).count()
    
    # Calculate total points from received shoutouts using ShoutOutRecipient
    total_points = db.query(func.sum(Shoutout.points)).join(
        ShoutOutRecipient
    ).filter(
        ShoutOutRecipient.user_id == user_id,
        Shoutout.status.in_(valid_statuses)
    ).scalar() or 0
    
    # Calculate level (500 points per level)
    current_level = int(total_points // 500) + 1
    
    # Get user rank (how many users have more points than this user)
    rank = db.query(func.count(User.id)).filter(
        User.id != user_id
    ).scalar() + 1
    
    return {
        "user_id": user_id,
        "shoutouts_received": shoutouts_received,
        "shoutouts_sent": shoutouts_sent,
        "total_points": int(total_points),
        "current_level": current_level,
        "points_to_next_level": (current_level * 500) - int(total_points),
        "rank": rank,
    }


def add_reaction(db: Session, shoutout_id: int, user_id: int, reaction_type: str):
    """Add or update user's reaction to a shoutout"""
    
    # Check if user already reacted
    existing = db.query(Reaction).filter(
        Reaction.shoutout_id == shoutout_id,
        Reaction.user_id == user_id
    ).first()
    
    if existing:
        # Update reaction type
        existing.reaction_type = ReactionType(reaction_type)
        db.commit()
        return {"message": "Reaction updated", "reaction_id": existing.id}
    
    # Create new reaction
    reaction = Reaction(
        shoutout_id=shoutout_id,
        user_id=user_id,
        reaction_type=ReactionType(reaction_type)
    )
    db.add(reaction)
    db.commit()
    db.refresh(reaction)
    
    return {"message": "Reaction added", "reaction_id": reaction.id}


def remove_reaction(db: Session, shoutout_id: int, user_id: int):
    """Remove user's reaction from a shoutout"""
    
    reaction = db.query(Reaction).filter(
        Reaction.shoutout_id == shoutout_id,
        Reaction.user_id == user_id
    ).first()
    
    if not reaction:
        return {"error": "Reaction not found"}
    
    db.delete(reaction)
    db.commit()
    
    return {"message": "Reaction removed"}


def get_reactions(db: Session, shoutout_id: int):
    """Get reaction counts by type for a shoutout"""
    
    reactions = db.query(
        Reaction.reaction_type,
        func.count(Reaction.id).label("count")
    ).filter(Reaction.shoutout_id == shoutout_id).group_by(Reaction.reaction_type).all()
    
    return {
        "like": next((r.count for r in reactions if r.reaction_type == ReactionType.like), 0),
        "clap": next((r.count for r in reactions if r.reaction_type == ReactionType.clap), 0),
        "star": next((r.count for r in reactions if r.reaction_type == ReactionType.star), 0),
    }


def get_reaction_counts(db: Session, shoutout_id: int):
    """Helper function to get reaction counts"""
    return get_reactions(db, shoutout_id)


def add_comment(db: Session, shoutout_id: int, user_id: int, text: str):
    """Add a comment to a shoutout"""
    
    comment = Comment(
        shoutout_id=shoutout_id,
        user_id=user_id,
        text=text
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    
    return {
        "id": comment.id,
        "shoutout_id": comment.shoutout_id,
        "user_id": comment.user_id,
        "user_name": comment.user.name if comment.user else "Unknown",
        "text": comment.text,
        "created_at": comment.created_at.isoformat(),
    }


def get_comments(db: Session, shoutout_id: int, limit: int = 5, offset: int = 0):
    """Get comments for a shoutout with pagination"""
    
    comments = db.query(Comment).filter(
        Comment.shoutout_id == shoutout_id
    ).order_by(Comment.created_at.desc()).limit(limit).offset(offset).all()
    
    return [
        {
            "id": c.id,
            "shoutout_id": c.shoutout_id,
            "user_id": c.user_id,
            "user_name": c.user.name if c.user else "Unknown",
            "text": c.text,
            "created_at": c.created_at.isoformat(),
        }
        for c in comments
    ]


def delete_comment(db: Session, comment_id: int):
    """Delete a comment"""
    
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    
    if not comment:
        return {"error": "Comment not found"}
    
    db.delete(comment)
    db.commit()
    
    return {"message": "Comment deleted"}


# ============ SHOUTOUT CREATION WITH MULTI-USER TAGGING ============

def create_shoutout_with_recipients(db: Session, sender_id: int, message: str, category: str, recipient_ids: list, points: int):
    """
    Create a new shoutout and tag multiple recipients.
    
    Args:
        db: Database session
        sender_id: ID of the user creating the shoutout
        message: Shoutout message
        category: Category of recognition
        recipient_ids: List of user IDs to tag as recipients
        points: Points to award
    
    Returns:
        Dictionary with created shoutout details including recipients
    
    Raises:
        ValueError if any recipient ID is invalid or empty list
        Exception if database operations fail
    """
    from ..entities.shoutout_recipient import ShoutOutRecipient
    
    # Validate recipient IDs are not empty
    if not recipient_ids or len(recipient_ids) == 0:
        raise ValueError("At least one recipient must be tagged")
    
    # Validate all recipient IDs exist and are different from sender
    invalid_users = []
    for user_id in recipient_ids:
        if user_id == sender_id:
            raise ValueError(f"Cannot tag yourself as a recipient")
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            invalid_users.append(user_id)
    
    if invalid_users:
        raise ValueError(f"Invalid user IDs: {invalid_users}")
    
    # Create the shoutout (using first recipient as receiver_id for backward compatibility)
    shoutout = Shoutout(
        sender_id=sender_id,
        receiver_id=recipient_ids[0],  # Backward compatibility
        message=message,
        category=category,
        points=points,
        status="PENDING"
    )
    
    db.add(shoutout)
    db.flush()  # Flush to get the shoutout ID without committing
    
    # Create recipient entries for all tagged users
    for user_id in recipient_ids:
        recipient = ShoutOutRecipient(
            shoutout_id=shoutout.id,
            user_id=user_id
        )
        db.add(recipient)
    
    db.commit()
    db.refresh(shoutout)
    
    # Build response with all recipient details
    recipients_data = [
        {
            "id": r.user_id,
            "name": r.user.name,
            "email": r.user.email,
            "department": r.user.department
        }
        for r in shoutout.recipients
    ]
    
    return {
        "id": shoutout.id,
        "sender_id": shoutout.sender_id,
        "sender_name": shoutout.sender.name if shoutout.sender else "Unknown",
        "message": shoutout.message,
        "category": shoutout.category,
        "points": shoutout.points,
        "status": shoutout.status,
        "created_at": shoutout.created_at.isoformat(),
        "recipients": recipients_data,
        "recipients_count": len(recipients_data),
        "reactions_count": get_reaction_counts(db, shoutout.id),
        "comments_count": 0
    }


# ============ USER'S GIVEN SHOUTOUTS ============

def get_user_given_shoutouts(db: Session, user_id: int, limit: int = 20, offset: int = 0):
    """Get shoutouts given (sent) by a user with engagement counts"""
    
    shoutouts = db.query(Shoutout).filter(
        Shoutout.sender_id == user_id
    ).options(
        selectinload(Shoutout.sender),
        selectinload(Shoutout.recipients).selectinload(ShoutOutRecipient.user)
    ).order_by(Shoutout.created_at.desc()).limit(limit).offset(offset).all()
    
    # Get shoutout IDs for batch queries
    shoutout_ids = [s.id for s in shoutouts]
    
    # BATCH QUERIES (avoiding N+1)
    comments_counts = get_comments_counts_batch(db, shoutout_ids)
    reactions_counts = get_reactions_counts_batch(db, shoutout_ids)
    
    feed = []
    for shoutout in shoutouts:
        # Get recipient names for display
        recipient_names = []
        for recipient in shoutout.recipients:
            if recipient.user:
                recipient_names.append(recipient.user.name)
        
        # For FeedCard compatibility - show first recipient or all if multiple
        receiver_name = ", ".join(recipient_names) if recipient_names else "Unknown"
        
        feed.append({
            "id": shoutout.id,
            "sender_id": shoutout.sender_id,
            "sender_name": shoutout.sender.name if shoutout.sender else "Unknown",
            "receiver_name": receiver_name,  # For FeedCard compatibility
            "recipients": [{"id": r.user_id, "name": r.user.name if r.user else "Unknown"} for r in shoutout.recipients],
            "recipients_count": len(shoutout.recipients),
            "message": shoutout.message,
            "category": shoutout.category,
            "points": shoutout.points,
            "status": shoutout.status,
            "created_at": shoutout.created_at.isoformat(),
            "reactions_count": reactions_counts.get(shoutout.id, {"like": 0, "clap": 0, "star": 0}),
            "comments_count": comments_counts.get(shoutout.id, 0),
        })
    
    return feed


# ============ USER'S RECEIVED SHOUTOUTS ============

def get_user_received_shoutouts(db: Session, user_id: int, limit: int = 20, offset: int = 0):
    """Get shoutouts received by a user with engagement counts"""
    from ..entities.shoutout_recipient import ShoutOutRecipient
    
    # Query shoutouts where user is a recipient
    shoutouts = db.query(Shoutout).join(
        ShoutOutRecipient
    ).filter(
        ShoutOutRecipient.user_id == user_id
    ).options(
        selectinload(Shoutout.sender),
        selectinload(Shoutout.recipients).selectinload(ShoutOutRecipient.user)
    ).order_by(Shoutout.created_at.desc()).limit(limit).offset(offset).all()
    
    # Get shoutout IDs for batch queries
    shoutout_ids = [s.id for s in shoutouts]
    
    # BATCH QUERIES (avoiding N+1)
    comments_counts = get_comments_counts_batch(db, shoutout_ids)
    reactions_counts = get_reactions_counts_batch(db, shoutout_ids)
    
    feed = []
    for shoutout in shoutouts:
        # Get recipient names for display
        recipient_names = []
        for recipient in shoutout.recipients:
            if recipient.user:
                recipient_names.append(recipient.user.name)
        
        # For FeedCard compatibility - show first recipient or all if multiple
        receiver_name = ", ".join(recipient_names) if recipient_names else "Unknown"
        
        feed.append({
            "id": shoutout.id,
            "sender_id": shoutout.sender_id,
            "sender_name": shoutout.sender.name if shoutout.sender else "Unknown",
            "receiver_name": receiver_name,  # For FeedCard compatibility
            "recipients": [{"id": r.user_id, "name": r.user.name if r.user else "Unknown"} for r in shoutout.recipients],
            "recipients_count": len(shoutout.recipients),
            "message": shoutout.message,
            "category": shoutout.category,
            "points": shoutout.points,
            "status": shoutout.status,
            "created_at": shoutout.created_at.isoformat(),
            "reactions_count": reactions_counts.get(shoutout.id, {"like": 0, "clap": 0, "star": 0}),
            "comments_count": comments_counts.get(shoutout.id, 0),
        })
    
    return feed