//########### ANPASSUNGEN ###########

// Tragen Sie hier den Namen des Ordners in Google Drive ein, in dem die Rechnungen gespeichert werden sollen.
const ZIELORDNER = "Dolomiti Rechnungen";

// E-Mail-Adresse für monatliche Berichte
const REPORT_EMAIL = "immobilien.franzelin@gmail.com";

// Wohnungscodes/Kennziffern - Bitte hier Ihre Wohnungscodes eintragen
// Format: ["CODE1", "CODE2", "CODE3", ...]
// Beispiel: ["A1", "A2", "B1", "Wohnung1", "Apt2"]
const WOHNUNGS_CODES = [
  // Bitte hier Ihre Wohnungscodes eintragen:
  // "CODE1",
  // "CODE2",
  // ...
];

//###################################

// Globale Variablen für die monatliche Zusammenfassung
var monthlyReport = {
  strom: {},
  gas: {},
  unbekannt: []
};

function saveDolomitiAttachments() {
  // Suchanfrage für Gmail: E-Mails von der angegebenen Adresse, die einen Anhang haben und ungelesen sind.
  const suchanfrage = 'from:(serviziweb@sportelloclienti.it) has:attachment is:unread';

  // Google Drive Ordner finden oder erstellen
  let ordner;
  try {
    const ordnerListe = DriveApp.getFoldersByName(ZIELORDNER);
    
    if (ordnerListe.hasNext()) {
      ordner = ordnerListe.next();
    } else {
      ordner = DriveApp.createFolder(ZIELORDNER);
    }
  } catch (e) {
    // Fehler beim Ordnerzugriff - stillschweigend ignorieren
    return;
  }

  // Gmail nach den passenden E-Mails durchsuchen
  let threads;
  try {
    threads = GmailApp.search(suchanfrage);
  } catch (e) {
    // Fehler bei der Suche - stillschweigend ignorieren
    return;
  }

  // Jede E-Mail-Konversation durchgehen
  threads.forEach(function(thread) {
    try {
      const messages = thread.getMessages();
      
      // Jede einzelne Nachricht in der Konversation durchgehen
      messages.forEach(function(message) {
        try {
          // Alle Anhänge der Nachricht holen
          const anhaenge = message.getAttachments();
          
          // Jeden Anhang prüfen
          anhaenge.forEach(function(anhang) {
            try {
              // Nur PDF-Dateien speichern
              if (anhang.getContentType() === 'application/pdf') {
                const dateiname = anhang.getName();
                
                // Dateiname analysieren, um Wohnung zu identifizieren
                const wohnung = extractWohnungFromFilename(dateiname);
                
                // Dateityp bestimmen (wird später vom Python-Skript verifiziert, aber wir versuchen es vorherzusagen)
                const dateityp = determineFileType(dateiname);
                
                // Wohnungs-Unterordner finden oder erstellen
                let wohnungsOrdner;
                try {
                  const wohnungsOrdnerListe = ordner.getFoldersByName(wohnung);
                  if (wohnungsOrdnerListe.hasNext()) {
                    wohnungsOrdner = wohnungsOrdnerListe.next();
                  } else {
                    wohnungsOrdner = ordner.createFolder(wohnung);
                  }
                } catch (e) {
                  // Fehler beim Erstellen des Wohnungsordners - verwende Hauptordner
                  wohnungsOrdner = ordner;
                }
                
                // Die PDF-Datei im Wohnungs-Unterordner speichern
                try {
                  wohnungsOrdner.createFile(anhang.copyBlob());
                  
                  // Zur monatlichen Zusammenfassung hinzufügen
                  if (!monthlyReport[dateityp]) {
                    monthlyReport[dateityp] = {};
                  }
                  if (!monthlyReport[dateityp][wohnung]) {
                    monthlyReport[dateityp][wohnung] = [];
                  }
                  monthlyReport[dateityp][wohnung].push(dateiname);
                } catch (e) {
                  // Fehler beim Speichern - stillschweigend ignorieren
                }
              }
            } catch (e) {
              // Fehler beim Verarbeiten eines Anhangs - stillschweigend ignorieren
            }
          });
        } catch (e) {
          // Fehler beim Verarbeiten einer Nachricht - stillschweigend ignorieren
        }
      });
      
      // Die Konversation als gelesen markieren, damit sie nicht erneut bearbeitet wird
      thread.markRead();
    } catch (e) {
      // Fehler beim Verarbeiten eines Threads - stillschweigend ignorieren
    }
  });
}

