# Dolomiti Email Processor - Setup Guide

## Übersicht der Änderungen

Das Google Apps Script wurde aktualisiert mit folgenden Funktionen:

1. **Fehlerbehandlung**: Alle Logger.log-Aufrufe wurden entfernt und Fehler werden stillschweigend behandelt
2. **Monatlicher E-Mail-Bericht**: Sendet einmal monatlich eine Zusammenfassung mit:
   - Strom-Rechnungen pro Wohnung
   - Gas-Rechnungen pro Wohnung
   - Unbekannte Dateien

## Setup-Anleitung

### Schritt 1: Script in Google Apps Script einrichten

1. Gehen Sie zu [Google Apps Script](https://script.google.com)
2. Erstellen Sie ein neues Projekt
3. Kopieren Sie den Inhalt von `dolomiti_email_processor.gs` in den Editor
4. Speichern Sie das Projekt (z.B. "Dolomiti Rechnungen Processor")

### Schritt 2: Berechtigungen erteilen

1. Klicken Sie auf "Ausführen" (Run) für die Funktion `saveDolomitiAttachments`
2. Erteilen Sie die erforderlichen Berechtigungen:
   - Gmail-Zugriff (zum Lesen von E-Mails)
   - Google Drive-Zugriff (zum Speichern von Dateien)
   - E-Mail-Versand (für monatliche Berichte)

### Schritt 3: Zeitgesteuerte Trigger einrichten

#### Täglicher Trigger (für E-Mail-Verarbeitung)

1. Klicken Sie auf das Uhrensymbol (Trigger) links im Menü
2. Klicken Sie auf "+ Trigger hinzufügen"
3. Wählen Sie:
   - **Funktion auswählen**: `dailyProcess`
   - **Ereignisquelle**: Zeitgesteuert
   - **Zeitbasierter Trigger-Typ**: Täglich
   - **Tageszeit**: Wählen Sie eine passende Zeit (z.B. 08:00 Uhr)
4. Speichern Sie den Trigger

#### Monatlicher Trigger (für E-Mail-Bericht)

1. Klicken Sie erneut auf "+ Trigger hinzufügen"
2. Wählen Sie:
   - **Funktion auswählen**: `sendMonthlyReport`
   - **Ereignisquelle**: Zeitgesteuert
   - **Zeitbasierter Trigger-Typ**: Monatlich
   - **Tag des Monats**: Wählen Sie einen Tag (z.B. 1. des Monats)
   - **Tageszeit**: Wählen Sie eine passende Zeit (z.B. 09:00 Uhr)
3. Speichern Sie den Trigger

### Schritt 4: Anpassungen (optional)

Falls Sie die Wohnungserkennung aus Dateinamen anpassen möchten, können Sie die Funktion `extractWohnungFromFilename` im Script anpassen. Die aktuelle Version erkennt:
- "Wohnung X", "Apt X", "Apartment X", "Appartamento X"
- Dateinamen, die mit Wohnungscode beginnen (z.B. "A1_...", "B2_...")

## Funktionsweise

### Tägliche Verarbeitung (`dailyProcess`)
- Wird täglich automatisch ausgeführt
- Sucht nach ungelesenen E-Mails von `serviziweb@sportelloclienti.it` mit PDF-Anhängen
- **Erkennt automatisch die Wohnung aus dem Dateinamen**
- **Erstellt automatisch Unterordner für jede Wohnung** (falls nicht vorhanden)
- **Speichert PDFs direkt im entsprechenden Wohnungs-Unterordner**
- Struktur: `Dolomiti Rechnungen/Wohnung1/rechnung.pdf`
- Markiert E-Mails als gelesen
- Keine Fehlermeldungen werden angezeigt

### Wohnungserkennung

Das Script erkennt Wohnungen auf zwei Arten:

1. **Aus der Liste `WOHNUNGS_CODES`** (falls konfiguriert):
   - Sucht nach bekannten Codes im Dateinamen
   - Beispiel: Wenn "A1" in der Liste steht und im Dateinamen vorkommt → Wohnung = "A1"

2. **Automatische Erkennung** (falls keine Liste vorhanden):
   - Sucht nach Mustern wie "Wohnung X", "Apt X", "Apartment X"
   - Erkennt Codes am Anfang des Dateinamens (z.B. "A1_rechnung.pdf" → "A1")
   - Falls nichts gefunden wird → "Unbekannt"

### Monatlicher Bericht (`sendMonthlyReport`)
- Wird monatlich automatisch ausgeführt
- **Durchsucht alle Unterordner rekursiv** (Hauptordner + alle Wohnungsordner)
- Analysiert alle PDF-Dateien der letzten 30 Tage
- **Verwendet den Ordnernamen als Wohnungscode** (falls Datei in einem Wohnungsordner liegt)
- Kategorisiert nach:
  - **Strom**: Dateien mit "elettrica", "strom", "electric" im Namen
  - **Gas**: Dateien mit "gas", "naturale" im Namen
  - **Unbekannt**: Alle anderen PDFs
- Sendet E-Mail-Bericht an `immobilien.franzelin@gmail.com` mit Aufschlüsselung pro Wohnung

### Hilfsfunktion: Wohnungscodes anzeigen

Die Funktion `zeigeErkannteWohnungen()` kann manuell ausgeführt werden, um alle erkannten Wohnungscodes anzuzeigen:
- Durchsucht alle vorhandenen Dateien und Ordner
- Zeigt eine Liste aller gefundenen Wohnungscodes
- Nützlich, um zu sehen, welche Codes das Script erkennt

## Fehlerbehandlung

Alle Fehler werden stillschweigend behandelt:
- Fehler beim Ordnerzugriff
- Fehler beim Lesen von E-Mails
- Fehler beim Verarbeiten einzelner Anhänge
- Fehler beim Senden von E-Mails

Das Script läuft weiter, auch wenn einzelne Operationen fehlschlagen.

## Testen

Um das Script manuell zu testen:

1. **E-Mail-Verarbeitung testen**:
   - Führen Sie `saveDolomitiAttachments` manuell aus
   - Prüfen Sie, ob PDFs im Google Drive Ordner erscheinen

2. **Monatlichen Bericht testen**:
   - Führen Sie `sendMonthlyReport` manuell aus
   - Prüfen Sie Ihr E-Mail-Postfach auf den Bericht

3. **Wohnungscodes anzeigen**:
   - Führen Sie `zeigeErkannteWohnungen` manuell aus
   - Die Funktion zeigt alle erkannten Wohnungscodes an
   - Nützlich, um zu überprüfen, ob die Erkennung korrekt funktioniert

## Wichtige Hinweise

### Ordnerstruktur

Das Script erstellt automatisch folgende Struktur:
```
Dolomiti Rechnungen/
  ├── Wohnung1/
  │   ├── rechnung1.pdf
  │   └── rechnung2.pdf
  ├── Wohnung2/
  │   └── rechnung1.pdf
  └── Unbekannt/
      └── rechnung_ohne_code.pdf
```

Diese Struktur entspricht genau dem, was das Python-Skript erwartet. Die PDFs werden automatisch in die richtigen Unterordner sortiert.

### Wohnungserkennung

- Das Script analysiert Dateinamen, um Wohnungen zu identifizieren
- Falls Ihre Dateinamen anders strukturiert sind, passen Sie `extractWohnungFromFilename` an
- **Tipp**: Tragen Sie Ihre Wohnungscodes in `WOHNUNGS_CODES` ein, um die Erkennung zu verbessern
- Verwenden Sie `zeigeErkannteWohnungen()`, um zu sehen, welche Codes erkannt werden

### Kategorisierung

- Die Kategorisierung (Strom/Gas) basiert auf Dateinamen
- Das Python-Skript auf Ihrem Desktop verifiziert dies später durch PDF-Inhaltsanalyse
- Der monatliche Bericht zeigt Dateien der letzten 30 Tage, nicht nur des aktuellen Monats

