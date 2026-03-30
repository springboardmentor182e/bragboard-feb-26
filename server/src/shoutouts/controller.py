from fastapi import APIRouter, Depends, Query, HTTPException, Body
from sqlalchemy.orm import Session
from ..database.core import get_db
from .service import (
    get_all_shoutouts, 
    delete_shoutout,
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
from .schemas import ShoutOutCreate, ShoutOutResponse
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