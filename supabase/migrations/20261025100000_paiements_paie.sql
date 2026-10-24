-- Registre des paiements de salaires : un paiement réellement effectué est enregistré à part du statut du bulletin.
-- * Enregistrer un paiement ne valide PAS le bulletin (fiches_paie.statut n'est jamais modifié ici).
-- * Traçabilité : auteur (e-mail du compte connecté) et heure d'enregistrement fixés par la base, non modifiables.
-- * Aucune modification ni suppression, même par l'administration : une erreur se corrige par une ligne de
--   correction (montant négatif) qui cite la ligne corrigée et donne un motif.
-- * Un bulletin qui a un paiement ne peut plus être supprimé (clé étrangère « restrict »).
-- Migration ADDITIVE : nouvelle table, aucune donnée existante modifiée.
-- Retour arrière (seulement si la table est encore vide, après accord) : drop table public.paiements_paie;

create table if not exists public.paiements_paie (
  id uuid primary key default gen_random_uuid(),
  fiche_id uuid not null references public.fiches_paie(id) on delete restrict,
  montant numeric(12, 2) not null check (montant <> 0),
  date_paiement date not null,
  mode text not null check (mode in ('virement', 'especes', 'cheque', 'autre')),
  reference text,
  note text,
  corrige_paiement uuid references public.paiements_paie(id) on delete restrict,
  enregistre_par text not null,
  enregistre_le timestamptz not null default now(),
  constraint correction_motivee check (montant > 0 or (corrige_paiement is not null and coalesce(btrim(note), '') <> ''))
);
create index if not exists paiements_paie_fiche on public.paiements_paie(fiche_id);
comment on table public.paiements_paie is 'Paiements de salaires réellement effectués (registre en ajout seul). Indépendant de la validation du bulletin.';

-- Auteur et heure imposés par la base (impossible de les choisir depuis l'application)
create or replace function public._paiement_paie_trace() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.corrige_paiement is not null and not exists (
    select 1 from public.paiements_paie p where p.id = new.corrige_paiement and p.fiche_id = new.fiche_id) then
    raise exception 'Une correction doit viser un paiement du même bulletin.';
  end if;
  new.enregistre_par := coalesce(nullif(auth.email(), ''), current_user);
  new.enregistre_le := now();
  return new;
end $$;
create or replace function public._paiement_paie_immuable() returns trigger
language plpgsql as $$
begin
  raise exception 'Registre des paiements : modification et suppression interdites. Enregistre une ligne de correction.';
end $$;
revoke all on function public._paiement_paie_trace() from public, anon, authenticated;
revoke all on function public._paiement_paie_immuable() from public, anon, authenticated;

drop trigger if exists paiements_paie_trace on public.paiements_paie;
create trigger paiements_paie_trace before insert on public.paiements_paie for each row execute function public._paiement_paie_trace();
drop trigger if exists paiements_paie_immuable on public.paiements_paie;
create trigger paiements_paie_immuable before update or delete on public.paiements_paie for each row execute function public._paiement_paie_immuable();

alter table public.paiements_paie enable row level security;
revoke all on public.paiements_paie from anon;
revoke update, delete, truncate on public.paiements_paie from authenticated;
grant select, insert on public.paiements_paie to authenticated;

drop policy if exists paiements_admin_lecture on public.paiements_paie;
create policy paiements_admin_lecture on public.paiements_paie for select to authenticated using (public.is_admin());
drop policy if exists paiements_admin_ajout on public.paiements_paie;
create policy paiements_admin_ajout on public.paiements_paie for insert to authenticated with check (public.is_admin());
-- Le crew voit les paiements de SES bulletins (lecture seule)
drop policy if exists paiements_crew_lecture on public.paiements_paie;
create policy paiements_crew_lecture on public.paiements_paie for select to authenticated
  using (fiche_id in (select f.id from public.fiches_paie f join public.staff s on s.id = f.staff_id where s.email = auth.email()));
