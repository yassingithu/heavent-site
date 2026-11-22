import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { instantMaroc, aujourdhuiMaroc, jourMarocPlus } from "@/lib/dateMaroc";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, CheckCircle2, ChevronDown, Clock, LogIn, LogOut, MapPin, Phone, RefreshCw, Shirt, Trash2, WifiOff, XCircle } from "lucide-react";
import { abandonner, appliquerFile, enregistrerMissions, estErreurReseau, lireCache, lireFile, definirProprietaire, mettreEnAttente, nouvelleCle, synchroniser, toutEffacer, useHorsLigne } from "@/lib/horsLigne";

/**
 * Espace staff — « Mes missions » : fiche mission (tenue, point de rendez-vous, contact sur place),
 * confirmation de présence, et pointage de l'arrivée (position + selfie) et du départ.
 */
interface Fiche { tenue: string | null; point_rdv: string | null; heure_rdv: string | null; latitude: number | null; longitude: number | null; contact_nom: string | null; contact_telephone: string | null; consignes: string | null }
export interface Mission {
  id: string; date_jour: string; heure_debut: string | null; heure_fin: string | null; heures: number; poste: string;
  presence_confirmee_le: string | null; empechement_le: string | null; arrivee_le: string | null; arrivee_verifiee: boolean | null;
  depart_le: string | null; heures_pointees: number | null; evenement: string; lieu: string | null; numero: string | null; fiche: Fiche | null;
}

const hhmm = (t?: string | null) => (t ? t.slice(0, 5) : "");
const heure = (iso: string) => new Date(iso).toLocaleTimeString("fr-FR", { timeZone: "Africa/Casablanca", hour: "2-digit", minute: "2-digit" });
const jourLong = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });

/** Début / fin prévus (heures saisies à l'heure du Maroc). */
export function horaires(m: Pick<Mission, "date_jour" | "heure_debut" | "heure_fin" | "heures">) {
  const debut = instantMaroc(m.date_jour, hhmm(m.heure_debut) || "00:00");
  let fin = m.heure_fin ? instantMaroc(m.date_jour, hhmm(m.heure_fin)) : new Date(debut.getTime() + Number(m.heures || 8) * 3600e3);
  if (fin <= debut) fin = new Date(fin.getTime() + 864e5);
  return { debut, fin };
}

/** Réduit une photo (≤ 900 px, JPEG) pour un envoi rapide même avec peu de réseau. */
async function reduirePhoto(fichier: File): Promise<string> {
  const url = URL.createObjectURL(fichier);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const k = Math.min(1, 900 / Math.max(img.width, img.height));
    const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.7);
  } finally { URL.revokeObjectURL(url); }
}

