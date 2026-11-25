#!/usr/bin/env python3
"""«رحلة العميل» footage → 30 fps JPEG sequences (1080 wide; landscape stock is cropped to 9:16 around `cx`).
Stock: hands-only Pexels clips in handover/launch-film/journey/stock (Pexels 39425751 typing, 8035618 story cards,
35313946 and 30742631 camera, 33942937 phone). Client footage: handover/launch-film/clientreel/src (Drive «فيديوهات عملاء»).
Usage (repo root): python3 film/journey/prep.py [id ...]"""
import os, subprocess, json, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); BASE = os.path.join(ROOT, 'handover/launch-film/journey')
SEQ = os.path.join(BASE, 'seq')
for s in json.load(open(os.path.join(os.path.dirname(__file__), 'shots.json'))):
    if sys.argv[1:] and s['id'] not in sys.argv[1:]: continue
    d = os.path.join(SEQ, s['id']); os.makedirs(d, exist_ok=True)
    for f in os.listdir(d): os.remove(os.path.join(d, f))
    vf = 'fps=30,scale=1080:-2' if 'cx' not in s else f"fps=30,scale=-2:1920,crop=1080:1920:(iw-1080)*{s['cx']}:0"
    vf += ',eq=contrast=1.04:saturation=1.08'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s['in']), '-t', str(s['len'] + 0.1), '-i', os.path.normpath(os.path.join(BASE, s['file'])),
                    '-vf', vf, '-q:v', '3', os.path.join(d, '%03d.jpg')], check=True)
    print(s['id'], len(os.listdir(d)))
