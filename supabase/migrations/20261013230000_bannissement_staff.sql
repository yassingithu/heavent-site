-- Bannissement d'un crew (géré par la fonction admin-change-password, action "ban" / "unban")
alter table public.staff
  add column if not exists banni boolean not null default false,
  add column if not exists banni_le timestamptz,
  add column if not exists motif_bannissement text;
