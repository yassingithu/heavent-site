import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const P = new URLSearchParams(location.search);
const VUE = P.get("vue") || "tout";
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
// Ciel de fin de journée (dégradé)
const cv = document.createElement("canvas"); cv.width = 4; cv.height = 256; const g = cv.getContext("2d");
const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, "#2b3a63"); gr.addColorStop(.55, "#c98a6b"); gr.addColorStop(.8, "#e3a874"); gr.addColorStop(1, "#d9a77c");
g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
const ciel = new THREE.CanvasTexture(cv); ciel.colorSpace = THREE.SRGBColorSpace; scene.background = ciel;
scene.fog = new THREE.Fog(0xd9a77c, 30, 62);
const pm = new THREE.PMREMGenerator(renderer);
scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.35;

const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 200);
const cams = { tout: [13, 8.5, 15, 0, 1.4, 0], tente: [6.8, 4.2, 8.2, 0, 1.7, 0], table: [3.2, 2.6, 4.2, 0, .8, 0], arche: [4.2, 2.4, 6, 0, 1.6, 0] };
const c = cams[VUE] || cams.tout; camera.position.set(c[0], c[1], c[2]);
const controls = new OrbitControls(camera, renderer.domElement); controls.target.set(c[3], c[4], c[5]); controls.enableDamping = true; controls.maxPolarAngle = Math.PI / 2.05; controls.update();

// Lumière : soleil bas, chaud, ombres douces + ciel froid
const soleil = new THREE.DirectionalLight(0xffc88a, 3.2); soleil.position.set(-12, 9, 8); soleil.castShadow = true;
soleil.shadow.mapSize.set(2048, 2048); const s = soleil.shadow.camera; s.left = -14; s.right = 14; s.top = 14; s.bottom = -14; s.near = 1; s.far = 50; soleil.shadow.radius = 5; soleil.shadow.bias = -0.0004; soleil.shadow.normalBias = 0.03;
scene.add(soleil);
scene.add(new THREE.HemisphereLight(0x8fa6d8, 0x6d5a3c, 0.55));

