#!/usr/bin/env bash
# «مدينة الكلمات»: the score, the picture on 4 workers (frame-count guard + retry), then the mix.
# Usage (repo root): bash film/wordcity/render_parallel.sh [169|916]
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/wordcity; R=film/wordcity/render.mjs
export WC_V=${1:-169}; V=$WC_V
[ -f "$OUT/WordCity_Score.wav" ] || node $R --audio-only
pids=(); for k in 0 1 2 3; do node $R --part $k --parts 4 > "$OUT/_p_${V}_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY $V part $k"; node $R --part $k --parts 4 > "$OUT/_p_${V}_$k.log" 2>&1 && continue 2; done
  echo "FAILED $V part $k"; exit 1
done
for k in 0 1 2 3; do echo "file '_part${V}_$k.mp4'"; done > "$OUT/_parts.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts.txt" -c copy "$OUT/WordCity_${V}_picture.mp4"
rm -f "$OUT"/_part${V}_*.mp4 "$OUT/_parts.txt" "$OUT"/_p_${V}_*.log
python3 film/wordcity/mix.py $V
echo ALL_DONE
