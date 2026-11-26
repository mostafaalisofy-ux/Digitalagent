#!/usr/bin/env python3
"""SayTamm company profile, editable PowerPoint (16:9). Every element is native and editable: text boxes, shapes,
pictures (cropped, not flattened, so any picture can be re-cropped or swapped with Change Picture), and the markets
skyline as editable freeform lines. Brand colours and fonts live in the theme (Design > Variants > Colors / Fonts),
so the team can change them in one place. Content comes from the same sources as the HTML profile
(build_profile_v2.py data, services_en.json, cases_en.json, site clients.ts).
Fonts are referenced, never embedded: install Satoshi (licence to confirm) and IBM Plex Sans Arabic before editing.
Usage (repo root): python3 docs/profile/build_profile_pptx.py <out.pptx>"""
import ast, copy, io, json, math, os, re, subprocess, sys, tempfile
from lxml import etree
from PIL import Image
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.dml import MSO_THEME_COLOR as TC
from pptx.opc.constants import RELATIONSHIP_TYPE as RT
from pptx.oxml.ns import qn

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(ROOT, 'handover/profile/assets'); CACHE = os.path.join(ROOT, 'handover/profile/pptx_cache'); os.makedirs(CACHE, exist_ok=True)
OUT = sys.argv[1]

# ---------- content: one source of truth with the HTML profile ----------
SRC = open(os.path.join(HERE, 'build_profile_v2.py'), encoding='utf-8').read()
tree = ast.parse(SRC); D = {}; DIVS = []
for node in ast.walk(tree):
    if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
        try: D[node.targets[0].id] = ast.literal_eval(node.value)
        except Exception: pass
    if isinstance(node, ast.Call) and getattr(node.func, 'id', '') == 'divider':
        DIVS.append([ast.literal_eval(a) for a in node.args])
SVC = json.load(open(os.path.join(HERE, 'services_en.json'), encoding='utf-8'))
CASES = {c['slug']: c for c in json.load(open(os.path.join(HERE, 'cases_en.json'), encoding='utf-8'))}
QS, FACTS, VALUES, STEPS, J, JIMG, WORK, QUOTES, NEXT, SHOW, MOSAIC, WHY, MV, DIMG = (D[k] for k in
    ('QS', 'FACTS', 'VALUES', 'STEPS', 'J', 'JIMG', 'WORK', 'QUOTES', 'NEXT', 'SHOW', 'mosaic', 'WHY', 'MV', 'DIMG'))

# ---------- units: everything in cqw (1 = 1% of slide width), like the HTML ----------
SW, SH = 12192000, 6858000; U = SW / 100; H = 56.25
def E(v): return Emu(int(round(v * U)))
def PT(cq): return Pt(cq * 9.6)
COL = {'ob': TC.DARK_1, 'gr': TC.DARK_2, 'wh': TC.LIGHT_1, 'mu': TC.LIGHT_2, 'pu': TC.ACCENT_1, 'ink': TC.ACCENT_2,
       'line': TC.ACCENT_3, 'li': TC.ACCENT_4, 'gr2': TC.ACCENT_5, 'white': TC.ACCENT_6}
SCHEME = {'ob': 'dk1', 'gr': 'dk2', 'wh': 'lt1', 'mu': 'lt2', 'pu': 'accent1', 'ink': 'accent2', 'line': 'accent3', 'li': 'accent4', 'gr2': 'accent5', 'white': 'accent6'}

prs = Presentation(); prs.slide_width, prs.slide_height = SW, SH
BLANK = prs.slide_layouts[6]

# theme: brand colours and fonts, editable from Design > Variants
theme = prs.slide_master.part.part_related_by(RT.THEME)
th = etree.fromstring(theme.blob); NS = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
cs = th.find('.//a:clrScheme', NS); cs.set('name', 'SayTamm')
for tag, hexv in (('dk1', '09090D'), ('lt1', 'F5F3FA'), ('dk2', '17171E'), ('lt2', '96939F'), ('accent1', '6C35FF'), ('accent2', 'B9A3FF'),
                  ('accent3', '2A2A33'), ('accent4', 'C9C6D2'), ('accent5', '202029'), ('accent6', 'FFFFFF'), ('hlink', 'B9A3FF'), ('folHlink', '96939F')):
    el = cs.find(f'a:{tag}', NS)
    for c in list(el): el.remove(c)
    etree.SubElement(el, qn('a:srgbClr')).set('val', hexv)
fs = th.find('.//a:fontScheme', NS); fs.set('name', 'SayTamm')
for part in ('majorFont', 'minorFont'):
    f = fs.find(f'a:{part}', NS); f.find('a:latin', NS).set('typeface', 'Satoshi'); f.find('a:cs', NS).set('typeface', 'IBM Plex Sans Arabic')
theme._blob = etree.tostring(th, xml_declaration=True, encoding='UTF-8', standalone=True)
# dark deck: background = dk1, default text = lt1 (a new text box is readable straight away)
m = prs.slide_master
cm = m._element.find(qn('p:clrMap'))
for k, v in (('bg1', 'dk1'), ('tx1', 'lt1'), ('bg2', 'dk2'), ('tx2', 'lt2')): cm.set(k, v)
m.background.fill.solid(); m.background.fill.fore_color.theme_color = TC.DARK_1

# ---------- helpers ----------
def _alpha(parent, a):
    if a is not None and a < 1: etree.SubElement(parent, qn('a:alpha')).set('val', str(int(a * 100000)))

