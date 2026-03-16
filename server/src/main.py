from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import engine, Base, SessionLocal
from src.models import Employee
from src.achievements import router as achievements_router
from src.shoutouts import router as shoutouts_router
from src.employees import router as employees_router


def seed_employees():
    db = SessionLocal()
    try:
        if db.query(Employee).count() == 0:
            employees = [
                Employee(name="Rahul", department="Engineering"),
                Employee(name="Aman", department="AI"),
                Employee(name="Satyam", department="Backend"),
                Employee(name="Priya", department="Design"),
            ]
            db.add_all(employees)
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"[Seed Error] {e}")
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    seed_employees()
    yield
    # Shutdown (add cleanup here if needed)


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=False,                  # Set True only with explicit origins + auth
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(achievements_router)
app.include_router(shoutouts_router)
app.include_router(employees_router)