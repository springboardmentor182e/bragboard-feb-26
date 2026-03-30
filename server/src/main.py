from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router
from .database.core import Base, engine
from .entities import user, shoutout, shoutout_recipient, report, reaction, comment
from .admin.models import AdminReport, ActivityLog, DashboardStats, UserContribution
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