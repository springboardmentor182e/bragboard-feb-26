from fastapi import APIRouter, HTTPException
from .models import User
from .service import (
    get_users,
    add_user,
    update_user_status,
    update_user_role,
    delete_user,
)

router = APIRouter()


# GET ALL USERS
@router.get("/")
def fetch_users():
    return get_users()


# ADD USER
@router.post("/")
def create_user(user: User):
    return add_user(user)


# TOGGLE STATUS
@router.put("/{user_id}/toggle-status")
def toggle_status(user_id: int):
    updated_user = update_user_status(user_id)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


# UPDATE ROLE
@router.put("/{user_id}/role")
def change_role(user_id: int, role: str):
    updated_user = update_user_role(user_id, role)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


# DELETE USER
@router.delete("/{user_id}")
def remove_user(user_id: int):
    deleted = delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}