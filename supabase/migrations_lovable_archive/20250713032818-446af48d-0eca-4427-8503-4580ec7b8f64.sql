-- Supprimer les anciennes politiques RLS problématiques
DROP POLICY IF EXISTS "Staff peut voir ses propres contrats" ON public.contrats;
DROP POLICY IF EXISTS "Staff peut voir ses propres fiches de paie" ON public.fiches_paie;
DROP POLICY IF EXISTS "Staff peut gérer ses disponibilités" ON public.disponibilites;

-- Créer les nouvelles politiques RLS corrigées
CREATE POLICY "Staff peut voir ses propres contrats" 
ON public.contrats 
FOR SELECT 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.email()));

CREATE POLICY "Staff peut voir ses propres fiches de paie" 
ON public.fiches_paie 
FOR SELECT 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.email()));

-- Politiques pour disponibilités - permettre toutes les opérations (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Staff peut voir ses disponibilités" 
ON public.disponibilites 
FOR SELECT 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.email()));

CREATE POLICY "Staff peut créer ses disponibilités" 
ON public.disponibilites 
FOR INSERT 
WITH CHECK (staff_id IN (SELECT id FROM public.staff WHERE email = auth.email()));

CREATE POLICY "Staff peut modifier ses disponibilités" 
ON public.disponibilites 
FOR UPDATE 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.email()));

CREATE POLICY "Staff peut supprimer ses disponibilités" 
ON public.disponibilites 
FOR DELETE 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.email()));