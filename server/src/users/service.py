from sqlalchemy.orm import Session
from src.entities.user import User
from src.auth.utils import hash_password


def get_users(db: Session):
    return db.query(User).all()


def add_user(db: Session, user_data):
    default_password = hash_password("123456")

    user = User(
        name=user_data.name,
        email=user_data.email,
        department=user_data.department,
        role=user_data.role,
        status=user_data.status,
        password=default_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def update_user_status(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    setattr(user, 'status', "Suspended" if getattr(user, 'status') == "Active" else "Active")

    db.commit()
    db.refresh(user)

    return user


def update_user_role(db: Session, user_id: int, role: str):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    setattr(user, 'role', role)

    db.commit()
    db.refresh(user)

    return user


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return False

    db.delete(user)
    db.commit()

    return True