from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, User, Base, engine
from auth import hash_password, verify_password, create_access_token, create_refresh_token
from pydantic import BaseModel

app = FastAPI()

class RegisterRequest(BaseModel):
    full_name: str
    username: str
    email: str
    department: str
    job_title: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/auth/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    user = User(
        full_name=req.full_name,
        username=req.username,
        email=req.email,
        department=req.department,
        job_title=req.job_title,
        hashed_password=hash_password(req.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created successfully"}

@app.post("/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {
        "access_token": create_access_token({"sub": user.email}),
        "refresh_token": create_refresh_token({"sub": user.email})
    }
