#!/usr/bin/env python3
"""Mix the new voiceover into Infinite Tamm v2 (128 BPM, 10 worlds) and master it (-14 LUFS, -1 dBTP).
Each line lands on a world's downbeat. Usage (repo root): python3 film/infinite-tamm/mix2.py"""
import json, math, os, re, struct, subprocess, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
D = os.path.join(ROOT, 'handover/launch-film/infinite')
VO = os.path.join(D, 'vo2')
FILM = os.path.join(D, 'InfiniteTamm_v2_picture.mp4')
SCORE = os.path.join(D, 'InfiniteTamm_v2_Score.wav')
BAR = 4 * 60 / 128; home = lambda k: BAR + 2 * BAR * k   # world k lands on this downbeat
CUES = [  # (take, start seconds, options)
    ('SA_hook.mp3', 0.2, {}),                # «عندك فكرة؟» (Saudi)
    ('EG_hook.mp3', home(1) - 0.08, {}),     # «عايزها توصل؟» (Egyptian), the post goes live
    ('EN_hook.mp3', home(2) - 0.08, {}),     # "Want it everywhere?", the café
    ('EG_call.mp3', home(3) - 0.05, {}),     # «اعتبره… حصل!», Cairo façade
    ('SA_call.mp3', home(4) - 0.05, {}),     # «قول… تم!», Riyadh
    ('EN_call.mp3', home(5) - 0.05, {}),     # "Consider it… DONE!", the map
    ('SA_tamm.mp3', home(7) + 0.02, {}),     # «تم!», the brief is stamped
    ('SA_tamm.mp3', home(9) + 0.02, {}),     # «تم!», the word wall
    ('EN_tag.mp3', home(10) + 1.25, {}),     # "Say it. Tamm it." as the card dresses
    ('SA_tag.mp3', home(10) + 3.2, {}),      # «قول. تم.» (ends before the loop point)
]
def rms_db(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    s = struct.unpack('<%dh' % (len(raw) // 2), raw); fr = [sum(x * x for x in s[i:i + 160]) / 160 for i in range(0, len(s) - 160, 160)]
    loud = [f for f in fr if 20 * math.log10(math.sqrt(f) / 32768 + 1e-9) > -45]
    return 10 * math.log10(sum(loud) / len(loud) / 32768 ** 2)
inputs, chains = ['-i', SCORE], []
for i, (f, at, _) in enumerate(CUES):
    p = os.path.join(VO, f); inputs += ['-i', p]
    chains.append(f'[{i+1}:a]aresample=48000,aformat=channel_layouts=stereo,silenceremove=start_periods=1:start_threshold=-45dB,volume={-15 - rms_db(p):.2f}dB,highpass=f=90,equalizer=f=220:t=q:w=1.2:g=-2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=4:release=90:makeup=2,equalizer=f=3200:t=q:w=1.0:g=2.5,adelay={int(at*1000)}|{int(at*1000)}[v{i}]')
n = len(CUES)
graph = ';'.join(chains + [''.join(f'[v{i}]' for i in range(n)) + f'amix=inputs={n}:normalize=0:duration=longest,apad=whole_dur=45[vo]',
    '[vo]asplit=2[key][vin]', '[0:a]aresample=48000,volume=-3dB,equalizer=f=2500:t=q:w=1.2:g=-3[mus]',
    '[mus][key]sidechaincompress=threshold=0.05:ratio=4:attack=8:release=260[duck]',
    '[duck][vin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:level=false,atrim=0:45[out]'])
pre = os.path.join(D, 'InfiniteTamm_v2_premaster.wav'); master = os.path.join(D, 'InfiniteTamm_v2_master.wav')
subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', graph, '-map', '[out]', pre], check=True)
m = subprocess.run(['ffmpeg', '-hide_banner', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.6:LRA=9:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
js = json.loads(re.findall(r'\{[^{}]*\}', m)[-1])
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', pre, '-af', f"loudnorm=I=-14:TP=-1.6:LRA=9:measured_I={js['input_i']}:measured_TP={js['input_tp']}:measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,aresample=48000", '-ar', '48000', master], check=True)
out = os.path.join(D, 'SayTamm_InfiniteTamm_v2_45s_9x16_LOOP.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', FILM, '-i', master, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '320k', '-shortest', '-movflags', '+faststart', out], check=True)
print('wrote', out)
