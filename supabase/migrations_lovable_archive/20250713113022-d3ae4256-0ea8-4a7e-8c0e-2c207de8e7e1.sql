-- Vérifier et corriger les politiques du bucket photos pour permettre l'accès public aux images

-- S'assurer que le bucket photos est public
UPDATE storage.buckets SET public = true WHERE id = 'photos';

-- Supprimer les anciennes politiques restrictives s'il y en a
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access photos" ON storage.objects;

-- Créer une politique pour permettre la lecture publique des photos
CREATE POLICY "Photos sont accessibles publiquement" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photos');

-- Créer une politique pour permettre l'upload de photos (authentifié)
CREATE POLICY "Utilisateurs authentifiés peuvent uploader des photos" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'photos');

-- Créer une politique pour permettre la mise à jour des photos (authentifié)
CREATE POLICY "Utilisateurs authentifiés peuvent modifier des photos" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'photos');

-- Créer une politique pour permettre la suppression des photos (authentifié)
CREATE POLICY "Utilisateurs authentifiés peuvent supprimer des photos" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'photos');