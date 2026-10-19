-- Posts Instagram préparés (conseils mariage, naissance, entreprise…) : photo Pixabay + texte Heavent par-dessus
create table if not exists public.posts_instagram (
  id uuid primary key default gen_random_uuid(),
  date_prevue timestamptz,
  theme text not null default 'mariage',
  accroche text,                       -- petit texte au-dessus du titre (« CONSEIL MARIAGE »)
  titre text not null,                 -- le texte écrit sur la photo
  legende text not null,               -- la légende du post (avec l'invitation à nous contacter)
  recherche text not null,             -- mots-clés pour trouver la photo (en anglais)
  style text not null default 'sombre' check (style in ('sombre', 'clair')),
  photo_url text, photo_page text, photo_auteur text,
  visuel_url text,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'pret', 'publie', 'erreur')),
  publie_le timestamptz, ig_media_id text, erreur text,
  cree_le timestamptz not null default now()
);
alter table public.posts_instagram enable row level security;
revoke all on public.posts_instagram from anon;
create policy "posts_instagram_admin" on public.posts_instagram for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Clés des services (jamais relisibles depuis le site)
create or replace function public.instagram_enregistrer_cle(p_nom text, p_valeur text)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  if p_nom not in ('pixabay') then raise exception 'Clé inconnue'; end if;
  if coalesce(trim(p_valeur), '') = '' then raise exception 'Clé vide'; end if;
  insert into public.secrets_internes(nom, valeur) values (p_nom, trim(p_valeur))
  on conflict (nom) do update set valeur = excluded.valeur;
end $$;
revoke all on function public.instagram_enregistrer_cle(text, text) from public, anon;
grant execute on function public.instagram_enregistrer_cle(text, text) to authenticated;

create or replace function public.instagram_reglages()
returns json language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  return json_build_object(
    'pixabay', exists (select 1 from public.secrets_internes where nom = 'pixabay'),
    'instagram', exists (select 1 from public.secrets_internes where nom = 'instagram_jeton'));
end $$;
revoke all on function public.instagram_reglages() from public, anon;
grant execute on function public.instagram_reglages() to authenticated;
