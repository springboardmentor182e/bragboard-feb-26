from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import (
    UserCreate, UserLogin, TokenRefresh, AuthResponse, UserResponse
)
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..auth.dependencies import security

from .dependencies import get_current_user
from . import service

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=dict)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    result = await service.create_user(db, user)
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return {
        "message": "Account created successfully",
        **result["user"]
    }

@router.post("/login", response_model=dict)
async def login(user_login: UserLogin, db: Session = Depends(get_db)):
    result = await service.authenticate_user(db, user_login.email, user_login.password, user_login.role.value if hasattr(user_login.role, 'value') else user_login.role)
    if not result["success"]:
        raise HTTPException(status_code=403 if "Role mismatch" in result["error"] else 401, detail=result["error"])
    return result

@router.post("/refresh", response_model=dict)
async def refresh(token_refresh: TokenRefresh, db: Session = Depends(get_db)):
    result = await service.refresh_access_token(token_refresh.refresh_token, db)
    if not result["success"]:
        raise HTTPException(status_code=401, detail=result["error"])
    return result

@router.get("/me", response_model=UserResponse)
async def me(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    user_data = await service.get_me(current_user, db)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    return user_data

@router.post("/logout", response_model=dict)
async def logout(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db), 
           credentials: HTTPAuthorizationCredentials = Depends(security)):
    await service.logout_user(credentials.credentials, db)
    return {"message": "Logged out successfully"}
