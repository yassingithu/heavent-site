-- Créer un bucket pour les assets de l'entreprise (logos, etc.)
INSERT INTO storage.buckets (id, name, public) VALUES ('assets', 'assets', true);

-- Créer des politiques très permissives pour le bucket assets
CREATE POLICY "Assets sont accessibles en lecture à tous" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'assets');

CREATE POLICY "Admin peut uploader des assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'assets');