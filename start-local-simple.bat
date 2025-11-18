@echo off
echo.
echo ========================================
echo   Lokaler Test-Server wird gestartet...
echo ========================================
echo.
echo Server laeuft auf: http://localhost:8080
echo.
echo Druecke Strg+C zum Beenden
echo.
cd /d "%~dp0"
python -m http.server 8080


