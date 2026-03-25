from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from . import service

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])


@router.post("/")
def create_shoutout(
    sender_id: int,
    receiver_id: int,
    message: str,
    badge: str,
    db: Session = Depends(get_db)
):
    return service.create_shoutout(db, sender_id, receiver_id, message, badge)


@router.get("/")
def get_shoutouts(db: Session = Depends(get_db)):
    return service.get_all_shoutouts(db)


@router.get("/user/{user_id}")
def get_user_shoutouts(user_id: int, db: Session = Depends(get_db)):
    return service.get_user_shoutouts(db, user_id)