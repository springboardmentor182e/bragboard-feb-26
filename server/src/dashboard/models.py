from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


# User/Team Member Models
class UserBase(BaseModel):
    name: str
    role: str
    department: str
    avatar: str


class User(UserBase):
    id: int
    shout_outs: int = 0
    claps: int = 0
    stars: int = 0
    points: int = 0

    class Config:
        from_attributes = True


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    avatar: Optional[str] = None
    shout_outs: Optional[int] = None
    claps: Optional[int] = None
    stars: Optional[int] = None
    points: Optional[int] = None


# Badge Models
class BadgeBase(BaseModel):
    emoji: str
    name: str
    description: str
    awarded: int = 0


class Badge(BadgeBase):
    id: int

    class Config:
        from_attributes = True


class BadgeCreate(BadgeBase):
    pass


# Shoutout Models
class Recipient(BaseModel):
    name: str


class BadgeInfo(BaseModel):
    emoji: str
    label: str


class Sender(BaseModel):
    name: str
    role: str
    avatar: str


class Reactions(BaseModel):
    heart: int = 0
    thumbs_up: int = 0
    star: int = 0
    comment: int = 0


class Comment(BaseModel):
    id: int
    author: str
    avatar: str
    text: str
    created_at: datetime

    class Config:
        from_attributes = True


class ShoutoutBase(BaseModel):
    message: str


class Shoutout(ShoutoutBase):
    id: int
    sender_id: int
    sender: Sender
    recipient: Recipient
    badge: BadgeInfo
    time_ago: str
    reactions: Reactions
    comments: list[Comment] = []

    class Config:
        from_attributes = True


class ShoutoutCreate(BaseModel):
    recipient_id: int
    badge_id: int
    message: str


class CommentCreate(BaseModel):
    text: str


# Notification Models
class Notification(BaseModel):
    id: int
    text: str
    read: bool = False

    class Config:
        from_attributes = True


# Activity Models
class Activity(BaseModel):
    id: int
    user_id: int
    text: str
    time_ago: str

    class Config:
        from_attributes = True


# Analytics Models
class AnalyticsMetric(BaseModel):
    label: str
    value: str
    trend: str
    icon_key: str
    card_variant: str


class TopContributor(BaseModel):
    name: str
    value: int


class DepartmentEngagement(BaseModel):
    name: str
    value: int
    color: str


# Leaderboard Models
class LeaderboardStat(BaseModel):
    label: str
    value: str
    sub: str
    variant: str


class TopPerformer(BaseModel):
    rank: int
    name: str
    score: int
    department: str
    badges: int


class FullRanking(BaseModel):
    rank: int
    name: str
    department: str
    points: int
    badges: int
    trend: str
    avatar: str


# Campaign Models
class Campaign(BaseModel):
    id: int
    title: str
    description: str
    progress: int
    participants: int
    ends_in: str
    icon: str

    class Config:
        from_attributes = True

