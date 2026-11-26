#!/usr/bin/env bash
# «قالوا لك…»: for each episode (default: all in episodes.json) the score, the picture on 4 workers (frame-count guard + retry), then the mix.
# Usage (repo root): bash film/tammseries/render_parallel.sh [ep1 ep2 ep3 ep4]
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/tammseries; R=film/tammseries/render.mjs
SECS=${*:-$(python3 -c "import json;print(' '.join(json.load(open('film/tammseries/episodes.json'))))")}
L=${EP_LANG:-ar}; export EP_LANG=$L
for S0 in $SECS; do
  export EPISODE=$S0; S=$S0$([ "$L" = en ] && echo en || true)
  node $R --audio-only
  pids=(); for k in 0 1 2 3; do node $R --part $k --parts 4 > "$OUT/_p_${S}_$k.log" 2>&1 & pids+=($!); done
  for k in 0 1 2 3; do
    wait "${pids[$k]}" && continue
    for try in 1 2; do echo "RETRY $S part $k"; node $R --part $k --parts 4 > "$OUT/_p_${S}_$k.log" 2>&1 && continue 2; done
    echo "FAILED $S part $k"; exit 1
  done
  for k in 0 1 2 3; do echo "file '_part${S}_$k.mp4'"; done > "$OUT/_parts.txt"
  ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts.txt" -c copy "$OUT/${S}_picture.mp4"
  rm -f "$OUT"/_part${S}_*.mp4 "$OUT/_parts.txt" "$OUT"/_p_${S}_*.log
  python3 film/tammseries/mix.py $S0 $L
done
echo ALL_DONE
