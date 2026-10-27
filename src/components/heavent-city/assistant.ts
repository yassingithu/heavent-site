/**
 * Assistant « directeur artistique ».
 *
 *  - Sans IA configurée : suggestions AUTOMATIQUES prédéfinies (mots-clés), présentées comme telles.
 *  - Avec IA configurée (build avec VITE_HEAVENT_CITY_IA=1 + fonction serveur « heavent-city-ia » déployée) :
 *    la fonction serveur répond avec des identifiants d'options ; ils sont revalidés ici.
 *  - L'IA ne peut choisir QUE des identifiants autorisés. Elle n'a accès à aucune donnée interne, aucun tarif.
 *  - Un seul appel par envoi volontaire du visiteur, jamais à chaque clic. Message limité, délai d'attente court.
 */
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import {
  ACCUEILS, DECORS, EXPERIENCES, LIEUX, LUMIERES, MUSIQUES, PALETTES, STYLES, disponiblePour, infoOption,
  type AccueilId, type LieuId, type LumiereId, type MusiqueId, type OptionId, type PaletteId, type StyleId, type TypeEvt,
} from "./donnees";

export const MESSAGE_MAX = 280;
/** L'assistant tente toujours la fonction serveur ; sans clé côté serveur elle répond « indisponible » et le jeu reste sur ses suggestions automatiques. VITE_HEAVENT_CITY_IA=0 coupe tout appel. */
export const IA_CONFIGUREE = import.meta.env.VITE_HEAVENT_CITY_IA !== "0";
const DELAI_MS = 9000;
const MAX_APPELS = 8;

export interface Proposition {
  lieu: LieuId | null; style: StyleId; palette: PaletteId; lumiere: LumiereId | null; musiques: MusiqueId[]; accueil: AccueilId | null;
  options: OptionId[]; explication: string; source: "ia" | "auto";
}

/** Identifiants autorisés (copiés dans la fonction serveur ; un test vérifie qu'ils restent identiques) */
export const IDS_AUTORISES = {
  lieux: LIEUX.map((x) => x.id as string), styles: STYLES.map((x) => x.id as string), palettes: PALETTES.map((x) => x.id as string), lumieres: LUMIERES.map((x) => x.id as string),
  musiques: MUSIQUES.map((x) => x.id as string), accueils: ACCUEILS.map((x) => x.id as string), options: [...DECORS, ...EXPERIENCES].map((x) => x.id as string),
};

const enumOu = <T extends string>(v: unknown, liste: readonly string[]): T | null => (typeof v === "string" && liste.includes(v) ? (v as T) : null);
const PRIX = /\d[\d\s.,]*\s?(mad|dh|dhs|dirhams?|€|eur|euros?|\$)|\b(mad|dh|dirhams?)\s?\d|tarif|prix|co[uû]t|budget|remise|gratuit/i;

/** Valide une proposition venant d'ailleurs (serveur, IA) : tout ce qui n'est pas autorisé est écarté */
export function validerProposition(brut: unknown, type: TypeEvt, lieuCourant: LieuId | null, source: "ia" | "auto"): Proposition | null {
  if (!brut || typeof brut !== "object") return null;
  const o = brut as Record<string, unknown>;
  const style = enumOu<StyleId>(o.style, IDS_AUTORISES.styles);
  if (!style) return null;
  const palette = enumOu<PaletteId>(o.palette, IDS_AUTORISES.palettes) ?? STYLES.find((s) => s.id === style)!.palette;
  const lieu = enumOu<LieuId>(o.lieu, IDS_AUTORISES.lieux);
  const lieuEff = lieuCourant ?? lieu;
  const ok = (id: string) => { const i = infoOption(id); return !!i && disponiblePour(i, type, lieuEff); };
  const options = [...new Set((Array.isArray(o.options) ? o.options : []).filter((x): x is string => typeof x === "string" && IDS_AUTORISES.options.includes(x) && ok(x)))].slice(0, 8) as OptionId[];
  let explication = typeof o.explication === "string" ? o.explication.replace(/\s+/g, " ").trim().slice(0, 320) : "";
  // Jamais de tarif, de prix ni de promesse de réservation dans ce que lit le visiteur
  if (!explication || PRIX.test(explication) || /<|>/.test(explication)) explication = "";
  return {
    lieu, style, palette,
    lumiere: enumOu<LumiereId>(o.lumiere, IDS_AUTORISES.lumieres),
    musiques: [...new Set([...(Array.isArray(o.musiques) ? o.musiques : []), o.musique].filter((x): x is string => typeof x === "string" && IDS_AUTORISES.musiques.includes(x) && ok(x)))].slice(0, 3) as MusiqueId[],
    accueil: enumOu<AccueilId>(o.accueil, IDS_AUTORISES.accueils),
    options, explication: explication || explicationAuto({ style, palette, options }), source,
  };
}

