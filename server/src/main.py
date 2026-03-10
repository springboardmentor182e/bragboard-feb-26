from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI(title="Leaderboard")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PostgreSQL connection
conn = psycopg2.connect(
    database="bragboard_db",
    user="postgres",
    password="reshma894",
    host="localhost",
    port="5432"
)

@app.get("/")
def home():
    return {"message": "Leaderboard API Running"}

# FULL LEADERBOARD
@app.get("/leaderboard/full")
def get_full_leaderboard():

    cur = conn.cursor()

    cur.execute("""
        SELECT id,rank,employee,department,points,badges,trend
        FROM leaderboard
        ORDER BY points DESC
    """)

    rows = cur.fetchall()

    result = []

    for r in rows:
        result.append({
            "id": r[0],
            "rank": r[1],
            "name": r[2],        # employee name
            "department": r[3],
            "points": r[4],
            "badges": r[5],
            "trend": r[6]
        })

    return result


# TOP 3 USERS
@app.get("/leaderboard/top")
def get_top():

    cur = conn.cursor()

    cur.execute("""
        SELECT id,rank,employee,department,points,badges,trend
        FROM leaderboard
        ORDER BY points DESC
        LIMIT 3
    """)

    rows = cur.fetchall()

    result = []

    for r in rows:
        result.append({
            "id": r[0],
            "rank": r[1],
            "name": r[2],
            "department": r[3],
            "points": r[4],
            "badges": r[5],
            "trend": r[6]
        })

    return result


# STATS
@app.get("/leaderboard/stats")
def get_stats():

    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM leaderboard")
    total_users = cur.fetchone()[0]

    cur.execute("SELECT SUM(points) FROM leaderboard")
    total_points = cur.fetchone()[0]

    return {
        "total_users": total_users,
        "total_points": total_points
    }