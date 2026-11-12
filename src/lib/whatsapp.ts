/** Numéro marocain saisi « 06… » ou « 6… » : on ajoute l'indicatif 212 pour que le lien WhatsApp fonctionne. */
export const numeroWa = (t: string) => { const n = t.replace(/[^\d]/g, ""); if (t.trim().startsWith("+") || n.startsWith("00")) return n.replace(/^00/, ""); if (n.startsWith("212")) return n; return "212" + n.replace(/^0/, ""); };
/** Lien WhatsApp : ouvre la conversation avec le client si son numéro est connu, sinon le choix du contact. */
export const lienWa = (texte: string, tel?: string | null) => `https://wa.me/${tel && tel.replace(/\D/g, "").length >= 6 ? numeroWa(tel) : ""}?text=${encodeURIComponent(texte)}`;
