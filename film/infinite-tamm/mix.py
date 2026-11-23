#!/usr/bin/env python3
"""Mix the voiceover into Infinite Tamm and master it (-14 LUFS, -1 dBTP), reusing the Dictionary takes.
Usage (repo root): python3 film/infinite-tamm/mix.py"""
import json, math, os, re, struct, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/infinite')
VO = os.path.join(ROOT, 'handover/launch-film/dictionary/vo')
FILM = os.path.join(D, 'InfiniteTamm_picture.mp4')
SCORE = os.path.join(D, 'InfiniteTamm_Score.wav')
CUES = [  # (take, start seconds, options)
    ('EG_01_eetebro_hasal_takeB.mp3', 6.85, {}),   # Cairo: «اعتبره… حصل.»
    ('SA_01_qul_tamm.mp3', 23.45, {}),             # Riyadh: «قول… تم.»
    ('EN_01_consider_takeA.mp3', 32.0, {}),        # everywhere: "Consider it done."
    ('SA_05_tamm_takeA.mp3', 40.3, {}),            # «تم.» as the card lands
    ('EN_06_tagline.mp3', 41.55, {}),              # "Say it. Tamm it."
    ('SA_06_qul_tamm_close.mp3', 43.05, {}),       # «قول. تم.» (ends before the loop point)
]
def rms_db(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    s = struct.unpack('<%dh' % (len(raw) // 2), raw); fr = [sum(x * x for x in s[i:i + 160]) / 160 for i in range(0, len(s) - 160, 160)]
    loud = [f for f in fr if 20 * math.log10(math.sqrt(f) / 32768 + 1e-9) > -45]
    return 10 * math.log10(sum(loud) / len(loud) / 32768 ** 2)
inputs, chains = ['-i', SCORE], []
for i, (f, at, _) in enumerate(CUES):
    p = os.path.join(VO, f); inputs += ['-i', p]
    chains.append(f'[{i+1}:a]aresample=48000,aformat=channel_layouts=stereo,volume={-15 - rms_db(p):.2f}dB,highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2.5,adelay={int(at*1000)}|{int(at*1000)}[v{i}]')
n = len(CUES)
graph = ';'.join(chains + [''.join(f'[v{i}]' for i in range(n)) + f'amix=inputs={n}:normalize=0:duration=longest,apad=whole_dur=45[vo]',
    '[vo]asplit=2[key][vin]', '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]',
    '[mus][key]sidechaincompress=threshold=0.05:ratio=3:attack=10:release=320[duck]',
    '[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:45[out]'])
pre = os.path.join(D, 'InfiniteTamm_premaster.wav'); master = os.path.join(D, 'InfiniteTamm_master.wav')
subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', graph, '-map', '[out]', pre], check=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1:LRA=9:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
js = json.loads(re.findall(r'\{[^{}]*\}', m)[-1])
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1:LRA=9:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', master], check=True)
out = os.path.join(D, 'SayTamm_InfiniteTamm_45s_9x16_LOOP.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', FILM, '-i', master, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out], check=True)
print('wrote', out)
