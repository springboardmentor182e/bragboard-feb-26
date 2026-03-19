from src.auth.dependencies import require_admin
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from src.database.core import get_db
from .models import UserCreate
from .service import (
    get_users,
    update_user_status,
    update_user_role,
    delete_user,
)
from src.entities.user import User
import uuid
from pathlib import Path
import shutil

router = APIRouter()

# ==============================
# GET USERS
# ==============================
@router.get("/")
def fetch_users(db: Session = Depends(get_db)):
    return get_users(db)


# ==============================
# CREATE USER (UPDATED FOR PHOTO)
# ==============================
@router.post("/")
def create_user(
    name: str = Form(...),
    department: str = Form(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate image
    if not photo.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed")

    # Create folder
    BASE_DIR = Path(__file__).resolve().parent.parent
    USERS_DIR = BASE_DIR / "media" / "users"
    USERS_DIR.mkdir(parents=True, exist_ok=True)

    # Save file
    filename = f"{uuid.uuid4()}.{photo.filename.split('.')[-1]}"
    filepath = USERS_DIR / filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

    # Save to DB
    user = User(
        full_name=name,
        department=department,
        photo_url=f"/media/users/{filename}",
        points=0
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "name": user.full_name,
        "department": user.department,
        "points": user.points,
        "photo_url": user.photo_url
    }


# ==============================
# UPDATE STATUS
# ==============================
@router.put("/{user_id}/toggle-status")
def toggle_status(user_id: int, db: Session = Depends(get_db)):
    updated_user = update_user_status(db, user_id)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


# ==============================
# UPDATE ROLE
# ==============================
@router.put("/{user_id}/role")
def change_role(user_id: int, role: str, db: Session = Depends(get_db)):
    updated_user = update_user_role(db, user_id, role)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return updated_user


# ==============================
# DELETE USER
# ==============================
@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    deleted = delete_user(db, user_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}