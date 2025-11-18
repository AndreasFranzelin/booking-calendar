# Railway Deployment - Web-Interface (EINFACHSTE Methode!)

## 🎯 Schritt-für-Schritt Anleitung

### Schritt 1: Railway Account erstellen

1. Gehe zu: **https://railway.app**
2. Klicke auf **"Start a New Project"** oder **"Login"**
3. Wähle **"Login with GitHub"** (empfohlen)
4. Autorisiere Railway

### Schritt 2: Neues Projekt erstellen

1. Im Dashboard: Klicke **"New Project"**
2. Wähle **"Empty Project"** (leeres Projekt)
3. Klicke auf den neu erstellten Service

### Schritt 3: Code hochladen

**Option A: Mit GitHub (Empfohlen - automatisches Deployment)**

1. Klicke **"Add Service"** → **"GitHub Repo"**
2. Verbinde dein GitHub Repository
3. Railway erkennt automatisch Node.js und startet den Build

**Option B: Manuell (Falls kein GitHub)**

1. Klicke **"Settings"** Tab
2. Unter **"Source"**: Klicke **"Connect GitHub"** oder **"Upload"**
3. Lade deinen Code hoch

### Schritt 4: Start Command setzen

1. Gehe zu **"Settings"** Tab
2. Unter **"Deploy"** → **"Start Command"**:
   ```
   node server.js
   ```
3. Klicke **"Save"**

### Schritt 5: Environment Variables hinzufügen

1. Gehe zu **"Variables"** Tab
2. Klicke **"New Variable"** für jede Variable:

Füge diese Variablen hinzu (eine nach der anderen):

```
GOOGLE_CLIENT_ID = 1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = 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
GOOGLE_REFRESH_TOKEN = DEIN_GOOGLE_REFRESH_TOKEN
GOOGLE_CALENDAR_ID = franzelin.andreas@gmail.com
EMAIL_USER = franzelin.andreas@gmail.com
EMAIL_PASSWORD = ygwpeavrcqidqteb
STRIPE_SECRET_KEY = DEIN_STRIPE_SECRET_KEY
NODE_ENV = production
PORT = 3000
```

**Wichtig:** 
- Für `ALLOWED_ORIGINS`: Füge diese Variable **NACH** dem Deployment hinzu (mit deiner Netlify URL)
- Für `GOOGLE_REDIRECT_URI`: Füge diese Variable **NACH** dem Deployment hinzu (mit deiner Railway URL)

### Schritt 6: Deployment starten

1. Railway startet automatisch das Deployment
2. Gehe zu **"Deployments"** Tab
3. Warte bis der Build erfolgreich ist (grüner Haken ✅)

### Schritt 7: URL finden

1. Gehe zu **"Settings"** Tab
2. Unter **"Domains"** findest du deine Railway URL
3. Die URL sieht so aus: `https://dein-service-name.up.railway.app`
4. **KOPIERE DIESE URL!**

### Schritt 8: Finale Environment Variables setzen

Jetzt füge die letzten beiden Variablen hinzu:

1. Gehe zu **"Variables"** Tab
2. Füge hinzu:
   ```
   GOOGLE_REDIRECT_URI = https://DEINE-RAILWAY-URL.up.railway.app/auth/callback
   ```
   (Ersetze `DEINE-RAILWAY-URL` mit deiner tatsächlichen URL)

3. Füge hinzu:
   ```
   ALLOWED_ORIGINS = https://DEINE-NETLIFY-URL.netlify.app
   ```
   (Ersetze `DEINE-NETLIFY-URL` mit deiner Netlify URL)

4. Railway startet automatisch einen neuen Deployment

### Schritt 9: Fertig! 🎉

Sende mir die Railway URL, dann aktualisiere ich `index.html` automatisch!

---

## ✅ Checkliste

- [ ] Railway Account erstellt
- [ ] Neues Projekt erstellt
- [ ] Code hochgeladen (GitHub oder manuell)
- [ ] Start Command gesetzt: `node server.js`
- [ ] Alle Environment Variables hinzugefügt
- [ ] Deployment erfolgreich (grüner Haken)
- [ ] Railway URL kopiert
- [ ] GOOGLE_REDIRECT_URI mit Railway URL gesetzt
- [ ] ALLOWED_ORIGINS mit Netlify URL gesetzt

---

## 🆘 Hilfe

Falls etwas nicht funktioniert:
- Prüfe die **"Logs"** Tab für Fehlermeldungen
- Stelle sicher, dass alle Environment Variables korrekt gesetzt sind
- Prüfe, ob der Start Command `node server.js` ist

