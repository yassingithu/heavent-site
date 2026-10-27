/**
 * Ambiance sonore synthétisée (aucun fichier audio, aucun téléchargement) : un doux nappage et quelques notes.
 * DÉSACTIVÉE PAR DÉFAUT : elle ne démarre qu'après un geste volontaire du visiteur.
 */
let ctx: AudioContext | null = null;
let sortie: GainNode | null = null;
let minuteur: number | null = null;
let actif = false;
const GAMME = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

function creer() {
  if (ctx) return ctx;
  const C = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext });
  const Ctor = C.AudioContext ?? C.webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  sortie = ctx.createGain(); sortie.gain.value = 0; sortie.connect(ctx.destination);
  const filtre = ctx.createBiquadFilter(); filtre.type = "lowpass"; filtre.frequency.value = 900; filtre.connect(sortie);
  [130.81, 196.0, 261.63].forEach((f, i) => { const o = ctx!.createOscillator(); o.type = "sine"; o.frequency.value = f; o.detune.value = i * 4; const g = ctx!.createGain(); g.gain.value = 0.05; o.connect(g); g.connect(filtre); o.start(); });
  return ctx;
}

function note() {
  if (!ctx || !sortie || !actif) return;
  const f = GAMME[Math.floor(Math.random() * GAMME.length)];
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = "triangle"; o.frequency.value = f; g.gain.value = 0;
  o.connect(g); g.connect(sortie);
  const t = ctx.currentTime;
  g.gain.linearRampToValueAtTime(0.06, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0008, t + 1.6);
  o.start(t); o.stop(t + 1.7);
}

export const sonActif = () => actif;
export function activerSon(): boolean {
  const c = creer(); if (!c || !sortie) return false;
  void c.resume();
  actif = true;
  sortie.gain.cancelScheduledValues(c.currentTime); sortie.gain.linearRampToValueAtTime(0.9, c.currentTime + 0.8);
  if (minuteur === null) minuteur = window.setInterval(note, 2600);
  return true;
}
export function couperSon() {
  actif = false;
  if (ctx && sortie) { sortie.gain.cancelScheduledValues(ctx.currentTime); sortie.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4); }
  if (minuteur !== null) { window.clearInterval(minuteur); minuteur = null; }
}
export function petitSon(type: "clic" | "ok" = "clic") {
  if (!actif || !ctx || !sortie) return;
  const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
  o.type = "sine"; o.frequency.value = type === "ok" ? 660 : 440; g.gain.value = 0;
  o.connect(g); g.connect(sortie);
  g.gain.linearRampToValueAtTime(0.08, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  o.start(t); o.stop(t + 0.25);
}
