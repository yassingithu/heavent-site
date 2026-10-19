-- Règles de cohérence : ce qui a une valeur légale (devis signé, facture, contrat signé, fiche de paie) ne se supprime pas,
-- il s'annule ou s'archive. Et l'annulation d'un devis libère automatiquement l'équipe prévue.

-- 1. Archivage des devis (les masquer de la liste sans rien effacer)
alter table public.devis add column if not exists archive boolean not null default false;

-- 2. Devis annulé ou refusé : l'équipe n'est plus attendue (plus de mission, de pointage ni de paie),
--    ses contrats passent « annulé » (les contrats signés restent archivés comme preuve).
create or replace function public.devis_liberer_equipe()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if new.statut in ('annule', 'refuse') and old.statut not in ('annule', 'refuse') then
    update public.affectations set statut = 'annule' where devis_id = new.id and statut <> 'annule';
    update public.contrats set statut = 'annule' where devis_id = new.id and statut <> 'annule';
  end if;
  return new;
end $$;
create or replace trigger devis_liberer_equipe after update of statut on public.devis
  for each row execute function public.devis_liberer_equipe();

-- 3. Suppression d'un devis : interdite s'il est signé ou s'il a un contrat signé (les factures sont déjà protégées) ;
--    (l'administration retire d'abord ses contrats non signés, pour qu'ils ne restent pas orphelins).
create or replace function public.devis_avant_suppression()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if old.signe_le is not null then
    raise exception 'Un devis signé ne peut pas être supprimé : archive-le (ou passe-le en « Annulé »).' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.factures where devis_id = old.id) then
    raise exception 'Un devis facturé ne peut pas être supprimé : archive-le pour le retirer de la liste.' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.contrats where devis_id = old.id and signe_le is not null) then
    raise exception 'Des contrats signés sont liés à ce devis : passe-le en « Annulé » puis archive-le.' using errcode = 'P0001';
  end if;
  return old; -- les contrats non signés sont retirés par l'administration avant la suppression
end $$;
create or replace trigger devis_avant_suppression before delete on public.devis
  for each row execute function public.devis_avant_suppression();

-- 4. Un contrat signé ne se supprime pas : il s'annule.
create or replace function public.contrat_avant_suppression()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if old.signe_le is not null then
    raise exception 'Un contrat signé ne peut pas être supprimé : annule-le.' using errcode = 'P0001';
  end if;
  return old;
end $$;
create or replace trigger contrat_avant_suppression before delete on public.contrats
  for each row execute function public.contrat_avant_suppression();

-- 5. Une personne avec des contrats signés ou des fiches de paie ne se supprime pas (obligations sociales) : on la bannit.
create or replace function public.staff_avant_suppression()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if exists (select 1 from public.contrats where staff_id = old.id and signe_le is not null)
     or exists (select 1 from public.fiches_paie where staff_id = old.id) then
    raise exception 'Cette personne a des contrats signés ou des fiches de paie : ces documents doivent être conservés. Bannis-la plutôt que de la supprimer.' using errcode = 'P0001';
  end if;
  return old;
end $$;
create or replace trigger staff_avant_suppression before delete on public.staff
  for each row execute function public.staff_avant_suppression();

-- 6. Page client : un devis annulé reste consultable (avec la mention « annulé ») pour retrouver ses factures.
do $$
declare def text;
begin
  def := pg_get_functiondef('public.devis_public(uuid)'::regprocedure);
  def := replace(def, 'd.lien_token = p_token and d.statut <> ''annule''', 'd.lien_token = p_token');
  execute def;
end $$;
