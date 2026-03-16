from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db

from src.shoutouts import service
from src.shoutouts.models import ShoutoutOut, StatsOut, ShoutoutCreate
from src.shoutouts.service import (
    get_all_shoutouts,
    create_shoutout,
    delete_shoutout,
)

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])


# -------- Employee MyShoutouts APIs --------

@router.get("/received", response_model=list[ShoutoutOut])
def received(db: Session = Depends(get_db)):
    return service.get_received(db)


@router.get("/given", response_model=list[ShoutoutOut])
def given(db: Session = Depends(get_db)):
    return service.get_given(db)


@router.get("/stats", response_model=StatsOut)
def stats(db: Session = Depends(get_db)):
    return service.get_stats(db)


# -------- General CRUD APIs --------

@router.get("/")
def get_shoutouts(db: Session = Depends(get_db)):
    return get_all_shoutouts(db)


@router.post("/")
def add_shoutout(shoutout: ShoutoutCreate, db: Session = Depends(get_db)):
    return create_shoutout(db, shoutout)


@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    return delete_shoutout(db, id)