-- Accompagnants nommés (prénom + nom) et mode de liste (fermée / ouverte). Appliquée via apply_migration « accompagnants_et_liste_ouverte ».
alter table public.invites_mariage add column if not exists accompagnants jsonb not null default '[]'::jsonb;
alter table public.invites_mariage add column if not exists liste_statut text not null default 'valide';
alter table public.invites_mariage drop constraint if exists invites_mariage_liste_statut_check;
alter table public.invites_mariage add constraint invites_mariage_liste_statut_check check (liste_statut in ('valide','a_valider','refuse'));
alter table public.espace_maries add column if not exists liste_mode text;
alter table public.espace_maries drop constraint if exists espace_maries_liste_mode_check;
alter table public.espace_maries add constraint espace_maries_liste_mode_check check (liste_mode in ('ouverte','fermee'));
update public.invites_mariage set liste_statut = 'a_valider' where remarque like 'Non listé%' and liste_statut = 'valide';

create or replace function public._liste_mode(p_devis uuid) returns text language sql stable security definer set search_path to 'public' as $$
  select coalesce((select liste_mode from public.espace_maries where devis_id = p_devis),
    case when exists (select 1 from public.invites_mariage where devis_id = p_devis and liste_statut = 'valide') then 'fermee' else 'ouverte' end);
$$;

create or replace function public._accompagnants_propres(p text[], p_n int) returns jsonb language plpgsql immutable set search_path to 'public' as $$
declare r text[] := '{}'; x text;
begin
  foreach x in array coalesce(p, '{}') loop
    x := left(trim(regexp_replace(coalesce(x, ''), '\s+', ' ', 'g')), 80);
    if length(x) < 5 or coalesce(array_length(string_to_array(x, ' '), 1), 0) < 2 then raise exception 'Prénom et nom de chaque accompagnant obligatoires'; end if;
    r := r || x;
  end loop;
  if coalesce(array_length(r, 1), 0) <> p_n then raise exception 'Prénom et nom de chaque accompagnant obligatoires'; end if;
  return to_jsonb(r);
end $$;

create or replace function public.rsvp_repondre(p_jeton uuid, p_reponse text, p_nb int, p_remarque text, p_accompagnants text[])
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_i public.invites_mariage; n int := 0; acc jsonb := '[]'::jsonb;
begin
  if p_reponse not in ('oui', 'non') then raise exception 'Réponse invalide'; end if;
  select i.* into v_i from public.invites_mariage i join public.devis d on d.id = i.devis_id
  where i.jeton = p_jeton and d.statut = 'accepte' and coalesce(d.date_evenement, current_date) >= (now() at time zone 'UTC')::date;
  if v_i.id is null then raise exception 'Invitation introuvable ou close'; end if;
  if v_i.liste_statut = 'refuse' then raise exception 'Invitation indisponible'; end if;
  if p_reponse = 'oui' then
    n := greatest(1, least(coalesce(p_nb, v_i.nb_prevus), v_i.nb_prevus));
    acc := public._accompagnants_propres(p_accompagnants, n - 1);
  end if;
  update public.invites_mariage set reponse = p_reponse, nb_confirmes = n, accompagnants = acc,
    remarque = left(nullif(trim(p_remarque), ''), 300), repondu_le = now() where id = v_i.id;
end $$;
grant execute on function public.rsvp_repondre(uuid, text, int, text, text[]) to anon, authenticated;
create or replace function public.rsvp_repondre(p_jeton uuid, p_reponse text, p_nb int, p_remarque text)
returns void language sql security definer set search_path to 'public' as $$ select public.rsvp_repondre(p_jeton, p_reponse, p_nb, p_remarque, '{}'::text[]); $$;

create or replace function public.rsvp_public(p_jeton uuid) returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('nom', i.nom, 'nb_prevus', i.nb_prevus, 'reponse', i.reponse, 'nb_confirmes', i.nb_confirmes, 'remarque', i.remarque,
    'accompagnants', i.accompagnants, 'statut_liste', i.liste_statut,
    'noms', coalesce(nullif(trim(e.noms), ''), d.client_nom), 'date_evenement', d.date_evenement, 'lieu', d.lieu,
    'message', e.message_invites, 'date_limite', e.date_limite_reponse, 'marque', d.marque, 'invitation', coalesce(e.invitation, '{}'::jsonb))
  from public.invites_mariage i join public.devis d on d.id = i.devis_id left join public.espace_maries e on e.devis_id = d.id
  where i.jeton = p_jeton and d.statut = 'accepte';
$$;

