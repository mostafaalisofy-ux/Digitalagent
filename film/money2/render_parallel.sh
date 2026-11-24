#!/usr/bin/env bash
# «قاموس الفلوس» v2, one episode: score, then picture on 4 workers (frame-count guard + retry), then the mix. Usage: bash film/money2/render_parallel.sh 1
set -euo pipefail
cd "$(dirname "$0")/../.."
EP=${1:-1}; OUT=handover/launch-film/money; R=film/money2/render.mjs
node $R --ep $EP --audio-only
pids=(); for k in 0 1 2 3; do node $R --ep $EP --part $k --parts 4 > "$OUT/_p2_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY part $k"; node $R --ep $EP --part $k --parts 4 > "$OUT/_p2_$k.log" 2>&1 && continue 2; done
  echo "FAILED part $k"; exit 1
done
printf "file '_part_v2ep${EP}_0.mp4'\nfile '_part_v2ep${EP}_1.mp4'\nfile '_part_v2ep${EP}_2.mp4'\nfile '_part_v2ep${EP}_3.mp4'\n" > "$OUT/_parts2.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts2.txt" -c copy "$OUT/Money2_ep${EP}_picture.mp4"
rm -f "$OUT"/_part_v2ep${EP}_*.mp4 "$OUT/_parts2.txt" "$OUT"/_p2_*.log
python3 film/money2/mix.py $EP
echo ALL_DONE
