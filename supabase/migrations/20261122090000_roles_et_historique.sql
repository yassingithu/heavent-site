-- Rôles (structure seulement) + historique des changements de statut.
-- Additif : ne modifie ni is_admin(), ni la table admins, ni aucune règle existante.

-- 1) Rôles autres qu'administrateur. Aucun droit n'est donné par cette table tant que le site ne les lit pas.
--    Les administrateurs restent ceux de la table admins (double code compris).
create table if not exists public.roles_utilisateurs (
  email text primary key,
  role text not null check (role in ('assistant', 'comptable', 'chef_equipe')),
  created_at timestamptz not null default now(),
  constraint roles_utilisateurs_email_minuscule check (email = lower(email))
);
alter table public.roles_utilisateurs enable row level security;
drop policy if exists "roles_utilisateurs_admin" on public.roles_utilisateurs;
create policy "roles_utilisateurs_admin" on public.roles_utilisateurs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Rôle de la personne connectée : 'admin', un des rôles ci-dessus, ou null.
create or replace function public.mon_role()
returns text
language sql stable security definer
set search_path to 'public'
as $$
  select case
    when public.is_admin() then 'admin'
    else (select r.role from public.roles_utilisateurs r where r.email = lower(auth.jwt() ->> 'email'))
  end
$$;
revoke all on function public.mon_role() from public, anon;
grant execute on function public.mon_role() to authenticated;

-- 2) Historique : qui a changé quel statut, et quand. Lecture réservée aux administrateurs, aucune écriture directe.
create table if not exists public.historique_changements (
  id bigint generated always as identity primary key,
  table_name text not null,
  ligne_id text not null,
  libelle text,
  champ text not null,
  avant text,
  apres text,
  par_email text,
  created_at timestamptz not null default now()
);
create index if not exists historique_changements_ligne on public.historique_changements (table_name, ligne_id, created_at desc);
create index if not exists historique_changements_date on public.historique_changements (created_at desc);
alter table public.historique_changements enable row level security;
drop policy if exists "historique_changements_lecture_admin" on public.historique_changements;
create policy "historique_changements_lecture_admin" on public.historique_changements
  for select to authenticated using (public.is_admin());

-- Fonction de journalisation : TG_ARGV[0] = nom de la colonne de statut. Ne bloque jamais la modification.
create or replace function public._journaliser_statut()
returns trigger
language plpgsql security definer
set search_path to 'public'
as $$
declare
  ancien text := to_jsonb(OLD) ->> TG_ARGV[0];
  nouveau text := to_jsonb(NEW) ->> TG_ARGV[0];
begin
  if ancien is distinct from nouveau then
    begin
      insert into public.historique_changements (table_name, ligne_id, libelle, champ, avant, apres, par_email)
      values (TG_TABLE_NAME, to_jsonb(NEW) ->> 'id', to_jsonb(NEW) ->> 'numero', TG_ARGV[0], ancien, nouveau,
              coalesce(lower(auth.jwt() ->> 'email'), 'automatique'));
    exception when others then
      null; -- le journal ne doit jamais empêcher un changement de statut
    end;
  end if;
  return NEW;
end
$$;
revoke all on function public._journaliser_statut() from public, anon, authenticated;

drop trigger if exists historique_statut on public.devis;
create trigger historique_statut after update of statut on public.devis
  for each row execute function public._journaliser_statut('statut');
drop trigger if exists historique_statut on public.factures;
create trigger historique_statut after update of statut on public.factures
  for each row execute function public._journaliser_statut('statut');
drop trigger if exists historique_statut on public.devis_mariage;
create trigger historique_statut after update of statut on public.devis_mariage
  for each row execute function public._journaliser_statut('statut');
drop trigger if exists historique_statut on public.devis_entreprise;
create trigger historique_statut after update of statut on public.devis_entreprise
  for each row execute function public._journaliser_statut('statut');
drop trigger if exists historique_statut on public.contrats;
create trigger historique_statut after update of statut on public.contrats
  for each row execute function public._journaliser_statut('statut');
drop trigger if exists historique_statut on public.staff;
create trigger historique_statut after update of statut_candidature on public.staff
  for each row execute function public._journaliser_statut('statut_candidature');
