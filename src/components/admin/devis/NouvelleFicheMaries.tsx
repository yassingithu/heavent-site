import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, Copy, Heart, MessageCircle } from "lucide-react";
import { lienWa } from "@/lib/whatsapp";

const champ = "w-full rounded-md border bg-background px-3 min-h-11 text-base";

/** Ouvre l'espace des mariés en 4 champs, sans passer par un devis complet : la fiche est rattachée à un devis « accepté » à 0 DH créé en arrière-plan. */
export default function NouvelleFicheMaries() {
  const [ouvert, setOuvert] = useState(false);
  const [noms, setNoms] = useState(""); const [date, setDate] = useState(""); const [lieu, setLieu] = useState(""); const [tel, setTel] = useState("");
  const [occupe, setOccupe] = useState(false); const [erreur, setErreur] = useState("");
  const [cree, setCree] = useState<{ lien: string; noms: string; tel: string } | null>(null);
  const [copie, setCopie] = useState(false);

  const creer = async (e: React.FormEvent) => {
    e.preventDefault(); setErreur("");
    if (!noms.trim()) { setErreur("Indiquez les noms des mariés."); return; }
    setOccupe(true);
    const { data, error } = await (supabase as any).from("devis").insert({
      type: "mariage", statut: "accepte", client_nom: noms.trim(), client_telephone: tel.trim() || null, date_evenement: date || null, lieu: lieu.trim() || null,
      titre: `Fiche mariés ${noms.trim()}`, notes_internes: "Fiche mariés créée à la main (sans devis chiffré).",
    }).select("lien_token").single();
    setOccupe(false);
    if (error || !data) { setErreur("La fiche n'a pas pu être créée. Réessayez."); return; }
    setCree({ lien: `https://heaventagency.com/mon-mariage/${data.lien_token}`, noms: noms.trim(), tel: tel.trim() });
    setNoms(""); setDate(""); setLieu(""); setTel("");
  };
  const copier = async () => { if (!cree) return; try { await navigator.clipboard.writeText(cree.lien); setCopie(true); setTimeout(() => setCopie(false), 1500); } catch { window.prompt("Lien à copier :", cree.lien); } };

  return (
    <section className="rounded-lg border p-4 space-y-3" data-testid="nouvelle-fiche-maries">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-medium flex items-center gap-2"><Heart className="h-4 w-4 text-[#A8933F]" /> Fiche mariés</h3>
          <p className="text-xs text-muted-foreground">Ouvre l'espace des mariés (invités, programme, souvenirs) en quelques secondes, sans devis.</p>
        </div>
        <button type="button" onClick={() => { setOuvert((v) => !v); setCree(null); }} className="rounded-full bg-[#141414] text-[#FBF6E9] border border-[#A8933F] px-4 min-h-11 text-sm font-medium" data-testid="fiche-ouvrir">{ouvert ? "Fermer" : "Nouvelle fiche mariés"}</button>
      </div>
      {ouvert && !cree && (
        <form onSubmit={creer} className="grid gap-2 sm:grid-cols-2">
          <input value={noms} onChange={(e) => setNoms(e.target.value)} placeholder="Noms des mariés (ex. Sara & Omar)" aria-label="Noms des mariés" className={`${champ} sm:col-span-2`} data-testid="fiche-noms" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date du mariage" className={champ} data-testid="fiche-date" />
          <input value={lieu} onChange={(e) => setLieu(e.target.value)} placeholder="Lieu (facultatif)" aria-label="Lieu" className={champ} />
          <input type="tel" inputMode="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="WhatsApp des mariés (+32… si étranger)" aria-label="WhatsApp des mariés" className={`${champ} sm:col-span-2`} data-testid="fiche-tel" />
          {erreur && <p role="alert" className="text-sm text-[#B5483C] sm:col-span-2">{erreur}</p>}
          <button disabled={occupe} className="rounded-full bg-[#141414] text-[#FBF6E9] border border-[#A8933F] px-4 min-h-11 text-sm font-medium disabled:opacity-60 sm:col-span-2" data-testid="fiche-creer">{occupe ? "Création…" : "Créer la fiche"}</button>
        </form>
      )}
      {cree && (
        <div className="rounded-md bg-muted/40 p-3 space-y-2" data-testid="fiche-creee">
          <p className="text-sm font-medium">Fiche créée pour {cree.noms}. Envoie-leur ce lien :</p>
          <input readOnly value={cree.lien} onFocus={(e) => e.currentTarget.select()} aria-label="Lien de l'espace mariés" className="w-full rounded-md border bg-background px-2 py-2 text-sm" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void copier()} className="inline-flex items-center gap-1.5 rounded-full border px-4 min-h-11 text-sm">{copie ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copie ? "Copié" : "Copier le lien"}</button>
            <a href={lienWa(`Bonjour ${cree.noms}, voici votre espace mariés Heavent : invités, programme du jour J et souvenirs.\n${cree.lien}`, cree.tel)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-[#FBF6E9] border border-[#A8933F] px-4 min-h-11 text-sm font-medium"><MessageCircle className="h-4 w-4" /> Envoyer sur WhatsApp</a>
          </div>
          <p className="text-xs text-muted-foreground">La fiche apparaît aussi dans la liste des devis (montant 0 DH, statut accepté) : tu peux y ajouter un vrai devis plus tard.</p>
        </div>
      )}
    </section>
  );
}
