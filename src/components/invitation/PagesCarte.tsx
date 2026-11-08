import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { empaqueter, type PageCalculee } from "@/lib/pagination";

/**
 * Contenu d'une carte à cadre fixe, réparti en pages d'après la hauteur RÉELLEMENT mesurée
 * (polices chargées, langue, largeur de l'écran). Le décor ne bouge pas : seul le contenu change.
 * - tout tient : une seule page, sans bouton de navigation ;
 * - sinon : « Précédent / n sur m / Suivant », et « Répondre » à la place de « Suivant » sur la dernière page ;
 * - une unité plus haute que la page défile à l'intérieur (accessible au clavier) : rien n'est tronqué.
 */
export interface UnitePage {
  cle: string;
  /** `mesure` vaut vrai pour la copie invisible qui sert à mesurer : sans ref, sans data-testid, sans focus. */
  rendre: (mesure: boolean) => ReactNode;
  saut?: boolean;
  avecSuivante?: boolean;
  /** découpage plus fin (phrases entières) utilisé seulement si l'unité est plus haute qu'une page */
  parties?: UnitePage[];
  /** assemble des parties consécutives d'une même unité sur une même page (`debut` : la page commence par le début de l'unité) */
  fusion?: (rendus: ReactNode[], debut: boolean) => ReactNode;
  /** renseigné automatiquement sur les parties : cle de l'unité d'origine */
  groupe?: string;
}
interface Props {
  unites: UnitePage[];
  /** change quand le contenu change (langue, textes…) : relance la mesure et revient à la page 1 */
  signature: string;
  ar: boolean;
  textes: { suivant: string; precedent: string; pageSur: string; defilable: string };
  /** bouton « Répondre » (lien ou bouton déjà stylé) */
  repondre?: ReactNode;
  /** hauteur réservée à la barre du bas (px), doit correspondre au CSS (.inv-pag-bas) */
  hauteurBas?: number;
  onPage?: (page: number, total: number) => void;
}
const BAS = 52;
const effectives0 = (u: UnitePage[]) => u.map((_, i) => i);

