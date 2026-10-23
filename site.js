const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = mobileMenu?.querySelector(".menu-panel");
const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];
const whatsappNumber = "393286577160";
const plateformBookingUrl = "https://ristorantelabeccaccia.plateform.app/";
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
const backgroundRegions = [document.querySelector("main"), document.querySelector(".site-footer")].filter(Boolean);
let lastFocusedElement = null;

const lockMobileHeroHeight = () => {
  if (!window.matchMedia?.("(max-width: 760px)").matches) return;
  document.documentElement.style.setProperty("--mobile-hero-height", `${window.innerHeight}px`);
};

lockMobileHeroHeight();
window.addEventListener("orientationchange", () => window.setTimeout(lockMobileHeroHeight, 180));

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const resetInitialHeroScroll = () => {
  const hash = window.location.hash;
  const isMobileViewport = window.matchMedia?.("(max-width: 760px)")?.matches ?? window.innerWidth <= 760;
  if (hash && hash !== "#top") {
    if (!isMobileViewport) return;
    window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const scheduleInitialHeroScrollReset = () => {
  resetInitialHeroScroll();
  window.requestAnimationFrame(resetInitialHeroScroll);
  window.setTimeout(resetInitialHeroScroll, 80);
  window.setTimeout(resetInitialHeroScroll, 260);
};

scheduleInitialHeroScrollReset();
window.addEventListener("pageshow", scheduleInitialHeroScrollReset);
window.addEventListener("load", scheduleInitialHeroScrollReset, { once: true });

const translations = {
  it: {
    skip: "Vai al contenuto",
    "nav.restaurant": "Ristorante",
    "nav.location": "Location",
    "nav.events": "Eventi",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "PRENOTA ONLINE",
    "cta.bookNow": "PRENOTA ONLINE",
    "cta.bookTable": "PRENOTA ONLINE",
    "cta.heroBook": "PRENOTA ONLINE",
    "cta.menu": "Scopri il nostro menù",
    "cta.wine": "Carta dei Vini",
    "cta.call": "Chiama ora",
    "cta.whatsappInfo": "WhatsApp info",
    "cta.whatsappBooking": "WhatsApp tavolo",
    "sticky.menu": "MENU",
    "sticky.book": "PRENOTA",
    "sticky.directions": "INDICAZIONI",
    "card.food": "Menù",
    "card.wine": "Carta dei Vini",
    "card.note": "I nostri piatti possono contenere o essere preparati in ambienti dove sono presenti allergeni. Per qualsiasi informazione chiedere al personale.",
    "card.wineNote": "Etichette, annate e disponibilità possono variare. Chiedi al personale il suggerimento del giorno.",
    "hero.overline": "Brace & Cucina",
    "hero.hours": "<span>APERTO TUTTO L'ANNO</span> CARNE ALLA BRACE - CUCINA LIGURE - FUNGHI - TARTUFI",
    "hero.edge": "Brace, funghi & tradizione ligure",
    "hero.discover": "Scopri La Beccaccia",
    "hero.openYear": "Aperti tutto l'anno",
    "hero.manifesto": "Cucina ligure contemporanea · Carne alla brace<br><span class=\"hero-specialties\">Tartufi · Funghi · Cantina con oltre 500 etichette</span>",
    "restaurant.kicker": "01 Ristorante",
    "restaurant.copy1": "Cucina ligure contemporanea, materia prima e stagionalità guidano una carta che incontra il fuoco della brace, i tartufi e i funghi.",
    "restaurant.copy2": "La cantina raccoglie oltre 500 etichette, selezionate per accompagnare ogni percorso.",
    "location.kicker": "02 Location",
    "location.copy1": "Via Santa Maria del Campo 176, sulle prime alture di Rapallo.",
    "location.copy2": "Sala, grande braciere a vista, veranda e giardino per pranzi e cene.",
    "location.front": "La sala",
    "location.exterior": "L'esterno",
    "location.outdoor": "La tavola",
    "location.room": "La veranda",
    "location.table": "Vista panoramica",
    "location.details": "La vista",
    "location.terrace1": "Sala interna",
    "location.terrace2": "Il dehors",
    "location.terrace3": "Il giardino",
    "location.dehors": "Il dehors",
    "location.gardenTables": "Tavoli nel verde",
    "events.kicker": "03 Eventi",
    "events.title": "Eventi <em>privati.</em>",
    "events.copy": "Matrimoni, battesimi, comunioni, cresime e feste private trovano alla Beccaccia una cornice riservata, menu curati e il calore della nostra cucina.",
    "events.note": "Raccontaci occasione, periodo e numero ospiti: ti ricontatteremo con una proposta su misura.",
    "events.cta": "RICHIEDI INFORMAZIONI",
    "reviews.kicker": "04 Recensioni",
    "reviews.title": "Cosa dicono di noi",
    "reviews.awards": "Canali recensioni",
    "reviews.cardLabel1": "Brace",
    "reviews.cardLabel2": "Accoglienza",
    "reviews.cardLabel3": "Rapallo",
    "reviews.quote1": "Carne alla brace, pasta fresca e piatti liguri per una cena calda e generosa.",
    "reviews.author1": "La Beccaccia · Brace e cucina",
    "reviews.quote2": "Servizio diretto, atmosfera conviviale e tavoli pronti ad accogliere pranzi e cene.",
    "reviews.author2": "Via Santa Maria del Campo 176",
    "reviews.quote3": "Una tappa sulle alture di Rapallo tra braciere, veranda, giardino e profumi liguri.",
    "reviews.author3": "Rapallo · GE",
    "reviews.read": "Leggi le recensioni",
    "reviews.leave": "Lascia una recensione",
    "contacts.kicker": "05 Contatti",
    "contacts.title": "Contatti",
    "contacts.where": "Dove siamo",
    "contacts.hoursLabel": "Orari",
    "contacts.hours": "Da martedì a sabato 19:30-23:00<br>Domenica 12:30-15:00 e 19:30-23:00<br>Chiuso il lunedì",
    "contacts.openYear": "Aperti tutto l'anno",
    "contacts.phone": "Telefono",
    "contacts.email": "Email",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Rapallo · Riviera ligure",
    "contacts.openMap": "Apri su Google Maps",
    "footer.tagline": "Brace, cucina ligure,<br>profumo di legna.",
    "footer.top": "Torna su",
    "legal.privacy": "Privacy",
    "legal.cookies": "Cookie",
    "legal.notes": "Note legali",
    "legal.manageCookies": "Gestisci cookie",
    "cookie.title": "Privacy e servizi esterni",
    "cookie.copy": "Usiamo solo strumenti tecnici. Google Maps viene caricato solo dopo il consenso ai servizi esterni.",
    "cookie.necessary": "Solo necessari",
    "cookie.accept": "Accetta servizi esterni",
    "cookie.preferences": "Dettagli",
    "map.notice": "La mappa di Google viene caricata solo dopo il consenso ai servizi esterni.",
    "map.load": "Carica la mappa",
    "bookingForm.kicker": "La Beccaccia · WhatsApp",
    "bookingForm.title": "Richiedi<br><em>un tavolo.</em>",
    "bookingForm.intro": "Compila i dati essenziali: prepariamo il messaggio e apriamo WhatsApp.",
    "bookingForm.name": "Nome Cognome *",
    "bookingForm.date": "Data *",
    "bookingForm.time": "Ora *",
    "bookingForm.guests": "Persone *",
    "bookingForm.guestsChoose": "Scegli",
    "bookingForm.guests1": "1 persona",
    "bookingForm.guests2": "2 persone",
    "bookingForm.guests3": "3 persone",
    "bookingForm.guests4": "4 persone",
    "bookingForm.guests5": "5 persone",
    "bookingForm.guests6": "6+ persone",
    "bookingForm.submit": "Continua su WhatsApp",
    "bookingForm.note": "Il sito non salva i dati: WhatsApp si apre con la richiesta già compilata.",
    "form.kicker": "La Beccaccia · Eventi",
    "form.title": "Raccontaci<br><em>il tuo evento.</em>",
    "form.intro": "Invia una prima richiesta: prepariamo un messaggio WhatsApp con i dettagli per ricontattarti.",
    "form.name": "Nome Cognome *",
    "form.contact": "Telefono o email *",
    "form.eventType": "Tipologia evento *",
    "form.eventTypeChoose": "Scegli",
    "form.eventWedding": "Matrimonio",
    "form.eventBaptism": "Battesimo",
    "form.eventCommunion": "Comunione",
    "form.eventConfirmation": "Cresima",
    "form.eventPrivate": "Festa privata",
    "form.eventOther": "Altro",
    "form.eventDate": "Data indicativa",
    "form.guests": "Numero ospiti *",
    "form.message": "Messaggio",
    "form.placeholder": "Dettagli, esigenze o richieste particolari",
    "form.submit": "Invia richiesta su WhatsApp",
    "form.note": "Il sito non salva i dati: WhatsApp si apre con la richiesta già compilata.",
  },
  en: {
    skip: "Skip to content",
    "nav.restaurant": "Restaurant",
    "nav.location": "Location",
    "nav.events": "Events",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "BOOK ONLINE",
    "cta.bookNow": "BOOK ONLINE",
    "cta.bookTable": "BOOK ONLINE",
    "cta.heroBook": "BOOK ONLINE",
    "cta.menu": "Discover our menu",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "cta.whatsappInfo": "WhatsApp info",
    "cta.whatsappBooking": "WhatsApp table",
    "sticky.menu": "MENU",
    "sticky.book": "BOOK",
    "sticky.directions": "DIRECTIONS",
    "card.food": "Menu",
    "card.wine": "Wine list",
    "card.note": "Our dishes may contain allergens or be prepared in environments where allergens are present. Please ask our staff for any information.",
    "card.wineNote": "Labels, vintages and availability may vary. Ask our staff for today's recommendation.",
    "hero.overline": "Grill & Cuisine",
    "hero.hours": "<span>OPEN ALL YEAR</span> CHARCOAL GRILL - LIGURIAN CUISINE - MUSHROOMS - TRUFFLES",
    "hero.edge": "Grill, mushrooms & Ligurian tradition",
    "hero.discover": "Discover La Beccaccia",
    "hero.openYear": "Open all year",
    "hero.manifesto": "Contemporary Ligurian cuisine · Charcoal-grilled meat<br><span class=\"hero-specialties\">Truffles · Mushrooms · Wine cellar with over 500 labels</span>",
    "restaurant.kicker": "01 Restaurant",
    "restaurant.copy1": "Contemporary Ligurian cuisine, fine ingredients and seasonality shape a menu inspired by the grill, truffles and mushrooms.",
    "restaurant.copy2": "The cellar brings together over 500 labels, selected to complement every dining journey.",
    "location.kicker": "02 Location",
    "location.copy1": "Via Santa Maria del Campo 176, on the first hills of Rapallo.",
    "location.copy2": "Dining room, open grill, veranda and garden for lunch and dinner.",
    "location.front": "The dining room",
    "location.exterior": "Outside",
    "location.outdoor": "The table",
    "location.room": "The veranda",
    "location.table": "Panoramic view",
    "location.details": "The view",
    "location.terrace1": "Inside dining room",
    "location.terrace2": "Outdoor dining",
    "location.terrace3": "The garden",
    "location.dehors": "The outdoor area",
    "location.gardenTables": "Garden tables",
    "events.kicker": "03 Events",
    "events.title": "Private <em>events.</em>",
    "events.copy": "Weddings, baptisms, communions, confirmations and private parties find a reserved setting, curated menus and the warmth of La Beccaccia's cuisine.",
    "events.note": "Tell us the occasion, period and guest count: we will get back to you with a tailored proposal.",
    "events.cta": "REQUEST INFORMATION",
    "reviews.kicker": "04 Reviews",
    "reviews.title": "What guests say",
    "reviews.awards": "Review channels",
    "reviews.cardLabel1": "Grill",
    "reviews.cardLabel2": "Hospitality",
    "reviews.cardLabel3": "Rapallo",
    "reviews.quote1": "Charcoal-grilled meat, fresh pasta and Ligurian dishes for a warm, generous dinner.",
    "reviews.author1": "La Beccaccia · Grill & cuisine",
    "reviews.quote2": "Direct service, a convivial atmosphere and tables ready for lunch and dinner.",
    "reviews.author2": "Via Santa Maria del Campo 176",
    "reviews.quote3": "A stop on the hills of Rapallo among grill aromas, veranda, garden and Ligurian flavours.",
    "reviews.author3": "Rapallo · GE",
    "reviews.read": "Read reviews",
    "reviews.leave": "Leave a review",
    "contacts.kicker": "05 Contacts",
    "contacts.title": "Contacts",
    "contacts.where": "Find us",
    "contacts.hoursLabel": "Opening hours",
    "contacts.hours": "Tuesday to Saturday 7:30 PM-11:00 PM<br>Sunday 12:30 PM-3:00 PM and 7:30 PM-11:00 PM<br>Closed on Monday",
    "contacts.openYear": "Open all year",
    "contacts.phone": "Phone",
    "contacts.email": "Email",
    "contacts.socialLabel": "Email",
    "contacts.mapLabel": "Rapallo · Ligurian Riviera",
    "contacts.openMap": "Open in Google Maps",
    "footer.tagline": "Grill, Ligurian cuisine,<br>wood-fire aroma.",
    "footer.top": "Back to top",
    "legal.privacy": "Privacy",
    "legal.cookies": "Cookies",
    "legal.notes": "Legal notes",
    "legal.manageCookies": "Manage cookies",
    "cookie.title": "Privacy and external services",
    "cookie.copy": "We only use technical tools. Google Maps loads only after consent to external services.",
    "cookie.necessary": "Necessary only",
    "cookie.accept": "Accept external services",
    "cookie.preferences": "Details",
    "map.notice": "Google Maps is loaded only after consent to external services.",
    "map.load": "Load map",
    "bookingForm.kicker": "La Beccaccia · WhatsApp",
    "bookingForm.title": "Request<br><em>a table.</em>",
    "bookingForm.intro": "Fill in the essential details: we prepare the message and open WhatsApp.",
    "bookingForm.name": "Full name *",
    "bookingForm.date": "Date *",
    "bookingForm.time": "Time *",
    "bookingForm.guests": "Guests *",
    "bookingForm.guestsChoose": "Select",
    "bookingForm.guests1": "1 person",
    "bookingForm.guests2": "2 people",
    "bookingForm.guests3": "3 people",
    "bookingForm.guests4": "4 people",
    "bookingForm.guests5": "5 people",
    "bookingForm.guests6": "6+ people",
    "bookingForm.submit": "Continue on WhatsApp",
    "bookingForm.note": "No data is stored on this website: WhatsApp opens with the request already filled in.",
    "form.kicker": "La Beccaccia · Events",
    "form.title": "Tell us<br><em>about your event.</em>",
    "form.intro": "Send a first request: we prepare a WhatsApp message with the details so we can contact you.",
    "form.name": "Full name *",
    "form.contact": "Phone or email *",
    "form.eventType": "Event type *",
    "form.eventTypeChoose": "Select",
    "form.eventWedding": "Wedding",
    "form.eventBaptism": "Baptism",
    "form.eventCommunion": "Communion",
    "form.eventConfirmation": "Confirmation",
    "form.eventPrivate": "Private party",
    "form.eventOther": "Other",
    "form.eventDate": "Indicative date",
    "form.guests": "Guest count *",
    "form.message": "Message",
    "form.placeholder": "Details, needs or special requests",
    "form.submit": "Send request on WhatsApp",
    "form.note": "No data is stored on this website: WhatsApp opens with the request already filled in.",
  },
};

const menuCatalogs = {
  food: {
    intro: {
      it: {
        kicker: "La Beccaccia · Menu 2026",
        title: "Il nostro <em>menù.</em>",
        description: "Menu digitale completo con aperitivi, bocconi, antipasti, pasta fresca, secondi, brace, contorni e proposte stagionali.",
      },
      en: {
        kicker: "La Beccaccia · 2026 menu",
        title: "Our <em>menu.</em>",
        description: "A complete digital menu with aperitifs, bites, starters, fresh pasta, mains, grill, sides and seasonal proposals.",
      },
    },
    sections: [
      {
        it: "Benvenuti",
        en: "Welcome",
        items: [
          {
            it: "Brace e Cucina dal 1970",
            en: "Grill and cuisine since 1970",
            description: {
              it: "In un angolo tranquillo di Rapallo, tra il profumo della legna arsa e il calore del braciere a vista, nel 1970 nasce La Beccaccia. Da noi la tradizione incontra la creatività e la nostra brace non è solo cottura, è un rito. Molte ricette parlano ligure con un'anima curiosa; le altre nascono da un'attenta ricerca nelle cucine contemporanee di tutto il mondo. Alessandro e Lisa, insieme allo Chef, firmano il menù con passione, tradizione, innovazione e una ricerca assidua della qualità delle materie prime.",
              en: "In a quiet corner of Rapallo, among the scent of burning wood and the warmth of the open grill, La Beccaccia was born in 1970. Tradition meets creativity here, and our grill is not just cooking: it is a ritual. Many recipes speak Ligurian with a curious soul; others come from careful research into contemporary kitchens around the world. Alessandro and Lisa, together with the Chef, shape the menu around passion, tradition, innovation and a constant pursuit of quality ingredients.",
            },
            tags: ["traditional"],
          },
        ],
      },
      {
        it: "Aperitivi",
        en: "Aperitifs",
        note: {
          it: "Gli aperitivi vengono tutti serviti con degli stuzzichini di benvenuto.",
          en: "All aperitifs are served with welcome bites.",
        },
        items: [
          { it: "Gin Lemon", en: "Gin Lemon", description: { it: "Gin a scelta", en: "Gin of your choice" }, price: "€ 15,00" },
          { it: "Aperol/Campari Spritz", en: "Aperol/Campari Spritz", price: "€ 15,00" },
          { it: "Sangria", en: "Sangria", description: { it: "1 lt", en: "1 litre" }, price: "€ 20,00" },
          { it: "Sangria", en: "Sangria", description: { it: "1/2 lt", en: "1/2 litre" }, price: "€ 12,00" },
        ],
      },
      {
        it: "Brindisi & Bocconi",
        en: "Toasts & bites",
        items: [
          {
            it: "Cristallo, Orto e Liguria",
            en: "Cristallo, garden and Liguria",
            year: "2026",
            description: {
              it: "Pan de Cristal, filetto di San Marzano marinato, acciughe salate del Mar Ligure e stracciatella di bufala.",
              en: "Pan de Cristal, marinated San Marzano fillet, salted Ligurian Sea anchovies and buffalo stracciatella.",
            },
            price: "€ 20,00",
            tags: ["traditional"],
          },
          {
            it: "Il Maialino",
            en: "Suckling pig",
            year: "2021",
            description: {
              it: "Spalla di maialino cotta a bassa temperatura per 24 ore, laccata con la sua salsa, patate arrosto e giardiniera di verdure.",
              en: "Suckling pig shoulder cooked at low temperature for 24 hours, lacquered with its sauce, roast potatoes and vegetable giardiniera.",
            },
            price: "€ 23,00",
            tags: ["glutenFree"],
          },
          {
            it: "La Beccaccia",
            en: "La Beccaccia",
            year: "2022",
            description: {
              it: "Fettuccine di pasta fresca all'uovo al burro d'alpeggio, mantecate al momento nella forma di Parmigiano Reggiano \"Vacche Rosse\" e servite con pentolino di Toccu alla Genovese a parte. Minimo per 2 persone.",
              en: "Fresh egg fettuccine with alpine butter, finished at the table inside a wheel of Parmigiano Reggiano \"Vacche Rosse\" and served with Toccu alla Genovese on the side. Minimum for 2 people.",
            },
            price: "€ 20,00 p.p.",
            tags: ["traditional"],
          },
          {
            it: "Filetto come un Cappon Magro",
            en: "Fillet like a Cappon Magro",
            year: "2026",
            description: {
              it: "Filetto alla brace con verdure marinate e salsa verde del Cappon Magro genovese, in una rivisitazione della tradizione ligure.",
              en: "Grilled fillet with marinated vegetables and Genovese Cappon Magro green sauce, reinterpreting Ligurian tradition.",
            },
            price: "€ 39,00",
            tags: ["traditional"],
          },
        ],
      },
      {
        it: "In Stagione",
        en: "In season",
        note: {
          it: "Indicativamente da luglio a gennaio.",
          en: "Approximately from July to January.",
        },
        items: [
          {
            it: "Funghi Porcini e Tartufi Bianchi e Neri",
            en: "Porcini mushrooms and white and black truffles",
            description: {
              it: "Proposte stagionali secondo disponibilità.",
              en: "Seasonal proposals depending on availability.",
            },
            price: "Secondo disponibilità",
            tags: ["seasonal"],
          },
          {
            it: "Aragosta, Scampi e Gamberoni di S. Margherita",
            en: "Lobster, scampi and king prawns from S. Margherita",
            description: {
              it: "Solo su prenotazione.",
              en: "By reservation only.",
            },
            price: "Su prenotazione",
            tags: ["reservation"],
          },
        ],
      },
      {
        it: "Per iniziare", en: "Starters",
        items: [
          {
            it: "Millefoglie d'Anatra",
            en: "Duck millefeuille",
            description: {
              it: "Petto d'anatra marinato e alla brace, crema di mela, amarena, finocchio all'arancia e croccante di carta musica.",
              en: "Marinated grilled duck breast, apple cream, sour cherry, orange fennel and crisp carta musica bread.",
            },
            price: "€ 22,00",
          },
          {
            it: "Il Tagliere Rustico",
            en: "Rustic board",
            description: {
              it: "Coppa artigianale stagionata, la nostra insalata russa classica e le tipiche focaccette genovesi ripiene di stracchino.",
              en: "Aged artisanal coppa, our classic Russian salad and typical Genovese focaccette filled with stracchino.",
            },
            price: "€ 19,00",
            tags: ["traditional"],
          },
          {
            it: "Finto Foie Gras",
            en: "Faux foie gras",
            description: {
              it: "Pain perdu alla francese con fegatini di vitello, lardo di Patanegra, confettura di fichi e caviale di aceto balsamico di Modena.",
              en: "French-style pain perdu with veal liver, Patanegra lardo, fig preserve and Modena balsamic vinegar caviar.",
            },
            price: "€ 18,00",
          },
          {
            it: "Giardino in Tavola",
            en: "Garden on the table",
            description: {
              it: "Flan di zucchina trombetta su leggera fonduta di formaggio, zabajone salato e zucchina marinata.",
              en: "Trombetta courgette flan on a light cheese fondue, savoury zabaglione and marinated courgette.",
            },
            price: "€ 18,00",
            tags: ["glutenFree", "vegetarian"],
          },
        ],
      },
      {
        it: "La Pasta", en: "Fresh pasta",
        items: [
          {
            it: "Pansoti au sö (Pansoti al Sole)",
            en: "Pansoti au sö (sun pansoti)",
            description: {
              it: "I veri pansoti genovesi fatti a mano, ripieni di borragine secondo tradizione ligure, serviti con vellutata di datterino giallo alla brace e riduzione di basilico genovese.",
              en: "Handmade Genovese pansoti filled with borage according to Ligurian tradition, served with grilled yellow datterino tomato velouté and Genovese basil reduction.",
            },
            price: "€ 22,00",
            tags: ["traditional", "vegetarian"],
          },
          {
            it: "La Carlona",
            en: "La Carlona",
            description: {
              it: "Taglierini di pasta fresca all'uovo con ragù di coniglio in bianco alla ligure.",
              en: "Fresh egg taglierini with white Ligurian rabbit ragù.",
            },
            price: "€ 20,00",
            tags: ["traditional"],
          },
        ],
      },
      {
        it: "Secondi", en: "Second courses",
        items: [
          {
            it: "Maschetta Fondente",
            en: "Melting beef cheek",
            description: {
              it: "Guancia di manzo confit cotta a 63°, il suo fondo e accompagnata da puré di patate alla Robuchon.",
              en: "Confit beef cheek cooked at 63°C, served with its jus and Robuchon-style potato purée.",
            },
            price: "€ 25,00",
            tags: ["glutenFree"],
          },
          {
            it: "Cruda in Riviera",
            en: "Raw Fassona in Riviera style",
            description: {
              it: "Tartare di Fassona Piemontese a coltello, emulsione al basilico e olio D.O.P. Genovese, acciuga salata del Mar Ligure, crumble di focaccia, pomodorino confit e frutto del cappero.",
              en: "Knife-cut Piedmontese Fassona tartare, basil and Genovese D.O.P. olive oil emulsion, salted Ligurian Sea anchovy, focaccia crumble, confit tomato and caper berry.",
            },
            price: "€ 22,00",
            tags: ["traditional"],
          },
        ],
      },
      {
        it: "Alla Brace",
        en: "From the grill",
        note: {
          it: "La nostra prima scelta, da sempre.",
          en: "Our first choice, as always.",
        },
        items: [
          { it: "Costata o Fiorentina di Fassona Piemontese", en: "Piedmontese Fassona rib steak or Fiorentina", price: "€ 6,40 / etto" },
          { it: "Tomahawk di Scottona Bavarese", en: "Bavarian heifer tomahawk", price: "€ 6,50 / etto" },
          { it: "Costata \"Iberica\"", en: "Iberian rib steak", price: "€ 7,50 / etto" },
          { it: "Picanha di vacca bionda Spagnola", en: "Spanish blonde cow picanha", description: { it: "Circa 250 g", en: "About 250 g" }, price: "€ 30,00" },
        ],
      },
      {
        it: "Contorni", en: "Side dishes",
        items: [
          { it: "Verdure alla brace", en: "Grilled vegetables", price: "€ 10,00" },
          { it: "Patate arrosto", en: "Roast potatoes", price: "€ 6,00" },
          { it: "Insalata mista", en: "Mixed salad", price: "€ 8,00" },
        ],
      },
      {
        it: "Servizio", en: "Service",
        items: [
          { it: "Pane, Coperto e Servizio", en: "Bread, cover and service", price: "€ 4,00" },
        ],
      },
    ],
  },
  wine: {
    intro: {
      it: {
        kicker: "La Beccaccia · Carta vini",
        title: "Carta<br><em>dei Vini.</em>",
        description: "Etichette, calici, vini dolci e distillati. Disponibilità e annate possono variare.",
      },
      en: {
        kicker: "La Beccaccia · Wine list",
        title: "Wine<br><em>list.</em>",
        description: "Labels, by-the-glass pours, sweet wines and spirits. Availability and vintages may vary.",
      },
    },
    sections: [
      {
        it: "Al calice", en: "By the glass",
        items: [
          { it: "Pedro Ximenez Px 2017", en: "Pedro Ximenez Px 2017", price: "€ 16,00" },
          { it: "China Dott. Clementi", en: "China Dott. Clementi", price: "€ 12,00" },
          { it: "Sauternes 2018 Château Haut-Monteils", en: "Sauternes 2018 Château Haut-Monteils", price: "€ 10,00" },
          { it: "Barolo Chinato Terre del Barolo", en: "Barolo Chinato Terre del Barolo", price: "€ 8,00" },
          { it: "Porto Don Pablo 10 anni", en: "Porto Don Pablo 10 years", price: "€ 7,00" },
        ],
      },
      {
        it: "Vini dolci", en: "Sweet wines",
        items: [
          { it: "Zibibbo Balanubi", en: "Zibibbo Balanubi", price: "€ 7,00" },
          { it: "Passito di Pantelleria Ben Ryè", en: "Passito di Pantelleria Ben Ryè", price: "€ 12,00" },
          { it: "Sciacchetrà Cinqueterre D.O.C. 2019", en: "Sciacchetrà Cinqueterre D.O.C. 2019", price: "€ 15,00" },
          { it: "Moscato di Pantelleria Kabir 2021", en: "Moscato di Pantelleria Kabir 2021", price: "€ 9,00" },
          { it: "Muffato Terre del Marchesato Nobilis 2023", en: "Muffato Terre del Marchesato Nobilis 2023", price: "€ 15,00" },
        ],
      },
      {
        it: "Distillati", en: "Spirits",
        items: [
          { it: "Ampia selezione di rhum, gin, whisky, grappe, distillati e amari", en: "Wide selection of rum, gin, whisky, grappa, spirits and bitters", price: "Chiedere al personale" },
        ],
      },
    ],
  },
};

let currentLanguage = "it";
let currentMenuLanguage = "it";

const getFocusableElements = (container) => {
  if (!container) return [];
  return [...container.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
};

const setBackgroundInert = (inert) => {
  backgroundRegions.forEach((region) => {
    if (inert) region.setAttribute("inert", "");
    else region.removeAttribute("inert");
  });
};

const trapFocus = (event, container) => {
  if (event.key !== "Tab") return;
  const focusableElements = getFocusableElements(container);
  if (!focusableElements.length) {
    event.preventDefault();
    container?.focus();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const setMenu = (open, restoreFocus = true) => {
  const wasOpen = body.classList.contains("menu-open");
  if (open && !wasOpen) lastFocusedElement = document.activeElement;
  body.classList.toggle("menu-open", open);
  mobileMenu?.classList.toggle("is-open", open);
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Chiudi il menù" : "Apri il menù");
  setBackgroundInert(open);

  if (open) {
    window.setTimeout(() => (getFocusableElements(mobileMenuPanel)[0] || mobileMenuPanel)?.focus(), 260);
  } else if (wasOpen && restoreFocus) {
    lastFocusedElement?.focus();
  }
};

menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-online-booking]").forEach((link) => {
  link.setAttribute("href", plateformBookingUrl);
});

const mobileStickyNav = document.querySelector(".mobile-sticky-nav");
const stickyNavSections = [
  { element: document.querySelector("#top"), theme: "dark" },
  { element: document.querySelector("#ristorante"), theme: "dark" },
  { element: document.querySelector("#location"), theme: "light" },
  { element: document.querySelector("#eventi"), theme: "dark" },
  { element: document.querySelector("#recensioni"), theme: "light" },
  { element: document.querySelector("#contatti"), theme: "light" },
  { element: document.querySelector(".site-footer"), theme: "dark" },
].filter(({ element }) => element);

const setStickyNavTheme = (theme) => {
  if (!mobileStickyNav) return;
  const isOnLight = theme === "light";
  mobileStickyNav.classList.toggle("is-on-light", isOnLight);
  mobileStickyNav.classList.toggle("is-on-dark", !isOnLight);
};

const updateStickyNavTheme = () => {
  if (!stickyNavSections.length) return;
  const footerSection = stickyNavSections.find(({ element }) => element.matches(".site-footer"));
  const footerRect = footerSection?.element.getBoundingClientRect();
  if (footerRect && footerRect.top <= window.innerHeight * 0.72 && footerRect.bottom > 0) {
    setStickyNavTheme("dark");
    return;
  }

  const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
  if (isAtPageEnd) {
    setStickyNavTheme("dark");
    return;
  }

  const sampleY = Math.max(96, Math.min(window.innerHeight - 96, window.innerHeight * 0.64));
  const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
  const activeSection = stickyNavSections.find(({ element }) => element.contains(sampleElement))
    || stickyNavSections.reduce((current, section) => {
      const rect = section.element.getBoundingClientRect();
      const distance = Math.abs(rect.top - sampleY);
      return distance < current.distance ? { section, distance } : current;
    }, { section: stickyNavSections[0], distance: Number.POSITIVE_INFINITY }).section;

  setStickyNavTheme(activeSection.theme);
};

if (mobileStickyNav) {
  setStickyNavTheme("dark");
  updateStickyNavTheme();
  window.addEventListener("scroll", updateStickyNavTheme, { passive: true });
  window.addEventListener("resize", updateStickyNavTheme);
}

const setupCarousel = ({ trackSelector, cardSelector, currentSelector, prevSelector, nextSelector }) => {
  const track = document.querySelector(trackSelector);
  const cards = [...document.querySelectorAll(cardSelector)];
  const current = document.querySelector(currentSelector);
  const previous = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);

  if (!track || !cards.length) return;

  const step = () => {
    const styles = getComputedStyle(track);
    return cards[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  };

  const updateCounter = () => {
    if (!current) return;
    const cardStep = step();
    const index = cardStep ? Math.round(track.scrollLeft / cardStep) + 1 : 1;
    current.textContent = String(Math.min(cards.length, Math.max(1, index))).padStart(2, "0");
  };

  previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateCounter, { passive: true });
};

setupCarousel({
  trackSelector: "[data-food-track]",
  cardSelector: ".food-card",
  currentSelector: "[data-food-current]",
  prevSelector: "[data-food-prev]",
  nextSelector: "[data-food-next]",
});

setupCarousel({
  trackSelector: "[data-location-track]",
  cardSelector: ".location-card",
  currentSelector: "[data-location-current]",
  prevSelector: "[data-location-prev]",
  nextSelector: "[data-location-next]",
});

const cardModal = document.querySelector("[data-card-modal]");
const cardDialog = cardModal?.querySelector(".card-dialog");
const cardBody = cardModal?.querySelector(".card-body");
const cardContent = cardModal?.querySelector("[data-card-content]");
const cardTitle = cardModal?.querySelector("[data-card-title]");
let activeCardType = "food";
let cardCloseTimer;

const catalogTagLabels = {
  it: {
    glutenFree: "Gluten Free",
    reservation: "Solo su prenotazione",
    seasonal: "Stagionale",
    traditional: "Tradizionale",
    vegetarian: "Vegetariano",
  },
  en: {
    glutenFree: "Gluten Free",
    reservation: "By reservation",
    seasonal: "Seasonal",
    traditional: "Traditional",
    vegetarian: "Vegetarian",
  },
};

const findSection = (sections, label) => sections.find((section) => section.it === label);

const getOrderedCatalogSections = (type, sections) => {
  if (type === "food") {
    return sections;
  }

  if (type === "wine") {
    return sections;
  }

  return sections;
};

const getLocalizedDescription = (item) => {
  if (item.description?.[currentMenuLanguage]) return item.description[currentMenuLanguage];
  if (typeof item.sub === "string") return item.sub;
  if (item.sub?.[currentMenuLanguage]) return item.sub[currentMenuLanguage];
  return item[currentMenuLanguage === "it" ? "en" : "it"] || "";
};

const renderCatalogMeta = (item) => {
  const tags = (item.tags || []).map((tag) => catalogTagLabels[currentMenuLanguage][tag] || tag);
  const meta = [
    item.year ? `<span class="catalog-item-year">${item.year}</span>` : "",
    ...tags.map((tag) => `<span class="catalog-item-tag">${tag}</span>`),
  ].filter(Boolean);

  return meta.length ? `<div class="catalog-item-meta">${meta.join("")}</div>` : "";
};

const renderCatalog = () => {
  if (!cardContent || !cardTitle) return;
  cardTitle.innerHTML = currentMenuLanguage === "en" ? "Our <em>menu.</em>" : "Il nostro <em>menù.</em>";
};

const applyLanguage = (language) => {
  currentLanguage = translations[language] ? language : "it";
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.placeholder = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderCatalog();
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const setCardType = (type) => {
  activeCardType = menuCatalogs[type] ? type : "food";
  cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
    const active = button.dataset.cardTab === activeCardType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderCatalog();
  if (cardBody) cardBody.scrollTop = 0;
};

const openCardModal = (type, trigger) => {
  if (!cardModal || !cardDialog) return;
  window.clearTimeout(cardCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  currentMenuLanguage = currentLanguage;
  cardModal.querySelectorAll("[data-card-language]").forEach((button) => {
    const active = button.dataset.cardLanguage === currentMenuLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  setCardType(type);
  cardModal.hidden = false;
  cardModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    cardModal.classList.add("is-open");
    window.setTimeout(() => cardModal.querySelector("[data-card-close]")?.focus(), 260);
  });
};

cardModal?.querySelectorAll("[data-card-language]").forEach((button) => {
  button.addEventListener("click", () => {
    currentMenuLanguage = button.dataset.cardLanguage === "en" ? "en" : "it";
    cardModal.querySelectorAll("[data-card-language]").forEach((option) => {
      const active = option.dataset.cardLanguage === currentMenuLanguage;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-selected", String(active));
    });
    renderCatalog();
    if (cardBody) cardBody.scrollTop = 0;
  });
});

const closeCardModal = () => {
  if (!cardModal || cardModal.hidden) return;
  cardModal.classList.remove("is-open");
  cardModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  cardCloseTimer = window.setTimeout(() => {
    cardModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-card-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openCardModal(trigger.dataset.cardTrigger, trigger);
  });
});

cardModal?.querySelector("[data-card-close]")?.addEventListener("click", closeCardModal);
cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
  button.addEventListener("click", () => setCardType(button.dataset.cardTab));
});

