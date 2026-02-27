import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend (Vite runs on 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to read our "JSON database"
def get_data():
    file_path = os.path.join(os.path.dirname(__file__), "shoutouts.json")
    with open(file_path, "r") as f:
        return json.load(f)

@app.get("/")
def root():
    return {"message": "FastAPI Backend Running 🚀"}

@app.get("/api/shoutouts")
def list_shoutouts():
    # Now reading from the JSON file!
    return get_data()