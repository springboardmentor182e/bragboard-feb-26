from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import User


def get_leaderboard_users(db: Session, limit: Optional[int] = None) -> List[User]:
    """
    Fetch users ordered by points in descending order.

    Args:
        db (Session): Database session
        limit (Optional[int]): Number of users to fetch (optional)

    Returns:
        List[User]: List of users sorted by points (highest first)
    """

    query = db.query(User).order_by(User.points.desc())

    if limit:
        query = query.limit(limit)

    return query.all()