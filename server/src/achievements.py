from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from src.database.core import get_db  # ✅ FIXED
from src.models import Achievement   # make sure path is correct

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
        from_attributes = True  # for Pydantic v2


# ----------- Routes -----------

# ✅ GET ALL
@router.get("/", response_model=List[AchievementResponse])
def get_all_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).all()


# ✅ GET BY EMPLOYEE (IMPORTANT FOR FRONTEND)
@router.get("/employee/{employee_id}", response_model=List[AchievementResponse])
def get_achievements_by_employee(employee_id: int, db: Session = Depends(get_db)):
    return db.query(Achievement).filter(
        Achievement.employee_id == employee_id
    ).all()


# ✅ CREATE
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


# ✅ UPDATE
@router.put("/{achievement_id}", response_model=AchievementResponse)
def update_achievement(
    achievement_id: int,
    data: AchievementCreate,
    db: Session = Depends(get_db)
):
    achievement = db.query(Achievement).filter(
        Achievement.id == achievement_id
    ).first()

    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")

    achievement.title = data.title
    achievement.description = data.description
    achievement.points = data.points

    db.commit()
    db.refresh(achievement)

    return achievement


# ✅ DELETE (FIXED RETURN)
@router.delete("/{achievement_id}")
def delete_achievement(achievement_id: int, db: Session = Depends(get_db)):
    achievement = db.query(Achievement).filter(
        Achievement.id == achievement_id
    ).first()

    if not achievement:
        raise HTTPException(
            status_code=404,
            detail=f"Achievement with id {achievement_id} not found"
        )

    db.delete(achievement)
    db.commit()

    return {"message": "Achievement deleted successfully"}  # ✅ FIXED