// Traduction automatique vers le français des textes libres saisis par les visiteurs
// (le site existe en arabe et en anglais, mais tout ce que reçoit l'agence doit être en français).
// En cas d'échec du service, on garde le texte d'origine : une demande n'est jamais bloquée.

const NOMS: Record<string, string> = { ar: "arabe", en: "anglais", es: "espagnol", de: "allemand", it: "italien", nl: "néerlandais", pt: "portugais", tr: "turc", zgh: "amazigh" };

export interface Traduction { texte: string; original: string; langue: string | null; traduit: boolean }

const attendre = async (url: string, ms = 6000) => {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { signal: ctl.signal, headers: { "User-Agent": "Mozilla/5.0 (Heavent)" } }); } finally { clearTimeout(t); }
};

/** Service 1 : Google (souvent limité depuis les serveurs). */
async function google(texte: string): Promise<{ texte: string; langue: string } | null> {
  try {
    const r = await attendre(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=${encodeURIComponent(texte.slice(0, 4500))}`, 4000);
    if (!r.ok) return null;
    const d = await r.json();
    const langue = typeof d?.[2] === "string" ? d[2] : null;
    const fr = (d?.[0] ?? []).map((x: any) => x?.[0] ?? "").join("").trim();
    return langue && fr ? { texte: fr, langue } : null;
  } catch { return null; }
}

/** Morceaux de 450 caractères maximum, coupés de préférence entre deux phrases. */
function morceaux(texte: string) {
  const res: string[] = []; let reste = texte;
  while (reste.length > 450) {
    let i = Math.max(reste.lastIndexOf(". ", 450), reste.lastIndexOf("\n", 450), reste.lastIndexOf("، ", 450), reste.lastIndexOf("؟", 450));
    if (i < 200) i = reste.lastIndexOf(" ", 450);
    if (i < 200) i = 450;
    res.push(reste.slice(0, i + 1)); reste = reste.slice(i + 1);
  }
  if (reste.trim()) res.push(reste);
  return res;
}

const decoder = (t: string) => t.replace(/&#39;|&#039;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/** Service 2 : MyMemory (détection automatique de la langue). */
async function mymemory(texte: string): Promise<{ texte: string; langue: string } | null> {
  try {
    const parties = morceaux(texte.slice(0, 4500));
    let langue = "";
    const sorties: string[] = [];
    for (const p of parties) {
      const r = await attendre(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(p)}&langpair=autodetect|fr`);
      if (!r.ok) return null;
      const d = await r.json();
      if (d?.quotaFinished || Number(d?.responseStatus) !== 200) return null;
      langue ||= String(d?.responseData?.detectedLanguage ?? "").slice(0, 2).toLowerCase();
      if (langue === "fr") return { texte, langue: "fr" };
      sorties.push(decoder(String(d?.responseData?.translatedText ?? p)));
    }
    return langue ? { texte: sorties.join(" ").replace(/\s+/g, " ").trim(), langue } : null;
  } catch { return null; }
}

/** Traduit un texte en français si besoin (langue détectée automatiquement). */
export async function versFrancais(valeur: unknown): Promise<Traduction> {
  const original = String(valeur ?? "").trim();
  if (original.length < 2 || !/\p{L}/u.test(original)) return { texte: original, original, langue: null, traduit: false };
  const r = (await google(original)) ?? (await mymemory(original));
  const identique = r && r.texte.trim().toLowerCase() === original.toLowerCase();
  if (!r || r.langue === "fr" || !r.texte || identique) return { texte: original, original, langue: r?.langue ?? null, traduit: false };
  return { texte: r.texte, original, langue: r.langue, traduit: true };
}

/** Traduit plusieurs champs d'un objet (en parallèle). */
export async function traduireChamps<T extends Record<string, unknown>>(data: T, champs: (keyof T)[]) {
  const res: Partial<Record<keyof T, Traduction>> = {};
  await Promise.all(champs.map(async (c) => { res[c] = await versFrancais(data[c]); }));
  return res as Record<keyof T, Traduction>;
}

export const nomLangue = (l: string | null) => (l ? NOMS[l] ?? l : "");

/** Version texte pour la base : « traduction » + « (original en arabe : …) ». */
export const avecOriginal = (t?: Traduction) =>
  !t ? "" : t.traduit ? `${t.texte}\n(Traduit automatiquement de l'${nomLangue(t.langue)} — original : ${t.original})` : t.texte;

/** Version HTML pour les e-mails de l'agence. */
export const htmlTraduit = (t: Traduction | undefined, esc: (v: unknown) => string) =>
  !t ? "" : t.traduit
    ? `${esc(t.texte)}<br><span style="color:#888;font-size:12px">Traduit automatiquement de l'${esc(nomLangue(t.langue))} — original : ${esc(t.original)}</span>`
    : esc(t.texte);
