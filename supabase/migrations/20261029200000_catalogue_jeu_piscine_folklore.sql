-- Heavent City (29/10) : décor de la piscine (villa) et styles de troupe folklorique (l'espace enfants existe déjà : jeu_element espace_enfants).
-- Nouvelles lignes du catalogue de prix reliées au jeu (colonne jeu_element), À PRIX 0 :
-- c'est Yassin qui fixe les prix dans Admin → Devis → Catalogue de prix ; rien n'est envoyé au client sans son accord.
-- Migration ADDITIVE : aucune suppression, aucun prix existant modifié.
-- Retour arrière : delete from public.catalogue_prestations where (jeu_element like 'folk\_%' or jeu_element in ('deco_piscine_fleurs','deco_piscine_bougies','deco_piscine_lumiere')) and prix_unitaire = 0;
insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, jeu_element)
select 'evenementiel', v.designation, v.description, v.unite, 0, true, v.ordre, v.jeu
from (values
  ('Piscine : fleurs flottantes',         'Fleurs et pétales posés sur l''eau',                      'forfait', 91, 'deco_piscine_fleurs'),
  ('Piscine : bougies flottantes',        'Bougies flottantes sur le bassin',                        'forfait', 92, 'deco_piscine_bougies'),
  ('Piscine : éclairage du bassin',       'Bassin éclairé aux couleurs de la soirée',                'forfait', 93, 'deco_piscine_lumiere'),
  ('Troupe Dakka marrakchia',             'Tambours, taarija et chants de Marrakech',                'forfait', 100, 'folk_dakka'),
  ('Troupe Issawa',                       'Ghaïta, tambours et chants',                              'forfait', 101, 'folk_issawa'),
  ('Troupe Hmadcha',                      'Chants soufis et percussions',                            'forfait', 102, 'folk_hmadcha'),
  ('Troupe Gnaoua',                       'Crotales, guembri et danses',                             'forfait', 103, 'folk_gnaoua'),
  ('Troupe Ahidous',                      'Danse amazighe en cercle du Moyen Atlas',                 'forfait', 104, 'folk_ahidous'),
  ('Troupe Ahwach',                       'Chants et danses amazighs du Souss et du Haut Atlas',     'forfait', 105, 'folk_ahwach'),
  ('Troupe Taskiwin',                     'Danse guerrière du Haut Atlas',                           'forfait', 106, 'folk_taskiwin'),
  ('Troupe Houara',                       'Danse rythmée du Souss',                                  'forfait', 107, 'folk_houara'),
  ('Troupe Reggada',                      'Danse énergique de l''Oriental',                          'forfait', 108, 'folk_reggada'),
  ('Troupe Aïta (chikhates)',             'Chant populaire des plaines atlantiques',                 'forfait', 109, 'folk_aita'),
  ('Troupe Abidat Rma',                   'Percussions et chants de la région de Khouribga',         'forfait', 110, 'folk_abidat_rma'),
  ('Troupe Guedra',                       'Danse sahraouie au rythme du tambour',                    'forfait', 111, 'folk_guedra')
) as v(designation, description, unite, ordre, jeu)
where not exists (select 1 from public.catalogue_prestations c where c.jeu_element = v.jeu and c.designation = v.designation);

-- L'arche est une arche florale d'accueil (à l'entrée), pas un décor pour les photos : seule la description change, pas le prix.
update public.catalogue_prestations set description = 'Arche florale d''accueil, à l''entrée'
where jeu_element = 'arche' and description = 'Arche fleurie pour la cérémonie ou les photos';
