-- Assurer que le bucket photos est vraiment public
UPDATE storage.buckets SET public = true WHERE id = 'photos';

-- Supprimer toutes les politiques restrictives sur les photos
DROP POLICY IF EXISTS "Photos sont accessibles publiquement" ON storage.objects;
DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent uploader des photos" ON storage.objects;
DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent modifier des photos" ON storage.objects;
DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent supprimer des photos" ON storage.objects;

-- Créer une politique très permissive pour l'accès public aux photos
CREATE POLICY "Accès public total aux photos" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'photos');