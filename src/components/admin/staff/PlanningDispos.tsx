import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export interface Dispo {
  id: string; staff_id: string; date_jour: string; creneau: string | null; disponible: boolean;
  heure_debut: string | null; heure_fin: string | null; notes: string | null;
}
interface Affect { staff_id: string; date_jour: string; devis: { titre: string | null; numero: string | null; client_nom: string } | null }
interface StaffMini { id: string; nom: string; prenom: string; ville: string | null }

export const CRENEAUX: Record<string, { court: string; label: string; classe: string }> = {
  matin: { court: "Matin", label: "Matin (8h-12h)", classe: "bg-yellow-100 text-yellow-900" },
  apres_midi: { court: "Après-midi", label: "Après-midi (12h-18h)", classe: "bg-orange-100 text-orange-900" },
  soir: { court: "Soir", label: "Soir (18h-22h)", classe: "bg-blue-100 text-blue-900" },
};

export const libelleDispo = (d: Dispo) =>
  d.creneau ? CRENEAUX[d.creneau]?.court ?? d.creneau : d.heure_debut && d.heure_fin ? `${d.heure_debut.slice(0, 5)}-${d.heure_fin.slice(0, 5)}` : "Journée";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const lundi = (d: Date) => { const x = new Date(d); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };

export default function PlanningDispos() {
  const [debut, setDebut] = useState(() => lundi(new Date()));
  const [nbJours, setNbJours] = useState(14);
  const [staff, setStaff] = useState<StaffMini[]>([]);
  const [dispos, setDispos] = useState<Dispo[]>([]);
  const [affects, setAffects] = useState<Affect[]>([]);
  const [seulementDispo, setSeulementDispo] = useState(true);
  const [recherche, setRecherche] = useState("");

  const jours = useMemo(() => Array.from({ length: nbJours }, (_, i) => { const d = new Date(debut); d.setDate(d.getDate() + i); return d; }), [debut, nbJours]);
  const de = iso(jours[0]), a = iso(jours[jours.length - 1]);

  const [edition, setEdition] = useState<{ staff: StaffMini; date: string } | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    (async () => {
      const [s, d, af] = await Promise.all([
        supabase.from("staff").select("id, nom, prenom, ville").eq("banni", false).order("nom"),
        supabase.from("disponibilites").select("*").gte("date_jour", de).lte("date_jour", a),
        supabase.from("affectations").select("staff_id, date_jour, devis(titre, numero, client_nom)").gte("date_jour", de).lte("date_jour", a).neq("statut", "annule"),
      ]);
      setStaff((s.data ?? []) as StaffMini[]);
      setDispos((d.data ?? []) as Dispo[]);
      setAffects((af.data ?? []) as unknown as Affect[]);
    })();
  }, [de, a, version]);

  const parCase = useMemo(() => {
    const m = new Map<string, Dispo[]>();
    dispos.forEach((d) => { const k = `${d.staff_id}|${d.date_jour}`; m.set(k, [...(m.get(k) ?? []), d]); });
    return m;
  }, [dispos]);
  const affectParCase = useMemo(() => {
    const m = new Map<string, Affect[]>();
    affects.forEach((x) => { const k = `${x.staff_id}|${x.date_jour}`; m.set(k, [...(m.get(k) ?? []), x]); });
    return m;
  }, [affects]);

  const lignes = staff.filter((s) => {
    const q = recherche.trim().toLowerCase();
    if (q && ![s.nom, s.prenom, s.ville].some((v) => String(v ?? "").toLowerCase().includes(q))) return false;
    if (!seulementDispo || q) return true;
    return jours.some((j) => (parCase.get(`${s.id}|${iso(j)}`) ?? []).some((d) => d.disponible) || affectParCase.has(`${s.id}|${iso(j)}`));
  });

  const decaler = (n: number) => setDebut((d) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; });
  const aujourdhui = iso(new Date());

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-base">Planning des disponibilités</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => decaler(-7)}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={() => setDebut(lundi(new Date()))}>Cette semaine</Button>
          <Button size="icon" variant="outline" onClick={() => decaler(7)}><ChevronRight className="h-4 w-4" /></Button>
          <Input type="date" className="w-[160px]" value={iso(debut)} onChange={(e) => e.target.value && setDebut(lundi(new Date(e.target.value + "T12:00:00")))} />
          <select className="border rounded-md h-9 px-2 text-sm bg-background" value={nbJours} onChange={(e) => setNbJours(Number(e.target.value))}>
            <option value={7}>1 semaine</option><option value={14}>2 semaines</option><option value={28}>4 semaines</option>
          </select>
          <Input className="w-[180px]" placeholder="Rechercher…" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
          <label className="flex items-center gap-2 text-sm"><Switch checked={seulementDispo} onCheckedChange={setSeulementDispo} /> Seulement les personnes disponibles</label>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.values(CRENEAUX).map((c) => <span key={c.label} className={`px-2 py-0.5 rounded ${c.classe}`}>{c.label}</span>)}
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">Horaires libres / journée</span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800">Indisponible</span>
          <span className="px-2 py-0.5 rounded bg-[#C8B560] text-white">Déjà affecté(e) à un événement</span>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1"><Pencil className="h-3 w-3" /> Clique sur une case pour corriger les disponibilités d'un crew. Pour quelqu'un qui n'a rien rempli, tape son nom dans la recherche.</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {lignes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">Aucune disponibilité sur cette période.</p>
        ) : (
          <table className="text-xs border-collapse min-w-full">
            <thead>
              <tr>
                <th className="sticky left-0 bg-background text-left p-2 border-b min-w-[150px]">Personnel</th>
                {jours.map((j) => (
                  <th key={iso(j)} className={`p-1 border-b text-center min-w-[78px] font-medium ${iso(j) === aujourdhui ? "bg-[#FAF7EE]" : ""} ${[0, 6].includes(j.getDay()) ? "text-[#A8933F]" : ""}`}>
                    {j.toLocaleDateString("fr-FR", { weekday: "short" })}<br />{j.getDate()}/{j.getMonth() + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lignes.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="sticky left-0 bg-background p-2 font-medium whitespace-nowrap">{s.prenom} {s.nom}{s.ville && <div className="text-muted-foreground font-normal">{s.ville}</div>}</td>
                  {jours.map((j) => {
                    const k = `${s.id}|${iso(j)}`;
                    const ds = parCase.get(k) ?? [];
                    const af = affectParCase.get(k) ?? [];
                    return (
                      <td key={k} className={`p-1 align-top ${iso(j) === aujourdhui ? "bg-[#FAF7EE]" : ""}`}>
                        <button type="button" title="Modifier les disponibilités de ce jour" onClick={() => setEdition({ staff: s, date: iso(j) })}
                          className="group w-full min-h-[28px] rounded hover:ring-1 hover:ring-[#C8B560] text-left flex flex-col gap-0.5 p-0.5">
                          {!ds.length && !af.length && <span className="text-muted-foreground/40 group-hover:text-[#A8933F] text-center w-full"><Plus className="h-3 w-3 inline" /></span>}
                          {af.map((x, i) => <span key={i} title={x.devis?.titre ?? ""} className="px-1 rounded bg-[#C8B560] text-white truncate">{x.devis?.numero ?? "Événement"}</span>)}
                          {ds.map((d) => (
                            <span key={d.id} title={d.notes ?? ""} className={`px-1 rounded ${!d.disponible ? "bg-red-100 text-red-800" : d.creneau ? CRENEAUX[d.creneau]?.classe : "bg-emerald-100 text-emerald-900"}`}>
                              {d.disponible ? libelleDispo(d) : "Indispo"}
                            </span>
                          ))}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
      <EditionDispoJour cible={edition} onClose={() => setEdition(null)} onSaved={() => setVersion((v) => v + 1)} />
    </Card>
  );
}

type Etat = "dispo" | "indispo" | "vide";
interface Plage { debut: string; fin: string }

/** Fenêtre de correction des disponibilités d'un crew pour un jour (avec répétition possible sur plusieurs jours). */
function EditionDispoJour({ cible, onClose, onSaved }: { cible: { staff: StaffMini; date: string } | null; onClose: () => void; onSaved: () => void }) {
  const { toast } = useToast();
  const [etats, setEtats] = useState<Record<string, Etat>>({ matin: "vide", apres_midi: "vide", soir: "vide" });
  const [plages, setPlages] = useState<Plage[]>([]);
  const [notes, setNotes] = useState("");
  const [jusquAu, setJusquAu] = useState("");
  const [joursSemaine, setJoursSemaine] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [enCours, setEnCours] = useState(false);

  useEffect(() => {
    if (!cible) return;
    setJusquAu(""); setJoursSemaine([0, 1, 2, 3, 4, 5, 6]);
    supabase.from("disponibilites").select("*").eq("staff_id", cible.staff.id).eq("date_jour", cible.date).then(({ data }) => {
      const rows = (data ?? []) as Dispo[];
      const e: Record<string, Etat> = { matin: "vide", apres_midi: "vide", soir: "vide" };
      rows.filter((r) => r.creneau).forEach((r) => { e[r.creneau!] = r.disponible ? "dispo" : "indispo"; });
      setEtats(e);
      setPlages(rows.filter((r) => !r.creneau && r.heure_debut && r.heure_fin && r.disponible).map((r) => ({ debut: r.heure_debut!.slice(0, 5), fin: r.heure_fin!.slice(0, 5) })));
      setNotes(rows.find((r) => r.notes)?.notes ?? "");
    });
  }, [cible]);

  if (!cible) return null;
  const titreJour = new Date(cible.date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const tout = (e: Etat) => { setEtats({ matin: e, apres_midi: e, soir: e }); if (e !== "dispo") setPlages([]); };

  const dates = () => {
    if (!jusquAu || jusquAu <= cible.date) return [cible.date];
    const res: string[] = []; const d = new Date(cible.date + "T12:00:00"); const f = new Date(jusquAu + "T12:00:00");
    for (let i = 0; d <= f && i < 120; i++) { if (joursSemaine.includes((d.getDay() + 6) % 7)) res.push(iso(d)); d.setDate(d.getDate() + 1); }
    return res;
  };

  const enregistrer = async () => {
    const plagesOk = plages.filter((p) => p.debut && p.fin);
    const lesDates = dates();
    if (!lesDates.length) { toast({ title: "Aucun jour sélectionné", variant: "destructive" }); return; }
    setEnCours(true);
    const note = notes.trim() || null;
    const rows = lesDates.flatMap((date) => [
      ...Object.entries(etats).filter(([, e]) => e !== "vide").map(([creneau, e]) => ({ staff_id: cible.staff.id, date_jour: date, creneau, disponible: e === "dispo", heure_debut: null, heure_fin: null, notes: note })),
      ...plagesOk.map((p) => ({ staff_id: cible.staff.id, date_jour: date, creneau: null, disponible: true, heure_debut: p.debut, heure_fin: p.fin, notes: note })),
    ]);
    const del = await supabase.from("disponibilites").delete().eq("staff_id", cible.staff.id).in("date_jour", lesDates);
    const ins = del.error || !rows.length ? { error: del.error } : await supabase.from("disponibilites").insert(rows);
    setEnCours(false);
    if (ins.error) { toast({ title: "Erreur", description: ins.error.message, variant: "destructive" }); return; }
    toast({ title: "Disponibilités enregistrées", description: `${cible.staff.prenom} ${cible.staff.nom} · ${lesDates.length} jour${lesDates.length > 1 ? "s" : ""}` });
    onSaved(); onClose();
  };

  const bouton = (creneau: string, e: Etat, texte: string, classe: string) => (
    <button type="button" onClick={() => setEtats((x) => ({ ...x, [creneau]: e }))}
      className={`px-2 py-1 rounded text-xs border ${etats[creneau] === e ? classe : "bg-background text-muted-foreground"}`}>{texte}</button>
  );
  const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-base">{cible.staff.prenom} {cible.staff.nom} — <span className="capitalize">{titreJour}</span></DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => tout("dispo")}>Disponible toute la journée</Button>
            <Button size="sm" variant="outline" onClick={() => tout("indispo")}>Indisponible</Button>
            <Button size="sm" variant="ghost" onClick={() => tout("vide")}>Tout effacer</Button>
          </div>
          <div className="space-y-2">
            {Object.entries(CRENEAUX).map(([k, c]) => (
              <div key={k} className="flex items-center justify-between gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${c.classe}`}>{c.label}</span>
                <div className="flex gap-1">
                  {bouton(k, "dispo", "Disponible", "bg-emerald-600 text-white border-emerald-600")}
                  {bouton(k, "indispo", "Indispo", "bg-red-600 text-white border-red-600")}
                  {bouton(k, "vide", "—", "bg-muted text-foreground")}
                </div>
              </div>
            ))}
          </div>
          <div>
            <Label className="text-xs">Horaires précis (ex. 16:00 → 00:00)</Label>
            <div className="space-y-2 mt-1">
              {plages.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  De <Input type="time" className="h-8 w-28" value={p.debut} onChange={(e) => setPlages((l) => l.map((x, j) => j === i ? { ...x, debut: e.target.value } : x))} />
                  à <Input type="time" className="h-8 w-28" value={p.fin} onChange={(e) => setPlages((l) => l.map((x, j) => j === i ? { ...x, fin: e.target.value } : x))} />
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setPlages((l) => l.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => setPlages((l) => [...l, { debut: "", fin: "" }])}><Plus className="h-4 w-4 mr-1" /> Ajouter des horaires</Button>
            </div>
          </div>
          <div>
            <Label className="text-xs">Note (visible dans le planning)</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="ex. confirmé par téléphone" />
          </div>
          <div className="rounded-md border border-[#ece6d3] bg-[#FAF7EE] p-3 space-y-2">
            <Label className="text-xs">Appliquer la même chose jusqu'au (optionnel)</Label>
            <Input type="date" min={cible.date} value={jusquAu} onChange={(e) => setJusquAu(e.target.value)} className="w-[170px]" />
            {jusquAu > cible.date && (
              <div className="flex items-center gap-1 text-xs">
                <span className="mr-1">Jours :</span>
                {JOURS.map((l, i) => (
                  <button key={i} type="button" onClick={() => setJoursSemaine((js) => js.includes(i) ? js.filter((x) => x !== i) : [...js, i])}
                    className={`w-7 h-7 rounded-full border ${joursSemaine.includes(i) ? "bg-[#C8B560] text-white border-[#C8B560]" : "bg-background"}`}>{l}</button>
                ))}
                <span className="ml-2 text-muted-foreground">{dates().length} jour(s)</span>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
            <Button onClick={enregistrer} disabled={enCours}>{enCours ? "Enregistrement…" : "Enregistrer"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
