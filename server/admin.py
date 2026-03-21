from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/")
def admin_home():
    return {"message": "Admin panel working"}