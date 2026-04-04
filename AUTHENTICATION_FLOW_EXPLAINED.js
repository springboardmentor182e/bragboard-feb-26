/**
 * COMPLETE SETTINGS AUTHENTICATION FLOW
 * 
 * This explains step-by-step how the authentication works for settings
 */

// ============================================
// STEP 1: USER LOGS IN
// ============================================
// User enters email + password → clicks Login

// In AuthContext.jsx:
const login = async (form) => {
  const res = await loginUser(form);  // POST /auth/login
  const token = res.access_token;     // Get token from backend
  
  // ✅ SAVE TOKEN IN LOCALSTORAGE
  localStorage.setItem("token", token);  // This is KEY!
  
  const userData = await getMe(token);   // Get user data
  setUser(userData);                     // Save to state
  
  return userData;  // Redirect to settings page
};

// ============================================
// STEP 2: USER NAVIGATES TO SETTINGS PAGE
// ============================================
// User clicks Settings in sidebar → EmployeeSettings.jsx loads

// In EmployeeSettings.jsx:
useEffect(() => {
  const fetchSettings = async () => {
    // This calls settingsService.getUserSettings()
    // WITHOUT passing token explicitly!
    const data = await settingsService.getUserSettings();
    setSettings(data);
  };
  fetchSettings();
}, []);

// ============================================
// STEP 3: AXIOS INTERCEPTOR ADDS TOKEN
// ============================================
// The magic happens here! In api.js:

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// THIS INTERCEPTOR RUNS ON EVERY REQUEST:
API.interceptors.request.use(
  (config) => {
    // ✅ READ TOKEN FROM LOCALSTORAGE
    const token = localStorage.getItem('token');
    
    if (token) {
      // ✅ ADD TOKEN TO REQUEST HEADER
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;  // Send request with token!
  },
  (error) => Promise.reject(error)
);

// So when settingsService.getUserSettings() calls:
// API.get('/users/me/settings')

// It AUTOMATICALLY becomes:
// GET /users/me/settings
// Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// ============================================
// STEP 4: BACKEND VERIFIES TOKEN
// ============================================
// Backend receives request with Authorization header

// In users/controller.py:
@router.get("/me/settings", response_model=models.UserSettingsResponse)
async def get_user_settings(
    current_user: User = Depends(get_current_user),  // ← Checks header!
    db: Session = Depends(get_db)
):
    # The get_current_user dependency:
    # 1. Extracts token from Authorization header
    # 2. Decodes JWT token
    # 3. Verifies signature
    # 4. Gets user from database
    # 5. Returns user object OR throws 401 Unauthorized
    
    user_settings = service.get_user_settings(db, current_user.id)
    return user_settings

// In auth/dependencies.py:
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials  # ← Gets token from header
    
    try:
        # Decode and verify JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Get user from database
        user = db.query(User).filter(User.id == payload["user_id"]).first()
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user  # ← Return authenticated user
        
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

// ============================================
// STEP 5: SETTINGS RETURNED
// ============================================
// Backend returns all user settings:
// {
//   "email_notifications": true,
//   "theme": "dark",
//   "timezone": "UTC",
//   ... all 17 settings
// }

// Frontend receives and displays in EmployeeSettings.jsx

// ============================================
// STEP 6: USER CHANGES A SETTING
// ============================================
// User toggles "Email Notifications" → clicks/it auto-saves

// In EmployeeSettings.jsx:
const handleToggle = async (key) => {
  const newValue = !settings[key];
  setSettings(prev => ({ ...prev, [key]: newValue }));
  
  try {
    // This calls settingsService.updateUserSetting()
    // WITHOUT passing token!
    await settingsService.updateUserSetting(key, newValue);
    
    setSuccess("✓ Setting saved");
  } catch (err) {
    setError("Failed to save");
    setSettings(prev => ({ ...prev, [key]: !newValue }));  // Rollback
  }
};

// ============================================
// STEP 7: TOKEN ADDED AGAIN (AUTOMATICALLY)
// ============================================
// settingsService.updateUserSetting() calls:
// API.put('/users/me/settings/email_notifications', { value: false })

// The SAME INTERCEPTOR runs again:
// ✅ Reads token from localStorage
// ✅ Adds Authorization header
// ✅ Becomes: PUT /users/me/settings/email_notifications
//            Header: Authorization: Bearer eyJhbGc...

// ============================================
// STEP 8: BACKEND UPDATES SETTING
// ============================================
// In users/controller.py:
@router.put("/me/settings/{setting_key}")
async def update_user_setting(
    setting_key: str,
    request: models.SettingUpdateRequest,
    current_user: User = Depends(get_current_user),  // ← Token verified again
    db: Session = Depends(get_db)
):
    success, response = service.update_single_setting(
        db,
        current_user.id,  // ← We KNOW who the user is from token!
        setting_key,
        request.value
    )
    return response

// ============================================
// KEY POINTS
// ============================================

// 1. TOKEN IS STORED IN LOCALSTORAGE
//    - Set during login
//    - Persists across page refreshes
//    - Lives until user logs out

// 2. AXIOS INTERCEPTOR IS AUTOMATIC
//    - Runs BEFORE every API request
//    - Adds Authorization header with token
//    - You don't need to do anything!

// 3. BACKEND VALIDATES TOKEN
//    - Uses get_current_user dependency
//    - Decodes JWT
//    - Verifies user exists
//    - Returns 401 if invalid

// 4. EVERY REQUEST IS AUTHENTICATED
//    - Login ✅
//    - Get settings ✅
//    - Update settings ✅
//    - Change password ✅
//    - Admin settings ✅

// ============================================
// WHAT CAN GO WRONG & HOW TO FIX
// ============================================

// ❌ Error: "Not authenticated"
// → User is not logged in
// → localStorage.getItem('token') returns null
// → Interceptor doesn't add header
// → Backend returns 401
// ✅ FIX: User needs to login first

// ❌ Error: "Invalid token"
// → Token is expired
// → Token is corrupted
// → Secret key on backend doesn't match
// ✅ FIX: User needs to logout and login again

// ❌ Error: "User not found"
// → Token is valid but user deleted from DB
// ✅ FIX: This is rare, backend returns 401

// ============================================
// TESTING THE FLOW
// ============================================

// 1. Open browser DevTools → Application → Local Storage
//    → You should see "token" with a long string value

// 2. Try to update a setting
//    → Check Network tab
//    → Click on the request (e.g., PUT /users/me/settings/theme)
//    → Look at Request Headers
//    → You should see: Authorization: Bearer eyJhbGc...

// 3. If Authorization header is MISSING
//    → localStorage.getItem('token') is failing
//    → Check if user is actually logged in
//    → Check if token was saved correctly

// 4. If Authorization header is PRESENT but still 401
//    → Token is invalid or expired
//    → Secret key mismatch
//    → User doesn't exist in database

console.log("✅ Now you understand the complete flow!");