function maPosition(): Promise<{ lat: number; lng: number; precision: number } | null> {
  return new Promise((res) => {
    if (!navigator.geolocation) return res(null);
    navigator.geolocation.getCurrentPosition(
      (p) => res({ lat: p.coords.latitude, lng: p.coords.longitude, precision: p.coords.accuracy }),
      () => res(null),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  });
}

/** Attend au plus `ms` : un réseau « présent mais mort » ne doit jamais laisser le bouton bloqué. */
const avecDelai = <T,>(p: Promise<T>, ms: number) => new Promise<T>((res, rej) => {
  const t = setTimeout(() => { const e = new Error("Le réseau ne répond pas."); e.name = "FunctionsFetchError"; rej(e); }, ms);
  p.then((v) => { clearTimeout(t); res(v); }, (e) => { clearTimeout(t); rej(e); });
});

async function appeler(body: Record<string, unknown>) {
  const { data, error } = await avecDelai(supabase.functions.invoke("pointer", { body }), 12000);
  let msg = data?.error as string | undefined;
  if (error && !msg) { try { msg = (await (error as any).context?.json())?.error; } catch { /* */ } }
  if (error || data?.error) {
    const err = new Error(msg ?? "Action impossible pour le moment. Réessaie.");
    const statut = Number((error as any)?.context?.status ?? 0);
    // Pas de réseau, panne du serveur ou session expirée : ce n'est pas un refus, le pointage reste gardé et pourra être renvoyé.
    if (statut === 401) { err.name = "SessionExpiree"; err.message = "Ta session a expiré : reconnecte-toi pour envoyer ton pointage."; }
    else if (error && ((error as any).name === "FunctionsFetchError" || (error as any).name === "FunctionsRelayError" || statut >= 500 || statut === 408 || statut === 425 || statut === 429)) err.name = "FunctionsFetchError";
    throw err;
  }
  return data;
}

const quand = (iso: string) => {
  const d = new Date(iso), j = aujourdhuiMaroc(d), auj = aujourdhuiMaroc(), hier = jourMarocPlus(-1);
  const h = d.toLocaleTimeString("fr-FR", { timeZone: "Africa/Casablanca", hour: "2-digit", minute: "2-digit" }).replace(":", " h ");
  return j === auj ? `aujourd'hui à ${h}` : j === hier ? `hier à ${h}` : `le ${d.toLocaleDateString("fr-FR", { timeZone: "Africa/Casablanca", day: "numeric", month: "long" })} à ${h}`;
};

export default function MesMissions() {
  const { toast } = useToast();
  const { enLigne, cache, file } = useHorsLigne();
  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [depuisCache, setDepuisCache] = useState(false);
  const [effacer, setEffacer] = useState(false);
  const [synchro, setSynchro] = useState(false);
  const [sessionExpiree, setSessionExpiree] = useState(false);
  // missions dont le pointage vient d'être envoyé : mention « envoyé à l'agence » gardée tant que l'appli reste ouverte
  const [envoyes, setEnvoyes] = useState<string[]>(() => { try { return JSON.parse(sessionStorage.getItem("hv-hl-envoyes") || "[]"); } catch { return []; } });
  // Un bandeau qui apparaît en haut ne doit jamais faire descendre le bouton « Je suis arrivé(e) » sous le pouce :
  // on garde la première mission à la même place à l'écran en compensant le défilement (sans animer la hauteur).
  const refSection = useRef<HTMLElement>(null);
  const ancre = useRef<number | null>(null);
  const ancrer = () => {
    const el = refSection.current?.querySelector('[data-testid="mission"]') as HTMLElement | null;
    const haut = el ? el.getBoundingClientRect().top : null; // position à l'écran (indépendante de l'ancrage de défilement du navigateur)
    if (haut != null && ancre.current != null && Math.abs(haut - ancre.current) > 1 && window.scrollY > 0) {
      const delta = haut - ancre.current;
      const cale = refSection.current;
      const place = () => document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      // page trop courte pour compenser : on ajoute (puis on retire) un peu de place en bas, sinon le bouton descendrait sous le pouce
      if (cale && delta > 0 && place() < delta) cale.style.marginBottom = `${(parseFloat(cale.style.marginBottom) || 0) + (delta - place())}px`;
      if (cale && delta < 0) cale.style.marginBottom = `${Math.max(0, (parseFloat(cale.style.marginBottom) || 0) + delta)}px`;
      window.scrollBy(0, delta);
      ancre.current = el!.getBoundingClientRect().top;
      return;
    }
    ancre.current = haut;
  };
  useLayoutEffect(ancrer);
  useEffect(() => {
    const suivre = () => { const el = refSection.current?.querySelector('[data-testid="mission"]') as HTMLElement | null; if (el) ancre.current = el.getBoundingClientRect().top; };
    window.addEventListener("scroll", suivre, { passive: true });
    return () => window.removeEventListener("scroll", suivre);
  }, []);
  // aussi quand la taille change sans rendu (police qui se charge, texte qui passe à la ligne)
  useEffect(() => {
    if (!refSection.current || typeof ResizeObserver === "undefined") return;
    const o = new ResizeObserver(() => ancrer());
    o.observe(refSection.current);
    return () => o.disconnect();
  }, [missions !== null]);
  const [ouverte, setOuverte] = useState<string | null>(null);
  const [empechement, setEmpechement] = useState<Mission | null>(null);
  const [motif, setMotif] = useState("");
  const [pointage, setPointage] = useState<{ m: Mission; sens: "arrivee" | "depart" } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [, tic] = useState(0);

  // Réseau coupé ou faible : on affiche la dernière copie gardée sur le téléphone (missions d'hier à après-demain seulement).
  const charger = async () => {
    try { const { data: { session } } = await supabase.auth.getSession(); if (session?.user?.id) definirProprietaire(session.user.id); } catch { /* hors ligne : on garde le propriétaire connu */ }
    try {
      const { data, error } = await (supabase as any).rpc("mes_missions");
      if (error) throw error;
      setMissions((data ?? []) as Mission[]); setDepuisCache(false);
      enregistrerMissions((data ?? []) as any[]);
    } catch {
      const c = lireCache();
      setMissions(c ? (c.missions as unknown as Mission[]) : []); setDepuisCache(!!c);
    }
  };
  const envoyerFile = async () => {
    if (!lireFile().some((x) => !x.refus)) return;
    setSynchro(true);
    const r = await synchroniser(appeler);
    setSynchro(false);
    setSessionExpiree(r.session);
    if (r.envoyes) {
      setEnvoyes((a) => { const n = [...new Set([...a, ...r.ids])]; try { sessionStorage.setItem("hv-hl-envoyes", JSON.stringify(n)); } catch { /* */ } return n; });
      toast({ title: r.envoyes > 1 ? `${r.envoyes} pointages envoyés` : "Pointage envoyé", description: "L'agence l'a bien reçu. Elle vérifie les pointages faits sans réseau." });
      charger();
    }
  };
  useEffect(() => { charger(); const t = setInterval(() => tic((x) => x + 1), 60000); return () => clearInterval(t); }, []);
  // Envoi automatique des pointages en attente : au retour du réseau, au retour dans l'appli, et toutes les minutes tant qu'il en reste.
  useEffect(() => {
    const essai = () => { if (navigator.onLine) void envoyerFile(); };
    essai();
    const surVisible = () => { if (document.visibilityState === "visible") essai(); };
    window.addEventListener("online", essai); document.addEventListener("visibilitychange", surVisible);
    const t = setInterval(essai, 60000);
    return () => { window.removeEventListener("online", essai); document.removeEventListener("visibilitychange", surVisible); clearInterval(t); };
  }, []);
  useEffect(() => { if (enLigne) void charger(); }, [enLigne]);

  if (!missions) return null;
  const maintenant = new Date();
  // un pointage qui attend l'envoi s'affiche toujours (signal faible : le réseau semble présent mais l'envoi n'a pas abouti)
  const vues = (appliquerFile(missions as any, file) as unknown as Mission[]);
  const visibles = vues.filter((m) => horaires(m).fin.getTime() + 4 * 3600e3 > maintenant.getTime());
  if (!visibles.length && !file.length) return null;
  const horsReseau = !enLigne || depuisCache;
  const aEnvoyer = file.filter((x) => !x.refus).length;
  const refuses = file.filter((x) => x.refus);

  const confirmer = async (m: Mission) => {
    try { await appeler({ action: "confirmer", id: m.id }); toast({ title: "Présence confirmée", description: "Merci ! À bientôt sur la mission." }); charger(); }
    catch (e: any) { toast({ title: "Oups", description: e.message, variant: "destructive" }); }
  };
  const envoyerEmpechement = async () => {
    if (!empechement) return;
    setEnvoi(true);
    try { await appeler({ action: "empechement", id: empechement.id, motif }); toast({ title: "Agence prévenue", description: "Merci de nous avoir prévenus. L'agence va organiser un remplacement." }); setEmpechement(null); setMotif(""); charger(); }
    catch (e: any) { toast({ title: "Oups", description: e.message, variant: "destructive" }); }
    finally { setEnvoi(false); }
  };
  const pointer = async () => {
    if (!pointage) return;
    setEnvoi(true);
    const { m, sens } = pointage;
    const position = await maPosition();
    const heureLocale = new Date().toISOString();
    // Une clé unique dès le premier essai : si l'envoi a abouti mais que la réponse s'est perdue, le renvoi est reconnu et ne crée pas de refus ni de doublon.
    const cle = nouvelleCle();
    const garder = () => {
      const r = mettreEnAttente({ id: m.id, sens, position, photo: sens === "arrivee" ? photo : null, heure: heureLocale, cle });
      if (!r.ok) { toast({ title: "Pointage non enregistré", description: "Le téléphone n'a plus de place. Préviens ta cheffe d'équipe ou l'agence : elle notera ton heure.", variant: "destructive" }); return; }
      toast({ title: sens === "arrivee" ? "Arrivée enregistrée sur ton téléphone" : "Départ enregistré sur ton téléphone", description: "Il part dès que le réseau revient. Ouvre l'appli pour l'envoyer et ne te déconnecte pas d'ici là." });
      setPointage(null); setPhoto(null);
    };
    try {
      if (!navigator.onLine) { garder(); return; }
      const r = await appeler({ action: sens, id: m.id, position, photo: sens === "arrivee" ? photo : undefined, cle });
      const lieu = r.verifie === true ? "sur le lieu de la mission" : r.verifie === false ? (position ? "hors du lieu prévu : l'agence vérifiera" : "sans position : l'agence vérifiera") : "position enregistrée";
      toast({
        title: sens === "arrivee" ? `Arrivée pointée à ${heure(r.heure)}` : `Départ pointé à ${heure(r.heure)} — ${r.heures} h`,
        description: sens === "depart" && r.aVerifier ? `${lieu}. Les heures au-delà du prévu seront validées par l'agence.` : lieu,
      });
      setPointage(null); setPhoto(null); charger();
    } catch (e: any) {
      if (estErreurReseau(e)) { if (e?.name === "SessionExpiree") setSessionExpiree(true); garder(); }
      else toast({ title: "Pointage impossible", description: e.message, variant: "destructive" });
    } finally { setEnvoi(false); }
  };

  return (
    <section ref={refSection} className="bg-white rounded-lg shadow-sm p-3 sm:p-5 space-y-3" data-testid="mes-missions">
      <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-[#A8933F]" /> Mes prochaines missions</h2>

      <div className="space-y-3">
        {horsReseau && (
          <div className="hl-etat hl-reseau" role="status" aria-live="polite" data-testid="bandeau-hors-ligne">
            <div className="hl-lib"><WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" /> Pas de réseau</div>
            <p className="hl-grand">Pointe normalement : ton pointage part dès que le réseau revient.</p>
            <p>{cache ? <>Informations mises à jour {quand(cache.synchro)}. Elles ont pu changer : en cas de doute, appelle ta cheffe d'équipe.</> : <>Aucune information gardée sur ce téléphone.</>}</p>
          </div>
        )}
        {aEnvoyer > 0 && (
          <div className="hl-etat hl-attente" role="status" aria-live="polite" data-testid="pointages-a-envoyer">
            <div className="flex items-center gap-3">
              <span className="hl-nb" aria-hidden="true">{aEnvoyer}</span>
              <div className="min-w-0">
                <div className="hl-lib"><Clock className="h-4 w-4 shrink-0" aria-hidden="true" /> En attente d'envoi</div>
                <p>{aEnvoyer === 1 ? "pointage gardé sur ton téléphone" : "pointages gardés sur ton téléphone"}</p>
              </div>
            </div>
            <p>Il part dès que le réseau revient : ouvre l'appli pour l'envoyer et ne te déconnecte pas d'ici là.</p>
            {sessionExpiree && <p role="alert" className="font-medium text-[#7A2E16]">Ta session a expiré : reconnecte-toi pour envoyer ton pointage.</p>}
            <Button size="lg" disabled={!enLigne || synchro} onClick={() => void envoyerFile()} className={enLigne ? "mt-2 bg-[#141414] text-[#E4D49A] hover:bg-[#2a2a2a]" : "mt-2"} variant={enLigne ? "default" : "outline"} data-testid="envoyer-maintenant">
              <RefreshCw className={`h-4 w-4 mr-2 ${synchro ? "animate-spin motion-reduce:animate-none" : ""}`} aria-hidden="true" /> {synchro ? "Envoi…" : enLigne ? "Envoyer maintenant" : "Envoi dès le retour du réseau"}
            </Button>
          </div>
        )}
        {refuses.map((r) => {
          const mm: any = vues.find((x) => x.id === r.id);
          return (
            <div key={r.cle} className="hl-etat hl-refus" role="alert" data-testid="pointage-refuse">
              <div className="hl-lib"><XCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> Pointage non accepté</div>
              <p>{mm ? `${mm.evenement}, ${jourLong(mm.date_jour)}` : "Une mission"} : {r.refus}</p>
              <p>Préviens l'agence ou ta cheffe d'équipe.</p>
              <Button variant="outline" className="mt-2 min-h-11" onClick={() => abandonner(r.cle)} data-testid="pointage-refuse-vu">J'ai prévenu l'agence</Button>
            </div>
          );
        })}
      </div>
      {visibles.map((m: any) => {
        const { debut, fin } = horaires(m);
        const fenetre = maintenant.getTime() >= debut.getTime() - 3 * 3600e3 && maintenant.getTime() <= fin.getTime() + 4 * 3600e3;
        const aujourdHui = m.date_jour === aujourdhuiMaroc(maintenant);
        const f = m.fiche;
        const carte = f?.latitude != null && f?.longitude != null
          ? `https://www.google.com/maps/search/?api=1&query=${f.latitude},${f.longitude}`
          : m.lieu || f?.point_rdv ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f?.point_rdv || m.lieu || "")}` : null;
        const actions = (
          <div className="flex flex-wrap gap-2">
            {horsReseau && ((!m.arrivee_le && !m.presence_confirmee_le && maintenant < fin) || (!m.arrivee_le && !m.empechement_le && maintenant < debut)) && (
              <p className="hl-note w-full" data-testid="note-reseau-requis">Confirmer ta présence ou signaler un empêchement : possible quand le réseau revient.</p>
            )}
            {!horsReseau && !m.arrivee_le && !m.presence_confirmee_le && maintenant < fin && (
              <Button size="sm" className="min-h-11" onClick={() => confirmer(m)} data-testid="confirmer-presence"><CheckCircle2 className="h-4 w-4 mr-1" /> Je confirme ma présence</Button>
            )}
            {!horsReseau && !m.arrivee_le && !m.empechement_le && maintenant < debut && (
              <Button size="sm" variant="ghost" className="min-h-11" onClick={() => setEmpechement(m)} data-testid="signaler-empechement"><XCircle className="h-4 w-4 mr-1" /> Je ne pourrai pas venir</Button>
            )}
            {fenetre && !m.arrivee_le && (
              <Button size="lg" className="w-full sm:w-auto bg-[#141414] text-[#E4D49A] hover:bg-[#2a2a2a]" onClick={() => setPointage({ m, sens: "arrivee" })} data-testid="pointer-arrivee"><LogIn className="h-5 w-5 mr-2" /> Je suis arrivé(e)</Button>
            )}
            {fenetre && m.arrivee_le && !m.depart_le && (
              <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setPointage({ m, sens: "depart" })} data-testid="pointer-depart"><LogOut className="h-5 w-5 mr-2" /> J'ai terminé</Button>
            )}
          </div>
        );
        return (
          <div key={m.id} className={`rounded-lg border p-3 sm:p-4 space-y-3 ${aujourdHui ? "border-[#C8B560] bg-[#FFFCF2]" : ""}`} data-testid="mission">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-semibold">{m.evenement}{aujourdHui && <span className="hl-badge hl-badge-aujourdhui ml-2">Aujourd'hui</span>}</div>
                <div className="text-sm text-muted-foreground capitalize">{jourLong(m.date_jour)}{m.heure_debut ? ` · ${hhmm(m.heure_debut)}${m.heure_fin ? ` – ${hhmm(m.heure_fin)}` : ""}` : ""} · {m.poste}</div>
                {m.lieu && <div className="text-sm text-muted-foreground">{m.lieu}</div>}
              </div>
              <div className="text-xs font-medium">
                {m.depart_le ? <span key={`d${m.enAttente?.depart}`} className="hl-badge text-[#1F5A4C]">{m.enAttente?.depart ? "Départ en attente d'envoi" : (m.heures_pointees != null ? `Terminé · ${m.heures_pointees} h` : "Terminé") + (envoyes.includes(m.id) ? " · envoyé ✓" : "")}</span>
                  : m.arrivee_le ? <span key={`a${m.enAttente?.arrivee}`} className="hl-badge text-[#1F5A4C]">Arrivé(e) à {heure(m.arrivee_le)}{m.enAttente?.arrivee ? " · en attente d'envoi" : envoyes.includes(m.id) ? " · envoyé ✓" : ""}</span>
                  : m.empechement_le ? <span className="hl-badge text-[#7A2E16]">Empêchement signalé</span>
                  : m.presence_confirmee_le ? <span className="hl-badge text-[#1F5A4C]">Présence confirmée</span>
                  : <span className="hl-badge text-[#7A5F1F]">À confirmer</span>}
              </div>
            </div>

            {aujourdHui && actions}
            {/* Fiche mission */}
            <button className="w-full flex items-center justify-between text-sm font-medium text-[#8C6D22]" onClick={() => setOuverte(ouverte === m.id ? null : m.id)} aria-expanded={ouverte === m.id} data-testid="ouvrir-fiche">
              Fiche mission <ChevronDown className={`h-4 w-4 transition-transform ${ouverte === m.id ? "rotate-180" : ""}`} />
            </button>
            {(ouverte === m.id || aujourdHui) && (
              <div className="grid gap-2 text-sm rounded-md bg-[#FAF7EE] border border-[#ece6d3] p-3" data-testid="fiche-mission">
                {f?.tenue && <div className="flex gap-2"><Shirt className="h-4 w-4 mt-0.5 shrink-0 text-[#A8933F]" /><div><b>Tenue :</b> <span className="whitespace-pre-line">{f.tenue}</span></div></div>}
                {(f?.point_rdv || f?.heure_rdv || m.lieu) && (
                  <div className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#A8933F]" /><div>
                    <b>Rendez-vous :</b> {f?.heure_rdv ? `${hhmm(f.heure_rdv)} — ` : ""}{f?.point_rdv || m.lieu}
                    {carte && <> · <a href={carte} target="_blank" rel="noreferrer" className="underline">Voir sur la carte</a></>}
                  </div></div>
                )}
                {(f?.contact_nom || f?.contact_telephone) && (
                  <div className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#A8933F]" /><div>
                    <b>Contact sur place :</b> {f?.contact_nom}{f?.contact_telephone && <> · <a href={`tel:${f.contact_telephone}`} className="underline">{f.contact_telephone}</a> · <a className="underline" target="_blank" rel="noreferrer" href={`https://wa.me/${f.contact_telephone.replace(/\D/g, "").replace(/^0/, "212")}`}>WhatsApp</a></>}
                  </div></div>
                )}
                {f?.consignes && <div className="whitespace-pre-line"><b>Consignes :</b> {f.consignes}</div>}
                {!f?.tenue && !f?.consignes && !f?.contact_nom && <div className="text-muted-foreground">L'agence complètera ta fiche mission (tenue, rendez-vous, contact) avant l'événement.</div>}
              </div>
            )}

            {!aujourdHui && actions}
          </div>
        );
      })}
      <details className="text-sm text-[#4A4137]" data-testid="aide-hors-ligne">
        <summary className="cursor-pointer min-h-11 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[.14em] text-[#7A5F1F]">Sans réseau, comment ça marche ?<span aria-hidden="true" style={{ fontFamily: "var(--s-titre)", fontSize: 20 }}>+</span></summary>
        <div className="space-y-2 pb-2">
          <p>Ce téléphone garde seulement tes missions d'hier à après-demain : lieu, horaires, tenue, contact sur place, consignes. Jamais ton contrat, ta carte d'identité ni ta paie.</p>
          <p>Sans réseau, tu pointes comme d'habitude : l'heure, ta position et ton selfie restent sur le téléphone. Ils partent dès que le réseau revient, une seule fois, à condition d'ouvrir l'appli. L'agence vérifie ces pointages, car l'heure vient du téléphone ; en attendant, tes heures prévues sont comptées.</p>
          <p>Si l'agence modifie ou retire une mission, ce téléphone peut garder l'ancienne version jusqu'à la prochaine connexion. Tout s'efface seul 48 h après ta dernière mission, et à ta déconnexion.</p>
          <p>Si tu changes de téléphone, ce qui n'est pas encore envoyé est perdu : préviens l'agence.</p>
        </div>
      </details>
      <button type="button" onClick={() => setEffacer(true)} className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[#6B5318] underline underline-offset-4" data-testid="effacer-donnees"><Trash2 className="h-4 w-4" aria-hidden="true" /> Effacer les données de ce téléphone</button>
      <p className="text-sm text-[#4A4137]">Le jour J, le pointage s'ouvre 3 h avant le début. Ta position n'est enregistrée qu'au moment où tu pointes (jamais en continu) et sert seulement à vérifier que tu es sur le lieu de la mission.</p>

      <Dialog open={!!empechement} onOpenChange={(o) => !o && setEmpechement(null)}>
        <DialogContent className="max-w-md st-dialogue">
          <DialogHeader><DialogTitle>Tu ne pourras pas venir ?</DialogTitle>
            <DialogDescription>L'agence est prévenue tout de suite pour organiser un remplacement. Merci de prévenir le plus tôt possible.</DialogDescription></DialogHeader>
          <textarea value={motif} onChange={(e) => setMotif(e.target.value)} rows={3} placeholder="Motif (facultatif)" className="w-full rounded-md border px-3 py-2 text-sm" data-testid="motif-empechement" />
          <DialogFooter><Button variant="destructive" onClick={envoyerEmpechement} disabled={envoi} data-testid="envoyer-empechement">Prévenir l'agence</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!pointage} onOpenChange={(o) => { if (!o) { setPointage(null); setPhoto(null); } }}>
        <DialogContent className="max-w-md st-dialogue">
          <DialogHeader>
            <DialogTitle>{pointage?.sens === "arrivee" ? "Pointer mon arrivée" : "Pointer mon départ"}</DialogTitle>
            <DialogDescription>{horsReseau ? "Pas de réseau : ton pointage sera gardé sur ton téléphone et envoyé dès que le réseau revient (ouvre l'appli à ce moment-là). Ton téléphone peut te demander de partager ta position : accepte." : "Ton téléphone va te demander l'autorisation de partager ta position : accepte pour que ton pointage soit validé automatiquement."}</DialogDescription>
          </DialogHeader>
          {pointage?.sens === "arrivee" && (
            <div className="space-y-2">
              <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#DCCBA6] p-4 text-sm cursor-pointer hover:bg-[#FAF7EE]">
                <Camera className="h-5 w-5 text-[#A8933F]" /> {photo ? "Changer la photo" : "Prendre un selfie en tenue (conseillé)"}
                <input type="file" accept="image/*" capture="user" className="hidden" data-testid="selfie"
                  onChange={async (e) => { const fi = e.target.files?.[0]; if (fi) setPhoto(await reduirePhoto(fi)); }} />
              </label>
              {photo && <img src={photo} alt="Selfie de pointage" className="mx-auto max-h-48 rounded-md" />}
            </div>
          )}
          <DialogFooter>
            <Button size="lg" className="w-full" onClick={pointer} disabled={envoi} data-testid="valider-pointage">
              {envoi ? "Pointage en cours…" : pointage?.sens === "arrivee" ? "Je pointe mon arrivée" : "Je pointe mon départ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={effacer} onOpenChange={setEffacer}>
        <DialogContent className="max-w-md st-dialogue">
          <DialogHeader><DialogTitle>Effacer les données de ce téléphone ?</DialogTitle>
            <DialogDescription>Tes missions gardées pour le mode sans réseau seront supprimées de ce téléphone. Elles reviendront à ta prochaine connexion.</DialogDescription></DialogHeader>
          {aEnvoyer > 0 && <p className="hl-etat hl-refus" role="alert">{aEnvoyer === 1 ? "1 pointage n'est pas encore envoyé : il serait perdu." : `${aEnvoyer} pointages ne sont pas encore envoyés : ils seraient perdus.`} Attends le retour du réseau pour ne rien perdre.</p>}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button className="hl-bouton-sur" onClick={() => setEffacer(false)} data-testid="garder-donnees">Garder</Button>
            {!(aEnvoyer > 0 && !enLigne) && (
              <Button variant="outline" className="hl-bouton-risque" onClick={() => { toutEffacer(); setEffacer(false); charger(); toast({ title: "Données effacées", description: "Ce téléphone ne garde plus tes missions." }); }} data-testid="confirmer-effacement">{aEnvoyer > 0 ? "Effacer quand même" : "Effacer"}</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