def T(sl, x, y, w, h, paras, size=1.2, color='wh', bold=False, head=False, align='l', anchor='t', ls=None, sp=0, caps=False, name=None, before=0):
    """paras: str (\\n = new paragraph) or list of paragraphs; a paragraph is a str or a list of (text, {overrides}) runs."""
    tb = sl.shapes.add_textbox(E(x), E(y), E(w), E(h)); tf = tb.text_frame
    tf.word_wrap = True; tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    if isinstance(paras, str): paras = paras.split('\n')
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = {'l': PP_ALIGN.LEFT, 'c': PP_ALIGN.CENTER, 'r': PP_ALIGN.RIGHT}[align]
        runs = [(para, {})] if isinstance(para, str) else para
        psize = runs[0][1].get('size', size)
        if ls: p.line_spacing = Pt(psize * 9.6 * ls)
        if before and i: p.space_before = PT(before)
        for text, o in runs:
            r = p.add_run(); r.text = text; f = r.font
            s_ = o.get('size', size); f.size = PT(s_); f.bold = o.get('bold', bold)
            f.name = '+mj-lt' if o.get('head', head) else '+mn-lt'
            f.color.theme_color = COL[o.get('color', color)]
            rPr = r._r.get_or_add_rPr()
            spv = o.get('sp', sp)
            if spv: rPr.set('spc', str(int(spv * s_ * 9.6 * 100)))
            if o.get('caps', caps): rPr.set('cap', 'all')
            if o.get('ar'):
                f.name = 'IBM Plex Sans Arabic'; etree.SubElement(rPr, qn('a:cs')).set('typeface', 'IBM Plex Sans Arabic')
                p._p.get_or_add_pPr().set('rtl', '1')
            if o.get('outline'):   # outlined numerals: no fill, coloured outline
                for c in rPr.findall(qn('a:solidFill')): rPr.remove(c)
                ln = etree.Element(qn('a:ln')); ln.set('w', str(int(o.get('ow', 1.2) * 12700)))
                sf = etree.SubElement(ln, qn('a:solidFill')); etree.SubElement(sf, qn('a:schemeClr')).set('val', SCHEME[o['outline']])
                rPr.insert(0, ln); ln.addnext(etree.Element(qn('a:noFill')))
    if name: tb.name = name
    return tb

def R(sl, x, y, w, h, fill='gr', radius=None, line=None, lw=1, alpha=None, name=None, shape=None, rot=0):
    st = shape or (MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE)
    s = sl.shapes.add_shape(st, E(x), E(y), E(w), E(h)); s.shadow.inherit = False
    if radius and st == MSO_SHAPE.ROUNDED_RECTANGLE: s.adjustments[0] = min(.5, radius / min(w, h))
    if fill:
        s.fill.solid(); s.fill.fore_color.theme_color = COL[fill]
        _alpha(s._element.spPr.find(qn('a:solidFill'))[0], alpha)
    else: s.fill.background()
    if line: s.line.color.theme_color = COL[line]; s.line.width = Pt(lw)
    else: s.line.fill.background()
    if rot: s.rotation = rot
    if name: s.name = name
    return s

def grad(s, stops, ang=0):
    """Replace a shape's fill with a linear gradient of dk1 at the given (pos 0–1, alpha 0–1) stops."""
    spPr = s._element.spPr
    for tag in ('a:solidFill', 'a:noFill', 'a:gradFill'):
        for e in spPr.findall(qn(tag)): spPr.remove(e)
    g = etree.Element(qn('a:gradFill')); g.set('rotWithShape', '1'); gl = etree.SubElement(g, qn('a:gsLst'))
    for pos, al in stops:
        gs = etree.SubElement(gl, qn('a:gs')); gs.set('pos', str(int(pos * 100000)))
        c = etree.SubElement(gs, qn('a:schemeClr')); c.set('val', 'dk1'); _alpha(c, al)
    lin = etree.SubElement(g, qn('a:lin')); lin.set('ang', str(int(ang * 60000))); lin.set('scaled', '0')
    spPr.find(qn('a:prstGeom')).addnext(g)

def prep(name, maxpx=1400):
    """Asset name or path → cached JPEG/PNG at a sensible size (pictures stay croppable in PowerPoint)."""
    p = name if os.path.isabs(name) else (os.path.join(A, name + '.png') if os.path.exists(os.path.join(A, name + '.png')) else os.path.join(A, name + '.jpg'))
    im = Image.open(p); alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    key = re.sub(r'[^\w.-]', '_', os.path.relpath(p, ROOT)) + f'_{maxpx}_{int(os.path.getmtime(p))}' + ('.png' if alpha else '.jpg')
    out = os.path.join(CACHE, key)
    if not os.path.exists(out):
        im = im.convert('RGBA' if alpha else 'RGB'); im.thumbnail((maxpx, maxpx), Image.LANCZOS)
        im.save(out, optimize=True) if alpha else im.save(out, quality=84, optimize=True)
    return out

def P(sl, name, x, y, w, h, radius=None, top_only=False, alpha=None, gray=False, maxpx=1400, rot=0, line=None, fit='cover', pname=None):
    path = prep(name, maxpx); iw, ih = Image.open(path).size
    if fit == 'contain':   # logos: keep the whole artwork, centred in the box
        s = min(w / iw, h / ih); nw, nh = iw * s, ih * s; x, y, w, h = x + (w - nw) / 2, y + (h - nh) / 2, nw, nh
    pic = sl.shapes.add_picture(path, E(x), E(y), E(w), E(h))
    if fit == 'cover':
        src, tgt = iw / ih, w / h
        if src > tgt: c = (1 - tgt / src) / 2; pic.crop_left = pic.crop_right = c
        else: c = (1 - src / tgt) / 2; pic.crop_top = pic.crop_bottom = c
    if radius:
        pic.auto_shape_type = MSO_SHAPE.ROUND_2_SAME_RECTANGLE if top_only else MSO_SHAPE.ROUNDED_RECTANGLE
        av = pic._element.spPr.find(qn('a:prstGeom')).find(qn('a:avLst'))
        gd = etree.SubElement(av, qn('a:gd')); gd.set('name', 'adj1' if top_only else 'adj'); gd.set('fmla', f'val {int(min(50000, radius / min(w, h) * 100000))}')
    blip = pic._element.blipFill.find(qn('a:blip'))
    if gray: etree.SubElement(blip, qn('a:grayscl'))
    if alpha is not None: etree.SubElement(blip, qn('a:alphaModFix')).set('amt', str(int(alpha * 100000)))
    if rot: pic.rotation = rot
    if line: pic.line.color.theme_color = COL[line]; pic.line.width = Pt(2)
    pic.name = pname or ('Picture · ' + os.path.basename(str(name)))
    return pic

