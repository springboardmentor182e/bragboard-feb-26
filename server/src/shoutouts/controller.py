from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.shoutouts import service
from src.shoutouts.models import ShoutoutOut, StatsOut

router = APIRouter(prefix="/employee/shoutouts", tags=["shoutouts"])


@router.get("/received", response_model=list[ShoutoutOut])
def received(db: Session = Depends(get_db)):
    return service.get_received(db)


@router.get("/given", response_model=list[ShoutoutOut])
def given(db: Session = Depends(get_db)):
    return service.get_given(db)


@router.get("/stats", response_model=StatsOut)
def stats(db: Session = Depends(get_db)):
    return service.get_stats(db)