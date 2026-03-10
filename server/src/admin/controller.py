from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from sqlalchemy import func
from src.admin.models import Report, UserContribution, ActivityLog
from src.database.core import get_db
from src.admin import schemas, service
from src.auth.service import get_password_hash
from src.entities.user import User

# Better import handling for Shoutout - no warning now
try:
    from src.entities.shoutout import Shoutout  # type: ignore
    SHOUTOUT_AVAILABLE = True
except (ImportError, ModuleNotFoundError, AttributeError):
    SHOUTOUT_AVAILABLE = False
    Shoutout = None
    print("⚠️ Shoutout model not available - posts and reactions will show as 0")

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

@router.get("/activities", response_model=List[schemas.ActivityLogResponse])
async def get_activity_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get activity logs"""
    admin_service = service.AdminService(db)
    return admin_service.get_activity_logs(skip, limit)

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
    """Resolve a report"""
    try:
        admin_service = service.AdminService(db)
        result = admin_service.resolve_report(report_id)
        
        if not result:
            raise HTTPException(
                status_code=404, 
                detail="Report not found or could not be resolved"
            )
            
        return {"message": "Report resolved successfully", "report_id": report_id}
        
    except Exception as e:
        print(f"Error in resolve_report endpoint: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to resolve report: {str(e)}"
        )

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

@router.get("/dashboard/stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """
    Get real dashboard statistics from database
    """
    try:
        # Get total users
        total_users = db.query(User).count()
        
        # Get active users today
        today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        active_users_today = db.query(ActivityLog).filter(
            ActivityLog.timestamp >= today_start
        ).distinct(ActivityLog.user_id).count()
        
        # Get total posts/shoutouts - only if Shoutout model exists
        total_posts = 0
        total_reactions = 0
        if SHOUTOUT_AVAILABLE and Shoutout is not None:
            try:
                total_posts = db.query(Shoutout).count()
                # Get total reactions (sum of likes on all posts)
                total_reactions = db.query(func.sum(Shoutout.likes_count)).scalar() or 0
            except Exception as e:
                print(f"Error querying Shoutout: {e}")
        
        # Get total reports
        total_reports = db.query(Report).count()
        
        # Calculate trends
        last_week = datetime.now() - timedelta(days=7)
        posts_last_week = 0
        if SHOUTOUT_AVAILABLE and Shoutout is not None:
            try:
                posts_last_week = db.query(Shoutout).filter(
                    Shoutout.created_at >= last_week
                ).count()
            except Exception as e:
                print(f"Error calculating trend: {e}")
        
        # Calculate percentage change
        shoutout_trend = "+0%"
        if posts_last_week > 0 and total_posts > 0:
            change = round((total_posts - posts_last_week) / posts_last_week * 100)
            shoutout_trend = f"+{change}%" if change > 0 else f"{change}%"
        
        return {
            "total_users": total_users,
            "active_users_today": active_users_today,
            "active_users": active_users_today,
            "total_posts": total_posts,
            "total_shoutouts": total_posts,
            "total_reactions": total_reactions,
            "total_reports": total_reports,
            "shoutout_trend": shoutout_trend,
            "reaction_trend": "+0%",
            "reports": total_reports
        }
        
    except Exception as e:
        print(f"Error getting dashboard stats: {e}")
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