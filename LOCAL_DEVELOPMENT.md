# 🛠️ Lokale Entwicklung - Workflow ohne Auto-Deploy

## 🎯 Ziel: Offline entwickeln, ohne dass Netlify automatisch deployed

---

## 📋 Option 1: Netlify Auto-Deploy deaktivieren (EMPFOHLEN)

### Schritt 1: Netlify Dashboard öffnen
1. Gehe zu [netlify.com](https://netlify.com) und logge dich ein
2. Wähle dein Projekt aus

### Schritt 2: Build & Deploy Settings
1. Gehe zu **Site settings** → **Build & deploy**
2. Unter **Deploy contexts**:
   - **Production branch**: Setze auf `main` oder `master` (nur dieser Branch deployed automatisch)
   - **Branch deploys**: Deaktiviere "Deploy only the production branch"
   - ODER: Setze **Deploy contexts** auf "Only deploy production branch"

### Schritt 3: Git Branch für Entwicklung
```bash
# Erstelle einen Entwicklungs-Branch
git checkout -b development

# Arbeite in diesem Branch
# Netlify deployed nur den main/master Branch automatisch
```

---

## 📋 Option 2: Lokale Entwicklung mit Test-Dateien

### Workflow:

#### 1. **Test-Datei verwenden**
- Arbeite in `index_test.html` (nicht in `index.html`)
- `index.html` = LIVE-Version (wird auf Netlify deployed)
- `index_test.html` = TEST-Version (nur lokal)

#### 2. **Lokalen Server starten**

**EINFACHSTE METHODE - Doppelklick:**
- Doppelklick auf `start-local-server.bat` (Windows)
- ODER: Rechtsklick auf `start-local-server.ps1` → "Mit PowerShell ausführen"

**MANUELL:**
```bash
# Option A: Python Server (einfach)
cd "d:\Webpage Feedback\eeg-feedback-app"
python -m http.server 8080

# Option B: Node Server (falls vorhanden)
node start-local.js
```

**WICHTIG:** Der Server muss laufen, bevor du die URL öffnest!

#### 3. **Im Browser öffnen**
```
http://localhost:8080/index_test.html
```

#### 4. **Änderungen testen**
- Änderungen in `index_test.html` machen
- Speichern
- Browser neu laden (F5 oder STRG+R)

#### 5. **Wenn alles funktioniert:**
```bash
# Kopiere Test-Version zur Live-Version
# NUR wenn alles getestet ist!
Copy-Item "index_test.html" "index.html" -Force
```

---

## 📋 Option 3: Git Workflow (PROFESSIONELL)

### Setup:

#### 1. **Git Branches erstellen**
```bash
# Development Branch
git checkout -b development

# Production Branch (main/master)
git checkout main
```

#### 2. **Netlify konfigurieren**
- **Production branch**: `main` oder `master`
- **Branch deploys**: Deaktiviert (nur Production)

#### 3. **Entwicklungs-Workflow**
```bash
# 1. Wechsle zu Development Branch
git checkout development

# 2. Mache Änderungen in index.html
# (Hier kannst du direkt arbeiten, da dieser Branch nicht deployed wird)

# 3. Teste lokal
python -m http.server 8080
# Öffne: http://localhost:8080/index.html

# 4. Wenn fertig: Merge zu main
git checkout main
git merge development
git push origin main
# JETZT deployed Netlify automatisch
```

---

## 📋 Option 4: Netlify Deploy Lock (TEMPORÄR)

### Netlify Dashboard:
1. Gehe zu **Site settings** → **General**
2. Scrolle zu **Deploy lock**
3. Aktiviere **"Lock deploys"**
4. Jetzt deployed Netlify NICHT mehr automatisch
5. Zum Deployen: Deaktivieren und manuell deployen

---

## 🚀 Schnellstart für lokale Entwicklung

### Einfachste Methode:

**WICHTIG:** Du brauchst ZWEI Server:
1. **Frontend-Server** (Port 8080) - für die Website
2. **Backend-Server** (Port 3000) - für Google Calendar & Stripe

#### Schritt 1: Backend-Server starten
**Doppelklick auf:** `start-backend-server.bat`
- ODER: `node server.js` im Terminal
- Server läuft auf: `http://localhost:3000`

#### Schritt 2: Frontend-Server starten
**Doppelklick auf:** `start-local-server.bat`
- ODER: `python -m http.server 8080`
- Server läuft auf: `http://localhost:8080`

#### Schritt 3: Im Browser öffnen
```
http://localhost:8080/index_test.html
```

#### Schritt 4: Testen
- Mache Änderungen in `index_test.html`
- Browser neu laden (F5)
- Netlify deployed NICHT automatisch

#### Schritt 5: Wenn fertig
- Kopiere `index_test.html` → `index.html`

---

## ⚠️ WICHTIGE REGELN:

### ❌ NIEMALS:
- `index.html` direkt ändern ohne zu testen
- Änderungen ohne lokales Testen committen
- Auto-Deploy aktiv lassen während Entwicklung

### ✅ IMMER:
- Erst in `index_test.html` testen
- Lokal prüfen, dass alles funktioniert
- Dann erst in `index.html` übertragen
- Optional: Netlify Deploy Lock aktivieren während Entwicklung

---

## 📁 Datei-Übersicht:

- **`index.html`** → LIVE-Version (wird auf Netlify deployed)
- **`index_test.html`** → TEST-Version (nur lokal, wird NICHT deployed)
- **`index_backup_stable.html`** → Backup der stabilen Version

---

## 🔧 Netlify Auto-Deploy deaktivieren (Schritt-für-Schritt):

1. **Netlify Dashboard öffnen**
2. **Site settings** → **Build & deploy**
3. **Continuous Deployment** → **Stop auto publishing**
4. ODER: **Deploy contexts** → Nur Production Branch

---

## 💡 Tipp:

**Beste Lösung:** Kombiniere Option 2 (Test-Dateien) + Option 1 (Auto-Deploy deaktivieren)

- Arbeite in `index_test.html`
- Teste lokal mit Python Server
- Netlify Auto-Deploy ist deaktiviert
- Wenn fertig: Kopiere zu `index.html` und deploye manuell

