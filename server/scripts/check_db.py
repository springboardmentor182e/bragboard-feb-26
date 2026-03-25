import sys
import os

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sqlalchemy.orm import Session
from src.database.core import SessionLocal
from src.entities.user import User
from src.entities.shoutout import Shoutout

def check_data():
    db = SessionLocal()
    try:
        user_count = db.query(User).count()
        shoutout_count = db.query(Shoutout).count()
        print(f"Users in DB: {user_count}")
        print(f"Shoutouts in DB: {shoutout_count}")
        
        users = db.query(User).all()
        for u in users:
            print(f"User: {u.name} (ID: {u.id})")
            
        leaderboard_data = db.query(Shoutout).all()
        for s in leaderboard_data:
            print(f"Shoutout: From {s.sender_id} to {s.receiver_id}, Points: {s.points}")
            
    finally:
        db.close()

if __name__ == "__main__":
    check_data()
