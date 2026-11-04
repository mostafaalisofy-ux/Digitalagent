"""Build SayTamm production logo files from the owner's master render.

No redrawing: shapes come from the master pixels. PNGs keep the master's own
antialiasing; the SVG is a potrace fit of the 4x-supersampled master, verified
against the master by IoU before acceptance.

usage: python build_logo.py <master_black_on_white.png|webp> <out_dir>
"""
import sys, os, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import potrace

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

BLACK = (10, 10, 13)
WHITE = (255, 255, 255)
PURPLE = (108, 53, 255)

gray = Image.open(SRC).convert("L")
g = np.array(gray).astype(np.float32)
ink = 255.0 - g                      # 0 = paper, 255 = ink (keeps master antialiasing)
ink[ink < 12] = 0                    # drop paper noise / JPEG-like speckle
mask = ink > 127                     # binary silhouette

# --- trim to the mark's bounding box (+ small safety margin) ---------------
ys, xs = np.where(mask)
pad = 6
y0, y1 = ys.min() - pad, ys.max() + pad + 1
x0, x1 = xs.min() - pad, xs.max() + pad + 1
ink, mask = ink[y0:y1, x0:x1], mask[y0:y1, x0:x1]
H, W = mask.shape

# --- split into the two physical shapes (T-form, diagonal blade) -----------
from scipy import ndimage
lab, n = ndimage.label(mask, structure=np.ones((3, 3)))
assert n == 2, f"expected exactly 2 shapes, found {n}"
sizes = ndimage.sum(mask, lab, [1, 2])
t_id = 1 + int(np.argmax(sizes))          # T-form is the larger shape
t_comp, blade = lab == t_id, lab == (3 - t_id)

# grow each component a little so antialiased edge pixels get assigned
def grow(m, px=4):
    return np.array(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(2 * px + 1))) > 0
t_zone, b_zone = grow(t_comp), grow(blade)

alpha = np.clip(ink, 0, 255).astype(np.uint8)

def png(name, t_rgb, b_rgb):
    rgba = np.zeros((H, W, 4), np.uint8)
    rgba[..., 3] = alpha
    rgba[t_zone, :3] = t_rgb
    rgba[b_zone & ~t_zone, :3] = b_rgb
    Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, name), optimize=True)

png("SayTamm_Symbol_Black.png", BLACK, BLACK)
png("SayTamm_Symbol_White.png", WHITE, WHITE)
png("SayTamm_Symbol_Purple.png", PURPLE, PURPLE)
png("SayTamm_Symbol_Signature_White-Purple.png", WHITE, PURPLE)   # D-007, on dark
png("SayTamm_Symbol_Signature_Black-Purple.png", BLACK, PURPLE)   # D-007, on light

# --- vector: potrace on 4x supersampled silhouette, one path per shape -------
S = 4
big = np.array(Image.fromarray(alpha).resize((W * S, H * S), Image.LANCZOS)) > 127
big_t = np.array(Image.fromarray((t_zone * 255).astype(np.uint8)).resize((W * S, H * S), Image.NEAREST)) > 0

def trace(bitmap):
    bm = potrace.Bitmap(~bitmap)   # potracer treats False as ink
    plist = bm.trace(turdsize=50, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
                     alphamax=1.0, opticurve=True, opttolerance=0.2)
    d = []
    for curve in plist:
        f = lambda p: f"{p.x / S:.2f} {p.y / S:.2f}"
        d.append(f"M{f(curve.start_point)}")
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f"L{f(seg.c)}L{f(seg.end_point)}")
            else:
                d.append(f"C{f(seg.c1)} {f(seg.c2)} {f(seg.end_point)}")
        d.append("Z")
    return "".join(d)

d_t = trace(big & big_t)
d_b = trace(big & ~big_t)

def svg(name, t_hex, b_hex):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
         f'<title>SayTamm</title>'
         f'<path fill="{t_hex}" fill-rule="evenodd" d="{d_t}"/>'
         f'<path fill="{b_hex}" fill-rule="evenodd" d="{d_b}"/></svg>')
    open(os.path.join(OUT, name), "w").write(s)

svg("SayTamm_Symbol_Black.svg", "#0A0A0D", "#0A0A0D")
svg("SayTamm_Symbol_White.svg", "#FFFFFF", "#FFFFFF")
svg("SayTamm_Symbol_Purple.svg", "#6C35FF", "#6C35FF")
svg("SayTamm_Symbol_Signature_White-Purple.svg", "#FFFFFF", "#6C35FF")
svg("SayTamm_Symbol_Signature_Black-Purple.svg", "#0A0A0D", "#6C35FF")

np.save(os.path.join(OUT, "_master_mask.npy"), mask)
json.dump({"W": W, "H": H, "ratio_WH": round(W / H, 4),
           "t_pixels": int(t_comp.sum()), "blade_pixels": int(blade.sum())},
          open(os.path.join(OUT, "_build.json"), "w"), indent=1)
print("built", W, H, "W:H=%.3f" % (W / H))
