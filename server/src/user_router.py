from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
import uuid

from .database import get_db
from .models import User
from .schemas import UserResponse, UserUpdate
from typing import List

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# ===== MEDIA FOLDER SETUP =====
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

    # Validate image type
    if not photo.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed")

    # Generate unique filename
    file_extension = photo.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    file_path = USERS_DIR / unique_filename

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

    # Save to DB
    new_user = User(
        name=name,
        department=department,
        photo_url=f"/media/users/{unique_filename}",
        points=0
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ==============================
# GET USERS
# ==============================
@router.get("/", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


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
def update_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_data.name is not None:
        user.name = user_data.name

    if user_data.department is not None:
        user.department = user_data.department

    db.commit()
    db.refresh(user)

    return user