create or replace function public.rsvp_groupe_infos(p_token uuid) returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('noms', coalesce(nullif(trim(e.noms), ''), d.client_nom), 'date_evenement', d.date_evenement, 'lieu', d.lieu,
    'message', e.message_invites, 'date_limite', e.date_limite_reponse, 'invitation', coalesce(e.invitation, '{}'::jsonb), 'mode', public._liste_mode(d.id))
  from public.devis d left join public.espace_maries e on e.devis_id = d.id
  where d.id = public._devis_mariage(p_token);
$$;

create or replace function public.rsvp_groupe_chercher(p_token uuid, p_nom text)
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token); v_cle text := public._nom_cle(left(p_nom, 80)); n int; v_jeton uuid;
begin
  if v_id is null or length(v_cle) < 3 then return json_build_object('statut', 'absent'); end if;
  select count(*), min(jeton::text)::uuid into n, v_jeton from public.invites_mariage where devis_id = v_id and public._nom_cle(nom) = v_cle;
  if n = 0 and array_length(string_to_array(v_cle, ' '), 1) >= 2 then
    select count(*), min(jeton::text)::uuid into n, v_jeton from public.invites_mariage
    where devis_id = v_id and string_to_array(public._nom_cle(nom), ' ') @> string_to_array(v_cle, ' ');
  end if;
  if n = 1 then
    if exists (select 1 from public.invites_mariage where jeton = v_jeton and liste_statut = 'refuse') then return json_build_object('statut', 'refuse'); end if;
    return json_build_object('statut', 'trouve', 'jeton', v_jeton);
  end if;
  if n > 1 then return json_build_object('statut', 'plusieurs'); end if;
  return json_build_object('statut', 'absent');
end $$;

create or replace function public.rsvp_groupe_ajouter(p_token uuid, p_nom text, p_reponse text, p_nb int, p_remarque text, p_accompagnants text[])
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token); v_nom text := left(trim(regexp_replace(coalesce(p_nom, ''), '\s+', ' ', 'g')), 80);
  v_jeton uuid; n int := 1; acc jsonb := '[]'::jsonb; v_ex public.invites_mariage;
begin
  if v_id is null then raise exception 'Invitation introuvable'; end if;
  if public._liste_mode(v_id) <> 'ouverte' then raise exception 'Liste fermée'; end if;
  if length(v_nom) < 5 or coalesce(array_length(string_to_array(v_nom, ' '), 1), 0) < 2 then raise exception 'Prénom et nom obligatoires'; end if;
  if p_reponse not in ('oui', 'non') then raise exception 'Réponse invalide'; end if;
  if exists (select 1 from public.devis where id = v_id and date_evenement < current_date) then raise exception 'Réponses closes'; end if;
  if p_reponse = 'oui' then
    n := 1 + coalesce(array_length(p_accompagnants, 1), 0);
    if n > 5 then raise exception 'Trop d''accompagnants'; end if;
    acc := public._accompagnants_propres(p_accompagnants, n - 1);
  end if;
  select * into v_ex from public.invites_mariage where devis_id = v_id and public._nom_cle(nom) = public._nom_cle(v_nom) limit 1;
  if v_ex.id is not null then
    if v_ex.liste_statut = 'refuse' then raise exception 'Invitation indisponible'; end if;
    update public.invites_mariage set reponse = p_reponse, nb_prevus = greatest(nb_prevus, n), nb_confirmes = case when p_reponse = 'oui' then n else 0 end,
      accompagnants = acc, repondu_le = now() where id = v_ex.id;
    return json_build_object('jeton', v_ex.jeton);
  end if;
  if (select count(*) from public.invites_mariage where devis_id = v_id and liste_statut = 'a_valider') >= 60 then raise exception 'Trop de demandes'; end if;
  insert into public.invites_mariage (devis_id, nom, cote, nb_prevus, nb_confirmes, reponse, remarque, repondu_le, accompagnants, liste_statut)
  values (v_id, v_nom, 'commun', n, case when p_reponse = 'oui' then n else 0 end, p_reponse,
          left('Non listé' || coalesce(' : ' || nullif(trim(p_remarque), ''), ''), 300), now(), acc, 'a_valider')
  returning jeton into v_jeton;
  return json_build_object('jeton', v_jeton);
end $$;
grant execute on function public.rsvp_groupe_ajouter(uuid, text, text, int, text, text[]) to anon, authenticated;
create or replace function public.rsvp_groupe_ajouter(p_token uuid, p_nom text, p_reponse text, p_nb int, p_remarque text)
returns json language sql security definer set search_path to 'public' as $$ select public.rsvp_groupe_ajouter(p_token, p_nom, p_reponse, p_nb, p_remarque, '{}'::text[]); $$;

-- invite_enregistrer et espace_maries_enregistrer : voir leurs définitions en base (ajout de accompagnants / liste_statut et de liste_mode, listes blanches de champs inchangées).
