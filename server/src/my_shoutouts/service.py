from sqlalchemy.orm import Session
from ..entities.shoutout import ShoutoutEntity

def get_shoutouts_given_by_user(db: Session, user: str):
    return db.query(ShoutoutEntity).filter(ShoutoutEntity.author == user).all()

def get_shoutouts_received_by_user(db: Session, user: str):
    return db.query(ShoutoutEntity).filter(ShoutoutEntity.recipient == user).all()
