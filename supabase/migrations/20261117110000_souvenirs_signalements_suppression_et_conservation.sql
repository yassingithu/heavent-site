-- L'administration peut effacer un fichier du bucket « souvenirs » (suppression immédiate d'une photo après décision).
drop policy if exists souvenirs_suppression_admin on storage.objects;
create policy souvenirs_suppression_admin on storage.objects for delete to authenticated using (bucket_id = 'souvenirs' and public.is_admin());
-- Conservation des contacts et messages des demandes traitées : 12 mois (durée alignée sur celle des albums ; À VALIDER par un juriste).
create or replace function public.signalements_photos_purger() returns void language sql security definer set search_path to 'public' as $$
  update public.souvenirs_signalements set contact = null, message = null, jeton_source = null, invite_nom = null
  where statut = 'traite' and traite_le < now() - interval '12 months' and (contact is not null or message is not null or jeton_source is not null or invite_nom is not null)
$$;
revoke all on function public.signalements_photos_purger() from public, anon, authenticated;
grant execute on function public.signalements_photos_purger() to service_role;
select cron.schedule('signalements-photos-purge', '10 3 * * *', 'select public.signalements_photos_purger()');
-- Retour arrière : drop policy souvenirs_suppression_admin on storage.objects; select cron.unschedule('signalements-photos-purge'); drop function public.signalements_photos_purger();
