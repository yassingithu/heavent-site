# HEAVENT CITY — Mission événement

Nouveau jeu, en prévisualisation : **/apercu/heavent-city** (non indexé, absent du plan du site, non pré-généré).
L'ancien jeu `/cree-ton-evenement` est intact.

## Principe
Mini-ville marocaine au coucher du soleil → on choisit un type d'événement, une ambiance de lieu (riad, villa, rooftop, jardin, salle),
on personnalise (style, couleurs, lumière, musique, accueil, décor, expériences), on joue 3 petites missions, puis « Ouvrir les portes »
(scène de nuit avec invités), bilan, carte à partager, demande à l'équipe.

## Règle absolue : aucun prix
Ce dossier n'importe jamais `jeu-evenement/config.ts` ni `tarifs.ts`, n'appelle jamais `tarifs_jeu` ni le catalogue.
La demande part vers `send-email` (type « jeu ») **sans estimation** : l'équipe chiffre le devis elle-même.

## Où modifier quoi
- Textes, options, missions : `donnees.ts`
- Emplacement des éléments dans la scène : `positions.ts`
- Dessins (tout en SVG original, seuls les logos Heavent et Nawar sont réels) : `dessins.tsx`, `Scene.tsx`, `Ville.tsx`
- Règles du jeu, annuler/refaire, sauvegarde locale (sans contact) : `etat.ts`
- Assistant : `assistant.ts` (+ fonction serveur optionnelle `supabase/functions/heavent-city-ia`)

## Assistant IA (optionnel)
Sans rien faire, le jeu propose des **suggestions automatiques** (étiquetées comme telles).
Pour activer l'IA : secret serveur `ANTHROPIC_API_KEY`, déployer `heavent-city-ia`, construire le site avec `VITE_HEAVENT_CITY_IA=1`.
Coût variable : un petit appel par message envoyé volontairement (limité : 280 caractères, 10 appels / 10 min / IP, 400 / jour).

## Remplacer l'ancien jeu / revenir en arrière
Remplacer : dans `src/App.tsx`, faire pointer la route `/cree-ton-evenement` vers `HeaventCityPage` (et ajouter la route au prérendu si souhaité).
Revenir en arrière : remettre l'ancienne ligne de route ; rien d'autre n'est modifié (aucune migration de base de données).

## Mise en production (27/10/2026)
`/cree-ton-evenement` affiche maintenant Heavent City. L'ancien jeu reste sur `/cree-ton-evenement-ancien` (non indexé).
Retour en arrière : dans `src/App.tsx`, remettre `<CreeTonEvenement />` sur la route `/cree-ton-evenement` (et `Seo page="jeu"` dans `CreeTonEvenement.tsx`), reconstruire, renvoyer chez one.com.
Assistant IA : la fonction `heavent-city-ia` répond « indisponible » tant que le secret `ANTHROPIC_API_KEY` n'existe pas ; le site utilise alors les suggestions automatiques.

## Salle, tables et déplacements
- Le nombre de tables est automatique : une table ronde pour 10 invités (120 → 12 tables, 400 → 40 tables), 6 places pour les tables rectangulaires et hautes.
- La salle s'agrandit seule (de 12 × 12 à 26 × 26 cases) pour contenir toutes les tables : voir `dimensionner()` et `positions(n, ax)` dans `positions.ts`.
- Onglet « Salle » : nombre d'invités et type de tables (rondes, rectangulaires, hautes = mange-debout, sans table d'honneur). Les types correspondent au catalogue interne (`table_ronde`, `table_rect`, `table_haute`) ; aucun prix n'est utilisé.
- Bouton « Déplacer » : on fait glisser les objets (annulable, mémorisé, « Tout remettre en place »). Les déplacements sont signalés à l'équipe dans le texte de la demande.
- Tests : `tests/heavent-city/taille-salle.mjs <lieu> <invités> <tables>` et `deplacement-salle.mjs`.

## Modifications du 29/10/2026
- **Nombre d'invités** : le champ se tape librement (effacer puis taper 15 ne donne plus 500) et n'est validé qu'en quittant le champ ou avec Entrée (`ChampNombre` dans `ui.tsx`). Minimum 2 invités.
- **Remplissage des tables** : chaque table garde toutes ses chaises et les invités sont répartis au plus juste (`repartition()` dans `etat.ts`) : 15 invités en tables rondes = 2 tables de 8 et 7, 5 places libres (affiché dans l'onglet Salle).
- **Tables hautes en plus des tables assises** : onglet Salle, « Ajouter des tables hautes » (`hautesEnPlus`). Elles sont posées par `dimensionner(…, nbHautes)` sur les cases libres, vers l'entrée, sans toucher l'allée. Admin : ligne `table_haute`. Test : `tests/heavent-city/tables-hautes-en-plus.ts`.
- **Déplacement** : un objet lâché sur une place déjà occupée (table, piste, buffet, accueil…) est refusé et revient à sa place (zone rouge pendant le glisser, message dans le bandeau). Seuls la piste avec la troupe et les feux froids peuvent se toucher.
- **Folklore** : onglet Musique, « Quel folklore ? » (`FOLKLORES` dans `donnees.ts`) : Dakka marrakchia, Issawa, Hmadcha, Gnaoua, Ahidous, Ahwach, Taskiwin, Houara, Reggada, Aïta, Abidat Rma, Guedra. Chaque style a sa ligne du catalogue (`folk_…`, prix 0 à fixer).
- **Palette « Noir et or »** (`noir_or`).
- **Arche florale d'accueil** : placée à l'entrée, au-dessus de l'allée ; plus aucune mention « photos ».
- **Villa avec piscine** : décor du bassin (fleurs flottantes, bougies flottantes, piscine illuminée), lignes `deco_piscine_…` à prix 0.
- **Espace enfants** pour tous les types d'événement (ligne existante `espace_enfants`).
- Migration : `supabase/migrations/20261029200000_catalogue_jeu_piscine_folklore.sql` (appliquée le 29/10).
