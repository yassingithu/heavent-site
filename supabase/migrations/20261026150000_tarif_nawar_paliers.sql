-- Bar à parfums Nawar : prix du parfum selon la quantité (55 MAD sous 150 pièces, 45 MAD à partir de 150 ; minimum de 50 parfums gardé).
-- La ligne existante à 80 MAD (estimation « tout compris » par invité, utilisée par le jeu) n'est ni supprimée ni modifiée dans son prix :
-- seule sa description précise son rôle. Deux lignes sont ajoutées pour les devis.
-- Retour arrière : delete from public.catalogue_prestations where designation in ('Parfum Nawar — moins de 150 pièces','Parfum Nawar — 150 pièces et plus');
--                  update public.catalogue_prestations set description = 'Prix par parfum' where jeu_element = 'nawar';
update public.catalogue_prestations
   set description = 'Estimation tout compris par invité (utilisée par le jeu). Pour un devis, utiliser les lignes Parfum Nawar à 55 / 45 MAD.'
 where jeu_element = 'nawar' and description = 'Prix par parfum';

insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre)
select 'autre', v.designation, v.description, 'unite', v.prix, true, v.ordre
from (values
  ('Parfum Nawar — moins de 150 pièces', 'Prix par parfum (minimum 50 parfums facturés)', 55, 70),
  ('Parfum Nawar — 150 pièces et plus', 'Prix par parfum à partir de 150 pièces', 45, 71)
) as v(designation, description, prix, ordre)
where not exists (select 1 from public.catalogue_prestations c where c.designation = v.designation);
