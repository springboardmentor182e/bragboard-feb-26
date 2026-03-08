from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from src.admin.models import Report  # Import your Post model
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



@router.get("/reports", response_model=List[schemas.ReportResponse])
async def get_reports(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all reports"""
    admin_service = service.AdminService(db)
    return admin_service.get_reports(skip, limit)

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