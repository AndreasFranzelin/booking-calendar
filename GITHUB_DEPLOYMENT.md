# GitHub Deployment - Schritt für Schritt Anleitung

## Voraussetzungen

✅ Git ist installiert (du hast es bereits)
✅ GitHub Account (falls nicht: [github.com/signup](https://github.com/signup))

## Schritt 1: Git Bash öffnen

1. Öffne **Git Bash** (nicht PowerShell oder CMD)
   - Suche nach "Git Bash" im Startmenü
   - Oder Rechtsklick im Projektordner → "Git Bash Here"

## Schritt 2: Zum Projektordner navigieren

```bash
cd "/d/Webpage Feedback/eeg-feedback-app"
```

**Hinweis**: In Git Bash verwende `/d/` statt `d:\` und `/` statt `\`

## Schritt 3: Git initialisieren (falls noch nicht geschehen)

```bash
git init
```

## Schritt 4: Git Konfiguration (nur beim ersten Mal)

```bash
git config user.name "Dr. Andreas Franzelin"
git config user.email "franzelin.andreas@gmail.com"
```

## Schritt 5: Alle Dateien hinzufügen

```bash
git add .
```

## Schritt 6: Ersten Commit erstellen

```bash
git commit -m "Initial commit - EEG Feedback App with Booking System"
```

## Schritt 7: GitHub Repository erstellen

1. Gehe zu [github.com](https://github.com)
2. Klicke auf **"+"** oben rechts → **"New repository"**
3. Repository Name: z.B. `eeg-feedback-app` oder `eeg-booking-system`
4. Beschreibung: "EEG Feedback App with Appointment Booking System"
5. Wähle **Public** oder **Private**
6. **WICHTIG**: Lasse **"Initialize this repository with a README"** UNCHECKED
7. Klicke **"Create repository"**

## Schritt 8: Repository URL kopieren

Nach dem Erstellen siehst du eine Seite mit Befehlen. Kopiere die **HTTPS URL**, z.B.:
```
https://github.com/dein-username/eeg-feedback-app.git
```

## Schritt 9: Remote Repository verbinden

In Git Bash, führe aus (ersetze die URL mit deiner):

```bash
git remote add origin https://github.com/dein-username/eeg-feedback-app.git
```

## Schritt 10: Code hochladen

```bash
git branch -M main
git push -u origin main
```

Du wirst nach deinem GitHub Username und Password gefragt.

**WICHTIG**: Falls du 2FA aktiviert hast, musst du ein **Personal Access Token** verwenden statt dem Passwort:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token"
3. Scopes: `repo` aktivieren
4. Token kopieren und als Passwort verwenden

## Schritt 11: Prüfen

Gehe zu deinem GitHub Repository und prüfe ob alle Dateien hochgeladen wurden.

## Automatisches Deployment (Optional)

### GitHub Pages (für statische Website)

1. Im Repository → **Settings** → **Pages**
2. Source: **"Deploy from a branch"**
3. Branch: **main** → **/ (root)**
4. Klicke **"Save"**
5. Deine Website ist unter: `https://dein-username.github.io/eeg-feedback-app`

### Railway Auto-Deploy

1. Gehe zu [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Wähle dein Repository
4. Railway deployt automatisch bei jedem Push!

## Wichtige Dateien die NICHT hochgeladen werden

Die `.gitignore` Datei sorgt dafür, dass folgende Dateien NICHT hochgeladen werden:
- `node_modules/` (zu groß)
- `.env` (sensible Daten!)
- `*.log` (Log-Dateien)
- `dist/` (Build-Ordner)

## Nächste Schritte nach GitHub Upload

1. ✅ Code ist auf GitHub
2. ✅ Railway kann jetzt das Repository verbinden
3. ✅ Auto-Deploy ist aktiviert

## Troubleshooting

### "fatal: not a git repository"
**Lösung**: Führe `git init` aus

### "error: failed to push"
**Lösung**: 
- Prüfe ob du eingeloggt bist: `git config --global user.name`
- Prüfe ob Remote korrekt ist: `git remote -v`
- Versuche: `git push -u origin main --force` (Vorsicht: überschreibt Remote!)

### "Authentication failed"
**Lösung**: 
- Verwende Personal Access Token statt Passwort
- Oder: GitHub Desktop verwenden

### "Permission denied"
**Lösung**: 
- Prüfe ob du Zugriff auf das Repository hast
- Prüfe ob die URL korrekt ist

## Alternative: GitHub Desktop

Falls Git Bash Probleme macht, kannst du **GitHub Desktop** verwenden:

1. Lade [desktop.github.com](https://desktop.github.com) herunter
2. Installiere und logge dich ein
3. File → Add Local Repository
4. Wähle deinen Projektordner
5. Klicke "Publish repository"

Viel einfacher! 🎉

