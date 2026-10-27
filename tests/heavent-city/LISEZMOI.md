# Tests Heavent City
Démarrer le site (`npm run dev -- --port 5180`) puis :
- `node tests/heavent-city/parcours-complet.mjs desk|mob [url]` : parcours complet (missions, assistant automatique, annuler/refaire, rechargement, final, carte, demande, double-clic, aucun prix).
- `node tests/heavent-city/erreur-reseau.mjs` : échec serveur puis nouvelle tentative, choix conservés.
- `node tests/heavent-city/identifiants.mjs` : identifiants du serveur IA = ceux du jeu.
Playwright doit être installé (les scripts l'importent depuis /opt/npm-tools).
