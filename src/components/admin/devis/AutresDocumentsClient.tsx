import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { dateFr, money } from "./devisUtils";
import { libelleStatut } from "@/lib/statuts";

interface Doc { id: string; numero: string; titre: string | null; statut: string; total_ttc: number; devise: string | null; date_evenement: string | null; archive?: boolean; client_telephone?: string | null; parTel?: boolean }
interface Fac { numero: string; type: string; statut: string; total_ttc: number; devis_numero: string | null }

const chiffres = (t: string) => t.replace(/\D/g, "");
const finTel = (t: string) => { const c = chiffres(t); return c.length >= 9 ? c.slice(-9) : ""; };
const COLS = "id, numero, titre, statut, total_ttc, devise, date_evenement, archive, client_telephone";

/**
 * Les autres devis (et leurs factures) de la même personne, retrouvés par son e-mail (même adresse) ou son téléphone (mêmes 9 derniers chiffres).
 * Replié sur une ligne : il informe sans pousser le formulaire. Le titre dit « même e-mail / même téléphone », jamais « ce client » : un couple peut partager une adresse.
 */
export default function AutresDocumentsClient({ devisId, email, telephone, ouvrir }: { devisId?: string | null; email: string; telephone: string; ouvrir: (id: string, dupliquer?: boolean) => void }) {
  const [devis, setDevis] = useState<Doc[] | null>(null);
  const [factures, setFactures] = useState<Fac[]>([]);
  const [erreur, setErreur] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const mail = email.trim().toLowerCase();
  const tel = finTel(telephone);

  useEffect(() => {
    let annule = false;
    const valide = mail.includes("@") || !!tel;
    setDevis(null); setOuvert(false);
    if (!valide) { setDevis([]); setFactures([]); setErreur(false); return; }
    // on attend la fin de la frappe : pas de recherche à chaque lettre
    const minuteur = window.setTimeout(async () => {
      try {
        const trouves = new Map<string, Doc>();
        if (mail.includes("@")) {
          const motif = mail.replace(/[\\%_]/g, "\\$&").replace(/\*/g, "_"); // ilike sans joker = égalité sans tenir compte des majuscules
          let q = (supabase as any).from("devis").select(COLS).ilike("client_email", motif).order("date_emission", { ascending: false }).limit(20);
          if (devisId) q = q.neq("id", devisId);
          const { data, error } = await q; if (error) throw error;
          for (const d of (data ?? []) as Doc[]) trouves.set(d.id, d);
        }
        if (tel) {
          let q = (supabase as any).from("devis").select(COLS).not("client_telephone", "is", null).order("date_emission", { ascending: false }).limit(300);
          if (devisId) q = q.neq("id", devisId);
          const { data, error } = await q; if (error) throw error;
          for (const d of (data ?? []) as Doc[]) if (d.client_telephone && finTel(d.client_telephone) === tel && !trouves.has(d.id)) trouves.set(d.id, { ...d, parTel: true });
        }
        const liste = [...trouves.values()];
        let fac: Fac[] = [];
        if (liste.length) {
          const { data: f } = await (supabase as any).from("factures").select("numero, type, statut, total_ttc, devis_numero").in("devis_numero", liste.map((d) => d.numero));
          fac = (f ?? []) as Fac[];
        }
        if (!annule) { setDevis(liste); setFactures(fac); setErreur(false); }
      } catch { if (!annule) { setErreur(true); setDevis([]); } }
    }, 500);
    return () => { annule = true; window.clearTimeout(minuteur); };
  }, [mail, tel, devisId]);

  if (erreur) return <p className="text-[13px] text-[#5A5146] px-1" role="status" data-testid="autres-documents-erreur">Vérification des autres devis de cette personne impossible pour le moment.</p>;
  if (!devis || devis.length === 0) return null;

  const archives = devis.filter((d) => d.archive), actifs = devis.filter((d) => !d.archive);
  const ordre = [...actifs, ...archives];
  const n = devis.length;
  const classe = (s: string) => (s === "accepte" ? "vert" : s === "refuse" || s === "annule" ? "terre" : "vide");
  const nomFacture = (f: Fac) => `${f.type === "acompte" ? "Acompte" : f.type === "solde" ? "Solde" : "Facture"} ${f.numero}`;

  return (
    <section className="border-t border-[var(--s-filet,#DCCDAA)] pt-3" data-testid="autres-documents-client" aria-label="Autres devis de cette personne">
      <button type="button" onClick={() => setOuvert((o) => !o)} aria-expanded={ouvert} className="w-full min-h-11 flex items-center justify-between gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7A5F1F]" data-testid="autres-documents-bascule">
        <span className="a-devis-date">Déjà {n} devis pour {mail.includes("@") && ordre.some((d) => !d.parTel) ? "cet e-mail" : "ce numéro"}{ordre.some((d) => d.parTel) && ordre.some((d) => !d.parTel) ? " ou ce numéro" : ""}</span>
        <i className="a-chevron" style={{ transform: ouvert ? "rotate(225deg)" : undefined }} aria-hidden="true" />
      </button>
      {ouvert && (
        <div className="grid gap-0" data-testid="autres-documents-liste">
          {ordre.map((d) => {
            const fs = factures.filter((f) => f.devis_numero === d.numero);
            return (
              <div key={d.id} className={`py-3 border-t border-[var(--s-filet,#DCCDAA)] ${d.archive ? "opacity-60" : ""}`} data-testid="autre-devis">
                <button type="button" onClick={() => ouvrir(d.id)} className="w-full min-h-11 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7A5F1F]" >
                  <span className="flex justify-between items-baseline gap-3">
                    <span className="font-serif text-[18px] leading-tight break-words min-w-0">{d.titre || (d.date_evenement ? dateFr(d.date_evenement) : d.numero)}</span>
                    <span className="tabular-nums whitespace-nowrap text-[#7A5F1F]">{money(d.total_ttc, d.devise ?? undefined)}</span>
                  </span>
                  <span className="a-devis-date block mt-1">{d.date_evenement ? dateFr(d.date_evenement) : "Date à définir"} · {d.numero}{d.archive ? " · archivé" : ""}{d.parTel ? " · même téléphone" : ""}</span>
                  <span className={`a-st mt-1 ${classe(d.statut)}`}>{libelleStatut("devis", d.statut)}</span>
                </button>
                {fs.length > 0 && (
                  <ul className="mt-1 ms-3 ps-3 border-s border-[var(--s-filet,#DCCDAA)]">
                    {fs.map((f) => (
                      <li key={f.numero}><span className={`a-st ${f.statut === "payee" ? "vert" : f.statut === "annulee" ? "terre" : "vide"}`}>{nomFacture(f)} · {f.statut === "payee" ? "payée" : f.statut === "annulee" ? "annulée" : "à payer"}</span></li>
                    ))}
                  </ul>
                )}
                <button type="button" className="underline text-[13px] min-h-11 sm:min-h-8" onClick={() => ouvrir(d.id, true)} aria-label={`Reprendre le devis ${d.numero}`} data-testid="reprendre-devis">Reprendre ce devis</button>
              </div>
            );
          })}
          {n >= 20 && <p className="text-[12.5px] text-[#5A5146]">La recherche s'arrête aux devis les plus récents : un ancien devis peut ne pas apparaître ici.</p>}
        </div>
      )}
    </section>
  );
}
