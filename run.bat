@echo off
echo ========================================
echo Starting BragBoard Application
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start "BragBoard Backend" cmd /k "cd /d %~dp0server && uvicorn src.main:app --reload --port 8000"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server...
start "BragBoard Frontend" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ========================================
echo BragBoard is starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Login Credentials:
echo   Email:    admin@bragboard.com
echo   Password: admin123
echo.
echo Press any key to stop all servers...
pause >nul

echo.
echo Stopping servers...
taskkill /FI "WindowTitle eq BragBoard Backend*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq BragBoard Frontend*" /T /F >nul 2>&1
echo Servers stopped.
