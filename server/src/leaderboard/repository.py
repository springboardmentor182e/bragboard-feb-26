from sqlalchemy.orm import Session
from src.entities.user import User


def get_leaderboard_users(db: Session):
    try:
        users = db.query(User)\
            .filter(User.is_active == True)\
            .order_by(User.points.desc())\
            .all()
        return users
    except Exception as e:
        print("❌ Leaderboard Repository Error:", e)
        return []


def get_leaderboard_user_by_id(db: Session, user_id: int):
    try:
        user = db.query(User)\
            .filter(User.id == user_id)\
            .first()
        return user
    except Exception as e:
        print("❌ Leaderboard Repository Error:", e)
        return None


def update_user_badges(db: Session, user_id: int, badge_type: str):
    try:
        user = db.query(User)\
            .filter(User.id == user_id)\
            .first()

        if not user:
            return None

        if badge_type == "fire":
            user.fire_badges = (user.fire_badges or 0) + 1
        elif badge_type == "star":
            user.star_badges = (user.star_badges or 0) + 1
        elif badge_type == "thumb":
            user.thumb_badges = (user.thumb_badges or 0) + 1

        db.commit()
        db.refresh(user)
        return user

    except Exception as e:
        print("❌ Update Badge Error:", e)
        db.rollback()
        return None