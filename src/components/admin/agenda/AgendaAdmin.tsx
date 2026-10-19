import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Ban, CalendarPlus, Check, Copy, Mail, MessageCircle, Phone, Plus, Save, Trash2, X } from "lucide-react";

/** Onglet « Agenda » : rendez-vous pris par les clients, disponibilités de la semaine, jours bloqués, abonnement calendrier. */
const TZ = "UTC"; // heure du Maroc : GMT depuis le 20 septembre 2026 (fin du GMT+1)
const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const TYPES: Record<string, string> = { agence: "À l'agence", telephone: "Téléphone", visio: "Visio" };
const SOURCES: Record<string, string> = { devis: "depuis son devis", contact: "page Contact", jeu: "jeu", site: "site" };
const PROJET = "mapiwnsjsluiwmnulhqk.supabase.co";

interface Plage { id?: string; jour: number; debut: string; fin: string }
interface Reglages { duree_minutes: number; pause_minutes: number; delai_heures: number; horizon_jours: number; types: string[]; adresse: string | null; lien_visio: string | null; actif: boolean }
interface Rdv {
  id: string; debut: string; fin: string; type: string; statut: string; client_nom: string; client_email: string | null; client_telephone: string | null;
  message: string | null; source: string; devis_id: string | null; langue: string; devis?: { numero: string; titre: string | null } | null;
}
interface Indispo { id: string; debut: string; fin: string; motif: string | null }

const jourMaroc = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: TZ });
const heure = (iso: string) => new Date(iso).toLocaleTimeString("fr-FR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
const jourLong = (j: string) => new Date(j + "T12:00:00Z").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const dateHeure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

/** « 2026-10-20 » + « 14:30 » à l'heure du Maroc → instant UTC (gère le passage à GMT pendant le ramadan). */
export function instantMaroc(date: string, h = "00:00") {
  const [a, m, j] = date.split("-").map(Number); const [hh, mm] = h.split(":").map(Number);
  const supposition = Date.UTC(a, m - 1, j, hh, mm);
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(new Date(supposition)).map((p) => [p.type, p.value]));
  const vu = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(supposition - (vu - supposition)).toISOString();
}