const bookingModal = document.querySelector("[data-booking-modal]");
const bookingDialog = bookingModal?.querySelector(".booking-dialog");
const bookingForm = bookingModal?.querySelector("[data-booking-form]");
const bookingDateInput = bookingForm?.querySelector("input[name='date']");
let closeBookingModalTimer;

if (bookingDateInput) bookingDateInput.min = new Date().toISOString().split("T")[0];

const openBookingModal = (trigger) => {
  if (!bookingModal || !bookingDialog) return;
  window.clearTimeout(closeBookingModalTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  bookingModal.hidden = false;
  bookingModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => bookingModal.classList.add("is-open"));
  window.setTimeout(() => bookingForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeBookingModal = () => {
  if (!bookingModal || bookingModal.hidden) return;
  bookingModal.classList.remove("is-open");
  bookingModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  closeBookingModalTimer = window.setTimeout(() => {
    bookingModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-booking-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openBookingModal(trigger);
  });
});

bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => {
  button.addEventListener("click", closeBookingModal);
});

const eventModal = document.querySelector("[data-event-modal]");
const eventDialog = eventModal?.querySelector(".booking-dialog");
const eventForm = eventModal?.querySelector("[data-event-form]");
const eventDateInput = eventForm?.querySelector("input[name='eventDate']");
let closeEventModalTimer;

