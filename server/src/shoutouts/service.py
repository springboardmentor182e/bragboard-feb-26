from sqlalchemy.orm import Session
from src.entities.shoutout import Shoutout


def get_all_shoutouts(db: Session):
    return db.query(Shoutout).all()


def create_shoutout(db: Session, shoutout):
    # Support both Pydantic object and dict
    sender = getattr(shoutout, "sender", None) or shoutout.get("sender")
    message = getattr(shoutout, "message", None) or shoutout.get("message")
    department = getattr(shoutout, "department", None) or shoutout.get("department")
    date = getattr(shoutout, "date", None) or shoutout.get("date")

    new_shoutout = Shoutout(
        sender=sender,
        message=message,
        department=department,
        date=date,
        status="pending",
    )

    db.add(new_shoutout)
    db.commit()
    db.refresh(new_shoutout)
    return new_shoutout


def approve_shoutout(db: Session, id: int):
    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()
    if shoutout:
        shoutout.status = "approved"
        db.commit()
        db.refresh(shoutout)
    return shoutout


def reject_shoutout(db: Session, id: int):
    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()
    if shoutout:
        shoutout.status = "rejected"
        db.commit()
        db.refresh(shoutout)
    return shoutout


def delete_shoutout(db: Session, id: int):
    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()
    if shoutout:
        db.delete(shoutout)
        db.commit()
    return {"message": "Deleted"}