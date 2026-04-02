"""
Check if database has data
"""
import sys
sys.path.append('src')

from database.core import engine
from sqlalchemy.orm import Session
from entities.user import User

db = Session(bind=engine)

try:
    users = db.query(User).all()
    print(f"\n{'='*50}")
    print(f"Total users in database: {len(users)}")
    print(f"{'='*50}\n")
    
    if users:
        for user in users:
            print(f"ID: {user.id}")
            print(f"Name: {user.name}")
            print(f"Email: {user.email}")
            print(f"Role: {user.role}")
            print(f"Department: {user.department}")
            print(f"Active: {user.is_active}")
            print("-" * 50)
    else:
        print("⚠️  No users found in database!")
        print("\nRun this command to add sample data:")
        print("python init_db.py")
        
except Exception as e:
    print(f"❌ Error: {e}")
finally:
    db.close()
