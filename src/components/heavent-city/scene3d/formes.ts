/**
 * Formes des objets du catalogue (mêmes identifiants que le SVG) et objets fixes de la scène 3D.
 * Volumes simples mais reconnaissables ; aucune donnée tarifaire. L'objet est construit dans un repère local :
 * X = grand axe, Z = face avant (vers le visiteur), Y = hauteur. Une case = 1 unité, une personne ≈ 1,0.
 */
import * as THREE from "./vendor/three.module.min.js";
import type { Rendu } from "../etat";
import type { Objet3D } from "./objets";

export interface Pal { accent: string; deco: string; nappe: string; fleurs: string }
const G = {
  cyl: new THREE.CylinderGeometry(1, 1, 1, 24), cyl8: new THREE.CylinderGeometry(1, 1, 1, 8), cone: new THREE.ConeGeometry(1, 1, 16), pyr: new THREE.ConeGeometry(1, 1, 4),
  box: new THREE.BoxGeometry(1, 1, 1), sph: new THREE.SphereGeometry(1, 12, 9), tore: new THREE.TorusGeometry(1, 0.08, 6, 24), plan: new THREE.PlaneGeometry(1, 1),
};
const cache = new Map<string, any>();
/** matière partagée (une seule par couleur/rugosité/métal/émission) */
export const mt = (c: string | number, rough = 0.7, metal = 0, emis = 0) => {
  const k = `${c}|${rough}|${metal}|${emis}`; let m = cache.get(k);
  if (!m) { m = new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: metal }); if (emis) { m.emissive = new THREE.Color(c); m.emissiveIntensity = emis; } cache.set(k, m); }
  return m;
};
const LAITON = () => mt("#C9A74E", 0.32, 0.75), BOIS_CLAIR = () => mt("#E3C9A0", 0.7), BOIS_SOMBRE = () => mt("#5A3A26", 0.65), BLANC = () => mt("#FAF5EA", 0.9), NOIR = () => mt("#1C1A20", 0.5, 0.2);
const PEAUX = ["#E8C3A0", "#C99A72", "#9A6B4A", "#F0CFB0"];

type Part = (geo: any, m: any, x: number, y: number, z: number, sx: number, sy?: number, sz?: number) => any;
function ouvrier(grp: any): Part {
  return (geo, m, x, y, z, sx, sy = sx, sz = sx) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); o.castShadow = true; o.receiveShadow = true; grp.add(o); return o; };
}
/** personne stylisée (robe ou costume) */
function personne(p: Part, x: number, y0: number, z: number, couleur: string, i = 0, h = 1) {
  p(G.cone, mt(couleur, 0.85), x, y0 + 0.36 * h, z, 0.2 * h, 0.72 * h, 0.2 * h);
  p(G.sph, mt(PEAUX[i % 4], 0.8), x, y0 + 0.82 * h, z, 0.11 * h);
  p(G.sph, mt(i % 3 === 0 ? "#2b1d16" : "#3a2a20", 0.9), x, y0 + 0.87 * h, z - 0.02 * h, 0.115 * h, 0.09 * h, 0.115 * h);
}
const bulbe = () => mt("#FFD98A", 0.4, 0, 1.4);

