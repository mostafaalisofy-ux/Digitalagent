#!/usr/bin/env python3
"""Prepare the showreel v2 samples, one set per service. Every image is used at or below its own size, so nothing is upscaled.
Sources: the owner's company profile PDF (work at 750-1600 px), tiles cut from the owner's source deck (each tile on its own,
no agency marks), the niimee motion piece, and screenshots of the SayTamm website (handover/saytamm-*-home.html).
Usage (repo root): python3 film/reel2/prep.py   (run film/reel/prep.py first for the niimee frames)"""
import os, shutil, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/reel2'); R1 = os.path.join(ROOT, 'handover/launch-film/reel'); SQ = os.path.join(D, 'seq', 'img'); os.makedirs(SQ, exist_ok=True)
HQ = {'chery_a': 'p-012', 'chery_b': 'p-013', 'chery_c': 'p-014', 'zahid_a': 'p-015', 'zahid_b': 'p-016', 'zahid_c': 'p-017', 'niimee_a': 'p-018', 'niimee_b': 'p-019', 'niimee_c': 'p-020',
      'clean_manual': 'p-021', 'clean_icons': 'p-022', 'clean_pattern': 'p-023', 'beauty_a': 'p-024', 'beauty_b': 'p-025', 'beauty_c': 'p-026', 'hive_a': 'p-027', 'hive_b': 'p-028', 'hive_c': 'p-029', 'hive_d': 'p-030',
      'metro': 'p-004', 'altopiano': 'p-006', 'siyaq': 'p-011', 'dcblock': 'p-010', 'bitumat': 'p-003', 'alqimma': 'p-009'}
for k, v in HQ.items(): shutil.copy(os.path.join(D, 'hq', v + '.jpg'), os.path.join(SQ, k + '.jpg'))
for k, v in {'alia_logo': '049_086_0', 'alia_dark': '049_086_1', 'alia_bag': '049_086_2', 'alia_store': '049_086_3', 'purchazzy': '050_087_0'}.items(): shutil.copy(os.path.join(R1, 'tiles', v + '.jpg'), os.path.join(SQ, k + '.jpg'))
for k in (124, 125): shutil.copy(os.path.join(R1, 'seq', 'img', f'mix_{k}.jpg'), os.path.join(SQ, f'mix_{k}.jpg'))
# the SayTamm website: hero of the mobile home page (EN and AR), the preview banner cropped away
for l in ('en', 'ar'):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'site', f'home_{l}_mobile.png'), '-vf', 'crop=780:1560:0:118', os.path.join(SQ, f'site_{l}.png')], check=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'site', f'home_{l}_desktop.png'), '-vf', 'crop=1440:840:0:60', os.path.join(SQ, f'site_{l}_desk.png')], check=True)
nd = os.path.join(D, 'seq', 'niimee')
if not os.path.isdir(nd): shutil.copytree(os.path.join(R1, 'seq', 'niimee'), nd)
print('samples', len(os.listdir(SQ)), 'niimee', len(os.listdir(nd)))
