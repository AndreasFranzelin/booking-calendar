import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Serve static files from current directory
app.use(express.static(__dirname));

// Serve index.html for root and all routes (SPA-like behavior)
app.get('*', (req, res) => {
    try {
        const indexPath = join(__dirname, 'index.html');
        const html = readFileSync(indexPath, 'utf8');
        res.send(html);
    } catch (error) {
        res.status(500).send('Error loading index.html: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log('\n✅ Lokaler Test-Server gestartet!');
    console.log(`📂 Dateien werden von: ${__dirname}`);
    console.log(`🌐 Öffne im Browser: http://localhost:${PORT}`);
    console.log(`\n💡 Tipp: Drücke Strg+C zum Beenden\n`);
});


