"""Assemble la vidéo : images 3D + fondu enchaîné vers la carte HTML (même cadrage 9:16) + plan tenu.
Usage : python3 composer_video.py dossier_images_3d fps sortie.mp4"""
import sys, os, glob, shutil, subprocess
from PIL import Image
src, fps, sortie = sys.argv[1], int(sys.argv[2]), sys.argv[3]
T_FIN = 7.4
frames = sorted(glob.glob(os.path.join(src, "f*.png")))
n_fin = int(round(T_FIN * fps))
tmp = os.path.join(src, "_montage"); shutil.rmtree(tmp, ignore_errors=True); os.makedirs(tmp)
html = os.path.join(tmp, "_html"); subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), "carte-html", "rendre.py"), html], check=True)
H = [Image.open(f"{html}/html_{i}.png").convert("RGB") for i in range(7)]
size = Image.open(frames[0]).size
H = [h.resize(size, Image.LANCZOS) for h in H]
k = 0
def sauve(im):
    global k; im.save(os.path.join(tmp, f"m{k:04d}.png")); k += 1
for f in frames[:n_fin]:
    sauve(Image.open(f).convert("RGB"))
base = Image.open(frames[min(n_fin, len(frames) - 1)]).convert("RGB")
nb_fondu = max(6, int(0.75 * fps))
for j in range(nb_fondu):
    u = (j + 1) / nb_fondu; e = u * u * (3 - 2 * u)
    h = H[min(6, int(round(e * 6)))]
    fond = min(1.0, e * 1.6)                           # le papier se raccorde d'abord, le texte arrive ensuite
    sauve(Image.blend(base, h, fond))
for _ in range(int(0.9 * fps)):
    sauve(H[6])
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(fps), "-i", os.path.join(tmp, "m%04d.png"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", sortie], check=True)
print("video", sortie, k, "images")
