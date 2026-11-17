-- Le dernier code (second facteur) d'un administrateur ne peut plus être retiré par le service d'authentification :
-- ni depuis le site, ni par appel direct à l'API, ni par le tableau de bord Supabase (test du 17/11/2026 : une session avec code pouvait
-- retirer son dernier facteur par l'API ; la session sans code retrouvait alors tous les droits administrateur).
-- Seule la connexion SQL directe (rôle postgres) peut le faire : c'est la procédure de récupération de docs/recuperation-2fa-administrateur.md.
-- Retirer un code reste possible tant qu'un autre code vérifié existe (changement d'appareil : ajouter le nouveau, puis retirer l'ancien).
-- Effet de bord assumé : supprimer par l'API le compte d'un administrateur qui a des codes est refusé ; on le fait en SQL.
create or replace function public._garder_dernier_facteur() returns trigger
language plpgsql security definer set search_path to 'public', 'auth' as $$
begin
  if old.status::text = 'verified' and session_user not in ('postgres', 'supabase_admin')
     and exists (select 1 from public.admins a join auth.users u on lower(u.email) = lower(a.email) where u.id = old.user_id)
     and not exists (select 1 from auth.mfa_factors f where f.user_id = old.user_id and f.status::text = 'verified' and f.id <> old.id)
  then
    raise exception 'Dernier code d''un administrateur : retrait refusé (voir docs/recuperation-2fa-administrateur.md).';
  end if;
  return old;
end $$;
drop trigger if exists garder_dernier_facteur on auth.mfa_factors;
create trigger garder_dernier_facteur before delete on auth.mfa_factors for each row execute function public._garder_dernier_facteur();
-- Retour arrière : drop trigger garder_dernier_facteur on auth.mfa_factors; drop function public._garder_dernier_facteur();
