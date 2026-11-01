import { useEffect, useMemo, useState, type ReactNode } from "react";
import { aujourdhuiMaroc } from "@/lib/dateMaroc";
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
const partieDate = (d: string, o: Intl.DateTimeFormatOptions) => new Date(d + "T12:00:00").toLocaleDateString("fr-FR", o);
const Fleche = () => <svg className="a-fl shrink-0" width="18" height="12" viewBox="0 0 18 12" aria-hidden><path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>;

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

function Tuile({ titre, valeur, detail, testId, grand }: { titre: string; valeur: string; detail?: string; testId?: string; grand?: boolean }) {
  return (
    <div data-testid={testId} className="min-w-0">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#7A5F1F] leading-snug">{titre}</div>
      <div className={`font-serif tracking-[-0.025em] tabular-nums text-[#141414] mt-1.5 leading-[.95] ${grand ? "text-[52px] sm:text-[60px]" : "text-[36px] sm:text-[40px]"}`}>{valeur}</div>
      {detail && <div className="text-[12.5px] text-[#5A5146] mt-1.5 leading-snug">{detail}</div>}
    </div>
  );
}

/** « 60 000 MAD » → chiffre en grand, unité en petites capitales */
const madGros = (n: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));

/** Tableau de bord de l'activité : demandes, devis, signatures, chiffre d'affaires, événements à venir, choix du jeu. */
export default function TableauDeBord({ demandesMariage, demandesEntreprise, onAller, haut, bas }: {
  demandesMariage: Demande[]; demandesEntreprise: Demande[]; onAller?: (onglet: string) => void; haut?: ReactNode; bas?: ReactNode;
}) {
  const [devis, setDevis] = useState<DevisLigne[]>([]);
  const [bulletinsAValider, setBulletinsAValider] = useState<number | null>(null);
  useEffect(() => {
    supabase.from("fiches_paie").select("id", { count: "exact", head: true }).eq("statut", "en_attente")
      .then(({ count }) => setBulletinsAValider(count ?? 0));
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
    const aujourdhui = aujourdhuiMaroc();
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
  const aujourdhuiMa = aujourdhuiMaroc();
  const dansJours = (jour: string) => Math.round((new Date(jour + "T12:00:00Z").getTime() - new Date(aujourdhuiMa + "T12:00:00Z").getTime()) / 864e5);
  const quand = (jour: string) => { const n = dansJours(jour); return n === 0 ? "Aujourd'hui" : n === 1 ? "Demain" : `Dans ${n} jours`; };
  const nbEntreprise = demandesEntreprise.filter((d) => d.statut === "en_attente").length;
  const nbEvenement = demandesMariage.filter((d) => d.statut === "en_attente").length;
  const aTraiter: { cle: string; nombre: number; libelle: string; onglet: string; urgent?: boolean }[] = [
    { cle: "mariage", nombre: nbEvenement, libelle: nbEvenement > 1 ? "demandes événement à traiter" : "demande événement à traiter", onglet: "mariage" },
    { cle: "entreprise", nombre: nbEntreprise, libelle: nbEntreprise > 1 ? "demandes entreprise à traiter" : "demande entreprise à traiter", onglet: "entreprise" },
    { cle: "sansreponse", nombre: s.sansReponse.length, libelle: s.sansReponse.length > 1 ? "devis sans réponse depuis 5 jours ou plus" : "devis sans réponse depuis 5 jours ou plus", onglet: "devis-rapide", urgent: true },
    { cle: "bulletins", nombre: bulletinsAValider ?? 0, libelle: (bulletinsAValider ?? 0) > 1 ? "bulletins de paie à valider" : "bulletin de paie à valider", onglet: "fiches" },
  ].filter((x) => x.nombre > 0);
  return (
    <div className="space-y-4" data-testid="tableau-de-bord">
      {haut}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-start">
        <section className="a-carte px-[18px] pt-[18px] pb-1.5" data-testid="a-traiter" aria-labelledby="t-a-traiter">
          <p className="a-surtitre">Maintenant</p>
          <h2 id="t-a-traiter" className="font-serif text-[30px] leading-[1.05] tracking-[-0.015em] mt-2.5">À traiter maintenant</h2>
          <ul className="mt-3">
            {aTraiter.length === 0 && <li className="border-t border-[#DCCDAA] py-4 text-[14px] text-[#1F5A4C]" data-testid="rien-a-traiter"><span className="a-st vert">Rien d'urgent : tout est à jour.</span></li>}
            {aTraiter.map((x, i) => (
              <li key={x.cle} className="a-entre border-t border-[#DCCDAA]" style={{ ["--r" as string]: `${0.15 + i * 0.07}s` }}>
                <button onClick={() => onAller?.(x.onglet)} data-testid={`a-traiter-${x.cle}`}
                  className="a-ligne w-full grid grid-cols-[52px_1fr_18px] items-center gap-3 min-h-[72px] py-3 text-left">
                  <span className={`font-serif text-[44px] leading-[.9] tracking-[-0.03em] text-center tabular-nums ${x.urgent ? "text-[#9C4A2C]" : "text-[#141414]"}`}>{x.nombre}</span>
                  <span className="text-[15.5px] leading-snug">{x.libelle}</span>
                  <Fleche />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section data-testid="prochains-evenements" aria-labelledby="t-evts" className="lg:pt-2">
          <h2 id="t-evts" className="a-surtitre">Prochains événements</h2>
          <ul className="mt-2">
            {s.aVenir.length === 0 && <li className="py-4 text-[14px] text-[#5A5146] border-b border-[#DCCDAA]">Aucun événement confirmé à venir.</li>}
            {s.aVenir.slice(0, 5).map((d, i) => {
              const j = d.date_evenement!; const n = dansJours(j);
              return (
                <li key={d.id} className="a-entre grid grid-cols-[62px_1fr] gap-4 py-[18px] border-b border-[#DCCDAA]" style={{ ["--r" as string]: `${0.3 + i * 0.07}s` }}>
                  <div className="relative text-center pt-0.5" title={jourFr(j)}>
                    <small className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#5A5146]">{partieDate(j, { weekday: "short" })}</small>
                    <b className="block font-serif font-normal text-[46px] leading-[.95] tracking-[-0.03em] mt-1">{partieDate(j, { day: "numeric" })}</b>
                    <i className="block not-italic text-[10px] font-medium uppercase tracking-[0.18em] text-[#7A5F1F] mt-1.5">{partieDate(j, { month: "short" })}</i>
                    {n === 0 && <span className="absolute left-3.5 right-3.5 -bottom-2 h-px bg-[#A8933F]" aria-hidden />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#7A5F1F]">{quand(j)}</div>
                    <h3 className="font-serif text-[20px] leading-tight mt-1 break-words">{d.titre || d.client_nom}</h3>
                    <p className="text-[13.5px] text-[#5A5146] mt-0.5 break-words">{d.client_nom}{d.numero ? ` · ${d.numero}` : ""}</p>
                    <span className="a-st vert mt-2">Devis signé</span>
                  </div>
                </li>
              );
            })}
          </ul>
          {onAller && <div className="flex justify-end mt-1"><button onClick={() => onAller("agenda")} className="a-ligne inline-flex items-center gap-2 min-h-11 text-[13.5px] font-medium text-[#7A5F1F] underline decoration-[#7A5F1F]/45 underline-offset-[5px]">Tout l'agenda <Fleche /></button></div>}
        </section>
      </div>
      <MissionsDuJour />
      <section className="a-carte px-[18px] pt-5 pb-[18px] sm:px-6" aria-labelledby="t-mois" data-testid="chiffres-du-mois">
        <h2 id="t-mois" className="a-surtitre first-letter:uppercase">{new Date().toLocaleDateString("fr-FR", { month: "long" })}, à ce jour</h2>
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-5 lg:gap-10 mt-4 items-end">
          <div data-testid="tuile-ca">
            <p className="text-[13px] text-[#5A5146]">Signé ce mois-ci</p>
            <div className="flex items-baseline gap-2.5 mt-1"><b className="font-serif font-normal text-[52px] sm:text-[60px] leading-[.95] tracking-[-0.035em] tabular-nums">{madGros(s.caMois)}</b><span className="text-[12px] font-medium tracking-[0.2em] text-[#7A5F1F]">MAD</span></div>
            <p className="text-[13.5px] text-[#5A5146] mt-1.5">{s.acceptesMois} devis accepté{s.acceptesMois > 1 ? "s" : ""}</p>
          </div>
          <div className="grid grid-cols-[1fr_1px_1fr] lg:grid-cols-[1fr_1px_1fr_1px_1fr] gap-4 pt-[18px] border-t border-[#DCCDAA] lg:border-t-0 lg:pt-0">
            <Tuile testId="tuile-demandes" titre="Demandes ce mois-ci" valeur={String(s.demandesMois)} detail={`${s.demandesPrec} le mois dernier`} />
            <i className="bg-[#DCCDAA]" aria-hidden />
            <Tuile titre="Devis en attente" valeur={String(s.enAttente.length)} detail={s.enAttente.length ? `${mad(s.montantAttente)} TTC en jeu` : "Aucun"} />
            <i className="hidden lg:block bg-[#DCCDAA]" aria-hidden />
            <div className="col-span-3 lg:col-span-1 pt-4 border-t border-[#DCCDAA] lg:border-t-0 lg:pt-0">
              <div className="flex justify-between items-baseline gap-3 text-[13px] text-[#5A5146]"><span>Taux de signature (6 mois)</span><b className="font-serif font-normal text-[22px] text-[#141414]">{s.taux === null ? "—" : `${s.taux} %`}</b></div>
              <div className="relative h-[3px] mt-2.5 bg-[#A8933F]/20" aria-hidden><i className="absolute inset-y-0 left-0 bg-[#A8933F] transition-[width] duration-1000" style={{ width: `${s.taux ?? 0}%` }} /></div>
              <p className="text-[12.5px] text-[#5A5146] mt-1.5">{s.acceptes6} accepté{s.acceptes6 > 1 ? "s" : ""} sur {s.envoyes6} envoyé{s.envoyes6 > 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardContent className="p-4"><Barres testId="graph-demandes" titre="Demandes reçues par mois" donnees={s.courbeDemandes} format={(n) => `${n} demande${n > 1 ? "s" : ""}`} /></CardContent></Card>
        <Card><CardContent className="p-4"><Barres testId="graph-ca" titre="Chiffre d'affaires signé par mois (TTC)" donnees={s.ca} format={mad} /></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            {s.sansReponse.length > 0 && onAller && <button className="text-xs underline text-muted-foreground" onClick={() => onAller("devis-rapide")}>Voir les devis</button>}
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
      {bas}
    </div>
  );
}
