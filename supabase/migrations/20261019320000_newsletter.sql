-- Newsletter : abonnés (avec consentement explicite), guides gratuits envoyés, newsletters préparées dans l'admin
create table if not exists public.abonnes_newsletter (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  prenom text,
  themes text[] not null default '{}',          -- mariage, naissance, fete, entreprise
  source text,                                   -- guide:<slug>, liens, …
  consentement boolean not null default false,   -- accepte de recevoir la newsletter
  consenti_le timestamptz,
  desinscrit_le timestamptz,
  jeton uuid not null default gen_random_uuid() unique,   -- lien de désinscription
  guides_envoyes jsonb not null default '{}'::jsonb,
  derniere_demande timestamptz not null default now(),
  cree_le timestamptz not null default now()
);
alter table public.abonnes_newsletter enable row level security;
revoke all on public.abonnes_newsletter from anon;
create policy "abonnes_admin" on public.abonnes_newsletter for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.newsletters (
  id uuid primary key default gen_random_uuid(),
  sujet text not null,
  contenu text not null,
  themes text[] not null default '{}',     -- vide = tous les abonnés
  image_url text,
  guide_slug text,
  post_id uuid references public.posts_instagram(id) on delete set null,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'envoyee')),
  envoyee_le timestamptz,
  nb_destinataires int,
  cree_le timestamptz not null default now()
);
alter table public.newsletters enable row level security;
revoke all on public.newsletters from anon;
create policy "newsletters_admin" on public.newsletters for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Inscription depuis le site (page d'un guide, page « liens »)
create or replace function public.newsletter_inscrire(p_email text, p_prenom text, p_theme text, p_newsletter boolean, p_source text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_email text := lower(trim(coalesce(p_email, ''))); v_theme text := nullif(trim(coalesce(p_theme, '')), '');
begin
  if length(v_email) > 200 or v_email !~ '^[^@\s]+@[^@\s]+\.[a-z]{2,}$' then raise exception 'E-mail invalide'; end if;
  if v_theme is not null and v_theme not in ('mariage', 'naissance', 'fete', 'entreprise') then v_theme := null; end if;
  insert into public.abonnes_newsletter as a (email, prenom, themes, source, consentement, consenti_le)
  values (v_email, nullif(left(trim(coalesce(p_prenom, '')), 60), ''), case when v_theme is null then '{}' else array[v_theme] end,
          left(p_source, 80), coalesce(p_newsletter, false), case when p_newsletter then now() end)
  on conflict (email) do update set
    prenom = coalesce(a.prenom, excluded.prenom),
    themes = case when v_theme is null or v_theme = any(a.themes) then a.themes else a.themes || v_theme end,
    consentement = a.consentement or excluded.consentement,
    consenti_le = case when excluded.consentement and not a.consentement then now() else a.consenti_le end,
    desinscrit_le = case when excluded.consentement then null else a.desinscrit_le end,
    derniere_demande = now();
  return json_build_object('ok', true);
end $$;
revoke all on function public.newsletter_inscrire(text, text, text, boolean, text) from public;
grant execute on function public.newsletter_inscrire(text, text, text, boolean, text) to anon, authenticated;

-- Désinscription en un clic (lien dans chaque e-mail)
create or replace function public.newsletter_desinscrire(p_jeton uuid)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_prenom text;
begin
  update public.abonnes_newsletter set consentement = false, desinscrit_le = now() where jeton = p_jeton returning prenom into v_prenom;
  return json_build_object('ok', found, 'prenom', v_prenom);
end $$;
revoke all on function public.newsletter_desinscrire(uuid) from public;
grant execute on function public.newsletter_desinscrire(uuid) to anon, authenticated;
