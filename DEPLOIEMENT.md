# Mise en ligne du site (one.com)

1. `npm run build` → construit le site dans `dist/` et pré-génère une page HTML par adresse publique
   (contenu + balises SEO), le `sitemap.xml` et `dist/fichiers.json` (liste des fichiers).
2. Copier `dist/` dans `deploy/site/`, committer et pousser sur `main`.
3. Envoyer les fichiers chez one.com : depuis le gestionnaire de fichiers one.com (connecté), exécuter dans la console
   de la page un script qui lit `deploy/site/fichiers.json` sur GitHub (raw, au commit voulu) et fait un
   `PUT https://filemanager.one.com/api/webspace/2/drive/heaventagency.com/data/httpd.www/<chemin>` par fichier
   (dossier `assets/` d'abord, `index.html` en dernier ; `?targetCharset=utf-8` pour les fichiers texte).
4. `.htaccess` (dans `public/`) : adresses propres (/contact), redirection www → sans www, compression, cache d'un an sur /assets.

Contrôles automatiques après chaque mise en ligne : workflows « Agent d'audit » et « Agent bêta-testeur » (onglet Actions / Issues).
