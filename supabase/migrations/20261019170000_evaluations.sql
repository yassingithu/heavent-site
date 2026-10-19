-- Avis du client après l'événement : note du service, note de chaque crew, souhait de reprendre la même équipe.
alter table public.devis
  add column if not exists avis_note int check (avis_note between 1 and 5),
  add column if not exists avis_commentaire text,
  add column if not exists avis_le timestamptz,
  add column if not exists reprendre_equipe boolean not null default false;

create table if not exists public.evaluations_crew (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  note int not null check (note between 1 and 5),
  commentaire text,
  created_at timestamptz not null default now(),
  unique (devis_id, staff_id)
);
create index if not exists evaluations_crew_staff_idx on public.evaluations_crew(staff_id);
alter table public.evaluations_crew enable row level security;
create policy "evaluations_admin" on public.evaluations_crew for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.evaluations_crew from anon;

-- Page client : l'équipe (prénom, initiale, photo, poste) n'est visible qu'à partir du jour de l'événement, pour la noter.
create or replace function public.devis_public(p_token uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object(
    'devis', (select to_jsonb(d) - 'notes_internes' - 'signature_preuve' - 'demande_entreprise_id' - 'demande_mariage_id' - 'relances' - 'derniere_relance_le' - 'avis_demande_le'
              from public.devis d where d.lien_token = p_token and d.statut <> 'annule'),
    'lignes', (select coalesce(json_agg(l order by l.ordre), '[]'::json) from public.devis_lignes l join public.devis d on d.id = l.devis_id where d.lien_token = p_token),
    'agence', (select to_jsonb(p) - 'lien_avis_google' - 'conditions_contrat' from public.parametres_agence p where p.id = 1),
    'factures', (select coalesce(json_agg(to_jsonb(f) - 'notes' - 'creee_par' order by f.numero), '[]'::json)
                 from public.factures f join public.devis d on d.id = f.devis_id where d.lien_token = p_token and f.statut <> 'annulee'),
    'equipe', (select coalesce(json_agg(e order by e->>'prenom'), '[]'::json) from (
                 select json_build_object('id', s.id, 'prenom', s.prenom, 'initiale', left(s.nom, 1), 'photo', s.photo, 'poste', min(a.poste),
                   'note', (select v.note from public.evaluations_crew v where v.devis_id = d.id and v.staff_id = s.id)) as e
                 from public.devis d join public.affectations a on a.devis_id = d.id join public.staff s on s.id = a.staff_id
                 where d.lien_token = p_token and d.statut = 'accepte' and a.statut <> 'annule'
                   and coalesce(d.date_evenement, current_date + 1) <= (now() at time zone 'UTC')::date
                 group by d.id, s.id, s.prenom, s.nom, s.photo) x),
    'avis_google', (select nullif(trim(p.lien_avis_google), '') from public.parametres_agence p, public.devis d
                    where p.id = 1 and d.lien_token = p_token and d.statut = 'accepte'
                      and coalesce(d.date_evenement, current_date + 1) <= (now() at time zone 'UTC')::date)
  )
  where exists (select 1 from public.devis d where d.lien_token = p_token and d.statut <> 'annule');
$$;
grant execute on function public.devis_public(uuid) to anon, authenticated;
