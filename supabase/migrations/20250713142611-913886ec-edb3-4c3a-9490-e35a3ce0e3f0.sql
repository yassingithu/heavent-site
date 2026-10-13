-- Supprimer le deuxième enregistrement de selassi.yassin@gmail.com (garder le premier)
DELETE FROM public.staff 
WHERE email = 'selassi.yassin@gmail.com' 
AND created_at = '2025-07-13 13:53:54.58889+00';

-- Ajouter une contrainte unique sur la colonne email pour empêcher les doublons futurs
ALTER TABLE public.staff 
ADD CONSTRAINT staff_email_unique UNIQUE (email);