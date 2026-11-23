#!/usr/bin/env bash
# Render One Push (Arabic and English masters) on 4 workers each. Then: python3 film/one-push/mix.py
# Usage (repo root): bash film/one-push/render_parallel.sh [ar|en|both]
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/one-push; R=film/one-push/render.mjs; WHICH=${1:-both}
node $R --variant ar --audio-only
for V in ar en; do
  [[ "$WHICH" == both || "$WHICH" == "$V" ]] || continue
  pids=(); for k in 0 1 2 3; do node $R --variant $V --part $k --parts 4 > "$OUT/_p_${V}_$k.log" 2>&1 & pids+=($!); done
  for p in "${pids[@]}"; do wait "$p"; done
  printf "file '_part_${V}_0.mp4'\nfile '_part_${V}_1.mp4'\nfile '_part_${V}_2.mp4'\nfile '_part_${V}_3.mp4'\n" > "$OUT/_parts_$V.txt"
  ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts_$V.txt" -c copy "$OUT/OnePush_${V}_picture.mp4"
  rm -f "$OUT"/_part_${V}_*.mp4 "$OUT/_parts_$V.txt" "$OUT"/_p_${V}_*.log
  echo "PICTURE_DONE $V"
done
