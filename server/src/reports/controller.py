from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from ..database.core import get_db
from ..auth.dependencies import get_current_user
from ..entities.user import User
from .models import ReportCreate, ReportResponse
from . import service

router = APIRouter()

# Simple in-memory rate limiting (for demo; use Redis in production)
report_attempts = {}


def check_rate_limit(user_id: int, max_reports_per_day: int = 10):
    """Check if user has exceeded daily report limit"""
    now = datetime.utcnow()
    key = f"user_{user_id}"
    
    if key not in report_attempts:
        report_attempts[key] = []
    
    # Remove attempts older than 24 hours
    report_attempts[key] = [
        attempt for attempt in report_attempts[key]
        if now - attempt < timedelta(days=1)
    ]
    
    if len(report_attempts[key]) >= max_reports_per_day:
        raise HTTPException(
            status_code=429,
            detail=f"Rate limit exceeded: Maximum {max_reports_per_day} reports per day"
        )
    
    report_attempts[key].append(now)


@router.get("/", response_model=List[ReportResponse])
def fetch_reports(
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return service.get_reports(db, status, priority, search)


# ✅ NEW ENDPOINT: Get reports with full shoutout details for admin dashboard
@router.get("/with-details", response_model=List[dict])
def fetch_reports_with_details(
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """Get reports with associated shoutout content for admin reported posts display"""
    return service.get_reports_with_shoutout_details(db, status, priority, search)


@router.post("/", response_model=ReportResponse)
def create_report(
    report: ReportCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new report for a shoutout"""
    
    # Check rate limiting
    check_rate_limit(report.reported_by)
    
    # Verify authenticated user matches reporter
    if current_user.id != report.reported_by:
        raise HTTPException(
            status_code=403,
            detail="Cannot report on behalf of another user"
        )
    
    # Prevent self-reporting
    from ..entities.shoutout import Shoutout
    shoutout = db.query(Shoutout).filter(Shoutout.id == report.shoutout_id).first()
    
    if not shoutout:
        raise HTTPException(
            status_code=404,
            detail="Shoutout not found"
        )
    
    if shoutout.sender_id == report.reported_by:
        raise HTTPException(
            status_code=400,
            detail="You cannot report your own shoutout"
        )
    
    return service.create_report(db, report)


@router.put("/{report_id}/status", response_model=ReportResponse)
def update_status(
    report_id: int,
    status: str = Query(...),
    db: Session = Depends(get_db),
):
    updated = service.update_report_status(db, report_id, status)

    if not updated:
        raise HTTPException(status_code=404, detail="Report not found")

    return updated


@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db),
):
    success = service.delete_report(db, report_id)

    if not success:
        raise HTTPException(status_code=404, detail="Report not found")

    return {"message": "Report deleted successfully"}


# ✅ NEW API
@router.get("/stats/avg-response-time")
def avg_response_time(db: Session = Depends(get_db)):
    avg = service.get_avg_response_time(db)
    return {"avg_response_time": avg}