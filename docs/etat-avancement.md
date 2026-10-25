# État d'avancement — chantier « Heavent simple et fiable »

À lire avant chaque lot. Un lot = une petite livraison vérifiable. Ne jamais enchaîner plusieurs lots d'un coup.

## Règles permanentes (rappel court)
- Ne rien jeter : messages familiaux (mots_yassin et associés), comptes, documents, configurations, connexions Instagram/Meta.
- Aucun jeton, secret ou clé touché, régénéré ou copié dans le dépôt (le dépôt GitHub est PUBLIC).
- Aucune restauration, remise à zéro ou migration destructive sur la production. Migrations additives uniquement.
- Aucune publication, notification, déclaration ou paiement rejoué ; horaires des publications programmées inchangés.
- Règles marocaines : source officielle, référence, date d'effet, incertitudes. Aucun export « officiel » sans spécification vérifiée.
- Statut juridique des personnes : jamais déduit du rôle dans l'application.
- Aucun service externe payant ni transfert de données vers un nouveau service sans accord écrit de Yassin.
- Sauvegardes : AUCUN paiement mensuel (ni Supabase Pro, ni facturation à l'usage, ni moyen de paiement ajouté). Aucune exclusion de données sans accord.
- Tests sur données fictives isolées. Chaque lot livre sa méthode de retour arrière.

## Lots
| # | Lot | État | Modèle conseillé |
|---|-----|------|------------------|
| 0 | Audit initial | fait (24/10) | — |
| 1 | Sauvegarde et restauration | OPÉRATIONNELLE le 25/10 : 1re sauvegarde réelle vérifiée (tâche automatique, 1 401 références, 437 fichiers), copie disque « My Passport for Mac » vérifiée, restauration avec clé de secours réussie ; reste : essais veille / redémarrage / réseau | Opus pour la conception, Sonnet possible pour les scripts |
| 2 | Champs CNSS + registre des paiements | EN PRODUCTION le 25/10 (migrations cnss_employeur et paiements_paie, site fc9a8e2) après sauvegarde vérifiée ; reste : saisir le n° d'affiliation CNSS employeur | — |
| 3 | Dates et fuseaux (conversions et planification seulement) | à faire | Sonnet avec relecture |
| 4 | Navigation et tableau de bord « À traiter » | à faire — exigences détaillées ci-dessous (25/10) | Sonnet, relecture visuelle |
| 5 | Remplacements (avec état « en attente de validation ») | à faire | Sonnet |
| 6 | Dépenses, justificatifs, lecture automatique, export Excel + ZIP | à faire (indépendant de la paie) | Sonnet ; banc d'essai OCR d'abord |
| 7 | Paie (taux datés, versions, IR) | bloqué : statut des personnes, vérification des règles de l'exercice | Opus |
| 8 | Déclarations | bloqué : cahiers des charges officiels | Opus |
| 9 | Site et jeu (finitions) | à faire | Sonnet |

## Lot 1 — diagnostic sauvegarde (24/10, lecture seule)
- Base : 19 Mo, 42 tables publiques, 7 comptes, 7 tâches planifiées. Plan gratuit : aucune sauvegarde restaurable fournie.
- Fichiers stockés : identites 2 fichiers (0,9 Mo), photos 1 (1,8 Mo), assets 434 (103 Mo). Non couverts par les sauvegardes de base, même en Pro.
- Dépôt vs production (comparaison réelle, 25/10 : migrations du dépôt rejouées dans un Postgres local isolé, ~900 éléments comparés à la production) :
  écarts = 4 colonnes absentes du dépôt (devis.rdv_demande_le, devis.rdv_message, parametres_agence.signataire_employeur, parametres_agence.signature_employeur),
  5 fonctions différentes ou absentes (devis_avant_suppression, generer_fiches_paie, notifier_admins, suivi_enregistrer, vitrine_public),
  3 politiques *_admin et droits plus restrictifs en production (vitrine, temoignages, references_clients), horaire de resume-du-matin (6:30 UTC en prod, 7:30 dans le dépôt).
  → la sauvegarde doit exporter le schéma depuis la production ; une migration de « rattrapage » (fichier seulement) sera à écrire.
- Historique des migrations : versions et découpage différents entre dépôt et production ; ne pas s'y fier pour reconstruire.
- Fonctions : 25 déployées ; « diagnostic-traduction » (désactivée, renvoie 410) récupérée dans le dépôt le 25/10.
- Messages familiaux : 740 lignes (imane 371, nawar 369) + surprise_bienvenue, sans pièce jointe ; RLS active, aucun droit direct, lecture via _mot_du_jour.
- Comptes : 7, connexion e-mail uniquement ; aucune clé étrangère public → auth.users : restaurer auth.users avec les mêmes identifiants.

## Lot 1 — architecture retenue pour étude (25/10) : sauvegarde locale chiffrée sur le Mac
- GitHub Actions abandonné comme solution principale (quota de 500 Mo dépassé en 1 à 3 mois, contrainte « aucun paiement »).
- Mac de Yassin (macOS, puce Apple) : disque interne 229 Go, 39 Go libres ; aucun disque externe branché le 25/10.
- Exécution native macOS (LaunchAgent), pas depuis la machine virtuelle de Claude (Linux, absente quand l'application est fermée).
- Dossier hors iCloud (~/Sauvegardes-Heavent) ; vérifier que Documents/Bureau ne sont pas synchronisés avant tout autre choix.
- Base : pg_dump depuis la production (schéma + données + auth + storage + cron + historique des migrations).
- Fichiers : magasin par empreinte (sha256) + manifeste par sauvegarde ; un fichier n'est effacé que s'il n'est plus référencé par aucune sauvegarde conservée ; la dernière sauvegarde vérifiée n'est jamais supprimée.
- Chiffrement age ; clé privée dans le Trousseau du Mac + copie papier/gestionnaire de mots de passe ; mot de passe base et clé fichiers dans le Trousseau (saisis par Yassin).
- Test automatique après chaque sauvegarde : restauration dans un Postgres local sans pg_cron ni pg_net, contrôles (comptes, messages familiaux, droits, fichiers).
- Configuration : une partie des réglages internes est en base (sera incluse dans l'export, donc export chiffré obligatoire) ; les variables des fonctions ne sont pas exportables automatiquement → inventaire des NOMS seulement, valeurs conservées par Yassin.
- Site : reconstructible depuis deploy/site (Git).

## Lot 2 — Champs CNSS (branche lot-cnss, 25/10)
- Migration additive 20261025090000_cnss_employeur.sql (colonne texte parametres_agence.cnss_affiliation_employeur). Pas d'index unique sur staff (inscription publique : éviterait de révéler qu'un numéro existe) ; doublons signalés à l'admin.
- src/lib/cnss.ts : avertissements non bloquants, doublons, éléments manquants, état du bulletin (définitif seulement si complet ET validé/payé).
- Écrans : Infos agence (champ + avertissement), Paie (alertes, statut Validée/Payée refusé si incomplet), fiche crew (avertissement + doublon). PDF : « APERÇU INCOMPLET » / « APERÇU — NON VALIDÉ », signature seulement sur un bulletin définitif.
- Tests : node tests/cnss/unitaires.mjs (7) ; bash tests/cnss/permissions.sh (11 contrôles de droits, Postgres local jetable) ; SEUL="CNSS" beta (parcours Admin) ; non-régression paie OK.
- Ordre de mise en production : 1) première sauvegarde vérifiée ; 2) migration ; 3) site. Jamais le site avant la migration.
- Remarque hors lot : StaffDashboard affiche « Validée » pour le statut « validee », jamais écrit (l'admin écrit « valide ») ; à corriger dans un lot ultérieur.

## Lot 1 — outil livré (25/10)
- Code : outils/sauvegarde/ (heavent-sauvegarde, references.sql, installer.sh, LISEZMOI.md) ; essais : sudo bash tests/sauvegarde/essai.sh (15 scénarios, fausse production locale).
- Mac : Homebrew + PostgreSQL 18.3 déjà installés (sans pg_cron/pg_net) ; seul « age » à installer. Copie déposée dans ~/Downloads/elegant-heavent-web-main/sauvegarde-heavent/.
- Pas encore démontré sur le Mac : première sauvegarde réelle, accès Trousseau depuis la tâche, veille, redémarrage, coupure réseau, notifications (cases à cocher dans LISEZMOI.md).
- Mot de passe de la base : NE PAS réinitialiser sans accord (règle « aucun secret régénéré »).

## Lot 1 bis — deuxième copie sur disque externe (25/10)
- Disque 2 To de Yassin, reconnu par l'identifiant unique du volume + fichier repère dans « Heavent-Sauvegardes » ; aucun formatage ni suppression hors de ce dossier.
- Copie de la dernière sauvegarde vérifiée + objets nécessaires + outils + config sans secret ; contrôle d'empreinte ; publication atomique ; vérification par restauration à partir du disque seul ; conservation qui garde toujours la dernière copie vérifiée.
- Déclenchée au branchement (StartOnMount), toutes les 15 min, ou à la main (heavent-sauvegarde disque). Rappel hebdomadaire si pas de copie depuis 7 jours. ETAT.txt : dates Mac et disque séparées.
- Restauration sans Mac : essai-restauration-disque avec la clé de secours (phrase secrète).
- Essais : 27/27 (fausse production + faux volumes). À démontrer sur le Mac : accès macOS au disque depuis la tâche automatique (autorisation « volumes amovibles »).

## Lot 2 — registre des paiements (branche lot-cnss, 25/10, testé hors production)
- Migration additive 20261025100000_paiements_paie.sql : table paiements_paie en ajout seul (montant, date civile, mode, référence, note, correction motivée), auteur et heure imposés par la base, modification et suppression refusées (même super-utilisateur), bulletin payé non supprimable ; lecture admin + crew pour SES bulletins.
- Enregistrer un paiement ne change jamais fiches_paie.statut. L'option « Payée » n'est plus proposée (affichée seulement pour d'anciens bulletins : aucun en production le 25/10).
- Écran Paie : colonne « Payé » + fenêtre « Paiement » (net restant proposé, date du jour à Casablanca). PDF : ligne « Payé le … ». Espace crew : « Payé : … (le …) ».
- Tests : permissions.sh 23 contrôles ; parcours CNSS (paiement sur bulletin incomplet, statut inchangé, crew voit le paiement) ; non-régression paie OK.
- Constaté, hors lot : « Bulletin établi à Rabat le … » utilise la date UTC (à traiter dans le lot Dates et fuseaux).

## Lot 4 — exigences de Yassin (25/10), tous supports
- Ordinateur et appli Mac : navigation latérale à quelques catégories, rubrique active visible, menu réductible (icônes + infobulles), adaptation aux fenêtres étroites.
- iPhone : barre inférieure Accueil · Événements · Équipe · Plus ; le reste dans « Plus » ; actions fréquentes accessibles.
- Partout : aucune fonction ni permission perdue ; pas de doublons ni d'intitulés ambigus ; en-têtes et blocs de bienvenue moins hauts ; « À traiter » et prochains événements en avant ; indicateurs compacts et lisibles ; statut des notifications et bouton de test déplacés dans les paramètres ; messages familiaux et personnalisations intacts ; dates contradictoires corrigées après vérification des sources et fuseaux ; aucun élément fixe ne masque le contenu.
- Identité crème / anthracite / doré ; amélioration esthétique visible, pas seulement un déplacement de boutons.
- Appli Mac (desktop/main.js) : charge le SITE EN LIGNE (https://heaventagency.com) dans une fenêtre Electron ; une mise en ligne du site s'y voit sans réinstaller le DMG. Seuls la coque (menu, page hors ligne offline.html, règles d'ouverture des liens) demandent une nouvelle compilation ; la vérifier avant diffusion.
- Prévisualisations à fournir : téléphone, navigateur ordinateur, appli Mac (si possible) ; signaler les supports non testés.
- Aucune règle métier, donnée ou connexion modifiée par cette refonte.

## Lot 1 — constats de l'installation réelle (25/10)
- age installé depuis la publication officielle (v1.3.1) : Homebrew sans version pour macOS 27.
- L'invite masquée de macOS coupe à 128 caractères : clé « service_role » lue dans le presse-papiers (corrigé dans installer.sh).
- Encodage des chemins de fichiers corrigé (Supabase refusait les lettres encodées).
- Contrôles d'accès lents (~1 s par requête vers l'Irlande) : à regrouper en quelques requêtes (amélioration prévue).

## Mise en ligne du 25/10 (lot CNSS)
- Base : migrations additives cnss_employeur + paiements_paie (RLS active, aucun droit anonyme, triggers trace/immuable) ; messages familiaux intacts (740).
- Site : commit fc9a8e2, 78 fichiers envoyés (sans suppression). one.com refuse « targetCharset=utf-8 » sur cet envoi : fichiers envoyés tels quels, accents vérifiés en ligne.
- Retour arrière site : renvoyer les fichiers du commit 4982ae6 (anciens fichiers techniques toujours présents).
- Liste des fichiers à envoyer : git diff --no-renames (sinon les renommages donnent les anciens noms).

## Prochaine action
Lot 4 « Navigation et esthétique » sur une branche séparée, avec aperçus avant toute mise en ligne. Essais veille / redémarrage / réseau de la sauvegarde à cocher par Yassin.
