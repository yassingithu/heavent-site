-- Ajouter un statut aux devis entreprise et mariage
ALTER TABLE public.devis_entreprise 
ADD COLUMN statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'envoye', 'accepte', 'refuse'));

ALTER TABLE public.devis_mariage 
ADD COLUMN statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'envoye', 'accepte', 'refuse'));

-- Ajouter une colonne pour la date d'envoi du devis
ALTER TABLE public.devis_entreprise 
ADD COLUMN date_envoi_devis TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.devis_mariage 
ADD COLUMN date_envoi_devis TIMESTAMP WITH TIME ZONE;

-- Ajouter une colonne pour stocker les tarifs envoyés
ALTER TABLE public.devis_entreprise 
ADD COLUMN tarifs_envoyes JSONB;

ALTER TABLE public.devis_mariage 
ADD COLUMN tarifs_envoyes JSONB;

-- Ajouter une colonne pour le montant total
ALTER TABLE public.devis_entreprise 
ADD COLUMN montant_total NUMERIC;