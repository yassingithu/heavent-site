-- Galerie « Réalisations » : alimentée depuis l'admin (photos dans le stockage public « assets/realisations/ »).
create table if not exists public.realisations (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  type_evenement text not null default 'mariage',
  lieu text,
  date_evenement date,
  description text,
  photos text[] not null default '{}',
  publie boolean not null default false,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.realisations enable row level security;
create policy realisations_lecture on public.realisations for select to anon, authenticated using (publie or public.is_admin());
create policy realisations_admin on public.realisations for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke insert, update, delete, truncate, references, trigger on public.realisations from anon;
revoke truncate, references, trigger on public.realisations from authenticated;
