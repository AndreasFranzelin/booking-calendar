<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Andreas Franzelin - Neurowissenschaft & Mentales Wohlbefinden</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .smooth-scroll {
            scroll-behavior: smooth;
        }
        .nav-link.active {
            @apply bg-slate-700 text-white;
        }
        .aspect-w-16 {
            position: relative;
            padding-bottom: 56.25%;
        }
        .aspect-w-16 > * {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .modal-backdrop {
            transition: opacity 0.3s ease-in-out;
        }
        .modal-content {
            transition: transform 0.3s ease-in-out;
        }
        .star-rating .star {
            transition: transform 0.2s, color 0.2s;
        }
        .star-rating .star:hover {
            transform: scale(1.1);
        }
    </style>
</head>
<body class="bg-white text-slate-700 smooth-scroll">

    <div class="md:flex">
        <!-- Left Fixed Panel -->
        <header class="md:w-1/3 lg:w-1/4 md:h-screen md:sticky md:top-0 bg-slate-800 text-white p-8 lg:p-12 flex flex-col justify-between">
            <div>
                 <div class="flex justify-between items-start mb-12">
                    <div class="text-left">
                         <img src="https://placehold.co/120x120/E2E8F0/1E293B?text=Dr.+AF" alt="Dr. Andreas Franzelin" class="w-24 h-24 rounded-full mb-4 shadow-lg border-4 border-slate-700">
                        <h1 class="text-3xl font-extrabold text-white" data-lang-key="drName">Dr. Andreas Franzelin</h1>
                        <p class="text-slate-400 mt-1" data-lang-key="drTitle">Neurowissenschaftler & Coach</p>
                    </div>
                     <!-- Language Switcher -->
                    <div class="hidden md:block">
                        <div class="flex border border-slate-600 rounded-lg">
                            <button id="lang-de" class="lang-btn bg-slate-700 text-white px-3 py-1 rounded-l-md text-sm font-semibold">DE</button>
                            <button id="lang-en" class="lang-btn text-slate-400 px-3 py-1 rounded-r-md text-sm font-semibold">EN</button>
                        </div>
                    </div>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:block space-y-2">
                    <a href="#home" class="nav-link group flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <i data-lucide="home" class="w-5 h-5"></i> <span data-lang-key="navHome">Home</span>
                    </a>
                    <a href="#services" class="nav-link group flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <i data-lucide="brain-circuit" class="w-5 h-5"></i> <span data-lang-key="navServices">Services</span>
                    </a>
                    <a href="#about" class="nav-link group flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <i data-lucide="user-circle" class="w-5 h-5"></i> <span data-lang-key="navAbout">Über Mich</span>
                    </a>
                    <a href="#youtube" class="nav-link group flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <i data-lucide="youtube" class="w-5 h-5"></i> <span>YouTube</span>
                    </a>
                     <a href="#contact" class="nav-link group flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <i data-lucide="mail" class="w-5 h-5"></i> <span data-lang-key="navContact">Kontakt</span>
                    </a>
                </nav>
            </div>
            
            <div class="hidden md:block text-center md:text-left">
                <div class="flex justify-center md:justify-start space-x-4 mb-4">
                    <a href="https://youtube.com/@tdpostmoderne?si=HdZtzleXE3hh6MES" target="_blank" class="text-slate-400 hover:text-white transition"><i data-lucide="youtube" class="w-6 h-6"></i></a>
                    <a href="https://www.instagram.com/tierederpostmoderne/" target="_blank" class="text-slate-400 hover:text-white transition"><i data-lucide="instagram" class="w-6 h-6"></i></a>
                    <a href="#" class="text-slate-400 hover:text-white transition"><i data-lucide="linkedin" class="w-6 h-6"></i></a>
                </div>
                <p class="text-xs text-slate-500">&copy; <span id="year"></span> Dr. Andreas Franzelin.</p>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-button" class="md:hidden absolute top-8 right-8 flex items-center text-slate-300">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </header>

        <!-- Mobile Menu (Full Screen) -->
        <div id="mobile-menu" class="hidden md:hidden fixed inset-0 bg-slate-800 z-50 p-8 flex flex-col justify-between">
             <button id="mobile-close-button" class="absolute top-8 right-8 text-slate-300">
                <i data-lucide="x" class="w-8 h-8"></i>
            </button>
            <nav class="space-y-6 text-center mt-20">
                <a href="#home" class="mobile-nav-link block text-3xl font-bold text-slate-300 hover:text-white" data-lang-key="navHome">Home</a>
                <a href="#services" class="mobile-nav-link block text-3xl font-bold text-slate-300 hover:text-white" data-lang-key="navServices">Services</a>
                <a href="#about" class="mobile-nav-link block text-3xl font-bold text-slate-300 hover:text-white" data-lang-key="navAbout">Über Mich</a>
                <a href="#youtube" class="mobile-nav-link block text-3xl font-bold text-slate-300 hover:text-white">YouTube</a>
                <a href="#contact" class="mobile-nav-link block text-3xl font-bold text-slate-300 hover:text-white" data-lang-key="navContact">Kontakt</a>
            </nav>
            <div class="md:hidden">
                <div class="flex border border-slate-600 rounded-lg">
                    <button id="lang-de-mobile" class="lang-btn bg-slate-700 text-white px-4 py-2 rounded-l-md font-semibold">DE</button>
                    <button id="lang-en-mobile" class="lang-btn text-slate-400 px-4 py-2 rounded-r-md font-semibold">EN</button>
                </div>
            </div>
        </div>


        <!-- Right Scrolling Panel -->
        <main class="md:w-2/3 lg:w-3/4">
            <!-- Hero Section -->
            <section id="home" class="p-8 sm:p-16 lg:p-24 min-h-screen flex items-center bg-gradient-to-br from-white to-slate-100">
                <div>
                    <h2 class="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4" data-lang-key="heroTitle">Entfalten Sie Ihr Potenzial durch Neurowissenschaft</h2>
                    <p class="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl" data-lang-key="heroSubtitle">Nutzen Sie modernste Gehirnforschung für mentales Wohlbefinden, Spitzenleistungen und Selbsterkenntnis.</p>
                    <a href="#contact" class="bg-slate-800 text-white font-bold py-4 px-10 rounded-full hover:bg-slate-700 transition-colors duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5" data-lang-key="heroButton">Beratung buchen</a>
                </div>
            </section>

            <!-- Services Section -->
            <section id="services" class="p-8 sm:p-16 lg:p-24 bg-white">
                <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-16" data-lang-key="servicesTitle">Mein Ansatz</h3>
                <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <!-- Service 1 -->
                    <div class="bg-slate-50 rounded-xl p-8 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                        <div>
                            <i data-lucide="heart-pulse" class="w-12 h-12 text-slate-500 mb-4"></i>
                            <h4 class="text-xl font-bold text-slate-800 mb-3" data-lang-key="service1Title">Mentale Gesundheit & Kohärenz</h4>
                            <p class="text-slate-600" data-lang-key="service1Desc">Erreichen Sie emotionale Balance und Klarheit durch Coaching, das Neuroplastizität integriert, um Resilienz aufzubauen und Stress zu bewältigen.</p>
                        </div>
                        <div class="mt-6">
                            <button class="info-service-btn bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors w-full" data-service="service1" data-price="150" data-lang-key="showInfoButton">Info anzeigen</button>
                        </div>
                    </div>
                    <!-- Service 2 -->
                    <div class="bg-slate-50 rounded-xl p-8 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                        <div>
                            <i data-lucide="brain-circuit" class="w-12 h-12 text-slate-500 mb-4"></i>
                            <h4 class="text-xl font-bold text-slate-800 mb-3" data-lang-key="service2Title">EEG-gestützte Einblicke</h4>
                            <p class="text-slate-600" data-lang-key="service2Desc">Gewinnen Sie tiefe Einblicke in Ihr kognitives Profil. Wir analysieren Gehirnwellenmuster, um Ihre Kernstärken und Wachstumsbereiche aufzudecken.</p>
                        </div>
                        <div class="mt-6">
                             <button class="book-service-btn bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors w-full" data-service="service2" data-price="250" data-lang-key="bookNowButton">Jetzt Buchen</button>
                        </div>
                    </div>
                    <!-- Service 3 -->
                    <div class="bg-slate-50 rounded-xl p-8 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                        <div>
                            <i data-lucide="microscope" class="w-12 h-12 text-slate-500 mb-4"></i>
                            <h4 class="text-xl font-bold text-slate-800 mb-3" data-lang-key="service3Title">Verständliche Neurowissenschaft</h4>
                            <p class="text-slate-600" data-lang-key="service3Desc">In Workshops und auf meinem YouTube-Kanal erkläre ich komplexe Neurowissenschaften in praktischen Ratschlägen für den Alltag.</p>
                        </div>
                         <div class="mt-6">
                            <button class="book-service-btn bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors w-full" data-service="service3" data-price="500" data-lang-key="bookNowButton">Jetzt Buchen</button>
                        </div>
                    </div>
                    <!-- Service 4 -->
                    <div class="bg-slate-50 rounded-xl p-8 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                        <div>
                            <i data-lucide="presentation" class="w-12 h-12 text-slate-500 mb-4"></i>
                            <h4 class="text-xl font-bold text-slate-800 mb-3" data-lang-key="service4Title">Workshops für Unternehmen & Gruppen</h4>
                            <p class="text-slate-600" data-lang-key="service4Desc">Maßgeschneiderte Workshops für Teams zur Stressreduktion, Kreativitätssteigerung und Verbesserung der Teamkohärenz mittels Neurowissenschaft.</p>
                        </div>
                         <div class="mt-6">
                            <button class="book-service-btn bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors w-full" data-service="service4" data-price="1200" data-lang-key="bookNowButton">Jetzt Buchen</button>
                        </div>
                    </div>
                </div>
                 <div class="mt-12 text-center bg-slate-100 p-6 rounded-lg">
                    <h4 class="text-xl font-bold text-slate-800 mb-3" data-lang-key="feedbackTitle">Haben Sie einen EEG-Report erhalten?</h4>
                    <p class="text-slate-600 mb-4" data-lang-key="feedbackDesc">Ihr Feedback ist uns wichtig, um unsere Analysen kontinuierlich zu verbessern.</p>
                    <button id="open-feedback-modal" class="bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-800 transition-colors" data-lang-key="feedbackButton">Feedback geben</button>
                </div>
            </section>

            <!-- About Me Section -->
            <section id="about" class="p-8 sm:p-16 lg:p-24 bg-slate-100">
                <div class="flex flex-col lg:flex-row items-center gap-12">
                    <div class="lg:w-1/3">
                        <img src="https://placehold.co/400x500/CBD5E1/1E293B?text=Profil" alt="Professionelles Porträtfoto" class="rounded-xl shadow-lg w-full object-cover">
                    </div>
                    <div class="lg:w-2/3">
                        <h3 class="text-3xl font-bold text-slate-800 mb-4" data-lang-key="aboutTitle">Über Mich</h3>
                        <p class="text-lg text-slate-600 mb-4" data-lang-key="aboutP1">
                            Ich bin ein leidenschaftlicher Neurowissenschaftler, der die Lücke zwischen akademischer Forschung und praktischer Anwendung schließt. Mit einem Doktortitel in kognitiver Neurowissenschaft von der [Ihre Universität] konzentriert sich meine Arbeit auf das Verständnis der neuronalen Mechanismen von Emotion, Persönlichkeit und Bewusstsein.
                        </p>
                        <p class="text-slate-600" data-lang-key="aboutP2">
                            Meine Praxis befähigt Menschen mit evidenzbasierten Werkzeugen aus der Gehirnforschung, die Herausforderungen des Lebens zu meistern und ihr volles Potenzial zu entfalten. Mein Ansatz ist einfühlsam und auf Ihr einzigartiges Gehirn zugeschnitten.
                        </p>
                    </div>
                </div>
            </section>

            <!-- YouTube Section -->
            <section id="youtube" class="p-8 sm:p-16 lg:p-24 bg-white">
                <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-16" data-lang-key="youtubeTitle">Neuestes aus dem Labor</h3>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="group">
                        <div class="aspect-w-16 aspect-h-9 bg-slate-200 rounded-lg overflow-hidden mb-4">
                            <iframe class="w-full h-full" src="https://www.youtube.com/embed/88oY8RCvimI" title="The Neuroscience of Consciousness - with Anil Seth" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <h4 class="font-bold text-lg text-slate-800" data-lang-key="video1Title">Die Neurowissenschaft des Bewusstseins - mit Anil Seth</h4>
                        <p class="text-slate-600 text-sm" data-lang-key="video1Desc">Ein tiefer Einblick in die Wissenschaft des Bewusstseins und unserer subjektiven Realität.</p>
                    </div>
                    <div class="group">
                        <div class="aspect-w-16 aspect-h-9 bg-slate-200 rounded-lg overflow-hidden mb-4">
                           <iframe class="w-full h-full" src="https://www.youtube.com/embed/g0YNDg8gWvQ" title="Wie man aufhört, zu viel nachzudenken - 4 bewährte Techniken" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <h4 class="font-bold text-lg text-slate-800" data-lang-key="video2Title">Wie man aufhört, zu viel nachzudenken - 4 bewährte Techniken</h4>
                        <p class="text-slate-600 text-sm" data-lang-key="video2Desc">Entdecken Sie vier wissenschaftlich fundierte Strategien, um das Grübeln zu durchbrechen und geistige Klarheit zu finden.</p>
                    </div>
                </div>
                 <div class="text-center mt-16">
                    <a href="https://youtube.com/@tdpostmoderne?si=HdZtzleXE3hh6MES" target="_blank" rel="noopener noreferrer" class="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors duration-300 text-lg inline-flex items-center gap-2">
                        <i data-lucide="youtube" class="w-5 h-5"></i>
                        <span data-lang-key="youtubeButton">Besuchen Sie meinen YouTube-Kanal</span>
                    </a>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="p-8 sm:p-16 lg:p-24 bg-slate-100">
                <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-8" data-lang-key="contactTitle">Kontakt aufnehmen</h3>
                <div class="max-w-2xl bg-white p-8 rounded-xl shadow-lg">
                    <p class="text-lg text-slate-600 mb-8" data-lang-key="contactDesc">
                        Bereit für den ersten Schritt? Füllen Sie das Formular aus, und ich melde mich innerhalb von 48 Stunden bei Ihnen.
                    </p>
                    <form id="contact-form" class="space-y-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-slate-700" data-lang-key="formName">Vollständiger Name</label>
                            <input type="text" id="name" name="name" required class="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500">
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-slate-700" data-lang-key="formEmail">E-Mail-Adresse</label>
                            <input type="email" id="email" name="email" required class="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500">
                        </div>
                        <div>
                            <label for="service" class="block text-sm font-medium text-slate-700" data-lang-key="formService">Interessengebiet</label>
                            <select id="service-select" name="service" class="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 bg-white">
                                <!-- Options will be populated by JS -->
                            </select>
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-slate-700" data-lang-key="formMessage">Nachricht</label>
                            <textarea id="message" name="message" rows="4" required class="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500"></textarea>
                        </div>
                        <div class="text-left pt-2">
                            <button type="submit" class="bg-slate-800 text-white font-bold py-3 px-12 rounded-full hover:bg-slate-700 transition-colors duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5" data-lang-key="formSubmit">
                                Nachricht senden
                            </button>
                        </div>
                    </form>
                    <div id="form-feedback" class="mt-6"></div>
                </div>

                <!-- Social Links Section -->
                <div class="max-w-2xl mx-auto mt-12">
                    <h4 class="text-xl font-bold text-center text-slate-700 mb-6" data-lang-key="connectTitle">Vernetzen Sie sich mit mir</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="mailto:tierederpostmoderne@gmail.com" class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <i data-lucide="mail" class="w-6 h-6 text-slate-600"></i>
                            <span class="text-slate-800 font-semibold">tierederpostmoderne@gmail.com</span>
                        </a>
                        <a href="https://www.youtube.com/@tdpostmoderne" target="_blank" rel="noopener noreferrer" class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <i data-lucide="youtube" class="w-6 h-6 text-red-600"></i>
                            <span class="text-slate-800 font-semibold">YouTube</span>
                        </a>
                        <a href="https://www.instagram.com/tierederpostmoderne/" target="_blank" rel="noopener noreferrer" class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <i data-lucide="instagram" class="w-6 h-6 text-pink-600"></i>
                            <span class="text-slate-800 font-semibold">Instagram</span>
                        </a>
                        <a href="https://www.puzzlin.org/en/explorers/ebc008b4-87bd-414f-9c1e-280c071c22d7" target="_blank" rel="noopener noreferrer" class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <i data-lucide="puzzle" class="w-6 h-6 text-blue-600"></i>
                            <span class="text-slate-800 font-semibold">Puzzlin.org Profile</span>
                        </a>
                         <a href="https://ko-fi.com/tierederpostmoderne" target="_blank" rel="noopener noreferrer" class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-slate-50 transition-colors">
                            <i data-lucide="coffee" class="w-6 h-6 text-amber-600"></i>
                            <span class="text-slate-800 font-semibold">Support on Ko-fi</span>
                        </a>
                    </div>
                </div>
            </section>
            
            <!-- Footer for Mobile -->
            <footer class="md:hidden bg-slate-800 text-slate-300 py-12 text-center">
                 <p class="text-xl font-bold mb-4 text-white">Dr. Andreas Franzelin</p>
                 <div class="flex justify-center space-x-6 mb-8">
                     <a href="https://youtube.com/@tdpostmoderne?si=HdZtzleXE3hh6MES" target="_blank" class="text-slate-400 hover:text-white"><i data-lucide="youtube" class="w-6 h-6"></i></a>
                     <a href="https://www.instagram.com/tierederpostmoderne/" target="_blank" class="text-slate-400 hover:text-white"><i data-lucide="instagram" class="w-6 h-6"></i></a>
                     <a href="#" class="text-slate-400 hover:text-white"><i data-lucide="linkedin" class="w-6 h-6"></i></a>
                 </div>
                 <p class="text-slate-400">&copy; <span id="year-mobile"></span> Dr. Andreas Franzelin. <span data-lang-key="footerRights">Alle Rechte vorbehalten.</span></p>
            </footer>
        </main>
    </div>

    <!-- Modals -->
    <div id="feedback-modal-backdrop" class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4 opacity-0"></div>
    <div id="booking-modal-backdrop" class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4 opacity-0"></div>
    <div id="info-modal-backdrop" class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4 opacity-0"></div>

    <!-- Firebase SDK -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getFirestore, collection, addDoc, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        
        // --- LANGUAGE CONTENT ---
        const langData = {
            de: {
                drName: "Dr. Andreas Franzelin",
                drTitle: "Neurowissenschaftler & Coach",
                navHome: "Home",
                navServices: "Services",
                navAbout: "Über Mich",
                navContact: "Kontakt",
                heroTitle: "Entfalten Sie Ihr Potenzial durch Neurowissenschaft",
                heroSubtitle: "Nutzen Sie modernste Gehirnforschung für mentales Wohlbefinden, Spitzenleistungen und Selbsterkenntnis.",
                heroButton: "Beratung buchen",
                servicesTitle: "Mein Ansatz",
                service1Title: "Mentale Gesundheit & Kohärenz",
                service1Desc: "Erreichen Sie emotionale Balance und Klarheit durch Coaching, das Neuroplastizität integriert, um Resilienz aufzubauen und Stress zu bewältigen.",
                service2Title: "EEG-gestützte Einblicke",
                service2Desc: "Gewinnen Sie tiefe Einblicke in Ihr kognitives Profil. Wir analysieren Gehirnwellenmuster, um Ihre Kernstärken und Wachstumsbereiche aufzudecken.",
                service3Title: "Verständliche Neurowissenschaft",
                service3Desc: "In Workshops und auf meinem YouTube-Kanal erkläre ich komplexe Neurowissenschaften in praktischen Ratschlägen für den Alltag.",
                service4Title: "Workshops für Unternehmen & Gruppen",
                service4Desc: "Maßgeschneiderte Workshops für Teams zur Stressreduktion, Kreativitätssteigerung und Verbesserung der Teamkohärenz mittels Neurowissenschaft.",
                bookNowButton: "Jetzt Buchen",
                showInfoButton: "Info anzeigen",
                feedbackTitle: "Haben Sie einen EEG-Report erhalten?",
                feedbackDesc: "Ihr Feedback ist uns wichtig, um unsere Analysen kontinuierlich zu verbessern.",
                feedbackButton: "Feedback geben",
                aboutTitle: "Über Mich",
                aboutP1: "Ich bin ein leidenschaftlicher Neurowissenschaftler, der die Lücke zwischen akademischer Forschung und praktischer Anwendung schließt. Mit einem Doktortitel in kognitiver Neurowissenschaft von der [Ihre Universität] konzentriert sich meine Arbeit auf das Verständnis der neuronalen Mechanismen von Emotion, Persönlichkeit und Bewusstsein.",
                aboutP2: "Meine Praxis befähigt Menschen mit evidenzbasierten Werkzeugen aus der Gehirnforschung, die Herausforderungen des Lebens zu meistern und ihr volles Potenzial zu entfalten. Mein Ansatz ist einfühlsam und auf Ihr einzigartiges Gehirn zugeschnitten.",
                youtubeTitle: "Neuestes aus dem Labor",
                video1Title: "Die Neurowissenschaft des Bewusstseins - mit Anil Seth",
                video1Desc: "Ein tiefer Einblick in die Wissenschaft des Bewusstseins und unserer subjektiven Realität.",
                video2Title: "Wie man aufhört, zu viel nachzudenken - 4 bewährte Techniken",
                video2Desc: "Entdecken Sie vier wissenschaftlich fundierte Strategien, um das Grübeln zu durchbrechen und geistige Klarheit zu finden.",
                youtubeButton: "Besuchen Sie meinen YouTube-Kanal",
                contactTitle: "Kontakt aufnehmen",
                contactDesc: "Bereit für den ersten Schritt? Füllen Sie das Formular aus, und ich melde mich innerhalb von 48 Stunden bei Ihnen.",
                connectTitle: "Vernetzen Sie sich mit mir",
                formName: "Vollständiger Name",
                formEmail: "E-Mail-Adresse",
                formService: "Interessengebiet",
                formMessage: "Nachricht",
                formSubmit: "Nachricht senden",
                footerRights: "Alle Rechte vorbehalten.",
                serviceOptionDefault: "Allgemeine Anfrage",
                infoModalTitle: "Service-Information",
                infoModalPriceHour: "Preis pro Stunde:",
                infoModalProceedButton: "Weiter zum Kontakt",
                bookingModalTitle: "Buchung bestätigen",
                bookingModalDesc: "Sie sind dabei, die folgende Dienstleistung zu buchen:",
                bookingModalPrice: "Preis:",
                bookingModalProceed: "Weiter zur Zahlung",
                paymentModalTitle: "Zahlung",
                paymentModalDesc: "Dies ist eine simulierte Zahlungsseite. In einer echten Anwendung würden Sie hier eine Integration wie Stripe oder PayPal verwenden.",
                paymentModalCard: "Kartennummer",
                paymentModalExpiry: "Gültig bis (MM/JJ)",
                paymentModalCVC: "CVC",
                paymentModalPay: "Jetzt bezahlen",
                paymentModalSuccess: "Zahlung erfolgreich! Ihre Buchung ist bestätigt.",
                feedbackModalTitle: "EEG-Report Feedback",
                feedbackModalDesc: "Helfen Sie uns, uns zu verbessern, indem Sie Ihre Gedanken teilen.",
                feedbackForm: {
                    section1Title: "Informationen zu Klient & Behandler",
                    clientName: "Name des Klienten",
                    clientNamePlaceholder: "Namen oder Initialen des Klienten eingeben",
                    practitionerName: "Name des Behandlers",
                    practitionerNamePlaceholder: "Ihren Namen eingeben",
                    section2Title: "Teil 1: Gesamteindruck & Interesse",
                    interest: "Auf einer Skala von 1 bis 10, wie interessant fanden Sie den Bericht insgesamt?",
                    lobeAnalysisInterest: "Auf einer Skala von 1 bis 10, wie interessant fanden Sie die Lappen-basierte Analyse in Teil I?",
                    personalSummaryInterest: "Auf einer Skala von 1 bis 10, wie interessant fanden Sie die persönliche Zusammenfassung in Teil II?",
                    typeGuessingInterest: "Auf einer Skala von 1 bis 10, wie interessant fanden Sie die EEG-basierte Typen-Einschätzung in Teil III?",
                    mostCaptivating: "Welcher spezifische Aspekt war für Sie am fesselndsten oder überraschendsten?",
                    mostCaptivatingPlaceholder: "z.B. 'Die Lappen-basierte Analyse war faszinierend...'",
                    likedMost: "Was hat Ihnen am Bericht insgesamt am besten gefallen?",
                    likedMostPlaceholder: "z.B. 'Die klaren Erklärungen und visuellen Darstellungen...'",
                    section3Title: "Teil 2: Genauigkeit & Persönliche Resonanz",
                    overallFit: "Insgesamt, wie gut hat der Bericht Ihre Persönlichkeit beschrieben? (1 = Passt nicht, 10 = Passt perfekt)",
                    fittingExamples: "Bitte geben Sie Beispiele für Informationen, die Sie als besonders passend empfanden.",
                    fittingExamplesPlaceholder: "z.B. 'Die Beschreibung meines sozialen Stils war genau richtig...'",
                    notFittingExamples: "Gab es Informationen, die überhaupt nicht zu Ihrer Persönlichkeit zu passen schienen?",
                    notFittingExamplesPlaceholder: "z.B. 'Der Teil über Motivation passte nicht ganz...'",
                    feltOffended: "Fühlten Sie sich durch Informationen beleidigt? Wenn ja, bitte beschreiben.",
                    feltOffendedPlaceholder: "Ihr Feedback ist wichtig, um den Ton und die Sensibilität des Berichts zu verbessern.",
                    topStrengths: "Was betrachten Sie als Ihre größten Stärken?",
                    topStrengthsPlaceholder: "z.B. sehr empathisch sein, kreative Problemlösung...",
                    biggestChallenge: "Was betrachten Sie als Ihre größte Herausforderung?",
                    biggestChallengePlaceholder: "z.B. Schwierigkeiten beim Lesen, öffentliches Reden...",
                    mbtiAgreement: "Der Bericht hat einen MBTI-Typ identifiziert. Stimmen Sie dieser Einschätzung zu?",
                    mbtiOptions: [{value: 'agree', label: 'Stimme zu'}, {value: 'disagree', label: 'Stimme nicht zu'}, {value: 'unsure', label: 'Unsicher'}],
                    actualMbtiType: "Was ist Ihr tatsächlicher MBTI-Typ?",
                    mbtiPlaceholder: "MBTI-Typ auswählen",
                    actualEnneagramType: "Was ist Ihr tatsächlicher Enneagramm-Typ?",
                    enneagramPlaceholder: "Enneagramm-Typ auswählen",
                    section4Title: "Teil 3: Klarheit, Länge und Design",
                    length: "Fanden Sie den Bericht:",
                    lengthOptions: [{value: 'too_long', label: 'Zu lang'}, {value: 'just_right', label: 'Genau richtig'}, {value: 'too_short', label: 'Zu kurz'}],
                    clarityRating: "Wie bewerten Sie die Klarheit des Textes? (1 = Sehr kompliziert, 10 = Sehr einfach)",
                    confusingTerms: "Gab es bestimmte Begriffe oder Abschnitte, die Sie verwirrend fanden?",
                    confusingTermsPlaceholder: "z.B. 'Die Erklärung der Z-Scores war etwas technisch...'",
                    visualsHelpfulness: "Wie hilfreich waren die Gehirnkarten-Visualisierungen?",
                    visualsOptions: [{value: 'very', label: 'Sehr hilfreich'}, {value: 'somewhat', label: 'Etwas hilfreich'}, {value: 'not_at_all', label: 'Überhaupt nicht'}],
                    section5Title: "Teil 4: Wahrgenommener Wert & Preisgestaltung",
                    primaryBenefit: "Was sehen Sie als den Hauptnutzen dieses Berichts?",
                    primaryBenefitPlaceholder: "z.B. 'Er gab mir eine neue Sprache, um mich selbst zu verstehen...'",
                    recommendLikelihood: "Wie wahrscheinlich würden Sie diesen Bericht einem Freund empfehlen? (1 = Unwahrscheinlich, 10 = Sehr wahrscheinlich)",
                    fairPrice: "Welchen Preis würden Sie angesichts der Detailliertheit und Personalisierung für fair halten?",
                    priceOptions: [{value: '25-50', label: '€25-€50'}, {value: '50-75', label: '€50-€75'}, {value: '75-100', label: '€75-€100'}, {value: '100+', label: '€100+'}],
                    section6Title: "Teil 5: Verbesserungsvorschläge",
                    changesOrAdditions: "Was würden Sie am Bericht ändern oder hinzufügen, um ihn wertvoller zu machen?",
                    changesOrAdditionsPlaceholder: "z.B. 'Vielleicht einen Abschnitt über Karrierevorschläge hinzufügen...'",
                    wishedForInfo: "Gibt es Informationen, die Sie sich gewünscht hätten, die aber nicht enthalten waren?",
                    wishedForInfoPlaceholder: "z.B. 'Ich war neugierig, wie sich Schlaf auf die Ergebnisse auswirkt...'",
                    otherComments: "Haben Sie weitere Kommentare, Fragen oder Vorschläge?",
                    otherCommentsPlaceholder: "Ihre abschließenden Gedanken hier...",
                    submitButton: "Feedback absenden",
                    submittingButton: "... Senden ...",
                    successTitle: "Vielen Dank!",
                    successDesc: "Ihr Feedback wurde empfangen. Ihre Einblicke sind unglaublich wertvoll.",
                }
            },
            en: {
                drName: "Dr. Andreas Franzelin",
                drTitle: "Neuroscientist & Coach",
                navHome: "Home",
                navServices: "Services",
                navAbout: "About Me",
                navContact: "Contact",
                heroTitle: "Unlock Your Potential Through Neuroscience",
                heroSubtitle: "Leverage cutting-edge brain science for mental wellness, peak performance, and self-awareness.",
                heroButton: "Book a Consultation",
                servicesTitle: "My Approach",
                service1Title: "Mental Health & Coherence",
                service1Desc: "Achieve emotional balance and clarity through coaching that integrates neuroplasticity to build resilience and manage stress.",
                service2Title: "EEG-Powered Insights",
                service2Desc: "Gain profound insights into your cognitive profile. We analyze brainwave patterns to reveal your core strengths and areas for growth.",
                service3Title: "Accessible Neuroscience",
                service3Desc: "In workshops and on my YouTube channel, I break down complex neuroscience into practical advice for everyday life.",
                service4Title: "Corporate & Group Workshops",
                service4Desc: "Custom workshops for teams focusing on stress reduction, enhancing creativity, and improving team coherence using neuroscience.",
                bookNowButton: "Book Now",
                showInfoButton: "Show Info",
                feedbackTitle: "Received an EEG Report?",
                feedbackDesc: "Your feedback is important to us for continuously improving our analyses.",
                feedbackButton: "Give Feedback",
                aboutTitle: "About Me",
                aboutP1: "I am a passionate neuroscientist dedicated to bridging the gap between academic research and practical application. With a Ph.D. in Cognitive Neuroscience from [Your University], my work focuses on understanding the neural mechanisms of emotion, personality, and consciousness.",
                aboutP2: "My practice empowers people with evidence-based tools from brain science to navigate life's challenges and unlock their full potential. My approach is empathetic and tailored to your unique brain.",
                youtubeTitle: "Latest from the Lab",
                video1Title: "The Neuroscience of Consciousness - with Anil Seth",
                video1Desc: "A deep dive into the science of consciousness and our subjective reality.",
                video2Title: "How to Stop Overthinking - 4 Proven Techniques",
                video2Desc: "Discover four science-based strategies to break the cycle of rumination and find mental clarity.",
                youtubeButton: "Visit My YouTube Channel",
                contactTitle: "Get In Touch",
                contactDesc: "Ready to take the first step? Fill out the form, and I will get back to you within 48 hours.",
                connectTitle: "Connect With Me",
                formName: "Full Name",
                formEmail: "Email Address",
                formService: "Service of Interest",
                formMessage: "Message",
                formSubmit: "Send Message",
                footerRights: "All rights reserved.",
                serviceOptionDefault: "General Inquiry",
                infoModalTitle: "Service Information",
                infoModalPriceHour: "Price per hour:",
                infoModalProceedButton: "Proceed to Contact",
                bookingModalTitle: "Confirm Booking",
                bookingModalDesc: "You are about to book the following service:",
                bookingModalPrice: "Price:",
                bookingModalProceed: "Proceed to Payment",
                paymentModalTitle: "Payment",
                paymentModalDesc: "This is a simulated payment page. In a real application, you would use an integration like Stripe or PayPal here.",
                paymentModalCard: "Card Number",
                paymentModalExpiry: "Expiry (MM/YY)",
                paymentModalCVC: "CVC",
                paymentModalPay: "Pay Now",
                paymentModalSuccess: "Payment successful! Your booking is confirmed.",
                feedbackModalTitle: "EEG Report Feedback",
                feedbackModalDesc: "Help us improve by sharing your thoughts.",
                feedbackForm: {
                    section1Title: "Client & Practitioner Information",
                    clientName: "Client Name",
                    clientNamePlaceholder: "Enter client's name or initials",
                    practitionerName: "Practitioner Name",
                    practitionerNamePlaceholder: "Enter your name",
                    section2Title: "Part 1: Overall Impression & Interest",
                    interest: "On a scale of 1 to 10, how interesting did you find the report overall?",
                    lobeAnalysisInterest: "On a scale of 1 to 10, how interesting did you find the Part I Lobe-based analysis?",
                    personalSummaryInterest: "On a scale of 1 to 10, how interesting did you find the Part II Personal Summary?",
                    typeGuessingInterest: "On a scale of 1 to 10, how interesting did you find the Part III EEG-based Type guessing?",
                    mostCaptivating: "What specific aspect did you find most captivating or surprising?",
                    mostCaptivatingPlaceholder: "e.g., 'The lobe-based analysis was fascinating...'",
                    likedMost: "What did you like most about the report overall?",
                    likedMostPlaceholder: "e.g., 'The clear explanations and visuals...'",
                    section3Title: "Part 2: Accuracy & Personal Resonance",
                    overallFit: "Overall, how well did the report describe your personality? (1 = Doesn't fit, 10 = Fits perfectly)",
                    fittingExamples: "Please provide examples of information that you felt was particularly fitting.",
                    fittingExamplesPlaceholder: "e.g., 'The description of my social style was spot on...'",
                    notFittingExamples: "Was there any information that did not seem to fit your personality at all?",
                    notFittingExamplesPlaceholder: "e.g., 'The part about motivation didn't quite match...'",
                    feltOffended: "Was there any information you felt offended by? If so, please describe.",
                    feltOffendedPlaceholder: "Your feedback is important for improving the report's tone and sensitivity.",
                    topStrengths: "What do you consider your top strengths?",
                    topStrengthsPlaceholder: "e.g., being very empathic, creative problem-solving...",
                    biggestChallenge: "What do you consider your biggest challenge?",
                    biggestChallengePlaceholder: "e.g., difficulty with reading, public speaking...",
                    mbtiAgreement: "The report identified an MBTI type. Do you agree with this assessment?",
                    mbtiOptions: [{value: 'agree', label: 'Agree'}, {value: 'disagree', label: 'Disagree'}, {value: 'unsure', label: 'Unsure'}],
                    actualMbtiType: "What is your actual MBTI type?",
                    mbtiPlaceholder: "Select MBTI Type",
                    actualEnneagramType: "What is your actual Enneagram type?",
                    enneagramPlaceholder: "Select Enneagram Type",
                    section4Title: "Part 3: Clarity, Length, and Design",
                    length: "Did you find the report to be:",
                    lengthOptions: [{value: 'too_long', label: 'Too Long'}, {value: 'just_right', label: 'Just Right'}, {value: 'too_short', label: 'Too Short'}],
                    clarityRating: "How would you rate the clarity of the text? (1 = Very Complicated, 10 = Very Easy)",
                    confusingTerms: "Were there any specific terms or sections you found confusing?",
                    confusingTermsPlaceholder: "e.g., 'The explanation of Z-scores was a bit technical...'",
                    visualsHelpfulness: "How helpful were the brain map visuals?",
                    visualsOptions: [{value: 'very', label: 'Very Helpful'}, {value: 'somewhat', label: 'Somewhat Helpful'}, {value: 'not_at_all', label: 'Not at all'}],
                    section5Title: "Part 4: Perceived Value & Pricing",
                    primaryBenefit: "What do you see as the primary benefit of receiving this report?",
                    primaryBenefitPlaceholder: "e.g., 'It gave me a new language to understand myself...'",
                    recommendLikelihood: "How likely would you be to recommend this report to a friend? (1 = Not Likely, 10 = Very Likely)",
                    fairPrice: "Considering the detail and personalization, what price would you feel is fair for this service?",
                    priceOptions: [{value: '25-50', label: '$25-$50'}, {value: '50-75', label: '$50-$75'}, {value: '75-100', label: '$75-$100'}, {value: '100+', label: '$100+'}],
                    section6Title: "Part 5: Suggestions for Improvement",
                    changesOrAdditions: "What, if anything, would you change or add to the report to make it more valuable?",
                    changesOrAdditionsPlaceholder: "e.g., 'Maybe add a section on career suggestions...'",
                    wishedForInfo: "Is there any information you wished was included that wasn't?",
                    wishedForInfoPlaceholder: "e.g., 'I was curious about how sleep affects the results...'",
                    otherComments: "Do you have any other comments, questions, or suggestions?",
                    otherCommentsPlaceholder: "Your final thoughts here...",
                    submitButton: "Submit Feedback",
                    submittingButton: "... Submitting ...",
                    successTitle: "Thank You!",
                    successDesc: "Your feedback has been received. Your insights are incredibly valuable.",
                }
            }
        };

        // --- CORE SCRIPT ---

        document.addEventListener('DOMContentLoaded', () => {
            // --- Firebase Initialization ---
            let db, auth, userId, isAuthReady = false;
            try {
                const firebaseConfigStr = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
                const firebaseConfig = JSON.parse(firebaseConfigStr);
                if (Object.keys(firebaseConfig).length > 0) {
                    const app = initializeApp(firebaseConfig);
                    db = getFirestore(app);
                    auth = getAuth(app);
                    setLogLevel('debug');
                    
                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            userId = user.uid;
                        } else {
                            const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                            try {
                                if (token) {
                                    await signInWithCustomToken(auth, token);
                                } else {
                                    await signInAnonymously(auth);
                                }
                            } catch (error) {
                                console.error("Authentication failed:", error);
                            }
                        }
                        isAuthReady = true;
                    });
                } else {
                    console.error("Firebase config is not available.");
                }
            } catch (e) {
                console.error("Error initializing Firebase:", e);
            }

            // --- Language Switcher ---
            const updateLanguage = (lang) => {
                document.documentElement.lang = lang;
                document.querySelectorAll('[data-lang-key]').forEach(el => {
                    const key = el.dataset.langKey;
                    if (langData[lang][key]) {
                        el.innerHTML = langData[lang][key];
                    }
                });

                const serviceSelect = document.getElementById('service-select');
                if (serviceSelect) {
                    serviceSelect.innerHTML = `
                        <option value="general">${langData[lang].serviceOptionDefault}</option>
                        <option value="service1">${langData[lang].service1Title}</option>
                        <option value="service2">${langData[lang].service2Title}</option>
                        <option value="service3">${langData[lang].service3Title}</option>
                        <option value="service4">${langData[lang].service4Title}</option>
                    `;
                }

                localStorage.setItem('preferredLanguage', lang);
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('bg-slate-700', 'text-white');
                    btn.classList.add('text-slate-400');
                });
                document.getElementById(`lang-${lang}`)?.classList.add('bg-slate-700', 'text-white');
                document.getElementById(`lang-${lang}-mobile`)?.classList.add('bg-slate-700', 'text-white');
            };

            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.id.includes('de') ? 'de' : 'en';
                    updateLanguage(lang);
                });
            });

            // --- Modals ---
            const createModal = (id, content, maxWidth = 'max-w-lg') => {
                const backdrop = document.getElementById(id);
                backdrop.innerHTML = `<div class="modal-content bg-gradient-to-br from-gray-50 to-indigo-100 w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-4 sm:p-8 transform scale-95">${content}</div>`;
                return backdrop;
            };

            const toggleModal = (backdrop, show) => {
                const content = backdrop.querySelector('.modal-content');
                if (show) {
                    backdrop.classList.remove('hidden');
                    backdrop.classList.add('flex');
                    setTimeout(() => {
                        backdrop.classList.remove('opacity-0');
                        content.classList.remove('scale-95');
                    }, 10);
                } else {
                    backdrop.classList.add('opacity-0');
                    content.classList.add('scale-95');
                    setTimeout(() => {
                        backdrop.classList.add('hidden');
                        backdrop.classList.remove('flex');
                    }, 300);
                }
            };
            
            // --- Info Modal ---
            document.querySelectorAll('.info-service-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const serviceId = btn.dataset.service;
                    const price = btn.dataset.price;
                    const lang = localStorage.getItem('preferredLanguage') || 'de';
                    const serviceTitle = langData[lang][`${serviceId}Title`];

                    const infoModalHTML = `
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-slate-800">${langData[lang].infoModalTitle}</h2>
                            <button class="close-modal-btn text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                        </div>
                        <div class="bg-white p-4 rounded-lg mb-6">
                            <h3 class="text-xl font-semibold text-slate-700">${serviceTitle}</h3>
                            <p class="text-lg font-bold text-slate-900 mt-2">${langData[lang].infoModalPriceHour} €${price}</p>
                        </div>
                        <button id="proceed-to-contact" class="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">${langData[lang].infoModalProceedButton}</button>
                    `;
                    
                    const modal = createModal('info-modal-backdrop', infoModalHTML);
                    toggleModal(modal, true);

                    modal.querySelector('.close-modal-btn').addEventListener('click', () => toggleModal(modal, false));
                    modal.querySelector('#proceed-to-contact').addEventListener('click', () => {
                        toggleModal(modal, false);
                        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                        document.getElementById('service-select').value = serviceId;
                    });
                });
            });

            // --- Booking Modal ---
            document.querySelectorAll('.book-service-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const serviceId = btn.dataset.service;
                    const price = btn.dataset.price;
                    const lang = localStorage.getItem('preferredLanguage') || 'de';
                    const serviceTitle = langData[lang][`${serviceId}Title`];

                    const bookingModalHTML = `
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-slate-800">${langData[lang].bookingModalTitle}</h2>
                            <button class="close-modal-btn text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                        </div>
                        <p class="mb-4">${langData[lang].bookingModalDesc}</p>
                        <div class="bg-white p-4 rounded-lg mb-6">
                            <h3 class="text-xl font-semibold text-slate-700">${serviceTitle}</h3>
                            <p class="text-lg font-bold text-slate-900 mt-2">${langData[lang].bookingModalPrice} €${price}</p>
                        </div>
                        <button id="proceed-to-payment" class="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">${langData[lang].bookingModalProceed}</button>
                    `;
                    
                    const modal = createModal('booking-modal-backdrop', bookingModalHTML);
                    toggleModal(modal, true);

                    modal.querySelector('.close-modal-btn').addEventListener('click', () => toggleModal(modal, false));
                    modal.querySelector('#proceed-to-payment').addEventListener('click', () => {
                        toggleModal(modal, false);
                        showPaymentModal(price, serviceTitle, lang);
                    });
                });
            });
            
            const showPaymentModal = (price, serviceTitle, lang) => {
                 const paymentModalHTML = `
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-slate-800">${langData[lang].paymentModalTitle}</h2>
                        <button class="close-modal-btn text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                    </div>
                    <p class="text-sm text-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6">${langData[lang].paymentModalDesc}</p>
                    <div id="payment-form-container">
                        <p class="text-lg mb-4">Total: <strong>€${price}</strong> for ${serviceTitle}</p>
                        <form id="sim-payment-form" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-700">${langData[lang].paymentModalCard}</label>
                                <input type="text" placeholder="**** **** **** ****" class="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md">
                            </div>
                            <div class="flex gap-4">
                                <div class="w-1/2">
                                    <label class="block text-sm font-medium text-slate-700">${langData[lang].paymentModalExpiry}</label>
                                    <input type="text" placeholder="MM/YY" class="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md">
                                </div>
                                <div class="w-1/2">
                                    <label class="block text-sm font-medium text-slate-700">${langData[lang].paymentModalCVC}</label>
                                    <input type="text" placeholder="CVC" class="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md">
                                </div>
                            </div>
                            <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors mt-4">${langData[lang].paymentModalPay}</button>
                        </form>
                    </div>
                    <div id="payment-success" class="hidden text-center">
                        <i data-lucide="check-circle-2" class="mx-auto h-16 w-16 text-green-500"></i>
                        <p class="mt-4 text-lg font-semibold">${langData[lang].paymentModalSuccess}</p>
                    </div>
                 `;
                 const modal = createModal('booking-modal-backdrop', paymentModalHTML);
                 toggleModal(modal, true);
                 lucide.createIcons();

                 modal.querySelector('.close-modal-btn').addEventListener('click', () => toggleModal(modal, false));
                 modal.querySelector('#sim-payment-form').addEventListener('submit', (e) => {
                     e.preventDefault();
                     modal.querySelector('#payment-form-container').classList.add('hidden');
                     modal.querySelector('#payment-success').classList.remove('hidden');
                 });
            };

            // --- Feedback Modal ---
            document.getElementById('open-feedback-modal').addEventListener('click', () => {
                const lang = localStorage.getItem('preferredLanguage') || 'de';
                const t = langData[lang].feedbackForm;
                const mbtiTypes = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ', 'Unsure'];
                const enneagramTypes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Unsure'];

                let formHTML = '';
                const formSections = [
                    { title: t.section1Title, fields: [
                        { type: 'text', name: 'clientName', label: t.clientName, placeholder: t.clientNamePlaceholder },
                        { type: 'text', name: 'practitionerName', label: t.practitionerName, placeholder: t.practitionerNamePlaceholder },
                    ]},
                    { title: t.section2Title, fields: [
                        { type: 'rating', name: 'interest', label: t.interest },
                        { type: 'rating', name: 'lobeAnalysisInterest', label: t.lobeAnalysisInterest },
                        { type: 'rating', name: 'personalSummaryInterest', label: t.personalSummaryInterest },
                        { type: 'rating', name: 'typeGuessingInterest', label: t.typeGuessingInterest },
                        { type: 'textarea', name: 'mostCaptivating', label: t.mostCaptivating, placeholder: t.mostCaptivatingPlaceholder },
                        { type: 'textarea', name: 'likedMost', label: t.likedMost, placeholder: t.likedMostPlaceholder },
                    ]},
                    { title: t.section3Title, fields: [
                        { type: 'rating', name: 'overallFit', label: t.overallFit },
                        { type: 'textarea', name: 'fittingExamples', label: t.fittingExamples, placeholder: t.fittingExamplesPlaceholder },
                        { type: 'textarea', name: 'notFittingExamples', label: t.notFittingExamples, placeholder: t.notFittingExamplesPlaceholder },
                        { type: 'textarea', name: 'feltOffended', label: t.feltOffended, placeholder: t.feltOffendedPlaceholder },
                        { type: 'textarea', name: 'topStrengths', label: t.topStrengths, placeholder: t.topStrengthsPlaceholder },
                        { type: 'textarea', name: 'biggestChallenge', label: t.biggestChallenge, placeholder: t.biggestChallengePlaceholder },
                        { type: 'radio', name: 'mbtiAgreement', label: t.mbtiAgreement, options: t.mbtiOptions },
                        { type: 'select', name: 'actualMbtiType', label: t.actualMbtiType, options: mbtiTypes, placeholder: t.mbtiPlaceholder },
                        { type: 'select', name: 'actualEnneagramType', label: t.actualEnneagramType, options: enneagramTypes, placeholder: t.enneagramPlaceholder },
                    ]},
                    { title: t.section4Title, fields: [
                        { type: 'radio', name: 'length', label: t.length, options: t.lengthOptions },
                        { type: 'rating', name: 'clarityRating', label: t.clarityRating },
                        { type: 'textarea', name: 'confusingTerms', label: t.confusingTerms, placeholder: t.confusingTermsPlaceholder },
                        { type: 'radio', name: 'visualsHelpfulness', label: t.visualsHelpfulness, options: t.visualsOptions },
                    ]},
                    { title: t.section5Title, fields: [
                        { type: 'textarea', name: 'primaryBenefit', label: t.primaryBenefit, placeholder: t.primaryBenefitPlaceholder },
                        { type: 'rating', name: 'recommendLikelihood', label: t.recommendLikelihood },
                        { type: 'radio', name: 'fairPrice', label: t.fairPrice, options: t.priceOptions },
                    ]},
                    { title: t.section6Title, fields: [
                        { type: 'textarea', name: 'changesOrAdditions', label: t.changesOrAdditions, placeholder: t.changesOrAdditionsPlaceholder },
                        { type: 'textarea', name: 'wishedForInfo', label: t.wishedForInfo, placeholder: t.wishedForInfoPlaceholder },
                        { type: 'textarea', name: 'otherComments', label: t.otherComments, placeholder: t.otherCommentsPlaceholder },
                    ]}
                ];

                formSections.forEach(section => {
                    formHTML += `<div class="bg-white/80 p-6 rounded-2xl shadow-lg"><h2 class="text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-4 mb-6">${section.title}</h2><div class="space-y-6">`;
                    section.fields.forEach(field => {
                        formHTML += `<div><label class="block text-lg font-semibold text-gray-700 mb-2">${field.label}</label>`;
                        switch (field.type) {
                            case 'text':
                                formHTML += `<input type="text" name="${field.name}" placeholder="${field.placeholder}" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">`;
                                break;
                            case 'textarea':
                                formHTML += `<textarea name="${field.name}" placeholder="${field.placeholder}" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" rows="3"></textarea>`;
                                break;
                            case 'rating':
                                formHTML += `<div class="star-rating flex flex-wrap gap-x-1" data-name="${field.name}"></div>`;
                                break;
                            case 'radio':
                                formHTML += `<div class="flex flex-wrap gap-3">${field.options.map(o => `<label class="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 cursor-pointer hover:bg-indigo-50"><input type="radio" name="${field.name}" value="${o.value}" class="form-radio h-4 w-4 text-indigo-600"><span>${o.label}</span></label>`).join('')}</div>`;
                                break;
                            case 'select':
                                formHTML += `<select name="${field.name}" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"><option value="" disabled selected>${field.placeholder}</option>${field.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`;
                                break;
                        }
                        formHTML += `</div>`;
                    });
                    formHTML += `</div></div>`;
                });

                const feedbackModalHTML = `
                    <div class="flex justify-between items-center mb-6">
                        <header class="text-left">
                            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">${langData[lang].feedbackModalTitle}</h1>
                            <p class="mt-2 text-lg text-gray-600">${langData[lang].feedbackModalDesc}</p>
                        </header>
                        <button class="close-modal-btn text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                    </div>
                    <div id="feedback-form-container">
                        <form id="eeg-feedback-form" class="space-y-8">
                            ${formHTML}
                            <div class="mt-10 text-center">
                                <button type="submit" id="feedback-submit-button" class="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105">${t.submitButton}</button>
                            </div>
                        </form>
                    </div>
                    <div id="feedback-success" class="hidden text-center">
                        <i data-lucide="check-circle-2" class="mx-auto h-16 w-16 text-green-500"></i>
                        <h1 class="mt-4 text-3xl font-extrabold text-gray-800">${t.successTitle}</h1>
                        <p class="mt-2 text-lg text-gray-600">${t.successDesc}</p>
                    </div>
                `;
                const modal = createModal('feedback-modal-backdrop', feedbackModalHTML, 'max-w-4xl');
                toggleModal(modal, true);
                
                // Populate star ratings
                modal.querySelectorAll('.star-rating').forEach(container => {
                    for (let i = 1; i <= 10; i++) {
                        const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        star.setAttribute('class', 'star w-8 h-8 cursor-pointer text-gray-300');
                        star.setAttribute('fill', 'currentColor');
                        star.setAttribute('viewBox', '0 0 20 20');
                        star.innerHTML = `<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />`;
                        star.dataset.value = i;
                        container.appendChild(star);
                    }
                });
                lucide.createIcons();

                modal.querySelector('.close-modal-btn').addEventListener('click', () => toggleModal(modal, false));
                
                modal.querySelector('#eeg-feedback-form').addEventListener('click', (e) => {
                    if (e.target.closest('.star-rating .star')) {
                        const star = e.target.closest('.star');
                        const ratingContainer = star.parentElement;
                        const value = star.dataset.value;
                        ratingContainer.dataset.rating = value;
                        Array.from(ratingContainer.children).forEach(s => {
                            s.classList.toggle('text-yellow-400', s.dataset.value <= value);
                            s.classList.toggle('text-gray-300', s.dataset.value > value);
                        });
                    }
                });

                modal.querySelector('#eeg-feedback-form').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    if (!db || !isAuthReady) {
                        alert("Connection not ready. Please wait and try again.");
                        return;
                    }
                    const submitBtn = modal.querySelector('#feedback-submit-button');
                    submitBtn.disabled = true;
                    submitBtn.textContent = t.submittingButton;

                    const formData = new FormData(e.target);
                    const feedbackData = {};
                    for (let [key, value] of formData.entries()) {
                        feedbackData[key] = value;
                    }
                    modal.querySelectorAll('.star-rating').forEach(container => {
                        feedbackData[container.dataset.name] = parseInt(container.dataset.rating || 0, 10);
                    });

                    try {
                        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                        const feedbackCollectionRef = collection(db, `/artifacts/${appId}/public/data/feedback`);
                        await addDoc(feedbackCollectionRef, {
                            userId: userId || 'anonymous',
                            submittedAt: new Date().toISOString(),
                            ...feedbackData
                        });
                        modal.querySelector('#feedback-form-container').classList.add('hidden');
                        modal.querySelector('#feedback-success').classList.remove('hidden');
                    } catch (error) {
                        console.error("Error writing to Firestore: ", error);
                        alert("Error submitting feedback.");
                        submitBtn.disabled = false;
                        submitBtn.textContent = t.submitButton;
                    }
                });
            });

            // --- Initial Page Load ---
            const preferredLanguage = localStorage.getItem('preferredLanguage') || 'de';
            updateLanguage(preferredLanguage);
            
            document.getElementById('year').textContent = new Date().getFullYear();
            const yearMobile = document.getElementById('year-mobile');
            if(yearMobile) yearMobile.textContent = new Date().getFullYear();
            lucide.createIcons();
        });
    </script>
</body>
</html>
