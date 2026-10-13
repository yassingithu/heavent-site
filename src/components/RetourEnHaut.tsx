import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** À chaque changement de page, revient en haut (sinon sur smartphone on reste en bas de la page précédente). */
export default function RetourEnHaut() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}
