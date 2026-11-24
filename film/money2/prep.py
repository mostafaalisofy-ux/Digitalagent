#!/usr/bin/env python3
"""Footage for «قاموس الفلوس» v2: hands-only Pexels clips as 30 fps JPEG sequences at 1080x1920, graded a touch brighter and richer.
Usage (repo root): python3 film/money2/prep.py [name ...]"""
import os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); LF = os.path.join(ROOT, 'handover/launch-film')
SQ = os.path.join(LF, 'money', 'seq'); os.makedirs(SQ, exist_ok=True)
# name: (source, in-point, seconds) · all hands only, no faces
CLIPS = {
    'pay':      ('roas/stock5/E_8937985.mp4', 1.0, 4.0),   # card payment at a laptop (Pexels 8937985)
    'cartlap':  ('roas/stock5/E_6214215.mp4', 0.5, 3.0),   # laptop and a toy trolley on teal (Pexels 6214215)
    'pack':     ('roas/stock5/E_9862359.mp4', 20.0, 3.0),  # an order packed, from above (Pexels 9862359)
    'parcel':   ('roas/stock/E_7362808.mp4', 0.0, 3.0),    # the parcel at the door (Pexels 7362808)
    'cashcalc': ('money/stock/P_34839526.mp4', 2.0, 3.5),  # cash and a phone calculator (Pexels 34839526)
    'payphone': ('roas/stock/E_6214214.mp4', 0.0, 4.0),    # "PAY" on a phone, teal (Pexels 6214214)
    'calc':     ('money/stock/P_6266261.mp4', 0.0, 4.0),   # calculator and notes (Pexels 6266261)
    'cart':     ('roas/stock/E_6214218.mp4', 0.0, 3.0),    # trolley with a phone, pink (Pexels 6214218)
}
ONLY = sys.argv[1:]
for name, (src, tin, d) in CLIPS.items():
    if ONLY and name not in ONLY: continue
    od = os.path.join(SQ, name); os.makedirs(od, exist_ok=True)
    vf = 'fps=30,scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,eq=contrast=1.06:saturation=1.12:gamma=1.02'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(tin), '-t', str(d), '-i', os.path.join(LF, src), '-vf', vf, '-q:v', '3', os.path.join(od, '%04d.jpg')], check=True)
    print(name, len(os.listdir(od)))
