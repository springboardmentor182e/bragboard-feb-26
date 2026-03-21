from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from src.database import get_db
from src.models import Shoutout

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])


# ----------- Schemas -----------

class ShoutoutCreate(BaseModel):
    sender_id: int
    recipient_id: int
    message: str


class ReactionUpdate(BaseModel):
    reaction: str  # "likes" | "claps" | "stars"


class ShoutoutResponse(BaseModel):
    id: int
    sender_id: int
    recipient_id: int
    message: str
    likes: int
    claps: int
    stars: int
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2 (orm_mode=True for v1)


# ----------- Routes -----------

@router.get("/", response_model=List[ShoutoutResponse])
def get_all_shoutouts(db: Session = Depends(get_db)):
    return db.query(Shoutout).order_by(Shoutout.created_at.desc()).all()


@router.get("/employee/{employee_id}", response_model=List[ShoutoutResponse])
def get_shoutouts_by_employee(employee_id: int, db: Session = Depends(get_db)):
    """Get all shoutouts received by a specific employee."""
    return (
        db.query(Shoutout)
        .filter(Shoutout.recipient_id == employee_id)
        .order_by(Shoutout.created_at.desc())
        .all()
    )


@router.post("/", response_model=ShoutoutResponse, status_code=status.HTTP_201_CREATED)
def create_shoutout(data: ShoutoutCreate, db: Session = Depends(get_db)):
    if data.sender_id == data.recipient_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sender and recipient cannot be the same employee"
        )
    shoutout = Shoutout(
        sender_id=data.sender_id,
        recipient_id=data.recipient_id,
        message=data.message,
    )
    db.add(shoutout)
    db.commit()
    db.refresh(shoutout)
    return shoutout


@router.patch("/{shoutout_id}/react", response_model=ShoutoutResponse)
def react_to_shoutout(
    shoutout_id: int,
    data: ReactionUpdate,
    db: Session = Depends(get_db)
):
    """Increment a reaction (likes, claps, or stars) on a shoutout."""
    valid_reactions = {"likes", "claps", "stars"}
    if data.reaction not in valid_reactions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid reaction. Must be one of: {valid_reactions}"
        )

    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    if not shoutout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shoutout with id {shoutout_id} not found"
        )

    # Safely increment the reaction column
    setattr(shoutout, data.reaction, getattr(shoutout, data.reaction) + 1)
    db.commit()
    db.refresh(shoutout)
    return shoutout


@router.delete("/{shoutout_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    if not shoutout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Shoutout with id {shoutout_id} not found"
        )
    db.delete(shoutout)
    db.commit()