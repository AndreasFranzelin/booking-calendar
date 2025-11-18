const { google } = require('googleapis');
const open = require('open');
const readline = require('readline');

// --- DEINE ZUGANGSDATEN (Bereits ausgefüllt) ---
const YOUR_CLIENT_ID = '1035349914866-3knj5rfsubtm244g7eqfe13f1lpftfkm.apps.googleusercontent.com';
const YOUR_CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

const oAuth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline', 
  scope: SCOPES,
  prompt: 'consent'
});

console.log('--------------------------------------------------');
console.log('Öffne jetzt diesen Link, um dich einzuloggen:');
console.log(authUrl);
console.log('--------------------------------------------------');

(async () => {
    try {
        await open(authUrl);
    } catch (err) {
        // Falls es nicht automatisch aufgeht
    }
})();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nKopiere den Code aus der Adresszeile und füge ihn hier ein: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Fehler beim Abrufen des Tokens:', err);
    console.log('\n\n******************************************');
    console.log('ERFOLG! Dein REFRESH TOKEN lautet:');
    console.log('******************************************\n');
    console.log(token.refresh_token); 
    console.log('\n******************************************');
  });
});