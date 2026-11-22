-- Tout est calculé à l'heure du Maroc (Africa/Casablanca) : jour d'émission et de paiement des factures, jours de mission,
-- fin des invitations, statistiques du site et créneaux de rendez-vous (les horaires 10 h à 19 h de l'agenda sont des heures du Maroc).
-- Avant : « UTC ». Entre minuit et 1 h au Maroc, une facture tombait la veille, et les créneaux s'affichaient 1 h trop tard.
-- Les fonctions sont reprises telles quelles, seul le fuseau change. À déployer avec la mise en ligne du site correspondant.
do $$
declare r record; d text;
begin
  for r in
    select p.oid from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.prokind = 'f'
      and p.proname in ('facture_creer', 'factures_proteger', 'mes_missions', 'rsvp_repondre', 'devis_public', 'statistiques_site', 'agenda_creneaux', 'notif_rendez_vous')
  loop
    d := pg_get_functiondef(r.oid);
    if position('''UTC''' in d) > 0 then
      execute replace(d, '''UTC''', '''Africa/Casablanca''');
    end if;
  end loop;
end $$;

alter table public.factures alter column date_emission set default ((now() at time zone 'Africa/Casablanca')::date);
