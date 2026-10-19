-- Agenda de rendez-vous : l'agence règle ses disponibilités dans l'admin, le client choisit un créneau libre
-- (depuis son devis ou la page Contact). Heure du Maroc = GMT (UTC) depuis le 20 septembre 2026 (fin du GMT+1).

create table if not exists public.agenda_parametres (
  id int primary key default 1 check (id = 1),
  duree_minutes int not null default 45 check (duree_minutes between 15 and 240),
  pause_minutes int not null default 15 check (pause_minutes between 0 and 120),
  delai_heures int not null default 24 check (delai_heures between 0 and 336),
  horizon_jours int not null default 30 check (horizon_jours between 1 and 120),
  types text[] not null default array['agence', 'telephone', 'visio'],
  adresse text,
  lien_visio text,
  actif boolean not null default true,
  updated_at timestamptz not null default now()
);
insert into public.agenda_parametres (id) values (1) on conflict do nothing;

-- Plages horaires de la semaine (1 = lundi … 7 = dimanche), plusieurs plages possibles par jour
create table if not exists public.agenda_horaires (
  id uuid primary key default gen_random_uuid(),
  jour int not null check (jour between 1 and 7),
  debut time not null,
  fin time not null,
  check (fin > debut)
);
insert into public.agenda_horaires (jour, debut, fin)
select j, h.debut, h.fin from generate_series(1, 6) j,
  (values (time '10:00', time '13:00'), (time '15:00', time '19:00')) as h(debut, fin)
where not exists (select 1 from public.agenda_horaires);

-- Jours ou moments bloqués (congés, événement…)
create table if not exists public.agenda_indisponibilites (
  id uuid primary key default gen_random_uuid(),
  debut timestamptz not null,
  fin timestamptz not null check (fin > debut),
  motif text,
  created_at timestamptz not null default now()
);

create table if not exists public.rendez_vous (
  id uuid primary key default gen_random_uuid(),
  debut timestamptz not null,
  fin timestamptz not null check (fin > debut),
  type text not null check (type in ('agence', 'telephone', 'visio')),
  statut text not null default 'confirme' check (statut in ('confirme', 'annule', 'honore')),
  client_nom text not null,
  client_email text,
  client_telephone text,
  message text,
  langue text not null default 'fr',
  source text not null default 'site',
  devis_id uuid references public.devis(id) on delete set null,
  jeton uuid not null default gen_random_uuid(),
  rappel_envoye_le timestamptz,
  annule_le timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- jamais deux rendez-vous confirmés en même temps
  constraint rendez_vous_sans_chevauchement exclude using gist (tstzrange(debut, fin) with &&) where (statut = 'confirme')
);
create index if not exists rendez_vous_debut_idx on public.rendez_vous(debut);
create index if not exists rendez_vous_devis_idx on public.rendez_vous(devis_id);
create trigger rendez_vous_updated_at before update on public.rendez_vous
  for each row execute function public.update_updated_at_column();

-- Créneaux libres (public : ne renvoie que des heures, aucune donnée client)
create or replace function public.agenda_creneaux()
returns table (debut timestamptz, fin timestamptz)
language sql stable security definer set search_path = public as $$
  with p as (select * from public.agenda_parametres where id = 1 and actif),
  aujourdhui as (select (now() at time zone 'UTC')::date as j),
  jours as (
    select g::date as jour from p, aujourdhui a, generate_series(a.j, a.j + p.horizon_jours, interval '1 day') g
  ),
  plages as (
    select (j.jour + h.debut) as plage_debut, (j.jour + h.fin) as plage_fin
    from jours j join public.agenda_horaires h on h.jour = extract(isodow from j.jour)
  ),
  creneaux as (
    select ((pl.plage_debut + make_interval(mins => n * (p.duree_minutes + p.pause_minutes))) at time zone 'UTC') as debut,
           p.duree_minutes
    from plages pl, p, generate_series(0, 96) n
    where pl.plage_debut + make_interval(mins => n * (p.duree_minutes + p.pause_minutes) + p.duree_minutes) <= pl.plage_fin
  )
  select c.debut, c.debut + make_interval(mins => c.duree_minutes)
  from creneaux c, p
  where c.debut >= now() + make_interval(hours => p.delai_heures)
    and not exists (select 1 from public.rendez_vous r where r.statut = 'confirme'
                    and tstzrange(r.debut, r.fin) && tstzrange(c.debut, c.debut + make_interval(mins => c.duree_minutes)))
    and not exists (select 1 from public.agenda_indisponibilites i
                    where tstzrange(i.debut, i.fin) && tstzrange(c.debut, c.debut + make_interval(mins => c.duree_minutes)))
  order by 1;
$$;
grant execute on function public.agenda_creneaux() to anon, authenticated;

-- Réglages visibles par le client (types proposés, durée) — sans le lien visio
create or replace function public.agenda_public()
returns json language sql stable security definer set search_path = public as $$
  select json_build_object('duree_minutes', duree_minutes, 'types', types, 'actif', actif,
    'adresse', coalesce(nullif(adresse, ''), (select concat_ws(', ', nullif(a.adresse, ''), nullif(a.ville, '')) from public.parametres_agence a where a.id = 1)))
  from public.agenda_parametres where id = 1;
$$;
grant execute on function public.agenda_public() to anon, authenticated;

-- Lien d'abonnement au calendrier du téléphone (clé secrète, réservée à l'admin)
create or replace function public.agenda_cle_calendrier()
returns text language plpgsql security definer set search_path = public as $$
declare v text;
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  select valeur into v from public.secrets_internes where nom = 'agenda_ics';
  if v is null then
    v := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
    insert into public.secrets_internes (nom, valeur) values ('agenda_ics', v);
  end if;
  return v;
end;
$$;
revoke all on function public.agenda_cle_calendrier() from public, anon;
grant execute on function public.agenda_cle_calendrier() to authenticated;

alter table public.agenda_parametres enable row level security;
alter table public.agenda_horaires enable row level security;
alter table public.agenda_indisponibilites enable row level security;
alter table public.rendez_vous enable row level security;
create policy "agenda_parametres_admin" on public.agenda_parametres for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "agenda_horaires_admin" on public.agenda_horaires for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "agenda_indispos_admin" on public.agenda_indisponibilites for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "rendez_vous_admin" on public.rendez_vous for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.agenda_parametres, public.agenda_horaires, public.agenda_indisponibilites, public.rendez_vous from anon;
revoke truncate on public.agenda_parametres, public.agenda_horaires, public.agenda_indisponibilites, public.rendez_vous from authenticated;
