-- « Commentez GUIDE » : commentaires Instagram reçus (webhook Meta) et messages privés envoyés automatiquement
create table if not exists public.instagram_commentaires (
  commentaire_id text primary key,
  media_id text,
  post_id uuid references public.posts_instagram(id) on delete set null,
  auteur_id text,
  auteur text,
  texte text,
  guide_slug text,
  statut text not null default 'recu' check (statut in ('recu', 'envoye', 'ignore', 'erreur')),
  erreur text,
  cree_le timestamptz not null default now()
);
alter table public.instagram_commentaires enable row level security;
revoke all on public.instagram_commentaires from anon;
create policy "instagram_commentaires_admin" on public.instagram_commentaires for select to authenticated using (public.is_admin());

-- Jeton de vérification du webhook (à coller dans le tableau de bord Meta)
insert into public.secrets_internes (nom, valeur) values ('instagram_webhook_jeton', replace(gen_random_uuid()::text, '-', ''))
on conflict (nom) do nothing;

create or replace function public.instagram_enregistrer_cle(p_nom text, p_valeur text)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  if p_nom not in ('pixabay', 'instagram_secret_app') then raise exception 'Clé inconnue'; end if;
  if coalesce(trim(p_valeur), '') = '' then raise exception 'Clé vide'; end if;
  insert into public.secrets_internes(nom, valeur) values (p_nom, trim(p_valeur))
  on conflict (nom) do update set valeur = excluded.valeur;
end $$;

create or replace function public.instagram_reglages()
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare v_admin boolean := public.is_admin();
begin
  if not (v_admin or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  return json_build_object(
    'pixabay', exists (select 1 from public.secrets_internes where nom = 'pixabay'),
    'instagram', exists (select 1 from public.secrets_internes where nom = 'instagram_jeton'),
    'instagram_nom', (select valeur from public.secrets_internes where nom = 'instagram_nom'),
    'secret_app', exists (select 1 from public.secrets_internes where nom = 'instagram_secret_app'),
    'webhook_jeton', case when v_admin then (select valeur from public.secrets_internes where nom = 'instagram_webhook_jeton') end,
    'abonne_le', case when v_admin then (select valeur from public.secrets_internes where nom = 'instagram_abonne_le') end);
end $$;
