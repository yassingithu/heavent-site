-- Ajouter les colonnes pour les heures de prestations et le taux horaire
ALTER TABLE public.contrats 
ADD COLUMN heures_prestations INTEGER,
ADD COLUMN taux_horaire DECIMAL(10,2);

-- Mettre à jour les contrats existants avec des valeurs par défaut
UPDATE public.contrats 
SET heures_prestations = 35, 
    taux_horaire = CASE 
      WHEN salaire_brut IS NOT NULL THEN salaire_brut / 35 
      ELSE 15.00 
    END
WHERE heures_prestations IS NULL;