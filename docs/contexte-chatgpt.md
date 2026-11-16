# CONTEXTE HEAVENT — à coller dans ChatGPT

## Qui / quoi
Heavent People Agency (heaventagency.com) : agence marocaine (Rabat) de wedding planning, événements d'entreprise et hôtes/hôtesses. Gérante : Imane Chaigari. Yassin gère le site, l'admin et la technique.
Heavent est une AGENCE qui recrute des partenaires, jamais une plateforme.
Marques liées : Nawar (bar à parfums : parfums choisis par les mariés/hôtes POUR leurs invités, jamais « chacun compose son parfum »), Heavent Studio, Heavent City (jeu de configuration d'événement).
Langue de travail : français. Site en FR / EN / AR (RTL).

## Stack
- Front : React 18 + Vite + TypeScript + Tailwind + Radix/shadcn, framer-motion, react-query, html2pdf.
- Back : Supabase (projet mapiwnsjsluiwmnulhqk) : Postgres avec RLS sur toutes les tables, Auth, Storage, Edge Functions (Deno).
- E-mails : Resend (noreply@heaventagency.com). Hébergement : one.com (fichiers statiques).
- Build : `npm run build` = vite build + prérendu des pages (scripts/prerender.mjs) → dist/ → copié dans deploy/site/ → envoyé sur one.com (API du gestionnaire de fichiers).
- Dépôt : github.com/yassingithu/heavent-site. Design system « Seuil » (classes s-nuit, s-btn, s-surtitre…), palette noir / or / crème, direction marocaine contemporaine. Rien de générique.
- i18n : src/i18n/textesTraduits.ts (tables FR→EN/AR), hook useTexte() → x("texte français").

## Pages publiques
/ accueil · /a-propos · /realisations · /prestataires · /contact · /guides et /guides/:slug (guides gratuits, newsletter) · /wedding-planner-maroc (page SEO) · /nawar · /studio et /studio/demo/:jeton · /cartes (cartes/invitations) · /liens · /mentions-legales · /politique-confidentialite (/rgpd) · 404.
Formulaires : /devis-mariage, /devis-entreprise, /cree-ton-evenement (configurateur d'événement, avec IA via heavent-city-ia), /inscription-staff (candidature crew), /apercu/heavent-city (jeu).

## Espaces par lien privé (jeton)
- /mon-devis/:token : le client voit son devis, le signe, demande un rendez-vous, donne son avis (service + chaque crew).
- /mon-mariage/:token : espace des mariés (liste d'invités, RSVP, souvenirs). Même jeton que le devis (devis.lien_token) : ne JAMAIS l'envoyer aux invités.
- /invitation/:jeton, /rsvp/:jeton, /reponse/:token : invitation numérique et réponses des invités. Les invités reçoivent un jeton séparé (devis.lien_reponse_token) qui ne permet que de répondre et de déposer des souvenirs.
- /liste/:jeton : saisie directe de la liste d'invités.
- /souvenirs/:jeton et /souvenirs/mariage/:token : photos des invités, livre souvenir, purge automatique.
- /prestataires/confirmer/:jeton : confirmation par un prestataire partenaire.
- /desinscription/:jeton : désinscription newsletter.

## Espace crew / staff
/auth, /staff-dashboard : disponibilités, missions et fiches de mission, contrats à signer, pointage (fonction pointer, suivi-pointage), fiches de paie, PDF (generate-staff-pdf…), évaluations.

## Administration (/admin, /admin-auth ; admins uniquement)
- Devis (catalogue de 101 prestations, lignes, envoi par e-mail, signature en ligne, lien client), acomptes/soldes, factures numérotées (compteur), PDF facture et contrat.
- Équipe : candidatures (validation → e-mail), affectations, contrats, signatures, fiches de paie, paiements de salaires (registre en ajout seul), notes/évaluations crew.
- Agenda : horaires, indisponibilités, prise de rendez-vous en ligne (prendre-rdv), rappels, export calendrier .ics.
- Dépenses (catégories, photo de ticket), rapports.
- Contenu : réalisations, vitrine, témoignages, références clients, textes d'accueil modifiables, Instagram (posts, publication, webhook « GUIDE » → envoi du guide en message privé).
- Newsletter (abonnés, envoi, désinscription en un clic).
- Lieux (136), prestataires partenaires, demandes Studio, demandes de cartes.
- Notifications (e-mail + push), résumé du matin (resume-matin), résumé RSVP.
- Statistiques de visites anonymes (table evenements_site, sans cookie, purge à 13 mois).
- Bureau des agents (/bureau-prive, privé, jamais indexé) : journal_agents trace chaque appel d'agent IA.

## Automatisations (fonction `automatisations`, tous les jours à 9 h Maroc)
1. Relance des devis envoyés sans réponse à J+5 puis J+10 (avec mention STOP + loi 09-08).
2. Lendemain d'un événement : demande d'avis au client.
3. J+2 après l'événement : création de la facture de solde, récap envoyé à l'agence.
4. Rappel aux clients ayant rendez-vous le lendemain, dans leur langue.
Autres : rappel-signatures, rappel-souvenirs, souvenirs-purge, newsletter, notifier-admin.

## Conformité Maroc (loi 09-08, CNDP)
- Bandeau de consentement : la balise Google Ads (AW-11479101793) ne se charge qu'après « Accepter ». Choix gardé 13 mois (localStorage). Refuser efface les cookies. Revenir sur son choix possible dans la politique de confidentialité.
- Mesure d'audience maison : anonyme, sans cookie.
- Formulaires CNDP F113 et F118 remplis, cachet + signature d'Imane ; réponse de la CNDP attendue (numéro de récépissé et autorisation pour la CIN à ajouter ensuite).
- Polices (Inter, Playfair Display, Great Vibes) hébergées sur le site : plus aucune requête Google avant accord.
- Point ouvert : bandeau absent sur /nawar et /studio (décision d'Imane).

## Règles de travail
- Répondre en français, simple.
- Avant de livrer un écran : relecture ergonomie, puis design/motion, puis bêta-test.
- Questions de métier (prix, prestataires, déroulé, contrats) : avis d'un expert événementiel avant de décider.
- Ne jamais inventer : tout chiffre ou fait vient de la base ou du code.

## Sécurité (audit du 16/11/2026) — règles durables
- Un jeton = un rôle (voir ci-dessus). Une visite GET ne change jamais rien : désinscription, confirmation prestataire, signature, RSVP passent par un clic explicite.
- Le suivi des visites ne garde jamais de jeton dans l'adresse ; routes privées exclues côté navigateur et refusées côté base.
- Toute fonction serveur sans connexion automatique contrôle elle-même qui appelle (admin, clé de tâche planifiée, jeton validé, signature du webhook).
- Factures : numérotation atomique, factures et paiements non modifiables (corrections en lignes séparées).
- Documents signés (devis, contrat crew) : version exacte conservée à part (table documents_signes, ajout seul, empreinte SHA-256) ; une modification crée une nouvelle version.
- Membre crew « banni » : perd l'accès à ses données à la requête suivante, même session ouverte (un fichier déjà téléchargé ne se révoque pas).
- Dépôts de fichiers anonymes (identités, photos, prestataires, photos-crew) : dossier imposé et limite de dépôts.
- Chaque automatisation peut être suspendue (table reglages_automatisations) sans couper le site.
- Avant envoi d'un devis/facture : confirmation affichant destinataire, événement, pièces jointes.
- Accessibilité : français/anglais/arabe, sens droite-gauche correct, mouvement réduit respecté, listes des formulaires de devis nommées.

## Encore ouvert (ne pas présenter comme fait)
Double authentification admin ; vérification supplémentaire avant signature/export ; mode jour J sans réseau ; signalement/retrait de photos et photos de mineurs ; alertes de quota ; test de restauration des sauvegardes ; récépissé CNDP et autorisation CIN (en attente, aucun numéro à inventer) ; validation juriste/comptable des durées de 13 mois et de la TVA des factures.
