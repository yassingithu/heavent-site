const TUILAGES = [
  { id: "carre", nom: "Carr\xE9s (4\u2074)", theta: [45, 60, 70] },
  { id: "hexagone", nom: "Hexagones (6\xB3)", theta: [30, 45, 60] },
  { id: "octogone-carre", nom: "Octogones et carr\xE9s (4.8.8)", theta: [45, 56, 67.5] },
  { id: "kagome", nom: "Hexagones et triangles (3.6.3.6)", theta: [30, 45, 60] }
];
const rad = (d) => d * Math.PI / 180;
const polygoneRegulier = (cx, cy, n, rayon, rot) => Array.from({ length: n }, (_, i) => ({ x: cx + rayon * Math.cos(rot + 2 * Math.PI * i / n), y: cy + rayon * Math.sin(rot + 2 * Math.PI * i / n) }));
function pavage(tuilage, a, largeur, hauteur) {
  const out = [];
  const marge = 3;
  if (tuilage === "carre") {
    for (let i = -marge; i * a < largeur + marge * a; i++)
      for (let j = -marge; j * a < hauteur + marge * a; j++)
        out.push([{ x: i * a, y: j * a }, { x: (i + 1) * a, y: j * a }, { x: (i + 1) * a, y: (j + 1) * a }, { x: i * a, y: (j + 1) * a }]);
  } else if (tuilage === "hexagone") {
    const dx = a * Math.sqrt(3), dy = 1.5 * a;
    for (let j = -marge; j * dy < hauteur + marge * dy; j++)
      for (let i = -marge; i * dx < largeur + marge * dx; i++)
        out.push(polygoneRegulier(i * dx + (j & 1 ? dx / 2 : 0), j * dy, 6, a, rad(30)));
  } else if (tuilage === "octogone-carre") {
    const p = a * (1 + Math.SQRT2), R = a / (2 * Math.sin(Math.PI / 8));
    for (let i = -marge; i * p < largeur + marge * p; i++)
      for (let j = -marge; j * p < hauteur + marge * p; j++) {
        out.push(polygoneRegulier(i * p, j * p, 8, R, rad(22.5)));
        out.push(polygoneRegulier(i * p + p / 2, j * p + p / 2, 4, a / Math.SQRT2, rad(0)));
      }
  } else {
    const h = Math.sqrt(3) / 2 * a;
    for (let n = -marge; n * h * 2 < hauteur + marge * 2 * h; n++)
      for (let m = -marge * 2; m * 2 * a < largeur + marge * 2 * a; m++) {
        const ox = 2 * a * m + a * n, oy = 2 * h * n;
        out.push(polygoneRegulier(ox, oy, 6, a, 0));
        out.push([{ x: ox + a / 2, y: oy + h }, { x: ox + a, y: oy }, { x: ox + 1.5 * a, y: oy + h }]);
        out.push([{ x: ox + 1.5 * a, y: oy + h }, { x: ox + 2 * a, y: oy + 2 * h }, { x: ox + 2.5 * a, y: oy + h }]);
      }
  }
  return out.map(orienter);
}
const aire = (p) => p.reduce((s, q, i) => {
  const r = p[(i + 1) % p.length];
  return s + (q.x * r.y - r.x * q.y);
}, 0) / 2;
const orienter = (p) => aire(p) < 0 ? [...p].reverse() : p;
function rencontre(p, d, q, e) {
  const det = d.x * e.y - d.y * e.x;
  if (Math.abs(det) < 1e-9) return null;
  const s = ((q.x - p.x) * e.y - (q.y - p.y) * e.x) / det;
  const t = ((q.x - p.x) * d.y - (q.y - p.y) * d.x) / det;
  if (s <= 1e-9 || t <= 1e-9) return null;
  return { x: p.x + s * d.x, y: p.y + s * d.y };
}
function remplir(poly, theta) {
  const n = poly.length, th = rad(theta);
  const milieu = [], dir = [], norm = [];
  for (let i = 0; i < n; i++) {
    const p = poly[i], q = poly[(i + 1) % n];
    const L = Math.hypot(q.x - p.x, q.y - p.y);
    const d = { x: (q.x - p.x) / L, y: (q.y - p.y) / L };
    milieu.push({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
    dir.push(d);
    norm.push({ x: -d.y, y: d.x });
  }
  const vers = (i, versFin) => {
    const s = versFin ? 1 : -1;
    return { x: s * Math.cos(th) * dir[i].x + Math.sin(th) * norm[i].x, y: s * Math.cos(th) * dir[i].y + Math.sin(th) * norm[i].y };
  };
  const segs = [];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const a = vers(i, true), b = vers(j, false);
    const x = rencontre(milieu[i], a, milieu[j], b);
    if (x) {
      segs.push([milieu[i], x], [milieu[j], x]);
      continue;
    }
    const cx = milieu[j].x - milieu[i].x, cy = milieu[j].y - milieu[i].y;
    if (Math.abs(a.x * b.y - a.y * b.x) < 1e-9 && Math.abs(cx * a.y - cy * a.x) < 1e-6 && cx * a.x + cy * a.y > 0) segs.push([milieu[i], milieu[j]]);
  }
  return segs;
}
function genererMotif(p) {
  const poly = pavage(p.tuilage, p.cote, p.largeur, p.hauteur);
  const segments = poly.flatMap((q) => remplir(q, Math.min(85, Math.max(10, p.theta))));
  return { segments, polygones: poly, largeur: p.largeur, hauteur: p.hauteur };
}
const f = (n) => n.toFixed(2);
function versSVG(m, s) {
  const tuiles = s.tuiles?.length ? m.polygones.map((q, i) => `<path d="M${q.map((t) => `${f(t.x)} ${f(t.y)}`).join("L")}Z" fill="${s.tuiles[i % s.tuiles.length]}"/>`).join("") : "";
  const d = m.segments.map(([a, b]) => `M${f(a.x)} ${f(a.y)}L${f(b.x)} ${f(b.y)}`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${m.largeur} ${m.hauteur}" width="${m.largeur}" height="${m.hauteur}">` + (s.fond !== "none" ? `<rect width="100%" height="100%" fill="${s.fond}"/>` : "") + tuiles + `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="${s.trait}" stroke-width="${s.epaisseur}"/><path d="${d}" stroke="${s.ruban}" stroke-width="${s.epaisseur * 0.5}"/></g></svg>`;
}
export {
  TUILAGES,
  genererMotif,
  pavage,
  remplir,
  versSVG
};
