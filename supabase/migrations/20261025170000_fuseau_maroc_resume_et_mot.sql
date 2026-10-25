-- Fuseau du Maroc (Africa/Casablanca) : le « mot du jour » de l'accueil suit la date du Maroc (et non UTC),
-- et le mail du matin est planifié à 6 h 30 et 7 h 30 UTC ; la fonction n'envoie que celui qui tombe à 7 h heure du Maroc
-- (le Maroc passe à UTC+0 pendant le ramadan : sans cela le mail partirait à 6 h 30).
-- Retour arrière : select cron.schedule('resume-du-matin', '30 6 * * *', <même commande>); + remettre (now() at time zone 'UTC')::date dans mon_accueil.
do $$
declare v_cmd text;
begin
  select command into v_cmd from cron.job where jobname = 'resume-du-matin';
  if v_cmd is not null then perform cron.schedule('resume-du-matin', '30 6,7 * * *', v_cmd); end if;
end $$;

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
    'mot', case when p.recoit_mots then public._mot_du_jour((now() at time zone 'Africa/Casablanca')::date, v_pour) end,
    'surprise', case when p.recoit_mots and p.surprise_vue_le is null then (select to_json(s) from public.surprise_bienvenue s where s.pour = v_pour) end,
    'signatures_vues_jusqu_au', p.signatures_vues_jusqu_au, 'records_vus', p.records_vus);
end $$;
