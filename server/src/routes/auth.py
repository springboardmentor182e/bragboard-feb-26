from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas
from app.auth import create_access_token, create_refresh_token
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pw = pwd_context.hash(user.password)

    new_user = models.User(
        full_name=user.full_name,
        username=user.username,
        email=user.email,
        password=hashed_pw,
        department=user.department,
        job_title=user.job_title
    )

    db.add(new_user)
    db.commit()
    return {"message": "User created"}

@router.post("/login")
def login(data: schemas.LoginSchema, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == data.username).first()

    if not user or not pwd_context.verify(data.password, user.password):
        return {"error": "Invalid credentials"}

    access = create_access_token({"sub": user.username})
    refresh = create_refresh_token({"sub": user.username})

    return {"access_token": access, "refresh_token": refresh}