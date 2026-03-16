from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:jeevan@localhost:5432/bragboard_db"
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# .env file load karo
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
# Pehle .env se URL lene ki koshish karo, nahi to default use karo
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postbyme@localhost:5432/bb_admindash_db")
# SQLite ke liye special argument
connect_args = {}
# if DATABASE_URL.startswith("sqlite"):
#     connect_args = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()