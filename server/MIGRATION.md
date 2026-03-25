# Mock Data to Real Database Migration Guide

## Overview
This document explains the migration from mock/hardcoded data to a real SQLite database backend.

## Changes Made

### 1. **New Files Created**

#### Database Models (`src/dashboard/database_models.py`)
- SQLAlchemy ORM models for all entities:
  - `UserDB`: Team members with points, badges, and metrics
  - `BadgeDB`: Recognition badges
  - `ShoutoutDB`: Recognition messages between employees
  - `NotificationDB`: User notifications
  - `ActivityDB`: Recent activity feed
  - `CampaignDB`: Campaigns and initiatives
- All models include timestamps (`created_at`, `updated_at`)
- Proper relationship definitions for data integrity

#### Database Core (`src/database/core.py`)
- SQLAlchemy engine and session configuration
- SQLite database setup (default: `bragboard.db`)
- `get_db()`: FastAPI dependency injection for database sessions
- `init_db()`: Initialize database tables on startup
- `drop_db()`: Drop all tables (for development/testing)

#### New Service Layer (`src/dashboard/service_new.py`)
- `DashboardService` class with all business logic
- All methods now accept `db: Session` parameter for database access
- Methods perform actual database queries instead of returning mock data:
  - User management (CRUD operations)
  - Badge management
  - Shoutout creation and reactions
  - Notifications
  - Activities
  - Analytics calculations
  - Leaderboard rankings
  - Campaign management

#### New Controller (`src/dashboard/controller_new.py`)
- Updated FastAPI routes using the new service
- Database dependency injection with `Depends(get_db)`
- Helper function `_shoutout_db_to_model()` for converting DB objects to API models
- Helper function `_get_time_ago()` for relative time formatting

#### Seed Data Script (`src/dashboard/seeds.py`)
- `seeds.py`: Populates database with initial mock data
- Can be run independently to reset the database
- Includes all original mock data (10 users, 8 badges, 5 shoutouts, etc.)
- Safely checks if data exists before seeding

### 2. **Updated Files**

#### Main Application (`src/main.py`)
```python
# Now:
- Imports new controller_new instead of old controller
- Initializes database on startup via @app.on_event("startup")
- All routes use real database instead of mock data
```

### 3. **Deprecated Files** (Still present, not used)
- `src/dashboard/service.py` - Old mock data service
- `src/dashboard/controller.py` - Old mock data controller

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
pip install -r requirements.txt
```

### 2. Initialize Database (on first run)
The database is automatically initialized when the application starts via the `startup_event()` in `main.py`.

### 3. Seed Initial Data
```bash
# From the server directory
python -m src.dashboard.seeds
```

This will:
- Create database tables if they don't exist
- Populate with 10 users, 8 badges, 5 shoutouts, etc.
- Skip seeding if data already exists

### 4. Run the Application
```bash
# From the server directory
python -m uvicorn src.main:app --reload
```

## Database Schema

### Tables

#### users
- `id` (Primary Key)
- `name`, `role`, `department`, `avatar`
- `shout_outs`, `claps`, `stars`, `points` (metrics)
- `created_at`, `updated_at` (timestamps)

#### badges
- `id` (Primary Key)
- `emoji`, `name`, `description`
- `awarded` (count)
- `created_at` (timestamp)

#### shoutouts
- `id` (Primary Key)
- `sender_id`, `recipient_id` (Foreign Keys)
- `badge_id` (Foreign Key)
- `message` (text content)
- `heart_reactions`, `thumbs_up_reactions`, `star_reactions`, `comment_reactions`
- `created_at`, `updated_at` (timestamps)

#### notifications
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `text`, `read` (boolean)
- `created_at` (timestamp)

#### activities
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `text`
- `created_at` (timestamp)

#### campaigns
- `id` (Primary Key)
- `title`, `description`, `icon`
- `progress`, `participants` (metrics)
- `ends_in_days` (duration)
- `created_at`, `updated_at` (timestamps)

## Key API Differences

### Before (Mock Data)
```python
@router.get("/users")
async def get_users():
    return dashboard_service.get_all_users()  # Returns from memory
```

### After (Real Data)
```python
@router.get("/users")  
async def get_users(db: Session = Depends(get_db)):
    users = dashboard_service.get_all_users(db)  # Queries database
    return [models.User.model_validate(user) for user in users]
```

Key differences:
- All service methods now accept `db: Session` parameter
- Database queries are lazy - only fetch when needed
- Data persists between requests
- Supports filtering, searching, and sorting via database

## Analytics Calculations

Analytics now computed from real data:

```python
# Total Shout-Outs: Count of all shoutouts
SELECT COUNT(*) FROM shoutouts

# Total Reactions: Sum of all reaction types
SELECT SUM(heart_reactions + thumbs_up_reactions + star_reactions + comment_reactions) 
FROM shoutouts

# Active Users: Count of all users
SELECT COUNT(*) FROM users

# Top Contributors: Users sorted by number of sent shoutouts
SELECT name, COUNT(shoutouts.id) as shoutout_count
FROM users LEFT JOIN shoutouts ON users.id = shoutouts.sender_id
GROUP BY users.id
ORDER BY shoutout_count DESC
```

## Environment Variables

### DATABASE_URL
Set custom database location:
```bash
# SQLite
DATABASE_URL=sqlite:///./custom_db.db

# PostgreSQL  
DATABASE_URL=postgresql://user:password@localhost/dbname

# MySQL
DATABASE_URL=mysql+pymysql://user:password@localhost/dbname
```

Default: `sqlite:///./bragboard.db`

## Development Tips

### View SQL Queries (Debug)
In `src/database/core.py`:
```python
engine = create_engine(DATABASE_URL, echo=True)  # Set echo=True
```

### Reset Database
```python
from src.database.core import drop_db, init_db, SessionLocal
from src.dashboard.seeds import main as seed_main

drop_db()
init_db()
db = SessionLocal()
seed_main()
```

### Query Data Directly
```python
from src.database.core import SessionLocal
from src.dashboard.database_models import UserDB

db = SessionLocal()
users = db.query(UserDB).all()
for user in users:
    print(f"{user.name}: {user.points} points")
db.close()
```

## Migration Checklist

- [x] Created SQLAlchemy ORM models for all entities
- [x] Set up database connection and session management
- [x] Refactored service layer to use real database
- [x] Updated controller to inject database sessions
- [x] Created seed data script
- [x] Updated main application entry point
- [x] Added automatic database initialization on startup
- [ ] Update frontend to handle new API changes (if any)
- [ ] Deploy database to production environment
- [ ] Set up database backups
- [ ] Monitor database performance

## Troubleshooting

### Database file not found
- Check `DATABASE_URL` environment variable
- Ensure write permissions in the directory
- SQLite will auto-create the file on first run

### Import errors
- Ensure you're running from the `server` directory
- Use `python -m` to run scripts from root
- Python path should include the `src` directory

### Seed script fails
- Database might already have data
- Try running `drop_db()` first
- Check database file isn't locked by another process

### Data not persisting
- Verify `init_db()` is called in startup event
- Check database file exists and is writable
- Ensure transactions are committed (done automatically)

## Next Steps

1. **Add User Authentication**: Link notifications/activities to logged-in user
2. **Pagination**: Add limit/offset to list endpoints
3. **Filtering**: Advanced filter support (date ranges, departments, etc.)
4. **Soft Deletes**: Archive instead of permanently deleting
5. **Database Migrations**: Use Alembic for schema versioning
6. **Performance**: Add database indexes on frequently queried columns
7. **Caching**: Redis cache for expensive queries
8. **Data Validation**: Add more database constraints and validators
