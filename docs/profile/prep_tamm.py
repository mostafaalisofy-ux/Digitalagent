#!/usr/bin/env python3
"""Cut Tamm poses out of the owner's character sheet (handover/launch-film/intro/src/tamm_sheet.webp) for the company profile.
The sheet background is flood-filled from the crop border (dark pixels only), so the dark visor, enclosed by the white helmet, stays.
Output: handover/profile/assets/tamm_<pose>.png (RGBA). Usage (repo root): python3 docs/profile/prep_tamm.py"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
SRC = os.path.join(ROOT, 'handover/launch-film/intro/src/tamm_sheet.webp')
OUT = os.path.join(ROOT, 'handover/profile/assets')
# (x0, y0, x1, y1) on the 1536×1024 sheet; poses only, labels and neighbours left out
POSES = {'hero': (18, 112, 440, 820), 'welcome': (448, 588, 612, 772), 'idea': (640, 584, 790, 772),
         'thinking': (800, 584, 930, 772), 'explaining': (940, 584, 1105, 772), 'gotit': (1120, 584, 1270, 772),
         'letsgo': (1280, 576, 1490, 772)}
SCALE = {'hero': 2, 'welcome': 3, 'idea': 3, 'thinking': 3, 'explaining': 3, 'gotit': 3, 'letsgo': 3}

sheet = Image.open(SRC).convert('RGB')
for name, box in POSES.items():
    im = sheet.crop(box)
    a = np.asarray(im).astype(int)
    lum = (a[..., 0] * 299 + a[..., 1] * 587 + a[..., 2] * 114) // 1000
    dark = Image.fromarray(np.where(lum < 62, 255, 0).astype('uint8')).copy()   # candidate background
    w, h = dark.size
    for x in range(0, w, 3):                                             # seed the fill all round the border
        for y in (0, h - 1):
            if dark.getpixel((x, y)) == 255: ImageDraw.floodfill(dark, (x, y), 128)
    for y in range(0, h, 3):
        for x in (0, w - 1):
            if dark.getpixel((x, y)) == 255: ImageDraw.floodfill(dark, (x, y), 128)
    bg = np.asarray(dark) == 128
    mask = Image.fromarray(np.where(bg, 0, 255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    s = SCALE[name]
    im = im.resize((w * s, h * s), Image.LANCZOS); mask = mask.resize((w * s, h * s), Image.LANCZOS)
    im.putalpha(mask)
    bb = im.getbbox(); im = im.crop(bb)
    im.save(os.path.join(OUT, f'tamm_{name}.png'), optimize=True)
    print(name, im.size)

# hero: fade out the floor glow under the feet
h = Image.open(os.path.join(OUT, 'tamm_hero.png')); a = np.asarray(h).copy(); H = a.shape[0]; f0 = int(H * .9)
a[f0:, :, 3] = (a[f0:, :, 3] * np.linspace(1, 0, H - f0)[:, None]).astype('uint8')
Image.fromarray(a).save(os.path.join(OUT, 'tamm_hero.png'), optimize=True)

# framed shots: the cap still, and the welcome gesture from the vertical clip
Image.open(os.path.join(ROOT, 'handover/launch-film/intro/src/tamm_cap.webp')).convert('RGB').save(os.path.join(OUT, 'tamm_capcard.jpg'), quality=90)
os.system(f'ffmpeg -v error -y -ss 9.6 -i "{ROOT}/handover/launch-film/intro/src/tamm_vertical.mp4" -frames:v 1 -q:v 2 "{OUT}/tamm_welcomecard.jpg"')
