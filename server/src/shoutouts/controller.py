from fastapi import APIRouter, Depends, Query, HTTPException, Body, Request
from sqlalchemy.orm import Session
from datetime import date, datetime
from ..database.core import get_db
from .service import (
    get_all_shoutouts, 
    delete_shoutout,
    get_all_shoutouts_feed,
    get_user_feed,
    get_user_stats,
    add_reaction,
    remove_reaction,
    get_reactions,
    add_comment,
    get_comments,
    delete_comment,
    create_shoutout_with_recipients,
    get_user_given_shoutouts,
    get_user_received_shoutouts,
)
from .schemas import ShoutOutCreate, ShoutOutResponse, FeedItemResponse
from ..auth.dependencies import get_current_user

# Admin routes
admin_router = APIRouter(prefix="/admin/shoutouts", tags=["Admin Shoutouts"])

@admin_router.get("")
def fetch_shoutouts(db: Session = Depends(get_db)):
    return get_all_shoutouts(db)

@admin_router.delete("/{shoutout_id}")
def remove_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    return delete_shoutout(db, shoutout_id)


# User/Employee routes
router = APIRouter(prefix="/api/shoutouts", tags=["Shoutouts"])

@router.get("/feed")
def fetch_user_feed(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get user's feed with shoutouts they received + team shoutouts"""
    return get_user_feed(db, current_user.id, limit, offset)


@router.get("/feed/all")
def fetch_all_shoutouts_feed(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    sender_id: int = Query(None, description="Filter by sender user ID"),
    department: str = Query(None, description="Filter by sender's department"),
    date_from: date = Query(None, description="Filter shoutouts from this date (YYYY-MM-DD)"),
    date_to: date = Query(None, description="Filter shoutouts until this date (YYYY-MM-DD)"),
    after: datetime = Query(None, description="Get shoutouts created after this timestamp (ISO format)"),
    db: Session = Depends(get_db),
    request: Request = None
):
    """
    Get all approved shoutouts with filters, pagination, and optional user engagement.
    
    Query Parameters:
    - sender_id: Filter by sender user ID
    - department: Filter by sender's department
    - date_from: Filter from date (YYYY-MM-DD)
    - date_to: Filter until date (YYYY-MM-DD)
    - after: Get shoutouts created after this timestamp (ISO 8601 format)
    - limit: Results per page (1-100, default 20)
    - offset: Results to skip (default 0)
    
    Returns list of approved shoutouts with sender info, recipients, engagement counts,
    and current user's reaction (if authenticated).
    """
    # Try to authenticate user (optional) - extract from Authorization header
    user_id = None
    try:
        from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
        from jose import jwt
        from ..auth.config import SECRET_KEY, ALGORITHM
        from ..entities.user import User
        
        auth_header = request.headers.get("Authorization") if request else None
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.replace("Bearer ", "")
            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                user = db.query(User).filter(User.id == payload.get("user_id")).first()
                if user:
                    user_id = user.id
            except:
                # Invalid token, proceed as anonymous
                pass
    except:
        # No token or error parsing - proceed as public user
        pass
    
    try:
        return get_all_shoutouts_feed(
            db=db,
            limit=limit,
            offset=offset,
            sender_id=sender_id,
            department=department,
            date_from=date_from,
            date_to=date_to,
            after_datetime=after,
            current_user_id=user_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch feed: {str(e)}")


@router.get("/stats/{user_id}")
def fetch_user_stats(user_id: int, db: Session = Depends(get_db)):
    """Get user stats: points, level, shoutouts count, rank"""
    return get_user_stats(db, user_id)


@router.get("/user/given")
def fetch_user_given_shoutouts(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get shoutouts given (sent) by the current user"""
    return get_user_given_shoutouts(db, current_user.id, limit, offset)


@router.get("/user/received")
def fetch_user_received_shoutouts(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get shoutouts received by the current user"""
    return get_user_received_shoutouts(db, current_user.id, limit, offset)


@router.post("", response_model=ShoutOutResponse, status_code=201)
def create_shoutout(
    shoutout_data: ShoutOutCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Create a new shoutout with multiple user tagging.
    
    Args:
        shoutout_data: Shoutout creation data with message, category, recipient_ids, and points
        db: Database session
        current_user: Current authenticated user
    
    Returns:
        Created shoutout with all recipient details
    
    Raises:
        HTTPException 400: If validation fails (invalid users, empty recipients, self-tagging)
    """
    try:
        result = create_shoutout_with_recipients(
            db=db,
            sender_id=current_user.id,
            message=shoutout_data.message,
            category=shoutout_data.category,
            recipient_ids=shoutout_data.recipient_ids,
            points=shoutout_data.points
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create shoutout: {str(e)}")


@router.post("/{shoutout_id}/reactions")
def add_shoutout_reaction(
    shoutout_id: int,
    reaction_type: str = Query(..., pattern="^(like|clap|star)$"),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Add or update reaction to a shoutout"""
    return add_reaction(db, shoutout_id, current_user.id, reaction_type)


@router.delete("/{shoutout_id}/reactions")
def remove_shoutout_reaction(
    shoutout_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Remove user's reaction from a shoutout"""
    return remove_reaction(db, shoutout_id, current_user.id)


@router.get("/{shoutout_id}/reactions")
def fetch_reactions(shoutout_id: int, db: Session = Depends(get_db)):
    """Get reaction counts for a shoutout"""
    return get_reactions(db, shoutout_id)


@router.post("/{shoutout_id}/comments")
def add_shoutout_comment(
    shoutout_id: int,
    text: str = Query(..., min_length=1, max_length=500),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Add a comment to a shoutout"""
    return add_comment(db, shoutout_id, current_user.id, text)


@router.get("/{shoutout_id}/comments")
def fetch_comments(
    shoutout_id: int,
    limit: int = Query(5, ge=1, le=50),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """Get comments for a shoutout with pagination"""
    return get_comments(db, shoutout_id, limit, offset)


@router.delete("/comments/{comment_id}")
def remove_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Delete a comment (only comment author or admin)"""
    return delete_comment(db, comment_id)