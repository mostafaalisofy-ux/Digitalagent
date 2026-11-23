#!/usr/bin/env python3
"""Mix and master The Dot (Arabic and English masters): -14 LUFS integrated, under -1 dBTP after AAC.

Act 1: the "talk" voices are cut into phrases and pile up, panned and phone-filtered, until the freeze at 5.6 s
cuts them dead. Act 6: the closing voice lands its «تم» / "Tamm" exactly on the hit at 21.75 s.
Usage (repo root): python3 film/the-dot/mix.py [ar|en|both]"""
import json, math, os, re, struct, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/the-dot')
VO = os.path.join(D, 'vo')
VO2 = os.path.join(ROOT, 'handover/launch-film/infinite/vo2')
SCORE = os.path.join(D, 'TheDot_Score.wav')
DUR, T_FREEZE, T_TAMM, T_LINE, T_CTA = 28.0, 5.6, 21.75, 24.2, 25.4
CHATTER_AT = [0.85, 1.6, 2.25, 2.85, 3.35, 3.8, 4.2, 4.55, 4.85, 5.1, 5.3]
MASTERS = {
    'ar': {'chatter': ['AR_chatter_A.mp3', 'AR_chatter_B.mp3'],
           'tamm': (os.path.join(VO2, 'SA_call.mp3'), 1),        # «قول… تم!»: the 2nd phrase («تم») lands on the hit
           'line': 'AR_less.mp3', 'cta': 'AR_cta.mp3'},
    'en': {'chatter': ['EN_chatter.mp3'],
           'tamm': (os.path.join(VO2, 'EN_tag.mp3'), 1),         # "Say it. Tamm it.": "Tamm it." lands on the hit
           'line': 'EN_less.mp3', 'cta': 'EN_cta.mp3'},
}

def run(*a, **k):
    return subprocess.run(list(a), capture_output=True, text=True, **k)

def phrases(p, thresh='-38dB', gap=0.12):
    """[(start, end)] of the spoken phrases in a take."""
    dur = float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p).stdout)
    err = run('ffmpeg', '-hide_banner', '-i', p, '-af', f'silencedetect=n={thresh}:d={gap}', '-f', 'null', '-').stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]
    se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    out, cur = [], 0.0
    for a, b in zip(ss, se + [dur] * (len(ss) - len(se))):
        if a - cur > 0.15: out.append((cur, a))
        cur = b
    if dur - cur > 0.15: out.append((cur, dur))
    return out

def rms_db(p, a=0, b=None):
    args = ['ffmpeg', '-v', 'error', '-ss', str(a)] + (['-t', str(b - a)] if b else []) + ['-i', p, '-ac', '1', '-ar', '16000', '-f', 's16le', '-']
    raw = subprocess.run(args, capture_output=True).stdout
    s = struct.unpack('<%dh' % (len(raw) // 2), raw); fr = [sum(x * x for x in s[i:i + 160]) / 160 for i in range(0, len(s) - 160, 160)]
    loud = [f for f in fr if 20 * math.log10(math.sqrt(f) / 32768 + 1e-9) > -45] or [1]
    return 10 * math.log10(sum(loud) / len(loud) / 32768 ** 2)

VOCHAIN = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2.5'

def master(v):
    m = MASTERS[v]; picture = os.path.join(D, f'TheDot_{v}_picture.mp4')
    inputs, chains, vo_labels, ch_labels = ['-i', SCORE], [], [], []
    def inp(p):
        inputs.extend(['-i', p]); return len(inputs) // 2 - 1
    # ---- Act 1: the talk ----
    lists = []
    for f in m['chatter']:
        p = os.path.join(VO, f)
        if not os.path.exists(p): print('missing (skipped):', f); continue
        lists.append([(p, a, b) for a, b in phrases(p) if b - a > 0.4])   # drop sighs and breaths
    pool = [x for grp in zip(*lists) for x in grp] if len(lists) > 1 else (lists[0] if lists else [])
    for k, at in enumerate(CHATTER_AT):
        if not pool: break
        p, a, b = pool[k % len(pool)]
        b = min(b, a + (T_FREEZE - at) + 0.5)
        i = inp(p); lab = f'c{k}'; pan = [-0.6, 0.55, -0.3, 0.7, 0.2, -0.75, 0.4, -0.45, 0.65, -0.2, 0.1][k]
        gain = -16 - rms_db(p, a, b) + (-7 + 5 * k / len(CHATTER_AT))
        l, r = (1 - pan) / 2 * 2, (1 + pan) / 2 * 2
        chains.append(f'[{i}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono,volume={gain:.2f}dB,'
                      f'highpass=f=280,lowpass=f=3800,acompressor=threshold=-20dB:ratio=3,pan=stereo|c0={l:.2f}*c0|c1={r:.2f}*c0,adelay={int(at*1000)}|{int(at*1000)}[{lab}]')
        ch_labels.append(f'[{lab}]')
    # ---- Act 6: the voice ----
    tp, idx = m['tamm']; ph = phrases(tp, '-35dB', 0.08)
    if len(ph) > idx:
        start = T_TAMM - (ph[idx][0] - ph[0][0])
        i = inp(tp); chains.append(f'[{i}:a]atrim={ph[0][0]:.3f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume={-15 - rms_db(tp):.2f}dB,{VOCHAIN},adelay={int(start*1000)}|{int(start*1000)}[vt]'); vo_labels.append('[vt]')
        print(f'{v}: «tamm» take starts at {start:.2f} s, its 2nd phrase lands on {T_TAMM}')
    for key, at in (('line', T_LINE), ('cta', T_CTA)):
        p = os.path.join(VO, m[key])
        if not os.path.exists(p): print('missing (skipped):', m[key]); continue
        i = inp(p); lab = f'v{key}'
        chains.append(f'[{i}:a]silenceremove=start_periods=1:start_threshold=-45dB,aresample=48000,aformat=channel_layouts=stereo,volume={-15.5 - rms_db(p):.2f}dB,{VOCHAIN},adelay={int(at*1000)}|{int(at*1000)}[{lab}]')
        vo_labels.append(f'[{lab}]')
    g = chains[:]
    g.append(''.join(ch_labels) + f'amix=inputs={len(ch_labels)}:normalize=0:duration=longest,atrim=0:{T_FREEZE},afade=t=out:st={T_FREEZE - 0.012}:d=0.012,apad=whole_dur={DUR}[talk]' if ch_labels else f'anullsrc=r=48000:cl=stereo,atrim=0:{DUR}[talk]')
    g.append(''.join(vo_labels) + f'amix=inputs={len(vo_labels)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]')
    g += ['[vo]asplit=2[key][vin]', '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-2.5[mus]',
          '[mus][key]sidechaincompress=threshold=0.05:ratio=4:attack=8:release=260[duck]',
          f'[duck][talk][vin]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
    pre = os.path.join(D, f'TheDot_{v}_premaster.wav'); mas = os.path.join(D, f'TheDot_{v}_master.wav')
    r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
    if r.returncode: sys.exit(r.stderr)
    js = json.loads(re.findall(r'\{[^{}]*\}', run('ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.6:LRA=11:print_format=json', '-f', 'null', '-').stderr)[-1])
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1.6:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', mas)
    out = os.path.join(D, f'SayTamm_TheDot_Day14_{v.upper()}_28s_9x16.mp4')
    r = run('ffmpeg', '-y', '-v', 'error', '-i', picture, '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
    if r.returncode: sys.exit(r.stderr)
    print('wrote', out)

for v in (['ar', 'en'] if (sys.argv[1:] or ['both'])[0] == 'both' else [sys.argv[1]]):
    master(v)
