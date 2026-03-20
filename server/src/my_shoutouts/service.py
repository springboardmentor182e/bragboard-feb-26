from sqlalchemy.orm import Session
from ..entities.shoutout import ShoutoutEntity

def _transform_shoutout(s):
    if s.badge is None:
        s.badge = {"label": ""}
    if s.reactions is None:
        s.reactions = {"hearts": 0, "claps": 0, "stars": 0, "comments": 0}
    elif 'comments' not in s.reactions:
        s.reactions['comments'] = 0
    return s

def get_shoutouts_given_by_user(db: Session, user: str):
    shoutouts = db.query(ShoutoutEntity).filter(ShoutoutEntity.author == user).all()
    return [_transform_shoutout(s) for s in shoutouts]

def get_shoutouts_received_by_user(db: Session, user: str):
    shoutouts = db.query(ShoutoutEntity).filter(ShoutoutEntity.recipient == user).all()
    return [_transform_shoutout(s) for s in shoutouts]
