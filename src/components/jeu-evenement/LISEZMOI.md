# « Crée ton événement de rêve » — mini-jeu

Page de démonstration : `/cree-ton-evenement` (non indexée, absente du menu).

## Intégrer le jeu ailleurs
```tsx
import JeuEvenement from "@/components/jeu-evenement/JeuEvenement";
<JeuEvenement />
```
La demande de devis est enregistrée dans l'admin (onglet Événement) et envoyée par e-mail. La création (sans coordonnées) est sauvegardée dans `localStorage` (`heavent-jeu-evenement-v1`).

## Où modifier quoi
| Quoi | Fichier |
|---|---|
| Tarifs, places, catalogue, devise, budget par défaut, nombre d'invités | `config.ts` → `CATALOGUE`, `CENTRES_DE_TABLE`, `DEVISE`, `BUDGET_DEFAUT`, `LIMITES_INVITES` |
| Intitulés selon le type d'événement (table d'honneur → scène…) | `config.ts` → `LIBELLES` |
| Couleurs des ambiances et nuancier | `config.ts` → `AMBIANCES`, `NUANCIER` |
| Sols des lieux | `config.ts` → `LIEUX` |
| Couleurs de l'interface (ivoire, doré…) | `ui.tsx` → `C` et classes des boutons |
| Calcul du budget, missions, disposition proposée | `logique.ts` |
| Dessins SVG des éléments | `dessins.tsx` |
| Envoi des demandes de devis (fonction send-email, type « jeu ») | `integration.ts` + `supabase/functions/send-email` |

## Tests
```
node tests/jeu/lancer.mjs                         # calculs (prix, places, missions, placement)
node tests/jeu/parcours.mjs http://127.0.0.1:4173 # parcours complet ordinateur + smartphone (après npm run build && npx vite preview)
```

## Prix = catalogue interne
Les prix affichés dans le jeu viennent du catalogue de l'admin (Devis → Catalogue de prix) :
chaque ligne marquée « Prix utilisé par le jeu » (colonne `jeu_element`) est lue par la fonction publique `tarifs_jeu()`,
qui ne renvoie QUE ces lignes (jamais les tarifs du staff). Unité « personne » = coût par invité (compté une fois),
toute autre unité = coût fixe par élément. Sans connexion, le jeu garde les prix par défaut de `config.ts`.

## Idées sur mesure (onglet « Vos idées »)
« Objet sur mesure » (1 case) et « Espace sur mesure » (2 × 2 cases) : le visiteur leur donne le nom qu'il veut
(enregistré dans l'élément, `Element.nom`, et dans le lien de partage). Pas de prix dans le jeu : « Prix sur devis ».
La demande transmet `configuration.sur_mesure` ([{ nom, quantite }]) ; « Faire le devis » dans l'admin crée une ligne par idée,
à 0 MAD, avec la mention « prix à renseigner ».
