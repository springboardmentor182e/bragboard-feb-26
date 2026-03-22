from fastapi import FastAPI
from src.routes import auth
from src.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)