from fastapi import APIRouter, Depends
from .service import get_dashboard_data, get_all_users, update_user_role
from auth.service import get_current_user
from entities.user import RoleEnum

router = APIRouter(prefix="/admin", tags=["Admin"])

def admin_required(current_user = Depends(get_current_user)):
    if current_user.role != RoleEnum.admin:
        raise Exception("Admin access required")
    return current_user


@router.get("/dashboard")
def dashboard(user = Depends(admin_required)):
    return get_dashboard_data()


@router.get("/users")
def all_users(user = Depends(admin_required)):
    return get_all_users()


@router.put("/users/{user_id}/role")
def change_role(user_id: int, role: str,
                user = Depends(admin_required)):
    return update_user_role(user_id, role)
