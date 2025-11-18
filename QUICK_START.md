# Quick Start - GitHub Upload

## Schnellste Methode: GitHub Desktop

1. **GitHub Desktop installieren**
   - [desktop.github.com](https://desktop.github.com)
   - Installieren und mit GitHub Account einloggen

2. **Repository erstellen**
   - File → New Repository
   - Name: `eeg-feedback-app`
   - Local Path: `d:\Webpage Feedback\eeg-feedback-app`
   - Klicke "Create Repository"

3. **Hochladen**
   - Klicke "Publish repository"
   - Wähle ob Public oder Private
   - Fertig! ✅

## Alternative: Git Bash (Manuell)

1. **Git Bash öffnen** (im Projektordner)

2. **Befehle ausführen**:
```bash
cd "/d/Webpage Feedback/eeg-feedback-app"
git init
git add .
git commit -m "Initial commit"
```

3. **Auf GitHub**:
   - Neues Repository erstellen (ohne README!)
   - URL kopieren

4. **Verbinden und pushen**:
```bash
git remote add origin https://github.com/dein-username/eeg-feedback-app.git
git branch -M main
git push -u origin main
```

## Nach dem Upload

1. ✅ Code ist auf GitHub
2. ✅ Gehe zu Railway.app
3. ✅ "Deploy from GitHub repo"
4. ✅ Wähle dein Repository
5. ✅ Fertig!

