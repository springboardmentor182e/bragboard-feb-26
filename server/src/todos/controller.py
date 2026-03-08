from fastapi import APIRouter, Depends
from auth.dependencies import verify_token

router = APIRouter()

@router.get("/protected")
def protected(user=Depends(verify_token)):

    return {
        "message": "You are logged in",
        "user": user
    }