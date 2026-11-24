#!/usr/bin/env python3
"""Master the SayTamm showreel v2: the 120 BPM score, with «قول… تم» (Gulf Arabic, the launch films' take) on the lockup.
-14 LUFS integrated, under -1 dBTP after AAC. Usage (repo root): python3 film/reel2/mix.py"""
import json, os, re, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/reel2'); GULF = os.path.join(ROOT, 'handover/launch-film/infinite/vo2/SA_call.mp3')
DUR, T_GULF = 56.0, 53.25
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
AR = 'highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2'
g = [f'[1:a]atrim=0.06:1.94,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,volume=1.3,{AR},adelay={int(T_GULF*1000)}|{int(T_GULF*1000)},apad=whole_dur={DUR}[vo]',
     '[vo]asplit=2[key][vin]', '[0:a]aresample=48000,volume=-1dB[mus]', '[mus][key]sidechaincompress=threshold=0.05:ratio=4:attack=8:release=250[duck]',
     f'[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:{DUR}[out]']
pre, mas, out = os.path.join(D, 'Reel2_premaster.wav'), os.path.join(D, 'Reel2_master.wav'), os.path.join(D, 'SayTamm_Showreel_v2_56s_9x16.mp4')
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'Reel2_Score.wav'), '-i', GULF, '-filter_complex', ';'.join(g), '-map', '[out]', pre)
if r.returncode: sys.exit(r.stderr)
js = json.loads(re.findall(r'\{[^{}]*\}', run('ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.2:LRA=11:print_format=json', '-f', 'null', '-').stderr)[-1])
run('ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1.2:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', mas)
r = run('ffmpeg', '-y', '-v', 'error', '-i', os.path.join(D, 'Reel2_picture.mp4'), '-i', mas, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out)
if r.returncode: sys.exit(r.stderr)
print('wrote', out)
