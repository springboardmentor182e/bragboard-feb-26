import random
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.entities.shoutout import Shoutout
from src.shoutouts.models import ShoutoutCreate


def create_shoutout(db: Session, data: ShoutoutCreate) -> Shoutout:
    shoutout = Shoutout(
        teammate=data.teammate,
        badge=data.badge,
        campaign=data.campaign or None,
        message=data.message,
        points=100,
        reactions_like=random.randint(0, 4),
        reactions_star=random.randint(0, 4),
        reactions_clap=random.randint(0, 4),
    )
    db.add(shoutout)
    db.commit()
    db.refresh(shoutout)
    return shoutout


def get_all_shoutouts(db: Session) -> list[Shoutout]:
    return db.query(Shoutout).order_by(Shoutout.created_at.desc()).all()


def get_stats(db: Session) -> dict:
    total = db.query(func.count(Shoutout.id)).scalar()
    points = db.query(func.coalesce(func.sum(Shoutout.points), 0)).scalar()
    return {
        "total_given": total,
        "total_received": 0,
        "points_earned": points,
    }