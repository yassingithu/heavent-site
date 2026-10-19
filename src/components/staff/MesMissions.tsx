import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, CheckCircle2, ChevronDown, Clock, LogIn, LogOut, MapPin, Phone, Shirt, XCircle } from "lucide-react";

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
const heure = (iso: string) => new Date(iso).toLocaleTimeString("fr-FR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
const jourLong = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });

/** Début / fin prévus (heure du Maroc = GMT). */
export function horaires(m: Pick<Mission, "date_jour" | "heure_debut" | "heure_fin" | "heures">) {
  const debut = new Date(`${m.date_jour}T${hhmm(m.heure_debut) || "00:00"}:00Z`);
  let fin = m.heure_fin ? new Date(`${m.date_jour}T${hhmm(m.heure_fin)}:00Z`) : new Date(debut.getTime() + Number(m.heures || 8) * 3600e3);
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

async function appeler(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("pointer", { body });
  let msg = data?.error as string | undefined;
  if (error && !msg) { try { msg = (await (error as any).context?.json())?.error; } catch { /* */ } }
  if (error || data?.error) throw new Error(msg ?? "Action impossible pour le moment. Réessaie.");
  return data;
}

export default function MesMissions() {
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [ouverte, setOuverte] = useState<string | null>(null);
  const [empechement, setEmpechement] = useState<Mission | null>(null);
  const [motif, setMotif] = useState("");
  const [pointage, setPointage] = useState<{ m: Mission; sens: "arrivee" | "depart" } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [, tic] = useState(0);

  const charger = async () => {
    const { data } = await (supabase as any).rpc("mes_missions");
    setMissions((data ?? []) as Mission[]);
  };
  useEffect(() => { charger(); const t = setInterval(() => tic((x) => x + 1), 60000); return () => clearInterval(t); }, []);

  if (!missions) return null;
  const maintenant = new Date();
  const visibles = missions.filter((m) => horaires(m).fin.getTime() + 4 * 3600e3 > maintenant.getTime());
  if (!visibles.length) return null;

  const confirmer = async (m: Mission) => {
    try { await appeler({ action: "confirmer", id: m.id }); toast({ title: "Présence confirmée ✅", description: "Merci ! À bientôt sur la mission." }); charger(); }
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
    try {
      const position = await maPosition();
      const r = await appeler({ action: pointage.sens, id: pointage.m.id, position, photo: pointage.sens === "arrivee" ? photo : undefined });
      const lieu = r.verifie === true ? "sur le lieu de la mission ✓" : r.verifie === false ? (position ? "hors du lieu prévu : l'agence vérifiera" : "sans position : l'agence vérifiera") : "position enregistrée";
      toast({
        title: pointage.sens === "arrivee" ? `Arrivée pointée à ${heure(r.heure)}` : `Départ pointé à ${heure(r.heure)} — ${r.heures} h`,
        description: pointage.sens === "depart" && r.aVerifier ? `${lieu}. Les heures au-delà du prévu seront validées par l'agence.` : lieu,
      });
      setPointage(null); setPhoto(null); charger();
    } catch (e: any) { toast({ title: "Pointage impossible", description: e.message, variant: "destructive" }); }
    finally { setEnvoi(false); }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-3 sm:p-5 space-y-3" data-testid="mes-missions">
      <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-[#A8933F]" /> Mes prochaines missions</h2>
      {visibles.map((m) => {
        const { debut, fin } = horaires(m);
        const fenetre = maintenant.getTime() >= debut.getTime() - 3 * 3600e3 && maintenant.getTime() <= fin.getTime() + 4 * 3600e3;
        const aujourdHui = m.date_jour === maintenant.toISOString().slice(0, 10);
        const f = m.fiche;
        const carte = f?.latitude != null && f?.longitude != null
          ? `https://www.google.com/maps/search/?api=1&query=${f.latitude},${f.longitude}`
          : m.lieu || f?.point_rdv ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f?.point_rdv || m.lieu || "")}` : null;
        return (
          <div key={m.id} className={`rounded-lg border p-3 sm:p-4 space-y-3 ${aujourdHui ? "border-[#C8B560] bg-[#FFFCF2]" : ""}`} data-testid="mission">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-semibold">{m.evenement}{aujourdHui && <span className="ml-2 text-xs rounded-full bg-[#C8B560] text-white px-2 py-0.5">Aujourd'hui</span>}</div>
                <div className="text-sm text-muted-foreground capitalize">{jourLong(m.date_jour)}{m.heure_debut ? ` · ${hhmm(m.heure_debut)}${m.heure_fin ? ` – ${hhmm(m.heure_fin)}` : ""}` : ""} · {m.poste}</div>
                {m.lieu && <div className="text-sm text-muted-foreground">{m.lieu}</div>}
              </div>
              <div className="text-xs font-medium">
                {m.depart_le ? <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1">Terminé · {m.heures_pointees} h</span>
                  : m.arrivee_le ? <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1">Arrivé(e) à {heure(m.arrivee_le)}</span>
                  : m.empechement_le ? <span className="rounded-full bg-red-100 text-red-800 px-2.5 py-1">Empêchement signalé</span>
                  : m.presence_confirmee_le ? <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1">Présence confirmée</span>
                  : <span className="rounded-full bg-amber-100 text-amber-900 px-2.5 py-1">À confirmer</span>}
              </div>
            </div>

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

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {!m.arrivee_le && !m.presence_confirmee_le && maintenant < fin && (
                <Button size="sm" onClick={() => confirmer(m)} data-testid="confirmer-presence"><CheckCircle2 className="h-4 w-4 mr-1" /> Je confirme ma présence</Button>
              )}
              {!m.arrivee_le && !m.empechement_le && maintenant < debut && (
                <Button size="sm" variant="ghost" onClick={() => setEmpechement(m)} data-testid="signaler-empechement"><XCircle className="h-4 w-4 mr-1" /> Je ne pourrai pas venir</Button>
              )}
              {fenetre && !m.arrivee_le && (
                <Button size="lg" className="w-full sm:w-auto bg-[#141414] hover:bg-[#2a2a2a]" onClick={() => setPointage({ m, sens: "arrivee" })} data-testid="pointer-arrivee"><LogIn className="h-5 w-5 mr-2" /> Je suis arrivé(e)</Button>
              )}
              {fenetre && m.arrivee_le && !m.depart_le && (
                <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setPointage({ m, sens: "depart" })} data-testid="pointer-depart"><LogOut className="h-5 w-5 mr-2" /> J'ai terminé</Button>
              )}
            </div>
          </div>
        );
      })}
      <p className="text-xs text-muted-foreground">Le jour J, le pointage s'ouvre 3 h avant le début. Ta position n'est enregistrée qu'au moment où tu pointes (jamais en continu) et sert seulement à vérifier que tu es sur le lieu de la mission.</p>

      <Dialog open={!!empechement} onOpenChange={(o) => !o && setEmpechement(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Tu ne pourras pas venir ?</DialogTitle>
            <DialogDescription>L'agence est prévenue tout de suite pour organiser un remplacement. Merci de prévenir le plus tôt possible.</DialogDescription></DialogHeader>
          <textarea value={motif} onChange={(e) => setMotif(e.target.value)} rows={3} placeholder="Motif (facultatif)" className="w-full rounded-md border px-3 py-2 text-sm" data-testid="motif-empechement" />
          <DialogFooter><Button variant="destructive" onClick={envoyerEmpechement} disabled={envoi} data-testid="envoyer-empechement">Prévenir l'agence</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!pointage} onOpenChange={(o) => { if (!o) { setPointage(null); setPhoto(null); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{pointage?.sens === "arrivee" ? "Pointer mon arrivée" : "Pointer mon départ"}</DialogTitle>
            <DialogDescription>Ton téléphone va te demander l'autorisation de partager ta position : accepte pour que ton pointage soit validé automatiquement.</DialogDescription>
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
    </section>
  );
}
