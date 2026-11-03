import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRef } from "react";
import QRCode from "qrcode";
import { Loader2 } from "lucide-react";

interface Photo { id: string; chemin: string; masquee: boolean }
interface Souvenir { id: string; nom: string; mot: string | null; date: string; photos: Photo[] }

const bouton = "inline-flex items-center justify-center gap-1.5 rounded-none border border-[#A8933F] px-4 min-h-11 text-xs uppercase tracking-[.12em] font-medium text-[#141414] transition hover:bg-[#141414] hover:text-[#E4D49A] disabled:opacity-50";
const carte_ = "rounded-none bg-white border border-[#EADFC8] shadow-[0_1px_0_#fff_inset,0_18px_40px_-34px_rgba(140,109,34,0.55)]";

/** Onglet « Souvenirs » de l'espace mariés : photos et mots déposés par les invités du jour J à J+2. */
function JourJ({ token, noms, date }: { token: string; noms: string; date: string | null }) {
  const lien = `${typeof window !== "undefined" ? window.location.origin : "https://heaventagency.com"}/souvenirs/mariage/${token}`;
  const [qr, setQr] = useState("");
  const [copie, setCopie] = useState(false);
  const [voirMsg, setVoirMsg] = useState(false);
  const [ko, setKo] = useState(false);
  const [prep, setPrep] = useState(false);
  const [pret, setPret] = useState(false);
  const debut = date ? new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }) : null;
  const fin = date ? new Date(new Date(date + "T00:00:00Z").getTime() + 2 * 86400e3).toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }) : null;
  const message = `${noms} vous remercient d'être là !

Gardez un souvenir de cette journée : ajoutez vos plus belles photos et un petit mot pour les mariés${debut && fin ? ` (du ${debut} au ${fin})` : ""}.
Ouvrez ce lien, tapez votre prénom et votre nom :
${lien}`;
  useEffect(() => { QRCode.toDataURL(lien, { margin: 1, width: 640, color: { dark: "#141414", light: "#FFFFFF" } }).then(setQr).catch(() => setKo(true)); }, [lien]);
  const copier = async () => { try { await navigator.clipboard.writeText(message); setCopie(true); setTimeout(() => setCopie(false), 1500); } catch { setVoirMsg(true); } };

  const carte = async () => {
    setPrep(true); setKo(false);
    try {
      const W = 1240, H = 1754, c = document.createElement("canvas"); c.width = W; c.height = H;
      const x = c.getContext("2d")!;
      try { await Promise.all([document.fonts.load("92px Gloock"), document.fonts.load("400 34px Jost"), document.fonts.load("500 48px Jost")]); } catch { /* polices indisponibles : serif par défaut */ }
      const fond = x.createRadialGradient(W / 2, H * 0.55, 80, W / 2, H * 0.55, H * 0.8); fond.addColorStop(0, "#FDF9EE"); fond.addColorStop(1, "#F4EFE3");
      x.fillStyle = fond; x.fillRect(0, 0, W, H);
      // double filet, coins taillés
      const coupe = (m: number, ep: number) => { x.lineWidth = ep; x.beginPath(); x.moveTo(m + 36, m); x.lineTo(W - m - 36, m); x.lineTo(W - m, m + 36); x.lineTo(W - m, H - m - 36); x.lineTo(W - m - 36, H - m); x.lineTo(m + 36, H - m); x.lineTo(m, H - m - 36); x.lineTo(m, m + 36); x.closePath(); x.stroke(); };
      x.strokeStyle = "#A8933F"; coupe(60, 3); coupe(80, 1);
      x.textAlign = "center";
      const espace = (txt: string, px: number) => txt.split("").join(String.fromCharCode(8202).repeat(Math.max(1, Math.round(px / 4))));
      x.fillStyle = "#7A5E1A"; x.font = "400 30px Jost, sans-serif"; x.fillText(espace("SOUVENIRS DU MARIAGE", 18), W / 2, 230);
      // noms (réduits si longs)
      const grand = noms.length > 26;
      x.fillStyle = "#141414"; x.font = `${grand ? 74 : 92}px Gloock, Georgia, serif`;
      const pas = grand ? 92 : 112; let ligne = "", y = 380; const lignes: string[] = [];
      for (const m of noms.split(" ")) { const t = ligne ? `${ligne} ${m}` : m; if (x.measureText(t).width > W - 300 && ligne) { lignes.push(ligne); ligne = m; } else ligne = t; }
      lignes.push(ligne); for (const l of lignes) { x.fillText(l, W / 2, y); y += pas; }
      if (date) { x.fillStyle = "#7A5E1A"; x.font = "52px Gloock, Georgia, serif"; x.fillText(new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }), W / 2, y - 10); y += 70; }
      // filet orné
      x.fillStyle = "#A8933F"; x.fillRect(W / 2 - 150, y - 30, 120, 2); x.fillRect(W / 2 + 30, y - 30, 120, 2);
      x.beginPath(); x.moveTo(W / 2, y - 42); x.lineTo(W / 2 + 12, y - 29); x.lineTo(W / 2, y - 16); x.lineTo(W / 2 - 12, y - 29); x.closePath(); x.fill();
      x.fillStyle = "#2A2420"; x.font = "400 44px Jost, sans-serif"; x.fillText("Partagez vos photos de la soirée", W / 2, y + 50);
      const img = new Image(); await new Promise<void>((ok, no) => { img.onload = () => ok(); img.onerror = () => no(); img.src = qr; });
      const t = 620, qx = (W - t) / 2, qy = y + 100;
      x.fillStyle = "#fff"; x.fillRect(qx - 30, qy - 30, t + 60, t + 60); x.strokeStyle = "#A8933F"; x.lineWidth = 2; x.strokeRect(qx - 30, qy - 30, t + 60, t + 60); x.drawImage(img, qx, qy, t, t);
      const bas = qy + t + 100;
      x.fillStyle = "#141414"; x.font = "500 48px Jost, sans-serif"; x.fillText("Scannez avec l'appareil photo", W / 2, bas);
      x.fillStyle = "#4A4238"; x.font = "400 38px Jost, sans-serif"; x.fillText("Tapez votre prénom et votre nom, puis ajoutez", W / 2, bas + 60); x.fillText(`vos photos${fin ? ` · jusqu'au ${fin}` : ""}`, W / 2, bas + 108);
      x.fillStyle = "#7A5E1A"; x.font = "500 22px Jost, sans-serif"; x.fillText(espace("HEAVENT PEOPLE AGENCY", 10), W / 2, H - 170);
      x.fillStyle = "#4A4238"; x.font = "400 30px Jost, sans-serif"; x.fillText(lien.replace(/^https?:\/\//, ""), W / 2, H - 125);
      const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/png"));
      if (!blob) throw new Error("png");
      const nom = `carte-souvenirs-${noms.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "mariage"}.png`;
      const fichier = new File([blob], nom, { type: "image/png" });
      if (typeof navigator !== "undefined" && (navigator as any).canShare?.({ files: [fichier] })) { try { await (navigator as any).share({ files: [fichier], title: "Carte souvenirs" }); setPret(true); setPrep(false); return; } catch (e: any) { if (e?.name === "AbortError") { setPrep(false); return; } } }
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nom; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      setPret(true);
    } catch { setKo(true); }
    setPrep(false);
  };

  const btnOr = "inline-flex items-center justify-center gap-1.5 rounded-none border border-[#A8933F] bg-[#E4D49A] text-[#141414] px-4 min-h-12 text-xs uppercase tracking-[.12em] font-medium w-full sm:w-auto transition hover:bg-white disabled:opacity-60";
  const btnClair = "inline-flex items-center justify-center gap-1.5 rounded-none border border-[#A8933F] text-[#E4D49A] px-4 min-h-12 text-xs uppercase tracking-[.12em] font-medium w-full sm:w-auto transition hover:bg-[#E4D49A] hover:text-[#141414]";
  return (
    <section className="bg-[#141414] text-[#EADFC8] p-5 sm:p-6 space-y-5 outline outline-1 outline-[#A8933F]/60 -outline-offset-[8px]" data-testid="jour-j">
      <div className="px-1">
        <h2 className="font-titre text-2xl sm:text-3xl text-[#E4D49A]">Le jour J : faites-les participer</h2>
        <p className="text-sm mt-1">Un seul lien et un QR code pour tous : l'invité tape son prénom et son nom, puis dépose ses photos.</p>
      </div>
      <div className="grid sm:grid-cols-[200px_1fr] gap-5 items-start px-1">
        <div className="bg-white p-2 w-[200px] max-w-full mx-auto sm:mx-0">{qr ? <img src={qr} alt="QR code pour partager ses photos" className="w-full h-auto" /> : <div className="aspect-square grid place-items-center"><Loader2 className="h-4 w-4 animate-spin text-[#8C6D22]" /></div>}</div>
        <div className="space-y-3 min-w-0">
          <a className={btnOr} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(message)}`} data-testid="whatsapp-jour-j">Envoyer sur WhatsApp</a>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={btnClair} onClick={() => void copier()}>{copie ? "Message copié" : "Copier le message"}</button>
            <button type="button" className={btnClair} onClick={() => setVoirMsg((v) => !v)} aria-expanded={voirMsg}>{voirMsg ? "Masquer le message" : "Voir le message"}</button>
          </div>
          {voirMsg && <textarea readOnly value={message} rows={7} className="w-full border border-[#A8933F]/60 bg-[#1C1A16] text-[#EADFC8] p-3 text-base" aria-label="Message à envoyer à vos invités" onFocus={(e) => e.currentTarget.select()} data-testid="message-jour-j" />}
          <div className="pt-2 border-t border-[#A8933F]/30">
            <button type="button" className={btnClair} onClick={() => void carte()} disabled={!qr || prep} data-testid="carte-qr">{prep ? "Préparation…" : pret ? "Carte prête · la refaire" : "Enregistrer la carte (à imprimer)"}</button>
            <p className="text-xs mt-2">Image prête à imprimer (A5 ou A6) avec le QR code : à poser sur chaque table.</p>
          </div>
          {ko && <p className="text-xs text-[#F0B4AA]" role="alert">Un élément n'a pas pu être préparé. Réessayez dans un instant.</p>}
        </div>
      </div>
    </section>
  );
}

export default function SouvenirsMaries({ token, date, noms }: { token: string; date: string | null; noms: string }) {
  const [liste, setListe] = useState<Souvenir[] | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [dl, setDl] = useState<Record<string, string>>({});
  const [urlsKo, setUrlsKo] = useState(false);
  const [livre, setLivre] = useState<{ disponible: boolean; nb_photos?: number; taille_mo?: number | null } | null>(null);
  const [livreEnCours, setLivreEnCours] = useState(false);
  const [livreKo, setLivreKo] = useState(false);
  useEffect(() => { (async () => { const { data } = await (supabase as any).rpc("souvenir_livre", { p_token: token }); setLivre(data ?? null); })(); }, [token]);
  const telechargerLivre = async () => {
    setLivreEnCours(true); setLivreKo(false);
    const r = await supabase.functions.invoke("souvenirs", { body: { token, livre: true } });
    const url = (r.data as any)?.url;
    if (url) window.location.href = url; else setLivreKo(true);
    setLivreEnCours(false);
  };
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
      <section className={`${carte_} p-5`}>
        <h2 className="font-titre text-xl">Les souvenirs de vos invités</h2>
        <p className="text-sm text-[#6B6155] mt-1">
          {phase === "avant" && date && `Vos invités pourront déposer leurs photos et un petit mot à partir du jour J (${fmt(date)}).`}
          {phase === "ouverte" && date && `Le partage est ouvert jusqu'au ${fmt(fin as string)} inclus : vos invités déposent leurs photos depuis leur lien.`}
          {phase === "fermee" && "Le partage est terminé. Retrouvez ci-dessous tout ce que vos invités ont partagé. Heavent prépare votre livre souvenir : rien à faire de votre côté."}
          {phase === "inconnue" && "Renseignez la date de votre mariage pour ouvrir le partage de souvenirs."}
        </p>
        <p className="text-xs text-[#6B6155] mt-3">Seules les photos que vous ne masquez pas figureront dans votre livre souvenir. Les invités ont accepté ce partage en les envoyant.</p>
      </section>

      {phase === "inconnue" ? <p className="text-sm text-[#6B6155] px-1">Renseignez la date de votre mariage pour préparer le QR code et le message du jour J.</p> : phase !== "fermee" && <JourJ token={token} noms={noms} date={date} />}
      {livre?.disponible && (
        <section className={`${carte_} p-5 border-[#C8B560]`} data-testid="livre-pret">
          <h2 className="font-titre text-xl">Votre livre souvenir est prêt</h2>
          <p className="text-sm text-[#6B6155] mt-1">{livre.nb_photos} photo{(livre.nb_photos ?? 0) > 1 ? "s" : ""} et les mots de vos invités, dans un livre qui s'ouvre sans internet. Gardez-le précieusement : il n'est conservé en ligne qu'un an. Si vous retirez une photo après l'avoir téléchargé, prévenez-nous pour que nous le refassions.</p>
          <button type="button" className={`${bouton} mt-3`} onClick={() => void telechargerLivre()} disabled={livreEnCours} data-testid="telecharger-livre">{livreEnCours ? "Préparation du lien…" : `Télécharger le livre${livre.taille_mo ? ` (${livre.taille_mo} Mo)` : ""}`}</button>
          {livreKo && <p className="text-xs text-[#B5483C] mt-2" role="alert">Le téléchargement n'a pas démarré. Réessayez dans un instant.</p>}
          <p className="text-xs text-[#6B6155] mt-3">Pour l'ouvrir : décompressez le fichier, puis double-cliquez sur « livre-souvenir.html ».</p>
        </section>
      )}
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
                <section key={s.id} className={`${carte_} p-5`} data-testid="souvenir-invite">
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