function explicationAuto(p: { style: StyleId; palette: PaletteId; options: OptionId[] }) {
  const s = STYLES.find((x) => x.id === p.style)!, c = PALETTES.find((x) => x.id === p.palette)!;
  const exp = p.options.map((o) => infoOption(o)?.nom.toLowerCase()).filter(Boolean).slice(0, 3);
  return `Un style « ${s.nom.toLowerCase()} » avec des tons ${c.nom.toLowerCase()}${exp.length ? `, relevé par ${exp.join(", ")}` : ""}. Tu peux tout ajuster avant d'appliquer.`;
}

// ── Suggestions automatiques (sans IA) ──────────────────────────────────────
const sans = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const a = (t: string, ...mots: string[]) => mots.some((m) => t.includes(m));

export function suggestionAutomatique(texte: string, type: TypeEvt, lieuCourant: LieuId | null): Proposition {
  const t = sans(texte);
  const pasBling = /pas (trop )?(bling|clinquant|ostentatoire|tape)/.test(t);
  const score: Record<StyleId, number> = { maroc: 0, beige_or: 0, romantique: 0, festif: 0, minimal: 0 };
  if (a(t, "maroc", "zellige", "oriental", "tradition", "caftan", "henne", "riad")) score.maroc += 2;
  if (a(t, "beige", "dore", "champagne", "chic", "elegan", "lin ", "luxe", "raffin")) score.beige_or += 2;
  if (a(t, "romantique", "fleur", "poudr", "champetre", "doux", "tendre", "rose")) score.romantique += 2;
  if (a(t, "fete", "festif", "danse", "party", "energie", "dj", "ambiance de feu", "anime", "colore")) score.festif += 2;
  if (a(t, "minimal", "epure", "sobre", "moderne", "simple", "noir", "contemporain")) score.minimal += 2;
  if (type === "pro") score.minimal += 1; if (type === "mariage") score.beige_or += 0.5;
  const style = (Object.entries(score).sort((x, y) => y[1] - x[1])[0][0]) as StyleId;

  let palette: PaletteId = STYLES.find((s) => s.id === style)!.palette;
  if (a(t, "beige", "sable", "dore", "champagne")) palette = "sable_or";
  else if (a(t, "terracotta", "ocre", "orange", "brique")) palette = "terracotta";
  else if (a(t, "rose", "poudr", "pastel")) palette = "poudre";
  else if (a(t, "vert", "emeraude")) palette = "emeraude";
  else if (a(t, "noir", "ivoire", "blanc")) palette = "ivoire_noir";
  else if (a(t, "bleu", "nuit", "marine")) palette = "nuit_or";

  const lieuMot: [LieuId, string[]][] = [["riad", ["riad", "patio", "traditionnel"]], ["villa", ["villa", "piscine"]], ["rooftop", ["rooftop", "toit", "panoram"]], ["jardin", ["jardin", "plein air", "exterieur", "pelouse"]], ["salle", ["salle", "reception", "hotel", "seminaire", "conference"]]];
  const lieu = lieuMot.find(([, m]) => a(t, ...m))?.[0] ?? null;
  const lieuEff = lieuCourant ?? lieu;

  let lumiere: LumiereId = style === "festif" ? "festive" : style === "romantique" ? "etoilee" : style === "minimal" ? "bougies" : "chaleureuse";
  if (a(t, "bougie")) lumiere = "bougies"; else if (a(t, "guirlande", "etoile", "ampoule")) lumiere = "etoilee"; else if (a(t, "lanterne")) lumiere = "chaleureuse"; else if (a(t, "projecteur", "laser", "disco")) lumiere = "festive";
  if (pasBling && lumiere === "festive") lumiere = "chaleureuse";

  // Plusieurs musiques possibles dans la même soirée (ex. orchestre + troupe folklorique)
  const musiques = new Set<MusiqueId>();
  if (a(t, "dj")) musiques.add("dj");
  if (a(t, "orchestre", "live", "andalou", "chaabi", "gnaoua")) musiques.add("orchestre");
  if (a(t, "folklor", "troupe", "danseur")) musiques.add("troupe");
  if (a(t, "guitare", "acoustique", "duo")) musiques.add("acoustique");
  if (a(t, "playlist", "calme", "discret", "doux")) musiques.add("playlist");
  if (!musiques.size) musiques.add(style === "festif" ? "dj" : style === "maroc" && type !== "pro" ? "orchestre" : "playlist");
  if (type === "pro") { musiques.delete("orchestre"); musiques.delete("troupe"); if (!musiques.size) musiques.add("playlist"); }
  const musique = [...musiques];

  const opts = new Set<OptionId>();
  if (a(t, "photo")) opts.add("photobooth");
  if (a(t, "parfum", "nawar")) opts.add("nawar");
  if (a(t, "buffet", "traiteur", "repas", "manger")) opts.add("buffet");
  if (a(t, "the ", "the,", "the.", "menthe")) opts.add("the_bar");
  if (a(t, "bonbon", "candy", "enfant", "sucre")) opts.add("candy_bar");
  if (a(t, "livre d")) opts.add("livre_dor");
  if (a(t, "feux", "etincelle")) opts.add("feux_froids");
  if (a(t, "salon", "banquette", "discuter", "lounge")) opts.add("salon");
  if (a(t, "danse", "piste", "danser") || musique.includes("dj")) opts.add("piste");
  if (a(t, "fleur", "bouquet")) opts.add("fleurs");
  if (a(t, "arche")) opts.add("arche");
  if (a(t, "petale")) opts.add("petales");
  if (a(t, "fontaine")) opts.add("fontaine");
  if (opts.size < 2) { // quelques idées cohérentes avec le style, sans rien pousser de plus
    if (style === "romantique") { opts.add("fleurs"); opts.add("arche"); }
    else if (style === "maroc") { opts.add("the_bar"); opts.add("fontaine"); }
    else if (style === "festif") { opts.add("photobooth"); opts.add("piste"); }
    else if (style === "minimal") { opts.add("photographe"); }
    else { opts.add("fleurs"); opts.add("photobooth"); }
  }
  const options = [...opts].filter((o) => { const i = infoOption(o); return !!i && disponiblePour(i, type, lieuEff); }).slice(0, 5);
  const accueil: AccueilId | null = type === "pro" ? "hotesses" : a(t, "the de bienvenue") ? "the" : style === "beige_or" || style === "maroc" ? "hotesses" : "discret";
  const explication = pasBling
    ? `Pour rester chic sans en faire trop, je te propose un style « ${STYLES.find((s) => s.id === style)!.nom.toLowerCase()} », une lumière chaleureuse et quelques touches discrètes. Tu peux tout ajuster avant d'appliquer.`
    : explicationAuto({ style, palette, options });
  return validerProposition({ lieu, style, palette, lumiere, musiques: musique, accueil, options, explication }, type, lieuCourant, "auto")!;
}

