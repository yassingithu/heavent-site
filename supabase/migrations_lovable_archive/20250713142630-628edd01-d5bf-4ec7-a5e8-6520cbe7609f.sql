-- Supprimer tous les doublons en gardant seulement le premier enregistrement par email
DELETE FROM public.staff a
WHERE a.id NOT IN (
    SELECT DISTINCT ON (email) id
    FROM public.staff
    ORDER BY email, created_at ASC
);

-- Ajouter une contrainte unique sur la colonne email pour empêcher les doublons futurs
ALTER TABLE public.staff 
ADD CONSTRAINT staff_email_unique UNIQUE (email);