def line(sl, x1, y1, x2, y2, color='line', w=0.75, name=None):
    c = sl.shapes.add_connector(1, E(x1), E(y1), E(x2), E(y2)); c.line.color.theme_color = COL[color]; c.line.width = Pt(w)
    if name: c.name = name
    return c

def footer(sl, label):
    T(sl, 6.4, 52.7, 40, 1.4, 'SayTamm · Company profile 2026', .9, 'mu', sp=.1, caps=True, name='Footer')
    T(sl, 55, 52.7, 33, 1.4, label, .9, 'mu', sp=.1, caps=True, align='r', name='Footer label')
    tb = T(sl, 89.6, 52.7, 4, 1.4, '', .9, 'wh', align='r', name='Slide number')
    p = tb.text_frame.paragraphs[0]._p
    fld = etree.SubElement(p, qn('a:fld')); fld.set('id', '{B6F15528-21DE-4FAA-801E-634DDDAF4B2B}'); fld.set('type', 'slidenum')
    rp = etree.SubElement(fld, qn('a:rPr')); rp.set('lang', 'en-GB'); rp.set('sz', str(int(.9 * 9.6 * 100)))
    sf = etree.SubElement(rp, qn('a:solidFill')); etree.SubElement(sf, qn('a:schemeClr')).set('val', 'lt1')
    etree.SubElement(rp, qn('a:latin')).set('typeface', '+mn-lt')
    etree.SubElement(fld, qn('a:t')).text = '‹#›'

def new(): return prs.slides.add_slide(BLANK)
def kick(sl, text, x=6.4, y=5.6, w=60): return T(sl, x, y, w, 1.6, text, 1.05, 'mu', bold=True, sp=.18, caps=True, name='Kicker')
LOGO = os.path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.png')
def logo(sl, x=6.4, y=5.2, w=5.4):
    pic = sl.shapes.add_picture(LOGO, E(x), E(y), E(w)); pic.name = 'SayTamm symbol (original file)'; return pic

# ---------- markets skyline: Egypt · Saudi Arabia · UAE, drawn as editable lines ----------
def sky_paths():
    G = 240; out = []
    for x0, ax, ay, x1, rx in ((372, 404, 198, 436, 410), (238, 312, 156, 386, 330), (40, 150, 118, 262, 176)):
        out.append(('fill', f'M{x0},{G} L{ax},{ay} L{x1},{G} Z')); out.append(('l', f'M{ax},{ay} L{rx},{G}'))
    zig = ' '.join(f'M{474 + (y - 92) * 5 / 148:.1f},{y} L{486 - (y + 18 - 92) * 5 / 148:.1f},{y + 18}' for y in range(92, 222, 18))
    out.append(('l', f'M470,{G} L475,92 M490,{G} L485,92 {zig} M475,92 L464,72 L496,72 L485,92 M462,72 V60 H498 V72 M480,60 V30'))
    out.append(('l', f'M598,{G} V118 Q598,64 613,24 Q640,182 667,24 Q682,64 682,118 V{G} M619,56 H661 M619,63 H661 M612,150 H668 M612,190 H668'))
    out.append(('l', f'M718,{G} L734,88 M762,{G} L746,88 M722,200 H758 M727,160 H753 M731,120 H749 M740,70 V28 M706,{G} Q740,214 774,{G}'))
    out.append(('circle', (740, 80, 10, 10)))
    st = [(40, 240), (40, 204), (32, 204), (32, 166), (25, 166), (25, 128), (18, 128), (18, 92), (12, 92), (12, 60), (7, 60), (7, 34), (3, 34), (0, -6)]
    out.append(('l', 'M' + ' L'.join(f'{900 - w},{y}' for w, y in st) + ' L' + ' L'.join(f'{900 + w},{y}' for w, y in st[::-1])))
    sail = lambda t: ((1 - t) ** 2 * 990 + 2 * t * (1 - t) * 1074 + t ** 2 * 1052, (1 - t) ** 2 * 50 + 2 * t * (1 - t) * 96 + t ** 2 * G)
    bars = ''.join(f' M992,{sail(t)[1]:.0f} L{sail(t)[0]:.0f},{sail(t)[1]:.0f}' for t in (.25, .45, .65, .82))
    out.append(('l', f'M986,{G} V40 M990,50 Q1074,96 1052,{G} M990,50 V{G}{bars} M986,74 H968')); out.append(('circle', (962, 74, 9, 3)))
    out.append(('l', f'M1092,{G} V92 H1164 V{G} M1106,{G} V106 H1150 V{G} M1106,99 H1150'))
    out.append(('l', f'M0,{G} H1200'))
    out.append(('route', 'M150,96 Q395,-40 640,8 Q780,-38 900,-26'))
    for x, y in ((150, 96), (640, 8), (900, -26)): out.append(('pin', (x, y, 5, 5)))
    return out

def parse(d):
    """Absolute M/L/H/V/Q/Z path → list of polylines (quadratic curves sampled)."""
    toks = re.findall(r'[MLHVQZ]|-?\d+(?:\.\d+)?', d); i = 0; polys = []; cur = None; x = y = 0; cmd = None
    while i < len(toks):
        t = toks[i]
        if t in 'MLHVQZ': cmd = t; i += 1
        if cmd == 'Z':
            if cur: cur.append(cur[0])
            continue
        if cmd == 'M': x, y = float(toks[i]), float(toks[i + 1]); i += 2; cur = [(x, y)]; polys.append(cur); cmd = 'L'
        elif cmd == 'L': x, y = float(toks[i]), float(toks[i + 1]); i += 2; cur.append((x, y))
        elif cmd == 'H': x = float(toks[i]); i += 1; cur.append((x, y))
        elif cmd == 'V': y = float(toks[i]); i += 1; cur.append((x, y))
        elif cmd == 'Q':
            cx, cy, ex, ey = (float(toks[i + k]) for k in range(4)); i += 4; x0, y0 = x, y
            for k in range(1, 17):
                t_ = k / 16; cur.append(((1 - t_) ** 2 * x0 + 2 * t_ * (1 - t_) * cx + t_ ** 2 * ex, (1 - t_) ** 2 * y0 + 2 * t_ * (1 - t_) * cy + t_ ** 2 * ey))
            x, y = ex, ey
    return polys

