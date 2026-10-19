-- Publication automatique Instagram : réglages (avec le nom du compte connecté) et passage toutes les 15 minutes
create or replace function public.instagram_reglages()
returns json language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not (public.is_admin() or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  return json_build_object(
    'pixabay', exists (select 1 from public.secrets_internes where nom = 'pixabay'),
    'instagram', exists (select 1 from public.secrets_internes where nom = 'instagram_jeton'),
    'instagram_nom', (select valeur from public.secrets_internes where nom = 'instagram_nom'));
end $$;

select cron.schedule('instagram-publication', '*/15 * * * *', $c$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/instagram-publier', headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')), body := '{}'::jsonb) where exists (select 1 from public.secrets_internes where nom = 'instagram_jeton')$c$);
