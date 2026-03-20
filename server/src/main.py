from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from employeedashboard.brag import router as brag_router
from auth.controller import router as auth_router
from database.core import get_db

app = FastAPI(
    title="PrackBoard API",
    description="Backend API for PrackBoard application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(brag_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to PrackBoard API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}