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
    comments: int
    shares: int
    created_at: datetime

    model_config = {"from_attributes": True}


class StatsOut(BaseModel):
    total_given: int
    total_received: int
    points_earned: int