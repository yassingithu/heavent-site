"""
RIAD ROYAL — ANIMATION D'OUVERTURE (phase 3)
Charge la scène de riad_royal.py (sans la modifier), ajoute la carte finale et anime :
  0,0–1,0 s  plan fixe sur les portes fermées
  1,0–4,4 s  les deux battants s'ouvrent sur leurs gonds (0 → 95°, accélération douce)
  dès 75 % d'ouverture  la caméra avance dans l'entrée (dolly) et la focale se resserre
  fin        la carte d'invitation remplit l'écran (portrait 9:16)
Usage : python3 riad_anim.py [--apercu|--final] [--fps 12] [--sortie dossier]
Sortie : images PNG numérotées + vidéo mp4 si ffmpeg est disponible.
"""
import sys, os, math, subprocess, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "riad_royal.py"), encoding="utf-8").read().rsplit("\nmain()", 1)[0]
sys.argv = [sys.argv[0]] + sys.argv[1:]
exec(compile(src, "riad_royal.py", "exec"))

MODE = "final" if "--final" in ARGS else "apercu"
FPS = int(arg("--fps", "12" if MODE == "apercu" else "24"))
DUREE = 6.4
T_PLAN, T_OUV0, T_OUV1 = 1.0, 1.0, 4.4
DOSSIER = arg("--sortie", os.path.join(HERE, "..", "animation", MODE))

def facile(u):                       # accélération/décélération douce (smootherstep)
    u = max(0.0, min(1.0, u)); return u * u * u * (u * (u * 6 - 15) + 10)
def lerp(a, b, u): return a + (b - a) * u

def ouverture_a(t):                  # 0..1
    return facile((t - T_OUV0) / (T_OUV1 - T_OUV0))
# instant où l'ouverture atteint 75 % : début du dolly
t75 = next(T_OUV0 + (T_OUV1 - T_OUV0) * k / 1000 for k in range(1001) if facile(k / 1000) >= 0.75)

def carte_finale():
    """Carte d'invitation (ivoire, filet or) au fond de l'entrée, face à la caméra. Le texte réel sera composé à la phase 4."""
    cx, cy, cz, w, h = 0.0, 3.4, 1.85, 0.90, 1.60
    m, n, l, b = mat_nouveau("carte"); champ(b, "Base Color", (0.62, 0.55, 0.43, 1)); champ(b, "Roughness", 0.55)
    mb = MB(); mb.box((cx, cy, cz), (w, 0.012, h)); mb.objet("carte", m, bevel=0.002)
    mo = mat_laiton("filet_or")
    mb = MB()
    for (dx, dz, sx, sz) in ((0, h / 2 - 0.05, w - 0.10, 0.006), (0, -h / 2 + 0.05, w - 0.10, 0.006), (w / 2 - 0.05, 0, 0.006, h - 0.10), (-w / 2 + 0.05, 0, 0.006, h - 0.10)):
        mb.box((cx + dx, cy - 0.008, cz + dz), (sx, 0.004, sz))
    mb.objet("carte_filet", mo)
    # petit éclairage doux dédié à la carte
    lg = bpy.data.lights.new("carte_lueur", "AREA"); lg.shape = "RECTANGLE"; lg.size = 2.2; lg.size_y = 1.6; lg.energy = 70; lg.color = (1.0, 0.82, 0.60)
    lo = bpy.data.objects.new("carte_lueur", lg); bpy.context.collection.objects.link(lo); lo.location = (0.4, 1.0, 3.4)
    lo.rotation_euler = (Vector((cx, cy, cz)) - Vector(lo.location)).to_track_quat("-Z", "Y").to_euler()

def main_anim():
    construire(0.0)
    carte_finale()
    reglages("brouillon")
    sc = bpy.context.scene
    sc.render.resolution_x, sc.render.resolution_y = (288, 512) if MODE == "apercu" else (810, 1440)
    sc.cycles.samples = 14 if MODE == "apercu" else 80
    g = bpy.data.objects["battant_g"]; d = bpy.data.objects["battant_d"]
    cam_d = bpy.data.cameras.new("cam"); cam_d.sensor_width = 24; cam_d.sensor_fit = "HORIZONTAL"
    cam_d.dof.use_dof = True; cam_d.dof.aperture_fstop = 11
    cam = bpy.data.objects.new("camera", cam_d); bpy.context.collection.objects.link(cam); sc.camera = cam
    p0, p1 = Vector((0.0, -10.4, 3.20)), Vector((0.0, 1.9, 1.95))
    c0, c1 = Vector((0.0, 0.0, 3.15)), Vector((0.0, 3.4, 1.85))
    os.makedirs(DOSSIER, exist_ok=True)
    nb = int(DUREE * FPS)
    for i in range(nb):
        t = i / FPS
        o = ouverture_a(t); a = math.radians(95.0) * o
        g.rotation_euler = (0, 0, +a); d.rotation_euler = (0, 0, -a)
        u = facile((t - t75) / (DUREE - t75)) if t > t75 else 0.0
        pos = p0.lerp(p1, u); cible = c0.lerp(c1, u)
        cam_d.lens = lerp(64, 40, u)
        cam.location = pos; cam.rotation_euler = (cible - pos).to_track_quat("-Z", "Y").to_euler()
        cam_d.dof.focus_distance = (cible - pos).length
        # la lueur d'intérieur monte avec l'ouverture
        bpy.data.lights["patio"].energy = (3500 + 8000 * o ** 2) * (1.0 - 0.7 * u)
        sc.render.filepath = os.path.join(DOSSIER, f"f{i:04d}.png")
        if os.path.exists(sc.render.filepath): continue
        bpy.ops.render.render(write_still=True)
        print("image", i + 1, "/", nb, flush=True)
    if shutil.which("ffmpeg"):
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(DOSSIER, "f%04d.png"),
                        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", os.path.join(DOSSIER, f"riad-royal_ouverture_{MODE}.mp4")])
        print("video :", DOSSIER)
main_anim()
