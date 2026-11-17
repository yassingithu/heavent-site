-- PRÉPARÉE, NON APPLIQUÉE (branche correctifs-contre-verification).
-- Contre-vérification du 17/11/2026 : is_admin() ne regardait que l'e-mail ; une session sans second facteur (aal1) avait tous les droits
-- administrateur par accès direct à l'API, même si l'administrateur avait un second facteur.
-- Règle : si l'administrateur a un second facteur vérifié (TOTP) dans Supabase, sa session doit être au niveau aal2 ; sinon (pas encore inscrit) rien ne change.
-- NE PAS appliquer avant que l'écran de connexion admin sache demander le code TOTP (sinon un administrateur inscrit serait bloqué).
-- Retour arrière : recréer la fonction avec seulement la condition sur l'e-mail (voir ci-dessous).
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(auth.jwt() ->> 'email')
      and (
        coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
        or not exists (select 1 from auth.mfa_factors f where f.user_id = auth.uid() and f.status = 'verified')
      )
  )
$$;
-- Retour arrière : create or replace function public.is_admin() returns boolean language sql stable security definer set search_path to 'public'
--   as $$ select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email')) $$;
