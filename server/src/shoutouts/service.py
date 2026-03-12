from sqlalchemy.orm import Session
from sqlalchemy import func
from src.entities.shoutout import Shoutout

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