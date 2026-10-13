-- Vérifier et configurer le bucket photos comme public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'photos';

-- S'il n'existe pas, le créer
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;