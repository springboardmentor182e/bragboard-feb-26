from typing import List
from src.auth.dependencies import require_admin
from fastapi import APIRouter, HTTPException, Depends,status
from sqlalchemy.orm import Session
from src.database.core import get_db
from .models import UserCreate
from . import service
from . import schemas
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



@router.get("/dashboard/stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get real dashboard statistics from database"""
    try:
        from sqlalchemy import text
        
        # Direct SQL queries - no model dependency
        total_users = db.execute(text("SELECT COUNT(*) FROM users")).scalar() or 0
        total_reports = db.execute(text("SELECT COUNT(*) FROM reports")).scalar() or 0
        pending_reports = db.execute(text("SELECT COUNT(*) FROM reports WHERE status='pending'")).scalar() or 0
        
        print(f"📊 Dashboard - Users: {total_users}, Reports: {total_reports}, Pending: {pending_reports}")
        
        return {
            "total_users": total_users,
            "active_users_today": 0,
            "total_posts": 0,
            "total_reactions": 0,
            "total_reports": total_reports,
            "reports": total_reports,
            "shoutout_trend": "+0%",
            "reaction_trend": "+0%"
        }
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return {
            "total_users": 0,
            "active_users_today": 0,
            "total_posts": 0,
            "total_reactions": 0,
            "total_reports": 0,
            "shoutout_trend": "+0%",
            "reaction_trend": "+0%"
        }

@router.get("/contributors/top")
async def get_top_contributors(
    db: Session = Depends(get_db),
    limit: int = 10
):
    """
    Get top contributors based on total interactions
    """
    try:
        # Query top contributors from user_contributions table
        contributors = db.query(
            UserContribution.user_name,
            UserContribution.total_interactions
        ).order_by(
            UserContribution.total_interactions.desc()
        ).limit(limit).all()

        # Format the response with colors
        colors = ['#3882F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
        result = []
        
        for idx, (name, value) in enumerate(contributors):
            result.append({
                "name": name,
                "value": value or 0,
                "fill": colors[idx % len(colors)]
            })

        return result

    except Exception as e:
        print(f"Error fetching top contributors: {e}")
        return []

@router.delete("/posts/{post_id}")
async def delete_post(post_id: int, db: Session = Depends(get_db)):
    try:
        # Log that we received the request
        print(f"Attempting to delete post with ID: {post_id}")
        
        # Find the post
        post = db.query(Report).filter(Report.id == post_id).first()
        
        if not post:
            print(f"Post {post_id} not found")
            return {"error": "Post not found"}, 404
            
        # Check for foreign key constraints (if post has comments, likes, etc.)
        # You might need to delete related records first
        
        db.delete(post)
        db.commit()
        print(f"Post {post_id} deleted successfully")
        return {"message": "Post deleted successfully"}
        
    except Exception as e:
        print(f"ERROR deleting post {post_id}: {str(e)}")
        import traceback
        traceback.print_exc()  # This will print the full stack trace
        db.rollback()
        return {"error": str(e)}, 500

@router.get("/reports", response_model=List[schemas.ReportResponse])
async def get_reports(
    skip: int = 0,
    limit: int = 100,
    status: str = None,  # Add this parameter
    db: Session = Depends(get_db)
):
    """Get all reports, optionally filtered by status"""
    admin_service = service.AdminService(db)
    return admin_service.get_reports(skip, limit, status)


@router.post("/reports/{report_id}/resolve")
async def resolve_report(
    report_id: int,
    db: Session = Depends(get_db)
):
    """Resolve a report - FIXED VERSION"""
    try:
        print(f"📍 Resolving report {report_id}")
        admin_service = service.AdminService(db)
        result = admin_service.resolve_report(report_id)
        
        if not result:
            return {"message": "Report not found", "success": False}, 404
            
        return {"message": "Report resolved successfully", "success": True}
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"message": str(e), "success": False}, 500



@router.get("/activities", response_model=List[schemas.ActivityLogResponse])
async def get_activity_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get activity logs"""
    admin_service = service.AdminService(db)
    return admin_service.get_activity_logs(skip, limit)




@router.post("/users", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    """Create new user"""
    # Hash the password before saving
    user_dict = user.dict()
    user_dict["hashed_password"] = get_password_hash(user.password)
    del user_dict["password"]
    
    # Create user in database
    db_user = User(**user_dict)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user