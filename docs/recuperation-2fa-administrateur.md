# Récupération administrative de la double authentification

Pas de code de secours : si tous les codes sont perdus, l'accès se rétablit côté Supabase (projet `mapiwnsjsluiwmnulhqk`).

## Deux sortes de « deuxième appareil »
- **Même secret synchronisé** (app Mots de passe + iCloud) : même facteur sur plusieurs appareils Apple. Couvre un iPhone perdu ou cassé. Ne couvre PAS la perte du compte Apple.
- **Facteur enregistré séparément** (bouton « Ajouter un autre appareil », autre application ou autre téléphone) : autre secret, autre ligne dans `auth.mfa_factors`. Couvre la perte du premier facteur. À faire en plus.
- Recommandé : un facteur synchronisé iCloud + un facteur distinct sur une autre application, clé de saisie manuelle notée hors ligne.

## Procédure si tous les codes sont perdus
1. Se connecter au tableau de bord Supabase (compte propriétaire du projet, lui-même protégé).
2. Supprimer les facteurs par le SQL ci-dessous (SQL editor du tableau de bord, rôle postgres). Depuis le 17/11/2026, le bouton « supprimer » du tableau de bord ne retire plus le DERNIER facteur d'un administrateur : un déclencheur de base le refuse.
3. L'administrateur se reconnecte avec son mot de passe seul, puis réactive la double authentification immédiatement.
4. Noter l'intervention (date, qui, pourquoi).

```sql
-- Exécuter seulement après avoir vérifié l'identité de la personne par un autre canal
delete from auth.mfa_factors where user_id = (select id from auth.users where lower(email) = lower('<email admin>'));
```

## Retour arrière général de la protection (urgence)
```sql
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path to 'public'
  as $$ select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email')) $$;
```
Les fonctions serveur (`getCaller`) refuseraient toujours un jeton aal1 d'un administrateur inscrit : supprimer ses facteurs (ci-dessus) rétablit aussi cet accès.

## Règle sur le retrait d'un facteur
- Retrait possible seulement avec une session aal2 (Supabase l'impose côté serveur quand un facteur est vérifié).
- Le DERNIER facteur d'un administrateur ne peut être retiré ni depuis le site, ni par appel direct à l'API (même avec une session aal2), ni depuis le tableau de bord : déclencheur `garder_dernier_facteur` sur `auth.mfa_factors` (migration `20261117060000`). Testé le 17/11/2026 : retrait du dernier facteur refusé ; retrait avec un autre facteur vérifié accepté. Seul le SQL exécuté en rôle postgres (procédure ci-dessus) le contourne.
- Retour arrière du déclencheur : `drop trigger garder_dernier_facteur on auth.mfa_factors; drop function public._garder_dernier_facteur();`
- La protection est PAR administrateur : un administrateur sans facteur (au 17/11/2026 : Yassin a 2 facteurs ; Imane n'en a pas, activation volontairement reportée) reste accepté en mot de passe seul. Imane doit activer son code pour que la protection soit complète.
