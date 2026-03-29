from sqlalchemy.orm import Session
from ..entities.user import User
from ..auth.utils import hash_password
from pydantic import BaseModel, ConfigDict
from typing import List


class UserPublicResponse(BaseModel):
    id: int
    name: str
    email: str
    department: str | None = None
    role: str | None = None
    status: str | None = None
    model_config = ConfigDict(from_attributes=True)


def get_users(db: Session) -> List[dict]:
    users = db.query(User).all()
    # Convert to dict with only safe fields
    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "department": user.department,
            "role": user.role,
            "status": user.status,
        }
        for user in users
    ]


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

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def update_user_status(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    user.status = "Suspended" if user.status == "Active" else "Active"

    db.commit()
    db.refresh(user)

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def update_user_role(db: Session, user_id: int, role: str):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    user.role = role

    db.commit()
    db.refresh(user)

    # Return safe fields only
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "department": user.department,
        "role": user.role,
        "status": user.status,
    }


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return False

    db.delete(user)
    db.commit()

    return True