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
const sansAccent = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function RechercheGlobale({ ouvert, onFermer, rubriques, onAller, onOuvrirDevis }: {
  ouvert: boolean; onFermer: () => void; rubriques: RubriqueRecherche[];
  onAller: (onglet: string) => void; onOuvrirDevis: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [donnees, setDonnees] = useState<Resultat[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [actif, setActif] = useState(0);
  const champ = useRef<HTMLInputElement>(null);

  useEffect(() => { if (!ouvert) { setQ(""); setDonnees([]); setErreur(false); setActif(0); } }, [ouvert]);

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
        for (const x of d.data ?? []) r.push({ cle: `d${x.id}`, groupe: "Devis", titre: `${x.numero ?? "Devis"} · ${x.client_nom || x.client_societe || "Sans nom"}`, detail: [x.titre, libelleStatut("devis", x.statut)].filter(Boolean).join(" · "), action: () => onOuvrirDevis(x.id) });
        for (const x of dm.data ?? []) r.push({ cle: `m${x.id}`, groupe: "Demandes", titre: `${[x.prenom, x.nom].filter(Boolean).join(" ")}`, detail: ["Événement", x.date_mariage].filter(Boolean).join(" · "), action: () => onAller("mariage") });
        for (const x of de.data ?? []) r.push({ cle: `e${x.id}`, groupe: "Demandes", titre: `${x.entreprise || [x.prenom, x.nom].filter(Boolean).join(" ")}`, detail: ["Entreprise", x.date_evenement].filter(Boolean).join(" · "), action: () => onAller("entreprise") });
        for (const x of st.data ?? []) r.push({ cle: `s${x.id}`, groupe: "Personnel", titre: `${[x.prenom, x.nom].filter(Boolean).join(" ")}`, detail: x.email ?? "", action: () => onAller("staff") });
        setDonnees(r); setErreur([d, dm, de, st].every((z: any) => z.error)); setActif(0);
      } catch { if (!annule) { setDonnees([]); setErreur(true); } }
      finally { if (!annule) setChargement(false); }
    }, 250);
    return () => { annule = true; clearTimeout(t); };
  }, [q, onAller, onOuvrirDevis]);

  const rubriquesTrouvees: Resultat[] = useMemo(() => {
    const terme = sansAccent(nettoyer(q));
    if (terme.length < 2) return [];
    return rubriques.filter((r) => sansAccent(r.libelle).includes(terme) || sansAccent(r.groupe).includes(terme))
      .slice(0, 4).map((r) => ({ cle: `r${r.valeur}`, groupe: "Aller à", titre: r.libelle, detail: r.groupe, action: () => onAller(r.valeur) }));
  }, [q, rubriques, onAller]);

  const tous = [...donnees, ...rubriquesTrouvees];
  const choisir = (r: Resultat) => { onFermer(); setTimeout(r.action, 0); };
  const touche = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActif((a) => Math.min(a + 1, Math.max(tous.length - 1, 0))); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActif((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && tous[actif]) { e.preventDefault(); choisir(tous[actif]); }
  };
  const groupes = [...new Set(tous.map((r) => r.groupe))];
  const terme = nettoyer(q);

  return (
    <Dialog open={ouvert} onOpenChange={(o) => { if (!o) onFermer(); }}>
      <DialogContent className="admin-recherche top-[8vh] translate-y-0 gap-0 p-0 sm:max-w-xl" onOpenAutoFocus={(e) => { e.preventDefault(); champ.current?.focus(); }} data-testid="recherche-globale">
        <DialogTitle className="sr-only">Recherche</DialogTitle>
        <DialogDescription className="sr-only">Cherchez un client, un devis, une demande ou une rubrique.</DialogDescription>
        <div className="flex items-center gap-3 border-b border-[#E4D9C0] px-4">
          <Search className="h-4 w-4 shrink-0 text-[#7A5F1F]" aria-hidden />
          <input ref={champ} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={touche} role="combobox" aria-expanded={tous.length > 0} aria-controls="liste-recherche" aria-autocomplete="list"
            placeholder="Un nom, un numéro de devis, un e-mail…" autoComplete="off" enterKeyHint="search" data-testid="recherche-champ"
            className="h-14 min-w-0 flex-1 bg-transparent pr-8 text-[16px] text-[#141414] outline-none placeholder:text-[#8A7F6C]" />
        </div>
        <div id="liste-recherche" role="listbox" aria-label="Résultats" className="max-h-[60vh] overflow-y-auto py-2">
          {terme.length < 2 && <p className="px-4 py-6 text-[14px] text-[#5A5146]">Tapez au moins deux lettres. Les devis, demandes et profils du personnel s'affichent ici.</p>}
          {terme.length >= 2 && chargement && tous.length === 0 && <p className="px-4 py-6 text-[14px] text-[#5A5146]">Recherche…</p>}
          {terme.length >= 2 && !chargement && tous.length === 0 && <p className="px-4 py-6 text-[14px] text-[#5A5146]">{erreur ? "Recherche indisponible pour le moment." : `Aucun résultat pour « ${terme} ».`}</p>}
          {groupes.map((g) => (
            <div key={g}>
              <p className="px-4 pb-1 pt-3 text-[10.5px] font-medium uppercase tracking-[0.24em] text-[#7A5F1F]">{g}</p>
              {tous.filter((r) => r.groupe === g).map((r) => {
                const i = tous.indexOf(r);
                return (
                  <button key={r.cle} type="button" role="option" aria-selected={i === actif} onMouseMove={() => setActif(i)} onClick={() => choisir(r)}
                    className={`flex min-h-12 w-full flex-col items-start justify-center px-4 py-2 text-left ${i === actif ? "bg-[#A8933F]/15" : ""}`}>
                    <span className="w-full truncate text-[15px] text-[#141414]">{r.titre}</span>
                    {r.detail && <span className="w-full truncate text-[12.5px] text-[#5A5146]">{r.detail}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="hidden border-t border-[#E4D9C0] px-4 py-2 text-[11.5px] text-[#5A5146] sm:block">↑ ↓ pour choisir · Entrée pour ouvrir · Échap pour fermer</p>
      </DialogContent>
    </Dialog>
  );
}
