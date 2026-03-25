from sqlalchemy.orm import Session
from src.entities.user import User
from src.auth.utils import hash_password


# =========================================================
# BASIC USER OPERATIONS
# =========================================================

def get_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def add_user(db: Session, user_data):
    default_password = hash_password("123456")

    user = User(
        name=user_data.name,
        email=user_data.email,
        department=user_data.department,
        role=user_data.role,
        status=user_data.status,
        password=default_password,

        # 🔥 NEW DEFAULTS FOR DASHBOARD
        points=0,
        shoutouts_count=0,
        reactions_count=0
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# =========================================================
# UPDATE OPERATIONS
# =========================================================

def update_user_status(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    user.status = "Suspended" if user.status == "Active" else "Active"

    db.commit()
    db.refresh(user)

    return user


def update_user_role(db: Session, user_id: int, role: str):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    user.role = role

    db.commit()
    db.refresh(user)

    return user


# =========================================================
# DELETE
# =========================================================

def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)

    if not user:
        return False

    db.delete(user)
    db.commit()

    return True


# =========================================================
# 🔥 DASHBOARD FEATURES
# =========================================================

# ✅ LEADERBOARD (sorted by points)
def get_leaderboard(db: Session):
    return db.query(User).order_by(User.points.desc()).all()


# ✅ OPTIONAL: TOP 3 USERS (for UI cards)
def get_top_users(db: Session, limit: int = 3):
    return db.query(User)\
        .order_by(User.points.desc())\
        .limit(limit)\
        .all()