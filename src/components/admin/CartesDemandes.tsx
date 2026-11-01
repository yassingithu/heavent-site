import { FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Listes de l'admin sur téléphone (< 640 px) : une carte par demande au lieu d'un tableau.
 * Sur ordinateur, Admin.tsx garde les tableaux (« hidden sm:block »).
 */
type Statut = "accepte" | "refuse" | "envoye" | "en_attente";
export interface DemandeCarte {
  id: string; nom: string; prenom: string; email: string; entreprise?: string; telephone?: string;
  date_evenement?: string; date_mariage?: string; nb_personnes?: number; nb_invites?: number; nb_staff?: number;
  lieu?: string; type_evenement?: string; statut?: string; created_at?: string; date_envoi_devis?: string;
  montant_total?: number; configuration?: any;
}

const LIBELLES: Record<string, string> = { en_attente: "À chiffrer", envoye: "Devis envoyé, en attente", accepte: "Accepté", refuse: "Refusé" };
const CLASSE_ST: Record<string, string> = { en_attente: "a-st vide", envoye: "a-st vide", accepte: "a-st vert", refuse: "a-st terre" };
const jours = (iso?: string) => (iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 864e5) : null);
const recu = (iso?: string) => { const n = jours(iso); return n === null ? "" : n <= 0 ? "reçue aujourd'hui" : n === 1 ? "reçue hier" : `reçue il y a ${n} j`; };
const dateCourte = (iso?: string) => (iso ? new Date(iso.length === 10 ? iso + "T12:00:00" : iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }).replace(".", "") : null);
const nombreFr = (n?: number) => (n ? new Intl.NumberFormat("fr-FR").format(n) : null);

function ChoixStatut({ valeur, onChange, avecAttente = true }: { valeur?: string; onChange: (s: Statut) => void; avecAttente?: boolean }) {
  return (
    <Select value={valeur} onValueChange={(v) => onChange(v as Statut)}>
      <SelectTrigger className="h-11 w-auto min-w-[9.5rem] rounded-none border-[#DCCDAA] bg-transparent text-[13px]" aria-label="Changer le statut"><SelectValue /></SelectTrigger>
      <SelectContent>
        {avecAttente && <SelectItem value="en_attente">En attente</SelectItem>}
        <SelectItem value="envoye">Envoyé</SelectItem>
        <SelectItem value="accepte">Accepté</SelectItem>
        <SelectItem value="refuse">Refusé</SelectItem>
      </SelectContent>
    </Select>
  );
}

