-- Signature électronique des contrats par le crew + rappels automatiques
-- Règles : à signer idéalement 24 h avant la mission, au plus tard le dernier jour du mois de la mission.
-- Tant que ce n'est pas signé : e-mail de rappel au crew tous les 2 jours (fonction rappel-signatures).

alter table public.contrats
  add column if not exists signe_le timestamptz,
  add column if not exists signature_nom text,
  add column if not exists signature_image text,
  add column if not exists signature_preuve jsonb,
  add column if not exists rappel_signature_le timestamptz,
  add column if not exists rappels_signature int not null default 0;

-- Contrat modifié : la signature tombe (à re-signer) et le crew est re-prévenu au prochain passage
create or replace function public.contrat_signature_invalidee()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  if new.dates is distinct from old.dates or new.taux_horaire is distinct from old.taux_horaire
    or new.salaire_brut is distinct from old.salaire_brut or new.titre is distinct from old.titre
    or new.lieu is distinct from old.lieu or new.evenement is distinct from old.evenement
    or new.staff_id is distinct from old.staff_id then
    new.rappel_signature_le := null;
    if old.signe_le is not null then
      new.signe_le := null; new.signature_nom := null; new.signature_image := null;
      new.signature_preuve := coalesce(old.signature_preuve, '{}'::jsonb) || jsonb_build_object('annulee_le', now(), 'raison', 'contrat modifié après signature');
    end if;
  end if;
  return new;
end $$;
drop trigger if exists contrat_signature_invalidee on public.contrats;
create trigger contrat_signature_invalidee before update on public.contrats
  for each row execute function public.contrat_signature_invalidee();

-- Clé privée partagée entre la tâche planifiée et la fonction de rappel (aucun accès depuis le site)
create table if not exists public.secrets_internes (nom text primary key, valeur text not null);
alter table public.secrets_internes enable row level security;
revoke all on public.secrets_internes from anon, authenticated;
insert into public.secrets_internes(nom, valeur)
  values ('rappel_signatures', encode(extensions.gen_random_bytes(24), 'hex')) on conflict (nom) do nothing;

-- Passage quotidien à 9 h (heure du Maroc)
create extension if not exists pg_net;
select cron.schedule('rappel-signatures-contrats', '0 8 * * *', $cron$
  select net.http_post(
    url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/rappel-signatures',
    headers := jsonb_build_object('Content-Type', 'application/json',
      'x-cle-rappel', (select valeur from public.secrets_internes where nom = 'rappel_signatures')),
    body := '{}'::jsonb)
$cron$);
