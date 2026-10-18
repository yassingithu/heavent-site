-- Jeu « Crée ton événement de rêve » : ses prix viennent du catalogue interne.
alter table public.catalogue_prestations add column if not exists jeu_element text;
update public.catalogue_prestations set jeu_element = 'dj' where designation = 'DJ / animation musicale';
update public.catalogue_prestations set jeu_element = 'buffet' where designation = 'Traiteur mariage (menu complet)';
insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, jeu_element)
select v.* from (values
  ('decoration', 'Table ronde 10 places', 'Chaises et nappe comprises', 'unite', 450, true, 40, 'table_ronde'),
  ('decoration', 'Table rectangulaire 6 places', 'Chaises et nappe comprises', 'unite', 320, true, 41, 'table_rect'),
  ('decoration', 'Table d''honneur', 'Nappée et fleurie', 'forfait', 2500, true, 42, 'honneur'),
  ('decoration', 'Arche décorative', 'Arche fleurie pour la cérémonie ou les photos', 'forfait', 4500, true, 43, 'arche'),
  ('decoration', 'Composition florale sur colonne', 'Grand bouquet sur colonne', 'unite', 1200, true, 44, 'fleurs'),
  ('decoration', 'Centre de table', 'Bouquet bas, par table', 'unite', 180, true, 45, 'centres'),
  ('decoration', 'Guirlandes lumineuses', 'Mât et guirlandes d''ampoules', 'unite', 900, true, 46, 'guirlandes'),
  ('decoration', 'Piste de danse', 'Piste 6 × 6 m posée et éclairée', 'forfait', 6000, true, 47, 'piste'),
  ('decoration', 'Photobooth', 'Fond décoré, appareil et tirages instantanés', 'forfait', 3500, true, 48, 'photobooth'),
  ('decoration', 'Bar à boissons', 'Comptoir et barman', 'forfait', 1500, true, 49, 'bar'),
  ('decoration', 'Boissons du bar (par invité)', 'Jus frais et boissons sans alcool', 'personne', 50, true, 50, 'bar'),
  ('decoration', 'Espace lounge', 'Canapés, poufs et table basse', 'forfait', 3000, true, 51, 'lounge'),
  ('decoration', 'Pièce montée', 'Présentation sur table', 'forfait', 600, true, 52, 'gateau'),
  ('decoration', 'Pièce montée (part par invité)', 'Gâteau à étages', 'personne', 20, true, 53, 'gateau')
) as v(categorie, designation, description, unite, prix_unitaire, actif, ordre, jeu_element)
where not exists (select 1 from public.catalogue_prestations c where c.designation = v.designation);

-- Lecture publique limitée aux seules lignes reliées au jeu (les tarifs du staff restent privés)
create or replace function public.tarifs_jeu()
returns table (jeu_element text, unite text, prix_unitaire numeric)
language sql stable security definer set search_path to 'public' as $$
  select c.jeu_element, c.unite, c.prix_unitaire from public.catalogue_prestations c
  where c.actif and c.jeu_element is not null;
$$;
grant execute on function public.tarifs_jeu() to anon, authenticated;
