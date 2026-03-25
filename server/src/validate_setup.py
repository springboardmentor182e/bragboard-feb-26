"""
Quick validation script to check if the database setup works
Run with: python -m src.validate_setup
"""

import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

def check_imports():
    """Verify all imports work correctly"""
    print("Checking imports...")
    try:
        from src.database.core import engine, SessionLocal, init_db, get_db
        print("  ✓ Database core imports OK")
        
        from src.dashboard.database_models import (
            UserDB, BadgeDB, ShoutoutDB, NotificationDB, ActivityDB, CampaignDB
        )
        print("  ✓ Database models imports OK")
        
        from src.dashboard.service_new import DashboardService
        print("  ✓ Service layer imports OK")
        
        from src.dashboard.controller_new import router
        print("  ✓ Controller imports OK")
        
        from src.main import app
        print("  ✓ Main app imports OK")
        
        return True
    except Exception as e:
        print(f"  ✗ Import error: {e}")
        import traceback
        traceback.print_exc()
        return False


def check_database():
    """Verify database initialization works"""
    print("\nChecking database setup...")
    try:
        from src.database.core import init_db, SessionLocal, engine
        from src.dashboard.database_models import UserDB
        
        # Initialize database
        init_db()
        print("  ✓ Database tables created")
        
        # Test session
        db = SessionLocal()
        count = db.query(UserDB).count()
        db.close()
        print(f"  ✓ Database session works ({count} users in DB)")
        
        return True
    except Exception as e:
        print(f"  ✗ Database error: {e}")
        import traceback
        traceback.print_exc()
        return False


def check_routes():
    """Verify FastAPI routes are registered"""
    print("\nChecking FastAPI routes...")
    try:
        from src.main import app
        
        routes = [route.path for route in app.routes]
        
        # Check key routes exist
        key_routes = [
            "/api/dashboard/users",
            "/api/dashboard/badges",
            "/api/dashboard/shoutouts",
            "/api/dashboard/notifications",
            "/api/dashboard/activities",
            "/api/dashboard/campaigns",
        ]
        
        missing = []
        for route in key_routes:
            if not any(route in r for r in routes):
                missing.append(route)
        
        if missing:
            print(f"  ⚠ Missing routes: {missing}")
            return False
        else:
            print(f"  ✓ All key routes registered ({len(routes)} total routes)")
            return True
            
    except Exception as e:
        print(f"  ✗ Route check error: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Run all checks"""
    print("\n" + "="*50)
    print("BRAGBOARD DATABASE SETUP VALIDATION")
    print("="*50 + "\n")
    
    results = {
        "Imports": check_imports(),
        "Database": check_database(),
        "Routes": check_routes(),
    }
    
    print("\n" + "="*50)
    print("VALIDATION SUMMARY")
    print("="*50)
    
    for check, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{check}: {status}")
    
    all_passed = all(results.values())
    
    print("\n" + "="*50)
    if all_passed:
        print("✅ ALL CHECKS PASSED!")
        print("\nNext steps:")
        print("1. Run: python -m src.dashboard.seeds")
        print("2. Run: python -m uvicorn src.main:app --reload")
    else:
        print("❌ SOME CHECKS FAILED!")
        print("\nPlease fix the errors above and try again.")
    print("="*50 + "\n")
    
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())
