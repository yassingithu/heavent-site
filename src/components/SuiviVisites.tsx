import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { nomDuClic, suivre } from "@/lib/suivi";

/** Compte les pages vues et les clics importants (voir src/lib/suivi.ts). */
export default function SuiviVisites() {
  const { pathname } = useLocation();
  useEffect(() => { suivre("vue", null, pathname); }, [pathname]);
  useEffect(() => {
    const clic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const nom = nomDuClic(a as HTMLAnchorElement);
      if (nom) suivre("clic", nom);
    };
    document.addEventListener("click", clic, true);
    return () => document.removeEventListener("click", clic, true);
  }, []);
  return null;
}
