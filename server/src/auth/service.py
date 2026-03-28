from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.entities.user import User
from .utils import verify_password, hash_password, create_access_token


# 🔐 LOGIN
# def login_user(data, db: Session):
#     # normalize email
#     email = data.email.strip().lower()

#     user = db.query(User).filter(User.email == email).first()

#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     if not verify_password(data.password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     token = create_access_token({
#         "user_id": user.id,
#         "role": user.role
#     })

#     return token

def login_user(data, db: Session):
    print("INPUT EMAIL:", data.email)
    print("INPUT PASSWORD:", data.password)

    user = db.query(User).filter(User.email == data.email).first()

    print("USER FROM DB:", user)

    if user:
        print("DB PASSWORD:", user.password)
        print("VERIFY RESULT:", verify_password(data.password, user.password))

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })

    return token


# 🆕 SIGNUP
def signup_user(data, db: Session):
    email = data.email.strip().lower()

    existing = db.query(User).filter(User.email == email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        name=data.name.strip(),
        email=email,
        password=hash_password(data.password),
        role="employee",   # default role
        status="active"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({
        "user_id": new_user.id,
        "role": new_user.role
    })

    return token