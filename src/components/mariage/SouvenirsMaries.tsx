import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Photo { id: string; chemin: string; masquee: boolean }
interface Souvenir { id: string; nom: string; mot: string | null; date: string; photos: Photo[] }

const bouton = "inline-flex items-center justify-center gap-1.5 rounded-none border border-[#A8933F] px-4 min-h-11 text-xs uppercase tracking-[.12em] font-medium text-[#141414] transition hover:bg-[#141414] hover:text-[#E4D49A] disabled:opacity-50";
const carte = "rounded-none bg-white border border-[#EADFC8] shadow-[0_1px_0_#fff_inset,0_18px_40px_-34px_rgba(140,109,34,0.55)]";

/** Onglet « Souvenirs » de l'espace mariés : photos et mots déposés par les invités du jour J à J+2. */
export default function SouvenirsMaries({ token, date }: { token: string; date: string | null }) {
  const [liste, setListe] = useState<Souvenir[] | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [dl, setDl] = useState<Record<string, string>>({});
  const [urlsKo, setUrlsKo] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [voirMasquees, setVoirMasquees] = useState(false);

  const charger = useCallback(async () => {
    setErreur(false);
    const { data, error } = await (supabase as any).rpc("souvenirs_maries", { p_token: token });
    if (error) { setErreur(true); setListe([]); return; }
    setListe(data ?? []);
    if ((data ?? []).some((s: Souvenir) => s.photos.length)) {
      const r = await supabase.functions.invoke("souvenirs", { body: { token } });
      const d = r.data as any;
      setUrlsKo(!!r.error || !d?.urls);
      setUrls(d?.urls ?? {}); setDl(d?.dl ?? {});
    }
  }, [token]);
  useEffect(() => { void charger(); }, [charger]);
  const ouverte = !!date && new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" }) >= date;
  useEffect(() => { if (!ouverte) return; const i = window.setInterval(() => void charger(), 60000); return () => window.clearInterval(i); }, [ouverte, charger]);

  const masquer = async (p: Photo, masquee: boolean) => {
    setListe((l) => (l ?? []).map((s) => ({ ...s, photos: s.photos.map((x) => (x.id === p.id ? { ...x, masquee } : x)) })));
    const { error } = await (supabase as any).rpc("souvenir_masquer", { p_token: token, p_photo: p.id, p_masquee: masquee });
    if (error) void charger();
  };

  const auj = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" });
  const fin = date ? new Date(new Date(date + "T00:00:00Z").getTime() + 2 * 86400e3).toISOString().slice(0, 10) : null;
  const phase = !date ? "inconnue" : auj < date ? "avant" : auj <= (fin as string) ? "ouverte" : "fermee";
  const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });

  const toutes = (liste ?? []).flatMap((s) => s.photos);
  const nbMasquees = toutes.filter((p) => p.masquee).length;
  const avecContenu = (liste ?? []).filter((s) => s.photos.length || s.mot);

  return (
    <div className="space-y-4" data-testid="souvenirs-maries">
      <section className={`${carte} p-5`}>
        <h2 className="font-titre text-xl">Les souvenirs de vos invités</h2>
        <p className="text-sm text-[#6B6155] mt-1">
          {phase === "avant" && date && `Vos invités pourront déposer leurs photos et un petit mot à partir du jour J (${fmt(date)}).`}
          {phase === "ouverte" && date && `Le partage est ouvert jusqu'au ${fmt(fin as string)} inclus : vos invités déposent leurs photos depuis leur lien.`}
          {phase === "fermee" && "Le partage est terminé. Retrouvez ci-dessous tout ce que vos invités ont partagé. Heavent prépare votre livre souvenir : rien à faire de votre côté."}
          {phase === "inconnue" && "Renseignez la date de votre mariage pour ouvrir le partage de souvenirs."}
        </p>
        {phase !== "inconnue" && phase !== "fermee" && (
          <p className="text-xs text-[#8C6D22] mt-3">Le jour J, renvoyez à vos invités le lien de votre invitation (onglet « Mon invitation ») : après avoir retrouvé leur nom, ils y trouvent le bouton « Partager mes photos ».</p>
        )}
        <p className="text-xs text-[#6B6155] mt-3">Seules les photos que vous ne masquez pas figureront dans votre livre souvenir. Les invités ont accepté ce partage en les envoyant.</p>
      </section>

      {liste === null ? <div className="py-8 grid place-items-center"><Loader2 className="h-5 w-5 animate-spin text-[#8C6D22]" /></div>
        : erreur ? <p className="text-sm text-[#B5483C]">Impossible de charger les souvenirs. <button className="underline" onClick={() => void charger()}>Réessayer</button></p>
        : !avecContenu.length ? <p className="text-sm text-[#6B6155] px-1" data-testid="souvenirs-vide">Aucun souvenir pour l'instant.</p>
        : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <p className="text-sm text-[#4A4238]"><b className="font-titre text-3xl text-[#8C6D22] align-middle mr-1">{toutes.length - nbMasquees}</b> photo{toutes.length - nbMasquees > 1 ? "s" : ""} dans le livre · {avecContenu.length} invité{avecContenu.length > 1 ? "s" : ""}{nbMasquees > 0 && <> · {nbMasquees} retirée{nbMasquees > 1 ? "s" : ""}</>}</p>
              {nbMasquees > 0 && <button type="button" className={`${bouton} border border-[#DCCBA6] bg-white hover:bg-[#FAF7EE]`} onClick={() => setVoirMasquees((v) => !v)}>{voirMasquees ? "Cacher les photos retirées" : "Voir les photos retirées"}</button>}
            </div>
            {avecContenu.map((s) => {
              const visibles = s.photos.filter((p) => voirMasquees || !p.masquee);
              return (
                <section key={s.id} className={`${carte} p-5`} data-testid="souvenir-invite">
                  <h3 className="font-titre text-xl">{s.nom}</h3>
                  {s.mot && <p className="text-sm text-[#4A4238] italic mt-1 border-s-2 border-[#A8933F] ps-3">« {s.mot} »</p>}
                  {visibles.length > 0 && (
                    <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 list-none p-0">
                      {visibles.map((p) => (
                        <li key={p.id} className={`overflow-hidden bg-white ring-1 ring-[#EADFC8] ${p.masquee ? "opacity-60" : ""}`}>
                          <div className="aspect-square bg-[#F1ECDD]">
                            {urls[p.id] ? <a href={urls[p.id]} target="_blank" rel="noopener noreferrer"><img src={urls[p.id]} alt={`Photo de ${s.nom}`} loading="lazy" className="h-full w-full object-cover" /></a> : <div className="h-full grid place-items-center px-2 text-center text-xs text-[#6B6155]">{urlsKo ? <button type="button" className="underline" onClick={() => void charger()}>Photo indisponible · Réessayer</button> : <Loader2 className="h-4 w-4 animate-spin text-[#8C6D22]" />}</div>}
                          </div>
                          <div className="flex border-t border-[#EADFC8] text-[11px] uppercase tracking-[.12em]">
                            <button type="button" onClick={() => void masquer(p, !p.masquee)} className="flex-1 min-h-11 px-1 hover:bg-[#FAF7EE]">{p.masquee ? "Remettre" : "Retirer du livre"}</button>
                            {(dl[p.id] ?? urls[p.id]) && <a href={dl[p.id] ?? urls[p.id]} className="flex-1 min-h-11 px-1 grid place-items-center border-s border-[#EADFC8] hover:bg-[#FAF7EE]">Télécharger</a>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </>
        )}
    </div>
  );
}
