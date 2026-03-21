from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from src.database.core import get_db
from src.reports.models import ReportCreate, ReportResponse
from src.reports import service

router = APIRouter()


@router.get("/", response_model=List[ReportResponse])
def fetch_reports(
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return service.get_reports(db, status, priority, search)


@router.post("/", response_model=ReportResponse)
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db),
):
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