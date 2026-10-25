#!/bin/bash
# Installation de la sauvegarde locale chiffrée Heavent sur le Mac de Yassin.
#   bash installer.sh
# Ce script ne paie rien, n'envoie aucune donnée vers un nouveau service et ne modifie pas la production.
# Les secrets sont saisis dans des invites masquées du Trousseau macOS : ils n'apparaissent ni à l'écran ni dans l'historique.
set -u
ICI=$(cd "$(dirname "$0")" && pwd)
RACINE="$HOME/Sauvegardes-Heavent"; PROJET=mapiwnsjsluiwmnulhqk
BIN_PG=/opt/homebrew/opt/postgresql@18/bin
AGENT="$HOME/Library/LaunchAgents/com.heavent.sauvegarde.plist"
etape() { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok() { printf '  ✅ %s\n' "$*"; }
stop() { printf '  ❌ %s\n' "$*"; exit 1; }

[ "$(uname -s)" = Darwin ] || stop "Ce script est prévu pour macOS."

etape "1/7 Outils"
[ -x /opt/homebrew/bin/brew ] || stop "Homebrew introuvable dans /opt/homebrew."
[ -x "$BIN_PG/pg_dump" ] && ok "PostgreSQL 18 déjà installé ($("$BIN_PG/pg_dump" --version | awk '{print $3}'))" || { echo "  Installation de PostgreSQL 18 (gratuit, Homebrew)…"; /opt/homebrew/bin/brew install postgresql@18 || stop "installation impossible"; }
# age : version officielle de l'auteur dans ~/Sauvegardes-Heavent/bin (Homebrew n'en fournit pas pour macOS 27)
AGE=""
for a in "$RACINE/bin/age" /opt/homebrew/bin/age "$(command -v age 2>/dev/null)"; do [ -n "$a" ] && [ -x "$a" ] && { AGE="$a"; break; }; done
[ -n "$AGE" ] || stop "age introuvable : fais d'abord l'étape d'installation de age (voir LISEZMOI.md)."
ok "age $("$AGE" --version)"

etape "2/7 Dossier ~/Sauvegardes-Heavent (hors iCloud)"
mkdir -p "$RACINE/outils" "$RACINE/journal"; chmod 700 "$RACINE"
cp "$ICI/heavent-sauvegarde" "$ICI/references.sql" "$ICI/LISEZMOI.md" "$RACINE/outils/" 2>/dev/null; chmod 700 "$RACINE/outils/heavent-sauvegarde"
case "$RACINE" in *"Mobile Documents"*|*CloudStorage*) stop "Le dossier serait synchronisé : arrêt.";; esac
ok "$RACINE"

etape "3/7 Secrets dans le Trousseau (saisie masquée, deux fois)"
if security find-generic-password -a heavent -s heavent-sauvegarde-base >/dev/null 2>&1; then ok "mot de passe de la base déjà présent"; else
  echo "  Colle le MOT DE PASSE DE LA BASE (Supabase → Project Settings → Database). Rien ne s'affichera :"
  security add-generic-password -a heavent -s heavent-sauvegarde-base -l "Heavent sauvegarde — base" -U -w || stop "non enregistré"; ok "enregistré"; fi
if security find-generic-password -a heavent -s heavent-sauvegarde-fichiers >/dev/null 2>&1; then ok "clé d'accès aux fichiers déjà présente"; else
  echo "  Colle la clé « service_role » (Supabase → Project Settings → API Keys → Legacy API keys → Reveal). Rien ne s'affichera :"
  security add-generic-password -a heavent -s heavent-sauvegarde-fichiers -l "Heavent sauvegarde — fichiers" -U -w || stop "non enregistré"; ok "enregistrée"; fi

