from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from src.database.core import get_db
from .models import LoginRequest, TokenResponse, SignupRequest
from .service import login_user, signup_user
from .dependencies import get_current_user

router = APIRouter()


# 🔐 LOGIN
@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    token = login_user(data, db)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# 🆕 SIGNUP
@router.post("/signup", response_model=TokenResponse)
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    token = signup_user(data, db)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# 👤 GET CURRENT USER
@router.get("/me")
def get_me(user = Depends(get_current_user)):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": user.status
    }