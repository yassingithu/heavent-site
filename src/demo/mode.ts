// Mode démonstration Heavent Studio : l'administration tourne sur des données fictives, dans le navigateur du visiteur.
// Rien n'est lu ni écrit dans la vraie base (seule l'ouverture de la démo est comptée).
export const estDemo = () => typeof window !== "undefined" && /^\/studio\/demo\/[0-9a-f-]{36}/i.test(window.location.pathname);
export const jetonDemo = () => (typeof window !== "undefined" ? window.location.pathname.match(/^\/studio\/demo\/([0-9a-f-]{36})/i)?.[1] ?? null : null);
export const CLE_SESSION_DEMO = "heavent-demo-auth";
