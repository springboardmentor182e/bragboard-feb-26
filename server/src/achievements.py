from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from src.database import get_db
from src.models import Achievement

router = APIRouter(prefix="/achievements", tags=["Achievements"])


# ----------- Schemas -----------

class AchievementCreate(BaseModel):
    employee_id: int
    title: str
    description: Optional[str] = None
    points: int = 0


class AchievementResponse(BaseModel):
    id: int
    employee_id: int
    title: str
    description: Optional[str]
    points: int
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2 (use orm_mode=True for Pydantic v1)


# ----------- Routes -----------

@router.get("/", response_model=List[AchievementResponse])
def get_all_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).all()


@router.get("/employee/{employee_id}", response_model=List[AchievementResponse])
def get_achievements_by_employee(employee_id: int, db: Session = Depends(get_db)):
    return db.query(Achievement).filter(Achievement.employee_id == employee_id).all()


@router.post("/", response_model=AchievementResponse, status_code=status.HTTP_201_CREATED)
def create_achievement(data: AchievementCreate, db: Session = Depends(get_db)):
    achievement = Achievement(
        employee_id=data.employee_id,
        title=data.title,
        description=data.description,
        points=data.points,
    )
    db.add(achievement)
    db.commit()
    db.refresh(achievement)
    return achievement


@router.delete("/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_achievement(achievement_id: int, db: Session = Depends(get_db)):
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Achievement with id {achievement_id} not found"
        )
    db.delete(achievement)
    db.commit()
@router.put("/{achievement_id}", response_model=AchievementResponse)
def update_achievement(
    achievement_id: int,
    data: AchievementCreate,
    db: Session = Depends(get_db)
):
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    achievement.title = data.title
    achievement.description = data.description
    achievement.points = data.points
    db.commit()
    db.refresh(achievement)
    return achievement