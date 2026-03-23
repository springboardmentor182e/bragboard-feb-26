from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from src.entities.shoutout import Shoutout
from src.entities.user import User
from .models import ShoutoutCreate


def create_shoutout(db: Session, shoutout_data: ShoutoutCreate):
    db_shoutout = Shoutout(
        sender_id=shoutout_data.sender_id,
        receiver_id=shoutout_data.receiver_id,
        message=shoutout_data.message,
        category=shoutout_data.category,
        points=shoutout_data.points,
        status="APPROVED"  # Auto-approve for now
    )
    db.add(db_shoutout)
    db.commit()
    db.refresh(db_shoutout)
    return db_shoutout


def get_received_shoutouts(db: Session, user_id: int):
    return db.query(Shoutout).filter(Shoutout.receiver_id == user_id).order_by(desc(Shoutout.created_at)).all()


def get_given_shoutouts(db: Session, user_id: int):
    return db.query(Shoutout).filter(Shoutout.sender_id == user_id).order_by(desc(Shoutout.created_at)).all()


def get_leaderboard(db: Session, limit: int = 10):
    # Sum points for each user from shoutouts they received
    # We use outerjoin to include users who haven't received any shoutouts yet
    results = db.query(
        User,
        func.coalesce(func.sum(Shoutout.points), 0).label('total_points')
    ).outerjoin(
        Shoutout, User.id == Shoutout.receiver_id
    ).group_by(
        User.id
    ).order_by(
        desc('total_points'),
        User.name
    ).limit(limit).all()

    leaderboard = []
    for rank, (user, total_points) in enumerate(results, 1):
        leaderboard.append({
            "id": user.id,
            "name": user.name,
            "department": user.department,
            "role": user.role,
            "points": int(total_points),
            "rank": rank
        })
    
    return leaderboard
