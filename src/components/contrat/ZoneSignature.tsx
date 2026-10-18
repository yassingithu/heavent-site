import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, PenLine } from "lucide-react";

export interface ZoneSignatureRef { image: () => string; effacer: () => void }

/**
 * Cadre où l'on signe au doigt ou à la souris (trait noir, net sur écran rétina).
 * Le cadre est préparé au premier contact : dans une fenêtre qui s'ouvre, il n'a pas encore sa taille.
 */
const ZoneSignature = forwardRef<ZoneSignatureRef, { onTraits: (n: number) => void; testId?: string; hauteur?: string; consigne?: string }>(
  ({ onTraits, testId = "zone-signature", hauteur = "h-40", consigne = "Signe avec ton doigt ou la souris" }, ref) => {
    const toile = useRef<HTMLCanvasElement>(null);
    const etat = useRef({ actif: false, n: 0, pret: false });

    const preparer = () => {
      const c = toile.current!; if (etat.current.pret && c.width) return c.getContext("2d")!;
      const ratio = window.devicePixelRatio || 1;
      c.width = c.clientWidth * ratio; c.height = c.clientHeight * ratio;
      const ctx = c.getContext("2d")!; ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#141414";
      etat.current.pret = true; return ctx;
    };
    const pos = (e: React.PointerEvent<HTMLCanvasElement>) => { const r = e.currentTarget.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] as const; };
    const debut = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const ctx = preparer(); etat.current.actif = true; e.currentTarget.setPointerCapture(e.pointerId);
      const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y);
    };
    const bouge = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!etat.current.actif) return; const ctx = toile.current!.getContext("2d")!;
      const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); etat.current.n++;
    };
    const fin = () => { if (etat.current.actif) { etat.current.actif = false; onTraits(etat.current.n); } };
    const effacer = () => {
      const c = toile.current; if (c) c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
      etat.current.n = 0; onTraits(0);
    };
    useImperativeHandle(ref, () => ({ image: () => toile.current!.toDataURL("image/png"), effacer }));

    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground flex items-center gap-1"><PenLine className="h-3 w-3" /> {consigne}</span>
          <Button type="button" variant="ghost" size="sm" onClick={effacer}><Eraser className="h-4 w-4 mr-1" /> Effacer</Button>
        </div>
        <canvas ref={toile} data-testid={testId} onPointerDown={debut} onPointerMove={bouge} onPointerUp={fin} onPointerLeave={fin} onPointerCancel={fin}
          className={`w-full ${hauteur} rounded-md border-2 border-dashed border-[#cfc6a8] bg-white touch-none cursor-crosshair`} />
      </div>
    );
  });
ZoneSignature.displayName = "ZoneSignature";
export default ZoneSignature;
