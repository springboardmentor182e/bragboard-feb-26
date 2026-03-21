from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# DIRECT APPROACH: Sirf DATABASE_URL use karo (jo Render par set hai)
DATABASE_URL = os.getenv("DATABASE_URL")

# Agar DATABASE_URL nahi mila to LOCAL_DATABASE_URL try karo (local dev ke liye)
if DATABASE_URL is None:
    DATABASE_URL = os.getenv("LOCAL_DATABASE_URL")

# Agar kuch bhi nahi mila to error do
if DATABASE_URL is None:
    raise ValueError("Database URL not found. Set DATABASE_URL or LOCAL_DATABASE_URL")

# Create engine
engine = create_engine(DATABASE_URL)

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base model class
class Base(DeclarativeBase):
    pass

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()