-- Audit jetons (16/11/2026) : le suivi des visites ne doit jamais enregistrer un jeton privé.
-- Le navigateur ignore déjà les pages privées ; on ajoute un garde-fou côté base : toute adresse qui contient
-- un identifiant (UUID) ou commence par une route privée est refusée. Une ligne déjà enregistrée avec un UUID est supprimée.
-- Retour arrière : recréer suivi_enregistrer sans la ligne « chemin !~* … ».

delete from public.evenements_site where chemin ~* '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

create or replace function public.suivi_enregistrer(p_evenements jsonb) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
  if jsonb_typeof(p_evenements) <> 'array' or jsonb_array_length(p_evenements) > 10 then return; end if;
  insert into public.evenements_site (type, nom, chemin, source, appareil, session, langue)
  select e->>'type', left(e->>'nom', 40), left(e->>'chemin', 120), left(coalesce(e->>'source', 'direct'), 40),
         case when e->>'appareil' = 'mobile' then 'mobile' else 'ordinateur' end, left(e->>'session', 40), left(e->>'langue', 5)
  from jsonb_array_elements(p_evenements) e
  where e->>'type' in ('vue', 'clic', 'demande') and coalesce(e->>'chemin', '') like '/%' and length(coalesce(e->>'session', '')) between 8 and 40
    and coalesce(e->>'chemin', '') !~* '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
    and coalesce(e->>'chemin', '') !~* '^/(admin|auth|staff|mon-devis|mon-mariage|rsvp|souvenirs|invitation|liste|reponse|desinscription|prestataires/confirmer|studio/demo)'
    and (select count(*) from public.evenements_site s where s.session = e->>'session' and s.cree_le > now() - interval '1 day') < 300;
  if random() < 0.005 then delete from public.evenements_site where cree_le < now() - interval '13 months'; end if;
end $$;
