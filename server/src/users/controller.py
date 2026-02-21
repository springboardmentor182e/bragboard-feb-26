from fastapi import APIRouter, HTTPException
from .models import User
from .service import get_users, add_user, update_user_status

router = APIRouter()

@router.get("/")
def fetch_users():
    return get_users()

@router.post("/")
def create_user(user: User):
    return add_user(user)

@router.put("/{user_id}/toggle-status")
def toggle_status(user_id: int):
    updated_user = update_user_status(user_id)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user