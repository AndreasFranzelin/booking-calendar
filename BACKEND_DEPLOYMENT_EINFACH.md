# Backend Deployment - Einfache Anleitung

## Was ist das Backend?

**Einfach erklärt:**
- **Frontend** = Deine Website (was der Besucher sieht) → läuft auf Netlify ✅
- **Backend** = Der "Arbeiter" im Hintergrund, der:
  - Termine aus Google Calendar holt
  - Zahlungen mit Stripe verarbeitet
  - E-Mails versendet
  - → Muss auch online laufen!

## Schritt 1: Railway Account erstellen (kostenlos)

1. Gehe zu: **https://railway.app**
2. Klicke auf **"Start a New Project"**
3. Wähle **"Login with GitHub"** (am einfachsten)
   - Falls du kein GitHub hast: Erstelle einen Account auf github.com (kostenlos)
4. Autorisiere Railway

## Schritt 2: Neues Projekt erstellen

1. Im Railway Dashboard: Klicke **"New Project"**
2. Wähle **"Deploy from GitHub repo"**
3. Falls dein Code noch nicht auf GitHub ist:
   - Erstelle ein neues Repository auf GitHub
   - Lade deinen Code hoch

**ODER** (Einfacher - ohne GitHub):

1. Wähle **"Empty Project"**
2. Klicke **"Add Service"** → **"Empty Service"**
3. Wir deployen dann manuell

## Schritt 3: Code hochladen

**Option A: Mit GitHub (Empfohlen)**
- Railway verbindet sich automatisch mit GitHub
- Jede Änderung wird automatisch deployed

**Option B: Manuell (Einfacher für den Start)**
- Ich helfe dir dabei

## Schritt 4: Environment Variables setzen

Im Railway Dashboard → Dein Service → **"Variables"** Tab:

Füge diese Variablen hinzu (aus deiner `.env` Datei):

```
GOOGLE_CLIENT_ID=1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=https://dein-service.railway.app/auth/callback
GOOGLE_REFRESH_TOKEN=DEIN_GOOGLE_REFRESH_TOKEN
GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
EMAIL_USER=franzelin.andreas@gmail.com
EMAIL_PASSWORD=ygwpeavrcqidqteb
STRIPE_SECRET_KEY=DEIN_STRIPE_SECRET_KEY
ALLOWED_ORIGINS=https://deine-netlify-url.netlify.app
NODE_ENV=production
PORT=3000
```

**Wichtig:** 
- `GOOGLE_REDIRECT_URI` und `ALLOWED_ORIGINS` musst du später anpassen (nachdem Railway die URL gibt)

## Schritt 5: Railway URL finden

Nach dem Deployment:
1. Railway gibt deinem Service eine URL
2. Die URL sieht so aus: `https://dein-service-name.up.railway.app`
3. **Kopiere diese URL** - du brauchst sie für Schritt 6!

## Schritt 6: URL in index.html eintragen

Ich aktualisiere dann die `index.html` mit deiner Railway URL.

## Fertig! 🎉

Dann funktioniert die Buchungsfunktion auf deiner Website!

