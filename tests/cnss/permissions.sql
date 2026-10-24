-- Données FICTIVES. Vérifie les droits sur les numéros CNSS pour de futurs utilisateurs.
\set ON_ERROR_STOP on
insert into public.admins(email) values ('admin@test.invalid');
insert into public.staff(id, email, prenom, nom, telephone, numero_securite_sociale)
values ('00000000-0000-0000-0000-00000000000a','crew.a@test.invalid','Crew','A','0600000001','111 222 333'),
       ('00000000-0000-0000-0000-00000000000b','crew.b@test.invalid','Crew','B','0600000002','111.222.333');
update public.parametres_agence set cnss_affiliation_employeur = ' 0012 3456 ' where id = 1;

create temp table resultats(test text, ok boolean);
\o /dev/null
grant all on resultats to anon, authenticated;

-- 1. Valeur conservée telle que saisie (espaces et zéros en tête)
insert into resultats select 'numéro employeur conservé tel quel', cnss_affiliation_employeur = ' 0012 3456 ' from public.parametres_agence where id = 1;

-- 2. Doublon possible en base (pas de contrainte unique : signalement côté administration)
insert into resultats select 'deux crews peuvent avoir un numéro identique à la comparaison (signalé, non bloqué)', count(*) = 2 from public.staff;

-- 3. Visiteur non connecté
set role anon; select set_config('request.jwt.claims', '{}', false), set_config('request.jwt.claim.email', '', false);
-- « aucune ligne » ou « accès refusé » sont tous deux des réussites
do $$ declare n int; begin
  begin select count(*) into n from public.staff; exception when insufficient_privilege then n := 0; end;
  insert into resultats values ('anonyme : aucun crew lisible', n = 0);
  begin select count(*) into n from public.parametres_agence; exception when insufficient_privilege then n := 0; end;
  insert into resultats values ('anonyme : paramètres agence non lisibles', n = 0);
end $$;
reset role;

-- 4. Crew A connecté
set role authenticated; select set_config('request.jwt.claims', '{"email":"crew.a@test.invalid"}', false), set_config('request.jwt.claim.email', 'crew.a@test.invalid', false);
insert into resultats select 'crew A : voit uniquement sa fiche', count(*) = 1 and bool_and(email = 'crew.a@test.invalid') from public.staff;
insert into resultats select 'crew A : ne voit pas le numéro de B', count(*) = 0 from public.staff where email = 'crew.b@test.invalid';
insert into resultats select 'crew A : lit le n° employeur (imprimé sur ses bulletins)', count(*) = 1 from public.parametres_agence where cnss_affiliation_employeur is not null;
with m as (update public.parametres_agence set cnss_affiliation_employeur = 'PIRATE' where id = 1 returning 1)
insert into resultats select 'crew A : ne peut pas modifier le n° employeur', count(*) = 0 from m;
with m as (update public.staff set numero_securite_sociale = '000' where email = 'crew.b@test.invalid' returning 1)
insert into resultats select 'crew A : ne peut pas modifier le numéro de B', count(*) = 0 from m;
reset role;

-- 5. Administration
set role authenticated; select set_config('request.jwt.claims', '{"email":"admin@test.invalid"}', false), set_config('request.jwt.claim.email', 'admin@test.invalid', false);
insert into resultats select 'admin : voit les deux crews (détection des doublons)', count(*) = 2 from public.staff;
with m as (update public.parametres_agence set cnss_affiliation_employeur = '0099' where id = 1 returning 1)
insert into resultats select 'admin : peut enregistrer le n° employeur', count(*) = 1 from m;
reset role;

-- 6. Registre des paiements (données fictives)
insert into public.fiches_paie(id, staff_id, mois, annee, statut, salaire_brut, salaire_net)
values ('00000000-0000-0000-0000-0000000000f1', '00000000-0000-0000-0000-00000000000a', 10, 2026, 'en_attente', 480, 447.65),
       ('00000000-0000-0000-0000-0000000000f2', '00000000-0000-0000-0000-00000000000b', 10, 2026, 'en_attente', 480, 447.65);
