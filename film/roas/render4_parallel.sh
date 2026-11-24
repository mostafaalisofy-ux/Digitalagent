#!/usr/bin/env bash
# The Ratio v4 (English only, centred layout): render the picture on 4 workers, then make the 1.35x fast cut.
# Usage (repo root): bash film/roas/render4_parallel.sh   then: python3 film/roas/mix4.py
# Needs Ratio2_plate.mp4 (plate2.py) and Ratio3_Score.wav (render2.mjs --audio-only --speed 1.35 --hold 36.5).
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT=handover/launch-film/roas; R=film/roas/render4.mjs; V=en
pids=(); for k in 0 1 2 3; do node $R --variant $V --part $k --parts 4 > "$OUT/_p4_$k.log" 2>&1 & pids+=($!); done
for k in 0 1 2 3; do
  wait "${pids[$k]}" && continue
  for try in 1 2; do echo "RETRY part $k"; node $R --variant $V --part $k --parts 4 > "$OUT/_p4_$k.log" 2>&1 && continue 2; done
  echo "FAILED part $k"; exit 1
done
printf "file '_part4_${V}_0.mp4'\nfile '_part4_${V}_1.mp4'\nfile '_part4_${V}_2.mp4'\nfile '_part4_${V}_3.mp4'\n" > "$OUT/_parts4.txt"
ffmpeg -y -v error -f concat -safe 0 -i "$OUT/_parts4.txt" -c copy "$OUT/Ratio4_${V}_picture_full.mp4"
# fast cut: 1.35x before the lockup (36.5 s), normal speed after; frame blending, not across cuts
ffmpeg -y -v error -i "$OUT/Ratio4_${V}_picture_full.mp4" -filter_complex "[0:v]split[a][b];[a]trim=0:36.5,setpts=(PTS-STARTPTS)/1.35,framerate=fps=60:scene=8[f];[b]trim=36.5:42.5,setpts=PTS-STARTPTS[s];[f][s]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -r 60 -c:v libx264 -preset slow -crf 14 -profile:v high -tune film -pix_fmt yuv420p -an "$OUT/Ratio4_${V}_picture.mp4"
rm -f "$OUT"/_part4_${V}_*.mp4 "$OUT/_parts4.txt" "$OUT"/_p4_*.log
echo PICTURE_DONE
