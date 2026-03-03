# Bragboard-jan-26

# BragBoard - Shoutout Management

A full-stack employee recognition platform built with React, FastAPI, and PostgreSQL.

## 🚀 Features
- **Live Shoutouts**: CRUD operations persisted to PostgreSQL.
- **Dynamic Dashboard**: Real-time stats (Total, Reactions, Pinned, Active).
- **Moderation**: Pin, Edit, and Bulk Delete functionalities.
- **Search & Filter**: Search by name/message and filter by Department/Status.

## 🛠️ Setup

### 1. Database (PostgreSQL)
- Create a database named `bragboard_db`.
- Configure your credentials in `server/.env`.

### 2. Backend (FastAPI)
```bash
cd server
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```
*Note: Tables are auto-created on startup.*

### 3. Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```

## 📂 Project Structure
- `/client`: React (Vite, Tailwind, Lucide Icons)
- `/server`: FastAPI (SQLAlchemy, PostgreSQL, Pydantic)