# Detailed Steps to Solve 22 Problems (Lint/Issues in Open Tabs)

## Current Status
- Merge conflicts resolved (TODO 1-7 ✅)
- Git clean
- Servers likely start, but auth 404 due to path mismatch

## Step-by-step Fixes

### 8. [ ] Fix API endpoint mismatch (critical)
- Client uses `/auth/*` 
- Server: `/api/v1/auth/*`
- Edit client/src/features/authentication/services/login.js, signupApi.js: change '/auth/' -> '/api/v1/auth/'
- Edit api.js interceptor '/auth/refresh' -> '/api/v1/auth/refresh'

### 9. [ ] Remove duplicate controller.py
- Delete server/src/auth/controller.py (redundant with router.py)

### 10. [ ] Fix lint/type errors
- cd client && npm run lint -- --fix
- cd server && black src/ && isort src/

### 11. [ ] Update deprecated code
- database.py: SQLAlchemy 2.0 registry
- schemas.py: pure v2 if needed

### 12. [ ] git add . && git commit -m \"Fix 22 issues: API paths, duplicates, lint\"

### 13. [ ] Test
- cd server && uvicorn src.main:app --reload
- cd ../client && npm run dev
- Test login employee/admin, signup

### 14. [ ] Complete
