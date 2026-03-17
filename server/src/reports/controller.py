from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.reports.models import ReportCreate, ReportResponse
from src.reports import service

router = APIRouter()


@router.get("/", response_model=list[ReportResponse])
def get_reports(db: Session = Depends(get_db)):
    return service.get_reports(db)


@router.post("/", response_model=ReportResponse)
def create_report(report: ReportCreate, db: Session = Depends(get_db)):
    return service.create_report(db, report)


@router.put("/{report_id}/status")
def update_report_status(report_id: int, status: str, db: Session = Depends(get_db)):

    report = service.update_report_status(db, report_id, status)

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return report


@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):

    success = service.delete_report(db, report_id)

    if not success:
        raise HTTPException(status_code=404, detail="Report not found")

    return {"message": "Report deleted"}