#!/usr/bin/env python3
"""Master the «قولها… تمّت» score (no voice-over) to -14 LUFS integrated, under -1 dBTP after AAC, and mux it with the picture.
Also writes two stills: cover.jpg (the strongest moment) and cover_end.jpg (the end title). Usage (repo root): python3 film/tammreel/mix.py"""
import os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/tammreel')
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
pre, mas = os.path.join(D, 'Tammreel_Score.wav'), os.path.join(D, 'Tammreel_master.wav')
V = sys.argv[1] if len(sys.argv) > 1 else ''   # '169' = the 16:9 cut
pic, out = os.path.join(D, f'Tammreel{V}_picture.mp4'), os.path.join(D, 'SayTamm_QolhaTammat_AR_' + ('16x9' if V else '9x16') + '.mp4')
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
for name, t in ((f"cover{V}.jpg", "13.70"), (f"cover_end{V}.jpg", "36.80")):
    run('ffmpeg', '-y', '-v', 'error', '-ss', t, '-i', out, '-frames:v', '1', '-q:v', '2', os.path.join(D, name))
print('wrote', out, f'{I:.1f} LUFS')
