import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from typing import Generator

# Load from environment variable, fallback to local SQLite for dev
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./bragboard.db")

# For SQLite only: disable same-thread check (needed for FastAPI)
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()


# Dependency — inject this into route handlers via FastAPI's Depends()
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()