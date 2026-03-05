from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="AnasAnsari@Sana7411g",
        database="bragboard"
    )

@app.get("/brags")
def get_brags():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM brags ORDER BY id DESC")
    result = cursor.fetchall()
    db.close()
    return result

@app.post("/brags")
def create_brag(brag: dict):
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO brags (author, content) VALUES (%s, %s)",
        (brag["author"], brag["content"])
    )
    db.commit()
    db.close()
    return {"message": "Brag created"}