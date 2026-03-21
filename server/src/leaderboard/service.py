from sqlalchemy.orm import Session
from .repository import get_leaderboard_users
from .schemas import LeaderboardUser


def get_leaderboard_service(db: Session):

    users = get_leaderboard_users(db)

    leaderboard = []
    rank = 1

    for user in users:
        leaderboard.append(
            LeaderboardUser(
                rank=rank,
                id=user.id,
                full_name=user.full_name,
                username=user.username,   # ✅ ADD THIS
                email=user.email,         # ✅ ADD THIS
                department=user.department,
                photo_url=user.photo_url,
                points=user.points
            )
        )
        rank += 1

    return leaderboard