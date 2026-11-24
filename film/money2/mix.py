#!/usr/bin/env python3
"""Mix «قاموس الفلوس» v2: the episode's voice-over (ElevenLabs "Rawi", MSA, one take) at +0.4 s, «قول… تم» in Gulf Arabic on the end card,
the score ducked under the voice; -14 LUFS integrated, under -1 dBTP after AAC. Usage (repo root): python3 film/money2/mix.py 1"""
import os, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); D = os.path.join(ROOT, 'handover/launch-film/money')
EP = int(sys.argv[1]) if len(sys.argv) > 1 else 1
SET = {1: dict(name='ROAS', vo_at=0.4, gulf_at=15.9, dur=20.0)}[EP]
VO, GULF = os.path.join(D, f'vo/ep{EP}.mp3'), os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
VOC = 'highpass=f=80,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.3,acompressor=threshold=-22dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
v, gd, DUR = int(SET['vo_at'] * 1000), int(SET['gulf_at'] * 1000), SET['dur']
g = [f'[1:a]aresample=48000,aformat=channel_layouts=stereo,volume=1.0,{VOC},adelay={v}|{v}[a]',
     f'[2:a]atrim=0.06:1.94,asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st=1.83:d=0.05,aresample=48000,aformat=channel_layouts=stereo,volume=1.2,{VOC},adelay={gd}|{gd}[b]',
     f'[a][b]amix=inputs=2:normalize=0:duration=longest,apad=whole_dur={DUR}[vo]', '[vo]asplit=2[key][vin]',
     '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]', '[mus][key]sidechaincompress=threshold=0.035:ratio=6:attack=6:release=260[duck]',
     f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas = os.path.join(D, f'Money2_ep{EP}_premaster.wav'), os.path.join(D, f'Money2_ep{EP}_master.wav')
out = os.path.join(D, f'SayTamm_QamoosElFlous_v2_{EP:02d}_{SET["name"]}_AR_9x16.mp4')
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, f'Money2_ep{EP}_Score.wav'), '-i', VO, '-i', GULF, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
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
