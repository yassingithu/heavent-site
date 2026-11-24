import { useEffect, useMemo, useState } from "react";
import { Copy, Mail, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { DevisForm, Prestation } from "./devisUtils";
import { LIBELLES_MODELE, ModeleMail, OptionsMail, objetMail, optionsParDefaut, tarifsManquants, texteMail } from "@/lib/mailDevis";

async function copier(texte: string, titre: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(texte); toast({ title: titre }); return true; }
  catch { toast({ title: "Copie impossible", description: "Sélectionne le texte et copie-le à la main.", variant: "destructive" }); return false; }
}

interface Props { devis: DevisForm; catalogue: Prestation[]; tauxTva: number; devise: string; marquerEnvoye?: () => void }

export default function MailDevis({ devis, catalogue, tauxTva, devise, marquerEnvoye }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [o, setO] = useState<OptionsMail>(() => optionsParDefaut(devis));
  const [texte, setTexte] = useState("");
  const [copie, setCopie] = useState(false);
  const [parti, setParti] = useState(false);

  useEffect(() => { if (ouvert) { setO(optionsParDefaut(devis)); setParti(false); } }, [ouvert]); // eslint-disable-line react-hooks/exhaustive-deps
  const genere = useMemo(() => (ouvert ? texteMail(devis, catalogue, tauxTva, devise, o) : ""), [ouvert, devis, catalogue, tauxTva, devise, o]);
  useEffect(() => { setTexte(genere); }, [genere]);

  const retouche = ouvert && texte !== genere;
  const manquants = o.frais ? tarifsManquants(catalogue) : [];
  const objet = objetMail(devis);
  const set = <K extends keyof OptionsMail>(k: K, v: OptionsMail[K]) => {
    if (retouche && !window.confirm("Tu as retouché le texte. Changer cette option le remet à zéro. Continuer ?")) return;
    setO((x) => ({ ...x, [k]: v }));
  };

  const copierMail = async () => {
    if (await copier(texte, "Mail copié")) { setCopie(true); setParti(true); setTimeout(() => setCopie(false), 1500); }
  };
  const lienMailto = `mailto:${encodeURIComponent(devis.client_email || "")}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(texte)}`;

  const case_ = (k: "questionEquipe" | "frais" | "lien", libelle: string, aide?: string, desactive = false) => (
    <label className={`flex items-start gap-3 min-h-11 py-1.5 font-texte text-sm text-[#2A2620] ${desactive ? "opacity-50" : ""}`}>
      <input type="checkbox" checked={o[k]} disabled={desactive} onChange={(e) => set(k, e.target.checked)} data-testid={`mail-${k}`}
        className={`mt-0.5 h-[18px] w-[18px] shrink-0 appearance-none rounded-none border border-[#8C6D22] bg-[#FFFDF7] checked:border-[#141414] checked:bg-[#141414] checked:[background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.5l3 3 6-7' fill='none' stroke='%23C6AD62' stroke-width='1.6'/%3E%3C/svg%3E")] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8933F]`} />
      <span>{libelle}{aide && <span className="block text-xs text-[#6B6355]">{aide}</span>}</span>
    </label>
  );

  return (
    <Dialog open={ouvert} onOpenChange={setOuvert}>
      <DialogTrigger asChild>
        <button type="button" data-testid="mail-devis"
          className="inline-flex items-center justify-center min-h-10 px-4 rounded-md border border-input bg-background text-sm font-texte tracking-wide hover:bg-accent">
          Rédiger le mail (copier-coller)
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[92dvh] overflow-y-auto sm:rounded-none p-5 sm:p-8 gap-4">
        <DialogHeader className="text-left sm:text-left">
          <DialogTitle className="font-titre text-2xl sm:text-3xl tracking-tight text-[#141414]">Mail d'accompagnement</DialogTitle>
          <span aria-hidden className="block h-px w-14 bg-[#A8933F]" />
          <DialogDescription className="font-texte text-sm text-[#5B5446]">
            Le texte est prêt. Relis-le, ajuste-le, puis copie-le dans ton e-mail. Ce bouton n'envoie rien, et le PDF reste à joindre.
          </DialogDescription>
        </DialogHeader>

        <div role="group" aria-label="Type de mail" className="flex flex-wrap gap-y-1 border-b border-[#EADFC8]">
          {(Object.keys(LIBELLES_MODELE) as ModeleMail[]).map((m) => (
            <button key={m} type="button" onClick={() => set("modele", m)} data-testid={`mail-modele-${m}`} aria-pressed={o.modele === m}
              className={`min-h-11 px-1 mr-5 border-b-2 font-texte text-sm tracking-wide transition-colors ${o.modele === m ? "border-[#A8933F] text-[#141414] font-medium" : "border-transparent text-[#6B6355] hover:text-[#141414]"}`}>
              {LIBELLES_MODELE[m]}
            </button>
          ))}
        </div>

        <details className="border-b border-[#EADFC8] pb-2" open>
          <summary className="min-h-11 flex items-center cursor-pointer font-texte text-xs uppercase tracking-[0.2em] text-[#7A5E1B]">Réglages du mail</summary>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {case_("questionEquipe", "Demander hôtesses ou hôtes et hôtesses")}
            {case_("frais", "Rappeler les frais", "Transport, kilomètres, repas, nuit, heure supplémentaire")}
            {case_("lien", "Ajouter le lien du devis en ligne", !devis.lien_token ? "Enregistre le devis d'abord pour avoir le lien" : undefined, !devis.lien_token)}
            <label className="flex items-center gap-3 min-h-11 font-texte text-sm text-[#2A2620]">
              <span>Confirmation avant l'événement</span>
              <select className="min-h-11 rounded-none border border-[#8C6D22]/50 bg-[#FFFDF7] px-2 text-base focus-visible:outline-none focus-visible:border-[#A8933F]" value={o.delaiMois} onChange={(e) => set("delaiMois", Number(e.target.value))} data-testid="mail-delai">
                <option value={0}>aucun délai</option><option value={1}>1 mois</option><option value={2}>2 mois</option><option value={3}>3 mois</option>
              </select>
            </label>
          </div>
          {manquants.length > 0 && (
            <p className="mt-1 text-xs text-[#8A3B12]" data-testid="mail-tarifs-manquants">
              Tarif introuvable dans le catalogue pour : {manquants.join(", ")}. Un tarif par défaut est écrit dans le mail : vérifie-le.
            </p>
          )}
          <p className="mt-1 text-xs text-[#6B6355]">Changer une option ou le type réécrit le texte.</p>
        </details>

        {retouche && <p className="text-xs text-[#7A5E1B]" data-testid="mail-retouche">Tu as retouché le texte. Changer une option le remet à zéro.</p>}

        <div className="bg-[#FFFDF7] border border-[#EADFC8]">
          <div className="px-5 pt-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#7A5E1B]">Objet</div>
            <div className="flex items-center gap-3 border-b border-[#EADFC8] pb-2">
              <div className="flex-1 min-w-0 font-titre text-lg text-[#141414] truncate" data-testid="mail-objet">{objet}</div>
              <button type="button" onClick={() => copier(objet, "Objet copié")} className="shrink-0 min-h-11 px-2 font-texte text-sm text-[#7A5E1B] underline decoration-[#A8933F] underline-offset-4">Copier l'objet</button>
            </div>
          </div>
          <textarea value={texte} onChange={(e) => setTexte(e.target.value)} data-testid="mail-texte" aria-label="Texte du mail"
            className="block w-full min-h-[46vh] resize-y bg-transparent px-5 py-4 font-texte text-base leading-[1.75] focus-visible:outline-none" />
        </div>

        <div className="sticky bottom-0 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 bg-[#FAF6EC] border-t border-[#EADFC8] grid gap-2">
          <button type="button" onClick={copierMail} data-testid="mail-copier"
            className="min-h-12 w-full bg-[#141414] text-[#C6AD62] font-texte uppercase tracking-[0.18em] text-[13px] flex items-center justify-center gap-2">
            {copie ? <><Check className="h-4 w-4" /> Copié</> : <><Copy className="h-4 w-4" /> Copier le mail</>}
          </button>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <a href={lienMailto} onClick={() => setParti(true)} data-testid="mail-ouvrir" className="min-h-11 inline-flex items-center gap-1 font-texte text-sm text-[#7A5E1B] underline decoration-[#A8933F] underline-offset-4">
              <Mail className="h-4 w-4" /> Ouvrir dans Mail
            </a>
            {parti && marquerEnvoye && !devis.date_envoi && (
              <button type="button" onClick={() => { marquerEnvoye(); setOuvert(false); }} data-testid="mail-marquer-envoye" className="min-h-11 font-texte text-sm text-[#141414] underline underline-offset-4">
                Mail parti ? Marquer le devis comme envoyé
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
