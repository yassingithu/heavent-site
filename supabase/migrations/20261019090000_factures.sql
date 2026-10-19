-- Factures créées à partir des devis acceptés : facture d'acompte, facture de solde (acomptes déduits)
-- ou facture unique quand il n'y a pas d'acompte.
-- Numérotation continue et sans trou par année (FAC-2026-0001) ; une facture émise ne se supprime pas
-- et ses montants ne se modifient plus (seuls le paiement, l'envoi et l'annulation évoluent).

create table if not exists public.factures_compteur (annee int primary key, dernier int not null);
alter table public.factures_compteur enable row level security;

create table if not exists public.factures (
  id uuid primary key default gen_random_uuid(),
  numero text not null unique,
  devis_id uuid not null references public.devis(id) on delete restrict,
  devis_numero text,
  type text not null check (type in ('acompte', 'solde', 'totale')),
  marque text not null default 'heavent',
  date_emission date not null default ((now() at time zone 'Africa/Casablanca')::date),
  -- client et événement, figés au moment de l'émission
  client_nom text not null, client_societe text, client_email text, client_telephone text, client_adresse text, client_ice text,
  titre text, date_evenement date, date_fin_evenement date, lieu text,
  lignes jsonb not null default '[]'::jsonb,
  remise_globale_pct numeric(5,2) not null default 0,
  taux_tva numeric(5,2) not null default 20,
  total_ht numeric(12,2) not null default 0,
  total_remise numeric(12,2) not null default 0,
  total_tva numeric(12,2) not null default 0,
  total_ttc numeric(12,2) not null default 0,
  acompte_pct numeric(5,2),
  deductions jsonb not null default '[]'::jsonb,
  deduction_ttc numeric(12,2) not null default 0,
  net_a_payer numeric(12,2) not null default 0,
  devise text not null default 'MAD',
  -- suivi
  statut text not null default 'a_payer' check (statut in ('a_payer', 'payee', 'annulee')),
  payee_le date,
  mode_paiement text,
  envoyee_le timestamptz,
  annulee_le timestamptz,
  notes text,
  creee_par text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists factures_devis_idx on public.factures(devis_id);
create index if not exists factures_statut_idx on public.factures(statut);

create trigger factures_updated_at before update on public.factures
  for each row execute function public.update_updated_at_column();

-- Une facture émise est figée : seuls le paiement, l'envoi, l'annulation et la note interne évoluent.
create or replace function public.factures_proteger()
returns trigger language plpgsql set search_path = public as $$
declare
  libres text[] := array['statut', 'payee_le', 'mode_paiement', 'envoyee_le', 'annulee_le', 'notes', 'updated_at'];
begin
  if tg_op = 'DELETE' then
    raise exception 'Une facture émise ne peut pas être supprimée : annulez-la.';
  end if;
  if (to_jsonb(new) - libres) is distinct from (to_jsonb(old) - libres) then
    raise exception 'Une facture émise ne peut plus être modifiée (numéro, client, montants).';
  end if;
  if old.statut = 'annulee' and new.statut <> 'annulee' then
    raise exception 'Une facture annulée ne peut pas être rétablie : créez-en une nouvelle.';
  end if;
  if new.statut = 'annulee' and old.statut <> 'annulee' then new.annulee_le := now(); end if;
  if new.statut = 'payee' and new.payee_le is null then new.payee_le := (now() at time zone 'Africa/Casablanca')::date; end if;
  if new.statut = 'a_payer' then new.payee_le := null; new.mode_paiement := null; end if;
  return new;
end;
$$;
create trigger factures_proteger_maj before update on public.factures
  for each row execute function public.factures_proteger();
create trigger factures_proteger_suppr before delete on public.factures
  for each row execute function public.factures_proteger();

-- Création d'une facture depuis un devis accepté.
--  p_type = 'acompte' | 'solde' (solde, ou facture unique s'il n'y a pas eu d'acompte) | 'auto'
--  ('auto' : l'acompte s'il est prévu et pas encore facturé, sinon le solde)
create or replace function public.facture_creer(p_devis_id uuid, p_type text default 'auto', p_par text default null)
returns json language plpgsql security definer set search_path = public as $$
declare
  d public.devis%rowtype;
  f public.factures%rowtype;
  v_type text := coalesce(p_type, 'auto');
  v_acompte_existe boolean;
  v_finale text;
  v_annee int;
  v_n int;
  v_lignes jsonb;
  v_ht numeric(12,2); v_remise numeric(12,2) := 0; v_tva numeric(12,2); v_ttc numeric(12,2);
  v_deductions jsonb := '[]'::jsonb;
  v_ded numeric(12,2) := 0;
  v_jour date := (now() at time zone 'Africa/Casablanca')::date;
begin
  if not (public.is_admin() or coalesce(auth.role(), '') = 'service_role') then
    raise exception 'Accès refusé';
  end if;
  select * into d from public.devis where id = p_devis_id for update;
  if not found then raise exception 'Devis introuvable.'; end if;
  if d.statut <> 'accepte' then raise exception 'Le devis doit être accepté avant d''être facturé.'; end if;
  if coalesce(d.total_ttc, 0) <= 0 then raise exception 'Le devis est à 0 : rien à facturer.'; end if;

  select numero into v_finale from public.factures
    where devis_id = d.id and type in ('solde', 'totale') and statut <> 'annulee' limit 1;
  if v_finale is not null then raise exception 'Ce devis est déjà entièrement facturé (facture %).', v_finale; end if;
  v_acompte_existe := exists (select 1 from public.factures where devis_id = d.id and type = 'acompte' and statut <> 'annulee');

  if v_type = 'auto' then
    v_type := case when coalesce(d.acompte_pct, 0) > 0 and not v_acompte_existe then 'acompte' else 'solde' end;
  end if;
  if v_type = 'acompte' then
    if coalesce(d.acompte_pct, 0) <= 0 then raise exception 'Ce devis ne prévoit pas d''acompte.'; end if;
    if v_acompte_existe then raise exception 'La facture d''acompte de ce devis existe déjà.'; end if;
  elsif v_type in ('solde', 'totale') then
    v_type := case when v_acompte_existe then 'solde' else 'totale' end;
  else
    raise exception 'Type de facture inconnu.';
  end if;

  if v_type = 'acompte' then
    v_ttc := round(d.total_ttc * d.acompte_pct / 100, 2);
    v_ht := round(v_ttc / (1 + d.taux_tva / 100), 2);
    v_tva := v_ttc - v_ht;
    v_lignes := jsonb_build_array(jsonb_build_object(
      'designation', 'Acompte de ' || trim(to_char(d.acompte_pct, 'FM999990.##')) || ' % sur le devis N° ' || d.numero,
      'description', concat_ws(' · ', nullif(d.titre, ''), 'Total du devis : ' || translate(to_char(d.total_ttc, 'FM999G999G990D00'), ',.', ' ,') || ' ' || d.devise || ' TTC'),
      'quantite', 1, 'duree', 1, 'unite', 'forfait', 'prix_unitaire', v_ht, 'remise_pct', 0, 'total_ht', v_ht));
  else
    select coalesce(jsonb_agg(jsonb_build_object(
        'designation', l.designation, 'description', l.description, 'quantite', l.quantite, 'duree', l.duree,
        'unite', l.unite, 'prix_unitaire', l.prix_unitaire, 'remise_pct', l.remise_pct, 'total_ht', l.total_ht) order by l.ordre), '[]'::jsonb)
      into v_lignes from public.devis_lignes l where l.devis_id = d.id;
    v_ht := d.total_ht; v_remise := d.total_remise; v_tva := d.total_tva; v_ttc := d.total_ttc;
    select coalesce(jsonb_agg(jsonb_build_object('numero', a.numero, 'date', a.date_emission, 'ht', a.total_ht, 'tva', a.total_tva,
             'ttc', a.total_ttc, 'payee', a.statut = 'payee') order by a.numero), '[]'::jsonb),
           coalesce(sum(a.total_ttc), 0)
      into v_deductions, v_ded
      from public.factures a where a.devis_id = d.id and a.type = 'acompte' and a.statut <> 'annulee';
    if v_ttc - v_ded < 0 then
      raise exception 'Le total du devis (% TTC) est inférieur aux acomptes déjà facturés (% TTC).', v_ttc, v_ded;
    end if;
  end if;

  v_annee := extract(year from v_jour);
  insert into public.factures_compteur as c (annee, dernier) values (v_annee, 1)
    on conflict (annee) do update set dernier = c.dernier + 1
    returning dernier into v_n;

  insert into public.factures (
    numero, devis_id, devis_numero, type, marque, date_emission,
    client_nom, client_societe, client_email, client_telephone, client_adresse, client_ice,
    titre, date_evenement, date_fin_evenement, lieu, lignes,
    remise_globale_pct, taux_tva, total_ht, total_remise, total_tva, total_ttc, acompte_pct,
    deductions, deduction_ttc, net_a_payer, devise, creee_par)
  values (
    'FAC-' || v_annee || '-' || lpad(v_n::text, 4, '0'), d.id, d.numero, v_type, coalesce(d.marque, 'heavent'), v_jour,
    d.client_nom, d.client_societe, d.client_email, d.client_telephone, d.client_adresse, d.client_ice,
    d.titre, d.date_evenement, d.date_fin_evenement, d.lieu, v_lignes,
    case when v_type = 'acompte' then 0 else d.remise_globale_pct end, d.taux_tva, v_ht, v_remise, v_tva, v_ttc,
    case when v_type = 'acompte' then d.acompte_pct end,
    v_deductions, v_ded, v_ttc - v_ded, d.devise, coalesce(p_par, (select auth.jwt() ->> 'email')))
  returning * into f;
  return to_jsonb(f)::json;
end;
$$;
revoke all on function public.facture_creer(uuid, text, text) from public, anon;
grant execute on function public.facture_creer(uuid, text, text) to authenticated, service_role;

alter table public.factures enable row level security;
create policy "factures_admin_lecture" on public.factures for select to authenticated using (public.is_admin());
create policy "factures_admin_suivi" on public.factures for update to authenticated using (public.is_admin()) with check (public.is_admin());
revoke insert, delete, truncate on public.factures from anon, authenticated;
revoke all on public.factures_compteur from anon, authenticated;
revoke all on public.factures from anon;

-- La page client (/mon-devis/…) affiche aussi les factures du devis (sauf annulées et notes internes).
create or replace function public.devis_public(p_token uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object(
    'devis', (select to_jsonb(d) - 'notes_internes' - 'signature_preuve' - 'demande_entreprise_id' - 'demande_mariage_id' - 'relances' - 'derniere_relance_le' - 'avis_demande_le'
              from public.devis d where d.lien_token = p_token and d.statut <> 'annule'),
    'lignes', (select coalesce(json_agg(l order by l.ordre), '[]'::json) from public.devis_lignes l join public.devis d on d.id = l.devis_id where d.lien_token = p_token),
    'agence', (select to_jsonb(p) - 'lien_avis_google' - 'conditions_contrat' from public.parametres_agence p where p.id = 1),
    'factures', (select coalesce(json_agg(to_jsonb(f) - 'notes' - 'creee_par' order by f.numero), '[]'::json)
                 from public.factures f join public.devis d on d.id = f.devis_id where d.lien_token = p_token and f.statut <> 'annulee')
  )
  where exists (select 1 from public.devis d where d.lien_token = p_token and d.statut <> 'annule');
$$;
grant execute on function public.devis_public(uuid) to anon, authenticated;
