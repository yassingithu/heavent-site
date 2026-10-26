-- Garde la base active (plan gratuit : pause après une semaine sans activité). Une simple lecture par jour, rien n'est modifié.
-- Retour arrière : select cron.unschedule('garde-base-active');
select cron.schedule('garde-base-active', '17 5 * * *', $c$select count(*) from public.parametres_agence$c$);
