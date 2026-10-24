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
- Tests sur données fictives isolées. Chaque lot livre sa méthode de retour arrière.

## Lots
| # | Lot | État | Modèle conseillé |
|---|-----|------|------------------|
| 0 | Audit initial | fait (24/10) | — |
| 1 | Sauvegarde et restauration | diagnostic fait, en attente de décision (destination, fréquence) | Opus pour la conception, Sonnet possible pour l'écriture du workflow |
| 2 | Champs CNSS (employeur + salarié) | code et tests hors production possibles ; migration de production seulement après une première sauvegarde vérifiée | Sonnet |
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

## Lot 1 — architecture proposée (non validée)
- Dépôt GitHub privé dédié ; sauvegardes en artefacts Actions (jamais en commit). Quota gratuit : 2 000 min/mois, 500 Mo de stockage partagé ; au-delà 0,25 $/Go/mois ou blocage sans moyen de paiement.
- Quotidien : export base (public, auth, storage, cron, supabase_migrations ; sans historiques net/cron) + manifeste des fichiers (sha256) ; fichiers : complet mensuel + ajouts quotidiens.
- Test automatique AVANT chiffrement, dans un conteneur sans réseau ; chiffrement age avec la clé publique de Yassin ; déchiffrement testé manuellement chaque mois.
- Garde-fou : tâche qui échoue si la dernière sauvegarde réussie a plus de 26 h.
- Configuration : une partie des réglages internes est en base (sera incluse dans l'export, donc export chiffré obligatoire) ; les variables des fonctions ne sont pas exportables automatiquement → inventaire des NOMS seulement, valeurs conservées par Yassin.
- Site : reconstructible depuis deploy/site (Git).

## Prochaine action
Décision de Yassin sur le lot 1 (voir réponse du 25/10). En parallèle possible : « Champs CNSS — code et tests hors production ».
