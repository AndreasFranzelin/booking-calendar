# Netlify Deployment - Einfache Anleitung

## Option 1: Drag & Drop (Empfohlen - Einfachste Methode)

1. **Gehe zu Netlify Dashboard**
   - Öffne [app.netlify.com](https://app.netlify.com)
   - Logge dich ein

2. **Deploy per Drag & Drop**
   - Ziehe den gesamten Ordner `d:\Webpage Feedback\eeg-feedback-app` 
   - ODER nur die `index.html` Datei in das Netlify Dashboard
   - Netlify deployt automatisch

3. **Fertig!**
   - Netlify gibt dir eine URL wie: `https://random-name-123.netlify.app`
   - Die Website ist sofort live!

## Option 2: Netlify CLI (Falls du die Site-ID kennst)

Falls du bereits eine Netlify Site hast:

1. **Site-ID finden**
   - Gehe zu deiner Site im Netlify Dashboard
   - Site settings → General → Site details
   - Kopiere die Site ID

2. **Manuell verknüpfen**
   - Erstelle eine `.netlify/state.json` Datei (falls nötig)
   - Oder verwende: `netlify deploy --prod --dir . --site YOUR_SITE_ID`

## Wichtige Dateien für Deployment

- ✅ `index.html` (Hauptdatei - bereits aktualisiert)
- ✅ Alle Bilder sollten über URLs verfügbar sein (bereits so konfiguriert)
- ⚠️ Lokale Bilder (`../Picts/`) müssen auf den Server hochgeladen werden

## Nach dem Deployment

1. **Prüfe die Website**
   - Öffne die Netlify URL
   - Teste alle Funktionen

2. **Bilder prüfen**
   - Falls lokale Bilder nicht laden, lade sie auf einen Image-Hosting-Service hoch
   - Oder füge sie zum Netlify-Projekt hinzu

3. **Backend URL anpassen** (falls nötig)
   - In `index.html` die `API_BASE_URL` auf deine Railway/Backend URL setzen

