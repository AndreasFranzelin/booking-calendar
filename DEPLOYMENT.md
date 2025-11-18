# Production Deployment Guide

Diese Anleitung führt Sie durch das Deployment des Terminbuchungssystems für Production.

## Übersicht

Das System besteht aus:
- **Frontend**: Statische Website (index.html)
- **Backend**: Node.js Server (server.js)

## Option 1: Railway (Empfohlen - Einfachste Lösung)

### Backend auf Railway deployen

1. **Railway Account erstellen**
   - Gehe zu [railway.app](https://railway.app)
   - Erstelle einen Account (kostenlos mit GitHub)

2. **Neues Projekt erstellen**
   - Klicke auf "New Project"
   - Wähle "Deploy from GitHub repo" oder "Empty Project"

3. **Code hochladen**
   ```bash
   # Falls noch nicht geschehen, initialisiere Git
   git init
   git add .
   git commit -m "Initial commit"
   
   # Erstelle Railway Projekt
   railway login
   railway init
   railway up
   ```

4. **Environment Variables setzen**
   - In Railway Dashboard → Project → Variables
   - Füge alle Variablen aus `.env.example` hinzu:
     ```
     GOOGLE_CLIENT_ID=...
     GOOGLE_CLIENT_SECRET=...
     GOOGLE_REFRESH_TOKEN=...
     GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
     EMAIL_USER=franzelin.andreas@gmail.com
     EMAIL_PASSWORD=...
     STRIPE_SECRET_KEY=sk_live_...
     STRIPE_PUBLISHABLE_KEY=pk_live_...
     ALLOWED_ORIGINS=https://deine-domain.com
     NODE_ENV=production
     PORT=3000
     ```

5. **package.json für Railway**
   - Railway erkennt automatisch Node.js Projekte
   - Stelle sicher, dass `server.js` als Entry Point dient

6. **Domain konfigurieren**
   - Railway gibt dir eine URL wie: `https://dein-projekt.railway.app`
   - Optional: Custom Domain hinzufügen

### Frontend deployen

**Option A: Netlify (Empfohlen)**
1. Gehe zu [netlify.com](https://netlify.com)
2. Drag & Drop den `eeg-feedback-app` Ordner
3. Oder verbinde mit GitHub
4. **Wichtig**: Ändere in `index.html` Zeile 1152:
   ```javascript
   const API_BASE_URL = 'https://dein-projekt.railway.app/api';
   ```

**Option B: Vercel**
1. Gehe zu [vercel.com](https://vercel.com)
2. Importiere das Projekt
3. Ändere `API_BASE_URL` wie oben

**Option C: GitHub Pages**
1. Erstelle ein `gh-pages` Branch
2. Pushe die Dateien
3. Aktiviere GitHub Pages im Repository Settings

## Option 2: Heroku

### Backend auf Heroku

1. **Heroku CLI installieren**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Projekt erstellen**
   ```bash
   heroku create dein-projekt-name
   ```

3. **Environment Variables setzen**
   ```bash
   heroku config:set GOOGLE_CLIENT_ID=...
   heroku config:set GOOGLE_CLIENT_SECRET=...
   heroku config:set GOOGLE_REFRESH_TOKEN=...
   # ... alle anderen Variablen
   ```

4. **Deployen**
   ```bash
   git push heroku main
   ```

5. **Logs prüfen**
   ```bash
   heroku logs --tail
   ```

### Frontend
- Wie bei Option 1, verwende die Heroku URL für `API_BASE_URL`

## Option 3: DigitalOcean / VPS

### Server Setup

1. **Ubuntu Server erstellen**
   - Erstelle eine Droplet auf DigitalOcean
   - Wähle Ubuntu 22.04

2. **SSH Verbindung**
   ```bash
   ssh root@deine-server-ip
   ```

3. **Node.js installieren**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **PM2 installieren (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

5. **Code hochladen**
   ```bash
   # Auf deinem lokalen Rechner
   scp -r "d:\Webpage Feedback\eeg-feedback-app" root@deine-server-ip:/var/www/
   
   # Auf dem Server
   cd /var/www/eeg-feedback-app
   npm install express cors googleapis nodemailer stripe dotenv
   ```

6. **Environment Variables**
   ```bash
   nano .env
   # Füge alle Variablen ein
   ```

7. **Server starten mit PM2**
   ```bash
   pm2 start server.js --name booking-server
   pm2 save
   pm2 startup
   ```

8. **Nginx als Reverse Proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/booking-api
   ```

   Nginx Config:
   ```nginx
   server {
       listen 80;
       server_name api.deine-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/booking-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **SSL mit Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.deine-domain.com
   ```

## Frontend Konfiguration für Production

### 1. API URL anpassen

In `index.html` Zeile 1152:

```javascript
// Development
// const API_BASE_URL = 'http://localhost:3000/api';

// Production
const API_BASE_URL = 'https://deine-api-domain.com/api';
```

### 2. Stripe Publishable Key

In `index.html` Zeile 1284:

```javascript
// Development (Test Key)
// stripe = Stripe('pk_test_...');

// Production (Live Key)
stripe = Stripe('pk_live_...');
```

### 3. Build für Production

Falls du Vite verwendest:
```bash
npm run build
# Deploye den dist/ Ordner
```

## Environment Variables Checklist

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=production

# Google Calendar
GOOGLE_CLIENT_ID=deine_client_id
GOOGLE_CLIENT_SECRET=dein_client_secret
GOOGLE_REDIRECT_URI=https://deine-api-domain.com/auth/callback
GOOGLE_REFRESH_TOKEN=dein_refresh_token
GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com

# Email
EMAIL_USER=franzelin.andreas@gmail.com
EMAIL_PASSWORD=dein_app_password

# Stripe
STRIPE_SECRET_KEY=sk_live_dein_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_dein_live_publishable_key

# CORS
ALLOWED_ORIGINS=https://deine-frontend-domain.com,https://www.deine-frontend-domain.com
```

### Frontend (in index.html)

```javascript
const API_BASE_URL = 'https://deine-api-domain.com/api';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_...';
```

## Sicherheits-Checkliste

- [ ] **Stripe Live Keys verwenden** (nicht Test Keys)
- [ ] **HTTPS aktiviert** für Frontend und Backend
- [ ] **CORS richtig konfiguriert** (nur deine Domains erlauben)
- [ ] **Environment Variables** niemals im Code committen
- [ ] **Google Calendar Refresh Token** sicher aufbewahren
- [ ] **Gmail App Password** sicher aufbewahren
- [ ] **Rate Limiting** aktivieren (optional, aber empfohlen)
- [ ] **Error Messages** in Production nicht zu detailliert

## Testing nach Deployment

1. **Health Check**
   ```bash
   curl https://deine-api-domain.com/health
   ```

2. **Available Slots testen**
   ```bash
   curl https://deine-api-domain.com/api/available-slots
   ```

3. **Frontend testen**
   - Öffne deine Website
   - Klicke auf "Jetzt Buchen"
   - Prüfe ob Termine geladen werden

4. **Test-Buchung**
   - Verwende Stripe Test Cards
   - Prüfe ob Email versendet wird
   - Prüfe ob Termin in Google Calendar erstellt wird

## Monitoring

### Railway
- Automatisches Monitoring im Dashboard
- Logs verfügbar

### Heroku
```bash
heroku logs --tail
```

### PM2 (VPS)
```bash
pm2 logs booking-server
pm2 monit
```

## Troubleshooting

### "CORS Error"
- Prüfe `ALLOWED_ORIGINS` in Environment Variables
- Stelle sicher, dass die Frontend-URL enthalten ist

### "Stripe Payment Failed"
- Prüfe ob Live Keys verwendet werden
- Prüfe Stripe Dashboard für Fehler

### "Google Calendar Error"
- Prüfe ob Refresh Token noch gültig ist
- Regeneriere Token falls nötig

### "Email not sending"
- Prüfe Gmail App Password
- Prüfe ob 2-Step Verification aktiviert ist

## Support

Bei Problemen:
1. Prüfe Server-Logs
2. Prüfe Browser-Konsole
3. Prüfe Stripe Dashboard
4. Prüfe Google Cloud Console

