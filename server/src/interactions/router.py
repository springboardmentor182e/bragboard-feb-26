from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database.core import get_db
from . import service
from . import models

from ..shoutouts.controller import get_current_user

router = APIRouter(
    prefix="/api/shoutouts/{shoutout_id}",
    tags=["Interactions"],
)

@router.post("/react")
def react_to_shoutout(shoutout_id: int, reaction: models.Reaction, db: Session = Depends(get_db)):
    result = service.add_reaction(db, shoutout_id, reaction.reaction)
    if not result:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return result

@router.post("/comment")
def comment_on_shoutout(shoutout_id: int, comment: models.Comment, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    result = service.add_comment(db, shoutout_id, current_user["username"], comment.message)
    if not result:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return result
