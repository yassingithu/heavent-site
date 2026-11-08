# Étude des dépôts sans licence — idées à recréer (aucun code copié)

Dépôts clonés hors de notre projet, dans `/home/claude/etude-externe/` (jamais commité, poussé ni déployé).
Règle : on retient des **idées et des techniques**, on réécrit tout nous-mêmes.

## 1. TheDanielOkpara/wedding-invitation — page unique HTML/CSS/JS (≈1 400 lignes)
À retenir :
- **Séquence d'entrée en trois temps** : sceau cliquable → enveloppe qui s'ouvre → rideaux qui s'écartent → colonnes qui glissent. C'est la même grammaire que notre scène « portes du palais », en plus simple.
- **Texte coupé lettre par lettre**, chaque lettre avec son propre retard (retard de base + pas régulier) : le prénom « s'écrit ». Le texte d'origine reste lisible par les lecteurs d'écran (libellé conservé sur le conteneur).
- **Pétales** : une vingtaine d'éléments dont taille, dérive, durée et opacité sont tirés au hasard via des variables CSS ; moins sur mobile.
- **Respect de `prefers-reduced-motion`** : tout le mouvement décoratif est coupé.
- Les apparitions au défilement sont calculées par la géométrie plutôt que par IntersectionObserver (l'auteur note un problème avec la première méthode).
À éviter : formulaire RSVP qui n'envoie rien ; images d'exemple générées par IA.

## 2. mdgeorge4153/stars — générateur de motifs en étoile → SVG
- Applique la méthode publiée de **Kaplan (2005) « Islamic star patterns from polygons in contact »** (l'article est cité dans le dépôt). Deux paramètres pilotent tout : un décalage (delta) et un angle (theta), sur des pavages de polygones.
- Sortie **SVG**, avec import/export des paramètres en JSON.
- **Intérêt Heavent : très fort.** L'algorithme est publié : on peut l'**implémenter nous-mêmes** (en TypeScript) pour produire des rosaces, frises et zellige variés, en SVG, réutilisables pour la carte, le sceau, les bordures et, dans Blender, les reliefs. On évite ainsi la dépendance à un dépôt sans licence.

## 3. gorenje/islamic_patterns — six motifs en Processing.js
- Géométrie de base (≈380 lignes) et six motifs ; bibliothèque Processing.js 0.9.7, ancienne.
- Intérêt faible : même terrain que `stars`, avec une technique datée. À consulter seulement si un motif précis nous inspire.

## 4. hungdev/khan-wedding-invitation — Next.js + Motion, sections complètes
- **Parcours en sections** : intro plein écran, invitation, galerie, calendrier, carte, comptes, remerciements.
- **Intro** : texte tapé caractère par caractère puis passage automatique au contenu après une courte pause.
- **Pétales en canvas** avec vitesses variables et effet de retournement : plus fluide que des éléments DOM.
- **Utilitaires utiles à comparer avec ce que Heavent a déjà** : génération d'un fichier calendrier (.ics) « ajouter à mon agenda », lecteur de musique de fond, bloc calendrier, carte du lieu.
- Cadres décoratifs « vintage » : esthétique à ne pas reprendre (pas Heavent).

## 5. AwaisCodeBase/Walima_Card — Next.js, trois fichiers
- Quasi vide (une page de six lignes). Aucun intérêt.

## Plan d'action proposé (sans toucher au moteur d'invitations)
1. Implémenter le générateur de motifs de Kaplan en TypeScript, avec sortie SVG et nos couleurs (cédrat/noir/or/ivoire).
2. Écrire notre propre séquence « sceau → ouverture → texte qui s'écrit » avec Motion (déjà installé), en respectant `prefers-reduced-motion`.
3. Comparer avec Heavent : « ajouter à l'agenda » (.ics), musique, pétales en canvas ; n'ajouter que ce qui manque.
