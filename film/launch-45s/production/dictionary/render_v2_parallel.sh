#!/usr/bin/env bash
# Render the v2 film on 4 workers in parallel, join the slices, add the music, then mix and master the VO.
# Usage (repo root): bash film/launch-45s/production/dictionary/render_v2_parallel.sh [main|tiktok]
set -euo pipefail
cd "$(dirname "$0")/../../../.."
V="${1:-main}"; T=""; [ "$V" = "main" ] || T="_$V"
OUT=handover/launch-film/dictionary; N=4
R=film/launch-45s/production/dictionary/render_v2.mjs
node "$R" --variant "$V" --audio-only
pids=()
for k in $(seq 0 $((N-1))); do node "$R" --variant "$V" --part $k --parts $N > "$OUT/_part$T$k.log" 2>&1 & pids+=($!); done
for p in "${pids[@]}"; do wait "$p"; done
: > "$OUT/_parts$T.txt"; for k in $(seq 0 $((N-1))); do echo "file '_v2${T}_part$k.mp4'" >> "$OUT/_parts$T.txt"; done
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts$T.txt" -i "$OUT/SayTamm_Launch_Dictionary_v2${T}_Sound.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "$OUT/SayTamm_Launch_Dictionary_v2${T}_45s_9x16_music.mp4"
python3 film/launch-45s/production/dictionary/mix_vo.py --v2 --variant "$V"
rm -f "$OUT"/_v2${T}_part*.mp4 "$OUT/_parts$T.txt" "$OUT"/_part$T*.log
echo DONE
