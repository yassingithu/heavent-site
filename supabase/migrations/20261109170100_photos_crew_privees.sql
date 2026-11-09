-- Photos des candidats (portrait, en pied) : espace de fichiers PRIVÉ.
-- Dépôt ouvert depuis le formulaire d'inscription, lecture réservée à l'administration (liens temporaires).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos-crew', 'photos-crew', false, 6291456, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = false;

create policy "photos_crew_depot" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'photos-crew');
create policy "photos_crew_admin" on storage.objects for all to authenticated
  using (bucket_id = 'photos-crew' and public.is_admin()) with check (bucket_id = 'photos-crew' and public.is_admin());
