from sqlalchemy import text, func, and_
from sqlalchemy.orm import Session, selectinload
from datetime import datetime, date, timezone
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
    """
    Get all shoutouts with sender info, recipients, and engagement metrics for admin dashboard
    Shows ACTIVE shoutouts only (excludes deleted and archived)
    """
    from ..entities.user import User
    from ..entities.shoutout_recipient import ShoutOutRecipient
    from ..entities.reaction import Reaction
    from ..entities.comment import Comment
    from sqlalchemy import func
    
    # Query shoutouts - exclude deleted & archived, show only APPROVED or PENDING
    query = db.query(
        Shoutout.id,
        Shoutout.message,
        Shoutout.category,
        Shoutout.points,
        Shoutout.status,
        Shoutout.is_deleted,
        Shoutout.is_archived,
        Shoutout.created_at,
        User.name.label("sender_name"),
        User.department.label("sender_department")
    ).join(User, Shoutout.sender_id == User.id).filter(
        Shoutout.is_deleted == False,  # Exclude deleted
        Shoutout.is_archived == False   # Exclude archived
    ).order_by(Shoutout.created_at.desc())
    
    shoutouts = query.all()
    
    # Process each shoutout to get recipients and engagement counts
    result = []
    for shout in shoutouts:
        # Get recipients
        recipients = db.query(
            ShoutOutRecipient.user_id,
            User.name
        ).join(User, ShoutOutRecipient.user_id == User.id).filter(
            ShoutOutRecipient.shoutout_id == shout.id
        ).all()
        
        # Get reaction count
        reaction_count = db.query(func.count(Reaction.id)).filter(
            Reaction.shoutout_id == shout.id
        ).scalar() or 0
        
        # Get comment count
        comment_count = db.query(func.count(Comment.id)).filter(
            Comment.shoutout_id == shout.id
        ).scalar() or 0
        
        result.append({
            "id": shout.id,
            "sender_name": shout.sender_name,
            "sender_department": shout.sender_department,
            "message": shout.message,
            "category": shout.category or "General",
            "points": shout.points or 0,
            "status": shout.status,
            "created_at": shout.created_at.isoformat() if shout.created_at else None,
            "recipients": [{"id": r.user_id, "name": r.name} for r in recipients],
            "engagement": {
                "reactions": reaction_count,
                "comments": comment_count
            }
        })
    
    return result


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
    
    # Start with base query - filter for APPROVED shoutouts only (active, not deleted/archived)
    query = db.query(Shoutout).filter(
        Shoutout.status == "APPROVED",
        Shoutout.is_deleted == False,  # Exclude deleted
        Shoutout.is_archived == False  # Exclude archived
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
    """
    Soft delete - marks shoutout as deleted instead of hard delete
    This preserves data for audit trails and recovery
    """
    try:
        shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
        if not shoutout:
            return {"error": "Shoutout not found", "success": False}
        
        # Soft delete - mark as deleted with timestamp
        shoutout.is_deleted = True
        shoutout.deleted_at = datetime.utcnow()
        shoutout.status = "DELETED"
        db.commit()
        
        return {"message": "Shoutout deleted successfully", "success": True}
    except Exception as e:
        db.rollback()
        return {"error": str(e), "success": False}


def archive_shoutout(db: Session, shoutout_id: int):
    """
    Archive a shoutout - moves to archived status
    Archived shoutouts still exist but are excluded from active feeds
    """
    try:
        shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
        if not shoutout:
            return {"error": "Shoutout not found", "success": False}
        
        # Archive - mark as archived with timestamp
        shoutout.is_archived = True
        shoutout.archived_at = datetime.utcnow()
        shoutout.status = "ARCHIVED"
        db.commit()
        
        return {"message": "Shoutout archived successfully", "success": True}
    except Exception as e:
        db.rollback()
        return {"error": str(e), "success": False}


def edit_shoutout(db: Session, shoutout_id: int, message: str, category: str = None):
    """
    Edit shoutout - update message and optionally category
    Updates propagate to all feeds automatically since they query the same Shoutout table
    Tracks edit history with is_edited and edited_at fields
    """
    try:
        shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
        if not shoutout:
            return {"error": "Shoutout not found", "success": False}
        
        # Update message
        if message:
            shoutout.message = message.strip()
        
        # Update category if provided
        if category:
            shoutout.category = category
        
        # Mark as edited and set edited timestamp (timezone-aware UTC)
        shoutout.is_edited = True
        shoutout.edited_at = datetime.now(timezone.utc)
        
        # Update timestamp (timezone-aware UTC)
        shoutout.updated_at = datetime.now(timezone.utc)
        db.commit()
        
        return {"message": "Shoutout updated successfully", "success": True, "data": {
            "id": shoutout.id,
            "message": shoutout.message,
            "category": shoutout.category,
            "is_edited": shoutout.is_edited,
            "edited_at": shoutout.edited_at.isoformat() if shoutout.edited_at else None,
            "updated_at": shoutout.updated_at.isoformat()
        }}
    except Exception as e:
        db.rollback()
        return {"error": str(e), "success": False}


def edit_user_shoutout(db: Session, shoutout_id: int, user_id: int, message: str, category: str = None):
    """
    User edits their own shoutout - only within 5 minutes of creation.
    Non-admin users can only edit their own shoutouts.
    """
    try:
        shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
        if not shoutout:
            return {"error": "Shoutout not found", "success": False}
        
        # Check if user is the creator
        if shoutout.sender_id != user_id:
            return {"error": "You can only edit your own shoutouts", "success": False}
        
        # Check 5-minute window
        # Ensure created_at is timezone-aware
        created_at = shoutout.created_at
        if created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=timezone.utc)
        time_elapsed = datetime.now(timezone.utc) - created_at
        if time_elapsed.total_seconds() > 300:  # 300 seconds = 5 minutes
            minutes_passed = int(time_elapsed.total_seconds() / 60)
            return {"error": f"Can only edit within 5 minutes of creation. {minutes_passed} minutes have passed.", "success": False}
        
        # Update message and category
        if message:
            shoutout.message = message.strip()
        if category:
            shoutout.category = category
        
        shoutout.updated_at = datetime.now(timezone.utc)
        db.commit()
        
        return {"message": "Shoutout updated successfully", "success": True, "data": {
            "id": shoutout.id,
            "message": shoutout.message,
            "category": shoutout.category,
            "updated_at": shoutout.updated_at.isoformat()
        }}
    except Exception as e:
        db.rollback()
        return {"error": str(e), "success": False}


