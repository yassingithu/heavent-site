-- Liste des invités en direct : lien privé en lecture seule (révocable) pour un client qui n'a pas d'espace mariés,
-- et e-mail regroupé (toutes les 5 min au plus) à chaque nouvelle réponse.
alter table public.invitations_apercu
  add column if not exists jeton_liste uuid unique,          -- null = lien coupé / jamais créé
  add column if not exists notif_email text,                 -- adresse qui reçoit un e-mail à chaque nouvelle réponse
  add column if not exists notif_envoye_le timestamptz;      -- dernière réponse déjà annoncée par e-mail

-- Page publique : uniquement la liste (jamais le lien de la carte, ni l'e-mail). Rien si le lien est coupé.
create or replace function public.liste_invites_directe(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object(
    'noms', a.noms, 'date_evenement', a.date_evenement, 'lieu', a.lieu,
    'maj', now(),
    'reponses', coalesce((select json_agg(json_build_object('nom', r.nom, 'reponse', r.reponse, 'nb', r.nb_confirmes, 'accompagnants', r.accompagnants, 'le', r.created_at) order by r.created_at)
                          from public.reponses_invitation r where r.apercu_id = a.id), '[]'::json))
  from public.invitations_apercu a
  where a.jeton_liste = p_jeton and a.mode = 'final' and a.avec_reponse and a.expire_le > now();
$$;
grant execute on function public.liste_invites_directe(uuid) to anon, authenticated;

-- Nouvelle adresse : les réponses déjà reçues ne sont pas renvoyées (heure du serveur, pas celle du téléphone).
create or replace function public.invitations_apercu_notif_depart() returns trigger language plpgsql as $$
begin
  if new.notif_email is not null and new.notif_email is distinct from old.notif_email then new.notif_envoye_le := now(); end if;
  return new;
end $$;
drop trigger if exists invitations_apercu_notif_depart on public.invitations_apercu;
create trigger invitations_apercu_notif_depart before update of notif_email on public.invitations_apercu for each row execute function public.invitations_apercu_notif_depart();

-- Contrôle toutes les 5 minutes : un e-mail par carte ayant de nouvelles réponses depuis le dernier envoi.
select cron.schedule('liste-invites-notif', '*/5 * * * *', $c$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/liste-invites-notif', headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')), body := '{}'::jsonb)$c$);
-- Retour arrière : select cron.unschedule('liste-invites-notif'); alter table public.invitations_apercu drop column jeton_liste, drop column notif_email, drop column notif_envoye_le; drop function public.liste_invites_directe(uuid); drop trigger invitations_apercu_notif_depart on public.invitations_apercu; drop function public.invitations_apercu_notif_depart();
