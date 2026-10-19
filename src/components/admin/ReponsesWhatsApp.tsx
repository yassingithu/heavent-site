import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, MessageCircle, Send } from "lucide-react";

/** Réponses WhatsApp toutes prêtes (modifiables avant l'envoi), ouvertes directement dans la conversation du client. */
export interface ContexteClient {
  telephone?: string | null;
  prenom?: string | null;
  evenement?: string | null;   // « votre mariage », « votre séminaire »…
  date?: string | null;        // déjà formatée
  lienDevis?: string | null;
}

let signatureCache: Promise<string> | null = null;
const signature = () => (signatureCache ??= (supabase as any).rpc("mon_accueil")
  .then(({ data }: any) => (data?.prenom ? `${data.prenom} — Heavent People Agency` : "L'équipe Heavent People Agency"))
  .catch(() => "L'équipe Heavent People Agency"));

export const numeroWhatsApp = (tel?: string | null) => {
  let n = String(tel ?? "").replace(/\D/g, "");
  if (n.startsWith("00")) n = n.slice(2);
  else if (n.startsWith("0")) n = "212" + n.slice(1);
  return n.length >= 9 ? n : "";
};

function modeles(c: ContexteClient, sig: string) {
  const bonjour = `Bonjour${c.prenom ? ` ${c.prenom}` : ""},`;
  const evt = c.evenement || "votre événement";
  const date = c.date ? ` du ${c.date}` : "";
  return [
    { titre: "Bien reçu 🙏", texte: `${bonjour}\n\nMerci beaucoup pour votre demande pour ${evt}${date} ! Je l'étudie avec attention et je vous envoie votre devis très rapidement.\n\n${sig}` },
    { titre: "Votre devis est prêt 📄", texte: `${bonjour}\n\nVotre devis pour ${evt}${date} est prêt${c.lienDevis ? ` : vous pouvez le consulter et le signer en ligne ici 👉 ${c.lienDevis}` : " et vient de vous être envoyé par e-mail"}.\n\nJe reste disponible pour toute question ou ajustement.\n\n${sig}` },
    { titre: "Proposer un appel 📞", texte: `${bonjour}\n\nPour bien préparer ${evt}${date}, je vous propose un court appel de 10 minutes afin de valider ensemble vos envies et les détails. Quel moment vous arrangerait ?\n\n${sig}` },
    { titre: "Petite relance 🙂", texte: `${bonjour}\n\nJe me permets de revenir vers vous au sujet du devis pour ${evt}${date}. Avez-vous pu le consulter ? Si vous souhaitez modifier quelque chose, je l'adapte avec plaisir.\n\n${sig}` },
    { titre: "Date confirmée ✅", texte: `${bonjour}\n\nC'est confirmé : nous serons à vos côtés pour ${evt}${date} ! Merci pour votre confiance. Je reviens vers vous quelques jours avant pour caler les derniers détails.\n\n${sig}` },
    { titre: "Merci après l'événement 💛", texte: `${bonjour}\n\nUn immense merci de nous avoir fait confiance pour ${evt}. Ce fut un plaisir de partager ce moment avec vous ! Si vous avez une minute, votre avis nous aiderait énormément.\n\nÀ très bientôt,\n${sig}` },
    { titre: "Date indisponible 😔", texte: `${bonjour}\n\nMerci pour votre demande pour ${evt}${date}. Malheureusement, nous sommes déjà complets à cette date. Si vous avez une date alternative, je serais ravie de vous proposer un devis.\n\n${sig}` },
  ];
}

export default function ReponsesWhatsApp({ contexte, compact = false }: { contexte: ContexteClient; compact?: boolean }) {
  const [sig, setSig] = useState("L'équipe Heavent People Agency");
  const [texte, setTexte] = useState<string | null>(null);
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => { signature().then(setSig); }, []);
  const numero = numeroWhatsApp(contexte.telephone);
  if (!numero) return null;
  const envoyer = () => { window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texte ?? "")}`, "_blank", "noopener"); setOuvert(false); setTexte(null); };

  return (
    <Popover open={ouvert} onOpenChange={(o) => { setOuvert(o); if (!o) setTexte(null); }}>
      <PopoverTrigger asChild>
        <button type="button" onClick={(e) => e.stopPropagation()} data-testid="reponses-whatsapp"
          className={`inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 text-green-800 hover:bg-green-100 text-sm ${compact ? "h-9 px-2.5" : "h-10 px-3"}`}>
          <MessageCircle className="h-4 w-4" /> {compact ? "WhatsApp" : "Répondre sur WhatsApp"}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(92vw,380px)] p-0" onClick={(e) => e.stopPropagation()}>
        {texte === null ? (
          <div className="py-1" data-testid="modeles-whatsapp">
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">Réponses prêtes</div>
            {modeles(contexte, sig).map((m) => (
              <button key={m.titre} onClick={() => setTexte(m.texte)} className="block w-full text-left px-3 py-2 text-sm hover:bg-muted">{m.titre}</button>
            ))}
          </div>
        ) : (
          <div className="p-3 space-y-2">
            <button onClick={() => setTexte(null)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="h-3.5 w-3.5" /> Autres réponses</button>
            <textarea value={texte} onChange={(e) => setTexte(e.target.value)} rows={9} className="w-full rounded-md border p-2 text-sm leading-relaxed" data-testid="texte-whatsapp" />
            <button onClick={envoyer} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-green-600 text-white h-10 text-sm hover:bg-green-700" data-testid="ouvrir-whatsapp">
              <Send className="h-4 w-4" /> Ouvrir dans WhatsApp
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
