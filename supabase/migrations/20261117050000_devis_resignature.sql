-- Seconde signature : un devis signé dont le contenu commercial change (lignes, montants, dates, lieu, conditions, identité du client)
-- perd sa signature et doit être signé à nouveau par le client. Règle appliquée par la base, quel que soit l'outil qui modifie.
--  * la comparaison se fait avec l'instantané figé à la signature (documents_signes) : un enregistrement sans changement ne déclenche rien ;
--  * contrôle différé en fin de transaction : « supprimer puis réinsérer les lignes » ne déclenche rien si le résultat est identique ;
--  * même si une facture d'acompte existe déjà (heures en plus…) : la signature tombe aussi, et plus aucune facture ne peut être créée avant la seconde signature ;
--  * l'ancienne signature reste prouvée : instantané conservé, ancienne preuve gardée sous signature_preuve->'precedente'.
-- À déployer avec la mise en ligne du site (bandeau client + avertissement admin) et de la fonction signer-devis.

alter table public.devis add column if not exists resignature_requise_le timestamptz;

create or replace function public._devis_contenu_signe(p_devis jsonb, p_lignes jsonb)
returns jsonb language sql immutable set search_path to 'public' as $$
  select jsonb_build_object(
    'devis', jsonb_build_object(
      'titre', p_devis->'titre', 'date_evenement', p_devis->'date_evenement', 'date_fin_evenement', p_devis->'date_fin_evenement',
      'lieu', p_devis->'lieu', 'nb_personnes', p_devis->'nb_personnes', 'remise_globale_pct', p_devis->'remise_globale_pct',
      'taux_tva', p_devis->'taux_tva', 'total_ht', p_devis->'total_ht', 'total_remise', p_devis->'total_remise',
      'total_tva', p_devis->'total_tva', 'total_ttc', p_devis->'total_ttc', 'acompte_pct', p_devis->'acompte_pct',
      'devise', p_devis->'devise', 'conditions', p_devis->'conditions', 'client_nom', p_devis->'client_nom',
      'client_societe', p_devis->'client_societe', 'client_adresse', p_devis->'client_adresse', 'client_ice', p_devis->'client_ice'),
    'lignes', coalesce((select jsonb_agg(jsonb_build_object(
        'designation', l->'designation', 'description', l->'description', 'quantite', l->'quantite', 'duree', l->'duree',
        'unite', l->'unite', 'prix_unitaire', l->'prix_unitaire', 'remise_pct', l->'remise_pct', 'total_ht', l->'total_ht')
        order by (l->>'ordre')::numeric nulls last, l->>'designation')
      from jsonb_array_elements(coalesce(p_lignes, '[]'::jsonb)) l), '[]'::jsonb));
$$;

create or replace function public._devis_verifier_resignature()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_id uuid;
  d public.devis%rowtype;
  v_snap jsonb;
  v_actuel jsonb;
  v_lignes jsonb;
begin
  if tg_table_name = 'devis_lignes' then v_id := coalesce(new.devis_id, old.devis_id);
  else v_id := coalesce(new.id, old.id); end if;
  select * into d from public.devis where id = v_id;
  if not found or d.signe_le is null then return null; end if;

  select s.contenu into v_snap from public.documents_signes s
    where s.type = 'devis' and s.doc_id = d.id order by s.version desc limit 1;
  if v_snap is null then return null; end if;   -- signé avant la mise en place des instantanés : rien à comparer

  select coalesce(jsonb_agg(to_jsonb(l)), '[]'::jsonb) into v_lignes from public.devis_lignes l where l.devis_id = d.id;
  v_actuel := public._devis_contenu_signe(to_jsonb(d), v_lignes);
  if v_actuel = public._devis_contenu_signe(v_snap, v_snap->'lignes') then return null; end if;

  update public.devis set
    signe_le = null, signature_nom = null, signature_image = null,
    signature_preuve = jsonb_build_object('annulee_le', now(), 'raison', 'contenu modifié après signature',
                                          'ancien_signataire', d.signature_nom, 'ancienne_signature_le', d.signe_le,
                                          'precedente', d.signature_preuve),
    statut = case when statut = 'accepte' then 'envoye' else statut end,
    resignature_requise_le = now()
  where id = d.id;
  return null;
end $$;

drop trigger if exists devis_resignature_devis on public.devis;
create constraint trigger devis_resignature_devis after update on public.devis
  deferrable initially deferred for each row execute function public._devis_verifier_resignature();

drop trigger if exists devis_resignature_lignes on public.devis_lignes;
create constraint trigger devis_resignature_lignes after insert or update or delete on public.devis_lignes
  deferrable initially deferred for each row execute function public._devis_verifier_resignature();

-- La nouvelle signature lève l'exigence.
create or replace function public._devis_resignature_levee()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  if old.signe_le is null and new.signe_le is not null then new.resignature_requise_le := null; end if;
  return new;
end $$;
drop trigger if exists devis_resignature_levee on public.devis;
create trigger devis_resignature_levee before update of signe_le on public.devis
  for each row execute function public._devis_resignature_levee();

-- Pas de facturation tant que la seconde signature n'est pas donnée.
create or replace function public._facture_exige_signature()
returns trigger language plpgsql set search_path to 'public' as $$
declare v_flag timestamptz;
begin
  if new.devis_id is not null then
    select resignature_requise_le into v_flag from public.devis where id = new.devis_id;
    if v_flag is not null then raise exception 'Le devis a été modifié : le client doit le signer à nouveau avant toute facture.'; end if;
  end if;
  return new;
end $$;
drop trigger if exists factures_exige_signature on public.factures;
create trigger factures_exige_signature before insert on public.factures
  for each row execute function public._facture_exige_signature();

-- Retour arrière (texte) :
--   drop trigger devis_resignature_devis on public.devis; drop trigger devis_resignature_lignes on public.devis_lignes;
--   drop trigger devis_resignature_levee on public.devis; drop trigger factures_exige_signature on public.factures;
--   drop function public._devis_verifier_resignature(), public._devis_resignature_levee(), public._facture_exige_signature(), public._devis_contenu_signe(jsonb,jsonb);
--   (la colonne resignature_requise_le peut rester.)
