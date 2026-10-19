-- Espace de Nawar : ses mots de papa chaque jour, sa surprise, et des onglets sans données personnelles
alter table public.admin_profils add column if not exists espace text not null default 'admin';
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'admin_profils_espace_check') then
    alter table public.admin_profils add constraint admin_profils_espace_check check (espace in ('admin', 'nawar'));
  end if;
end $$;
insert into public.admin_profils (email, prenom, recoit_mots, espace) values ('nawar@heaventagency.com', 'Nawar', true, 'nawar')
on conflict (email) do update set espace = 'nawar', recoit_mots = true, prenom = 'Nawar';

alter table public.mots_yassin add column if not exists pour text not null default 'imane';
alter table public.surprise_bienvenue add column if not exists pour text not null default 'imane';
create unique index if not exists surprise_bienvenue_pour on public.surprise_bienvenue(pour);

create or replace function public._est_nawar() returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.admin_profils where lower(email) = public._mon_email() and espace = 'nawar')
$$;
grant execute on function public._est_nawar() to authenticated;
create or replace function public.est_espace_nawar() returns boolean language sql stable security definer set search_path to 'public' as $$ select public._est_nawar() $$;
revoke all on function public.est_espace_nawar() from public, anon;
grant execute on function public.est_espace_nawar() to authenticated;

-- Mot du jour, pour Imane ou pour Nawar
create or replace function public._mot_du_jour(p_jour date, p_pour text)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare v_mot text; v_n int; v_an int := extract(year from p_jour)::int;
  v_depart date := coalesce((select min(surprise_vue_le)::date from public.admin_profils
                             where recoit_mots and (case when espace = 'nawar' then 'nawar' else 'imane' end) = p_pour), p_jour);
begin
  select texte into v_mot from public.mots_yassin where pour = p_pour and date_speciale = to_char(p_jour, 'MM-DD') order by id limit 1;
  if v_mot is null then
    select count(*) into v_n from public.mots_yassin where pour = p_pour and date_speciale is null;
    if v_n > 0 then
      select texte into v_mot from public.mots_yassin where pour = p_pour and date_speciale is null
        order by ordre, id offset (((p_jour - v_depart) % v_n) + v_n) % v_n limit 1;
    end if;
  end if;
  return replace(replace(replace(replace(v_mot,
    '{age_imane}', (v_an - 1989)::text), '{ans_mariage}', (v_an - 2013)::text),
    '{ans_rencontre}', (v_an - 2011)::text), '{age_nawar}', (v_an - 2014)::text);
end $$;
revoke all on function public._mot_du_jour(date, text) from public, anon, authenticated;
grant execute on function public._mot_du_jour(date, text) to service_role;
-- L'ancienne version (une seule date) reste : elle renvoie le mot d'Imane
create or replace function public._mot_du_jour(p_jour date)
returns text language sql stable security definer set search_path to 'public' as $$ select public._mot_du_jour(p_jour, 'imane') $$;

create or replace function public.mon_accueil()
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare p public.admin_profils; v_pour text;
begin
  if not (public.is_admin() or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  select * into p from public.admin_profils where lower(email) = public._mon_email();
  if p.email is null then return json_build_object('prenom', null); end if;
  v_pour := case when p.espace = 'nawar' then 'nawar' else 'imane' end;
  return json_build_object(
    'prenom', p.prenom, 'espace', p.espace,
    'mot', case when p.recoit_mots then public._mot_du_jour((now() at time zone 'UTC')::date, v_pour) end,
    'surprise', case when p.recoit_mots and p.surprise_vue_le is null then (select to_json(s) from public.surprise_bienvenue s where s.pour = v_pour) end,
    'signatures_vues_jusqu_au', p.signatures_vues_jusqu_au, 'records_vus', p.records_vus);
end $$;

create or replace function public.accueil_marquer(p_quoi text)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if not (public.is_admin() or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  if p_quoi = 'surprise' then
    update public.admin_profils set surprise_vue_le = now() where lower(email) = public._mon_email();
  elsif p_quoi = 'signatures' then
    update public.admin_profils set signatures_vues_jusqu_au = now() where lower(email) = public._mon_email();
  elsif p_quoi like 'record:%' then
    update public.admin_profils set records_vus = records_vus || to_jsonb(substr(p_quoi, 8))
      where lower(email) = public._mon_email() and not records_vus ? substr(p_quoi, 8);
  end if;
end $$;

-- Statistiques (chiffres globaux, aucune donnée personnelle) et posts Instagram : ouverts à Nawar
do $$ declare d text; begin
  d := pg_get_functiondef('public.statistiques_site'::regproc);
  if position('_est_nawar' in d) = 0 then
    execute replace(d, 'if not public.is_admin() then', 'if not (public.is_admin() or public._est_nawar()) then');
  end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'posts_instagram' and policyname = 'posts_instagram_nawar') then
    create policy "posts_instagram_nawar" on public.posts_instagram for all to authenticated using (public._est_nawar()) with check (public._est_nawar());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'assets_instagram_nawar') then
    create policy "assets_instagram_nawar" on storage.objects for all to authenticated
      using (bucket_id = 'assets' and name like 'instagram/%' and public._est_nawar())
      with check (bucket_id = 'assets' and name like 'instagram/%' and public._est_nawar());
  end if;
end $$;
create or replace function public.instagram_reglages()
returns json language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not (public.is_admin() or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  return json_build_object(
    'pixabay', exists (select 1 from public.secrets_internes where nom = 'pixabay'),
    'instagram', exists (select 1 from public.secrets_internes where nom = 'instagram_jeton'));
end $$;

-- Plusieurs lettres de bienvenue (Imane = 1, Nawar = 2)
alter table public.surprise_bienvenue drop constraint if exists surprise_bienvenue_id_check;
alter table public.surprise_bienvenue add constraint surprise_bienvenue_id_check check (id between 1 and 10);
-- (les 365 mots de Nawar et sa lettre sont insérés directement dans la base, pas dans le dépôt)
