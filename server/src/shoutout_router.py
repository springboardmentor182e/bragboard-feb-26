from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .models import Shoutout, User
from .schemas import ShoutoutResponse

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])

@router.post("/", response_model=ShoutoutResponse)
def create_shoutout(message: str, points: int, receiver_id: int, db: Session = Depends(get_db)):

    if points <= 0:
        raise HTTPException(status_code=400, detail="Points must be greater than 0")

    user = db.query(User).filter(User.id == receiver_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_shoutout = Shoutout(
        message=message,
        points=points,
        receiver_id=receiver_id
    )

    user.points += points

    db.add(new_shoutout)
    db.commit()
    db.refresh(new_shoutout)

    return new_shoutout

@router.delete("/{shoutout_id}")
def delete_shoutout(shoutout_id: int, db: Session = Depends(get_db)):

    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()

    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")

    # reduce points from user
    user = db.query(User).filter(User.id == shoutout.receiver_id).first()
    if user:
        user.points -= shoutout.points

    db.delete(shoutout)
    db.commit()

    return {"message": "Shoutout deleted successfully"}