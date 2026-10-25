-- Suppression volontaire d'un devis de TEST (même signé / facturé), réservée aux administrateurs.
-- Les protections restent actives partout ailleurs : seule la fonction ci-dessous lève le verrou, le temps d'une transaction.

create table if not exists public.suppressions_test (
  id uuid primary key default gen_random_uuid(),
  date_suppression timestamptz not null default now(),
  par uuid default auth.uid(),
  numero text,
  client text,
  nb_factures int not null default 0,
  nb_contrats int not null default 0,
  total numeric
);
alter table public.suppressions_test enable row level security;
drop policy if exists suppressions_test_lecture on public.suppressions_test;
create policy suppressions_test_lecture on public.suppressions_test for select to authenticated using (public.is_admin());

create or replace function public.devis_avant_suppression() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if current_setting('heavent.suppression_test', true) = 'oui' then return old; end if;
  if old.signe_le is not null then
    raise exception 'Un devis signé ne peut pas être supprimé : archive-le (ou passe-le en « Annulé »).' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.factures where devis_id = old.id) then
    raise exception 'Un devis facturé ne peut pas être supprimé : archive-le pour le retirer de la liste.' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.contrats where devis_id = old.id and signe_le is not null) then
    raise exception 'Des contrats signés sont liés à ce devis : passe-le en « Annulé » puis archive-le.' using errcode = 'P0001';
  end if;
  return old;
end $$;

create or replace function public.contrat_avant_suppression() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if current_setting('heavent.suppression_test', true) = 'oui' then return old; end if;
  if old.signe_le is not null then
    raise exception 'Un contrat signé ne peut pas être supprimé : annule-le.' using errcode = 'P0001';
  end if;
  return old;
end $$;

create or replace function public.factures_proteger() returns trigger language plpgsql set search_path to 'public' as $$
declare
  libres text[] := array['statut', 'payee_le', 'mode_paiement', 'envoyee_le', 'annulee_le', 'notes', 'updated_at'];
begin
  if tg_op = 'DELETE' then
    if current_setting('heavent.suppression_test', true) = 'oui' then return old; end if;
    raise exception 'Une facture émise ne peut pas être supprimée : annulez-la.';
  end if;
  if (to_jsonb(new) - libres) is distinct from (to_jsonb(old) - libres) then
    raise exception 'Une facture émise ne peut plus être modifiée (numéro, client, montants).';
  end if;
  if old.statut = 'annulee' and new.statut <> 'annulee' then
    raise exception 'Une facture annulée ne peut pas être rétablie : créez-en une nouvelle.';
  end if;
  if new.statut = 'annulee' and old.statut <> 'annulee' then new.annulee_le := now(); end if;
  if new.statut = 'payee' and new.payee_le is null then new.payee_le := (now() at time zone 'UTC')::date; end if;
  if new.statut = 'a_payer' then new.payee_le := null; new.mode_paiement := null; end if;
  return new;
end;
$$;

-- p_confirmation doit être exactement le numéro du devis (saisi par l'administrateur).
create or replace function public.supprimer_devis_test(p_devis uuid, p_confirmation text) returns jsonb
language plpgsql security definer set search_path to 'public' as $$
declare
  d record; nf int; nc int;
begin
  if not public.is_admin() then raise exception 'Réservé aux administrateurs.' using errcode = '42501'; end if;
  select * into d from public.devis where id = p_devis;
  if not found then raise exception 'Devis introuvable.'; end if;
  if coalesce(trim(p_confirmation), '') is distinct from coalesce(d.numero, '') then
    raise exception 'Le numéro saisi ne correspond pas au devis.';
  end if;
  select count(*) into nf from public.factures where devis_id = p_devis;
  select count(*) into nc from public.contrats where devis_id = p_devis;
  perform set_config('heavent.suppression_test', 'oui', true);
  delete from public.factures where devis_id = p_devis;
  delete from public.contrats where devis_id = p_devis;
  delete from public.devis where id = p_devis;
  perform set_config('heavent.suppression_test', 'non', true);
  insert into public.suppressions_test (numero, client, nb_factures, nb_contrats)
    values (d.numero, to_jsonb(d)->>'client_nom', nf, nc);
  return jsonb_build_object('numero', d.numero, 'factures', nf, 'contrats', nc);
end $$;

revoke all on function public.supprimer_devis_test(uuid, text) from public, anon;
grant execute on function public.supprimer_devis_test(uuid, text) to authenticated;
