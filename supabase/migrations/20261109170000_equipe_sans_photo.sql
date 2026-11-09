-- Page client du devis : l'équipe n'affiche plus la photo (prénom, initiale du nom et poste seulement).
-- La photo n'est plus envoyée au navigateur du client.
do $$
declare def text;
begin
  def := pg_get_functiondef('public.devis_public(uuid)'::regprocedure);
  def := replace(def, '''photo'', s.photo, ', '');
  def := replace(def, 's.nom, s.photo)', 's.nom)');
  execute def;
end $$;
