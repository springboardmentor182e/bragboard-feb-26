import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.database.core import engine
from sqlalchemy.orm import Session
from src.entities.user import User

print("Fixing is_active NULL values...\n")

try:
    db = Session(bind=engine)
    
    # Find users with NULL is_active
    users_with_null = db.query(User).filter(User.is_active == None).all()
    
    if users_with_null:
        print(f"Found {len(users_with_null)} users with NULL is_active")
        
        for user in users_with_null:
            print(f"  Fixing: {user.name} ({user.email})")
            user.is_active = True
        
        db.commit()
        print("\n✅ All users fixed!")
    else:
        print("✅ No NULL values found. All users have is_active set.")
    
    # Verify
    all_users = db.query(User).all()
    print(f"\nVerifying all {len(all_users)} users:")
    for user in all_users:
        status = "✅" if user.is_active is not None else "❌"
        print(f"{status} {user.name}: is_active = {user.is_active}")
    
    db.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
