"""
Test script to verify auth flow is working
"""
import requests
import json

API_URL = "http://127.0.0.1:8000"

def test_signup_login():
    print("=" * 60)
    print("Testing Auth Flow")
    print("=" * 60)
    
    # Test 1: Signup
    print("\n1️⃣ Testing SIGNUP...")
    signup_data = {
        "name": "John Doe",
        "email": "john@test.com",
        "password": "Test123456",
        "department": "Engineering",
        "role": "Employee"
    }
    
    try:
        res = requests.post(f"{API_URL}/auth/signup", json=signup_data)
        print(f"   Status: {res.status_code}")
        print(f"   Response: {res.json()}")
        
        if res.status_code in [200, 201]:
            signup_token = res.json().get("access_token")
            print(f"   ✅ Signup successful, token: {signup_token[:20] if signup_token else 'None'}...")
        else:
            print(f"   ❌ Signup failed")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Test 2: Login
    print("\n2️⃣ Testing LOGIN...")
    login_data = {
        "email": "john@test.com",
        "password": "Test123456"
    }
    
    try:
        res = requests.post(f"{API_URL}/auth/login", json=login_data)
        print(f"   Status: {res.status_code}")
        print(f"   Response: {res.json()}")
        
        if res.status_code in [200, 201]:
            login_token = res.json().get("access_token")
            print(f"   ✅ Login successful, token: {login_token[:20] if login_token else 'None'}...")
            
            # Test 3: Get current user
            print("\n3️⃣ Testing GET /auth/me...")
            try:
                res = requests.get(
                    f"{API_URL}/auth/me",
                    headers={"Authorization": f"Bearer {login_token}"}
                )
                print(f"   Status: {res.status_code}")
                print(f"   Response: {res.json()}")
                print(f"   ✅ Get user successful")
            except Exception as e:
                print(f"   ❌ Error: {e}")
        else:
            print(f"   ❌ Login failed")
    except Exception as e:
        print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    test_signup_login()
