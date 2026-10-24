#!/usr/bin/env bash
# Rejoue toutes les migrations du dépôt dans un Postgres LOCAL jetable (aucune connexion à la production),
# puis vérifie les droits sur les numéros CNSS avec des données fictives.
#   bash tests/cnss/permissions.sh     (nécessite PostgreSQL 16+ installé localement)
set -euo pipefail
ICI=$(cd "$(dirname "$0")" && pwd); RACINE=$(cd "$ICI/../.." && pwd)
DOS=$(mktemp -d); P=$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | tail -1 || dirname "$(command -v initdb)")
UTIL=$( [ "$(id -u)" = 0 ] && echo postgres || id -un )
[ "$UTIL" = postgres ] && chown postgres "$DOS"
lancer() { if [ "$UTIL" = postgres ]; then su postgres -c "$1"; else bash -c "$1"; fi; }
lancer "$P/initdb -D $DOS/d -U postgres >/dev/null && $P/pg_ctl -D $DOS/d -o '-p 5498 -k $DOS -c listen_addresses=' -l $DOS/log start >/dev/null"
trap 'lancer "$P/pg_ctl -D $DOS/d stop -m fast >/dev/null"; rm -rf "$DOS"' EXIT
sleep 1; Q="psql -h $DOS -p 5498 -U postgres -q -X"
$Q -c "create database cnss_test"; $Q -d cnss_test -f "$ICI/stubs-supabase.sql" >/dev/null
for f in "$RACINE"/supabase/migrations/*.sql; do
  sed -E '/create extension if not exists (pg_cron|pg_net)/Id' "$f" | $Q -d cnss_test -v ON_ERROR_STOP=1 >/dev/null 2>"$DOS/err" || { echo "Migration en échec : $(basename "$f")"; cat "$DOS/err"; exit 1; }
done
$Q -d cnss_test -tA -f "$ICI/permissions.sql" | tee "$DOS/res"
grep -q "^TOUT EST BON" "$DOS/res"
