# Terminbuchungssystem - Setup-Anleitung

Dieses System ermöglicht es Kunden, Termine zu buchen mit:
- Google Calendar Integration
- Stripe Zahlungsintegration
- Automatische Email-Benachrichtigungen

## Voraussetzungen

1. **Google Calendar API Zugriff**
2. **Stripe Account**
3. **Gmail Account für Email-Versand**

## Schritt 1: Google Calendar API Setup

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt oder wähle ein bestehendes
3. Aktiviere die **Google Calendar API**
4. Erstelle OAuth 2.0 Credentials:
   - Gehe zu "Credentials" → "Create Credentials" → "OAuth client ID"
   - Wähle "Web application"
   - Füge `http://localhost:3000/auth/callback` als Redirect URI hinzu
5. Lade die Credentials herunter und speichere sie

### Refresh Token generieren

Führe dieses Script einmalig aus, um einen Refresh Token zu erhalten:

```javascript
// get-refresh-token.js
import { google } from 'googleapis';
import readline from 'readline';

const oauth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'http://localhost:3000/auth/callback'
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

console.log('Öffne diese URL:', authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Gib den Code ein, den du von der URL erhalten hast: ', (code) => {
    oauth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        console.log('Refresh Token:', token.refresh_token);
        rl.close();
    });
});
```

## Schritt 2: Stripe Setup

1. Erstelle einen Account auf [Stripe](https://stripe.com)
2. Gehe zu "Developers" → "API keys"
3. Kopiere deinen **Publishable Key** und **Secret Key**
4. **WICHTIG**: In der `index.html` Zeile 1284, ersetze `YOUR_STRIPE_PUBLISHABLE_KEY` mit deinem Publishable Key

## Schritt 3: Gmail App Password

1. Gehe zu deinem Google Account → "Sicherheit"
2. Aktiviere "2-Step Verification" falls noch nicht aktiviert
3. Gehe zu "App passwords"
4. Erstelle ein neues App Password für "Mail"
5. Kopiere das generierte Passwort

## Schritt 4: Environment Variables

Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
# Server Configuration
PORT=3000

# Google Calendar API
GOOGLE_CLIENT_ID=deine_client_id
GOOGLE_CLIENT_SECRET=dein_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
GOOGLE_REFRESH_TOKEN=dein_refresh_token
GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com

# Email Configuration (Gmail)
EMAIL_USER=franzelin.andreas@gmail.com
EMAIL_PASSWORD=dein_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_dein_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_dein_publishable_key
```

## Schritt 5: Installation

```bash
# Backend Dependencies installieren
npm install express cors googleapis nodemailer stripe dotenv

# Oder verwende die package-server.json:
npm install --package-lock-only
```

## Schritt 6: Server starten

```bash
node server.js
```

Der Server läuft auf `http://localhost:3000`

## Schritt 7: Frontend konfigurieren

In `index.html` Zeile 1152, ändere die API_URL für Production:

```javascript
const API_BASE_URL = 'https://deine-domain.com/api'; // Production URL
```

## Verfügbare Zeitslots

Das System ist konfiguriert für:
- **Tage**: Dienstag bis Freitag
- **Zeiten**: 
  - 10:00 - 10:50 Uhr
  - 11:00 - 11:50 Uhr
  - 14:00 - 14:50 Uhr
  - 15:00 - 15:50 Uhr
- **Dauer**: 50 Minuten pro Termin

## API Endpoints

- `GET /api/available-slots` - Gibt verfügbare Termine zurück
- `POST /api/create-payment-intent` - Erstellt Stripe Payment Intent
- `POST /api/book-appointment` - Bucht Termin nach erfolgreicher Zahlung

## Produktions-Deployment

1. **Backend**: Deploye `server.js` auf einem Server (z.B. Heroku, Railway, DigitalOcean)
2. **Frontend**: Deploye die Website (z.B. Netlify, Vercel)
3. **Environment Variables**: Setze alle Variablen auf dem Server
4. **CORS**: Passe CORS-Einstellungen in `server.js` für deine Domain an

## Fehlerbehebung

### "Calendar API not enabled"
- Aktiviere die Google Calendar API in der Google Cloud Console

### "Invalid refresh token"
- Generiere einen neuen Refresh Token mit dem Script oben

### "Email sending failed"
- Überprüfe, ob 2-Step Verification aktiviert ist
- Verwende ein App Password, nicht dein normales Passwort

### "Stripe payment failed"
- Überprüfe, ob du Test-Keys verwendest (sk_test_...) für Development
- Für Production: Verwende Live-Keys (sk_live_...)

## Support

Bei Problemen überprüfe:
1. Server-Logs in der Konsole
2. Browser-Konsole für Frontend-Fehler
3. Stripe Dashboard für Zahlungsfehler
4. Google Calendar für Termin-Konflikte

