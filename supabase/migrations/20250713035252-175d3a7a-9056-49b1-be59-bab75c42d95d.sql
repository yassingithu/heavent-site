-- Modifier la table disponibilites pour supporter les créneaux horaires
ALTER TABLE public.disponibilites 
ADD COLUMN creneau TEXT CHECK (creneau IN ('matin', 'apres_midi', 'soir')) DEFAULT NULL;

-- Créer un index pour optimiser les requêtes
CREATE INDEX idx_disponibilites_date_creneau ON public.disponibilites(staff_id, date_jour, creneau);

-- Supprimer la contrainte unique si elle existe et la recréer avec le créneau
DROP INDEX IF EXISTS disponibilites_staff_id_date_jour_idx;
CREATE UNIQUE INDEX disponibilites_staff_id_date_creneau_unique 
ON public.disponibilites(staff_id, date_jour, creneau);

-- Créer une fonction pour nettoyer les anciennes disponibilités lors de la mise à jour
CREATE OR REPLACE FUNCTION clean_old_disponibilites()
RETURNS TRIGGER AS $$
BEGIN
  -- Si on met à jour avec un créneau spécifique, supprimer l'ancienne entrée sans créneau
  IF NEW.creneau IS NOT NULL THEN
    DELETE FROM public.disponibilites 
    WHERE staff_id = NEW.staff_id 
      AND date_jour = NEW.date_jour 
      AND creneau IS NULL
      AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger
CREATE TRIGGER trigger_clean_old_disponibilites
  AFTER INSERT OR UPDATE ON public.disponibilites
  FOR EACH ROW
  EXECUTE FUNCTION clean_old_disponibilites();