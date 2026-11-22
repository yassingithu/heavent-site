-- Messages du formulaire de contact : gardés en base, lisibles par les administrateurs seulement.
create table if not exists public.messages_contact (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  nom text not null check (char_length(nom) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  telephone text check (telephone is null or char_length(telephone) <= 60),
  sujet text check (sujet is null or char_length(sujet) <= 300),
  message text not null check (char_length(message) between 1 and 5000),
  traite boolean not null default false
);
alter table public.messages_contact enable row level security;
create policy messages_contact_admin on public.messages_contact for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy messages_contact_insert_public on public.messages_contact for insert to anon, authenticated with check (traite = false);
create index if not exists messages_contact_cree_le on public.messages_contact (cree_le desc);
