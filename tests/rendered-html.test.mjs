import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("static HTML contains the La Beccaccia website without story section", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html class="notranslate" lang="it" translate="no">/);
  assert.match(html, /<title>La Beccaccia Rapallo \| Brace e cucina a Rapallo<\/title>/);
  assert.match(html, /La Beccaccia Rapallo/);
  assert.match(html, /Brace &amp; Cucina/);
  assert.match(html, /Via Santa Maria del Campo 176/);
  assert.match(html, /\+39 328 657 7160/);
  assert.match(html, /info@ristorantelabeccacciarapallo\.it/);
  assert.match(html, /P\.IVA 02650230994/);
  assert.match(html, /id="top"[\s\S]*id="ristorante"[\s\S]*id="location"[\s\S]*id="recensioni"[\s\S]*id="contatti"/);
  assert.doesNotMatch(html, /id="storia"|La nostra storia|data-i18n="story\./);
  assert.doesNotMatch(html, /id="eventi"|data-i18n="luggage\.|data-luggage-|Eventi privati|eventi privati|Chiudi il form eventi/);
  assert.doesNotMatch(html, /La Taverna|Monterosso|Via Molinelli|SPADARO|01571370111/);
  assert.match(html, /data-i18n="restaurant\.kicker">01 Ristorante/);
  assert.match(html, /data-i18n="location\.kicker">02 Location/);
  assert.match(html, /data-i18n="reviews\.kicker">03 Recensioni/);
  assert.match(html, /data-i18n="contacts\.kicker">04 Contatti/);
  assert.match(html, /data-hero-carousel/);
  assert.match(html, /class="brand brand-mark header-brand-mark brand-logo"[\s\S]*la-beccaccia-logo-mobile\.png[\s\S]*la-beccaccia-logo-desktop\.png/);
  assert.match(html, /hero-socials hero-socials-center[\s\S]*instagram\.com\/la_beccaccia_rapallo[\s\S]*facebook\.com\/ristorantelabeccacciarapallo/);
  assert.match(html, /hero-edge hero-edge-left[\s\S]*Brace · Rapallo · 1970/);
  assert.match(html, /hero-edge hero-edge-right[\s\S]*Cucina ligure · Fuoco vivo/);
  assert.match(html, /class="scroll-cue"[\s\S]*Scorri/);
  assert.equal([...html.matchAll(/href="https:\/\/wa\.me\/393286577160"[^>]*data-booking-trigger/g)].length, 5);
  assert.match(html, /data-contact-form[\s\S]*Nome Cognome \*[\s\S]*name="date" required[\s\S]*name="time" required[\s\S]*select name="guests" autocomplete="off" required/);
  assert.doesNotMatch(html, /name="message"|data-i18n="form\.message"/);
  assert.match(html, /hero-fire-desktop\.jpg[\s\S]*hero-served-steak-desktop\.jpg[\s\S]*hero-pasta-desktop\.jpg[\s\S]*hero-gourmet-desktop\.jpg/);
  assert.match(html, /hero-fire-mobile\.jpg[\s\S]*hero-served-steak-mobile\.jpg[\s\S]*hero-pasta-mobile\.jpg[\s\S]*hero-gourmet-mobile\.jpg/);
  assert.doesNotMatch(html, /hero-raw-grill-(desktop|mobile)\.jpg/);
  assert.match(html, /data-i18n-html="hero\.manifesto">Ristorante a Rapallo\.<br \/>Cucina ligure, brace e tartufo\./);
  assert.doesNotMatch(html, /data-hero-indicator="4"/);
  assert.match(html, /data-i18n="cta\.heroBook">PRENOTA IL TUO TAVOLO/);
  assert.match(html, /class="mobile-sticky-book"[\s\S]*data-i18n="cta\.bookNow">Prenota ora/);
  assert.match(html, /rel="preload" as="image" href="assets\/hero\/hero-fire-desktop\.jpg"/);
  assert.match(html, /rel="preload" as="image" href="assets\/hero\/hero-fire-mobile\.jpg"/);
  assert.doesNotMatch(html, /assets\/(food|story|la-taverna|brand-la-taverna)[^"']*/i);
  assert.doesNotMatch(html, /class="hero-image image-placeholder"/);
  const foodTrack = html.match(/<div class="food-track"[\s\S]*?<\/div>\n\n      <div class="carousel-footer">/)?.[0] ?? "";
  assert.match(foodTrack, /restaurant-01\.jpg[\s\S]*restaurant-02\.jpg[\s\S]*restaurant-03\.jpg[\s\S]*restaurant-04\.jpg[\s\S]*restaurant-05\.jpg[\s\S]*restaurant-06\.jpg[\s\S]*restaurant-07\.jpg[\s\S]*restaurant-08\.jpg/);
  assert.doesNotMatch(foodTrack, /photo-placeholder\.svg|<figcaption|data-i18n="food\./);
  assert.match(html, /data-food-current>01<\/span> \/ 08/);
  const locationTrack = html.match(/<div class="location-track"[\s\S]*?<\/div>\n\n      <div class="carousel-footer carousel-footer-dark">/)?.[0] ?? "";
  assert.match(locationTrack, /location-01\.jpg[\s\S]*location-02\.jpg[\s\S]*location-03\.jpg[\s\S]*location-04\.jpg[\s\S]*location-05\.jpg[\s\S]*location-06\.jpg[\s\S]*location-07\.jpg[\s\S]*location-08\.jpg/);
  assert.doesNotMatch(locationTrack, /photo-placeholder\.svg|class="image-placeholder"/);
  assert.match(html, /data-location-current>01<\/span> \/ 08/);
  assert.match(html, /tripadvisor\.it\/Restaurant_Review-g187826-d1865956-Reviews-La_Beccaccia_Brace_E_Cucina-Rapallo_Italian_Riviera_Liguria\.html/);
  assert.match(html, /tripadvisor\.it\/UserReviewEdit-g187826-d1865956-La_Beccaccia_Brace_E_Cucina-Rapallo_Italian_Riviera_Liguria\.html/);
});

test("styles and script keep the cloned visual system with red accents", async () => {
  const [css, script, placeholder] = await Promise.all([
    readFile(new URL("site.css", root), "utf8"),
    readFile(new URL("site.js", root), "utf8"),
    readFile(new URL("assets/photo-placeholder.svg", root), "utf8"),
  ]);

  assert.match(css, /DM\+Sans/);
  assert.match(css, /Italiana/);
  assert.match(css, /--brand-red:\s*#b32020/);
  assert.match(css, /--brand-red-bright:\s*#e54848/);
  assert.doesNotMatch(css, /--gold:\s*#b88746|--gold-light:\s*#f0cf8a/);
  assert.match(css, /\.brand-wordmark/);
  assert.match(css, /\.site-header \.header-brand-mark\.brand-logo/);
  assert.match(css, /\.hero \.hero-socials-center/);
  assert.match(css, /Absolute final menu, header height, WhatsApp\/social layout pass[\s\S]*\.site-header,[\s\S]*height:\s*clamp\(5\.85rem, 7\.1vw, 7\.05rem\)[\s\S]*background:\s*#000/);
  assert.match(css, /Absolute final menu, header height, WhatsApp\/social layout pass[\s\S]*\.site-header \.brand-logo-img \{[\s\S]*transform:\s*scale\(1\.24\) translateZ\(0\)/);
  assert.match(css, /@media \(min-width: 761px\) \{[\s\S]*\.hero \.hero-socials-center \{[\s\S]*top:\s*calc\(50% \+ clamp\(18\.25rem, 18\.2vw, 20\.35rem\)\)/);
  assert.match(css, /\.hero \.hero-socials-center \.hero-social-link \{[\s\S]*width:\s*2\.18rem[\s\S]*height:\s*2\.18rem/);
  assert.match(css, /\.site-header \.book-link:hover,[\s\S]*color:\s*var\(--brand-red-bright\)/);
  assert.match(css, /\.reviews-section \.review-cta:hover,[\s\S]*background:\s*transparent[\s\S]*color:\s*var\(--brand-red\)/);
  assert.match(css, /Final hero clarity, desktop frames, booking form and compact mobile reviews[\s\S]*\.hero::before,[\s\S]*\.hero::after/);
  assert.match(css, /Final hero clarity, desktop frames, booking form and compact mobile reviews[\s\S]*var\(--brand-red-bright\)[\s\S]*\.review-card \{[\s\S]*flex:\s*0 0 min\(78vw, 20rem\)[\s\S]*padding:\s*1rem/);
  assert.match(css, /background:\s*#000 !important/);
  assert.match(css, /\.hero h1 \{[\s\S]*top:\s*50%;[\s\S]*left:\s*50%;[\s\S]*transform:\s*translate\(-50%, -50%\)/);
  assert.match(css, /transition:\s*opacity 0\.8s ease/);
  assert.match(css, /grid-template-columns:\s*repeat\(4, 1\.7rem\)/);
  assert.match(css, /\.hero-manifesto \{[\s\S]*white-space:\s*nowrap/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.hero-actions \{[\s\S]*display:\s*none/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /heroKenBurns|heroSettle|\.hero-slide-image\s*\{[^}]*scale|\.hero-slide\.is-active \.hero-slide-image\s*\{[\s\S]*animation:/);
  assert.match(placeholder, /fill="#000"/);
  assert.match(script, /const whatsappNumber = "393286577160"/);
  assert.doesNotMatch(script, /href\.startsWith\("https:\/\/wa\.me\/"\)/);
  assert.match(script, /document\.querySelectorAll\("\[data-booking-trigger\]"\)[\s\S]*event\.preventDefault\(\);[\s\S]*openBookingModal\(trigger\);/);
  assert.doesNotMatch(script, /data\.get\("message"\)/);
  assert.match(script, /openExternalUrl\(`https:\/\/wa\.me\/\$\{whatsappNumber\}\?text=\$\{encodeURIComponent\(message\)\}`\)/);
  assert.doesNotMatch(script, /requestExternalUrl\(`https:\/\/wa\.me/);
  assert.match(script, /laBeccacciaExternalServicesConsent/);
  assert.match(script, /La Beccaccia · Menu 2026/);
  assert.match(script, /Brindisi & Bocconi/);
  assert.match(script, /Cristallo, Orto e Liguria/);
  assert.match(script, /Funghi Porcini e Tartufi Bianchi e Neri/);
  assert.match(script, /Pane, Coperto e Servizio/);
  assert.match(script, /catalogTagLabels/);
  assert.match(script, /data-hero-carousel/);
  assert.match(script, /setInterval\(\(\) => setHeroSlide\(activeHeroSlide \+ 1\), 3000\)/);
  assert.match(script, /if \(reduceMotion \|\| heroSlides\.length < 2\) return/);
  assert.doesNotMatch(script, /heroCarousel\.style\.transform|scale\(\$\{1 \+ progress/);
  assert.doesNotMatch(script, /La nostra storia|nav\.story|["']story\.|nav\.luggage|luggage\.|La Taverna|Monterosso|Via Molinelli|evento privato|private event/);
});

test("github-static folder contains the minimal static bundle", async () => {
  const entries = await readdir(new URL("github-static/", root), { withFileTypes: true });
  assert.deepEqual(entries.map((entry) => entry.name).sort(), ["assets", "index.html", "site.css", "site.js"]);

  const assets = await readdir(new URL("github-static/assets/", root), { withFileTypes: true });
  assert.deepEqual(assets.map((entry) => entry.name).sort(), ["brand", "hero", "location-carousel", "photo-placeholder.svg", "restaurant-carousel"]);

  const brandAssets = await readdir(new URL("github-static/assets/brand/", root));
  assert.deepEqual(brandAssets.sort(), [
    "la-beccaccia-logo-desktop.png",
    "la-beccaccia-logo-mobile.png",
  ]);

  const heroAssets = await readdir(new URL("github-static/assets/hero/", root));
  assert.deepEqual(heroAssets.sort(), [
    "hero-fire-desktop.jpg",
    "hero-fire-mobile.jpg",
    "hero-gourmet-desktop.jpg",
    "hero-gourmet-mobile.jpg",
    "hero-pasta-desktop.jpg",
    "hero-pasta-mobile.jpg",
    "hero-raw-grill-desktop.jpg",
    "hero-raw-grill-mobile.jpg",
    "hero-served-steak-desktop.jpg",
    "hero-served-steak-mobile.jpg",
  ]);

  const restaurantAssets = await readdir(new URL("github-static/assets/restaurant-carousel/", root));
  assert.deepEqual(restaurantAssets.sort(), [
    "restaurant-01.jpg",
    "restaurant-02.jpg",
    "restaurant-03.jpg",
    "restaurant-04.jpg",
    "restaurant-05.jpg",
    "restaurant-06.jpg",
    "restaurant-07.jpg",
    "restaurant-08.jpg",
  ]);

  const locationAssets = await readdir(new URL("github-static/assets/location-carousel/", root));
  assert.deepEqual(locationAssets.sort(), [
    "location-01.jpg",
    "location-02.jpg",
    "location-03.jpg",
    "location-04.jpg",
    "location-05.jpg",
    "location-06.jpg",
    "location-07.jpg",
    "location-08.jpg",
  ]);

  const html = await readFile(new URL("github-static/index.html", root), "utf8");
  assert.match(html, /href="site.css"/);
  assert.match(html, /src="site.js"/);
  assert.match(html, /assets\/hero\/hero-fire-desktop\.jpg/);
  assert.match(html, /assets\/brand\/la-beccaccia-logo-desktop\.png/);
  assert.match(html, /assets\/location-carousel\/location-01\.jpg/);
  assert.match(html, /assets\/location-carousel\/location-08\.jpg/);
  assert.match(html, /assets\/restaurant-carousel\/restaurant-01\.jpg/);
  assert.doesNotMatch(html, /favicon\.svg|id="eventi"|data-i18n="luggage\./);
});
