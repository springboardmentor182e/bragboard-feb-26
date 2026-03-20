from fastapi import APIRouter
from src.leaderboard.service import get_full_leaderboard, get_top_users, get_stats

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

@router.get("/full")
def full():
    return get_full_leaderboard()

@router.get("/top")
def top():
    return get_top_users()

@router.get("/stats")
def stats():
    return get_stats()