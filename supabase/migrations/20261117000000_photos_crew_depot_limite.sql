-- Audit stockage (16/11/2026) : le dépôt anonyme dans « photos-crew » n'avait ni limite de fréquence ni dossier imposé,
-- contrairement aux autres dépôts publics (identites, photos, prestataires). Même règle : dossier photos-crew/ et 40 dépôts / 10 min.
-- Retour arrière : recréer la politique avec seulement (bucket_id = 'photos-crew').
drop policy if exists photos_crew_depot on storage.objects;
create policy photos_crew_depot on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'photos-crew' and name like 'photos-crew/%' and prive.depots_recents('photos-crew') < 40);
