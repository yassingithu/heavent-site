-- Créer les politiques pour permettre à l'admin de modifier et supprimer les profils staff
CREATE POLICY "Admin peut modifier tous les profils staff" 
ON public.staff 
FOR UPDATE 
USING (((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text) = 'i.chaigari@heaventagency.com'::text);

CREATE POLICY "Admin peut supprimer tous les profils staff" 
ON public.staff 
FOR DELETE 
USING (((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text) = 'i.chaigari@heaventagency.com'::text);

-- Ajouter aussi les politiques pour supprimer les disponibilités et contrats associés
CREATE POLICY "Admin peut supprimer toutes les disponibilités" 
ON public.disponibilites 
FOR DELETE 
USING (((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text) = 'i.chaigari@heaventagency.com'::text);

CREATE POLICY "Admin peut créer/modifier/supprimer tous les contrats" 
ON public.contrats 
FOR ALL 
USING (((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text) = 'i.chaigari@heaventagency.com'::text);

CREATE POLICY "Admin peut créer/modifier/supprimer toutes les fiches de paie" 
ON public.fiches_paie 
FOR ALL 
USING (((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text) = 'i.chaigari@heaventagency.com'::text);