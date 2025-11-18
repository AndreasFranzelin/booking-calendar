# EEG Feedback App - Booking System

Professionelle Website für Dr. Andreas Franzelin mit integriertem Terminbuchungssystem.

## Features

- 🌐 **Zweisprachige Website** (Deutsch/Englisch)
- 📅 **Terminbuchungssystem** mit Google Calendar Integration
- 💳 **Stripe Zahlungsintegration**
- 📧 **Automatische Email-Benachrichtigungen**
- 📊 **EEG Report Viewer**
- 📝 **Feedback-System**

## Tech Stack

- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Backend**: Node.js, Express
- **APIs**: Google Calendar API, Stripe API
- **Email**: Nodemailer (Gmail)

## Setup

### Backend

1. Installiere Dependencies:
```bash
npm install express cors googleapis nodemailer stripe dotenv
```

2. Erstelle `.env` Datei:
```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
EMAIL_USER=franzelin.andreas@gmail.com
EMAIL_PASSWORD=...
STRIPE_SECRET_KEY=sk_live_...
ALLOWED_ORIGINS=https://deine-domain.com
NODE_ENV=production
```

3. Starte Server:
```bash
node server.js
```

### Frontend

1. Öffne `index.html` in einem Browser
2. Oder deploye auf Netlify/Vercel/GitHub Pages

## Deployment

Siehe:
- `DEPLOYMENT.md` - Allgemeine Deployment-Anleitung
- `RAILWAY_SETUP.md` - Railway-spezifische Anleitung
- `BOOKING_SETUP.md` - Setup für Booking-System

## Verfügbare Termine

- **Tage**: Dienstag bis Freitag
- **Zeiten**: 10:00-10:50, 11:00-11:50, 14:00-14:50, 15:00-15:50
- **Dauer**: 50 Minuten pro Termin

## License

Private - Dr. Andreas Franzelin
