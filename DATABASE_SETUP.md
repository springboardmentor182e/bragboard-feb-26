# Database Setup Guide

## Prerequisites
- PostgreSQL installed on your system
- Python 3.8+ with pip
- Node.js 16+ with npm

## Step-by-Step Setup

### 1. Install PostgreSQL

**Windows:**
```bash
# Download from: https://www.postgresql.org/download/windows/
# During installation, set a password for 'postgres' user
```

**Verify installation:**
```bash
psql --version
```

### 2. Create Database

**Option A: Using psql command line**
```bash
# Open Command Prompt or PowerShell
psql -U postgres

# In psql prompt:
CREATE DATABASE bragboard;
\q
```

**Option B: Using pgAdmin**
- Open pgAdmin
- Right-click on "Databases"
- Select "Create" → "Database"
- Name: `bragboard`
- Click "Save"

### 3. Configure Environment Variables

```bash
cd server
cp .env.example .env
```

Edit `.env` file and update:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/bragboard
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### 4. Install Python Dependencies

```bash
cd server
pip install -r requirements.txt
```

### 5. Initialize Database

```bash
# From server directory
python init_db.py
```

This will:
- Create all necessary tables
- Create an admin user
- Create sample employees

### 6. Start Backend Server

```bash
cd server
uvicorn src.main:app --reload --port 8000
```

Server will run at: http://localhost:8000

### 7. Install Frontend Dependencies

```bash
cd client
npm install
```

### 8. Start Frontend

```bash
cd client
npm run dev
```

Frontend will run at: http://localhost:3000

## Default Credentials

After running `init_db.py`, you can login with:

**Admin Account:**
- Email: `admin@bragboard.com`
- Password: `admin123`

**Employee Account:**
- Email: `john@bragboard.com`
- Password: `password123`

## Verify Setup

1. Open browser: http://localhost:3000
2. You should see the Employee Management page
3. Backend API docs: http://localhost:8000/docs

## Troubleshooting

### Database Connection Error
```
sqlalchemy.exc.OperationalError: could not connect to server
```

**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Verify password is correct
- Ensure database `bragboard` exists

### Port Already in Use
```
Error: Port 8000 is already in use
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use different port
uvicorn src.main:app --reload --port 8001
```

### Module Not Found Error
```
ModuleNotFoundError: No module named 'passlib'
```

**Solution:**
```bash
pip install -r requirements.txt
```

## Database Management

### View Tables
```bash
psql -U postgres -d bragboard
\dt
```

### View Users
```sql
SELECT id, name, email, role, department FROM users;
```

### Reset Database
```bash
# Drop and recreate
psql -U postgres
DROP DATABASE bragboard;
CREATE DATABASE bragboard;
\q

# Re-initialize
python init_db.py
```

## Production Deployment

For production:

1. Change `SECRET_KEY` to a secure random string
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Use a production database (not localhost)
5. Set `DEBUG=False`
6. Configure proper CORS origins

## Need Help?

Check the API documentation at: http://localhost:8000/docs
