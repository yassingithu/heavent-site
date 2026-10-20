-- Audit de sécurité du 20/10/2026 (aucune donnée supprimée)

-- 1. Fonctions de déclencheur : jamais appelables directement depuis l'API
revoke execute on function public.contrat_avant_suppression(), public.devis_avant_suppression(), public.devis_liberer_equipe(),
  public.staff_avant_suppression(), public.notif_demande(), public.notif_devis_signe(), public.notif_rendez_vous(), public.notif_retard(),
  public.update_updated_at_column(), public.clean_old_disponibilites(), public.devis_before_insert(), public.staff_email_minuscule(),
  public.contrat_signature_invalidee(), public.factures_proteger()
  from public, anon, authenticated;

-- 2. Fonctions réservées aux comptes connectés
revoke execute on function public.mon_accueil(), public.accueil_marquer(text), public.statistiques_site(integer) from public, anon;
grant execute on function public.mon_accueil(), public.accueil_marquer(text), public.statistiques_site(integer) to authenticated;

-- 3. Chemin de recherche figé
alter function public._mon_email() set search_path = public;

-- 4. Limites de taille et de type des fichiers envoyés
update storage.buckets set file_size_limit = 6291456, allowed_mime_types = array['image/*'] where id in ('photos', 'identites');
update storage.buckets set file_size_limit = 10485760, allowed_mime_types = array['image/*'] where id = 'assets';
update storage.buckets set file_size_limit = 15728640, allowed_mime_types = array['application/pdf', 'image/*'] where id = 'documents';

-- 5. Anti-abus des formulaires : 3 demandes par e-mail et par heure, 25 demandes en 10 minutes sur tout le site
create or replace function public._limiter_demandes() returns trigger language plpgsql security definer set search_path = public as $$
declare n_mail int; n_total int;
begin
  select (select count(*) from devis_mariage where created_at > now() - interval '1 hour' and lower(email) = lower(new.email))
       + (select count(*) from devis_entreprise where created_at > now() - interval '1 hour' and lower(email) = lower(new.email)),
         (select count(*) from devis_mariage where created_at > now() - interval '10 minutes')
       + (select count(*) from devis_entreprise where created_at > now() - interval '10 minutes')
    into n_mail, n_total;
  if (new.email is not null and n_mail >= 3) or n_total >= 25 then
    raise exception 'Trop de demandes en peu de temps' using errcode = 'P0429';
  end if;
  return new;
end $$;
revoke execute on function public._limiter_demandes() from public, anon, authenticated;
create trigger limiter_demandes before insert on public.devis_mariage for each row execute function public._limiter_demandes();
create trigger limiter_demandes before insert on public.devis_entreprise for each row execute function public._limiter_demandes();
