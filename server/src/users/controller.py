from src.auth.dependencies import require_admin
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from .models import UserCreate
from .service import (
    get_users,
    add_user,
    update_user_status,
    update_user_role,
    delete_user,
    get_leaderboard,   # ✅ NEW
)
from src.entities.user import User  # ✅ NEW


router = APIRouter(prefix="/users", tags=["Users"])


# ✅ GET ALL USERS
@router.get("/")
def fetch_users(db: Session = Depends(get_db)):
    return get_users(db)


# ✅ CREATE USER
@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return add_user(db, user)


# ✅ TOGGLE STATUS
@router.put("/{user_id}/toggle-status")
def toggle_status(user_id: int, db: Session = Depends(get_db)):
    updated_user = update_user_status(db, user_id)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


# ✅ CHANGE ROLE
@router.put("/{user_id}/role")
def change_role(user_id: int, role: str, db: Session = Depends(get_db)):
    updated_user = update_user_role(db, user_id, role)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


# ✅ DELETE USER
@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    deleted = delete_user(db, user_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}


# =========================================================
# 🔥 NEW APIs FOR EMPLOYEE DASHBOARD
# =========================================================

# ✅ LEADERBOARD
@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    return get_leaderboard(db)


# ✅ GET SINGLE USER (for profile page)
@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user