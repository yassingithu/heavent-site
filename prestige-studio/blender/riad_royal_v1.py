"""
RIAD ROYAL — HEAVENT PRESTIGE
Scène Blender procédurale et reproductible (Blender 5.x / module bpy).

Usage :
    python3 riad_royal.py --vue frontal|trois-quarts|detail|toutes [--qualite brouillon|haute] [--ouverture 0..100] [--sortie dossier]
    python3 riad_royal.py --blend   (enregistre seulement le fichier .blend)

Repère (mètres) : x = droite, y = profondeur (la caméra est en y négatif, le riad en y positif), z = hauteur.
La façade est dans le plan y = 0, le patio s'étend vers y > 0.
Les deux battants ont leur origine sur la charnière : on les ouvre en tournant l'objet autour de z.
"""
import bpy, bmesh, math, random, sys, os
from mathutils import Vector, Matrix, Euler

ARGS = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
def arg(nom, defaut=None):
    return ARGS[ARGS.index(nom) + 1] if nom in ARGS else defaut

HERE = os.path.dirname(os.path.abspath(__file__))
SORTIE = arg("--sortie", os.path.join(HERE, "..", "rendus"))
random.seed(7)

# ----------------------------------------------------------------------------------------------
# Géométrie de l'arche en fer à cheval (outrepassée)
# ----------------------------------------------------------------------------------------------
R_ARCHE = 0.98          # rayon du cintre
H_RETOMBEE = 2.75       # hauteur de la retombée (centre du cercle)
DELTA = math.radians(17)  # outrepassement : l'arc continue sous l'horizontale
LARGEUR_MUR, HAUTEUR_MUR, EPAISSEUR = 9.0, 6.3, 0.62

def arche(off=0.0, n=72, bas=0.0):
    """Points (x, z) du profil, du bas à gauche au bas à droite, décalé de `off` vers l'extérieur."""
    r = R_ARCHE + off
    a0, a1 = math.pi + DELTA, -DELTA  # de gauche (sous l'horizontale) à droite en passant par le haut
    pts = [(-r * math.cos(DELTA), bas)]
    for i in range(n + 1):
        a = (math.pi + DELTA) - i * ((math.pi + 2 * DELTA) / n)
        pts.append((r * math.cos(a), H_RETOMBEE + r * math.sin(a)))
    pts.append((r * math.cos(DELTA), bas))
    return pts

