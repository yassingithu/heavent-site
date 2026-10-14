-- Acceptation du contrat par le crew = signature du contrat ET des conditions de la mission,
-- contresignés au même moment par l'employeur (Imane CHAIGARI, CEO — Heavent Agency SARL).
-- L'image de la signature de l'employeur est fournie par le site (src/assets/signature-employeur.png).
alter table public.contrats
  add column if not exists employeur_signature_image text,
  add column if not exists employeur_signataire text,
  add column if not exists employeur_signe_le timestamptz,
  add column if not exists conditions_acceptees_le timestamptz;

create or replace function public.contrat_signature_invalidee()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  if new.dates is distinct from old.dates or new.taux_horaire is distinct from old.taux_horaire
    or new.salaire_brut is distinct from old.salaire_brut or new.titre is distinct from old.titre
    or new.lieu is distinct from old.lieu or new.evenement is distinct from old.evenement
    or new.staff_id is distinct from old.staff_id then
    new.rappel_signature_le := null;
    if old.signe_le is not null then
      new.signe_le := null; new.signature_nom := null; new.signature_image := null;
      new.conditions_acceptees_le := null;
      new.employeur_signe_le := null; new.employeur_signature_image := null; new.employeur_signataire := null;
      new.signature_preuve := coalesce(old.signature_preuve, '{}'::jsonb) || jsonb_build_object('annulee_le', now(), 'raison', 'contrat modifié après signature');
    end if;
  end if;
  return new;
end $$;
