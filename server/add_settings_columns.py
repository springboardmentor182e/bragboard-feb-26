"""
Database migration script to add settings columns to User table and create AdminSettings table.
Run this before testing the Settings module.
"""

import sys
import os

# Add server directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import sessionmaker
from src.database.core import engine, Base
from src.entities.user import User
from src.entities.admin_settings import AdminSettings


def migrate_tables():
    """Create all tables using SQLAlchemy"""
    try:
        print("Creating all tables via SQLAlchemy...")
        # Create ALL tables defined in Base.metadata
        Base.metadata.create_all(engine)
        print("✓ All tables created successfully")
        
        return True
        
    except Exception as e:
        print(f"Error creating tables: {e}")
        import traceback
        traceback.print_exc()
        return False


def initialize_admin_settings():
    """Initialize default admin settings if the table is empty"""
    try:
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Check if admin settings already exist
        existing = session.query(AdminSettings).first()
        
        if not existing:
            print("\nInitializing default admin settings...")
            default_settings = AdminSettings(
                password_min_length=8,
                require_special_chars=True,
                email_system_enabled=True,
                shoutout_daily_limit=10,
                shoutout_weekly_limit=50,
                session_timeout_minutes=60,
                max_login_attempts=5
            )
            session.add(default_settings)
            session.commit()
            print("✓ Default admin settings created")
        else:
            print("\n⊘ Admin settings already exist, skipping initialization")
        
        session.close()
        return True
        
    except Exception as e:
        print(f"Error initializing admin settings: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    print("=" * 60)
    print("Database Migration: Settings Module")
    print("=" * 60)
    
    # Step 1: Create/migrate tables
    print("\nStep 1: Creating/verifying tables...")
    success1 = migrate_tables()
    
    # Step 2: Initialize default admin settings
    print("\nStep 2: Initializing admin settings...")
    success2 = initialize_admin_settings()
    
    print("\n" + "=" * 60)
    if success1 and success2:
        print("✓ Migration completed successfully!")
        print("=" * 60)
    else:
        print("✗ Migration failed. Check errors above.")
        print("=" * 60)
        sys.exit(1)
