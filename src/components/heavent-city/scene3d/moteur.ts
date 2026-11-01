/**
 * Moteur 3D de Heavent City (jalon 1) : three.js orthographique isométrique, ombres douces, lumière chaude,
 * matières marocaines (zellige, laiton, bois clair, tissu). Chargé À LA DEMANDE (import dynamique depuis Scene3D.tsx).
 * Une case du jeu = 1 unité. Le sol est le plan y = 0 ; (gx, gy) du jeu → (x, z). Aucun prix ici.
 */
import * as THREE from "./vendor/three.module.min.js";
import { PALETTES, type LieuId } from "../donnees";
import type { Rendu } from "../etat";
import { construireFixes, formeParId } from "./formes";
import { chevauche, objetsDeplacables, RAYON_TABLE, type Objet3D } from "./objets";

export interface Entree { r: Rendu; nuit: number; deplacable: boolean; reduit: boolean; focus?: { cle: string; n: number } | null }
export interface Rappels { onDeplacer: (id: string, dx: number, dy: number) => void; onRefus: () => void; /** la vue n'est plus celle d'ensemble (zoom ou déplacement) */ onDecalee?: (decalee: boolean) => void }
export interface Moteur { maj(e: Entree): void; vueEnsemble(): void; /** position monde (cases) d'un objet, pour les tests */ position(id: string): [number, number] | null; /** position écran (px client) d'un point du sol ou d'un objet, pour les tests */ ecran(x: number, z: number): [number, number]; ecranObjet(id: string): [number, number] | null; /** chaises d'un objet (position locale, direction du dossier), pour les tests */ chaises(id: string): { x: number; z: number; dos: [number, number] }[]; dims(id: string): { w: number; d: number } | null; /** cadre un objet de près (tests, captures) */ vers(id: string, zoom: number): void; /** objet sous un point de l'écran (tests) */ sous(x: number, y: number): string | null; detruire(): void; stats(): { appels: number; triangles: number; objets: number; zoom: number; cible: number[] } }

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const couleur = (a: string, b: string, t: number) => new THREE.Color(a).lerp(new THREE.Color(b), t);
const rebond = (t: number) => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
function hasard(graine: number) { let s = graine >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function texture(l: number, h: number, dessin: (c: CanvasRenderingContext2D, l: number, h: number) => void, repeter = true) {
  const c = document.createElement("canvas"); c.width = l; c.height = h;
  dessin(c.getContext("2d")!, l, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  if (repeter) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}
/** fusionne des géométries (position + normale) pour un seul appel de dessin */
function fusion(parts: [any, any][]) {
  const gs = parts.map(([g, m]) => { const n = (g.index ? g.toNonIndexed() : g.clone()); n.applyMatrix4(m); return n; });
  let total = 0; gs.forEach((g) => (total += g.attributes.position.count));
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3); let o = 0;
  gs.forEach((g) => { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
  const r = new THREE.BufferGeometry();
  r.setAttribute("position", new THREE.BufferAttribute(pos, 3)); r.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  r.computeBoundingSphere(); return r;
}
const M4 = (x = 0, y = 0, z = 0, ry = 0, sx = 1, sy = sx, sz = sx, rx = 0) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, 0)), new THREE.Vector3(sx, sy, sz));

// ── Palettes de lieux ───────────────────────────────────────────────────────
const LIEUX: Record<LieuId, { a: string; b: string; bord: string; mur: string; bande: string; terre: string }> = {
  riad: { a: "#EBDDBF", b: "#D9C398", bord: "#2F6277", mur: "#E6D1AB", bande: "#2F6277", terre: "#C6A474" },
  villa: { a: "#B98E65", b: "#AA7F58", bord: "#8A6A47", mur: "#F1EDE4", bande: "#D8D1C2", terre: "#C8C2B2" },
  rooftop: { a: "#E8E1D6", b: "#DDD4C6", bord: "#9A7650", mur: "#EEE7DA", bande: "#CDC4B2", terre: "#3B3A57" },
  jardin: { a: "#BBCB8B", b: "#B0C382", bord: "#8FA86A", mur: "#6F8F55", bande: "#587A44", terre: "#9DB873" },
  salle: { a: "#CCA675", b: "#C29A68", bord: "#C9A74E", mur: "#F0E6D2", bande: "#C9A74E", terre: "#CDB79A" },
};

