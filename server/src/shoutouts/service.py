from sqlalchemy.orm import Session
from src.entities.user import User
from .models import Shoutout


def create_shoutout(db: Session, sender_id, receiver_id, message, badge):
    try:
        # ✅ validate users
        sender = db.query(User).filter(User.id == sender_id).first()
        receiver = db.query(User).filter(User.id == receiver_id).first()

        if not sender or not receiver:
            return None

        shoutout = Shoutout(
            sender_id=sender_id,
            receiver_id=receiver_id,
            message=message,
            badge=badge
        )

        db.add(shoutout)

        # 🔥 SAFE updates (avoid None crash)
        receiver.points = (receiver.points or 0) + 10
        receiver.shoutouts_count = (receiver.shoutouts_count or 0) + 1

        db.commit()
        db.refresh(shoutout)

        return shoutout

    except Exception as e:
        db.rollback()
        print("ERROR creating shoutout:", e)
        raise


def get_all_shoutouts(db: Session):
    return db.query(Shoutout).order_by(Shoutout.created_at.desc()).all()


def get_user_shoutouts(db: Session, user_id: int):
    return db.query(Shoutout).filter(
        (Shoutout.sender_id == user_id) |
        (Shoutout.receiver_id == user_id)
    ).order_by(Shoutout.created_at.desc()).all()