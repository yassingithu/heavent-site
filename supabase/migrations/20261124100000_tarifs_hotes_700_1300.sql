-- Grille hôtes et hôtesses (validée) : forfait 8 h, tenue comprise.
--   bilingue                  : 700 MAD
--   premium trilingue         : 1 300 MAD
--   heure supplémentaire      : 120 MAD
-- Se déploie avec la mise en ligne du site correspondant (le code cherche les lignes par désignation).
begin;

update catalogue_prestations
   set designation = 'Hôte / hôtesse d''accueil',
       description = 'Journée de 8 h — bilingue, tenue comprise',
       prix_unitaire = 700
 where categorie = 'staff' and designation = 'Hôtesse d''accueil';

update catalogue_prestations
   set designation = 'Hôte / hôtesse premium trilingue',
       description = 'Journée de 8 h — tenue comprise, profil expérimenté, 3 langues',
       prix_unitaire = 1300
 where categorie = 'staff' and designation = 'Hôtesse premium / trilingue';

update catalogue_prestations
   set designation = 'Hôtes et hôtesses d''accueil invités (mariage)',
       description = 'Accueil, vestiaire, placement — bilingue, tenue comprise, 8 h',
       prix_unitaire = 700
 where categorie = 'mariage' and designation = 'Hôtesses d''accueil invités (mariage)';

update catalogue_prestations
   set prix_unitaire = 120
 where categorie = 'staff' and designation = 'Heure supplémentaire';

-- Doublons devenus inutiles : masqués (pas supprimés) pour garder l'historique.
update catalogue_prestations set actif = false
 where categorie = 'staff' and designation in ('Hôte d''accueil', 'Hôtesse bilingue');

commit;