export function creerMoteur(canvas: HTMLCanvasElement, conteneur: HTMLElement, rap: Rappels): Moteur {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false;
  const tactile = matchMedia("(pointer: coarse)").matches;

  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 300);
  const hemi = new THREE.HemisphereLight(0xffe6c8, 0x6a4f3a, 0.8); scene.add(hemi);
  const soleil = new THREE.DirectionalLight(0xffc48a, 2.2);
  soleil.castShadow = true; soleil.shadow.mapSize.set(tactile ? 1024 : 2048, tactile ? 1024 : 2048); soleil.shadow.radius = 4; soleil.shadow.bias = -0.0006; soleil.shadow.normalBias = 0.03;
  scene.add(soleil, soleil.target);
  const lampes = [0, 1, 2].map(() => { const l = new THREE.PointLight(0xffb866, 0, 8, 1.6); scene.add(l); return l; });

  // matières partagées (jamais recréées)
  const mat = {
    laiton: new THREE.MeshStandardMaterial({ color: 0xc9a74e, metalness: 0.75, roughness: 0.32 }),
    boisClair: new THREE.MeshStandardMaterial({ color: 0xe3c9a0, roughness: 0.7 }),
    boisSombre: new THREE.MeshStandardMaterial({ color: 0x5a3a26, roughness: 0.65 }),
    blanc: new THREE.MeshStandardMaterial({ color: 0xfaf5ea, roughness: 0.9 }),
    verre: new THREE.MeshStandardMaterial({ color: 0xd88a3a, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.85 }),
    bougie: new THREE.MeshBasicMaterial({ color: 0xffd98a }),
    refus: new THREE.MeshBasicMaterial({ color: 0xe24e4e, transparent: true, opacity: 0.45, depthWrite: false }),
    halo: new THREE.MeshBasicMaterial({ color: 0xf4d774, transparent: true, opacity: 0.14, depthWrite: false }),
    libre: new THREE.MeshBasicMaterial({ color: 0xf4d774, transparent: true, opacity: 0.35, depthWrite: false }),
  };
  const g = {
    cyl: new THREE.CylinderGeometry(1, 1, 1, 28), cyl8: new THREE.CylinderGeometry(1, 1, 1, 10), box: new THREE.BoxGeometry(1, 1, 1), sph: new THREE.SphereGeometry(1, 10, 8),
    ico: new THREE.IcosahedronGeometry(1, 0), tore: new THREE.TorusGeometry(1, 0.1, 6, 28), plan: new THREE.PlaneGeometry(1, 1),
  };
  const chaiseGeo = fusion([
    [g.box, M4(0, 0.3, 0, 0, 0.26, 0.05, 0.26)],
    [g.box, M4(-0.11, 0.15, -0.11, 0, 0.03, 0.3, 0.03)], [g.box, M4(0.11, 0.15, -0.11, 0, 0.03, 0.3, 0.03)], [g.box, M4(-0.11, 0.15, 0.11, 0, 0.03, 0.3, 0.03)], [g.box, M4(0.11, 0.15, 0.11, 0, 0.03, 0.3, 0.03)],
    [g.tore, M4(0, 0.58, -0.12, 0, 0.17, 0.2, 0.17)], [g.box, M4(0, 0.4, -0.12, 0, 0.03, 0.2, 0.03)],
  ]);
  const gypsoGeo = fusion(Array.from({ length: 70 }, (_, i): [any, any] => { const q = hasard(i + 3); return [g.ico, M4((q() - 0.5) * 3, -q() * 0.45, (q() - 0.5) * 0.5, q() * 3, 0.05 + q() * 0.05)]; }));

  // ── Décor du lieu ─────────────────────────────────────────────────────────
  let decor: any = null, objets: Objet3D[] = [], groupes = new Map<string, any>(), courant: Entree | null = null, cleDecor = "";
  const ombre = <T extends { castShadow: boolean; receiveShadow: boolean }>(m: T, porte = true, recoit = true) => { m.castShadow = porte; m.receiveShadow = recoit; return m; };
  const mesh = (geo: any, m: any, x: number, y: number, z: number, sx: number, sy = sx, sz = sx, p = true) => { const o = ombre(new THREE.Mesh(geo, m), p); o.position.set(x, y, z); o.scale.set(sx, sy, sz); return o; };

  function construireDecor(lieu: LieuId, N: number, pal: { accent: string; deco: string }) {
    const d = new THREE.Group(), L = LIEUX[lieu];
    const sol = texture(256, 256, (c, l, h) => {
      c.fillStyle = L.a; c.fillRect(0, 0, l, h); c.fillStyle = L.b; c.fillRect(0, 0, l / 2, h / 2); c.fillRect(l / 2, h / 2, l / 2, h / 2);
      if (lieu === "riad" || lieu === "salle") { c.strokeStyle = lieu === "riad" ? "#2F6277" : "#C9A74E"; c.globalAlpha = 0.35; c.lineWidth = 3; for (const [cx, cy] of [[64, 64], [192, 192]]) { c.beginPath(); for (let k = 0; k < 16; k++) { const t = (k / 16) * Math.PI * 2, rr = k % 2 ? 22 : 46; c.lineTo(cx + Math.cos(t) * rr, cy + Math.sin(t) * rr); } c.closePath(); c.stroke(); } }
      c.globalAlpha = 0.08; c.strokeStyle = "#000"; c.lineWidth = 2; c.strokeRect(0, 0, l, h);
    });
    sol.repeat.set(N / 2, N / 2);
    const dalle = ombre(new THREE.Mesh(g.box, new THREE.MeshStandardMaterial({ map: sol, roughness: 0.75 })), false, true);
    dalle.scale.set(N, 0.3, N); dalle.position.set(N / 2, -0.15, N / 2); d.add(dalle);
    const liseré = ombre(new THREE.Mesh(g.box, new THREE.MeshStandardMaterial({ color: L.bord, roughness: 0.6 })), false, true);
    liseré.scale.set(N + 0.4, 0.28, N + 0.4); liseré.position.set(N / 2, -0.17, N / 2); d.add(liseré);
    const terre = ombre(new THREE.Mesh(g.plan, new THREE.MeshStandardMaterial({ color: L.terre, roughness: 1 })), false, true);
    terre.rotation.x = -Math.PI / 2; terre.scale.set(N * 5, N * 5, 1); terre.position.set(N / 2, -0.32, N / 2); d.add(terre);
    // deux murs (plans gx = 0 et gy = 0) avec bande de zellige, arcs et liseré or
    const HM = 3.4;
    const murTex = texture(512, 256, (c, l, h) => {
      c.fillStyle = L.mur; c.fillRect(0, 0, l, h);
      c.fillStyle = L.bande; for (let i = 0; i < 16; i++) if (i % 2 === 0) c.fillRect(i * 32, 0, 32, 40);
      c.fillStyle = "#C9A74E"; c.fillRect(0, 40, l, 5); c.fillRect(0, h - 8, l, 8);
      for (let i = 0; i < 3; i++) { const x = 40 + i * 150; c.fillStyle = "rgba(60,40,28,0.55)"; c.beginPath(); c.moveTo(x, 224); c.lineTo(x, 130); c.quadraticCurveTo(x + 50, 56, x + 100, 130); c.lineTo(x + 100, 224); c.closePath(); c.fill(); c.strokeStyle = "#C9A74E"; c.lineWidth = 4; c.stroke(); }
    });
    murTex.repeat.set(Math.max(1, Math.round(N / 8)), 1);
    const mm = new THREE.MeshStandardMaterial({ map: murTex, roughness: 0.85 });
    const m1 = ombre(new THREE.Mesh(g.plan, mm), false, true); const hm1 = lieu === "villa" ? 0.9 : HM; m1.scale.set(N, hm1, 1); m1.position.set(N / 2, hm1 / 2, 0); if (lieu === "villa") m1.material = new THREE.MeshStandardMaterial({ color: "#EFEADF", roughness: 0.7, side: THREE.DoubleSide }); d.add(m1);
    const m2 = ombre(new THREE.Mesh(g.plan, mm), false, true); m2.scale.set(N, HM, 1); m2.rotation.y = Math.PI / 2; m2.position.set(0, HM / 2, N / 2); d.add(m2);
    // lanternes en laiton aux angles du plateau (donnent des points chauds la nuit)
    for (const [x, z] of [[0.35, 0.35], [N - 0.4, 0.35], [0.35, N - 0.4]] as [number, number][]) {
      d.add(mesh(g.cyl8, mat.laiton, x, 0.45, z, 0.05, 0.9), mesh(g.cyl, mat.laiton, x, 1.0, z, 0.1, 0.22), mesh(g.sph, mat.bougie, x, 1.0, z, 0.07, 0.07, 0.07, false));
    }
    return d;
  }

  // ── Objets ────────────────────────────────────────────────────────────────
  function couleurObjet(id: string, pal: { accent: string; deco: string; nappe: string }) {
    let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return couleur(h % 2 ? pal.accent : pal.deco, "#3a2a22", 0.15 + (h % 5) * 0.07);
  }
  function construireObjet(o: Objet3D, r: Rendu, pal: { accent: string; deco: string; nappe: string; fleurs: string }, bougies: boolean) {
    const grp = new THREE.Group();
    /** position locale et direction du dossier de chaque chaise (pour les tests : dossier vers l'extérieur) */
    const notes: { x: number; z: number; dos: [number, number] }[] = [];
    const noter = (x: number, z: number, ry: number) => notes.push({ x, z, dos: [-Math.sin(ry), -Math.cos(ry)] });
    const nappe = new THREE.MeshStandardMaterial({ color: pal.nappe, roughness: 0.95 });
    const fleurs = new THREE.MeshStandardMaterial({ color: pal.fleurs, roughness: 0.8 });
    const chaises = (n: number, rayon: number, haut: number, mat0: any) => {
      const im = ombre(new THREE.InstancedMesh(chaiseGeo, mat0, n)); const m = new THREE.Matrix4();
      for (let i = 0; i < n; i++) { const t = (i / n) * Math.PI * 2; m.compose(new THREE.Vector3(Math.cos(t) * rayon, haut, Math.sin(t) * rayon), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -t - Math.PI / 2, 0)), new THREE.Vector3(1, 1, 1)); im.setMatrixAt(i, m); }
      return im;
    };
    const chaiseMat = new THREE.MeshStandardMaterial({ color: couleur("#F6EFDD", pal.deco, 0.15), roughness: 0.55 });
    if (o.genre === "ronde") {
      grp.add(mesh(g.cyl, nappe, 0, 0.21, 0, RAYON_TABLE, 0.42, RAYON_TABLE));
      grp.add(mesh(g.cyl, nappe, 0, 0.43, 0, RAYON_TABLE + 0.03, 0.03, RAYON_TABLE + 0.03));
      grp.add(mesh(g.tore, mat.laiton, 0, 0.45, 0, RAYON_TABLE - 0.12, 0.6, RAYON_TABLE - 0.12).rotateX(Math.PI / 2));
      grp.add(mesh(g.sph, fleurs, 0, 0.58, 0, 0.13, 0.11, 0.13));
      if (bougies) grp.add(mesh(g.cyl8, mat.bougie, 0.2, 0.5, 0.1, 0.012, 0.1, 0.012, false));
      grp.add(chaises(10, RAYON_TABLE + 0.22, 0, chaiseMat));
    } else if (o.genre === "rect") {
      grp.add(mesh(g.box, nappe, 0, 0.21, 0, 1.7, 0.42, 0.78)); grp.add(mesh(g.sph, fleurs, 0, 0.55, 0, 0.12, 0.1, 0.12));
      // chaises sur les deux GRANDS côtés (comme le SVG), face à la table, dossier vers l'extérieur ; rien sur les bouts
      const im = ombre(new THREE.InstancedMesh(chaiseGeo, chaiseMat, 6)); const m = new THREE.Matrix4();
      for (let i = 0; i < 6; i++) { const lado = i < 3 ? -1 : 1, x = ((i % 3) - 1) * 0.567; m.compose(new THREE.Vector3(x, 0, lado * 0.64), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, lado > 0 ? Math.PI : 0, 0)), new THREE.Vector3(1, 1, 1)); im.setMatrixAt(i, m); noter(x, lado * 0.64, lado > 0 ? Math.PI : 0); }
      grp.add(im);
    } else if (o.genre === "haute") {
      grp.add(mesh(g.cyl8, mat.laiton, 0, 0.3, 0, 0.04, 0.6), mesh(g.cyl, mat.laiton, 0, 0.02, 0, 0.2, 0.04, 0.2), mesh(g.cyl, nappe, 0, 0.62, 0, 0.3, 0.04, 0.3));
      if (bougies) grp.add(mesh(g.cyl8, mat.bougie, 0, 0.7, 0, 0.012, 0.1, 0.012, false));
    } else if (o.genre === "honneur") {
      const w = o.hw * 2, d = o.hd * 2;
      grp.add(mesh(g.box, nappe, 0, 0.21, 0, w, 0.42, d), mesh(g.box, mat.laiton, 0, 0.44, 0, w, 0.025, d * 0.12));
      // comme le SVG : seuls les mariés sont assis, côté mur (au nord de la table), dos au mur, face à la salle
      if (r.type === "mariage") {
        const im = ombre(new THREE.InstancedMesh(chaiseGeo, chaiseMat, 2)); const m = new THREE.Matrix4();
        [-0.9, 0.9].forEach((x, i) => { m.compose(new THREE.Vector3(x, 0, -(d / 2 + 0.3)), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)), new THREE.Vector3(1.25, 1.25, 1.25)); im.setMatrixAt(i, m); noter(x, -(d / 2 + 0.3), 0); });
        grp.add(im);
      }
      // gypsophile suspendue : barre en laiton + nuage de petites fleurs
      grp.add(mesh(g.box, mat.laiton, 0, 2.3, -d * 0.1, w * 1.05, 0.03, 0.03, false));
      const gy = new THREE.Mesh(gypsoGeo, mat.blanc); gy.scale.set(w / 3, 1, 1.2); gy.position.set(0, 2.25, -d * 0.1); gy.castShadow = true; grp.add(gy);
      for (const s of [-0.5, 0.5]) grp.add(mesh(g.cyl8, mat.laiton, s * w * 0.98, 1.15, -d * 0.1, 0.02, 2.3, 0.02, false));
    } else if (o.genre === "arche") {
      // arche moucharabieh : montants + arc en laiton + treillis ajouré
      const w = o.hw * 2, H = 2.0;
      const treillis = texture(128, 128, (c, l, h) => { c.clearRect(0, 0, l, h); c.strokeStyle = "#fff"; c.lineWidth = 6; for (let i = -1; i < 5; i++) { c.beginPath(); c.moveTo(i * 32, 0); c.lineTo(i * 32 + 128, 128); c.moveTo(i * 32 + 128, 0); c.lineTo(i * 32, 128); c.stroke(); } });
      treillis.repeat.set(w * 2, 3);
      const tm = new THREE.MeshStandardMaterial({ map: treillis, color: new THREE.Color(pal.deco), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.4 });
      for (const s of [-1, 1]) grp.add(mesh(g.box, mat.laiton, s * (w / 2 - 0.06), H / 2, 0, 0.12, H, 0.14));
      const arc = mesh(g.tore, mat.laiton, 0, H, 0, w / 2 - 0.06, w / 2 - 0.06, 1.4); arc.scale.set(w / 2 - 0.06, (w / 2 - 0.06) * 1.0, 1.2); arc.geometry = new THREE.TorusGeometry(1, 0.06, 6, 24, Math.PI); grp.add(arc);
      const pan = mesh(g.plan, tm, 0, H * 0.45, 0, w - 0.2, H * 0.9, 1, true); grp.add(pan);
      grp.add(mesh(g.sph, fleurs, 0, H + (w / 2) * 0.98, 0, 0.16, 0.14, 0.16));
    } else if (o.genre === "piste") {
      const tex = texture(128, 128, (c, l, h) => { c.fillStyle = "#1c1a20"; c.fillRect(0, 0, l, h); c.fillStyle = pal.deco; c.fillRect(0, 0, l / 2, h / 2); c.fillRect(l / 2, h / 2, l / 2, h / 2); });
      tex.repeat.set(o.hw * 2, o.hd * 2);
      grp.add(ombre(mesh(g.box, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.25, metalness: 0.2 }), 0, 0.03, 0, o.hw * 2, 0.06, o.hd * 2, false), false, true));
    } else if (o.genre === "buffet") {
      const w = o.hw * 2, d = o.hd * 2, longX = w >= d;
      grp.add(mesh(g.box, nappe, 0, 0.3, 0, w, 0.6, d));
      const n = Math.max(2, Math.floor((longX ? w : d) / 0.6));
      for (let i = 0; i < n; i++) { const t = ((i + 0.5) / n - 0.5) * (longX ? w : d) * 0.9; grp.add(mesh(g.cyl, mat.laiton, longX ? t : 0, 0.64, longX ? 0 : t, 0.17, 0.05, 0.17), mesh(g.sph, i % 2 ? fleurs : mat.boisSombre, longX ? t : 0, 0.7, longX ? 0 : t, 0.1, 0.08, 0.1)); }
    } else if (o.genre === "nawar") {
      const w = o.hw * 2, d = o.hd * 2;
      grp.add(mesh(g.box, mat.boisClair, 0, 0.42, 0, w, 0.84, d), mesh(g.box, mat.boisSombre, 0, 0.86, 0, w + 0.04, 0.04, d + 0.04));
      // distributeurs numérotés : rangée de flacons ambrés à bouchon laiton
      const n = Math.max(3, Math.floor(d / 0.32));
      for (let i = 0; i < n; i++) { const z = ((i + 0.5) / n - 0.5) * d * 0.92; grp.add(mesh(g.cyl, mat.verre, 0, 1.02, z, 0.09, 0.26, 0.09), mesh(g.cyl, mat.laiton, 0, 1.18, z, 0.04, 0.06, 0.04, false)); }
      grp.add(mesh(g.box, mat.boisClair, -w * 0.35, 1.0, 0, 0.05, 1.0, d * 0.96));
    } else if (!formeParId(grp, o, pal)) {
      const h = o.h ?? 0.6, c = couleurObjet(o.id, pal);
      grp.add(mesh(g.box, new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 }), 0, h / 2, 0, o.hw * 2 * 0.95, h, o.hd * 2 * 0.95));
      grp.add(mesh(g.box, mat.laiton, 0, h + 0.015, 0, o.hw * 2 * 0.97, 0.03, o.hd * 2 * 0.97, false));
    }
    // anneau de saisie (zone libre / refus)
    const zone = new THREE.Mesh(g.box, mat.libre); zone.scale.set(o.hw * 2 + 0.1, 0.02, o.hd * 2 + 0.1); zone.position.y = 0.012; zone.visible = false; zone.userData.zone = true; grp.add(zone);
    grp.userData = { id: o.id, zone, chaises: notes, w: o.hw * 2, d: o.hd * 2 };
    return grp;
  }

  /** halo doré léger sur les objets déplaçables (mode Déplacer) */
  function majHalos() { for (const g2 of groupes.values()) { const z = g2.userData.zone; if (prise && prise.grp === g2) continue; z.material = mat.halo; z.visible = !!courant?.deplacable; } }
  // ── Mise à jour depuis le jeu ─────────────────────────────────────────────
  let objetsGroupe = new THREE.Group(); scene.add(objetsGroupe);
  let pret = false; let fixes: any = null;
  function refaireFixes(e: Entree) {
    if (fixes) { scene.remove(fixes); fixes.traverse((o: any) => { if (o.isInstancedMesh) o.dispose(); }); }
    const pal = PALETTES.find((p) => p.id === e.r.palette) ?? PALETTES[0];
    fixes = construireFixes(e.r, pal, e.nuit); scene.add(fixes);
  }
  function reconstruire(e: Entree) {
    const { r } = e, pal = PALETTES.find((p) => p.id === r.palette) ?? PALETTES[0], N = r.salle.n;
    const cle = `${r.lieu}|${N}|${r.palette}`;
    if (cle !== cleDecor) {
      if (decor) scene.remove(decor);
      decor = construireDecor(r.lieu, N, pal); scene.add(decor); cleDecor = cle;
      soleil.shadow.camera.left = -N * 0.85; soleil.shadow.camera.right = N * 0.85; soleil.shadow.camera.top = N * 0.85; soleil.shadow.camera.bottom = -N * 0.85; soleil.shadow.camera.far = N * 6; soleil.shadow.camera.updateProjectionMatrix();
      soleil.position.set(N / 2 - N * 0.5, N * 1.6, N / 2 + N * 0.8); soleil.target.position.set(N / 2, 0, N / 2); soleil.target.updateMatrixWorld();
      recadrer(true);
    }
    for (const c of [...objetsGroupe.children]) { objetsGroupe.remove(c); c.traverse((o: any) => { if (o.isInstancedMesh) o.dispose(); }); }
    groupes.clear(); objets = objetsDeplacables(r);
    for (const o of objets) {
      const grp = construireObjet(o, r, pal, r.lumiere === "bougies");
      const [dx, dy] = r.deplacements[o.id] ?? [0, 0];
      grp.position.set(o.a[0] + dx, 0, o.a[1] + dy); groupes.set(o.id, grp); objetsGroupe.add(grp);
      // sens des chaises du honneur : la face « salle » est du côté +gy
    }
    majHalos();
    // lampes chaudes de la nuit : près de la table d'honneur / du bar / de la piste, sinon des premières tables
    const pts = ["honneur", "nawar", "piste", "t0"].map((id) => groupes.get(id)).filter(Boolean).slice(0, 3);
    lampes.forEach((l, i) => { const p = pts[i]; if (p) { l.position.set(p.position.x, 1.5, p.position.z); l.userData.actif = true; } else l.userData.actif = false; });
  }
  function lumiere(nuit: number) {
    const n = nuit;
    soleil.color.copy(couleur("#FFC48A", "#8FA6E8", n)); soleil.intensity = lerp(2.4, 0.5, n);
    hemi.color.copy(couleur("#FFE6C8", "#3A4C8C", n)); hemi.groundColor.copy(couleur("#7A5A44", "#1A1630", n)); hemi.intensity = lerp(0.85, 0.5, n);
    scene.background = couleur("#F3B98A", "#141B45", n);
    lampes.forEach((l) => { l.intensity = l.userData.actif ? lerp(0.2, 7, n) : 0; });
    renderer.toneMappingExposure = lerp(1.08, 1.2, n);
    renderer.shadowMap.needsUpdate = true;
  }

  // ── Caméra isométrique (2:1) ──────────────────────────────────────────────
  const vue = { cible: new THREE.Vector3(6, 0.8, 6), zoom: 1, N: 12 };
  let cibleVoulue: any = null, zoomVoulu = 1, transition = 0;
  const DIR = new THREE.Vector3(1, Math.tan(Math.PI / 6) * Math.SQRT2, 1).normalize();
  function placerCamera() {
    const w = conteneur.clientWidth || 1, h = conteneur.clientHeight || 1, asp = w / h, N = vue.N;
    let demiL = N * 0.76, demiH = demiL / asp; const besoinH = N * 0.36 + 2.6; if (demiH < besoinH) { demiH = besoinH; demiL = demiH * asp; }
    const dec = asp < 1.5 ? 0.15 : 0; // mobile : le décor remonte de ~15 % (la moitié basse est moins gênée par les boutons)
    cam.left = -demiL / vue.zoom; cam.right = demiL / vue.zoom; cam.top = (demiH * (1 - 2 * dec)) / vue.zoom; cam.bottom = (-demiH * (1 + 2 * dec)) / vue.zoom;
    cam.position.copy(vue.cible).addScaledVector(DIR, 80); cam.lookAt(vue.cible); cam.updateProjectionMatrix();
    const zb = zoomBase(), dc = Math.abs(vue.zoom - zb) > 0.06 || Math.hypot(vue.cible.x - vue.N / 2, vue.cible.z - (vue.N / 2 + (zb > 1 ? 0.4 : 0))) > 0.6;
    if (dc !== decaleeAvant) { decaleeAvant = dc; rap.onDecalee?.(dc); }
  }
  let decaleeAvant = false;
  /** zoom de la vue d'ensemble : un peu plus serré sur un écran peu large (mobile), la scène occupe mieux la hauteur disponible */
  const zoomBase = () => { const asp = (conteneur.clientWidth || 1) / (conteneur.clientHeight || 1); return asp < 1.5 ? Math.min(1.25, 1 + (1.5 - asp) * 0.4) : 1; };
  function recadrer(immediat = false) {
    const N = vue.N = courant?.r.salle.n ?? 12;
    cibleVoulue = new THREE.Vector3(N / 2, 0.8, N / 2 + (zoomBase() > 1 ? 0.4 : 0)); zoomVoulu = zoomBase(); transition = immediat || courant?.reduit ? 1 : 0; if (immediat) { vue.cible.copy(cibleVoulue); vue.zoom = zoomVoulu; placerCamera(); }
    demander();
  }
