#!/usr/bin/env python3
"""Mix «قاموس الفلوس» v2. Episode 01: the voice-over take (ElevenLabs "Rawi", MSA) at +0.4 s.
Episodes 02-04: when vo/epN.mp3 exists, its phrases (silencedetect) are laid on the cues planned in film.html (`vo: [...]`);
without a take the episode plays on the score alone. «قول… تم» in Gulf Arabic on the end card, score ducked under the voice;
-14 LUFS integrated, under -1 dBTP after AAC. Usage (repo root): python3 film/money2/mix.py 2"""
import os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/money')
EP = int(sys.argv[1]) if len(sys.argv) > 1 else 1
HT = open(os.path.join(ROOT, 'film/money2/film.html'), encoding='utf-8').read()
blk = HT[HT.index(f'\n{EP}: {{ dur:'):]
DUR, END = (float(re.search(rf'{k}: ([\d.]+)', blk).group(1)) for k in ('dur', 'end'))
CUES = [float(x) for x in re.search(r'vo: \[([^\]]*)\]', blk[:600]).group(1).split(',')] if EP != 1 else [0.4]
NAME = {1: 'ROAS', 2: 'CPA', 3: 'AOV', 4: 'CR'}[EP]
VO, GULF = os.path.join(D, f'vo/ep{EP}.mp3'), os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
VOC = 'highpass=f=80,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.3,acompressor=threshold=-22dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
def phrases(p, gap=0.2):
    err = run('ffmpeg', '-hide_banner', '-i', p, '-af', f'silencedetect=n=-38dB:d={gap}', '-f', 'null', '-').stderr
    dur = float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p).stdout)
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    out, cur = [], 0.0
    for a, b in zip(ss, se):
        if a - cur > 0.15: out.append((cur, a))
        cur = b
    if dur - cur > 0.15: out.append((cur, dur))
    return out
inputs, chains, labs = ['-i', os.path.join(D, f'Money2_ep{EP}_Score.wav')], [], []
def cue(src, a, b, at, vol):
    inputs.extend(['-i', src]); n = len(inputs) // 2 - 1; k = len(labs); d = int(at * 1000)
    chains.append(f'[{n}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={max(0, b - a - 0.05):.3f}:d=0.05,aresample=48000,aformat=channel_layouts=stereo,volume={vol},{VOC},adelay={d}|{d}[v{k}]'); labs.append(f'[v{k}]')
if os.path.exists(VO):
    if EP == 1: cue(VO, 0, 60, CUES[0], 1.0)
    else:
        ph = phrases(VO, 0.45)   # the take is read with a long pause between phrases; short pauses inside a phrase stay in it
        if len(ph) != len(CUES): sys.exit(f'ep{EP}: take has {len(ph)} phrases, plan has {len(CUES)} cues: {ph}')
        last = 0.0
        for (a, b), at in zip(ph, CUES):   # a phrase that runs long pushes the next one back rather than overlapping it
            at = max(at, last + 0.15); cue(VO, max(0, a - 0.04), b + 0.06, at, 1.0); last = at + (b - a)
else: print(f'ep{EP}: no voice-over take yet, score only')
cue(GULF, 0.06, 1.94, END + 0.7, 1.2)
g = chains + [''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
              '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.035:ratio=6:attack=6:release=260[duck]',
              f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas = os.path.join(D, f'Money2_ep{EP}_premaster.wav'), os.path.join(D, f'Money2_ep{EP}_master.wav')
out = os.path.join(D, f'SayTamm_QamoosElFlous_v2_{EP:02d}_{NAME}_AR_9x16.mp4')
r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
lufs = lambda f: float([l for l in run('ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128', '-f', 'null', '-').stderr.splitlines() if l.strip().startswith('I:')][-1].split()[1])
G = -14.0 - lufs(pre) + 0.4
for _ in range(4):
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f'acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,aresample=192000,volume={G:.2f}dB,'
        'alimiter=limit=0.80:attack=2:release=60:level=false,aresample=48000', '-ar', '48000', mas)
    I = lufs(mas)
    if abs(I + 14.0) < 0.25: break
    G += -14.0 - I
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, f'Money2_ep{EP}_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
print('wrote', out, f'{I:.1f} LUFS')
