-- Complément d'audit (16/11/2026)
-- A. Départ d'un membre du crew : une personne « bannie » perd l'accès à ses données dès la requête suivante,
--    même si son ancienne session est encore ouverte (la jeton de connexion reste valable jusqu'à 1 h, mais la base refuse).
-- B. Documents signés : la version exacte acceptée (devis, contrat crew) est conservée à part, en ajout seul.
--    Toute modification après signature annule la signature (déjà le cas) ET la version signée reste consultable ;
--    une nouvelle signature crée la version suivante.
-- Retour arrière : voir la fin du fichier.

-- ---------- A ----------
alter policy affectations_own_read on public.affectations
  using (staff_id in (select s.id from public.staff s where s.email = (select auth.email()) and not coalesce(s.banni, false)));
alter policy contrats_select on public.contrats
  using (is_admin() or staff_id in (select s.id from public.staff s where s.email = (select auth.email()) and not coalesce(s.banni, false)));
alter policy dispo_own on public.disponibilites
  using (staff_id in (select s.id from public.staff s where s.email = (select auth.email()) and not coalesce(s.banni, false)))
  with check (staff_id in (select s.id from public.staff s where s.email = (select auth.email()) and not coalesce(s.banni, false)));
alter policy fiches_select on public.fiches_paie
  using (is_admin() or staff_id in (select s.id from public.staff s where s.email = (select auth.email()) and not coalesce(s.banni, false)));
alter policy paiements_crew_lecture on public.paiements_paie
  using (fiche_id in (select f.id from public.fiches_paie f join public.staff s on s.id = f.staff_id
                      where s.email = (select auth.email()) and not coalesce(s.banni, false)));
alter policy param_lecture_equipe on public.parametres_agence
  using (is_admin() or _est_nawar() or exists (select 1 from public.staff s
         where lower(s.email) = lower((select auth.email())) and not coalesce(s.banni, false)));
alter policy remarques_crew_lecture on public.remarques_contrat
  using (staff_id in (select s.id from public.staff s where s.email = (select auth.email()) and not coalesce(s.banni, false)));

-- ---------- B ----------
create table if not exists public.documents_signes (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('devis', 'contrat')),
  doc_id uuid not null,
  version int not null,
  contenu jsonb not null,          -- le document tel qu'il était au moment de la signature (sans l'image de signature)
  empreinte text not null,         -- SHA-256 du contenu
  signe_le timestamptz,
  signataire text,
  cree_le timestamptz not null default now(),
  unique (type, doc_id, version)
);
alter table public.documents_signes enable row level security;
create policy documents_signes_admin_lecture on public.documents_signes for select to authenticated using (public.is_admin());
revoke all on public.documents_signes from anon, authenticated;
grant select on public.documents_signes to authenticated;

create or replace function public._document_signe_immuable() returns trigger
language plpgsql as $$ begin raise exception 'Version signée : modification et suppression interdites. Une nouvelle signature crée une nouvelle version.'; end $$;
drop trigger if exists documents_signes_immuable on public.documents_signes;
create trigger documents_signes_immuable before update or delete on public.documents_signes
  for each row execute function public._document_signe_immuable();

create or replace function public._document_signe_figer() returns trigger
language plpgsql security definer set search_path to 'public' as $$
declare v_type text := tg_argv[0]; v_contenu jsonb; v_version int;
begin
  if new.signe_le is null or (tg_op = 'UPDATE' and new.signe_le is not distinct from old.signe_le) then return new; end if;
  v_contenu := to_jsonb(new) - 'signature_image' - 'employeur_signature_image' - 'signature_preuve';
  if v_type = 'devis' then
    v_contenu := v_contenu || jsonb_build_object('lignes',
      (select coalesce(jsonb_agg(to_jsonb(l) order by l.ordre), '[]'::jsonb) from public.devis_lignes l where l.devis_id = new.id));
  end if;
  select coalesce(max(version), 0) + 1 into v_version from public.documents_signes where type = v_type and doc_id = new.id;
  insert into public.documents_signes (type, doc_id, version, contenu, empreinte, signe_le, signataire)
  values (v_type, new.id, v_version, v_contenu, encode(sha256(convert_to(v_contenu::text, 'UTF8')), 'hex'), new.signe_le, new.signature_nom);
  return new;
end $$;
revoke all on function public._document_signe_figer() from public, anon, authenticated;

drop trigger if exists devis_figer_signature on public.devis;
create trigger devis_figer_signature after insert or update of signe_le on public.devis
  for each row execute function public._document_signe_figer('devis');
drop trigger if exists contrats_figer_signature on public.contrats;
create trigger contrats_figer_signature after insert or update of signe_le on public.contrats
  for each row execute function public._document_signe_figer('contrat');

-- Retour arrière : drop trigger devis_figer_signature on public.devis; drop trigger contrats_figer_signature on public.contrats;
-- drop function public._document_signe_figer(); (la table documents_signes est à conserver : c'est une preuve) ;
-- puis recréer les 7 politiques de la partie A sans la condition « not coalesce(s.banni, false) ».
