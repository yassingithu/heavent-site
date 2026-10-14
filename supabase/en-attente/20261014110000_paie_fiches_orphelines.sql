-- NON APPLIQUÉ (la base demande une confirmation qui n'arrive pas) : remplacé par le nettoyage fait par l'admin
-- du site dans FichesPaieMensuelles.tsx (retirerFichesSansMission). Gardé pour référence.
-- « Calculer le mois » retire aussi les fiches automatiques, encore en attente,
-- dont toutes les missions ont été supprimées (une fiche validée ou payée n'est jamais touchée).
CREATE OR REPLACE FUNCTION public.generer_fiches_paie(p_annee integer, p_mois integer)
 RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
declare
  n int := 0;
  r record;
  avec_travail uuid[] := '{}';
begin
  if auth.uid() is not null and not public.is_admin() then
    raise exception 'Accès refusé';
  end if;
  for r in
    with lignes as (
      select a.staff_id, a.date_jour, a.heures, a.taux_horaire as taux, a.poste,
             coalesce(d.titre, d.client_societe, d.client_nom) as evenement, d.numero
      from public.affectations a join public.devis d on d.id = a.devis_id
      where a.statut = 'confirme'
      union all
      select c.staff_id, (x->>'date')::date, coalesce((x->>'heures')::numeric, 0),
             coalesce((x->>'taux')::numeric, c.taux_horaire, 0), c.titre, coalesce(c.evenement, c.description), null
      from public.contrats c cross join lateral jsonb_array_elements(coalesce(c.dates, '[]'::jsonb)) x
      where c.devis_id is null and c.statut <> 'annule'
    )
    select l.staff_id, sum(l.heures) as heures, round(sum(l.heures * l.taux), 2) as brut,
           jsonb_agg(jsonb_build_object('date', l.date_jour, 'evenement', l.evenement, 'numero', l.numero, 'poste', l.poste,
             'heures', l.heures, 'taux', l.taux, 'montant', round(l.heures * l.taux, 2)) order by l.date_jour) as details
    from lignes l
    where extract(year from l.date_jour) = p_annee and extract(month from l.date_jour) = p_mois
    group by l.staff_id
  loop
    avec_travail := avec_travail || r.staff_id;
    insert into public.fiches_paie as f
      (staff_id, mois, annee, heures_travaillees, salaire_brut, cnss, amo, deductions, prime, salaire_net, details, statut, generee_auto)
    values
      (r.staff_id, p_mois, p_annee, r.heures, r.brut,
       round(least(r.brut, 6000) * 0.0448, 2), round(r.brut * 0.0226, 2),
       round(least(r.brut, 6000) * 0.0448, 2) + round(r.brut * 0.0226, 2), 0,
       r.brut - round(least(r.brut, 6000) * 0.0448, 2) - round(r.brut * 0.0226, 2),
       r.details, 'en_attente', true)
    on conflict (staff_id, mois, annee) do update set
      heures_travaillees = excluded.heures_travaillees, salaire_brut = excluded.salaire_brut,
      cnss = excluded.cnss, amo = excluded.amo, deductions = excluded.deductions,
      salaire_net = excluded.salaire_net + coalesce(f.prime, 0),
      details = excluded.details, generee_auto = true
    where f.statut = 'en_attente';
    n := n + 1;
  end loop;
  delete from public.fiches_paie
  where annee = p_annee and mois = p_mois and generee_auto and statut = 'en_attente'
    and not (staff_id = any(avec_travail));
  return n;
end;
$function$;
