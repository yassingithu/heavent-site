-- Résumé quotidien des réponses d'invités (tourne à 17 h et 18 h UTC ; seul l'envoi tombant à 18 h heure du Maroc part)
select cron.schedule('resume-rsvp', '0 17,18 * * *', $c$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/resume-rsvp', headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')), body := '{}'::jsonb)$c$);
-- Retour arrière : select cron.unschedule('resume-rsvp');
