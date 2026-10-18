import { useLocation } from "react-router-dom";

/** Numéro WhatsApp de l'agence (format international, sans + ni espaces). */
export const NUMERO_WHATSAPP = "212610939655";

/** Message prérempli selon la page visitée. */
function message(chemin: string) {
  if (chemin.startsWith("/cree-ton-evenement")) return "Bonjour Heavent, je viens de composer mon événement sur votre site et j'aimerais en parler avec vous.";
  if (chemin.startsWith("/devis-mariage")) return "Bonjour Heavent, je prépare un mariage / un événement et j'aimerais recevoir un devis.";
  if (chemin.startsWith("/devis-entreprise")) return "Bonjour Heavent, j'aimerais un devis pour des hôtesses ou un événement d'entreprise.";
  if (chemin.startsWith("/inscription-staff")) return "Bonjour Heavent, j'ai une question sur l'inscription pour travailler avec vous.";
  return "Bonjour Heavent People Agency, j'aimerais avoir des informations.";
}

const PAGES_PRIVEES = ["/admin", "/auth", "/staff-dashboard"];

/** Bouton flottant « Écrivez-nous sur WhatsApp », sur les pages publiques uniquement. */
export default function BoutonWhatsApp() {
  const { pathname } = useLocation();
  if (PAGES_PRIVEES.some((p) => pathname.startsWith(p))) return null;
  const lien = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message(pathname))}`;
  return (
    <a href={lien} target="_blank" rel="noopener noreferrer" aria-label="Écrivez-nous sur WhatsApp" data-testid="bouton-whatsapp"
      className="group fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] h-14 w-14 sm:w-auto sm:pl-4 sm:pr-5 justify-center hover:bg-[#1EBE5B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C8B560] print:hidden">
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
      <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
    </a>
  );
}
