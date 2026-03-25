from sqlalchemy.orm import Session
from src.entities.user import User


def get_leaderboard_users(db: Session):
    """
    Fetch all users ordered by points in descending order.
    Highest points first.
    """

    try:
        users = (
            db.query(User)
            .order_by(User.points.desc())   # ✅ correct ordering
            .all()
        )

        # ✅ DEBUG (very important)
        print("🔥 USERS FETCHED:", users)

        return users

    except Exception as e:
        print("❌ Leaderboard Repository Error:", e)
        return []