-- Signalement / demande de retrait de photos souvenirs (additif). Aucune suppression automatique :
-- une demande crée seulement une ligne ; l'administration décide (conserver / masquer / supprimer).
create table if not exists public.souvenirs_signalements (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  photo_id uuid references public.souvenirs_photos(id) on delete set null,
  source text not null check (source in ('maries','invite')),
  motif text not null check (motif in ('mineur','moi_sur_photo','inapproprie','retrait','autre')),
  message text, contact text,
  statut text not null default 'nouveau' check (statut in ('nouveau','traite')),
  decision text check (decision in ('conservee','masquee','supprimee')),
  note_admin text, cree_le timestamptz not null default now(), traite_le timestamptz, traite_par text
);
create index if not exists souvenirs_signalements_devis_idx on public.souvenirs_signalements (devis_id, statut);
alter table public.souvenirs_signalements enable row level security;
create policy souvenirs_signalements_admin on public.souvenirs_signalements for all using (public.is_admin()) with check (public.is_admin());

-- Dépôt d'une demande. p_token = jeton des mariés (lien du devis) OU jeton personnel d'un invité (lien d'invitation).
-- Le dossier est TOUJOURS déduit du jeton : impossible de viser les photos d'un autre événement.
create or replace function public.souvenir_signaler(p_token uuid, p_photo uuid, p_motif text, p_message text, p_contact text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_d uuid; v_src text; v_photo uuid;
begin
  v_d := public._devis_mariage(p_token);
  if v_d is not null then v_src := 'maries';
  else
    select i.devis_id into v_d from public.invites_mariage i join public.devis d on d.id = i.devis_id
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
  end if;
  if (select count(*) from public.souvenirs_signalements where devis_id = v_d and source = v_src and cree_le > now() - interval '1 hour') >= 5 then
    return json_build_object('ok', false, 'erreur', 'trop');
  end if;
  insert into public.souvenirs_signalements (devis_id, photo_id, source, motif, message, contact)
  values (v_d, v_photo, v_src, p_motif, left(trim(coalesce(p_message,'')), 1000), left(trim(coalesce(p_contact,'')), 200));
  return json_build_object('ok', true);
end $$;
grant execute on function public.souvenir_signaler(uuid, uuid, text, text, text) to anon, authenticated;

-- Traitement par l'administration (is_admin : session vérifiée par 2FA si l'admin en a une).
create or replace function public.souvenir_signalement_traiter(p_id uuid, p_decision text, p_note text)
returns json language plpgsql security definer set search_path to 'public' as $$
declare s record;
begin
  if not public.is_admin() then raise exception 'Réservé à l''administration'; end if;
  if p_decision not in ('conservee','masquee','supprimee') then raise exception 'Décision inconnue'; end if;
  select * into s from public.souvenirs_signalements where id = p_id for update;
  if not found then raise exception 'Demande introuvable'; end if;
  if s.photo_id is not null then
    if p_decision = 'masquee' then update public.souvenirs_photos set masquee = true where id = s.photo_id and devis_id = s.devis_id; end if;
    if p_decision = 'supprimee' then
      -- la ligne disparaît ; le fichier est effacé tout de suite par l'administration (sinon par la purge des photos sans ligne, après 3 jours). Le livre déjà généré est retiré pour être refait sans la photo.
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
-- Retour arrière : drop function public.souvenir_signalement_traiter(uuid,text,text), public.souvenir_signaler(uuid,uuid,text,text,text); drop table public.souvenirs_signalements;
