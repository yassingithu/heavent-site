# Heavent Prestige Invitation Studio

Module indépendant (aucune dépendance depuis le moteur d'invitations actuel, qui reste inchangé).
Branche : `prestige-invitations`. Rien n'est publié sans accord explicite de Yassin.

- `riad-royal/manifest.json` : fiche du premier modèle de référence (état de validation inclus).
- Sources Blender (scripts Python bpy, rendus) : `/prestige-studio` à la racine du dépôt.

## motifs/ — générateur de motifs en étoile (zellige, rosaces, frises)
`motifs/kaplan.ts` : implémentation originale (sans dépendance) de la méthode publiée de Kaplan (2005, « polygones en contact »).
4 pavages (carrés, hexagones, octogones-carrés, hexagones-triangles), angle θ réglable, sortie SVG en rubans à double filet.
Essais : `prestige-studio/motifs/` (`generer.mjs`, `planche_motifs.png`). Compilation d'essai : `npx esbuild src/features/prestige-invitations/motifs/kaplan.ts --format=esm --outfile=prestige-studio/motifs/kaplan.mjs`.
Module isolé : il n'est branché sur aucun écran ni sur le moteur d'invitations.
