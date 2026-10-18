-- Demandes venues du jeu « Crée ton événement » : nombre d'éléments par type,
-- pour créer le devis ligne par ligne aux prix du catalogue (Admin → Devis → « Faire le devis »).
alter table public.devis_mariage add column if not exists configuration jsonb;
