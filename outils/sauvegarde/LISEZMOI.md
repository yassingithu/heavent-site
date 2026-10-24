# Sauvegarde Heavent sur le Mac

Gratuite, chiffrée et indépendante de Claude. Elle tourne sur ton Mac, dans `~/Sauvegardes-Heavent`, un dossier qui n'est pas synchronisé avec iCloud. Elle ne copie rien vers un autre service.

## Ce que tu fais une seule fois (environ 15 minutes)

Ouvre l'application **Terminal**, puis colle cette commande :

```
bash ~/Downloads/elegant-heavent-web-main/sauvegarde-heavent/installer.sh
```

Le script :
1. installe uniquement `age`, l'outil de chiffrement gratuit, avec Homebrew. PostgreSQL 18 est déjà sur ton Mac.
2. te demande **deux secrets**, dans une invite masquée du Trousseau. Rien ne s'affiche à l'écran et rien n'est gardé dans l'historique :
   - le **mot de passe de la base** (Supabase → Project Settings → Database). Si tu ne le connais plus, **ne le réinitialise pas sans en parler d'abord à Claude** ;
   - la **clé « service_role »** (Supabase → Project Settings → API Keys → *Legacy API keys* → *Reveal*). L'afficher ne la change pas ;
3. crée la clé de chiffrement et la range dans le Trousseau ;
4. installe la tâche automatique, puis fait la **première sauvegarde complète et vérifiée**.

Ensuite, toujours dans le Terminal :

```
~/Sauvegardes-Heavent/outils/heavent-sauvegarde essai-tache    # essai dans le contexte réel de la tâche automatique (accès au Trousseau)
~/Sauvegardes-Heavent/outils/heavent-sauvegarde cle-secours    # copie de secours de la clé, protégée par une phrase secrète
```

**Copie de secours de la clé** : le fichier `Heavent-cle-de-secours.age` apparaît sur ton Bureau. Copie-le sur une clé USB ou sur un support **hors du Mac**, puis supprime-le du Bureau. Note la phrase secrète **sur papier**, rangée ailleurs que le fichier. Sans la clé, les sauvegardes sont illisibles, même pour toi.

## Quand la sauvegarde s'exécute
- macOS lance une vérification **toutes les 15 minutes**, à l'ouverture de session et au réveil du Mac. Elle ne sauvegarde vraiment que si la dernière sauvegarde vérifiée date de plus de 22 h : en pratique, **une fois par jour**, dès que le Mac est allumé et connecté.
- **Mac éteint ou en veille** : rien ne se passe. La sauvegarde est rattrapée au réveil ou à la prochaine ouverture de session, une seule fois.
- **Pas d'Internet** : nouvel essai 15 minutes plus tard. Les sauvegardes déjà faites restent intactes.
- **Interruption en pleine copie** (extinction, couvercle fermé) : la copie inachevée est effacée et tout recommence au passage suivant. Pendant une copie, le Mac ne se met pas en veille de lui-même.

## Voir où on en est
- Le fichier **`~/Sauvegardes-Heavent/ETAT.txt`** indique la date de la dernière sauvegarde **vérifiée**, la dernière tentative, le nombre de sauvegardes gardées, l'espace utilisé, sa croissance sur 30 jours et l'espace libre.
- La commande `heavent-sauvegarde statut` affiche les mêmes informations.
- Une **notification macOS** apparaît en cas d'échec, ou si aucune sauvegarde n'a été vérifiée depuis 36 h. Il y en a au plus une toutes les 6 h. Une autre notification signale le retour à la normale.
- Le journal détaillé est dans `~/Sauvegardes-Heavent/journal/`. Il ne contient aucun secret ni aucune donnée.

## Ce que chaque sauvegarde vérifie, à chaque fois
La sauvegarde est déchiffrée **avec la vraie clé du Trousseau**, puis restaurée dans un PostgreSQL temporaire **sans réseau, sans moteur de tâches planifiées et sans extension d'appel externe**. Aucune publication Instagram, aucun e-mail et aucun webhook ne peut donc partir. Elle est ensuite comparée à la production, **au moment exact de la copie** :
- le nombre de lignes et l'empreinte de **toutes les lignes de toutes les tables** : messages familiaux, comptes, devis, réglages… quel que soit leur nombre ce jour-là ;
- la structure, les fonctions, les déclencheurs, les règles d'accès, les droits et les tâches planifiées ;
- **ce que voit chaque compte existant**, ainsi qu'un visiteur anonyme, sur chaque table ;
- chaque fichier stocké : il est présent, il se déchiffre et son empreinte est identique.

Les écritures qui arrivent en production pendant la copie ne provoquent pas de fausse erreur. Tout est lu dans une vue figée à un instant donné. Un fichier modifié pendant la copie est signalé, puis repris le lendemain.

## Conservation
Sont gardées toutes les sauvegardes des 30 derniers jours, plus une par mois sur 12 mois. **La dernière sauvegarde vérifiée n'est jamais supprimée.** Un fichier identique n'est stocké qu'une fois. Une copie n'est effacée que si plus aucune sauvegarde conservée ne s'en sert.

L'espace estimé est d'environ 110 Mo au départ, puis à peu près 100 Mo de plus par mois si tu génères un mois d'Instagram à chaque fois. **C'est une estimation** : la croissance réelle est mesurée et affichée dans `ETAT.txt`. Une alerte se déclenche sous 5 Go libres.

## Restaurer
- **Contrôle seulement** : `heavent-sauvegarde verifier [sauvegarde]` redéchiffre et restaure à nouveau, à l'écart de tout.
- **Vraie restauration** : `heavent-sauvegarde extraire <sauvegarde> <dossier>` déchiffre la base et les fichiers. La restauration se fait ensuite **avec Claude**, d'abord dans un projet Supabase distinct. Jamais directement sur la production.

## Essais à faire sur le Mac (à cocher)
- [ ] `installer.sh` se termine par « première sauvegarde VÉRIFIÉE ».
- [ ] `essai-tache` affiche ✅ : le Trousseau est accessible depuis la tâche automatique.
- [ ] **Coupure réseau** : coupe le Wi-Fi, lance `heavent-sauvegarde forcer`. Attendu : « projet injoignable » et aucune sauvegarde abîmée. Rallume le Wi-Fi.
- [ ] **Veille** : lance `heavent-sauvegarde rendre-due`, mets le Mac en veille **20 minutes**, puis réveille-le. Attendu dans le journal : une sauvegarde lancée par « tâche automatique macOS », avec l'heure du dernier réveil.
- [ ] **Redémarrage** : lance `heavent-sauvegarde rendre-due`, puis redémarre le Mac. Attendu : une sauvegarde après l'ouverture de session.
- [ ] **Notification** : la notification d'échec du test réseau s'est-elle affichée ? Sinon : Réglages Système → Notifications → *Éditeur de script* → autoriser.
- [ ] `cle-secours` : la copie de la clé est rangée hors du Mac et la phrase secrète est notée sur papier.

## Limites (à connaître)
- Il ne se passe rien si le Mac reste éteint ou hors ligne. Après 5 jours sans Mac, jusqu'à 5 jours de modifications peuvent être perdus.
- Tant qu'il n'y a pas de **deuxième copie hors du Mac**, une perte ou une panne du Mac fait perdre les sauvegardes. Une deuxième destination pourra être ajoutée plus tard : disque externe, clé USB…
- La restauration ne remet pas en place automatiquement les **secrets des fonctions serveur**, les **réglages de connexion Supabase** ni la **configuration Meta**. Ils sont listés dans `docs/etat-avancement.md` du projet.
