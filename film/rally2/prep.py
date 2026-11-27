#!/usr/bin/env python3
"""«The Rally» v2 footage → 30 fps 1080×1080 frames in handover/launch-film/rally2/seq/<id>/.
Plain shots: JPEG, graded a little darker and cooler. Green-screen phone shots (`"key": true`): the green is keyed out to an
RGBA WebP per frame (despilled), and the screen's four corners are tracked per frame into quad.json, so the film can draw the
phone UI into the screen and lay the real hand back on top. Stock: Pexels (free licence), hands only, no faces.
Usage (repo root): python3 film/rally2/prep.py [id ...]"""
import json, os, subprocess, sys
import numpy as np, cv2
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
BASE = os.path.join(ROOT, 'handover/launch-film/rally2'); SEQ = os.path.join(BASE, 'seq')
SHOTS = json.load(open(os.path.join(os.path.dirname(__file__), 'shots.json')))


def order(pts):
    """TL, TR, BR, BL from four points."""
    pts = np.array(pts, dtype=np.float32); s = pts.sum(1); d = np.diff(pts, axis=1).ravel()
    return np.array([pts[np.argmin(s)], pts[np.argmin(d)], pts[np.argmax(s)], pts[np.argmax(d)]])


def key_frame(path):
    bgr = cv2.imread(path); hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    b, g, r = [bgr[..., i].astype(np.int16) for i in range(3)]
    green = g - np.maximum(r, b)                                          # how much greener than the other two
    # the screen is a bright, saturated green: much brighter than foliage, so trees in the background are left alone
    hard = ((hsv[..., 0] > 32) & (hsv[..., 0] < 88) & (hsv[..., 1] > 110) & (hsv[..., 2] > 140) & (green > 45)).astype(np.uint8) * 255
    hard = cv2.morphologyEx(hard, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lab, stats, _ = cv2.connectedComponentsWithStats(hard)
    if n < 2: return None, None
    # the screen: the biggest bright component that is roughly a filled rectangle
    best, score = 0, 0
    for i in range(1, n):
        x, y, w, h, a = stats[i]; fill = a / max(1, w * h)
        if a > 20000 and fill > 0.6 and a * fill > score: best, score = i, a * fill
    if not best: return None, None
    screen = (lab == best).astype(np.uint8) * 255
    screen = cv2.morphologyEx(screen, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    cs, _ = cv2.findContours(screen, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE); c = max(cs, key=cv2.contourArea)
    hull = cv2.convexHull(c); quad = None
    for eps in (0.01, 0.02, 0.03, 0.05, 0.08):
        ap = cv2.approxPolyDP(hull, eps * cv2.arcLength(hull, True), True)
        if len(ap) == 4: quad = order(ap.reshape(4, 2)); break
    if quad is None: quad = order(cv2.boxPoints(cv2.minAreaRect(c)))
    # soft matte: anything clearly green goes transparent, with a short ramp at the edges; then despill what stays
    soft = np.clip((green.astype(np.float32) - 18) / 40, 0, 1)
    soft = np.where(cv2.dilate(screen, np.ones((7, 7), np.uint8)) > 0, soft, 0)
    alpha = (255 * (1 - soft)).astype(np.uint8)
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB).astype(np.int16)
    rgb[..., 1] = np.where(green > 0, np.minimum(rgb[..., 1], np.maximum(rgb[..., 0], rgb[..., 2]) + 6), rgb[..., 1])
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), alpha]), 'RGBA'), quad.tolist()


for s in SHOTS:
    if sys.argv[1:] and s['id'] not in sys.argv[1:]: continue
    d = os.path.join(SEQ, s['id']); os.makedirs(d, exist_ok=True)
    for f in os.listdir(d): os.remove(os.path.join(d, f))
    z, cx, cy = s.get('zoom', 1.0), s.get('cx', 0.5), s.get('cy', 0.5)
    side = int(round(1080 * z))
    vf = (f"fps=30,scale='if(gt(iw,ih),-2,{side})':'if(gt(iw,ih),{side},-2)',"
          f"crop=1080:1080:(iw-1080)*{cx}:(ih-1080)*{cy}")
    if s.get('hflip'): vf += ',hflip'
    if not s.get('key'): vf += ',eq=contrast=1.06:brightness=-0.02:saturation=0.82,colorbalance=bs=0.03:bm=0.02'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s['in']), '-t', str(s['len'] + 0.12), '-i', os.path.normpath(os.path.join(BASE, 'stock', s['file'])),
                    '-vf', vf, '-q:v', '2', os.path.join(d, '%03d.jpg')], check=True)
    if s.get('key'):
        quads = []
        for f in sorted(os.listdir(d)):
            p = os.path.join(d, f); im, q = key_frame(p)
            if im is None: im = Image.open(p).convert('RGBA'); q = quads[-1] if quads else [[0, 0], [1, 0], [1, 1], [0, 1]]
            im.save(p.replace('.jpg', '.webp'), 'WEBP', quality=92, method=4); os.remove(p); quads.append(q)
        # steady the corners: a centred 5-frame average per coordinate
        Q = np.array(quads, dtype=np.float32); S = Q.copy()
        for i in range(len(Q)): S[i] = Q[max(0, i - 2):i + 3].mean(0)
        json.dump(S.round(1).tolist(), open(os.path.join(d, 'quad.json'), 'w'))
    print(s['id'], len([f for f in os.listdir(d) if not f.endswith('.json')]))
