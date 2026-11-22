-- Rappels et accusés de « Aujourd'hui » partagés entre les administrateurs (au lieu du téléphone seul).
-- cle : « p » + id de facture (rappel de paiement) ou « q » + id de demande (accusé de réception).
create table if not exists public.rappels_admin (
  cle text primary key,
  fait_le timestamptz not null default now(),
  par_email text default lower(auth.jwt() ->> 'email')
);
alter table public.rappels_admin enable row level security;
drop policy if exists "rappels_admin_admin" on public.rappels_admin;
create policy "rappels_admin_admin" on public.rappels_admin
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
