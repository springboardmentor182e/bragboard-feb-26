"""
Add settings columns to existing users table
Run this to migrate the schema without dropping data
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import text
from src.database.core import engine
from sqlalchemy.orm import sessionmaker
from src.entities.user import User
from src.entities.admin_settings import AdminSettings

def add_missing_columns():
    """Add missing settings columns to users table"""
    
    with engine.connect() as conn:
        # Get list of existing columns
        query = text("""
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = 'users'
        """)
        existing_columns = {row[0] for row in conn.execute(query)}
        
        # Define columns to add
        columns_to_add = [
            ("email_notifications", "BOOLEAN DEFAULT TRUE"),
            ("push_notifications", "BOOLEAN DEFAULT TRUE"),
            ("shoutout_alerts", "BOOLEAN DEFAULT TRUE"),
            ("comment_alerts", "BOOLEAN DEFAULT TRUE"),
            ("mention_alerts", "BOOLEAN DEFAULT TRUE"),
            ("theme", "VARCHAR DEFAULT 'dark'"),
            ("compact_mode", "BOOLEAN DEFAULT FALSE"),
            ("font_size", "VARCHAR DEFAULT 'medium'"),
            ("language", "VARCHAR DEFAULT 'English'"),
            ("timezone", "VARCHAR DEFAULT 'UTC'"),
            ("date_format", "VARCHAR DEFAULT 'MM/DD/YYYY'"),
            ("time_format", "VARCHAR DEFAULT '12-hour'"),
            ("week_start", "VARCHAR DEFAULT 'Monday'"),
            ("currency", "VARCHAR DEFAULT 'USD'"),
            ("two_factor_enabled", "BOOLEAN DEFAULT FALSE"),
            ("session_timeout", "INTEGER DEFAULT 30"),
            ("login_alerts_enabled", "BOOLEAN DEFAULT TRUE"),
            ("password_changed_at", "TIMESTAMP NULL"),
        ]
        
        # Add missing columns
        for col_name, col_def in columns_to_add:
            if col_name not in existing_columns:
                try:
                    alter_query = text(f"ALTER TABLE users ADD COLUMN {col_name} {col_def}")
                    conn.execute(alter_query)
                    conn.commit()
                    print(f"✓ Added column: {col_name}")
                except Exception as e:
                    print(f"✗ Error adding {col_name}: {e}")
                    conn.rollback()
            else:
                print(f"⊘ Column {col_name} already exists")

def create_admin_settings_table():
    """Create admin_settings table if it doesn't exist"""
    try:
        Base = User.__class__.__bases__[0]
        AdminSettings.__table__.create(engine, checkfirst=True)
        print("✓ Admin settings table ready")
    except Exception as e:
        print(f"✗ Error creating admin_settings: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("Database Migration: Add Settings Columns")
    print("=" * 60)
    
    print("\nAdding missing columns to users table...")
    add_missing_columns()
    
    print("\nCreating admin_settings table...")
    create_admin_settings_table()
    
    print("\n" + "=" * 60)
    print("✓ Migration completed!")
    print("=" * 60)
