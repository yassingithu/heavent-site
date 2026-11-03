-- La veille du mariage à 18 h (heure du Maroc) : e-mail aux mariés pour préparer les souvenirs.
select cron.schedule('rappel-souvenirs', '0 17,18 * * *', $c$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/rappel-souvenirs', headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')), body := '{}'::jsonb)$c$);
-- Retour arrière : select cron.unschedule('rappel-souvenirs');
