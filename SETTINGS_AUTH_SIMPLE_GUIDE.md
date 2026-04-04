# HOW SETTINGS AUTHENTICATION WORKS - SIMPLE GUIDE

## The Quick Version 🚀

1. **You log in** → Backend gives you a secret token (JWT)
2. **Token is saved** in browser's localStorage
3. **You go to Settings** → Frontend wants to load your settings
4. **Magic interceptor** automatically adds your token to the request
5. **Backend checks token** → "Yep, this is you! Here are your settings"
6. **Settings display** → You can now change them
7. **When you change a setting** → Magic interceptor adds token AGAIN
8. **Backend updates** → "Yep, still you! Setting updated"

## Visual Flow

```
LOGIN SCREEN
    ↓
[Enter email & password]
    ↓
Backend: "Login successful! Here's your token: eyJhbGc..."
    ↓
Frontend: "Got it! Saving to localStorage 💾"
localStorage = { token: "eyJhbGc..." }
    ↓
Click "Go to Settings"
    ↓
EmployeeSettings.jsx renders
    ↓
useEffect runs: settingsService.getUserSettings()
    ↓
🛡️ INTERCEPTOR: "I need to add the token to this request"
    Reads from localStorage: token = "eyJhbGc..."
    Adds to request header: Authorization: Bearer eyJhbGc...
    ↓
Backend receives:
    GET /users/me/settings
    Header: Authorization: Bearer eyJhbGc...
    ↓
Backend: "Let me check this token..."
    Decodes it...
    Finds user in database...
    ✓ Token is valid!
    ✓ User exists!
    ↓
Backend: "Here are your settings:"
    Returns: {
      email_notifications: true,
      theme: "dark",
      timezone: "UTC",
      ... all 17 settings
    }
    ↓
Frontend receives settings
    ✓ Displays in Settings page
    ↓
[User clicks toggle for "Email Notifications"]
    ↓
Frontend: "Okay, updating to false"
    Optimistic update (UI changes immediately)
    ↓
settingsService.updateUserSetting("email_notifications", false)
    ↓
PUT /users/me/settings/email_notifications
Body: { value: false }
    ↓
🛡️ INTERCEPTOR RUNS AGAIN: "Adding token to this request too"
    Adds: Authorization: Bearer eyJhbGc...
    ↓
Backend receives:
    PUT /users/me/settings/email_notifications
    Body: { value: false }
    Header: Authorization: Bearer eyJhbGc...
    ↓
Backend: "Token check passed... updating database"
    Updates user: SET email_notifications = false
    ↓
Backend: "Done! Here's confirmation:"
    Returns: {
      success: true,
      updated_field: "email_notifications",
      new_value: false
    }
    ↓
Frontend receives
    ✓ Shows toast: "✓ Setting saved"
    ↓
DONE! ✅
```

## The 3 Magic Ingredients 🪄

### Ingredient 1️⃣: localStorage (Browser's Memory)
```javascript
// When user logs in:
localStorage.setItem('token', 'eyJhbGc5NiIsInR5cCI6IkpXVCJ9...');

// This token stays there even if you:
// ✓ Refresh the page
// ✓ Close DevTools
// ✓ Wait an hour
// It only goes away when:
// ✗ User logs out
// ✗ Browser localStorage is cleared
// ✗ Token expires (usually 30 days)
```

### Ingredient 2️⃣: Axios Interceptor (Auto Token Adder)
```javascript
// In api.js:
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// This runs BEFORE EVERY API CALL
// So you never have to manually add the token!
```

### Ingredient 3️⃣: Backend JWT Validation (Token Checker)
```python
# In dependencies.py:
def get_current_user(credentials):
    token = credentials.credentials  # From Authorization header
    
    try:
        payload = jwt.decode(token, SECRET_KEY)  # Verify token
        user = db.query(User).filter(...).first()  # Find user
        return user  # ✅ User is authenticated!
    except:
        raise HTTPException(401, "Invalid token")  # ❌ Not authenticated
```

