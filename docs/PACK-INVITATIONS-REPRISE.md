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
