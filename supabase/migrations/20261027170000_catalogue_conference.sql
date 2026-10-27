-- Heavent City : mode conférence. Nouvelles lignes du catalogue de prix, reliées au jeu (colonne jeu_element), À PRIX 0 :
-- c'est Yassin qui fixe les prix dans Admin → Devis → Catalogue de prix ; rien n'est envoyé au client sans son accord.
-- Migration ADDITIVE : aucune suppression, aucun prix existant modifié.
-- Retour arrière : delete from public.catalogue_prestations where jeu_element in ('chaise_conf','ecran_projection','micro_pied','table_intervenants','regie_son','buffet_sandwichs') and prix_unitaire = 0;
insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, jeu_element)
select 'evenementiel', v.designation, v.description, v.unite, 0, true, v.ordre, v.jeu
from (values
  ('Chaise de conférence',                 'Une chaise par participant, en rangées face à l''estrade',     'unite',    80, 'chaise_conf'),
  ('Écran de projection',                  'Grand écran derrière l''estrade pour les présentations',       'forfait',  81, 'ecran_projection'),
  ('Micro sur pied (salle)',               'Micro sur pied dans l''allée pour les questions du public',    'unite',    82, 'micro_pied'),
  ('Table des intervenants',               'Table nappée avec chaises, micros et chevalets',               'forfait',  83, 'table_intervenants'),
  ('Régie son et lumière',                 'Console, technicien et retours',                               'forfait',  84, 'regie_son'),
  ('Buffet sandwichs et pause café',       'Sandwichs, viennoiseries, café et thé',                        'forfait',  85, 'buffet_sandwichs'),
  ('Buffet sandwichs (par participant)',   'Sandwichs, viennoiseries, café et thé, par personne',          'personne', 86, 'buffet_sandwichs')
) as v(designation, description, unite, ordre, jeu)
where not exists (select 1 from public.catalogue_prestations c where c.jeu_element = v.jeu and c.designation = v.designation);
