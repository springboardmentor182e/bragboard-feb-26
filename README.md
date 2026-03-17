<<<<<<< HEAD
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
=======
# BragBoard - Employee Recognition Platform

A full-stack employee recognition platform built with **React, FastAPI, and PostgreSQL**.

---

# 🚀 Features

### Employee Management
- Create, update, delete employees
- Search employees
- Filter by department
- Pagination support
- Role-based access control

### Shoutout Management
- CRUD operations for shoutouts
- Pin shoutouts
- Edit shoutouts
- Bulk delete shoutouts
- Search by employee name or message
- Filter by department/status

### Authentication
- JWT based login system
- Admin and Employee roles

### Dashboard
- Live statistics
- Top performers leaderboard
- Recognition badges

---

# 🛠 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication

---

# 📂 Project Structure
>>>>>>> feature/employee-management-admin
