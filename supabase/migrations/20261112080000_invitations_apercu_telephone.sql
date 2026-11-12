-- Numéro WhatsApp du client, copié depuis la demande de carte pour ouvrir la conversation directement.
alter table public.invitations_apercu add column if not exists telephone text;