def skyline(sl, x, y, w, alpha=.75, name='Markets skyline · Egypt, Saudi Arabia, UAE'):
    s = w / 1200; grp = sl.shapes.add_group_shape(); grp.name = name
    X = lambda v: E(x + v * s); Y = lambda v: E(y + (v + 50) * s)
    for kind, d in sky_paths():
        if kind in ('circle', 'pin'):
            cx, cy, rx, ry = d
            o = grp.shapes.add_shape(MSO_SHAPE.OVAL, X(cx - rx), Y(cy - ry), Emu(int(2 * rx * s * U)), Emu(int(2 * ry * s * U))); o.shadow.inherit = False
            if kind == 'pin': o.fill.solid(); o.fill.fore_color.theme_color = COL['pu']; o.line.fill.background(); o.name = 'Market pin'
            else: o.fill.background(); o.line.color.theme_color = COL['mu']; o.line.width = Pt(1); _alpha(o.line._ln.find(qn('a:solidFill'))[0], alpha)
            continue
        for poly in parse(d):
            b = grp.shapes.build_freeform(X(poly[0][0]), Y(poly[0][1]))
            b.add_line_segments([(X(px), Y(py)) for px, py in poly[1:]], close=False); f = b.convert_to_shape(); f.shadow.inherit = False
            if kind == 'fill': f.fill.solid(); f.fill.fore_color.theme_color = COL['ob']
            else: f.fill.background()
            f.line.color.theme_color = COL['mu']; f.line.width = Pt(1 if kind != 'route' else .9)
            _alpha(f.line._ln.find(qn('a:solidFill'))[0], alpha if kind != 'route' else alpha * .8)
            if kind == 'route':
                pd = etree.SubElement(f.line._ln, qn('a:prstDash')); pd.set('val', 'sysDot'); f.name = 'Route'
    return grp

# ---------- slides ----------
def mosaic(sl, names, alpha=None):
    cx, cy, cw, ch, g = 70, 28.1, 17.25, 18.48, .9; ang = math.radians(-8)
    for i, n in enumerate(names):
        c, r = i % 4, i // 4
        ux = (c - 1.5) * (cw + g); uy = (r - 1) * (ch + g)
        px = cx + ux * math.cos(ang) - uy * math.sin(ang); py = cy + ux * math.sin(ang) + uy * math.cos(ang)
        P(sl, n, px - cw / 2, py - ch / 2, cw, ch, radius=.8, rot=-8, alpha=alpha, maxpx=900, pname=f'Mosaic {i + 1}')
    o = R(sl, 0, 0, 100, H, fill='ob', name='Fade (gradient)'); grad(o, [(0, 1), (.36, 1), (.62, .55), (1, .15)])

def divider(strip, kicktxt, q):
    sl = new()
    one = len(strip) == 1
    if one:
        P(sl, strip[0], 36, 0, 64, H, maxpx=1600, pname='Key visual')
        o = R(sl, 36, 0, 30, H, fill='ob', name='Shade (gradient)'); grad(o, [(0, 1), (.35, .75), (1, 0)])
    else:
        for i, n in enumerate(strip): P(sl, n, i * 20, 0, 20, H, alpha=.28, gray=True, maxpx=900, pname=f'Background {i + 1}')
        o = R(sl, 0, 0, 100, H, fill='ob', name='Shade (gradient)'); grad(o, [(0, .92), (.45, .85), (1, .6)])
    T(sl, 6.4, 0, 44 if one else 78, H, [[(kicktxt, {'size': 1.05, 'color': 'mu', 'bold': True, 'sp': .18, 'caps': True})],
                          [(q, {'size': 7.4, 'bold': True, 'head': True, 'sp': -.04})]], anchor='m', ls=.98, before=1.2, name='Question')
    R(sl, 102.3 - 1.3, 51.6 - 15, 2.6, 30, fill='pu', radius=1.3, rot=45, name='Blade')
    return sl

# 1 cover
sl = new(); mosaic(sl, MOSAIC); logo(sl)
T(sl, 6.4, 22.4, 50, 1.6, 'Company profile · 2026', 1.05, 'mu', bold=True, sp=.18, caps=True, name='Kicker')
T(sl, 6.4, 24.4, 60, 20, [[('Say it.', {})], [('Tamm it.', {'color': 'pu'})]], 10, bold=True, head=True, sp=-.04, ls=.92, name='Title')
T(sl, 6.4, 45.6, 34, 4.6, 'A digital marketing & performance agency built to move brands forward.', 1.6, 'li', ls=1.35, name='Positioning')

# 2 contents
sl = new(); P(sl, 'tamm_key_ar', 0, 0, 100, H, maxpx=1600, pname='Key visual (Tamm)')
T(sl, 53.2, 5.6, 40, 1.6, 'This profile', 1.05, 'mu', bold=True, sp=.18, caps=True, name='Kicker')
T(sl, 53.2, 7.6, 42, 11, [[('Six questions.', {})], [('Straight answers.', {})]], 3.8, bold=True, head=True, sp=-.025, ls=1.02, name='Title')
for i, q in enumerate(QS):
    yy = 18.4 + i * 4.5
    T(sl, 53.2, yy, 3, 4, f'{i + 1:02d}', 1, 'ink', bold=True, anchor='m', name=f'Number {i + 1}')
    T(sl, 56.6, yy, 37, 4, q, 1.9, anchor='m', name=f'Question {i + 1}')
    line(sl, 53.2, yy + 4.1, 93.6, yy + 4.1)
T(sl, 53.2, 46.4, 40, 3, 'Every new client asks the same six questions. This is our answer to each, in order.', 1.35, 'mu', ls=1.4, name='Side note')
footer(sl, 'Contents')

def page_div(i):
    strip = [d for d in DIVS if d[0] == i and len(d) == 2][0][1]; divider(strip, f'Question {i + 1} of 6', f'“{QS[i]}”')

