#!/usr/bin/env python3
"""Master a sector reel's score (no voice-over) to -14 LUFS integrated, under -1 dBTP after AAC, mux it with the picture,
and write cover_<sector>.jpg. Usage (repo root): python3 film/sectors/mix.py <sector>"""
import json, os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/sectors')
S = sys.argv[1]; NAME = json.load(open(os.path.join(ROOT, 'film/sectors/sectors.json')))[S]['name']
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
pre, mas = os.path.join(D, f'{S}_Score.wav'), os.path.join(D, f'{S}_master.wav')
pic, out = os.path.join(D, f'{S}_picture.mp4'), os.path.join(D, f'SayTamm_Sector_{NAME}_AR_9x16.mp4')
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
run('ffmpeg', '-y', '-v', 'error', '-ss', '1.6', '-i', out, '-frames:v', '1', '-q:v', '2', os.path.join(D, f'cover_{S}.jpg'))
print('wrote', out, f'{I:.1f} LUFS')
