from pydantic import BaseModel
from datetime import datetime


class ShoutoutCreate(BaseModel):
    sender_name: str
    receiver_name: str
    badge: str
    campaign: str | None = None
    message: str


class ShoutoutOut(BaseModel):
    id: int
    sender_name: str
    receiver_name: str
    badge: str
    campaign: str | None
    message: str
    level: int
    likes: int
    stars: int
    claps: int
    comments: int
    shares: int
    created_at: datetime

    model_config = {"from_attributes": True}


class StatsOut(BaseModel):
    total_given: int
    total_received: int
    points_earned: int


class CommentCreate(BaseModel):
    author_name: str
    content: str


class CommentOut(BaseModel):
    id: int
    shoutout_id: int
    author_name: str
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}