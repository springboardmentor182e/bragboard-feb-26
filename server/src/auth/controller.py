from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.entities.user import User
from ..schemas import UserCreate as SchemaUserCreate, UserLogin
from .models import (
    ForgotPasswordRequest, 
    VerifyCodeRequest, 
    ResetPasswordRequest,
    Token, 
    UserResponse
)
from .utils import verify_password, create_access_token
UserCreate = SchemaUserCreate
from . import service

router = APIRouter(tags=["auth"])


@router.post("/signup", response_model=dict)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    \"\"\"Register a new user\"\"\"
    result = await service.register_user(db, user)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.post("/login", response_model=Token)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    \"\"\"Login user and return JWT token\"\"\"
    # Robust service call
    result = await service.authenticate_user(db, user.email, user.password, user.role.value if hasattr(user.role, 'value') else user.role)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result["error"]
        )
    return result

@router.post("/login-simple", response_model=Token)
def login_simple(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({
        "user_id": str(user.id),
        "role": user.role
    })
    return Token(access_token=token, token_type="bearer")

@router.post("/forgot-password", response_model=dict)
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    \"\"\"Request password reset\"\"\"
    result = await service.forgot_password(request.email, db)
    return {"success": True, "message": result.get("message", "If the email exists, a verification code will be sent")}


@router.post("/verify-reset-code", response_model=dict)
async def verify_reset_code(request: VerifyCodeRequest, db: Session = Depends(get_db)):
    \"\"\"Verify the reset code\"\"\"
    result = await service.verify_reset_code(request.email, request.code, db)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.post("/reset-password", response_model=dict)
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    \"\"\"Reset password\"\"\"
    result = await service.reset_password(request.email, request.new_password, db)
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return result


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    \"\"\"Get current user info\"\"\"
    user = db.query(User).filter(User.email == current_user["email"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse.from_orm(user)