# Q1
page_div(0)
sl = new(); kick(sl, 'Who we are')
T(sl, 6.4, 7.6, 58, 16, 'A digital marketing & performance agency built to move brands forward.', 4.8, bold=True, head=True, sp=-.025, ls=1.02, name='Title')
T(sl, 6.4, 38, 27, 11.6, 'SayTamm brings strategy, creative, media and technology together under one connected approach to growth.', 1.9, anchor='b', ls=1.4, name='Lead')
line(sl, 36.6, 39.4, 65.4, 39.4)
T(sl, 36.6, 41.4, 14, 6, [[('قول تم', {'ar': True, 'color': 'pu', 'bold': True})]], 4.6, anchor='m', name='Name in Arabic')
T(sl, 51.4, 40.6, 14, 9, 'In everyday Gulf Arabic, “qul tamm” is what you hear when a request is as good as done. You tell us the goal; we take responsibility for getting there.',
  1.25, 'li', ls=1.5, name='Name meaning')
P(sl, 'tamm_capcard', 72, 6, 21, 30, radius=1, maxpx=900, pname='Tamm card')
o = R(sl, 72, 26, 21, 10, fill='ob', name='Card shade'); grad(o, [(0, 0), (1, .92)], ang=90)
T(sl, 73.4, 32.6, 18.2, 3, 'Tamm, our character. He says it; the team Tamms it.', 1.05, anchor='b', ls=1.3, name='Card caption')
footer(sl, 'Who we are')

sl = new(); kick(sl, 'Why we started')
T(sl, 6.4, 7.6, 80, 18, WHY, 3.1, ls=1.3, sp=-.01, name='Why we started')
for i, (a, b) in enumerate(MV):
    x = 6.4 + i * 44.6
    R(sl, x, 34.4, 42.6, 15.2, radius=1, name=f'{a} card')
    T(sl, x + 2.2, 36.6, 38, 1.6, a, 1.05, 'ink', bold=True, sp=.14, caps=True, name=a)
    T(sl, x + 2.2, 39.2, 38, 9, b, 1.6, ls=1.45, name=f'{a} text')
footer(sl, 'Why we started')

sl = new(); kick(sl, 'At a glance'); skyline(sl, 17.5, 8.2, 65)
for i, (v, k) in enumerate(FACTS):
    x = 6.4 + i * 22.3; yy = 32
    line(sl, x, yy, x + 20.3, yy)
    T(sl, x, yy + .9, 21, 7, v, 7, 'pu' if i == 0 else 'wh', bold=True, head=True, sp=-.04, ls=.9, name=f'Fact {i + 1}')
    T(sl, x, yy + 7.9, 19, 4, k, 1.2, 'mu', ls=1.3, name=f'Fact {i + 1} label')
T(sl, 6.4, 50.2, 60, 1.6, 'Markets are where the team has delivered work, not office locations.', 1, 'mu', name='Note')
footer(sl, 'At a glance')

sl = new(); kick(sl, 'What we believe')
T(sl, 6.4, 7.6, 70, 12, 'Marketing should move business forward.', 4.8, bold=True, head=True, sp=-.025, ls=1.02, name='Title')
for i, (a, b) in enumerate(VALUES):
    x = 6.4 + i * 17.68
    R(sl, x, 35.6, 16.48, 14, radius=1, name=f'Value card {i + 1}')
    T(sl, x + 1.6, 37.4, 13.3, 3, a, 2, bold=True, head=True, name=f'Value {i + 1}')
    T(sl, x + 1.6, 43.2, 13.3, 5, b, 1.15, 'mu', anchor='b', ls=1.45, name=f'Value {i + 1} text')
footer(sl, 'Philosophy and values')

# Q2
page_div(1)
sl = new(); kick(sl, 'What we do')
T(sl, 6.4, 7.6, 70, 5, [[('Nine services. ', {}), ('One objective.', {'color': 'pu'})]], 3.4, bold=True, head=True, sp=-.025, name='Title')
k = 0
for d in SVC:
    for s_ in d['s']:
        c, r = k % 3, k // 3; x = 6.4 + c * 29.4; yy = 25.6 + r * 8.3
        R(sl, x, yy, 28.4, 7.6, radius=.9, name=f'Service card {k + 1}')
        T(sl, x + 1.6, yy + 1.2, 25.2, 1.4, d['name'], .85, 'ink', bold=True, sp=.1, caps=True, name='Discipline')
        T(sl, x + 1.6, yy + 2.6, 25.2, 2, s_['name'], 1.55, bold=True, head=True, name='Service')
        T(sl, x + 1.6, yy + 4.6, 25.2, 2.8, s_['summary'], 1.05, 'mu', ls=1.4, name='Summary')
        k += 1
footer(sl, 'Services')
for pi, pair in enumerate((SVC[:2], SVC[2:])):
    sl = new(); kick(sl, 'Inside each discipline')
    for j, d in enumerate(pair):
        x = 6.4 + j * 45.6
        P(sl, DIMG[pi * 2 + j], x, 7.6, 15, 10, radius=.8, maxpx=900, pname=f'Tamm, {d["name"]}')
        T(sl, x + 16.8, 7.8, 10, 1.4, d['n'], 1, 'ink', bold=True, name='Discipline number')
        T(sl, x + 16.8, 9.4, 24.8, 3, d['name'], 2.05, bold=True, head=True, name='Discipline')
        T(sl, x + 16.8, 12.4, 24.8, 5.6, d['value'], 1.1, 'li', ls=1.4, name='Discipline value')
        paras = []
        for s_ in d['s']:
            paras.append([(s_['name'], {'size': 1.35, 'bold': True, 'head': True})])
            for inc in s_['inc'][:3]: paras.append([(inc, {'size': 1, 'color': 'mu'})])
        tb = T(sl, x, 20.6, 41.6, 29, paras, 1, ls=1.35, name='Services and scope')
        for p in tb.text_frame.paragraphs:
            if p.runs and p.runs[0].font.bold: p.space_before = PT(1.1)
        tb.text_frame.paragraphs[0].space_before = 0
    footer(sl, 'Disciplines')

