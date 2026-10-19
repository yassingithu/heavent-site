-- Mot du jour de Yassin, calculé à une date donnée (utilisé par l'accueil admin et le mail du matin)
create or replace function public._mot_du_jour(p_jour date)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare v_mot text; v_n int; v_an int := extract(year from p_jour)::int;
begin
  select texte into v_mot from public.mots_yassin where date_speciale = to_char(p_jour, 'MM-DD') order by id limit 1;
  if v_mot is null then
    select count(*) into v_n from public.mots_yassin where date_speciale is null;
    if v_n > 0 then
      select texte into v_mot from public.mots_yassin where date_speciale is null
        order by ordre, id offset (((p_jour - date '2026-10-19') % v_n) + v_n) % v_n limit 1;
    end if;
  end if;
  return replace(replace(replace(replace(v_mot,
    '{age_imane}', (v_an - 1989)::text), '{ans_mariage}', (v_an - 2013)::text),
    '{ans_rencontre}', (v_an - 2011)::text), '{age_nawar}', (v_an - 2014)::text);
end $$;
revoke all on function public._mot_du_jour(date) from public, anon, authenticated;

create or replace function public.mon_accueil()
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare p public.admin_profils;
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  select * into p from public.admin_profils where lower(email) = public._mon_email();
  if p.email is null then return json_build_object('prenom', null); end if;
  return json_build_object(
    'prenom', p.prenom,
    'mot', case when p.recoit_mots then public._mot_du_jour((now() at time zone 'UTC')::date) end,
    'surprise', case when p.recoit_mots and p.surprise_vue_le is null then (select to_json(s) from public.surprise_bienvenue s where id = 1) end,
    'signatures_vues_jusqu_au', p.signatures_vues_jusqu_au, 'records_vus', p.records_vus);
end $$;

-- Mail du matin (7 h 30, heure du Maroc)
select cron.schedule('resume-du-matin', '30 7 * * *', $c$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/resume-matin', headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')), body := '{}'::jsonb)$c$);
grant execute on function public._mot_du_jour(date) to service_role;

-- Notification d'essai envoyée uniquement sur mes propres appareils
create or replace function public.notification_essai()
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_prenom text;
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  select prenom into v_prenom from public.admin_profils where lower(email) = public._mon_email();
  perform net.http_post(
    url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/notifier-admin',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cle-rappel', (select valeur from public.secrets_internes where nom = 'rappel_signatures')),
    body := jsonb_build_object('titre', '💛 Ça marche' || coalesce(', ' || v_prenom, '') || ' !',
      'corps', 'Tu recevras ici chaque signature, chaque nouvelle demande et chaque rendez-vous.', 'lien', '/admin', 'email', public._mon_email()));
end $$;
revoke all on function public.notification_essai() from public, anon;
grant execute on function public.notification_essai() to authenticated;

-- (appliqué ensuite) Le 1er mot tombe le jour où Imane ouvre sa surprise : départ = min(surprise_vue_le) au lieu du 19/10/2026
