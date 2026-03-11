# Getting Started with Real Database Backend

## Quick Start

### 1. Install Dependencies
```bash
cd c:\Users\mnsat\bragboard-feb-26\server
pip install -r requirements.txt
```

### 2. Seed the Database (First Time Only)
```bash
# From server directory
python -m src.dashboard.seeds
```

Output should show:
```
🌱 Starting database seed...
✓ Database initialized
✓ Seeded 10 users
✓ Seeded 8 badges
✓ Seeded 5 shoutouts
✓ Seeded 5 notifications
✓ Seeded 5 activities
✓ Seeded 3 campaigns

✅ Database seeding completed successfully!
```

### 3. Run the Server
```bash
# From server directory
python -m uvicorn src.main:app --reload
```

The server will:
- Automatically initialize database tables on startup
- Be available at http://localhost:8000
- API docs at http://localhost:8000/docs

### 4. Start the Frontend
```bash
cd c:\Users\mnsat\bragboard-feb-26\client
npm run dev
```

## What Changed?

### ✅ Removed
- All hardcoded mock data lists in `service.py`
- In-memory data storage

### ✅ Added  
- **Real SQLite Database**: Stores all data persistently
- **ORM Models**: Defines database schema with relationships
- **Service Layer**: All queries use real database
- **Automatic Initialization**: Database tables created on app startup
- **Seed Script**: Populate with initial data

### ✅ Preserved
- **Same API Endpoints**: All endpoints work exactly the same
- **Same Data Models**: Pydantic models unchanged
- **Same Functionality**: All features work with real data now

## File Structure

```
server/
├── src/
│   ├── database/
│   │   └── core.py              # Database setup & session management
│   └── dashboard/
│       ├── database_models.py   # SQLAlchemy ORM models (NEW)
│       ├── models.py            # Pydantic models (unchanged)
│       ├── service_new.py       # Service layer with DB queries (NEW)
│       ├── controller_new.py    # FastAPI routes (NEW)
│       ├── service.py           # Old mock service (deprecated)
│       ├── controller.py        # Old mock controller (deprecated)
│       └── seeds.py             # Database seeding script (NEW)
│   └── main.py                  # Updated to use new controller
├── bragboard.db                 # SQLite database file (created on first run)
└── MIGRATION.md                 # Detailed migration documentation
```

## Database File

The SQLite database is stored as `bragboard.db` in the server directory. 

To reset and start fresh:
```bash
# Delete the database file
rm bragboard.db

# Restart the server (will recreate empty database)
# Then seed it
python -m src.dashboard.seeds
```

## Testing the API

### Check if data is being saved
```bash
# Get all users
curl http://localhost:8000/api/dashboard/users

# Create a new shoutout (replaces in-memory with persistent storage)
curl -X POST http://localhost:8000/api/dashboard/shoutouts \
  -H "Content-Type: application/json" \
  -d '{"recipient_id": 1, "badge_id": 1, "message": "Great work!"}'

# Get all shoutouts
curl http://localhost:8000/api/dashboard/shoutouts
```

## Common Issues

### Issue: "ModuleNotFoundError: No module named 'sqlalchemy'"
**Solution**: 
```bash
pip install -r requirements.txt
```

### Issue: "Import error" when running seeds
**Solution**: Run from server directory with python -m:
```bash
cd server
python -m src.dashboard.seeds
```

### Issue: Database file locked / can't delete
**Solution**: Close all applications using the database first

### Issue: No data after startup
**Solution**: Manually seed the database:
```bash
python -m src.dashboard.seeds
```

## Next: Update Frontend (Optional)
The frontend should work as-is, but you can now:
- Clean up the frontend mock data files if they exist
- Add "Add New User" functionality
- Add "Create Campaign" forms
- Delete/Edit functionality for campaigns, users, etc.

They'll all be saved to the database now!

## Advanced: Custom Database Location

Set environment variable before running:

**Windows PowerShell:**
```powershell
$env:DATABASE_URL = "sqlite:///C:/custom/path/bragboard.db"
python -m uvicorn src.main:app --reload
```

**Windows CMD:**
```cmd
set DATABASE_URL=sqlite:///C:/custom/path/bragboard.db
python -m uvicorn src.main:app --reload
```

**Linux/Mac:**
```bash
export DATABASE_URL="sqlite:///./custom_bragboard.db"
python -m uvicorn src.main:app --reload
```

## Summary

✨ **You now have a real database backend!**

- Data persists between requests
- All API endpoints work with real data
- Database is automatically initialized
- Comes pre-populated with seed data
- Ready for production use

All endpoints continue to work exactly as before, but now with persistent storage! 🚀
