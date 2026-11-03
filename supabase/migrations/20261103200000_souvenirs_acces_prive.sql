-- Souvenirs : les photos ne sont plus lisibles par tout le monde.
-- Lecture réservée à l'agence ; les mariés les voient via des liens temporaires (fonction « souvenirs »).
drop policy if exists souvenirs_lecture on storage.objects;
create policy souvenirs_lecture_admin on storage.objects for select to authenticated
  using (bucket_id = 'souvenirs' and public.is_admin());
-- Retour arrière : drop policy souvenirs_lecture_admin on storage.objects;
