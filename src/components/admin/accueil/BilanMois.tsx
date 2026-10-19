import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Heart, PartyPopper, Printer, Sparkles, Star, Users, Wallet, Inbox, PenLine } from "lucide-react";

/** « Ton mois en chiffres » : un joli bilan mensuel, mis en avant les premiers jours du mois suivant. */
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const mad = (n: number) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n))} MAD`;
const cleMois = (d: Date) => d.toISOString().slice(0, 7);
const decaler = (m: string, n: number) => { const [a, mo] = m.split("-").map(Number); const d = new Date(Date.UTC(a, mo - 1 + n, 1)); return cleMois(d); };
const libelleMois = (m: string) => { const [a, mo] = m.split("-").map(Number); return `${MOIS[mo - 1]} ${a}`; };

interface Chiffres {
  evenements: { titre: string; client: string; date: string }[];
  signes: number; ca: number; demandes: number; crews: number; heures: number;
  note: number | null; nbAvis: number; meilleurAvis: string | null; photo: string | null;
}

async function calculer(m: string): Promise<Chiffres> {
  const debut = `${m}-01`, fin = `${decaler(m, 1)}-01`;
  const [ev, sg, av, dm, de, af, re] = await Promise.all([
    supabase.from("devis").select("titre, client_nom, client_societe, date_evenement").eq("statut", "accepte").gte("date_evenement", debut).lt("date_evenement", fin).order("date_evenement"),
    supabase.from("devis").select("total_ttc").not("signe_le", "is", null).neq("statut", "annule").gte("signe_le", debut).lt("signe_le", fin),
    (supabase as any).from("devis").select("avis_note, avis_commentaire").not("avis_le", "is", null).gte("avis_le", debut).lt("avis_le", fin),
    supabase.from("devis_mariage").select("id", { count: "exact", head: true }).gte("created_at", debut).lt("created_at", fin),
    supabase.from("devis_entreprise").select("id", { count: "exact", head: true }).gte("created_at", debut).lt("created_at", fin),
    supabase.from("affectations").select("staff_id, heures").neq("statut", "annule").gte("date_jour", debut).lt("date_jour", fin),
    supabase.from("realisations").select("photos").gte("date_evenement", debut).lt("date_evenement", fin).limit(5),
  ]);
  const avis = ((av.data ?? []) as any[]).filter((a) => a.avis_note);
  const meilleur = [...avis].sort((a, b) => b.avis_note - a.avis_note).find((a) => a.avis_commentaire?.trim());
  const photos = ((re.data ?? []) as any[]).flatMap((r) => r.photos ?? []);
  return {
    evenements: ((ev.data ?? []) as any[]).map((d) => ({ titre: d.titre || "Événement", client: d.client_societe || d.client_nom, date: d.date_evenement })),
    signes: (sg.data ?? []).length, ca: ((sg.data ?? []) as any[]).reduce((s, d) => s + Number(d.total_ttc || 0), 0),
    demandes: (dm.count ?? 0) + (de.count ?? 0),
    crews: new Set(((af.data ?? []) as any[]).map((a) => a.staff_id)).size,
    heures: ((af.data ?? []) as any[]).reduce((s, a) => s + Number(a.heures || 0), 0),
    note: avis.length ? avis.reduce((s, a) => s + a.avis_note, 0) / avis.length : null, nbAvis: avis.length,
    meilleurAvis: meilleur?.avis_commentaire ?? null, photo: photos[0] ?? null,
  };
}

function phrase(c: Chiffres) {
  if (c.evenements.length >= 5 || c.ca >= 100000) return "Un mois exceptionnel. Prends le temps de le savourer : tu l'as mérité. — Yassin";
  if (c.evenements.length || c.signes) return "Chaque événement de ce mois porte ta signature. Je suis tellement fier de toi. — Yassin";
  return "Les mois calmes préparent les grandes saisons. Le meilleur arrive, j'en suis sûr. — Yassin";
}

export default function BilanMois() {
  const maintenant = new Date();
  const debutDeMois = maintenant.getDate() <= 7;
  const [mois, setMois] = useState(debutDeMois ? decaler(cleMois(maintenant), -1) : cleMois(maintenant));
  const [ouvert, setOuvert] = useState(false);
  const [c, setC] = useState<Chiffres | null>(null);
  useEffect(() => { setC(null); calculer(mois).then(setC).catch(() => setC(null)); }, [mois]);
  const enCours = mois === cleMois(maintenant);
  const resume = useMemo(() => c && `${c.evenements.length} événement${c.evenements.length > 1 ? "s" : ""} · ${mad(c.ca)} signés`, [c]);

  return (
    <>
      <button onClick={() => setOuvert(true)} data-testid="ouvrir-bilan-mois"
        className={`w-full text-left rounded-3xl p-5 border transition hover:shadow-md ${debutDeMois ? "bg-gradient-to-r from-[#141414] to-[#2a2418] text-white border-transparent" : "bg-white border-[#EADFC8]"}`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${debutDeMois ? "text-[#E4D49A]" : "text-[#8C6D22]"}`}>✨ Ton mois en chiffres</div>
            <div className="font-serif text-xl mt-0.5 first-letter:uppercase">{libelleMois(mois)}{enCours ? " (en cours)" : ""}</div>
            <div className={`text-sm ${debutDeMois ? "text-white/70" : "text-muted-foreground"}`}>{resume ?? "Calcul…"}</div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 opacity-60" />
        </div>
      </button>

      <Dialog open={ouvert} onOpenChange={setOuvert}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-[#FBF8F1] max-h-[92vh] overflow-y-auto" data-testid="bilan-mois">
          <DialogTitle className="sr-only">Ton mois en chiffres</DialogTitle>
          <div className="relative bg-[#141414] text-white px-6 sm:px-10 pt-8 pb-10 text-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_0%,#C8B560_0,transparent_45%),radial-gradient(circle_at_90%_100%,#A8933F_0,transparent_40%)]" />
            {c?.photo && <img src={c.photo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
            <div className="relative">
              <div className="flex items-center justify-between print:hidden">
                <button onClick={() => setMois(decaler(mois, -1))} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center" aria-label="Mois précédent"><ChevronLeft className="h-5 w-5" /></button>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#E4D49A]">Heavent People Agency</span>
                <button onClick={() => setMois(decaler(mois, 1))} disabled={enCours} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center disabled:opacity-30" aria-label="Mois suivant"><ChevronRight className="h-5 w-5" /></button>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl mt-4 first-letter:uppercase">{libelleMois(mois)}</h2>
              <p className="text-white/70 mt-1">Ton mois en chiffres{enCours ? " (en cours)" : ""}</p>
            </div>
          </div>
          {!c ? <p className="text-center py-10 text-muted-foreground">Calcul…</p> : (
            <div className="px-6 sm:px-10 py-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Tuile icone={PartyPopper} valeur={String(c.evenements.length)} libelle={`événement${c.evenements.length > 1 ? "s" : ""}`} />
                <Tuile icone={Wallet} valeur={mad(c.ca)} libelle="signés" />
                <Tuile icone={PenLine} valeur={String(c.signes)} libelle={`devis signé${c.signes > 1 ? "s" : ""}`} />
                <Tuile icone={Inbox} valeur={String(c.demandes)} libelle={`demande${c.demandes > 1 ? "s" : ""} reçue${c.demandes > 1 ? "s" : ""}`} />
                <Tuile icone={Users} valeur={String(c.crews)} libelle={`crew${c.crews > 1 ? "s" : ""} · ${Math.round(c.heures)} h`} />
                <Tuile icone={Star} valeur={c.note ? `${c.note.toFixed(1).replace(".", ",")}/5` : "—"} libelle={`${c.nbAvis} avis client${c.nbAvis > 1 ? "s" : ""}`} />
              </div>
              {c.meilleurAvis && (
                <figure className="rounded-2xl bg-white border border-[#EADFC8] p-5">
                  <div className="flex gap-0.5 mb-2">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-[#C8B560] text-[#C8B560]" />)}</div>
                  <blockquote className="font-serif text-lg">« {c.meilleurAvis} »</blockquote>
                  <figcaption className="text-xs text-muted-foreground mt-1">Le plus beau mot d'un client ce mois-ci</figcaption>
                </figure>
              )}
              {c.evenements.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D22] font-semibold mb-2 flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Les événements du mois</h3>
                  <ul className="divide-y divide-[#F1ECDD] rounded-2xl bg-white border border-[#EADFC8]">
                    {c.evenements.map((e, i) => (
                      <li key={i} className="flex justify-between gap-3 px-4 py-2.5 text-sm">
                        <span><b>{e.client}</b> · {e.titre}</span>
                        <span className="text-muted-foreground whitespace-nowrap">{new Date(e.date + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-center font-serif text-lg text-[#5E554A] flex items-center justify-center gap-2"><Heart className="h-4 w-4 text-[#C8B560] fill-[#C8B560] shrink-0" /> {phrase(c)}</p>
              <div className="text-center print:hidden">
                <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] bg-white px-4 min-h-10 text-sm"><Printer className="h-4 w-4" /> Garder ce bilan (PDF)</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Tuile({ icone: Icone, valeur, libelle }: { icone: typeof Heart; valeur: string; libelle: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#EADFC8] px-4 py-3 text-center">
      <Icone className="h-5 w-5 mx-auto text-[#A8933F] mb-1" />
      <div className="font-serif text-2xl leading-tight">{valeur}</div>
      <div className="text-xs text-muted-foreground">{libelle}</div>
    </div>
  );
}
