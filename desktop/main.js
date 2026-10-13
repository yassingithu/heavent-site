// Heavent Admin — application Mac de l'administration heaventagency.com
const { app, BrowserWindow, Menu, shell, Notification, session } = require("electron");
const path = require("path");
const fs = require("fs");

const SITE = "https://heaventagency.com";
// « ?app=1 » : adresse propre à l'app (évite d'anciennes redirections gardées en mémoire par le cache)
const ACCUEIL = `${SITE}/admin-auth?app=1`;
const HOTES_AUTORISES = ["heaventagency.com", "www.heaventagency.com"];
const SUFFIXE_UA = "HeaventAdminApp/1.0";

let fenetre = null;

// ---------- une seule fenêtre à la fois ----------
if (!app.requestSingleInstanceLock()) app.quit();
app.on("second-instance", () => {
  if (fenetre) { if (fenetre.isMinimized()) fenetre.restore(); fenetre.focus(); }
});

// ---------- taille et position de la fenêtre mémorisées ----------
const fichierEtat = () => path.join(app.getPath("userData"), "fenetre.json");
function lireEtat() {
  try { return JSON.parse(fs.readFileSync(fichierEtat(), "utf8")); } catch { return { width: 1440, height: 920 }; }
}
function sauverEtat() {
  if (!fenetre || fenetre.isDestroyed()) return;
  try { fs.writeFileSync(fichierEtat(), JSON.stringify({ ...fenetre.getNormalBounds(), max: fenetre.isMaximized() })); } catch { /* ignoré */ }
}

const estInterne = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "file:" || (u.protocol === "https:" && HOTES_AUTORISES.includes(u.hostname));
  } catch { return false; }
};

function ouvrirHorsApp(url) {
  if (/^(https?|mailto|tel):/i.test(url)) shell.openExternal(url);
}

function creerFenetre() {
  const etat = lireEtat();
  fenetre = new BrowserWindow({
    x: etat.x, y: etat.y, width: etat.width, height: etat.height,
    minWidth: 960, minHeight: 640,
    title: "Heavent Admin",
    backgroundColor: "#FAF7EE",
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 14, y: 14 },
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });
  if (etat.max) fenetre.maximize();

  // Le site reconnaît l'app et masque l'en-tête / le pied de page du site public
  fenetre.webContents.setUserAgent(`${fenetre.webContents.getUserAgent()} ${SUFFIXE_UA}`);

  fenetre.once("ready-to-show", () => fenetre.show());
  fenetre.on("close", sauverEtat);
  fenetre.on("resize", sauverEtat);
  fenetre.on("move", sauverEtat);

  // Liens vers d'autres sites (WhatsApp, Google Maps, Resend…) : ouverts dans le navigateur
  fenetre.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("blob:") || url.startsWith("about:")) return { action: "allow" };
    if (estInterne(url)) { fenetre.loadURL(url); return { action: "deny" }; }
    ouvrirHorsApp(url);
    return { action: "deny" };
  });
  fenetre.webContents.on("will-navigate", (e, url) => {
    if (!estInterne(url)) { e.preventDefault(); ouvrirHorsApp(url); }
  });

  // Pas de connexion : page d'attente qui réessaie toute seule
  let cacheVide = false;
  fenetre.webContents.on("did-fail-load", async (_e, code, desc, url, principal) => {
    if (!principal || code === -3 /* navigation annulée */) return;
    if (url && url.startsWith("file:")) return;
    // Boucle de redirection, cache abîmé… : on vide le cache une fois et on réessaie avant d'afficher l'écran d'erreur
    if (!cacheVide) {
      cacheVide = true;
      await session.defaultSession.clearCache();
      fenetre.loadURL(ACCUEIL);
      return;
    }
    fenetre.loadFile(path.join(__dirname, "offline.html"), { query: { code: String(code), detail: desc || "" } });
  });
  fenetre.webContents.on("did-finish-load", () => { if (!fenetre.webContents.getURL().startsWith("file:")) cacheVide = false; });

  fenetre.loadURL(ACCUEIL);
}

// ---------- téléchargements (devis, contrats, fiches de paie) ----------
function gererTelechargements() {
  session.defaultSession.on("will-download", (_e, item) => {
    const dossier = app.getPath("downloads");
    const nom = item.getFilename() || "document.pdf";
    const ext = path.extname(nom);
    const base = path.basename(nom, ext);
    let cible = path.join(dossier, nom);
    for (let i = 1; fs.existsSync(cible); i++) cible = path.join(dossier, `${base} (${i})${ext}`);
    item.setSavePath(cible);
    item.once("done", (_ev, etat) => {
      if (etat !== "completed") return;
      app.dock?.downloadFinished(cible);
      if (Notification.isSupported()) {
        const n = new Notification({ title: "Téléchargé", body: `${path.basename(cible)} — clique pour l'afficher`, silent: true });
        n.on("click", () => shell.showItemInFolder(cible));
        n.show();
      }
    });
  });
}

// ---------- menus (copier / coller, zoom, navigation) ----------
function construireMenu() {
  const aller = (chemin) => () => fenetre && fenetre.loadURL(`${SITE}${chemin}`);
  const modele = [
    { role: "appMenu", label: "Heavent Admin" },
    { role: "editMenu", label: "Édition" },
    {
      label: "Aller",
      submenu: [
        { label: "Administration", accelerator: "CmdOrCtrl+1", click: aller("/admin") },
        { type: "separator" },
        { label: "Voir le site public dans le navigateur", click: () => shell.openExternal(SITE) },
        { type: "separator" },
        { label: "Précédent", accelerator: "CmdOrCtrl+[", click: () => fenetre?.webContents.navigationHistory.goBack() },
        { label: "Suivant", accelerator: "CmdOrCtrl+]", click: () => fenetre?.webContents.navigationHistory.goForward() },
      ],
    },
    {
      label: "Présentation",
      submenu: [
        { role: "reload", label: "Actualiser" },
        { role: "forceReload", label: "Actualiser (vider le cache)" },
        { type: "separator" },
        { role: "resetZoom", label: "Taille réelle" },
        { role: "zoomIn", label: "Agrandir" },
        { role: "zoomOut", label: "Réduire" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Plein écran" },
      ],
    },
    { role: "windowMenu", label: "Fenêtre" },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(modele));
}

app.whenReady().then(() => {
  app.setName("Heavent Admin");
  construireMenu();
  gererTelechargements();
  creerFenetre();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) creerFenetre(); });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
