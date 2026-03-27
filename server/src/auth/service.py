from sqlalchemy.orm import Session
from sqlalchemy import select, text
from ..models import User, UserRole
from ..schemas import UserCreate, UserLogin
from .jwt import (
    verify_password, get_password_hash, create_access_token, create_refresh_token, decode_token
)
from typing import Dict, Any, Optional
import uuid
from datetime import datetime, timedelta
# from ..auth.models import ForgotPasswordRequest, VerifyCodeRequest, ResetPasswordRequest  # Add reset schemas

# Mock cache for reset codes (replace with Redis)
RESET_CODES: Dict[str, dict] = {}

async def get_user_by_email(db: Session, email: str) -> Optional[User]:
    result = db.scalars(select(User).where(User.email == email))
    return result.first()

async def create_user(db: Session, user: UserCreate) -> Dict[str, Any]:
    # Check duplicate email
    existing_user = await get_user_by_email(db, user.email)
    if existing_user:
        return {"success": False, "error": "Email already registered"}

    db_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        role=UserRole.employee  # Force employee
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {
        "success": True,
        "user": {
            "id": str(db_user.id),
            "email": db_user.email,
            "role": db_user.role.value
        }
    }

async def register_user(db: Session, user: UserCreate) -> Dict[str, Any]:
    return await create_user(db, user)

async def authenticate_user(db: Session, email: str, password: str, role: str) -> Dict[str, Any]:
    user = await get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return {"success": False, "error": "Invalid email or password"}
    
    if not bool(user.is_active):
        return {"success": False, "error": "Account disabled"}
    
    # Role check
    if role != user.role.value:
        return {"success": False, "error": "Role mismatch - access forbidden"}

    access_token = create_access_token({
        "sub": user.email,
        "user_id": str(user.id),
        "role": user.role.value
    })
    
    refresh_token = create_refresh_token({
        "sub": user.email,
        "user_id": str(user.id),
        "role": user.role.value
    })
    
    return {
        "success": True,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "role": user.role.value,
        "email": user.email
    }

async def refresh_access_token(refresh_token: str, db: Session) -> Dict[str, Any]:
    payload = decode_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        return {"success": False, "error": "Invalid refresh token"}

    user = await get_user_by_email(db, payload["sub"])
    if not user:
        return {"success": False, "error": "User not found"}
    
    new_access = create_access_token({
        "sub": user.email,
        "user_id": str(user.id),
        "role": user.role.value
    })
    
    return {"success": True, "access_token": new_access}

async def logout_user(token: str, db: Session):
    return {"success": True, "message": "Logged out successfully"}

async def get_me(current_user: dict, db: Session):
    user = await get_user_by_email(db, current_user["email"])
    if not user:
        return None
    return {
        "user_id": current_user["id"],
        "email": user.email,
        "role": user.role.value,
        "is_active": user.is_active
    }

# Password reset functions
async def forgot_password(email: str, db: Session) -> Dict[str, Any]:
    user = await get_user_by_email(db, email)
    if not user:
        # Still return success to avoid enumeration
        return {"success": True, "message": "If email exists, code sent"}
    
    code = str(uuid.uuid4())[:8]
    RESET_CODES[email] = {
        "code": code,
        "expires": datetime.utcnow() + timedelta(minutes=15)
    }
    # TODO: Send email with code
    print(f"Mock email sent to {email} with code {code}")  # Demo
    return {"success": True, "message": "Reset code sent"}

async def verify_reset_code(email: str, code: str, db: Session) -> Dict[str, Any]:
    user_data = RESET_CODES.get(email)
    if not user_data or datetime.utcnow() > user_data["expires"] or user_data["code"] != code:
        return {"success": False, "error": "Invalid or expired code"}
    RESET_CODES[email]["verified"] = True
    return {"success": True, "message": "Code verified"}

async def reset_password(email: str, new_password: str, db: Session) -> Dict[str, Any]:
    # Use raw SQL to avoid all ORM/Pylance issues with rowcount
    hashed = get_password_hash(new_password)
    with db.begin():  # Atomic transaction
        result = db.execute(
            text("UPDATE users SET hashed_password = :hashed WHERE email = :email RETURNING id"),
            {"hashed": hashed, "email": email}
        )
        row = result.fetchone()
        if not row:
            return {"success": False, "error": "User not found"}
    
    if email in RESET_CODES:
        del RESET_CODES[email]
    return {"success": True, "message": "Password reset successful"}

async def is_token_blacklisted(token: str) -> bool:
    return False  # No blacklist for simplicity
