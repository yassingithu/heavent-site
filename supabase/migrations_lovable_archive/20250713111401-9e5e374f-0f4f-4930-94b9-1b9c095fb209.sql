-- Créer des policies RLS pour permettre à l'admin de voir toutes les données

-- Pour la table staff - permettre à l'admin de voir tous les staff
CREATE POLICY "Admin peut voir tous les staff" 
ON public.staff 
FOR SELECT 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json->>'email' = 'i.chaigari@heaventagency.com');

-- Pour la table devis_entreprise - permettre à l'admin de voir tous les devis
CREATE POLICY "Admin peut voir tous les devis entreprise" 
ON public.devis_entreprise 
FOR SELECT 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json->>'email' = 'i.chaigari@heaventagency.com');

-- Pour la table devis_mariage - permettre à l'admin de voir tous les devis
CREATE POLICY "Admin peut voir tous les devis mariage" 
ON public.devis_mariage 
FOR SELECT 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json->>'email' = 'i.chaigari@heaventagency.com');

-- Pour la table disponibilites - permettre à l'admin de voir toutes les disponibilités
CREATE POLICY "Admin peut voir toutes les disponibilités" 
ON public.disponibilites 
FOR SELECT 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json->>'email' = 'i.chaigari@heaventagency.com');

-- Pour la table contrats - permettre à l'admin de voir tous les contrats
CREATE POLICY "Admin peut voir tous les contrats" 
ON public.contrats 
FOR SELECT 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json->>'email' = 'i.chaigari@heaventagency.com');

-- Pour la table fiches_paie - permettre à l'admin de voir toutes les fiches de paie
CREATE POLICY "Admin peut voir toutes les fiches de paie" 
ON public.fiches_paie 
FOR SELECT 
TO authenticated
USING (current_setting('request.jwt.claims', true)::json->>'email' = 'i.chaigari@heaventagency.com');

-- Activer RLS sur les tables qui ne l'ont pas encore
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devis_entreprise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devis_mariage ENABLE ROW LEVEL SECURITY;