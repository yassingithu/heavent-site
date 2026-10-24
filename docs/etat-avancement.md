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
| 2 | Champs CNSS (employeur + salarié) | prêt à démarrer | Sonnet |
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
- Dépôt : 38 fichiers de migration contre 42 migrations appliquées ; le schéma ne se reconstruit pas fidèlement depuis le dépôt seul → la sauvegarde doit contenir un export complet du schéma.
- Fonctions : 25 déployées ; « diagnostic-traduction » n'existe pas dans le dépôt (code récupérable seulement depuis Supabase).
- Configuration : une partie des réglages internes est en base (sera incluse dans l'export, donc export chiffré obligatoire) ; les variables des fonctions ne sont pas exportables automatiquement → inventaire des NOMS seulement, valeurs conservées par Yassin.
- Site : reconstructible depuis deploy/site (Git).

## Prochaine action
Lot 2 (champs CNSS) en attendant la décision sur le lot 1.
