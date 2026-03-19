from fastapi import APIRouter, HTTPException, status
from .models import (
    UserCreate, 
    UserLogin, 
    Token, 
    ForgotPasswordRequest, 
    VerifyCodeRequest, 
    ResetPasswordRequest,
    UserResponse
)
from . import service

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/signup", response_model=dict)
async def signup(user: UserCreate):
    """Register a new user"""
    result = await service.register_user(user)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.post("/login", response_model=dict)
async def login(user: UserLogin):
    """Login user and return JWT token"""
    result = await service.authenticate_user(
        email=user.email, 
        password=user.password,
        role=user.role.value if hasattr(user.role, 'value') else user.role
    )
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result["error"]
        )
    return result


@router.post("/forgot-password", response_model=dict)
async def forgot_password(request: ForgotPasswordRequest):
    """Request password reset"""
    result = await service.forgot_password(request.email)
    # Always return success to prevent email enumeration
    return {"success": True, "message": result.get("message", "If the email exists, a verification code will be sent")}


@router.post("/verify-reset-code", response_model=dict)
async def verify_reset_code(request: VerifyCodeRequest):
    """Verify the reset code"""
    result = await service.verify_reset_code(request.email, request.code)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.post("/reset-password", response_model=dict)
async def reset_password(request: ResetPasswordRequest):
    """Reset password"""
    result = await service.reset_password(request.email, request.new_password)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.get("/me", response_model=dict)
async def get_current_user(email: str):
    """Get current user info"""
    user = await service.get_user_by_email(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return {
        "id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "is_active": user.get("is_active", True)
    }

