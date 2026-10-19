-- Espace mariés : accessible depuis le lien du devis (mariage accepté). Check-list, budget, programme du jour J,
-- invités avec réponse en ligne (lien personnel par invité) et plan de table.
create table if not exists public.espace_maries (
  devis_id uuid primary key references public.devis(id) on delete cascade,
  noms text,                                   -- « Salma & Youssef » (affiché aux invités)
  checklist jsonb not null default '[]'::jsonb, -- [{id, titre, echeance ('12m','6m','3m','1m','1s','j'), fait}]
  budget jsonb not null default '[]'::jsonb,    -- [{id, poste, prevu, reel, paye}]
  programme jsonb not null default '[]'::jsonb, -- [{id, heure, titre, details}]
  tables jsonb not null default '[]'::jsonb,    -- [{id, nom, places}]
  budget_total numeric(12,2),
  message_invites text,
  date_limite_reponse date,
  updated_at timestamptz not null default now()
);

create table if not exists public.invites_mariage (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  jeton uuid not null unique default gen_random_uuid(),
  nom text not null,
  cote text not null default 'commun' check (cote in ('mariee', 'marie', 'commun')),
  nb_prevus int not null default 1 check (nb_prevus between 1 and 20),
  reponse text not null default 'attente' check (reponse in ('attente', 'oui', 'non')),
  nb_confirmes int check (nb_confirmes between 0 and 20),
  remarque text,                 -- régime, allergie, mot des invités…
  table_id text,
  repondu_le timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists invites_mariage_devis_idx on public.invites_mariage(devis_id);

alter table public.espace_maries enable row level security;
alter table public.invites_mariage enable row level security;
create policy "espace_maries_admin" on public.espace_maries for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "invites_mariage_admin" on public.invites_mariage for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.espace_maries, public.invites_mariage from anon;

-- Devis de mariage accepté correspondant au lien
create or replace function public._devis_mariage(p_token uuid)
returns uuid language sql stable security definer set search_path to 'public' as $$
  select id from public.devis where lien_token = p_token and type = 'mariage' and statut = 'accepte';
$$;
revoke all on function public._devis_mariage(uuid) from public, anon, authenticated;

create or replace function public.espace_maries_public(p_token uuid)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token);
begin
  if v_id is null then return null; end if;
  insert into public.espace_maries (devis_id, noms) select v_id, d.client_nom from public.devis d where d.id = v_id
    on conflict (devis_id) do nothing;
  return json_build_object(
    'devis', (select json_build_object('client_nom', d.client_nom, 'date_evenement', d.date_evenement, 'lieu', d.lieu, 'nb_personnes', d.nb_personnes, 'total_ttc', d.total_ttc, 'devise', d.devise, 'marque', d.marque)
              from public.devis d where d.id = v_id),
    'espace', (select to_jsonb(e) - 'devis_id' from public.espace_maries e where e.devis_id = v_id),
    'invites', (select coalesce(json_agg(to_jsonb(i) - 'devis_id' order by i.created_at), '[]'::json) from public.invites_mariage i where i.devis_id = v_id)
  );
end $$;
grant execute on function public.espace_maries_public(uuid) to anon, authenticated;

create or replace function public.espace_maries_enregistrer(p_token uuid, p_donnees jsonb)
returns void language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token);
begin
  if v_id is null then raise exception 'Espace introuvable'; end if;
  if pg_column_size(p_donnees) > 300000 then raise exception 'Trop de données'; end if;
  update public.espace_maries set
    noms = case when p_donnees ? 'noms' then left(p_donnees->>'noms', 120) else noms end,
    checklist = case when jsonb_typeof(p_donnees->'checklist') = 'array' then p_donnees->'checklist' else checklist end,
    budget = case when jsonb_typeof(p_donnees->'budget') = 'array' then p_donnees->'budget' else budget end,
    programme = case when jsonb_typeof(p_donnees->'programme') = 'array' then p_donnees->'programme' else programme end,
    tables = case when jsonb_typeof(p_donnees->'tables') = 'array' then p_donnees->'tables' else tables end,
    budget_total = case when p_donnees ? 'budget_total' then nullif(p_donnees->>'budget_total', '')::numeric else budget_total end,
    message_invites = case when p_donnees ? 'message_invites' then left(p_donnees->>'message_invites', 1000) else message_invites end,
    date_limite_reponse = case when p_donnees ? 'date_limite_reponse' then nullif(p_donnees->>'date_limite_reponse', '')::date else date_limite_reponse end,
    updated_at = now()
  where devis_id = v_id;
