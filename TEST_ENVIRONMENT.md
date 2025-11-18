# 🧪 Test-Umgebung Setup

## ✅ Was wurde erstellt:

1. **Backup**: `index_backup_stable.html` - Eiserne Reserve der funktionierenden Version
2. **Test-Datei**: `index_test.html` - Kopie der aktuellen Version für Experimente
3. **Server-Route**: `/test` - Route im server.js für die Test-Version

## 🔒 WICHTIG: `index.html` bleibt unberührt!

Die Datei `index.html` wird **NICHT** mehr verändert. Alle Experimente finden in `index_test.html` statt.

## 🚀 So verwendest du die Test-Umgebung:

### 1. Backend-Server starten:
```bash
node server.js
```

### 2. Test-Version öffnen:
Öffne im Browser: **http://localhost:3000/test**

### 3. Änderungen machen:
- Bearbeite **NUR** `index_test.html`
- Speichere die Datei
- Browser neu laden (F5)

### 4. Wenn alles funktioniert:
- Kopiere die Änderungen von `index_test.html` nach `index.html`
- **DANN ERST** auf Netlify deployen

## 📁 Datei-Übersicht:

- `index.html` → **LIVE-VERSION** (nur ändern wenn sicher!)
- `index_test.html` → **TEST-VERSION** (hier experimentieren)
- `index_backup_stable.html` → **BACKUP** (eiserne Reserve)

## ⚠️ Regeln:

1. ✅ **IMMER** erst in `index_test.html` testen
2. ✅ **NUR** wenn alles funktioniert → nach `index.html` übertragen
3. ✅ **NIE** direkt an `index.html` arbeiten
4. ✅ **BACKUP** vor jedem großen Deploy erstellen


