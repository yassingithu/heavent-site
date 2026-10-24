// Tests des règles CNSS (données fictives) : node tests/cnss/unitaires.mjs
import { build } from "esbuild";
import assert from "node:assert/strict";
const out = "/tmp/cnss-test.mjs";
await build({ entryPoints: ["src/lib/cnss.ts"], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "silent" });
const c = await import(out + "?" + Date.now());
let n = 0; const t = (nom, f) => { f(); n++; console.log("✅ " + nom); };

t("le numéro n'est jamais modifié : avertissement seulement", () => {
  const brut = " 12 345-678A ";
  assert.deepEqual(c.avertissementsNumero(brut), ["espaces en début ou en fin de numéro", "contient d'autres caractères que des chiffres"]);
  assert.equal(brut, " 12 345-678A ");
  assert.deepEqual(c.avertissementsNumero("0012345678"), []);
  assert.deepEqual(c.avertissementsNumero(""), []);
});
t("zéros en tête conservés dans la comparaison", () => {
  assert.notEqual(c.cleComparaison("012345"), c.cleComparaison("12345"));
});
t("doublons détectés malgré espaces et ponctuation", () => {
  const g = c.doublonsCnss([
    { id: "a", prenom: "Test", nom: "Un", numero_securite_sociale: "123 456 789" },
    { id: "b", prenom: "Test", nom: "Deux", numero_securite_sociale: "123.456.789" },
    { id: "c", prenom: "Test", nom: "Trois", numero_securite_sociale: "987654321" },
    { id: "d", prenom: "Test", nom: "Quatre", numero_securite_sociale: null },
    { id: "e", prenom: "Test", nom: "Cinq", numero_securite_sociale: "  " },
  ]);
  assert.equal(g.length, 1); assert.deepEqual(g[0].map((p) => p.id), ["a", "b"]);
});
t("bulletin sans n° employeur : aperçu incomplet, jamais définitif même validé", () => {
  const e = c.etatBulletin({ cnss_affiliation_employeur: "" }, { numero_securite_sociale: "111" }, "valide");
  assert.equal(e.definitif, false); assert.equal(e.titre, "APERÇU DE BULLETIN");
  assert.match(e.bandeau, /INCOMPLET/); assert.deepEqual(e.manques, ["N° d'affiliation CNSS de l'employeur"]);
});
t("bulletin complet mais à valider : aperçu non validé", () => {
  const e = c.etatBulletin({ cnss_affiliation_employeur: "999" }, { numero_securite_sociale: "111" }, "en_attente");
  assert.equal(e.definitif, false); assert.match(e.bandeau, /NON VALIDÉ/);
});
t("bulletin complet et validé : définitif, sans bandeau", () => {
  for (const s of ["valide", "paye", "payee"]) {
    const e = c.etatBulletin({ cnss_affiliation_employeur: "999" }, { numero_securite_sociale: "111" }, s);
    assert.equal(e.definitif, true); assert.equal(e.bandeau, null); assert.equal(e.titre, "BULLETIN DE PAIE");
  }
});
t("n° salarié manquant listé", () => {
  assert.deepEqual(c.manquesBulletin({ cnss_affiliation_employeur: "9" }, {}), ["N° CNSS du salarié"]);
});
console.log(`\n${n} tests réussis`);