# ----------------------------------------------------------------------------------------------
# Constructeur de maillage par matériau
# ----------------------------------------------------------------------------------------------
class MB:
    def __init__(self):
        self.bm = bmesh.new()
    def _m(self, loc=(0, 0, 0), rot=(0, 0, 0), sc=(1, 1, 1)):
        return Matrix.Translation(loc) @ Euler(rot).to_matrix().to_4x4() @ Matrix.Diagonal((*sc, 1))
    def box(self, c, size, rot=(0, 0, 0)):
        bmesh.ops.create_cube(self.bm, size=1.0, matrix=self._m(c, rot, size))
    def cyl(self, c, r, h, rot=(0, 0, 0), seg=24, r2=None):
        bmesh.ops.create_cone(self.bm, cap_ends=True, segments=seg, radius1=r, radius2=r if r2 is None else r2, depth=h, matrix=self._m(c, rot))
    def sph(self, c, r, sc=(1, 1, 1), seg=16):
        bmesh.ops.create_uvsphere(self.bm, u_segments=seg, v_segments=max(6, seg // 2), radius=r, matrix=self._m(c, (0, 0, 0), sc))
    def tor(self, c, R, r, rot=(0, 0, 0), seg=40, seg2=10):
        m = self._m(c, rot)
        verts = []
        for i in range(seg):
            a = 2 * math.pi * i / seg
            ring = []
            for j in range(seg2):
                b = 2 * math.pi * j / seg2
                x = (R + r * math.cos(b)) * math.cos(a); y = (R + r * math.cos(b)) * math.sin(a); z = r * math.sin(b)
                ring.append(self.bm.verts.new(m @ Vector((x, y, z))))
            verts.append(ring)
        for i in range(seg):
            for j in range(seg2):
                try:
                    self.bm.faces.new((verts[i][j], verts[(i + 1) % seg][j], verts[(i + 1) % seg][(j + 1) % seg2], verts[i][(j + 1) % seg2]))
                except ValueError:
                    pass
    def prisme(self, pts, y0, y1, ox=0.0, oz=0.0):
        """Polygone (x, z) extrudé le long de y. Convexe ou non (triangulation automatique)."""
        bm = self.bm
        vs0 = [bm.verts.new((x + ox, y0, z + oz)) for x, z in pts]
        f = bm.faces.new(vs0)
        r = bmesh.ops.extrude_face_region(bm, geom=[f])
        vs = [e for e in r["geom"] if isinstance(e, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, verts=vs, vec=(0, y1 - y0, 0))
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    def anneau(self, interieur, exterieur, y0, y1, ox=0.0, oz=0.0):
        """Bande entre deux profils de même nombre de points, extrudée de y0 à y1."""
        bm = self.bm
        n = len(interieur)
        I0 = [bm.verts.new((x + ox, y0, z + oz)) for x, z in interieur]
        I1 = [bm.verts.new((x + ox, y1, z + oz)) for x, z in interieur]
        E0 = [bm.verts.new((x + ox, y0, z + oz)) for x, z in exterieur]
        E1 = [bm.verts.new((x + ox, y1, z + oz)) for x, z in exterieur]
        for i in range(n - 1):
            for quad in ((I0[i], I0[i + 1], E0[i + 1], E0[i]),        # face avant
                         (E1[i], E1[i + 1], I1[i + 1], I1[i]),        # face arrière
                         (E0[i], E0[i + 1], E1[i + 1], E1[i]),        # tranche extérieure
                         (I1[i], I1[i + 1], I0[i + 1], I0[i])):       # tranche intérieure
                bm.faces.new(quad)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    def etoile(self, c, r, pointes=8, creux=0.62, ep=0.02, rot=0.0):
        pts = []
        for i in range(pointes * 2):
            a = rot + math.pi * i / pointes
            rr = r if i % 2 == 0 else r * creux
            pts.append((rr * math.cos(a), rr * math.sin(a)))
        bm = self.bm
        vs = [bm.verts.new((c[0] + x, c[1], c[2] + z)) for x, z in pts]
        f = bm.faces.new(vs)
        res = bmesh.ops.extrude_face_region(bm, geom=[f])
        nv = [e for e in res["geom"] if isinstance(e, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, verts=nv, vec=(0, -ep, 0))
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    def objet(self, nom, mat, loc=(0, 0, 0), lisse=True, bevel=None, parent=None):
        me = bpy.data.meshes.new(nom)
        self.bm.to_mesh(me)
        self.bm.free()
        ob = bpy.data.objects.new(nom, me)
        bpy.context.collection.objects.link(ob)
        ob.location = loc
        if mat:
            ob.data.materials.append(mat)
        if lisse:
            for p in me.polygons:
                p.use_smooth = False
        if bevel:
            b = ob.modifiers.new("biseau", "BEVEL")
            b.width = bevel; b.segments = 2; b.limit_method = "ANGLE"; b.angle_limit = math.radians(35)
        if parent:
            ob.parent = parent
        return ob

# ----------------------------------------------------------------------------------------------
# Matériaux PBR procéduraux
# ----------------------------------------------------------------------------------------------
def mat_nouveau(nom):
    m = bpy.data.materials.new(nom); m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links, m.node_tree.nodes["Principled BSDF"]

def champ(bsdf, nom, v):
    bsdf.inputs[nom].default_value = v

def mat_cedre(nom="cedre", sombre=False):
    m, n, l, b = mat_nouveau(nom)
    tc = n.new("ShaderNodeTexCoord"); mp = n.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (1.0, 9.0, 0.35)  # fibres verticales
    l.new(tc.outputs["Object"], mp.inputs["Vector"])
    wv = n.new("ShaderNodeTexWave"); wv.wave_type = "BANDS"; wv.bands_direction = "X"
    wv.inputs["Scale"].default_value = 14; wv.inputs["Distortion"].default_value = 5.5; wv.inputs["Detail"].default_value = 3; wv.inputs["Detail Scale"].default_value = 1.4
    l.new(mp.outputs["Vector"], wv.inputs["Vector"])
    ns = n.new("ShaderNodeTexNoise"); ns.inputs["Scale"].default_value = 4; ns.inputs["Detail"].default_value = 6
    l.new(tc.outputs["Object"], ns.inputs["Vector"])
    cr = n.new("ShaderNodeValToRGB")
    if sombre:
        cr.color_ramp.elements[0].color = (0.020, 0.0085, 0.0035, 1); cr.color_ramp.elements[1].color = (0.075, 0.034, 0.014, 1)
    else:
        cr.color_ramp.elements[0].color = (0.030, 0.011, 0.004, 1); cr.color_ramp.elements[1].color = (0.125, 0.052, 0.020, 1)
    mx = n.new("ShaderNodeMath"); mx.operation = "ADD"; mx.use_clamp = True
    l.new(wv.outputs["Fac"], mx.inputs[0]); l.new(ns.outputs["Fac"], mx.inputs[1]); mx.inputs[1].default_value = 0
    mm = n.new("ShaderNodeMath"); mm.operation = "MULTIPLY"; mm.inputs[1].default_value = 0.65
    l.new(wv.outputs["Fac"], mm.inputs[0])
    mad = n.new("ShaderNodeMath"); mad.operation = "ADD"
    l.new(mm.outputs["Value"], mad.inputs[0]); l.new(ns.outputs["Fac"], mad.inputs[1])
    mad2 = n.new("ShaderNodeMath"); mad2.operation = "MULTIPLY"; mad2.inputs[1].default_value = 0.6; l.new(mad.outputs["Value"], mad2.inputs[0])
    l.new(mad2.outputs["Value"], cr.inputs["Fac"])
    l.new(cr.outputs["Color"], b.inputs["Base Color"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["To Min"].default_value = 0.34; rg.inputs["To Max"].default_value = 0.62
    l.new(mad2.outputs["Value"], rg.inputs["Value"]); l.new(rg.outputs["Result"], b.inputs["Roughness"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.22; bp.inputs["Distance"].default_value = 0.004
    l.new(wv.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    champ(b, "Coat Weight", 0.25); champ(b, "Coat Roughness", 0.25)
    return m

def mat_laiton(nom="laiton", patine=0.0):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (0.62, 0.43, 0.17, 1)); champ(b, "Metallic", 1.0); champ(b, "Roughness", 0.30)
    ns = n.new("ShaderNodeTexNoise"); ns.inputs["Scale"].default_value = 60; ns.inputs["Detail"].default_value = 8
    tc = n.new("ShaderNodeTexCoord"); l.new(tc.outputs["Object"], ns.inputs["Vector"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["To Min"].default_value = 0.26; rg.inputs["To Max"].default_value = 0.46
    l.new(ns.outputs["Fac"], rg.inputs["Value"]); l.new(rg.outputs["Result"], b.inputs["Roughness"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.12; bp.inputs["Distance"].default_value = 0.002
    l.new(ns.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m

def mat_platre(nom="platre", teinte=(0.80, 0.69, 0.53), rugosite=0.72, relief=0.35):
    m, n, l, b = mat_nouveau(nom)
    tc = n.new("ShaderNodeTexCoord")
    ns = n.new("ShaderNodeTexNoise"); ns.inputs["Scale"].default_value = 22; ns.inputs["Detail"].default_value = 9; ns.inputs["Roughness"].default_value = 0.65
    ns2 = n.new("ShaderNodeTexNoise"); ns2.inputs["Scale"].default_value = 2.1; ns2.inputs["Detail"].default_value = 3
    l.new(tc.outputs["Object"], ns.inputs["Vector"]); l.new(tc.outputs["Object"], ns2.inputs["Vector"])
    cr = n.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].color = (teinte[0] * 0.72, teinte[1] * 0.70, teinte[2] * 0.66, 1)
    cr.color_ramp.elements[1].color = (min(teinte[0] * 1.06, 1), min(teinte[1] * 1.05, 1), min(teinte[2] * 1.04, 1), 1)
    l.new(ns2.outputs["Fac"], cr.inputs["Fac"]); l.new(cr.outputs["Color"], b.inputs["Base Color"])
    champ(b, "Roughness", rugosite)
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = relief; bp.inputs["Distance"].default_value = 0.01
    l.new(ns.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m

def mat_pierre(nom="pierre"):
    return mat_platre(nom, (0.55, 0.48, 0.38), 0.85, 0.5)

def mat_zellige(nom="zellige", echelle=2.2, plan="xy", teinte_a=(0.012, 0.115, 0.075), teinte_b=(0.60, 0.47, 0.29), teinte_c=(0.10, 0.045, 0.02)):
    """Pavage géométrique : étoiles et croix, joints sombres, léger gauchissement de brillance entre les carreaux."""
    m, n, l, b = mat_nouveau(nom)
    tc = n.new("ShaderNodeTexCoord")
    sep = n.new("ShaderNodeSeparateXYZ"); l.new(tc.outputs["Object"], sep.inputs["Vector"])
    cx = sep.outputs["X"]; cz = sep.outputs["Y" if plan == "xy" else "Z"]
    com = n.new("ShaderNodeCombineXYZ")
    l.new(cx, com.inputs["X"]); l.new(cz, com.inputs["Y"])
    mp = n.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (echelle, echelle, echelle); mp.inputs["Rotation"].default_value = (0, 0, math.radians(45))
    l.new(com.outputs["Vector"], mp.inputs["Vector"])
    ck = n.new("ShaderNodeTexChecker"); ck.inputs["Scale"].default_value = 1.0
    l.new(mp.outputs["Vector"], ck.inputs["Vector"])
    mp2 = n.new("ShaderNodeMapping"); mp2.inputs["Scale"].default_value = (echelle * 2, echelle * 2, echelle * 2)
    l.new(com.outputs["Vector"], mp2.inputs["Vector"])
    ck2 = n.new("ShaderNodeTexChecker"); ck2.inputs["Scale"].default_value = 1.0
    l.new(mp2.outputs["Vector"], ck2.inputs["Vector"])
    # joints : distance au bord du carreau
    wv = n.new("ShaderNodeTexBrick"); wv.inputs["Scale"].default_value = 1.0; wv.offset = 0.0; wv.inputs["Mortar Size"].default_value = 0.03; wv.inputs["Mortar Smooth"].default_value = 0.02
    wv.inputs["Brick Width"].default_value = 1.0; wv.inputs["Row Height"].default_value = 1.0
    mp3 = n.new("ShaderNodeMapping"); mp3.inputs["Scale"].default_value = (echelle * 2, echelle * 2, echelle * 2)
    l.new(com.outputs["Vector"], mp3.inputs["Vector"]); l.new(mp3.outputs["Vector"], wv.inputs["Vector"])
    mix1 = n.new("ShaderNodeMix"); mix1.data_type = "RGBA"
    mix1.inputs[6].default_value = (*teinte_a, 1); mix1.inputs[7].default_value = (*teinte_b, 1)
    l.new(ck.outputs["Fac"], mix1.inputs[0])
    mix2 = n.new("ShaderNodeMix"); mix2.data_type = "RGBA"
    l.new(mix1.outputs[2], mix2.inputs[6]); mix2.inputs[7].default_value = (*teinte_c, 1)
    l.new(ck2.outputs["Fac"], mix2.inputs[0])
    mix3 = n.new("ShaderNodeMix"); mix3.data_type = "RGBA"
    l.new(mix2.outputs[2], mix3.inputs[6]); mix3.inputs[7].default_value = (0.02, 0.018, 0.015, 1)
    l.new(wv.outputs["Fac"], mix3.inputs[0])
    l.new(mix3.outputs[2], b.inputs["Base Color"])
    vor = n.new("ShaderNodeTexVoronoi"); vor.inputs["Scale"].default_value = 18
    l.new(tc.outputs["Object"], vor.inputs["Vector"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["To Min"].default_value = 0.08; rg.inputs["To Max"].default_value = 0.22
    l.new(vor.outputs["Distance"], rg.inputs["Value"]); l.new(rg.outputs["Result"], b.inputs["Roughness"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.3; bp.inputs["Distance"].default_value = 0.004
    l.new(wv.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    champ(b, "Coat Weight", 0.4); champ(b, "Coat Roughness", 0.05)
    return m

def mat_emeraude(nom="emeraude"):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (0.012, 0.16, 0.10, 1)); champ(b, "Roughness", 0.12); champ(b, "Coat Weight", 0.8); champ(b, "Coat Roughness", 0.03)
    return m

def mat_lumiere(nom="lumiere", couleur=(1.0, 0.55, 0.18), force=8.0):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (*couleur, 1)); champ(b, "Emission Color", (*couleur, 1)); champ(b, "Emission Strength", force)
    return m

def mat_eau(nom="eau"):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (0.02, 0.18, 0.2, 1)); champ(b, "Roughness", 0.02); champ(b, "Metallic", 0.0); champ(b, "Transmission Weight", 0.85); champ(b, "IOR", 1.33)
    return m

def mat_feuille(nom="feuille"):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (0.03, 0.12, 0.03, 1)); champ(b, "Roughness", 0.55)
    return m

# ----------------------------------------------------------------------------------------------
# Scène
# ----------------------------------------------------------------------------------------------
def vider():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def booleen(obj, cutter, op="DIFFERENCE"):
    m = obj.modifiers.new("bool", "BOOLEAN"); m.operation = op; m.object = cutter; m.solver = "EXACT"
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(cutter, do_unlink=True)

def facade(M):
    W, H, E = LARGEUR_MUR, HAUTEUR_MUR, EPAISSEUR
    # Mur principal en plâtre : bloc percé de l'ouverture en fer à cheval
    mb = MB(); mb.box((0, E / 2, H / 2), (W, E, H))
    mur = mb.objet("mur", M["tadelakt"])
    cut = MB(); cut.prisme(arche(0.0, bas=-0.05), -0.2, E + 0.3)
    c = cut.objet("decoupe", None)
    booleen(mur, c)

    # Moulures en relief autour de l'arche (anneaux concentriques, de plus en plus saillants)
    couches = [(0.0, 0.07, 0.030, "platre"), (0.07, 0.19, 0.050, "platre"), (0.19, 0.25, 0.085, "platre"), (0.25, 0.46, 0.060, "platre"),
               (0.46, 0.53, 0.095, "platre"), (0.53, 0.58, 0.060, "pierre")]
    for o0, o1, sail, mat in couches:
        mb = MB(); mb.anneau(arche(o0), arche(o1), -sail, 0.001)
        mb.objet(f"moulure_{o0:.2f}", M[mat], bevel=0.006)

    # Bande de zellige encadrant l'arche (anneau intermédiaire)
    mb = MB(); mb.anneau(arche(0.58), arche(0.84), -0.045, 0.0)
    mb.objet("zellige_arche", M["zellige_mur"])
    mb = MB(); mb.anneau(arche(0.84), arche(0.90), -0.07, 0.0)
    mb.objet("filet_zellige", M["pierre"], bevel=0.005)

    # Arc festonné (perles de plâtre le long de l'intrados) : lobes de l'arche mauresque
    pts = arche(0.0, n=36)[1:-1]
    mb = MB()
    for i, (x, z) in enumerate(pts):
        if i % 2 == 0:
            mb.sph((x * 0.975, 0.10, H_RETOMBEE + (z - H_RETOMBEE) * 0.975), 0.082, sc=(1, 0.8, 1), seg=14)
    mb.objet("lobes", M["platre"], bevel=0.0)

    # Colonnes engagées à la naissance de l'arche
    for s in (-1, 1):
        cx = s * (R_ARCHE * math.cos(DELTA) + 0.33)
        mb = MB()
        mb.cyl((cx, -0.07, 0.07), 0.19, 0.14, seg=32)                  # base
        mb.cyl((cx, -0.07, 0.26), 0.15, 0.24, seg=32)                  # plinthe
        mb.cyl((cx, -0.07, 1.65), 0.108, 2.9, seg=32)                  # fût
        for k in range(14):                                          # anneaux du fût
            pass
        mb.tor((cx, -0.07, 0.36), 0.11, 0.032, seg=40)
        mb.tor((cx, -0.07, 3.04), 0.11, 0.030, seg=40)
        # chapiteau (corbeilles étagées)
        for i, (r, hh) in enumerate([(0.14, 0.10), (0.19, 0.11), (0.24, 0.10), (0.285, 0.09)]):
            mb.cyl((cx, -0.07, 3.15 + i * 0.105), r, hh, seg=32)
        mb.box((cx, -0.07, 3.60), (0.62, 0.62, 0.10))
        mb.objet(f"colonne_{s}", M["platre"], bevel=0.004)
        # zellige du fût (fine bande)
        mb = MB(); mb.cyl((cx, -0.07, 1.65), 0.112, 2.5, seg=32)
        mb.objet(f"fut_zellige_{s}", M["zellige_col"])

    # Soubassement en zellige (hauteur 1,1 m) de part et d'autre de l'arche
    for s in (-1, 1):
        x0 = s * (R_ARCHE * math.cos(DELTA) + 0.40); x1 = s * (W / 2 - 0.02)
        cx = (x0 + x1) / 2; ww = abs(x1 - x0)
        mb = MB(); mb.box((cx, 0.01, 0.62), (ww, 0.05, 1.24))
        mb.objet(f"soubassement_{s}", M["zellige_mur"])
        mb = MB(); mb.box((cx, -0.02, 1.275), (ww + 0.02, 0.10, 0.07))
        mb.objet(f"corniche_soub_{s}", M["pierre"], bevel=0.008)

    # Panneaux sculptés (plâtre ajouré) en tympan de chaque côté : étoiles en relief encadrées
    for s in (-1, 1):
        cx = s * 2.35
        mb = MB(); mb.box((cx, -0.02, 3.35), (0.82, 0.04, 2.55))
        mb.objet(f"cadre_pan_{s}", M["pierre"], bevel=0.012)
        mb = MB()
        for k, zc in enumerate((2.55, 3.35, 4.15)):
            mb.etoile((cx, -0.045, zc), 0.30, pointes=8, creux=0.60, ep=0.035)
            mb.etoile((cx, -0.045, zc), 0.19, pointes=8, creux=0.60, ep=0.05, rot=math.pi / 8)
        mb.objet(f"etoiles_pan_{s}", M["platre"], bevel=0.003)

    # Frise de muqarnas (stalactites de plâtre) sous la corniche haute
    mb = MB()
    for row in range(3):
        n_cells = int(W / (0.3 - row * 0.05))
        step = W / n_cells
        for i in range(n_cells):
            x = -W / 2 + step * (i + 0.5)
            hh = 0.17 - row * 0.03
            mb.box((x, -0.02 - row * 0.03, 5.95 - row * 0.15), (step * 0.88, 0.08 + row * 0.04, hh), rot=(0, 0, 0))
            mb.cyl((x, -0.02 - row * 0.03, 5.95 - row * 0.15 - hh / 2), step * 0.44, 0.04, rot=(math.pi / 2, 0, 0), seg=12)
    mb.objet("muqarnas", M["platre"], bevel=0.004)

    # Corniche haute en cèdre sculpté (auvent)
    mb = MB(); mb.box((0, -0.28, 6.18), (W + 0.5, 0.78, 0.17))
    mb.box((0, -0.40, 6.31), (W + 0.7, 0.95, 0.13))
    mb.objet("corniche_cedre", M["cedre_sombre"], bevel=0.010)
    # Auvent : toit de tuiles vernissées vertes (touche d'émeraude)
    mb = MB()
    nt = int((W + 0.9) / 0.14)
    for i in range(nt):
        x = -(W + 0.9) / 2 + 0.07 + i * 0.14
        mb.cyl((x, -0.55, 6.62), 0.062, 1.45, rot=(math.radians(-62), 0, 0), seg=10)
    mb.objet("tuiles_emeraude", M["emeraude"])
    mb = MB(); mb.box((0, 0.35, 6.82), (W + 0.9, 0.55, 0.6)); mb.objet("rive_toit", M["pierre"], bevel=0.01)

    # Seuil et marches
    mb = MB(); mb.box((0, -0.55, -0.12), (3.7, 1.6, 0.30)); mb.box((0, -1.05, -0.25), (4.3, 1.5, 0.30)); mb.box((0, -1.55, -0.38), (4.9, 1.6, 0.30))
    mb.objet("marches", M["pierre"], bevel=0.015)
    # Sol de la cour avant (pierre sombre polie)
    mb = MB(); mb.box((0, -9.0, -0.55), (30, 18, 0.30)); mb.objet("sol_avant", M["pierre_sombre"])

def construire_battant(M, cote):
    """Battant (jambage → axe) avec panneaux, étoiles, ferrures ; l'objet racine est à la charnière."""
    jx = (R_ARCHE - 0.012) * math.cos(DELTA)
    arc = arche(-0.012, n=72)
    if cote < 0:
        demi = [(x, z) for x, z in arc if x <= 0.0]
        poly = [(x + jx, z) for x, z in demi] + [(jx, arc[len(arc) // 2][1]), (jx, 0.0)]
    else:
        demi = [(x, z) for x, z in reversed(arc) if x >= 0.0]
        poly = [(jx - x, z) for x, z in demi] + [(jx, arc[len(arc) // 2][1]), (jx, 0.0)]
    # u de 0 (charnière) à jx (axe) ; coordonnée locale x = cote * u (cote=-1 : vers la gauche négatif ? non : le battant gauche s'étend vers +x)
    s = -cote            # battant gauche (cote=-1) → s=+1 : s'étend vers +x depuis la charnière en x=-jx
    ep = 0.085
    loc = [(s * u, z) for u, z in poly]
    mb = MB(); mb.prisme(loc, -ep / 2, ep / 2)
    nom = "g" if cote < 0 else "d"
    corps = mb.objet(f"battant_{nom}", M["cedre"], loc=(cote * jx, 0.24, 0.0), bevel=0.004)
    # --- lames de planches : fines rainures verticales (bandes sombres)
    mb = MB()
    for k in range(1, 6):
        mb.box((s * jx * k / 6, -ep / 2 - 0.001, 1.4), (0.006, 0.004, 2.7))
    mb.objet(f"rainures_{nom}", M["cedre_sombre"], parent=corps)
    # --- cadres sculptés (montants/traverses saillants)
    mb = MB(); bord = 0.075
    # montants : charnière et axe
    mb.box((s * bord / 2, -ep / 2 - 0.016, 1.52), (bord, 0.034, 3.04))
    mb.box((s * (jx - bord / 2), -ep / 2 - 0.016, 1.52), (bord, 0.034, 3.04))
    for zc, hh in ((0.09, 0.15), (1.18, 0.12), (2.34, 0.12), (2.98, 0.10)):
        mb.box((s * jx / 2, -ep / 2 - 0.016, zc), (jx, 0.034, hh))
    mb.objet(f"cadres_{nom}", M["cedre"], parent=corps, bevel=0.006)
    # --- étoiles sculptées en relief dans les panneaux bas et médian
    mb = MB()
    cu = s * jx / 2
    for zc, rr in ((0.66, 0.30), (1.74, 0.30)):
        mb.etoile((cu, -ep / 2 - 0.016, zc), rr, pointes=8, creux=0.60, ep=0.03)
        mb.etoile((cu, -ep / 2 - 0.040, zc), rr * 0.58, pointes=8, creux=0.60, ep=0.03, rot=math.pi / 8)
        mb.cyl((cu, -ep / 2 - 0.05, zc), 0.045, 0.02, rot=(math.pi / 2, 0, 0), seg=20)
    mb.objet(f"etoiles_{nom}", M["cedre_sombre"], parent=corps, bevel=0.003)
    # --- rosace du haut (lunette) : anneaux concentriques en demi-cercle
    mb = MB()
    zc = H_RETOMBEE + 0.02
    for rr, hh in ((0.18, 0.025), (0.30, 0.02), (0.42, 0.02)):
        mb.tor((s * jx - 0.0 * s, -ep / 2 - 0.02, zc + 0.0), rr * 1.0, hh, rot=(math.pi / 2, 0, 0), seg=48)
    mb.objet(f"rosace_{nom}", M["laiton"], parent=corps)
    # --- clous de laiton alignés sur les cadres
    mb = MB()
    for zc in (0.30, 1.0, 1.35, 2.15, 2.55):
        n_clous = 5
        for i in range(n_clous):
            u = jx * (i + 0.5) / n_clous
            mb.sph((s * u, -ep / 2 - 0.040, zc), 0.021, sc=(1, 0.55, 1), seg=10)
    for zc in (0.55, 0.83, 1.55, 1.93):
        for u in (0.13, jx - 0.13):
            mb.sph((s * u, -ep / 2 - 0.040, zc), 0.021, sc=(1, 0.55, 1), seg=10)
    mb.objet(f"clous_{nom}", M["laiton"], parent=corps)
    # --- ferrures : 3 pentures horizontales + charnières
    mb = MB()
    for zc in (0.45, 1.5, 2.55):
        L = jx * 0.82
        mb.box((s * L / 2, -ep / 2 - 0.032, zc), (L, 0.014, 0.055))
        mb.cyl((s * L, -ep / 2 - 0.036, zc), 0.045, 0.012, rot=(math.pi / 2, 0, 0), seg=18)   # médaillon d'extrémité
        mb.cyl((0.0, 0.0, zc), 0.032, 0.20, seg=14)                                           # noeud de charnière sur l'axe de pivot
    mb.objet(f"ferrures_{nom}", M["laiton"], parent=corps, bevel=0.003)
    # --- heurtoir (anneau de laiton sur platine) près de l'axe
    mb = MB()
    hx = s * (jx - 0.22)
    mb.cyl((hx, -ep / 2 - 0.04, 1.28), 0.11, 0.022, rot=(math.pi / 2, 0, 0), seg=28)
    mb.etoile((hx, -ep / 2 - 0.052, 1.28), 0.095, pointes=8, creux=0.7, ep=0.015)
    mb.tor((hx, -ep / 2 - 0.075, 1.18), 0.085, 0.0115, rot=(math.pi / 2, 0, 0), seg=40)
    mb.sph((hx, -ep / 2 - 0.075, 1.285), 0.022, seg=12)
    mb.objet(f"heurtoir_{nom}", M["laiton"], parent=corps, bevel=0.002)
    return corps

def patio(M):
    """Cour intérieure visible derrière les battants : sol de zellige, galerie d'arcs, fontaine, lanternes, verdure."""
    # sol
    mb = MB(); mb.box((0, 7.3, -0.08), (9.4, 14.8, 0.16)); mb.objet("sol_patio", M["zellige_sol"])
    # murs latéraux et fond
    mb = MB(); mb.box((-4.7, 7.3, 2.6), (0.3, 14.8, 5.4)); mb.box((4.7, 7.3, 2.6), (0.3, 14.8, 5.4)); mb.box((0, 14.7, 2.9), (9.7, 0.3, 6.0))
    mb.objet("murs_patio", M["platre_clair"])
    # galerie du fond : trois arcs en fer à cheval avec alcôves éclairées
    for ax in (-2.6, 0.0, 2.6):
        mb = MB(); mb.anneau(arche(0.0, bas=0), arche(0.20, bas=0), 14.52, 14.58, ox=ax)
        mb.objet(f"arc_fond_{ax}", M["pierre"], bevel=0.01)
        mb = MB(); mb.prisme(arche(0.0, bas=0), 14.56, 14.60, ox=ax)
        mb.objet(f"alcove_{ax}", M["lumiere_chaude"])
    # arcs de la galerie latérale (rythme)
    for side in (-1, 1):
        for k in range(3):
            y = 4.5 + k * 3.2
            mb = MB(); mb.anneau(arche(0.0, bas=0), arche(0.17, bas=0), -0.03, 0.03, ox=0, oz=0)
            ob = mb.objet(f"arc_lat_{side}_{k}", M["pierre"], loc=(side * 4.52, y, 0), bevel=0.008)
            ob.rotation_euler = (0, 0, math.pi / 2 * (-side))
            mb2 = MB(); mb2.prisme(arche(0.0, bas=0), -0.05, 0.0)
            ob2 = mb2.objet(f"niche_lat_{side}_{k}", M["lumiere_douce"], loc=(side * 4.55, y, 0))
            ob2.rotation_euler = (0, 0, math.pi / 2 * (-side))
    # fontaine octogonale
    mb = MB(); mb.cyl((0, 6.3, 0.18), 1.35, 0.36, seg=8); mb.cyl((0, 6.3, 0.40), 1.05, 0.14, seg=8)
    mb.objet("vasque", M["zellige_col"], bevel=0.01)
    mb = MB(); mb.cyl((0, 6.3, 0.355), 1.02, 0.02, seg=8); mb.objet("eau", M["eau"])
    mb = MB(); mb.cyl((0, 6.3, 0.9), 0.1, 1.0, seg=16); mb.cyl((0, 6.3, 1.45), 0.26, 0.1, seg=16, r2=0.1)
    mb.objet("jet", M["pierre"])
    # lanternes de laiton suspendues sous l'arche
    for x, y, z in ((-0.55, 1.6, 3.05), (0.55, 1.9, 3.15), (0.0, 3.4, 3.4)):
        mb = MB()
        mb.cyl((x, y, z + 0.36), 0.01, 0.4, seg=6)
        mb.cyl((x, y, z + 0.13), 0.1, 0.07, seg=8, r2=0.02)
        mb.cyl((x, y, z - 0.10), 0.12, 0.38, seg=8, r2=0.075)
        mb.cyl((x, y, z - 0.31), 0.06, 0.05, seg=8)
        mb.objet(f"lanterne_{x}_{y}", M["laiton"])
        mb = MB(); mb.cyl((x, y, z - 0.10), 0.105, 0.34, seg=8, r2=0.062); mb.objet(f"verre_{x}_{y}", M["lumiere_vive"])
    # verdure : orangers en pots
    for x, y in ((-3.2, 4.2), (3.2, 4.2), (-3.2, 9.0), (3.2, 9.0)):
        mb = MB(); mb.cyl((x, y, 0.33), 0.30, 0.66, seg=16, r2=0.22); mb.objet(f"pot_{x}_{y}", M["emeraude"])
        mb = MB(); mb.cyl((x, y, 1.05), 0.03, 1.0, seg=8); mb.objet(f"tronc_{x}_{y}", M["cedre_sombre"])
        mb = MB()
        for _ in range(26):
            mb.sph((x + random.uniform(-0.5, 0.5), y + random.uniform(-0.5, 0.5), 1.85 + random.uniform(-0.35, 0.45)), random.uniform(0.17, 0.26), sc=(1, 1, 0.7), seg=8)
        mb.objet(f"feuillage_{x}_{y}", M["feuille"])
        mb = MB()
        for _ in range(7):
            mb.sph((x + random.uniform(-0.45, 0.45), y + random.uniform(-0.45, 0.45), 1.75 + random.uniform(-0.3, 0.4)), 0.055, seg=8)
        mb.objet(f"oranges_{x}_{y}", M["orange"])

def ciel_crepuscule():
    m, n, l, b = mat_nouveau("ciel_plan")
    for x in list(n):
        if x.name != "Material Output":
            n.remove(x)
    tc = n.new("ShaderNodeTexCoord"); sep = n.new("ShaderNodeSeparateXYZ"); l.new(tc.outputs["Object"], sep.inputs["Vector"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["From Min"].default_value = 5.0; rg.inputs["From Max"].default_value = 26.0
    l.new(sep.outputs["Z"], rg.inputs["Value"])
    cr = n.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].position = 0.0; cr.color_ramp.elements[0].color = (0.95, 0.42, 0.14, 1)
    e = cr.color_ramp.elements.new(0.35); e.color = (0.55, 0.20, 0.20, 1)
    cr.color_ramp.elements[-1].position = 1.0; cr.color_ramp.elements[-1].color = (0.04, 0.05, 0.16, 1)
    l.new(rg.outputs["Result"], cr.inputs["Fac"])
    em = n.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 1.4
    l.new(cr.outputs["Color"], em.inputs["Color"])
    out = n["Material Output"]; l.new(em.outputs["Emission"], out.inputs["Surface"])
    mb = MB(); mb.box((0, 34, 14), (140, 0.5, 60)); mb.objet("ciel_plan", m)

def lumieres(ouverture):
    ciel_crepuscule()
    def aire(nom, loc, cible, taille, puissance, couleur, forme="RECTANGLE"):
        d = bpy.data.lights.new(nom, "AREA"); d.shape = forme; d.size = taille; d.size_y = taille * (0.6 if forme == "RECTANGLE" else 1)
        d.energy = puissance; d.color = couleur
        ob = bpy.data.objects.new(nom, d); bpy.context.collection.objects.link(ob)
        ob.location = loc
        ob.rotation_euler = (Vector(cible) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        return ob
    # principale : douce, haute, légèrement latérale (révèle les reliefs)
    aire("cle", (-5.5, -7.0, 8.0), (0.3, 0, 3.0), 6.5, 900, (1.0, 0.86, 0.68))
    # remplissage froid discret
    aire("remplissage", (6.5, -9.0, 3.0), (0, 0, 2.6), 7.0, 140, (0.62, 0.74, 1.0))
    sol = bpy.data.lights.new("soleil", "SUN"); sol.energy = 5.5; sol.angle = math.radians(2.5); sol.color = (1.0, 0.72, 0.45)
    so = bpy.data.objects.new("soleil", sol); bpy.context.collection.objects.link(so); so.rotation_euler = (math.radians(76), 0, math.radians(-52))
    # contre-jour de contour (sur le toit et la corniche)
    aire("contour", (0.0, 5.0, 12.0), (0, -0.4, 6.0), 6.0, 900, (1.0, 0.78, 0.5))
    # lumière chaude du patio : visible dans l'ouverture
    p = bpy.data.lights.new("patio", "POINT"); p.energy = 5200 + 9000 * (ouverture / 100.0) ** 2; p.color = (1.0, 0.56, 0.22); p.shadow_soft_size = 0.7
    po = bpy.data.objects.new("patio", p); bpy.context.collection.objects.link(po); po.location = (0, 3.6, 3.2)
    p2 = bpy.data.lights.new("patio2", "POINT"); p2.energy = 2600; p2.color = (1.0, 0.7, 0.4); p2.shadow_soft_size = 1.2
    po2 = bpy.data.objects.new("patio2", p2); bpy.context.collection.objects.link(po2); po2.location = (0, 9.5, 3.8)
    # monde : ciel de crépuscule doux (dégradé), force faible
    w = bpy.data.worlds.new("ciel"); bpy.context.scene.world = w; w.use_nodes = True
    n = w.node_tree.nodes; l = w.node_tree.links
    for x in list(n):
        if x.name != "World Output":
            n.remove(x)
    tc = n.new("ShaderNodeTexCoord"); sep = n.new("ShaderNodeSeparateXYZ"); l.new(tc.outputs["Generated"], sep.inputs["Vector"])
    cr = n.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].position = 0.46; cr.color_ramp.elements[0].color = (0.82, 0.48, 0.22, 1)
    cr.color_ramp.elements[1].position = 0.64; cr.color_ramp.elements[1].color = (0.13, 0.15, 0.30, 1)
    l.new(sep.outputs["Z"], cr.inputs["Fac"])
    bg = n.new("ShaderNodeBackground"); bg.inputs["Strength"].default_value = 0.7
    l.new(cr.outputs["Color"], bg.inputs["Color"]); l.new(bg.outputs["Background"], n["World Output"].inputs["Surface"])

VUES = {
    # (position caméra, point visé, focale mm, décalage vertical)
    "frontal":      ((0.0, -12.5, 3.55), (0.0, 0.0, 3.55), 48, 0.0),
    "trois-quarts": ((5.6, -9.0, 2.7), (-0.4, 0.0, 3.1), 44, 0.0),
    "detail":       ((1.25, -2.9, 1.65), (-0.15, 0.2, 1.55), 52, 0.0),
}

def camera(nom_vue):
    pos, cible, focale, shift = VUES[nom_vue]
    cam_d = bpy.data.cameras.new("cam"); cam_d.lens = focale; cam_d.sensor_width = 24; cam_d.sensor_fit = "HORIZONTAL"; cam_d.shift_y = shift
    cam_d.dof.use_dof = True; cam_d.dof.focus_distance = (Vector(cible) - Vector(pos)).length; cam_d.dof.aperture_fstop = 11 if nom_vue != "detail" else 3.2
    cam = bpy.data.objects.new("camera", cam_d); bpy.context.collection.objects.link(cam)
    cam.location = pos
    cam.rotation_euler = (Vector(cible) - Vector(pos)).to_track_quat("-Z", "Y").to_euler()
    bpy.context.scene.camera = cam
    return cam

def reglages(qualite):
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    haute = qualite == "haute"
    sc.render.resolution_x, sc.render.resolution_y = (1080, 1920) if haute else (576, 1024)
    sc.render.resolution_percentage = 100
    sc.cycles.samples = 160 if haute else 40
    sc.cycles.use_adaptive_sampling = True; sc.cycles.adaptive_threshold = 0.02
    sc.cycles.use_denoising = True
    try:
        sc.cycles.denoiser = "OPENIMAGEDENOISE"
    except Exception:
        pass
    sc.cycles.max_bounces = 6; sc.cycles.diffuse_bounces = 3; sc.cycles.glossy_bounces = 4; sc.cycles.transmission_bounces = 4
    sc.cycles.sample_clamp_indirect = 8.0
    sc.view_settings.view_transform = "AgX"
    try:
        sc.view_settings.look = "AgX - Medium High Contrast"
    except Exception:
        pass
    sc.view_settings.exposure = 0.0
    sc.render.image_settings.file_format = "PNG"; sc.render.image_settings.color_depth = "8"

def construire(ouverture):
    vider()
    M = {
        "platre": mat_platre("platre", (0.86, 0.76, 0.60), 0.68, 0.40),
        "tadelakt": mat_platre("tadelakt", (0.60, 0.40, 0.23), 0.34, 0.18),
        "platre_clair": mat_platre("platre_clair", (0.86, 0.77, 0.62), 0.75, 0.25),
        "pierre": mat_pierre("pierre"),
        "pierre_sombre": mat_platre("pierre_sombre", (0.22, 0.19, 0.16), 0.38, 0.30),
        "cedre": mat_cedre("cedre"), "cedre_sombre": mat_cedre("cedre_sombre", True),
        "laiton": mat_laiton(),
        "zellige_mur": mat_zellige("zellige_mur", echelle=4.6, plan="xz"),
        "zellige_col": mat_zellige("zellige_col", echelle=5.0, plan="xz"),
        "zellige_sol": mat_zellige("zellige_sol", echelle=2.0, plan="xy"),
        "emeraude": mat_emeraude(), "eau": mat_eau(), "feuille": mat_feuille(),
        "orange": mat_lumiere("orange", (0.9, 0.35, 0.03), 0.4),
        "lumiere_chaude": mat_lumiere("alcove", (1.0, 0.62, 0.26), 5.5),
        "lumiere_douce": mat_lumiere("niche", (1.0, 0.66, 0.32), 2.2),
        "lumiere_vive": mat_lumiere("verre", (1.0, 0.6, 0.2), 14.0),
    }
    facade(M)
    patio(M)
    g = construire_battant(M, -1); d = construire_battant(M, +1)
    # ouverture : rotation autour de la charnière (origine de l'objet), vers l'intérieur (y positif)
    a = math.radians(95.0 * ouverture / 100.0)
    g.rotation_euler = (0, 0, +a)    # le battant gauche charnière en x<0 : tourne vers +y (sens anti-horaire vu de dessus)
    d.rotation_euler = (0, 0, -a)
    lumieres(ouverture)
    return M

def main():
    qualite = arg("--qualite", "brouillon")
    ouverture = float(arg("--ouverture", "0"))
    os.makedirs(SORTIE, exist_ok=True)
    construire(ouverture)
    reglages(qualite)
    if "--blend" in ARGS:
        camera("frontal")
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "riad_royal.blend"))
        print("blend enregistré")
        return
    vue = arg("--vue", "frontal")
    vues = list(VUES) if vue == "toutes" else [vue]
    for v in vues:
        for ob in [o for o in bpy.data.objects if o.type == "CAMERA"]:
            bpy.data.objects.remove(ob, do_unlink=True)
        camera(v)
        suffixe = f"_o{int(ouverture):03d}" if ouverture else ""
        bpy.context.scene.render.filepath = os.path.join(SORTIE, f"riad-royal_{v}{suffixe}_{qualite}.png")
        bpy.ops.render.render(write_still=True)
        print("rendu :", bpy.context.scene.render.filepath)

main()
