from fastapi import APIRouter
from auth.jwt_handler import create_access_token,create_refresh_token

router = APIRouter()

@router.post("/register")
def register(user: dict):

    return {"message":"User registered"}

@router.post("/login")
def login(user: dict):

    access = create_access_token({"sub":user["email"]})
    refresh = create_refresh_token({"sub":user["email"]})

    return {
        "access_token":access,
        "refresh_token":refresh
    }

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import SessionLocal
from entities.user import User
from auth.password import hash_password

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: dict, db: Session = Depends(get_db)):

    new_user = User(
        email=user["email"],
        password=hash_password(user["password"])
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created"}   