from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List

from src.database.core import get_db
from src.admin import schemas, service
from src.auth.service import get_password_hash  # Now this will work!

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# User management endpoints
@router.get("/users", response_model=List[schemas.UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all users"""
    admin_service = service.AdminService(db)
    users = admin_service.get_all_users(skip, limit)
    return users

@router.get("/users/{user_id}", response_model=schemas.UserResponse)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    """Get user by ID"""
    admin_service = service.AdminService(db)
    user = admin_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """Create new user"""
    admin_service = service.AdminService(db)
    
    # Hash the password before saving
    user_dict = user.dict()
    user_dict["hashed_password"] = get_password_hash(user.password)
    del user_dict["password"]
    
    # Create user in database (you'll need to modify your service to accept this)
    # For now, let's create a simple user object
    from src.entities.user import User
    db_user = User(**user_dict)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/dashboard/stats")
async def get_dashboard_stats(
    db: Session = Depends(get_db)
):
    """Get dashboard statistics"""
    admin_service = service.AdminService(db)
    return admin_service.get_dashboard_stats()

@router.get("/activities", response_model=List[schemas.ActivityLogResponse])
async def get_activity_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get activity logs"""
    admin_service = service.AdminService(db)
    return admin_service.get_activity_logs(skip, limit)