-- Créer une politique pour permettre aux utilisateurs staff de voir leur propre profil
CREATE POLICY "Staff peut voir son propre profil" 
ON public.staff 
FOR SELECT 
USING (email = auth.email());