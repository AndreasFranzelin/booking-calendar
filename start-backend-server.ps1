Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Backend-Server wird gestartet..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Aktuelles Verzeichnis: $PWD" -ForegroundColor Yellow
Write-Host ""
Write-Host "Starte Node.js Backend-Server auf Port 3000..." -ForegroundColor Green
Write-Host ""
Write-Host "Der Server stellt folgende APIs bereit:" -ForegroundColor Cyan
Write-Host "  - /api/available-slots (Google Calendar)" -ForegroundColor White
Write-Host "  - /api/create-payment-intent (Stripe)" -ForegroundColor White
Write-Host "  - /api/book-appointment (Booking)" -ForegroundColor White
Write-Host ""
Write-Host "WICHTIG: Stelle sicher, dass die .env Datei existiert!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Druecke STRG+C zum Beenden" -ForegroundColor Yellow
Write-Host ""

node server.js

