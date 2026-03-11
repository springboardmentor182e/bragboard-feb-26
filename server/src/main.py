from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .dashboard.controller_new import router as dashboard_router
from .database.core import init_db, SessionLocal
from .dashboard.database_models import UserDB

app = FastAPI(
    title="Employee Dashboard API",
    description="Backend API for Employee Recognition Dashboard",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables on startup
@app.on_event("startup")
async def startup_event():
    """Initialize database and seed data on application startup"""
    init_db()
    
    # Check if data exists, if not seed it
    db = SessionLocal()
    try:
        if not db.query(UserDB).first():
            # Database is empty, seed it
            from .dashboard.seeds import (
                seed_users, seed_badges, seed_shoutouts, 
                seed_notifications, seed_activities, seed_campaigns
            )
            print("\n🌱 Seeding database with initial data...")
            seed_users(db)
            seed_badges(db)
            seed_shoutouts(db)
            seed_notifications(db)
            seed_activities(db)
            seed_campaigns(db)
            print("✅ Database seeding completed!")
    finally:
        db.close()

# Include dashboard routes
app.include_router(dashboard_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Employee Dashboard API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

