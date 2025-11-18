import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS Configuration for Production
// TEMP FIX: Temporär alle Origins erlauben, um Google Token Issue zu isolieren
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: '*', // TEMP FIX: Alle Origins temporär erlauben für Debugging
    // origin: function (origin, callback) {
    //     // Allow requests with no origin (like mobile apps or curl requests)
    //     if (!origin) return callback(null, true);
    //     if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    // credentials: true // Deaktiviert, da nicht kompatibel mit origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;

// Stripe Initialisierung
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('ERROR: STRIPE_SECRET_KEY is not set in environment variables');
    process.exit(1);
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Google Calendar Setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Setze die Refresh Token (muss einmalig generiert werden)
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'franzelin.andreas@gmail.com';

// Email Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verfügbare Zeitslots: Dienstag-Freitag, 10-12 Uhr und 14-16 Uhr, 50 Minuten
const AVAILABLE_SLOTS = {
    2: [ // Dienstag
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:50' },
        { start: '14:00', end: '14:50' },
        { start: '15:00', end: '15:50' }
    ],
    3: [ // Mittwoch
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:50' },
        { start: '14:00', end: '14:50' },
        { start: '15:00', end: '15:50' }
    ],
    4: [ // Donnerstag
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:50' },
        { start: '14:00', end: '14:50' },
        { start: '15:00', end: '15:50' }
    ],
    5: [ // Freitag
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:50' },
        { start: '14:00', end: '14:50' },
        { start: '15:00', end: '15:50' }
    ]
};

// Helper: Hole alle Events für einen Zeitraum
async function getBusySlots(startDate, endDate) {
    try {
        const response = await calendar.events.list({
            calendarId: CALENDAR_ID,
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        });

        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            response: error.response?.data
        });
        // Re-throw den Fehler, damit der API-Endpoint ihn behandeln kann
        throw error;
    }
}

// Helper: Prüfe ob ein Slot frei ist
// Diese Funktion prüft gegen alle Events im Google Calendar
// Nach einer erfolgreichen Buchung wird der Termin automatisch im Calendar erstellt
// und erscheint dann nicht mehr in der Liste der verfügbaren Termine
function isSlotAvailable(slotStart, slotEnd, busyEvents) {
    const slotStartTime = new Date(slotStart);
    const slotEndTime = new Date(slotEnd);

    for (const event of busyEvents) {
        const eventStart = new Date(event.start.dateTime || event.start.date);
        const eventEnd = new Date(event.end.dateTime || event.end.date);

        // Prüfe auf Überschneidung (auch teilweise Überschneidungen werden als belegt betrachtet)
        if (slotStartTime < eventEnd && slotEndTime > eventStart) {
            return false; // Slot ist belegt
        }
    }
    return true; // Slot ist frei
}

