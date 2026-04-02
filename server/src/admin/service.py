from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException, status
from src.entities.user import User, RoleEnum
from src.admin.models import EmployeeCreate, EmployeeUpdate
from src.auth.service import hash_password


def get_employees(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    department: str = None,
    search: str = None
):
    query = db.query(User)
    
    if department:
        query = query.filter(User.department == department)
    
    if search:
        query = query.filter(
            or_(
                User.name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%")
            )
        )
    
    total = query.count()
    employees = query.offset(skip).limit(limit).all()
    
    return {"total": total, "employees": employees}


def get_employee_by_id(db: Session, employee_id: int):
    employee = db.query(User).filter(User.id == employee_id).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return employee


def create_employee(db: Session, employee: EmployeeCreate):

    existing_user = db.query(User).filter(User.email == employee.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = hash_password(employee.password)

    db_employee = User(
        name=employee.name,
        email=employee.email,
        password=hashed_password,
        department=employee.department,
        role=employee.role
    )

    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return db_employee


def update_employee(db: Session, employee_id: int, employee_update: EmployeeUpdate):

    db_employee = get_employee_by_id(db, employee_id)

    update_data = employee_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_employee, field, value)

    db.commit()
    db.refresh(db_employee)

    return db_employee


def delete_employee(db: Session, employee_id: int):

    db_employee = get_employee_by_id(db, employee_id)

    db.delete(db_employee)
    db.commit()

    return {"message": "Employee deleted successfully"}