from pydantic import BaseModel
from typing import Optional, List


class LeaderboardUser(BaseModel):
    """
    Schema representing a single leaderboard user.
    """

    rank: int
    id: int
    name: str
    department: str
    photo_url: Optional[str] = None
    points: int

    class Config:
        from_attributes = True  # Enables compatibility with SQLAlchemy models


class LeaderboardResponse(BaseModel):
    """
    Schema for leaderboard API response.
    """

    success: bool
    message: str
    data: List[LeaderboardUser]