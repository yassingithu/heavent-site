# Heavent Studio — reprise prévue la semaine prochaine

## État au 20/10/2026 (tout est en ligne et sauvegardé)
- Page publique `/studio` (sans prix, 3 formules décrites), bouton « Vous êtes une agence ? » en pied de page.
- Demandes de démo : table `studio_demandes` (RPC `studio_demander`), notification push, onglet admin « Heavent Studio → Démos agences ».
- Démos personnalisées : table `studio_demos`, lien `/studio/demo/<jeton>` (30 jours, compteur de vues, `?apercu` ne compte pas).
- La démo fait tourner la vraie administration dans le navigateur, sur des données fictives : `src/demo/` (mode.ts, donneesDemo.ts, serveurDemo.ts) + `src/integrations/supabase/client.ts` (mode démo).
- Tests : `tests/beta/beta.mjs` (scénarios « Heavent Studio »), captures : `tests/studio/captures.mjs`.

## À faire
1. **Bug appli admin** : dans l'appli installée, « Voir » mène à la connexion admin (le lien collé dans Safari fonctionne).
   Vérifier d'abord que l'appli a bien la nouvelle version (aperçu en fenêtre intégrée + rechargement automatique ajoutés le 20/10).
   Sinon : remplacer « Voir » par l'ouverture du lien dans le navigateur, ou tester l'iframe sur iOS / Safari Mac.
2. **Démo plus complète** : en plus de l'administration, montrer
   - le site public de l'agence (vitrine fictive à son nom : accueil, formulaire de devis, configurateur),
   - l'espace staff tel que le voit un crew (missions, contrat à signer, pointage, fiche de paie).
   Idée : onglets « Le site · L'administration · L'espace crew » dans le bandeau de la démo.
3. **Démos par secteur** : au moment de générer, choisir le métier (agence événementielle, concession automobile, e-commerce, …)
   → données fictives, vocabulaire, catalogue et modules adaptés au secteur (`creerBaseDemo` à paramétrer par secteur).
