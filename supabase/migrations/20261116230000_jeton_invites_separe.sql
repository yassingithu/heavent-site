-- Audit jetons (16/11/2026) : le lien envoyé à tous les invités (/reponse/…, /souvenirs/mariage/…)
-- réutilisait le jeton du devis, qui ouvre aussi l'espace privé des mariés (liste complète des invités, devis, factures).
-- Les invités reçoivent désormais un jeton à part (lien_reponse_token), qui ne sert qu'à répondre et à déposer des souvenirs.
-- Aucun devis n'existait au moment de la migration : aucun lien déjà diffusé n'est cassé.
-- Retour arrière : voir la fin du fichier.

alter table public.devis add column if not exists lien_reponse_token uuid not null default gen_random_uuid();
create unique index if not exists devis_lien_reponse_token_idx on public.devis (lien_reponse_token);

create or replace function public._devis_reponse(p_token uuid) returns uuid
language sql stable security definer set search_path to 'public' as $$
  select id from public.devis where lien_reponse_token = p_token and type = 'mariage' and statut = 'accepte';
$$;
revoke all on function public._devis_reponse(uuid) from public, anon, authenticated;

-- Les trois fonctions réservées aux invités passent sur le jeton « invités » (le reste de leur code est inchangé)
do $$
declare f record; def text;
begin
  for f in select p.oid from pg_proc p join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and p.proname in ('rsvp_groupe_infos', 'rsvp_groupe_chercher', 'rsvp_groupe_ajouter')
  loop
    def := pg_get_functiondef(f.oid);
    if def like '%public._devis_mariage(p_token)%' then
      execute replace(def, 'public._devis_mariage(p_token)', 'public._devis_reponse(p_token)');
    end if;
  end loop;
end $$;

-- Le devis public ne montre jamais le jeton des invités ; l'espace des mariés le reçoit pour fabriquer le lien à partager
create or replace function public.devis_public(p_token uuid) returns json
language sql stable security definer set search_path to 'public' as $$
  select json_build_object(
    'devis', (select to_jsonb(d) - 'notes_internes' - 'signature_preuve' - 'demande_entreprise_id' - 'demande_mariage_id' - 'relances' - 'derniere_relance_le' - 'avis_demande_le' - 'lien_reponse_token'
              from public.devis d where d.lien_token = p_token),
    'lignes', (select coalesce(json_agg(l order by l.ordre), '[]'::json) from public.devis_lignes l join public.devis d on d.id = l.devis_id where d.lien_token = p_token),
    'agence', (select to_jsonb(p) - 'lien_avis_google' - 'conditions_contrat' from public.parametres_agence p where p.id = 1),
    'factures', (select coalesce(json_agg(to_jsonb(f) - 'notes' - 'creee_par' order by f.numero), '[]'::json)
                 from public.factures f join public.devis d on d.id = f.devis_id where d.lien_token = p_token and f.statut <> 'annulee'),
    'equipe', (select coalesce(json_agg(e order by e->>'prenom'), '[]'::json) from (
                 select json_build_object('id', s.id, 'prenom', s.prenom, 'initiale', left(s.nom, 1), 'poste', min(a.poste),
                   'note', (select v.note from public.evaluations_crew v where v.devis_id = d.id and v.staff_id = s.id)) as e
                 from public.devis d join public.affectations a on a.devis_id = d.id join public.staff s on s.id = a.staff_id
                 where d.lien_token = p_token and d.statut = 'accepte' and a.statut <> 'annule'
                   and coalesce(d.date_evenement, current_date + 1) <= (now() at time zone 'UTC')::date
                 group by d.id, s.id, s.prenom, s.nom) x),
    'avis_google', (select nullif(trim(p.lien_avis_google), '') from public.parametres_agence p, public.devis d
                    where p.id = 1 and d.lien_token = p_token and d.statut = 'accepte'
                      and coalesce(d.date_evenement, current_date + 1) <= (now() at time zone 'UTC')::date)
  )
  where exists (select 1 from public.devis d where d.lien_token = p_token);
$$;

create or replace function public.espace_maries_public(p_token uuid) returns json
language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid := public._devis_mariage(p_token);
begin
  if v_id is null then return null; end if;
  insert into public.espace_maries (devis_id, noms) select v_id, d.client_nom from public.devis d where d.id = v_id
    on conflict (devis_id) do nothing;
  return json_build_object(
    'devis', (select json_build_object('client_nom', d.client_nom, 'date_evenement', d.date_evenement, 'lieu', d.lieu, 'nb_personnes', d.nb_personnes, 'total_ttc', d.total_ttc, 'devise', d.devise, 'marque', d.marque, 'reponse_token', d.lien_reponse_token)
              from public.devis d where d.id = v_id),
    'espace', (select to_jsonb(e) - 'devis_id' from public.espace_maries e where e.devis_id = v_id),
    'invites', (select coalesce(json_agg(to_jsonb(i) - 'devis_id' order by i.created_at), '[]'::json) from public.invites_mariage i where i.devis_id = v_id)
  );
end $$;

-- Retour arrière : réécrire les trois fonctions rsvp_groupe_* avec _devis_mariage, restaurer devis_public / espace_maries_public
-- de la migration précédente, puis : drop function public._devis_reponse(uuid); alter table public.devis drop column lien_reponse_token;
