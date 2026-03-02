from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

# -----------------------------
# DATABASE CONFIG
# -----------------------------
DATABASE_URL = "postgresql://postgres:reshma894@localhost:5432/bragboard_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

app = FastAPI()

# -----------------------------
# CORS (Frontend Connection)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# USER MODEL
# -----------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    department = Column(String)
    role = Column(String)
    score = Column(Integer)
    badges = Column(Integer)

# -----------------------------
# FULL LEADERBOARD
# -----------------------------
@app.get("/leaderboard/full")
def get_full_leaderboard():
    db = SessionLocal()

    users = db.query(User).order_by(User.score.desc()).all()

    leaderboard = []
    for index, user in enumerate(users):
        trend = "up" if user.score >= 100 else "down"

        leaderboard.append({
            "rank": index + 1,
            "id": user.id,
            "name": user.name,
            "department": user.department,
            "points": user.score,
            "badges": user.badges,
            "trend": trend
        })

    db.close()
    return leaderboard

# -----------------------------
# TOP 3 USERS
# -----------------------------
@app.get("/leaderboard/top")
def get_top_three():
    db = SessionLocal()

    users = db.query(User).order_by(User.score.desc()).limit(3).all()

    top_three = []
    for index, user in enumerate(users):
        trend = "up" if user.score >= 100 else "down"

        top_three.append({
            "rank": index + 1,
            "id": user.id,
            "name": user.name,
            "department": user.department,
            "points": user.score,
            "badges": user.badges,
            "trend": trend
        })

    db.close()
    return top_three

# -----------------------------
# LEADERBOARD STATS
# -----------------------------
@app.get("/leaderboard/stats")
def get_stats():
    db = SessionLocal()

    users = db.query(User).all()

    total_users = len(users)

    total_score = sum(user.score for user in users)
    top_score = max((user.score for user in users), default=0)

    # ✅ ADD THIS LINE (IMPORTANT)
    total_badges = sum((user.badges for user in users), 0)

    # Growth logic
    growth_percent = (total_users // 10) * 2

    db.close()

    return {
        "top_score": top_score,
        "total_badges": total_badges,   # ✅ Added
        "total_users": total_users,
        "growth_percent": growth_percent
    }