from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from src.auth.router import router as auth_router
from src.api import router as api_router
from src.database import Base, engine
import os

load_dotenv()

app = FastAPI(
    title="BragBoard API",
    description="Full-stack authentication API for BragBoard",
    version="1.0.0"
)

# Create tables (commented to avoid duplicate table error - use alembic upgrade head)
# Base.metadata.create_all(bind=engine)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv('CLIENT_ORIGINS', 'http://localhost:5173').split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/v1/auth")
app.include_router(api_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to BragBoard API 🚀",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}