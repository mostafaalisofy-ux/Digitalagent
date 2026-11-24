#!/usr/bin/env python3
"""Mix and master the SayTamm services film (16:9): Tamm's English lines (ElevenLabs "Noah", one take, cut to timing.json),
«قول… تم» in Gulf Arabic on the lockup (the launch films' take), the original score ducked under the voice.
-14 LUFS integrated, under -1 dBTP after AAC. Usage (repo root): python3 film/services/mix.py"""
import json, os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/services'); T = json.load(open(os.path.join(ROOT, 'film/services/timing.json')))
TAKE, GULF = os.path.join(D, 'vo/EN_take.mp3'), os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
DUR = T['DUR']; run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
EN = 'highpass=f=80,equalizer=f=250:t=q:w=1.2:g=-2,deesser=i=0.3,acompressor=threshold=-22dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3500:t=q:w=1.0:g=1.5'
AR = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
inputs, chains, labs = ['-i', os.path.join(D, 'Services_Score.wav')], [], []
def cue(src, a, b, at, chain, vol):
    inputs.extend(['-i', src]); n = len(inputs) // 2 - 1; k = len(labs)
    chains.append(f'[{n}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={max(0, b - a - 0.05):.3f}:d=0.05,aresample=48000,aformat=channel_layouts=stereo,'
                  f'volume={vol},{chain},adelay={int(at * 1000)}|{int(at * 1000)}[v{k}]'); labs.append(f'[v{k}]')
ph = T['phrases']
for i, j, at in T['cues']: cue(TAKE, max(0, ph[i][0] - 0.04), ph[j][1] + 0.08, at - 0.04, EN, 1.0)
cue(GULF, 0.06, 1.94, T['GULF'], AR, 1.25)
g = chains + [''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
              '[0:a]aresample=48000,volume=-2dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.04:ratio=5:attack=8:release=300[duck]',
              f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas, out = os.path.join(D, 'Services_premaster.wav'), os.path.join(D, 'Services_master.wav'), os.path.join(D, 'SayTamm_Services_EN_16x9.mp4')
r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
# measure, then raise into an oversampled limiter so the voice sits at -14 LUFS with the peaks held under -1 dBTP
I = float([l for l in run('ffmpeg', '-hide_banner', '-i', pre, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f'aresample=192000,volume={-14.0 - I + 0.4:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'Services_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
print('wrote', out)
