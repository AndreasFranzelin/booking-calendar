# Railway Deployment Script
# Führt alle notwendigen Schritte für das Backend-Deployment aus

Write-Host ""
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "Railway Backend Deployment" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

# Schritt 1: Login prüfen
Write-Host "Schritt 1: Prüfe Railway Login..." -ForegroundColor Yellow
$loginCheck = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Nicht eingeloggt. Bitte logge dich ein..." -ForegroundColor Red
    Write-Host "Öffne Browser für Railway Login..." -ForegroundColor Yellow
    railway login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Login fehlgeschlagen!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Bereits eingeloggt!" -ForegroundColor Green
}

# Schritt 2: Projekt initialisieren
Write-Host ""
Write-Host "Schritt 2: Initialisiere Railway Projekt..." -ForegroundColor Yellow
if (-not (Test-Path .railway)) {
    railway init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Projekt-Initialisierung fehlgeschlagen!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Projekt bereits initialisiert!" -ForegroundColor Green
}

# Schritt 3: Environment Variables setzen
Write-Host ""
Write-Host "Schritt 3: Setze Environment Variables..." -ForegroundColor Yellow

$vars = @{
    "GOOGLE_CLIENT_ID" = "1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com"
    "GOOGLE_CLIENT_SECRET" = "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"
    "GOOGLE_REFRESH_TOKEN" = "DEIN_GOOGLE_REFRESH_TOKEN"
    "GOOGLE_CALENDAR_ID" = "franzelin.andreas@gmail.com"
    "EMAIL_USER" = "franzelin.andreas@gmail.com"
    "EMAIL_PASSWORD" = "ygwpeavrcqidqteb"
    "STRIPE_SECRET_KEY" = "DEIN_STRIPE_SECRET_KEY"
    "NODE_ENV" = "production"
    "PORT" = "3000"
}

foreach ($key in $vars.Keys) {
    Write-Host "  Setze $key..." -ForegroundColor Gray
    railway variables set "$key=$($vars[$key])" | Out-Null
}

Write-Host "✅ Environment Variables gesetzt!" -ForegroundColor Green

# Schritt 4: Deployen
Write-Host ""
Write-Host "Schritt 4: Deploye Backend..." -ForegroundColor Yellow
railway up
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment fehlgeschlagen!" -ForegroundColor Red
    exit 1
}

# Schritt 5: URL abrufen
Write-Host ""
Write-Host "Schritt 5: Hole Railway URL..." -ForegroundColor Yellow
Write-Host ""
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "✅ Deployment erfolgreich!" -ForegroundColor Green
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deine Railway URL:" -ForegroundColor Yellow
railway domain
Write-Host ""
Write-Host "WICHTIG: Kopiere diese URL und sende sie mir!" -ForegroundColor Red
Write-Host "Dann aktualisiere ich index.html automatisch." -ForegroundColor Yellow
Write-Host ""

