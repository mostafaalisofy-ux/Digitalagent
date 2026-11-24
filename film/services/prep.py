#!/usr/bin/env python3
"""Prepare the services film's samples. Work images come from the SayTamm website's Work page (the images embedded in
handover saytamm-en-work.html, 750-1600 px); Alia tiles from the reel prep; site screenshots from the reel v2 prep.
Every sample is drawn at or below its own pixel size. Usage (repo root): python3 film/reel/prep.py && python3 film/reel2/prep.py && python3 film/services/prep.py"""
import os, shutil
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
LF = os.path.join(ROOT, 'handover/launch-film'); D = os.path.join(LF, 'services'); SQ = os.path.join(D, 'seq', 'img'); os.makedirs(SQ, exist_ok=True)
WEB = ['w030', 'w031', 'w032', 'w036', 'w037', 'w038', 'w040', 'w041', 'w043', 'w044', 'w050', 'w051', 'w052', 'w080', 'w081', 'w089', 'w092', 'w093', 'w094',
       'w096', 'w097', 'w099', 'w071', 'w110', 'w117', 'w047']
for w in WEB: shutil.copy(os.path.join(D, 'webimg', w + '.webp'), os.path.join(SQ, w + '.webp'))
for k, v in {'alia_logo': '049_086_0', 'alia_store': '049_086_3'}.items(): shutil.copy(os.path.join(LF, 'reel', 'tiles', v + '.jpg'), os.path.join(SQ, k + '.jpg'))
for f in ('site_en_desk.png', 'site_ar.png', 'site_en.png'): shutil.copy(os.path.join(LF, 'reel2', 'seq', 'img', f), os.path.join(SQ, f))
print('samples', len(os.listdir(SQ)))
