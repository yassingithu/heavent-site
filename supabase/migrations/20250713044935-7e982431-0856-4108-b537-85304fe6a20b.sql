-- Ajouter des champs supplémentaires pour les mensurations et détails du staff
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS tour_poitrine INTEGER;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS tour_taille INTEGER;  
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS tour_hanches INTEGER;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS pointure VARCHAR(10);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS taille_confection VARCHAR(10);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS couleur_cheveux VARCHAR(50);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS couleur_yeux VARCHAR(50);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS experience TEXT;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS competences TEXT;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS langues TEXT;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS photo_plein_pied TEXT;