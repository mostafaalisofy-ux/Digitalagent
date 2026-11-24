#!/usr/bin/env python3
"""Build the footage plate for "The Ratio" v2 (richer: 18 shots + video textures) (ROAS services film): 1080x1920, 60 fps, graded to the brand.
All clips are Pexels (free licence, commercial use allowed); see film/roas/README.md for the list.
Also tracks the phone screen in the checkout shot (translation by phase correlation) for the animated UI.
Usage (repo root): python3 film/roas/plate2.py"""
import json, os, subprocess, sys
import numpy as np
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
ST = os.path.join(ROOT, 'handover/launch-film/roas/stock'); OUT = os.path.join(ROOT, 'handover/launch-film/roas')
FPS, W, H = 60, 1080, 1920
# (start in film, end in film, clip, in-point, horizontal crop centre 0..1, vertical shift px, zoom)
SEG = [
    # cold open: four cities/moments in two seconds
    (0.0, 0.5, 'R_31114786', 3.0, 0.5, 0, 1.0),      # Riyadh: highway and skyline
    (0.5, 1.0, 'C_10719817', 40.0, 0.45, 0, 1.0),    # Cairo: pyramids from the air
    (1.0, 1.5, 'D_33739603', 4.0, 0.5, 0, 1.0),      # Dubai: from above
    (1.5, 2.0, 'E_7568746', 3.0, 0.5, 0, 1.0),       # online: a thumb on a store
    (2.0, 8.0, 'R_34505476', 1.0, 0.5, 120, 1.0),    # Riyadh: Kingdom Centre at dusk (hook + formula)
    (8.0, 10.2, 'C_27433325', 3.0, 0.5, 0, 1.0),     # Cairo: the Nile at sunset
    (10.2, 12.5, 'C_4174555', 6.0, 0.55, 0, 1.0),    # Cairo: over the old city
    (12.5, 14.6, 'D_31257755', 1.0, 0.5, 60, 1.0),   # Dubai: Burj Khalifa by day
    (14.6, 17.0, 'C_25797443', 0.5, 0.5, 0, 1.0),    # Giza: pyramid and camel
    (17.0, 19.0, 'R_34505477', 6.0, 0.5, 120, 1.0),  # Riyadh: Kingdom Centre lights
    (19.0, 21.5, 'R_31114786', 6.0, 0.5, 0, 1.0),    # Riyadh: traffic toward the skyline
    (21.5, 25.0, 'E_6898096', 0.5, 0.5, 0, 1.0),     # checkout on a phone (screen tracked)
    (25.0, 26.2, 'E_6214217', 0.3, 0.5, 0, 1.0),     # PAY
    (26.2, 27.4, 'E_6214218', 2.5, 0.5, 0, 1.0),     # cart and boxes
    (27.4, 28.5, 'E_7362808', 1.0, 0.5, 0, 1.0),     # the parcel arrives
    (28.5, 30.5, 'C_20284256', 24.0, 0.5, 0, 1.0),   # Giza: dusk time-lapse
    (30.5, 32.5, 'D_33739603', 9.0, 0.5, 0, 1.0),    # Dubai: from above
    (32.5, 42.5, 'R_18511357', 2.0, 0.5, 0, 1.0),    # Riyadh skyline (under the triptych and the lockup)
]
# video textures drawn inside the animation (type fills, reels, cards, triptych): name -> (clip, in, dur, w, h, crop centre)
SEQ = {
    'roasfill': ('D_36470958', 3.0, 3.2, 540, 960, 0.5),
    'reel1': ('R_34505477', 2.0, 4.8, 270, 480, 0.5), 'reel2': ('E_6214218', 0.5, 4.8, 270, 480, 0.5), 'reel3': ('D_36470958', 7.0, 4.8, 270, 480, 0.5),
    'card1': ('C_10719817', 30.0, 4.8, 270, 480, 0.4), 'card2': ('E_6214214', 1.0, 4.8, 270, 480, 0.5), 'card3': ('D_31257755', 3.0, 4.8, 270, 480, 0.5), 'card4': ('C_4174555', 12.0, 4.8, 270, 480, 0.5),
    'tri1': ('R_34505476', 6.0, 2.2, 540, 960, 0.5), 'tri2': ('C_27433325', 12.0, 2.2, 540, 960, 0.5), 'tri3': ('D_36470958', 10.0, 2.2, 540, 960, 0.5),
    'retfill': ('C_10719817', 70.0, 2.6, 540, 960, 0.5),
}
def probe(p):
    o = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout.strip().split(',')
    return int(o[0]), int(o[1])
