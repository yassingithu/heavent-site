/**
 * Pagination du contenu d'une carte d'invitation (moteur commun à tous les décors à cadre fixe).
 * Fonctions pures : le découpage du texte et l'empaquetage selon les hauteurs réellement mesurées.
 */

/** Saut de page manuel : une ligne qui ne contient que « --- ». */
export const SAUT_PAGE = "---";
const EST_SAUT = /^\s*-{3,}\s*$/;

export interface Morceau { texte: string; /** vrai : une nouvelle page doit commencer avant ce morceau */ saut: boolean }

/** Ouvrants/fermants qu'on ne coupe jamais : versets ﴿ ﴾, guillemets « », parenthèses, crochets. */
const PAIRES: Record<string, string> = { "﴿": "﴾", "«": "»", "(": ")", "[": "]", "“": "”" };
const FINS = new Set([".", "!", "?", "…", "؟", "؛", "۔", "。"]);
const FERMANTS = new Set(Object.values(PAIRES));

/** Coupe un paragraphe en phrases entières ; jamais à l'intérieur d'un verset, d'une citation ou d'une parenthèse. */
export function phrases(p: string): string[] {
  const t = p.replace(/\s+/g, " ").trim();
  if (!t) return [];
  const sortie: string[] = [];
  const pile: string[] = [];
  let debut = 0;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (PAIRES[c]) pile.push(PAIRES[c]);
    else if (FERMANTS.has(c) && pile[pile.length - 1] === c) pile.pop();
    else if (!pile.length && FINS.has(c)) {
      // fin de phrase : on absorbe la ponctuation et les fermants qui suivent (« Fin ! »), puis on exige un espace
      let j = i + 1;
      while (j < t.length && (FINS.has(t[j]) || FERMANTS.has(t[j]))) j++;
      if (j >= t.length || t[j] === " ") {
        // « M. », « Mme. », « Dr. » : abréviation, pas une fin de phrase
        const abrev = c === "." && /(^|\s)(M|Mme|Mlle|Mr|Dr|Pr|St|Ste|n°)$/i.test(t.slice(debut, i));
        if (!abrev) { sortie.push(t.slice(debut, j).trim()); debut = j; i = j - 1; }
      }
    }
  }
  if (debut < t.length) sortie.push(t.slice(debut).trim());
  return sortie.filter(Boolean);
}

/** Texte libre → morceaux (un paragraphe = un morceau), avec les sauts manuels. */
export function morceauxDeTexte(texte: string | null | undefined): Morceau[] {
  const sortie: Morceau[] = [];
  let saut = false;
  for (const ligne of (texte ?? "").replace(/\r\n?/g, "\n").split("\n")) {
    if (EST_SAUT.test(ligne)) { saut = sortie.length > 0; continue; }
    const t = ligne.trim();
    if (!t) continue;
    sortie.push({ texte: t, saut });
    saut = false;
  }
  return sortie;
}

export interface Unite {
  cle: string;
  /** hauteur mesurée (px), marges comprises */
  h: number;
  /** nouvelle page obligatoire avant cette unité (saut manuel) */
  saut?: boolean;
  /** doit rester avec l'unité suivante (ex. « Cher Karim, » avant le texte) : jamais seule en bas de page */
  avecSuivante?: boolean;
}
export interface PageCalculee { indices: number[]; /** vrai : le contenu dépasse la page même seul → défilement intérieur */ defile: boolean }

/**
 * Remplit les pages une par une avec les hauteurs réellement mesurées.
 * Une unité plus haute que la page reste seule sur sa page, qui devient défilable : rien n'est tronqué.
 */
export function empaqueter(unites: Unite[], dispo: number, gap: number): PageCalculee[] {
  const pages: number[][] = [];
  let cour: number[] = []; let haut = 0;
  unites.forEach((u, i) => {
    const ajout = (cour.length ? gap : 0) + u.h;
    if (cour.length && (u.saut || haut + ajout > dispo + 0.5)) {
      // les unités « avecSuivante » en fin de page suivent leur suite sur la page d'après
      const reste: number[] = [];
      while (cour.length > 1 && unites[cour[cour.length - 1]].avecSuivante) reste.unshift(cour.pop()!);
      pages.push(cour); cour = reste; haut = reste.reduce((s, k, n) => s + unites[k].h + (n ? gap : 0), 0);
    }
    haut += (cour.length ? gap : 0) + u.h;
    cour.push(i);
  });
  if (cour.length) pages.push(cour);
  const somme = (ix: number[]) => ix.reduce((s, k, n) => s + unites[k].h + (n ? gap : 0), 0);
  return pages.length ? pages.map((indices) => ({ indices, defile: somme(indices) > dispo + 1 })) : [{ indices: [], defile: false }];
}
