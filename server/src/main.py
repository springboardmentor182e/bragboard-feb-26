from contextlib import asynccontextmanager
import importlib.util, sys, os

# --- Direct file imports to avoid folder/file name conflicts ---
def load(name, filepath):
    spec = importlib.util.spec_from_file_location(name, filepath)
    mod  = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod
    spec.loader.exec_module(mod)
    return mod

_base = os.path.dirname(__file__)

db         = load("src.database_mod",   os.path.join(_base, "database.py"))
models     = load("src.models",         os.path.join(_base, "models.py"))
employees  = load("src.employees",      os.path.join(_base, "employees.py"))
shoutouts  = load("src.shoutouts_mod",  os.path.join(_base, "shoutouts.py"))
achievements = load("src.achievements", os.path.join(_base, "achievements.py"))
comments   = load("src.comments",       os.path.join(_base, "comments.py"))

engine    = db.engine
Base      = db.Base
SessionLocal = db.SessionLocal
Employee  = models.Employee

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def seed_employees():
    sess = SessionLocal()
    try:
        if sess.query(Employee).count() == 0:
            sess.add_all([
                Employee(name="Rahul",  department="Engineering"),
                Employee(name="Aman",   department="AI"),
                Employee(name="Satyam", department="Backend"),
                Employee(name="Priya",  department="Design"),
            ])
            sess.commit()
    except Exception as e:
        sess.rollback()
        print(f"[Seed Error] {e}")
    finally:
        sess.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed_employees()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(achievements.router)
app.include_router(shoutouts.router)
app.include_router(employees.router)
app.include_router(comments.router)