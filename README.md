# BragBoard - Employee Recognition Platform

## Quick Start

### Option 1: Run Everything at Once (Easiest)

Double-click: **`run.bat`**

This will:
- Start the backend server on http://localhost:8000
- Start the frontend server on http://localhost:3000
- Open two terminal windows

### Option 2: Run Manually

**Terminal 1 - Backend:**
```bash
cd server
uvicorn src.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/docs

## Login Credentials

**Admin Account:**
- Email: `admin@bragboard.com`
- Password: `admin123`

**Employee Account:**
- Email: `john@bragboard.com`
- Password: `password123`

## Features

✅ User Authentication (JWT)
✅ Employee Management (CRUD)
✅ Search Employees
✅ Filter by Department
✅ Pagination
✅ Role-based Access Control
✅ PostgreSQL Database

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend:**
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

## Project Structure

```
bragboard-feb-26/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app
│   └── package.json
│
├── server/                 # FastAPI Backend
│   ├── src/
│   │   ├── admin/         # Admin module
│   │   ├── auth/          # Authentication
│   │   ├── database/      # DB config
│   │   ├── entities/      # SQLAlchemy models
│   │   └── main.py        # FastAPI app
│   ├── .env               # Environment variables
│   └── requirements.txt
│
└── run.bat                # Quick start script
```

## Database Setup

The database is already configured with PostgreSQL.

**Connection String:**
```
postgresql://postgres:mahi@localhost:5432/bragboard
```

**To reset database:**
```bash
cd server
python init_db.py
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login and get JWT token

### Employee Management (Admin Only)
- `GET /admin/employees` - List all employees (with pagination, search, filter)
- `GET /admin/employees/{id}` - Get employee by ID
- `POST /admin/employees` - Create new employee
- `PUT /admin/employees/{id}` - Update employee
- `DELETE /admin/employees/{id}` - Delete employee

## Development

**Install Dependencies:**

Backend:
```bash
cd server
pip install -r requirements.txt
```

Frontend:
```bash
cd client
npm install
```

**Environment Variables:**

Edit `server\.env`:
```env
DATABASE_URL=postgresql://postgres:mahi@localhost:5432/bragboard
SECRET_KEY=your-secret-key
```

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Database connection error:**
- Ensure PostgreSQL is running
- Check password in `.env` file
- Verify database exists: `psql -U postgres -l`

**Module not found:**
```bash
# Backend
cd server
pip install -r requirements.txt

# Frontend
cd client
npm install
```

## Stop Servers

Press `Ctrl + C` in each terminal window, or close the terminal windows.

If using `run.bat`, press any key in the main window to stop all servers.

---

**Developed with FastAPI + React + PostgreSQL**
