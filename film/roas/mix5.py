#!/usr/bin/env python3
"""Mix and master The Ratio v5 (Arabic, for store owners): -14 LUFS integrated, under -1 dBTP after AAC.
One voice (Rawi, Modern Standard Arabic, fully vowelled script), one take, cut into phrases and pinned to the picture.
Usage (repo root): python3 film/roas/mix5.py"""
import json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/roas'); TAKE = os.path.join(D, 'vo5/takeA.mp3')
SCORE = os.path.join(D, 'Ratio3_Score.wav'); PIC = os.path.join(D, 'Ratio5_ar_picture.mp4')
OUTF = os.path.join(D, 'SayTamm_TheRatio_v5_Stores_AR_33s_9x16.mp4')
DUR = 36.5 / 1.35 + 6.0
# the take's 11 phrases: 0 عندك متجر؟ · 1 زيارات كثيرة… · 2 وطلبات قليلة؟ · 3 هدفنا واحد: · 4 عائد أعلى من كل إعلان. ·
# 5 لا نعدّ الإعجابات… · 6 نعدّ الطلبات. · 7 قول… · 8 تم. · 9 عندك متجر؟ · 10 ابدأ من هنا.
# (first phrase, last phrase, start time in the film): each line lands with its words on screen, never over the next line
CUES = [(0, 0, 1.55), (1, 1, 2.50), (2, 2, 3.92), (3, 4, 5.25), (5, 5, 23.90), (6, 6, 25.45), (7, 8, 29.28), (9, 10, 30.62)]
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)

def phrases(p, thresh='-35dB', gap=0.25):
    dur = float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p).stdout)
    err = run('ffmpeg', '-hide_banner', '-i', p, '-af', f'silencedetect=n={thresh}:d={gap}', '-f', 'null', '-').stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    out, cur = [], 0.0
    for a, b in zip(ss, se + [dur] * (len(ss) - len(se))):
        if a - cur > 0.15: out.append((cur, a))
        cur = b
    if dur - cur > 0.15: out.append((cur, dur))
    return out

VOCHAIN = 'highpass=f=80,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.3,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
ph = phrases(TAKE); assert len(ph) == 11, ph
inputs, chains, labs = ['-i', SCORE], [], []
for k, (i, j, at) in enumerate(CUES):
    a, b = max(0, ph[i][0] - 0.04), ph[j][1] + 0.12
    inputs += ['-i', TAKE]; n = len(inputs) // 2 - 1
    chains.append(f'[{n}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={max(0, b - a - 0.06):.3f}:d=0.06,aresample=48000,aformat=channel_layouts=stereo,'
                  f'volume=1.6,{VOCHAIN},adelay={int((at - 0.04) * 1000)}|{int((at - 0.04) * 1000)}[v{k}]')
    labs.append(f'[v{k}]'); print(f'phrases {i}-{j} at {at:.2f} s (to {at + b - a:.2f})')
g = chains + [''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
              '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-2.5[mus]', '[mus][key]sidechaincompress=threshold=0.05:ratio=4:attack=8:release=260[duck]',
              f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas = os.path.join(D, 'Ratio5_premaster.wav'), os.path.join(D, 'Ratio5_master.wav')
r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
js = json.loads(re.findall(r'\{[^{}]*\}', run('ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.6:LRA=11:print_format=json', '-f', 'null', '-').stderr)[-1])
run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1.6:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', mas)
r = run('ffmpeg', '-y', '-v', 'error', '-i', PIC, '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', OUTF)
if r.returncode: sys.exit(r.stderr)
print('wrote', OUTF)
