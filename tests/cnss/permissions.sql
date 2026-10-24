-- Données FICTIVES. Vérifie les droits sur les numéros CNSS pour de futurs utilisateurs.
\set ON_ERROR_STOP on
insert into public.admins(email) values ('admin@test.invalid');
insert into public.staff(id, email, prenom, nom, telephone, numero_securite_sociale)
values ('00000000-0000-0000-0000-00000000000a','crew.a@test.invalid','Crew','A','0600000001','111 222 333'),
       ('00000000-0000-0000-0000-00000000000b','crew.b@test.invalid','Crew','B','0600000002','111.222.333');
update public.parametres_agence set cnss_affiliation_employeur = ' 0012 3456 ' where id = 1;

create temp table resultats(test text, ok boolean);
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

select (case when ok then '✅ ' else '❌ ' end) || test from resultats;
select case when bool_and(ok) then 'TOUT EST BON (' || count(*) || ' contrôles)' else 'ÉCHEC' end from resultats;
