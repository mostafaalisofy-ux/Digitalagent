#!/usr/bin/env python3
"""Profile v2 assets: crop the work collages out of the agency CP pages (dropping the page chrome and the old agency logo),
and resize the single work images from the earlier SayTamm profile. Output: handover/profile/assets/*.jpg
Sources (owner-supplied, all rights confirmed 2026-11-25): handover/profile/src/st/s-NNN.jpg (CP pages), src/sp/p-NNN.jpg.
Usage (repo root): python3 docs/profile/prep_assets.py"""
import os, glob
import numpy as np
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); SRC = os.path.join(ROOT, 'handover/profile/src'); OUT = os.path.join(ROOT, 'handover/profile/assets')
os.makedirs(OUT, exist_ok=True)
def save(im, name, maxw=1400, q=80):
    im = im.convert('RGB'); im.thumbnail((maxw, maxw)); im.save(os.path.join(OUT, name + '.jpg'), quality=q, optimize=True)
def collage(n):
    im = Image.open(os.path.join(SRC, 'st', f's-{n:03d}.jpg')).convert('RGB'); a = np.asarray(im).astype(int); H, W = a.shape[:2]
    bg = np.median(a[int(H * .9):, int(W * .02):int(W * .15)].reshape(-1, 3), axis=0)
    m = (np.abs(a - bg).sum(2) > 95)
    m[:int(H * .15), :] = False; m[:, :int(W * .06)] = False; m[:, int(W * .94):] = False   # page chrome, old logo, client mark
    rows = np.where(m.mean(1) > .14)[0]; cols = np.where(m.mean(0) > .14)[0]
    y0, y1, x0, x1 = rows.min(), rows.max(), cols.min(), cols.max()
    return im.crop((x0, y0, x1 + 1, y1 + 1))
CP = {'bitumat': 16, 'dcblock': 18, 'siefco': 19, 'poco': 20, 'xiaomi1': 21, 'xiaomi2': 22, 'sasec': 24, 'cleanbasket_social': 25, 'fatora': 26,
      'tecspro': 27, 'siyaq': 28, 'electra1': 29, 'electra2': 30, 'chinese': 31, 'altopiano1': 32, 'altopiano2': 33, 'jora1': 34, 'jora2': 35,
      'yap': 36, 'marriott': 37, 'sedra': 38, 'music': 40, 'somavie': 41, 'yellow': 42, 'metro': 44, 'delpanto': 45, 'urban': 47, 'alia': 48,
      'purchazy': 49, 'flowers': 50, 'sport': 51, 'jora_brand': 52, 'gig': 15}
for k, n in CP.items():
    try: save(collage(n), 'cp_' + k)
    except Exception as e: print('skip', k, e)
for f in sorted(glob.glob(os.path.join(SRC, 'sp', '*.jpg'))):
    save(Image.open(f), 'sp_' + os.path.basename(f)[2:5], 1000, 82)
print(len(os.listdir(OUT)), 'assets')