def delete_user_shoutout(db: Session, shoutout_id: int, user_id: int):
    """
    User deletes their own shoutout - only within 5 minutes of creation.
    Performs soft delete by setting is_deleted flag.
    """
    try:
        shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
        if not shoutout:
            return {"error": "Shoutout not found", "success": False}
        
        # Check if user is the creator
        if shoutout.sender_id != user_id:
            return {"error": "You can only delete your own shoutouts", "success": False}
        
        # Check 5-minute window
        # Ensure created_at is timezone-aware
        created_at = shoutout.created_at
        if created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=timezone.utc)
        time_elapsed = datetime.now(timezone.utc) - created_at
        if time_elapsed.total_seconds() > 300:  # 300 seconds = 5 minutes
            minutes_passed = int(time_elapsed.total_seconds() / 60)
            return {"error": f"Can only delete within 5 minutes of creation. {minutes_passed} minutes have passed.", "success": False}
        
        # Soft delete
        shoutout.is_deleted = True
        shoutout.deleted_at = datetime.now(timezone.utc)
        db.commit()
        
        return {"message": "Shoutout deleted successfully", "success": True}
    except Exception as e:
        db.rollback()
        return {"error": str(e), "success": False}




# ============ NEW FUNCTIONS BELOW ============

def get_user_feed(db: Session, user_id: int, limit: int = 20, offset: int = 0):
    """Get all company shoutouts for user's feed (real-time activity stream visible to all employees)"""
    
    shoutouts = db.query(Shoutout).options(
        selectinload(Shoutout.sender),
        selectinload(Shoutout.receiver),
        selectinload(Shoutout.recipients).selectinload(ShoutOutRecipient.user)
    ).filter(
        Shoutout.status == "APPROVED",
        Shoutout.is_deleted == False,
        Shoutout.is_archived == False
    ).order_by(Shoutout.created_at.desc()).limit(limit).offset(offset).all()
    
    # Get shoutout IDs for batch queries
    shoutout_ids = [s.id for s in shoutouts]
    
    # BATCH QUERIES (avoiding N+1)
    comments_counts = get_comments_counts_batch(db, shoutout_ids)
    reactions_counts = get_reactions_counts_batch(db, shoutout_ids)
    
    feed = []
    for shoutout in shoutouts:
        # Build recipients list with all recipients
        recipients_list = [
            {
                "id": recipient.user_id,
                "name": recipient.user.name if recipient.user else "Unknown",
                "email": recipient.user.email if recipient.user else None,
                "department": recipient.user.department if recipient.user else None
            }
            for recipient in shoutout.recipients
        ]
        
        feed.append({
            "id": shoutout.id,
            "sender_id": shoutout.sender_id,
            "receiver_id": shoutout.receiver_id,
            "sender_name": shoutout.sender.name if shoutout.sender else "Unknown",
            "receiver_name": shoutout.receiver.name if shoutout.receiver else "Unknown",
            "recipients": recipients_list,
            "recipients_count": len(recipients_list),
            "message": shoutout.message,
            "category": shoutout.category,
            "points": shoutout.points,
            "status": shoutout.status,
            "created_at": shoutout.created_at.isoformat(),
            "is_edited": shoutout.is_edited,
            "edited_at": shoutout.edited_at.isoformat() if shoutout.edited_at else None,
            "reactions_count": reactions_counts.get(shoutout.id, {"like": 0, "clap": 0, "star": 0}),
            "comments_count": comments_counts.get(shoutout.id, 0),
        })
    
    return feed