if (eventDateInput) eventDateInput.min = new Date().toISOString().split("T")[0];

const openEventModal = (trigger) => {
  if (!eventModal || !eventDialog) return;
  window.clearTimeout(closeEventModalTimer);
  lastFocusedElement = trigger;
  setMenu(false, false);
  eventModal.hidden = false;
  eventModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => eventModal.classList.add("is-open"));
  window.setTimeout(() => eventForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeEventModal = () => {
  if (!eventModal || eventModal.hidden) return;
  eventModal.classList.remove("is-open");
  eventModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  closeEventModalTimer = window.setTimeout(() => {
    eventModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-event-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openEventModal(trigger);
  });
});

eventModal?.querySelectorAll("[data-event-close]").forEach((button) => {
  button.addEventListener("click", closeEventModal);
});


const legalModal = document.querySelector("[data-legal-modal]");
const legalDialog = legalModal?.querySelector(".legal-dialog");
let legalCloseTimer;

const setLegalTab = (tab = "privacy") => {
  const nextTab = legalModal?.querySelector(`[data-legal-tab="${tab}"]`) ? tab : "privacy";
  legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
    const active = button.dataset.legalTab === nextTab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  legalModal?.querySelectorAll("[data-legal-panel]").forEach((panel) => {
    const active = panel.dataset.legalPanel === nextTab;
    panel.classList.toggle("is-active", active);
  });
};

