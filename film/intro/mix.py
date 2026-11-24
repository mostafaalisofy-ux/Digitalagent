#!/usr/bin/env python3
"""Mix and master the SayTamm intro film: -14 LUFS integrated, under -1 dBTP after AAC.
Narration: one English take (Tamm, voiced by ElevenLabs "Noah"), cut to the edit list in timing.json.
The name «قول… تم» is a Gulf Arabic take (ElevenLabs "Mansour", reused from the launch films), heard twice: after "you hear two words…" and on the lockup.
Usage (repo root): python3 film/intro/mix.py"""
import json, os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/intro'); T = json.load(open(os.path.join(ROOT, 'film/intro/timing.json')))
TAKE, GULF = os.path.join(D, 'vo/EN_takeA.mp3'), os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
SCORE, PIC, OUTF = os.path.join(D, 'Intro_Score.wav'), os.path.join(D, 'Intro_picture.mp4'), os.path.join(D, 'SayTamm_Intro_Tamm_EN_63s_9x16.mp4')
DUR = 63.5
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
EN = 'highpass=f=80,equalizer=f=250:t=q:w=1.2:g=-2,deesser=i=0.3,acompressor=threshold=-22dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3500:t=q:w=1.0:g=1.5'
AR = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
inputs, chains, labs = ['-i', SCORE], [], []
def cue(src, a, b, at, chain, vol):
    inputs.extend(['-i', src]); n = len(inputs) // 2 - 1; k = len(labs)
    chains.append(f'[{n}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={max(0, b - a - 0.05):.3f}:d=0.05,aresample=48000,aformat=channel_layouts=stereo,'
                  f'volume={vol},{chain},adelay={int(at * 1000)}|{int(at * 1000)}[v{k}]'); labs.append(f'[v{k}]')
for a, b, s in T['edl']: cue(TAKE, a - 0.04, b + 0.08, s - 0.04, EN, 1.0)
for g in T['gulf']: cue(GULF, 0.06, 1.94, g, AR, 1.25)
g = chains + [''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
              '[0:a]aresample=48000,volume=-2dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.04:ratio=5:attack=8:release=300[duck]',
              f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas = os.path.join(D, 'Intro_premaster.wav'), os.path.join(D, 'Intro_master.wav')
r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
js = json.loads(re.findall(r'\{[^{}]*\}', run('ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.6:LRA=11:print_format=json', '-f', 'null', '-').stderr)[-1])
run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1.6:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', mas)
r = run('ffmpeg', '-y', '-v', 'error', '-i', PIC, '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', OUTF)
if r.returncode: sys.exit(r.stderr)
print('wrote', OUTF)
