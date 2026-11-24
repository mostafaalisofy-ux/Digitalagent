#!/usr/bin/env python3
"""Timing for "The Receipt". Writes film/receipt/timing.json. When the hook take exists
(handover/launch-film/receipt/vo/EN_hook.mp3), its phrases are measured and the lines are placed on them.
Usage (repo root): python3 film/receipt/plan.py"""
import json, os, re, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/receipt')
T = dict(h1=0.5, h2=2.4, intro=4.6, r=[7.4, 15.0, 22.6, 30.2], rl=7.6, printDur=2.2, countAt=2.4, barAt=3.0, stampAt=5.4,
         sum=37.8, sumLine=38.1, end=43.2, num=43.5, say=45.4, tamm=46.2, lock=47.6, gulf=48.1, DUR=52.0)
def phrases(p, gap=0.3):
    err = subprocess.run(['ffmpeg', '-hide_banner', '-i', p, '-af', f'silencedetect=n=-38dB:d={gap}', '-f', 'null', '-'], capture_output=True, text=True).stderr
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    out, cur = [], 0.0
    for a, b in zip(ss, se):
        if a - cur > 0.15: out.append([round(cur, 3), round(a, 3)])
        cur = b
    out.append([round(cur, 3), round(dur, 3)]); return out
hook = os.path.join(D, 'vo', 'EN_hook.mp3')
T['hook_phrases'] = phrases(hook) if os.path.exists(hook) else None
json.dump(T, open(os.path.join(ROOT, 'film/receipt/timing.json'), 'w'), indent=1)
print(json.dumps(T))
