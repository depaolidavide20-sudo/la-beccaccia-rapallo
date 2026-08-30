const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = mobileMenu?.querySelector(".menu-panel");
const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];
const whatsappNumber = "393286577160";
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
const backgroundRegions = [document.querySelector("main"), document.querySelector(".site-footer")].filter(Boolean);
let lastFocusedElement = null;

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
    "nav.luggage": "Eventi",
    "nav.reviews": "Recensioni",
    "nav.contacts": "Contatti",
    "cta.book": "Prenota",
    "cta.bookTable": "Prenota un tavolo",
    "cta.menu": "Scopri il nostro menù",
    "cta.wine": "Carta dei Vini",
    "cta.call": "Chiama ora",
    "card.food": "Menù",
    "card.wine": "Carta dei Vini",
    "card.note": "In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. Alcuni prodotti possono essere sottoposti ad abbattimento rapido della temperatura. La carta può variare secondo stagione e disponibilità.",
    "card.wineNote": "Etichette, annate e disponibilità possono variare. Chiedi al personale il suggerimento del giorno.",
    "hero.overline": "Brace & Cucina",
    "hero.hours": "<span>APERTO TUTTO L'ANNO</span> CARNE ALLA BRACE - CUCINA LIGURE - FUNGHI - TARTUFI",
    "hero.edge": "Brace, funghi & tradizione ligure",
    "hero.discover": "Scopri La Beccaccia",
    "restaurant.kicker": "01 Ristorante",
    "restaurant.copy1": "Carne alla brace, pasta fresca fatta in casa e cucina ligure contemporanea sulle prime alture di Rapallo.",
    "restaurant.copy2": "Una tavola calda, curata e concreta, costruita intorno a materia prima, brace e stagionalità.",
    "restaurant.mobileCopy": "Brace, pasta fresca e cucina ligure a Rapallo.",
    "food.catch": "Cristallo, Orto e Liguria",
    "food.pizza": "La Beccaccia",
    "food.seafood": "Il Maialino",
    "food.pasta": "Filetto Cappon Magro",
    "food.ligurian": "Millefoglie d'Anatra",
    "food.frittoMisto": "Il Tagliere Rustico",
    "food.meatCellar": "Finto Foie Gras",
    "food.fiorentina": "Giardino in Tavola",
    "food.ribs": "Pansoti au sö",
    "food.seafoodSalad": "La Carlona",
    "food.seafoodTasting": "Maschetta Fondente",
    "food.ravioliPesto": "Cruda in Riviera",
    "food.tunaTagliata": "Fassona Piemontese",
    "food.semifreddo": "Picanha",
    "food.houseDessert": "Il Beccaccino",
    "location.kicker": "02 Location",
    "location.copy1": "Via Santa Maria del Campo 176, sulle prime alture di Rapallo.",
    "location.copy2": "Sala, grande braciere a vista, veranda e giardino per pranzi, cene ed eventi.",
    "location.front": "La sala",
    "location.exterior": "L'esterno",
    "location.outdoor": "La tavola",
    "location.room": "Il braciere",
    "location.table": "La veranda",
    "location.details": "I dettagli",
    "location.terrace1": "Il giardino",
    "location.terrace2": "Il dehors",
    "location.terrace3": "L'atmosfera",
    "luggage.kicker": "03 EVENTI",
    "luggage.title": "Eventi privati",
    "luggage.copy": "Veranda e giardino accolgono cerimonie, matrimoni e feste private con proposte su richiesta.",
    "luggage.badge": "Sale e giardino",
    "luggage.large": "Cerimonie",
    "luggage.medium": "Matrimoni",
    "luggage.backpack": "Feste private",
    "luggage.book": "Richiedi informazioni",
    "luggage.formKicker": "Scrivici su WhatsApp",
    "luggage.formTitle": "Organizza<br><em>il tuo evento.</em>",
    "luggage.formIntro": "Indica il tipo di evento: prepareremo il messaggio e ti chiederemo il consenso prima di aprire WhatsApp.",
    "luggage.type": "Tipo evento *",
    "luggage.quantity": "Invitati indicativi",
    "luggage.optionLarge": "Cerimonia",
    "luggage.optionMedium": "Matrimonio",
    "luggage.optionBackpack": "Festa privata",
    "luggage.placeholder": "Data, numero ospiti o informazioni utili",
    "reviews.kicker": "04 Recensioni",
    "reviews.title": "Cosa dicono di noi",
    "reviews.awards": "Canali recensioni",
    "reviews.cardLabel1": "Brace",
    "reviews.cardLabel2": "Accoglienza",
    "reviews.cardLabel3": "Rapallo",
    "reviews.quote1": "Carne alla brace, pasta fresca e piatti liguri per una cena calda e generosa.",
    "reviews.author1": "La Beccaccia · Brace e cucina",
    "reviews.quote2": "Servizio diretto, atmosfera conviviale e tavoli pronti ad accogliere pranzi, cene ed eventi.",
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
    "cookie.copy": "Usiamo solo strumenti tecnici. Per aprire WhatsApp dai form o caricare Google Maps ti chiediamo prima il consenso ai servizi esterni.",
    "cookie.necessary": "Solo necessari",
    "cookie.accept": "Accetta servizi esterni",
    "cookie.preferences": "Dettagli",
    "map.notice": "La mappa di Google viene caricata solo dopo il consenso ai servizi esterni.",
    "map.load": "Carica la mappa",
    "form.kicker": "Scrivici su WhatsApp",
    "form.title": "Raccontaci<br><em>cosa desideri.</em>",
    "form.intro": "Compila i campi: prepareremo il messaggio e ti chiederemo il consenso prima di aprire WhatsApp.",
    "form.name": "Nome e cognome *",
    "form.date": "Data",
    "form.time": "Orario",
    "form.guests": "Persone",
    "form.choose": "Scegli",
    "form.message": "Messaggio",
    "form.placeholder": "Richieste o informazioni utili",
    "form.submit": "Continua su WhatsApp",
    "form.note": "Nessun dato viene salvato sul sito: prima di aprire WhatsApp ti chiediamo il consenso ai servizi esterni.",
  },
  en: {
    skip: "Skip to content",
    "nav.restaurant": "Restaurant",
    "nav.location": "Location",
    "nav.luggage": "Events",
    "nav.reviews": "Reviews",
    "nav.contacts": "Contacts",
    "cta.book": "Book now",
    "cta.bookTable": "Book a table",
    "cta.menu": "Discover our menu",
    "cta.wine": "Wine list",
    "cta.call": "Call now",
    "card.food": "Menu",
    "card.wine": "Wine list",
    "card.note": "In case of allergies or intolerances, please inform our staff before ordering. Some products may be blast chilled. The menu may vary according to season and availability.",
    "card.wineNote": "Labels, vintages and availability may vary. Ask our staff for today's recommendation.",
    "hero.overline": "Grill & Cuisine",
    "hero.hours": "<span>OPEN ALL YEAR</span> CHARCOAL GRILL - LIGURIAN CUISINE - MUSHROOMS - TRUFFLES",
    "hero.edge": "Grill, mushrooms & Ligurian tradition",
    "hero.discover": "Discover La Beccaccia",
    "restaurant.kicker": "01 Restaurant",
    "restaurant.copy1": "Charcoal-grilled meat, handmade fresh pasta and contemporary Ligurian cuisine on the first hills of Rapallo.",
    "restaurant.copy2": "A warm, curated and concrete table built around ingredients, fire and seasonality.",
    "restaurant.mobileCopy": "Grill, fresh pasta and Ligurian cuisine in Rapallo.",
    "food.catch": "Cristallo, Orto e Liguria",
    "food.pizza": "La Beccaccia",
    "food.seafood": "Il Maialino",
    "food.pasta": "Filetto Cappon Magro",
    "food.ligurian": "Duck millefeuille",
    "food.frittoMisto": "Rustic board",
    "food.meatCellar": "Finto Foie Gras",
    "food.fiorentina": "Giardino in Tavola",
    "food.ribs": "Pansoti au sö",
    "food.seafoodSalad": "La Carlona",
    "food.seafoodTasting": "Maschetta Fondente",
    "food.ravioliPesto": "Cruda in Riviera",
    "food.tunaTagliata": "Fassona beef",
    "food.semifreddo": "Picanha",
    "food.houseDessert": "Il Beccaccino",
    "location.kicker": "02 Location",
    "location.copy1": "Via Santa Maria del Campo 176, on the first hills of Rapallo.",
    "location.copy2": "Dining room, open grill, veranda and garden for lunch, dinner and events.",
    "location.front": "The dining room",
    "location.exterior": "Outside",
    "location.outdoor": "The table",
    "location.room": "The grill",
    "location.table": "The veranda",
    "location.details": "The details",
    "location.terrace1": "The garden",
    "location.terrace2": "Outdoor dining",
    "location.terrace3": "The atmosphere",
    "luggage.kicker": "03 EVENTS",
    "luggage.title": "Private events",
    "luggage.copy": "The veranda and garden host ceremonies, weddings and private parties with tailored proposals.",
    "luggage.badge": "Rooms and garden",
    "luggage.large": "Ceremonies",
    "luggage.medium": "Weddings",
    "luggage.backpack": "Private parties",
    "luggage.book": "Request information",
    "luggage.formKicker": "Message us on WhatsApp",
    "luggage.formTitle": "Plan<br><em>your event.</em>",
    "luggage.formIntro": "Choose the event type: we will prepare your message and ask for consent before opening WhatsApp.",
    "luggage.type": "Event type *",
    "luggage.quantity": "Approx. guests",
    "luggage.optionLarge": "Ceremony",
    "luggage.optionMedium": "Wedding",
    "luggage.optionBackpack": "Private party",
    "luggage.placeholder": "Date, guest count or useful information",
    "reviews.kicker": "04 Reviews",
    "reviews.title": "What guests say",
    "reviews.awards": "Review channels",
    "reviews.cardLabel1": "Grill",
    "reviews.cardLabel2": "Hospitality",
    "reviews.cardLabel3": "Rapallo",
    "reviews.quote1": "Charcoal-grilled meat, fresh pasta and Ligurian dishes for a warm, generous dinner.",
    "reviews.author1": "La Beccaccia · Grill & cuisine",
    "reviews.quote2": "Direct service, a convivial atmosphere and tables ready for lunch, dinner and events.",
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
    "cookie.copy": "We only use technical tools. To open WhatsApp from forms or load Google Maps, we ask for your consent to external services first.",
    "cookie.necessary": "Necessary only",
    "cookie.accept": "Accept external services",
    "cookie.preferences": "Details",
    "map.notice": "Google Maps is loaded only after consent to external services.",
    "map.load": "Load map",
    "form.kicker": "Message us on WhatsApp",
    "form.title": "Tell us<br><em>what you need.</em>",
    "form.intro": "Complete the fields: we will prepare your message and ask for consent before opening WhatsApp.",
    "form.name": "Full name *",
    "form.date": "Date",
    "form.time": "Time",
    "form.guests": "Guests",
    "form.choose": "Select",
    "form.message": "Message",
    "form.placeholder": "Requests or useful information",
    "form.submit": "Continue on WhatsApp",
    "form.note": "No data is stored on this website: we ask for consent to external services before opening WhatsApp.",
  },
};

