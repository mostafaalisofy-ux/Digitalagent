#!/usr/bin/env bash
# Render The Ratio v2 (Arabic and English masters) on 4 workers each, over the footage plate. Then: python3 film/roas/mix2.py
# Usage (repo root): bash film/roas/render_parallel.sh [ar|en|both]   (run python3 film/roas/plate2.py once first)
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/roas; R=film/roas/render2.mjs; WHICH=${1:-both}
node $R --variant ar --audio-only
for V in ar en; do
  [[ "$WHICH" == both || "$WHICH" == "$V" ]] || continue
  pids=(); for k in 0 1 2 3; do node $R --variant $V --part $k --parts 4 > "$OUT/_p_${V}_$k.log" 2>&1 & pids+=($!); done
  for p in "${pids[@]}"; do wait "$p"; done
  printf "file '_part2_${V}_0.mp4'\nfile '_part2_${V}_1.mp4'\nfile '_part2_${V}_2.mp4'\nfile '_part2_${V}_3.mp4'\n" > "$OUT/_parts_$V.txt"
  ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts_$V.txt" -c copy "$OUT/Ratio2_${V}_picture.mp4"
  rm -f "$OUT"/_part2_${V}_*.mp4 "$OUT/_parts_$V.txt" "$OUT"/_p_${V}_*.log
  echo "PICTURE_DONE $V"
done
