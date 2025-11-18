# Railway Deployment - Schnell & Einfach

## ⚡ Schnell-Deployment (5 Minuten)

### Schritt 1: Railway Login (einmalig)

Öffne PowerShell oder Command Prompt im Projekt-Ordner und führe aus:

```bash
cd "d:\Webpage Feedback\eeg-feedback-app"
railway login
```

Dies öffnet deinen Browser. Logge dich mit GitHub ein.

### Schritt 2: Automatisches Deployment

Nach dem Login führe aus:

```bash
railway init
railway up
```

Das war's! Railway deployt automatisch.

### Schritt 3: Environment Variables setzen

Führe diese Befehle aus (alle auf einmal):

```bash
railway variables set GOOGLE_CLIENT_ID=1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com
railway variables set GOOGLE_CLIENT_SECRET=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
railway variables set GOOGLE_REFRESH_TOKEN=DEIN_GOOGLE_REFRESH_TOKEN
railway variables set GOOGLE_CALENDAR_ID=franzelin.andreas@gmail.com
railway variables set EMAIL_USER=franzelin.andreas@gmail.com
railway variables set EMAIL_PASSWORD=ygwpeavrcqidqteb
railway variables set STRIPE_SECRET_KEY=DEIN_STRIPE_SECRET_KEY
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

### Schritt 4: URL abrufen

```bash
railway domain
```

**Kopiere die URL** (z.B. `https://dein-projekt.up.railway.app`) und sende sie mir!

### Schritt 5: ALLOWED_ORIGINS setzen

Nachdem du deine Netlify URL hast, setze:

```bash
railway variables set ALLOWED_ORIGINS=https://deine-netlify-url.netlify.app
```

Und für GOOGLE_REDIRECT_URI (ersetze mit deiner Railway URL):

```bash
railway variables set GOOGLE_REDIRECT_URI=https://deine-railway-url.up.railway.app/auth/callback
```

---

## 🎯 Alternative: Web-Interface (Noch einfacher!)

Falls die CLI nicht funktioniert:

1. Gehe zu **https://railway.app**
2. Klicke **"New Project"** → **"Deploy from GitHub repo"**
3. Verbinde dein GitHub Repository
4. Railway erkennt automatisch Node.js und deployt
5. Gehe zu **"Variables"** Tab und füge alle Environment Variables hinzu
6. Kopiere die URL aus **"Settings"** → **"Domains"**

---

## ✅ Nach dem Deployment

Sende mir die Railway URL, dann aktualisiere ich `index.html` automatisch!

