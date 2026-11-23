#!/usr/bin/env python3
"""Mix the ElevenLabs voiceover into The SayTamm Dictionary film.

Each take is levelled (speech RMS), optionally time-tightened (atempo) or cut to one word,
placed so its key word lands on the picture's hit, then mixed over the music, which is
ducked under the voice with a sidechain compressor. Writes the VO film plus VO and music stems.

Usage (repo root): python3 film/launch-45s/production/dictionary/mix_vo.py
"""
import math
import os
import struct
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..'))
D = os.path.join(ROOT, 'handover/launch-film/dictionary')
VO = os.path.join(D, 'vo')
FILM = os.path.join(D, 'SayTamm_Launch_Dictionary_45s_9x16.mp4')
MUSIC = os.path.join(D, 'SayTamm_Launch_Dictionary_Sound.wav')

# (file, place_at_seconds, options)  — place_at is where the clip's first sample goes on the timeline
#   tempo: atempo factor (tightens the pause in a phrase); seg: (start, end) cut inside the take
CUES = [
    ('SA_01_qul_tamm.mp3',            4.00,  {'tempo': 1.10}),        # «تم» lands on the 5.0 slam
    ('SA_02_definition.mp3',          6.20,  {}),                     # with the typed definition
    ('SA_03_reply_takeA.mp3',         9.00,  {}),                     # the reply bubble
    ('EG_01_eetebro_hasal_takeB.mp3', 13.90, {'tempo': 1.20}),        # «حصل» lands on the 15.0 pop
    ('EG_02_definition.mp3',          16.20, {}),                     # «… خلاص، اتعمل» ends as «اتنشر ✓» pops
    ('EG_03_hasal_wink.mp3',          19.68, {}),                     # chuckle, then «حصل» on the 20.5 hop
    ('EN_01_consider_takeA.mp3',      25.03, {}),                     # "done" as the word snaps in at 25.75
    ('EN_02_definition_takeA.mp3',    27.00, {}),
    ('EN_03_reply.mp3',               28.39, {}),
    ('EN_04_three_ways_takeA.mp3',    33.00, {}),
    ('SA_04_meaning_takeA.mp3',       35.05, {}),                     # «والمعنى… واحد.»
    ('SA_05_tamm_takeA.mp3',          37.11, {}),                     # «تم.» as the dots lift (37.2)
    ('EN_05_say_tamm.mp3',            39.20, {'seg': (0.0, 0.72)}),   # "Say"
    ('EN_05_say_tamm.mp3',            39.90, {'seg': (1.40, 2.16)}),  # "Tamm" on the 39.9 hit
    ('EN_06_tagline.mp3',             40.45, {}),                     # "Say it. Tamm it."
    ('SA_06_qul_tamm_close.mp3',      42.35, {}),                     # «قول. تم.» (optional until generated)
]
TARGET_RMS = -15.0  # dBFS, measured over speech only


def speech_rms_db(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    n = len(raw) // 2
    s = struct.unpack('<%dh' % n, raw)
    W = 160
    frames = [sum(x * x for x in s[i:i + W]) / W for i in range(0, n - W, W)]
    loud = [f for f in frames if 20 * math.log10(math.sqrt(f) / 32768 + 1e-9) > -45]
    return 10 * math.log10(sum(loud) / len(loud) / 32768 ** 2) if loud else -60


def main():
    cues = [c for c in CUES if os.path.exists(os.path.join(VO, c[0]))]
    missing = [c[0] for c in CUES if c not in cues]
    if missing:
        print('missing (skipped):', ', '.join(missing))
    inputs, chains = ['-i', MUSIC], []
    for i, (f, at, opt) in enumerate(cues):
        inputs += ['-i', os.path.join(VO, f)]
        gain = TARGET_RMS - speech_rms_db(os.path.join(VO, f))
        ch = f'[{i + 1}:a]aresample=48000,aformat=channel_layouts=stereo'
        if 'seg' in opt:
            a, b = opt['seg']
            ch += f',atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - a - 0.04}:d=0.04'
        if 'tempo' in opt:
            ch += f",atempo={opt['tempo']}"
        ch += f',volume={gain:.2f}dB,highpass=f=80,equalizer=f=3000:t=q:w=1.0:g=2.5,adelay={int(at * 1000)}|{int(at * 1000)}[v{i}]'
        chains.append(ch)
    n = len(cues)
    vo_mix = ''.join(f'[v{i}]' for i in range(n)) + f'amix=inputs={n}:normalize=0:duration=longest,'
    vo_mix += 'acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120:makeup=1.5,apad=whole_dur=45[vo]'
    graph = ';'.join(chains + [vo_mix,
        '[vo]asplit=3[vo_key][vo_mixin][vo_stem]',
        '[0:a]aresample=48000,volume=-2dB,equalizer=f=2500:t=q:w=1.2:g=-3.5[mus]',
        '[mus][vo_key]sidechaincompress=threshold=0.05:ratio=3:attack=10:release=320:makeup=1[duck]',
        '[duck]asplit=2[duck_mix][duck_stem]',
        '[duck_mix][vo_mixin]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.84:attack=3:release=60:level=false,atrim=0:45[out]'])
    out_wav = os.path.join(D, 'SayTamm_Launch_Dictionary_Mix_VO.wav')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', graph,
                    '-map', '[out]', out_wav,
                    '-map', '[vo_stem]', '-t', '45', os.path.join(D, 'SayTamm_Launch_Dictionary_Stem_VO.wav'),
                    '-map', '[duck_stem]', '-t', '45', os.path.join(D, 'SayTamm_Launch_Dictionary_Stem_Music_Ducked.wav')], check=True)
    out_mp4 = os.path.join(D, 'SayTamm_Launch_Dictionary_45s_9x16_VO.mp4')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', FILM, '-i', out_wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', out_mp4], check=True)
    print('wrote', out_mp4)


if __name__ == '__main__':
    sys.exit(main())
