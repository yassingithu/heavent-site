-- Créer des buckets de stockage pour les photos et documents
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('identites', 'identites', false);

-- Politiques pour les photos
CREATE POLICY "Anyone can upload photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Anyone can view photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photos');

-- Politiques pour les documents d'identité
CREATE POLICY "Anyone can upload identity documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'identites');

CREATE POLICY "Anyone can view identity documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'identites');