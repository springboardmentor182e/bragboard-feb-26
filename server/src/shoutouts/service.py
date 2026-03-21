from sqlalchemy.orm import Session
from sqlalchemy import func
from src.entities.shoutout import Shoutout
from src.entities.comment import Comment

CURRENT_USER = "You"


def get_received(db: Session):
    return (
        db.query(Shoutout)
        .filter(Shoutout.receiver_name == CURRENT_USER)
        .order_by(Shoutout.created_at.desc())
        .all()
    )


def get_given(db: Session):
    return (
        db.query(Shoutout)
        .filter(Shoutout.sender_name == CURRENT_USER)
        .order_by(Shoutout.created_at.desc())
        .all()
    )


def get_stats(db: Session):
    total_given = (
        db.query(func.count(Shoutout.id))
        .filter(Shoutout.sender_name == CURRENT_USER)
        .scalar()
    )
    total_received = (
        db.query(func.count(Shoutout.id))
        .filter(Shoutout.receiver_name == CURRENT_USER)
        .scalar()
    )
    points = total_received * 50
    return {
        "total_given": total_given,
        "total_received": total_received,
        "points_earned": points,
    }


def react(db: Session, shoutout_id: int, reaction: str):
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    if not shoutout:
        return None
    if reaction == "like":
        shoutout.likes += 1
    elif reaction == "star":
        shoutout.stars += 1
    elif reaction == "clap":
        shoutout.claps += 1
    elif reaction == "repost":
        shoutout.shares += 1
    db.commit()
    db.refresh(shoutout)
    return shoutout


def get_comments(db: Session, shoutout_id: int):
    return (
        db.query(Comment)
        .filter(Comment.shoutout_id == shoutout_id)
        .order_by(Comment.created_at.asc())
        .all()
    )


def add_comment(db: Session, shoutout_id: int, author_name: str, content: str):
    comment = Comment(
        shoutout_id=shoutout_id,
        author_name=author_name,
        content=content,
    )
    db.add(comment)
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    if shoutout:
        shoutout.comments += 1
    db.commit()
    db.refresh(comment)
    return comment