const openLegalModal = (tab, trigger) => {
  if (!legalModal || !legalDialog) return;
  window.clearTimeout(legalCloseTimer);
  lastFocusedElement = trigger || document.activeElement;
  setMenu(false, false);
  setLegalTab(tab);
  legalModal.hidden = false;
  legalModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => {
    legalModal.classList.add("is-open");
    window.setTimeout(() => legalModal.querySelector("[data-legal-close]")?.focus(), 260);
  });
};

const closeLegalModal = () => {
  if (!legalModal || legalModal.hidden) return;
  legalModal.classList.remove("is-open");
  legalModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  legalCloseTimer = window.setTimeout(() => {
    legalModal.hidden = true;
    lastFocusedElement?.focus();
  }, 450);
};

document.querySelectorAll("[data-legal-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openLegalModal(trigger.dataset.legalTrigger, trigger);
  });
});

legalModal?.querySelectorAll("[data-legal-close]").forEach((button) => {
  button.addEventListener("click", closeLegalModal);
});

legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
  button.addEventListener("click", () => setLegalTab(button.dataset.legalTab));
});

const consentStorageKey = "laBeccacciaExternalServicesConsent";
const cookieBanner = document.querySelector("[data-cookie-banner]");
const mapFrame = document.querySelector("[data-map-src]");
const mapConsent = document.querySelector("[data-map-consent]");
const mapFrameWrap = mapFrame?.closest(".map-frame");
let externalServicesAllowed = false;
let pendingExternalAction = null;