export function formeParId(grp: any, o: Objet3D, pal: Pal): boolean {
  const p = ouvrier(grp);
  const longX = o.hw >= o.hd, W = (longX ? o.hw : o.hd) * 2, D = (longX ? o.hd : o.hw) * 2;
  const loc = new THREE.Group(); if (!longX) loc.rotation.y = Math.PI / 2; grp.add(loc);
  const q = ouvrier(loc);
  const id = o.id, accent = mt(pal.accent, 0.6), deco = mt(pal.deco, 0.35, 0.6), nappe = mt(pal.nappe, 0.95), fleur = mt(pal.fleurs, 0.8);
  if (id === "estrade") {
    q(G.box, mt("#6B4A33", 0.7), 0, 0.15, 0, W, 0.3, D); q(G.box, LAITON(), 0, 0.31, D / 2 - 0.02, W, 0.03, 0.04); q(G.box, accent, 0, 0.305, 0, W * 0.9, 0.012, D * 0.8);
    q(G.box, mt("#6B4A33", 0.7), 0, 0.07, D / 2 + 0.2, Math.min(1.4, W * 0.4), 0.15, 0.4);
    q(G.box, BOIS_SOMBRE(), -W * 0.28, 0.75, -D * 0.15, 0.4, 0.9, 0.3); q(G.box, LAITON(), -W * 0.28, 1.21, -D * 0.15, 0.44, 0.03, 0.34); // pupitre
  } else if (id === "dj") {
    q(G.box, NOIR(), 0, 0.45, 0, W * 0.6, 0.9, D * 0.55); q(G.box, accent, 0, 0.92, D * 0.28, W * 0.6, 0.02, 0.02);
    for (const s of [-1, 1]) { q(G.cyl, NOIR(), s * W * 0.12, 0.94, 0, 0.17, 0.03, 0.17); q(G.cyl, LAITON(), s * W * 0.12, 0.96, 0, 0.04, 0.02, 0.04); }
    q(G.box, mt("#2a2a33", 0.4), 0, 0.95, 0, 0.18, 0.04, 0.3); q(G.box, mt("#cfd6e0", 0.3, 0.5), 0, 1.08, -D * 0.15, 0.4, 0.02, 0.28).rotation.x = -0.9;
    for (const s of [-1, 1]) { q(G.box, NOIR(), s * W * 0.46, 0.55, 0, 0.3, 1.1, 0.3); q(G.cyl, mt("#3a3a44", 0.6), s * W * 0.46, 0.75, D * 0.16, 0.09, 0.02, 0.09).rotation.x = Math.PI / 2; q(G.cyl, mt("#3a3a44", 0.6), s * W * 0.46, 0.4, D * 0.16, 0.12, 0.02, 0.12).rotation.x = Math.PI / 2; }
    personne(q, 0, 0, -D * 0.5, "#1c1a20", 2);
  } else if (id === "regie") {
    q(G.box, BOIS_SOMBRE(), 0, 0.37, 0, W, 0.06, D * 0.9); for (const s of [-1, 1]) q(G.box, BOIS_SOMBRE(), s * (W / 2 - 0.05), 0.18, 0, 0.06, 0.36, D * 0.9);
    for (const s of [-0.5, 0, 0.5]) { q(G.box, NOIR(), s * W * 0.4, 0.62, -0.1, 0.4, 0.26, 0.03); q(G.box, mt("#5aa0e0", 0.3, 0, 0.8), s * W * 0.4, 0.62, -0.085, 0.36, 0.22, 0.01); }
    q(G.box, mt("#cfd6e0", 0.3, 0.5), 0, 0.4, 0.15, W * 0.5, 0.02, 0.16);
  } else if (id === "orch") {
    q(G.box, mt("#6B4A33", 0.7), 0, 0.15, 0, W, 0.3, D); q(G.box, LAITON(), 0, 0.31, D / 2 - 0.02, W, 0.03, 0.04);
    const n = Math.max(3, Math.min(5, Math.round(W / 0.9)));
    for (let i = 0; i < n; i++) {
      const x = ((i + 0.5) / n - 0.5) * W * 0.85;
      const pp = q; pp(G.cone, mt(i % 2 ? "#1c1a20" : "#F6EFDD", 0.85), x, 0.3 + 0.36, 0, 0.2, 0.72, 0.2); pp(G.sph, mt(PEAUX[i % 4], 0.8), x, 0.3 + 0.82, 0, 0.11); pp(G.sph, mt("#2b1d16", 0.9), x, 0.3 + 0.87, -0.02, 0.115, 0.09, 0.115);
      if (i % 2 === 0) { pp(G.sph, mt("#8a4a24", 0.45), x, 0.3 + 0.5, 0.2, 0.17, 0.1, 0.12); pp(G.box, BOIS_SOMBRE(), x + 0.18, 0.3 + 0.62, 0.22, 0.28, 0.03, 0.03); } // luth
      else pp(G.cyl, mt("#d8c9a8", 0.6), x, 0.3 + 0.35, 0.25, 0.13, 0.3, 0.13); // tambour
    }
  } else if (id === "troupe") {
    const cols = ["#C9A74E", "#B65B38", "#2F6277", "#F1E6CE", "#7B2F3E"];
    for (let i = 0; i < 5; i++) { const x = (i - 2) * 0.32, z = (i % 2) * 0.22 - 0.1; q(G.cone, mt(cols[i], 0.85), x, 0.4, z, 0.2, 0.8, 0.2); q(G.sph, mt(PEAUX[i % 4], 0.8), x, 0.9, z, 0.11); q(G.cyl, mt(i % 2 ? "#B65B38" : "#C9A74E", 0.5), x, 0.98, z, 0.14, 0.1, 0.14); }
    q(G.cyl, mt("#8a5a30", 0.7), -0.65, 0.35, 0.3, 0.15, 0.2, 0.15); q(G.cyl, mt("#8a5a30", 0.7), 0.65, 0.35, 0.3, 0.15, 0.2, 0.15);
  } else if (id === "photobooth") {
    const H = 2.0;
    q(G.box, NOIR(), 0, H / 2, -D / 2 + 0.05, W, H, 0.08); for (const s of [-1, 1]) q(G.box, NOIR(), s * (W / 2 - 0.05), H / 2, 0, 0.08, H, D);
    q(G.box, BOIS_SOMBRE(), 0, H + 0.04, 0, W + 0.1, 0.08, D + 0.1); q(G.box, LAITON(), 0, H - 0.1, D / 2, W, 0.05, 0.03);
    q(G.box, accent, -W / 2 + 0.2, H * 0.55, D / 2 - 0.05, 0.4, H * 0.8, 0.04); // rideau
    q(G.box, mt("#FFF4D0", 0.3, 0, 1.2), 0, H - 0.25, -D / 2 + 0.12, W * 0.6, 0.1, 0.04); q(G.tore, LAITON(), 0, 1.2, -D / 2 + 0.14, 0.18, 0.18, 0.4);
    q(G.box, mt("#FFF4D0", 0.8), 0, 0.1, 0, W - 0.2, 0.2, D - 0.2);
  } else if (id === "candy") {
    q(G.box, nappe, 0, 0.33, 0, W, 0.66, D * 0.7); q(G.box, LAITON(), 0, 0.67, D * 0.35, W, 0.025, 0.03);
    const cs = ["#E8A6B0", "#F4D774", "#9DD3C8", "#C9A0DC"];
    for (let i = 0; i < 6; i++) { const x = ((i + 0.5) / 6 - 0.5) * W * 0.9, c = cs[i % 4]; q(G.cyl, mt("#E8F2F4", 0.1, 0, 0), x, 0.9, 0, 0.1, 0.4, 0.1).material = mt("#DCEBF0", 0.1); q(G.cyl, mt(c, 0.5), x, 0.84, 0, 0.085, 0.26, 0.085); q(G.cyl, LAITON(), x, 1.12, 0, 0.07, 0.04, 0.07); }
    q(G.box, mt("#F6EFDD", 0.8), 0, 1.3, -D * 0.33, W, 0.04, 0.3); q(G.box, BOIS_CLAIR(), 0, 0.65, -D * 0.33, W, 1.3, 0.04);
  } else if (id === "the") {
    q(G.box, BOIS_CLAIR(), 0, 0.4, 0, W, 0.8, D * 0.7); q(G.cyl, LAITON(), -W * 0.2, 0.84, 0, 0.3, 0.03, 0.3);
    for (let i = 0; i < 3; i++) { const x = -W * 0.2 + (i - 1) * 0.2; q(G.cyl, LAITON(), x, 0.97, 0, 0.09, 0.2, 0.09); q(G.sph, LAITON(), x, 1.1, 0, 0.07); q(G.box, LAITON(), x + 0.1, 1.0, 0, 0.1, 0.02, 0.02).rotation.z = 0.5; }
    for (let i = 0; i < 6; i++) q(G.cyl, mt("#E8D9B0", 0.2, 0, 0), W * 0.15 + (i % 3) * 0.12, 0.88, (Math.floor(i / 3) - 0.5) * 0.15, 0.035, 0.07, 0.035);
    q(G.cyl8, LAITON(), W * 0.4, 1.2, -D * 0.2, 0.01, 0.8, 0.01); q(G.cyl, mt("#FFD98A", 0.3, 0, 1.2), W * 0.4, 1.0, -D * 0.2, 0.08, 0.14, 0.08);
  } else if (id === "salon") {
    const rep = Math.max(W, D);
    q(G.box, mt(pal.accent, 0.95), 0, 0.01, 0.1, W, 0.02, D); // tapis
    const sofa = (x: number, z: number, w: number, d: number, ry: number) => { const s = new THREE.Group(); s.position.set(x, 0, z); s.rotation.y = ry; loc.add(s); const r = ouvrier(s); r(G.box, mt("#7A2F3E", 0.9), 0, 0.2, 0, w, 0.4, d); r(G.box, mt("#7A2F3E", 0.9), 0, 0.5, -d * 0.42, w, 0.4, d * 0.18); for (let i = 0; i < Math.max(2, Math.floor(w / 0.55)); i++) r(G.box, mt(i % 2 ? "#C9A74E" : "#2F6277", 0.9), ((i + 0.5) / Math.max(2, Math.floor(w / 0.55)) - 0.5) * w * 0.9, 0.5, d * 0.1, 0.3, 0.25, 0.1); };
    sofa(0, -D * 0.4, W * 0.95, 0.5, 0); sofa(-W * 0.45, 0, D * 0.6, 0.5, Math.PI / 2); sofa(W * 0.45, 0, D * 0.6, 0.5, -Math.PI / 2);
    q(G.cyl, LAITON(), 0, 0.25, 0.1, 0.32, 0.05, 0.32); q(G.cyl8, LAITON(), 0, 0.12, 0.1, 0.06, 0.24, 0.06); void rep;
  } else if (id === "fontaine") {
    const R = o.hw;
    q(G.cyl8, mt("#2F6277", 0.4), 0, 0.17, 0, R, 0.34, R); q(G.cyl8, mt("#F1E6CE", 0.5), 0, 0.35, 0, R * 0.92, 0.04, R * 0.92); q(G.cyl, mt("#7fd0e0", 0.05, 0.1), 0, 0.33, 0, R * 0.82, 0.04, R * 0.82);
    q(G.cyl8, mt("#F1E6CE", 0.5), 0, 0.6, 0, 0.12, 0.5, 0.12); q(G.cyl, mt("#2F6277", 0.4), 0, 0.88, 0, 0.32, 0.1, 0.32); q(G.cyl, mt("#9fe0ee", 0.05, 0.1, 0.2), 0, 0.94, 0, 0.27, 0.03, 0.27); q(G.sph, mt("#bfeaf5", 0.1, 0, 0.4), 0, 1.1, 0, 0.07, 0.14, 0.07);
  } else if (id === "gateau") {
    [[0.5, 0.3], [0.38, 0.28], [0.27, 0.26]].forEach(([r, h], i) => { const y = 0.3 + [0, 0.3, 0.58][i]; q(G.cyl, i % 2 ? mt("#F6EFDD", 0.6) : BLANC(), 0, y + h / 2, 0, r * 0.85, h, r * 0.85); q(G.tore, LAITON(), 0, y + 0.02, 0, r * 0.86, r * 0.86, 0.5).rotation.x = Math.PI / 2; });
    q(G.cyl, nappe, 0, 0.15, 0, 0.46, 0.3, 0.46); q(G.sph, fleur, 0, 0.95, 0, 0.1);
  } else if (id === "amariya") {
    const w = W * 0.6, d = D * 0.7, H = 1.9;
    q(G.box, mt("#6B4A33", 0.7), 0, 0.18, 0, w, 0.18, d); q(G.box, accent, 0, 0.32, 0, w * 0.8, 0.1, d * 0.8);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) q(G.cyl8, LAITON(), sx * (w / 2 - 0.08), H / 2, sz * (d / 2 - 0.08), 0.04, H, 0.04);
    q(G.pyr, LAITON(), 0, H + 0.2, 0, w * 0.78, 0.5, d * 0.78).rotation.y = Math.PI / 4; q(G.box, accent, 0, H - 0.02, 0, w + 0.1, 0.06, d + 0.1);
    for (const s of [-1, 1]) q(G.box, mt("#7A2F3E", 0.9), 0, H * 0.55, s * (d / 2 - 0.1), w * 0.85, H * 0.6, 0.02); // voiles
    for (const s of [-1, 1]) { q(G.cyl8, BOIS_SOMBRE(), 0, 0.12, s * (d / 2 + 0.25), w * 0.5 + 0.2, 0.025, 0.025).rotation.z = Math.PI / 2; }
    q(G.box, mt("#F6EFDD", 0.8), 0, 0.5, 0, 0.5, 0.3, 0.35);
  } else if (id === "neggafa") {
    q(G.cone, mt("#C9A74E", 0.5, 0.3), 0, 0.5, 0, 0.42, 1.0, 0.42); q(G.cone, mt("#7A2F3E", 0.85), 0, 0.55, 0.02, 0.32, 0.9, 0.3); q(G.sph, mt(PEAUX[1], 0.8), 0, 1.12, 0, 0.12); q(G.cyl, LAITON(), 0, 1.25, 0, 0.14, 0.1, 0.14); q(G.tore, LAITON(), 0, 0.72, 0.28, 0.16, 0.16, 0.5).rotation.x = Math.PI / 2;
  } else if (id === "fauteuils") {
    q(G.box, mt("#6B4A33", 0.7), 0, 0.1, 0, W, 0.2, D); q(G.box, accent, 0, 0.21, 0.05, W * 0.9, 0.02, D * 0.85);
    for (const s of [-1, 1]) { const x = s * W * 0.22; q(G.box, mt("#F6EFDD", 0.8), x, 0.45, 0.02, 0.55, 0.3, 0.5); q(G.box, mt("#F6EFDD", 0.8), x, 0.9, -0.2, 0.55, 0.8, 0.1); q(G.tore, LAITON(), x, 1.05, -0.14, 0.26, 0.26, 0.4); for (const t of [-1, 1]) q(G.box, mt("#F6EFDD", 0.8), x + t * 0.3, 0.55, 0.02, 0.08, 0.3, 0.45); }
    q(G.cyl, mt("#7A2F3E", 0.9), 0, 0.3, 0.3, 0.12, 0.2, 0.12); q(G.sph, fleur, 0, 0.5, 0.3, 0.14, 0.1, 0.14);
  } else if (id === "henne") {
    q(G.box, mt(pal.accent, 0.95), 0, 0.01, 0, W, 0.02, D);
    for (const [x, z, w, ry] of [[0, -D * 0.38, W * 0.95, 0], [-W * 0.4, 0, D * 0.7, Math.PI / 2]] as const) { const s = new THREE.Group(); s.position.set(x, 0, z); s.rotation.y = ry; loc.add(s); const r = ouvrier(s); r(G.box, mt("#B65B38", 0.9), 0, 0.2, 0, w, 0.4, 0.5); r(G.box, mt("#B65B38", 0.9), 0, 0.5, -0.2, w, 0.4, 0.1); for (let i = 0; i < 4; i++) r(G.box, mt(i % 2 ? "#C9A74E" : "#F1E6CE", 0.9), ((i + 0.5) / 4 - 0.5) * w * 0.85, 0.5, 0.0, 0.3, 0.25, 0.1); }
    q(G.cyl, LAITON(), 0.1, 0.2, 0.1, 0.34, 0.04, 0.34); q(G.cyl8, LAITON(), 0.1, 0.1, 0.1, 0.06, 0.2, 0.06); for (let i = 0; i < 4; i++) q(G.cone, mt("#7a4a22", 0.7), 0.1 + (i - 1.5) * 0.1, 0.27, 0.1, 0.025, 0.1, 0.025).rotation.z = 1.2;
  } else if (id === "livre") {
    q(G.cyl, LAITON(), 0, 0.5, 0, 0.18, 1.0, 0.18); q(G.box, mt("#F6EFDD", 0.7), -0.1, 1.04, 0, 0.2, 0.03, 0.28).rotation.z = 0.12; q(G.box, mt("#F6EFDD", 0.7), 0.1, 1.04, 0, 0.2, 0.03, 0.28).rotation.z = -0.12; q(G.box, mt("#7A2F3E", 0.8), 0, 1.01, 0, 0.44, 0.02, 0.32); q(G.cyl8, LAITON(), 0.3, 1.1, 0.05, 0.01, 0.2, 0.01).rotation.z = 1.1;
  } else if (id.startsWith("mic")) {
    q(G.cyl, NOIR(), 0, 0.02, 0, 0.14, 0.04, 0.14); q(G.cyl8, mt("#cfd6e0", 0.3, 0.6), 0, 0.6, 0, 0.012, 1.2, 0.012); q(G.sph, mt("#2a2a33", 0.4), 0, 1.25, 0, 0.05);
  } else if (id === "enceintes") {
    q(G.box, NOIR(), 0, 0.55, 0, 0.5, 1.1, 0.4); q(G.cyl, mt("#3a3a44", 0.6), 0, 0.8, 0.205, 0.14, 0.02, 0.14).rotation.x = Math.PI / 2; q(G.cyl, mt("#3a3a44", 0.6), 0, 0.4, 0.205, 0.18, 0.02, 0.18).rotation.x = Math.PI / 2;
  } else if (id === "acoustique") {
    q(G.cyl, BOIS_SOMBRE(), 0, 0.3, 0, 0.14, 0.6, 0.14); personne(p, 0, 0, 0, "#3d352e", 1, 1); q(G.sph, mt("#a55a28", 0.4), 0.14, 0.55, 0.16, 0.15, 0.1, 0.07); q(G.box, BOIS_SOMBRE(), 0.35, 0.8, 0.16, 0.34, 0.03, 0.03).rotation.z = 0.5;
  } else if (id === "photographe") {
    personne(p, 0, 0, 0, "#1f1d22", 0, 1.05); q(G.box, NOIR(), 0.1, 0.8, 0.16, 0.16, 0.1, 0.1); q(G.cyl, NOIR(), 0.1, 0.8, 0.26, 0.04, 0.06, 0.04).rotation.x = Math.PI / 2;
  } else if (id === "interv") {
    q(G.box, nappe, 0, 0.36, 0, W, 0.72, D * 0.6); q(G.box, LAITON(), 0, 0.73, D * 0.3, W, 0.025, 0.03);
    for (let i = 0; i < 3; i++) { const x = ((i + 0.5) / 3 - 0.5) * W * 0.8; q(G.box, mt("#F6EFDD", 0.7), x, 0.3, -D * 0.55, 0.3, 0.05, 0.3); q(G.box, mt("#F6EFDD", 0.7), x, 0.6, -D * 0.7, 0.3, 0.45, 0.04); q(G.cyl, mt("#E8F2F4", 0.1), x + 0.12, 0.82, 0.05, 0.035, 0.18, 0.035); }
  } else if (id === "enfants") {
    q(G.box, mt("#9DD3C8", 0.95), 0, 0.015, 0, W, 0.03, D);
    const cs = ["#E8A6B0", "#F4D774", "#C9A0DC", "#9DD3C8"]; for (let i = 0; i < 5; i++) q(G.box, mt(cs[i % 4], 0.8), (i - 2) * 0.45, 0.13, (i % 2 - 0.5) * 0.7, 0.26, 0.26, 0.26).rotation.y = i;
    q(G.pyr, mt("#F6EFDD", 0.9), -W * 0.3, 0.55, -D * 0.25, 0.7, 1.1, 0.7).rotation.y = Math.PI / 4; q(G.sph, mt("#E8A6B0", 0.4), W * 0.3, 0.2, D * 0.2, 0.2);
  } else return false;
  return true;
}

