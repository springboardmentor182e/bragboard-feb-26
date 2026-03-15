from sqlalchemy.orm import Session
from sqlalchemy import func
from src.entities.shoutout import Shoutout

CURRENT_USER = "You"


# -------- Employee MyShoutouts Logic --------

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


# -------- General CRUD Operations --------

def get_all_shoutouts(db: Session):
    return db.query(Shoutout).all()


def create_shoutout(db: Session, shoutout):

    new_shoutout = Shoutout(
        sender_name=shoutout.sender_name,
        receiver_name=shoutout.receiver_name,
        badge=shoutout.badge,
        campaign=shoutout.campaign,
        message=shoutout.message
    )

    db.add(new_shoutout)
    db.commit()
    db.refresh(new_shoutout)

    return new_shoutout


def delete_shoutout(db: Session, id: int):

    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()

    if shoutout:
        db.delete(shoutout)
        db.commit()

    return {"message": "Deleted successfully"}