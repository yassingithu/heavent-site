-- Les prix du catalogue ne sont plus lisibles publiquement : le jeu « Crée ton événement » n'affiche plus aucun prix
-- aux visiteurs (les prestataires ne doivent pas deviner à combien leurs prestations sont revendues).
-- La fonction reste en place (elle sert au Studio / peut être rouverte), mais n'est plus appelable que par le service.
--
-- Retour arrière :
--   grant execute on function public.tarifs_jeu() to anon, authenticated;
revoke execute on function public.tarifs_jeu() from public, anon, authenticated;
