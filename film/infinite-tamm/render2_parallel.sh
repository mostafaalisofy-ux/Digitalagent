#!/usr/bin/env bash
# Render Infinite Tamm v2 (10 worlds, 128 BPM) on 4 workers and join the picture. Then: python3 film/infinite-tamm/mix2.py
# Usage (repo root): bash film/infinite-tamm/render2_parallel.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/infinite; R=film/infinite-tamm/render.mjs; A="--html film2.html --worlds cafe,facade,riyadh"
node $R $A --audio-only
pids=(); for k in 0 1 2 3; do node $R $A --part $k --parts 4 > "$OUT/_v2p$k.log" 2>&1 & pids+=($!); done
for p in "${pids[@]}"; do wait "$p"; done
printf "file '_part_v2_0.mp4'\nfile '_part_v2_1.mp4'\nfile '_part_v2_2.mp4'\nfile '_part_v2_3.mp4'\n" > "$OUT/_parts_v2.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts_v2.txt" -c copy "$OUT/InfiniteTamm_v2_picture.mp4"
rm -f "$OUT"/_part_v2_*.mp4 "$OUT/_parts_v2.txt" "$OUT"/_v2p*.log
echo PICTURE_DONE
