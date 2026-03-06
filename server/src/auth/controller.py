from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.entities.user import User
from src.auth.utils import verify_password, create_access_token

router = APIRouter()


@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id, "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer"
    }