# Q3
page_div(2)
sl = new(); kick(sl, 'How we work')
T(sl, 6.4, 7.6, 70, 12, [[('Four disciplines.', {})], [('One connected plan.', {})]], 4.8, bold=True, head=True, sp=-.025, ls=1.02, name='Title')
line(sl, 6.4, 30, 93.6, 30, w=1.5, name='Chain line')
for i, (a, b) in enumerate(STEPS):
    x = 6.4 + i * 21.8
    o = R(sl, x, 29.35, 1.3, 1.3, fill='pu' if i == 3 else 'wh', shape=MSO_SHAPE.OVAL, name=f'Dot {i + 1}')
    T(sl, x, 32.2, 19.8, 3, a, 2.2, bold=True, head=True, name=f'Step {i + 1}')
    T(sl, x, 35.6, 19.8, 6, b, 1.25, 'mu', ls=1.5, name=f'Step {i + 1} text')
T(sl, 6.4, 44.4, 61, 5, 'Every campaign starts with a clear direction and ends with measurable learning — judged on the same business number, not activity for its own sake.',
  1.5, 'li', ls=1.45, anchor='b', name='Lead')
footer(sl, 'How we work')

sl = new(); kick(sl, 'Working with us')
T(sl, 6.4, 7.6, 70, 5, 'From the brief to the next decision.', 3.4, bold=True, head=True, sp=-.025, name='Title')
for i, (a, b) in enumerate(J):
    c, r = i % 4, i // 4; x = 6.4 + c * 22.3; yy = 13.4 + r * 19.2
    P(sl, JIMG[i], x, yy, 20.3, 10.6, radius=.8, maxpx=900, line='pu' if i == 7 else None, pname=f'Step {i + 1} picture')
    T(sl, x + .9, yy + 6.4, 6, 4, [[(str(i + 1), {'outline': 'wh', 'ow': 1.2})]], 3.2, bold=True, head=True, anchor='b', name=f'Step {i + 1} number')
    T(sl, x, yy + 11.3, 20.3, 2.2, a, 1.7, bold=True, head=True, name=f'Step {i + 1}')
    T(sl, x, yy + 13.7, 20.3, 3.4, b, 1.12, 'mu', ls=1.45, name=f'Step {i + 1} text')
footer(sl, 'Client journey')

# Q4 — the work, by industry
page_div(3)
IX, IY, IW, IH = 36.2, 5.6, 57.4, 44.6
def cells(layout, n):
    if layout == 'tri':
        w = (IW - 2) / 3; return [(IX + k * (w + 1), IY, w, IH) for k in range(3)]
    if layout == 'mix':
        c1 = (IW - 1) / 2.3; c2 = IW - 1 - c1; rh = (IH - 1) / 2
        return [(IX, IY, c1, IH), (IX + c1 + 1, IY, c2, rh), (IX + c1 + 1, IY + rh + 1, c2, rh)]
    if layout == 'stack':
        c1 = (IW - 1) * 1.25 / 2.25; c2 = IW - 1 - c1; rh = (IH - 1) / 2
        return [(IX, IY, c1, IH), (IX + c1 + 1, IY, c2, rh), (IX + c1 + 1, IY + rh + 1, c2, rh)]
    if layout == 'ge':
        g = .8; cw = (IW - 3 * g) / 4; rh = (IH - 2 * g) / 3; at = lambda c, r, sc=1, sr=1: (IX + c * (cw + g), IY + r * (rh + g), sc * cw + (sc - 1) * g, sr * rh + (sr - 1) * g)
        return [at(0, 0, 2, 2), at(2, 0), at(3, 0), at(2, 1), at(3, 1), at(0, 2), at(1, 2), at(2, 2), at(3, 2)]
    if layout == 'gf':
        g = .7; cw = (IW - 5 * g) / 6; rh = (IH - 2 * g) / 3; at = lambda c, r, sc=1, sr=1: (IX + c * (cw + g), IY + r * (rh + g), sc * cw + (sc - 1) * g, sr * rh + (sr - 1) * g)
        return [at(0, 0, 2, 2), at(2, 0, 2, 1), at(4, 0), at(5, 0)] + [at(c, 1) for c in range(2, 6)] + [at(c, 2) for c in range(6)]
for n, (sector, title, desc, brand, ims, layout) in enumerate(WORK, 1):
    sl = new(); kick(sl, f'Industry {n:02d} / {len(WORK):02d}')
    T(sl, 6.4, 7.6, 26.2, 8, sector, 3.4, bold=True, head=True, sp=-.025, ls=1.05, name='Industry')
    T(sl, 6.4, 16.2, 26.2, 3, title, 1.3, 'ink', bold=True, ls=1.3, name='What we made')
    line(sl, 6.4, 45.6, 32.6, 45.6)
    T(sl, 6.4, 46.6, 26.2, 2.6, brand, 1.05, 'mu', bold=True, sp=.06, caps=True, name='Brands')
    small = layout in ('ge', 'gf')
    for k, (im, box) in enumerate(zip(ims, cells(layout, len(ims)))):
        big = im.startswith(('alto4k', 'cp_', 'sp_'))
        P(sl, im, *box, radius=.6 if small else 1, maxpx=1400 if big else 700, pname=f'Work {k + 1}')
    footer(sl, 'Show me the work')

# case studies
cs_div = [d for d in DIVS if len(d) > 2][0]; divider(cs_div[1], cs_div[2], cs_div[3])
ks = CASES['ks-furniture']
sl = new(); kick(sl, f'Results · {ks["sector"]}', w=36)
T(sl, 6.4, 7.6, 34.6, 4.5, ks['client'], 3.4, bold=True, head=True, sp=-.025, name='Client')
T(sl, 6.4, 12.4, 34.6, 4, ks['headline'], 1.3, 'ink', bold=True, ls=1.3, name='Headline')
dl = []
for lab, txt in (('Challenge', ks['challenge']), ('Strategy', ks['strategy']), ('How it was measured', ks['note'])):
    dl.append([(lab, {'size': .95, 'color': 'mu', 'bold': True, 'sp': .14, 'caps': True})])
    dl.append([(txt, {'size': 1.2 if lab != 'How it was measured' else .92, 'color': 'li' if lab != 'How it was measured' else 'mu'})])
