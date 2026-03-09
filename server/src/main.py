from fastapi import FastAPI
from admin.controller import router as admin_router

app = FastAPI()

app.include_router(admin_router)
