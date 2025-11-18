# Production Deployment Checklist

## Vor dem Deployment

### Backend Setup

- [ ] Google Calendar API aktiviert
- [ ] Google OAuth Credentials erstellt
- [ ] Refresh Token generiert
- [ ] Stripe Account erstellt
- [ ] Stripe Live Keys generiert
- [ ] Gmail App Password erstellt
- [ ] Alle Environment Variables dokumentiert

### Frontend Setup

- [ ] `API_BASE_URL` in `index.html` auf Production-URL gesetzt
- [ ] `STRIPE_PUBLISHABLE_KEY` in `index.html` auf Live Key gesetzt
- [ ] Alle Test-Keys entfernt

## Deployment Schritte

### 1. Backend deployen

- [ ] Code auf Server/Platform hochgeladen
- [ ] Environment Variables gesetzt
- [ ] Dependencies installiert (`npm install`)
- [ ] Server gestartet
- [ ] Health Check erfolgreich: `/health` Endpoint testen

### 2. Frontend deployen

- [ ] `API_BASE_URL` korrekt gesetzt
- [ ] `STRIPE_PUBLISHABLE_KEY` korrekt gesetzt
- [ ] Website deployed
- [ ] HTTPS aktiviert

### 3. Konfiguration prüfen

- [ ] CORS richtig konfiguriert
- [ ] Google Calendar ID korrekt
- [ ] Email-Adresse korrekt
- [ ] Stripe Keys sind Live Keys (nicht Test)

## Testing

### Funktionale Tests

- [ ] Termine werden geladen
- [ ] Terminauswahl funktioniert
- [ ] Zahlung funktioniert (Test mit Stripe Test Card)
- [ ] Email wird an dich gesendet
- [ ] Email wird an Kunden gesendet
- [ ] Termin wird in Google Calendar erstellt
- [ ] Termin hat richtige Dauer (50 Minuten)
- [ ] Termin hat richtige Zeiten (10-12, 14-16 Uhr)
- [ ] Nur Dienstag-Freitag werden angezeigt

### Sicherheits-Tests

- [ ] HTTPS funktioniert
- [ ] CORS blockiert fremde Domains
- [ ] Environment Variables nicht im Code sichtbar
- [ ] Keine Test Keys in Production

## Nach dem Deployment

### Monitoring einrichten

- [ ] Server-Logs überwachen
- [ ] Error Tracking aktiviert (optional)
- [ ] Uptime Monitoring (optional)

### Dokumentation

- [ ] Deployment-URLs dokumentiert
- [ ] Zugangsdaten sicher gespeichert
- [ ] Backup-Strategie definiert

## Wichtige URLs

- Frontend: _______________________
- Backend API: _______________________
- Stripe Dashboard: https://dashboard.stripe.com
- Google Cloud Console: https://console.cloud.google.com
- Railway/Heroku Dashboard: _______________________

## Notfall-Kontakte

- Stripe Support: https://support.stripe.com
- Google Cloud Support: https://cloud.google.com/support
- Server Provider Support: _______________________

## Backup-Plan

- [ ] Environment Variables gesichert
- [ ] Google Refresh Token gesichert
- [ ] Stripe Keys gesichert
- [ ] Code in Git Repository

## Häufige Probleme

### Problem: CORS Error
**Lösung**: Prüfe `ALLOWED_ORIGINS` in Environment Variables

### Problem: Termine werden nicht geladen
**Lösung**: 
1. Prüfe ob Backend läuft
2. Prüfe Browser-Konsole für Fehler
3. Prüfe Server-Logs

### Problem: Zahlung schlägt fehl
**Lösung**:
1. Prüfe ob Live Keys verwendet werden
2. Prüfe Stripe Dashboard
3. Prüfe Browser-Konsole

### Problem: Email wird nicht versendet
**Lösung**:
1. Prüfe Gmail App Password
2. Prüfe ob 2-Step Verification aktiviert ist
3. Prüfe Server-Logs für Email-Fehler

## Erfolgreich deployed wenn:

✅ Health Check funktioniert
✅ Termine werden geladen
✅ Test-Buchung erfolgreich
✅ Email wird versendet
✅ Termin in Google Calendar erstellt
✅ Zahlung funktioniert

---

**Datum des Deployments**: _______________
**Durchgeführt von**: _______________

