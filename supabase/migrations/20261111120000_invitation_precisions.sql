-- Invitation seule : précisions choisies par l'hôte (allergies, parent sur place, mot pour l'hôte…).
-- Texte libre court (300 caractères), lisible seulement par l'administration (la table n'est pas ouverte au public).
alter table public.reponses_invitation add column if not exists precisions text;

create or replace function public.invitation_repondre(p_jeton uuid, p_nom text, p_reponse text, p_accompagnants text[], p_precisions text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v public.invitations_apercu; v_acc text[]; n int; v_nom text;
begin
  select * into v from public.invitations_apercu where jeton = p_jeton and expire_le > now();
  if v.id is null or v.mode <> 'final' or not v.avec_reponse then raise exception 'Réponses fermées'; end if;
  v_nom := left(regexp_replace(trim(coalesce(p_nom,'')), '\s+', ' ', 'g'), 80);
  if p_reponse not in ('oui','non') or length(v_nom) < 2 then raise exception 'Réponse invalide'; end if;
  if (select count(*) from public.reponses_invitation where apercu_id = v.id) >= 500 then raise exception 'Trop de réponses'; end if;
  v_acc := case when p_reponse = 'oui' then (select coalesce(array_agg(left(trim(x), 80)), '{}') from unnest(coalesce(p_accompagnants,'{}')) x where length(trim(x)) >= 2) else '{}' end;
  if coalesce(array_length(v_acc,1),0) > 3 then raise exception 'Trop d''accompagnants'; end if;
  n := 1 + coalesce(array_length(v_acc,1),0);
  delete from public.reponses_invitation where apercu_id = v.id and lower(nom) = lower(v_nom);
  insert into public.reponses_invitation (apercu_id, nom, reponse, nb_confirmes, accompagnants, precisions)
  values (v.id, v_nom, p_reponse, n, v_acc, left(nullif(trim(coalesce(p_precisions,'')), ''), 300));
  return json_build_object('ok', true);
end $$;
grant execute on function public.invitation_repondre(uuid, text, text, text[], text) to anon, authenticated;

-- L'ancienne signature continue de fonctionner (mariages, anciens liens ouverts dans un onglet)
create or replace function public.invitation_repondre(p_jeton uuid, p_nom text, p_reponse text, p_accompagnants text[])
returns json language sql security definer set search_path to 'public' as $$
  select public.invitation_repondre(p_jeton, p_nom, p_reponse, p_accompagnants, null::text);
$$;
grant execute on function public.invitation_repondre(uuid, text, text, text[]) to anon, authenticated;
