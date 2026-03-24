import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:reshma894@localhost:5432/reports_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
