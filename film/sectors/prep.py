#!/usr/bin/env python3
"""Sector reels footage → 30 fps JPEG sequences. Sources (proxies, 1080 wide) live in handover/launch-film/sectors/src,
downloaded from the owner's Drive (see docs/DRIVE_MATERIAL_2026-11-26.md): Altopiano 4K reels, Zahid Electra motion,
Clean Basket 2D motion, Exodus reels, mini tamm. Usage (repo root): python3 film/sectors/prep.py [id ...]"""
import os, subprocess, json, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); BASE = os.path.join(ROOT, 'handover/launch-film/sectors')
SEQ = os.path.join(BASE, 'seq')
for s in json.load(open(os.path.join(os.path.dirname(__file__), 'shots.json'))):
    if sys.argv[1:] and s['id'] not in sys.argv[1:]: continue
    d = os.path.join(SEQ, s['id']); os.makedirs(d, exist_ok=True)
    for f in os.listdir(d): os.remove(os.path.join(d, f))
    vf = s.get('vf') or ('fps=30,scale=1080:-2' if 'cx' not in s else f"fps=30,scale=-2:1920,crop=1080:1920:(iw-1080)*{s['cx']}:0")
    vf += ',eq=contrast=1.04:saturation=1.06'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s['in']), '-t', str(s['len'] + 0.1), '-i', os.path.join(ROOT, 'handover/launch-film', s['file']),
                    '-vf', vf, '-q:v', '3', os.path.join(d, '%03d.jpg')], check=True)
    print(s['id'], len(os.listdir(d)))
