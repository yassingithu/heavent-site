import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Confettis } from "@/components/inscription/ParcoursInscription";
import { CalendarDays, Heart, Inbox, PartyPopper, Sparkles, Trophy, X } from "lucide-react";

/**
 * Attentions personnelles de l'administration : surprise de bienvenue (une seule fois), accueil au prénom
 * avec le mot du jour de Yassin, résumé de la journée, célébration des signatures et des records.
 */
export interface InfosAccueil {
  prenom: string | null;
  mot: string | null;
  surprise: { titre: string; texte: string; signature: string } | null;
  signatures_vues_jusqu_au: string | null;
  records_vus: string[];
}
interface DevisMini { id: string; numero: string | null; client_nom: string; client_societe: string | null; total_ttc: number; statut: string; signe_le: string | null; date_evenement: string | null; titre: string | null }

const mad = (n: number) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n))} MAD`;
const aujourdhui = () => new Date().toISOString().slice(0, 10);
const marquer = (quoi: string) => (supabase as any).rpc("accueil_marquer", { p_quoi: quoi });

export function useAccueil() {
  const [infos, setInfos] = useState<InfosAccueil | null>(null);
  const charger = useCallback(() => {
    (supabase as any).rpc("mon_accueil").then(({ data }: any) => setInfos(data ?? { prenom: null, mot: null, surprise: null, signatures_vues_jusqu_au: null, records_vus: [] }));
  }, []);
  useEffect(() => { charger(); }, [charger]);
  return { infos, recharger: charger };
}

/** Police manuscrite de la signature de Yassin */
function chargerPolice() {
  if (typeof document === "undefined" || document.getElementById("police-signature")) return;
  const l = document.createElement("link");
  l.id = "police-signature"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap";
  document.head.appendChild(l);
}

/* ---------------- Surprise de bienvenue ---------------- */
export function SurpriseBienvenue({ surprise, prenom, onFermer }: { surprise: NonNullable<InfosAccueil["surprise"]>; prenom: string; onFermer: () => void }) {
  const [etape, setEtape] = useState(0); // 0 : enveloppe, 1 : lettre, 2 : merci
  const paragraphes = surprise.texte.split(/\n\s*\n/);
  useEffect(chargerPolice, []);
  const fermer = async () => { setEtape(2); await marquer("surprise"); setTimeout(onFermer, 3800); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0d0b08]/95 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-label={surprise.titre} data-testid="surprise-bienvenue">
      <style>{`
        @keyframes surprise-apparition { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes surprise-battement { 0%,100% { transform: scale(1) } 50% { transform: scale(1.12) } }
        @keyframes surprise-scintille { 0%,100% { opacity: .15 } 50% { opacity: .9 } }
        .surprise-ligne { opacity: 0; animation: surprise-apparition .9s ease-out forwards }
      `}</style>
      {/* Étoiles dorées */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 40 }, (_, i) => (
          <span key={i} className="absolute rounded-full bg-[#E4D49A]" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, width: 2 + (i % 3), height: 2 + (i % 3), animation: `surprise-scintille ${2 + (i % 5)}s ${(i % 7) * 0.4}s infinite` }} />
        ))}
      </div>

      {etape === 0 && (
        <button onClick={() => setEtape(1)} className="relative text-center space-y-6 focus:outline-none group" data-testid="ouvrir-surprise">
          <Heart className="h-16 w-16 mx-auto text-[#C8B560] fill-[#C8B560]" style={{ animation: "surprise-battement 1.6s infinite" }} />
          <p className="font-serif text-3xl sm:text-5xl text-[#FAF7EE] surprise-ligne">{prenom}…</p>
          <p className="text-[#E4D49A] surprise-ligne" style={{ animationDelay: ".8s" }}>Quelqu'un a laissé quelque chose pour toi.</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C8B560]/60 text-[#FAF7EE] px-6 min-h-12 group-hover:bg-[#C8B560]/15 transition surprise-ligne" style={{ animationDelay: "1.6s" }}>
            <Sparkles className="h-4 w-4 text-[#E4D49A]" /> Ouvrir
          </span>
        </button>
      )}

      {etape === 1 && (
        <article className="relative w-full max-w-xl rounded-[2rem] bg-[#FBF8F1] text-[#2A2420] px-7 sm:px-12 py-10 shadow-[0_40px_120px_-30px_rgba(200,181,96,0.6)] my-auto">
          <Heart className="h-7 w-7 mx-auto text-[#C8B560] fill-[#C8B560] mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl text-center mb-6 surprise-ligne">{surprise.titre}</h2>
          <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-[#3d362d]">
            {paragraphes.map((p, i) => (
              <p key={i} className="surprise-ligne whitespace-pre-line" style={{ animationDelay: `${0.6 + i * 1.1}s` }}>{p}</p>
            ))}
          </div>
          <p className="text-right text-4xl sm:text-5xl text-[#8C6D22] mt-6 surprise-ligne" style={{ fontFamily: "'Great Vibes', cursive", animationDelay: `${0.6 + paragraphes.length * 1.1}s` }}>{surprise.signature}</p>
          <div className="text-center mt-8 surprise-ligne" style={{ animationDelay: `${1.2 + paragraphes.length * 1.1}s` }}>
            <button onClick={fermer} className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-7 min-h-12 font-medium hover:bg-[#2a2a2a]" data-testid="fermer-surprise">
              <Heart className="h-4 w-4 fill-[#E4D49A] text-[#E4D49A]" /> Merci, mon cœur
            </button>
          </div>
        </article>
      )}

      {etape === 2 && (
        <div className="relative text-center space-y-4">
          <Confettis />
          <Heart className="h-20 w-20 mx-auto text-[#C8B560] fill-[#C8B560]" style={{ animation: "surprise-battement 1s infinite" }} />
          <p className="font-serif text-3xl text-[#FAF7EE] surprise-ligne">Ton espace t'attend.</p>
          <p className="text-[#E4D49A] surprise-ligne" style={{ animationDelay: ".5s" }}>Un nouveau mot t'y attendra chaque jour.</p>
        </div>
      )}

      {etape < 2 && (
        <button onClick={fermer} className="absolute top-4 right-4 h-10 w-10 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center" aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

/* ---------------- Accueil au prénom + mot du jour + résumé ---------------- */
export function CarteAccueil({ infos, nouvellesDemandes }: { infos: InfosAccueil; nouvellesDemandes: number }) {
  const [jour, setJour] = useState<{ rdv: number; evenements: { titre: string; client: string }[]; semaine: number } | null>(null);
  useEffect(chargerPolice, []);
  useEffect(() => {
    const j = aujourdhui();
    const dans7 = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
    Promise.all([
      (supabase as any).from("rendez_vous").select("id", { count: "exact", head: true }).eq("statut", "confirme").gte("debut", `${j}T00:00:00Z`).lte("debut", `${j}T23:59:59Z`),
      supabase.from("devis").select("titre, client_nom, client_societe, date_evenement").eq("statut", "accepte").gte("date_evenement", j).lte("date_evenement", dans7),
    ]).then(([r, d]: any[]) => {
      const ev = (d.data ?? []) as any[];
      setJour({ rdv: r.count ?? 0, evenements: ev.filter((x) => x.date_evenement === j).map((x) => ({ titre: x.titre || "Événement", client: x.client_societe || x.client_nom })), semaine: ev.length });
    });
  }, []);
  const h = new Date().getHours();
  const salut = h < 5 ? "Douce nuit" : h < 12 ? "Bonjour" : h < 18 ? "Bel après-midi" : "Bonsoir";
  const emoji = h < 5 ? "🌙" : h < 12 ? "☀️" : h < 18 ? "🌤️" : "🌙";
  const dateLongue = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#141414] text-white p-6 sm:p-8" data-testid="carte-accueil">
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_0%_0%,#C8B560_0,transparent_45%),radial-gradient(circle_at_100%_100%,#A8933F_0,transparent_40%)]" />
      <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#E4D49A] first-letter:uppercase">{dateLongue}</p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-1">{salut} {infos.prenom} {emoji}</h2>
          </div>
          {infos.mot && (
            <figure className="rounded-2xl bg-white/[0.07] border border-white/10 p-5" data-testid="mot-du-jour">
              <Heart className="h-4 w-4 text-[#E4D49A] fill-[#E4D49A] mb-2" />
              <blockquote className="font-serif text-lg sm:text-xl leading-snug text-[#FAF7EE]">{infos.mot}</blockquote>
              <figcaption className="text-right text-2xl text-[#E4D49A] mt-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Yassin</figcaption>
            </figure>
          )}
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
          <Resume icone={CalendarDays} valeur={jour ? String(jour.rdv) : "…"} libelle="rendez-vous aujourd'hui" />
          <Resume icone={PartyPopper} valeur={jour ? String(jour.evenements.length || jour.semaine) : "…"}
            libelle={jour ? (jour.evenements.length ? `événement${jour.evenements.length > 1 ? "s" : ""} aujourd'hui` : `événement${jour.semaine > 1 ? "s" : ""} dans les 7 jours`) : ""}
            detail={jour?.evenements.map((e) => e.client).join(", ")} />
          <Resume icone={Inbox} valeur={String(nouvellesDemandes)} libelle={nouvellesDemandes > 1 ? "nouvelles demandes" : "nouvelle demande"} />
        </div>
      </div>
    </section>
  );
}
function Resume({ icone: Icone, valeur, libelle, detail }: { icone: typeof Heart; valeur: string; libelle: string; detail?: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.07] border border-white/10 px-3 py-2.5 lg:flex lg:items-center lg:gap-3">
      <Icone className="h-4 w-4 text-[#E4D49A] mb-1 lg:mb-0 shrink-0" />
      <div className="min-w-0">
        <div className="font-serif text-2xl leading-none">{valeur}</div>
        <div className="text-[11px] sm:text-xs text-white/60 leading-tight mt-1">{libelle}</div>
        {detail && <div className="text-[11px] text-white/50 truncate mt-0.5">{detail}</div>}
      </div>
    </div>
  );
}

