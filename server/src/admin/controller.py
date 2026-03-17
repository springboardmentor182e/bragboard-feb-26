from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.auth.service import require_admin
from src.admin.models import EmployeeCreate, EmployeeUpdate, EmployeeResponse, EmployeeListResponse
from src.admin.service import (
    get_employees,
    get_employee_by_id,
    create_employee,
    update_employee,
    delete_employee
)

router = APIRouter(prefix="/admin/employees", tags=["Admin - Employees"])


@router.get("", response_model=EmployeeListResponse)
def list_employees(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    department: str = Query(None),
    search: str = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    skip = (page - 1) * page_size

    result = get_employees(
        db,
        skip=skip,
        limit=page_size,
        department=department,
        search=search
    )

    return {
        "total": result["total"],
        "page": page,
        "page_size": page_size,
        "employees": result["employees"]
    }


@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_employee_by_id(db, employee_id)


@router.post("", response_model=EmployeeResponse, status_code=201)
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_employee(db, employee)


@router.put("/{employee_id}", response_model=EmployeeResponse)
def edit_employee(
    employee_id: int,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return update_employee(db, employee_id, employee)


@router.delete("/{employee_id}")
def remove_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return delete_employee(db, employee_id)