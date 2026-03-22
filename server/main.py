from fastapi import FastAPI
from .database import Base, engine
from .routes import auth_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_routes.router, prefix="/auth")