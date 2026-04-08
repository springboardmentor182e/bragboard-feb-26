from sqlalchemy.orm import Session
from sqlalchemy import text


def get_leaderboard_users(db: Session):
    try:
        result = db.execute(text("""
            SELECT id, full_name, username, email, department,
                   photo_url, points, fire_badges, star_badges, thumb_badges
            FROM users
            WHERE is_active = true
            ORDER BY points DESC
        """))
        return result.fetchall()
    except Exception as e:
        print("❌ Leaderboard Repository Error:", e)
        return []


def get_leaderboard_user_by_id(db: Session, user_id: int):
    try:
        result = db.execute(text("""
            SELECT id, full_name, username, email, department,
                   photo_url, points, fire_badges, star_badges, thumb_badges
            FROM users
            WHERE id = :user_id
        """), {"user_id": user_id})
        return result.fetchone()
    except Exception as e:
        print("❌ Leaderboard Repository Error:", e)
        return None


def update_user_badges(db: Session, user_id: int, badge_type: str):
    try:
        if badge_type == "fire":
            db.execute(text("""
                UPDATE users SET fire_badges = fire_badges + 1
                WHERE id = :user_id
            """), {"user_id": user_id})
        elif badge_type == "star":
            db.execute(text("""
                UPDATE users SET star_badges = star_badges + 1
                WHERE id = :user_id
            """), {"user_id": user_id})
        elif badge_type == "thumb":
            db.execute(text("""
                UPDATE users SET thumb_badges = thumb_badges + 1
                WHERE id = :user_id
            """), {"user_id": user_id})

        db.commit()

        result = db.execute(text("""
            SELECT id, full_name, username, email, department,
                   photo_url, points, fire_badges, star_badges, thumb_badges
            FROM users WHERE id = :user_id
        """), {"user_id": user_id})
        return result.fetchone()

    except Exception as e:
        print("❌ Update Badge Error:", e)
        db.rollback()
        return None