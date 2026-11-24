#!/usr/bin/env bash
# The Ratio v5 (Arabic, for store owners): render the picture natively at the fast pace, on 4 workers.
# Usage (repo root): python3 film/roas/plate5.py && bash film/roas/render5_parallel.sh && python3 film/roas/mix5.py
# The score is Ratio3_Score.wav (node film/roas/render2.mjs --variant ar --audio-only --speed 1.35 --hold 36.5).
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/roas; R=film/roas/render5.mjs; V=ar
pids=(); for k in 0 1 2 3; do node $R --variant $V --part $k --parts 4 > "$OUT/_p5_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY part $k"; node $R --variant $V --part $k --parts 4 > "$OUT/_p5_$k.log" 2>&1 && continue 2; done
  echo "FAILED part $k"; exit 1
done
printf "file '_part5_${V}_0.mp4'\nfile '_part5_${V}_1.mp4'\nfile '_part5_${V}_2.mp4'\nfile '_part5_${V}_3.mp4'\n" > "$OUT/_parts5.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts5.txt" -c copy "$OUT/Ratio5_${V}_picture.mp4"
rm -f "$OUT"/_part5_${V}_*.mp4 "$OUT/_parts5.txt" "$OUT"/_p5_*.log
echo PICTURE_DONE
