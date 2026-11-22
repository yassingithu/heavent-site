import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { libelleStatut } from "@/lib/statuts";

/**
 * Recherche globale de l'administration (loupe ou Ctrl/⌘ + K) : un nom, un numéro de devis, un e-mail
 * → les devis, les demandes et les profils du personnel qui correspondent, plus les rubriques du menu.
 * Lecture seule ; les droits sont ceux de la base (administrateurs uniquement). Ne bloque jamais l'écran si une requête échoue.
 */
export interface RubriqueRecherche { valeur: string; libelle: string; groupe: string }
interface Resultat { cle: string; groupe: string; titre: string; detail: string; action: () => void }

const nettoyer = (q: string) => q.replace(/[,()*%\\"']/g, " ").replace(/\s+/g, " ").trim();
const dateLisible = (d?: string | null) => { if (!d) return ""; const x = new Date(String(d).slice(0, 10) + "T12:00:00"); return isNaN(x.getTime()) ? "" : x.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }); };
const sansAccent = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function RechercheGlobale({ ouvert, onFermer, rubriques, onAller, onOuvrirDevis }: {
  ouvert: boolean; onFermer: () => void; rubriques: RubriqueRecherche[];
  onAller: (onglet: string, terme?: string, demandeId?: string) => void; onOuvrirDevis: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [donnees, setDonnees] = useState<Resultat[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [actif, setActif] = useState(0);
  const champ = useRef<HTMLInputElement>(null);
  const cbs = useRef({ onAller, onOuvrirDevis });
  cbs.current = { onAller, onOuvrirDevis };
  const allerCb = (o: string, t?: string, id?: string) => cbs.current.onAller(o, t, id);
  const devisCb = (id: string) => cbs.current.onOuvrirDevis(id);

  useEffect(() => { if (!ouvert) { setQ(""); setDonnees([]); setErreur(false); setActif(0); } }, [ouvert]);

  const [recents, setRecents] = useState<Resultat[]>([]);
  useEffect(() => {
    if (!ouvert) return;
    let annule = false;
    (async () => {
      try {
        const { data } = await (supabase as any).from("devis").select("id, numero, titre, client_nom, client_societe, statut").order("created_at", { ascending: false }).limit(5);
        if (annule) return;
        setRecents((data ?? []).map((x: any) => ({ cle: `z${x.id}`, groupe: "Derniers devis", titre: `${x.numero ?? "Devis"} · ${x.client_nom || x.client_societe || "Sans nom"}`, detail: [x.titre, libelleStatut("devis", x.statut)].filter(Boolean).join(" · "), action: () => devisCb(x.id) })));
      } catch { /* sans incidence */ }
    })();
    return () => { annule = true; };
  }, [ouvert]);

  useEffect(() => {
    const terme = nettoyer(q);
    if (terme.length < 2) { setDonnees([]); setChargement(false); setErreur(false); return; }
    let annule = false;
    setChargement(true);
    const t = setTimeout(async () => {
      try {
        const db = supabase as any;
        const m = `%${terme}%`;
        const [d, dm, de, st] = await Promise.all([
          db.from("devis").select("id, numero, titre, client_nom, client_societe, statut, date_evenement")
            .or(`client_nom.ilike.${m},client_societe.ilike.${m},numero.ilike.${m},titre.ilike.${m},client_email.ilike.${m}`).order("created_at", { ascending: false }).limit(6),
          db.from("devis_mariage").select("id, nom, prenom, email, date_mariage, statut")
            .or(`nom.ilike.${m},prenom.ilike.${m},email.ilike.${m}`).order("created_at", { ascending: false }).limit(4),
          db.from("devis_entreprise").select("id, nom, prenom, entreprise, email, date_evenement, statut")
            .or(`nom.ilike.${m},prenom.ilike.${m},entreprise.ilike.${m},email.ilike.${m}`).order("created_at", { ascending: false }).limit(4),
          db.from("staff").select("id, nom, prenom, email")
            .or(`nom.ilike.${m},prenom.ilike.${m},email.ilike.${m}`).limit(5),
        ]);
        if (annule) return;
        const r: Resultat[] = [];
        for (const x of d.data ?? []) r.push({ cle: `d${x.id}`, groupe: "Devis", titre: `${x.numero ?? "Devis"} · ${x.client_nom || x.client_societe || "Sans nom"}`, detail: [x.titre, dateLisible(x.date_evenement), libelleStatut("devis", x.statut)].filter(Boolean).join(" · "), action: () => devisCb(x.id) });
        for (const x of dm.data ?? []) r.push({ cle: `m${x.id}`, groupe: "Demandes", titre: `${[x.prenom, x.nom].filter(Boolean).join(" ")}`, detail: ["Demande événement", dateLisible(x.date_mariage), libelleStatut("reponse_rapide", x.statut), x.email].filter(Boolean).join(" · "), action: () => allerCb("mariage", undefined, x.id) });
        for (const x of de.data ?? []) r.push({ cle: `e${x.id}`, groupe: "Demandes", titre: `${x.entreprise || [x.prenom, x.nom].filter(Boolean).join(" ")}`, detail: ["Demande entreprise", dateLisible(x.date_evenement), libelleStatut("reponse_rapide", x.statut), x.email].filter(Boolean).join(" · "), action: () => allerCb("entreprise", undefined, x.id) });
        for (const x of st.data ?? []) r.push({ cle: `s${x.id}`, groupe: "Personnel", titre: `${[x.prenom, x.nom].filter(Boolean).join(" ")}`, detail: x.email ?? "", action: () => allerCb("staff", [x.prenom, x.nom].filter(Boolean).join(" ")) });
        setDonnees(r); setErreur([d, dm, de, st].every((z: any) => z.error)); setActif(0);
      } catch { if (!annule) { setDonnees([]); setErreur(true); } }
      finally { if (!annule) setChargement(false); }
    }, 250);
    return () => { annule = true; clearTimeout(t); };
  }, [q]);

  const rubriquesTrouvees: Resultat[] = useMemo(() => {
    const terme = sansAccent(nettoyer(q));
    if (terme.length < 2) return [];
    return rubriques.filter((r) => sansAccent(r.libelle).includes(terme) || sansAccent(r.groupe).includes(terme))
      .slice(0, 4).map((r) => ({ cle: `r${r.valeur}`, groupe: "Aller à", titre: r.libelle, detail: r.groupe, action: () => allerCb(r.valeur) }));
  }, [q, rubriques]);

  const termeCourt = nettoyer(q).length < 2;
  const tous = termeCourt ? recents : [...donnees, ...rubriquesTrouvees];
  const choisir = (r: Resultat) => { onFermer(); setTimeout(r.action, 0); };
  const touche = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActif((a) => Math.min(a + 1, Math.max(tous.length - 1, 0))); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActif((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && tous[actif] && !(chargement && nettoyer(q).length >= 2)) { e.preventDefault(); choisir(tous[actif]); }
  };
  const groupes = [...new Set(tous.map((r) => r.groupe))];
  const terme = nettoyer(q);
  useEffect(() => { document.getElementById(`rg-${tous[actif]?.cle}`)?.scrollIntoView({ block: "nearest" }); }, [actif]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog open={ouvert} onOpenChange={(o) => { if (!o) onFermer(); }}>
      <DialogContent className="admin-recherche top-3 sm:top-[10vh] translate-y-0 gap-0 rounded-none p-0 font-[Jost,Futura,system-ui,sans-serif] sm:max-w-xl sm:rounded-none [&>button:last-child]:right-2 [&>button:last-child]:top-2 [&>button:last-child]:flex [&>button:last-child]:h-10 [&>button:last-child]:w-10 [&>button:last-child]:items-center [&>button:last-child]:justify-center" onOpenAutoFocus={(e) => { e.preventDefault(); champ.current?.focus(); }} data-testid="recherche-globale">
        <DialogTitle className="sr-only">Recherche</DialogTitle>
        <DialogDescription className="sr-only">Cherchez un client, un devis, une demande ou une rubrique.</DialogDescription>
        <div className="flex items-center gap-3 relative border-b border-[#DCCDAA] px-4 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-[#A8933F] after:transition-transform after:duration-300 focus-within:after:scale-x-100">
          <Search className="h-4 w-4 shrink-0 text-[#7A5F1F]" aria-hidden />
          <input ref={champ} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={touche} role="combobox" aria-expanded={tous.length > 0} aria-controls="liste-recherche" aria-autocomplete="list" aria-activedescendant={tous[actif] ? `rg-${tous[actif].cle}` : undefined}
            placeholder="Un nom, un numéro de devis, un e-mail…" autoComplete="off" enterKeyHint="search" data-testid="recherche-champ"
            className="h-14 min-w-0 flex-1 bg-transparent pr-12 text-[16px] text-[#141414] outline-none placeholder:text-[#6B6150]" />
        </div>
        <div id="liste-recherche" role="listbox" aria-label="Résultats" className="max-h-[calc(100dvh-env(safe-area-inset-top,0px)-300px)] sm:max-h-[60vh] overflow-y-auto py-2">
          {terme.length < 2 && recents.length === 0 && <p className="px-4 py-6 text-[14px] text-[#5A5146]">Tapez au moins deux lettres : devis, demandes et profils du personnel s'affichent ici.</p>}
          {terme.length >= 2 && chargement && tous.length === 0 && <p className="px-4 py-6 text-[14px] text-[#5A5146]">Recherche…</p>}
          {terme.length >= 2 && !chargement && tous.length === 0 && <p className="px-4 py-6 text-[14px] text-[#5A5146]">{erreur ? "Recherche indisponible pour le moment." : `Aucun résultat pour « ${terme} ».`}</p>}
          {groupes.map((g) => (
            <div key={g}>
              <p className="flex items-center gap-3 px-4 pb-1 pt-3 text-[10.5px] font-medium uppercase tracking-[0.24em] text-[#7A5F1F] after:h-px after:flex-1 after:bg-[#DCCDAA] after:content-['']">{g}</p>
              {tous.filter((r) => r.groupe === g).map((r) => {
                const i = tous.indexOf(r);
                return (
                  <button key={r.cle} id={`rg-${r.cle}`} tabIndex={-1} style={{ "--n": Math.min(i, 8) } as React.CSSProperties} type="button" role="option" aria-selected={i === actif} onMouseMove={() => setActif(i)} onClick={() => choisir(r)}
                    className={`flex min-h-12 w-full flex-col items-start justify-center border-l-[3px] py-2 pl-[13px] pr-4 text-left transition-colors duration-150 ${i === actif ? "border-[#A8933F] bg-[#A8933F]/15" : "border-transparent"}`}>
                    <span className="w-full truncate text-[15px] text-[#141414]">{r.titre}</span>
                    {r.detail && <span className="w-full truncate text-[12.5px] text-[#5A5146]">{r.detail}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="hidden border-t border-[#DCCDAA] bg-[#F3ECDD] px-4 py-2 text-[11.5px] text-[#5A5146] sm:block"><kbd className="border border-[#DCCDAA] px-1">↑</kbd> <kbd className="border border-[#DCCDAA] px-1">↓</kbd> pour choisir · <kbd className="border border-[#DCCDAA] px-1">Entrée</kbd> pour ouvrir · <kbd className="border border-[#DCCDAA] px-1">Échap</kbd> pour fermer</p>
      </DialogContent>
    </Dialog>
  );
}
