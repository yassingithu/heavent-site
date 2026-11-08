-- Ouvertures vidéo ajoutées par l'administration (sans toucher au code) : table + stockage public en lecture.
create table if not exists public.ouvertures_perso (
  id text primary key check (id ~ '^perso-[a-z0-9-]{3,40}$'),
  nom text not null check (char_length(nom) between 2 and 60),
  description text not null default '' check (char_length(description) <= 200),
  styles text[] not null default '{}',
  video_url text not null,
  poster_url text not null,
  duree_ms integer not null check (duree_ms between 1000 and 15000),
  actif boolean not null default true,
  cree_le timestamptz not null default now()
);
alter table public.ouvertures_perso enable row level security;
drop policy if exists "ouvertures_lecture" on public.ouvertures_perso;
create policy "ouvertures_lecture" on public.ouvertures_perso for select using (true);
drop policy if exists "ouvertures_admin" on public.ouvertures_perso;
create policy "ouvertures_admin" on public.ouvertures_perso for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ouvertures', 'ouvertures', true, 4194304, array['video/mp4', 'video/webm', 'image/webp', 'image/jpeg'])
on conflict (id) do nothing;
drop policy if exists "ouvertures_fichiers_admin" on storage.objects;
create policy "ouvertures_fichiers_admin" on storage.objects for all to authenticated
  using (bucket_id = 'ouvertures' and public.is_admin()) with check (bucket_id = 'ouvertures' and public.is_admin());
