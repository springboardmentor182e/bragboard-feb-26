# 🏆 BragBoard

BragBoard is a professional employee recognition platform that allows team members to appreciate each other's hard work. It's a full-stack application built with **React**, **FastAPI**, and **PostgreSQL**.

## ✨ Features

- **Shoutout Feed**: View all team appreciations in real-time.
- **Employee Portal**: Dedicated "My Shoutouts" view to see your contributions.
- **Admin Dashboard**: Full control to **Pin**, **Edit**, or **Delete** shoutouts.
- **Interactions**: React to posts with emojis and leave comments.
- **Smart Filtering**: Quickly find shoutouts by department or status.

## 🚀 Quick Setup

### 1. Prerequisites
- **PostgreSQL**: Ensure you have a database named `bragboard_db`.
- **Node.js & Python**: Installed on your system.

### 2. Backend Setup (FastAPI)
```bash
cd server
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```
*Note: Create a `.env` file in the `server` folder using `.env.example` as a template.*

### 3. Frontend Setup (React + Vite)
```bash
cd client
npm install
npm run dev
```
*Note: Create a `.env` file in the `client` folder using `.env.example` as a template.*

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI, SQLAlchemy (ORM), Pydantic.
- **Database**: PostgreSQL.