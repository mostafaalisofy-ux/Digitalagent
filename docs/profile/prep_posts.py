#!/usr/bin/env python3
"""Cut single posts out of the CP collage pages, at their native size, so the profile can show them small and sharp
instead of enlarging a whole collage. XY-cut on the gaps between posts. Also pulls high-resolution frames from client
footage (Altopiano 4K reels) and hands-only stock frames used in the films. Output: handover/profile/assets/
Usage (repo root): python3 docs/profile/prep_posts.py"""
import os, subprocess
import numpy as np
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
SRC = os.path.join(ROOT, 'handover/profile/src/st'); OUT = os.path.join(ROOT, 'handover/profile/assets'); HF = os.path.join(ROOT, 'handover/launch-film')

def runs(profile, thr, minlen):
    on = profile > thr; out = []; i = 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and on[j]: j += 1
            if j - i >= minlen: out.append((i, j))
            i = j
        else: i += 1
    return out

def posts(n):
    im = Image.open(os.path.join(SRC, f's-{n:03d}.jpg')).convert('RGB'); a = np.asarray(im).astype(int); H, W = a.shape[:2]
    bg = np.median(a[int(H * .9):, int(W * .02):int(W * .15)].reshape(-1, 3), axis=0)
    m = np.abs(a - bg).sum(2) > 70
    m[:int(H * .14), :] = False; m[:, :int(W * .06)] = False; m[:, int(W * .94):] = False   # page chrome, old logo, client mark
    boxes = []
    for x0, x1 in runs(m.mean(0), .12, 60):
        for y0, y1 in runs(m[:, x0:x1].mean(1), .5, 60):
            sub = m[y0:y1, x0:x1]; c = runs(sub.mean(0), .5, 60)        # refine edges inside the cell
            if c: x0b, x1b = x0 + c[0][0], x0 + c[-1][1]
            else: x0b, x1b = x0, x1
            boxes.append((x0b, y0, x1b, y1))
    return im, boxes

def save(im, name, q=92): im.convert('RGB').save(os.path.join(OUT, name + '.jpg'), quality=q)

PAGES = {'poco': 20, 'xiaomi1': 21, 'xiaomi2': 22, 'havenue': 31, 'alto1': 32, 'alto2': 33, 'jora1': 34, 'jora2': 35}
for key, n in PAGES.items():
    im, boxes = posts(n)
    if key == 'poco':      # the white-sky post loses its top edge to the page colour: use its neighbours' rows
        y0, y1 = boxes[0][1], boxes[0][3]; boxes = [(b[0], y0, b[2], y1) for b in boxes]
    if key == 'xiaomi1':   # the Redmi 14C post splits in two on its white middle: merge
        boxes = [boxes[0], (boxes[1][0], boxes[0][1], boxes[2][2], boxes[0][3]), boxes[3]]
    for i, b in enumerate(boxes):
        save(im.crop(b), f'post_{key}_{i}')
    print(key, len(boxes), [(b[2] - b[0], b[3] - b[1]) for b in boxes])

def frame(src, t, name, vf=None):
    cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', src, '-frames:v', '1', '-q:v', '2']
    if vf: cmd += ['-vf', vf]
    subprocess.run(cmd + [os.path.join(OUT, name + '.jpg')], check=True)

# Altopiano 4K reels: food and place only, no guests' faces (times picked by eye)
for name, src, t in [('alto4k_a', 'alto_reel1.mp4', 2.0), ('alto4k_b', 'alto_reel1.mp4', 9.0), ('alto4k_c', 'alto_reel4.mp4', 3.0), ('alto4k_d', 'alto_reel4.mp4', 11.0)]:
    frame(os.path.join(HF, 'clientreel/src', src), t, name, 'scale=1200:-2')

# hands-only stock already used in the films (Pexels, free licence): journey steps and case studies
STOCK = {'brief': 'journey/stock/P_6324539', 'prep': 'roas/stock5/E_8937985', 'idea': 'journey/stock/P_8035618', 'production': 'journey/stock/P_35313946',
         'content': 'journey/stock/P_35888104', 'media': 'roas/stock5/E_6898096', 'seo': 'journey/stock/P_39425751', 'reporting': 'money/stock/P_6782252',
         'cs_cart': 'roas/stock/E_6214218', 'cs_parcel': 'roas/stock/E_7362808', 'cs_calc': 'money/stock/P_6927320', 'cs_pay': 'roas/stock/E_6214214',
         'cs_city': 'roas/stock/R_18511357', 'cs_unbox': 'roas/stock5/E_9862359', 'cs_shop': 'roas/stock/E_7568746', 'cs_dubai': 'roas/stock/D_17452857',
         'ks_bed': 'receipt/stock_ar/F_6801514', 'ks_cushion': 'receipt/stock_ar/F_36507355', 'ks_lamp': 'receipt/stock_ar/F_6632888', 'ks_plant': 'receipt/stock_ar/F_6343803'}
for name, rel in STOCK.items():
    p = None
    for d in ('', ):
        cand = os.path.join(HF, rel + '.mp4')
        if os.path.exists(cand): p = cand
    if not p:   # folder names differ between films; find the clip by id
        cid = os.path.basename(rel) + '.mp4'
        for r, _, fs in os.walk(HF):
            if cid in fs: p = os.path.join(r, cid); break
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)
    frame(p, dur / 2, 'stk_' + name, 'scale=1100:-2')
print('frames done')
