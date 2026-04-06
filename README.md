# BragBoard

BragBoard is a recognition and employee engagement platform. This project consists of a FastAPI backend and a React (Vite) frontend.

## Project Structure

- `client/`: React frontend built with Vite and Tailwind CSS.
- `server/`: FastAPI backend with PostgreSQL and SQLAlchemy.

---

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- [PostgreSQL](https://www.postgresql.org/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/springboardmentor182e/bragboard-feb-26.git
cd bragboard-feb-26
```

### 2. Backend Setup (server)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   - Create a `.env` file in the `server/` directory (or update the existing one).
   - Update `DATABASE_URL` with your PostgreSQL credentials:
     ```env
     DATABASE_URL=postgresql://<username>:<password>@localhost:5432/bragboard
     ```

5. **Initialize the Database:**
   - Ensure PostgreSQL is running.
   - Run the database creation script:
     ```bash
     python create_db.py
     ```
   - Run the schema migration script:
     ```bash
     python migrate_schema.py
     ```

6. **Run the Server:**
   ```bash
   python run_server.py
   ```
   The backend will be available at `http://127.0.0.1:8000`.

### 3. Frontend Setup (client)

1. **Navigate to the client directory:**
   ```bash
   cd ../client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the `client/` directory (or update the existing one).
   - Ensure it points to the backend:
     ```env
     VITE_API_BASE_URL=http://127.0.0.1:8000
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## Key Features

- **Employee Dashboard:** View shoutouts, stats, and achievements.
- **Admin Panel:** Manage employees, shoutouts, and view analytics.
- **Recognition System:** Create and view shoutouts for colleagues.
- **Leaderboards:** Track top contributors and departments.
- **Analytics:** Visualized data with Chart.js and Recharts.
