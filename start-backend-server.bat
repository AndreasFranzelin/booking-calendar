@echo off
echo ========================================
echo   Backend-Server wird gestartet...
echo ========================================
echo.
cd /d "%~dp0"
echo Aktuelles Verzeichnis: %CD%
echo.
echo Starte Node.js Backend-Server auf Port 3000...
echo.
echo Der Server stellt folgende APIs bereit:
echo   - /api/available-slots (Google Calendar)
echo   - /api/create-payment-intent (Stripe)
echo   - /api/book-appointment (Booking)
echo.
echo WICHTIG: Stelle sicher, dass die .env Datei existiert!
echo.
echo Druecke STRG+C zum Beenden
echo.
node server.js
pause

