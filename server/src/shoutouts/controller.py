from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.shoutouts import service
from src.shoutouts.models import ShoutoutCreate, ShoutoutOut, StatsOut, ReactionsOut

router = APIRouter(prefix="/shoutouts", tags=["shoutouts"])


def _to_out(s) -> ShoutoutOut:
    return ShoutoutOut(
        id=s.id,
        teammate=s.teammate,
        badge=s.badge,
        campaign=s.campaign,
        message=s.message,
        points=s.points,
        reactions=ReactionsOut(
            like=s.reactions_like,
            star=s.reactions_star,
            clap=s.reactions_clap,
        ),
        createdAt=s.created_at.strftime("%m/%d/%Y, %I:%M:%S %p"),
    )


@router.post("", response_model=ShoutoutOut, status_code=201)
def create(body: ShoutoutCreate, db: Session = Depends(get_db)):
    return _to_out(service.create_shoutout(db, body))


@router.get("", response_model=list[ShoutoutOut])
def list_all(db: Session = Depends(get_db)):
    return [_to_out(s) for s in service.get_all_shoutouts(db)]


@router.get("/stats", response_model=StatsOut)
def stats(db: Session = Depends(get_db)):
    return service.get_stats(db)