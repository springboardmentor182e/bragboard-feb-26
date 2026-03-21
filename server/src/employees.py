from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from src.database import get_db
from src.models import Employee, Shoutout, Achievement

router = APIRouter(prefix="/employees", tags=["Employees"])


# ----------- Schemas -----------

class EmployeeCreate(BaseModel):
    name: str
    department: str


class EmployeeResponse(BaseModel):
    id: int
    name: str
    department: str
    created_at: datetime

    class Config:
        from_attributes = True  # orm_mode=True for Pydantic v1


class LeaderboardEntry(BaseModel):
    employee_id: int
    name: str
    department: str
    shoutout_count: int
    achievement_points: int
    total_score: int


# ----------- Routes -----------

@router.get("/", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).order_by(Employee.name).all()


@router.get("/leaderboard", response_model=List[LeaderboardEntry])
def get_leaderboard(db: Session = Depends(get_db)):
    """
    Single aggregated query — ranks employees by:
    total_score = shoutout_count + achievement_points
    """
    # Subquery: total achievement points per employee
    achievement_points = (
        db.query(
            Achievement.employee_id,
            func.coalesce(func.sum(Achievement.points), 0).label("total_points")
        )
        .group_by(Achievement.employee_id)
        .subquery()
    )

    # Subquery: total shoutouts received per employee
    shoutout_counts = (
        db.query(
            Shoutout.recipient_id,
            func.count(Shoutout.id).label("total_shoutouts")
        )
        .group_by(Shoutout.recipient_id)
        .subquery()
    )

    # Main query: join everything onto Employee
    results = (
        db.query(
            Employee.id,
            Employee.name,
            Employee.department,
            func.coalesce(shoutout_counts.c.total_shoutouts, 0).label("shoutout_count"),
            func.coalesce(achievement_points.c.total_points, 0).label("achievement_points"),
        )
        .outerjoin(shoutout_counts, Employee.id == shoutout_counts.c.recipient_id)
        .outerjoin(achievement_points, Employee.id == achievement_points.c.employee_id)
        .all()
    )

    leaderboard = [
        LeaderboardEntry(
            employee_id=row.id,
            name=row.name,
            department=row.department,
            shoutout_count=row.shoutout_count,
            achievement_points=row.achievement_points,
            total_score=row.shoutout_count + row.achievement_points,
        )
        for row in results
    ]

    return sorted(leaderboard, key=lambda x: x.total_score, reverse=True)


@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with id {employee_id} not found"
        )
    return employee


@router.post("/", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(data: EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(Employee).filter(Employee.name == data.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with name '{data.name}' already exists"
        )
    employee = Employee(name=data.name, department=data.department)
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with id {employee_id} not found"
        )
    db.delete(employee)
    db.commit()