/* ---------------- Célébrations : signatures et records ---------------- */
const PALIERS = [1, 10, 25, 50, 100, 200, 300, 500, 1000];

export function Celebrations({ infos, onVu }: { infos: InfosAccueil; onVu: () => void }) {
  const [devis, setDevis] = useState<DevisMini[] | null>(null);
  const [ferme, setFerme] = useState(false);
  const [depuis, setDepuis] = useState(infos.signatures_vues_jusqu_au);

  const charger = useCallback(() => {
    supabase.from("devis").select("id, numero, client_nom, client_societe, total_ttc, statut, signe_le, date_evenement, titre").in("statut", ["accepte"]).then(({ data }) => setDevis((data ?? []) as DevisMini[]));
  }, []);
  useEffect(() => { charger(); const t = window.setInterval(charger, 60_000); return () => window.clearInterval(t); }, [charger]);

  const { nouvelles, record } = useMemo(() => {
    if (!devis) return { nouvelles: [] as DevisMini[], record: null as null | { cle: string; titre: string; texte: string } };
    const nouvelles = devis.filter((d) => d.signe_le && depuis && d.signe_le > depuis).sort((a, b) => (a.signe_le! < b.signe_le! ? 1 : -1));
    const vus = new Set(infos.records_vus ?? []);
    // Palier de devis acceptés
    const n = devis.length;
    const palier = [...PALIERS].reverse().find((p) => n >= p);
    let record: null | { cle: string; titre: string; texte: string } = null;
    if (palier && !vus.has(`acceptes:${palier}`) && palier > 1) {
      record = { cle: `acceptes:${palier}`, titre: `${palier} événements signés !`, texte: palier >= 100 ? "Un cap immense. Heavent est devenue grande, grâce à toi." : "Chaque client qui te fait confiance est une victoire. Et ça commence à en faire beaucoup." };
    }
    // Meilleur mois jamais réalisé (chiffre signé)
    const parMois = new Map<string, number>();
    devis.forEach((d) => { if (d.signe_le) { const m = d.signe_le.slice(0, 7); parMois.set(m, (parMois.get(m) ?? 0) + Number(d.total_ttc || 0)); } });
    const ce = new Date().toISOString().slice(0, 7);
    const actuel = parMois.get(ce) ?? 0;
    const precedents = [...parMois].filter(([m]) => m < ce).map(([, v]) => v);
    if (!record && precedents.length >= 1 && actuel > Math.max(...precedents) && !vus.has(`meilleur-mois:${ce}`)) {
      record = { cle: `meilleur-mois:${ce}`, titre: "Meilleur mois jamais réalisé !", texte: `${mad(actuel)} signés ce mois-ci : tu viens de battre ton propre record.` };
    }
    return { nouvelles, record };
  }, [devis, depuis, infos.records_vus]);

  if (ferme || (!nouvelles.length && !record)) return null;
  const vu = async () => {
    setFerme(true);
    if (nouvelles.length) { await marquer("signatures"); setDepuis(new Date().toISOString()); }
    if (record) await marquer(`record:${record.cle}`);
    onVu();
  };
  const total = nouvelles.reduce((s, d) => s + Number(d.total_ttc || 0), 0);
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-[#C8B560] bg-gradient-to-br from-[#FFF8E6] to-white p-5 sm:p-6" data-testid="celebration">
      <Confettis />
      <button onClick={vu} className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-black/5 flex items-center justify-center" aria-label="Fermer"><X className="h-4 w-4" /></button>
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-[#141414] flex items-center justify-center">
          {nouvelles.length ? <PartyPopper className="h-6 w-6 text-[#E4D49A]" /> : <Trophy className="h-6 w-6 text-[#E4D49A]" />}
        </div>
        <div className="space-y-1">
          {nouvelles.length > 0 && (
            <>
              <h3 className="font-serif text-2xl">{nouvelles.length === 1 ? `${nouvelles[0].client_societe || nouvelles[0].client_nom} a signé ! 🎉` : `${nouvelles.length} devis signés depuis ta dernière visite ! 🎉`}</h3>
              <p className="text-sm text-[#5E554A]">
                {nouvelles.length === 1 ? `${nouvelles[0].titre || "Devis " + (nouvelles[0].numero ?? "")} · ${mad(nouvelles[0].total_ttc)}` : `${nouvelles.map((d) => d.client_societe || d.client_nom).join(", ")} · ${mad(total)} au total`}
              </p>
            </>
          )}
          {record && (
            <div className={nouvelles.length ? "pt-2" : ""}>
              <h3 className="font-serif text-xl flex items-center gap-2"><Trophy className="h-5 w-5 text-[#A8933F]" /> {record.titre}</h3>
              <p className="text-sm text-[#5E554A]">{record.texte}</p>
            </div>
          )}
          <button onClick={vu} className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-4 min-h-9 text-sm">Bravo à moi 💛</button>
        </div>
      </div>
    </section>
  );
}
