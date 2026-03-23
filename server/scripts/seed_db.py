import sys
import os

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sqlalchemy.orm import Session
from src.database.core import SessionLocal, engine, Base
from src.entities.user import User
from src.entities.shoutout import Shoutout
# from src.auth.utils import hash_password
from datetime import datetime

def dummy_hash(password):
    return f"hashed_{password}"

def seed():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if we already have users
        if db.query(User).count() > 0:
            print("Database already seeded.")
            return

        print("Seeding database...")
        
        # Create Dummy Users
        users = [
            User(name="Jessica Park", email="jessica@example.com", department="Engineering", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="David Kim", email="david@example.com", department="Design", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="Michael Rodriguez", email="michael@example.com", department="Engineering", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="Rachel Anderson", email="rachel@example.com", department="Customer Success", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="Marcus Johnson", email="marcus@example.com", department="Data & Analytics", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="Emily Chen", email="emily@example.com", department="Marketing", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="Alex Thompson", email="alex@example.com", department="Customer Success", role="Employee", status="Active", password=dummy_hash("123456")),
            User(name="Alex Cooper", email="admin@example.com", department="Product Design", role="Admin", status="Active", password=dummy_hash("admin123")),
        ]
        
        db.add_all(users)
        db.commit()
        
        # Refresh to get IDs
        for u in users:
            db.refresh(u)
            
        # Mapping names to users for easier shoutout creation
        u_map = {u.name: u for u in users}
        admin = u_map["Alex Cooper"]
        
        # Create Dummy Shoutouts
        shoutouts = [
            # Received by Alex Cooper
            Shoutout(sender_id=u_map["Jessica Park"].id, 
                     receiver_id=admin.id, 
                     message="Alex has been an incredible mentor this quarter. Their guidance on the new architecture design helped our entire team level up.", 
                     category="Innovation Star", 
                     points=100, 
                     status="APPROVED"),
            Shoutout(sender_id=u_map["Michael Rodriguez"].id, 
                     receiver_id=admin.id, 
                     message="Alex went the extra mile to ensure our campaign launch was perfect.", 
                     category="Going Above & Beyond", 
                     points=100, 
                     status="APPROVED"),
            
            # Others to build leaderboard
            Shoutout(sender_id=admin.id, receiver_id=u_map["Jessica Park"].id, message="Great job on the frontend!", category="Team Player", points=150, status="APPROVED"),
            Shoutout(sender_id=admin.id, receiver_id=u_map["Jessica Park"].id, message="Always helpful!", category="Innovation Star", points=120, status="APPROVED"),
            Shoutout(sender_id=u_map["David Kim"].id, receiver_id=u_map["Jessica Park"].id, message="Thanks for the review", category="Problem Solver", points=80, status="APPROVED"),
            
            Shoutout(sender_id=admin.id, receiver_id=u_map["David Kim"].id, message="Amazing designs!", category="Data Wizard", points=200, status="APPROVED"),
            Shoutout(sender_id=u_map["Michael Rodriguez"].id, receiver_id=u_map["David Kim"].id, message="Solid work", category="Team Player", points=50, status="APPROVED"),
            
            Shoutout(sender_id=admin.id, receiver_id=u_map["Michael Rodriguez"].id, message="Solid backend work!", category="Problem Solver", points=180, status="APPROVED"),
        ]
        
        db.add_all(shoutouts)
        db.commit()
        print("Seeding completed successfully! 🚀")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
