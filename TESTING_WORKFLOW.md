# ⚠️ WICHTIG: Workflow für lokales Testen

## 🚨 Regel #1: NIEMALS `index.html` direkt ändern!

Die Datei `index.html` ist die **LIVE-VERSION** und wird auf Netlify deployed!

## ✅ Korrekter Workflow:

### 1. Für lokale Tests:
```bash
# Verwende die TEST-Version
index-TEST.html
```

### 2. Lokalen Server starten:
```bash
python -m http.server 8080
```

### 3. Im Browser öffnen:
```
http://localhost:8080/index-TEST.html
```

### 4. Änderungen testen:
- Änderungen in `index-TEST.html` machen
- Speichern
- Browser neu laden (F5)

### 5. Wenn alles funktioniert:
- Änderungen von `index-TEST.html` nach `index.html` übertragen
- **NUR DANN** deployen!

## 📁 Datei-Übersicht:

- `index.html` → **LIVE-VERSION** (nur ändern wenn sicher!)
- `index-TEST.html` → **TEST-VERSION** (hier experimentieren)
- `index_stripe_experimental.html` → Backup mit Stripe-Code
- `index copy.html` → Backup der funktionierenden Version

## 🔒 Sicherheit:

**NIEMALS:**
- ❌ `index.html` direkt bearbeiten ohne zu testen
- ❌ `index-TEST.html` auf Netlify deployen
- ❌ Änderungen ohne lokales Testen deployen

**IMMER:**
- ✅ Erst in `index-TEST.html` testen
- ✅ Lokal prüfen, dass alles funktioniert
- ✅ Dann erst in `index.html` übertragen


