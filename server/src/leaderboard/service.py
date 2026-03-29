from sqlalchemy.orm import Session
from .repository import get_leaderboard_users, update_user_badges
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
                    full_name=user.full_name,
                    username=user.username,
                    email=user.email,
                    department=user.department,
                    photo_url=user.photo_url,
                    points=user.points,
                    fire_badges=user.fire_badges or 0,
                    star_badges=user.star_badges or 0,
                    thumb_badges=user.thumb_badges or 0,
                )
            )
            rank += 1

        return leaderboard

    except Exception as e:
        print("❌ Leaderboard Service Error:", e)
        return []


def award_badge_service(db: Session, user_id: int, badge_type: str):
    try:
        user = update_user_badges(db, user_id, badge_type)
        if not user:
            return None
        return user

    except Exception as e:
        print("❌ Award Badge Service Error:", e)
        return None