# Railway Final Configuration Checklist

## ✅ Was bereits erledigt ist:

1. ✅ Backend ist deployed: `https://booking-calendar-production.up.railway.app`
2. ✅ `index.html` wurde mit der Railway URL aktualisiert
3. ✅ Repository ist auf GitHub gepusht

## 🔧 WICHTIG: Finale Railway-Konfiguration

Gehe zu deinem Railway Dashboard und füge diese **zwei wichtigen Environment Variables** hinzu:

### 1. ALLOWED_ORIGINS (CORS)

**Warum:** Erlaubt deiner Netlify-Website, API-Anfragen an Railway zu senden.

**Schritte:**
1. Gehe zu Railway Dashboard → Dein Service → **"Variables"** Tab
2. Klicke **"New Variable"**
3. Name: `ALLOWED_ORIGINS`
4. Wert: `https://deine-netlify-url.netlify.app`
   - **Ersetze** `deine-netlify-url` mit deiner tatsächlichen Netlify URL
   - Falls du mehrere Domains hast, trenne sie mit Komma: `https://url1.netlify.app,https://url2.netlify.app`

### 2. GOOGLE_REDIRECT_URI

**Warum:** Google OAuth benötigt die korrekte Redirect-URI.

**Schritte:**
1. Im **"Variables"** Tab
2. Klicke **"New Variable"** (oder bearbeite die existierende)
3. Name: `GOOGLE_REDIRECT_URI`
4. Wert: `https://booking-calendar-production.up.railway.app/auth/callback`

## 📋 Vollständige Environment Variables Liste

Stelle sicher, dass ALLE diese Variablen in Railway gesetzt sind:

```
GOOGLE_CLIENT_ID=1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=https://booking-calendar-production.up.railway.app/auth/callback
GOOGLE_REFRESH_TOKEN=DEIN_GOOGLE_REFRESH_TOKEN
GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
EMAIL_USER=franzelin.andreas@gmail.com
EMAIL_PASSWORD=ygwpeavrcqidqteb
STRIPE_SECRET_KEY=DEIN_STRIPE_SECRET_KEY
ALLOWED_ORIGINS=https://deine-netlify-url.netlify.app
NODE_ENV=production
PORT=3000
```

## 🧪 Testen

Nach dem Setzen der Variablen:

1. **Backend Health Check:**
   ```
   https://booking-calendar-production.up.railway.app/health
   ```
   Sollte `{"status":"ok"}` zurückgeben.

2. **Frontend testen:**
   - Öffne deine Netlify-Website
   - Versuche einen Termin zu buchen
   - Prüfe, ob die Termine geladen werden

## 🚨 Troubleshooting

**Problem:** "Fehler beim Laden der Termine"
- ✅ Prüfe, ob `ALLOWED_ORIGINS` deine Netlify URL enthält
- ✅ Prüfe, ob Railway Service läuft (grüner Status)
- ✅ Öffne Browser Console (F12) und prüfe Fehlermeldungen

**Problem:** "CORS Error"
- ✅ Stelle sicher, dass `ALLOWED_ORIGINS` exakt deine Netlify URL enthält (mit `https://`)
- ✅ Keine Leerzeichen am Anfang/Ende
- ✅ Railway Service neu starten nach Änderung

**Problem:** "Google Calendar Error"
- ✅ Prüfe, ob `GOOGLE_REDIRECT_URI` korrekt ist
- ✅ Prüfe, ob `GOOGLE_REFRESH_TOKEN` noch gültig ist

## ✅ Fertig!

Sobald alle Variablen gesetzt sind, sollte dein Booking-System vollständig funktionieren! 🎉

