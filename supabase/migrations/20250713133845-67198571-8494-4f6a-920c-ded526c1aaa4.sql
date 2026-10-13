-- Permettre aux utilisateurs de créer leur propre profil staff lors de l'inscription
CREATE POLICY "Permettre l'insertion lors de l'inscription staff" 
ON public.staff 
FOR INSERT 
TO public
WITH CHECK (true);