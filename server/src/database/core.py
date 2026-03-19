from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os

# ✅ Load environment variables
load_dotenv()

# ✅ Get DB URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# ❗ Safety check (important)
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in .env file")

# ✅ Create engine (PostgreSQL)
engine = create_engine(
    DATABASE_URL,
    echo=True  # optional: shows SQL logs
)

# ✅ Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ✅ Base class
class Base(DeclarativeBase):
    pass


# ✅ Dependency for DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()