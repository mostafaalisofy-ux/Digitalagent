#!/usr/bin/env python3
"""Build the footage plate for "The Ratio" (ROAS services film): 1080x1920, 60 fps, graded to the brand.
All clips are Pexels (free licence, commercial use allowed); see film/roas/README.md for the list.
Also tracks the phone screen in the checkout shot (translation by phase correlation) for the animated UI.
Usage (repo root): python3 film/roas/plate.py"""
import json, os, subprocess, sys
import numpy as np
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
ST = os.path.join(ROOT, 'handover/launch-film/roas/stock'); OUT = os.path.join(ROOT, 'handover/launch-film/roas')
FPS, W, H = 60, 1080, 1920
# (start in film, end in film, clip, in-point, horizontal crop centre 0..1, vertical shift px, zoom)
SEG = [
    (0.0, 6.0, 'R_34505476', 2.0, 0.5, 120, 1.0),    # Riyadh: Kingdom Centre at dusk
    (6.0, 10.0, 'C_27433325', 3.0, 0.5, 0, 1.0),     # Cairo: the Nile at sunset
    (10.0, 14.0, 'D_31257755', 1.0, 0.5, 60, 1.0),   # Dubai: Burj Khalifa by day
    (14.0, 18.0, 'R_34505477', 6.0, 0.5, 120, 1.0),  # Riyadh: Kingdom Centre lights
    (18.0, 21.5, 'E_6898096', 0.5, 0.5, 0, 1.0),     # checkout on a phone (screen tracked)
    (21.5, 23.0, 'E_6214218', 2.5, 0.5, 0, 1.0),     # cart and boxes
    (23.0, 24.5, 'E_7362808', 1.0, 0.5, 0, 1.0),     # the parcel arrives
    (24.5, 28.5, 'C_20284256', 24.0, 0.5, 0, 1.0),   # Giza: pyramids, dusk time-lapse
    (28.5, 32.5, 'D_37337798', 5.0, 0.5, 0, 1.0),    # Dubai: Burj Khalifa at night
    (32.5, 39.0, 'R_18511357', 4.0, 0.5, 0, 1.0),    # Riyadh: skyline (lockup, dimmed)
]
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
plate = os.path.join(OUT, 'Ratio_plate.mp4')
r = subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', graph, '-map', '[v]', '-r', str(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '12', '-pix_fmt', 'yuv420p', plate])
if r.returncode: sys.exit('plate failed')
print('wrote', plate)

# ---- phone-screen track: the screen's two top corners (the thumb never covers them), smoothed ----
import math
a, b = 18.0, 21.5
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
json.dump({'t0': a, 'fps': FPS, 'corners': [[350, 875], [542, 796], [690, 1140], [500, 1230]], 'track': d.round(2).tolist()}, open(os.path.join(OUT, 'phone_track.json'), 'w'))
print('track frames', len(d), 'range', d.min(0), d.max(0))
