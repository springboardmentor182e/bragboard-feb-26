from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ==============================
# USER SCHEMAS
# ==============================

class UserBase(BaseModel):
    name: str
    department: str
    photo_url:Optional[str]=None


class UserResponse(UserBase):
    id: int
    points: int
    photo_url: Optional[str] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None


# ==============================
# SHOUTOUT SCHEMAS
# ==============================

class ShoutoutResponse(BaseModel):
    id: int
    message: str
    points: int
    receiver_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ==============================
# LEADERBOARD SCHEMA
# ==============================

class LeaderboardUser(BaseModel):
    rank: int
    id: int
    name: str
    department: str
    photo_url: Optional[str] = None
    points: int

   