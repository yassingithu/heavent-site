-- Lien de réponse général d'un couple : l'invité saisit son prénom et son nom, retrouvés dans la liste des invités
create or replace function public._nom_cle(p text)
returns text language sql immutable set search_path to 'public' as $$
  select coalesce(string_agg(t, ' ' order by t), '')
  from unnest(string_to_array(trim(regexp_replace(
    translate(lower(coalesce(p, '')), 'àâäáãåçéèêëíìîïñóòôöõúùûüýÿœæ', 'aaaaaaceeeeiiiinooooouuuuyyoa'),
    '[^a-z0-9؀-ۿ]+', ' ', 'g')), ' ')) t
  where t <> '';
$$;

create or replace function public.rsvp_groupe_infos(p_token uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('noms', coalesce(nullif(trim(e.noms), ''), d.client_nom), 'date_evenement', d.date_evenement, 'lieu', d.lieu,
    'message', e.message_invites, 'date_limite', e.date_limite_reponse, 'invitation', coalesce(e.invitation, '{}'::jsonb))
  from public.devis d left join public.espace_maries e on e.devis_id = d.id
  where d.id = public._devis_mariage(p_token);
$$;
grant execute on function public.rsvp_groupe_infos(uuid) to anon, authenticated;

create or replace function public.rsvp_groupe_chercher(p_token uuid, p_nom text)
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token); v_cle text := public._nom_cle(left(p_nom, 80)); n int; v_jeton uuid;
begin
  if v_id is null or length(v_cle) < 3 then return json_build_object('statut', 'absent'); end if;
  -- 1) même nom (prénom et nom dans n'importe quel ordre, accents et majuscules ignorés)
  select count(*), min(jeton::text)::uuid into n, v_jeton from public.invites_mariage where devis_id = v_id and public._nom_cle(nom) = v_cle;
  -- 2) à défaut : tous les mots saisis (au moins deux) se retrouvent dans le nom enregistré
  if n = 0 and array_length(string_to_array(v_cle, ' '), 1) >= 2 then
    select count(*), min(jeton::text)::uuid into n, v_jeton from public.invites_mariage
    where devis_id = v_id and string_to_array(public._nom_cle(nom), ' ') @> string_to_array(v_cle, ' ');
  end if;
  if n = 1 then return json_build_object('statut', 'trouve', 'jeton', v_jeton); end if;
  if n > 1 then return json_build_object('statut', 'plusieurs'); end if;
  return json_build_object('statut', 'absent');
end $$;
grant execute on function public.rsvp_groupe_chercher(uuid, text) to anon, authenticated;

-- Invité absent de la liste : il est ajouté, repéré « Non listé » pour que les mariés valident
create or replace function public.rsvp_groupe_ajouter(p_token uuid, p_nom text, p_reponse text, p_nb int, p_remarque text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token); v_nom text := left(trim(regexp_replace(coalesce(p_nom, ''), '\s+', ' ', 'g')), 80); v_jeton uuid;
begin
  if v_id is null or length(v_nom) < 3 then raise exception 'Invitation introuvable'; end if;
  if p_reponse not in ('oui', 'non') then raise exception 'Réponse invalide'; end if;
  if exists (select 1 from public.devis where id = v_id and date_evenement < current_date) then raise exception 'Réponses closes'; end if;
  if (select count(*) from public.invites_mariage where devis_id = v_id and remarque like 'Non listé%') >= 30 then raise exception 'Trop de demandes'; end if;
  insert into public.invites_mariage (devis_id, nom, cote, nb_prevus, nb_confirmes, reponse, remarque, repondu_le)
  values (v_id, v_nom, 'commun', greatest(1, least(coalesce(p_nb, 1), 10)), case when p_reponse = 'oui' then greatest(1, least(coalesce(p_nb, 1), 10)) else 0 end, p_reponse,
          left('Non listé' || coalesce(' : ' || nullif(trim(p_remarque), ''), ''), 300), now())
  returning jeton into v_jeton;
  return json_build_object('jeton', v_jeton);
end $$;
grant execute on function public.rsvp_groupe_ajouter(uuid, text, text, int, text) to anon, authenticated;
-- Retour arrière : drop function public.rsvp_groupe_ajouter(uuid, text, text, int, text); drop function public.rsvp_groupe_chercher(uuid, text); drop function public.rsvp_groupe_infos(uuid); drop function public._nom_cle(text);
