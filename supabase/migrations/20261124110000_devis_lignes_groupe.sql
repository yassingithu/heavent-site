-- Un devis peut regrouper ses lignes par événement (dates, villes ou participants différents).
-- Colonne facultative : un devis sans groupe s'affiche et se calcule exactement comme avant.
-- Les fonctions publiques qui renvoient les lignes (json_agg de la ligne entière) la transmettent d'elles-mêmes.
alter table public.devis_lignes add column if not exists groupe text;
