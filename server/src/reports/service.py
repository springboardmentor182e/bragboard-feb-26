from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime
from src.entities.report import Report


def get_reports(db: Session, status=None, priority=None, search=None):
    query = db.query(Report)

    if status and status != "ALL":
        query = query.filter(Report.status == status)

    if priority and priority != "ALL":
        query = query.filter(Report.priority == priority)

    if search:
        query = query.filter(
            or_(
                Report.reason.ilike(f"%{search}%"),
                Report.description.ilike(f"%{search}%")
            )
        )

    return query.order_by(Report.created_at.desc()).all()


def create_report(db: Session, report):
    try:
        new_report = Report(**report.dict())

        db.add(new_report)
        db.commit()
        db.refresh(new_report)

        return new_report

    except Exception as e:
        db.rollback()
        print("ERROR:", e)
        raise


def update_report_status(db: Session, report_id: int, status: str):
    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:
        return None

    report.status = status

    # ✅ NEW LOGIC to set resolved_at when status is updated to RESOLVED
    if status == "RESOLVED":
        report.resolved_at = datetime.utcnow()

    db.commit()
    db.refresh(report)

    return report


def delete_report(db: Session, report_id: int):
    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:
        return False

    db.delete(report)
    db.commit()

    return True


# ✅ NEW FUNCTION to calculate average response time for resolved reports
def get_avg_response_time(db: Session):
    reports = db.query(Report).filter(
        Report.resolved_at.isnot(None)
    ).all()

    if not reports:
        return 0

    total_seconds = 0

    for r in reports:
        diff = r.resolved_at - r.created_at
        total_seconds += diff.total_seconds()

    avg_hours = (total_seconds / len(reports)) / 3600

    return round(avg_hours, 2)