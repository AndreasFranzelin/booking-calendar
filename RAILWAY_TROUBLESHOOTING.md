# Railway Troubleshooting - 500 Error bei /api/available-slots

## 🔍 Problem-Diagnose

Der Fehler "Fehler beim Laden der Termine" wird durch einen **500 Internal Server Error** von Railway verursacht.

## 📋 Schritt 1: Railway Logs prüfen

1. Gehe zu Railway Dashboard: https://railway.app
2. Wähle dein Projekt: **booking-calendar-production**
3. Klicke auf den **"Deployments"** Tab
4. Klicke auf den neuesten Deployment
5. Öffne die **"Logs"** Ansicht
6. Suche nach Fehlermeldungen, die mit "Error fetching calendar events" oder "Google Calendar" beginnen

**Was du suchst:**
- `Error fetching calendar events: ...`
- `Invalid Credentials`
- `Token expired`
- `Access denied`

## 🔧 Häufige Probleme & Lösungen

### Problem 1: Google Refresh Token abgelaufen

**Symptom:** Log zeigt "Invalid Credentials" oder "Token expired"

**Lösung:**
1. Generiere einen neuen Refresh Token (siehe `get-refresh-token.cjs`)
2. Aktualisiere `GOOGLE_REFRESH_TOKEN` in Railway Variables

### Problem 2: Google Calendar API nicht aktiviert

**Symptom:** Log zeigt "API not enabled" oder "403 Forbidden"

**Lösung:**
1. Gehe zu: https://console.cloud.google.com/apis/library
2. Suche nach "Google Calendar API"
3. Stelle sicher, dass die API aktiviert ist
4. Prüfe, dass dein OAuth Client die richtigen Scopes hat

### Problem 3: Falsche Environment Variables

**Symptom:** Log zeigt "undefined" oder "missing"

**Lösung:**
Prüfe in Railway → Variables Tab, dass ALLE diese Variablen gesetzt sind:
- ✅ `GOOGLE_CLIENT_ID`
- ✅ `GOOGLE_CLIENT_SECRET`
- ✅ `GOOGLE_REFRESH_TOKEN`
- ✅ `GOOGLE_REDIRECT_URI` (muss `https://booking-calendar-production.up.railway.app/auth/callback` sein)
- ✅ `GOOGLE_CALENDAR_ID`

### Problem 4: OAuth Scopes fehlen

**Symptom:** Log zeigt "Insufficient permissions"

**Lösung:**
1. Gehe zu: https://console.cloud.google.com/apis/credentials
2. Öffne deinen OAuth 2.0 Client
3. Stelle sicher, dass diese Scopes hinzugefügt sind:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`

## 🧪 Test-Commands

### Test 1: Health Check
```bash
curl https://booking-calendar-production.up.railway.app/health
```
Sollte zurückgeben: `{"status":"ok","timestamp":"..."}`

### Test 2: API Endpoint (sollte Fehler zeigen)
```bash
curl https://booking-calendar-production.up.railway.app/api/available-slots
```

## 🔄 Server neu starten

Nach Änderungen an Environment Variables:
1. Railway Dashboard → Dein Service
2. Klicke auf die drei Punkte (⋯) oben rechts
3. Wähle **"Restart"**

## 📝 Nächste Schritte

1. **Prüfe die Railway Logs** (siehe Schritt 1 oben)
2. **Kopiere die Fehlermeldung** aus den Logs
3. **Sende mir die Fehlermeldung**, dann kann ich dir genau helfen!

## ✅ Quick Fix: Refresh Token neu generieren

Falls der Refresh Token das Problem ist:

1. Lokal ausführen:
   ```bash
   cd "d:\Webpage Feedback\eeg-feedback-app"
   node get-refresh-token.cjs
   ```
2. Neuen Refresh Token kopieren
3. In Railway → Variables → `GOOGLE_REFRESH_TOKEN` aktualisieren
4. Service neu starten

