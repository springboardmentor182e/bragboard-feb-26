from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from ..database.core import get_db
from ..entities.shoutout import ShoutoutEntity
from ..shoutouts import models
from ..shoutouts.controller import get_current_user

from . import service

router = APIRouter(
    prefix="/api/my-shoutouts",
    tags=["My Shoutouts"]
)

@router.get("", response_model=models.MyShoutoutsResponse)
def read_my_shoutouts(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """Get all shoutouts authored by or received by the current user."""
    given = service.get_shoutouts_given_by_user(db, current_user['username'])
    received = service.get_shoutouts_received_by_user(db, current_user['username'])
    return {"given": given, "received": received}
