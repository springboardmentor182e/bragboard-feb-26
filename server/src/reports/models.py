from pydantic import BaseModel, ConfigDict, Field, field_validator
from datetime import datetime
from typing import Optional, Literal


# Valid report reasons
VALID_REPORT_REASONS = Literal[
    "Spam",
    "Harassment",
    "Inappropriate",
    "Offensive Language",
    "Plagiarism",
    "Other",
]

# Valid priority levels
VALID_PRIORITIES = Literal["LOW", "HIGH", "CRITICAL"]


class ReportCreate(BaseModel):
    shoutout_id: int
    reported_by: int
    reason: VALID_REPORT_REASONS = Field(..., description="Category of report")
    description: str = Field(..., min_length=15, max_length=500, description="Detailed explanation (15-500 characters)")
    priority: VALID_PRIORITIES = Field(default="LOW", description="Priority level: LOW, HIGH, or CRITICAL")

    @field_validator("description")
    @classmethod
    def validate_description(cls, v):
        """Ensure description is not just whitespace"""
        if not v or not v.strip():
            raise ValueError("Description cannot be empty or whitespace")
        if len(v.strip()) < 15:
            raise ValueError("Description must be at least 15 characters")
        return v.strip()


class ReportResponse(BaseModel):
    id: int
    shoutout_id: int
    reported_by: int
    reason: str
    description: str
    priority: str
    status: str
    created_at: datetime

    resolved_at: Optional[datetime]
    model_config = ConfigDict(from_attributes=True)