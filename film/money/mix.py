#!/usr/bin/env python3
"""Master «قاموس الفلوس»: each episode's score (no voice-over) to -14 LUFS under -1 dBTP, then muxed with its picture.
Usage (repo root): python3 film/money/mix.py [episode ...]"""
import os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/money')
NAMES = {1: 'ROAS', 2: 'CPA', 3: 'AOV', 4: 'CR'}
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
lufs = lambda f: float([l for l in run('ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
for e in [int(x) for x in sys.argv[1:]] or [1, 2, 3, 4]:
    score, mas = os.path.join(D, f'Money_ep{e}_Score.wav'), os.path.join(D, f'Money_ep{e}_master.wav')
    out = os.path.join(D, f'SayTamm_QamoosElFlous_{e:02d}_{NAMES[e]}_AR_9x16.mp4')
    G = -14.0 - lufs(score) + 0.4
    for _ in range(4):   # the ticks and stamps are peaky: gentle compressor, gain into an oversampled limiter, re-measured
        run('ffmpeg', '-y', '-v', 'error', '-i', score, '-af', f'acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,aresample=192000,volume={G:.2f}dB,'
            'alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
        I = lufs(mas)
        if abs(I + 14.0) < 0.25: break
        G += -14.0 - I
    r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, f'Money_ep{e}_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
    if r.returncode: sys.exit(r.stderr)
    print('wrote', out, f'{I:.1f} LUFS')
