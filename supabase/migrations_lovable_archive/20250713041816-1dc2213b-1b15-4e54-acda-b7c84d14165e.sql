-- Supprimer la contrainte unique qui empêche d'avoir plusieurs créneaux par jour
ALTER TABLE public.disponibilites 
DROP CONSTRAINT IF EXISTS disponibilites_staff_id_date_jour_key;

-- Créer une nouvelle contrainte unique qui permet plusieurs créneaux par jour
-- mais évite les doublons exactes (même staff, même date, même créneau OU mêmes heures)
ALTER TABLE public.disponibilites 
ADD CONSTRAINT disponibilites_unique_slot 
UNIQUE (staff_id, date_jour, creneau, heure_debut, heure_fin);