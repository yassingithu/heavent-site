/** Photo réduite (côté le plus long ≤ max px) avant envoi : JPEG pour les photos, PNG pour garder la transparence des logos. */
export async function reduirePhoto(f: File, max = 1800, format: "image/jpeg" | "image/png" = "image/jpeg"): Promise<Blob> {
  const img = await createImageBitmap(f);
  const k = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Image illisible"))), format, 0.84));
}
export const idAleatoire = () => (crypto as any).randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
