/** Montage du visuel Instagram (1080 × 1350) : photo + texte Heavent + logo, dessiné dans le navigateur. */
export interface ContenuVisuel { accroche: string | null; titre: string; style: "sombre" | "clair"; compte?: string | null }

/** Signature en bas du visuel, selon le compte Instagram */
const MARQUES: Record<string, { image: string; nom: string; l: number; h: number }> = {
  heavent: { image: "/marque-or.png", nom: "HEAVENT PEOPLE AGENCY", l: 30, h: 40 },
  nawar: { image: "/marque-nawar.png", nom: "NAWAR · BAR À PARFUMS", l: 40, h: 40 },
};

export const LARGEUR = 1080, HAUTEUR = 1350;

function charger(src: string) {
  return new Promise<HTMLImageElement>((ok, ko) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => ok(img);
    img.onerror = () => ko(new Error("Image introuvable"));
    img.src = src;
  });
}

async function polices() {
  try {
    await Promise.all([
      document.fonts.load('600 80px "Playfair Display"'),
      document.fonts.load('600 26px "Inter"'),
      document.fonts.load('500 20px "Inter"'),
    ]);
  } catch { /* polices système en secours */ }
}

function couper(ctx: CanvasRenderingContext2D, texte: string, largeur: number) {
  const lignes: string[] = [];
  for (const paragraphe of texte.split("\n")) {
    let ligne = "";
    for (const mot of paragraphe.split(/\s+/).filter(Boolean)) {
      const essai = ligne ? `${ligne} ${mot}` : mot;
      if (ctx.measureText(essai).width > largeur && ligne) { lignes.push(ligne); ligne = mot; } else ligne = essai;
    }
    if (ligne) lignes.push(ligne);
  }
  return lignes;
}

function espacer(ctx: CanvasRenderingContext2D, px: number) {
  try { (ctx as any).letterSpacing = `${px}px`; } catch { /* navigateur ancien */ }
}

export async function composerVisuel(canvas: HTMLCanvasElement, photoUrl: string, c: ContenuVisuel) {
  await polices();
  const sig = MARQUES[c.compte ?? "heavent"] ?? MARQUES.heavent;
  const [photo, marque] = await Promise.all([charger(photoUrl), charger(sig.image).catch(() => null)]);
  canvas.width = LARGEUR; canvas.height = HAUTEUR;
  const ctx = canvas.getContext("2d")!;

  // Photo en plein cadre (recadrée au centre)
  const echelle = Math.max(LARGEUR / photo.width, HAUTEUR / photo.height);
  const lw = photo.width * echelle, lh = photo.height * echelle;
  ctx.drawImage(photo, (LARGEUR - lw) / 2, (HAUTEUR - lh) / 2, lw, lh);

  const clair = c.style === "clair";
  const marge = clair ? 110 : 90;
  const largeurTexte = LARGEUR - marge * 2;

  // Taille du titre : la plus grande qui tient en 4 lignes
  let taille = 82, lignes: string[] = [];
  for (; taille >= 48; taille -= 4) {
    ctx.font = `600 ${taille}px "Playfair Display", Georgia, serif`;
    espacer(ctx, 0);
    lignes = couper(ctx, c.titre, largeurTexte);
    if (lignes.length <= 4) break;
  }
  const interligne = Math.round(taille * 1.14);
  const hauteurTitre = lignes.length * interligne;
  const hauteurAccroche = c.accroche ? 56 : 0;
  const hauteurPied = 96;
  const bas = clair ? HAUTEUR - 60 : HAUTEUR;
  const hautBloc = bas - (clair ? 70 : 80) - hauteurPied - hauteurTitre - hauteurAccroche;

  if (clair) {
    // Carte crème posée sur la photo
    const x = 60, y = hautBloc - 70, l = LARGEUR - 120, h = bas - y;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.18)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 10;
    ctx.fillStyle = "rgba(251,248,241,0.95)";
    ctx.beginPath(); (ctx as any).roundRect ? (ctx as any).roundRect(x, y, l, h, 36) : ctx.rect(x, y, l, h); ctx.fill();
    ctx.restore();
  } else {
    // Dégradé sombre pour la lisibilité
    const debut = Math.max(0, hautBloc - 260);
    const g = ctx.createLinearGradient(0, debut, 0, HAUTEUR);
    g.addColorStop(0, "rgba(12,10,8,0)");
    g.addColorStop(0.45, "rgba(12,10,8,0.62)");
    g.addColorStop(1, "rgba(12,10,8,0.9)");
    ctx.fillStyle = g; ctx.fillRect(0, debut, LARGEUR, HAUTEUR - debut);
  }

  let y = hautBloc;
  ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
  if (c.accroche) {
    ctx.font = '600 26px "Inter", Arial, sans-serif'; espacer(ctx, 6);
    ctx.fillStyle = clair ? "#8C6D22" : "#E4D49A";
    ctx.fillText(c.accroche.toUpperCase(), marge, y + 26);
    y += hauteurAccroche;
  }
  ctx.font = `600 ${taille}px "Playfair Display", Georgia, serif`; espacer(ctx, 0);
  ctx.fillStyle = clair ? "#141414" : "#FFFFFF";
  lignes.forEach((l, i) => ctx.fillText(l, marge, y + taille + i * interligne - (interligne - taille) / 2));
  y += hauteurTitre + 36;

  // Filet doré + signature Heavent
  ctx.fillStyle = "#C8B560"; ctx.fillRect(marge, y, 64, 3);
  y += 30;
  if (marque) ctx.drawImage(marque, marge, y, sig.l, sig.h);
  ctx.font = '500 20px "Inter", Arial, sans-serif'; espacer(ctx, 5);
  ctx.fillStyle = clair ? "rgba(20,20,20,0.75)" : "rgba(255,255,255,0.85)";
  ctx.fillText(sig.nom, marge + (marque ? sig.l + 16 : 0), y + 28);
  espacer(ctx, 0);
}

export const enJpeg = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((ok, ko) => canvas.toBlob((b) => (b ? ok(b) : ko(new Error("Montage impossible"))), "image/jpeg", 0.92));
