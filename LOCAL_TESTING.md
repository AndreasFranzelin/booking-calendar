# Lokales Testen der Website

## Schnellstart

Um die Website lokal zu testen, ohne sie zu deployen:

```bash
npm run local
```

Oder direkt:

```bash
node start-local.js
```

## Was passiert?

1. Ein lokaler Server startet auf **http://localhost:8080**
2. Die Website wird im Browser geöffnet
3. Du kannst alle Änderungen sofort sehen
4. **Wichtig**: Änderungen werden NICHT automatisch deployed!

## Workflow

1. **Änderungen machen** in `index.html`
2. **Lokalen Server starten**: `npm run local`
3. **Im Browser testen**: http://localhost:8080
4. **Änderungen speichern** und Browser neu laden (Strg+R oder F5)
5. **Wenn alles funktioniert**: Dann erst deployen!

## Backend-Server (für Stripe/Booking)

Falls du auch das Backend lokal testen willst:

```bash
# Terminal 1: Frontend
npm run local

# Terminal 2: Backend
node server.js
```

Das Backend läuft dann auf **http://localhost:3000**

## Server beenden

Drücke **Strg+C** im Terminal, um den Server zu beenden.

## Vorteile

✅ Änderungen werden sofort sichtbar  
✅ Keine Gefahr, die Live-Website zu beschädigen  
✅ Kann offline getestet werden  
✅ Einfach zu bedienen  


