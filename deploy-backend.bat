@echo off
SETLOCAL

ECHO.
ECHO ===================================================================
ECHO Backend Deployment zu Railway
ECHO ===================================================================
ECHO.

:: Check if Railway CLI is installed
railway --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Railway CLI wird installiert...
    npm install -g @railway/cli
)

ECHO.
ECHO Schritt 1: Railway Login
ECHO -------------------------
ECHO Du wirst jetzt zum Browser weitergeleitet, um dich einzuloggen.
ECHO Bitte logge dich mit GitHub ein.
ECHO.
PAUSE

railway login

IF %ERRORLEVEL% NEQ 0 (
    ECHO.
    ECHO FEHLER: Login fehlgeschlagen. Bitte versuche es erneut.
    PAUSE
    EXIT /B 1
)

ECHO.
ECHO Schritt 2: Projekt initialisieren
ECHO -------------------------
ECHO Erstelle ein neues Railway-Projekt...
ECHO.

railway init

IF %ERRORLEVEL% NEQ 0 (
    ECHO.
    ECHO FEHLER: Projekt-Initialisierung fehlgeschlagen.
    PAUSE
    EXIT /B 1
)

ECHO.
ECHO Schritt 3: Environment Variables setzen
ECHO -------------------------
ECHO Setze Environment Variables...
ECHO.

railway variables set GOOGLE_CLIENT_ID=1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com
railway variables set GOOGLE_CLIENT_SECRET=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
railway variables set GOOGLE_REFRESH_TOKEN=DEIN_GOOGLE_REFRESH_TOKEN
railway variables set GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
railway variables set EMAIL_USER=franzelin.andreas@gmail.com
railway variables set EMAIL_PASSWORD=ygwpeavrcqidqteb
railway variables set STRIPE_SECRET_KEY=DEIN_STRIPE_SECRET_KEY
railway variables set NODE_ENV=production
railway variables set PORT=3000

ECHO.
ECHO Schritt 4: Deployen
ECHO -------------------------
ECHO Deploye Backend zu Railway...
ECHO.

railway up

IF %ERRORLEVEL% NEQ 0 (
    ECHO.
    ECHO FEHLER: Deployment fehlgeschlagen.
    PAUSE
    EXIT /B 1
)

ECHO.
ECHO Schritt 5: URL abrufen
ECHO -------------------------
ECHO Hole die Railway URL...
ECHO.

railway domain

ECHO.
ECHO ===================================================================
ECHO ✅ Deployment abgeschlossen!
ECHO ===================================================================
ECHO.
ECHO Die Railway URL wurde oben angezeigt.
ECHO Kopiere diese URL und sende sie mir, dann aktualisiere ich index.html
ECHO.
PAUSE

ENDLOCAL

