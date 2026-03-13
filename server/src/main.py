from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.admin.controller import router as admin_router
from src.auth.controller import router as auth_router

from src.database.core import engine
from src.entities.user import Base

app = FastAPI(title="BragBoard API", version="1.0.0")

# Create tables in database
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(admin_router)