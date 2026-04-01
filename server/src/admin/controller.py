from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import AdminReport, UserContribution, ActivityLog
from ..database.core import get_db
from . import schemas, service
from ..auth.utils import hash_password
from ..entities.user import User
from ..users.schemas import UserResponse
from ..reports.models import ReportResponse
from ..reports import service as reports_service

from ..entities.shoutout import Shoutout

# Define this variable
SHOUTOUT_AVAILABLE = True
router = APIRouter(tags=["Admin"])

# User management endpoints
@router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all users"""
    admin_service = service.AdminService(db)
    users = admin_service.get_all_users(skip, limit)
    return users

@router.get("/users/{user_id}", response_model=UserResponse)
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
    # Hash the password before saving
    hashed_pwd = hash_password(user.password)
    
    # Create user in database
    db_user = User(
        name=user.name,
        email=user.email,
        department=user.department,
        role=user.role,
        status=user.status,
        password=hashed_pwd
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/activities", response_model=List[schemas.ActivityLogResponse])
async def get_activity_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get activity logs"""
    admin_service = service.AdminService(db)
    return admin_service.get_activity_logs(skip, limit)

@router.get("/reports", response_model=List[ReportResponse])
async def get_reports(
    skip: int = 0,
    limit: int = 100,
    status: str = None,  # Add this parameter
    db: Session = Depends(get_db)
):
    """Get all reports from reports table using reports service"""
    # Use reports service to get reports from the reports table
    reports = reports_service.get_reports(db, status=status, priority=None, search=None)
    # Apply pagination manually since service doesn't support it
    return reports[skip:skip+limit]

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

@router.delete("/posts/{post_id}")
async def delete_post(post_id: int, db: Session = Depends(get_db)):
    try:
        # Log that we received the request
        print(f"Attempting to delete post with ID: {post_id}")
        
        # Find the post
        post = db.query(AdminReport).filter(AdminReport.id == post_id).first()
        
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

@router.get("/contributors/top")
async def get_top_contributors(
    db: Session = Depends(get_db),
    limit: int = 10
):
    """
    Get top contributors based on engagement analytics
    """
    try:
        admin_service = service.AdminService(db)
        analytics = admin_service.get_engagement_analytics()
        contributors = analytics.get("top_contributors", [])[:limit]
        
        # Format for chart display
        result = []
        for idx, contrib in enumerate(contributors):
            result.append({
                "name": contrib["name"],
                "value": int(contrib["engagement_score"]),
                "fill": ['#3882F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'][idx % 5]
            })
        
        return result

    except Exception as e:
        print(f"Error fetching top contributors: {e}")
        import traceback
        traceback.print_exc()
        return []


@router.get("/engagement/analytics")
async def get_engagement_analytics(db: Session = Depends(get_db)):
    """
    Get comprehensive engagement analytics
    """
    try:
        admin_service = service.AdminService(db)
        analytics = admin_service.get_engagement_analytics()
        return analytics
        
    except Exception as e:
        print(f"❌ Error in engagement analytics endpoint: {e}")
        import traceback
        traceback.print_exc()
        return {
            "top_contributors": [],
            "department_engagement": [],
            "category_breakdown": [],
            "reaction_breakdown": {}
        }


# ============= FIXED DASHBOARD STATS ENDPOINT =============
# Frontend calls /admin/dashboard/stats (without /api prefix)
# So we need to add this endpoint at the root level
# But router has prefix /api/admin, so we add both versions

@router.get("/dashboard/stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get real dashboard statistics using AdminService"""
    try:
        admin_service = service.AdminService(db)
        stats = admin_service.get_dashboard_stats()
        return stats
        
    except Exception as e:
        print(f"❌ Error in dashboard stats endpoint: {e}")
        import traceback
        traceback.print_exc()
        return {
            "total_users": 0,
            "active_users": 0,
            "total_posts": 0,
            "total_shoutouts": 0,
            "total_reactions": 0,
            "total_reports": 0,
            "reports": 0,
            "active_users_today": 0,
            "admin_count": 0,
            "pending_users": 0,
        }
    
