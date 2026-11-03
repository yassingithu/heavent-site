-- Invitations digitales : modèle + couleurs modifiables à tout moment par les mariés,
-- et aperçus à envoyer aux prospects (lien valable 30 jours).
alter table public.espace_maries add column if not exists invitation jsonb not null default '{}'::jsonb;

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
    invitation = case when jsonb_typeof(p_donnees->'invitation') = 'object' and pg_column_size(p_donnees->'invitation') < 4000 then p_donnees->'invitation' else invitation end,
    updated_at = now()
  where devis_id = v_id;
end $$;
grant execute on function public.espace_maries_enregistrer(uuid, jsonb) to anon, authenticated;

create or replace function public.rsvp_public(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('nom', i.nom, 'nb_prevus', i.nb_prevus, 'reponse', i.reponse, 'nb_confirmes', i.nb_confirmes, 'remarque', i.remarque,
    'noms', coalesce(nullif(trim(e.noms), ''), d.client_nom), 'date_evenement', d.date_evenement, 'lieu', d.lieu,
    'message', e.message_invites, 'date_limite', e.date_limite_reponse, 'marque', d.marque, 'invitation', coalesce(e.invitation, '{}'::jsonb))
  from public.invites_mariage i join public.devis d on d.id = i.devis_id left join public.espace_maries e on e.devis_id = d.id
  where i.jeton = p_jeton and d.statut = 'accepte';
$$;
grant execute on function public.rsvp_public(uuid) to anon, authenticated;

create table if not exists public.invitations_apercu (
  id uuid primary key default gen_random_uuid(),
  jeton uuid not null unique default gen_random_uuid(),
  noms text not null,
  date_evenement date,
  lieu text,
  message text,
  invitation jsonb not null default '{}'::jsonb,
  prospect text,                                 -- pour qui (note interne)
  expire_le timestamptz not null default now() + interval '30 days',
  created_at timestamptz not null default now()
);
alter table public.invitations_apercu enable row level security;
create policy "invitations_apercu_admin" on public.invitations_apercu for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.invitations_apercu from anon;

create or replace function public.invitation_apercu_public(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('noms', noms, 'date_evenement', date_evenement, 'lieu', lieu, 'message', message, 'invitation', invitation)
  from public.invitations_apercu where jeton = p_jeton and expire_le > now();
$$;
grant execute on function public.invitation_apercu_public(uuid) to anon, authenticated;
