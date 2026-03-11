from sqlalchemy.orm import Session
from typing import List

from .repository import get_leaderboard_users
from .schemas import LeaderboardUser


def get_leaderboard_service(db: Session) -> List[LeaderboardUser]:
    """
    Service layer to generate leaderboard data.

    Fetches users ordered by points from repository
    and assigns rank based on points.

    Args:
        db (Session): Database session

    Returns:
        List[LeaderboardUser]: Ranked leaderboard users
    """

    users = get_leaderboard_users(db)

    leaderboard = [
        LeaderboardUser(
            rank=index + 1,
            id=user.id,
            name=user.name,
            department=user.department,
            photo_url=user.photo_url,
            points=user.points
        )
        for index, user in enumerate(users)
    ]

    return leaderboard