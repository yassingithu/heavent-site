// Copie index.html dans un dossier par adresse du site (admin/, contact/…)
// pour que les liens directs fonctionnent chez one.com, même sans réécriture d'URL.
import { mkdirSync, copyFileSync } from "node:fs";
const routes = ["inscription-staff", "devis-entreprise", "devis-mariage", "a-propos", "contact",
  "politique-confidentialite", "admin", "admin-auth", "auth", "auth/callback", "staff-dashboard",
  "mentions-legales", "rgpd"];
for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
console.log(`Dossiers de pages créés : ${routes.length}`);