etape "4/7 Clé de chiffrement"
if security find-generic-password -a heavent -s heavent-sauvegarde-cle-age >/dev/null 2>&1 && [ -f "$RACINE/config" ]; then ok "clé déjà créée (conservée)"; CLE_PUB=$(grep '^CLE_PUBLIQUE=' "$RACINE/config" | cut -d= -f2); else
  T=$(mktemp -d "$RACINE/.cle.XXXX"); "${AGE}-keygen" -o "$T/k" 2>/dev/null || stop "age-keygen introuvable à côté de age"
  CLE_PUB=$(grep 'public key' "$T/k" | awk '{print $NF}')
  security add-generic-password -a heavent -s heavent-sauvegarde-cle-age -l "Heavent sauvegarde — clé de déchiffrement" -U -w "$(grep AGE-SECRET-KEY "$T/k")" || stop "clé non enregistrée"
  rm -rf "$T"; ok "clé créée et rangée dans le Trousseau (clé publique : $CLE_PUB)"; fi

etape "5/7 Connexion à la base (lecture seule)"
MDP_F=$(mktemp "$RACINE/.pg.XXXX"); HOTE=""
for h in aws-0-eu-west-1.pooler.supabase.com aws-1-eu-west-1.pooler.supabase.com; do
  printf '%s:5432:postgres:postgres.%s:%s\n' "$h" "$PROJET" "$(security find-generic-password -a heavent -s heavent-sauvegarde-base -w | sed 's/\\/\\\\/g; s/:/\\:/g')" > "$MDP_F"
  if PGPASSFILE="$MDP_F" PGSSLMODE=require PGCONNECT_TIMEOUT=15 "$BIN_PG/psql" "host=$h port=5432 dbname=postgres user=postgres.$PROJET" -XAtc "select 'connexion-ok'" 2>/dev/null | grep -q connexion-ok; then HOTE=$h; break; fi
done
rm -f "$MDP_F"
[ -n "$HOTE" ] || stop "Connexion impossible : vérifie le mot de passe de la base (relance le script après : security delete-generic-password -a heavent -s heavent-sauvegarde-base)."
ok "connecté via $HOTE"
cat > "$RACINE/config" <<C
PG_HOTE=$HOTE
PG_PORT=5432
PG_BASE=postgres
PG_UTIL=postgres.$PROJET
URL_PROJET=https://$PROJET.supabase.co
CLE_PUBLIQUE=$CLE_PUB
BIN_PG=$BIN_PG
PATH=$RACINE/bin:/opt/homebrew/bin:\$PATH
C
chmod 600 "$RACINE/config"

etape "6/7 Tâche automatique (toutes les 15 min, à l'ouverture de session, au réveil et au branchement d'un disque)"
mkdir -p "$HOME/Library/LaunchAgents"
cat > "$AGENT" <<P
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.heavent.sauvegarde</string>
  <key>ProgramArguments</key><array><string>/bin/bash</string><string>$RACINE/outils/heavent-sauvegarde</string><string>lancer</string></array>
  <key>StartInterval</key><integer>900</integer>
  <key>RunAtLoad</key><true/>
  <key>StartOnMount</key><true/>
  <key>LowPriorityIO</key><true/>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>$RACINE/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin</string></dict>
  <key>StandardOutPath</key><string>$RACINE/journal/tache.log</string>
  <key>StandardErrorPath</key><string>$RACINE/journal/tache.log</string>
</dict></plist>
P
launchctl bootout "gui/$(id -u)/com.heavent.sauvegarde" 2>/dev/null
touch "$RACINE/.ne-pas-lancer"   # la première sauvegarde se fait ci-dessous, dans le Terminal
launchctl bootstrap "gui/$(id -u)" "$AGENT" && ok "tâche installée" || stop "tâche non installée"

etape "7/7 Première sauvegarde complète (quelques minutes), puis vérification par restauration isolée"
rm -f "$RACINE/.ne-pas-lancer"
"$RACINE/outils/heavent-sauvegarde" forcer && ok "première sauvegarde VÉRIFIÉE" || stop "la première sauvegarde a échoué : envoie le contenu de $RACINE/ETAT.txt à Claude (il ne contient aucun secret)."
echo
echo "Étapes suivantes (voir $RACINE/outils/LISEZMOI.md) :"
echo "  • Essai dans le contexte réel de la tâche automatique :  $RACINE/outils/heavent-sauvegarde essai-tache"
echo "  • Copie de secours de la clé :                         $RACINE/outils/heavent-sauvegarde cle-secours"
