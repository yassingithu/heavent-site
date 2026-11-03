-- Souvenirs des invités : photos + mot pendant 48 h après le mariage (J, J+1, J+2), livre ensuite.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('souvenirs', 'souvenirs', false, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create table if not exists public.souvenirs_invites (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  invite_id uuid not null references public.invites_mariage(id) on delete cascade,
  nom text not null,
  mot text,
  consentement boolean not null default false,
  created_at timestamptz not null default now(),
  unique (invite_id)
);
create table if not exists public.souvenirs_photos (
  id uuid primary key default gen_random_uuid(),
  souvenir_id uuid not null references public.souvenirs_invites(id) on delete cascade,
  devis_id uuid not null references public.devis(id) on delete cascade,
  chemin text not null unique,
  masquee boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.souvenirs_invites enable row level security;
alter table public.souvenirs_photos enable row level security;
create policy souvenirs_invites_admin on public.souvenirs_invites for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy souvenirs_photos_admin on public.souvenirs_photos for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- fenêtre : du jour J à J+2 inclus (heure du Maroc)
create or replace function public._souvenir_fenetre(p_date date)
returns text language sql stable as $$
  select case
    when p_date is null then 'fermee'
    when (now() at time zone 'Africa/Casablanca')::date < p_date then 'avant'
    when (now() at time zone 'Africa/Casablanca')::date <= p_date + 2 then 'ouverte'
    else 'fermee' end
$$;

create or replace function public._souvenir_jeton_ok(p_jeton text)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.invites_mariage i join public.devis d on d.id = i.devis_id
    where i.jeton::text = p_jeton and public._souvenir_fenetre(d.date_evenement) = 'ouverte')
$$;

-- envoi de fichiers autorisé seulement dans <jeton>/… pendant la fenêtre
create policy souvenirs_envoi on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'souvenirs' and public._souvenir_jeton_ok((storage.foldername(name))[1]));
-- lecture seulement des fichiers enregistrés
create policy souvenirs_lecture on storage.objects for select to anon, authenticated
  using (bucket_id = 'souvenirs' and exists (select 1 from public.souvenirs_photos p where p.chemin = name));

create or replace function public.souvenir_etat(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('etat', public._souvenir_fenetre(d.date_evenement), 'noms', coalesce(nullif(trim(e.noms), ''), d.client_nom),
    'nom', i.nom, 'date_evenement', d.date_evenement, 'invitation', coalesce(e.invitation, '{}'::jsonb),
    'mot', s.mot, 'nb_photos', (select count(*) from public.souvenirs_photos p where p.souvenir_id = s.id))
  from public.invites_mariage i join public.devis d on d.id = i.devis_id
  left join public.espace_maries e on e.devis_id = d.id
  left join public.souvenirs_invites s on s.invite_id = i.id
  where i.jeton = p_jeton
$$;
grant execute on function public.souvenir_etat(uuid) to anon, authenticated;

create or replace function public.souvenir_enregistrer(p_jeton uuid, p_mot text, p_fichiers text[], p_consentement boolean)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_i public.invites_mariage; v_d public.devis; v_s uuid; v_deja int; f text; v_new int := 0;
begin
  if p_consentement is not true then raise exception 'Consentement requis'; end if;
  select * into v_i from public.invites_mariage where jeton = p_jeton;
  if v_i.id is null then raise exception 'Invitation introuvable'; end if;
  select * into v_d from public.devis where id = v_i.devis_id;
  if public._souvenir_fenetre(v_d.date_evenement) <> 'ouverte' then raise exception 'Souvenirs fermés'; end if;
  insert into public.souvenirs_invites (devis_id, invite_id, nom, mot, consentement) values (v_d.id, v_i.id, left(coalesce(v_i.nom, 'Invité'), 80), nullif(left(trim(coalesce(p_mot, '')), 500), ''), true)
  on conflict (invite_id) do update set mot = coalesce(nullif(left(trim(coalesce(p_mot, '')), 500), ''), public.souvenirs_invites.mot), consentement = true
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

-- côté mariés : tous les souvenirs de leur mariage (lien de l'espace)
create or replace function public.souvenirs_maries(p_token uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select coalesce(json_agg(json_build_object('id', s.id, 'nom', s.nom, 'mot', s.mot, 'date', s.created_at,
    'photos', (select coalesce(json_agg(json_build_object('id', p.id, 'chemin', p.chemin, 'masquee', p.masquee) order by p.created_at), '[]'::json) from public.souvenirs_photos p where p.souvenir_id = s.id))
    order by s.created_at), '[]'::json)
  from public.souvenirs_invites s where s.devis_id = public._devis_mariage(p_token)
$$;
grant execute on function public.souvenirs_maries(uuid) to anon, authenticated;

create or replace function public.souvenir_masquer(p_token uuid, p_photo uuid, p_masquee boolean)
returns void language sql security definer set search_path to 'public' as $$
  update public.souvenirs_photos set masquee = p_masquee where id = p_photo and devis_id = public._devis_mariage(p_token)
$$;
grant execute on function public.souvenir_masquer(uuid, uuid, boolean) to anon, authenticated;
