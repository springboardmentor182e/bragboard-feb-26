from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.entities.user import User

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])


@router.get("/full")
def full_leaderboard(db: Session = Depends(get_db)):
    return db.query(User).order_by(User.points.desc()).all()


@router.get("/top")
def top_users(db: Session = Depends(get_db)):
    return db.query(User).order_by(User.points.desc()).limit(3).all()


@router.get("/stats")
def stats(db: Session = Depends(get_db)):
    users = db.query(User).all()

    top_score = max(u.points for u in users) if users else 0
    total_badges = sum(u.badges for u in users)

    return {
        "top_score": top_score,
        "total_badges": total_badges,
        "growth_percent": 10
    }