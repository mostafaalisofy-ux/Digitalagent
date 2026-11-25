#!/usr/bin/env python3
"""Cut the client clips for the work reel into JPEG sequences (30 fps, 1080 wide).
Sources come from the owner's Drive folder «فيديوهات عملاء» (Tech Hive, Niimee) into handover/launch-film/clientreel/src.
Shots are chosen to avoid real faces and the clients' contact end cards. Usage (repo root): python3 film/clientreel/prep.py"""
import os, subprocess, json
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
SRC = os.path.join(ROOT, 'handover/launch-film/clientreel/src'); SEQ = os.path.join(ROOT, 'handover/launch-film/clientreel/seq')
SHOTS = json.load(open(os.path.join(os.path.dirname(__file__), 'shots.json')))
for s in SHOTS:
    d = os.path.join(SEQ, s['id']); os.makedirs(d, exist_ok=True)
    for f in os.listdir(d): os.remove(os.path.join(d, f))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s['in']), '-t', str(s['len'] + 0.1), '-i', os.path.join(SRC, s['file']),
                    '-vf', 'fps=30,scale=1080:-2', '-q:v', '3', os.path.join(d, '%03d.jpg')], check=True)
    print(s['id'], len(os.listdir(d)))
