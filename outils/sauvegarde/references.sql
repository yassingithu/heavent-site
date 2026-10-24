-- Empreintes de référence d'une base Heavent : exécuté sur la PRODUCTION (dans l'instantané de la sauvegarde)
-- puis sur la COPIE RESTAURÉE. Les deux résultats doivent être identiques ligne pour ligne.
-- Rien n'est fixé à l'avance : toutes les tables, tous les comptes et tous les droits présents sont parcourus.
-- Lecture seule : uniquement des SELECT et des SET (rôle simulé pour vérifier les droits).
-- Variable psql attendue : table_cron (cron.job en production, sauvegarde_cron.job sur la copie).
\set ON_ERROR_STOP on
\pset format unaligned
\pset tuples_only on
\pset pager off
set timezone = 'UTC';
set datestyle = 'ISO, YMD';
set intervalstyle = 'postgres';
set extra_float_digits = 3;
set bytea_output = 'hex';

-- 1. Contenu : nombre de lignes et empreinte de TOUTES les lignes de chaque table sauvegardée
select format('select %L || '' '' || count(*) || '' '' || coalesce(md5(string_agg(md5(t::text), '''' order by md5(t::text))), ''-'') from %I.%I t',
              'TABLE ' || n.nspname || '.' || c.relname, n.nspname, c.relname)
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where c.relkind in ('r', 'p') and n.nspname in ('public', 'auth', 'storage', 'supabase_migrations')
order by n.nspname, c.relname
\gexec

-- 2. Structure et droits
select x from (
  select 'COL ' || table_schema || '.' || table_name || '.' || column_name || ' ' || data_type || ' null=' || is_nullable || ' def=' || coalesce(column_default, '') x
    from information_schema.columns where table_schema = 'public'
  union all select 'FN ' || n.nspname || '.' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ') sd=' || p.prosecdef || ' ' || md5(regexp_replace(p.prosrc, '\s+', '', 'g'))
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public'
      and not exists (select 1 from pg_depend d where d.objid = p.oid and d.deptype = 'e')
  union all select 'POL ' || schemaname || '.' || tablename || '.' || policyname || ' ' || cmd || ' ' || array_to_string(roles, ',') || ' ' || md5(regexp_replace(coalesce(qual, '') || '|' || coalesce(with_check, ''), '\s+', '', 'g'))
    from pg_policies where schemaname in ('public', 'storage')
  union all select 'TRG ' || n.nspname || '.' || c.relname || '.' || t.tgname || ' ' || p.proname || ' actif=' || t.tgenabled::text
    from pg_trigger t join pg_class c on c.oid = t.tgrelid join pg_proc p on p.oid = t.tgfoid join pg_namespace n on n.oid = c.relnamespace
    where not t.tgisinternal and n.nspname in ('public', 'storage', 'auth')
  union all select 'RLS ' || n.nspname || '.' || relname || ' ' || relrowsecurity || ' force=' || relforcerowsecurity
    from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname in ('public', 'storage') and relkind = 'r'
  union all select 'DROIT ' || table_schema || '.' || table_name || ' ' || grantee || ' ' || string_agg(privilege_type, ',' order by privilege_type)
    from information_schema.role_table_grants where table_schema in ('public', 'storage') and grantee in ('anon', 'authenticated', 'service_role')
    group by table_schema, table_name, grantee
  union all select 'EXEC ' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ') ' || r.r
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace cross join (values ('anon'), ('authenticated')) r(r)
    where n.nspname = 'public' and has_function_privilege(r.r, p.oid, 'execute')
      and not exists (select 1 from pg_depend d where d.objid = p.oid and d.deptype = 'e')
  union all select 'ESPACE ' || id || ' public=' || public || ' limite=' || coalesce(file_size_limit::text, '') || ' types=' || coalesce(array_to_string(allowed_mime_types, ','), '')
    from storage.buckets
) s order by 1;

select 'TACHE ' || jobname || ' ' || schedule || ' actif=' || active || ' ' || md5(regexp_replace(command, '\s+', '', 'g'))
from :table_cron order by jobname;

-- 3. Qui voit quoi : chaque compte existant (et un visiteur anonyme) est simulé sur chaque table protégée.
--    Le nombre de lignes visibles doit être le même sur la production et sur la copie.
--    Une erreur sur un contrôle n'interrompt pas les autres (point de reprise automatique) : la ligne manque
--    alors d'un côté, ce qui fait apparaître l'écart à la comparaison.
\set ON_ERROR_STOP off
\set ON_ERROR_ROLLBACK on
with sujets as (
  select 0 ordre, 'anon'::text role, 'anonyme'::text qui, '{"role":"anon"}'::text claims, ''::text sub, ''::text email
  union all
  select 1, 'authenticated', u.id::text,
         json_build_object('sub', u.id, 'email', u.email, 'role', 'authenticated')::text, u.id::text, coalesce(u.email, '')
  from auth.users u
), tables as (
  select n.nspname, c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r'
), lignes as (
  select s.ordre, s.qui, 0 etape, format('set role %I', s.role) q from sujets s
  union all select s.ordre, s.qui, 1, format('set "request.jwt.claims" = %L', s.claims) from sujets s
  union all select s.ordre, s.qui, 2, format('set "request.jwt.claim.sub" = %L', s.sub) from sujets s
  union all select s.ordre, s.qui, 3, format('set "request.jwt.claim.email" = %L', s.email) from sujets s
  union all select s.ordre, s.qui, 4, format('set "request.jwt.claim.role" = %L', s.role) from sujets s
  union all
  select s.ordre, s.qui, 10,
    case when has_table_privilege(s.role, format('%I.%I', t.nspname, t.relname), 'select')
      then format('select %L || count(*) from %I.%I', 'ACCES ' || s.qui || ' ' || t.nspname || '.' || t.relname || ' ', t.nspname, t.relname)
      else format('select %L', 'ACCES ' || s.qui || ' ' || t.nspname || '.' || t.relname || ' refuse') end
  from sujets s cross join tables t
  union all select s.ordre, s.qui, 99, 'reset role' from sujets s
)
select q from lignes order by ordre, qui, etape, q
\gexec
