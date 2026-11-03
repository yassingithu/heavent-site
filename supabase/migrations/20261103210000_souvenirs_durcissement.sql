-- Souvenirs : invités en attente de validation exclus, plafond de 8 photos sûr en cas d'envois simultanés, mot effaçable.
create or replace function public.souvenir_enregistrer(p_jeton uuid, p_mot text, p_fichiers text[], p_consentement boolean)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_i public.invites_mariage; v_d public.devis; v_s uuid; v_deja int; f text; v_new int := 0;
begin
  if p_consentement is not true then raise exception 'Consentement requis'; end if;
  select * into v_i from public.invites_mariage where jeton = p_jeton;
  if v_i.id is null then raise exception 'Invitation introuvable'; end if;
  if coalesce(v_i.liste_statut, 'valide') <> 'valide' then raise exception 'Invitation non validée'; end if;
  select * into v_d from public.devis where id = v_i.devis_id;
  if public._souvenir_fenetre(v_d.date_evenement) <> 'ouverte' then raise exception 'Souvenirs fermés'; end if;
  perform pg_advisory_xact_lock(hashtext(p_jeton::text));
  insert into public.souvenirs_invites (devis_id, invite_id, nom, mot, consentement) values (v_d.id, v_i.id, left(coalesce(v_i.nom, 'Invité'), 80), nullif(left(trim(coalesce(p_mot, '')), 500), ''), true)
  on conflict (invite_id) do update set mot = nullif(left(trim(coalesce(p_mot, '')), 500), ''), consentement = true
  returning id into v_s;
  select count(*) into v_deja from public.souvenirs_photos where souvenir_id = v_s;
  foreach f in array coalesce(p_fichiers, '{}') loop
    exit when v_deja + v_new >= 8;
    if f like p_jeton::text || '/%' and length(f) < 120 and exists (select 1 from storage.objects o where o.bucket_id = 'souvenirs' and o.name = f) then
      insert into public.souvenirs_photos (souvenir_id, devis_id, chemin) values (v_s, v_d.id, f) on conflict (chemin) do nothing;
      if found then v_new := v_new + 1; end if;
    end if;
  end loop;
  return json_build_object('ok', true, 'nb_photos', v_deja + v_new);
end $$;
grant execute on function public.souvenir_enregistrer(uuid, text, text[], boolean) to anon, authenticated;
