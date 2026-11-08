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
# Primitives complémentaires
# ----------------------------------------------------------------------------------------------
def _frustum(self, c, w, h, w2, h2, prof, y_dir=-1):
    """Panneau mouluré en tronc de pyramide : base (w x h) posée en c, sommet (w2 x h2) à `prof` en avant (y négatif)."""
    bm = self.bm
    cx, cy, cz = c
    b = [bm.verts.new((cx + sx * w / 2, cy, cz + sz * h / 2)) for sx, sz in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
    t = [bm.verts.new((cx + sx * w2 / 2, cy + y_dir * prof, cz + sz * h2 / 2)) for sx, sz in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
    for i in range(4):
        bm.faces.new((b[i], b[(i + 1) % 4], t[(i + 1) % 4], t[i]))
    bm.faces.new(t)
    bm.faces.new(list(reversed(b)))
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
MB.frustum = _frustum

def etoile_pts(r, pointes=8, creux=0.62, rot=0.0, n_par_branche=1):
    pts = []
    for i in range(pointes * 2):
        a = rot + math.pi * i / pointes + math.pi / 2
        rr = r if i % 2 == 0 else r * creux
        pts.append((rr * math.cos(a), rr * math.sin(a)))
    pts.append(pts[0])
    return pts

def ligne_etoile(mb, c, r, largeur, y0, y1, pointes=8, creux=0.62, rot=0.0):
    """Contour fin d'une étoile (gravure en relief), en deux profils de même longueur."""
    ext = etoile_pts(r, pointes, creux, rot)
    # profil intérieur : homothétie vers le centre (largeur constante approchée)
    k = (r - largeur) / r
    interieur = [(x * k, z * k) for x, z in ext]
    mb.anneau(interieur, ext, y0, y1, ox=c[0], oz=c[2])

def ligne_cercle(mb, c, r, largeur, y0, y1, n=64, a0=0.0, a1=2 * math.pi):
    ext = [(r * math.cos(a0 + (a1 - a0) * i / n), r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]
    inte = [((r - largeur) * math.cos(a0 + (a1 - a0) * i / n), (r - largeur) * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]
    mb.anneau(inte, ext, y0, y1, ox=c[0], oz=c[2])

def arche_festonnee(r_int, lobes=19, creux=0.085, n_par_lobe=10):
    """Profil d'arche à lobes (intrados festonné), décalé de r_int."""
    total = lobes * n_par_lobe
    pts = []
    for i in range(total + 1):
        t = i / total
        a = (math.pi + DELTA) - t * (math.pi + 2 * DELTA)
        lobe = abs(math.sin(math.pi * lobes * t))
        r = R_ARCHE + r_int - creux * (1 - (1 - lobe) ** 1.0) * 1.0
        pts.append((r * math.cos(a), H_RETOMBEE + r * math.sin(a)))
    return pts

# ----------------------------------------------------------------------------------------------
# Matériaux PBR procéduraux
# ----------------------------------------------------------------------------------------------
def mat_nouveau(nom):
    m = bpy.data.materials.new(nom); m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links, m.node_tree.nodes["Principled BSDF"]

def champ(bsdf, nom, v):
    bsdf.inputs[nom].default_value = v

def mat_cedre(nom="cedre", sombre=False, ton=1.0):
    """Cèdre de l'Atlas huilé : fil serré, veines sinueuses, pores, lames aux teintes légèrement différentes, brillance satinée."""
    m, n, l, b = mat_nouveau(nom)
    tc = n.new("ShaderNodeTexCoord"); geo = n.new("ShaderNodeNewGeometry")
    # fibres étirées dans la hauteur (z)
    mp = n.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (1.0, 0.8, 0.075)
    l.new(tc.outputs["Object"], mp.inputs["Vector"])
    wv = n.new("ShaderNodeTexWave"); wv.wave_type = "BANDS"; wv.bands_direction = "X"; wv.wave_profile = "SAW"
    wv.inputs["Scale"].default_value = 30; wv.inputs["Distortion"].default_value = 9; wv.inputs["Detail"].default_value = 4; wv.inputs["Detail Scale"].default_value = 1.6; wv.inputs["Detail Roughness"].default_value = 0.6
    l.new(mp.outputs["Vector"], wv.inputs["Vector"])
    # pores fins (bruit très étiré)
    mp2 = n.new("ShaderNodeMapping"); mp2.inputs["Scale"].default_value = (90, 90, 2.2)
    l.new(tc.outputs["Object"], mp2.inputs["Vector"])
    pores = n.new("ShaderNodeTexNoise"); pores.inputs["Scale"].default_value = 1.0; pores.inputs["Detail"].default_value = 3; pores.inputs["Roughness"].default_value = 0.7
    l.new(mp2.outputs["Vector"], pores.inputs["Vector"])
    # variation de teinte par grandes zones (lames)
    mp3 = n.new("ShaderNodeMapping"); mp3.inputs["Scale"].default_value = (7, 1, 0.12)
    l.new(tc.outputs["Object"], mp3.inputs["Vector"])
    lames = n.new("ShaderNodeTexVoronoi"); lames.inputs["Scale"].default_value = 1.0
    l.new(mp3.outputs["Vector"], lames.inputs["Vector"])
    mix_fil = n.new("ShaderNodeMath"); mix_fil.operation = "MULTIPLY"; mix_fil.inputs[1].default_value = 0.55
    l.new(wv.outputs["Fac"], mix_fil.inputs[0])
    add_p = n.new("ShaderNodeMath"); add_p.operation = "ADD"
    l.new(mix_fil.outputs["Value"], add_p.inputs[0]); l.new(pores.outputs["Fac"], add_p.inputs[1])
    var = n.new("ShaderNodeMath"); var.operation = "MULTIPLY"; var.inputs[1].default_value = 0.5
    l.new(add_p.outputs["Value"], var.inputs[0])
    cr = n.new("ShaderNodeValToRGB")
    f = 0.55 if sombre else 1.0
    cr.color_ramp.elements[0].color = (0.028 * f * ton, 0.0105 * f * ton, 0.0042 * f, 1)
    cr.color_ramp.elements[1].color = (0.150 * f * ton, 0.066 * f * ton, 0.026 * f, 1)
    l.new(var.outputs["Value"], cr.inputs["Fac"])
    teinte = n.new("ShaderNodeMix"); teinte.data_type = "RGBA"; teinte.blend_type = "MULTIPLY"
    teinte.inputs[0].default_value = 0.8
    l.new(cr.outputs["Color"], teinte.inputs[6])
    cl = n.new("ShaderNodeValToRGB"); cl.color_ramp.elements[0].color = (0.78, 0.74, 0.70, 1); cl.color_ramp.elements[1].color = (1.12, 1.06, 1.0, 1)
    l.new(lames.outputs["Distance"], cl.inputs["Fac"]); l.new(cl.outputs["Color"], teinte.inputs[7])
    l.new(teinte.outputs[2], b.inputs["Base Color"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["To Min"].default_value = 0.30; rg.inputs["To Max"].default_value = 0.58
    l.new(var.outputs["Value"], rg.inputs["Value"]); l.new(rg.outputs["Result"], b.inputs["Roughness"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.45; bp.inputs["Distance"].default_value = 0.0035
    add_b = n.new("ShaderNodeMath"); add_b.operation = "ADD"
    l.new(wv.outputs["Fac"], add_b.inputs[0]); l.new(pores.outputs["Fac"], add_b.inputs[1])
    l.new(add_b.outputs["Value"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    champ(b, "Coat Weight", 0.18); champ(b, "Coat Roughness", 0.30); champ(b, "Specular IOR Level", 0.40)
    return m

def mat_laiton(nom="laiton", ancien=True):
    """Laiton ancien : métal chaud, polissage inégal, oxydation brune dans les creux, usure claire sur les arêtes, micro-rayures."""
    m, n, l, b = mat_nouveau(nom)
    ao = n.new("ShaderNodeAmbientOcclusion"); ao.inputs["Distance"].default_value = 0.05; ao.samples = 8
    bv = n.new("ShaderNodeBevel"); bv.inputs["Radius"].default_value = 0.004; bv.samples = 6
    ns = n.new("ShaderNodeTexNoise"); ns.inputs["Scale"].default_value = 38; ns.inputs["Detail"].default_value = 10; ns.inputs["Roughness"].default_value = 0.62
    tc = n.new("ShaderNodeTexCoord"); l.new(tc.outputs["Object"], ns.inputs["Vector"])
    ns2 = n.new("ShaderNodeTexNoise"); ns2.inputs["Scale"].default_value = 5; ns2.inputs["Detail"].default_value = 4
    l.new(tc.outputs["Object"], ns2.inputs["Vector"])
    # patine : AO sombre + bruit grossier
    pat = n.new("ShaderNodeMath"); pat.operation = "MULTIPLY"
    inv = n.new("ShaderNodeMath"); inv.operation = "SUBTRACT"; inv.inputs[0].default_value = 1.0
    l.new(ao.outputs["AO"], inv.inputs[1])
    add = n.new("ShaderNodeMath"); add.operation = "ADD"; l.new(inv.outputs["Value"], add.inputs[0]); l.new(ns2.outputs["Fac"], add.inputs[1])
    mul = n.new("ShaderNodeMath"); mul.operation = "MULTIPLY"; mul.inputs[1].default_value = 0.85; l.new(add.outputs["Value"], mul.inputs[0])
    cr = n.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].position = 0.35; cr.color_ramp.elements[0].color = (0.56, 0.40, 0.19, 1)   # laiton satiné
    cr.color_ramp.elements[1].position = 0.95; cr.color_ramp.elements[1].color = (0.15, 0.085, 0.034, 1)  # laiton oxydé
    l.new(mul.outputs["Value"], cr.inputs["Fac"])
    l.new(cr.outputs["Color"], b.inputs["Base Color"])
    champ(b, "Metallic", 1.0)
    rg = n.new("ShaderNodeMapRange"); rg.inputs["To Min"].default_value = 0.30; rg.inputs["To Max"].default_value = 0.66
    l.new(mul.outputs["Value"], rg.inputs["Value"]); l.new(rg.outputs["Result"], b.inputs["Roughness"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.14; bp.inputs["Distance"].default_value = 0.0015
    l.new(ns.outputs["Fac"], bp.inputs["Height"]); l.new(bv.outputs["Normal"], bp.inputs["Normal"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m

def mat_platre(nom="platre", teinte=(0.80, 0.69, 0.53), rugosite=0.72, relief=0.35, echelle=22):
    m, n, l, b = mat_nouveau(nom)
    tc = n.new("ShaderNodeTexCoord")
    ns = n.new("ShaderNodeTexNoise"); ns.inputs["Scale"].default_value = echelle; ns.inputs["Detail"].default_value = 10; ns.inputs["Roughness"].default_value = 0.65
    ns2 = n.new("ShaderNodeTexNoise"); ns2.inputs["Scale"].default_value = 1.7; ns2.inputs["Detail"].default_value = 5
    ns3 = n.new("ShaderNodeTexNoise"); ns3.inputs["Scale"].default_value = 0.45; ns3.inputs["Detail"].default_value = 2
    for t in (ns, ns2, ns3):
        l.new(tc.outputs["Object"], t.inputs["Vector"])
    cr = n.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].color = (teinte[0] * 0.62, teinte[1] * 0.60, teinte[2] * 0.56, 1)
    cr.color_ramp.elements[1].color = (min(teinte[0] * 1.08, 1), min(teinte[1] * 1.06, 1), min(teinte[2] * 1.05, 1), 1)
    sm = n.new("ShaderNodeMath"); sm.operation = "ADD"; l.new(ns2.outputs["Fac"], sm.inputs[0]); l.new(ns3.outputs["Fac"], sm.inputs[1])
    sm2 = n.new("ShaderNodeMath"); sm2.operation = "MULTIPLY"; sm2.inputs[1].default_value = 0.5; l.new(sm.outputs["Value"], sm2.inputs[0])
    l.new(sm2.outputs["Value"], cr.inputs["Fac"]); l.new(cr.outputs["Color"], b.inputs["Base Color"])
    champ(b, "Roughness", rugosite)
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = relief; bp.inputs["Distance"].default_value = 0.012
    l.new(ns.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m

def mat_ceramique(nom, rgb, rugosite=0.09, variation=0.30):
    """Émail de zellige : surface légèrement ondulée, brillance vive, couleur qui varie d'un carreau à l'autre."""
    m, n, l, b = mat_nouveau(nom)
    geo = n.new("ShaderNodeNewGeometry")
    tint = n.new("ShaderNodeMath"); tint.operation = "MULTIPLY_ADD"
    tint.inputs[1].default_value = variation; tint.inputs[2].default_value = 1.0 - variation / 2
    l.new(geo.outputs["Random Per Island"], tint.inputs[0])
    mx = n.new("ShaderNodeMix"); mx.data_type = "RGBA"; mx.blend_type = "MULTIPLY"; mx.inputs[0].default_value = 1.0
    mx.inputs[6].default_value = (*rgb, 1)
    l.new(tint.outputs["Value"], mx.inputs[7])
    # on passe la valeur scalaire sur les trois canaux
    comb = n.new("ShaderNodeCombineColor"); l.new(tint.outputs["Value"], comb.inputs[0]); l.new(tint.outputs["Value"], comb.inputs[1]); l.new(tint.outputs["Value"], comb.inputs[2])
    l.new(comb.outputs["Color"], mx.inputs[7])
    # léger voile de poussière / irrégularité d'émail
    tc = n.new("ShaderNodeTexCoord"); ns = n.new("ShaderNodeTexNoise"); ns.inputs["Scale"].default_value = 70; ns.inputs["Detail"].default_value = 6
    l.new(tc.outputs["Object"], ns.inputs["Vector"])
    mx2 = n.new("ShaderNodeMix"); mx2.data_type = "RGBA"; mx2.blend_type = "MULTIPLY"; mx2.inputs[0].default_value = 0.22
    l.new(mx.outputs[2], mx2.inputs[6]); mx2.inputs[7].default_value = (0.55, 0.52, 0.48, 1)
    l.new(ns.outputs["Fac"], mx2.inputs[0])
    l.new(mx2.outputs[2], b.inputs["Base Color"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["To Min"].default_value = rugosite; rg.inputs["To Max"].default_value = rugosite + 0.12
    l.new(ns.outputs["Fac"], rg.inputs["Value"]); l.new(rg.outputs["Result"], b.inputs["Roughness"])
    bp = n.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.18; bp.inputs["Distance"].default_value = 0.0015
    ns2 = n.new("ShaderNodeTexNoise"); ns2.inputs["Scale"].default_value = 14; ns2.inputs["Detail"].default_value = 2
    l.new(tc.outputs["Object"], ns2.inputs["Vector"]); l.new(ns2.outputs["Fac"], bp.inputs["Height"]); l.new(bp.outputs["Normal"], b.inputs["Normal"])
    champ(b, "Coat Weight", 0.55); champ(b, "Coat Roughness", 0.02); champ(b, "Specular IOR Level", 0.55)
    return m

def mat_emeraude(nom="emeraude"):
    m = mat_ceramique(nom, (0.010, 0.17, 0.095), 0.05, 0.22)
    return m

def mat_lumiere(nom="lumiere", couleur=(1.0, 0.55, 0.18), force=8.0):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (*couleur, 1)); champ(b, "Emission Color", (*couleur, 1)); champ(b, "Emission Strength", force)
    return m

def mat_eau(nom="eau"):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (0.02, 0.18, 0.2, 1)); champ(b, "Roughness", 0.02); champ(b, "Transmission Weight", 0.85); champ(b, "IOR", 1.33)
    return m

def mat_feuille(nom="feuille"):
    m, n, l, b = mat_nouveau(nom)
    champ(b, "Base Color", (0.03, 0.12, 0.03, 1)); champ(b, "Roughness", 0.55)
    return m

# ----------------------------------------------------------------------------------------------
# Zellige : vrais carreaux (octogones, étoiles, losanges) posés sur un lit de ciment
# ----------------------------------------------------------------------------------------------
def polygone_regulier(c, r, n, rot):
    return [(c[0] + r * math.cos(rot + 2 * math.pi * i / n), c[1] + r * math.sin(rot + 2 * math.pi * i / n)) for i in range(n)]

def panneau_zellige(Z, x0, x1, z0, z1, pas=0.17, y=-0.014, ep=0.012, joint=0.006, decalage=0):
    """Tapis octogones / carrés : chaque octogone porte une étoile à huit branches ; losanges aux sommets."""
    cols = int((x1 - x0) / pas) + 1
    rows = int((z1 - z0) / pas) + 1
    for i in range(cols):
        for j in range(rows):
            cx = x0 + pas * (i + 0.5); cz = z0 + pas * (j + 0.5)
            if cx + pas / 2 > x1 + 1e-6 or cz + pas / 2 > z1 + 1e-6:
                continue
            alt = (i + j + decalage) % 2
            # octogone (à plat) : rayon circonscrit = (pas/2)/cos(22.5°)
            ro = (pas / 2 - joint / 2) / math.cos(math.pi / 8)
            Z["ivoire" if alt == 0 else "ocre"].prisme(polygone_regulier((cx, cz), ro, 8, math.pi / 8), y, y - ep)
            # étoile à huit branches incrustée, en émeraude ou en cobalt
            pts = []
            for k in range(16):
                a = math.pi * k / 8 + math.pi / 8 * 0
                rr = ro * (0.80 if k % 2 == 0 else 0.46)
                pts.append((cx + rr * math.cos(a), cz + rr * math.sin(a)))
            Z["emeraude" if alt == 0 else "cobalt"].prisme(pts, y - ep, y - ep - 0.0035)
            # petit octogone central
            Z["noir" if alt == 0 else "ivoire"].prisme(polygone_regulier((cx, cz), ro * 0.24, 8, math.pi / 8), y - ep - 0.0035, y - ep - 0.006)
            # losange au sommet (angle bas-gauche de la maille)
            if i > 0 and j > 0 and (i + j) % 1 == 0:
                lx = x0 + pas * i; lz = z0 + pas * j
                rl = pas * 0.5 * (1 - math.sqrt(2) * 0.5 * 0) * 0.215 * math.sqrt(2) * 1.42
                Z["cobalt" if alt == 0 else "emeraude"].prisme(polygone_regulier((lx, lz), (pas * 0.2), 4, math.pi / 4), y, y - ep * 0.9)

def frise_zellige_arche(Z, off0, off1, y=-0.02, ep=0.012, pas_angulaire=64, couleurs=("emeraude", "ivoire", "cobalt", "ivoire", "ocre", "ivoire")):
    inter = arche(off0, n=pas_angulaire); exter = arche(off1, n=pas_angulaire)
    # on saute les deux points de pied pour ne garder que le cintre
    inter, exter = inter[1:-1], exter[1:-1]
    for i in range(len(inter) - 1):
        a, b = inter[i], inter[i + 1]; c, d = exter[i + 1], exter[i]
        cx = (a[0] + b[0] + c[0] + d[0]) / 4; cz = (a[1] + b[1] + c[1] + d[1]) / 4
        def rap(p, k=0.86):
            return (cx + (p[0] - cx) * k, cz + (p[1] - cz) * k)
        quad = [rap(a), rap(b), rap(c), rap(d)]
        # le sens doit rester cohérent : (a, b, c, d) est déjà un cycle
        Z[couleurs[i % len(couleurs)]].prisme(quad, y, y - ep)

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

def sebka(mb, x0, x1, z0, z1, pas=0.26, largeur=0.022, y0=-0.004, y1=-0.032, region=None):
    """Réseau de losanges entrelacés (sebka) en plâtre sculpté, limité par `region(x, z)`."""
    from math import sqrt
    # deux familles de diagonales
    n = int((x1 - x0) / pas) + 3
    for sens in (1, -1):
        k = -n * 2
        while k < n * 2:
            # droite : z = sens*(x - x0) + k*pas*sqrt(2)/1
            pts = []
            steps = 120
            for s_ in range(steps + 1):
                x = x0 + (x1 - x0) * s_ / steps
                z = z0 + sens * (x - x0) * 1.35 + k * pas * 0.95
                pts.append((x, z))
            seg = []
            for (x, z) in pts:
                if z0 <= z <= z1 and (region is None or region(x, z)):
                    seg.append((x, z))
                else:
                    if len(seg) > 1:
                        _barre(mb, seg, largeur, y0, y1)
                    seg = []
            if len(seg) > 1:
                _barre(mb, seg, largeur, y0, y1)
            k += 1
    # perles aux croisements (palmettes simplifiées)
    for i in range(-n, n):
        for j in range(-n * 2, n * 2):
            x = x0 + i * pas * 0.7407
            z = z0 + j * pas * 0.95 * 1.0
            # croisements des deux familles
            pass

def _barre(mb, seg, largeur, y0, y1):
    """Bande mince suivant une polyligne (x, z)."""
    # on construit un ruban : deux profils décalés perpendiculairement
    n = len(seg)
    gauche, droite = [], []
    for i, (x, z) in enumerate(seg):
        if i < n - 1:
            dx, dz = seg[i + 1][0] - x, seg[i + 1][1] - z
        else:
            dx, dz = x - seg[i - 1][0], z - seg[i - 1][1]
        L = math.hypot(dx, dz) or 1.0
        nx, nz = -dz / L, dx / L
        gauche.append((x + nx * largeur / 2, z + nz * largeur / 2)); droite.append((x - nx * largeur / 2, z - nz * largeur / 2))
    mb.anneau(gauche, droite, y0, y1)

def hors_arche(marge):
    def f(x, z):
        # à l'extérieur de l'arche élargie
        if z < H_RETOMBEE:
            return abs(x) > R_ARCHE * math.cos(DELTA) + marge
        d = math.hypot(x, z - H_RETOMBEE)
        return d > R_ARCHE + marge
    return f


def petale_pts(c, ang, L, Wd, n=14):
    """Feuille / pétale pointu : polygone (x, z) dont la base est en c, orienté selon `ang` (0 = vers +x)."""
    up, dn = [], []
    for i in range(n + 1):
        t = i / n
        w = Wd / 2 * (math.sin(math.pi * t) ** 0.75) * (1 - 0.15 * t)
        up.append((t * L, w)); dn.append((t * L, -w))
    pts = up + list(reversed(dn[1:-1]))
    ca, sa = math.cos(ang), math.sin(ang)
    return [(c[0] + x * ca - z * sa, c[1] + x * sa + z * ca) for x, z in pts]

def palmette(mb, c, ang, L, y0, y1, eventail=(-52, -26, 0, 26, 52), longueurs=(0.62, 0.86, 1.0, 0.86, 0.62)):
    for da, k in zip(eventail, longueurs):
        mb.prisme(petale_pts(c, ang + math.radians(da), L * k, L * 0.34 * (0.7 + 0.3 * k)), y0, y1)
    mb.sph((c[0], (y0 + y1) / 2, c[1]), L * 0.13, sc=(1, 0.5, 1), seg=10)

def rinceau(mb, depart, fin, amp, pas, y0, y1, largeur=0.0075, taille_feuille=0.045, vertical=True):
    """Rinceau : tige sinueuse avec feuilles alternées (bandeau sculpté). depart/fin : points (x, z)."""
    (xa, za), (xb, zb) = depart, fin
    L = math.hypot(xb - xa, zb - za); ux, uz = (xb - xa) / L, (zb - za) / L
    nx, nz = -uz, ux
    N = max(8, int(L / 0.01))
    tige = []
    for i in range(N + 1):
        t = i / N * L
        d = amp * math.sin(2 * math.pi * t / pas)
        tige.append((xa + ux * t + nx * d, za + uz * t + nz * d))
    _barre(mb, tige, largeur, y0, y1)
    k = 0; t = pas / 4
    while t < L - taille_feuille:
        d = amp * math.sin(2 * math.pi * t / pas)
        base = (xa + ux * t + nx * d, za + uz * t + nz * d)
        cote = 1 if k % 2 == 0 else -1
        ang = math.atan2(uz, ux) + cote * math.radians(62)
        mb.prisme(petale_pts(base, ang, taille_feuille, taille_feuille * 0.46), y0, y1)
        mb.sph((base[0], (y0 + y1) / 2, base[1]), 0.0075, sc=(1, 0.6, 1), seg=8)
        k += 1; t += pas / 2

def frise_palmettes_arche(mb, off, n, L, y0, y1, alternance=True):
    pts = arche(off, n=n)[1:-1]
    for i, (x, z) in enumerate(pts):
        if z <= H_RETOMBEE + 0.05:
            continue
        dx, dz = x, z - H_RETOMBEE
        ang = math.atan2(dz, dx)
        if i % 2 == 0:
            palmette(mb, (x, z), ang, L, y0, y1)
        else:
            mb.sph((x + math.cos(ang) * L * 0.4, (y0 + y1) / 2, z + math.sin(ang) * L * 0.4), L * 0.15, sc=(1, 0.55, 1), seg=10)

def bordure_zellige(Z, x0, x1, z0, z1, taille=0.052, y=-0.016, ep=0.011, rangs=2):
    cols = ["cobalt", "ivoire", "emeraude", "ivoire", "ocre", "ivoire"]
    nx = int((x1 - x0) / taille)
    for r in range(rangs):
        for zc in (z0 + taille * (r + 0.5), z1 - taille * (r + 0.5)):
            for i in range(nx):
                xc = x0 + taille * (i + 0.5) + (taille / 2 if r % 2 else 0)
                if xc + taille / 2 > x1 + 1e-6:
                    continue
                h = taille / 2 - 0.0032
                Z[cols[(i + r * 3) % len(cols)]].prisme([(xc - h, zc - h), (xc + h, zc - h), (xc + h, zc + h), (xc - h, zc + h)], y, y - ep)

def anneau_corde(mb, c, R, r, n=46, y_decal=0.0):
    """Anneau en cordon torsadé (heurtoir) : perles allongées alternées autour d'un cercle dans le plan x-z."""
    for i in range(n):
        a = 2 * math.pi * i / n
        dy = r * 0.38 * (1 if i % 2 == 0 else -1)
        mb.sph((c[0] + R * math.cos(a), c[1] + y_decal + dy, c[2] + R * math.sin(a)), r, sc=(1.0, 0.9, 1.0), seg=10)

def penture(mb, s, u0, L, z, y, h=0.034, ep=0.010):
    """Penture ornementale : lanière fine terminée par une palmette à trois feuilles, rosaces de rivets."""
    mb.box((s * (u0 + L / 2), y - ep / 2, z), (L, ep, 2 * h))
    palmette(mb, (s * (u0 + L), z), 0.0 if s > 0 else math.pi, 0.115, y, y - ep, eventail=(-38, 0, 38), longueurs=(0.78, 1.0, 0.78))
    for i in range(int(L / 0.17)):
        u = u0 + 0.08 + i * 0.17
        mb.cyl((s * u, y - ep - 0.003, z), 0.016, 0.006, rot=(math.pi / 2, 0, 0), seg=16)
        mb.sph((s * u, y - ep - 0.007, z), 0.0085, sc=(1, 0.7, 1), seg=8)

def facade(M, Z):
    W, H, E = LARGEUR_MUR, HAUTEUR_MUR, EPAISSEUR
    # Mur épais en tadelakt, percé de l'ouverture en fer à cheval
    mb = MB(); mb.box((0, E / 2, H / 2), (W, E, H))
    mur = mb.objet("mur", M["tadelakt"])
    cut = MB(); cut.prisme(arche(0.0, bas=-0.05), -0.2, E + 0.3)
    booleen(mur, cut.objet("decoupe", None))

    # --- Alfiz : cadre rectangulaire saillant autour de l'arche, avec bandeau épigraphique
    AX, AZ = 2.55, 5.55
    mb = MB()
    mb.box((-AX, -0.045, AZ / 2), (0.17, 0.09, AZ)); mb.box((AX, -0.045, AZ / 2), (0.17, 0.09, AZ)); mb.box((0, -0.045, AZ), (2 * AX + 0.17, 0.09, 0.17))
    mb.objet("alfiz", M["platre"], bevel=0.01)
    # bandeau : petits cartouches répétés (écriture stylisée en relief) dans l'alfiz
    mb = MB()
    for zc in [0.35 + 0.16 * k for k in range(int((AZ - 0.7) / 0.16))]:
        for s in (-1, 1):
            mb.box((s * AX, -0.095, zc), (0.045, 0.012, 0.085 + 0.03 * ((int(zc * 100) // 16) % 2)))
    for xc in [-AX + 0.3 + 0.16 * k for k in range(int((2 * AX - 0.6) / 0.16))]:
        mb.box((xc, -0.095, AZ), (0.085 + 0.03 * ((int(xc * 100) // 16) % 2), 0.012, 0.045))
    mb.objet("epigraphie", M["platre"], bevel=0.002)

    # --- Moulures concentriques de l'arche (plus fines, plus nombreuses)
    couches = [(0.0, 0.03, 0.020, "platre"), (0.03, 0.09, 0.040, "platre"), (0.09, 0.115, 0.058, "platre"), (0.115, 0.20, 0.034, "platre"),
               (0.20, 0.225, 0.070, "platre"), (0.225, 0.30, 0.030, "platre"), (0.30, 0.325, 0.062, "platre"), (0.325, 0.50, 0.020, "platre"),
               (0.50, 0.535, 0.075, "pierre"), (0.535, 0.60, 0.040, "pierre")]
    for o0, o1, sail, mat in couches:
        mb = MB(); mb.anneau(arche(o0, n=96), arche(o1, n=96), -sail, 0.001)
        mb.objet(f"moulure_{o0:.3f}", M[mat], bevel=0.0035)
    # --- Frise de palmettes sculptée dans la large bande de l'arche, perles sur la bande intermédiaire
    mb = MB(); frise_palmettes_arche(mb, 0.412, 58, 0.115, -0.018, -0.045); mb.objet("frise_palmettes", M["platre_clair"], bevel=0.0012)
    mb = MB()
    for (x, z) in arche(0.157, n=120)[1:-1]:
        if z > H_RETOMBEE:
            mb.sph((x, -0.030, z), 0.021, sc=(1, 0.55, 1), seg=8)
    mb.objet("perles_arche", M["platre"])
    # --- Intrados festonné (lobes) : bande de plâtre découpée
    mb = MB(); mb.anneau(arche_festonnee(0.0), arche_festonnee(0.095, creux=0.0), -0.03, 0.12)
    mb.objet("intrados_festonne", M["platre"], bevel=0.0025)
    # --- Frise de zellige autour de l'arche (carreaux individuels) + filet
    frise_zellige_arche(Z, 0.60, 0.86, y=-0.024)
    mb = MB(); mb.anneau(arche(0.86, n=96), arche(0.90, n=96), -0.05, 0.0); mb.objet("filet_zellige", M["pierre"], bevel=0.004)
    mb = MB(); mb.anneau(arche(0.58, n=96), arche(0.60, n=96), -0.04, 0.0); mb.objet("filet_zellige_int", M["pierre"], bevel=0.003)

    # --- Spandrelles : réseau de losanges (sebka) en plâtre sculpté dans l'alfiz
    mb = MB()
    sebka(mb, -AX + 0.1, AX - 0.1, 0.0, AZ - 0.12, pas=0.30, largeur=0.024, y0=-0.006, y1=-0.036, region=lambda x, z: hors_arche(0.99)(x, z) and z > 1.36)
    mb.objet("sebka", M["platre_clair"], bevel=0.003)
    # palmettes aux angles supérieurs (rosaces en relief)
    for s in (-1, 1):
        mb = MB()
        for rr, ep_ in ((0.20, 0.03), (0.15, 0.045), (0.10, 0.060)):
            ligne_cercle(mb, (s * 1.85, 0, 4.72), rr, 0.022, -0.004, -ep_ - 0.02, n=48)
        for k in range(8):
            a = math.pi / 4 * k
            mb.sph((s * 1.85 + 0.255 * math.cos(a), -0.035, 4.72 + 0.255 * math.sin(a)), 0.026, sc=(1, 0.7, 1), seg=10)
        mb.objet(f"rosace_spandrelle_{s}", M["platre_clair"], bevel=0.002)

    # --- Colonnes engagées (fût cannelé, bague de laiton, chapiteau)
    for s in (-1, 1):
        cx = s * (R_ARCHE * math.cos(DELTA) + 0.33)
        mb = MB()
        mb.cyl((cx, -0.07, 0.05), 0.21, 0.10, seg=40); mb.cyl((cx, -0.07, 0.15), 0.17, 0.10, seg=40)
        mb.tor((cx, -0.07, 0.22), 0.145, 0.028, seg=48); mb.cyl((cx, -0.07, 1.66), 0.112, 2.9, seg=48)
        mb.tor((cx, -0.07, 0.33), 0.115, 0.022, seg=48); mb.tor((cx, -0.07, 3.06), 0.115, 0.022, seg=48); mb.tor((cx, -0.07, 3.12), 0.12, 0.014, seg=48)
        for i, (r, hh) in enumerate([(0.13, 0.08), (0.17, 0.10), (0.21, 0.09), (0.25, 0.08), (0.285, 0.07)]):
            mb.cyl((cx, -0.07, 3.18 + i * 0.085), r, hh, seg=40)
        for kk in range(12):                                         # feuilles d'acanthe stylisées
            a = 2 * math.pi * kk / 12
            mb.sph((cx + 0.2 * math.cos(a), -0.07 + 0.2 * math.sin(a), 3.30), 0.045, sc=(1, 1, 1.9), seg=8)
        mb.box((cx, -0.07, 3.68), (0.60, 0.60, 0.09)); mb.box((cx, -0.07, 3.755), (0.66, 0.66, 0.06))
        mb.objet(f"colonne_{s}", M["platre"], bevel=0.003)
        # cannelures : bandes de zellige verticales inscrites sur le fût
        mb = MB()
        for k in range(10):
            a = (k / 10) * 2 * math.pi
            mb.box((cx + 0.108 * math.cos(a), -0.07 + 0.108 * math.sin(a), 1.62), (0.012, 0.012, 2.82), rot=(0, 0, a))
        mb.objet(f"cannelures_{s}", M["pierre"])

    # --- Soubassements de zellige (vrais carreaux) sur un lit de ciment
    for s in (-1, 1):
        xa = R_ARCHE * math.cos(DELTA) + 0.62; xb = W / 2 - 0.05
        x0, x1 = (xa, xb) if s > 0 else (-xb, -xa)
        mb = MB(); mb.box(((x0 + x1) / 2, 0.0, 0.63), (x1 - x0, 0.03, 1.26)); mb.objet(f"lit_ciment_{s}", M["pierre_sombre"])
        bordure_zellige(Z, x0, x1, 0.04, 1.24)
        panneau_zellige(Z, x0 + 0.02, x1 - 0.02, 0.04 + 0.104, 1.24 - 0.104, pas=0.1, y=-0.016, joint=0.0045, decalage=(0 if s > 0 else 1))
        mb = MB(); mb.box(((x0 + x1) / 2, -0.03, 1.285), (x1 - x0 + 0.02, 0.10, 0.065)); mb.objet(f"corniche_soub_{s}", M["pierre"], bevel=0.006)

    # --- Frise de muqarnas (stalactites de plâtre) sous la corniche
    mb = MB()
    for row in range(3):
        n_cells = int(W / (0.30 - row * 0.05)); step = W / n_cells
        for i in range(n_cells):
            x = -W / 2 + step * (i + 0.5); hh = 0.17 - row * 0.03
            mb.box((x, -0.02 - row * 0.03, 5.95 - row * 0.15), (step * 0.88, 0.08 + row * 0.04, hh))
            mb.cyl((x, -0.02 - row * 0.03, 5.95 - row * 0.15 - hh / 2), step * 0.44, 0.04, rot=(math.pi / 2, 0, 0), seg=12)
    mb.objet("muqarnas", M["platre"], bevel=0.004)

    # --- Corniche haute en cèdre sculpté, consoles et auvent de tuiles vernissées
    mb = MB(); mb.box((0, -0.28, 6.18), (W + 0.5, 0.78, 0.17)); mb.box((0, -0.40, 6.31), (W + 0.7, 0.95, 0.13))
    mb.objet("corniche_cedre", M["cedre_sombre"], bevel=0.008)
    mb = MB()
    for i in range(int((W + 0.4) / 0.42)):                                  # consoles sculptées sous l'auvent
        x = -(W + 0.4) / 2 + 0.21 + i * 0.42
        mb.box((x, -0.30, 6.02), (0.10, 0.50, 0.11)); mb.box((x, -0.44, 5.96), (0.10, 0.22, 0.09))
        mb.cyl((x, -0.52, 5.96), 0.045, 0.10, rot=(math.pi / 2, 0, 0), seg=12)
    mb.objet("consoles", M["cedre_sombre"], bevel=0.004)
    mb = MB()
    nt = int((W + 0.9) / 0.15)
    for i in range(nt):
        x = -(W + 0.9) / 2 + 0.075 + i * 0.15
        mb.cyl((x, -0.55, 6.62), 0.066, 1.45, rot=(math.radians(-62), 0, 0), seg=12)
    mb.objet("tuiles_emeraude", M["emeraude"])
    mb = MB(); mb.box((0, 0.35, 6.82), (W + 0.9, 0.55, 0.6)); mb.objet("rive_toit", M["pierre"], bevel=0.01)

    # --- Seuil et marches, lanternes murales
    mb = MB(); mb.box((0, -0.55, -0.12), (3.7, 1.6, 0.30)); mb.box((0, -1.05, -0.25), (4.3, 1.5, 0.30)); mb.box((0, -1.55, -0.38), (4.9, 1.6, 0.30))
    mb.objet("marches", M["pierre"], bevel=0.012)
    mb = MB(); mb.box((0, -9.0, -0.55), (40, 20, 0.30)); mb.objet("sol_avant", M["pierre_sombre"])
    for s in (-1, 1):
        x = s * 3.35
        mb = MB()
        mb.box((x, -0.10, 3.55), (0.05, 0.10, 0.45))                                        # potence
        mb.box((x, -0.22, 3.78), (0.04, 0.22, 0.04))
        mb.cyl((x, -0.33, 3.56), 0.075, 0.30, seg=8, r2=0.095); mb.cyl((x, -0.33, 3.74), 0.105, 0.05, seg=8, r2=0.03); mb.cyl((x, -0.33, 3.37), 0.05, 0.05, seg=8)
        mb.objet(f"lanterne_murale_{s}", M["laiton"], bevel=0.002)
        mb = MB(); mb.cyl((x, -0.33, 3.56), 0.07, 0.27, seg=8, r2=0.088); mb.objet(f"verre_mural_{s}", M["lumiere_vive"])
        pl = bpy.data.lights.new(f"lanterne_{s}", "POINT"); pl.energy = 140; pl.color = (1.0, 0.62, 0.28); pl.shadow_soft_size = 0.1
        po = bpy.data.objects.new(f"lanterne_{s}", pl); bpy.context.collection.objects.link(po); po.location = (x, -0.5, 3.56)

def impostes_et_grille(M):
    """Tympan : grille de cèdre à losanges (claustra) au-dessus des battants, avec lumière chaude de la cour derrière."""
    zb = 2.62
    # fond lumineux (cour éclairée)
    mb = MB(); mb.prisme(arche(-0.02, bas=zb), 0.56, 0.58); mb.objet("fond_tympan", M["lumiere_douce"])
    # cadre de la grille
    mb = MB(); mb.anneau(arche(-0.075, bas=zb), arche(-0.01, bas=zb), 0.18, 0.40); mb.objet("cadre_tympan", M["cedre"], bevel=0.004)
    mb = MB(); mb.box((0, 0.29, zb + 0.04), (2 * (R_ARCHE * math.cos(DELTA)) - 0.02, 0.22, 0.09)); mb.objet("traverse_tympan", M["cedre"], bevel=0.005)
    # claustra : treillis de losanges
    mb = MB(); pas = 0.20; larg = 0.026
    inside = lambda x, z: (z >= zb + 0.09) and ((abs(x) < R_ARCHE * math.cos(DELTA) - 0.05) if z < H_RETOMBEE else (math.hypot(x, z - H_RETOMBEE) < R_ARCHE - 0.08))
    for sens in (1, -1):
        for k in range(-30, 31):
            seg = []
            for s_ in range(0, 141):
                x = -1.1 + 2.2 * s_ / 140
                z = zb + 0.0 + sens * x * 1.0 + k * pas * 1.0 + 1.2
                if inside(x, z):
                    seg.append((x, z))
                else:
                    if len(seg) > 1:
                        _barre(mb, seg, larg, 0.24, 0.32)
                    seg = []
            if len(seg) > 1:
                _barre(mb, seg, larg, 0.24, 0.32)
    mb.objet("claustra", M["cedre_sombre"], bevel=0.0015)
    # petites étoiles de laiton aux nœuds (marqueterie)
    mb = MB()
    for i in range(-4, 5):
        for j in range(0, 12):
            x = i * pas; z = zb + 0.1 + j * pas * 0.5 + (0.1 if i % 2 else 0.0)
            if inside(x, z) and (i + j) % 2 == 0:
                mb.sph((x, 0.22, z), 0.012, sc=(1, 0.6, 1), seg=8)
    mb.objet("clous_claustra", M["laiton"])

def construire_battant(M, cote):
    """Battant de cèdre sculpté : cadre à rinceaux, panneaux étagés, médaillons en pétales, marqueterie de laiton, pentures ornementales, heurtoir à cordon."""
    jx = (R_ARCHE - 0.012) * math.cos(DELTA)
    ZH = 2.60
    s = -cote
    ep = 0.085
    nom = "g" if cote < 0 else "d"
    f = -ep / 2
    mb = MB(); mb.box((s * jx / 2, 0, ZH / 2), (jx, ep, ZH))
    corps = mb.objet(f"battant_{nom}", M["cedre"], loc=(cote * jx, 0.42, 0.0), bevel=0.003)
    mb = MB()
    for k in range(1, 5):
        mb.box((s * jx * k / 5, f - 0.0005, ZH / 2), (0.004, 0.003, ZH - 0.1))
    mb.objet(f"rainures_{nom}", M["cedre_sombre"], parent=corps)
    # cadre : montants larges, traverse médiane haute
    bord = 0.115
    mb = MB()
    mb.box((s * bord / 2, f - 0.014, ZH / 2), (bord, 0.030, ZH))
    mb.box((s * (jx - bord / 2), f - 0.014, ZH / 2), (bord, 0.030, ZH))
    pw = jx - 2 * bord
    for zc, hh in ((0.105, 0.21), (1.35, 0.30), (2.535, 0.13)):
        mb.box((s * jx / 2, f - 0.014, zc), (pw, 0.030, hh))
    mb.objet(f"cadres_{nom}", M["cedre"], parent=corps, bevel=0.004)
    # moulure intérieure (quart-de-rond) autour de chaque champ
    panneaux = ((0.23, 1.20), (1.50, 2.47))
    mb = MB()
    for (z0_, z1_) in panneaux:
        zc = (z0_ + z1_) / 2
        mb.box((s * jx / 2, f - 0.034, z0_), (pw, 0.014, 0.014)); mb.box((s * jx / 2, f - 0.034, z1_), (pw, 0.014, 0.014))
        mb.box((s * bord, f - 0.034, zc), (0.014, 0.014, z1_ - z0_)); mb.box((s * (jx - bord), f - 0.034, zc), (0.014, 0.014, z1_ - z0_))
    mb.objet(f"moulures_{nom}", M["cedre"], parent=corps, bevel=0.004)
    # panneaux étagés (deux tronc de pyramide)
    for (z0_, z1_) in panneaux:
        h = z1_ - z0_
        mb = MB(); mb.frustum((s * jx / 2, f - 0.014, (z0_ + z1_) / 2), pw - 0.03, h - 0.03, pw - 0.10, h - 0.10, 0.016)
        mb.frustum((s * jx / 2, f - 0.030, (z0_ + z1_) / 2), pw - 0.12, h - 0.12, pw - 0.20, h - 0.20, 0.012)
        mb.objet(f"champ_{nom}_{z0_}", M["cedre"], parent=corps, bevel=0.002)
    # gravures : médaillon de pétales, étoiles concentriques, rinceaux, palmettes d'angle
    mb = MB(); mb2 = MB()
    y = f - 0.043
    for (z0_, z1_) in panneaux:
        zc = (z0_ + z1_) / 2; cu = s * jx / 2
        ligne_cercle(mb, (cu, 0, zc), 0.245, 0.010, y + 0.004, y - 0.008, n=72)
        ligne_cercle(mb, (cu, 0, zc), 0.215, 0.006, y + 0.004, y - 0.006, n=72)
        for k in range(16):                                                            # couronne de 16 pétales
            ang = 2 * math.pi * k / 16
            mb.prisme(petale_pts((cu + 0.088 * math.cos(ang), zc + 0.088 * math.sin(ang)), ang, 0.092, 0.050), y + 0.004, y - 0.011)
        ligne_etoile(mb, (cu, 0, zc), 0.150, 0.011, y + 0.004, y - 0.013, pointes=12, creux=0.80, rot=0.0)
        ligne_etoile(mb, (cu, 0, zc), 0.088, 0.009, y + 0.004, y - 0.014, pointes=8, creux=0.58, rot=math.pi / 8)
        mb.sph((cu, y - 0.012, zc), 0.030, sc=(1, 0.55, 1), seg=14)
        ligne_etoile(mb2, (cu, 0, zc), 0.120, 0.0045, y - 0.013, y - 0.019, pointes=12, creux=0.80)
        ligne_cercle(mb2, (cu, 0, zc), 0.262, 0.0045, y - 0.005, y - 0.011, n=72)
        mb2.sph((cu, y - 0.021, zc), 0.0125, sc=(1, 0.55, 1), seg=10)
        # palmettes d'angle
        for (dx, dz, a0) in ((1, 1, 45), (-1, 1, 135), (-1, -1, 225), (1, -1, 315)):
            cx_ = cu + dx * (pw / 2 - 0.12); cz_ = zc + dz * ((z1_ - z0_) / 2 - 0.12)
            palmette(mb, (cx_, cz_), math.radians(a0 + 180), 0.085, y + 0.004, y - 0.010)
        # rinceau horizontal haut et bas du champ
        for zr in (z0_ + 0.062, z1_ - 0.062):
            rinceau(mb, (s * (bord + 0.07), zr), (s * (jx - bord - 0.07), zr), 0.012, 0.115, y + 0.004, y - 0.007, taille_feuille=0.036)
    # rinceaux verticaux sur les montants et traverses
    for ux in (bord / 2, jx - bord / 2):
        rinceau(mb, (s * ux, 0.30), (s * ux, 2.40), 0.017, 0.20, f - 0.0285, f - 0.040, taille_feuille=0.046)
    rinceau(mb, (s * (bord + 0.02), 1.35), (s * (jx - bord - 0.02), 1.35), 0.026, 0.18, f - 0.0285, f - 0.040, taille_feuille=0.05)
    mb.objet(f"gravures_{nom}", M["cedre"], parent=corps, bevel=0.0012)
    mb2.objet(f"incrustations_{nom}", M["laiton"], parent=corps)
    # clous fins sur les traverses
    mb = MB()
    for i in range(7):
        u = jx * (i + 0.5) / 7
        mb.sph((s * u, f - 0.034, 1.35 + 0.115), 0.0105, sc=(1, 0.55, 1), seg=10)
        mb.sph((s * u, f - 0.034, 1.35 - 0.115), 0.0105, sc=(1, 0.55, 1), seg=10)
        mb.sph((s * u, f - 0.034, 0.20), 0.0105, sc=(1, 0.55, 1), seg=10)
    mb.objet(f"clous_{nom}", M["laiton"], parent=corps)
    # pentures ornementales (rosaces de rivets) + noeuds de charnière
    mb = MB()
    for zc in (0.50, 1.35, 2.34):
        penture(mb, s, 0.0, jx * 0.80, zc, f - 0.0295 if zc != 1.35 else f - 0.0295)
        mb.cyl((0.0, 0.0, zc), 0.030, 0.17, seg=18); mb.tor((0.0, 0.0, zc + 0.10), 0.030, 0.007, seg=20); mb.tor((0.0, 0.0, zc - 0.10), 0.030, 0.007, seg=20)
    mb.objet(f"ferrures_{nom}", M["laiton"], parent=corps, bevel=0.0012)
    # heurtoir : platine à seize lobes, cordon torsadé, goutte pendante
    mb = MB(); hx = s * (jx - 0.215); hz = 1.52
    cc = (hx, f - 0.060, hz)
    mb.cyl((hx, f - 0.050, hz), 0.082, 0.014, rot=(math.pi / 2, 0, 0), seg=48)
    for k in range(16):
        a = 2 * math.pi * k / 16
        mb.sph((hx + 0.082 * math.cos(a), f - 0.050, hz + 0.082 * math.sin(a)), 0.014, sc=(1, 0.5, 1), seg=8)
    mb.cyl((hx, f - 0.058, hz), 0.054, 0.012, rot=(math.pi / 2, 0, 0), seg=40)
    mb.cyl((hx, f - 0.066, hz), 0.032, 0.012, rot=(math.pi / 2, 0, 0), seg=32)
    mb.sph((hx, f - 0.078, hz), 0.022, sc=(1, 0.8, 1), seg=14)
    anneau_corde(mb, (hx, f - 0.092, hz - 0.095), 0.092, 0.0105, n=52)
    mb.sph((hx, f - 0.092, hz - 0.190), 0.026, sc=(0.8, 0.8, 1.5), seg=14)
    mb.box((hx, f - 0.070, hz - 0.086), (0.032, 0.020, 0.040))
    mb.objet(f"heurtoir_{nom}", M["laiton"], parent=corps, bevel=0.0010)
    # couvre-joint central sur le battant droit
    if cote > 0:
        mb = MB(); mb.box((-jx + 0.012, f - 0.020, ZH / 2), (0.040, 0.026, ZH)); mb.objet("couvre_joint", M["cedre"], parent=corps, bevel=0.005)
        mb = MB(); mb.box((-jx + 0.012, f - 0.036, ZH / 2), (0.012, 0.005, ZH - 0.1)); mb.objet("couvre_joint_laiton", M["laiton"], parent=corps)
    return corps

def patio(M):
    mb = MB(); mb.box((0, 7.3, -0.08), (9.4, 14.8, 0.16)); mb.objet("sol_patio", M["pierre_sombre"])
    # tapis de zellige au sol (damier large lisible en profondeur)
    mb = MB(); mb.box((0, 5.0, -0.01), (4.2, 9.6, 0.02)); mb.objet("tapis_patio", M["sol_zellige"])
    mb = MB(); mb.box((-4.7, 7.3, 2.6), (0.3, 14.8, 5.4)); mb.box((4.7, 7.3, 2.6), (0.3, 14.8, 5.4)); mb.box((0, 14.7, 2.9), (9.7, 0.3, 6.0))
    mb.objet("murs_patio", M["platre_clair"])
    for ax in (-2.6, 0.0, 2.6):
        mb = MB(); mb.anneau(arche(0.0, bas=0), arche(0.20, bas=0), 14.52, 14.58, ox=ax); mb.objet(f"arc_fond_{ax}", M["pierre"], bevel=0.01)
        mb = MB(); mb.prisme(arche(0.0, bas=0), 14.56, 14.60, ox=ax); mb.objet(f"alcove_{ax}", M["lumiere_chaude"])
    for side in (-1, 1):
        for k in range(3):
            y = 4.5 + k * 3.2
            mb = MB(); mb.anneau(arche(0.0, bas=0), arche(0.17, bas=0), -0.03, 0.03)
            ob = mb.objet(f"arc_lat_{side}_{k}", M["pierre"], loc=(side * 4.52, y, 0), bevel=0.008); ob.rotation_euler = (0, 0, math.pi / 2 * (-side))
            mb2 = MB(); mb2.prisme(arche(0.0, bas=0), -0.05, 0.0)
            ob2 = mb2.objet(f"niche_lat_{side}_{k}", M["lumiere_douce"], loc=(side * 4.55, y, 0)); ob2.rotation_euler = (0, 0, math.pi / 2 * (-side))
    mb = MB(); mb.cyl((0, 6.3, 0.18), 1.35, 0.36, seg=8); mb.cyl((0, 6.3, 0.40), 1.05, 0.14, seg=8); mb.objet("vasque", M["pierre"], bevel=0.01)
    mb = MB(); mb.cyl((0, 6.3, 0.355), 1.02, 0.02, seg=8); mb.objet("eau", M["eau"])
    mb = MB(); mb.cyl((0, 6.3, 0.9), 0.1, 1.0, seg=16); mb.cyl((0, 6.3, 1.45), 0.26, 0.1, seg=16, r2=0.1); mb.objet("jet", M["pierre"])
    for x, y, z in ((-0.55, 1.6, 3.05), (0.55, 1.9, 3.15), (0.0, 3.4, 3.4)):
        mb = MB()
        mb.cyl((x, y, z + 0.36), 0.01, 0.4, seg=6); mb.cyl((x, y, z + 0.13), 0.1, 0.07, seg=8, r2=0.02)
        mb.cyl((x, y, z - 0.10), 0.12, 0.38, seg=8, r2=0.075); mb.cyl((x, y, z - 0.31), 0.06, 0.05, seg=8)
        mb.objet(f"lanterne_{x}_{y}", M["laiton"])
        mb = MB(); mb.cyl((x, y, z - 0.10), 0.105, 0.34, seg=8, r2=0.062); mb.objet(f"verre_{x}_{y}", M["lumiere_vive"])
    for x, y in ((-3.2, 4.2), (3.2, 4.2), (-3.2, 9.0), (3.2, 9.0)):
        mb = MB(); mb.cyl((x, y, 0.33), 0.30, 0.66, seg=16, r2=0.22); mb.objet(f"pot_{x}_{y}", M["emeraude"])
        mb = MB(); mb.cyl((x, y, 1.05), 0.03, 1.0, seg=8); mb.objet(f"tronc_{x}_{y}", M["cedre_sombre"])
        mb = MB()
        for _ in range(26):
            mb.sph((x + random.uniform(-0.5, 0.5), y + random.uniform(-0.5, 0.5), 1.85 + random.uniform(-0.35, 0.45)), random.uniform(0.17, 0.26), sc=(1, 1, 0.7), seg=8)
        mb.objet(f"feuillage_{x}_{y}", M["feuille"])

def ciel_fin_d_apres_midi():
    m, n, l, b = mat_nouveau("ciel_plan")
    for x in list(n):
        if x.name != "Material Output":
            n.remove(x)
    tc = n.new("ShaderNodeTexCoord"); sep = n.new("ShaderNodeSeparateXYZ"); l.new(tc.outputs["Object"], sep.inputs["Vector"])
    rg = n.new("ShaderNodeMapRange"); rg.inputs["From Min"].default_value = 5.0; rg.inputs["From Max"].default_value = 30.0
    l.new(sep.outputs["Z"], rg.inputs["Value"])
    cr = n.new("ShaderNodeValToRGB")
    cr.color_ramp.elements[0].position = 0.0; cr.color_ramp.elements[0].color = (1.0, 0.80, 0.55, 1)
    e = cr.color_ramp.elements.new(0.30); e.color = (0.95, 0.74, 0.55, 1)
    e2 = cr.color_ramp.elements.new(0.62); e2.color = (0.62, 0.70, 0.80, 1)
    cr.color_ramp.elements[-1].position = 1.0; cr.color_ramp.elements[-1].color = (0.36, 0.52, 0.76, 1)
    l.new(rg.outputs["Result"], cr.inputs["Fac"])
    nu = n.new("ShaderNodeTexNoise"); nu.inputs["Scale"].default_value = 3.0; nu.inputs["Detail"].default_value = 6; nu.inputs["Distortion"].default_value = 0.6
    mpn = n.new("ShaderNodeMapping"); mpn.inputs["Scale"].default_value = (0.05, 0.05, 0.16)
    l.new(tc.outputs["Object"], mpn.inputs["Vector"]); l.new(mpn.outputs["Vector"], nu.inputs["Vector"])
    nr = n.new("ShaderNodeMapRange"); nr.inputs["From Min"].default_value = 0.52; nr.inputs["From Max"].default_value = 0.72
    l.new(nu.outputs["Fac"], nr.inputs["Value"])
    mxc = n.new("ShaderNodeMix"); mxc.data_type = "RGBA"; mxc.inputs[7].default_value = (1.0, 0.86, 0.70, 1)
    l.new(nr.outputs["Result"], mxc.inputs[0]); l.new(cr.outputs["Color"], mxc.inputs[6])
    em = n.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 0.85
    l.new(mxc.outputs[2], em.inputs["Color"])
    l.new(em.outputs["Emission"], n["Material Output"].inputs["Surface"])
    mb = MB(); mb.box((0, 40, 16), (180, 0.5, 70)); mb.objet("ciel_plan", m)

def lumieres(ouverture):
    ciel_fin_d_apres_midi()
    def aire(nom, loc, cible, taille, puissance, couleur, forme="RECTANGLE"):
        d = bpy.data.lights.new(nom, "AREA"); d.shape = forme; d.size = taille; d.size_y = taille * 0.6
        d.energy = puissance; d.color = couleur
        ob = bpy.data.objects.new(nom, d); bpy.context.collection.objects.link(ob)
        ob.location = loc; ob.rotation_euler = (Vector(cible) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    # soleil bas de fin d'après-midi : ombres allongées qui creusent chaque relief
    sol = bpy.data.lights.new("soleil", "SUN"); sol.energy = 6.4; sol.angle = math.radians(1.8); sol.color = (1.0, 0.74, 0.48)
    so = bpy.data.objects.new("soleil", sol); bpy.context.collection.objects.link(so); so.rotation_euler = (math.radians(73), 0, math.radians(-50))
    aire("ciel_doux", (3.0, -9.0, 9.0), (0, 0, 3.4), 9.0, 300, (0.80, 0.86, 1.0))
    aire("remplissage", (6.5, -9.0, 2.0), (0, 0, 2.6), 6.0, 120, (1.0, 0.82, 0.62))
    aire("contour", (0.0, 5.0, 12.0), (0, -0.4, 6.0), 6.0, 700, (1.0, 0.78, 0.5))
    p = bpy.data.lights.new("patio", "POINT"); p.energy = 3500 + 8000 * (ouverture / 100.0) ** 2; p.color = (1.0, 0.56, 0.22); p.shadow_soft_size = 0.7
    po = bpy.data.objects.new("patio", p); bpy.context.collection.objects.link(po); po.location = (0, 3.6, 3.2)
    p2 = bpy.data.lights.new("patio2", "POINT"); p2.energy = 2200; p2.color = (1.0, 0.7, 0.4); p2.shadow_soft_size = 1.2
    po2 = bpy.data.objects.new("patio2", p2); bpy.context.collection.objects.link(po2); po2.location = (0, 9.5, 3.8)
    w = bpy.data.worlds.new("ciel"); bpy.context.scene.world = w; w.use_nodes = True
    n = w.node_tree.nodes; l = w.node_tree.links
    bg = n["Background"]; bg.inputs["Color"].default_value = (0.95, 0.78, 0.58, 1); bg.inputs["Strength"].default_value = 0.12

VUES = {
    "frontal":      ((0.0, -10.4, 3.20), (0.0, 0.0, 3.15), 64, 0.0),
    "trois-quarts": ((4.6, -7.2, 2.3), (-0.15, 0.0, 2.9), 46, 0.0),
    "detail":       ((0.55, -2.4, 1.55), (0.0, 0.3, 1.50), 56, 0.0),
    "arche":        ((0.0, -5.2, 3.9), (0.0, 0.0, 3.9), 50, 0.0),
}

def camera(nom_vue):
    pos, cible, focale, shift = VUES[nom_vue]
    cam_d = bpy.data.cameras.new("cam"); cam_d.lens = focale; cam_d.sensor_width = 24; cam_d.sensor_fit = "HORIZONTAL"; cam_d.shift_y = shift
    cam_d.dof.use_dof = True; cam_d.dof.focus_distance = (Vector(cible) - Vector(pos)).length; cam_d.dof.aperture_fstop = 11 if nom_vue != "detail" else 3.5
    cam = bpy.data.objects.new("camera", cam_d); bpy.context.collection.objects.link(cam)
    cam.location = pos; cam.rotation_euler = (Vector(cible) - Vector(pos)).to_track_quat("-Z", "Y").to_euler()
    bpy.context.scene.camera = cam

def reglages(qualite):
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"; sc.cycles.device = "CPU"
    haute = qualite == "haute"
    sc.render.resolution_x, sc.render.resolution_y = (810, 1440) if haute else (576, 1024)
    sc.render.resolution_percentage = 100
    sc.cycles.samples = 96 if haute else 40
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
    sc.render.image_settings.file_format = "PNG"; sc.render.image_settings.color_depth = "8"

def construire(ouverture):
    vider()
    M = {
        "platre": mat_platre("platre", (0.78, 0.66, 0.50), 0.66, 0.42, 26),
        "platre_clair": mat_platre("platre_clair", (0.80, 0.69, 0.53), 0.70, 0.30, 26),
        "tadelakt": mat_platre("tadelakt", (0.47, 0.30, 0.16), 0.30, 0.22, 9),
        "pierre": mat_platre("pierre", (0.58, 0.51, 0.40), 0.82, 0.5, 30),
        "pierre_sombre": mat_platre("pierre_sombre", (0.20, 0.16, 0.12), 0.16, 0.18, 12),
        "cedre": mat_cedre("cedre"), "cedre_sombre": mat_cedre("cedre_sombre", True),
        "laiton": mat_laiton(),
        "emeraude": mat_emeraude(), "eau": mat_eau(), "feuille": mat_feuille(),
        "lumiere_chaude": mat_lumiere("alcove", (1.0, 0.62, 0.26), 5.5),
        "lumiere_douce": mat_lumiere("niche", (1.0, 0.66, 0.32), 2.4),
        "lumiere_vive": mat_lumiere("verre", (1.0, 0.6, 0.2), 14.0),
        "sol_zellige": mat_ceramique("sol_zellige", (0.46, 0.34, 0.20), 0.18, 0.4),
    }
    Zmat = {"ivoire": mat_ceramique("z_ivoire", (0.72, 0.66, 0.52)), "ocre": mat_ceramique("z_ocre", (0.55, 0.36, 0.14)),
            "emeraude": mat_ceramique("z_emeraude", (0.012, 0.19, 0.105)), "cobalt": mat_ceramique("z_cobalt", (0.018, 0.058, 0.30)),
            "noir": mat_ceramique("z_noir", (0.045, 0.030, 0.022), 0.14)}
    Z = {k: MB() for k in Zmat}
    facade(M, Z)
    for k, mb in Z.items():
        mb.objet(f"zellige_{k}", Zmat[k], bevel=0.0012)
    patio(M)
    impostes_et_grille(M)
    g = construire_battant(M, -1); d = construire_battant(M, +1)
    a = math.radians(95.0 * ouverture / 100.0)
    g.rotation_euler = (0, 0, +a); d.rotation_euler = (0, 0, -a)
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
        print("blend enregistré"); return
    vue = arg("--vue", "frontal")
    vues = [v for v in VUES] if vue == "toutes" else [vue]
    for v in vues:
        for ob in [o for o in bpy.data.objects if o.type == "CAMERA"]:
            bpy.data.objects.remove(ob, do_unlink=True)
        camera(v)
        suffixe = f"_o{int(ouverture):03d}" if ouverture else ""
        bpy.context.scene.render.filepath = os.path.join(SORTIE, f"riad-royal_{v}{suffixe}_{qualite}.png")
        bpy.ops.render.render(write_still=True)
        print("rendu :", bpy.context.scene.render.filepath)

main()
