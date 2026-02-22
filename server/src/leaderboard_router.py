from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .database import get_db
from .models import User
from .schemas import LeaderboardUser


router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"]
)


@router.get("/", response_model=List[LeaderboardUser])
def get_leaderboard(db: Session = Depends(get_db)):

    # Order users by points descending
    users = db.query(User).order_by(User.points.desc()).all()

    leaderboard = []
    rank = 1

    for user in users:
        leaderboard.append(
            LeaderboardUser(
                rank=rank,
                id=user.id,
                name=user.name,
                department=user.department,
                photo_url=user.photo_url,
                points=user.points
            )
        )
        rank += 1

    return leaderboard