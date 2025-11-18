Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Lokaler Test-Server wird gestartet..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Aktuelles Verzeichnis: $PWD" -ForegroundColor Yellow
Write-Host ""
Write-Host "Starte Python HTTP Server auf Port 8080..." -ForegroundColor Green
Write-Host ""
Write-Host "Oeffne im Browser:" -ForegroundColor Cyan
Write-Host "  http://localhost:8080/index_test.html" -ForegroundColor White
Write-Host "  http://localhost:8080/index.html" -ForegroundColor White
Write-Host ""
Write-Host "Druecke STRG+C zum Beenden" -ForegroundColor Yellow
Write-Host ""

python -m http.server 8080

