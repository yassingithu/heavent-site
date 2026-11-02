-- Quand un lieu est supprimé, ses lignes du catalogue des devis sont désactivées (jamais proposées par erreur).
create or replace function public._lieu_supprime_catalogue() returns trigger language plpgsql security definer set search_path = public as $$
begin
  update catalogue_prestations set actif = false where lieu_id = old.id;
  return old;
end $$;
drop trigger if exists lieu_supprime_catalogue on public.lieux;
create trigger lieu_supprime_catalogue after delete on public.lieux for each row execute function public._lieu_supprime_catalogue();
revoke execute on function public._lieu_supprime_catalogue() from public, anon, authenticated;
