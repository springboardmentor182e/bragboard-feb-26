from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from src.database.core import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    shoutout_id = Column(Integer)
    reported_by = Column(Integer)

    reason = Column(String)
    description = Column(String)

    priority = Column(String, default="LOW")
    status = Column(String, default="PENDING")

    created_at = Column(DateTime, default=datetime.utcnow)

    # ✅ NEW FIELD to track when the report was resolved
    resolved_at = Column(DateTime, nullable=True)