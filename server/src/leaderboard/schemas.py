from pydantic import BaseModel
from typing import Literal, Optional

class LeaderboardUser(BaseModel):
    rank: int
    id: int
    full_name: str
    username: str
    email: str
    department: Optional[str] = None
    photo_url: Optional[str] = None
    points: int
    fire_badges: int = 0       # ✅ ADDED
    star_badges: int = 0       # ✅ ADDED
    thumb_badges: int = 0      # ✅ ADDED

    class Config:
        from_attributes = True

class BadgeRequest(BaseModel):
    badge_type: Literal["fire", "star", "thumb"]

class BadgeResponse(BaseModel):
    message: str
    user_id: int
    badge_type: str