/** recentrage sur l'élément mis en avant par le jeu (focus) */
  function centrer(e: Entree) {
    const a = e.focus ? (e.r.salle.pos.ANCRES as Record<string, [number, number] | undefined>)[e.focus.cle] : null; if (!a) return;
    cibleVoulue = new THREE.Vector3(a[0], 0.5, a[1]); zoomVoulu = zoomBase() > 1 ? Math.max(zoomBase(), 1.3) : 1.6; transition = e.reduit ? 1 : 0;
    if (e.reduit) { vue.cible.copy(cibleVoulue); vue.zoom = zoomVoulu; placerCamera(); }
    demander();
  }
  function redim() {
    const w = conteneur.clientWidth, h = conteneur.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); placerCamera(); demander();
  }
  const ro = new ResizeObserver(redim); ro.observe(conteneur);

  // ── Boucle à la demande ───────────────────────────────────────────────────
  let enCours = false, tPrec = 0, rebonds: { grp: any; t0: number; y0: number }[] = [];
  let appels = 0, tris = 0;
  function demander() { if (!enCours) { enCours = true; requestAnimationFrame(boucle); } }
  function boucle(t: number) {
    const dt = Math.min(0.05, (t - tPrec) / 1000 || 0.016); tPrec = t;
    let anime = false;
    if (cibleVoulue && transition < 1) {
      const k = 1 - Math.exp(-dt * 9); vue.cible.lerp(cibleVoulue, k); vue.zoom = lerp(vue.zoom, zoomVoulu, k);
      if (vue.cible.distanceTo(cibleVoulue) < 0.01 && Math.abs(vue.zoom - zoomVoulu) < 0.002) { vue.cible.copy(cibleVoulue); vue.zoom = zoomVoulu; transition = 1; }
      placerCamera(); anime = transition < 1;
    }
    rebonds = rebonds.filter((b) => { const u = Math.min(1, (t - b.t0) / 420); b.grp.position.y = b.y0 * (1 - rebond(u)) ; if (u >= 1) { b.grp.position.y = 0; return false; } return true; });
    if (rebonds.length) { anime = true; renderer.shadowMap.needsUpdate = true; }
    if (prise) anime = true;
    renderer.render(scene, cam);
    appels = renderer.info.render.calls; tris = renderer.info.render.triangles;
    if (anime) requestAnimationFrame(boucle); else enCours = false;
  }

  // ── Glisser-déposer ───────────────────────────────────────────────────────
  const rayon = new THREE.Raycaster(), ndc = new THREE.Vector2(), plan = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  let prise: { id: string; grp: any; depart: [number, number]; decal: any; dernier: [number, number]; bloque: boolean; pointeur: number } | null = null;
  const versSol = (cx: number, cy: number) => { const r = canvas.getBoundingClientRect(); ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); rayon.setFromCamera(ndc, cam); const p = new THREE.Vector3(); return rayon.ray.intersectPlane(plan, p) ? p : null; };
  function objetSous(cx: number, cy: number): string | null {
    const r = canvas.getBoundingClientRect(); ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); rayon.setFromCamera(ndc, cam);
    const hits = rayon.intersectObjects(objetsGroupe.children, true);
    for (const h of hits) { let o = h.object; while (o && !o.userData?.id) o = o.parent; if (o?.userData?.id) return o.userData.id; }
    // pas de pièce touchée : on prend l'objet dont l'emprise au sol contient le point (zone de saisie généreuse, utile au doigt)
    const p = versSol(cx, cy); if (!p || !courant) return null;
    let meilleur: string | null = null, dmin = 1e9;
    for (const o of objets) {
      const [dx, dy] = courant.r.deplacements[o.id] ?? [0, 0], mx = o.a[0] + dx, mz = o.a[1] + dy, m = 0.25;
      if (Math.abs(p.x - mx) <= o.hw + m && Math.abs(p.z - mz) <= o.hd + m) { const d = Math.hypot(p.x - mx, p.z - mz); if (d < dmin) { dmin = d; meilleur = o.id; } }
    }
    return meilleur;
  }
  // Doigts : un doigt sur un objet (mode « déplacer ») le fait glisser ; un doigt ailleurs déplace la vue ; deux doigts zooment.
  const doigts = new Map<number, { x: number; y: number }>();
  let pince: { d0: number; z0: number } | null = null, pan: { p: any } | null = null;
  const dist = () => { const [a, b] = [...doigts.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };
  function annulerPrise() {
    const t = prise; prise = null; if (!t) return;
    const o = objets.find((x) => x.id === t.id)!;
    t.grp.position.set(o.a[0] + t.depart[0], 0, o.a[1] + t.depart[1]); majHalos(); renderer.shadowMap.needsUpdate = true;
  }
  const borneCible = () => { const N = vue.N; vue.cible.x = Math.max(0, Math.min(N, vue.cible.x)); vue.cible.z = Math.max(0, Math.min(N, vue.cible.z)); };
  canvas.addEventListener("pointerdown", (ev) => {
    if (!courant) return;
    doigts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    try { canvas.setPointerCapture(ev.pointerId); } catch { /* ignoré */ }
    cibleVoulue = null; transition = 1; // le doigt reprend la main sur une transition en cours
    if (doigts.size === 2) { annulerPrise(); pan = null; pince = { d0: dist(), z0: vue.zoom }; return; }
    if (doigts.size > 2) return;
    const id = courant.deplacable ? objetSous(ev.clientX, ev.clientY) : null, grp = id ? groupes.get(id) : null, p = versSol(ev.clientX, ev.clientY);
    if (!p) return;
    ev.preventDefault();
    if (!id || !grp) { pan = { p }; return; }
    const o = objets.find((x) => x.id === id)!, dep = courant.r.deplacements[id] ?? [0, 0];
    prise = { id, grp, depart: dep, decal: new THREE.Vector3(p.x - (o.a[0] + dep[0]), 0, p.z - (o.a[1] + dep[1])), dernier: dep, bloque: false, pointeur: ev.pointerId };
    grp.position.y = 0.18; grp.userData.zone.visible = true; grp.userData.zone.material = mat.libre; renderer.shadowMap.needsUpdate = true; demander();
  });
  canvas.addEventListener("pointermove", (ev) => {
    if (doigts.has(ev.pointerId)) doigts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    if (pince && doigts.size >= 2) { vue.zoom = Math.max(0.9, Math.min(3.2, pince.z0 * dist() / pince.d0)); placerCamera(); demander(); return; }
    if (pan) {
      const p = versSol(ev.clientX, ev.clientY); if (!p) return;
      vue.cible.x += pan.p.x - p.x; vue.cible.z += pan.p.z - p.z; borneCible(); placerCamera(); demander(); return;
    }
    const t = prise; if (!t || !courant) return;
    const p = versSol(ev.clientX, ev.clientY), o = objets.find((x) => x.id === t.id)!, N = courant.r.salle.n; if (!p) return;
    let dgx = p.x - t.decal.x - o.a[0], dgy = p.z - t.decal.z - o.a[1];
    dgx = Math.round(dgx * 4) / 4; dgy = Math.round(dgy * 4) / 4;
    dgx = Math.max(0.6 - o.a[0], Math.min(N - 0.6 - o.a[0], dgx)); dgy = Math.max(0.6 - o.a[1], Math.min(N - 0.6 - o.a[1], dgy));
    if (dgx !== t.dernier[0] || dgy !== t.dernier[1]) {
      t.dernier = [dgx, dgy]; t.grp.position.x = o.a[0] + dgx; t.grp.position.z = o.a[1] + dgy;
      t.bloque = chevauche(t.id, dgx, dgy, objets, courant.r); t.grp.userData.zone.material = t.bloque ? mat.refus : mat.libre;
      renderer.shadowMap.needsUpdate = true;
    }
    demander();
  });
  function relacher(ev: PointerEvent) {
    doigts.delete(ev.pointerId);
    try { canvas.releasePointerCapture(ev.pointerId); } catch { /* déjà relâché */ }
    if (pince) { if (doigts.size < 2) pince = null; return; }
    pan = null;
    const t = prise; prise = null; if (!t || !courant) return;
    const o = objets.find((x) => x.id === t.id)!;
    if (!t.bloque) { t.grp.userData.zone.material = mat.halo; t.grp.userData.zone.visible = courant.deplacable; }
    if (t.bloque) { t.grp.position.set(o.a[0] + t.depart[0], 0, o.a[1] + t.depart[1]); t.grp.userData.zone.material = mat.halo; t.grp.userData.zone.visible = courant.deplacable; rap.onRefus(); }
    else if (t.dernier[0] !== t.depart[0] || t.dernier[1] !== t.depart[1]) { rap.onDeplacer(t.id, t.dernier[0], t.dernier[1]); }
    // l'objet se pose avec un léger rebond amorti (sauf si l'on préfère moins de mouvement)
    if (courant.reduit) t.grp.position.y = 0; else rebonds.push({ grp: t.grp, t0: performance.now(), y0: 0.18 });
    renderer.shadowMap.needsUpdate = true; demander();
  }
  canvas.addEventListener("pointerup", relacher); canvas.addEventListener("pointercancel", relacher);
  // zoom molette / pincement (jalon : molette seule + double clic = vue d'ensemble)
  canvas.addEventListener("wheel", (ev) => { ev.preventDefault(); zoomVoulu = Math.max(0.9, Math.min(3.2, vue.zoom * (ev.deltaY < 0 ? 1.12 : 0.9))); vue.zoom = zoomVoulu; cibleVoulue = null; transition = 1; placerCamera(); demander(); }, { passive: false });
  canvas.addEventListener("dblclick", () => recadrer());

  return {
    maj(e) {
      const avant = courant; courant = e;
      if (!avant || avant.r !== e.r) { reconstruire(e); }
      if (!avant || avant.nuit !== e.nuit || avant.r !== e.r) { lumiere(e.nuit); if (!avant || avant.r !== e.r || (avant.nuit > 0.5) !== (e.nuit > 0.5)) refaireFixes(e); }
      canvas.style.touchAction = "none";
      if (avant && avant.deplacable !== e.deplacable) majHalos();
      if (e.focus && avant && avant.focus?.n !== e.focus.n) centrer(e);
      canvas.style.cursor = e.deplacable ? "grab" : "default";
      if (!pret) { pret = true; redim(); }
      demander();
    },
    vueEnsemble: () => recadrer(),
    position: (id) => { const g2 = groupes.get(id); return g2 ? [g2.position.x, g2.position.z] : null; },
    ecran: (x, z) => { const v = new THREE.Vector3(x, 0, z).project(cam), r = canvas.getBoundingClientRect(); return [r.left + ((v.x + 1) / 2) * r.width, r.top + ((1 - v.y) / 2) * r.height]; },
    ecranObjet: (id) => { const g2 = groupes.get(id); if (!g2) return null; const v = new THREE.Vector3(g2.position.x, 0.3, g2.position.z).project(cam), r = canvas.getBoundingClientRect(); return [r.left + ((v.x + 1) / 2) * r.width, r.top + ((1 - v.y) / 2) * r.height]; },
    chaises: (id) => groupes.get(id)?.userData.chaises ?? [],
    dims: (id) => { const u = groupes.get(id)?.userData; return u ? { w: u.w, d: u.d } : null; },
    vers(id, zoom) { const g2 = groupes.get(id); if (!g2) return; cibleVoulue = null; transition = 1; vue.cible.set(g2.position.x, 0.4, g2.position.z); vue.zoom = zoom; placerCamera(); demander(); },
    sous: (x, y) => objetSous(x, y),
    stats: () => ({ appels, triangles: tris, objets: objets.length, zoom: +vue.zoom.toFixed(3), cible: [+vue.cible.x.toFixed(2), +vue.cible.z.toFixed(2)] }),
    detruire() { ro.disconnect(); renderer.dispose(); renderer.forceContextLoss(); },
  };
}
