#!/usr/bin/env python3
"""Mix and master "The Receipt" (9:16).
Voice: the hook take (handover/launch-film/receipt/vo/EN_hook.mp3, ElevenLabs "Noah", one take) cut on its measured phrases
(timing.json → hook_phrases, from plan.py) and laid on the on-screen lines; "Say it." / "We'll Tamm it." reused from the services
film take; «قول… تم» in Gulf Arabic on the lockup (the launch films' take). Without the hook take the film plays text-led on the score.
Score ducked under the voice; -14 LUFS integrated, under -1 dBTP after AAC. Usage (repo root): python3 film/receipt/mix.py"""
import json, os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/receipt'); T = json.load(open(os.path.join(ROOT, 'film/receipt/timing.json')))
HOOK = os.path.join(D, 'vo/EN_hook.mp3')
SVC = os.path.join(ROOT, 'handover/launch-film/services/vo/EN_take.mp3'); SPH = json.load(open(os.path.join(ROOT, 'film/services/timing.json')))['phrases']
GULF = os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
DUR = T['DUR']; run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
EN = 'highpass=f=80,equalizer=f=250:t=q:w=1.2:g=-2,deesser=i=0.3,acompressor=threshold=-22dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3500:t=q:w=1.0:g=1.5'
AR = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
inputs, chains, labs = ['-i', os.path.join(D, 'Receipt_Score.wav')], [], []
def cue(src, a, b, at, chain, vol):
    inputs.extend(['-i', src]); n = len(inputs) // 2 - 1; k = len(labs)
    chains.append(f'[{n}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={max(0, b - a - 0.05):.3f}:d=0.05,aresample=48000,aformat=channel_layouts=stereo,'
                  f'volume={vol},{chain},adelay={int(at * 1000)}|{int(at * 1000)}[v{k}]'); labs.append(f'[v{k}]')
ph = T.get('hook_phrases')
if ph and os.path.exists(HOOK):
    # Likes don't pay the rent. | Sales do. | So every campaign comes with a receipt. | Spend smarter. (Sell more.) | What's your number?
    if len(ph) == 6: plan = [(0, 0, 'h1'), (1, 1, 'h2'), (2, 2, 'intro'), (3, 4, 'sumLine'), (5, 5, 'num')]
    elif len(ph) == 5: plan = [(0, 0, 'h1'), (1, 1, 'h2'), (2, 2, 'intro'), (3, 3, 'sumLine'), (4, 4, 'num')]
    else: sys.exit(f'hook take has {len(ph)} phrases, expected 5 or 6: {ph}')
    for i, j, k in plan: cue(HOOK, max(0, ph[i][0] - 0.04), ph[j][1] + 0.08, T[k] + 0.08, EN, 1.0)
else: print('no hook take: text-led opening')
cue(SVC, SPH[14][0] - 0.04, SPH[14][1] + 0.08, T['say'] + 0.15, EN, 1.0)
cue(SVC, SPH[15][0] - 0.04, SPH[15][1] + 0.08, T['tamm'] + 0.1, EN, 1.0)
cue(GULF, 0.06, 1.94, T['gulf'], AR, 1.25)
g = chains + [''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
              '[0:a]aresample=48000,volume=-2dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.04:ratio=5:attack=8:release=300[duck]',
              f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas, out = os.path.join(D, 'Receipt_premaster.wav'), os.path.join(D, 'Receipt_master.wav'), os.path.join(D, 'SayTamm_The_Receipt_EN_9x16.mp4')
r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
# the printer ticks and stamps are peaky: a gentle compressor, then gain into an oversampled limiter, re-measured until -14 LUFS
lufs = lambda f: float([l for l in run('ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
G = -14.0 - lufs(pre) + 0.4
for _ in range(4):
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f'acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,aresample=192000,volume={G:.2f}dB,'
        'alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
    I = lufs(mas)
    if abs(I + 14.0) < 0.25: break
    G += -14.0 - I
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'Receipt_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
print('wrote', out)
