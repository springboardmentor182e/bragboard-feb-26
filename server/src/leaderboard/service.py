from sqlalchemy.orm import Session
from .repository import get_leaderboard_users
from .schemas import LeaderboardUser


def get_leaderboard_service(db: Session):
    try:
        users = get_leaderboard_users(db)

        if not users:
            return []

        leaderboard = []
        rank = 1

        for user in users:
            leaderboard.append(
                LeaderboardUser(
                    rank=rank,
                    id=user.id,
                    full_name=user.full_name,     # ✅ correct
                    username=user.username,
                    email=user.email,
                    department=user.department,
                    photo_url=user.photo_url,
                    points=user.points            # ✅ correct
                )
            )
            rank += 1

        return leaderboard

    except Exception as e:
        print("❌ Leaderboard Service Error:", e)
        return []