const readConsent = () => {
  try {
    return JSON.parse(window.localStorage.getItem(consentStorageKey) || "null");
  } catch {
    return null;
  }
};

const saveConsent = (externalServices) => {
  try {
    window.localStorage.setItem(consentStorageKey, JSON.stringify({ externalServices, savedAt: new Date().toISOString() }));
  } catch {
    // Consent still applies for this page view even when storage is unavailable.
  }
};

const showCookieBanner = () => {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  requestAnimationFrame(() => cookieBanner.classList.add("is-visible"));
};

const hideCookieBanner = () => {
  if (!cookieBanner) return;
  cookieBanner.classList.remove("is-visible");
  window.setTimeout(() => {
    cookieBanner.hidden = true;
  }, 220);
};

const hasExternalServicesConsent = () => externalServicesAllowed || readConsent()?.externalServices === true;

const openExternalUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

const requestExternalUrl = (url) => {
  if (hasExternalServicesConsent()) {
    openExternalUrl(url);
    return true;
  }

  pendingExternalAction = () => openExternalUrl(url);
  showCookieBanner();
  return false;
};

const loadExternalMap = ({ persist = true } = {}) => {
  if (!mapFrame) return;
  if (!mapFrame.getAttribute("src")) mapFrame.setAttribute("src", mapFrame.dataset.mapSrc || "");
  mapFrameWrap?.classList.add("map-loaded");
  if (mapConsent) mapConsent.hidden = true;
  if (persist) saveConsent(true);
};

