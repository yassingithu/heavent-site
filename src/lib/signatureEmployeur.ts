import signature from "@/assets/signature-employeur.png";

/** Signature de l'employeur, apposée sur les contrats, devis et documents émis par l'agence. */
export const SIGNATURE_EMPLOYEUR = signature;
export const SIGNATAIRE_EMPLOYEUR = { nom: "Imane CHAIGARI", fonction: "CEO — Heavent Agency SARL" };

/** Image de la signature + nom et fonction, prêt à insérer dans un PDF. */
export const signatureEmployeurHtml = (hauteur = 56, detail = "") =>
  `<img src="${signature}" alt="Signature de ${SIGNATAIRE_EMPLOYEUR.nom}" style="height:${hauteur}px;display:block;margin:4px 0 2px">
   <div style="font-weight:600;color:#141414">${SIGNATAIRE_EMPLOYEUR.nom}</div>
   <div style="font-size:10px;color:#777">${SIGNATAIRE_EMPLOYEUR.fonction}</div>${detail ? `<div style="font-size:9.5px;color:#777;margin-top:2px">${detail}</div>` : ""}`;
