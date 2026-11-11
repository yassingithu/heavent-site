# Pack invitations (autres occasions) — point de reprise du 11/11/2026

## Décisions
- Pack **séparé** et payant, hors mariage. 12 occasions : mariage, mariage civil, fiançailles, henné, anniversaire (adulte/enfant), baby shower, naissance/Aqîqa/Sboue, baptême, circoncision, iftar, diplôme.
- Cartes de **vrai design** (rendu photoréaliste, pas dessiné en CSS/SVG). Le client doit pouvoir **mixer** : ouverture × modèle × palette × police × décor × révélation.
- Football : maillots aux couleurs des équipes **sans écusson dessiné par nous** ; écusson officiel seulement après licence (Yassin voit avec le juriste) ; le parent peut téléverser son écusson/photo.
- Idées reprises d'ailleurs = mécaniques et gestes seulement (pas de visuels, code, noms de modèles ni personnages de concurrents ; pas de personnages sous licence).

## Déjà codé (poussé sur GitHub, PAS déployé sur one.com)
- Type d'occasion, textes fr/en/ar, questions facultatives de réponse (migration `invitation_precisions`).
- Décors au choix (`src/lib/decors.ts`, `Decor.tsx`, `src/assets/decors/*.svg`) + équipes de foot + téléversement d'écusson.
- Fermetures d'enveloppe : cachet, ruban, cachet brisé (`FERMETURES`, CSS en fin de `invitation.css`).
- Tests mobiles faits avec RPC simulées (Playwright, `vite preview --host 127.0.0.1`).

## À faire (ordre conseillé)
1. Voir les 10 images photoréalistes générées (liens valables ~7 jours, hôte inaccessible depuis le bac à sable) : choisir les bonnes, les envoyer en pièce jointe.
   1 enveloppe ivoire fermée: https://file.deepytb.com/media/tasks/task_e867dfd7d04b4206b0e3956e6417fbb6/0.png
   2 enveloppe ouverte: https://file.deepytb.com/media/tasks/task_3e2a3f5109e241c1b95f027eb8567dc0/0.png
   3 cachet H: https://file.deepytb.com/media/tasks/task_153c1a6416c84d01bef86d11dc08f746/0.png
   4 cachet fendu: https://file.deepytb.com/media/tasks/task_0caec771c01d45e6a2685c2a5ff3790f/0.png
   5 ruban satin: https://file.deepytb.com/media/tasks/task_95ae17b8b5794ed2844ed0d79b1705f7/0.png
   6 ficelle + olivier: https://file.deepytb.com/media/tasks/task_6d78ab6f538f4141b8bb1a449755142e/0.png
   7 bleu nuit cachet or: https://file.deepytb.com/media/tasks/task_6f4e39c059064a478e9fbdaba288f168/0.png
   8 papier déchiré: https://file.deepytb.com/media/tasks/task_50440af8824a400eb09432a9ce75f03a/0.png
   9 carte crème: https://file.deepytb.com/media/tasks/task_eac335d7ddb7437781315f4d5cb03343/0.png
   10 languette brodée: https://file.deepytb.com/media/tasks/task_dbe815bb0c33420f99e9363599a8c92b/0.png
2. Détourer le fond, séparer rabat / corps / cachet / ruban, brancher en couches animées (remplace le dessin CSS).
3. Illustrations des thèmes enfants (foot, police, médecin, safari, dino, avion, princesse) : un style et une palette par thème ; plaque de prénom, parchemin du lieu, pastille de date.
4. Révélations : bougies à souffler, lanterne à allumer, ballon à crever, médaillon à gratter ; pronostic gender reveal dans la réponse.
5. Fermetures en plus : ficelle, fermeture éclair, scotch washi, languette en tissu.
6. Relectures ergonome → designer (+ motion) → appliquer « Indispensable » → bêta-testeur (journaliser dans `journal_agents`).
7. Vérifier la fonction SQL `invitation_repondre` (5 arguments) et supprimer les lignes de test `prospect='zztest'`.
8. Adapter `Rsvp.tsx` (chemin devis) aux occasions ; prix/paliers ; licence musique ; CNDP ; relecture de l'arabe.
9. `graphify update .`, commit/push, puis déploiement one.com **seulement sur accord explicite**.