// ── Appel de l'IA (optionnel) ───────────────────────────────────────────────
const cleAppels = "heavent-city:ia-appels";
const lireAppels = () => { try { return Number(sessionStorage.getItem(cleAppels) ?? 0) || 0; } catch { return 0; } };
const noterAppel = () => { try { sessionStorage.setItem(cleAppels, String(lireAppels() + 1)); } catch { /* ignoré */ } };

export interface ReponseAssistant { proposition: Proposition; note?: string }

export async function demanderAssistant(message: string, type: TypeEvt, lieu: LieuId | null): Promise<ReponseAssistant> {
  const texte = message.replace(/\s+/g, " ").trim().slice(0, MESSAGE_MAX);
  if (!texte) throw new Error("Écris quelques mots sur l'ambiance que tu imagines.");
  const auto = () => suggestionAutomatique(texte, type, lieu);
  if (!IA_CONFIGUREE) return { proposition: auto() };
  if (lireAppels() >= MAX_APPELS) return { proposition: auto(), note: "Suggestion automatique (limite d'échanges atteinte pour cette visite)." };
  noterAppel();
  const ctrl = new AbortController();
  const minuteur = window.setTimeout(() => ctrl.abort(), DELAI_MS);
  try {
    const r = await fetch(`${FUNCTIONS_URL}/heavent-city-ia`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: texte, type, lieu }), signal: ctrl.signal });
    const j = await r.json().catch(() => null);
    if (j?.disponible === false) return { proposition: auto() }; // IA non activée : suggestions automatiques, sans message d'excuse
    if (r.ok) {
      const p = validerProposition(j?.proposition, type, lieu, "ia");
      if (p) return { proposition: p };
    }
    return { proposition: auto() };
  } catch {
    return { proposition: auto() };
  } finally {
    window.clearTimeout(minuteur);
  }
}
