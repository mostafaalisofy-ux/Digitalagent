#!/usr/bin/env python3
"""Mix and master «مدينة الكلمات» (Word City): the generated score, and the Gulf «قول… تم» (the launch films' take,
handover/launch-film/infinite/vo2/SA_call.mp3) placed so «تم» lands with the biggest word, «تمّ», at 28.5 s.
Score ducked under the voice; -14 LUFS integrated, under -1 dBTP after AAC; writes the MP4 and a cover frame.
Usage (repo root): python3 film/wordcity/mix.py [169|916]"""
import os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/wordcity')
V = sys.argv[1] if len(sys.argv) > 1 else '169'
GULF = os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
DUR, T_TAMM, TAMM_IN_TAKE, A0, A1 = 38.0, 28.5, 1.245, 0.06, 1.94   # «تم» starts 1.245 s into the take (silencedetect)
AT = T_TAMM - (TAMM_IN_TAKE - A0)
AR = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
g = [f'[1:a]atrim={A0}:{A1},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={A1 - A0 - 0.05:.3f}:d=0.05,aresample=48000,aformat=channel_layouts=stereo,'
     f'volume=1.35,{AR},adelay={int(AT * 1000)}|{int(AT * 1000)},apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
     '[0:a]aresample=48000,volume=-2dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.04:ratio=5:attack=8:release=300[duck]',
     f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas = os.path.join(D, 'WordCity_premaster.wav'), os.path.join(D, 'WordCity_master.wav')
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'WordCity_Score.wav'), '-i', GULF, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
lufs = lambda f: float([l for l in run('ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
G = -14.0 - lufs(pre) + 0.4
for _ in range(5):
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f'acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,aresample=192000,volume={G:.2f}dB,'
        'alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
    I = lufs(mas)
    if abs(I + 14.0) < 0.25: break
    G += -14.0 - I
tag = '16x9' if V == '169' else '9x16'
out = os.path.join(D, f'SayTamm_WordCity_AR_{tag}.mp4')
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, f'WordCity_{V}_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
run('ffmpeg', '-y', '-v', 'error', '-ss', '29.6', '-i', out, '-frames:v', '1', '-q:v', '2', os.path.join(D, f'cover_wordcity_{tag}.jpg'))
print('wrote', out, f'{I:.1f} LUFS')
