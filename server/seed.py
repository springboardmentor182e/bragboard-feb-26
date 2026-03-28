import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from src.database import DATABASE_URL, engine, Base
from src.models import User  # Registers model
from src.auth.jwt import get_password_hash

from sqlalchemy.orm import sessionmaker
import uuid

load_dotenv()

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def seed_admin():
    # Create tables if not exist
    # Base.metadata.create_all(bind=engine) # DB already created
    
    with Session() as db:
        # Check if admin exists
        admin = db.scalar(text("SELECT 1 FROM users WHERE email = :email"), {"email": "admin@gmail.com"})

        if admin:
            print("✓ Admin user already exists (admin@gmail.com), skipping seed.")
            return
        
        # Create admin
        hashed = get_password_hash("password")
        user_id = str(uuid.uuid4())
        db.execute(text("""
            INSERT INTO users (id, email, hashed_password, role, is_active, created_at) 
            VALUES (:id, :email, :hashed, :role, :active, datetime('now'))
        """), {
            "id": user_id,
            "email": "admin@gmail.com",
            "hashed": hashed,
            "role": "admin",
            "active": True
        })
        db.commit()
        print("✓ Admin user created: admin@gmail.com / password (role: admin)")

if __name__ == "__main__":
    seed_admin()
