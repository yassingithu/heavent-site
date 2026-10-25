-- Jeu « Crée ton événement de rêve » : prix des nouveaux éléments dans le catalogue de prix de l'administration,
-- pour que l'estimation du jeu ET le devis automatique reprennent TES prix (modifiables dans Devis → Catalogue de prix).
-- Migration ADDITIVE : quelques lignes ajoutées + 3 lignes existantes reliées au jeu (colonne jeu_element). Aucune suppression, aucun prix existant modifié.
-- Retour arrière : update public.catalogue_prestations set jeu_element = null where designation in ('Négafa','Orchestre / troupe traditionnelle','Photographe mariage');
--                  delete from public.catalogue_prestations where jeu_element in (<les éléments ci-dessous>) and created_at >= '2026-10-25';

-- 1. Lignes déjà présentes au catalogue : on les relie au jeu (leurs prix restent ceux d'Yassin)
update public.catalogue_prestations set jeu_element = 'neggafa'    where designation = 'Négafa'                            and jeu_element is null;
update public.catalogue_prestations set jeu_element = 'orchestre'  where designation = 'Orchestre / troupe traditionnelle' and jeu_element is null;
update public.catalogue_prestations set jeu_element = 'photographe' where designation = 'Photographe mariage'              and jeu_element is null;

-- 2. Nouveaux éléments (prix de départ = ceux du jeu, à ajuster dans le catalogue)
insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, jeu_element)
select v.categorie, v.designation, v.description, v.unite, v.prix, true, v.ordre, v.jeu
from (values
  ('decoration',   'Tente marocaine (caïdale)',                    'Grande tente caïdale, tapis, poufs et lanternes',        'forfait', 28000, 40, 'tente'),
  ('decoration',   'Salon marocain',                               'Banquettes en U, table basse et tapis',                  'forfait',  6500, 41, 'salon_marocain'),
  ('decoration',   'Espace henné',                                 'Coussins, table basse, henné et bougies',                'forfait',  3500, 42, 'espace_henne'),
  ('mariage',      'Troupe folklorique (danseurs et percussions)', null,                                                     'forfait',  6000, 43, 'troupe'),
  ('decoration',   'Livre d''or et guéridon',                      null,                                                     'unite',     400, 44, 'livre_dor'),
  ('evenementiel', 'Feux froids (2 fontaines)',                    null,                                                     'forfait',  2500, 45, 'feux_froids'),
  ('decoration',   'Fontaine zellige',                             null,                                                     'forfait',  3500, 46, 'fontaine'),
  ('decoration',   'Lanternes marocaines (mât)',                   null,                                                     'unite',    1100, 47, 'lanternes'),
  ('decoration',   'Torches de jardin',                            null,                                                     'unite',     700, 48, 'torches'),
  ('evenementiel', 'Espace enfants (château gonflable et animatrice)', null,                                                 'forfait',  2800, 49, 'espace_enfants'),
  ('decoration',   'Estrade de cérémonie',                         'Estrade, marches, tapis et fond tendu',                  'forfait',  3200, 50, 'estrade'),
  ('decoration',   'Pergola fleurie',                              null,                                                     'forfait',  9000, 51, 'pergola'),
  ('decoration',   'Candy bar',                                    'Table de bonbons et friandises',                         'forfait',  2200, 52, 'candy_bar'),
  ('decoration',   'Candy bar (par invité)',                       null,                                                     'personne',   12, 53, 'candy_bar')
) as v(categorie, designation, description, unite, prix, ordre, jeu)
where not exists (select 1 from public.catalogue_prestations c where c.jeu_element = v.jeu and c.designation = v.designation);

-- 3. Suppléments par case ajoutée quand le visiteur agrandit un élément (« <élément>+case »)
insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, jeu_element)
select 'decoration', v.designation, 'Supplément par case ajoutée quand l''élément est agrandi dans le jeu', 'unite', v.prix, true, v.ordre, v.jeu
from (values
  ('Piste de danse : case supplémentaire',          650, 60, 'piste+case'),
  ('Buffet : case supplémentaire',                  700, 61, 'buffet+case'),
  ('Bar à boissons : case supplémentaire',          500, 62, 'bar+case'),
  ('Mur de fleurs : case supplémentaire',          1800, 63, 'mur_fleurs+case'),
  ('Allée d''entrée : case supplémentaire',         500, 64, 'allee+case'),
  ('Estrade de cérémonie : case supplémentaire',    900, 65, 'estrade+case'),
  ('Espace enfants : case supplémentaire',          350, 66, 'espace_enfants+case'),
  ('Salon marocain : case supplémentaire',         1500, 67, 'salon_marocain+case'),
  ('Service à thé : case supplémentaire',           500, 68, 'the+case'),
  ('Candy bar : case supplémentaire',               400, 69, 'candy_bar+case')
) as v(designation, prix, ordre, jeu)
where not exists (select 1 from public.catalogue_prestations c where c.jeu_element = v.jeu);
