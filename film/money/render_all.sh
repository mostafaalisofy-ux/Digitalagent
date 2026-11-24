#!/usr/bin/env bash
# «قاموس الفلوس»: scores, then the four episodes' pictures in parallel (frame-count guard + one retry), then the mix.
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/money; R=film/money/render.mjs
for e in 1 2 3 4; do node $R --ep $e --audio-only; done
pids=(); for e in 1 2 3 4; do node $R --ep $e > "$OUT/_r_$e.log" 2>&1 & pids+=($!); done
for i in 0 1 2 3; do e=$((i + 1)); wait "${pids[$i]}" || { echo "RETRY ep $e"; node $R --ep $e > "$OUT/_r_$e.log" 2>&1 || { echo "FAILED ep $e"; exit 1; }; }; done
rm -f "$OUT"/_r_*.log
python3 film/money/mix.py
echo ALL_DONE