export default function AgendaAdmin({ onOuvrirDevis }: { onOuvrirDevis?: (id: string) => void }) {
  const { toast } = useToast();
  const [rdv, setRdv] = useState<Rdv[]>([]);
  const [plages, setPlages] = useState<Plage[]>([]);
  const [reglages, setReglages] = useState<Reglages | null>(null);
  const [indispos, setIndispos] = useState<Indispo[]>([]);
  const [passes, setPasses] = useState(false);
  const [lienCal, setLienCal] = useState<string | null>(null);
  const [nouvelle, setNouvelle] = useState({ du: "", au: "", journee: true, de: "09:00", a: "13:00", motif: "" });

  const charger = async () => {
    const sb = supabase as any;
    const depuis = new Date(Date.now() - (passes ? 60 : 0) * 864e5 - 3 * 3600e3).toISOString();
    const [r, h, p, i] = await Promise.all([
      sb.from("rendez_vous").select("*, devis(numero, titre)").gte("debut", depuis).order("debut"),
      sb.from("agenda_horaires").select("*").order("jour").order("debut"),
      sb.from("agenda_parametres").select("*").eq("id", 1).maybeSingle(),
      sb.from("agenda_indisponibilites").select("*").gte("fin", new Date().toISOString()).order("debut"),
    ]);
    setRdv(r.data ?? []);
    setPlages((h.data ?? []).map((x: any) => ({ ...x, debut: x.debut.slice(0, 5), fin: x.fin.slice(0, 5) })));
    setReglages(p.data ?? null);
    setIndispos(i.data ?? []);
  };
  useEffect(() => { charger(); }, [passes]); // eslint-disable-line react-hooks/exhaustive-deps

  const parJour = useMemo(() => {
    const m = new Map<string, Rdv[]>();
    for (const r of rdv.filter((x) => passes || x.statut !== "annule")) { const j = jourMaroc(r.debut); m.set(j, [...(m.get(j) ?? []), r]); }
    return [...m.entries()];
  }, [rdv, passes]);
  const aVenir = rdv.filter((r) => r.statut === "confirme" && new Date(r.debut) > new Date()).length;

  // ---------- rendez-vous ----------
  const annuler = async (r: Rdv) => {
    const motif = prompt(`Annuler le rendez-vous de ${r.client_nom} (${dateHeure(r.debut)}) ?\n\nLe client sera prévenu par e-mail${r.langue !== "fr" ? " (dans sa langue)" : ""}. Un mot à ajouter ? (facultatif)`, "");
    if (motif === null) return;
    const { data, error } = await supabase.functions.invoke("prendre-rdv", { body: { action: "annuler", id: r.id, motif } });
    if (error || data?.error) { toast({ title: "Annulation impossible", description: data?.error ?? error?.message, variant: "destructive" }); return; }
    toast({ title: "Rendez-vous annulé", description: r.client_email ? "Le client a été prévenu par e-mail. Le créneau est de nouveau libre." : "Le créneau est de nouveau libre." });
    charger();
  };
  const honore = async (r: Rdv) => {
    await (supabase as any).from("rendez_vous").update({ statut: r.statut === "honore" ? "confirme" : "honore" }).eq("id", r.id);
    charger();
  };

  // ---------- disponibilités ----------
  const majPlage = (i: number, champ: "debut" | "fin", v: string) => setPlages(plages.map((p, k) => (k === i ? { ...p, [champ]: v } : p)));
  const ajouterPlage = (jour: number) => {
    const dernieres = plages.filter((p) => p.jour === jour);
    const debut = dernieres.length ? dernieres[dernieres.length - 1].fin : "10:00";
    setPlages([...plages, { jour, debut, fin: debut < "18:00" ? "19:00" : "23:00" }]);
  };
  const copierLundi = () => {
    const lundi = plages.filter((p) => p.jour === 1);
    setPlages([...lundi, ...[2, 3, 4, 5, 6].flatMap((j) => lundi.map((p) => ({ jour: j, debut: p.debut, fin: p.fin })))].concat(plages.filter((p) => p.jour === 7)));
  };
  const enregistrerDispos = async () => {
    if (plages.some((p) => !p.debut || !p.fin || p.fin <= p.debut)) { toast({ title: "Horaires à corriger", description: "Chaque plage doit finir après son début.", variant: "destructive" }); return; }
    const sb = supabase as any;
    const { error: e1 } = await sb.from("agenda_horaires").delete().gte("jour", 1);
    const { error: e2 } = plages.length ? await sb.from("agenda_horaires").insert(plages.map(({ jour, debut, fin }) => ({ jour, debut, fin }))) : { error: null };
    if (e1 || e2) { toast({ title: "Erreur", description: (e1 ?? e2).message, variant: "destructive" }); return; }
    toast({ title: "Disponibilités enregistrées ✅", description: "Les clients voient tout de suite les nouveaux créneaux." });
    charger();
  };
  const enregistrerReglages = async () => {
    if (!reglages) return;
    if (!reglages.types.length) { toast({ title: "Choisis au moins un type de rendez-vous", variant: "destructive" }); return; }
    const { error } = await (supabase as any).from("agenda_parametres").update({ ...reglages, adresse: reglages.adresse || null, lien_visio: reglages.lien_visio || null, updated_at: new Date().toISOString() }).eq("id", 1);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Réglages enregistrés ✅" });
  };

  // ---------- jours bloqués ----------
  const bloquer = async () => {
    if (!nouvelle.du) { toast({ title: "Choisis une date", variant: "destructive" }); return; }
    const au = nouvelle.au || nouvelle.du;
    const debut = nouvelle.journee ? instantMaroc(nouvelle.du) : instantMaroc(nouvelle.du, nouvelle.de);
    const lendemain = new Date(au + "T12:00:00Z"); lendemain.setUTCDate(lendemain.getUTCDate() + 1);
    const fin = nouvelle.journee ? instantMaroc(lendemain.toISOString().slice(0, 10)) : instantMaroc(au, nouvelle.a);
    if (fin <= debut) { toast({ title: "La fin doit être après le début", variant: "destructive" }); return; }
    const chevauche = rdv.filter((r) => r.statut === "confirme" && r.debut < fin && r.fin > debut);
    const { error } = await (supabase as any).from("agenda_indisponibilites").insert({ debut, fin, motif: nouvelle.motif || null });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Période bloquée", description: chevauche.length ? `⚠️ ${chevauche.length} rendez-vous déjà pris sur cette période : pense à les annuler si besoin.` : "Plus aucun créneau proposé sur cette période." });
    setNouvelle({ ...nouvelle, du: "", au: "", motif: "" });
    charger();
  };
  const debloquer = async (i: Indispo) => { await (supabase as any).from("agenda_indisponibilites").delete().eq("id", i.id); charger(); };

  // ---------- calendrier du téléphone ----------
  const afficherLienCal = async () => {
    const { data, error } = await (supabase as any).rpc("agenda_cle_calendrier");
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setLienCal(`${PROJET}/functions/v1/agenda-ics?cle=${data}`);
  };
  const copier = async (texte: string) => { try { await navigator.clipboard.writeText(texte); toast({ title: "Lien copié" }); } catch { prompt("Lien :", texte); } };

  const whatsapp = (tel: string) => `https://wa.me/${tel.replace(/\D/g, "").replace(/^0/, "212")}`;

  return (
    <div className="space-y-4">
      {/* Rendez-vous */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
          <CardTitle className="text-base">Rendez-vous à venir ({aVenir})</CardTitle>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><Switch checked={passes} onCheckedChange={setPasses} /> Afficher les passés et annulés</label>
        </CardHeader>
        <CardContent className="space-y-4" data-testid="liste-rdv">
          {!parJour.length && <p className="text-sm text-muted-foreground py-4 text-center">Aucun rendez-vous pour l'instant. Les clients réservent depuis leur devis ou la page Contact.</p>}
          {parJour.map(([jour, liste]) => (
            <div key={jour}>
              <div className="text-sm font-semibold capitalize mb-2">{jourLong(jour)}</div>
              <div className="space-y-2">
                {liste.map((r) => (
                  <div key={r.id} className={`rounded-md border p-3 flex flex-wrap items-start justify-between gap-3 ${r.statut === "annule" ? "opacity-50" : ""}`} data-testid="rdv-ligne">
                    <div className="min-w-0">
                      <div className="font-medium">
                        <span className="font-mono">{heure(r.debut)}</span> · {r.client_nom}
                        <Badge variant="outline" className="ml-2">{TYPES[r.type] ?? r.type}</Badge>
                        {r.statut === "annule" && <Badge className="ml-1 bg-gray-200 text-gray-700">Annulé</Badge>}
                        {r.statut === "honore" && <Badge className="ml-1 bg-green-100 text-green-800">Fait</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {SOURCES[r.source] ?? r.source}{r.langue !== "fr" ? ` · client en ${r.langue === "ar" ? "arabe" : "anglais"}` : ""}
                        {r.devis && <> · <button className="underline" onClick={() => r.devis_id && onOuvrirDevis?.(r.devis_id)}>devis {r.devis.numero}{r.devis.titre ? ` (${r.devis.titre})` : ""}</button></>}
                      </div>
                      {r.message && <div className="text-sm mt-1 whitespace-pre-line">{r.message}</div>}
                      <div className="flex flex-wrap gap-3 text-xs mt-1">
                        {r.client_telephone && <a className="inline-flex items-center gap-1 text-primary" href={`tel:${r.client_telephone}`}><Phone className="h-3 w-3" />{r.client_telephone}</a>}
                        {r.client_telephone && <a className="inline-flex items-center gap-1 text-green-700" href={whatsapp(r.client_telephone)} target="_blank" rel="noreferrer"><MessageCircle className="h-3 w-3" />WhatsApp</a>}
                        {r.client_email && <a className="inline-flex items-center gap-1 text-primary" href={`mailto:${r.client_email}`}><Mail className="h-3 w-3" />{r.client_email}</a>}
                      </div>
                    </div>
                    {r.statut !== "annule" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8" onClick={() => honore(r)} title={r.statut === "honore" ? "Remettre à venir" : "Rendez-vous fait"}><Check className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="h-8" onClick={() => annuler(r)} data-testid="rdv-annuler"><Ban className="h-4 w-4 mr-1 text-red-600" />Annuler</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Disponibilités de la semaine */}
        <Card>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Mes disponibilités</CardTitle>
            <Button size="sm" variant="ghost" onClick={copierLundi}>Copier le lundi sur mar → sam</Button>
          </CardHeader>
          <CardContent className="space-y-3" data-testid="dispos-semaine">
            {JOURS.map((nomJour, k) => {
              const jour = k + 1;
              const liste = plages.map((p, i) => ({ p, i })).filter(({ p }) => p.jour === jour);
              return (
                <div key={jour} className="flex flex-wrap items-start gap-2 border-b pb-2 last:border-0">
                  <div className="w-24 pt-2 text-sm font-medium">{nomJour}</div>
                  <div className="flex-1 space-y-1.5 min-w-[220px]">
                    {!liste.length && <div className="pt-2 text-sm text-muted-foreground">Fermé</div>}
                    {liste.map(({ p, i }) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Input type="time" className="h-9 w-[110px]" value={p.debut} onChange={(e) => majPlage(i, "debut", e.target.value)} aria-label={`${nomJour} début`} />
                        <span className="text-muted-foreground">→</span>
                        <Input type="time" className="h-9 w-[110px]" value={p.fin} onChange={(e) => majPlage(i, "fin", e.target.value)} aria-label={`${nomJour} fin`} />
                        <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setPlages(plages.filter((_, j) => j !== i))} title="Retirer"><X className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => ajouterPlage(jour)} title={`Ajouter une plage le ${nomJour.toLowerCase()}`} data-testid={`ajouter-plage-${jour}`}><Plus className="h-4 w-4" /></Button>
                </div>
              );
            })}
            <Button onClick={enregistrerDispos} className="w-full" data-testid="enregistrer-dispos"><Save className="h-4 w-4 mr-1" /> Enregistrer mes disponibilités</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Réglages */}
          {reglages && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Réglages des rendez-vous</CardTitle>
                <label className="flex items-center gap-2 text-sm"><Switch checked={reglages.actif} onCheckedChange={(v) => setReglages({ ...reglages, actif: v })} data-testid="agenda-actif" /> {reglages.actif ? "Ouvert" : "Fermé"}</label>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Durée d'un rendez-vous (min)</Label><Input type="number" min={15} max={240} step={5} value={reglages.duree_minutes} onChange={(e) => setReglages({ ...reglages, duree_minutes: Number(e.target.value) })} data-testid="duree-rdv" /></div>
                  <div><Label className="text-xs">Pause entre deux (min)</Label><Input type="number" min={0} max={120} step={5} value={reglages.pause_minutes} onChange={(e) => setReglages({ ...reglages, pause_minutes: Number(e.target.value) })} /></div>
                  <div><Label className="text-xs">Réservable au plus tôt (heures avant)</Label><Input type="number" min={0} max={336} value={reglages.delai_heures} onChange={(e) => setReglages({ ...reglages, delai_heures: Number(e.target.value) })} /></div>
                  <div><Label className="text-xs">Jusqu'à (jours à l'avance)</Label><Input type="number" min={1} max={120} value={reglages.horizon_jours} onChange={(e) => setReglages({ ...reglages, horizon_jours: Number(e.target.value) })} /></div>
                </div>
                <div>
                  <Label className="text-xs">Types proposés au client</Label>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {Object.entries(TYPES).map(([k, v]) => (
                      <label key={k} className="flex items-center gap-1.5">
                        <input type="checkbox" checked={reglages.types.includes(k)} onChange={(e) => setReglages({ ...reglages, types: e.target.checked ? [...reglages.types, k] : reglages.types.filter((x) => x !== k) })} /> {v}
                      </label>
                    ))}
                  </div>
                </div>
                <div><Label className="text-xs">Adresse des rendez-vous à l'agence (vide = adresse de l'agence)</Label><Input value={reglages.adresse ?? ""} onChange={(e) => setReglages({ ...reglages, adresse: e.target.value })} /></div>
                <div><Label className="text-xs">Lien visio (Google Meet, Zoom…) envoyé au client — facultatif</Label><Input value={reglages.lien_visio ?? ""} placeholder="https://meet.google.com/…" onChange={(e) => setReglages({ ...reglages, lien_visio: e.target.value })} /></div>
                <Button variant="outline" onClick={enregistrerReglages} className="w-full" data-testid="enregistrer-reglages"><Save className="h-4 w-4 mr-1" /> Enregistrer les réglages</Button>
              </CardContent>
            </Card>
          )}

          {/* Jours bloqués */}
          <Card>
            <CardHeader><CardTitle className="text-base">Bloquer des jours ou des heures</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs">Du</Label><Input type="date" value={nouvelle.du} onChange={(e) => setNouvelle({ ...nouvelle, du: e.target.value })} data-testid="bloquer-du" /></div>
                <div><Label className="text-xs">Au (facultatif)</Label><Input type="date" value={nouvelle.au} min={nouvelle.du} onChange={(e) => setNouvelle({ ...nouvelle, au: e.target.value })} /></div>
              </div>
              <label className="flex items-center gap-2"><Switch checked={nouvelle.journee} onCheckedChange={(v) => setNouvelle({ ...nouvelle, journee: v })} /> Journée entière</label>
              {!nouvelle.journee && (
                <div className="grid grid-cols-2 gap-2">
                  <div><Label className="text-xs">De</Label><Input type="time" value={nouvelle.de} onChange={(e) => setNouvelle({ ...nouvelle, de: e.target.value })} /></div>
                  <div><Label className="text-xs">À</Label><Input type="time" value={nouvelle.a} onChange={(e) => setNouvelle({ ...nouvelle, a: e.target.value })} /></div>
                </div>
              )}
              <Input placeholder="Motif (ex. mariage Benali, congés) — visible par toi seule" value={nouvelle.motif} onChange={(e) => setNouvelle({ ...nouvelle, motif: e.target.value })} />
              <Button variant="outline" onClick={bloquer} className="w-full" data-testid="bloquer"><Ban className="h-4 w-4 mr-1" /> Bloquer</Button>
              {indispos.map((i) => (
                <div key={i.id} className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-2" data-testid="indispo">
                  <div><div className="capitalize">{dateHeure(i.debut)} → {dateHeure(i.fin)}</div>{i.motif && <div className="text-xs text-muted-foreground">{i.motif}</div>}</div>
                  <Button size="icon" variant="ghost" onClick={() => debloquer(i)} title="Débloquer"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendrier du téléphone */}
          <Card>
            <CardHeader><CardTitle className="text-base">Voir mes rendez-vous dans le calendrier de mon téléphone</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {!lienCal ? (
                <Button variant="outline" className="w-full" onClick={afficherLienCal} data-testid="lien-calendrier"><CalendarPlus className="h-4 w-4 mr-1" /> Ajouter à mon calendrier</Button>
              ) : (
                <>
                  <Button asChild className="w-full"><a href={`webcal://${lienCal}`}><CalendarPlus className="h-4 w-4 mr-1" /> iPhone / Mac : s'abonner en un clic</a></Button>
                  <div className="flex gap-2"><Input readOnly value={`https://${lienCal}`} className="text-xs" /><Button size="icon" variant="outline" onClick={() => copier(`https://${lienCal}`)} title="Copier"><Copy className="h-4 w-4" /></Button></div>
                  <p className="text-xs text-muted-foreground">Android / Google Agenda : sur un ordinateur, ouvre Google Agenda → « Autres agendas » → « + » → « À partir de l'URL », colle ce lien. Les nouveaux rendez-vous apparaissent tout seuls (mise à jour toutes les quelques heures par Google). Ce lien est personnel : ne le partage pas.</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
