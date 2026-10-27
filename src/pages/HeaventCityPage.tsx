import { useEffect } from "react";
import Seo from "@/components/Seo";
import HeaventCity from "@/components/heavent-city/HeaventCity";

/** Prévisualisation isolée du nouveau jeu « Heavent City — Mission événement ». Non indexée, absente du menu et du plan du site. */
const HeaventCityPage = () => {
  useEffect(() => {
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = avant; };
  }, []);
  return (
    <div className="fixed inset-0 z-[80]">
      <Seo noindex />
      <HeaventCity />
    </div>
  );
};

export default HeaventCityPage;
