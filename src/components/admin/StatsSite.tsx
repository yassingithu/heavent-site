import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGES_LOCALES } from "@/lib/pagesLocales";
import { ArrowDownRight, ArrowUpRight, Eye, Laptop, Loader2, MousePointerClick, Send, Smartphone, Users } from "lucide-react";

type Ligne = { cle: string; valeur: number };
interface Stats {
  visites: number; pages_vues: number; demandes: number; clics_contact: number;
  avant: { visites: number; pages_vues: number; demandes: number; clics_contact: number };
  par_jour: { jour: string; visites: number }[];
  pages: Ligne[]; sources: Ligne[]; clics: Ligne[]; demandes_detail: Ligne[]; appareils: Ligne[];
}

const OR = "#A8933F";
const nf = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

const NOMS_PAGES: Record<string, string> = {
  "/": "Accueil", "/devis-entreprise": "Devis entreprise", "/devis-mariage": "Devis mariage / événement", "/cree-ton-evenement": "Jeu « Crée ton événement »",
  "/contact": "Contact", "/a-propos": "À propos", "/realisations": "Réalisations", "/inscription-staff": "Recrutement crews",
  "/mentions-legales": "Mentions légales", "/politique-confidentialite": "Confidentialité",
  ...Object.fromEntries(PAGES_LOCALES.map((p) => [p.chemin, p.type === "ville" ? `Hôtesses à ${p.nomCourt}` : p.nomCourt])),
};
const NOMS_SOURCES: Record<string, string> = {
  direct: "Accès direct / favoris", google: "Google (recherche)", "google-ads": "Google Ads (publicité)", instagram: "Instagram", facebook: "Facebook",
  whatsapp: "WhatsApp", tiktok: "TikTok", linkedin: "LinkedIn", "autre moteur": "Autres moteurs de recherche",
};
const NOMS_CLICS: Record<string, string> = {
  whatsapp: "WhatsApp", telephone: "Appel téléphonique", email: "E-mail", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok",
  "bouton devis entreprise": "Vers le devis entreprise", "bouton devis mariage": "Vers le devis mariage", "bouton jeu": "Vers le jeu", "bouton recrutement": "Vers le recrutement",
};
const NOMS_DEMANDES: Record<string, string> = {
  "devis-entreprise": "Devis entreprise", "devis-mariage": "Devis mariage / événement", jeu: "Jeu « Crée ton événement »", contact: "Message (Contact)", "rendez-vous": "Rendez-vous réservé",
};

