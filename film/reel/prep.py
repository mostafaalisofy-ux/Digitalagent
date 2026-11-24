#!/usr/bin/env python3
"""Prepare the SayTamm showreel textures: selected work stills (cropped post by post from the source deck, so no agency marks
come along), the Chery and MIX key visuals, and the niimee motion piece as a 30 fps JPEG sequence.
Usage (repo root): python3 film/reel/prep.py"""
import os, shutil, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/reel'); SQ = os.path.join(D, 'seq'); os.makedirs(os.path.join(SQ, 'img'), exist_ok=True)
POSTS = ['016_001', '016_000', '022_011', '022_012', '023_013', '023_014', '021_010', '021_009', '041_066', '041_067', '041_068', '037_057', '042_070',
         '032_041', '034_047', '034_049', '035_051', '036_053', '036_054', '038_059', '033_043', '030_035', '030_036', '031_040', '031_039', '045_081',
         '045_080', '043_073', '039_062', '039_063', '051_089', '051_090', '029_034', '024_017', '027_026', '025_020', '026_023', '040_065']
for p in POSTS: shutil.copy(os.path.join(D, 'posts', p + '.jpg'), os.path.join(SQ, 'img', p + '.jpg'))
for k in range(1, 6): shutil.copy(os.path.join(D, 'src', f'chery_{k}.jpg'), os.path.join(SQ, 'img', f'chery_{k}.jpg'))
for k in (123, 124, 125, 127): subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'src', f'mix_{k}.webp'), '-q:v', '2', os.path.join(SQ, 'img', f'mix_{k}.jpg')], check=True)
od = os.path.join(SQ, 'niimee'); os.makedirs(od, exist_ok=True)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'src', 'niimee_dot.mp4'), '-vf', 'fps=30', '-q:v', '2', os.path.join(od, '%04d.jpg')], check=True)
print('stills', len(os.listdir(os.path.join(SQ, 'img'))), 'niimee frames', len(os.listdir(od)))