set role authenticated; select set_config('request.jwt.claims', '{"email":"admin@test.invalid"}', false), set_config('request.jwt.claim.email', 'admin@test.invalid', false);
insert into public.paiements_paie(id, fiche_id, montant, date_paiement, mode, enregistre_par, enregistre_le)
values ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000f1', 447.65, '2026-10-31', 'virement', 'faux@auteur', '2000-01-01');
reset role;
insert into resultats select 'paiement : auteur imposé par la base (pas celui envoyé)', enregistre_par = 'admin@test.invalid' and enregistre_le > now() - interval '1 minute' from public.paiements_paie;
insert into resultats select 'paiement : le bulletin reste « à valider » (pas de validation automatique)', statut = 'en_attente' from public.fiches_paie where id = '00000000-0000-0000-0000-0000000000f1';
do $$ declare ok boolean; begin
  begin update public.paiements_paie set montant = 1; ok := false; exception when others then ok := true; end;
  insert into resultats values ('paiement : modification refusée (même super-utilisateur)', ok);
  begin delete from public.paiements_paie; ok := false; exception when others then ok := true; end;
  insert into resultats values ('paiement : suppression refusée', ok);
  begin delete from public.fiches_paie where id = '00000000-0000-0000-0000-0000000000f1'; ok := false; exception when others then ok := true; end;
  insert into resultats values ('bulletin payé : suppression du bulletin refusée', ok);
  begin insert into public.paiements_paie(fiche_id, montant, date_paiement, mode, corrige_paiement) values ('00000000-0000-0000-0000-0000000000f1', -447.65, '2026-11-01', 'virement', (select id from public.paiements_paie limit 1)); ok := false; exception when others then ok := true; end;
  insert into resultats values ('correction sans motif refusée', ok);
  begin insert into public.paiements_paie(fiche_id, montant, date_paiement, mode, corrige_paiement, note) values ('00000000-0000-0000-0000-0000000000f2', -447.65, '2026-11-01', 'virement', (select id from public.paiements_paie limit 1), 'erreur'); ok := false; exception when others then ok := true; end;
  insert into resultats values ('correction visant le paiement d''un autre bulletin refusée', ok);
end $$;
insert into public.paiements_paie(fiche_id, montant, date_paiement, mode, corrige_paiement, note)
values ('00000000-0000-0000-0000-0000000000f1', -47.65, '2026-11-01', 'virement', (select id from public.paiements_paie limit 1), 'trop versé');
insert into resultats select 'correction motivée acceptée : total payé recalculé', sum(montant) = 400 from public.paiements_paie;
set role authenticated; select set_config('request.jwt.claims', '{"email":"crew.a@test.invalid"}', false), set_config('request.jwt.claim.email', 'crew.a@test.invalid', false);
insert into resultats select 'crew A : voit les paiements de SON bulletin', count(*) = 2 from public.paiements_paie;
do $$ declare ok boolean; begin
  begin insert into public.paiements_paie(fiche_id, montant, date_paiement, mode) values ('00000000-0000-0000-0000-0000000000f1', 10, '2026-11-01', 'especes'); ok := false; exception when others then ok := true; end;
  insert into resultats values ('crew A : ne peut pas enregistrer de paiement', ok);
end $$;
reset role;
set role authenticated; select set_config('request.jwt.claims', '{"email":"crew.b@test.invalid"}', false), set_config('request.jwt.claim.email', 'crew.b@test.invalid', false);
insert into resultats select 'crew B : ne voit pas les paiements de A', count(*) = 0 from public.paiements_paie;
reset role;
set role anon;
do $$ declare n int; begin
  begin select count(*) into n from public.paiements_paie; exception when insufficient_privilege then n := 0; end;
  insert into resultats values ('anonyme : aucun paiement lisible', n = 0);
end $$;
reset role;

\o
select (case when ok then '✅ ' else '❌ ' end) || test from resultats;
select case when bool_and(ok) then 'TOUT EST BON (' || count(*) || ' contrôles)' else 'ÉCHEC' end from resultats;
