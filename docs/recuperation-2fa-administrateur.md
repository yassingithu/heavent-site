# Récupération administrative de la double authentification

Pas de code de secours : si tous les codes sont perdus, l'accès se rétablit côté Supabase (projet `mapiwnsjsluiwmnulhqk`).

## Deux sortes de « deuxième appareil »
- **Même secret synchronisé** (app Mots de passe + iCloud) : même facteur sur plusieurs appareils Apple. Couvre un iPhone perdu ou cassé. Ne couvre PAS la perte du compte Apple.
- **Facteur enregistré séparément** (bouton « Ajouter un autre appareil », autre application ou autre téléphone) : autre secret, autre ligne dans `auth.mfa_factors`. Couvre la perte du premier facteur. À faire en plus.
- Recommandé : un facteur synchronisé iCloud + un facteur distinct sur une autre application, clé de saisie manuelle notée hors ligne.

## Procédure si tous les codes sont perdus
1. Se connecter au tableau de bord Supabase (compte propriétaire du projet, lui-même protégé).
2. Authentication → Users → l'administrateur concerné → Factors → supprimer chaque facteur (ou SQL ci-dessous, rôle postgres uniquement).
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
- Le site refuse de retirer le DERNIER facteur : une session ouverte ne peut pas désactiver la double authentification depuis l'interface. Limite connue : un appel direct à l'API avec une session aal2 pourrait encore le faire ; il faut déjà posséder le code, donc ce n'est pas un contournement par mot de passe seul. Le tableau de bord Supabase reste la seule voie pour réinitialiser.
- La protection est PAR administrateur : un administrateur sans facteur (aujourd'hui Imane et Yassin n'en ont aucun) reste accepté en mot de passe seul. Les deux administrateurs doivent activer leur code pour que la protection soit complète.
