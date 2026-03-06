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
)

router = APIRouter()


@router.get("/")
def fetch_users(db: Session = Depends(get_db)):
    return get_users(db)


@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return add_user(db, user)


@router.put("/{user_id}/toggle-status")
def toggle_status(user_id: int, db: Session = Depends(get_db)):
    updated_user = update_user_status(db, user_id)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


@router.put("/{user_id}/role")
def change_role(user_id: int, role: str, db: Session = Depends(get_db)):
    updated_user = update_user_role(db, user_id, role)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    deleted = delete_user(db, user_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}