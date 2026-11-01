import { useEffect, useState, type ComponentType } from "react";
import { Ellipsis, House, CalendarDays, Users, X } from "lucide-react";

type Icone = ComponentType<{ className?: string }>;
export interface GroupeMenu { titre: string; items: { valeur: string; libelle: string; Icone: Icone; badge?: number }[] }

/** Les quatre accès fréquents sur téléphone. Tout le reste se trouve sous « Plus ». */
const PRINCIPAUX: { valeur: string; libelle: string; Icone: Icone }[] = [
  { valeur: "tableau", libelle: "Accueil", Icone: House },
  { valeur: "agenda", libelle: "Événements", Icone: CalendarDays },
  { valeur: "staff", libelle: "Équipe", Icone: Users },
];

/**
 * Barre de navigation du bas pour téléphone (masquée sur ordinateur).
 * Accueil · Événements · Équipe · Plus. « Plus » ouvre la liste complète, groupée, avec les mêmes rubriques que le menu latéral.
 */
export default function BarreBasseAdmin({ onglet, onChoisir, groupes, onDeconnexion }: {
  onglet: string; onChoisir: (valeur: string) => void; groupes: GroupeMenu[]; onDeconnexion: () => void;
}) {
  const [plusOuvert, setPlusOuvert] = useState(false);
  const principaux = new Set(PRINCIPAUX.map((p) => p.valeur));
  const badgeTotal = groupes.flatMap((g) => g.items).reduce((t, i) => t + (i.badge ?? 0), 0);
  const dansPlus = !principaux.has(onglet);

  useEffect(() => {
    if (!plusOuvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setPlusOuvert(false);
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [plusOuvert]);

  const choisir = (v: string) => { setPlusOuvert(false); onChoisir(v); };

  return (
    <div className="lg:hidden" data-testid="barre-basse">
      {plusOuvert && (
        <div className="fixed inset-0 z-[44] flex flex-col justify-end" role="dialog" aria-modal="true" aria-label="Toutes les rubriques">
          <button className="absolute inset-0 bg-black/50" aria-label="Fermer" onClick={() => setPlusOuvert(false)} />
          <div className="relative max-h-[82vh] overflow-y-auto bg-[#F3ECDD] border-t-2 border-[#A8933F] px-4 pt-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="font-serif text-xl text-[#141414]">Toutes les rubriques</p>
              <button onClick={() => setPlusOuvert(false)} className="h-10 w-10 rounded-full hover:bg-black/5 flex items-center justify-center" aria-label="Fermer"><X className="h-5 w-5" /></button>
            </div>
            {groupes.map((g) => (
              <section key={g.titre} className="mb-4">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#7A5F1F] mb-1.5 px-1">{g.titre}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {g.items.map(({ valeur, libelle, Icone, badge }) => (
                    <button key={valeur} onClick={() => choisir(valeur)} data-testid={`plus-${valeur}`}
                      className={`relative flex items-center gap-2.5 border px-3 min-h-12 text-left text-[13px] transition-colors ${onglet === valeur ? "bg-[#141414] text-[#E4D49A] border-[#141414]" : "bg-[#FAF6EC] text-[#141414] border-[#DCCDAA] active:bg-[#EBE2CF]"}`}>
                      <Icone className="h-4 w-4 shrink-0" /><span className="leading-tight">{libelle}</span>
                      {!!badge && <span className="ml-auto font-serif text-[17px] leading-none text-[#9C4A2C] tabular-nums">{badge}</span>}
                    </button>
                  ))}
                </div>
              </section>
            ))}
            <div className="flex gap-2 pt-1">
              <a href="/?depuis-admin=1" target="_blank" rel="noreferrer" className="s-btn s-btn-filet flex-1 !min-h-11 !text-[13px]" style={{ ["--fond" as string]: "#F3ECDD" }}>Voir le site</a>
              <button onClick={onDeconnexion} className="s-btn s-btn-plein s-sombre flex-1 !min-h-11 !text-[13px]">Déconnexion</button>
            </div>
          </div>
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-[45] border-t border-[#E4D49A]/15 bg-[#1B1916] text-[#BDB29C] pt-1 pb-[calc(6px+env(safe-area-inset-bottom))]" aria-label="Navigation principale">
        <ul className="relative grid grid-cols-4">
          {/* Le trait glisse sous l'onglet choisi */}
          <span className="a-trait-nav !top-auto bottom-0.5" style={{ transform: `translateX(${(plusOuvert || dansPlus ? 3 : Math.max(0, PRINCIPAUX.findIndex((p) => p.valeur === onglet))) * 100}%)` }} aria-hidden />
          {PRINCIPAUX.map(({ valeur, libelle, Icone }) => {
            const actif = onglet === valeur && !plusOuvert;
            return (
              <li key={valeur}>
                <button onClick={() => choisir(valeur)} aria-current={actif ? "page" : undefined} data-testid={`bas-${valeur}`}
                  className={`w-full min-h-14 flex flex-col items-center justify-center gap-1 text-[11px] font-medium tracking-[0.04em] transition-colors ${actif ? "text-[#E4D49A]" : "text-[#BDB29C]"}`}>
                  <Icone className="h-5 w-5 [stroke-width:1.4]" />{libelle}
                </button>
              </li>
            );
          })}
          <li>
            <button onClick={() => setPlusOuvert((o) => !o)} aria-expanded={plusOuvert} data-testid="bas-plus"
              className={`relative w-full min-h-14 flex flex-col items-center justify-center gap-1 text-[11px] font-medium tracking-[0.04em] transition-colors ${plusOuvert || dansPlus ? "text-[#E4D49A]" : "text-[#BDB29C]"}`}>
              <Ellipsis className="h-5 w-5 [stroke-width:1.4]" />Plus
              {badgeTotal > 0 && !plusOuvert && <span className="absolute top-1 left-1/2 ml-2.5 text-[10.5px] leading-none font-medium tabular-nums text-[#E4D49A]" aria-label={`${badgeTotal} nouvelle(s) demande(s)`}>{badgeTotal}</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
