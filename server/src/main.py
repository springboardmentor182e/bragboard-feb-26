from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.database.database import engine, SessionLocal, Base
from src.entities.shoutout import Shoutout

# Create tables in PostgreSQL
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Backend with PostgreSQL is working"}

@app.get("/shoutouts")
def get_shoutouts(db: Session = Depends(get_db)):
    return db.query(Shoutout).all()

@app.post("/shoutouts")
def create_shoutout(data: dict, db: Session = Depends(get_db)):
    new_shoutout = Shoutout(
        sender=data["sender"],
        message=data["message"],
        department=data["department"],
        date=data["date"],
        status="Pending"
    )
    db.add(new_shoutout)
    db.commit()
    db.refresh(new_shoutout)
    return new_shoutout

@app.patch("/shoutouts/{id}/approve")
def approve_shoutout(id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()
    if shoutout:
        shoutout.status = "Approved"
        db.commit()
    return {"message": "Approved"}

@app.patch("/shoutouts/{id}/reject")
def reject_shoutout(id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()
    if shoutout:
        shoutout.status = "Rejected"
        db.commit()
    return {"message": "Rejected"}

@app.delete("/shoutouts/{id}")
def delete_shoutout(id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == id).first()
    if shoutout:
        db.delete(shoutout)
        db.commit()
    return {"message": "Deleted"}