inputs, chains = [], []
for k, (a, b, clip, tin, cx, dy, z) in enumerate(SEG):
    p = os.path.join(ST, clip + '.mp4'); w, h = probe(p); d = b - a
    inputs += ['-ss', f'{tin:.3f}', '-t', f'{d + 0.2:.3f}', '-i', p]
    # fill 1080x1920 (cover), then crop around the chosen centre
    s = max(W / w, H / h) * z; sw, sh = int(round(w * s / 2) * 2), int(round(h * s / 2) * 2)
    x = int(min(max(0, cx * sw - W / 2), sw - W)); y = int(min(max(0, (sh - H) / 2 - dy), sh - H))
    chains.append(f'[{k}:v]fps={FPS},scale={sw}:{sh}:flags=lanczos,crop={W}:{H}:{x}:{y},setsar=1,trim=duration={d:.4f},setpts=PTS-STARTPTS,'
                  # brand grade: a touch of contrast, calmer saturation, violet-leaning shadows, warm-neutral highlights
                  f'eq=contrast=1.06:saturation=0.9:gamma=0.97,colorbalance=rs=-0.03:gs=-0.02:bs=0.05:rh=0.02:bh=-0.02,format=yuv420p[s{k}]')
graph = ';'.join(chains) + ';' + ''.join(f'[s{k}]' for k in range(len(SEG))) + f'concat=n={len(SEG)}:v=1:a=0[v]'
plate = os.path.join(OUT, 'Ratio2_plate.mp4')
r = subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', graph, '-map', '[v]', '-r', str(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '12', '-pix_fmt', 'yuv420p', plate])
if r.returncode: sys.exit('plate failed')
print('wrote', plate)

# ---- phone-screen track: the screen's two top corners (the thumb never covers them), smoothed ----
import math
a, b = 21.5, 25.0
raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{a:.3f}', '-t', f'{b - a:.3f}', '-i', plate, '-vf', 'format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W)
ang = math.radians(-22); pts = []
for f in fr:
    m = f[760:1080, 300:720] > 232; ys, xs = np.nonzero(m); ys = ys + 760; xs = xs + 300
    u = xs * math.cos(ang) + ys * math.sin(ang); v = -xs * math.sin(ang) + ys * math.cos(ang)
    i, j = np.argmin(u + v * 0.2), np.argmax(u - v * 0.2)
    pts.append([(xs[i] + xs[j]) / 2, (ys[i] + ys[j]) / 2, math.atan2(ys[j] - ys[i], xs[j] - xs[i])])
pts = np.array(pts); k = 9; pad = np.pad(pts, ((k, k), (0, 0)), mode='edge')
sm = np.array([pad[i:i + 2 * k + 1].mean(0) for i in range(len(pts))]); d = sm - sm[0]   # [dx, dy, d-angle]
# reference corners of the screen at the first frame of the shot (read by hand from the source frame)
json.dump({'t0': a, 'fps': FPS, 'corners': [[350, 875], [542, 796], [690, 1140], [500, 1230]], 'track': d.round(2).tolist()}, open(os.path.join(OUT, 'phone_track2.json'), 'w'))
print('track frames', len(d), 'range', d.min(0), d.max(0))

# ---- video textures for the animation layer: JPEG sequences at 30 fps ----
SQ = os.path.join(OUT, 'seq'); os.makedirs(SQ, exist_ok=True)
for name, (clip, tin, d, w, h, cx) in SEQ.items():
    p = os.path.join(ST, clip + '.mp4'); sw0, sh0 = probe(p); s = max(w / sw0, h / sh0); sw, sh = int(round(sw0 * s / 2) * 2), int(round(sh0 * s / 2) * 2)
    x = int(min(max(0, cx * sw - w / 2), sw - w)); y = int((sh - h) / 2)
    od = os.path.join(SQ, name); os.makedirs(od, exist_ok=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', f'{tin:.3f}', '-t', f'{d:.3f}', '-i', p, '-vf', f'fps=30,scale={sw}:{sh}:flags=lanczos,crop={w}:{h}:{x}:{y},eq=contrast=1.06:saturation=0.9,colorbalance=rs=-0.03:bs=0.05', '-q:v', '3', os.path.join(od, '%04d.jpg')], check=True)
    print('seq', name, len(os.listdir(od)))
