-- Statistiques de fréquentation du site, sans cookie ni donnée personnelle :
-- pages vues, provenance, appareil, clics importants (WhatsApp, téléphone, devis…) et demandes envoyées.
-- « session » = identifiant aléatoire gardé le temps de l'onglet ouvert (sessionStorage), jamais relié à une personne.
create table if not exists public.evenements_site (
  id bigint generated always as identity primary key,
  cree_le timestamptz not null default now(),
  type text not null check (type in ('vue', 'clic', 'demande')),
  nom text,                -- clic : whatsapp, telephone, email, instagram, devis-entreprise… ; demande : devis-entreprise, devis-mariage, jeu, contact, rendez-vous
  chemin text not null,    -- page où l'événement a eu lieu
  source text not null,    -- google, google-ads, instagram, facebook, whatsapp, direct, autre site…
  appareil text not null check (appareil in ('mobile', 'ordinateur')),
  session text not null,
  langue text
);
create index if not exists evenements_site_date_idx on public.evenements_site (cree_le);
create index if not exists evenements_site_session_idx on public.evenements_site (session, cree_le);
alter table public.evenements_site enable row level security;
create policy "evenements_site_admin_lecture" on public.evenements_site for select to authenticated using (public.is_admin());
revoke all on public.evenements_site from anon;

-- Enregistrement depuis le site (lot de 1 à 10 événements)
create or replace function public.suivi_enregistrer(p_evenements jsonb)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if jsonb_typeof(p_evenements) <> 'array' or jsonb_array_length(p_evenements) > 10 then return; end if;
  insert into public.evenements_site (type, nom, chemin, source, appareil, session, langue)
  select e->>'type', left(e->>'nom', 40), left(e->>'chemin', 120), left(coalesce(e->>'source', 'direct'), 40),
         case when e->>'appareil' = 'mobile' then 'mobile' else 'ordinateur' end, left(e->>'session', 40), left(e->>'langue', 5)
  from jsonb_array_elements(p_evenements) e
  where e->>'type' in ('vue', 'clic', 'demande') and coalesce(e->>'chemin', '') like '/%' and length(coalesce(e->>'session', '')) between 8 and 40
    -- garde-fou contre l'envoi massif : 300 événements par session au maximum
    and (select count(*) from public.evenements_site s where s.session = e->>'session' and s.cree_le > now() - interval '1 day') < 300;
  -- On ne garde que 13 mois d'historique
  if random() < 0.005 then delete from public.evenements_site where cree_le < now() - interval '13 months'; end if;
end $$;
grant execute on function public.suivi_enregistrer(jsonb) to anon, authenticated;

-- Tableau de bord (administration) : période de p_jours jours se terminant aujourd'hui, comparée à la période précédente
create or replace function public.statistiques_site(p_jours int default 30)
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_fin timestamptz := date_trunc('day', now() at time zone 'UTC') at time zone 'UTC' + interval '1 day';
  v_debut timestamptz := v_fin - make_interval(days => greatest(1, least(p_jours, 400)));
  v_avant timestamptz := v_debut - make_interval(days => greatest(1, least(p_jours, 400)));
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  return (
    with p as (select * from public.evenements_site where cree_le >= v_debut and cree_le < v_fin),
         a as (select * from public.evenements_site where cree_le >= v_avant and cree_le < v_debut)
    select json_build_object(
      'visites', (select count(distinct session) from p),
      'pages_vues', (select count(*) from p where type = 'vue'),
      'demandes', (select count(*) from p where type = 'demande'),
      'clics_contact', (select count(*) from p where type = 'clic' and nom in ('whatsapp', 'telephone', 'email')),
      'avant', json_build_object(
        'visites', (select count(distinct session) from a),
        'pages_vues', (select count(*) from a where type = 'vue'),
        'demandes', (select count(*) from a where type = 'demande'),
        'clics_contact', (select count(*) from a where type = 'clic' and nom in ('whatsapp', 'telephone', 'email'))),
      'par_jour', (select coalesce(json_agg(json_build_object('jour', j.jour::date, 'visites', coalesce(x.visites, 0)) order by j.jour), '[]'::json)
                   from generate_series((v_debut at time zone 'UTC')::date, (v_fin at time zone 'UTC')::date - 1, interval '1 day') j(jour)
                   left join (select (cree_le at time zone 'UTC')::date as jour, count(distinct session) as visites from p group by 1) x on x.jour = j.jour::date),
      'pages', (select coalesce(json_agg(json_build_object('cle', chemin, 'valeur', n) order by n desc), '[]'::json)
                from (select chemin, count(*) n from p where type = 'vue' group by chemin order by n desc limit 12) t),
      'sources', (select coalesce(json_agg(json_build_object('cle', source, 'valeur', n) order by n desc), '[]'::json)
                  from (select source, count(distinct session) n from p group by source order by n desc limit 10) t),
      'clics', (select coalesce(json_agg(json_build_object('cle', nom, 'valeur', n) order by n desc), '[]'::json)
                from (select nom, count(*) n from p where type = 'clic' group by nom order by n desc limit 12) t),
      'demandes_detail', (select coalesce(json_agg(json_build_object('cle', nom, 'valeur', n) order by n desc), '[]'::json)
                          from (select nom, count(*) n from p where type = 'demande' group by nom) t),
      'appareils', (select coalesce(json_agg(json_build_object('cle', appareil, 'valeur', n) order by n desc), '[]'::json)
                    from (select appareil, count(distinct session) n from p group by appareil) t)
    )
  );
end $$;
grant execute on function public.statistiques_site(int) to authenticated;
