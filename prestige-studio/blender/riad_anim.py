"""
RIAD ROYAL — ANIMATION D'OUVERTURE (phase 3, v2)
Charge la scène de riad_royal.py (sans la modifier), ajoute la carte finale et anime :
  0,0–1,0 s  plan fixe sur les portes fermées (dérive de caméra à peine perceptible)
  1,0–4,4 s  les deux battants s'ouvrent sur leurs gonds (0 → 95°, accélération douce)
  dès 75 % d'ouverture  travelling avant continu, sans arrêt : la focale se resserre, la mise au point glisse
             de l'architecture vers la carte, qui flotte dans la lumière (plus de socle derrière elle)
  7,4 s      la carte (ivoire, double filet d'or, ornements) remplit exactement l'écran 9:16
  7,4–8,2 s  plan tenu, puis fondu enchaîné vers la carte HTML plein écran (texte dynamique) — voir composer_video.py
Usage : python3 riad_anim.py [--apercu|--final] [--fps 12] [--sortie dossier] [--images 0,40,80]
"""
import sys, os, math, subprocess, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "riad_royal.py"), encoding="utf-8").read().rsplit("\nmain()", 1)[0]
exec(compile(src, "riad_royal.py", "exec"))

MODE = "final" if "--final" in ARGS else "apercu"
FPS = int(arg("--fps", "12" if MODE == "apercu" else "24"))
DUREE = 8.2
T_OUV0, T_OUV1 = 1.0, 4.4
T_FIN = 7.4
DOSSIER = arg("--sortie", os.path.join(HERE, "..", "animation", MODE))
IMAGES = [int(x) for x in arg("--images").split(",")] if arg("--images") else None

def facile(u):                       # smootherstep : vitesse nulle aux deux bouts, accélération continue
    u = max(0.0, min(1.0, u)); return u * u * u * (u * (u * 6 - 15) + 10)
def doux(u):                         # sinus : démarrage/arrêt plus naturels pour une caméra
    u = max(0.0, min(1.0, u)); return 0.5 - 0.5 * math.cos(math.pi * u)
def lerp(a, b, u): return a + (b - a) * u

def ouverture_a(t):
    return facile((t - T_OUV0) / (T_OUV1 - T_OUV0))
T75 = next(T_OUV0 + (T_OUV1 - T_OUV0) * k / 1000 for k in range(1001) if facile(k / 1000) >= 0.75)

# Carte : 9:16, flottante dans l'axe, face à la caméra
CX, CY, CZ, CW, CH = 0.0, 3.4, 1.95, 0.90, 1.60

