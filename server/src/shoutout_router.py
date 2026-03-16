from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.entities.user import User

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])


# ADD POINTS
@router.post("/")
def create_shoutout(
    message: str,
    points: int,
    receiver_id: int,
    db: Session = Depends(get_db)
):

    if points <= 0:
        raise HTTPException(status_code=400, detail="Points must be greater than 0")

    user = db.query(User).filter(User.id == receiver_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.points += points

    db.commit()
    db.refresh(user)

    return {
        "message": message,
        "points_added": points,
        "total_points": user.points
    }


# REMOVE POINTS
@router.delete("/{receiver_id}")
def remove_points(receiver_id: int, points: int = 10, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == receiver_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.points -= points

    if user.points < 0:
        user.points = 0

    db.commit()

    return {
        "message": "Points removed",
        "remaining_points": user.points
    }