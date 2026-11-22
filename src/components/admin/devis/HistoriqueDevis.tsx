import { useEffect, useId, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { libelleStatut, type DomaineStatut } from "@/lib/statuts";

/**
 * « Historique » d'une fiche devis : qui a changé quel statut, et quand (devis + factures de ce devis).
 * Lecture seule, réservée aux administrateurs côté base ; ne bloque jamais l'écran si la lecture échoue.
 * Les lignes viennent de la table historique_changements (remplie par un déclencheur, voir la migration roles_et_historique).
 */
const FUSEAU = "Africa/Casablanca";
const DEBUT = "22 nov. 2026";
const PAR_PAGE = 10;
const DOMAINES: Record<string, DomaineStatut> = { devis: "devis", factures: "facture" };

interface Ligne { id: number; table_name: string; libelle: string | null; avant: string | null; apres: string | null; par_email: string | null; created_at: string }

/** Classe de losange `a-st` (couleur et plein/vide) selon le statut final. */
const classeLosange = (cle: string | null) =>
  cle === "accepte" || cle === "payee" ? "vert"
    : cle === "refuse" ? "terre"
    : cle === "annule" || cle === "annulee" || cle === "brouillon" || cle === "en_attente" ? "vide"
    : "";

const joliCle = (s: string) => { const t = s.replace(/_/g, " "); return t.charAt(0).toUpperCase() + t.slice(1); };
const statutLisible = (table: string, cle: string | null) => {
  const d = DOMAINES[table] ?? "devis";
  const l = libelleStatut(d, cle);
  return l === cle && cle ? joliCle(cle) : l;
};

/** « Aujourd'hui 08:30 », « Hier 17:12 », « 12 nov. 14:05 » (+ année si ce n'est pas l'année en cours), heure du Maroc. */
function quand(iso: string): string {
  const d = new Date(iso);
  const jour = (x: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: FUSEAU }).format(x);
  const heure = new Intl.DateTimeFormat("fr-FR", { timeZone: FUSEAU, hour: "2-digit", minute: "2-digit" }).format(d);
  const j = jour(d);
  if (j === jour(new Date())) return `Aujourd'hui ${heure}`;
  if (j === jour(new Date(Date.now() - 864e5))) return `Hier ${heure}`;
  const memeAnnee = j.slice(0, 4) === jour(new Date()).slice(0, 4);
  const date = new Intl.DateTimeFormat("fr-FR", { timeZone: FUSEAU, day: "numeric", month: "short", ...(memeAnnee ? {} : { year: "numeric" }) }).format(d);
  return `${date} ${heure}`;
}

/** Nom affiché : « Vous », « Automatique », sinon l'adresse mise en forme (jamais l'e-mail brut). */
function qui(par: string | null, moi: string | null): { texte: string; auto: boolean } {
  if (!par || par === "automatique") return { texte: "Automatique", auto: true };
  if (moi && par.toLowerCase() === moi) return { texte: "Vous", auto: false };
  const nom = par.split("@")[0].split(/[._-]+/).filter(Boolean).map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(" ");
  return { texte: nom || "—", auto: false };
}

export default function HistoriqueDevis({ devisId, rafraichir }: { devisId: string; rafraichir?: unknown }) {
  const idCorps = useId();
  const [ouvert, setOuvert] = useState(false);
  const [lignes, setLignes] = useState<Ligne[] | null>(null);
  const [erreur, setErreur] = useState(false);
  const [visibles, setVisibles] = useState(PAR_PAGE);
  const [moi, setMoi] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setMoi(data.session?.user?.email?.toLowerCase() ?? null)).catch(() => {});
  }, []);

  useEffect(() => {
    let annule = false;
    (async () => {
      try {
        const db = supabase as any;
        const { data: facs } = await db.from("factures").select("id").eq("devis_id", devisId);
        const idsFactures = (facs ?? []).map((f: { id: string }) => f.id);
        const requetes = [db.from("historique_changements").select("id, table_name, libelle, avant, apres, par_email, created_at")
          .eq("table_name", "devis").eq("ligne_id", devisId).order("created_at", { ascending: false }).limit(100)];
        if (idsFactures.length) requetes.push(db.from("historique_changements").select("id, table_name, libelle, avant, apres, par_email, created_at")
          .eq("table_name", "factures").in("ligne_id", idsFactures).order("created_at", { ascending: false }).limit(100));
        const resultats = await Promise.all(requetes);
        if (resultats.some((r: any) => r.error)) throw new Error("lecture");
        const toutes: Ligne[] = resultats.flatMap((r: any) => r.data ?? []);
        toutes.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
        if (!annule) { setLignes(toutes); setErreur(false); }
      } catch {
        if (!annule) setErreur(true);
      }
    })();
    return () => { annule = true; };
  }, [devisId, rafraichir]);

  const n = lignes?.length;
  return (
    <section className="ah" data-testid="historique-devis">
      <button type="button" className="ah-t" aria-expanded={ouvert} aria-controls={idCorps} onClick={() => setOuvert((o) => !o)}>
        <span>Historique{typeof n === "number" ? <b>({n})</b> : null}</span>
        <svg className="ah-chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div id={idCorps} className={`ah-corps${ouvert ? " ouvert" : ""}`}>
        <div className="ah-int">
          {erreur ? <p className="ah-note">Historique indisponible pour le moment.</p>
            : lignes === null ? <p className="ah-note">Chargement…</p>
            : lignes.length === 0 ? <p className="ah-vide">Aucun changement enregistré pour ce devis.</p>
            : (
              <ol>
                {lignes.slice(0, visibles).map((l) => {
                  const p = qui(l.par_email, moi);
                  const facture = l.table_name === "factures";
                  return (
                    <li key={l.id}>
                      <div className="ah-l1">
                        {facture && <span className="ah-pre">Facture {l.libelle ?? ""} · </span>}
                        {l.avant ? <><span className="ah-avant">{statutLisible(l.table_name, l.avant)}</span><span className="ah-fl" aria-hidden="true">→</span></> : <span className="ah-avant">Création · </span>}
                        <span className={`a-st ${classeLosange(l.apres)}`}>{statutLisible(l.table_name, l.apres)}</span>
                      </div>
                      <div className="ah-l2">{quand(l.created_at)} · <span className={p.auto ? "ah-auto" : undefined}>{p.texte}</span></div>
                    </li>
                  );
                })}
              </ol>
            )}
          {lignes && lignes.length > visibles && (
            <button type="button" className="ah-plus" onClick={() => setVisibles((v) => v + PAR_PAGE)}>Voir les {Math.min(PAR_PAGE, lignes.length - visibles)} suivantes</button>
          )}
          {lignes && !erreur && <p className="ah-note">L'historique commence le {DEBUT}.</p>}
        </div>
      </div>
    </section>
  );
}