/** Demandes reçues (entreprise ou événement) : gros bouton « Faire le devis » tant qu'elles sont à chiffrer. */
export function CartesDemandes({ type, demandes, onChiffrer, onOuvrirDevis, onStatut }: {
  type: "entreprise" | "mariage"; demandes: DemandeCarte[];
  onChiffrer: (d: DemandeCarte) => void; onOuvrirDevis: () => void; onStatut?: (id: string, s: Statut) => void;
}) {
  if (!demandes.length) return <p className="sm:hidden text-[14px] text-[#5A5146] py-4">Aucune demande pour l'instant.</p>;
  return (
    <div className="sm:hidden grid gap-[18px]" data-testid={`cartes-${type}`}>
      {demandes.map((d, i) => {
        const aChiffrer = !d.statut || d.statut === "en_attente";
        const vieux = aChiffrer && (jours(d.created_at) ?? 0) >= 3;
        const date = type === "entreprise" ? d.date_evenement : d.date_mariage;
        const nb = type === "entreprise" ? d.nb_personnes : d.nb_invites;
        const titre = type === "entreprise" ? d.entreprise || `${d.prenom} ${d.nom}` : `${d.prenom} ${d.nom}`;
        const qui = type === "entreprise" ? [`${d.prenom} ${d.nom}`, d.email].filter(Boolean).join(" · ") : d.email;
        return (
          <article key={d.id} className="a-carte a-entre px-[18px] pt-[18px] pb-2" style={{ ["--r" as string]: `${0.05 + Math.min(i, 6) * 0.07}s` }} data-testid="carte-demande">
            <div className="flex items-center justify-between gap-2.5">
              <span className={`a-ruban ${vieux ? "terre" : ""}`}><img src="/seuil/mono-or.png" alt="" />{type === "entreprise" ? "Entreprise" : d.type_evenement || "Mariage"}</span>
              <span className={`text-[12.5px] whitespace-nowrap ${vieux ? "text-[#9C4A2C] font-medium" : "text-[#5A5146]"}`}>{recu(d.created_at)}</span>
            </div>
            <h2 className="font-serif text-[28px] leading-[1.08] tracking-[-0.015em] mt-3.5 break-words">{titre}</h2>
            {qui && <p className="text-[13.5px] text-[#5A5146] mt-1 break-all">{qui}</p>}
            <div className="grid grid-cols-[auto_1px_auto_1px_minmax(0,1fr)] gap-3.5 items-end mt-4 py-3.5 border-y border-[#DCCDAA]">
              <div><b className="block font-serif font-normal text-[30px] leading-[.9] tracking-[-0.03em] tabular-nums">{dateCourte(date) ?? "—"}</b><small className="block mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F1F] whitespace-nowrap">Date</small></div>
              <i className="self-stretch bg-[#DCCDAA]" aria-hidden />
              <div><b className="block font-serif font-normal text-[30px] leading-[.9] tracking-[-0.03em] tabular-nums">{nombreFr(nb) ?? "—"}</b><small className="block mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F1F] whitespace-nowrap">{type === "entreprise" ? "Personnes" : "Invités"}</small></div>
              <i className="self-stretch bg-[#DCCDAA]" aria-hidden />
              <div className="min-w-0"><b className="block font-serif font-normal text-[19px] leading-[1.05] break-words">{d.lieu || "—"}</b><small className="block mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#7A5F1F] whitespace-nowrap">Lieu</small></div>
            </div>
            {type === "entreprise" && !!d.nb_staff && <p className="text-[13.5px] mt-3">{d.nb_staff} personne{d.nb_staff > 1 ? "s" : ""} de staff demandée{d.nb_staff > 1 ? "s" : ""}</p>}
            {d.configuration?.elements && <p className="a-st vide !text-[#1F5A4C] mt-2.5">Créé avec le jeu · devis prérempli</p>}
            <div className="mt-3"><span className={CLASSE_ST[d.statut ?? "en_attente"] ?? "a-st"}>{LIBELLES[d.statut ?? "en_attente"] ?? d.statut}</span></div>
            {aChiffrer
              ? <button onClick={() => onChiffrer(d)} className="s-btn s-btn-plein s-sombre a-btn-grand mt-4"><FileText className="h-4 w-4" /> Faire le devis</button>
              : <button onClick={onOuvrirDevis} className="s-btn s-btn-filet a-btn-grand mt-4" style={{ ["--fond" as string]: "#FAF6EC" }}>Ouvrir les devis</button>}
            <div className="flex items-center justify-between gap-3 min-h-12 mt-1">
              {d.telephone ? <a href={`tel:${d.telephone}`} className="text-[13.5px] font-medium text-[#7A5F1F] underline decoration-[#7A5F1F]/45 underline-offset-[5px] py-3">Appeler</a> : <span />}
              {onStatut && <ChoixStatut valeur={d.statut} onChange={(s) => onStatut(d.id, s)} />}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Devis envoyés (réponses des demandes traitées) : statut en losange, facture en gros bouton quand c'est accepté. */
export function CartesDevisSuivis({ type, demandes, onFacture, onStatut }: {
  type: "entreprise" | "mariage"; demandes: DemandeCarte[]; onFacture: (id: string) => void; onStatut: (id: string, s: Statut) => void;
}) {
  if (!demandes.length) return <p className="sm:hidden text-[14px] text-[#5A5146] py-2">Aucun devis pour l'instant.</p>;
  return (
    <div className="sm:hidden grid gap-3.5" data-testid={`cartes-envoyes-${type}`}>
      {demandes.map((d) => (
        <article key={d.id} className="a-carte px-[18px] py-4">
          <div className="flex justify-between items-baseline gap-3">
            <h3 className="font-serif text-[21px] leading-tight break-words min-w-0">{type === "entreprise" ? d.entreprise || `${d.prenom} ${d.nom}` : `${d.prenom} ${d.nom}`}</h3>
            <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-[#5A5146] whitespace-nowrap">{dateCourte(d.date_envoi_devis) ? `envoyé ${dateCourte(d.date_envoi_devis)}` : ""}</span>
          </div>
          <p className="text-[13.5px] text-[#5A5146] mt-0.5">{type === "entreprise" ? `${d.prenom} ${d.nom}` : `${d.type_evenement || "Mariage"}${dateCourte(d.date_mariage) ? ` · ${dateCourte(d.date_mariage)}` : ""}`}</p>
          <div className="flex items-baseline justify-between gap-3 mt-3 pt-3 border-t border-[#DCCDAA]">
            <span className={CLASSE_ST[d.statut ?? ""] ?? "a-st"}>{d.statut === "envoye" ? "Envoyé" : LIBELLES[d.statut ?? ""] ?? d.statut}</span>
            <span className="font-serif text-[22px] tabular-nums whitespace-nowrap">{d.montant_total ? `${nombreFr(d.montant_total)} MAD` : "—"}</span>
          </div>
          {d.statut === "accepte" && <button onClick={() => onFacture(d.id)} className="s-btn s-btn-plein s-sombre a-btn-grand mt-3.5"><FileText className="h-4 w-4" /> Facture</button>}
          <div className="flex justify-end mt-2"><ChoixStatut valeur={d.statut} onChange={(s) => onStatut(d.id, s)} /></div>
        </article>
      ))}
    </div>
  );
}
