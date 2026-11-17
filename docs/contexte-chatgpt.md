# HEAVENT — CONTEXTE COMPLET DU PROJET (à donner à ChatGPT)

Mis à jour le 17/11/2026. Colle ce fichier au début d'une conversation, puis pose ta question. Réponds toujours en français, simplement.
Aucun mot de passe, jeton ni clé n'est dans ce document, et il ne faut jamais en demander ou en écrire dans une conversation.

## 1. Qui, quoi
- **Heavent People Agency** (heaventagency.com), société « Heavent Agency SARL AU », basée à Rabat (Maroc). Wedding planning, événements d'entreprise, hôtes et hôtesses (« crews »).
- **Imane Chaigari** : gérante / CEO (signature des devis, contrats, formulaires CNDP). **Yassin** : gère le site, l'administration et toute la technique. Il ne code pas lui-même : il travaille avec Claude (Claude Code) et décide.
- **Heavent est une AGENCE qui recrute des partenaires (prestataires, crews), jamais une plateforme ni une marketplace.** Elle gagne sa marge sur son travail de wedding planner (forfaits de 10 000 à 20 000 MAD, réponse sous 24–48 h).
- Marques et produits liés :
  - **Nawar** : bar à parfums pour mariages et fêtes. Les parfums sont **choisis par les mariés (ou les hôtes) pour leurs invités**, jamais « chacun compose son parfum ».
  - **Heavent Studio** : vente d'un site + outil d'administration comme le nôtre à d'autres agences ou commerces. La page /studio n'affiche **aucun prix**, seulement les possibilités. Démo personnalisée par métier.
  - **Heavent City** : jeu « Crée ton événement de rêve » (scène isométrique, configuration d'un événement), sans prix visibles pour les clients.
  - **Cartes / invitations numériques** : packs Classique 250 DH, Interactive 450 DH, Prestige 650–850 DH. Livraison 1 semaine, paiement avant remise du fichier final, partage par WhatsApp uniquement. Étude « Prestige Invitation Studio » (invitations 3D de luxe) sur une branche à part, rien en production sans accord explicite de Yassin.
  - **Souvenirs** (QR code, photos des invités jusqu'à 48 h après le mariage, livre souvenir) : service vendu séparément, 1000 DH minimum, 400 photos maximum par mariage.
- Langue de travail : français. Site en FR / EN / AR (arabe en sens droite-gauche).
- Identité visuelle : noir, or, crème, élégant, raffiné, marocain contemporain. **Rien de générique** (pas le look « fait par une IA »). Design system « Seuil » : nuit #141414, papier #FAF6EC, or #A8933F / #7A5F1F / #E4D49A, terre #8A2E26, zellige #1F5A4C. Polices : Inter, Playfair Display, Great Vibes (hébergées sur le site).

## 2. Technique
- **Front** : React 18 + Vite + TypeScript + Tailwind + Radix/shadcn, framer-motion, react-query. i18n maison (`src/i18n/textesTraduits.ts`, hook `useTexte()`).
- **Back** : Supabase (projet `mapiwnsjsluiwmnulhqk`, Irlande) : Postgres avec RLS sur toutes les tables, Auth, Storage, ~40 Edge Functions (Deno). Les fonctions sont déployées sans « verify_jwt » : **chacune contrôle elle-même qui l'appelle**.
- **E-mails** : Resend (noreply@heaventagency.com). Boîtes mail et hébergement : **one.com** (fichiers statiques, pas de serveur).
- **Build et mise en ligne** : `npm run build` (vite + prérendu des pages) → `dist/` → copie dans `deploy/site/` → commit/push GitHub → envoi des fichiers modifiés sur one.com par l'API du gestionnaire de fichiers (PUT fichier par fichier, assets d'abord, `index.html` en dernier). Pas de Vercel : Yassin préfère rester sur one.com.
- **Dépôt** : github.com/yassingithu/heavent-site (PUBLIC : aucun secret dedans). Le site a été reconstruit hors de Lovable, sur son propre Supabase et son propre GitHub.
- **Automatisations** : tâches planifiées Supabase (pg_cron + `net.http_post` avec une clé de rappel). Fonction `automatisations` chaque jour à 9 h (Maroc) : relances de devis J+5 / J+10, demande d'avis le lendemain, facture de solde à J+2, rappel de rendez-vous la veille. Chaque automatisation peut être suspendue (table `reglages_automatisations`).
- **Sauvegardes** : aucun abonnement payant (ni Supabase Pro). Sauvegarde locale chiffrée sur le Mac de Yassin (`~/Sauvegardes-Heavent`, chiffrement age, restauration testée) plus copie sur disque externe.

## 3. Pages publiques
/ accueil · /a-propos · /realisations · /prestataires (inscription des partenaires) · /contact · /guides et /guides/:slug (guides gratuits + newsletter) · /wedding-planner-maroc et pages SEO par ville (hôtesses Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès, salons, mariage) · /nawar · /studio et /studio/demo/:jeton · /cartes · /liens · /mentions-legales · /politique-confidentialite (/rgpd) · 404.
Formulaires : /devis-mariage, /devis-entreprise, /cree-ton-evenement (configurateur + assistant), /inscription-staff (candidature crew, immédiate, sans attente d'approbation), /apercu/heavent-city.
Menu principal : Accueil, Entreprises, Événement, À propos, Contact. E-mail public : info@heaventagency.com.

## 4. Espaces par lien privé (jeton)
- /mon-devis/:token : le client voit, signe son devis, demande un rendez-vous, donne son avis.
- /mon-mariage/:token : espace des mariés (invités, RSVP, souvenirs). Même jeton que le devis (`lien_token`) : **ne jamais l'envoyer aux invités**.
- /invitation/:jeton, /rsvp/:jeton, /reponse/:token, /liste/:jeton, /souvenirs/… : invitations et réponses des invités. Les invités reçoivent un jeton séparé (`lien_reponse_token`) qui permet seulement de répondre et de déposer des souvenirs.
- /prestataires/confirmer/:jeton, /desinscription/:jeton.

## 5. Espace crew / staff (application web installable, PWA ; pas d'APK Android)
/auth, /staff-dashboard : disponibilités, missions, contrats à signer avant chaque mission, pointage, fiches de paie, évaluations. Les crews sont payés **à la fin du mois** au tarif convenu, jamais d'avance (les prestataires, eux, reçoivent un acompte puis le solde, au prix qu'ils ont eux-mêmes indiqué). Les clients ne voient que prénom, initiale et rôle d'un crew, jamais sa photo.

## 6. Administration (/admin et /admin-auth ; administrateurs uniquement, jamais liée ni indexée)
Devis (catalogue de prestations, prix fixés par Yassin dans Admin → Devis → Catalogue ; les devis ne partent jamais automatiquement : seulement après approbation), acomptes/soldes, factures numérotées, PDF · Équipe (candidatures, affectations, contrats, signatures, paie, paiements, évaluations) · Agenda et rendez-vous (export .ics) · Dépenses · Contenu (réalisations, témoignages, Instagram, newsletter) · Lieux et palais (136) · Prestataires partenaires · Demandes Studio et cartes · Notifications · Statistiques de visites anonymes · Sécurité (double authentification) · « Bureau des agents » (`/bureau-prive`) qui journalise chaque appel d'agent IA. Une application Mac (.dmg) reprend l'administration.

## 7. Conformité Maroc (loi 09-08, CNDP)
- Bandeau de consentement : la balise Google Ads ne se charge qu'après « Accepter ». Mesure d'audience maison, anonyme, sans cookie.
- Formulaires CNDP F-113 (RH) et F-118 (transfert vers l'Irlande) **envoyés** ; signature d'Imane. **En attente de la réponse** (numéro de récépissé, autorisation pour la copie de CIN). **Ne jamais inventer un numéro** ni présenter une demande en attente comme une autorisation. La copie de CIN des crews est temporaire jusqu'à cette autorisation. Mineurs (moins de 18 ans) interdits d'inscription.
- Un crew approuvé n'est supprimé que sur sa demande par e-mail ou par décision de l'administration.
- Nom légal à utiliser partout : « Heavent Agency SARL AU ». Le capital n'est pas affiché sur le site.

## 8. Règles de sécurité durables
- Un jeton = un rôle. Une visite GET ne change jamais rien (désinscription, confirmation, signature, RSVP : clic explicite).
- Le suivi des visites ne garde jamais de jeton dans l'adresse.
- Toute fonction serveur sans connexion automatique contrôle elle-même l'appelant (admin, clé de tâche, jeton validé ou signature de webhook).
- Factures et paiements non modifiables (corrections en lignes séparées). Documents signés conservés à part, avec empreinte SHA-256.
- Un crew « banni » perd l'accès à la requête suivante, même avec une session ouverte.
- Une migration SQL qui change une fonction appelée par le site se déploie avec la mise en ligne du site correspondant.

## 9. Double authentification administrateur (en production depuis le 17/11/2026)
- **Principe** : TOTP (code à 6 chiffres) avec l'appli « Mots de passe » d'Apple ou tout autre gestionnaire. Après le mot de passe, l'écran de connexion demande le code. Pas de codes de secours.
- **Côté base** : la fonction `is_admin()` exige un jeton de niveau « aal2 » **si l'administrateur a un code vérifié** ; sans code enregistré, rien ne change. La protection est donc **par administrateur** (migration `20261117040000`).
- **Côté fonctions serveur** : `getCaller` (`_shared/auth.ts`) lit le niveau du jeton et refuse un administrateur sans code s'il en a un (dans le doute, refus). Deux fonctions ont le même contrôle en ligne.
- **Appareils** : le même code synchronisé par iCloud sur iPhone et Mac couvre la perte d'un appareil, pas celle du compte Apple. Un **second facteur distinct** (autre appareil, autre iCloud) existe pour Yassin : son iPhone et son iPad, deux enregistrements séparés, tous deux déjà validés.
- **Imane** n'a pas encore de code : son compte reste protégé par le mot de passe seul jusqu'à ce qu'elle l'enregistre (à faire avec Yassin).
- **Retrait** : le dernier code d'un administrateur ne peut être retiré ni par le site, ni par l'API, ni par le tableau de bord (déclencheur `garder_dernier_facteur`, testé le 17/11). Seul le SQL en rôle postgres (`delete from auth.mfa_factors …`) réinitialise, après vérification d'identité hors ligne. Procédure et retour arrière : `docs/recuperation-2fa-administrateur.md`.
- **Incident corrigé le jour même** : une boucle de rafraîchissement de session sur l'écran de connexion atteignait la limite de requêtes et déconnectait à tort (« Code retiré »). Corrigé et remis en ligne avant d'appliquer la migration (commit `72569f26`).
- **Testé** : accès base refusé sans code, accordé avec code ; jetons sans niveau refusés ; non-administrateurs refusés ; connexion avec chaque appareil. **Non testé** : appel réel des fonctions avec un jeton sans code, retrait d'un code depuis le site, parcours client/invité/crew/webhook/tâches rejoués après coup (non modifiés).
- Deux fonctions PDF (`generate-invoice-pdf`, `generate-staff-professional-pdf`) n'existaient pas sur le serveur et ont été créées le 17/11 (admin avec code uniquement).

## 10. Règles de travail avec Claude
- Réponses en français, simples.
- Avant de livrer un écran ou une fonctionnalité visible : relecture ergonomie → design (et mouvement) → corrections → bêta-test.
- Questions de métier (prestataires, prix, déroulé, contrats, recrutement) : avis d'un expert événementiel avant de décider.
- Jeu Heavent City : tout changement de rendu passe par l'agent 3D.
- Ne rien inventer : tout chiffre vient de la base ou du code. Aucune migration destructive en production. Aucune publication, notification ou paiement rejoué.
- Aucun service externe payant ni transfert de données vers un nouveau service sans accord écrit de Yassin.

## 11. État réel au 17/11/2026 (développé / déployé / testé / restant)
| Point | Développé | Déployé | Testé | Restant |
|---|---|---|---|---|
| Double authentification (Yassin) | oui | oui | oui (aal1 refusé, aal2 accepté, dernier facteur protégé) | Imane : volontairement reportée |
| Code e-mail avant signature | oui (devis) ; livre de souvenirs aussi | oui | oui (expiration 10 min, 5 essais, 3 envois/h, limité au devis, preuve invalidée à la signature depuis le 17/11) | preuve non liée à une action précise ; export invités = côté navigateur seulement (décision : laissé tel quel) |
| Alertes de quota | NON (rien dans le code ni la base) | non | non | tout : stockage, e-mails, appels IA, résumé du matin |
| Signalement / retrait de photos | NON (tables souvenirs_photos existent, aucun mécanisme de signalement) | non | non | tout, + règles photos de mineurs à valider par un juriste |
| Mode jour J sans réseau | NON (le service worker staff n'a volontairement aucun cache) | non | non | tout |
| Restauration | test local réussi le 25/10 (Postgres local + clé de secours, 1 401 références, 437 fichiers) | outils en service | oui en local | test sur un projet Supabase isolé : NON fait (voir blocage) |
| Récépissé CNDP / autorisation CIN | – | – | – | en attente côté Yassin/Imane |
| Durées de conservation, TVA des factures | – | – | – | validation juriste / comptable |
| Paie, CNSS, IR | – | – | – | bloqué : règles et statuts à vérifier, aucun calcul activé |
| Bandeau de consentement /nawar et /studio | – | – | – | analyse des traceurs à faire (lot 5), pas de bandeau ajouté automatiquement |
| Démo Heavent Studio par métier | partielle (12 métiers) | oui | – | site public et espace crew dans la démo |
