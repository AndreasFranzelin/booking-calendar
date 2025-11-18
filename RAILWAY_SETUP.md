# Railway Deployment - Schritt für Schritt

## Schritt 1: Railway Account erstellen

1. Gehe zu [railway.app](https://railway.app)
2. Klicke auf **"Start a New Project"** oder **"Login"**
3. Wähle **"Login with GitHub"** (empfohlen) oder Email
4. Autorisiere Railway, auf dein GitHub zu zugreifen

## Schritt 2: Neues Projekt erstellen

1. Im Railway Dashboard klicke auf **"New Project"**
2. Du hast 3 Optionen:
   - **"Deploy from GitHub repo"** (Empfohlen - automatisches Deployment)
   - **"Empty Project"** (Manuelles Deployment)
   - **"Deploy a Template"** (Nicht für uns)

### Option A: Deploy from GitHub (Empfohlen)

1. Wähle **"Deploy from GitHub repo"**
2. Falls dein Code noch nicht auf GitHub ist:
   ```bash
   cd "d:\Webpage Feedback\eeg-feedback-app"
   git init
   git add .
   git commit -m "Initial commit - Booking system"
   # Erstelle ein neues Repository auf GitHub
   git remote add origin https://github.com/dein-username/eeg-booking-app.git
   git push -u origin main
   ```
3. In Railway: Wähle dein Repository aus
4. Railway erkennt automatisch Node.js und startet den Build

### Option B: Empty Project (Manuell)

1. Wähle **"Empty Project"**
2. Klicke auf **"Add Service"** → **"GitHub Repo"** oder **"Empty Service"**
3. Falls "Empty Service": Du musst später manuell deployen

## Schritt 3: Service konfigurieren

1. Railway erstellt automatisch einen Service
2. Klicke auf den Service (z.B. "backend" oder dein Repo-Name)
3. Gehe zu **"Settings"** Tab

### Wichtig: Start Command setzen

In den Settings, unter **"Deploy"**:
- **Start Command**: `node server.js`
- Oder lass Railway es automatisch erkennen (sollte funktionieren)

## Schritt 4: Environment Variables setzen

1. Im Service, gehe zu **"Variables"** Tab
2. Klicke auf **"New Variable"**
3. Füge alle folgenden Variablen hinzu:

```
GOOGLE_CLIENT_ID=deine_google_client_id
GOOGLE_CLIENT_SECRET=dein_google_client_secret
GOOGLE_REDIRECT_URI=https://dein-service.railway.app/auth/callback
GOOGLE_REFRESH_TOKEN=dein_refresh_token
GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
EMAIL_USER=franzelin.andreas@gmail.com
EMAIL_PASSWORD=dein_gmail_app_password
STRIPE_SECRET_KEY=sk_live_dein_stripe_secret_key
ALLOWED_ORIGINS=https://deine-frontend-domain.com
NODE_ENV=production
PORT=3000
```

**Wichtig**: 
- Ersetze alle Platzhalter mit echten Werten
- `ALLOWED_ORIGINS` sollte deine Frontend-URL sein (z.B. `https://deine-website.com`)
- Für `GOOGLE_REDIRECT_URI`: Verwende die Railway-URL deines Services (siehe Schritt 5)

## Schritt 5: Domain/URL finden

1. Nach dem Deployment gibt Railway deinem Service automatisch eine URL
2. Die URL sieht so aus: `https://dein-service-name.up.railway.app`
3. Diese URL findest du im **"Settings"** Tab unter **"Domains"**
4. **Kopiere diese URL** - du brauchst sie für:
   - `GOOGLE_REDIRECT_URI` (falls noch nicht gesetzt)
   - Frontend `API_BASE_URL` Konfiguration

### Optional: Custom Domain

1. Im **"Settings"** Tab → **"Domains"**
2. Klicke **"Custom Domain"**
3. Füge deine Domain hinzu (z.B. `api.deine-domain.com`)
4. Folge den DNS-Anweisungen

## Schritt 6: Deployment prüfen

1. Gehe zum **"Deployments"** Tab
2. Warte bis der Build erfolgreich ist (grüner Haken)
3. Klicke auf die **URL** oder gehe zu `/health`:
   ```
   https://dein-service.up.railway.app/health
   ```
4. Du solltest sehen: `{"status":"ok","timestamp":"..."}`

## Schritt 7: Logs prüfen

1. Im **"Deployments"** Tab, klicke auf den neuesten Deployment
2. Oder im **"Logs"** Tab
3. Prüfe ob:
   - ✅ Server läuft auf Port 3000
   - ✅ Alle Environment Variables gesetzt sind
   - ✅ Keine Fehler vorhanden sind

## Schritt 8: Frontend konfigurieren

1. Öffne `index.html` in deinem Projekt
2. Gehe zu Zeile **1157** (API_BASE_URL)
3. Ändere:
   ```javascript
   return 'https://dein-service.up.railway.app/api'; // ⚠️ ÄNDERE DIESE URL!
   ```
4. Ersetze `dein-service.up.railway.app` mit deiner tatsächlichen Railway-URL

## Schritt 9: Testen

1. Öffne deine Website
2. Klicke auf "Jetzt Buchen" bei einem Service
3. Prüfe ob:
   - ✅ Termine geladen werden
   - ✅ Keine CORS-Fehler in der Browser-Konsole
   - ✅ Keine 404-Fehler

## Häufige Probleme & Lösungen

### Problem: "Build failed"
**Lösung**: 
- Prüfe ob `package.json` existiert
- Prüfe ob alle Dependencies korrekt sind
- Prüfe Railway Logs für Details

### Problem: "Service crashed"
**Lösung**:
- Prüfe ob alle Environment Variables gesetzt sind
- Prüfe Logs für Fehlermeldungen
- Prüfe ob `PORT` Variable gesetzt ist (Railway setzt diese automatisch)

### Problem: "CORS Error"
**Lösung**:
- Prüfe `ALLOWED_ORIGINS` Variable
- Stelle sicher, dass deine Frontend-URL enthalten ist
- Keine Trailing Slashes in der URL

### Problem: "Google Calendar Error"
**Lösung**:
- Prüfe ob `GOOGLE_REFRESH_TOKEN` korrekt ist
- Prüfe ob `GOOGLE_REDIRECT_URI` mit Railway-URL übereinstimmt
- Regeneriere Refresh Token falls nötig

## Nützliche Railway Features

### Auto-Deploy
- Railway deployt automatisch bei jedem Git Push
- Gehe zu **Settings** → **"Source"** um zu konfigurieren

### Monitoring
- **Metrics** Tab: CPU, Memory, Network Usage
- **Logs** Tab: Live-Logs deines Services

### Rollback
- Im **Deployments** Tab kannst du zu einem vorherigen Deployment zurückkehren

## Kosten

Railway hat einen **kostenlosen Plan** mit:
- $5 kostenloses Credit pro Monat
- Genug für kleine bis mittlere Apps

Für dein Booking-System sollte das ausreichen!

## Nächste Schritte

1. ✅ Backend auf Railway deployed
2. ✅ Environment Variables gesetzt
3. ✅ Frontend API_URL angepasst
4. ✅ Getestet
5. 🎉 Fertig!

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