const unloadExternalMap = () => {
  mapFrame?.removeAttribute("src");
  mapFrameWrap?.classList.remove("map-loaded");
  if (mapConsent) mapConsent.hidden = false;
};

const setExternalConsent = (externalServices) => {
  externalServicesAllowed = externalServices;
  saveConsent(externalServices);
  if (externalServices) loadExternalMap({ persist: false });
  else unloadExternalMap();
  hideCookieBanner();

  const action = externalServices ? pendingExternalAction : null;
  pendingExternalAction = null;
  action?.();
};

document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setExternalConsent(true));
document.querySelector("[data-cookie-necessary]")?.addEventListener("click", () => setExternalConsent(false));
document.querySelector("[data-map-load]")?.addEventListener("click", () => {
  setExternalConsent(true);
});

document.querySelectorAll("a[href*='google.com/maps']").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (hasExternalServicesConsent()) return;
    event.preventDefault();
    requestExternalUrl(link.href);
  });
});

document.querySelectorAll("[data-cookie-manage]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showCookieBanner();
  });
});

const initialConsent = readConsent();
externalServicesAllowed = initialConsent?.externalServices === true;
if (initialConsent?.externalServices) {
  loadExternalMap({ persist: false });
} else if (initialConsent) {
  unloadExternalMap();
} else {
  unloadExternalMap();
  showCookieBanner();
}

