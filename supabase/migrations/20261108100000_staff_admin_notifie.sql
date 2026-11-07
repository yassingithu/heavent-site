-- Suivi de l'alerte « nouvelle inscription crew » envoyée aux administrateurs.
alter table public.staff add column if not exists admin_notifie_le timestamptz;