## Testing it Works Step-by-Step 🧪

### Test 1: Check token exists
```
1. Open browser to http://localhost:5174
2. Login with your credentials
3. Press F12 (open DevTools)
4. Go to "Application" tab
5. Click "Local Storage"
6. Look for item named "token"
7. It should have a long string value like:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...

✅ If you see this → Token is saved!
❌ If you don't see it → Not logged in
```

### Test 2: Check token is sent with settings request
```
1. Stay in DevTools
2. Go to "Network" tab
3. Go to Settings page
4. Look for request: PUT users/me/settings/... (when you change a setting)
5. Click on it
6. Go to "Headers" tab
7. Scroll down to "Request Headers"
8. Look for: Authorization: Bearer eyJhbGc...

✅ If you see this → Interceptor is working!
❌ If you don't see it → Interceptor not added, refresh page
```

### Test 3: Check backend accepts the request
```
1. Still looking at that request in Network tab
2. Look at the Response Status (top of the request)
3. Check these:

Status 200 →  ✅ SUCCESS! Backend updated your setting
Status 201 →  ✅ SUCCESS! Backend created your setting
Status 400 →  ❓ Your setting value is invalid (e.g., theme='invalid')
Status 401 →  ❌ Token not sent or invalid (check test 2)
Status 403 →  ❌ You're not admin (for /admin/settings)
Status 404 →  ❌ Endpoint not found (check URL)
```

### Test 4: Check response body
```
1. In the same Network request
2. Go to "Response" tab
3. Look for:

SUCCESS looks like:
  {
    "success": true,
    "updated_field": "email_notifications",
    "new_value": false,
    "message": "Setting updated successfully"
  }

ERROR looks like:
  { "detail": "Invalid or expired token" }
  { "detail": "User not found" }
  { "detail": "Invalid setting value" }
```

## If Something Goes Wrong 🚨

### Problem: "Not authenticated" error when changing settings

**Possible causes:**
1. Token not in localStorage
2. Token not sent in request header
3. Token is expired
4. Backend can't verify token

**How to fix:**
```
1. Logout (go to settings, click logout)
2. Close all tabs
3. Open fresh browser tab
4. Go to http://localhost:5174
5. Login again with valid credentials
6. Refresh page (Ctrl+Shift+R)
7. Go to Settings
8. Try changing setting again
```

### Problem: Authorization header missing from request

**Possible causes:**
1. Vite dev server didn't reload after code change
2. Browser cache not cleared
3. api.js interceptor code didn't load

**How to fix:**
```
1. Stop Vite dev server (Ctrl+C)
2. npm run dev (restart)
3. Clear browser cache:
   - Press Ctrl+Shift+Delete
   - Click "Cookies and cached images"
   - Choose "All time"
   - Click "Clear"
4. Refresh page (Ctrl+Shift+R)
5. Try again
```

### Problem: Settings load but can't update

**Possible causes:**
1. Backend restarted and JWT secret changed
2. Database connection lost
3. User deleted from database

**How to fix:**
```
1. Check backend server logs (terminal running uvicorn)
2. Logout and login again
3. Restart backend: stop uvicorn, run python run_server.py
4. Try again
```

## Summary: Why This Is Secure 🔒

1. **Token is not in URL** → Can't be found in browser history
2. **Token is not in HTML/CSS** → Can't be found in page source
3. **Token is only in localStorage** → Only your script can read it
4. **Token is only in Authorization header** → Only your browser reads it
5. **Token is verified on backend** → Can't be faked or stolen
6. **Every request needs token** → One request without it fails

## In One Sentence 📝

**When you login, you get a secret key (token) → You save it → Before every Settings request, you automatically add it → Backend checks it's real → If real, you can see/change settings → If fake/missing, you get 401 Unauthorized.**

---

That's it! Now you know how it works! 🎉
