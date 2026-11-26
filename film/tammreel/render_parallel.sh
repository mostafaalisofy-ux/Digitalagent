#!/usr/bin/env bash
# «قولها… تمّت»: score, then the picture on 4 workers (frame-count guard + retry), then the mix. Usage (repo root): bash film/tammreel/render_parallel.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/tammreel; R=film/tammreel/render.mjs
V=${1:-}; export TR_V=$V   # pass 169 for the 16:9 cut (the score is shared)
[ -z "$V" ] && node $R --audio-only
pids=(); for k in 0 1 2 3; do node $R --part $k --parts 4 > "$OUT/_p_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY part $k"; node $R --part $k --parts 4 > "$OUT/_p_$k.log" 2>&1 && continue 2; done
  echo "FAILED part $k"; exit 1
done
for k in 0 1 2 3; do echo "file '_part${V}_$k.mp4'"; done > "$OUT/_parts.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts.txt" -c copy "$OUT/Tammreel${V}_picture.mp4"
rm -f "$OUT"/_part${V}_*.mp4 "$OUT/_parts.txt" "$OUT"/_p_*.log
python3 film/tammreel/mix.py $V
echo ALL_DONE