def get_user_stats(db: Session, user_id: int):
    """Get user stats: points, level, shoutouts received/sent, rank, reactions received"""
    
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
        ShoutOutRecipient, Shoutout.id == ShoutOutRecipient.shoutout_id
    ).filter(
        ShoutOutRecipient.user_id == user_id,
        Shoutout.status.in_(valid_statuses)
    ).scalar() or 0
    
    # Count total reactions received on all shoutouts the user received
    reactions_received = db.query(func.count(Reaction.id)).join(
        Shoutout, Reaction.shoutout_id == Shoutout.id
    ).join(
        ShoutOutRecipient, Shoutout.id == ShoutOutRecipient.shoutout_id
    ).filter(
        ShoutOutRecipient.user_id == user_id,
        Shoutout.status.in_(valid_statuses)
    ).scalar() or 0
    
    # Calculate level (500 points per level)
    current_level = int(total_points // 500) + 1
    
    # Get user rank by comparing points with other users
    # Create a subquery that gets each user's total points
    user_points_subquery = db.query(
        User.id,
        func.sum(Shoutout.points).label('total_points')
    ).join(
        ShoutOutRecipient,
        User.id == ShoutOutRecipient.user_id
    ).join(
        Shoutout,
        ShoutOutRecipient.shoutout_id == Shoutout.id
    ).filter(
        Shoutout.status.in_(valid_statuses)
    ).group_by(User.id).subquery()
    
    # Count how many users have more points than the current user (add 1 for the user's own rank)
    rank = db.query(func.count(user_points_subquery.c.id)).filter(
        user_points_subquery.c.total_points > total_points
    ).scalar() + 1
    
    return {
        "user_id": user_id,
        "shoutouts_received": shoutouts_received,
        "shoutouts_sent": shoutouts_sent,
        "total_points": int(total_points),
        "current_level": current_level,
        "points_to_next_level": (current_level * 500) - int(total_points),
        "rank": rank,
        "reactions_received": int(reactions_received),
    }


def get_leaderboard_users(db: Session, limit: int = 10, offset: int = 0, include_pending: bool = True):
    """
    Get leaderboard of users ranked by total points received.
    
    Args:
        db: Database session
        limit: Max number of users to return (default 10)
        offset: Pagination offset (default 0)
        include_pending: Include PENDING shoutouts in calculation (default True)
    
    Returns:
        List of user leaderboard entries with rank, points, and metadata
    """
    valid_statuses = ["APPROVED", "PENDING"] if include_pending else ["APPROVED"]
    
    # Query users with aggregated stats
    users_query = db.query(
        User.id.label('user_id'),
        User.name,
        User.department,
        func.count(ShoutOutRecipient.id).label('shoutouts_received'),
        func.sum(Shoutout.points).label('total_points')
    ).join(
        ShoutOutRecipient, User.id == ShoutOutRecipient.user_id
    ).join(
        Shoutout, ShoutOutRecipient.shoutout_id == Shoutout.id
    ).filter(
        Shoutout.status.in_(valid_statuses)
    ).group_by(
        User.id, User.name, User.department
    ).order_by(
        func.sum(Shoutout.points).desc()
    ).offset(offset).limit(limit).all()
    
    # Build results with calculated fields
    results = []
    for rank, user in enumerate(users_query, start=offset + 1):
        total_points = user.total_points or 0
        level = int(total_points // 500) + 1
        
        # Generate initials
        initials = ''.join([word[0].upper() for word in user.name.split()]) if user.name else '?'
        
        # Determine badges based on activity
        badges = []
        if user.shoutouts_received >= 10:
            badges.append('fire')
        if total_points >= 500:
            badges.append('star')
        if user.shoutouts_received >= 5:
            badges.append('heart')
        
        results.append({
            'position': rank,
            'user_id': user.user_id,
            'name': user.name,
            'department': user.department,
            'points': int(total_points),
            'shoutouts_received': user.shoutouts_received,
            'level': level,
            'badges': badges,
            'initials': initials
        })
    
    return results


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
        status="APPROVED"  # Auto-approve on creation - only reported ones need review
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


# ============ LEVEL PROGRESS & BADGES ============

# Badge definitions (hardcoded)
BADGES = [
    {
        "id": 1,
        "name": "Rising Star",
        "description": "Received your first recognition",
        "points_required": 0,
        "icon": "star"
    },
    {
        "id": 2,
        "name": "Achiever",
        "description": "Accumulated 500 points",
        "points_required": 500,
        "icon": "award"
    },
    {
        "id": 3,
        "name": "Leader",
        "description": "Accumulated 1000 points",
        "points_required": 1000,
        "icon": "crown"
    },
    {
        "id": 4,
        "name": "Champion",
        "description": "Accumulated 1500 points",
        "points_required": 1500,
        "icon": "zap"
    },
    {
        "id": 5,
        "name": "Legend",
        "description": "Accumulated 2000 points",
        "points_required": 2000,
        "icon": "flame"
    }
]

def get_user_progress(db: Session, user_id: int):
    """
    Get user's level progress with badge unlock status.
    
    Args:
        db: Database session
        user_id: User ID
    
    Returns:
        Dictionary with current level, total points, and badge list
    """
    # Get user stats
    stats = get_user_stats(db, user_id)
    total_points = stats["total_points"]
    current_level = stats["current_level"]
    
    # Build badge list with unlock status
    badges = []
    for badge in BADGES:
        is_unlocked = total_points >= badge["points_required"]
        points_to_unlock = max(0, badge["points_required"] - total_points)
        
        badges.append({
            "id": badge["id"],
            "name": badge["name"],
            "description": badge["description"],
            "points_required": badge["points_required"],
            "icon": badge["icon"],
            "unlocked": is_unlocked,
            "points_to_unlock": points_to_unlock
        })
    
    return {
        "user_id": user_id,
        "current_level": current_level,
        "total_points": total_points,
        "points_to_next_level": stats["points_to_next_level"],
        "shoutouts_received": stats["shoutouts_received"],
        "badges": badges
    }