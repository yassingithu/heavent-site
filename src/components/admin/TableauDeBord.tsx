import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATALOGUE, TypeElement } from "@/components/jeu-evenement/config";
import MissionsDuJour from "@/components/admin/equipe/MissionsDuJour";

interface Demande { id: string; created_at?: string | null; statut?: string | null; configuration?: any }
interface DevisLigne {
  id: string; numero: string | null; client_nom: string; titre: string | null; statut: string; total_ttc: number;
  date_emission: string; date_envoi: string | null; signe_le: string | null; date_evenement: string | null; relances: number | null;
}

const OR = "#A8933F";
const mois = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
const nomMois = (cle: string) => new Date(cle + "-15").toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
const mad = (n: number) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n))} MAD`;
const jourFr = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" });

/** Barres verticales d'une seule série, avec infobulle au survol (et au toucher). */
function Barres({ titre, donnees, format, testId }: { titre: string; donnees: { cle: string; valeur: number }[]; format: (n: number) => string; testId: string }) {
  const [survol, setSurvol] = useState<number | null>(null);
  const max = Math.max(1, ...donnees.map((d) => d.valeur));
  return (
    <figure className="space-y-2" data-testid={testId}>
      <figcaption className="text-sm font-medium">{titre}</figcaption>
      <div className="relative h-40 flex items-end gap-2 border-b border-border" role="img"
        aria-label={`${titre} : ${donnees.map((d) => `${nomMois(d.cle)} ${format(d.valeur)}`).join(", ")}`}>
        {[0.5, 1].map((f) => <div key={f} className="absolute inset-x-0 border-t border-dashed border-border/70" style={{ bottom: `${f * 100}%` }} aria-hidden />)}
        {donnees.map((d, i) => (
          <button key={d.cle} type="button" className="relative flex-1 h-full flex items-end justify-center focus-visible:outline-none group"
            onMouseEnter={() => setSurvol(i)} onMouseLeave={() => setSurvol(null)} onFocus={() => setSurvol(i)} onBlur={() => setSurvol(null)} onClick={() => setSurvol(i)}
            aria-label={`${nomMois(d.cle)} : ${format(d.valeur)}`}>
            <div className="w-full max-w-[38px] rounded-t-[4px] transition-opacity" style={{ height: `${(d.valeur / max) * 100}%`, minHeight: d.valeur ? 3 : 0, background: OR, opacity: survol === null || survol === i ? 1 : 0.45 }} />
            {survol === i && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background text-xs px-2 py-1 shadow z-10">
                {nomMois(d.cle)} · <b>{format(d.valeur)}</b>
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="flex gap-2 text-[11px] text-muted-foreground">
        {donnees.map((d) => <div key={d.cle} className="flex-1 text-center capitalize">{nomMois(d.cle)}</div>)}
      </div>
    </figure>
  );
}

function Tuile({ titre, valeur, detail, testId }: { titre: string; valeur: string; detail?: string; testId?: string }) {
  return (
    <Card data-testid={testId}>
      <CardContent className="p-4">
        <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D22]">{titre}</div>
        <div className="font-serif text-3xl mt-1 text-[#141414]">{valeur}</div>
        {detail && <div className="text-xs text-muted-foreground mt-0.5">{detail}</div>}
      </CardContent>
    </Card>
  );
}

/** Tableau de bord de l'activité : demandes, devis, signatures, chiffre d'affaires, événements à venir, choix du jeu. */
export default function TableauDeBord({ demandesMariage, demandesEntreprise, onOuvrirDevis }: {
  demandesMariage: Demande[]; demandesEntreprise: Demande[]; onOuvrirDevis?: () => void;
}) {
  const [devis, setDevis] = useState<DevisLigne[]>([]);
  useEffect(() => {
    supabase.from("devis").select("id, numero, client_nom, titre, statut, total_ttc, date_emission, date_envoi, signe_le, date_evenement, relances")
      .order("date_emission", { ascending: false })
      .then(({ data }) => setDevis((data ?? []) as any));
  }, []);

  const s = useMemo(() => {
    const now = new Date();
    const cles = Array.from({ length: 6 }, (_, i) => mois(new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)));
    const ceMois = cles[5], moisPrec = cles[4];
    const demandes = [...demandesMariage, ...demandesEntreprise];
    const parMois = (dates: (string | null | undefined)[]) => cles.map((cle) => ({ cle, valeur: dates.filter((d) => d && d.slice(0, 7) === cle).length }));
    const acceptes = devis.filter((d) => d.statut === "accepte");
    const dateAccord = (d: DevisLigne) => d.signe_le ?? d.date_envoi ?? d.date_emission;
    const ca = cles.map((cle) => ({ cle, valeur: acceptes.filter((d) => dateAccord(d)?.slice(0, 7) === cle).reduce((t, d) => t + Number(d.total_ttc || 0), 0) }));
    const envoyes6 = devis.filter((d) => d.date_envoi && d.date_envoi.slice(0, 7) >= cles[0]);
    const acceptes6 = envoyes6.filter((d) => d.statut === "accepte");
    const enAttente = devis.filter((d) => d.statut === "envoye" && !d.signe_le);
    const aujourdhui = now.toISOString().slice(0, 10);
    const aVenir = acceptes.filter((d) => d.date_evenement && d.date_evenement >= aujourdhui).sort((a, b) => a.date_evenement!.localeCompare(b.date_evenement!));
    const sansReponse = enAttente.filter((d) => d.date_envoi && (now.getTime() - new Date(d.date_envoi).getTime()) / 864e5 >= 5)
      .sort((a, b) => (a.date_envoi ?? "").localeCompare(b.date_envoi ?? ""));
    // Jeu : ce que les visiteurs choisissent
    const jeu = demandesMariage.filter((d) => d.configuration?.elements);
    const choix = new Map<string, number>();
    jeu.forEach((d) => Object.keys(d.configuration.elements).forEach((t) => choix.set(t, (choix.get(t) ?? 0) + 1)));
    const top = [...choix.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
      .map(([t, n]) => ({ nom: CATALOGUE.find((c) => c.id === (t as TypeElement))?.nom ?? t, n }));
    return {
      demandesMois: demandes.filter((d) => d.created_at?.slice(0, 7) === ceMois).length,
      demandesPrec: demandes.filter((d) => d.created_at?.slice(0, 7) === moisPrec).length,
      courbeDemandes: parMois(demandes.map((d) => d.created_at)),
      ca, caMois: ca[5].valeur, acceptesMois: acceptes.filter((d) => dateAccord(d)?.slice(0, 7) === ceMois).length,
      enAttente, montantAttente: enAttente.reduce((t, d) => t + Number(d.total_ttc || 0), 0),
      taux: envoyes6.length ? Math.round((acceptes6.length / envoyes6.length) * 100) : null, envoyes6: envoyes6.length, acceptes6: acceptes6.length,
      aVenir, sansReponse, jeu: jeu.length, top,
    };
  }, [devis, demandesMariage, demandesEntreprise]);

  const maxTop = Math.max(1, ...s.top.map((t) => t.n));
  return (
    <div className="space-y-4" data-testid="tableau-de-bord">
      <MissionsDuJour />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tuile testId="tuile-demandes" titre="Demandes ce mois-ci" valeur={String(s.demandesMois)} detail={`${s.demandesPrec} le mois dernier`} />
        <Tuile titre="Devis en attente de réponse" valeur={String(s.enAttente.length)} detail={s.enAttente.length ? `${mad(s.montantAttente)} TTC en jeu` : "Aucun"} />
        <Tuile testId="tuile-ca" titre="Signé ce mois-ci" valeur={mad(s.caMois)} detail={`${s.acceptesMois} devis accepté${s.acceptesMois > 1 ? "s" : ""}`} />
        <Tuile titre="Taux de signature (6 mois)" valeur={s.taux === null ? "—" : `${s.taux} %`} detail={`${s.acceptes6} accepté${s.acceptes6 > 1 ? "s" : ""} sur ${s.envoyes6} envoyé${s.envoyes6 > 1 ? "s" : ""}`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card><CardContent className="p-4"><Barres testId="graph-demandes" titre="Demandes reçues par mois" donnees={s.courbeDemandes} format={(n) => `${n} demande${n > 1 ? "s" : ""}`} /></CardContent></Card>
        <Card><CardContent className="p-4"><Barres testId="graph-ca" titre="Chiffre d'affaires signé par mois (TTC)" donnees={s.ca} format={mad} /></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="font-serif text-lg font-normal">Prochains événements confirmés</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {s.aVenir.length === 0 && <p className="text-muted-foreground">Aucun événement confirmé à venir.</p>}
            {s.aVenir.slice(0, 6).map((d) => (
              <div key={d.id} className="flex justify-between gap-3 border-b last:border-0 pb-2">
                <div className="min-w-0"><div className="font-medium truncate">{d.titre || d.client_nom}</div><div className="text-xs text-muted-foreground">{d.client_nom} · {d.numero}</div></div>
                <div className="text-right text-xs whitespace-nowrap"><div className="capitalize">{jourFr(d.date_evenement!)}</div><div className="text-muted-foreground">{mad(d.total_ttc)}</div></div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="font-serif text-lg font-normal">Devis sans réponse depuis 5 jours ou plus</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {s.sansReponse.length === 0 && <p className="text-muted-foreground">Tous les clients ont répondu ou ont été relancés récemment.</p>}
            {s.sansReponse.slice(0, 6).map((d) => (
              <div key={d.id} className="flex justify-between gap-3 border-b last:border-0 pb-2">
                <div className="min-w-0"><div className="font-medium truncate">{d.client_nom}</div><div className="text-xs text-muted-foreground">{d.numero} · envoyé le {new Date(d.date_envoi!).toLocaleDateString("fr-FR")}</div></div>
                <div className="text-right text-xs whitespace-nowrap"><div>{mad(d.total_ttc)}</div><div className="text-muted-foreground">{d.relances ? `${d.relances} relance${d.relances > 1 ? "s" : ""} auto` : "relance auto prévue"}</div></div>
              </div>
            ))}
            {s.sansReponse.length > 0 && onOuvrirDevis && <button className="text-xs underline text-muted-foreground" onClick={onOuvrirDevis}>Voir les devis</button>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="font-serif text-lg font-normal">Choix des visiteurs dans le jeu</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm" data-testid="choix-jeu">
            <p className="text-xs text-muted-foreground">{s.jeu} demande{s.jeu > 1 ? "s" : ""} envoyée{s.jeu > 1 ? "s" : ""} depuis « Crée ton événement ».</p>
            {s.top.map((t) => (
              <div key={t.nom} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-2" title={`${t.nom} : ${t.n} demande${t.n > 1 ? "s" : ""}`}>
                <span className="truncate text-xs">{t.nom}</span>
                <div className="h-2.5 rounded-r-[4px]" style={{ width: `${(t.n / maxTop) * 100}%`, background: OR }} />
                <span className="text-xs tabular-nums text-muted-foreground">{t.n}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
