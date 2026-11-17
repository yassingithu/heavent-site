-- Signalements de photos : limite par personne, nom de l'invité, anti-doublon, règles imposées côté serveur (additif, idempotent).
alter table public.souvenirs_signalements add column if not exists jeton_source uuid, add column if not exists invite_nom text;

create or replace function public.souvenir_signaler(p_token uuid, p_photo uuid, p_motif text, p_message text, p_contact text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_d uuid; v_src text; v_photo uuid; v_nom text; v_max int;
begin
  v_d := public._devis_mariage(p_token);
  if v_d is not null then v_src := 'maries';
  else
    select i.devis_id, i.nom into v_d, v_nom from public.invites_mariage i join public.devis d on d.id = i.devis_id
      where i.jeton = p_token and d.type = 'mariage' and d.statut = 'accepte';
    v_src := 'invite';
  end if;
  if v_d is null then return json_build_object('ok', false, 'erreur', 'lien'); end if;
  if p_motif not in ('mineur','moi_sur_photo','inapproprie','retrait','autre') then return json_build_object('ok', false, 'erreur', 'motif'); end if;
  if length(trim(coalesce(p_message,''))) < 5 and p_photo is null then return json_build_object('ok', false, 'erreur', 'message'); end if;
  if p_photo is not null then
    if v_src <> 'maries' then return json_build_object('ok', false, 'erreur', 'photo'); end if;
    select id into v_photo from public.souvenirs_photos where id = p_photo and devis_id = v_d;
    if v_photo is null then return json_build_object('ok', false, 'erreur', 'photo'); end if;
    -- une demande déjà ouverte pour cette photo : on ne crée pas de doublon (réponse positive, rien à refaire)
    if exists (select 1 from public.souvenirs_signalements where photo_id = v_photo and statut = 'nouveau') then
      return json_build_object('ok', true, 'doublon', true);
    end if;
  end if;
  v_max := case when p_motif = 'mineur' then 20 else 8 end;
  if (select count(*) from public.souvenirs_signalements where devis_id = v_d and source = v_src and jeton_source = p_token and cree_le > now() - interval '1 hour') >= v_max then
    return json_build_object('ok', false, 'erreur', 'trop');
  end if;
  insert into public.souvenirs_signalements (devis_id, photo_id, source, motif, message, contact, jeton_source, invite_nom)
  values (v_d, v_photo, v_src, p_motif, left(trim(coalesce(p_message,'')), 1000), left(trim(coalesce(p_contact,'')), 200), p_token, v_nom);
  return json_build_object('ok', true);
end $$;
grant execute on function public.souvenir_signaler(uuid, uuid, text, text, text) to anon, authenticated;

create or replace function public.souvenir_signalement_traiter(p_id uuid, p_decision text, p_note text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare s record;
begin
  if not public.is_admin() then raise exception 'Réservé à l''administration'; end if;
  if p_decision not in ('conservee','masquee','supprimee') then raise exception 'Décision inconnue'; end if;
  select * into s from public.souvenirs_signalements where id = p_id for update;
  if not found then raise exception 'Demande introuvable'; end if;
  if s.statut = 'traite' then raise exception 'Demande déjà traitée'; end if;
  -- ne pas donner suite à une demande d'un mineur ou des mariés exige une note
  if p_decision = 'conservee' and (s.motif = 'mineur' or s.source = 'maries') and length(trim(coalesce(p_note,''))) < 3 then
    raise exception 'Une note est obligatoire pour ne pas donner suite à cette demande';
  end if;
  if s.photo_id is not null then
    if p_decision = 'masquee' then
      update public.souvenirs_photos set masquee = true where id = s.photo_id and devis_id = s.devis_id;
      delete from public.souvenirs_livres where devis_id = s.devis_id;  -- le livre déjà préparé contenait la photo : à refaire
    end if;
    if p_decision = 'supprimee' then
      -- les autres demandes sur la même photo sont closes AVANT la suppression (sinon leur photo_id passe à null)
      update public.souvenirs_signalements set statut = 'traite', decision = 'supprimee', note_admin = 'Photo supprimée (autre demande)', traite_le = now(),
        traite_par = lower(coalesce(auth.jwt() ->> 'email','')) where photo_id = s.photo_id and id <> s.id and statut = 'nouveau';
      delete from public.souvenirs_photos where id = s.photo_id and devis_id = s.devis_id;
      delete from public.souvenirs_livres where devis_id = s.devis_id;
    end if;
  end if;
  update public.souvenirs_signalements set statut = 'traite', decision = p_decision, note_admin = left(coalesce(p_note,''), 500),
    traite_le = now(), traite_par = lower(coalesce(auth.jwt() ->> 'email','')) where id = p_id;
  return json_build_object('ok', true);
end $$;
revoke all on function public.souvenir_signalement_traiter(uuid, text, text) from public, anon;
grant execute on function public.souvenir_signalement_traiter(uuid, text, text) to authenticated;

create or replace function public.signalements_photos_resume() returns table(nb bigint, nb_mineurs bigint)
language sql stable security definer set search_path to 'public' as $$
  select count(*), count(*) filter (where motif = 'mineur') from public.souvenirs_signalements where statut = 'nouveau'
$$;
revoke all on function public.signalements_photos_resume() from public, anon, authenticated;
grant execute on function public.signalements_photos_resume() to service_role;
-- Retour arrière : réappliquer 20261117090000_souvenirs_signalements.sql (fonctions) ; les colonnes ajoutées peuvent rester.
