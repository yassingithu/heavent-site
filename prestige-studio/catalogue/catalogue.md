# Catalogue des ressources — Heavent Prestige Invitation Studio

_Établi le 2026-11-08. Ce n'est pas un avis juridique. Un dépôt public sans licence n'est PAS réutilisable. Toujours revérifier la licence au moment de l'intégration._

## Les 10 ressources retenues

| # | Ressource | Licence | Pour quoi faire |
|---|---|---|---|
| 1 | [Motion (ex Framer Motion)](https://github.com/motiondivision/motion) | MIT | Déjà dans Heavent (framer-motion 12). Ressorts, gestes, transitions de mise en page, défilement : pagination de carte, révélations, glissement du texte. |
| 2 | [three.js + React Three Fiber + drei](https://github.com/pmndrs/react-three-fiber) | MIT (les trois) | Jouer le Riad Royal en temps réel dans l'invitation (portes qui s'ouvrent, travelling) au lieu d'une vidéo : plus net, plus léger, interactif. |
| 3 | [glTF-Transform + gltfpack (meshoptimizer)](https://gltf-transform.dev/) | MIT | Passer un modèle Blender (dizaines de Mo) à quelques Mo : simplification, compression Meshopt/Draco, textures KTX2. Indispensable pour le web mobile. |
| 4 | [Poly Haven](https://polyhaven.com/license) | CC0 (usage commercial libre, attribution facultative) | HDRI de lumière dorée pour l'éclairage, textures de plâtre, bois, métal. Remplace nos approximations procédurales par des matières photographiques. |
| 5 | [ambientCG](https://docs.ambientcg.com/license) | CC0 | Textures prêtes pour cèdre, tadelakt, laiton, sols. Complète Poly Haven. |
| 6 | [GSAP (tous les plugins)](https://gsap.com/community/standard-license/) | « Standard No Charge » (propriétaire, gratuite, usage commercial autorisé) | Orchestrer l'enveloppe, le sceau, l'apparition lettre par lettre des noms, le dessin de filets en SVG. Le plus fin pour la chorégraphie. |
| 7 | [Theatre.js](https://www.theatrejs.com/) | Apache-2.0 (@theatre/core) | Régler visuellement la caméra, l'ouverture des portes et leurs courbes d'accélération dans le navigateur, puis exporter en JSON. Résout directement le sujet « mouvement de caméra plus fluide ». |
| 8 | [Lottie (lottie-web, dotLottie) + animations LottieFiles](https://github.com/airbnb/lottie-web) | MIT (runtimes) ; animations gratuites LottieFiles : Lottie Simple License, usage commercial autorisé | Effets d'ambiance prêts à l'emploi, quelques Ko, parfaits en surimpression sur la carte. |
| 9 | [Lenis + canvas-confetti + tsParticles](https://github.com/darkroomengineering/lenis) | MIT / ISC / MIT | Poussière d'or, pétales, défilement soyeux des pages de la carte. Petits, sans risque. |
| 10 | [juhonamnam/wedding-invitation (référence de structure)](https://github.com/juhonamnam/wedding-invitation) | MIT (fichier LICENSE confirmé) | Même pile que Heavent. Utile pour s'inspirer de l'architecture (galerie, RSVP, carte, musique), pas pour le visuel. |

## Points de vigilance

- **Motion (ex Framer Motion)** : Aucun. Le paquet s'appelle désormais « motion » (import motion/react).
- **three.js + React Three Fiber + drei** : Scène à optimiser pour iPhone ; nos matériaux Blender procéduraux ne s'exportent pas en glTF : il faut les « cuire » en textures.
- **glTF-Transform + gltfpack (meshoptimizer)** : Aucun côté licence.
- **Poly Haven** : Logos, rendus d'exemple et textes du site ne sont pas CC0. Le shell cloud ne peut pas y accéder : à télécharger depuis le Mac.
- **ambientCG** : Aucun. Même remarque d'accès que Poly Haven.
- **GSAP (tous les plugins)** : Pas open source. Interdit dans un outil visuel d'animation sans code concurrent de Webflow, et la licence peut changer. À éviter si Prestige Studio devient un éditeur d'animations pour clients ; sinon Motion suffit.
- **Theatre.js** : Licence compatible ; vérifier la licence de chaque paquet (studio vs core) à l'installation.
- **Lottie (lottie-web, dotLottie) + animations LottieFiles** : Vérifier la licence animation par animation. Style parfois générique : à recolorer en noir/or/ivoire.
- **Lenis + canvas-confetti + tsParticles** : Garder la sobriété : Heavent évite le « générique ».
- **juhonamnam/wedding-invitation (référence de structure)** : Photos et textes du couple d'origine : ne rien reprendre du contenu. Code MIT : conserver la mention de copyright si du code est copié.

## Examinées et écartées (ou à usage limité)

| Dépôt | Licence | Décision |
|---|---|---|
| [TheDanielOkpara/wedding-invitation](https://github.com/TheDanielOkpara/wedding-invitation) | AUCUN fichier LICENSE | NON réutilisable (tous droits réservés par défaut). Inspiration d'idées uniquement (porte-enveloppe, rideaux, texte lettre par lettre). |
| [thrinathpolanki/wedding-invitation-site](https://github.com/thrinathpolanki/wedding-invitation-site) | LICENSE MIT, mais le README annonce « Personal / Family Use » : contradiction | À ne pas utiliser : licence ambiguë, contient des photos personnelles d'un couple et une police (Candlescript.otf) de licence inconnue. |
| [ToxSam/open-source-3D-assets](https://github.com/ToxSam/open-source-3D-assets) | Registre : CC0. Assets : CC0 (Polygonal Mind, 18 collections, 991 modèles GLB) | Licence parfaite, qualité inadaptée : style jeu vidéo low-poly. Réserve pour de petits accessoires (torches, vases, fleurs). Aucune porte ni arche de niveau premium. |
| [Hidencod/tge-assets](https://github.com/Hidencod/tge-assets) | CC0 (Kenney) | Licence parfaite, mais 1 883 modèles de jeu (voitures, plateformes, nature) : aucun intérêt pour un palais marocain. |
| [glbkit-tools/awesome-3d-assets](https://github.com/glbkit-tools/awesome-3d-assets) | Liste sous CC0 ; le fichier LICENSE brut est malformé (texte répété) | Utile seulement comme annuaire (Poly Haven, Kenney, outils glTF). Les ressources listées gardent leur licence propre. Pas de ressources en propre. |
| [nirholas/assets-cli](https://github.com/nirholas/assets-cli) | Apache-2.0 (outil) ; assets three.ws : accessoires CC0, personnages et clips à licence propre | Outil pratique pour récupérer des GLB, mais le catalogue est orienté accessoires et personnages. Peu pertinent pour nous. |

## Non trouvé

Aucune porte marocaine 3D sous CC0 de qualité palais n'a été trouvée dans la recherche (les modèles trouvés sont sur CGTrader/TurboSquid, payants ou à licence propre). Aucun motif de zellige sous licence libre vérifié : à créer en interne (nous avons déjà le générateur) ou à vérifier fichier par fichier sur Wikimedia Commons.

## Miniatures

Dans `miniatures/` : 4 vignettes Polygonal Mind (CC0) et 2 captures d'exemples three.js (MIT), uniquement pour juger le niveau graphique.