-- Limites réelles des comptes gratuits (vérifiées le 18/11/2026) et comptage des jetons IA.
-- Supabase gratuit confirmé (organisation heavent) ; Groq et Resend gratuits confirmés par Yassin.
update public.quotas_limites set confirme = true, source = 'Plan gratuit Supabase confirmé (organisation heavent) : 500 Mo par projet, documentation officielle' where ressource = 'base_donnees';
update public.quotas_limites set confirme = true, source = 'Plan gratuit Supabase confirmé (organisation heavent) : 1 Go de fichiers, documentation officielle' where ressource = 'stockage_fichiers';
update public.quotas_limites set limite = 3000, unite = 'e-mails/mois', confirme = true, source = 'Plan gratuit Resend confirmé par Yassin (18/11/2026) : 100 par jour, 3 000 par mois ; consommation non mesurée' where ressource = 'emails';
update public.quotas_limites set libelle = 'Appels IA (Heavent City et Imane)', limite = 1000, unite = 'appels/jour', confirme = true, source = 'Plan gratuit Groq confirmé par Yassin (18/11/2026) : openai/gpt-oss-20b, 30 par minute, 1 000 par jour, 8 000 jetons par minute, 200 000 jetons par jour' where ressource = 'appels_ia';

create or replace function public.quota_compter_n(p_ressource text, p_n integer) returns void
language sql security definer set search_path to 'public' as $$
  insert into public.quotas_usages (ressource, jour, n) values (p_ressource, current_date, greatest(coalesce(p_n,0),0))
  on conflict (ressource, jour) do update set n = public.quotas_usages.n + greatest(coalesce(p_n,0),0) $$;
revoke all on function public.quota_compter_n(text, integer) from public, anon, authenticated;
grant execute on function public.quota_compter_n(text, integer) to service_role;

insert into public.quotas_limites (ressource, libelle, unite, limite, confirme, source, mesure_auto)
values ('jetons_ia', 'Jetons IA (Heavent City et Imane)', 'jetons/jour', 200000, true,
  'Groq plan gratuit confirmé par Yassin (18/11/2026) : 200 000 jetons par jour, 8 000 par minute (openai/gpt-oss-20b). Mesuré depuis le 18/11/2026 sur les réponses de Groq', false)
on conflict (ressource) do nothing;

-- quota_resume : appels et jetons IA comptés par jour ; lignes « plan gratuit confirmé » ; plus de « à confirmer » une fois le plan connu.
-- (La définition complète de la fonction est celle en base ; voir pg_get_functiondef('public.quota_resume'::regproc).)
-- Retour arrière : delete from public.quotas_limites where ressource = 'jetons_ia'; drop function public.quota_compter_n(text, integer);
