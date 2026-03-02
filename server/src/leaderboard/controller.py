from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.leaderboard import service

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])


@router.get("/full")
def full_ranking(db: Session = Depends(get_db)):
    return service.get_full_ranking(db)


@router.get("/top")
def top_three(db: Session = Depends(get_db)):
    return service.get_top_three(db)


@router.get("/stats")
def stats(db: Session = Depends(get_db)):
    return service.get_stats(db)