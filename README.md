# BragBoard (Jan 26)

Minimal local setup for running the full app (client + server).

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 14+

## 1) Clone and open project

```bash
git clone https://github.com/springboardmentor182e/bragboard-feb-26.git
cd bragboard-feb-26
```

## 2) Configure backend env

Create `server/.env`:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/bragboard
EMAIL_MOCK_MODE=true
```

Notes:

- `EMAIL_MOCK_MODE=true` lets password-reset OTP emails print in server logs (no SMTP setup needed for local dev).
- If your postgres user has no password, use `postgresql://postgres:@localhost:5432/bragboard`.

## 3) Create database

Create a PostgreSQL database named `bragboard`.

## 4) Start backend

```bash
cd server
python -m venv .venv
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run_server.py
```

Backend runs at `http://127.0.0.1:8000`.

## 5) Configure frontend env

Create `client/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## 6) Start frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Done

Open `http://localhost:5173` and use the app with the local API.
