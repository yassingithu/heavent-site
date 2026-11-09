-- Date d'envoi du message « candidature approuvée » (un seul envoi par personne).
alter table public.staff add column if not exists mail_approbation_le timestamptz;
