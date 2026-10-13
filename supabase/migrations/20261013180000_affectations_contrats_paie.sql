-- =====================================================================
-- Affectations du staff aux événements, contrats par événement,
-- fiches de paie mensuelles automatiques
-- =====================================================================

-- Le tableau de bord staff enregistre ses dispos avec onConflict (staff_id, date_jour, creneau)
create unique index if not exists disponibilites_staff_date_creneau_uniq
  on public.disponibilites (staff_id, date_jour, creneau);

-- Taux horaire payé au staff (modifiable par personne)
alter table public.staff add column if not exists taux_horaire numeric(10,2) not null default 60;

-- Affectation d'une personne à une date d'un événement (devis)
create table public.affectations (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  date_jour date not null,
  heure_debut time,
  heure_fin time,
  heures numeric(5,2) not null default 8,
  poste text not null default 'Hôte / hôtesse d''accueil',
  taux_horaire numeric(10,2) not null default 60,
  statut text not null default 'confirme' check (statut in ('propose', 'confirme', 'annule')),
  contrat_id uuid references public.contrats(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (devis_id, staff_id, date_jour)
);
create index affectations_date_idx on public.affectations(date_jour);
create index affectations_staff_idx on public.affectations(staff_id);
revoke all on public.affectations from anon;
alter table public.affectations enable row level security;
create policy "affectations_admin" on public.affectations for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "affectations_own_read" on public.affectations for select to authenticated
  using (staff_id in (select id from public.staff where email = auth.email()));

-- Contrats liés à un événement
alter table public.contrats
  add column if not exists devis_id uuid references public.devis(id) on delete set null,
  add column if not exists dates jsonb,
  add column if not exists lieu text,
  add column if not exists total_heures numeric(7,2);

-- Fiches de paie : détail des prestations et cotisations
alter table public.fiches_paie
  add column if not exists details jsonb,
  add column if not exists cnss numeric(10,2) default 0,
  add column if not exists amo numeric(10,2) default 0,
  add column if not exists generee_auto boolean not null default false;

-- Génère (ou met à jour) les fiches de paie d'un mois à partir des affectations confirmées.
-- Les fiches déjà validées ou payées ne sont jamais modifiées.
create or replace function public.generer_fiches_paie(p_annee int, p_mois int)
returns int
language plpgsql security definer set search_path = public
as $$
declare
  n int := 0;
  r record;
begin
  if auth.uid() is not null and not public.is_admin() then
    raise exception 'Accès refusé';
  end if;

  for r in
    select a.staff_id,
           sum(a.heures) as heures,
           round(sum(a.heures * a.taux_horaire), 2) as brut,
           jsonb_agg(jsonb_build_object(
             'date', a.date_jour, 'evenement', coalesce(d.titre, d.client_societe, d.client_nom),
             'numero', d.numero, 'poste', a.poste, 'heures', a.heures, 'taux', a.taux_horaire,
             'montant', round(a.heures * a.taux_horaire, 2)) order by a.date_jour) as details
    from public.affectations a
    join public.devis d on d.id = a.devis_id
    where a.statut = 'confirme'
      and extract(year from a.date_jour) = p_annee
      and extract(month from a.date_jour) = p_mois
    group by a.staff_id
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
$$;
revoke execute on function public.generer_fiches_paie(int, int) from anon, public;
grant execute on function public.generer_fiches_paie(int, int) to authenticated;

-- Tâche planifiée : chaque jour à 23h50 (heure du Maroc ≈ 22h50 UTC), si demain est le 1er,
-- on génère les fiches du mois qui se termine.
create extension if not exists pg_cron;
select cron.schedule(
  'heavent-fiches-paie-fin-de-mois',
  '50 22 28-31 * *',
  $cron$ select public.generer_fiches_paie(extract(year from now())::int, extract(month from now())::int)
     where extract(day from (now() + interval '1 day')) = 1 $cron$
);