// API: Hole verfügbare Termine für die nächsten 4 Wochen
app.get('/api/available-slots', async (req, res) => {
    try {
        // Rate limiting could be added here
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30); // 1 Monat voraus (30 Tage)

        let busyEvents = [];
        try {
            busyEvents = await getBusySlots(startDate, endDate);
        } catch (error) {
            console.error('Failed to fetch busy slots:', error);
            // Wenn Google Calendar nicht erreichbar ist, verwende leeres Array
            // (alle Slots werden als verfügbar angezeigt)
            busyEvents = [];
        }
        const availableSlots = [];

        // Generiere alle möglichen Slots für die nächsten 30 Tage
        for (let day = 0; day < 30; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + day);
            const dayOfWeek = currentDate.getDay(); // 0 = Sonntag, 2 = Dienstag, etc.

            if (AVAILABLE_SLOTS[dayOfWeek]) {
                const slots = AVAILABLE_SLOTS[dayOfWeek];
                
                for (const slot of slots) {
                    const slotStart = new Date(currentDate);
                    const [hours, minutes] = slot.start.split(':');
                    slotStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);

                    const slotEnd = new Date(currentDate);
                    const [endHours, endMinutes] = slot.end.split(':');
                    slotEnd.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

                    // Nur zukünftige Slots (maximal 30 Tage im Voraus)
                    // Nur Slots, die nicht bereits im Google Calendar gebucht sind
                    if (slotStart > new Date() && isSlotAvailable(slotStart, slotEnd, busyEvents)) {
                        availableSlots.push({
                            start: slotStart.toISOString(),
                            end: slotEnd.toISOString(),
                            display: slotStart.toLocaleString('de-DE', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                        });
                    }
                    // Gebuchte Termine werden automatisch nicht angezeigt, da sie in busyEvents enthalten sind
                }
            }
        }

        res.json({ availableSlots });
    } catch (error) {
        console.error('Error fetching available slots:', error);
        res.status(500).json({ 
            error: 'Failed to fetch available slots',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// API: Erstelle Stripe Payment Intent (dynamischer Preis basierend auf Service)
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const serviceName = req.body?.service || 'Booking';
        const totalAmount = 8000; // Fester Preis: 80€ (in Cent)
        
        console.log(`Creating payment intent: Service=${serviceName}, Total=${totalAmount/100}€`);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount, // Dynamischer Preis basierend auf Service
            currency: 'eur',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'always' // Erlaubt PayPal Redirects
            },
            payment_method_types: ['card', 'paypal'], // Explizit PayPal aktivieren
            metadata: {
                service: serviceName,
                pricePerHour: pricePerHour.toString(),
                duration: '50 minutes'
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

// API: Buche Termin nach erfolgreicher Zahlung
app.post('/api/book-appointment', async (req, res) => {
    try {
        const { startTime, endTime, clientName, clientEmail, service, paymentIntentId } = req.body;

        // Verifiziere Zahlung
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        // Prüfe nochmal ob Slot frei ist
        const busyEvents = await getBusySlots(new Date(startTime), new Date(endTime));
        if (!isSlotAvailable(new Date(startTime), new Date(endTime), busyEvents)) {
            // Erstatte Zahlung
            await stripe.refunds.create({
                payment_intent: paymentIntentId
            });
            return res.status(409).json({ error: 'Slot no longer available. Payment refunded.' });
        }

        // Erstelle Calendar Event
        const event = {
            summary: `Termin: ${service} - ${clientName}`,
            description: `Kunde: ${clientName}\nEmail: ${clientEmail}\nService: ${service}`,
            start: {
                dateTime: startTime,
                timeZone: 'Europe/Berlin'
            },
            end: {
                dateTime: endTime,
                timeZone: 'Europe/Berlin'
            },
            attendees: [
                { email: clientEmail },
                { email: 'franzelin.andreas@gmail.com' }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 Tag vorher
                    { method: 'popup', minutes: 15 } // 15 Minuten vorher
                ]
            }
        };

        const createdEvent = await calendar.events.insert({
            calendarId: CALENDAR_ID,
            resource: event,
            sendUpdates: 'all'
        });

        // Sende Email-Benachrichtigung
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'franzelin.andreas@gmail.com',
            subject: `Neue Terminbuchung: ${clientName}`,
            html: `
                <h2>Neue Terminbuchung</h2>
                <p><strong>Kunde:</strong> ${clientName}</p>
                <p><strong>Email:</strong> ${clientEmail}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Datum & Zeit:</strong> ${new Date(startTime).toLocaleString('de-DE')}</p>
                <p><strong>Dauer:</strong> 50 Minuten</p>
                <p><strong>Zahlung:</strong> Bereits bezahlt (Stripe Payment Intent: ${paymentIntentId})</p>
                <p><strong>Google Calendar Link:</strong> <a href="${createdEvent.data.htmlLink}">Termin öffnen</a></p>
            `
        };

        await transporter.sendMail(mailOptions);

        // Bestätigungs-Email an Kunden
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: clientEmail,
            subject: 'Terminbestätigung - Dr. Andreas Franzelin',
            html: `
                <h2>Ihr Termin wurde bestätigt</h2>
                <p>Liebe/r ${clientName},</p>
                <p>Ihr Termin wurde erfolgreich gebucht:</p>
                <ul>
                    <li><strong>Datum & Zeit:</strong> ${new Date(startTime).toLocaleString('de-DE')}</li>
                    <li><strong>Service:</strong> ${service}</li>
                    <li><strong>Dauer:</strong> 50 Minuten</li>
                </ul>
                <p>Der Termin wurde auch zu Ihrem Google Calendar hinzugefügt.</p>
                <p>Wir freuen uns auf das Gespräch!</p>
                <p>Mit freundlichen Grüßen,<br>Dr. Andreas Franzelin</p>
            `
        };

        await transporter.sendMail(clientMailOptions);

        res.json({
            success: true,
            eventId: createdEvent.data.id,
            eventLink: createdEvent.data.htmlLink
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Failed to book appointment' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Root-Route: Muss IMMER index.html ausliefern (für Live-Besucher)
app.get('/', (req, res) => {
    try {
        const indexPath = join(__dirname, 'index.html');
        const html = readFileSync(indexPath, 'utf8');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        res.status(500).send('Error loading index.html: ' + error.message);
    }
});

// Test-Route: Liefert index_test.html (für Entwicklung)
app.get('/test', (req, res) => {
    try {
        const testHtmlPath = join(__dirname, 'index_test.html');
        const html = readFileSync(testHtmlPath, 'utf8');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        res.status(500).send('Error loading index_test.html: ' + error.message);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📅 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ Health check: http://localhost:${PORT}/health`);
    
    // Validate required environment variables
    const requiredVars = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'GOOGLE_REFRESH_TOKEN',
        'STRIPE_SECRET_KEY',
        'EMAIL_USER',
        'EMAIL_PASSWORD'
    ];
    
    const missingVars = requiredVars.filter(v => !process.env[v]);
    if (missingVars.length > 0) {
        console.warn('⚠️  Warning: Missing environment variables:', missingVars.join(', '));
    } else {
        console.log('✅ All required environment variables are set');
    }
});

