from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import UserCreate as SchemaUserCreate, UserLogin
from .models import (
    ForgotPasswordRequest, 
    VerifyCodeRequest, 
    ResetPasswordRequest,
    Token, 
    UserResponse
)
UserCreate = SchemaUserCreate
from . import service

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/signup", response_model=dict)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    result = await service.register_user(db, user)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.post("/login", response_model=dict)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    result = await service.authenticate_user(db, user.email, user.password, user.role.value if hasattr(user.role, 'value') else user.role)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result["error"]
        )
    return result


@router.post("/forgot-password", response_model=dict)
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Request password reset"""
    result = await service.forgot_password(request.email, db)
    # Always return success to prevent email enumeration
    return {"success": True, "message": result.get("message", "If the email exists, a verification code will be sent")}


@router.post("/verify-reset-code", response_model=dict)
async def verify_reset_code(request: VerifyCodeRequest, db: Session = Depends(get_db)):
    """Verify the reset code"""
    result = await service.verify_reset_code(request.email, request.code, db)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.post("/reset-password", response_model=dict)
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password"""
    result = await service.reset_password(request.email, request.new_password, db)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.get("/me", response_model=dict)
async def get_current_user(email: str, db: Session = Depends(get_db)):
    """Get current user info"""
    user = await service.get_me({"email": email}, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

