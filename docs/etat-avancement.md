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
| 1 | Sauvegarde et restauration | conception « locale sur le Mac » proposée le 25/10, en attente d'accord | Opus pour la conception, Sonnet possible pour les scripts |
| 2 | Champs CNSS (employeur + salarié) | code et tests faits sur la branche lot-cnss (25/10), NON déployé ; ordre : sauvegarde vérifiée → migration → site | Sonnet |
| 3 | Dates et fuseaux (conversions et planification seulement) | à faire | Sonnet avec relecture |
| 4 | Navigation et tableau de bord « À traiter » | à faire | Sonnet |
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

## Prochaine action
Accord de Yassin sur la sauvegarde locale (questions du 25/10), puis écriture des scripts du lot 1.
