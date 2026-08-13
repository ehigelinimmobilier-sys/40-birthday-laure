# La Correspondance · Les 40 ans de Laure

Le site cadeau des 40 ans de Laure. Samedi 15 août 2026, Saint-Germain-des-Prés.

DA : une lettre. Encre bleu nuit sur papier crème, liseré par-avion,
enveloppe scellée d'un cœur de cire corail, filigrane 40 en parallax,
photos en tirages scotchés. Cormorant Garamond + Karla.

## Comment ça marche

1. **L'enveloppe.** Le site s'ouvre sur une enveloppe scellée. Un tap sur le
   sceau : le rabat se soulève, la lettre sort, le site est la lettre.
2. **La lettre** commence par « Ma Laure, » puis l'itinéraire du 15 août,
   écrit le long d'un fil d'encre : heures, titres joueurs et phrases teaser
   visibles, le reste raturé à l'encre.
3. **Le 14 août à 20h00** : le sac (maillot) et la tenue (Classic Chic)
   se dévoilent.
4. **Le 15 août, au fil de l'eau** : chaque moment se dévoile 1h30 avant
   son heure. 10h30, 12h30, 13h30, 14h30, 16h30, 18h30.
5. **Le 15 août à 20h00** : le mot de la fin, signé
   « Ton amie qui t'aime fort ».

## Voir tout avant l'heure

Deux moyens, invisibles pour Laure :

- Ajouter `?copine` à l'URL (le lien à partager pour montrer le programme complet)
- Taper `laure` au clavier (ordinateur uniquement)

## Hébergements

Chaque `git push` met à jour les deux :

- Vercel : https://laure-40.vercel.app/ (branché sur le repo `laure-40`)
- GitHub Pages : https://ehigelinimmobilier-sys.github.io/40-birthday-laure/

## Modifier

- Horaires de déblocage : attributs `data-unlock` dans `index.html`
  et constantes en tête de `script.js`
- En cas de modification de `styles.css` ou `script.js`, incrémenter
  le `?v=` dans `index.html` pour casser le cache

Fait avec amour par Babeth.
