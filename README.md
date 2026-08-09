# Maison Laure · Collection N° 40

Le site cadeau des 40 ans de Laure. Samedi 15 août 2026, Saint-Germain-des-Prés.

DA : carton d'invitation de défilé haute couture. Noir d'encre, blanc craie,
champagne froid, platine. Bodoni Moda, Jost, IBM Plex Mono.

## Comment ça marche

1. **Le cœur.** Le site s'ouvre sur un cœur champagne qui bat. Un tap l'ouvre.
2. **Mode teaser** (dès l'envoi) : le carton d'invitation, la feuille de service
   (le sac : maillot de bain · tenue du jour : Classic Chic), puis les six
   passages scellés. Laure voit les heures et les titres mystère, rien d'autre :
   - 10h30 Petit déjeuner
   - 13h30 Moment mouillé
   - 15h00 Déj parisien
   - 16h00 Dévoile ton art gustatif
   - 18h00 Apéroooo
   - 20h00 Pestacle
   Un compte à rebours (J-x) tourne au-dessus des passages.
3. **Le 15 août à 9h00** (heure du téléphone) : tout se dévoile automatiquement,
   adresses, détails, notes de la maison, et la finale signée Elisabeth.

## Prévisualiser le mode révélé (pour Elisabeth)

Deux moyens, invisibles pour Laure :

- Ajouter `?reveal=1` à l'URL
- Taper `laure` au clavier (ordinateur uniquement)

## Personnaliser

Tout est dans `index.html` :

- Le mot final d'Elisabeth : section `#finale`, bloc `.maison-note--finale`
- Les détails de chaque passage : blocs `.passage__face--open`
- L'heure de révélation : constante `REVEAL_AT` en haut de `script.js`

## Mise en ligne

Site statique sans dépendances. Vercel ou Netlify en drag & drop,
ou GitHub Pages (Settings → Pages → branch `main`).

Un exemplaire, une invitée.
