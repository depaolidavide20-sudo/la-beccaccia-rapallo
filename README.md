# La Beccaccia Rapallo

Sito statico HTML/CSS/JS per il ristorante **La Beccaccia Rapallo**, costruito mantenendo struttura, layout, tipografia, colori, proporzioni, carousel e modali del sito di riferimento di La Taverna di Monterosso.

## Note contenuto

- La sezione "La nostra storia" non è presente.
- La sezione "Eventi" non è presente.
- La hero usa il carosello fotografico in `assets/hero/`; il carosello Ristorante usa le foto in `assets/restaurant-carousel/`.
- Gli altri spazi fotografici usano un placeholder nero temporaneo in `assets/photo-placeholder.svg`.
- I dati principali del ristorante sono aggiornati su indirizzo, telefono, email, orari e P.IVA.

## Cartella GitHub

La cartella `github-static/` contiene solo i file richiesti per una pubblicazione statica:

- `index.html`
- `site.css`
- `site.js`
- `assets/`

Le immagini della hero sono in `github-static/assets/hero/`, quelle del carosello Ristorante in `github-static/assets/restaurant-carousel/`; il placeholder nero temporaneo per gli altri spazi è in `github-static/assets/photo-placeholder.svg`.

## Come provarlo

Apri direttamente `index.html` nel browser. Non serve installare dipendenze.

## Test opzionale

Se vuoi controllare che i file principali siano presenti e coerenti:

```bash
npm test
```
