-- La fonction de numérotation ne sert que de déclencheur : personne ne doit pouvoir l'appeler directement.
revoke execute on function public.numeroter_reponse_rapide() from public, anon, authenticated;