end $$;
grant execute on function public.espace_maries_enregistrer(uuid, jsonb) to anon, authenticated;

-- Ajout / modification d'un invité par les mariés (p_invite.id absent = nouvel invité)
create or replace function public.invite_enregistrer(p_token uuid, p_invite jsonb)
returns json language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token); r public.invites_mariage;
begin
  if v_id is null then raise exception 'Espace introuvable'; end if;
  if coalesce(trim(p_invite->>'nom'), '') = '' then raise exception 'Nom obligatoire'; end if;
  if (p_invite->>'id') is null then
    if (select count(*) from public.invites_mariage where devis_id = v_id) >= 1500 then raise exception 'Trop d''invités'; end if;
    insert into public.invites_mariage (devis_id, nom, cote, nb_prevus, remarque, table_id)
    values (v_id, left(trim(p_invite->>'nom'), 120), coalesce(p_invite->>'cote', 'commun'), coalesce((p_invite->>'nb_prevus')::int, 1),
            left(p_invite->>'remarque', 300), nullif(p_invite->>'table_id', ''))
    returning * into r;
  else
    update public.invites_mariage set
      nom = left(trim(p_invite->>'nom'), 120),
      cote = coalesce(p_invite->>'cote', cote),
      nb_prevus = coalesce((p_invite->>'nb_prevus')::int, nb_prevus),
      remarque = case when p_invite ? 'remarque' then left(p_invite->>'remarque', 300) else remarque end,
      table_id = case when p_invite ? 'table_id' then nullif(p_invite->>'table_id', '') else table_id end,
      reponse = case when p_invite ? 'reponse' then p_invite->>'reponse' else reponse end,
      nb_confirmes = case when p_invite ? 'nb_confirmes' then nullif(p_invite->>'nb_confirmes', '')::int else nb_confirmes end
    where id = (p_invite->>'id')::uuid and devis_id = v_id
    returning * into r;
  end if;
  return to_jsonb(r) - 'devis_id';
end $$;
grant execute on function public.invite_enregistrer(uuid, jsonb) to anon, authenticated;

create or replace function public.invite_supprimer(p_token uuid, p_id uuid)
returns void language sql security definer set search_path to 'public' as $$
  delete from public.invites_mariage where id = p_id and devis_id = public._devis_mariage(p_token);
$$;
grant execute on function public.invite_supprimer(uuid, uuid) to anon, authenticated;

-- Page de l'invité (lien personnel) : il ne voit que son invitation
create or replace function public.rsvp_public(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('nom', i.nom, 'nb_prevus', i.nb_prevus, 'reponse', i.reponse, 'nb_confirmes', i.nb_confirmes, 'remarque', i.remarque,
    'noms', coalesce(nullif(trim(e.noms), ''), d.client_nom), 'date_evenement', d.date_evenement, 'lieu', d.lieu,
    'message', e.message_invites, 'date_limite', e.date_limite_reponse, 'marque', d.marque)
  from public.invites_mariage i join public.devis d on d.id = i.devis_id left join public.espace_maries e on e.devis_id = d.id
  where i.jeton = p_jeton and d.statut = 'accepte';
$$;
grant execute on function public.rsvp_public(uuid) to anon, authenticated;

create or replace function public.rsvp_repondre(p_jeton uuid, p_reponse text, p_nb int, p_remarque text)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if p_reponse not in ('oui', 'non') then raise exception 'Réponse invalide'; end if;
  update public.invites_mariage i set reponse = p_reponse,
    nb_confirmes = case when p_reponse = 'oui' then greatest(1, least(coalesce(p_nb, i.nb_prevus), i.nb_prevus)) else 0 end,
    remarque = left(nullif(trim(p_remarque), ''), 300), repondu_le = now()
  from public.devis d
  where i.jeton = p_jeton and d.id = i.devis_id and d.statut = 'accepte'
    and coalesce(d.date_evenement, current_date) >= (now() at time zone 'UTC')::date;
  if not found then raise exception 'Invitation introuvable ou close'; end if;
end $$;
grant execute on function public.rsvp_repondre(uuid, text, int, text) to anon, authenticated;
