import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Eraser, PenLine } from "lucide-react";
import { dateHeureFr, etatSignature, finSignature, limiteSignature } from "@/lib/signature";
import { telechargerContrats } from "@/components/admin/equipe/contratPdf";

interface Props { contrat: any | null; nomStaff: string; onClose: () => void; onSigne: () => void }

/** Lecture + signature électronique d'un contrat par le crew (doigt ou souris). */
export default function SignatureContrat({ contrat, nomStaff, onClose, onSigne }: Props) {
  const { toast } = useToast();
  const toile = useRef<HTMLCanvasElement>(null);
  const [traits, setTraits] = useState(0);
  const [nom, setNom] = useState(nomStaff);
  const [lu, setLu] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [pdf, setPdf] = useState(false);

  useEffect(() => { setNom(nomStaff); setLu(false); setTraits(0); }, [contrat, nomStaff]);

  // Zone de signature : trait noir lissé, adapté à l'écran (rétina) et au tactile.
  // Préparée au premier contact (le cadre n'existe pas encore quand la fenêtre s'ouvre).
  const dessin = useRef({ actif: false, n: 0, pret: false });
  const preparer = () => {
    const c = toile.current!; if (dessin.current.pret && c.width) return c.getContext("2d")!;
    const ratio = window.devicePixelRatio || 1;
    c.width = c.clientWidth * ratio; c.height = c.clientHeight * ratio;
    const ctx = c.getContext("2d")!; ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#141414";
    dessin.current.pret = true; return ctx;
  };
  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => { const r = e.currentTarget.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] as const; };
  const debut = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = preparer(); dessin.current.actif = true; e.currentTarget.setPointerCapture(e.pointerId);
    const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y);
  };
  const bouge = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dessin.current.actif) return; const ctx = toile.current!.getContext("2d")!;
    const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); dessin.current.n++;
  };
  const fin = () => { if (dessin.current.actif) { dessin.current.actif = false; setTraits(dessin.current.n); } };
  useEffect(() => { dessin.current = { actif: false, n: 0, pret: false }; }, [contrat]);

  const effacer = () => { const c = toile.current!; c.getContext("2d")!.clearRect(0, 0, c.width, c.height); dessin.current.n = 0; setTraits(0); };

  const lirePdf = async () => {
    setPdf(true);
    try { await telechargerContrats([contrat.id]); } catch { toast({ title: "PDF non créé", variant: "destructive" }); } finally { setPdf(false); }
  };

  const signer = async () => {
    if (!lu) { toast({ title: "Coche « J'ai lu et j'accepte »", variant: "destructive" }); return; }
    if (traits < 15) { toast({ title: "Dessine ta signature dans le cadre", variant: "destructive" }); return; }
    setEnCours(true);
    const image = toile.current!.toDataURL("image/png");
    const { data, error } = await supabase.functions.invoke("signer-contrat", { body: { contratId: contrat.id, nom, image, accepte: lu } });
    let message = data?.error as string | undefined;
    if (error && !message) { try { message = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnCours(false);
    if (error || data?.error) { toast({ title: "Signature non enregistrée", description: message ?? "Réessaie dans un instant.", variant: "destructive" }); return; }
    toast({ title: "Contrat signé ✍️", description: "Merci ! L'agence a été prévenue." });
    onSigne(); onClose();
  };

  if (!contrat) return null;
  const dates = (Array.isArray(contrat.dates) ? contrat.dates : []) as any[];
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Signer mon contrat</DialogTitle></DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="rounded-md border border-[#ece6d3] bg-[#FAF7EE] p-3 space-y-1">
            <div className="font-semibold">{contrat.evenement || contrat.titre}</div>
            <div className="text-muted-foreground">{contrat.titre}{contrat.lieu ? ` · ${contrat.lieu}` : ""}</div>
            {dates.map((d) => (
              <div key={d.date}>{new Date(d.date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                {d.heure_debut && d.heure_fin ? ` · ${d.heure_debut.slice(0, 5)} – ${d.heure_fin.slice(0, 5)}` : ""} · {d.heures} h</div>
            ))}
            <div className="font-medium pt-1">{contrat.total_heures} h × {contrat.taux_horaire} MAD = {contrat.salaire_brut} MAD brut</div>
            <div className="text-xs text-amber-800">{etatSignature(contrat) === "en_retard"
              ? `En retard — encore signable jusqu'au ${dateHeureFr(finSignature(contrat))}`
              : `À signer avant le ${dateHeureFr(limiteSignature(contrat))} (24 h avant la mission)`}</div>
          </div>
          <Button variant="outline" size="sm" onClick={lirePdf} disabled={pdf}><Download className="h-4 w-4 mr-1" /> {pdf ? "Création…" : "Lire le contrat complet (PDF)"}</Button>
          <label className="flex items-start gap-2">
            <Checkbox checked={lu} onCheckedChange={(v) => setLu(!!v)} className="mt-0.5" />
            <span>J'ai lu le contrat et ses conditions, et je les accepte.</span>
          </label>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Nom complet</div>
            <Input value={nom} onChange={(e) => setNom(e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><PenLine className="h-3 w-3" /> Signe avec ton doigt ou la souris</span>
              <Button variant="ghost" size="sm" onClick={effacer}><Eraser className="h-4 w-4 mr-1" /> Effacer</Button>
            </div>
            <canvas ref={toile} data-testid="zone-signature" onPointerDown={debut} onPointerMove={bouge} onPointerUp={fin} onPointerLeave={fin} onPointerCancel={fin} className="w-full h-40 rounded-md border-2 border-dashed border-[#cfc6a8] bg-white touch-none cursor-crosshair" />
          </div>
          <p className="text-xs text-muted-foreground">En signant, tu donnes ton accord à ce contrat. La date, l'heure et l'appareil utilisé sont enregistrés comme preuve de ta signature.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Plus tard</Button>
            <Button onClick={signer} disabled={enCours}>{enCours ? "Signature…" : "Signer le contrat"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
