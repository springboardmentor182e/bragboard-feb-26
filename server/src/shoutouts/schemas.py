from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import List, Optional, Literal

CategoryType = Literal["Achievement", "Teamwork", "Innovation", "Support", "Leadership"]
ShoutoutStatusType = Literal["PENDING", "APPROVED", "REJECTED"]


class RecipientResponse(BaseModel):
    id: int
    name: str
    email: str
    department: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class UserInfoResponse(BaseModel):
    """User information (sender/recipient)"""
    id: int
    name: str
    email: Optional[str] = None
    department: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ReactionCountResponse(BaseModel):
    """Reaction counts by type"""
    like: int = 0
    clap: int = 0
    star: int = 0


class FeedItemResponse(BaseModel):
    """Shoutout feed item response"""
    id: int
    message: str
    category: CategoryType
    points: int
    status: ShoutoutStatusType
    created_at: datetime
    is_edited: bool = False
    edited_at: Optional[datetime] = None
    sender: UserInfoResponse
    recipients: List[UserInfoResponse]
    recipients_count: int
    reactions_count: ReactionCountResponse
    comments_count: int

    model_config = ConfigDict(from_attributes=True)


class ShoutOutCreate(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    category: CategoryType
    recipient_ids: List[int] = Field(..., min_items=1, max_items=10, description="List of user IDs to tag")
    points: int = Field(default=10, ge=1, le=100)


class ShoutOutResponse(BaseModel):
    id: int
    sender_id: int
    message: str
    category: CategoryType
    points: int
    status: ShoutoutStatusType
    created_at: datetime
    is_edited: bool = False
    edited_at: Optional[datetime] = None
    recipients: List[RecipientResponse]
    sender_name: Optional[str] = None
    reactions_count: Optional[dict] = None
    comments_count: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class ShoutOutDetailResponse(ShoutOutResponse):
    """Full shoutout response with all details"""
    pass


class BadgeResponse(BaseModel):
    """Badge information with unlock status"""
    id: int
    name: str
    description: str
    points_required: int
    icon: str
    unlocked: bool
    points_to_unlock: int

    model_config = ConfigDict(from_attributes=True)


class ProgressResponse(BaseModel):
    """User level progress with badges"""
    user_id: int
    current_level: int
    total_points: int
    points_to_next_level: int
    shoutouts_received: int
    badges: List[BadgeResponse]

    model_config = ConfigDict(from_attributes=True)
