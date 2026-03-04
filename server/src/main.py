from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="BragBoard Admin API")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the exact frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserBase(BaseModel):
    id: int
    name: str
    email: str
    role: str
    status: str

@app.get("/")
async def root():
    return {"message": "BragBoard Admin API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/users", response_model=List[UserBase])
async def get_users():
    return [
        {"id": 1, "name": "John Doe", "email": "john@example.com", "role": "User", "status": "Active"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "Editor", "status": "Inactive"},
        {"id": 3, "name": "Mike Johnson", "email": "mike@example.com", "role": "Admin", "status": "Active"},
    ]

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
