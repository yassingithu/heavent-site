# Contre-vérification de sécurité — 17/11/2026 (seconde revue, pas un audit indépendant : même auteur que les corrections)

Code examiné : branche main au commit 10a93be6 (+ corrections préparées sur la branche correctifs-contre-verification, non déployées).
Environnement : base de production, transactions annulées, données fictives (@example.invalid), aucun e-mail, paiement ni test de charge. Vérifié ensuite : aucune donnée de test restante.

## Failles confirmées
1. ÉLEVÉE — Pas de second facteur côté serveur : is_admin() est vrai avec une session sans 2FA (aal1) ; aucun administrateur n'a de TOTP enregistré ; l'application n'a aucun code de connexion à deux facteurs. Correctif préparé (migration 20261117040000, testée en transaction annulée : aal1 refusé, aal2 accepté, administrateur non inscrit inchangé). À n'appliquer qu'avec l'écran TOTP.
2. ÉLEVÉE (mécanisme confirmé, exploitation de bout en bout non reproduite) — Comparaison d'e-mail à jokers dans les fonctions serveur (getCaller, etc.) : « prenom_nom@outlook.com » correspond à « prenom.nom@outlook.com ». Un compte créé par un inconnu pourrait être pris pour un crew (pointage, signature de contrat) ou un administrateur. Les politiques de la base utilisent l'égalité exacte et ne sont pas touchées. Correctif préparé sur la branche (échappement de % et _ dans 6 fichiers) et compilé ; test de bout en bout à faire après déploiement avec deux comptes de test.
3. MOYENNE — L'export de la liste d'invités reste une barrière d'écran (données déjà chargées dans la page). Le téléchargement du livre souvenir est désormais contrôlé côté serveur sur la branche (non déployé).
4. MOYENNE — Un administrateur peut modifier les lignes et le total d'un devis signé ; la version signée est conservée (documents_signes) mais rien n'exige une nouvelle acceptation. À décider.
5. FAIBLE/MOYENNE (suspicion) — Assistant IA : limites de coût gardées en mémoire de la fonction, adresse IP lue dans un en-tête modifiable ; état de la clé non vérifié.

## Protections vérifiées (avec contrôle positif)
- Visiteur et compte quelconque : aucune lecture des tables avec données (secrets_internes 22 lignes, staff, devis_mariage, etc.) ; seule la table réalisations est publique.
- Crew : voit uniquement ses contrats, fiches, paiements, affectations ; ne peut rien modifier ni créer (contrat, fiche, paiement, facture, affectation, staff) ; facture_creer refusée.
- Invité : le jeton invité ne donne ni espace des mariés ni devis ; recherche d'un invité d'un autre mariage : absent ; suppression/modification d'un invité d'un autre mariage : sans effet.
- Stockage : identités, photos crew, souvenirs, livres, dépenses, pointages invisibles pour visiteur et crew ; dossier « documents » limité à son propre dossier.
- Versions signées : modification, suppression, insertion refusées pour un administrateur ; un devis signé ne se supprime pas ; seconde facture d'acompte refusée.
- Aucun secret ni clé privilégiée dans le site publié (717 fichiers) ; aucune carte source ; fonctions sans connexion automatique : contrôle d'appelant présent ou public par conception ; auth-email non déployée ; diagnostic-traduction désactivée.

## Non vérifié
Réglages Supabase Auth (inscriptions ouvertes, mots de passe) ; clé de l'assistant IA ; authenticité du webhook Instagram en conditions réelles ; envois réels (e-mails) ; concurrence réelle de deux signatures simultanées (seule la logique séquentielle est testée) ; fonction purge-donnees-staff (déployée, source absente du dépôt) ; génération de PDF et contenus administrables (non examinés).
