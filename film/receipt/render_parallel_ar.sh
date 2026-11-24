#!/usr/bin/env bash
# «الإيصال», Arabic cut (9:16): score, then picture on 4 workers (frame-count guard + retry). Then: python3 film/receipt/mix_ar.py
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/receipt; R=film/receipt/render.mjs
node $R --ar --audio-only
pids=(); for k in 0 1 2 3; do node $R --ar --part $k --parts 4 > "$OUT/_pa_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY part $k"; node $R --ar --part $k --parts 4 > "$OUT/_pa_$k.log" 2>&1 && continue 2; done
  echo "FAILED part $k"; exit 1
done
printf "file '_part_ar_0.mp4'\nfile '_part_ar_1.mp4'\nfile '_part_ar_2.mp4'\nfile '_part_ar_3.mp4'\n" > "$OUT/_parts_ar.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts_ar.txt" -c copy "$OUT/Receipt_ar_picture.mp4"
rm -f "$OUT"/_part_ar_*.mp4 "$OUT/_parts_ar.txt" "$OUT"/_pa_*.log
echo PICTURE_DONE