## Veilles faites
- Rapports (monde + Maroc) : mécaniques d'ouverture, fermetures d'enveloppe, tendances (quiet luxury, vellum, papier coton, illustrations signées), pièges (poids < 1 Mo, accessibilité, indice du geste, pas de musique automatique).
- Vidéo de référence analysée : cachet qui se brise, rabat, doublure à motif, carte qui glisse, sections en papier déchiré, compte à rebours, lieu + carte, réponse en un clic.

## Mise à jour 11/11 (après-midi)
- Les 10 images ont été vues et sont bonnes. Sauvegardées en .webp optimisées dans `src/assets/photos/` (sources PNG en dehors du dépôt). Cachet entier et deux moitiés **détourés** (cachet-h, cachet-gauche, cachet-droite).
- Nouvelles fermetures « Cire (photo) » et « Cire brisée (photo) » codées et testées en mobile (l'animation de brisure n'a pas pu être capturée image par image).
- **Limite connue :** le cachet photo porte la lettre « H » (Heavent). Pour les invités d'un client il faut un cachet **sans lettre** + l'initiale du client posée en relief, ou des cachets génériques (feuille). À générer : cachet bordeaux vierge, or vierge, et leurs moitiés (~0,03 $ pièce, accord de Yassin requis).
- Rabat animé : il faut la même enveloppe fermée + ouverte (régénérer à partir de la même image de référence).

## Images générées 11/11 (2e lot, vues et validées) — à enregistrer puis brancher
1 cachet bordeaux vierge: https://file.deepytb.com/media/tasks/task_4f874815180d481ca8e2d73b8a42b137/0.png
2 cachet or vierge: https://file.deepytb.com/media/tasks/task_17fa96fba342443fb02e9a042e9ddca0/0.png
3 enveloppe ivoire OUVERTE (même que n°1 du 1er lot): https://file.deepytb.com/media/tasks/task_7f89f8581fbc425e9519a9164744fdee/0.png
4 enveloppe bleu nuit sans cachet ni cordon: https://file.deepytb.com/media/tasks/task_0f57a1992ff6406192b0bad0a52accc6/0.png
5 nœud de satin crème seul: https://file.deepytb.com/media/tasks/task_3c8b0f3e494f423dba90627c1afc5841/0.png
Accès navigateur : file.deepytb.com autorisé sur le Mac. Style prêt pour l'initiale sur cachet vierge (`data-cire-vierge`, fin de invitation.css).

## Lot 3 — personnages enfants (valides ~7 jours, jusqu'au 18/11)
1. foot : https://file.deepytb.com/media/tasks/task_2c5811c8a7bf4fc3ae0a1b99f5af318b/0.png
2. médecin : https://file.deepytb.com/media/tasks/task_553d99e346264c7ab805126d21664d1b/0.png
3. safari : https://file.deepytb.com/media/tasks/task_d98e6689f5a54fc6a785f6baec5e77b3/0.png
4. dino : https://file.deepytb.com/media/tasks/task_c443c8c17c114f758431ac3f654a7076/0.png
5. avion : https://file.deepytb.com/media/tasks/task_c8578cafb3b84b4e9aab844d370f65d7/0.png
6. princesse : https://file.deepytb.com/media/tasks/task_853b959b49ef4d5b9771364c5d2ef654/0.png
7. police : https://file.deepytb.com/media/tasks/task_f97ec41515da493ba06c7b3dd18fa0a2/0.png

## Mise à jour du soir (11/11)
Fait : retours ergonome/designer/motion/beta appliqués, 4 révélations (bougies, lanterne, ballon, médaillon), 7 personnages enfants détourés (src/assets/enfants) branchés comme décors « enfant-* » de l'anniversaire enfant.
Reste : relire révélations + personnages avec ergonome/designer/motion/beta ; fermetures ficelle/zip/washi/languette ; ruban photo (noeud-satin.webp) ; enveloppe teintée thème enfant, plaque du nom, parchemin du lieu, badge date ; points « Important » de l'ergonome ; Rsvp.tsx devis ; tarifs ; licence musique ; CNDP ; relecture arabe.
