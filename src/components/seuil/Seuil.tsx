import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Briques de la direction « Seuil » (site public) : photo à liseré or, boutons à biseau,
 * surtitre à filet, ruban HEAVENT, étoile à huit branches, petites lumières de Nawar,
 * et l'observateur qui fait apparaître les sections au défilement.
 * Les styles sont dans src/styles/seuil.css (classes « s- »).
 */

const DOSSIER = "/photos";

export function Photo({ nom, alt, l, h, tailles = "(min-width:900px) 40vw, 92vw", legende, prioritaire = false, petit = false, className = "", style }: {
  nom: string; alt: string; l: number; h: number; tailles?: string; legende?: ReactNode; prioritaire?: boolean; petit?: boolean; className?: string; style?: CSSProperties;
}) {
  const priorite = prioritaire ? { fetchpriority: "high" } : {};
  return (
    <figure className={`s-photo${petit ? " petit" : ""} ${className}`} data-photo={prioritaire ? undefined : ""} style={style}>
      <div className="s-cadre"><div className="s-voile">
        <img src={`${DOSSIER}/${nom}-720.webp`} srcSet={`${DOSSIER}/${nom}-480.webp 480w, ${DOSSIER}/${nom}-720.webp 720w, ${DOSSIER}/${nom}.jpg 900w`} sizes={tailles}
          width={l} height={h} alt={alt} loading={prioritaire ? "eager" : "lazy"} decoding="async" {...priorite} />
      </div></div>
      {legende ? <figcaption>{legende}</figcaption> : null}
    </figure>
  );
}

export function Filet({ className = "" }: { className?: string }) {
  return <span className={`s-filet ${className}`} aria-hidden="true" />;
}

export function Surtitre({ children, className = "", as: Balise = "div" }: { children: ReactNode; className?: string; as?: "div" | "p" | "h2" }) {
  return <Balise className={`s-surtitre ${className}`}>{children} <Filet /></Balise>;
}

