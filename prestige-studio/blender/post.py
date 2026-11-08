"""Étalonnage léger des rendus : halo des hautes lumières, vignette douce, chaleur, grain fin (Pillow + numpy)."""
import sys, numpy as np
from PIL import Image, ImageFilter
def etalonner(src, dst):
    im = Image.open(src).convert("RGB"); a = np.asarray(im).astype(np.float32) / 255.0
    lum = a.mean(axis=2, keepdims=True)
    seuil = np.clip((lum - 0.72) / 0.28, 0, 1)
    halo = Image.fromarray((a * seuil * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(max(6, im.width // 60)))
    a = 1 - (1 - a) * (1 - 0.42 * np.asarray(halo).astype(np.float32) / 255.0)
    h, w = a.shape[:2]; yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h * 0.46) / (h / 2)) ** 2)
    a *= (1 - 0.30 * np.clip(r - 0.35, 0, 1) ** 1.6)[..., None]
    a[..., 0] *= 1.025; a[..., 2] *= 0.965
    a = (a - 0.5) * 1.05 + 0.5
    rng = np.random.default_rng(3); a += rng.normal(0, 0.006, a.shape)
    Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).save(dst)
if __name__ == "__main__":
    etalonner(sys.argv[1], sys.argv[2])
