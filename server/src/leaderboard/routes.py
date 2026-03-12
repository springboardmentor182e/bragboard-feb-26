from fastapi import APIRouter, Query
from .service import get_full_leaderboard, get_top_users, get_stats, search_users, filter_department

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

@router.get("/search")
def search(name: str = Query(...)):
    return search_users(name)

@router.get("/department")
def department(dept: str = Query(...)):
    return filter_department(dept)