export default function StatsSite() {
  const [jours, setJours] = useState(30);
  const [s, setS] = useState<Stats | null>(null);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    let ok = true; setS(null); setErreur(false);
    (supabase as any).rpc("statistiques_site", { p_jours: jours }).then(({ data, error }: any) => { if (!ok) return; if (error || !data) setErreur(true); else setS(data); });
    return () => { ok = false; };
  }, [jours]);

  const conversion = s && s.visites ? (s.demandes / s.visites) * 100 : null;
  const conversionAvant = s && s.avant.visites ? (s.avant.demandes / s.avant.visites) * 100 : null;

  return (
    <Card data-testid="stats-site">
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0 gap-3 flex-wrap">
        <div>
          <CardTitle className="font-serif text-lg font-normal">Fréquentation du site</CardTitle>
          <p className="text-xs text-muted-foreground">Sans cookie · vos propres visites ne sont pas comptées</p>
        </div>
        <div className="flex rounded-full border border-[#EADFC8] p-0.5 text-xs" role="group" aria-label="Période">
          {[[7, "7 jours"], [30, "30 jours"], [90, "3 mois"], [365, "12 mois"]].map(([n, l]) => (
            <button key={n} onClick={() => setJours(n as number)} aria-pressed={jours === n}
              className={`rounded-full px-3 py-1.5 ${jours === n ? "bg-[#141414] text-white" : "hover:bg-[#FAF7EE]"}`}>{l}</button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {erreur ? <p className="text-sm text-muted-foreground">Statistiques indisponibles pour le moment.</p>
        : !s ? <div className="flex justify-center py-10 text-[#8C6D22]"><Loader2 className="h-5 w-5 animate-spin" /></div>
        : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Chiffre icone={Users} titre="Visites" valeur={nf(s.visites)} actuel={s.visites} avant={s.avant.visites} testId="stat-visites" />
              <Chiffre icone={Eye} titre="Pages vues" valeur={nf(s.pages_vues)} actuel={s.pages_vues} avant={s.avant.pages_vues} detail={s.visites ? `${(s.pages_vues / s.visites).toFixed(1).replace(".", ",")} par visite` : undefined} />
              <Chiffre icone={MousePointerClick} titre="Contacts directs" valeur={nf(s.clics_contact)} actuel={s.clics_contact} avant={s.avant.clics_contact} detail="WhatsApp, appel, e-mail" />
              <Chiffre icone={Send} titre="Demandes envoyées" valeur={nf(s.demandes)} actuel={s.demandes} avant={s.avant.demandes}
                detail={conversion === null ? undefined : `${conversion.toFixed(1).replace(".", ",")} % des visites${conversionAvant !== null ? ` (avant : ${conversionAvant.toFixed(1).replace(".", ",")} %)` : ""}`} testId="stat-demandes" />
            </div>

            <Courbe donnees={s.par_jour} />

            <div className="grid md:grid-cols-2 gap-5">
              <Liste titre="D'où viennent les visiteurs" lignes={s.sources} noms={NOMS_SOURCES} unite="visite" testId="stats-sources" />
              <Liste titre="Pages les plus vues" lignes={s.pages} noms={NOMS_PAGES} unite="vue" testId="stats-pages" />
              <Liste titre="Clics importants" lignes={s.clics} noms={NOMS_CLICS} unite="clic" testId="stats-clics" vide="Aucun clic sur WhatsApp, téléphone ou les boutons de devis pour l'instant." />
              <div className="space-y-5">
                <Liste titre="Demandes envoyées depuis le site" lignes={s.demandes_detail} noms={NOMS_DEMANDES} unite="demande" vide="Aucune demande sur la période." />
                {s.appareils.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Appareils</div>
                    <div className="flex h-3 rounded-full overflow-hidden bg-[#F1ECDD]">
                      {s.appareils.map((a) => <div key={a.cle} style={{ width: `${(a.valeur / Math.max(1, s.visites)) * 100}%`, background: a.cle === "mobile" ? OR : "#141414" }} />)}
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      {s.appareils.map((a) => (
                        <span key={a.cle} className="inline-flex items-center gap-1">
                          {a.cle === "mobile" ? <Smartphone className="h-3.5 w-3.5" /> : <Laptop className="h-3.5 w-3.5" />}
                          {a.cle === "mobile" ? "Smartphone" : "Ordinateur"} {Math.round((a.valeur / Math.max(1, s.visites)) * 100)} %
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Chiffre({ icone: Icone, titre, valeur, actuel, avant, detail, testId }: { icone: typeof Users; titre: string; valeur: string; actuel: number; avant: number; detail?: string; testId?: string }) {
  const evol = avant ? Math.round(((actuel - avant) / avant) * 100) : null;
  return (
    <div className="rounded-2xl border border-[#EADFC8] bg-[#FDFBF6] px-4 py-3" data-testid={testId}>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D22]"><Icone className="h-3.5 w-3.5" /> {titre}</div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-serif text-3xl">{valeur}</span>
        {evol !== null && evol !== 0 && (
          <span className={`inline-flex items-center text-xs font-medium ${evol > 0 ? "text-[#2F5A2A]" : "text-[#8A2E26]"}`} title="Par rapport à la période précédente">
            {evol > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{Math.abs(evol)} %
          </span>
        )}
      </div>
      {detail && <div className="text-xs text-muted-foreground">{detail}</div>}
    </div>
  );
}

function Courbe({ donnees }: { donnees: { jour: string; visites: number }[] }) {
  const [survol, setSurvol] = useState<number | null>(null);
  // Au-delà de 60 jours, regroupement par semaine pour rester lisible
  const pts = donnees.length > 60
    ? Array.from({ length: Math.ceil(donnees.length / 7) }, (_, i) => { const g = donnees.slice(i * 7, i * 7 + 7); return { jour: g[0].jour, visites: g.reduce((t, x) => t + x.visites, 0) }; })
    : donnees;
  const max = Math.max(1, ...pts.map((p) => p.visites));
  const L = 600, H = 120;
  const x = (i: number) => (pts.length < 2 ? L / 2 : (i / (pts.length - 1)) * L);
  const y = (v: number) => H - (v / max) * (H - 8) - 2;
  const chemin = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.visites).toFixed(1)}`).join(" ");
  const date = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "short" });
  const unite = donnees.length > 60 ? "semaine du " : "";
  if (!pts.length) return null;
  return (
    <figure className="space-y-1" data-testid="courbe-visites">
      <figcaption className="text-sm font-medium flex justify-between">
        <span>Visites par {donnees.length > 60 ? "semaine" : "jour"}</span>
        {survol !== null && <span className="text-xs text-muted-foreground">{unite}{date(pts[survol].jour)} · <b className="text-foreground">{pts[survol].visites} visite{pts[survol].visites > 1 ? "s" : ""}</b></span>}
      </figcaption>
      <svg viewBox={`0 0 ${L} ${H}`} className="w-full h-32" preserveAspectRatio="none" role="img" aria-label={`Visites : ${pts.map((p) => `${date(p.jour)} ${p.visites}`).join(", ")}`}
        onMouseLeave={() => setSurvol(null)}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSurvol(Math.max(0, Math.min(pts.length - 1, Math.round(((e.clientX - r.left) / r.width) * (pts.length - 1))))); }}>
        {[0.5, 1].map((f) => <line key={f} x1="0" x2={L} y1={H - f * (H - 8) - 2} y2={H - f * (H - 8) - 2} stroke="#EADFC8" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />)}
        <path d={`${chemin} L${x(pts.length - 1)},${H} L${x(0)},${H} Z`} fill={OR} opacity="0.12" />
        <path d={chemin} fill="none" stroke={OR} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {survol !== null && <line x1={x(survol)} x2={x(survol)} y1="0" y2={H} stroke="#141414" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />}
      </svg>
      <div className="flex justify-between text-[11px] text-muted-foreground"><span>{date(pts[0].jour)}</span><span>{date(pts[pts.length - 1].jour)}</span></div>
    </figure>
  );
}

function Liste({ titre, lignes, noms, unite, vide, testId }: { titre: string; lignes: Ligne[]; noms: Record<string, string>; unite: string; vide?: string; testId?: string }) {
  const max = Math.max(1, ...lignes.map((l) => l.valeur));
  return (
    <div className="space-y-2" data-testid={testId}>
      <div className="text-sm font-medium">{titre}</div>
      {!lignes.length ? <p className="text-xs text-muted-foreground">{vide ?? "Pas encore de données."}</p> : (
        <ul className="space-y-1.5">
          {lignes.map((l) => (
            <li key={l.cle} className="text-sm" title={`${nf(l.valeur)} ${unite}${l.valeur > 1 ? "s" : ""}`}>
              <div className="flex justify-between gap-3"><span className="truncate">{noms[l.cle] ?? l.cle}</span><span className="tabular-nums text-muted-foreground">{nf(l.valeur)}</span></div>
              <div className="h-1.5 rounded-full bg-[#F1ECDD] overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(l.valeur / max) * 100}%`, background: OR }} /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
