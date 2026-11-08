"""Rend la carte HTML en images (7 états d'apparition du texte) : python3 rendre.py dossier_sortie"""
import sys, os
from playwright.sync_api import sync_playwright
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
here = os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 360, "height": 640})
    for i, v in enumerate([0, .15, .35, .55, .75, .9, 1]):
        pg.goto(f"file://{here}/carte.html?p={v}"); pg.wait_for_timeout(300)
        pg.screenshot(path=f"{out}/html_{i}.png")
    b.close()
