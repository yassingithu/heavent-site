-- Complément d'audit (16/11/2026) : un administrateur peut suspendre une automatisation défaillante sans couper le site.
-- Une ligne par tâche du passage quotidien ; absence de ligne = tâche active. Retour arrière : drop table public.reglages_automatisations;
create table if not exists public.reglages_automatisations (
  nom text primary key check (nom in ('relances', 'avis', 'factures_solde', 'rappels_rdv')),
  actif boolean not null default true,
  maj_le timestamptz not null default now(),
  maj_par text
);
alter table public.reglages_automatisations enable row level security;
create policy reglages_automatisations_admin on public.reglages_automatisations for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.reglages_automatisations from anon;
insert into public.reglages_automatisations (nom) values ('relances'), ('avis'), ('factures_solde'), ('rappels_rdv') on conflict do nothing;
