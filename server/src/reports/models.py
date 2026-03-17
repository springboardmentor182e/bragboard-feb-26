from pydantic import BaseModel


class ReportCreate(BaseModel):
    shoutout_id: int
    reported_user: str
    reported_by: str
    reason: str
    description: str
    priority: str = "LOW"


class ReportResponse(BaseModel):
    id: int
    report_code: str

    shoutout_id: int
    reported_user: str
    reported_by: str

    reason: str
    description: str

    priority: str
    status: str

    class Config:
        from_attributes = True