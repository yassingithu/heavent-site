-- Fiche mission (tenue, point de rendez-vous, contact sur place) et pointage des crews
-- (confirmation de présence avant l'événement, arrivée et départ pointés depuis l'espace staff).
-- Heure du Maroc = GMT (UTC).

-- 1. Fiche mission : une par événement (devis)
create table if not exists public.fiches_mission (
  devis_id uuid primary key references public.devis(id) on delete cascade,
  tenue text,
  point_rdv text,               -- adresse précise / « entrée B, hall 2 »
  heure_rdv time,               -- heure d'arrivée demandée (avant le début du service)
  latitude double precision,
  longitude double precision,
  rayon_m int not null default 300 check (rayon_m between 50 and 5000),
  contact_nom text,
  contact_telephone text,
  consignes text,
  updated_at timestamptz not null default now()
);
create trigger fiches_mission_updated_at before update on public.fiches_mission
  for each row execute function public.update_updated_at_column();
alter table public.fiches_mission enable row level security;
create policy "fiches_mission_admin" on public.fiches_mission for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.fiches_mission from anon;

-- 2. Pointage sur chaque journée de mission
alter table public.affectations
  add column if not exists presence_demandee_le timestamptz,
  add column if not exists presence_confirmee_le timestamptz,
  add column if not exists empechement_le timestamptz,
  add column if not exists empechement_motif text,
  add column if not exists arrivee_le timestamptz,
  add column if not exists arrivee_position jsonb,      -- { lat, lng, precision, distance }
  add column if not exists arrivee_photo text,          -- chemin dans le stockage privé « pointages »
  add column if not exists arrivee_verifiee boolean,
  add column if not exists depart_le timestamptz,
  add column if not exists depart_position jsonb,
  add column if not exists depart_verifie boolean,
  add column if not exists heures_pointees numeric(5,2),
  add column if not exists heures_validees numeric(5,2), -- heures payées (si vide : heures prévues)
  add column if not exists pointage_a_verifier boolean not null default false,
  add column if not exists alerte_retard_le timestamptz;

-- 3. Missions du crew connecté (avec la fiche mission), lecture seule
create or replace function public.mes_missions()
returns json language sql stable security definer set search_path = public as $$
  select coalesce(json_agg(json_build_object(
    'id', a.id, 'date_jour', a.date_jour, 'heure_debut', a.heure_debut, 'heure_fin', a.heure_fin, 'heures', a.heures, 'poste', a.poste,
    'presence_confirmee_le', a.presence_confirmee_le, 'empechement_le', a.empechement_le,
    'arrivee_le', a.arrivee_le, 'arrivee_verifiee', a.arrivee_verifiee, 'depart_le', a.depart_le, 'heures_pointees', a.heures_pointees,
    'evenement', coalesce(nullif(d.titre, ''), 'Événement'), 'lieu', d.lieu, 'numero', d.numero,
    'fiche', (select json_build_object('tenue', f.tenue, 'point_rdv', f.point_rdv, 'heure_rdv', f.heure_rdv, 'latitude', f.latitude, 'longitude', f.longitude,
                'contact_nom', f.contact_nom, 'contact_telephone', f.contact_telephone, 'consignes', f.consignes)
              from public.fiches_mission f where f.devis_id = a.devis_id)
  ) order by a.date_jour, a.heure_debut), '[]'::json)
  from public.affectations a
  join public.devis d on d.id = a.devis_id
  join public.staff s on s.id = a.staff_id
  where lower(s.email) = lower(auth.email())
    and a.statut <> 'annule'
    and a.date_jour >= (now() at time zone 'UTC')::date - 1
    and a.date_jour <= (now() at time zone 'UTC')::date + 60;
$$;
revoke all on function public.mes_missions() from public, anon;
grant execute on function public.mes_missions() to authenticated;

-- 4. La paie prend les heures réellement validées (pointage) quand elles existent
create or replace function public.generer_fiches_paie(p_annee integer, p_mois integer)
returns integer language plpgsql security definer set search_path to 'public' as $function$
declare
  n int := 0;
  r record;
begin
  if auth.uid() is not null and not public.is_admin() then
    raise exception 'Accès refusé';
  end if;

  for r in
    with lignes as (
      -- Missions issues des devis (équipe de l'événement) : heures pointées et validées, sinon heures prévues
      select a.staff_id, a.date_jour, coalesce(a.heures_validees, a.heures) as heures, a.taux_horaire as taux, a.poste,
             coalesce(d.titre, d.client_societe, d.client_nom) as evenement, d.numero
      from public.affectations a join public.devis d on d.id = a.devis_id
      where a.statut = 'confirme'
      union all
      -- Contrats créés à la main (sans devis)
      select c.staff_id, (x->>'date')::date, coalesce((x->>'heures')::numeric, 0),
             coalesce((x->>'taux')::numeric, c.taux_horaire, 0), c.titre, coalesce(c.evenement, c.description), null
      from public.contrats c cross join lateral jsonb_array_elements(coalesce(c.dates, '[]'::jsonb)) x
      where c.devis_id is null and c.statut <> 'annule'
    )
    select l.staff_id,
           sum(l.heures) as heures,
           round(sum(l.heures * l.taux), 2) as brut,
           jsonb_agg(jsonb_build_object('date', l.date_jour, 'evenement', l.evenement, 'numero', l.numero, 'poste', l.poste,
             'heures', l.heures, 'taux', l.taux, 'montant', round(l.heures * l.taux, 2)) order by l.date_jour) as details
    from lignes l
    where extract(year from l.date_jour) = p_annee and extract(month from l.date_jour) = p_mois
    group by l.staff_id
  loop
    insert into public.fiches_paie as f
      (staff_id, mois, annee, heures_travaillees, salaire_brut, cnss, amo, deductions, prime, salaire_net, details, statut, generee_auto)
    values
      (r.staff_id, p_mois, p_annee, r.heures, r.brut,
       round(least(r.brut, 6000) * 0.0448, 2), round(r.brut * 0.0226, 2),
       round(least(r.brut, 6000) * 0.0448, 2) + round(r.brut * 0.0226, 2), 0,
       r.brut - round(least(r.brut, 6000) * 0.0448, 2) - round(r.brut * 0.0226, 2),
       r.details, 'en_attente', true)
    on conflict (staff_id, mois, annee) do update set
      heures_travaillees = excluded.heures_travaillees,
      salaire_brut = excluded.salaire_brut,
      cnss = excluded.cnss, amo = excluded.amo, deductions = excluded.deductions,
      salaire_net = excluded.salaire_net + coalesce(f.prime, 0),
      details = excluded.details, generee_auto = true
    where f.statut = 'en_attente';
    n := n + 1;
  end loop;
  return n;
end;
$function$;

-- 5. Photos de pointage : stockage privé, visibles seulement par l'admin
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('pointages', 'pointages', false, 1048576, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
create policy "pointages_admin_lecture" on storage.objects for select to authenticated
  using (bucket_id = 'pointages' and public.is_admin());

-- 6. Suivi toutes les 10 minutes (confirmations J-3, liste des non-confirmés à 17 h, alertes retard)
select cron.schedule('suivi-pointage-crews', '*/10 * * * *',
  $$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/suivi-pointage',
    headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')),
    body := '{}'::jsonb)$$);
