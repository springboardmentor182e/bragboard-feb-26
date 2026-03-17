from sqlalchemy.orm import Session
from src.entities.report import Report
from src.reports.models import ReportCreate


def get_reports(db: Session):
    return db.query(Report).all()


def create_report(db: Session, report: ReportCreate):

    # get last report to generate next code
    last_report = db.query(Report).order_by(Report.id.desc()).first()

    if last_report:
        next_number = last_report.id + 1
    else:
        next_number = 1

    report_code = f"RPT-{next_number:03}"

    new_report = Report(
        report_code=report_code,
        shoutout_id=report.shoutout_id,
        reported_user=report.reported_user,
        reported_by=report.reported_by,
        reason=report.reason,
        description=report.description,
        priority=report.priority,
        status="PENDING"
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


def update_report_status(db: Session, report_id: int, status: str):

    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:
        return None

    report.status = status

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