document.addEventListener("keydown", (event) => {
  if (bookingModal?.classList.contains("is-open")) trapFocus(event, bookingDialog);
  else if (eventModal?.classList.contains("is-open")) trapFocus(event, eventDialog);
  else if (cardModal?.classList.contains("is-open")) trapFocus(event, cardDialog);
  else if (legalModal?.classList.contains("is-open")) trapFocus(event, legalDialog);
  else if (body.classList.contains("menu-open")) trapFocus(event, mobileMenuPanel);

  if (event.key !== "Escape") return;
  if (cardModal?.classList.contains("is-open")) closeCardModal();
  else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
  else if (eventModal?.classList.contains("is-open")) closeEventModal();
  else if (legalModal?.classList.contains("is-open")) closeLegalModal();
  else setMenu(false);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const isEnglish = currentLanguage === "en";
  const name = String(data.get("name") || "").trim();
  const date = String(data.get("date") || "").trim();
  const time = String(data.get("time") || "").trim();
  const guests = String(data.get("guests") || "").trim();
  const formattedDate = date
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
    : "";

  const message = isEnglish
    ? [
        "Hello La Beccaccia, I would like to request a table.",
        "",
        `Name: ${name}`,
        `Date: ${formattedDate}`,
        `Time: ${time}`,
        `Guests: ${guests}`,
      ].join("\n")
    : [
        "Ciao La Beccaccia, vorrei richiedere un tavolo.",
        "",
        `Nome: ${name}`,
        `Data: ${formattedDate}`,
        `Ora: ${time}`,
        `Persone: ${guests}`,
      ].join("\n");

  openExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
});

eventForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(eventForm);
  const isEnglish = currentLanguage === "en";
  const name = String(data.get("name") || "").trim();
  const contact = String(data.get("contact") || "").trim();
  const eventTypeValue = String(data.get("eventType") || "").trim();
  const eventTypeSelect = eventForm.querySelector("select[name='eventType']");
  const eventType = eventTypeSelect?.selectedOptions?.[0]?.textContent?.trim() || eventTypeValue;
  const eventDate = String(data.get("eventDate") || "").trim();
  const guests = String(data.get("guests") || "").trim();
  const messageText = String(data.get("message") || "").trim();
  const formattedDate = eventDate
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${eventDate}T12:00:00`))
    : "";

  const message = isEnglish
    ? [
        "Hello La Beccaccia, I would like information for a private event.",
        "",
        `Name: ${name}`,
        `Phone or email: ${contact}`,
        `Event type: ${eventType}`,
        `Indicative date: ${formattedDate || "To be defined"}`,
        `Guests: ${guests}`,
        `Message: ${messageText || "No additional message"}`,
      ].join("\n")
    : [
        "Ciao La Beccaccia, vorrei ricevere informazioni per un evento privato.",
        "",
        `Nome: ${name}`,
        `Telefono o email: ${contact}`,
        `Tipologia evento: ${eventType}`,
        `Data indicativa: ${formattedDate || "Da definire"}`,
        `Numero ospiti: ${guests}`,
        `Messaggio: ${messageText || "Nessun messaggio aggiuntivo"}`,
      ].join("\n");

  openExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
const heroIndicators = [...document.querySelectorAll("[data-hero-indicator]")];
const heroTitle = document.querySelector(".hero-title-wrap");
let heroMotionFrame = null;
let activeHeroSlide = 0;
let heroCarouselTimer = null;

const setHeroSlide = (index) => {
  if (!heroSlides.length) return;
  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeHeroSlide);
  });
  heroIndicators.forEach((indicator, indicatorIndex) => {
    const active = indicatorIndex === activeHeroSlide;
    indicator.classList.toggle("is-active", active);
    if (active) indicator.setAttribute("aria-current", "true");
    else indicator.removeAttribute("aria-current");
  });
};

const startHeroCarousel = () => {
  if (reduceMotion || heroSlides.length < 2) return;
  window.clearInterval(heroCarouselTimer);
  heroCarouselTimer = window.setInterval(() => setHeroSlide(activeHeroSlide + 1), 3000);
};

heroIndicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    setHeroSlide(Number(indicator.dataset.heroIndicator || 0));
    startHeroCarousel();
  });
});

setHeroSlide(0);
startHeroCarousel();

const updateHeroMotion = () => {
  heroMotionFrame = null;
  if (!hero || !heroTitle || reduceMotion || window.matchMedia("(max-width: 760px)").matches) return;
  const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

  if (progress < 0.002) {
    heroTitle.style.removeProperty("opacity");
    return;
  }

  heroTitle.style.opacity = String(Math.max(0, 1 - progress * 1.22));
};

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    if (heroMotionFrame !== null) return;
    heroMotionFrame = requestAnimationFrame(updateHeroMotion);
  }, { passive: true });
}

const reveals = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((element) => revealObserver.observe(element));
}

applyLanguage("it");
renderCatalog();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
