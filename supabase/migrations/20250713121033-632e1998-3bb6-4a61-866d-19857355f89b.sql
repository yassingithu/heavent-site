-- Ajouter la colonne montant_total aussi pour les devis mariage
ALTER TABLE public.devis_mariage 
ADD COLUMN montant_total NUMERIC;