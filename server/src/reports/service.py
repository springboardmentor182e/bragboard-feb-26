from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime
from ..entities.report import Report


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


# ✅ NEW FUNCTION to get reports with associated shoutout details for admin dashboard
def get_reports_with_shoutout_details(db: Session, status=None, priority=None, search=None):
    """
    Get reports with full shoutout and user information for admin dashboard
    """
    from ..entities.shoutout import Shoutout
    from ..entities.user import User
    from ..entities.shoutout_recipient import ShoutOutRecipient
    
    query = db.query(
        Report.id.label("report_id"),
        Report.reason,
        Report.description,
        Report.priority,
        Report.status,
        Report.created_at,
        Report.resolved_at,
        Report.reported_by,
        Shoutout.id.label("shoutout_id"),
        Shoutout.message,
        Shoutout.category,
        Shoutout.points,
        Shoutout.sender_id,
        Shoutout.created_at.label("shoutout_created_at"),
        User.name.label("sender_name")
    ).outerjoin(
        Shoutout, Report.shoutout_id == Shoutout.id
    ).outerjoin(
        User, Shoutout.sender_id == User.id
    )

    # Apply filters
    if status and status != "ALL":
        query = query.filter(Report.status == status)
    
    if priority and priority != "ALL":
        query = query.filter(Report.priority == priority)
    
    if search:
        query = query.filter(
            or_(
                Report.reason.ilike(f"%{search}%"),
                Report.description.ilike(f"%{search}%"),
                Shoutout.message.ilike(f"%{search}%")
            )
        )
    
    # Order by report date descending
    results = query.order_by(Report.created_at.desc()).all()
    
    # Transform to dictionary format for easier frontend consumption
    formatted_results = []
    for result in results:
        # Get reporter name
        reporter = db.query(User).filter(User.id == result.reported_by).first()
        
        # Get recipients for this shoutout
        recipients = []
        if result.shoutout_id:
            recipient_rows = db.query(ShoutOutRecipient).filter(
                ShoutOutRecipient.shoutout_id == result.shoutout_id
            ).all()
            
            for recipient_row in recipient_rows:
                recipient_user = db.query(User).filter(User.id == recipient_row.user_id).first()
                if recipient_user:
                    recipients.append({
                        "id": recipient_user.id,
                        "name": recipient_user.name
                    })
        
        formatted_results.append({
            "report_id": result.report_id,
            "reason": result.reason,
            "description": result.description,
            "priority": result.priority,
            "status": result.status,
            "created_at": result.created_at,
            "resolved_at": result.resolved_at,
            "reporter_id": result.reported_by,
            "reporter_name": reporter.name if reporter else "Unknown",
            "shoutout_id": result.shoutout_id,
            "message": result.message,
            "category": result.category,
            "points": result.points,
            "sender_id": result.sender_id,
            "sender_name": result.sender_name,
            "recipients": recipients,
            "shoutout_created_at": result.shoutout_created_at
        })
    
    return formatted_results


# ✅ EXISTING FUNCTION to calculate average response time for resolved reports
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