from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.users.controller import router as users_router

app = FastAPI(title="BragBoard API")

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)

@app.get("/")
def root():
    return {"message": "BragBoard Backend Running"}