# Arcadia — Tennis Club & Académie

Site vitrine complet d'un club de tennis parisien (fictif). HTML, CSS et JavaScript natifs, sans build ni framework.

## Sections

- **Hero** : disponibilités du jour en direct, note moyenne, deux appels à l'action
- **Le club** : présentation, chiffres clés animés
- **Programmes** : onglets accessibles (école de tennis, compétition, adultes, cours particuliers)
- **Coachs** : carrousel glissable (souris, tactile, clavier)
- **Courts & services**
- **Réservation en ligne** : date, surface, durée, créneaux avec heures creuses/pleines, récapitulatif, prix et confirmation avec référence
- **Tarifs** : bascule mensuel / annuel (−15 %)
- **Avis, agenda des événements (inscription), FAQ, contact** (horaires et statut « ouvert / fermé » en direct, carte, formulaire validé)
- **Bilingue FR / EN**, choix mémorisé

Les formulaires sont des démos : ils valident les saisies mais n'envoient rien. Pour les brancher, remplacez `fakeSubmit()` dans `js/main.js` par un appel à votre backend (Formspree, Resend, API…).

## Qualité

- SEO : meta, Open Graph, données structurées `SportsActivityLocation`
- Accessibilité : lien d'évitement, navigation clavier (onglets, créneaux, modales avec piège du focus, Échap), `aria-*`, respect de `prefers-reduced-motion`
- Responsive du mobile au grand écran, sans défilement horizontal

## Lancer en local

```bash
python -m http.server 3040
```

Puis ouvrez http://localhost:3040

## Déployer

Site statique : importez le dossier sur Vercel (aucun réglage de build) ou GitHub Pages.
