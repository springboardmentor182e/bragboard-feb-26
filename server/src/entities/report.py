from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from src.database.core import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    # Display code like RPT-001
    report_code = Column(String, unique=True, index=True)

    shoutout_id = Column(Integer, nullable=False)

    reported_user = Column(String, nullable=False)
    reported_by = Column(String, nullable=False)

    reason = Column(String, nullable=False)
    description = Column(Text)

    priority = Column(String, default="LOW")
    status = Column(String, default="PENDING")

    created_at = Column(DateTime(timezone=True), server_default=func.now())