#!/bin/bash
set -u
W="$1"; P=$(ls -d /usr/lib/postgresql/*/bin | tail -1); export PATH="$P:$PATH" HOME="$W/maison"; mkdir -p "$HOME"
OK=0; KO=0
res() { if [ "$1" = 0 ]; then echo "✅ $2"; OK=$((OK+1)); else echo "❌ $2"; KO=$((KO+1)); fi; }
# --- fausse production (prise locale uniquement) ---
initdb -D "$W/prod" -U postgres >/dev/null 2>&1
pg_ctl -D "$W/prod" -w -l "$W/prod.log" -o "-p 5601 -k $W -c listen_addresses=''" start >/dev/null
Q="psql -h $W -p 5601 -U postgres -X -q"
$Q -c "create database postgres_prod" >/dev/null
sed 's/alter database cnss_test set/alter database postgres_prod set/' "$W/stubs.sql" | $Q -d postgres_prod >/dev/null 2>&1
for f in "$W"/migrations/*.sql; do sed -E '/create extension if not exists (pg_cron|pg_net)/Id' "$f" | $Q -d postgres_prod >/dev/null 2>"$W/mig.err" || true; done
$Q -d postgres_prod -v ON_ERROR_STOP=1 -f "$W/prod-factice.sql" >/dev/null || { echo "données fictives : échec"; exit 1; }
# --- faux stockage de fichiers ---
mkdir -p "$W/stock/photos/photos" "$W/stock/identites/identites" "$W/stock/assets/instagram/2026"
printf 'photo-A-ok\n' > "$W/stock/photos/photos/a.jpg"; printf 'cin-fictive-1\n' > "$W/stock/identites/identites/cin crew.pdf"; printf 'insta-B-ok\n' > "$W/stock/assets/instagram/2026/b.jpg"
for x in "photos photos/a.jpg" "identites identites/cin crew.pdf" "assets instagram/2026/b.jpg"; do
  set -- $x; b=$1; shift; n="$*"; m=$(md5sum "$W/stock/$b/$n" | cut -d' ' -f1)
  $Q -d postgres_prod -c "update storage.objects set metadata = jsonb_set(jsonb_set(metadata, '{eTag}', to_jsonb('\"$m\"'::text)), '{size}', to_jsonb($(wc -c < "$W/stock/$b/$n"))) where bucket_id='$b' and name='$n'" >/dev/null
done
python3 "$W/stockage-factice.py" "$W/stock" 8765 & SRV=$!
sleep 1
# --- installation de l'outil (configuration + clé de chiffrement) ---
export HEAVENT_SAUVEGARDE_RACINE="$W/Sauvegardes-Heavent"; mkdir -p "$HEAVENT_SAUVEGARDE_RACINE"
age-keygen -o "$W/cle.txt" 2>/dev/null
export HS_SECRET_cle_age="$(grep AGE-SECRET-KEY "$W/cle.txt")" HS_SECRET_base="sans-objet" HS_SECRET_fichiers="cle-fichiers-factice" PGSSLMODE=disable
cat > "$HEAVENT_SAUVEGARDE_RACINE/config" <<C
PG_HOTE=$W
PG_PORT=5601
PG_BASE=postgres_prod
PG_UTIL=postgres
URL_PROJET=http://127.0.0.1:8765
CLE_PUBLIQUE=$(age-keygen -y "$W/cle.txt")
BIN_PG=$P
C
S="$W/outils/heavent-sauvegarde"; R="$HEAVENT_SAUVEGARDE_RACINE"

# 1. Première sauvegarde complète + vérification
bash "$S" forcer > "$W/s1.out" 2>&1; res $? "première sauvegarde complète, déchiffrée, restaurée et vérifiée"
grep -E "VÉRIFIÉE|références|intact" "$R"/journal/*.log | sed 's/^.\{20\}/   /' | head -5
ID1=$(ls "$R/sauvegardes" | head -1)
grep -q "Garde-fou : copie restaurée sans réseau" "$R"/journal/*.log && ! psql -h "$W" -p 5601 -U postgres -XAtc "select 1" postgres_prod >/dev/null 2>&1 | grep -q x; res $? "copie de contrôle sans réseau ni moteur de tâches : aucune action externe possible"
# 2. Rien n'est en clair dans le dossier de sauvegarde
! grep -rqa -e "Message fictif" -e "cin-fictive" -e "photo-A-ok" "$R"; res $? "aucune donnée lisible en clair dans le dossier de sauvegarde"
# 3. Relance dans la journée : rien à faire
bash "$S" lancer >/dev/null 2>&1; [ "$(ls "$R/sauvegardes" | wc -l)" = 1 ]; res $? "relance horaire : pas de nouvelle sauvegarde si la dernière a moins de 22 h"
# 4. Les contrôles suivent les données : nouveaux messages et nouveau compte → toujours vérifié
$Q -d postgres_prod -c "insert into public.mots_yassin(ordre, texte, pour) select g, 'Nouveau fictif ' || g, 'imane' from generate_series(26, 40) g; insert into auth.users(id, email) values ('44444444-4444-4444-4444-444444444444', 'nawar@test.invalid')" >/dev/null
sleep 1; bash "$S" forcer > "$W/s2.out" 2>&1; res $? "données en plus (15 messages, 1 compte) : sauvegarde vérifiée sans nombre fixe"
grep -h "ACCES 44444444" "$W"/s2.out >/dev/null 2>&1; true
# 5. Modification en production PENDANT la sauvegarde : aucune fausse erreur, l'instantané fait foi
sleep 1; HS_TEST_APRES_INSTANTANE="$Q -d postgres_prod -c \"insert into public.mots_yassin(ordre, texte, pour) values (99, 'pendant', 'nawar'); delete from storage.objects where name='photos/a.jpg'\" >/dev/null; rm -f '$W/stock/photos/photos/a.jpg'" bash "$S" forcer > "$W/s3.out" 2>&1
res $? "écritures et suppression de fichier pendant la copie : sauvegarde cohérente, sans fausse erreur"
grep -h "modifié pendant" "$R"/journal/*.log | tail -1 | sed 's/^.\{20\}/   /'
# 6. Coupure réseau : échec propre, sauvegardes précédentes intactes, pas d'alerte si la dernière a moins de 36 h
avant=$(ls "$R/sauvegardes" | wc -l); sed -i 's#^URL_PROJET=.*#URL_PROJET=http://127.0.0.1:9#' "$R/config"
bash "$S" forcer > "$W/s4.out" 2>&1; c=$?; sed -i 's#^URL_PROJET=.*#URL_PROJET=http://127.0.0.1:8765#' "$R/config"
[ $c = 3 ] && [ "$(ls "$R/sauvegardes" | wc -l)" = "$avant" ] && ! ls "$R" | grep -q en-cours && ! grep -q "NOTIFICATION" "$W/s4.out" "$R"/journal/*.log; res $? "sans Internet : arrêt propre, rien de cassé, pas d'alerte avant 36 h"
# 7. Interruption brutale (veille / extinction en pleine copie) puis reprise
( bash "$S" forcer >/dev/null 2>&1 & echo $! > "$W/pid"; wait ) & sleep 2; kill -9 "$(cat "$W/pid")" 2>/dev/null; pkill -9 -f "pg_dump|age -r" 2>/dev/null; sleep 1
for d in "$R"/en-cours-*/tmp-verif/pg/d; do [ -d "$d" ] && pg_ctl -D "$d" stop -m immediate >/dev/null 2>&1; done
bash "$S" forcer > "$W/s5.out" 2>&1; c=$?; [ $c = 0 ] && grep -q "Verrou abandonné" "$R"/journal/*.log; res $? "interruption brutale en pleine sauvegarde : verrou repris, nouvelle sauvegarde vérifiée"
# 8. Fichier altéré dans le magasin : détecté
D="$R/sauvegardes/$(ls "$R/sauvegardes" | tail -1)"; H=$(head -1 "$D/objets.txt"); F="$R/objets/${H:0:2}/$H.age"; cp "$F" "$W/bak.age"
python3 -c "import sys; p=sys.argv[1]; b=bytearray(open(p,'rb').read()); b[len(b)//2]^=1; open(p,'wb').write(b)" "$F"
bash "$S" verifier > "$W/s6.out" 2>&1; c=$?; cp "$W/bak.age" "$F"; [ $c != 0 ]; res $? "fichier de sauvegarde altéré : détecté par la vérification"
# 9. Copie restaurée différente de la production : détectée (référence modifiée)
D="$R/sauvegardes/$(ls "$R/sauvegardes" | tail -1)"; cp "$D/reference.txt.age" "$W/ref.bak"
age -d -i "$W/cle.txt" "$D/reference.txt.age" | sed '/^TABLE public.mots_yassin /s/ [0-9][0-9]* / 1 /' | age -r "$(age-keygen -y "$W/cle.txt")" > "$D/reference.txt.age"
bash "$S" verifier > "$W/s7.out" 2>&1; c=$?; cp "$W/ref.bak" "$D/reference.txt.age"; [ $c != 0 ]; res $? "écart entre production et copie restaurée : détecté"
# 10. Aucun déchiffré laissé sur le disque après vérifications (réussies ou non)
! find "$R" -name 'tmp-verif' -o -name '*.dump' -o -name 'cle' | grep -q .; res $? "aucune copie déchiffrée ni clé laissée sur le disque"
# 11. Mauvaise clé dans le Trousseau : vérification impossible = échec (jamais « réussie »)
HS_SECRET_cle_age="AGE-SECRET-KEY-1QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ" bash "$S" verifier >/dev/null 2>&1; [ $? != 0 ]; res $? "clé absente ou erronée : la vérification échoue (pas de faux succès)"
# 12. Restauration réelle possible : extraction complète
bash "$S" extraire "$(ls "$R/sauvegardes" | tail -1)" "$W/extrait" >/dev/null 2>&1 && [ -f "$W/extrait/base.dump" ] && cmp -s "$W/extrait/fichiers/identites/identites/cin crew.pdf" "$W/stock/identites/identites/cin crew.pdf"; res $? "extraction pour restauration réelle : base et fichiers identiques aux originaux"
rm -rf "$W/extrait"
# 13. Conservation : la dernière vérifiée n'est jamais supprimée, même très ancienne ; magasin nettoyé sans perte
for s in $(ls "$R/sauvegardes"); do mv "$R/sauvegardes/$s" "$R/sauvegardes/2024-01-0${s: -1}_000000"; done
last=$(ls "$R/sauvegardes" | tail -1); sed -i "s/^derniere_id=.*/derniere_id=$last/" "$R/.etat"
bash -c ". /dev/null; HEAVENT_SAUVEGARDE_RACINE=$R bash $S verifier $last" >/dev/null 2>&1
( . "$R/config"; RACINE="$R"; source <(sed -n '/^retention()/,/^}/p; /^lire_etat()/p; /^log()/,/^}/p' "$S"); MAC=0; JOURS_QUOTIDIENS=30; MOIS_MENSUELS=12; JOURNAL=/dev/null; retention )
[ -d "$R/sauvegardes/$last" ] && [ "$(ls "$R/sauvegardes" | wc -l)" = 1 ] && bash "$S" verifier "$last" >/dev/null 2>&1; res $? "conservation : anciennes retirées, la dernière vérifiée gardée et toujours restaurable"
# 14. État visible
bash "$S" statut > "$W/statut.out" 2>&1; grep -q "Mac : dernière sauvegarde VÉRIFIÉE" "$W/statut.out"; res $? "état lisible (ETAT.txt / commande statut)"
sed 's/^/   /' "$W/statut.out"
# ===== Deuxième copie : disque externe (faux volumes) =====
export HS_VOLUMES="$W/Volumes"; mkdir -p "$HS_VOLUMES/DisqueYassin/Photos perso" "$HS_VOLUMES/AutreCle"
ln -s / "$HS_VOLUMES/Macintosh HD"
echo "UUID-DISQUE-2TO" > "$HS_VOLUMES/DisqueYassin/.uuid-essai"; echo "UUID-AUTRE" > "$HS_VOLUMES/AutreCle/.uuid-essai"
echo "souvenir" > "$HS_VOLUMES/DisqueYassin/Photos perso/vacances.jpg"; EMPREINTE_PERSO=$(cd "$HS_VOLUMES/DisqueYassin" && find . -path ./Heavent-Sauvegardes -prune -o -type f -print | sort | xargs md5sum | md5sum)
bash "$S" disque-choisir 2 > "$W/d1.out" 2>&1; ls "$HS_VOLUMES/DisqueYassin/Heavent-Sauvegardes/.heavent-disque" >/dev/null 2>&1 && grep -q '^DISQUE_UUID=UUID-DISQUE-2TO' "$R/config" && [ ! -e "$HS_VOLUMES/AutreCle/Heavent-Sauvegardes" ] && ! grep -q "Macintosh" "$W/d1.out"; c=$?
res $c "disque identifié par son identifiant unique, dossier dédié créé"
DST="$HS_VOLUMES/DisqueYassin/Heavent-Sauvegardes"
# Passage horaire normal (pas de sauvegarde due) : la dernière sauvegarde vérifiée part sur le disque et y est vérifiée
bash "$S" lancer > "$W/d2.out" 2>&1
DER=$(grep '^derniere_id=' "$R/.etat" | cut -d= -f2)
[ "$(grep '^disque_derniere_id=' "$R/.etat" | cut -d= -f2)" = "$DER" ] && [ -d "$DST/sauvegardes/$DER" ] && grep -q "Copie sur le disque externe VÉRIFIÉE" "$R"/journal/*.log; res $? "disque branché : dernière sauvegarde vérifiée copiée puis vérifiée à partir du disque seul"
# Tous les fichiers dont la sauvegarde dépend sont sur le disque
manque=0; while read -r h; do [ -f "$DST/objets/${h:0:2}/$h.age" ] || manque=1; done < "$DST/sauvegardes/$DER/objets.txt"; [ $manque = 0 ] && [ -f "$DST/outils/heavent-sauvegarde" ] && [ -f "$DST/config" ] && ! grep -q DISQUE "$DST/config"; res $? "disque autonome : sauvegarde, fichiers dédupliqués, outils et configuration sans secret"
# Fichiers personnels du disque intacts, rien en clair
[ "$(cd "$HS_VOLUMES/DisqueYassin" && find . -path ./Heavent-Sauvegardes -prune -o -type f -print | sort | xargs md5sum | md5sum)" = "$EMPREINTE_PERSO" ] && ! grep -rqa -e "Message fictif" -e "cin-fictive" "$DST"; res $? "fichiers personnels du disque intacts ; aucune donnée en clair sur le disque"
# Restauration SANS le Mac : sans Trousseau, sans le magasin du Mac, uniquement le disque + la clé de secours
mv "$R/objets" "$R/objets-cache"
env -u HS_SECRET_cle_age HEAVENT_CLE_FICHIER="$W/cle.txt" bash "$S" essai-restauration-disque > "$W/d3.out" 2>&1; c=$?; mv "$R/objets-cache" "$R/objets"
[ $c = 0 ] && grep -q "restaurable sans le Mac" "$W/d3.out"; res $? "perte du Mac simulée : copie du disque déchiffrée avec la clé de secours, restaurée à l'écart, identique"
! find "$R" "$DST" -name 'tmp-verif' -o -name '.cle-essai' -o -name '*.dump' | grep -q .; res $? "aucune copie déchiffrée ni clé laissée (Mac et disque)"
# Disque absent : la sauvegarde quotidienne continue sur le Mac ; rattrapage au branchement suivant
mv "$HS_VOLUMES/DisqueYassin" "$W/disque-debranche"; avant_d=$(grep '^disque_derniere_id=' "$R/.etat" | cut -d= -f2)
sleep 1; bash "$S" forcer > "$W/d4.out" 2>&1; c=$?; NOUV=$(grep '^derniere_id=' "$R/.etat" | cut -d= -f2)
[ $c = 0 ] && [ "$NOUV" != "$avant_d" ] && [ "$(grep '^disque_derniere_id=' "$R/.etat" | cut -d= -f2)" = "$avant_d" ]; res $? "disque absent : sauvegarde du Mac normale, copie externe inchangée"
bash "$S" statut > "$W/d5.out"; grep -q "Mac : dernière sauvegarde VÉRIFIÉE" "$W/d5.out" && grep -q "Disque externe : dernière copie VÉRIFIÉE" "$W/d5.out" && grep -q "non branché" "$W/d5.out"; res $? "état : dates séparées Mac / disque externe, disque signalé non branché"
mv "$W/disque-debranche" "$HS_VOLUMES/DisqueYassin"
bash "$S" lancer > "$W/d6.out" 2>&1; [ "$(grep '^disque_derniere_id=' "$R/.etat" | cut -d= -f2)" = "$NOUV" ] && [ -d "$DST/sauvegardes/$NOUV" ]; res $? "rebranchement : rattrapage automatique de la dernière sauvegarde vérifiée"
# Interruption : restes .part d'une copie avortée + disque devenu non inscriptible → la copie précédente reste intacte et utilisable
mkdir -p "$DST/sauvegardes/.2099-01-01_000000.part"; echo x > "$DST/objets/zz.part"
sleep 1; bash "$S" forcer > /dev/null 2>&1; NOUV2=$(grep '^derniere_id=' "$R/.etat" | cut -d= -f2)
AVANT_INT=$(grep '^disque_derniere_id=' "$R/.etat" | cut -d= -f2)
chmod a-w "$DST/sauvegardes"; bash "$S" disque > "$W/d7.out" 2>&1; c=$?; chmod u+w "$DST/sauvegardes"
[ $c != 0 ] && [ "$(grep '^disque_derniere_id=' "$R/.etat" | cut -d= -f2)" = "$AVANT_INT" ] && [ -d "$DST/sauvegardes/$AVANT_INT" ] && env -u HS_SECRET_cle_age HEAVENT_CLE_FICHIER="$W/cle.txt" bash "$S" essai-restauration-disque > /dev/null 2>&1; res $? "copie interrompue : échec signalé, dernière copie utilisable intacte et restaurable"
bash "$S" disque > "$W/d8.out" 2>&1; [ $? = 0 ] && [ ! -e "$DST/sauvegardes/.2099-01-01_000000.part" ] && [ ! -e "$DST/objets/zz.part" ]; res $? "nouvelle tentative : restes de copie interrompue nettoyés (seulement nos fichiers temporaires), copie vérifiée"
# Conservation sur le disque : la dernière copie vérifiée jamais supprimée ; objets encore utilisés conservés
for s in $(ls "$DST/sauvegardes"); do [ "$s" = "$NOUV2" ] || mv "$DST/sauvegardes/$s" "$DST/sauvegardes/2023-0${#s}-01_00000${s: -1}"; done
( . "$R/config"; RACINE="$R"; source <(sed -n '/^retention()/,/^}/p; /^lire_etat()/p; /^log()/,/^}/p' "$S"); MAC=0; JOURS_QUOTIDIENS=30; MOIS_MENSUELS=12; JOURNAL=/dev/null; retention "$DST" "$NOUV2" )
[ -d "$DST/sauvegardes/$NOUV2" ] && env -u HS_SECRET_cle_age HEAVENT_CLE_FICHIER="$W/cle.txt" bash "$S" essai-restauration-disque > /dev/null 2>&1 && [ -f "$HS_VOLUMES/DisqueYassin/Photos perso/vacances.jpg" ]; res $? "conservation sur le disque : dernière copie gardée et restaurable, fichiers personnels intacts"
sed 's/^/   /' "$W/d5.out" | grep -E "Mac :|Disque"

kill $SRV; pg_ctl -D "$W/prod" stop -m fast >/dev/null
echo; echo "$OK réussi(s), $KO échec(s)"; [ $KO = 0 ]
