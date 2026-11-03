-- Souvenirs : photos envoyées mais jamais enregistrées (plus de 3 jours) — réservé au service interne.
create or replace function public.souvenirs_orphelins()
returns table (nom text) language sql stable security definer set search_path to 'public' as $$
  select o.name from storage.objects o
  where o.bucket_id = 'souvenirs' and o.created_at < now() - interval '3 days'
    and not exists (select 1 from public.souvenirs_photos p where p.chemin = o.name)
  limit 500
$$;
revoke all on function public.souvenirs_orphelins() from public, anon, authenticated;
grant execute on function public.souvenirs_orphelins() to service_role;

-- Suppression quotidienne à 3 h (heure du Maroc ≈ 2 h UTC) : copies en ligne gardées un an après le mariage.
select cron.schedule('souvenirs-purge', '0 2 * * *', $c$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/souvenirs-purge', headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')), body := '{}'::jsonb)$c$);
-- Retour arrière : select cron.unschedule('souvenirs-purge'); drop function public.souvenirs_orphelins();
