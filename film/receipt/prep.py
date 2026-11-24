#!/usr/bin/env python3
"""Prepare the Receipt film's footage: hands-only Pexels clips as 30 fps JPEG sequences at 1080x1920, warm-graded.
Usage (repo root): python3 film/receipt/prep.py"""
import os, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); LF = os.path.join(ROOT, 'handover/launch-film')
SQ = os.path.join(LF, 'receipt', 'seq'); os.makedirs(SQ, exist_ok=True)
# name: (source, in-point, duration, playback speed)
CLIPS = {'pay': ('roas/stock5/E_8937985.mp4', 1.0, 6.0, 1.0),        # paying by card at a laptop (hands only)
         'checkout': ('roas/stock/E_6898096.mp4', 0.3, 8.0, 1.0),     # a checkout on a phone (hands only)
         'keys': ('receipt/stock/H_3922465.mp4', 0.0, 6.9, 0.9),      # house keys handed over by a SOLD sign (hands only)
         'packing': ('roas/stock5/E_9862359.mp4', 20.0, 8.0, 1.0),    # an order packed, from above (hands only)
         'parcel': ('roas/stock/E_7362808.mp4', 0.0, 7.4, 1.0),       # the parcel at the door
         # Arabic cut (K.S story): Pexels 6801512, 6801516, 6632888, 36507355, 6801514, hands only
         'sofa': ('receipt/stock_ar/F_6801512.mp4', 0.0, 7.8, 1.0),   # a cushion placed on a sofa
         'chair': ('receipt/stock_ar/F_6801516.mp4', 1.0, 8.0, 1.0),  # a cushion paired with a chair
         'vase': ('receipt/stock_ar/F_6632888.mp4', 0.0, 7.2, 1.0),   # a plant set in a vase on a side table
         'cushions': ('receipt/stock_ar/F_36507355.mp4', 0.0, 8.0, 1.0),  # cushions on a sofa, still
         'flowers': ('receipt/stock_ar/F_6801514.mp4', 0.0, 8.0, 1.0)}    # flowers set on a styled sofa
import sys
ONLY = sys.argv[1:]
for name, (src, tin, d, sp) in CLIPS.items():
    if ONLY and name not in ONLY: continue
    od = os.path.join(SQ, name); os.makedirs(od, exist_ok=True)
    vf = f'setpts=PTS/{sp},fps=30,scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,eq=contrast=1.05:saturation=0.85:gamma=0.96,colorbalance=rs=0.02:bs=-0.02:rh=0.03:bh=-0.03'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(tin), '-t', str(d * sp), '-i', os.path.join(LF, src), '-vf', vf, '-q:v', '3', os.path.join(od, '%04d.jpg')], check=True)
    print(name, len(os.listdir(od)))
