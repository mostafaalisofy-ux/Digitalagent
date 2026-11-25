#!/usr/bin/env python3
"""Master the «Said. Done.» score (no voice-over) to -14 LUFS integrated, under -1 dBTP after AAC, and mux it with the picture.
Also writes two stills: cover.jpg (the strongest moment) and cover_end.jpg (the end title). Usage (repo root): python3 film/whatwedo/mix.py"""
import os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/whatwedo')
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
pre, mas = os.path.join(D, 'SaidDone_Score.wav'), os.path.join(D, 'SaidDone_master.wav')
pic, out = os.path.join(D, 'SaidDone_picture.mp4'), os.path.join(D, 'SayTamm_SaidDone_Services_16x9.mp4')
lufs = lambda f: float([l for l in run('ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
G = -14.0 - lufs(pre) + 0.4
for _ in range(5):
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f'acompressor=threshold=-18dB:ratio=2.5:attack=5:release=120,aresample=192000,volume={G:.2f}dB,'
        'alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
    I = lufs(mas)
    if abs(I + 14.0) < 0.25: break
    G += -14.0 - I
r = run('ffmpeg', '-y', '-v', 'error', '-i', pic, '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
for name, t in (('cover.jpg', '27.40'), ('cover_end.jpg', '28.90')):
    run('ffmpeg', '-y', '-v', 'error', '-ss', t, '-i', out, '-frames:v', '1', '-q:v', '2', os.path.join(D, name))
print('wrote', out, f'{I:.1f} LUFS')
