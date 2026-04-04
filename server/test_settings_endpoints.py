"""
Test Settings Endpoints with Authentication
"""
import requests
import json

API_URL = "http://127.0.0.1:8000"

def test_settings_endpoints():
    print("=" * 70)
    print("Testing Settings Endpoints with Authentication")
    print("=" * 70)
    
    # Step 1: Signup/Login to get token
    print("\n1️⃣  LOGIN to get authentication token...")
    login_data = {
        "email": "settingstest@example.com",
        "password": "Test123456"
    }
    
    try:
        # Try signup first
        signup_data = {
            "name": "Settings Test User",
            "email": "settingstest@example.com",
            "password": "Test123456",
            "department": "Engineering",
            "role": "Employee"
        }
        res = requests.post(f"{API_URL}/auth/signup", json=signup_data)
        print(f"   Signup Status: {res.status_code}")
        
        # Then login
        res = requests.post(f"{API_URL}/auth/login", json=login_data)
        print(f"   Login Status: {res.status_code}")
        data = res.json()
        token = data.get("access_token")
        
        if not token:
            print(f"   ❌ No token received: {data}")
            return
        
        print(f"   ✅ Token received: {token[:30]}...")
        headers = {"Authorization": f"Bearer {token}"}
        
        # Step 2: Get user settings
        print("\n2️⃣  GET /users/me/settings (fetch all settings)...")
        try:
            res = requests.get(f"{API_URL}/users/me/settings", headers=headers)
            print(f"   Status: {res.status_code}")
            if res.status_code == 200:
                settings = res.json()
                print(f"   ✅ Settings retrieved successfully")
                print(f"   Sample settings: email_notifications={settings.get('email_notifications')}, theme={settings.get('theme')}")
            else:
                print(f"   ❌ Failed: {res.json()}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Step 3: Update a setting
        print("\n3️⃣  PUT /users/me/settings/theme (update theme to 'light')...")
        try:
            res = requests.put(
                f"{API_URL}/users/me/settings/theme",
                json={"value": "light"},
                headers=headers
            )
            print(f"   Status: {res.status_code}")
            if res.status_code == 200:
                print(f"   ✅ Setting updated successfully")
                print(f"   Response: {res.json()}")
            else:
                print(f"   ❌ Failed: {res.json()}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Step 4: Update a boolean setting
        print("\n4️⃣  PUT /users/me/settings/email_notifications (toggle)...")
        try:
            res = requests.put(
                f"{API_URL}/users/me/settings/email_notifications",
                json={"value": False},
                headers=headers
            )
            print(f"   Status: {res.status_code}")
            if res.status_code == 200:
                print(f"   ✅ Boolean setting updated successfully")
                print(f"   Response: {res.json()}")
            else:
                print(f"   ❌ Failed: {res.json()}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Step 5: Change password
        print("\n5️⃣  POST /users/me/change-password...")
        try:
            res = requests.post(
                f"{API_URL}/users/me/change-password",
                json={
                    "old_password": "Test123456",
                    "new_password": "New123456"
                },
                headers=headers
            )
            print(f"   Status: {res.status_code}")
            if res.status_code == 200:
                print(f"   ✅ Password changed successfully")
                print(f"   Response: {res.json()}")
            else:
                print(f"   ❌ Failed: {res.json()}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    print("\n" + "=" * 70)
    print("✅ Settings endpoints test complete!")
    print("=" * 70)

if __name__ == "__main__":
    test_settings_endpoints()
