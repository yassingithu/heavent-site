-- Livre souvenir : fichier ZIP préparé par l'agence (livre HTML hors ligne + photos), téléchargé par les mariés.
insert into storage.buckets (id, name, public, file_size_limit)
values ('livres-souvenirs', 'livres-souvenirs', false, 52428800)
on conflict (id) do nothing;

create policy livres_souvenirs_admin on storage.objects for all to authenticated
  using (bucket_id = 'livres-souvenirs' and public.is_admin()) with check (bucket_id = 'livres-souvenirs' and public.is_admin());

create table if not exists public.souvenirs_livres (
  devis_id uuid primary key references public.devis(id) on delete cascade,
  chemin text not null,
  nb_photos int not null default 0,
  nb_invites int not null default 0,
  taille_mo numeric(6,1),
  created_at timestamptz not null default now()
);
alter table public.souvenirs_livres enable row level security;
create policy souvenirs_livres_admin on public.souvenirs_livres for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- côté mariés : le livre est-il prêt ?
create or replace function public.souvenir_livre(p_token uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select coalesce((select json_build_object('disponible', true, 'nb_photos', l.nb_photos, 'nb_invites', l.nb_invites, 'taille_mo', l.taille_mo, 'date', l.created_at)
    from public.souvenirs_livres l where l.devis_id = public._devis_mariage(p_token)), json_build_object('disponible', false))
$$;
grant execute on function public.souvenir_livre(uuid) to anon, authenticated;
-- Retour arrière : drop function public.souvenir_livre(uuid); drop table public.souvenirs_livres; drop policy livres_souvenirs_admin on storage.objects;
