#!/usr/bin/env bash
# Render the v2 film on 4 workers in parallel, join the slices, add the music, then mix and master the VO.
# Usage (repo root): bash film/launch-45s/production/dictionary/render_v2_parallel.sh
set -euo pipefail
cd "$(dirname "$0")/../../../.."
OUT=handover/launch-film/dictionary; N=4
[ -f "$OUT/SayTamm_Launch_Dictionary_v2_Sound.wav" ] || { echo "music WAV missing: run render_v2.mjs once without --part"; exit 1; }
pids=()
for k in $(seq 0 $((N-1))); do node film/launch-45s/production/dictionary/render_v2.mjs --part $k --parts $N > "$OUT/_part$k.log" 2>&1 & pids+=($!); done
for p in "${pids[@]}"; do wait "$p"; done
: > "$OUT/_parts.txt"; for k in $(seq 0 $((N-1))); do echo "file '_v2_part$k.mp4'" >> "$OUT/_parts.txt"; done
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts.txt" -i "$OUT/SayTamm_Launch_Dictionary_v2_Sound.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "$OUT/SayTamm_Launch_Dictionary_v2_45s_9x16_music.mp4"
python3 film/launch-45s/production/dictionary/mix_vo.py --v2
rm -f "$OUT"/_v2_part*.mp4 "$OUT/_parts.txt" "$OUT"/_part*.log
echo DONE
