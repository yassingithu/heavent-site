-- Supprimer les anciennes colonnes de tour de taille
ALTER TABLE public.staff DROP COLUMN IF EXISTS tour_poitrine;
ALTER TABLE public.staff DROP COLUMN IF EXISTS tour_taille;  
ALTER TABLE public.staff DROP COLUMN IF EXISTS tour_hanches;

-- Ajouter les nouvelles colonnes de taille
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS taille_pantalon VARCHAR;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS taille_haut VARCHAR;