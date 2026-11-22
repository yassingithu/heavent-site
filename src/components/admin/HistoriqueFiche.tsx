import { useEffect, useId, useRef, useState } from "react";
import { History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { libelleStatut, type DomaineStatut } from "@/lib/statuts";
import { quand, qui } from "@/components/admin/devis/HistoriqueDevis";

/**
 * « Historique » d'une fiche crew ou d'un contrat : qui a changé quel statut, et quand.
 * Même présentation que celle des devis (styles .ah). Lecture seule, réservée aux administrateurs côté base ;
 * ne bloque jamais l'écran si la lecture échoue. Source : table historique_changements (déclencheurs de la base).
 */
const PAR_PAGE = 10;
const DEBUT = "22 nov. 2026";
interface Ligne { id: number; champ: string; avant: string | null; apres: string | null; par_email: string | null; created_at: string; texte?: string }

const DOMAINE_PAR_CHAMP: Record<string, DomaineStatut> = { statut: "contrat", statut_candidature: "candidature", banni: "acces" };
const PREFIXE_PAR_CHAMP: Record<string, string> = { statut_candidature: "Candidature", banni: "Accès" };
// « Actif » dit l'état de départ ; à l'arrivée d'un bannissement levé, « Réactivé » dit qu'une personne l'a rétabli
const lisible = (champ: string, cle: string | null, arrivee = false) => (champ === "banni" && arrivee && cle === "false" ? "Réactivé" : libelleStatut(DOMAINE_PAR_CHAMP[champ] ?? "contrat", cle));
const classe = (champ: string, cle: string | null) =>
  champ === "banni" ? (cle === "true" ? "terre" : "vert")
    : cle === "approuve" || cle === "actif" ? "vert"
    : cle === "refuse" || cle === "annule" ? "terre"
    : "vide";

export default function HistoriqueFiche({ table, ligneId, nom }: { table: "contrats" | "staff"; ligneId: string; nom: string }) {
  const idCorps = useId();
  const [ouvert, setOuvert] = useState(false);
  const [lignes, setLignes] = useState<Ligne[] | null>(null);
  const [erreur, setErreur] = useState(false);
  const [visibles, setVisibles] = useState(PAR_PAGE);
  const [moi, setMoi] = useState<string | null>(null);
  const racine = useRef<HTMLElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setMoi(data.session?.user?.email?.toLowerCase() ?? null)).catch(() => {});
  }, []);
  useEffect(() => { setLignes(null); setErreur(false); setVisibles(PAR_PAGE); setOuvert(false); }, [table, ligneId]);

  useEffect(() => {
    // Relu à chaque ouverture du bloc : un changement peut venir d'ailleurs (autre écran, autre administrateur)
    if (!ouvert && lignes !== null) return;
    let annule = false;
    (async () => {
      try {
        const { data, error } = await (supabase as any).from("historique_changements").select("id, champ, avant, apres, par_email, created_at")
          .eq("table_name", table).eq("ligne_id", ligneId).order("created_at", { ascending: false }).limit(100);
        if (error) throw error;
        const toutes = [...((data ?? []) as Ligne[])];
        // Un contrat signé n'est pas un changement de statut : on ajoute la signature du crew et la contre-signature de l'employeur à la liste
        toutes.sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : b.id - a.id));
        if (table === "contrats") {
          const { data: c } = await (supabase as any).from("contrats").select("signe_le, signature_nom, employeur_signe_le, employeur_signataire").eq("id", ligneId).maybeSingle();
          if (c?.signe_le) toutes.push({ id: -1, champ: "signature", avant: null, apres: null, par_email: null, created_at: c.signe_le, texte: `Signé par ${c.signature_nom || "le crew"}` });
          if (c?.employeur_signe_le) toutes.push({ id: -2, champ: "signature", avant: null, apres: null, par_email: null, created_at: c.employeur_signe_le, texte: `Contresigné par ${c.employeur_signataire || "l'employeur"}` });
          toutes.sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : b.id - a.id));
        }
        if (!annule) { setLignes(toutes); setErreur(false); }
      } catch { if (!annule) setErreur(true); }
    })();
    return () => { annule = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, ligneId, ouvert]);

  const n = lignes?.length;
  return (
    <section className="ah ah-pleine" data-testid="historique-fiche" ref={racine}>
      <button type="button" className="ah-t" aria-expanded={ouvert} aria-controls={idCorps} onClick={() => {
        const ouvre = !ouvert;
        setOuvert(ouvre);
        // Dans une fenêtre qui défile (iPhone), la liste se déploie sous le bord : on la ramène à l'écran une fois l'animation faite
        if (ouvre) window.setTimeout(() => racine.current?.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }), 280);
      }}>
        <span className="ah-titre"><History className="h-4 w-4" aria-hidden="true" />Historique{typeof n === "number" ? <b>({n})</b> : null}</span>
        <svg className="ah-chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div id={idCorps} className={`ah-corps${ouvert ? " ouvert" : ""}`}>
        <div className="ah-int">
          {erreur ? <p className="ah-note">Historique indisponible pour le moment.</p>
            : lignes === null ? <p className="ah-note">Chargement…</p>
            : lignes.length === 0 ? <p className="ah-vide">Aucun changement pour l'instant.</p>
            : (
              <ol>
                {lignes.slice(0, visibles).map((l) => {
                  // Le bannissement passe par une fonction du serveur : il n'a pas d'adresse, on écrit « Administration » plutôt que « Automatique »
                  const p = l.champ === "banni" && (!l.par_email || l.par_email === "automatique") ? { texte: "Administration", auto: false } : qui(l.par_email, moi);
                  const pre = PREFIXE_PAR_CHAMP[l.champ];
                  return (
                    <li key={l.id}>
                      <div className="ah-l1">
                        {pre && <span className="ah-pre">{pre} · </span>}
                        {l.avant ? <><span className="ah-avant">{lisible(l.champ, l.avant)}</span><span className="ah-fl" aria-hidden="true">→</span><span className="ah-sr"> devenu </span></> : null}
                        {l.texte ? <span className="a-st vert">{l.texte}</span> : <span className={`a-st ${classe(l.champ, l.apres)}`}>{lisible(l.champ, l.apres, true)}</span>}
                      </div>
                      <div className="ah-l2">{quand(l.created_at)}{l.texte ? "" : <> · <span className={p.auto ? "ah-auto" : undefined}>{p.texte}</span></>}</div>
                    </li>
                  );
                })}
              </ol>
            )}
          {lignes && lignes.length > visibles && (
            <button type="button" className="ah-plus" onClick={() => setVisibles((v) => v + PAR_PAGE)}>{lignes.length - visibles === 1 ? "Voir la suivante" : `Voir les ${Math.min(PAR_PAGE, lignes.length - visibles)} suivantes`}</button>
          )}
          {lignes && !erreur && <p className="ah-note">L'historique commence le {DEBUT}.</p>}
        </div>
      </div>
    </section>
  );
}