function extractWohnungFromFilename(filename) {
  // Zuerst: Prüfe, ob einer der bekannten Wohnungscodes im Dateinamen vorkommt
  if (WOHNUNGS_CODES && WOHNUNGS_CODES.length > 0) {
    for (let code of WOHNUNGS_CODES) {
      // Suche nach dem Code im Dateinamen (case-insensitive)
      const regex = new RegExp('\\b' + code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (regex.test(filename)) {
        return code;
      }
    }
  }
  
  // Falls keine bekannten Codes gefunden wurden, versuche automatische Erkennung
  const patterns = [
    /(?:Wohnung|Apt|Apartment|Appartamento)\s*([A-Z0-9]+)/i,
    /([A-Z0-9]+)[_-].*\.pdf/i,
    /^([A-Z0-9]+)/
  ];
  
  for (let pattern of patterns) {
    const match = filename.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // Falls keine Wohnung gefunden, verwende "Unbekannt"
  return "Unbekannt";
}

function determineFileType(filename) {
  // Versuche Dateityp aus Dateinamen zu bestimmen
  const filenameLower = filename.toLowerCase();
  
  if (filenameLower.includes('elettrica') || filenameLower.includes('strom') || filenameLower.includes('electric')) {
    return 'strom';
  } else if (filenameLower.includes('gas') || filenameLower.includes('naturale')) {
    return 'gas';
  } else {
    return 'unbekannt';
  }
}

function sendMonthlyReport() {
  // Diese Funktion sollte monatlich aufgerufen werden (z.B. über Zeitgesteuerten Trigger)
  // Sie sammelt alle verarbeiteten Dateien und sendet einen Bericht
  
  // Lese alle Dateien im Zielordner der letzten 30 Tage
  let ordner;
  try {
    const ordnerListe = DriveApp.getFoldersByName(ZIELORDNER);
    if (!ordnerListe.hasNext()) {
      return; // Kein Ordner vorhanden
    }
    ordner = ordnerListe.next();
  } catch (e) {
    return;
  }
  
  const jetzt = new Date();
  const vor30Tagen = new Date(jetzt.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const reportData = {
    strom: {},
    gas: {},
    unbekannt: []
  };
  
  // Funktion zum Durchsuchen eines Ordners (rekursiv für Unterordner)
  function durchsucheOrdner(aktuellerOrdner, wohnungsName) {
    try {
      // Dateien im aktuellen Ordner durchsuchen
      const dateien = aktuellerOrdner.getFiles();
      while (dateien.hasNext()) {
        try {
          const datei = dateien.next();
          const erstellt = datei.getDateCreated();
          
          // Nur Dateien der letzten 30 Tage berücksichtigen
          if (erstellt >= vor30Tagen) {
            const dateiname = datei.getName();
            if (dateiname.toLowerCase().endsWith('.pdf')) {
              // Wenn wir bereits in einem Wohnungsordner sind, verwende diesen Namen
              // Sonst versuche, die Wohnung aus dem Dateinamen zu extrahieren
              const wohnung = wohnungsName || extractWohnungFromFilename(dateiname);
              const dateityp = determineFileType(dateiname);
              
              if (dateityp === 'strom') {
                if (!reportData.strom[wohnung]) {
                  reportData.strom[wohnung] = [];
                }
                reportData.strom[wohnung].push(dateiname);
              } else if (dateityp === 'gas') {
                if (!reportData.gas[wohnung]) {
                  reportData.gas[wohnung] = [];
                }
                reportData.gas[wohnung].push(dateiname);
              } else {
                reportData.unbekannt.push(dateiname);
              }
            }
          }
        } catch (e) {
          // Fehler beim Verarbeiten einer Datei - stillschweigend ignorieren
        }
      }
      
      // Unterordner durchsuchen (rekursiv)
      const unterordner = aktuellerOrdner.getFolders();
      while (unterordner.hasNext()) {
        try {
          const unterordnerInstanz = unterordner.next();
          const ordnerName = unterordnerInstanz.getName();
          durchsucheOrdner(unterordnerInstanz, ordnerName);
        } catch (e) {
          // Fehler beim Durchsuchen eines Unterordners - stillschweigend ignorieren
        }
      }
    } catch (e) {
      // Fehler beim Durchsuchen des Ordners - stillschweigend ignorieren
    }
  }
  
  // Hauptordner und alle Unterordner durchsuchen
  durchsucheOrdner(ordner, null);
  
  // E-Mail-Bericht erstellen
  let emailBody = "Monatlicher Bericht - Dolomiti Rechnungen\n\n";
  emailBody += "Zeitraum: " + vor30Tagen.toLocaleDateString('de-DE') + " bis " + jetzt.toLocaleDateString('de-DE') + "\n\n";
  
  // Strom-Rechnungen
  emailBody += "=== STROM-RECHNUNGEN ===\n";
  if (Object.keys(reportData.strom).length === 0) {
    emailBody += "Keine Strom-Rechnungen gefunden.\n";
  } else {
    for (let wohnung in reportData.strom) {
      emailBody += "\n" + wohnung + ":\n";
      reportData.strom[wohnung].forEach(function(datei) {
        emailBody += "  - " + datei + "\n";
      });
    }
  }
  
  emailBody += "\n=== GAS-RECHNUNGEN ===\n";
  if (Object.keys(reportData.gas).length === 0) {
    emailBody += "Keine Gas-Rechnungen gefunden.\n";
  } else {
    for (let wohnung in reportData.gas) {
      emailBody += "\n" + wohnung + ":\n";
      reportData.gas[wohnung].forEach(function(datei) {
        emailBody += "  - " + datei + "\n";
      });
    }
  }
  
  emailBody += "\n=== UNBEKANNTE DATEIEN ===\n";
  if (reportData.unbekannt.length === 0) {
    emailBody += "Keine unbekannten Dateien gefunden.\n";
  } else {
    reportData.unbekannt.forEach(function(datei) {
      emailBody += "  - " + datei + "\n";
    });
  }
  
  // E-Mail senden
  try {
    MailApp.sendEmail({
      to: REPORT_EMAIL,
      subject: "Monatlicher Bericht - Dolomiti Rechnungen",
      body: emailBody
    });
  } catch (e) {
    // Fehler beim Senden der E-Mail - stillschweigend ignorieren
  }
}

// Hauptfunktion, die täglich ausgeführt werden sollte
function dailyProcess() {
  saveDolomitiAttachments();
}

// Hilfsfunktion: Zeigt alle erkannten Wohnungscodes aus vorhandenen Dateien an
// Diese Funktion kann manuell ausgeführt werden, um zu sehen, welche Codes erkannt werden
function zeigeErkannteWohnungen() {
  let ordner;
  try {
    const ordnerListe = DriveApp.getFoldersByName(ZIELORDNER);
    if (!ordnerListe.hasNext()) {
      return "Kein Ordner gefunden.";
    }
    ordner = ordnerListe.next();
  } catch (e) {
    return "Fehler beim Zugriff auf den Ordner.";
  }
  
  const gefundeneWohnungen = new Set();
  
  // Funktion zum Durchsuchen aller Ordner
  function durchsucheAlleOrdner(aktuellerOrdner) {
    try {
      // Dateien durchsuchen
      const dateien = aktuellerOrdner.getFiles();
      while (dateien.hasNext()) {
        try {
          const datei = dateien.next();
          const dateiname = datei.getName();
          if (dateiname.toLowerCase().endsWith('.pdf')) {
            const wohnung = extractWohnungFromFilename(dateiname);
            gefundeneWohnungen.add(wohnung);
          }
        } catch (e) {
          // Ignorieren
        }
      }
      
      // Unterordner durchsuchen
      const unterordner = aktuellerOrdner.getFolders();
      while (unterordner.hasNext()) {
        try {
          const unterordnerInstanz = unterordner.next();
          const ordnerName = unterordnerInstanz.getName();
          gefundeneWohnungen.add(ordnerName); // Ordnername ist auch ein Wohnungscode
          durchsucheAlleOrdner(unterordnerInstanz);
        } catch (e) {
          // Ignorieren
        }
      }
    } catch (e) {
      // Ignorieren
    }
  }
  
  durchsucheAlleOrdner(ordner);
  
  const wohnungenArray = Array.from(gefundeneWohnungen).sort();
  return "Gefundene Wohnungscodes:\n" + wohnungenArray.join("\n");
}

