-- Alerte sur le téléphone des administrateurs quand une publication Instagram échoue (jeton expiré, refus…)
create or replace function public.notif_instagram_erreur() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.statut = 'erreur' and coalesce(old.statut, '') <> 'erreur' then
    perform public.notifier_admins('⚠️ Instagram : publication en erreur',
      case when new.erreur ilike '%permission%' or new.erreur ilike '%token%' or new.erreur ilike '%session%'
           then 'Le jeton Instagram n''est plus valable : Admin → Instagram → « Mettre à jour le jeton ».'
           else left(coalesce(new.erreur, ''), 120) end, '/admin');
  end if;
  return new;
end $$;
revoke execute on function public.notif_instagram_erreur() from public, anon, authenticated;
drop trigger if exists notif_instagram_erreur on public.posts_instagram;
create trigger notif_instagram_erreur after update of statut on public.posts_instagram for each row execute function public.notif_instagram_erreur();

-- « Commentez GUIDE » : relecture des commentaires toutes les 10 minutes (en plus du webhook de Meta)
select cron.schedule('instagram-commentaires', '*/10 * * * *', $$
  select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/instagram-webhook',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cle-rappel', (select valeur from public.secrets_internes where nom = 'rappel_signatures')),
    body := '{}'::jsonb, timeout_milliseconds := 60000)
  where exists (select 1 from public.secrets_internes where nom = 'instagram_jeton');
$$);

-- Nouveau jeton Instagram enregistré : les posts bloqués par l'ancien jeton repartent automatiquement
create or replace function public.instagram_reprise_apres_jeton() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.nom in ('instagram_jeton', 'nawar_instagram_jeton') and new.valeur is distinct from coalesce(old.valeur, '') then
    update posts_instagram set statut = 'pret', erreur = null
     where statut = 'erreur' and visuel_url is not null and compte = case when new.nom = 'nawar_instagram_jeton' then 'nawar' else 'heavent' end
       and (erreur ilike '%permission%' or erreur ilike '%token%' or erreur ilike '%session%' or erreur ilike '%OAuth%');
  end if;
  return new;
end $$;
revoke execute on function public.instagram_reprise_apres_jeton() from public, anon, authenticated;
create trigger instagram_reprise_apres_jeton after insert or update of valeur on public.secrets_internes for each row execute function public.instagram_reprise_apres_jeton();
