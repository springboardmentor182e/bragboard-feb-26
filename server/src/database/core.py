from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os
import socket
# Load environment variables
load_dotenv()

# Get database URL from .env
# Agar Render pe deploy hai to RENDER_DATABASE_URL use karo
if os.getenv("RENDER"):  # Render apne aap "RENDER" environment variable set karta hai
    DATABASE_URL = os.getenv("RENDER_DATABASE_URL")
else:
    # Local development mein LOCAL_DATABASE_URL use karo
    DATABASE_URL = os.getenv("LOCAL_DATABASE_URL", "postgresql://postgres:postbyme@localhost:5432/bb_admindash_db")
# Add error handling to see what's happening
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set")
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