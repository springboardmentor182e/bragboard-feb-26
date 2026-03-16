import sys
import os

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.database.core import engine
from sqlalchemy.orm import Session
from src.entities.user import User

print("Testing database connection...")

try:
    db = Session(bind=engine)
    
    # Count users
    count = db.query(User).count()
    print(f"\n✅ Database connected successfully!")
    print(f"Total users in database: {count}\n")
    
    # List all users
    users = db.query(User).all()
    
    if users:
        print("Users in database:")
        print("-" * 60)
        for user in users:
            print(f"ID: {user.id} | Name: {user.name} | Email: {user.email}")
            print(f"Role: {user.role} | Department: {user.department}")
            print("-" * 60)
    else:
        print("❌ No users found!")
        print("\nRun this to add users:")
        print("python init_db.py")
    
    db.close()
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    print("\nMake sure:")
    print("1. PostgreSQL is running")
    print("2. Database 'bragboard' exists")
    print("3. Password in .env is correct")
