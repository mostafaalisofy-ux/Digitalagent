#!/usr/bin/env bash
# Render Infinite Tamm on 4 workers, join, add the mastered sound. Usage (repo root): bash film/infinite-tamm/render_parallel.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/infinite; R=film/infinite-tamm/render.mjs; W=cafe,facade,riyadh
node $R --worlds $W --audio-only
pids=(); for k in 0 1 2 3; do node $R --worlds $W --part $k --parts 4 > "$OUT/_p$k.log" 2>&1 & pids+=($!); done
for p in "${pids[@]}"; do wait "$p"; done
printf "file '_part_0.mp4'\nfile '_part_1.mp4'\nfile '_part_2.mp4'\nfile '_part_3.mp4'\n" > "$OUT/_parts.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts.txt" -c copy "$OUT/InfiniteTamm_picture.mp4"
python3 film/infinite-tamm/mix.py
rm -f "$OUT"/_part_*.mp4 "$OUT/_parts.txt" "$OUT"/_p*.log
echo DONE
