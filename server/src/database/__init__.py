import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load env variables
load_dotenv()

# Get DB URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine (NO connect_args for PostgreSQL)
engine = create_engine(DATABASE_URL)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class
Base = declarative_base()

# Dependency (used in routes)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()