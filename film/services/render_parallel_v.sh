#!/usr/bin/env bash
# SayTamm services film, vertical cut (9:16): picture on 4 workers (the score is shared with the 16:9 film). Then: python3 film/services/mix.py --vertical
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/services; R=film/services/render.mjs
[ -f "$OUT/Services_Score.wav" ] || node $R --audio-only
pids=(); for k in 0 1 2 3; do node $R --vertical --part $k --parts 4 > "$OUT/_pv_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY part $k"; node $R --vertical --part $k --parts 4 > "$OUT/_pv_$k.log" 2>&1 && continue 2; done
  echo "FAILED part $k"; exit 1
done
printf "file '_part_env_0.mp4'\nfile '_part_env_1.mp4'\nfile '_part_env_2.mp4'\nfile '_part_env_3.mp4'\n" > "$OUT/_parts_v.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts_v.txt" -c copy "$OUT/Services_v_picture.mp4"
rm -f "$OUT"/_part_env_*.mp4 "$OUT/_parts_v.txt" "$OUT"/_pv_*.log
echo PICTURE_DONE
