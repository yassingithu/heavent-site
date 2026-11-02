-- Journal des agents (page privée « bureau ») : une ligne au début et à la fin de chaque travail d'un agent.
-- Lecture et écriture réservées aux administrateurs ; aucun accès public.
create table if not exists public.journal_agents (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  agent text not null check (agent in ('ergonome','designer','motion','beta','3d','auditeur','event-manager','relances','securite','prospection')),
  action text not null,
  statut text not null default 'termine' check (statut in ('en_cours','termine','erreur')),
  detail text
);
create index if not exists journal_agents_recent on public.journal_agents (cree_le desc);
alter table public.journal_agents enable row level security;
create policy journal_agents_admin on public.journal_agents for all to authenticated using (public.is_admin()) with check (public.is_admin());
