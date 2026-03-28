from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from src.database.core import get_db
from .models import (
    LoginRequest, TokenResponse, SignupRequest,
    ForgotPasswordRequest, VerifyOTPRequest, ResetPasswordRequest, OTPResponse
)
from .service import (
    login_user, signup_user,
    send_otp_email, verify_otp, reset_password_with_otp
)
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


# 🔐 PASSWORD RESET ROUTES

@router.post("/forgot-password", response_model=OTPResponse)
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Request password reset by sending OTP to email
    """
    return send_otp_email(data.email, db)


@router.post("/verify-otp")
def verify_otp_endpoint(data: VerifyOTPRequest, db: Session = Depends(get_db)):
    """
    Verify OTP is correct
    """
    return verify_otp(data.email, data.otp, db)


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Reset password using OTP
    """
    return reset_password_with_otp(data.email, data.otp, data.new_password, db)