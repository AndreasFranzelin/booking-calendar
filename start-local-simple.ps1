Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Lokaler Test-Server wird gestartet..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server läuft auf: http://localhost:8080" -ForegroundColor Green
Write-Host ""
Write-Host "Drücke Strg+C zum Beenden" -ForegroundColor Yellow
Write-Host ""

Set-Location $PSScriptRoot

# Prüfe ob Python verfügbar ist
$pythonAvailable = Get-Command python -ErrorAction SilentlyContinue
if ($pythonAvailable) {
    python -m http.server 8080
} else {
    # Fallback: Verwende Node.js mit einem einfacheren Server
    Write-Host "Python nicht gefunden, verwende Node.js..." -ForegroundColor Yellow
    npx -y http-server . -p 8080 -o
}


