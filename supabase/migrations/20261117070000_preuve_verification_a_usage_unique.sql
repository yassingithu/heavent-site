-- Preuve du code e-mail : invalidée dès que le devis est signé (la preuve ne sert plus pour une seconde signature).
-- Additif : aucune fonction existante modifiée, aucune fonction serveur ni page à redéployer.
create or replace function public._devis_consommer_preuves() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  if new.signe_le is not null and new.signe_le is distinct from old.signe_le then
    update public.verifications_devis set preuve_expire_le = now()
    where devis_id = new.id and preuve_hash is not null and preuve_expire_le > now();
  end if;
  return new;
end $$;
drop trigger if exists devis_consommer_preuves on public.devis;
create trigger devis_consommer_preuves after update of signe_le on public.devis
  for each row execute function public._devis_consommer_preuves();
-- Retour arrière : drop trigger devis_consommer_preuves on public.devis; drop function public._devis_consommer_preuves();
