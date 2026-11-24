#!/usr/bin/env python3
"""Mix and master «الإيصال», the Arabic cut (9:16). No voice-over: the score, the printer and stamps (all in the page),
and «قول… تم» in Gulf Arabic on the lockup (the launch films' take). -14 LUFS integrated, under -1 dBTP after AAC.
Usage (repo root): python3 film/receipt/mix_ar.py"""
import os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/receipt')
HT = open(os.path.join(ROOT, 'film/receipt/film_ar.html'), encoding='utf-8').read()
GULF_AT, DUR = (float(re.search(rf'\b{k}: ([\d.]+)', HT).group(1)) for k in ('gulf', 'DUR'))
GULF = os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
AR = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
d = int(GULF_AT * 1000)
g = [f'[1:a]atrim=0.06:1.94,asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st=1.83:d=0.05,aresample=48000,aformat=channel_layouts=stereo,volume=1.25,{AR},adelay={d}|{d},apad=whole_dur={DUR}[vo]',
     '[vo]asplit=2[key][vin]', '[0:a]aresample=48000,volume=-2dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.04:ratio=5:attack=8:release=300[duck]',
     f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas, out = os.path.join(D, 'Receipt_ar_premaster.wav'), os.path.join(D, 'Receipt_ar_master.wav'), os.path.join(D, 'SayTamm_Receipt_AR_StoreOwners_9x16.mp4')
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'Receipt_ar_Score.wav'), '-i', GULF, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
# peaky ticks and stamps: a gentle compressor, then gain into an oversampled limiter, re-measured until -14 LUFS
lufs = lambda f: float([l for l in run('ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
G = -14.0 - lufs(pre) + 0.4
for _ in range(4):
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f'acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,aresample=192000,volume={G:.2f}dB,'
        'alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
    I = lufs(mas)
    if abs(I + 14.0) < 0.25: break
    G += -14.0 - I
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'Receipt_ar_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
print('wrote', out)
