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
