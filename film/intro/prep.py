#!/usr/bin/env python3
"""Prepare the intro film's textures: the three Tamm character clips as 24 fps JPEG sequences, and the selected work images.
Sources are the owner's files in handover/launch-film/intro/src (character clips) and profile_img (images embedded in the 2026 profile).
Usage (repo root): python3 film/intro/prep.py"""
import os, shutil, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/intro'); SQ = os.path.join(D, 'seq'); os.makedirs(SQ, exist_ok=True)
CLIPS = {'tv': 'tamm_vertical.mp4', 'tw': 'tamm_wide.mp4', 'tl': 'tamm_looks.mp4'}
for name, f in CLIPS.items():
    od = os.path.join(SQ, name); os.makedirs(od, exist_ok=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'src', f), '-vf', 'fps=24', '-q:v', '2', os.path.join(od, '%04d.jpg')], check=True)
    print(name, len(os.listdir(od)))
# work images from the profile (client work shown in the profile itself; no client logos are used)
WORK = ['img025', 'img026', 'img027', 'img028', 'img032', 'img122', 'img123', 'img107', 'img108', 'img109', 'img119', 'img117', 'img118',
        'img121', 'img033', 'img112', 'img115', 'img116', 'img110', 'img111', 'img113', 'img120', 'img124', 'img000', 'img001']
wd = os.path.join(SQ, 'work'); os.makedirs(wd, exist_ok=True)
for w in WORK: shutil.copy(os.path.join(D, 'profile_img', w + '.jpg'), os.path.join(wd, w + '.jpg'))
shutil.copy(os.path.join(D, 'src', 'tamm_cap.webp'), os.path.join(SQ, 'tamm_cap.webp'))
print('work', len(WORK))
