import { useEffect } from "react";
import Seo from "@/components/Seo";
import HeaventCity from "@/components/heavent-city/HeaventCity";

/** Page du jeu « Heavent City — Mission événement » (/cree-ton-evenement). En mode aperçu (/apercu/heavent-city) : non indexée. */
const HeaventCityPage = ({ apercu = false }: { apercu?: boolean }) => {
  useEffect(() => {
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = avant; };
  }, []);
  return (
    <div className="fixed inset-0 z-[80]">
      {apercu ? <Seo noindex /> : <Seo page="jeu" />}
      <HeaventCity />
    </div>
  );
};

export default HeaventCityPage;
