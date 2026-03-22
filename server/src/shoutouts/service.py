from sqlalchemy.orm import Session
from src.shoutouts.models import Shoutout

def get_all_shoutouts(db: Session):
    return db.query(Shoutout).all()

def create_shoutout(db: Session, data: dict):
    new_shoutout = Shoutout(
        sender=data["sender"],
        message=data["message"],
        department=data["department"],
        date=data["date"],
    )
    db.add(new_shoutout)
    db.commit()
    db.refresh(new_shoutout)
    return new_shoutout

def delete_shoutout(db: Session, shoutout_id: int):
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()

    if shoutout:
        db.delete(shoutout)
        db.commit()
        return {"message": "Deleted successfully"}

    return {"message": "Shoutout not found"}