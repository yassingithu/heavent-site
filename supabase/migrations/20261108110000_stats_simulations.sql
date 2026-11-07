-- Entonnoir de la simulation Heavent City : commencée / terminée / a mené à une demande (visiteurs distincts par session, donc sans double comptage).
-- Les événements « sim-debut:city » et « sim-fin:city » sont enregistrés comme des clics ; ils sont exclus de la liste « Clics importants ».
create or replace function public.statistiques_site(p_jours integer default 30)
returns json language plpgsql stable security definer set search_path to 'public' as $function$
declare
  v_fin timestamptz := date_trunc('day', now() at time zone 'UTC') at time zone 'UTC' + interval '1 day';
  v_debut timestamptz := v_fin - make_interval(days => greatest(1, least(p_jours, 400)));
  v_avant timestamptz := v_debut - make_interval(days => greatest(1, least(p_jours, 400)));
begin
  if not (public.is_admin() or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  return (
    with p as (select * from public.evenements_site where cree_le >= v_debut and cree_le < v_fin),
         a as (select * from public.evenements_site where cree_le >= v_avant and cree_le < v_debut),
         sp as (select session,
                  bool_or(type = 'clic' and nom = 'sim-debut:city') as d, bool_or(type = 'clic' and nom = 'sim-fin:city') as f,
                  bool_or(type = 'demande' and nom = 'heavent-city') as q from p group by session),
         sa as (select session,
                  bool_or(type = 'clic' and nom = 'sim-debut:city') as d, bool_or(type = 'clic' and nom = 'sim-fin:city') as f,
                  bool_or(type = 'demande' and nom = 'heavent-city') as q from a group by session)
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
      'simulations', json_build_object(
        'debut', (select count(*) from sp where d or f or q), 'fin', (select count(*) from sp where f), 'demande', (select count(*) from sp where q),
        'avant', json_build_object('debut', (select count(*) from sa where d or f or q), 'fin', (select count(*) from sa where f), 'demande', (select count(*) from sa where q))),
      'par_jour', (select coalesce(json_agg(json_build_object('jour', j.jour::date, 'visites', coalesce(x.visites, 0)) order by j.jour), '[]'::json)
                   from generate_series((v_debut at time zone 'UTC')::date, (v_fin at time zone 'UTC')::date - 1, interval '1 day') j(jour)
                   left join (select (cree_le at time zone 'UTC')::date as jour, count(distinct session) as visites from p group by 1) x on x.jour = j.jour::date),
      'pages', (select coalesce(json_agg(json_build_object('cle', chemin, 'valeur', n) order by n desc), '[]'::json)
                from (select chemin, count(*) n from p where type = 'vue' group by chemin order by n desc limit 12) t),
      'sources', (select coalesce(json_agg(json_build_object('cle', source, 'valeur', n) order by n desc), '[]'::json)
                  from (select source, count(distinct session) n from p group by source order by n desc limit 10) t),
      'clics', (select coalesce(json_agg(json_build_object('cle', nom, 'valeur', n) order by n desc), '[]'::json)
                from (select nom, count(*) n from p where type = 'clic' and nom not like 'sim-%' group by nom order by n desc limit 12) t),
      'demandes_detail', (select coalesce(json_agg(json_build_object('cle', nom, 'valeur', n) order by n desc), '[]'::json)
                          from (select nom, count(*) n from p where type = 'demande' group by nom) t),
      'appareils', (select coalesce(json_agg(json_build_object('cle', appareil, 'valeur', n) order by n desc), '[]'::json)
                    from (select appareil, count(distinct session) n from p group by appareil) t)
    )
  );
end $function$;
