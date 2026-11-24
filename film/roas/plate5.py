#!/usr/bin/env python3
"""Build the footage plate for "The Ratio" v5 (Arabic, for store owners; natively fast: clips play 1.35x before the lockup). Based on v2 (richer: 18 shots + video textures) (ROAS services film): 1080x1920, 60 fps, graded to the brand.
All clips are Pexels (free licence, commercial use allowed); see film/roas/README.md for the list.
Also tracks the phone screen in the checkout shot (translation by phase correlation) for the animated UI.
Usage (repo root): python3 film/roas/plate5.py"""
import json, os, subprocess, sys
import numpy as np
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
ST = os.path.join(ROOT, 'handover/launch-film/roas/stock'); ST5 = os.path.join(ROOT, 'handover/launch-film/roas/stock5'); OUT = os.path.join(ROOT, 'handover/launch-film/roas')
FPS, W, H = 60, 1080, 1920
# (start in film, end in film, clip, in-point, horizontal crop centre 0..1, vertical shift px, zoom)
SEG = [   # times on the v2 choreography clock; the plate is laid out on the output clock W(t)
    # cold open: each label sits only on a shot whose city is confirmed on Pexels
    (0.0, 0.5, 'R_18511357', 8.0, 0.5, 0, 1.0),      # Riyadh skyline (Pexels: "Riyadh Skyline")
    (0.5, 1.0, 'C_4174555', 1.0, 0.5, 0, 1.0),       # Cairo from the Citadel
    (1.0, 1.5, 'D_33739603', 4.0, 0.5, 0, 1.0),      # Dubai skyline from the air
    (1.5, 2.0, 'E_7568746', 3.0, 0.5, 0, 1.0),       # online: a finger on a store
    (2.0, 8.0, 'R_34505476', 1.0, 0.5, 120, 1.0),    # Riyadh: Kingdom Centre at dusk (hook + formula)
    (8.0, 10.2, 'C_27433325', 3.0, 0.5, 0, 1.0),     # the Nile at sunset
    (10.2, 12.5, 'C_4174555', 12.0, 0.55, 0, 1.0),   # Cairo from the Citadel
    (12.5, 14.6, 'D_31257755', 1.0, 0.5, 60, 1.0),   # Dubai: Burj Khalifa by day
    (14.6, 17.0, 'C_25797443', 0.5, 0.5, 0, 1.0),    # Giza: pyramid and camel
    (17.0, 19.0, 'R_34505477', 6.0, 0.5, 120, 1.0),  # Riyadh: Kingdom Centre lights
    (19.0, 21.5, 'E_9862359', 22.0, 0.5, 0, 1.0),    # an order packed, from above (hands only)
    (21.5, 25.0, 'E_6898096', 0.5, 0.5, 0, 1.0),     # checkout on a phone (screen tracked)
    (25.0, 26.2, 'E_8937985', 3.0, 0.5, 0, 1.0),     # paying by card at a laptop (hands only)
    (26.2, 27.4, 'E_6214218', 2.5, 0.5, 0, 1.0),     # cart and boxes
    (27.4, 28.5, 'E_7362808', 1.0, 0.5, 0, 1.0),     # the parcel arrives
    (28.5, 30.5, 'C_20284256', 24.0, 0.5, 0, 1.0),   # Giza: dusk time-lapse
    (30.5, 32.5, 'D_33739603', 9.0, 0.5, 0, 1.0),    # Dubai from above
    (32.5, 36.5, 'R_18511357', 2.0, 0.5, 0, 1.0),    # Riyadh skyline (triptych and payoff)
    (36.5, 42.5, 'R_18511357', 6.0, 0.5, 0, 1.0),    # ...continues under the lockup at normal speed
]
SPD, HOLD = 1.35, 36.5
Wf = lambda t: t / SPD if t < HOLD else HOLD / SPD + (t - HOLD)
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
src = lambda c: os.path.join(ST, c + '.mp4') if os.path.exists(os.path.join(ST, c + '.mp4')) else os.path.join(ST5, c + '.mp4')
fr = lambda t: round(Wf(t) * FPS)   # segment edges on whole output frames
for k, (a, b, clip, tin, cx, dy, z) in enumerate(SEG):
    p = src(clip); w, h = probe(p); d = b - a; sp = SPD if b <= HOLD else 1.0; nf = fr(b) - fr(a)
    inputs += ['-ss', f'{tin:.3f}', '-t', f'{d + 0.3:.3f}', '-i', p]
    s = max(W / w, H / h) * z; sw, sh = int(round(w * s / 2) * 2), int(round(h * s / 2) * 2)
    x = int(min(max(0, cx * sw - W / 2), sw - W)); y = int(min(max(0, (sh - H) / 2 - dy), sh - H))
    chains.append(f'[{k}:v]setpts=(PTS-STARTPTS)/{sp},fps={FPS},scale={sw}:{sh}:flags=lanczos,crop={W}:{H}:{x}:{y},setsar=1,trim=end_frame={nf},setpts=PTS-STARTPTS,'
                  f'eq=contrast=1.06:saturation=0.9:gamma=0.97,colorbalance=rs=-0.03:gs=-0.02:bs=0.05:rh=0.02:bh=-0.02,format=yuv420p[s{k}]')
graph = ';'.join(chains) + ';' + ''.join(f'[s{k}]' for k in range(len(SEG))) + f'concat=n={len(SEG)}:v=1:a=0[v]'
plate = os.path.join(OUT, 'Ratio5_plate.mp4')
r = subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', graph, '-map', '[v]', '-r', str(FPS), '-c:v', 'libx264', '-preset', 'slow', '-crf', '12', '-pix_fmt', 'yuv420p', plate])
if r.returncode: sys.exit('plate failed')
print('wrote', plate)

# the phone track (phone_track2.json) and the video textures (seq/) from plate2.py are reused: the choreography clock is the same

# ---- one extra texture for v5: the triptych's Cairo panel uses the confirmed Cairo shot (Citadel view) ----
SQ = os.path.join(OUT, 'seq'); clip, tin, d, w, h, cx = 'C_4174555', 20.0, 2.2, 540, 960, 0.5
p = src(clip); sw0, sh0 = probe(p); s = max(w / sw0, h / sh0); sw, sh = int(round(sw0 * s / 2) * 2), int(round(sh0 * s / 2) * 2)
x = int(min(max(0, cx * sw - w / 2), sw - w)); y = int((sh - h) / 2); od = os.path.join(SQ, 'tri2cairo'); os.makedirs(od, exist_ok=True)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', f'{tin:.3f}', '-t', f'{d:.3f}', '-i', p, '-vf', f'fps=30,scale={sw}:{sh}:flags=lanczos,crop={w}:{h}:{x}:{y},eq=contrast=1.06:saturation=0.9,colorbalance=rs=-0.03:bs=0.05', '-q:v', '3', os.path.join(od, '%04d.jpg')], check=True)
print('seq tri2cairo', len(os.listdir(od)))