def mat_papier():
    m, n, l, b = mat_nouveau("papier_ivoire")
    tc = n.new("ShaderNodeTexCoord")
    fib = n.new("ShaderNodeTexNoise"); fib.inputs["Scale"].default_value = 260; fib.inputs["Detail"].default_value = 8; fib.inputs["Roughness"].default_value = 0.7
    mp = n.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (1.0, 1.0, 0.35); l.new(tc.outputs["Object"], mp.inputs["Vector"]); l.new(mp.outputs["Vector"], fib.inputs["Vector"])
    nua = n.new("ShaderNodeTexNoise"); nua.inputs["Scale"].default_value = 2.2; nua.inputs["Detail"].default_value = 3
    l.new(tc.outputs["Object"], nua.inputs["Vector"])
    cr = n.new("ShaderNodeValToRGB"); cr.color_ramp.elements[0].color = (0.40, 0.38, 0.32, 1); cr.color_ramp.elements[1].color = (0.48, 0.46, 0.39, 1)
    l.new(nua.outputs["Fac"], cr.inputs["Fac"])
    mx = n.new("ShaderNodeMix"); mx.data_type = "RGBA"; mx.blend_type = "MULTIPLY"; mx.inputs[0].default_value = 0.35
    l.new(cr.outputs["Color"], mx.inputs[6]); l.new(fib.outputs["Color"], mx.inputs[7])
    l.new(mx.outputs[2], b.inputs["Base Color"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.5; bp.inputs["Distance"].default_value = 0.0006
    l.new(fib.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    champ(b, "Roughness", 0.78); champ(b, "Specular IOR Level", 0.25)
    return m

def mat_or_fin():
    m, n, l, b = mat_nouveau("or_fin")
    champ(b, "Base Color", (0.80, 0.52, 0.10, 1)); champ(b, "Metallic", 1.0); champ(b, "Roughness", 0.26); champ(b, "Emission Color", (1.0, 0.62, 0.14, 1)); champ(b, "Emission Strength", 0.55)
    return m

def mat_halo():
    """Halo doux (disque dégradé, additif) derrière la carte : elle semble flotter dans la lumière."""
    m, n, l, b = mat_nouveau("halo")
    for x in list(n):
        if x.name != "Material Output": n.remove(x)
    tc = n.new("ShaderNodeTexCoord"); gr = n.new("ShaderNodeTexGradient"); gr.gradient_type = "SPHERICAL"
    mp = n.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (0.55, 0.55, 0.55); mp.inputs["Location"].default_value = (0, 0, 0)
    l.new(tc.outputs["Generated"], mp.inputs["Vector"]); l.new(mp.outputs["Vector"], gr.inputs["Vector"])
    # le plan est centré : les coordonnées « Generated » vont de 0 à 1 ; on recentre
    mp.inputs["Location"].default_value = (-0.275, -0.275, -0.275)
    cr = n.new("ShaderNodeValToRGB"); cr.color_ramp.elements[0].position = 0.0; cr.color_ramp.elements[0].color = (1, 1, 1, 1)
    cr.color_ramp.elements[1].position = 0.42; cr.color_ramp.elements[1].color = (0, 0, 0, 1)
    l.new(gr.outputs["Fac"], cr.inputs["Fac"])
    em = n.new("ShaderNodeEmission"); em.inputs["Color"].default_value = (1.0, 0.72, 0.38, 1); em.inputs["Strength"].default_value = 0.6
    tr = n.new("ShaderNodeBsdfTransparent")
    mix = n.new("ShaderNodeMixShader")
    l.new(cr.outputs["Color"], mix.inputs[0]); l.new(tr.outputs["BSDF"], mix.inputs[1]); l.new(em.outputs["Emission"], mix.inputs[2])
    l.new(mix.outputs["Shader"], n["Material Output"].inputs["Surface"])
    return m

def masquer_fontaine():
    """Pour le film : plus de vasque/jet/eau — l'entrée révèle un patio dégagé, sans socle derrière la carte."""
    for nom in ("vasque", "eau", "jet"):
        ob = bpy.data.objects.get(nom)
        if ob: ob.hide_render = True; ob.hide_viewport = True

def carte_finale():
    papier = mat_papier(); or_ = mat_or_fin()
    ep = 0.006
    mb = MB(); mb.box((CX, CY, CZ), (CW, ep, CH)); mb.objet("carte", papier, bevel=0.0012)
    yf = CY - ep / 2 - 0.0004                        # face avant du papier
    mb = MB()
    def cadre(inset, lg):                              # filet rectangulaire
        w, h = CW - 2 * inset, CH - 2 * inset
        mb.box((CX, yf - 0.0005, CZ + h / 2), (w, 0.0012, lg)); mb.box((CX, yf - 0.0005, CZ - h / 2), (w, 0.0012, lg))
        mb.box((CX + w / 2, yf - 0.0005, CZ), (lg, 0.0012, h)); mb.box((CX - w / 2, yf - 0.0005, CZ), (lg, 0.0012, h))
    cadre(0.030, 0.0050)                               # filet principal
    cadre(0.042, 0.0019)                               # filet intérieur très fin
    # ornements d'angle : petite étoile à huit branches cernée d'un cercle, dans chaque coin
    for sx in (-1, 1):
        for sz in (-1, 1):
            c = (CX + sx * (CW / 2 - 0.074), 0, CZ + sz * (CH / 2 - 0.074))
            ligne_etoile(mb, c, 0.026, 0.0016, yf, yf - 0.0012, pointes=8, creux=0.55)
            ligne_cercle(mb, c, 0.034, 0.0013, yf, yf - 0.0012, n=48)
    # médaillon d'en-tête (étoile à seize pointes, cercles) et fleuron de pied
    c = (CX, 0, CZ + CH / 2 - 0.20)
    ligne_etoile(mb, c, 0.060, 0.0020, yf, yf - 0.0013, pointes=16, creux=0.78)
    ligne_etoile(mb, c, 0.034, 0.0016, yf, yf - 0.0013, pointes=8, creux=0.55, rot=math.pi / 8)
    ligne_cercle(mb, c, 0.075, 0.0016, yf, yf - 0.0013, n=64)
    ligne_cercle(mb, c, 0.083, 0.0008, yf, yf - 0.0013, n=64)
    c = (CX, 0, CZ - CH / 2 + 0.16)
    ligne_etoile(mb, c, 0.040, 0.0016, yf, yf - 0.0012, pointes=12, creux=0.70)
    ligne_cercle(mb, c, 0.014, 0.0012, yf, yf - 0.0012, n=32)
    for dx in (-1, 1):                                  # filets de part et d'autre du fleuron
        mb.box((CX + dx * 0.19, yf - 0.0005, c[2]), (0.20, 0.0012, 0.0012))
    mb.objet("carte_or", or_)
    # halo de lumière derrière la carte
    mb = MB(); mb.box((CX, CY + 0.35, CZ), (3.4, 0.002, 3.4)); halo = mb.objet("halo", mat_halo())
    # éclairage de la carte : projecteur doux venu de haut-côté, + éclat d'or du filet
    sp = bpy.data.lights.new("carte_spot", "SPOT"); sp.energy = 400; sp.color = (1.0, 0.96, 0.90); sp.spot_size = math.radians(40); sp.spot_blend = 0.9; sp.shadow_soft_size = 0.35
    so = bpy.data.objects.new("carte_spot", sp); bpy.context.collection.objects.link(so); so.location = (0.9, 1.0, 3.7)
    so.rotation_euler = (Vector((CX, CY, CZ)) - Vector(so.location)).to_track_quat("-Z", "Y").to_euler()

def main_anim():
    construire(0.0)
    masquer_fontaine()
    carte_finale()
    reglages("brouillon")
    sc = bpy.context.scene
    sc.render.resolution_x, sc.render.resolution_y = (360, 640) if MODE == "apercu" else (540, 960)
    sc.cycles.samples = 18 if MODE == "apercu" else 64
    sc.render.film_transparent = False
    # sol vitré : il reflétait le vide derrière la caméra (zones noires) → reflet réduit, monde plus lumineux
    for nom_m in ("sol_zellige", "pierre_sombre"):
        mt = bpy.data.materials.get(nom_m)
        if mt:
            bs = mt.node_tree.nodes["Principled BSDF"]
            if "Coat Weight" in bs.inputs: bs.inputs["Coat Weight"].default_value = 0.08
            bs.inputs["Roughness"].default_value = max(bs.inputs["Roughness"].default_value, 0.45)
    bpy.context.scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.55
    tp = bpy.data.objects.get("tapis_patio")
    if tp: tp.hide_render = True          # tapis confondu avec le sol (z-fighting) → zone noire ; le sol clair suffit
    lum_base = {nom: bpy.data.lights[nom].energy for nom in ("soleil", "ciel_doux", "remplissage", "contour", "projecteur_portes")}
    g = bpy.data.objects["battant_g"]; d = bpy.data.objects["battant_d"]
    cam_d = bpy.data.cameras.new("cam"); cam_d.sensor_width = 24; cam_d.sensor_fit = "HORIZONTAL"
    cam_d.dof.use_dof = True
    cam = bpy.data.objects.new("camera", cam_d); bpy.context.collection.objects.link(cam); sc.camera = cam
    # chemin : façade → seuil → patio → face à la carte. Courbe de Bézier cubique, un seul mouvement continu.
    P0, P1, P2, P3 = Vector((0.0, -10.4, 3.20)), Vector((0.0, -4.0, 3.05)), Vector((0.0, 0.6, 2.10)), Vector((0.0, CY - 1.50, CZ))
    def bez(u):
        a = (1 - u) ** 3; b = 3 * u * (1 - u) ** 2; c = 3 * u * u * (1 - u); e = u ** 3
        return P0 * a + P1 * b + P2 * c + P3 * e
    C0, C3 = Vector((0.0, 0.0, 3.15)), Vector((CX, CY, CZ))
    os.makedirs(DOSSIER, exist_ok=True)
    nb = int(round(DUREE * FPS))
    liste = IMAGES if IMAGES is not None else range(nb)
    for i in liste:
        t = i / FPS
        o = ouverture_a(t); a = math.radians(95.0) * o
        g.rotation_euler = (0, 0, +a); d.rotation_euler = (0, 0, -a)
        # un seul mouvement continu de T75 à T_FIN : départ très lent (doux), arrivée très douce
        u = doux((t - T75) / (T_FIN - T75)) if t > T75 else 0.0
        u = 0.5 * u + 0.5 * facile(u)                    # mélange : démarrage sans à-coup, arrêt amorti
        derive = 0.045 * math.sin(t * 0.9) * min(1.0, t / 1.0) * (1.0 - u)   # respiration de caméra, s'éteint en approchant
        pos = bez(u) + Vector((derive, 0, 0.5 * derive))
        # visée : reste sur la façade, puis glisse vers la carte (plus tardivement que le déplacement)
        v = facile((u - 0.30) / 0.70)
        cible = C0.lerp(C3, v)
        cam_d.lens = lerp(64, 40, facile(u))
        cam.location = pos; cam.rotation_euler = (cible - pos).to_track_quat("-Z", "Y").to_euler()
        # mise au point : d'abord l'architecture (le seuil), puis glissement vers la carte ; ouverture plus large en fin de plan
        d_arch = max(1.5, (Vector((0, 0.3, 3.0)) - pos).length)
        d_carte = (Vector((CX, CY, CZ)) - pos).length
        w = facile((u - 0.38) / 0.40)
        cam_d.dof.focus_distance = lerp(d_arch, d_carte, w)
        cam_d.dof.aperture_fstop = lerp(11, 3.2, w)
        bpy.data.lights["patio"].energy = (3500 + 8000 * o ** 2) * (1.0 - 0.97 * w)
        w2 = facile((u - 0.12) / 0.30)                    # une fois le seuil franchi, la lumière extérieure s'efface : seule la carte est éclairée
        for nom_l, e0 in lum_base.items():
            bpy.data.lights[nom_l].energy = e0 * (1.0 - 0.80 * w2)
        sc.render.filepath = os.path.join(DOSSIER, f"f{i:04d}.png")
        if os.path.exists(sc.render.filepath) and IMAGES is None: continue
        bpy.ops.render.render(write_still=True)
        print("image", i + 1, "/", nb, flush=True)
    print("termine", DOSSIER, flush=True)
main_anim()