// Textures procédurales
function bruit(w, h, f) { const k = document.createElement("canvas"); k.width = w; k.height = h; const x = k.getContext("2d"); f(x, w, h); const t = new THREE.CanvasTexture(k); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; return t; }
const herbe = bruit(512, 512, (x, w, h) => { x.fillStyle = "#5d7a3a"; x.fillRect(0, 0, w, h); for (let i = 0; i < 26000; i++) { const l = 40 + Math.random() * 35; x.fillStyle = `hsl(${78 + Math.random() * 30},${35 + Math.random() * 25}%,${l}%)`; x.fillRect(Math.random() * w, Math.random() * h, 1.4, 2 + Math.random() * 4); } });
herbe.repeat.set(55, 55);
const sol = new THREE.Mesh(new THREE.CircleGeometry(90, 64), new THREE.MeshStandardMaterial({ map: herbe, roughness: 1 })); sol.rotation.x = -Math.PI / 2; sol.receiveShadow = true; scene.add(sol);
const tapisTex = bruit(512, 512, (x, w, h) => { x.fillStyle = "#7a2d2a"; x.fillRect(0, 0, w, h); x.strokeStyle = "#e3c26b"; x.lineWidth = 8; x.strokeRect(24, 24, w - 48, h - 48); x.lineWidth = 3; x.strokeRect(46, 46, w - 92, h - 92); x.save(); x.translate(w / 2, h / 2); for (let r = 0; r < 8; r++) { x.rotate(Math.PI / 4); x.beginPath(); x.ellipse(0, 70, 26, 62, 0, 0, 7); x.fillStyle = r % 2 ? "#e3c26b" : "#2d5a6b"; x.fill(); x.strokeStyle = "#f4e3b0"; x.lineWidth = 2; x.stroke(); } x.restore(); for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(0,0,0,${Math.random() * .08})`; x.fillRect(Math.random() * w, Math.random() * h, 2, 2); } });
const toileTex = bruit(256, 256, (x, w, h) => { x.fillStyle = "#f2e8d2"; x.fillRect(0, 0, w, h); for (let i = 0; i < w; i += 3) { x.fillStyle = `rgba(120,100,60,${.03 + Math.random() * .05})`; x.fillRect(i, 0, 1, h); x.fillRect(0, i, w, 1); } });

const M = (o) => new THREE.MeshStandardMaterial(o);
const or = M({ color: 0xd9ac45, metalness: 1, roughness: 0.28 });
const bois = M({ color: 0x6e4a2c, roughness: 0.7 });
function cast(o) { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; }
const lumieres = [];

/* ------------------------------ TENTE ------------------------------ */
function tente() {
  const gp = new THREE.Group(); const R = 3.4, Hm = 2.1, Ht = 4.6, N = 12;
  const tap = new THREE.Mesh(new THREE.BoxGeometry(R * 1.75, .05, R * 1.75), M({ map: tapisTex, roughness: .95 })); tap.position.y = .03; gp.add(tap);
  // toit en 12 pans, bandes alternées couleur / ivoire
  const toit = new THREE.Group();
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2;
    const g = new THREE.BufferGeometry();
    const p = [Math.cos(a0) * R, Hm, Math.sin(a0) * R, Math.cos(a1) * R, Hm, Math.sin(a1) * R, 0, Ht, 0];
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, .5, 1], 2)); g.computeVertexNormals();
    toit.add(new THREE.Mesh(g, M({ map: toileTex, color: i % 2 ? 0x8c2f39 : 0xfff4dc, roughness: .85, side: THREE.DoubleSide })));
    // volant festonné : 2 festons par pan, suspendus sous le bord
    for (let j = 0; j < 2; j++) {
      const am = a0 + (a1 - a0) * (j + .5) / 2, larg = 2 * R * Math.sin(Math.PI / N) / 2 * .96;
      const fest = new THREE.Mesh(new THREE.CircleGeometry(1, 24, Math.PI, Math.PI), M({ color: (i + j) % 2 ? 0xfff4dc : 0x8c2f39, roughness: .85, side: THREE.DoubleSide }));
      fest.scale.set(larg / 2, .34, 1); fest.position.set(Math.cos(am) * R * .985, Hm, Math.sin(am) * R * .985); fest.rotation.y = -am + Math.PI / 2; toit.add(fest);
    }
  }
  gp.add(toit);
  // mur intérieur drapé (ouvert côté caméra) : arcs
  for (let i = 0; i < N; i++) {
    const am = ((i + .5) / N) * Math.PI * 2; if (am > 0.15 && am < 2.2) continue; // ouverture devant
    const mur = new THREE.Mesh(new THREE.PlaneGeometry(2 * R * Math.sin(Math.PI / N) * .98, Hm), M({ color: 0x264f63, roughness: .9, side: THREE.DoubleSide }));
    mur.position.set(Math.cos(am) * R * Math.cos(Math.PI / N), Hm / 2, Math.sin(am) * R * Math.cos(Math.PI / N)); mur.rotation.y = -am + Math.PI / 2; gp.add(mur);
    const arc = new THREE.Mesh(new THREE.TorusGeometry(.5, .035, 10, 24, Math.PI), or); arc.position.set(Math.cos(am) * (R * Math.cos(Math.PI / N) - .02), 1, Math.sin(am) * (R * Math.cos(Math.PI / N) - .02)); arc.rotation.y = -am + Math.PI / 2; arc.position.y = .8; gp.add(arc);
  }
  // poteaux
  for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; const p = new THREE.Mesh(new THREE.CylinderGeometry(.045, .05, Hm, 10), bois); p.position.set(Math.cos(a) * R, Hm / 2, Math.sin(a) * R); gp.add(p); }
  const mat = new THREE.Mesh(new THREE.CylinderGeometry(.06, .08, Ht - Hm + .6, 10), bois); mat.position.y = (Ht + Hm - .6) / 2 + .15; mat.scale.set(1, 1, 1); gp.add(mat);
  const boule = new THREE.Mesh(new THREE.SphereGeometry(.14, 24, 16), or); boule.position.y = Ht + .35; gp.add(boule);
  // poufs, table basse, plateau cuivré
  const lat = []; for (let i = 0; i <= 10; i++) { const t = i / 10; lat.push(new THREE.Vector2(.34 * Math.sin(Math.PI * t * .95) + .03, t * .5)); }
  [[-1.4, -.6, 0xb8452f], [-.5, 1.4, 0xfff4dc], [1.5, .9, 0xb8452f], [.9, -1.5, 0x264f63], [-1.6, .8, 0xe3c26b]].forEach(([x, z, col], i) => { const p = new THREE.Mesh(new THREE.LatheGeometry(lat, 28), M({ color: col, roughness: .8 })); p.position.set(x, .05, z); p.rotation.y = i; gp.add(p); });
  const tb = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, .04, 40), or); tb.position.y = .52; gp.add(tb);
  const pied = new THREE.Mesh(new THREE.CylinderGeometry(.28, .35, .5, 24), M({ color: 0x3b2a1c, metalness: .5, roughness: .4 })); pied.position.y = .27; gp.add(pied);
  const th = new THREE.Mesh(new THREE.LatheGeometry([[.0, 0], [.07, 0], [.06, .1], [.1, .2], [.03, .24], [.0, .24]].map(([x, y]) => new THREE.Vector2(x, y)), 18), or); th.position.set(0, .54, 0); gp.add(th);
  // lanternes avec vraie lumière chaude
  [0, 3, 6, 9].forEach((k) => { const a = ((k + .5) / N) * Math.PI * 2; const L = new THREE.Group(); const corps = new THREE.Mesh(new THREE.CylinderGeometry(.11, .08, .26, 6), M({ color: 0xffd78a, emissive: 0xffb04a, emissiveIntensity: 1.1, roughness: .3 })); const cap = new THREE.Mesh(new THREE.ConeGeometry(.14, .12, 6), or); cap.position.y = .19; L.add(corps, cap);
    L.position.set(Math.cos(a) * (R - .25), Hm - .55, Math.sin(a) * (R - .25)); gp.add(L); const pl = new THREE.PointLight(0xffa64a, 4, 6, 2); pl.position.copy(L.position); gp.add(pl); lumieres.push(pl); });
  return cast(gp);
}

/* ------------------------------ TABLE RONDE ------------------------------ */
function table() {
  const gp = new THREE.Group();
  const nappe = [[0, .76], [.8, .76], [.86, .74], [.95, .45], [1.02, .1], [1.04, 0]].map(([x, y]) => new THREE.Vector2(x, y));
  const plis = new THREE.LatheGeometry(nappe, 96); const pos = plis.attributes.position; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), z = pos.getZ(i), y = pos.getY(i); const a = Math.atan2(z, x); const k = 1 + (y < .7 ? Math.sin(a * 28) * .018 * (1 - y / .76) : 0); pos.setX(i, x * k); pos.setZ(i, z * k); } plis.computeVertexNormals();
  const n = new THREE.Mesh(plis, M({ color: 0xfaf3e3, roughness: .92 })); gp.add(n);
  const chemin = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, .006, 64), M({ color: 0xc29a3d, metalness: .6, roughness: .45 })); chemin.position.y = .766; gp.add(chemin);
  // 8 couverts
  const verre = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, thickness: .02, roughness: .02, ior: 1.5, transparent: true, opacity: 1 });
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const cx = Math.cos(a), cz = Math.sin(a);
    const ass = new THREE.Mesh(new THREE.CylinderGeometry(.13, .1, .02, 40), M({ color: 0xffffff, roughness: .15 })); ass.position.set(cx * .68, .78, cz * .68); gp.add(ass);
    const fil = new THREE.Mesh(new THREE.TorusGeometry(.115, .004, 8, 40), or); fil.rotation.x = Math.PI / 2; fil.position.set(cx * .68, .792, cz * .68); gp.add(fil);
    const pied = new THREE.LatheGeometry([[0, 0], [.04, 0], [.008, .02], [.008, .08], [.05, .13], [.045, .2], [.02, .2], [0, .19]].map(([x, y]) => new THREE.Vector2(x, y)), 20);
    const v = new THREE.Mesh(pied, verre); v.position.set(cx * .7 - cz * .16, .766, cz * .7 + cx * .16); gp.add(v);
    // chaise Chiavari dorée
    const ch = new THREE.Group(); const as = new THREE.Mesh(new THREE.BoxGeometry(.42, .04, .42), M({ color: 0xe9d9b0, roughness: .6 })); as.position.y = .48; ch.add(as);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([x, z]) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(.015, .012, .48, 8), or); p.position.set(x * .19, .24, z * .19); ch.add(p); });
    const dos = new THREE.Mesh(new THREE.BoxGeometry(.4, .3, .025), or); dos.position.set(0, .72, -.2); ch.add(dos);
    ch.position.set(cx * 1.38, 0, cz * 1.38); ch.rotation.y = -a - Math.PI / 2; gp.add(ch); }
  // centre de table : vase + fleurs + bougies
  const vase = new THREE.Mesh(new THREE.CylinderGeometry(.09, .06, .3, 24), M({ color: 0xffffff, roughness: .1, metalness: .2 })); vase.position.y = .92; gp.add(vase);
  const couleurs = [0xf4c9d2, 0xfff1e6, 0xe58aa0, 0xf9e3a6, 0x8ba66b]; const fl = new THREE.Group();
  for (let i = 0; i < 70; i++) { const u = Math.random() * Math.PI * 2, v2 = Math.acos(1 - Math.random() * .9), r = .26; const b = new THREE.Mesh(new THREE.IcosahedronGeometry(.05 + Math.random() * .035, 1), M({ color: couleurs[i % 5], roughness: .85 })); b.position.set(Math.sin(v2) * Math.cos(u) * r, 1.2 + Math.cos(v2) * r * .75, Math.sin(v2) * Math.sin(u) * r); fl.add(b); } gp.add(fl);
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + .4; const b = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, .22, 16), M({ color: 0xfff8e6, roughness: .5 })); b.position.set(Math.cos(a) * .42, .88, Math.sin(a) * .42); gp.add(b);
    const fl2 = new THREE.Mesh(new THREE.SphereGeometry(.018, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffd27a })); fl2.scale.y = 1.8; fl2.position.set(b.position.x, 1.01, b.position.z); gp.add(fl2);
    const pl = new THREE.PointLight(0xffb55a, 1.6, 2.5, 2); pl.position.set(b.position.x, 1.05, b.position.z); gp.add(pl); lumieres.push(pl); }
  return cast(gp);
}

/* ------------------------------ ARCHE FLEURIE ------------------------------ */
function arche() {
  const gp = new THREE.Group(); const W = 1.7;
  const arc = new THREE.Mesh(new THREE.TorusGeometry(W, .06, 14, 80, Math.PI), M({ color: 0xf6efe0, roughness: .5 })); arc.position.y = 1.6; gp.add(arc);
  [-W, W].forEach((x) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(.06, .07, 1.6, 14), M({ color: 0xf6efe0, roughness: .5 })); p.position.set(x, .8, 0); gp.add(p); });
  const couleurs = [0xf4c9d2, 0xfff1e6, 0xe58aa0, 0xd8587a, 0xf9e3a6]; const feuille = [0x4f7a3f, 0x6a9150, 0x3d6532];
  const inst = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), M({ roughness: .85 }), 1400); const mm = new THREE.Matrix4(), q = new THREE.Quaternion(), cc = new THREE.Color(); let k = 0;
  const poser = (x, y, z, r, col) => { if (k >= 1400) return; mm.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(r, r * (.8 + Math.random() * .3), r)); inst.setMatrixAt(k, mm); inst.setColorAt(k, cc.set(col)); k++; };
  for (let i = 0; i < 520; i++) { const t = Math.random(); const a = Math.PI * t; const dens = Math.pow(Math.random(), .8); const rr = W + (Math.random() - .5) * .3;
    const x = Math.cos(a) * rr, y = 1.6 + Math.sin(a) * rr, z = (Math.random() - .5) * .3; poser(x, y, z, .05 + Math.random() * .06, Math.random() < .35 ? feuille[i % 3] : couleurs[(Math.random() * 5) | 0]); }
  for (const x of [-W, W]) for (let i = 0; i < 160; i++) { const y = Math.pow(Math.random(), 1.3) * 1.7 + .05; poser(x + (Math.random() - .5) * .3, y, (Math.random() - .5) * .3, .045 + Math.random() * .05, Math.random() < .4 ? feuille[i % 3] : couleurs[(Math.random() * 5) | 0]); }
  inst.count = k; inst.instanceMatrix.needsUpdate = true; inst.instanceColor.needsUpdate = true; gp.add(inst);
  // guirlande lumineuse
  for (let i = 0; i < 22; i++) { const a = Math.PI * (i / 21); const b = new THREE.Mesh(new THREE.SphereGeometry(.03, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffd98a })); b.position.set(Math.cos(a) * (W - .12), 1.6 + Math.sin(a) * (W - .12), .12); gp.add(b); }
  return cast(gp);
}

const T = tente(), B = table(), A = arche();
if (VUE === "tout") { T.position.set(-3.2, 0, -2.2); B.position.set(4.2, 0, 1.2); A.position.set(0.3, 0, 5.2); A.rotation.y = 0; scene.add(T, B, A);
  for (let i = 0; i < 14; i++) { const t = new THREE.Group(); const tr = new THREE.Mesh(new THREE.CylinderGeometry(.14, .2, 2.4, 8), M({ color: 0x5a3d26, roughness: .9 })); tr.position.y = 1.2; const fe = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5 + Math.random() * .6, 2), M({ color: 0x4d7a3a, roughness: .9, flatShading: true })); fe.position.y = 3.2; t.add(tr, fe); const a = (i / 14) * Math.PI * 2 + .3; t.position.set(Math.cos(a) * 17, 0, Math.sin(a) * 17 - 2); cast(t); scene.add(t); } }
else { ({ tente: T, table: B, arche: A })[VUE]?.position.set(0, 0, 0); scene.add(({ tente: T, table: B, arche: A })[VUE]); }

// halo de fin de journée
const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), .22, .5, .92)); composer.addPass(new OutputPass());
addEventListener("resize", () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); });
let t0 = 0; renderer.setAnimationLoop((t) => { lumieres.forEach((l, i) => { l.intensity = (l.distance > 5 ? 4 : 1.6) * (1 + .06 * Math.sin(t / 220 + i * 2)); }); controls.update(); composer.render(); window.__prete = (window.__prete || 0) + 1; });
