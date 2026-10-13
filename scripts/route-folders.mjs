// Chez one.com, les adresses directes (/admin, /contact…) n'existent pas comme fichiers.
// On crée un petit dossier par adresse qui renvoie vers la page principale en gardant l'adresse.
// Ces dossiers ne changent jamais : lors des mises à jour, seuls index.html et assets/ sont à renvoyer.
import { mkdirSync, writeFileSync } from "node:fs";
const routes = ["inscription-staff", "devis-entreprise", "devis-mariage", "a-propos", "contact",
  "politique-confidentialite", "admin", "admin-auth", "auth", "auth/callback", "staff-dashboard",
  "mentions-legales", "rgpd"];
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Heavent People Agency</title>
<script>try{sessionStorage.setItem("spa-redirect",location.pathname+location.search+location.hash)}catch(e){}location.replace("/");</script>
</head><body></body></html>
`;
for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  writeFileSync(`dist/${r}/index.html`, html);
}
console.log(`Dossiers de pages créés : ${routes.length}`);
