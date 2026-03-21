from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.shoutouts import service
from src.shoutouts.models import ShoutoutOut, StatsOut, CommentOut, CommentCreate

router = APIRouter(prefix="/employee/shoutouts", tags=["shoutouts"])


@router.get("/received", response_model=list[ShoutoutOut])
def received(db: Session = Depends(get_db)):
    return service.get_received(db)


@router.get("/given", response_model=list[ShoutoutOut])
def given(db: Session = Depends(get_db)):
    return service.get_given(db)


@router.get("/stats", response_model=StatsOut)
def stats(db: Session = Depends(get_db)):
    return service.get_stats(db)


@router.post("/{shoutout_id}/like", response_model=ShoutoutOut)
def like(shoutout_id: int, db: Session = Depends(get_db)):
    result = service.react(db, shoutout_id, "like")
    if not result:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return result


@router.post("/{shoutout_id}/star", response_model=ShoutoutOut)
def star(shoutout_id: int, db: Session = Depends(get_db)):
    result = service.react(db, shoutout_id, "star")
    if not result:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return result


@router.post("/{shoutout_id}/clap", response_model=ShoutoutOut)
def clap(shoutout_id: int, db: Session = Depends(get_db)):
    result = service.react(db, shoutout_id, "clap")
    if not result:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return result


@router.post("/{shoutout_id}/repost", response_model=ShoutoutOut)
def repost(shoutout_id: int, db: Session = Depends(get_db)):
    result = service.react(db, shoutout_id, "repost")
    if not result:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return result


@router.get("/{shoutout_id}/comments", response_model=list[CommentOut])
def get_comments(shoutout_id: int, db: Session = Depends(get_db)):
    return service.get_comments(db, shoutout_id)


@router.post("/{shoutout_id}/comments", response_model=CommentOut)
def add_comment(shoutout_id: int, body: CommentCreate, db: Session = Depends(get_db)):
    return service.add_comment(db, shoutout_id, body.author_name, body.content)