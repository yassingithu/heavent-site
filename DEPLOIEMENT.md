# Mise en ligne du site (one.com)

1. `npm run build` → construit le site dans `dist/` et pré-génère une page HTML par adresse publique
   (contenu + balises SEO), le `sitemap.xml` et `dist/fichiers.json` (liste des fichiers).
2. Copier `dist/` dans `deploy/site/`, committer et pousser sur `main`.
3. Envoyer les fichiers chez one.com : depuis le gestionnaire de fichiers one.com (connecté), exécuter dans la console
   de la page un script qui lit `deploy/site/fichiers.json` sur GitHub (raw, au commit voulu) et fait un
   `PUT https://filemanager.one.com/api/webspace/2/drive/heaventagency.com/data/httpd.www/<chemin>` par fichier
   (dossier `assets/` d'abord, `index.html` en dernier). Nov. 2026 : `?targetCharset=utf-8` répond 400 sur les .js/.css/.html/.htaccess ; renvoyer ces fichiers sans le paramètre (l'encodage UTF-8 reste correct).
   Nouvelle page = nouveau dossier : le créer d'abord avec `PUT …/httpd.www/<dossier>/` (barre finale), sinon l'envoi répond 404.
4. `.htaccess` (dans `public/`) : adresses propres (/contact), redirection www → sans www, compression, cache d'un an sur /assets.

Contrôles automatiques après chaque mise en ligne : workflows « Agent d'audit » et « Agent bêta-testeur » (onglet Actions / Issues).


## Envoi partiel (seulement les fichiers modifiés)

Calculer la liste avec `git diff --no-renames --name-only --diff-filter=AM <ancien> HEAD -- deploy/site`. Sans `--no-renames`, Git classe les fichiers `assets/…-<hash>.js|css` en « renommés » et ils sortent de la liste : le 10/11/2026, `index.html` a été envoyé sans son script principal et le site est resté cassé quelques minutes. Après chaque envoi, vérifier en ligne que tous les fichiers de `assets/` listés dans `fichiers.json` répondent 200, puis seulement envoyer `index.html`.


## Tester sur la version de production

L'ordre des feuilles de style n'est pas le même en développement (`vite`) et en production (`vite build`) : deux règles de même force dans `invitation.css` et `ouvertures.css` peuvent s'inverser (10/11/2026 : sélecteur de langues décalé, puis consigne du cœur sous le bouton). Avant un envoi qui touche aux styles des invitations, vérifier avec `npm run build` puis `npx vite preview`, pas seulement avec le serveur de développement.
