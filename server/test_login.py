import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.database.core import engine
from sqlalchemy.orm import Session
from src.entities.user import User
from src.auth.service import verify_password, create_access_token

print("Testing login functionality...\n")

try:
    db = Session(bind=engine)
    
    # Test credentials
    email = "admin@bragboard.com"
    password = "admin123"
    
    print(f"Attempting login with: {email}")
    
    # Find user
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        print("❌ User not found!")
    else:
        print(f"✅ User found: {user.name}")
        print(f"   Role: {user.role}")
        print(f"   Active: {user.is_active}")
        
        # Verify password
        if verify_password(password, user.password):
            print("✅ Password verified!")
            
            # Create token
            token = create_access_token(data={"sub": str(user.id)})
            print(f"✅ Token created successfully!")
            print(f"\nToken: {token[:50]}...")
            
            print("\n✅ Login test PASSED!")
        else:
            print("❌ Password verification failed!")
    
    db.close()
    
except Exception as e:
    print(f"\n❌ Error during login test: {e}")
    import traceback
    traceback.print_exc()
