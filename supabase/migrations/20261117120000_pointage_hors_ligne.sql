-- Pointage de secours sans réseau (mode hors ligne du jour J).
-- Le téléphone garde l'heure, la position et le selfie, puis les envoie au retour du réseau.
-- arrivee_cle / depart_cle : identifiant unique créé par le téléphone, pour qu'un renvoi ne crée jamais de doublon.
-- pointage_hors_ligne : l'heure vient du téléphone (falsifiable) : l'agence vérifie toujours ces heures.
-- pointage_recu_le : heure de réception par le serveur (référence fiable).
-- pointage_tardif : reçu plus de 24 h après l'heure du téléphone (jamais refusé d'office, l'agence tranche).
alter table public.affectations
  add column if not exists arrivee_cle text,
  add column if not exists depart_cle text,
  add column if not exists pointage_hors_ligne boolean not null default false,
  add column if not exists pointage_recu_le timestamptz,
  add column if not exists pointage_tardif boolean not null default false;
-- Retour arrière : alter table public.affectations drop column arrivee_cle, drop column depart_cle, drop column pointage_hors_ligne, drop column pointage_recu_le, drop column pointage_tardif;
