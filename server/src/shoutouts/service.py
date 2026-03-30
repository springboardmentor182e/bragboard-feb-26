from sqlalchemy import text, func
from sqlalchemy.orm import Session
from ..entities.shoutout import Shoutout
from ..entities.reaction import Reaction, ReactionType
from ..entities.comment import Comment
from ..entities.user import User

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
    ).order_by(Shoutout.created_at.desc()).limit(limit).offset(offset).all()
    
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
            "reactions_count": get_reaction_counts(db, shoutout.id),
            "comments_count": db.query(Comment).filter(Comment.shoutout_id == shoutout.id).count(),
        })
    
    return feed


def get_user_stats(db: Session, user_id: int):
    """Get user stats: points, level, shoutouts received/sent, rank"""
    
    shoutouts_received = db.query(Shoutout).filter(
        Shoutout.receiver_id == user_id,
        Shoutout.status == "APPROVED"
    ).count()
    
    shoutouts_sent = db.query(Shoutout).filter(
        Shoutout.sender_id == user_id,
        Shoutout.status == "APPROVED"
    ).count()
    
    # Calculate total points
    total_points = db.query(func.sum(Shoutout.points)).filter(
        Shoutout.receiver_id == user_id,
        Shoutout.status == "APPROVED"
    ).scalar() or 0
    
    # Calculate level (500 points per level)
    current_level = int(total_points // 500) + 1
    
    # Get user rank (how many users have more points)
    rank = db.query(func.count(User.id)).filter(
        User.id != user_id
    ).scalar() + 1
    
    return {
        "user_id": user_id,
        "shoutouts_received": shoutouts_received,
        "shoutouts_sent": shoutouts_sent,
        "total_points": total_points,
        "current_level": current_level,
        "points_to_next_level": (current_level * 500) - total_points,
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