from pydantic import BaseModel
from datetime import datetime


class ReportCreate(BaseModel):
    shoutout_id: int
    reported_by: int
    reason: str
    description: str
    priority: str


class ReportResponse(BaseModel):
    id: int
    shoutout_id: int
    reported_by: int
    reason: str
    description: str
    priority: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True