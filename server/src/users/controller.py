from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_users():
    return [
        {"id": 1, "name": "Sarah Chen", "role": "Admin"},
        {"id": 2, "name": "David Kim", "role": "Manager"},
    ]