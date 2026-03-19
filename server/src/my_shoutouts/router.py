from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from ..database.core import get_db
from ..entities.shoutout import ShoutoutEntity
from ..shoutouts import models
from ..shoutouts.controller import get_current_user

router = APIRouter(
    prefix="/api/my-shoutouts",
    tags=["My Shoutouts"]
)

@router.get("", response_model=List[models.Shoutout])
def read_my_shoutouts(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """Get all shoutouts authored by the current user."""
    return db.query(ShoutoutEntity).filter(ShoutoutEntity.author == current_user['username']).all()
