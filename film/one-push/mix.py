#!/usr/bin/env python3
"""Mix and master One Push (Arabic and English masters): -14 LUFS integrated, under -1 dBTP after AAC.
Every line is cut from takes already made for the launch films and placed on the machine's beats.
Usage (repo root): python3 film/one-push/mix.py [ar|en|both]"""
import json, math, os, re, struct, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/one-push')
DOT = os.path.join(ROOT, 'handover/launch-film/the-dot/vo'); V2 = os.path.join(ROOT, 'handover/launch-film/infinite/vo2')
SCORE = os.path.join(D, 'OnePush_Score.wav')
DUR, T_WORD, T_STAMP, T_TAG, T_CTA = 22.0, 1.15, 13.5, 17.3, 18.8
# (take, phrase to use (None = all), the phrase whose start is pinned, the time it is pinned to)
CUES = {
    'ar': [(f'{DOT}/AR_cta.mp3', 0, 0, 0.25),         # «عندك هدف؟»
           (f'{V2}/SA_call.mp3', 0, 0, T_WORD + 0.05),  # «قول…» as the word lands
           (f'{V2}/SA_tamm.mp3', None, 0, T_STAMP),     # «تم!» on the stamp
           (f'{V2}/SA_call.mp3', None, 1, T_TAG + 0.45),# «قول… تم!» with the tagline
           (f'{DOT}/AR_cta.mp3', 1, 1, T_CTA + 0.1)],   # «ابدأ من هنا.»
    'en': [(f'{DOT}/EN_cta.mp3', 0, 0, 0.25),         # "Have an objective?"
           (f'{V2}/EN_tag.mp3', 0, 0, T_WORD + 0.05),   # "Say it."
           (f'{V2}/SA_tamm.mp3', None, 0, T_STAMP),     # «تم!»: the brand word, on the stamp
           (f'{V2}/EN_tag.mp3', None, 1, T_TAG + 0.45), # "Say it. Tamm it."
           (f'{DOT}/EN_cta.mp3', 1, 1, T_CTA + 0.1)],   # "Start here."
}
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)

def phrases(p, thresh='-35dB', gap=0.08):
    dur = float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p).stdout)
    err = run('ffmpeg', '-hide_banner', '-i', p, '-af', f'silencedetect=n={thresh}:d={gap}', '-f', 'null', '-').stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    out, cur = [], 0.0
    for a, b in zip(ss, se + [dur] * (len(ss) - len(se))):
        if a - cur > 0.15: out.append((cur, a))
        cur = b
    if dur - cur > 0.15: out.append((cur, dur))
    return out

def rms_db(p, a=0, b=None):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a)] + (['-t', str(b - a)] if b else []) + ['-i', p, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    s = struct.unpack('<%dh' % (len(raw) // 2), raw); fr = [sum(x * x for x in s[i:i + 160]) / 160 for i in range(0, len(s) - 160, 160)]
    loud = [f for f in fr if 20 * math.log10(math.sqrt(f) / 32768 + 1e-9) > -45] or [1]
    return 10 * math.log10(sum(loud) / len(loud) / 32768 ** 2)

VOCHAIN = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2.5'

def master(v):
    inputs, chains, labs = ['-i', SCORE], [], []
    for k, (p, use, pin, at) in enumerate(CUES[v]):
        ph = phrases(p)
        a, b = (ph[0][0], ph[-1][1] + 0.12) if use is None else (ph[use][0], ph[use][1] + 0.12)
        start = at - (ph[pin][0] - a)
        inputs += ['-i', p]; i = len(inputs) // 2 - 1
        chains.append(f'[{i}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=out:st={max(0, b - a - 0.06):.3f}:d=0.06,aresample=48000,aformat=channel_layouts=stereo,'
                      f'volume={-15 - rms_db(p, a, b):.2f}dB,{VOCHAIN},adelay={int(start*1000)}|{int(start*1000)}[v{k}]')
        labs.append(f'[v{k}]'); print(f'{v}: {os.path.basename(p)} phrase {use} at {start:.2f} s')
    g = chains + [''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
                  '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-2.5[mus]', '[mus][key]sidechaincompress=threshold=0.05:ratio=4:attack=8:release=260[duck]',
                  f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
    pre, mas = os.path.join(D, f'OnePush_{v}_premaster.wav'), os.path.join(D, f'OnePush_{v}_master.wav')
    r = run('ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
    if r.returncode: sys.exit(r.stderr)
    js = json.loads(re.findall(r'\{[^{}]*\}', run('ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.6:LRA=11:print_format=json', '-f', 'null', '-').stderr)[-1])
    run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1.6:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', mas)
    out = os.path.join(D, f'SayTamm_OnePush_{v.upper()}_22s_9x16.mp4')
    r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, f'OnePush_{v}_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
    if r.returncode: sys.exit(r.stderr)
    print('wrote', out)

for v in (['ar', 'en'] if (sys.argv[1:] or ['both'])[0] == 'both' else [sys.argv[1]]):
    master(v)