export default function PagesCarte({ unites, signature, ar, textes, repondre, hauteurBas = BAS, onPage }: Props) {
  const racine = useRef<HTMLDivElement>(null);
  const mesure = useRef<HTMLDivElement>(null);
  const vue = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<PageCalculee[]>(() => [{ indices: effectives0(unites), defile: false }]);
  const [page, setPage] = useState(0);
  const [sens, setSens] = useState<1 | -1>(1);
  const [debord, setDebord] = useState(false);
  const [navigue, setNavigue] = useState(false);
  const [scindes, setScindes] = useState<string[]>([]);
  const effectives = useMemo<UnitePage[]>(() => unites.flatMap((u) => (u.parties && scindes.includes(u.cle) ? u.parties.map((q) => ({ ...q, groupe: u.cle, saut: q === u.parties![0] ? u.saut : undefined })) : [u])), [unites, scindes]);
  const unitesRef = useRef(effectives); unitesRef.current = effectives;
  const aRepondre = !!repondre;

  const calculer = useCallback(() => {
    const r = racine.current, m = mesure.current;
    if (!r || !m) return;
    const hs = Array.from(m.children).map((c) => c.getBoundingClientRect().height);
    if (!hs.length || hs.length !== unitesRef.current.length) return;
    const gap = parseFloat(getComputedStyle(m).rowGap) || 0;
    const total = r.clientHeight;
    if (total < 40) return; // cadre pas encore dimensionné
    const u = unitesRef.current.map((x, i) => ({ cle: x.cle, h: hs[i], saut: x.saut, avecSuivante: x.avecSuivante }));
    const confort = 0.97; // marge de confort : le texte ne frôle jamais le bord
    const seule = empaqueter(u, (total - (aRepondre ? hauteurBas : 0)) * confort, gap);
    const res = seule.length === 1 ? seule : empaqueter(u, (total - hauteurBas) * confort, gap);
    // une unité seule plus haute que la page : on la découpe en phrases entières, puis on remesure
    const trop = res.find((pg) => pg.defile && pg.indices.length === 1 && unitesRef.current[pg.indices[0]].parties);
    if (trop) { setScindes((a) => (a.includes(unitesRef.current[trop.indices[0]].cle) ? a : [...a, unitesRef.current[trop.indices[0]].cle])); return; }
    setPages((ancien) => (JSON.stringify(ancien) === JSON.stringify(res) ? ancien : res));
  }, [aRepondre, hauteurBas]);

  // mesure initiale, puis à chaque changement de contenu, de taille ou de polices
  useLayoutEffect(() => { setPage(0); setSens(1); setScindes([]); }, [signature]);
  useLayoutEffect(() => { calculer(); }, [calculer, effectives]);
  useEffect(() => {
    const r = racine.current; if (!r) return;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => calculer()) : null;
    ro?.observe(r);
    const apres = () => calculer();
    (document as any).fonts?.ready?.then(apres).catch(() => {});
    (document as any).fonts?.addEventListener?.("loadingdone", apres);
    window.addEventListener("orientationchange", apres);
    return () => { ro?.disconnect(); (document as any).fonts?.removeEventListener?.("loadingdone", apres); window.removeEventListener("orientationchange", apres); };
  }, [calculer]);

  const total = pages.length;
  const courante = Math.min(page, total - 1);
  useEffect(() => { if (page > total - 1) setPage(total - 1); }, [page, total]);
  useEffect(() => { onPage?.(courante, total); }, [courante, total, onPage]);

  // filet de sécurité : si malgré la mesure le contenu déborde, on rend la page défilante plutôt que de couper
  useLayoutEffect(() => {
    const v = vue.current; if (!v) return;
    // hauteur de mise en page de la page (insensible aux transformations des animations d'apparition)
    const verifier = () => setDebord(((v.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0) > v.clientHeight + 1);
    verifier();
    const t = window.setTimeout(verifier, 400);
    return () => window.clearTimeout(t);
  }, [courante, pages, signature, scindes]);

  const aller = (n: number) => { if (n < 0 || n > total - 1 || n === courante) return; setSens(n > courante ? 1 : -1); setNavigue(true); setPage(n); };
  const suivant = () => aller(courante + 1);
  const precedent = () => aller(courante - 1);
  const touche = (e: KeyboardEvent) => {
    if (total < 2 || (e.target as HTMLElement).closest?.("textarea, input, select")) return;
    const avance = ar ? "ArrowLeft" : "ArrowRight", recule = ar ? "ArrowRight" : "ArrowLeft";
    if (e.key === avance) { e.preventDefault(); suivant(); } else if (e.key === recule) { e.preventDefault(); precedent(); }
  };
  const dep = useRef<{ x: number; y: number } | null>(null);
  // blocs affichés : les parties consécutives d'une même unité se rejoignent en un seul paragraphe
  const blocs = useMemo(() => {
    const sortie: { cle: string; rendu: ReactNode }[] = [];
    const ix = pages[courante]?.indices ?? [];
    for (let n = 0; n < ix.length; n++) {
      const u = effectives[ix[n]]; if (!u) continue;
      if (!u.groupe) { sortie.push({ cle: u.cle, rendu: u.rendre(false) }); continue; }
      const parent = unites.find((x) => x.cle === u.groupe); const lot = [u];
      while (n + 1 < ix.length && effectives[ix[n + 1]]?.groupe === u.groupe) lot.push(effectives[ix[++n]]);
      const debut = effectives.findIndex((x) => x.groupe === u.groupe) === effectives.indexOf(u);
      sortie.push({ cle: u.cle, rendu: parent?.fusion ? parent.fusion(lot.map((q, i) => <Fragment key={q.cle}>{i ? " " : ""}{q.rendre(false)}</Fragment>), debut) : lot.map((q) => <Fragment key={q.cle}>{q.rendre(false)}</Fragment>) });
    }
    return sortie;
  }, [pages, courante, effectives, unites]);
  const defile = pages[courante]?.defile || debord;
  const derniere = courante === total - 1;
  const multi = total > 1;

  return (
    <div ref={racine} className="inv-pag" data-multi={multi || undefined} data-nav={navigue || undefined} onKeyDown={touche}
      style={{ "--pag-bas": `${hauteurBas}px` } as CSSProperties}>
      <div className="inv-pag-mesure" ref={mesure} aria-hidden="true">
        {effectives.map((u) => <div className="inv-pag-u" key={u.cle}>{u.rendre(true)}</div>)}
      </div>
      <div ref={vue} className="inv-pag-vue" data-defile={defile || undefined}
        {...(defile ? { tabIndex: 0, role: "region", "aria-label": textes.defilable } : {})}
        onTouchStart={(e) => { dep.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={(e) => {
          const d = dep.current; dep.current = null; if (!d || !multi) return;
          const dx = e.changedTouches[0].clientX - d.x, dy = e.changedTouches[0].clientY - d.y;
          if (Math.abs(dx) < 55 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
          (dx < 0) === !ar ? suivant() : precedent();
        }}>
        <div className="inv-pag-page" key={courante} data-sens={sens} role="group" aria-label={multi ? textes.pageSur.replace("{n}", String(courante + 1)).replace("{m}", String(total)) : undefined}>
          {blocs.map((b, k) => <div className="inv-pag-u" key={b.cle} style={{ "--k": k } as CSSProperties}>{b.rendu}</div>)}
        </div>
      </div>
      {(multi || repondre) && (
        <nav className="inv-pag-bas" data-rep={(repondre && multi && (courante === 0 || derniere)) || undefined} aria-label={multi ? textes.pageSur.replace("{n}", String(courante + 1)).replace("{m}", String(total)) : undefined}>
          {multi ? (
            <>
              {courante === 0 && repondre ? <span className="inv-pag-fin">{repondre}</span> : (
                <button type="button" className="inv-pag-btn" onClick={precedent} style={{ visibility: courante === 0 ? "hidden" : "visible" }} aria-hidden={courante === 0} tabIndex={courante === 0 ? -1 : 0} aria-label={textes.precedent} data-testid="pagination-precedent">
                  <i className="inv-pag-chev" aria-hidden="true">‹</i><span>{textes.precedent}</span>
                </button>
              )}
              <span className="inv-pag-compte" aria-live="polite" data-testid="pagination-compte"><bdi>{courante + 1} / {total}</bdi></span>
              {derniere ? <span className="inv-pag-fin">{repondre}</span> : (
                <button type="button" className="inv-pag-btn" onClick={suivant} aria-label={textes.suivant} data-testid="pagination-suivant"><span>{textes.suivant}</span><i className="inv-pag-chev" aria-hidden="true">›</i></button>
              )}
            </>
          ) : <span className="inv-pag-fin inv-pag-seul">{repondre}</span>}
        </nav>
      )}
    </div>
  );
}