tb = T(sl, 6.4, 24, 34.6, 25.6, dl, 1.2, ls=1.5, anchor='b', name='Challenge and strategy')
for i, p in enumerate(tb.text_frame.paragraphs):
    if i and i % 2 == 0: p.space_before = PT(1.2)
P(sl, 'stk_ks_cushion', 43.4, 5.6, 18.1, 21.5, radius=1, maxpx=900, pname='Case picture 1')
P(sl, 'stk_ks_lamp', 43.4, 28.1, 18.1, 21.5, radius=1, maxpx=900, pname='Case picture 2')
kp = ks['kpis']; KX = 63.9
boxes = [(KX, 13, 29.7, 9), (KX, 23.2, 14.25, 9), (KX + 15.45, 23.2, 14.25, 9), (KX, 33.4, 14.25, 9)]
for i, (kpi, (x, yy, w, h)) in enumerate(zip(kp, boxes)):
    R(sl, x, yy, w, h, radius=1, name=f'KPI card {i + 1}')
    T(sl, x + 1.6, yy + 1.4, w - 3.2, 5, kpi['value'], 5 if kpi.get('accent') else 3.4, 'pu' if kpi.get('accent') else 'wh', bold=True, head=True, sp=-.03, name=f'KPI {i + 1}')
    T(sl, x + 1.6, yy + h - 2.6, w - 3.2, 1.6, kpi['label'], 1.05, 'mu', name=f'KPI {i + 1} label')
footer(sl, 'Results')

sl = new(); kick(sl, 'More results')
T(sl, 6.4, 7.6, 63, 8, 'Judged on the number that matters to each business.', 3.4, bold=True, head=True, sp=-.025, ls=1.08, name='Title')
for j, (slug, pic) in enumerate(SHOW):
    c = CASES[slug]; k0 = c['kpis'][0]; x = 6.4 + j * 44.8; y0 = 16.8; w = 42.4
    lab = lambda s: s[:1].lower() + s[1:] if s[1:2].islower() else s
    rest = ' · '.join(f'{x_["value"]} {lab(x_["label"])}' for x_ in c['kpis'][1:3])
    R(sl, x, y0, w, 31.8, radius=1, name=f'Case card {j + 1}')
    P(sl, pic, x, y0, w, 9.6, radius=1, top_only=True, maxpx=1100, pname=f'Case picture {j + 1}')
    bx = x + 1.8; bw = w - 3.6
    T(sl, bx, y0 + 10.8, bw, 1.4, f'{c["sector"]} · {c["period"]}', .85, 'mu', bold=True, sp=.1, caps=True, name='Sector and period')
    T(sl, bx, y0 + 12.4, bw, 5, k0['value'], 4.6, bold=True, head=True, sp=-.03, name='Headline figure')
    T(sl, bx, y0 + 17.8, bw, 1.4, k0['label'], 1, 'ink', bold=True, name='Figure label')
    T(sl, bx, y0 + 19.6, bw, 2.2, c['client'], 1.7, bold=True, head=True, name='Client')
    T(sl, bx, y0 + 22, bw, 3.6, c['headline'], 1.15, 'li', ls=1.4, name='Summary')
    T(sl, bx, y0 + 25.8, bw, 1.4, rest, .92, 'mu', name='Other figures')
    T(sl, bx, y0 + 27.6, bw, 3, c['evidence']['measured']['en'], .92, 'mu', ls=1.35, name='How it was measured')
T(sl, 6.4, 49.4, 80, 1.6, 'ROAS is revenue divided by ad spend, not profit. Photography: stock, for illustration.', 1, 'mu', name='Note')
footer(sl, 'Results')

# Q5 — clients
page_div(4)
src = open(os.path.join(ROOT, 'site/src/data/clients.ts'), encoding='utf-8').read()
def logos(start):
    blk = src[src.index(start):]; blk = blk[:blk.index('];')]; out = []
    for m_ in re.finditer(r"name: \{ en: '([^']+)', ar: '([^']+)' \}(.*)", blk):
        rest = m_.group(3)
        if "permission: 'pending'" in rest or '57357' in m_.group(1): continue   # government bodies and 57357 stay off
        lg = re.search(r"logo: \{ src: '([^']+)'", rest); tile = re.search(r"tile: '([^']+)'", rest)
        if lg: out.append((m_.group(1), os.path.join(ROOT, 'site/public', lg.group(1).lstrip('/')), tile.group(1) if tile else None))
    return out
DIRECT, WALL = logos('export const CLIENTS'), logos('export const CLIENT_WALL')
svgs = [p for _, p, _ in DIRECT + WALL if p.endswith('.svg')]
def rast(p): return os.path.join(CACHE, 'logo_' + re.sub(r'[^\w.-]', '_', os.path.relpath(p, ROOT)) + '.png')
todo = [p for p in svgs if not os.path.exists(rast(p))]
if todo:   # SVG logos → PNG through the bundled Chromium (PowerPoint pictures stay swappable)
    js = tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, dir=CACHE)
    js.write("const {chromium}=require('playwright');const fs=require('fs');const L=" + json.dumps([[p, rast(p)] for p in todo]) +
             ";(async()=>{const b=await chromium.launch();const pg=await b.newPage();for(const [s,o] of L){const u='data:image/svg+xml;base64,'+fs.readFileSync(s).toString('base64');await pg.setContent(`<html><body style=\"margin:0;background:transparent\"><img id=i src=\"${u}\" style=\"height:400px;width:auto;display:block\"></body></html>`);"
             "await pg.waitForTimeout(150);const e=await pg.$('#i');await e.screenshot({path:o,omitBackground:true});}await b.close();})()")
    js.close(); subprocess.run(['node', js.name], check=True, cwd=ROOT); os.unlink(js.name)
def logo_img(p):
    if p.endswith('.svg'): return rast(p)
    out = os.path.join(CACHE, 'logo_' + re.sub(r'[^\w.-]', '_', os.path.relpath(p, ROOT)) + '.png')
    if not os.path.exists(out): Image.open(p).convert('RGBA').save(out)
    return out

