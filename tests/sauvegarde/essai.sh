#!/bin/bash
# Essai complet de l'outil de sauvegarde sur une FAUSSE production locale (Linux, données fictives, aucun accès réseau externe).
#   sudo bash tests/sauvegarde/essai.sh      (lance tout sous l'utilisateur « postgres »)
set -u
ICI=$(cd "$(dirname "$0")" && pwd); DEPOT=$(cd "$ICI/../.." && pwd)
W=/var/tmp/hs; rm -rf "$W"; mkdir -p "$W"
cp -r "$DEPOT/outils/sauvegarde" "$W/outils"; cp -r "$DEPOT/supabase/migrations" "$W/migrations"; cp "$ICI"/*.sql "$ICI"/*.py "$W/"; cp "$ICI/stubs-supabase.sql" "$W/stubs.sql"
chown -R postgres "$W"
su postgres -s /bin/bash -c "bash $ICI/essai-scenarios.sh $W"
