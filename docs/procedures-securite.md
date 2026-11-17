# Procédures de sécurité et de continuité — Heavent (16/11/2026)

Aucun secret, code de secours ni mot de passe ne doit être écrit dans ce dépôt.

## 1. Récupération des accès administrateur
- Deux comptes administrateurs nominatifs (Imane, Yassin), jamais un compte partagé.
- Chacun garde ses codes de secours hors du dépôt (gestionnaire de mots de passe ou coffre papier), et la procédure « mot de passe oublié » passe par l'e-mail de son compte.
- Si l'un perd l'accès : l'autre administrateur peut le réinitialiser depuis Supabase (Authentication > Users). Si les deux perdent l'accès : passer par la console Supabase avec le compte propriétaire du projet.
- Double authentification admin (17/11/2026) : site et 15 fonctions serveur en ligne, migration 20261117040000 appliquée à 15:00 (Bruxelles). y.selassi a un code TOTP vérifié et se connecte avec ; i.chaigari n'en a pas encore (compte protégé par le mot de passe seul tant qu'elle n'en a pas). Récupération : docs/recuperation-2fa-administrateur.md. Retour arrière : voir la migration.

## 2. Liens privés
- Consultation : /mon-devis, /mon-mariage, /reponse, /souvenirs/mariage, /rsvp (lecture et réponse).
- Actions sensibles (signature, exports complets, changements importants) : à protéger par une vérification supplémentaire (code envoyé à l'e-mail du devis). Proposition, non activée : à décider.

## 3. Départs et remplacements
- Un membre « banni » perd l'accès à ses données à la requête suivante (politiques RLS), même avec une session ouverte.
- Un fichier déjà téléchargé ne peut pas être révoqué.

## 4. Jour J sans réseau (proposition, non réalisée)
- Afficher le minimum utile (programme, contacts, horaires) avec la date de dernière synchronisation.
- Pointage de secours : saisie manuelle de l'heure, dédoublonnée à la reprise du réseau.
- Aucun stockage local de CIN ni de document sensible.

## 5. Sauvegardes
- Restauration non testée (accès au projet de test isolé requis). Plan : restaurer dans un projet Supabase séparé, sans clés d'envoi d'e-mails ni de paiement, vérifier tables, comptes et fichiers, noter les limites.

## 6. Suspension d'une automatisation
- Table `reglages_automatisations` (relances, avis, factures_solde, rappels_rdv) : passer `actif` à false suspend la tâche sans couper le site. Actif seulement après déploiement de la fonction `automatisations`.