def hexcol(s, h):
    h = h.lstrip('#'); h = ''.join(c * 2 for c in h) if len(h) == 3 else h
    from pptx.dml.color import RGBColor
    s.fill.solid(); s.fill.fore_color.rgb = RGBColor.from_string(h.upper())
for title, items, cols, dark, cnt in (('Clients who trusted the SayTamm team', DIRECT, 11, False, str(len(DIRECT))), ('And many more', WALL, 12, True, f'+{len(WALL)}')):
    sl = new(); kick(sl, title)
    T(sl, 70, 4.6, 23.6, 6, cnt, 6, 'pu', bold=True, head=True, align='r', sp=-.04, name='Count')
    g = .6; tw = (87.2 - (cols - 1) * g) / cols; rows = math.ceil(len(items) / cols); y0 = 49.6 - rows * tw - (rows - 1) * g
    pad = 1 if dark else .7
    for i, (nm, p, tile) in enumerate(items):
        c, r = i % cols, i // cols; x = 6.4 + c * (tw + g); yy = y0 + r * (tw + g)
        t = R(sl, x, yy, tw, tw, fill='gr' if dark else 'white', radius=.6, name=f'Tile · {nm}')
        if tile and not dark: hexcol(t, tile)
        P(sl, logo_img(p), x + pad, yy + pad, tw - 2 * pad, tw - 2 * pad, fit='contain', maxpx=400, pname=f'Logo · {nm}')
    footer(sl, 'Clients')

sl = new(); kick(sl, 'In their words')
for i, (q, w) in enumerate(QUOTES):
    c, r = i % 3, i // 3; x = 6.4 + c * 29.9; yy = 13.6 + r * 18.6
    R(sl, x, yy, .3, 16.2, fill='pu', name='Quote bar')
    T(sl, x + 1.7, yy, 25.6, 16.2, [[(f'“{q}”', {'size': 1.75})], [(w, {'size': 1, 'color': 'mu', 'bold': True, 'sp': .08, 'caps': True})]], 1.75, ls=1.38, before=1, name=f'Testimonial {i + 1}')
footer(sl, 'Testimonials')

# Q6
page_div(5)
sl = new(); kick(sl, 'Start a project')
T(sl, 6.4, 7.6, 56, 12, [[('Tell us the goal.', {})], [('We take it from there.', {'color': 'pu'})]], 4.8, bold=True, head=True, sp=-.025, ls=1.02, name='Title')
P(sl, 'tamm_welcomecard', 73, 5, 20, 28, radius=1, maxpx=900, pname='Tamm card')
for i, (a, b) in enumerate(NEXT):
    x = 6.4 + i * 29.6
    R(sl, x, 37.4, 28, 12.2, radius=1, name=f'Step card {i + 1}')
    T(sl, x + 2, 39.2, 24, 1.4, f'{i + 1:02d}', 1, 'ink', bold=True, name='Number')
    T(sl, x + 2, 41, 24, 2.6, a, 2, bold=True, head=True, name=f'Step {i + 1}')
    T(sl, x + 2, 44, 24, 4.6, b, 1.2, 'mu', ls=1.45, name=f'Step {i + 1} text')
footer(sl, 'What happens next')

sl = new(); mosaic(sl, MOSAIC[::-1], alpha=.55); logo(sl)
T(sl, 6.4, 29, 60, 16, [[('You say it.', {})], [('We Tamm it.', {'color': 'pu'})]], 8, bold=True, head=True, sp=-.04, ls=.92, name='Title')
T(sl, 6.4, 46.4, 19, 2.6, 'info@saytamm.com', 1.9, name='Email'); T(sl, 26.4, 46.4, 20, 2.6, 'www.saytamm.com', 1.9, name='Website')
skyline(sl, 0, H - 9.3, 37, alpha=.35, name='Markets skyline (faint)')

# hidden last slide: how to edit (not shown in Slide Show)
sl = new(); kick(sl, 'For the team · hidden slide')
T(sl, 6.4, 7.6, 80, 5, 'How to edit this deck', 3.4, bold=True, head=True, name='Title')
GUIDE = [('Fonts', 'Install Satoshi and IBM Plex Sans Arabic first. Headings and body use the theme fonts: change them once in Design > Variants > Fonts.'),
         ('Colours', 'Every colour is a theme colour (Design > Variants > Colors). Purple is Accent 1; keep it to small highlights.'),
         ('Pictures', 'Right-click a picture > Change Picture > From a File. The new picture keeps the size; use Crop > Fill to reframe it.'),
         ('Finding things', 'Home > Arrange > Selection Pane lists every element by name (Title, KPI 1, Work 3, Logo · Chery…).'),
         ('Page numbers', 'Numbers are automatic. Add, delete or reorder slides freely.'),
         ('Skyline', 'The Egypt · Saudi Arabia · UAE line art is a group of editable lines. Ungroup to recolour or move a landmark.'),
         ('Facts and figures', 'Use approved facts only. Case figures carry their “how it was measured” line; keep it when you edit a number.'),
         ('This slide', 'Hidden in Slide Show. Delete it before sending the file outside the company.')]
for i, (a_, b_) in enumerate(GUIDE):
    c, r = i % 2, i // 2; x = 6.4 + c * 44.6; yy = 15 + r * 8.6
    R(sl, x, yy, 42.6, 7.6, radius=.9, name=f'Tip card {i + 1}')
    T(sl, x + 1.6, yy + 1.2, 39.4, 1.8, a_, 1.4, bold=True, head=True, name='Tip')
    T(sl, x + 1.6, yy + 3.2, 39.4, 4, b_, 1.05, 'mu', ls=1.4, name='Tip text')
sl._element.set('show', '0')

prs.core_properties.title = 'SayTamm Company Profile'; prs.core_properties.author = 'SayTamm'
prs.save(OUT)
print('wrote', OUT, len(prs.slides), 'slides', round(os.path.getsize(OUT) / 1e6, 1), 'MB')
