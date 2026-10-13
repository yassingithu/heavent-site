-- Ajouter les champs nécessaires pour la création de contrats de travail
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS adresse_complete TEXT;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS code_postal VARCHAR(10);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS nationalite VARCHAR(50);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS date_naissance DATE;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS lieu_naissance VARCHAR(100);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS situation_familiale VARCHAR(30);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS numero_identite VARCHAR(50);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS numero_securite_sociale VARCHAR(50);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS iban VARCHAR(50);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS niveau_etudes VARCHAR(100);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS nom_urgence VARCHAR(100);
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS telephone_urgence VARCHAR(20);