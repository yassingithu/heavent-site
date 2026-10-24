-- Lot « Champs CNSS » : numéro d'affiliation CNSS de l'employeur.
-- Migration ADDITIVE uniquement (une colonne texte vide, aucune donnée modifiée).
-- À n'appliquer en production qu'après une première sauvegarde vérifiée.
-- Retour arrière : laisser la colonne (sans effet) ; ou, après accord, « alter table public.parametres_agence drop column cnss_affiliation_employeur ».
--
-- Choix volontaires :
-- * texte et non nombre : le numéro est conservé tel que saisi (zéros en tête, séparateurs), jamais transformé ;
-- * aucune contrainte de format : le format officiel n'a pas été vérifié sur une source CNSS ;
-- * pas d'index unique sur staff.numero_securite_sociale : l'inscription des crews est publique,
--   un refus « numéro déjà utilisé » permettrait à un inconnu de tester l'existence d'un numéro.
--   Les doublons sont signalés à l'administration seulement (écran Paie et fiche du crew).
-- Droits : inchangés. parametres_agence reste lisible par les comptes connectés (le numéro figure
-- de toute façon sur les bulletins) et modifiable par l'administration seule (politique param_admin).

alter table public.parametres_agence add column if not exists cnss_affiliation_employeur text;
comment on column public.parametres_agence.cnss_affiliation_employeur is 'N° d''affiliation CNSS de l''employeur, conservé tel que saisi (texte).';