type PropsBouton = { to?: string; href?: string; variante?: "plein" | "filet"; fleche?: boolean; children: ReactNode; className?: string; onClick?: () => void; testid?: string; sombre?: boolean; externe?: boolean };
export function Bouton({ to, href, variante = "plein", fleche = false, children, className = "", onClick, testid, sombre, externe }: PropsBouton) {
  const cls = `s-btn s-btn-${variante}${sombre ? " s-sombre" : ""} ${className}`;
  const contenu = <>{children}{fleche ? <span className="fl" aria-hidden="true">→</span> : null}</>;
  if (to) return <Link to={to} className={cls} onClick={onClick} data-testid={testid}>{contenu}</Link>;
  return <a href={href} className={cls} onClick={onClick} data-testid={testid} {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{contenu}</a>;
}

export function Ruban({ children }: { children: ReactNode }) {
  return <span className="s-ruban"><img src="/seuil/mono-or.png" alt="" width={9} height={12} />{children}</span>;
}

export function Etoile({ className = "" }: { className?: string }) {
  return (
    <span className={`s-etoile ${className}`} aria-hidden="true">
      <svg viewBox="0 0 16 16"><path d="M8 .8l2.1 3.1 3.6-.7-.7 3.6L16 8.9l-3 2.1.7 3.6-3.6-.7L8 17l-2.1-3.1-3.6.7.7-3.6L0 8.9 3 6.8l-.7-3.6 3.6.7z" transform="translate(0 -.9)" fill="none" stroke="#A8933F" strokeWidth="1" /><circle cx="8" cy="8" r="1.6" fill="#A8933F" /></svg>
    </span>
  );
}

/** Les petites lumières de Nawar : six points ambrés qui montent lentement (masqués si « Réduire les animations »). */
const LUMIERES: [number, number, number][] = [[12, 13, 0], [30, 11, 4], [48, 14, 7], [66, 12, 2], [82, 13, 9], [94, 11, 5]];
export function Lumieres() {
  return (
    <div className="s-lumieres" aria-hidden="true">
      {LUMIERES.map(([x, d, r], i) => <i key={i} style={{ left: `${x}%`, "--d": `${d}s`, "--r": `${-r}s`, "--x": `${(i % 2 ? 1 : -1) * (10 + i * 3)}px` } as CSSProperties} />)}
    </div>
  );
}

/** Le petit sceau Nawar avec sa lueur ambrée. */
export function HaloNawar() {
  return (
    <span className="s-halo" aria-hidden="true">
      <img src="/marque-nawar.png" alt="" width={20} height={20} />
      <i className="s-lueur" style={{ "--d": "0s", "--x": "-8px" } as CSSProperties} />
      <i className="s-lueur" style={{ "--d": "2.3s", "--x": "6px" } as CSSProperties} />
      <i className="s-lueur" style={{ "--d": "4.6s", "--x": "-2px" } as CSSProperties} />
    </span>
  );
}

/** En-tête de page intérieure, sur fond nuit : fil d'Ariane, surtitre, titre, chapeau, actions. */
export function PageTete({ surtitre, titre, chapo, ariane, children, testid }: { surtitre?: ReactNode; titre: ReactNode; chapo?: ReactNode; ariane?: ReactNode; children?: ReactNode; testid?: string }) {
  return (
    <section className="s-nuit" data-testid={testid}>
      <div className="s-page-tete s-wrap">
        {ariane}
        {surtitre ? <Surtitre className="s-entree-heros">{surtitre}</Surtitre> : null}
        <h1 className="s-h1 s-entree-heros">{titre}</h1>
        {chapo ? <p className="s-chapo s-entree-heros" style={{ animationDelay: ".12s" }}>{chapo}</p> : null}
        {children}
      </div>
    </section>
  );
}

let premierAffichage = true;
/** Vrai une seule fois : au tout premier affichage d'une page pré-générée (le contenu est déjà à l'écran). */
export function consommerPremierAffichage() {
  const pregen = premierAffichage && typeof window !== "undefined" && !!(window as unknown as { __pagePregeneree?: boolean }).__pagePregeneree;
  premierAffichage = false;
  return pregen;
}

const SELECTEUR = "[data-revele],[data-photo],[data-deroule],.s-surtitre";

function compter(el: HTMLElement) {
  const fin = Number(el.dataset.compte);
  if (!Number.isFinite(fin)) return;
  const t0 = performance.now(), d = 1400;
  const pas = (t: number) => {
    const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3);
    el.textContent = String(Math.round(fin * e));
    if (k < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

/**
 * Apparitions au défilement (IntersectionObserver), ajoutées aux éléments au fur et à mesure qu'ils arrivent dans la page.
 * Le contenu n'est caché que lorsque ce script tourne (html.s-anime) : sans JavaScript, tout reste lisible.
 * « Réduire les animations » : rien n'est caché, rien ne bouge.
 */
export function AnimationsSeuil() {
  const { pathname } = useLocation();
  const premierChemin = useRef(pathname);
  const navigue = useRef(false);
  if (pathname !== premierChemin.current) navigue.current = true;
  useEffect(() => {
    const html = document.documentElement;
    if (typeof IntersectionObserver === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const direct = (window as unknown as { __pagePregeneree?: boolean }).__pagePregeneree;
    html.classList.add("s-anime");
    const suivis = new WeakSet<Element>();
    const reveler = (el: HTMLElement, immediat: boolean) => {
      if (immediat) { el.classList.add("vu", "vu-direct"); return; }
      el.querySelectorAll<HTMLElement>("[data-compte]").forEach(compter);
      const img = el.matches("[data-photo]") ? el.querySelector("img") : null;
      if (img && !img.complete && img.decode) img.decode().catch(() => undefined).then(() => el.classList.add("vu"));
      else el.classList.add("vu");
    };
    const io = new IntersectionObserver((entrees) => entrees.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      reveler(e.target as HTMLElement, false);
    }), { rootMargin: "0px 0px 15% 0px" });
    // Page pré-générée, au premier chargement : ce qui est déjà à l'écran reste affiché tel quel (pas de clignotement)
    const immediat = () => !!direct && !navigue.current && performance.now() < 4000;
    const suivre = (racine: ParentNode) => {
      const liste: Element[] = [];
      if (racine instanceof Element && racine.matches(SELECTEUR)) liste.push(racine);
      racine.querySelectorAll?.(SELECTEUR).forEach((el) => liste.push(el));
      for (const el of liste) {
        if (suivis.has(el) || el.classList.contains("vu")) continue;
        suivis.add(el);
        if (immediat() && el.getBoundingClientRect().top < window.innerHeight) { reveler(el as HTMLElement, true); continue; }
        io.observe(el);
      }
    };
    suivre(document.body);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => { if (n.nodeType === 1) suivre(n as Element); });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); html.classList.remove("s-anime"); };
  }, []);
  return null;
}
