-- Conditions générales imprimées en 2e page des devis et des contrats.
-- Vides = textes par défaut définis dans src/lib/conditions.ts ; modifiables dans « Infos agence ».
alter table public.parametres_agence
  add column if not exists cgv text,
  add column if not exists conditions_contrat text;
