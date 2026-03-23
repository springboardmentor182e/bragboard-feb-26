# BragBoard 🚀

A modern employee recognition and recognition platform. Follow these steps to get the app running locally.

## 1. Backend Setup (FastAPI)
Navigate to the `server` directory and set up the Python environment.

```bash
cd server
pip install -r requirements.txt
```

### Configure Environment
Create a `.env` file in the `server/` folder. You can use `.env.example` as a template:
```bash
cp .env.example .env
```
Default values for local development:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/database_name
```

### Seed the Database
Populate the database with initial dummy data (Users, Shout-outs):
```bash
python scripts/seed_db.py
```

### Run the Server
Start the backend API on `http://localhost:8000`:
```bash
python -m uvicorn src.main:app --reload
```

---

## 2. Frontend Setup (React + Vite)
Open a new terminal, navigate to the `client` directory, and install dependencies.

```bash
cd client
npm install
```

### Configure Environment
Create a `.env` file in the `client/` folder. You can use `.env.example` as a template:
```bash
cp .env.example .env
```
Default value for local development:
```env
VITE_API_URL=http://localhost:8000
```

### Run the App
Start the development server on `http://localhost:5173`:
```bash
npm run dev
```

---

## 3. Database Management
- **Seed Data**: `python scripts/seed_db.py` (inside `server/`)
- **Check Data**: `python scripts/check_db.py` (inside `server/`)
- **Database File**: The SQLite file `bragboard.db` is located in the project root.
