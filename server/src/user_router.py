from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
import uuid
from typing import List

from src.database.core import get_db
from src.entities.user import User
from src.schemas import UserResponse, UserUpdate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# ==============================
# MEDIA FOLDER SETUP
# ==============================
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_DIR = BASE_DIR / "media"
USERS_DIR = MEDIA_DIR / "users"

USERS_DIR.mkdir(parents=True, exist_ok=True)


# ==============================
# CREATE USER
# ==============================
@router.post("/", response_model=UserResponse)
def create_user(
    name: str = Form(...),
    department: str = Form(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    if not photo.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed")

    extension = photo.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    filepath = USERS_DIR / filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

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
# GET USERS
# ==============================
@router.get("/", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return [
        {
            "id": u.id,
            "name": u.full_name,
            "department": u.department,
            "points": u.points,
            "photo_url": u.photo_url
        }
        for u in users
    ]


# ==============================
# DELETE USER
# ==============================
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}


# ==============================
# UPDATE USER
# ==============================
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_data.name is not None:
        user.full_name = user_data.name

    if user_data.department is not None:
        user.department = user_data.department

    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "name": user.full_name,
        "department": user.department,
        "points": user.points,
        "photo_url": user.photo_url
    }