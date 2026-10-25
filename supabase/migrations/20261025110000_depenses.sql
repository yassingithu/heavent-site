-- Lot « Dépenses » : saisie des dépenses de l'agence avec photo du ticket / de la facture.
-- Migration ADDITIVE : nouvelles tables + un espace de stockage PRIVÉ ; aucune donnée existante modifiée.
-- À n'appliquer en production qu'après accord de Yassin et une sauvegarde vérifiée récente.
-- Retour arrière (tables vides seulement, après accord) :
--   drop table public.depenses; drop table public.categories_depenses; (+ vider puis supprimer le bucket « depenses »)
--
-- Choix volontaires :
-- * Indépendant de la paie, du statut des crews et de tout format de déclaration.
-- * Accès réservé à l'administration (is_admin) ; aucun droit pour anon ni pour les crews.
-- * Justificatifs : bucket PRIVÉ (jamais d'adresse publique) ; l'application utilise des liens signés temporaires.
-- * Montants en MAD TTC ; la TVA (facultative) est saisie telle que lue sur le ticket, jamais déduite.

create table if not exists public.categories_depenses (
  nom text primary key,
  ordre int not null default 100,
  cree_le timestamptz not null default now()
);
insert into public.categories_depenses (nom, ordre) values
  ('Transport', 10), ('Repas', 20), ('Matériel', 30), ('Location', 40),
  ('Fournitures', 50), ('Prestataires', 60), ('Autres', 90)
on conflict (nom) do nothing;

create table if not exists public.depenses (
  id uuid primary key default gen_random_uuid(),
  date_depense date not null,
  fournisseur text,
  montant_ttc numeric(12, 2) not null check (montant_ttc > 0),
  tva numeric(12, 2) check (tva is null or tva >= 0),
  categorie text not null default 'Autres',
  moyen_paiement text check (moyen_paiement is null or moyen_paiement in ('especes', 'carte', 'virement', 'cheque', 'autre')),
  devis_id uuid references public.devis(id) on delete set null,
  note text,
  justificatifs text[] not null default '{}',
  cree_par text not null default '',
  cree_le timestamptz not null default now(),
  modifie_le timestamptz not null default now()
);
create index if not exists depenses_date on public.depenses(date_depense desc);
create index if not exists depenses_devis on public.depenses(devis_id);
comment on table public.depenses is 'Dépenses de l''agence (ticket / facture en photo). Réservé à l''administration.';

-- Auteur et heures imposés par la base
create or replace function public._depense_trace() returns trigger
language plpgsql set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    new.cree_par := coalesce(nullif(auth.email(), ''), current_user);
    new.cree_le := now();
  else
    new.cree_par := old.cree_par; new.cree_le := old.cree_le;
  end if;
  new.modifie_le := now();
  return new;
end $$;
revoke all on function public._depense_trace() from public, anon, authenticated;
drop trigger if exists depenses_trace on public.depenses;
create trigger depenses_trace before insert or update on public.depenses for each row execute function public._depense_trace();

alter table public.depenses enable row level security;
alter table public.categories_depenses enable row level security;
revoke all on public.depenses, public.categories_depenses from anon;
grant select, insert, update, delete on public.depenses, public.categories_depenses to authenticated;
drop policy if exists depenses_admin on public.depenses;
create policy depenses_admin on public.depenses for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists categories_depenses_admin on public.categories_depenses;
create policy categories_depenses_admin on public.categories_depenses for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Justificatifs : espace PRIVÉ, 8 Mo par fichier, photos ou PDF
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('depenses', 'depenses', false, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;
drop policy if exists depenses_fichiers_admin on storage.objects;
create policy depenses_fichiers_admin on storage.objects for all to authenticated
  using (bucket_id = 'depenses' and public.is_admin()) with check (bucket_id = 'depenses' and public.is_admin());
