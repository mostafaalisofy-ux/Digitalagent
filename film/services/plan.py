#!/usr/bin/env python3
"""Timing for the SayTamm services film: the voice take is cut into its 16 phrases and each scene is sized to its line.
Writes film/services/timing.json (read by film.html and mix.py). Usage (repo root): python3 film/services/plan.py"""
import json, os, re, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
TAKE = os.path.join(ROOT, 'handover/launch-film/services/vo/EN_take.mp3')
err = subprocess.run(['ffmpeg', '-hide_banner', '-i', TAKE, '-af', 'silencedetect=n=-38dB:d=0.3', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', TAKE], capture_output=True, text=True).stdout)
ph, cur = [], 0.0
for a, b in zip(ss, se):
    if a - cur > 0.15: ph.append([round(cur, 3), round(a, 3)])
    cur = b
ph.append([round(cur, 3), round(dur, 3)])
assert len(ph) == 16, ph
# 0 Got it · 1 Here's how we get there · 2-3 Strategy · 4 Brand · 5 Social · 6 Content · 7 Production · 8 Performance · 9 SEO · 10 Web · 11 Analytics
# 12 Don't take our word for it · 13 So… what's your goal? · 14 Say it · 15 We'll Tamm it
cues = []   # [first phrase, last phrase, film time]
cues += [[0, 0, 3.75], [1, 1, 4.75]]
t, scenes = 8.4, []
for k, (a, b) in enumerate([(2, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11)]):
    d = ph[b][1] - ph[a][0]; length = round(max(3.4, d + 0.85), 2); cues.append([a, b, round(t + 0.3, 3)]); scenes.append([round(t, 3), round(t + length, 3)]); t += length
Q0 = round(t, 3); cues.append([12, 12, round(Q0 + 0.25, 3)]); QL = 1.75; E0 = round(Q0 + 1.5 + 4 * QL, 3)
cues += [[13, 13, round(E0 + 0.3, 3)], [14, 14, round(E0 + 2.35, 3)], [15, 15, round(E0 + 3.15, 3)]]
LOCK = round(E0 + 4.3, 3); DUR = round(LOCK + 3.8, 2)
json.dump({'phrases': ph, 'cues': cues, 'scenes': scenes, 'Q0': Q0, 'QL': QL, 'E0': E0, 'LOCK': LOCK, 'GULF': round(LOCK + 0.55, 3), 'DUR': DUR,
           'say': round(E0 + 2.35, 3), 'tamm': round(E0 + 3.15, 3)}, open(os.path.join(ROOT, 'film/services/timing.json'), 'w'), indent=1)
print('scenes', scenes); print('Q0', Q0, 'E0', E0, 'LOCK', LOCK, 'DUR', DUR)
