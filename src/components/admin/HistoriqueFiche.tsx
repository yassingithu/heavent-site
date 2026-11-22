import { useEffect, useId, useState } from "react";
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
interface Ligne { id: number; champ: string; avant: string | null; apres: string | null; par_email: string | null; created_at: string }

const DOMAINE_PAR_CHAMP: Record<string, DomaineStatut> = { statut: "contrat", statut_candidature: "candidature", banni: "acces" };
const PREFIXE_PAR_CHAMP: Record<string, string> = { statut_candidature: "Candidature", banni: "Accès" };
const lisible = (champ: string, cle: string | null) => libelleStatut(DOMAINE_PAR_CHAMP[champ] ?? "contrat", cle);
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
        if (!annule) { setLignes((data ?? []) as Ligne[]); setErreur(false); }
      } catch { if (!annule) setErreur(true); }
    })();
    return () => { annule = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, ligneId, ouvert]);

  const n = lignes?.length;
  return (
    <section className="ah" data-testid="historique-fiche">
      <button type="button" className="ah-t" aria-expanded={ouvert} aria-controls={idCorps} onClick={() => setOuvert((o) => !o)}>
        <span>Historique{typeof n === "number" ? <b>({n})</b> : null}</span>
        <svg className="ah-chev" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div id={idCorps} className={`ah-corps${ouvert ? " ouvert" : ""}`}>
        <div className="ah-int">
          {erreur ? <p className="ah-note">Historique indisponible pour le moment.</p>
            : lignes === null ? <p className="ah-note">Chargement…</p>
            : lignes.length === 0 ? <p className="ah-vide">Aucun changement enregistré pour {nom}.</p>
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
                        <span className={`a-st ${classe(l.champ, l.apres)}`}>{lisible(l.champ, l.apres)}</span>
                      </div>
                      <div className="ah-l2">{quand(l.created_at)} · <span className={p.auto ? "ah-auto" : undefined}>{p.texte}</span></div>
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
