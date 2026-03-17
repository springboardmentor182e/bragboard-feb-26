# Quick Start Guide - No PostgreSQL Required

## Use SQLite for Testing (No Installation Needed)

### 1. Update database configuration

Edit `server\src\database\core.py` and change line 10 to:

```python
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./bragboard.db")
```

And add this after line 12:

```python
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
```

### 2. Update .env file

Edit `server\.env`:

```env
DATABASE_URL=sqlite:///./bragboard.db
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Install dependencies

```bash
cd server
pip install -r requirements.txt
```

### 4. Initialize database

```bash
python init_db.py
```

### 5. Start server

```bash
uvicorn src.main:app --reload --port 8000
```

### 6. Start frontend

Open new terminal:

```bash
cd client
npm run dev
```

### 7. Access application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/docs

### 8. Login

- Email: `admin@bragboard.com`
- Password: `admin123`

---

## Switch to PostgreSQL Later

When ready for production:

1. Install PostgreSQL
2. Create database: `CREATE DATABASE bragboard;`
3. Update `.env`: `DATABASE_URL=postgresql://postgres:password@localhost:5432/bragboard`
4. Run: `python init_db.py`

Done!
