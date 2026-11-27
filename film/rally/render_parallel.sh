#!/usr/bin/env bash
# «The Rally»: the score, the picture on 4 workers (frame-count guard + retry), then the mix.
# Usage (repo root): bash film/rally/render_parallel.sh 
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/rally; R=film/rally/render.mjs
V=11
[ -f "$OUT/Rally_Score.wav" ] || node $R --audio-only
pids=(); for k in 0 1 2 3; do node $R --part $k --parts 4 > "$OUT/_p_${V}_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY $V part $k"; node $R --part $k --parts 4 > "$OUT/_p_${V}_$k.log" 2>&1 && continue 2; done
  echo "FAILED $V part $k"; exit 1
done
for k in 0 1 2 3; do echo "file '_part${V}_$k.mp4'"; done > "$OUT/_parts.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts.txt" -c copy "$OUT/Rally_picture.mp4"
rm -f "$OUT"/_part${V}_*.mp4 "$OUT/_parts.txt" "$OUT"/_p_${V}_*.log
python3 film/rally/mix.py
echo ALL_DONE
