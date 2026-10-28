-- Audit de sécurité du 28/10/2026 (déjà appliqué sur la base)

-- 1. Fiches crew : plus d'ajout direct depuis le site (l'inscription passe par la fonction serveur « inscription-staff »)
drop policy if exists staff_insert_self on public.staff;

-- 2. Dépôts de fichiers publics : dossiers imposés, plafond global, pas de SVG
create schema if not exists prive;
revoke all on schema prive from public;
grant usage on schema prive to anon, authenticated;

create or replace function prive.depots_recents(p_bucket text)
returns bigint language sql stable security definer set search_path = '' as $$
  select count(*) from storage.objects where bucket_id = p_bucket and created_at > now() - interval '10 minutes';
$$;
revoke all on function prive.depots_recents(text) from public;
grant execute on function prive.depots_recents(text) to anon, authenticated;

drop policy if exists identites_upload on storage.objects;
create policy identites_upload on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'identites' and name like 'identites/%' and prive.depots_recents('identites') < 40);

drop policy if exists photos_upload on storage.objects;
create policy photos_upload on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'photos' and (name like 'photos/%' or name like 'studio/%') and prive.depots_recents('photos') < 60);

drop policy if exists prestataires_depot_public on storage.objects;
create policy prestataires_depot_public on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'prestataires' and name like 'inscriptions/%' and prive.depots_recents('prestataires') < 60);

update storage.buckets set allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/heic','image/heif','image/avif']
  where id in ('photos', 'identites', 'assets', 'prestataires');
update storage.buckets set allowed_mime_types = array['application/pdf','image/jpeg','image/png','image/webp','image/gif','image/heic','image/heif','image/avif']
  where id = 'documents';

-- 3. Vérifier si un e-mail fait partie de l'équipe : plus accessible depuis l'extérieur
revoke execute on function public.staff_email_exists(text) from public, anon, authenticated;

-- 4. Réglage technique manquant
alter function public._paiement_paie_immuable() set search_path = public;
