-- Plafond de photos par mariage (400 par défaut), relevable par l'admin sur place.
alter table public.devis add column if not exists souvenirs_limite int not null default 400 check (souvenirs_limite between 0 and 5000);

create or replace function public.souvenir_enregistrer(p_jeton uuid, p_mot text, p_fichiers text[], p_consentement boolean)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_i public.invites_mariage; v_d public.devis; v_s uuid; v_deja int; f text; v_new int := 0; v_total int; v_refus int := 0;
begin
  if p_consentement is not true then raise exception 'Consentement requis'; end if;
  select * into v_i from public.invites_mariage where jeton = p_jeton;
  if v_i.id is null then raise exception 'Invitation introuvable'; end if;
  if coalesce(v_i.liste_statut, 'valide') <> 'valide' then raise exception 'Invitation non validée'; end if;
  select * into v_d from public.devis where id = v_i.devis_id;
  if public._souvenir_fenetre(v_d.date_evenement) <> 'ouverte' then raise exception 'Souvenirs fermés'; end if;
  perform pg_advisory_xact_lock(hashtext(v_d.id::text));
  insert into public.souvenirs_invites (devis_id, invite_id, nom, mot, consentement) values (v_d.id, v_i.id, left(coalesce(v_i.nom, 'Invité'), 80), nullif(left(trim(coalesce(p_mot, '')), 500), ''), true)
  on conflict (invite_id) do update set mot = nullif(left(trim(coalesce(p_mot, '')), 500), ''), consentement = true
  returning id into v_s;
  select count(*) into v_deja from public.souvenirs_photos where souvenir_id = v_s;
  select count(*) into v_total from public.souvenirs_photos where devis_id = v_d.id;
  foreach f in array coalesce(p_fichiers, '{}') loop
    if v_deja + v_new >= 8 then exit; end if;
    if v_total + v_new >= v_d.souvenirs_limite then v_refus := v_refus + 1; continue; end if;
    if f like p_jeton::text || '/%' and length(f) < 120 and exists (select 1 from storage.objects o where o.bucket_id = 'souvenirs' and o.name = f) then
      insert into public.souvenirs_photos (souvenir_id, devis_id, chemin) values (v_s, v_d.id, f) on conflict (chemin) do nothing;
      if found then v_new := v_new + 1; end if;
    end if;
  end loop;
  return json_build_object('ok', true, 'nb_photos', v_deja + v_new, 'refusees', v_refus, 'complet', (v_total + v_new) >= v_d.souvenirs_limite);
end $$;

create or replace function public.souvenir_etat(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('etat', public._souvenir_fenetre(d.date_evenement), 'noms', coalesce(nullif(trim(e.noms), ''), d.client_nom),
    'nom', i.nom, 'date_evenement', d.date_evenement, 'invitation', coalesce(e.invitation, '{}'::jsonb),
    'mot', s.mot, 'nb_photos', (select count(*) from public.souvenirs_photos p where p.souvenir_id = s.id),
    'complet', (select count(*) from public.souvenirs_photos p where p.devis_id = d.id) >= d.souvenirs_limite)
  from public.invites_mariage i join public.devis d on d.id = i.devis_id
  left join public.espace_maries e on e.devis_id = d.id
  left join public.souvenirs_invites s on s.invite_id = i.id
  where i.jeton = p_jeton
$$;

-- Numéro WhatsApp de l'invité (envoi direct d'une carte personnelle)
alter table public.invites_mariage add column if not exists telephone text;

-- invite_enregistrer : accepte aussi `telephone` (nettoyé, 20 caractères max). Voir la définition en base.
