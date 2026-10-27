/**
 * Envoi de la demande « Confier mon projet à Heavent » : on réutilise le circuit de demandes existant (fonction send-email, type « jeu »).
 *  → enregistrée dans l'administration (onglet Événement + Devis), e-mail à l'équipe, confirmation au visiteur.
 * Aucun prix n'est envoyé ni reçu : le devis est établi par l'équipe à partir du catalogue interne (configuration → prestations).
 */
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";
import { enFrancais, langue, tr } from "./langue";
import { infoOption, infoTable } from "./donnees";
import { configurationAdmin, nbTables, resume, texteDemande, optionsActives, type Choix } from "./etat";

export interface Coordonnees { nom: string; email: string; telephone: string; ville: string; date: string; dateInconnue: boolean; message: string }
export const VIDE: Coordonnees = { nom: "", email: "", telephone: "", ville: "", date: "", dateInconnue: false, message: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function erreurs(k: Coordonnees, consentement: boolean): Record<string, string> {
  const e: Record<string, string> = {};
  if (!k.nom.trim()) e.nom = tr("Dis-nous comment t'appeler.");
  if (!EMAIL.test(k.email.trim())) e.email = tr("Une adresse e-mail valide nous permet de te répondre.");
  if (!k.ville.trim()) e.ville = tr("Indique la ville de l'événement.");
  if (!consentement) e.consentement = tr("Ton accord est nécessaire pour que nous puissions te recontacter.");
  return e;
}

const CLE_ENVOYEES = "heavent-city:envoyees";
function signature(c: Choix, email: string) {
  const { note: _n, ...reste } = c; void _n;
  const s = email.trim().toLowerCase() + JSON.stringify(reste);
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h);
}
export const dejaEnvoyee = (c: Choix, email: string) => { try { return (JSON.parse(sessionStorage.getItem(CLE_ENVOYEES) ?? "[]") as string[]).includes(signature(c, email)); } catch { return false; } };
const noterEnvoyee = (c: Choix, email: string) => { try { const l = JSON.parse(sessionStorage.getItem(CLE_ENVOYEES) ?? "[]") as string[]; l.push(signature(c, email)); sessionStorage.setItem(CLE_ENVOYEES, JSON.stringify(l.slice(-10))); } catch { /* ignoré */ } };

function construireCorps(c: Choix, k: Coordonnees) {
  const r = resume(c);
  const conf = configurationAdmin(c);
  const lignes = [...r.decors, ...r.experiences].map((l) => ({ libelle: l.reservable ? l.nom : `${l.nom} (inspiration à discuter)`, detail: "", surDevis: false }));
  const ids = optionsActives(c);
  const options = [r.style && `Style : ${r.style}`, `Couleurs : ${r.palette}`, r.lumiere && `Lumière : ${r.lumiere}`, r.musique && `Musique : ${r.musique}`, r.accueil && `Accueil : ${r.accueil}`, ...ids.map((o) => infoOption(o)?.nom)].filter(Boolean);
  const note = c.note.trim();
  const corps = {
    type: "jeu",
    data: {
      prenom: k.nom.trim(), email: k.email.trim(), telephone: k.telephone.trim(), ville: k.ville.trim(), message: k.message.trim(),
      date: k.dateInconnue ? null : k.date || null,
      typeEvenement: r.type, ambiance: `${r.style} — ${r.palette}`, lieu: `${r.lieu} (ambiance d'inspiration)`,
      invites: c.invites, places: nbTables(c.invites, c.tables) * infoTable(c.tables).places, options,
      services: Object.values(conf.libelles).join(", "),
      lignes, centres: null, honneur: "",
      texte: texteDemande({ ...c, note }), langue_visiteur: "fr",
      configuration: {
        version: 1, type: c.type === "fete" ? "anniversaire" : c.type, invites: c.invites, elements: conf.elements, centres: 0, libelles: conf.libelles, agrandis: [], sur_mesure: [],
      },
    },
  };
  return corps;
}

export async function envoyerDemande(c: Choix, k: Coordonnees): Promise<{ envoye: boolean; message?: string }> {
  // Tout ce qui part vers l'agence est rédigé en français, quelle que soit la langue du visiteur
  const lng = langue();
  const corps = enFrancais(() => construireCorps(c, k));
  corps.data.langue_visiteur = lng; // sert à répondre au visiteur dans sa langue ; le contenu reste en français
  try {
    const rep = await fetch(`${FUNCTIONS_URL}/send-email`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corps) });
    const j = await rep.json().catch(() => ({}));
    if (rep.ok && j?.success) { noterEnvoyee(c, k.email); suivre("demande", "heavent-city"); return { envoye: true }; }
    return { envoye: false, message: tr("Le serveur n'a pas pu enregistrer la demande pour le moment.") };
  } catch {
    return { envoye: false, message: tr("Connexion impossible pour le moment.") };
  }
}
