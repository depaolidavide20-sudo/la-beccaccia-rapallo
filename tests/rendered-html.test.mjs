import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(html, /id="top"[\s\S]*id="ristorante"[\s\S]*id="location"[\s\S]*id="eventi"[\s\S]*id="recensioni"[\s\S]*id="contatti"/);
  assert.doesNotMatch(html, /id="storia"|La nostra storia|data-i18n="story\./);
  assert.doesNotMatch(html, /La Taverna|Monterosso|Via Molinelli|SPADARO|01571370111/);
  assert.match(html, /data-i18n="restaurant\.kicker">01 Ristorante/);
  assert.match(html, /data-i18n="location\.kicker">02 Location/);
  assert.match(html, /data-i18n="luggage\.kicker">03 EVENTI/);
  assert.match(html, /data-i18n="reviews\.kicker">04 Recensioni/);
  assert.match(html, /data-i18n="contacts\.kicker">05 Contatti/);
  assert.match(html, /assets\/photo-placeholder\.svg/);
  assert.doesNotMatch(html, /assets\/(hero|food|restaurant|location|story|la-taverna|brand-la-taverna)[^"']*/i);
  assert.match(html, /class="hero-image image-placeholder"/);
  assert.match(html, /data-food-current>01<\/span> \/ 15/);
  assert.match(html, /data-location-current>01<\/span> \/ 05/);
});

test("styles and script keep the cloned visual system with black photo spaces", async () => {
  const [css, script, placeholder] = await Promise.all([
    readFile(new URL("site.css", root), "utf8"),
    readFile(new URL("site.js", root), "utf8"),
    readFile(new URL("assets/photo-placeholder.svg", root), "utf8"),
  ]);

  assert.match(css, /DM\+Sans/);
  assert.match(css, /Italiana/);
  assert.match(css, /--gold:\s*#b88746/);
  assert.match(css, /--gold-light:\s*#f0cf8a/);
  assert.match(css, /\.brand-wordmark/);
  assert.match(css, /background:\s*#000 !important/);
  assert.match(placeholder, /fill="#000"/);
  assert.match(script, /const whatsappNumber = "393286577160"/);
  assert.match(script, /laBeccacciaExternalServicesConsent/);
  assert.match(script, /La Beccaccia · Menu 2026/);
  assert.doesNotMatch(script, /La nostra storia|nav\.story|["']story\.|La Taverna|Monterosso|Via Molinelli/);
});
