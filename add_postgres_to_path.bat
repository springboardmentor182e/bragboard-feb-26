@echo off
echo Adding PostgreSQL to PATH...

:: Add PostgreSQL bin directory to PATH
setx PATH "%PATH%;C:\Program Files\PostgreSQL\16\bin"

echo.
echo PostgreSQL added to PATH successfully!
echo Please CLOSE this terminal and open a NEW one for changes to take effect.
echo.
pause
