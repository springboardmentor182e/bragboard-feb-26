from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class ShoutoutBase(BaseModel):
    sender_id: int
    receiver_id: int
    message: str
    category: str
    points: int = 0


class ShoutoutCreate(ShoutoutBase):
    pass


class UserSummary(BaseModel):
    id: int
    name: str
    department: Optional[str]
    role: Optional[str]

    class Config:
        from_attributes = True


class ShoutoutResponse(ShoutoutBase):
    id: int
    status: str
    created_at: datetime
    sender: UserSummary
    receiver: UserSummary

    class Config:
        from_attributes = True


class LeaderboardEntry(BaseModel):
    id: int
    name: str
    department: Optional[str]
    role: Optional[str]
    points: int
    rank: Optional[int] = None
