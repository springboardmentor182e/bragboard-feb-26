from sqlalchemy.orm import Session
from .repository import get_leaderboard_users
from .schemas import LeaderboardUser
from src.entities.user import User


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
                    fire_badges=user.fire_badges or 0,    # ✅ ADDED
                    star_badges=user.star_badges or 0,    # ✅ ADDED
                    thumb_badges=user.thumb_badges or 0   # ✅ ADDED
                )
            )
            rank += 1

        return leaderboard

    except Exception as e:
        print("❌ Leaderboard Service Error:", e)
        return []


def award_badge_service(db: Session, user_id: int, badge_type: str):
    try:
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            return None

        if badge_type == "fire":
            user.fire_badges += 1
        elif badge_type == "star":
            user.star_badges += 1
        elif badge_type == "thumb":
            user.thumb_badges += 1

        db.commit()
        db.refresh(user)

        return user

    except Exception as e:
        print("❌ Award Badge Service Error:", e)
        db.rollback()
        return None