-- Ajouter des politiques RLS pour permettre à tout le monde d'insérer des devis (pour les formulaires publics)
-- et seulement à l'admin de voir et modifier

-- Pour la table devis_entreprise - permettre à tous d'insérer
CREATE POLICY "Tous peuvent créer des devis entreprise" 
ON public.devis_entreprise 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Pour la table devis_mariage - permettre à tous d'insérer  
CREATE POLICY "Tous peuvent créer des devis mariage" 
ON public.devis_mariage 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Permettre à l'admin de modifier/supprimer les devis
CREATE POLICY "Admin peut modifier les devis entreprise" 
ON public.devis_entreprise 
FOR UPDATE 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json ->> 'email' = 'i.chaigari@heaventagency.com');

CREATE POLICY "Admin peut supprimer les devis entreprise" 
ON public.devis_entreprise 
FOR DELETE 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json ->> 'email' = 'i.chaigari@heaventagency.com');

CREATE POLICY "Admin peut modifier les devis mariage" 
ON public.devis_mariage 
FOR UPDATE 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json ->> 'email' = 'i.chaigari@heaventagency.com');

CREATE POLICY "Admin peut supprimer les devis mariage" 
ON public.devis_mariage 
FOR DELETE 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json ->> 'email' = 'i.chaigari@heaventagency.com');