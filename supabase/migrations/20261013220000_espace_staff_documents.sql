-- Le staff doit pouvoir lire les infos agence (en-tête / pied de ses PDF)
create policy param_lecture_connectes on public.parametres_agence for select to authenticated using (true);

-- Infos de l'événement copiées sur le contrat (le staff n'a pas accès à la table devis)
alter table public.contrats add column if not exists evenement text, add column if not exists devis_numero text;

-- Emails staff toujours en minuscules (les droits comparent avec l'email de connexion)
create or replace function public.staff_email_minuscule() returns trigger language plpgsql set search_path = public as $$
begin new.email := lower(trim(new.email)); return new; end $$;
create trigger staff_email_minuscule before insert or update of email on public.staff
  for each row execute function public.staff_email_minuscule();
