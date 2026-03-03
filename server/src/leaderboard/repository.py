from sqlalchemy.orm import Session
from ..models import User


def get_leaderboard_users(db: Session):
    """
    Fetch all users ordered by points in descending order.
    Highest points first.
    """
    return (
        db.query(User)
        .order_by(User.points.desc())
        .all()
    )