/**
 * Choisit le rendu de la scène : 3D par défaut, ou SVG avec ?3d=0.
 * Repli automatique sur le SVG : pas de WebGL, appareil faible, tables « conférence », chargement ou rendu en échec.
 */
import { lazy, Suspense, useState } from "react";
import { SceneSvg, type SceneProps } from "./Scene";

const Scene3D = lazy(() => import("./Scene3D"));

function veut3D(p: SceneProps): boolean {
  try {
    if (new URLSearchParams(location.search).get("3d") === "0") return false; // ?3d=0 force l'ancien rendu SVG
    if (p.r.tables === "conference" || p.final) return false; // pas encore en 3D : on garde le SVG
    const nav = navigator as Navigator & { deviceMemory?: number };
    if ((nav.deviceMemory ?? 4) < 2 || (navigator.hardwareConcurrency ?? 4) < 2) return false;
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

export function SceneChoix(p: SceneProps & { reduit?: boolean }) {
  const [essai] = useState(() => veut3D(p));
  const [etat, setEtat] = useState<"charge" | "pret" | "fini" | "echec">("charge");
  const en3d = essai && etat !== "echec" && p.r.tables !== "conference";
  if (!en3d) return <SceneSvg {...p} />;
  return (
    <>
      {etat !== "fini" && <SceneSvg {...p} />}
      <Suspense fallback={null}>
        <Scene3D {...p} reduit={!!p.reduit} onPret={() => setEtat(p.reduit ? "fini" : "pret")} visible={etat === "pret" || etat === "fini"} onFondu={() => setEtat("fini")} onEchec={() => setEtat("echec")} />
      </Suspense>
    </>
  );
}