const menuCatalogs = {
  food: {
    intro: {
      it: {
        kicker: "La Beccaccia · Menu 2026",
        title: "Il nostro<br><em>menù.</em>",
        description: "Antipasti, pasta fresca, brace, contorni e dessert. La carta può variare secondo stagione e disponibilità.",
      },
      en: {
        kicker: "La Beccaccia · 2026 menu",
        title: "Our<br><em>menu.</em>",
        description: "Starters, fresh pasta, grill, side dishes and desserts. The menu may vary according to season and availability.",
      },
    },
    sections: [
      {
        it: "Antipasti", en: "Starters",
        items: [
          { it: "Millefoglie d'Anatra", en: "Duck millefeuille", price: "€ 22,00" },
          { it: "Il Tagliere Rustico", en: "Rustic board", price: "€ 19,00" },
          { it: "Finto Foie Gras", en: "Finto Foie Gras", price: "€ 18,00" },
          { it: "Giardino in Tavola", en: "Garden on the table", price: "€ 18,00" },
        ],
      },
      {
        it: "Primi piatti", en: "Pasta",
        items: [
          { it: "La Beccaccia", en: "La Beccaccia", sub: "Minimo per 2 persone", price: "€ 20,00 p.p." },
          { it: "Pansoti au sö", en: "Pansoti au sö", price: "€ 22,00" },
          { it: "La Carlona", en: "La Carlona", price: "€ 20,00" },
        ],
      },
      {
        it: "Selezione di carne", en: "Meat selection",
        items: [
          { it: "Il Maialino", en: "Slow-cooked suckling pig", price: "€ 23,00" },
          { it: "Filetto come un Cappon Magro", en: "Fillet, Cappon Magro style", price: "€ 39,00" },
          { it: "Maschetta Fondente", en: "Confit beef cheek", price: "€ 25,00" },
          { it: "Cruda in Riviera", en: "Knife-cut Fassona tartare", price: "€ 22,00" },
          { it: "Costata o Fiorentina di Fassona Piemontese", en: "Fassona rib steak or Fiorentina", price: "€ 6,40 / etto" },
          { it: "Tomahawk di Scottona Bavarese", en: "Bavarian heifer tomahawk", price: "€ 6,50 / etto" },
          { it: "Costata Iberica", en: "Iberian rib steak", price: "€ 7,50 / etto" },
          { it: "Picanha di vacca bionda spagnola", en: "Spanish blonde cow picanha", price: "€ 33,00" },
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
        it: "Dessert", en: "Desserts",
        items: [
          { it: "Il Beccaccino", en: "Il Beccaccino", price: "€ 10,00" },
          { it: "Bianco Mangiare", en: "Bianco Mangiare", price: "€ 8,00" },
          { it: "Verticale al cioccolato", en: "Chocolate vertical", price: "€ 9,00" },
          { it: "Torta della Nonna", en: "Torta della Nonna", price: "€ 9,00" },
          { it: "Frutta ... Gelato", en: "Fruit ... Gelato", price: "€ 8,00" },
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

const mobileStickyBook = document.querySelector(".mobile-sticky-book");
const stickyBookSections = [
  { element: document.querySelector("#top"), theme: "dark" },
  { element: document.querySelector("#ristorante"), theme: "dark" },
  { element: document.querySelector("#location"), theme: "light" },
  { element: document.querySelector("#eventi"), theme: "dark" },
  { element: document.querySelector("#recensioni"), theme: "light" },
  { element: document.querySelector("#contatti"), theme: "light" },
  { element: document.querySelector(".site-footer"), theme: "dark" },
].filter(({ element }) => element);

const setStickyBookTheme = (theme) => {
  if (!mobileStickyBook) return;
  const isOnLight = theme === "light";
  mobileStickyBook.classList.toggle("is-on-light", isOnLight);
  mobileStickyBook.classList.toggle("is-on-dark", !isOnLight);
};

const updateStickyBookTheme = () => {
  if (!stickyBookSections.length) return;
  const footerSection = stickyBookSections.find(({ element }) => element.matches(".site-footer"));
  const footerRect = footerSection?.element.getBoundingClientRect();
  if (footerRect && footerRect.top <= window.innerHeight * 0.72 && footerRect.bottom > 0) {
    setStickyBookTheme("dark");
    return;
  }

  const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
  if (isAtPageEnd) {
    setStickyBookTheme("dark");
    return;
  }

  const sampleY = Math.max(96, Math.min(window.innerHeight - 96, window.innerHeight * 0.64));
  const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
  const activeSection = stickyBookSections.find(({ element }) => element.contains(sampleElement))
    || stickyBookSections.reduce((current, section) => {
      const rect = section.element.getBoundingClientRect();
      const distance = Math.abs(rect.top - sampleY);
      return distance < current.distance ? { section, distance } : current;
    }, { section: stickyBookSections[0], distance: Number.POSITIVE_INFINITY }).section;

  setStickyBookTheme(activeSection.theme);
};

if (mobileStickyBook) {
  setStickyBookTheme("dark");
  updateStickyBookTheme();
  window.addEventListener("scroll", updateStickyBookTheme, { passive: true });
  window.addEventListener("resize", updateStickyBookTheme);
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
const cardKicker = cardModal?.querySelector("[data-card-kicker]");
const cardTitle = cardModal?.querySelector("[data-card-title]");
const cardDescription = cardModal?.querySelector("[data-card-description]");
const catalogNote = cardModal?.querySelector(".catalog-note");
let activeCardType = "food";
let cardCloseTimer;

const findSection = (sections, label) => sections.find((section) => section.it === label);

const getOrderedCatalogSections = (type, sections) => {
  if (type === "food") {
    const starters = findSection(sections, "Antipasti");
    const firstCourses = findSection(sections, "Primi piatti");
    const fishSeconds = findSection(sections, "Secondi di pesce");
    const meatSeconds = findSection(sections, "Selezione di carne");
    const sideDishes = findSection(sections, "Contorni");
    const desserts = findSection(sections, "Dessert");
    const secondCourses = {
      it: "Secondi",
      en: "Second courses",
      items: [...(fishSeconds?.items || []), ...(meatSeconds?.items || [])],
    };

    return [
      starters,
      firstCourses ? { ...firstCourses, it: "Primi", en: "First courses" } : null,
      secondCourses.items.length ? secondCourses : null,
      sideDishes,
      desserts,
    ].filter(Boolean);
  }

  if (type === "wine") {
    return sections;
  }

  return sections;
};

const renderCatalog = () => {
  if (!cardContent || !cardKicker || !cardTitle || !cardDescription) return;
  const catalog = menuCatalogs[activeCardType];
  const intro = catalog.intro[currentLanguage];
  const sections = getOrderedCatalogSections(activeCardType, catalog.sections);
  cardKicker.textContent = intro.kicker;
  cardTitle.innerHTML = intro.title;
  cardDescription.textContent = intro.description;
  if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
  cardContent.innerHTML = sections.map((section) => `
    <section class="catalog-section">
      <h3>${section[currentLanguage]}<small>${section[currentLanguage === "it" ? "en" : "it"]}</small></h3>
      <div class="catalog-items">
        ${section.items.map((item) => `
          <article class="catalog-item">
            <div>
              <h4>${item[currentLanguage] || item.it}</h4>
              ${(item.sub || item[currentLanguage === "it" ? "en" : "it"]) ? `<p>${item.sub || item[currentLanguage === "it" ? "en" : "it"]}</p>` : ""}
            </div>
            ${item.price ? `<span>${item.price}</span>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
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
const bookingForm = bookingModal?.querySelector("[data-contact-form]");
const contextInput = bookingForm?.querySelector("input[name='context']");
const dateInput = bookingForm?.querySelector("input[name='date']");
let closeModalTimer;

if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

const openBookingModal = (trigger) => {
  if (!bookingModal || !bookingDialog) return;
  window.clearTimeout(closeModalTimer);
  lastFocusedElement = trigger;
  if (contextInput) contextInput.value = trigger.dataset.context || "Prenotazione tavolo";
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
  closeModalTimer = window.setTimeout(() => {
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

const luggageModal = document.querySelector("[data-luggage-modal]");
const luggageDialog = luggageModal?.querySelector(".luggage-dialog");
const luggageForm = luggageModal?.querySelector("[data-luggage-form]");
const luggageDateInput = luggageForm?.querySelector("input[name='date']");
let luggageCloseTimer;

if (luggageDateInput) luggageDateInput.min = new Date().toISOString().split("T")[0];

const openLuggageModal = (trigger) => {
  if (!luggageModal || !luggageDialog) return;
  window.clearTimeout(luggageCloseTimer);
  lastFocusedElement = trigger;
  setMenu(false, false);
  luggageModal.hidden = false;
  luggageModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  setBackgroundInert(true);
  requestAnimationFrame(() => luggageModal.classList.add("is-open"));
  window.setTimeout(() => luggageForm?.querySelector("input[name='name']")?.focus(), 420);
};

const closeLuggageModal = () => {
  if (!luggageModal || luggageModal.hidden) return;
  luggageModal.classList.remove("is-open");
  luggageModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  setBackgroundInert(false);
  luggageCloseTimer = window.setTimeout(() => {
    luggageModal.hidden = true;
    lastFocusedElement?.focus();
  }, 500);
};

document.querySelectorAll("[data-luggage-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openLuggageModal(trigger);
  });
});

luggageModal?.querySelectorAll("[data-luggage-close]").forEach((button) => {
  button.addEventListener("click", closeLuggageModal);
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
  else if (luggageModal?.classList.contains("is-open")) trapFocus(event, luggageDialog);
  else if (cardModal?.classList.contains("is-open")) trapFocus(event, cardDialog);
  else if (legalModal?.classList.contains("is-open")) trapFocus(event, legalDialog);
  else if (body.classList.contains("menu-open")) trapFocus(event, mobileMenuPanel);

  if (event.key !== "Escape") return;
  if (cardModal?.classList.contains("is-open")) closeCardModal();
  else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
  else if (luggageModal?.classList.contains("is-open")) closeLuggageModal();
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
  const note = String(data.get("message") || "").trim();
  const formattedDate = date
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
    : "";

  const details = isEnglish
    ? [
        guests ? `for ${guests} ${guests === "1" ? "person" : "people"}` : "",
        formattedDate ? `on ${formattedDate}` : "",
        time ? `at ${time}` : "",
      ].filter(Boolean).join(" ")
    : [
        guests ? `per ${guests} ${guests === "1" ? "persona" : "persone"}` : "",
        formattedDate ? `per il giorno ${formattedDate}` : "",
        time ? `alle ${time}` : "",
      ].filter(Boolean).join(" ");

  const message = isEnglish
    ? [
        `Hello La Beccaccia, my name is ${name} and I would like to book a table${details ? ` ${details}` : ""}.`,
        note ? `\n${note}` : "",
      ].join("")
    : [
        `Ciao La Beccaccia, sono ${name} e vorrei prenotare un tavolo${details ? ` ${details}` : ""}.`,
        note ? `\n${note}` : "",
      ].join("");

  requestExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
});

luggageForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(luggageForm);
  const isEnglish = currentLanguage === "en";
  const name = String(data.get("name") || "").trim();
  const date = String(data.get("date") || "").trim();
  const time = String(data.get("time") || "").trim();
  const item = String(data.get("item") || "").trim();
  const quantity = String(data.get("quantity") || "1").trim() || "1";
  const note = String(data.get("message") || "").trim();
  const formattedDate = date
    ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
    : "";

  const details = isEnglish
    ? [
        item ? `Event: ${item}.` : "",
        quantity ? `Guests: ${quantity}.` : "",
        formattedDate ? `Date: ${formattedDate}.` : "",
        time ? `Time: ${time}.` : "",
      ].filter(Boolean).join(" ")
    : [
        item ? `Evento: ${item}.` : "",
        quantity ? `Invitati: ${quantity}.` : "",
        formattedDate ? `Giorno: ${formattedDate}.` : "",
        time ? `Orario: ${time}.` : "",
      ].filter(Boolean).join(" ");

  const message = isEnglish
    ? [
        `Hello La Beccaccia, my name is ${name} and I would like information for a private event.`,
        details ? `\n${details}` : "",
        note ? `\n${note}` : "",
      ].join("")
    : [
        `Ciao La Beccaccia, sono ${name} e vorrei informazioni per un evento privato.`,
        details ? `\n${details}` : "",
        note ? `\n${note}` : "",
      ].join("");

  requestExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const heroTitle = document.querySelector(".hero-title-wrap");
const heroSocials = document.querySelector(".hero-socials");
const scrollCue = document.querySelector(".scroll-cue");
let heroMotionFrame = null;

const updateHeroMotion = () => {
  heroMotionFrame = null;
  if (!hero || !heroImage || !heroTitle || reduceMotion) return;
  const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

  if (progress < 0.002) {
    heroImage.style.removeProperty("transform");
    heroTitle.style.removeProperty("transform");
    heroTitle.style.removeProperty("opacity");
    heroSocials?.style.removeProperty("opacity");
    scrollCue?.style.removeProperty("opacity");
    return;
  }

  heroImage.style.transform = `translate3d(0, ${progress * 7}%, 0) scale(${1 + progress * 0.12})`;
  heroTitle.style.transform = `translate3d(0, ${progress * -11}vh, 0) scale(${1 - progress * 0.045})`;
  heroTitle.style.opacity = String(Math.max(0, 1 - progress * 1.22));
  if (heroSocials) heroSocials.style.opacity = String(Math.max(0, 1 - progress * 1.7));
  if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - progress * 2.1));
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
