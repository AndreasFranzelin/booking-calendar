@echo off
echo ========================================
echo   Lokaler Test-Server wird gestartet...
echo ========================================
echo.
cd /d "%~dp0"
echo Aktuelles Verzeichnis: %CD%
echo.
echo Starte Python HTTP Server auf Port 8080...
echo.
echo Oeffne im Browser:
echo   http://localhost:8080/index_test.html
echo   http://localhost:8080/index.html
echo.
echo Druecke STRG+C zum Beenden
echo.
python -m http.server 8080
pause

