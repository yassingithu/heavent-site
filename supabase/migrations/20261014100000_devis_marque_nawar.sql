-- Marque affichée sur le devis : logo Heavent (défaut) ou logo Nawar — bar à parfums
alter table public.devis add column if not exists marque text not null default 'heavent' check (marque in ('heavent','nawar'));
-- Prestation du catalogue : parfum du bar à parfums Nawar, 80 MAD l'unité (modifiable dans chaque devis)
insert into public.catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre)
select 'autre', 'Parfum — bar à parfums Nawar', 'Prix par parfum', 'unite', 80, true, 30
where not exists (select 1 from public.catalogue_prestations where designation in ('Parfum — bar à parfums Nawar', 'Parfum — Nawar Perfumes'));
