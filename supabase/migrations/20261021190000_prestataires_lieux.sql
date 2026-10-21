-- Prestataires partenaires (inscription publique, validation admin) et lieux (salles, palais…), reliés au catalogue des devis
alter table public.catalogue_prestations add column if not exists prestataire_id uuid, add column if not exists lieu_id uuid;

create table if not exists public.prestataires (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  societe text not null, contact text not null, email text not null, telephone text, ville text, zones text,
  categories text[] not null default '{}', description text, site_web text, instagram text,
  logo text, photos text[] not null default '{}',
  prestations jsonb not null default '[]',      -- [{fonction, unite, prix (proposé), prix_vente (admin), description}]
  statut text not null default 'email_a_confirmer' check (statut in ('email_a_confirmer', 'en_attente', 'valide', 'refuse', 'suspendu')),
  jeton uuid not null default gen_random_uuid(),
  email_confirme_le timestamptz, mail_envoye_le timestamptz, valide_le timestamptz, notes text
);
alter table public.prestataires enable row level security;
create policy prestataires_admin on public.prestataires for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.lieux (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  nom text not null, type text not null default 'salle', ville text, adresse text,
  latitude double precision, longitude double precision, lien_maps text,
  capacite_min integer, capacite_max integer,
  tarifs jsonb not null default '[]',           -- [{libelle, unite, prix}]
  description text, contact_nom text, contact_telephone text, contact_email text,
  photos text[] not null default '{}', notes text, actif boolean not null default true
);
alter table public.lieux enable row level security;
create policy lieux_admin on public.lieux for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Inscription publique d'un prestataire (anonyme, limitée)
create or replace function public.prestataire_inscrire(p jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_mail text := lower(trim(coalesce(p->>'email', '')));
begin
  if length(trim(coalesce(p->>'societe', ''))) < 2 or length(trim(coalesce(p->>'contact', ''))) < 2 or v_mail !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'Nom, contact et e-mail sont obligatoires';
  end if;
  if jsonb_typeof(p->'prestations') is distinct from 'array' or jsonb_array_length(p->'prestations') = 0 then
    raise exception 'Ajoutez au moins une prestation avec son tarif';
  end if;
  if (select count(*) from prestataires where lower(email) = v_mail and cree_le > now() - interval '1 hour') >= 3
     or (select count(*) from prestataires where cree_le > now() - interval '10 minutes') >= 20 then
    raise exception 'Trop de demandes en peu de temps' using errcode = 'P0429';
  end if;
  insert into prestataires (societe, contact, email, telephone, ville, zones, categories, description, site_web, instagram, logo, photos, prestations)
  values (left(trim(p->>'societe'), 120), left(trim(p->>'contact'), 120), v_mail, left(nullif(trim(p->>'telephone'), ''), 40),
    left(nullif(trim(p->>'ville'), ''), 80), left(nullif(trim(p->>'zones'), ''), 300),
    coalesce((select array_agg(left(x, 60)) from jsonb_array_elements_text(coalesce(p->'categories', '[]')) x), '{}'),
    left(nullif(trim(p->>'description'), ''), 3000), left(nullif(trim(p->>'site_web'), ''), 200), left(nullif(trim(p->>'instagram'), ''), 100),
    case when p->>'logo' like 'inscriptions/%' then left(p->>'logo', 300) end,
    coalesce((select array_agg(left(x, 300)) from jsonb_array_elements_text(coalesce(p->'photos', '[]')) x where x like 'inscriptions/%'), '{}'),
    (select coalesce(jsonb_agg(jsonb_build_object(
        'fonction', left(trim(e->>'fonction'), 120), 'unite', coalesce(nullif(e->>'unite', ''), 'forfait'),
        'prix', greatest(0, coalesce((e->>'prix')::numeric, 0)), 'description', left(coalesce(e->>'description', ''), 400))), '[]')
     from (select e from jsonb_array_elements(p->'prestations') e where length(trim(coalesce(e->>'fonction', ''))) > 1 limit 30) t))
  returning id into v_id;
  return v_id;
end $$;

-- Lien reçu par e-mail : le prestataire confirme son adresse
create or replace function public.prestataire_confirmer(p_jeton uuid)
returns json language plpgsql security definer set search_path = public as $$
declare r prestataires;
begin
  update prestataires set statut = 'en_attente', email_confirme_le = now()
   where jeton = p_jeton and statut = 'email_a_confirmer' returning * into r;
  if r.id is null then select * into r from prestataires where jeton = p_jeton; end if;
  if r.id is null then return null; end if;
  return json_build_object('societe', r.societe, 'statut', r.statut);
end $$;

-- Catalogue des devis : un prestataire validé = une ligne par fonction, au prix de vente choisi par l'admin
create or replace function public._prestataire_catalogue() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update catalogue_prestations set actif = false where prestataire_id = new.id;
  if new.statut = 'valide' then
    insert into catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, prestataire_id)
    select 'prestataires', left(e->>'fonction' || ' — ' || new.societe, 200), nullif(e->>'description', ''),
           coalesce(nullif(e->>'unite', ''), 'forfait'), coalesce((e->>'prix_vente')::numeric, (e->>'prix')::numeric, 0), true, 0, new.id
      from jsonb_array_elements(new.prestations) e where coalesce(e->>'fonction', '') <> '';
  end if;
  return new;
end $$;
create trigger prestataire_catalogue after insert or update of statut, prestations, societe on public.prestataires
  for each row execute function public._prestataire_catalogue();

create or replace function public._lieu_catalogue() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update catalogue_prestations set actif = false where lieu_id = new.id;
  if new.actif then
    insert into catalogue_prestations (categorie, designation, description, unite, prix_unitaire, actif, ordre, lieu_id)
    select 'lieux', left(coalesce(nullif(e->>'libelle', ''), 'Location') || ' — ' || new.nom || coalesce(' (' || new.ville || ')', ''), 200),
           nullif(concat_ws(' · ', new.adresse, case when new.capacite_max is not null then 'jusqu''à ' || new.capacite_max || ' personnes' end), ''),
           coalesce(nullif(e->>'unite', ''), 'forfait'), coalesce((e->>'prix')::numeric, 0), true, 0, new.id
      from jsonb_array_elements(new.tarifs) e;
  end if;
  return new;
end $$;
create trigger lieu_catalogue after insert or update on public.lieux for each row execute function public._lieu_catalogue();

-- Notification quand un prestataire a confirmé son e-mail (à valider)
create or replace function public.notif_prestataire() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.statut = 'en_attente' and old.statut = 'email_a_confirmer' then
    perform public.notifier_admins('🤝 Nouveau prestataire à valider', new.societe || coalesce(' · ' || new.ville, ''), '/admin');
  end if;
  return new;
end $$;
create trigger notif_prestataire after update of statut on public.prestataires for each row execute function public.notif_prestataire();

revoke execute on function public._prestataire_catalogue(), public._lieu_catalogue(), public.notif_prestataire() from public, anon, authenticated;
revoke execute on function public.prestataire_inscrire(jsonb), public.prestataire_confirmer(uuid) from public;
grant execute on function public.prestataire_inscrire(jsonb), public.prestataire_confirmer(uuid) to anon, authenticated;

-- Photos et logos des prestataires et des lieux
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('prestataires', 'prestataires', true, 6291456, array['image/*']) on conflict (id) do nothing;
create policy prestataires_depot_public on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'prestataires' and name like 'inscriptions/%');
create policy prestataires_admin_tout on storage.objects for all to authenticated
  using (bucket_id = 'prestataires' and public.is_admin()) with check (bucket_id = 'prestataires' and public.is_admin());
