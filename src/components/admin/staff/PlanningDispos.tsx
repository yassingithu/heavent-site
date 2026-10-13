import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  }, [de, a]);

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
    if (!seulementDispo) return true;
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
                        <div className="flex flex-col gap-0.5">
                          {af.map((x, i) => <span key={i} title={x.devis?.titre ?? ""} className="px-1 rounded bg-[#C8B560] text-white truncate">{x.devis?.numero ?? "Événement"}</span>)}
                          {ds.map((d) => (
                            <span key={d.id} title={d.notes ?? ""} className={`px-1 rounded ${!d.disponible ? "bg-red-100 text-red-800" : d.creneau ? CRENEAUX[d.creneau]?.classe : "bg-emerald-100 text-emerald-900"}`}>
                              {d.disponible ? libelleDispo(d) : "Indispo"}
                            </span>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
