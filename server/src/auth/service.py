from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.entities.user import User
from .utils import verify_password, hash_password, create_access_token


# 🔐 LOGIN
def login_user(data, db: Session):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return create_access_token({
        "user_id": user.id,
        "role": user.role
    })


# 🆕 SIGNUP
def signup_user(data, db: Session):
    existing = db.query(User).filter(User.email == data.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role="employee",
        status="active"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return create_access_token({
        "user_id": new_user.id,
        "role": new_user.role
    })