/** Objets fixes (non déplaçables) : accueil, hôtesses, bouquets, candélabres, lanternes, feux froids, guirlandes, piscine. */
export function construireFixes(r: Rendu, pal: Pal, nuit: number): any {
  const grp = new THREE.Group(), P = r.salle.pos, N = r.salle.n, p = ouvrier(grp);
  const at = (x: number, z: number) => { const g2 = new THREE.Group(); g2.position.set(x, 0, z); grp.add(g2); return ouvrier(g2); };
  if (r.accueils.includes("hotesses") || r.accueils.includes("maitre_hotel")) P.HOTESSES.forEach(([gx, gy], i) => { personne(at(gx, gy), 0, 0, 0, pal.nappe, i, 1.1); });
  if (r.accueils.includes("maitre_hotel")) { const [mx, my] = P.MAITRE_HOTEL, [hx, hy] = P.HOTESSE_3; personne(at(mx, my), 0, 0, 0, "#1f1d22", 3, 1.15); personne(at(hx, hy), 0, 0, 0, pal.nappe, 0, 1.1); }
  if (r.accueils.includes("the") || r.accueils.includes("discret")) {
    const q = at(P.COMPTOIR[0], P.COMPTOIR[1]); q(G.box, BOIS_CLAIR(), 0, 0.4, 0, 1.2, 0.8, 0.5); q(G.box, LAITON(), 0, 0.82, 0.24, 1.2, 0.03, 0.03);
    if (r.accueils.includes("the")) { q(G.cyl, LAITON(), -0.2, 0.96, 0, 0.09, 0.2, 0.09); q(G.sph, LAITON(), -0.2, 1.08, 0, 0.07); q(G.cyl, LAITON(), 0.25, 0.84, 0, 0.2, 0.03, 0.2); } else q(G.box, mt("#F6EFDD", 0.8), 0, 0.85, 0, 0.5, 0.04, 0.3);
  }
  if (r.options.has("fleurs")) P.BOUQUETS.forEach(([gx, gy]) => { const q = at(gx, gy); q(G.cyl, LAITON(), 0, 0.3, 0, 0.14, 0.6, 0.14); for (let i = 0; i < 7; i++) q(G.sph, mt(i % 2 ? pal.fleurs : "#FBF6EA", 0.8), Math.cos(i * 0.9) * 0.18, 0.78 + (i % 3) * 0.08, Math.sin(i * 0.9) * 0.18, 0.13); q(G.sph, mt("#4F7A4A", 0.9), 0, 0.7, 0, 0.2, 0.1, 0.2); });
  if (r.lumiere === "bougies") P.CANDELABRES.forEach(([gx, gy]) => { const q = at(gx, gy); q(G.cyl, LAITON(), 0, 0.03, 0, 0.14, 0.06, 0.14); q(G.cyl8, LAITON(), 0, 0.5, 0, 0.025, 1.0, 0.025); for (const dx of [-0.16, 0, 0.16]) { q(G.cyl8, LAITON(), dx, 0.98, 0, 0.012, 0.06, 0.012); q(G.cyl8, BLANC(), dx, 1.1, 0, 0.018, 0.16, 0.018); q(G.sph, bulbe(), dx, 1.22, 0, 0.03, 0.05, 0.03); } q(G.box, LAITON(), 0, 0.98, 0, 0.36, 0.015, 0.015); });
  if (r.lumiere === "chaleureuse") P.POSTES_LANTERNES.forEach(([gx, gy]) => { const q = at(gx, gy); q(G.cyl8, LAITON(), 0, 0.9, 0, 0.03, 1.8, 0.03); q(G.cyl, LAITON(), 0, 0.03, 0, 0.12, 0.06, 0.12); q(G.cyl8, LAITON(), 0, 1.92, 0, 0.1, 0.18, 0.1); q(G.cyl8, mt("#FFD98A", 0.3, 0, 1.3), 0, 1.78, 0, 0.075, 0.2, 0.075); q(G.cone, LAITON(), 0, 2.08, 0, 0.14, 0.14, 0.14); });
  if (r.options.has("feux_froids")) P.FEUX.forEach(([gx, gy]) => { const q = at(gx, gy); q(G.cyl, NOIR(), 0, 0.1, 0, 0.09, 0.2, 0.09); for (let i = 0; i < 6; i++) q(G.sph, mt("#BFE3FF", 0.3, 0, 1.4), (i - 2.5) * 0.02, 0.4 + i * 0.22, 0, 0.035 + i * 0.006); });
  if (r.lumiere === "etoilee") {
    const ax = r.salle.ax, H = 3.0;
    const cordes: [[number, number], [number, number]][] = [[[0.3, N - 0.5], [0.3, 0.3]], [[0.3, 0.3], [N - 0.4, 0.3]], [[0.3, N / 2 + 0.1], [N - 0.4, N / 2 + 0.1]], [[ax - 0.9, N - 0.2], [N - 0.4, N / 2 + 0.1]]];
    const bulbes: [number, number, number][] = [];
    for (const [[x1, z1], [x2, z2]] of cordes) {
      const pts: any[] = []; for (let k = 0; k <= 24; k++) { const t = k / 24; pts.push(new THREE.Vector3(x1 + (x2 - x1) * t, H - Math.sin(t * Math.PI) * 0.35, z1 + (z2 - z1) * t)); }
      grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x3a3128 })));
      const nb = Math.round(Math.hypot(x2 - x1, z2 - z1) * 1.3); for (let k = 0; k < nb; k++) { const t = (k + 0.5) / nb; bulbes.push([x1 + (x2 - x1) * t, H - Math.sin(t * Math.PI) * 0.35 - 0.06, z1 + (z2 - z1) * t]); }
    }
    const im = new THREE.InstancedMesh(G.sph, bulbe(), bulbes.length); const m = new THREE.Matrix4();
    bulbes.forEach(([x, y, z], i) => { m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion(), new THREE.Vector3(0.05, 0.05, 0.05)); im.setMatrixAt(i, m); }); grp.add(im);
    for (const [x, z] of [[0.3, N - 0.5], [0.3, 0.3], [N - 0.4, 0.3], [0.3, N / 2 + 0.1], [N - 0.4, N / 2 + 0.1]]) p(G.cyl8, mt("#3a3128", 0.8), x, H / 2, z, 0.03, H, 0.03);
  }
  if (r.lieu === "villa") {
    // bassin derrière le mur bas (côté gy < 0), eau réfléchissante, fleurs et bougies flottantes, piscine illuminée
    const eau = mt(nuit > 0.5 ? "#1c4a78" : "#79C2D3", 0.04, 0.35, r.options.has("piscine_lumiere") ? 0.9 : 0.05);
    p(G.box, mt("#EFEADF", 0.6), N / 2, -0.12, -2.45, N + 0.4, 0.3, 4.3); p(G.box, eau, N / 2, 0.0, -2.45, N - 0.2, 0.06, 3.9);
    for (let i = 0; i < 12; i++) p(G.cyl, mt(i % 2 ? pal.fleurs : "#FBF6EA", 0.8), 0.8 + ((i * 1.37) % (N - 1.6)), 0.05, -0.9 - ((i * 0.73) % 3), r.options.has("piscine_fleurs") ? 0.12 : 0.0001, 0.02, r.options.has("piscine_fleurs") ? 0.12 : 0.0001);
    if (r.options.has("piscine_bougies")) for (let i = 0; i < 8; i++) { p(G.cyl, BLANC(), 1.2 + i * ((N - 2.4) / 8), 0.1, -1.4 - (i % 3) * 0.9, 0.05, 0.1, 0.05); p(G.sph, bulbe(), 1.2 + i * ((N - 2.4) / 8), 0.18, -1.4 - (i % 3) * 0.9, 0.025, 0.04, 0.025); }
    for (const u of [N * 0.12, N * 0.37, N * 0.65]) { p(G.cyl8, mt("#5c4630", 0.9), u, 0.8, -3.4, 0.07, 1.6, 0.07); for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2, f = p(G.cone, mt("#4F7A4A", 0.85), u + Math.cos(a) * 0.5, 1.6, -3.4 + Math.sin(a) * 0.5, 0.12, 1.0, 0.12); f.rotation.set(Math.sin(a) * 1.2, 0, -Math.cos(a) * 1.2); } }
  }
  return grp;
}
