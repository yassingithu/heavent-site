-- Historique des crews et des contrats : libellé lisible (titre du contrat, nom du crew) et suivi du bannissement.
-- Additif : la fonction garde son comportement (ne bloque jamais une modification) ; seul le libellé enregistré change.
create or replace function public._journaliser_statut()
returns trigger
language plpgsql security definer
set search_path to 'public'
as $$
declare
  ancien text := to_jsonb(OLD) ->> TG_ARGV[0];
  nouveau text := to_jsonb(NEW) ->> TG_ARGV[0];
  lib text;
begin
  if ancien is distinct from nouveau then
    begin
      lib := coalesce(
        to_jsonb(NEW) ->> 'numero',
        to_jsonb(NEW) ->> 'titre',
        nullif(trim(coalesce(to_jsonb(NEW) ->> 'prenom', '') || ' ' || coalesce(to_jsonb(NEW) ->> 'nom', '')), '')
      );
      insert into public.historique_changements (table_name, ligne_id, libelle, champ, avant, apres, par_email)
      values (TG_TABLE_NAME, to_jsonb(NEW) ->> 'id', lib, TG_ARGV[0], ancien, nouveau,
              coalesce(lower(auth.jwt() ->> 'email'), 'automatique'));
    exception when others then
      null; -- le journal ne doit jamais empêcher un changement de statut
    end;
  end if;
  return NEW;
end
$$;
revoke all on function public._journaliser_statut() from public, anon, authenticated;

-- Bannissement et réactivation d'un crew (la colonne est un booléen : « true » / « false » dans le journal).
drop trigger if exists historique_banni on public.staff;
create trigger historique_banni after update of banni on public.staff
  for each row execute function public._journaliser_statut('banni');
