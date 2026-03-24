from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import router
from src.database.core import Base, engine
from src.entities import user, shoutout, report
from src.admin.models import AdminReport, ActivityLog, DashboardStats, UserContribution
app = FastAPI(title="BragBoard API")

# Create tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "BragBoard API running 🚀"}