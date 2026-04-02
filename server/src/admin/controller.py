from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from ..database.core import get_db
from .service import AdminService
from ..reports.service import update_report_status, delete_report
from ..users.service import (
    get_users, add_user, update_user_status, update_user_role, delete_user
)
from ..users.schemas import UserCreate

router = APIRouter(tags=["Admin"])


# ─────────────────────────────────────────────────────────────
# DASHBOARD
# ─────────────────────────────────────────────────────────────
@router.get("/dashboard/stats")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """Complete real-time dashboard stats"""
    return AdminService(db).get_dashboard_stats()


@router.get("/contributors/top")
async def get_top_contributors(limit: int = 5, db: Session = Depends(get_db)):
    """Top N users by shoutouts sent (live from DB)"""
    return AdminService(db).get_top_contributors(limit)


@router.get("/stats/departments")
async def get_department_stats(db: Session = Depends(get_db)):
    """Department-wise shoutout breakdown (live from DB)"""
    return AdminService(db).get_department_stats()


# ─────────────────────────────────────────────────────────────
# SHOUTOUTS MANAGEMENT
# ─────────────────────────────────────────────────────────────
@router.get("/shoutouts")
async def get_all_shoutouts(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    department: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """All shoutouts with search, filter, pagination"""
    return AdminService(db).get_all_shoutouts(skip, limit, search, department, status)


@router.get("/shoutouts/stats")
async def get_shoutout_stats(db: Session = Depends(get_db)):
    """Shoutout counts: total, approved, pending, rejected, reactions"""
    return AdminService(db).get_shoutout_stats()


@router.delete("/shoutouts/{shoutout_id}")
async def delete_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    ok = AdminService(db).delete_shoutout(shoutout_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return {"message": "Deleted successfully"}


@router.put("/shoutouts/{shoutout_id}/approve")
async def approve_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    ok = AdminService(db).approve_shoutout(shoutout_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return {"message": "Approved"}


@router.put("/shoutouts/{shoutout_id}/reject")
async def reject_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    ok = AdminService(db).reject_shoutout(shoutout_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return {"message": "Rejected"}


# ─────────────────────────────────────────────────────────────
# USER / EMPLOYEE MANAGEMENT
# ─────────────────────────────────────────────────────────────
@router.get("/users")
async def get_all_users(db: Session = Depends(get_db)):
    """All users with shoutout counts"""
    return AdminService(db).get_all_users()


@router.post("/users")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return add_user(db, user)


@router.put("/users/{user_id}/toggle-status")
async def toggle_status(user_id: int, db: Session = Depends(get_db)):
    result = update_user_status(db, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result


@router.put("/users/{user_id}/role")
async def change_role(user_id: int, role: str, db: Session = Depends(get_db)):
    result = update_user_role(db, user_id, role)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result


@router.delete("/users/{user_id}")
async def remove_user(user_id: int, db: Session = Depends(get_db)):
    ok = delete_user(db, user_id)
    if not ok:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}


# ─────────────────────────────────────────────────────────────
# REPORTS MANAGEMENT
# ─────────────────────────────────────────────────────────────
@router.get("/reports")
async def get_reports(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return AdminService(db).get_reports(skip, limit, status)


@router.get("/reports/stats")
async def get_report_stats(db: Session = Depends(get_db)):
    """Reports: total, pending, reviewing, resolved, avg response time"""
    return AdminService(db).get_report_stats()


@router.post("/reports/{report_id}/resolve")
async def resolve_report(report_id: int, db: Session = Depends(get_db)):
    ok = AdminService(db).resolve_report(report_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"message": "Resolved successfully"}


@router.put("/reports/{report_id}/status")
async def set_report_status(report_id: int, status: str, db: Session = Depends(get_db)):
    result = update_report_status(db, report_id, status)
    if not result:
        raise HTTPException(status_code=404, detail="Report not found")
    return result


@router.delete("/reports/{report_id}")
async def remove_report(report_id: int, db: Session = Depends(get_db)):
    ok = delete_report(db, report_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"message": "Report deleted"}
