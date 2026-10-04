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

## Formulaires et e-mails

Les 6 formulaires (contact, réservation de court, cours d'essai, adhésion, inscription aux événements, newsletter) envoient chaque demande par e-mail via [Web3Forms](https://web3forms.com), avec un objet clair, tous les détails et un numéro de référence. Le bouton « Répondre » de l'e-mail répond directement au visiteur.

- La clé se règle dans `js/config.js` (clé publique, prévue pour le code côté client). Vide = mode démo, rien n'est envoyé.
- Anti-spam : champ piège invisible (`botcheck`).
- En cas d'échec d'envoi, le formulaire reste rempli et un message d'erreur s'affiche.
- Les créneaux de la page de réservation restent simulés : la demande est envoyée par e-mail, à confirmer par le club.

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
