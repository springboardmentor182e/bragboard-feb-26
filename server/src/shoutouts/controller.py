from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from .models import ShoutoutCreate, ShoutoutResponse, LeaderboardEntry
from .service import create_shoutout, get_received_shoutouts, get_given_shoutouts, get_leaderboard
from typing import List


router = APIRouter()


@router.post("/", response_model=ShoutoutResponse)
def add_shoutout(shoutout: ShoutoutCreate, db: Session = Depends(get_db)):
    return create_shoutout(db, shoutout)


@router.get("/received/{user_id}", response_model=List[ShoutoutResponse])
def fetch_received_shoutouts(user_id: int, db: Session = Depends(get_db)):
    return get_received_shoutouts(db, user_id)


@router.get("/given/{user_id}", response_model=List[ShoutoutResponse])
def fetch_given_shoutouts(user_id: int, db: Session = Depends(get_db)):
    return get_given_shoutouts(db, user_id)


@router.get("/leaderboard", response_model=List[LeaderboardEntry])
def fetch_leaderboard(limit: int = 10, db: Session = Depends(get_db)):
    return get_leaderboard(db, limit)
