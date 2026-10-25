-- Fausse « production » pour tester la sauvegarde : uniquement des données fictives.
create or replace function auth.uid() returns uuid language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claim.sub', true), ''), (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'))::uuid $$;
create or replace function auth.email() returns text language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claim.email', true), ''), (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')) $$;
create or replace function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
create table auth.identities(id uuid primary key default gen_random_uuid(), user_id uuid references auth.users, provider text, identity_data jsonb);
create schema supabase_migrations;
create table supabase_migrations.schema_migrations(version text primary key, name text, statements text[]);
insert into supabase_migrations.schema_migrations values ('20261001000000', 'essai', array['select 1']);
alter table storage.objects add column updated_at timestamptz default now();
alter table cron.job add column active boolean default true;

insert into auth.users(id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@test.invalid'),
  ('22222222-2222-2222-2222-222222222222', 'imane@test.invalid'),
  ('33333333-3333-3333-3333-333333333333', 'crew@test.invalid');
insert into auth.identities(user_id, provider) select id, 'email' from auth.users;
insert into public.admins(email) values ('admin@test.invalid'), ('imane@test.invalid');
insert into public.staff(email, prenom, nom, telephone, numero_securite_sociale) values ('crew@test.invalid', 'Crew', 'Fictif', '0600000000', '000 111');
insert into public.mots_yassin(ordre, texte, pour) select g, 'Message fictif n°' || g, case when g % 2 = 0 then 'imane' else 'nawar' end from generate_series(1, 25) g;
insert into storage.objects(bucket_id, name, metadata) values
  ('photos', 'photos/a.jpg', '{"size": 11, "mimetype": "image/jpeg", "eTag": "\"MD5A\""}'),
  ('identites', 'identites/cin crew.pdf', '{"size": 13, "mimetype": "application/pdf", "eTag": "\"MD5B\""}'),
  ('assets', 'instagram/2026/b.jpg', '{"size": 11, "mimetype": "image/jpeg", "eTag": "\"MD5C\""}');
-- Comme sur Supabase : les rôles de l'API peuvent utiliser les fonctions auth.*
grant usage on schema auth to anon, authenticated, service_role;
grant execute on all functions in schema auth to anon, authenticated, service_role;
