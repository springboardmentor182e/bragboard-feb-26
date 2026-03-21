"""
Database initialization script for BragBoard
Run this to create all database tables
"""

import sys
import os

# Add the parent directory to path so Python can find the 'src' module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from src.database.core import engine, Base
    from src.entities.user import User
    from src.admin.models import Report, ActivityLog, DashboardStats
    
    print("✓ Successfully imported all models")
    print(f"✓ Database path: {engine.url}")
    
    # Create all tables
    print("\nCreating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created successfully!")
    
    # Show where the database file is
    db_file = os.path.join(os.path.dirname(__file__), "bragboard.db")
    if os.path.exists(db_file):
        print(f"✓ Database file created at: {db_file}")
    else:
        print("! Database file not found yet (will be created when first used)")
        
except ImportError as e:
    print(f"✗ Import Error: {e}")
    print("\nMake sure you have:")
    print("1. Activated the virtual environment")
    print("2. Installed all requirements: pip install -r requirements.txt")
    print("3. Created all the necessary Python files in the src folder")
    
except Exception as e:
    print(f"✗ Error: {e}")