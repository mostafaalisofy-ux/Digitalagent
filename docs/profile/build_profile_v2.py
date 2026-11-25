#!/usr/bin/env python3
"""SayTamm company profile v2 (English): six questions, real work, results. 16:9 HTML pages → PDF/PPTX after review.
Inputs: docs/profile/services_en.json, docs/profile/cases_en.json (from site/src/data), handover/profile/assets (prep_assets.py),
site/public/clients (official client logos). Founder not named. Satoshi loads from Fontshare at view time, never embedded.
Owner, 2026-11-25: all IP and client approvals are in place for every supplied material; the old agency name is never shown.
Usage (repo root): python3 docs/profile/build_profile_v2.py <out.html>"""
import base64, html, io, json, os, re, sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')); HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(ROOT, 'handover/profile/assets'); OUT = sys.argv[1]
SVC = json.load(open(os.path.join(HERE, 'services_en.json'), encoding='utf-8'))
CASES = {c['slug']: c for c in json.load(open(os.path.join(HERE, 'cases_en.json'), encoding='utf-8'))}
esc = html.escape
_cache = {}
def img(name, w=1400, q=78):
    key = (name, w)
    if key not in _cache:
        p = name if os.path.isabs(name) else os.path.join(A, name + '.jpg')
        im = Image.open(p).convert('RGB'); im.thumbnail((w, w)); b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True)
        _cache[key] = 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
    return _cache[key]
def png(name, w=900):
    im = Image.open(os.path.join(A, name + '.png')); im.thumbnail((w, w)); b = io.BytesIO(); im.save(b, 'WEBP', quality=86)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
def raw(p, mime): return f'data:{mime};base64,' + base64.b64encode(open(p, 'rb').read()).decode()

SYMBOL = re.sub(r'<title>.*?</title>', '', open(os.path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), encoding='utf-8').read())
SYMBOL = SYMBOL.replace('width="600" height="721"', 'class="sym" role="img" aria-label="SayTamm"')

src = open(os.path.join(ROOT, 'site/src/data/clients.ts'), encoding='utf-8').read()
def logos(start, end_marker='];', wall=False):
    blk = src[src.index(start):]; blk = blk[:blk.index(end_marker)]; out = []
    for m in re.finditer(r"name: \{ en: '([^']+)', ar: '([^']+)' \}(.*)", blk):
        rest = m.group(3)
        if "permission: 'pending'" in rest or '57357' in m.group(1): continue   # government bodies and 57357 stay off
        lg = re.search(r"logo: \{ src: '([^']+)'", rest); tile = re.search(r"tile: '([^']+)'", rest)
        if not lg: continue
        p = os.path.join(ROOT, 'site/public', lg.group(1).lstrip('/')); mime = 'image/svg+xml' if p.endswith('.svg') else 'image/webp'
        out.append((m.group(1), raw(p, mime), tile.group(1) if tile else None))
    return out
DIRECT = logos('export const CLIENTS'); WALL = logos('export const CLIENT_WALL', wall=True)

def skyline(cls='sky'):
    """Egypt (Giza pyramids, Cairo Tower), Saudi Arabia (Kingdom Centre, Al Faisaliah), UAE (Burj Khalifa, Burj Al Arab, Dubai Frame)."""
    G = 240; d = []
    for x0, ax, ay, x1, rx in ((372, 404, 198, 436, 410), (238, 312, 156, 386, 330), (40, 150, 118, 262, 176)):   # back to front
        d.append(f'<path class="f" d="M{x0},{G} L{ax},{ay} L{x1},{G} Z"/><path d="M{ax},{ay} L{rx},{G}"/>')
    zig = ' '.join(f'M{474 + (y - 92) * 5 / 148:.1f},{y} L{486 - (y + 18 - 92) * 5 / 148:.1f},{y + 18}' for y in range(92, 222, 18))
    d.append(f'<path d="M470,{G} L475,92 M490,{G} L485,92 {zig} M475,92 L464,72 L496,72 L485,92 M462,72 V60 H498 V72 M480,60 V30"/>')
    d.append(f'<path d="M598,{G} V118 Q598,64 613,24 Q640,182 667,24 Q682,64 682,118 V{G} M619,56 H661 M619,63 H661 M612,150 H668 M612,190 H668"/>')
    d.append(f'<path d="M718,{G} L734,88 M762,{G} L746,88 M722,200 H758 M727,160 H753 M731,120 H749 M740,70 V28 M706,{G} Q740,214 774,{G}"/><circle cx="740" cy="80" r="10"/>')
    st = [(40, 240), (40, 204), (32, 204), (32, 166), (25, 166), (25, 128), (18, 128), (18, 92), (12, 92), (12, 60), (7, 60), (7, 34), (3, 34), (0, -6)]
    cx = 900; d.append('<path d="M' + ' L'.join(f'{cx - w},{y}' for w, y in st) + ' L' + ' L'.join(f'{cx + w},{y}' for w, y in st[::-1]) + '"/>')
    sail = lambda t: ((1 - t) ** 2 * 990 + 2 * t * (1 - t) * 1074 + t ** 2 * 1052, (1 - t) ** 2 * 50 + 2 * t * (1 - t) * 96 + t ** 2 * G)
    bars = ''.join(f' M992,{sail(t)[1]:.0f} L{sail(t)[0]:.0f},{sail(t)[1]:.0f}' for t in (.25, .45, .65, .82))
    d.append(f'<path d="M986,{G} V40 M990,50 Q1074,96 1052,{G} M990,50 V{G}{bars} M986,74 H968"/><ellipse cx="962" cy="74" rx="9" ry="3"/>')
    d.append(f'<path d="M1092,{G} V92 H1164 V{G} M1106,{G} V106 H1150 V{G} M1106,99 H1150"/>')
    route = '<path class="rt" d="M150,96 Q395,-40 640,8 Q780,-38 900,-26"/>' + ''.join(f'<circle class="pin" cx="{x}" cy="{y}" r="5"/>' for x, y in ((150, 96), (640, 8), (900, -26)))
    return (f'<svg class="{cls}" viewBox="0 -50 1200 296" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><g class="lm">{"".join(d)}'
            f'<path d="M0,{G} H1200"/></g>{route}</svg>')

pages = []
def page(cls, inner, label=None):
    n = len(pages) + 1
    foot = '' if label is None else f'<footer class="pf"><span>SayTamm · Company profile 2026</span><span>{esc(label)}</span><span class="pn">{n:02d}</span></footer>'
    pages.append(f'<section class="pg {cls}">{inner}{foot}</section>')

QS = ['Who are you?', 'What do you actually do?', 'How do you work?', 'Show me the work.', 'Who trusts you?', 'What happens next?']
def divider(i, strip, kick=None, q=None):
    tiles = ''.join(f'<img src="{img(s, 700)}" alt="">' for s in strip)
    page('div', f'''<div class="strip" aria-hidden="true">{tiles}</div><div class="div-text"><p class="kick">{kick or f'Question {i + 1} of 6'}</p>
<h2 class="q">{esc(q) if q else '“' + esc(QS[i]) + '”'}</h2></div><div class="blade" aria-hidden="true"></div>''')

# 1 · cover: a wall of the work
mosaic = ['sp_012', 'cp_altopiano1', 'sp_027', 'sp_019', 'cp_xiaomi1', 'sp_015', 'cp_jora1', 'sp_002', 'cp_alia', 'sp_013', 'cp_music', 'sp_020']
page('cover', f'''<div class="mosaic" aria-hidden="true">{''.join(f'<img src="{img(m, 700)}" alt="">' for m in mosaic)}</div>
<div class="cov-text"><div class="cov-sym">{SYMBOL}</div><p class="kick">Company profile · 2026</p><h1>Say it.<br><em>Tamm it.</em></h1>
<p class="cov-line">A digital marketing &amp; performance agency built to move brands forward.</p></div>''')

# 2 · six questions
page('index', '<p class="kick">This profile</p><h2 class="xl">Six questions.<br>Straight answers.</h2><ol class="qlist">' +
     ''.join(f'<li><span>{i + 1:02d}</span>{esc(q)}</li>' for i, q in enumerate(QS)) +
     f'</ol><img class="tamm-hero" src="{png("tamm_hero", 1000)}" alt="Tamm, the SayTamm character"><p class="side">Every new client asks the same six questions. This is our answer to each, in order.</p>', 'Contents')

# Q1 — who are you
divider(0, ['sp_013', 'sp_019', 'cp_altopiano2', 'sp_028', 'cp_jora2'])
page('about', f'''<p class="kick">Who we are</p><h2 class="xl">A digital marketing &amp; performance agency built to move brands forward.</h2>
<div class="about-grid"><p class="lead">SayTamm brings strategy, creative, media and technology together under one connected approach to growth.</p>
<div class="name"><span class="ar" lang="ar">قول تم</span><p>In everyday Gulf Arabic, <i>“qul tamm”</i> is what you hear when a request is as good as done. You tell us the goal; we take responsibility for getting there.</p></div></div>
<figure class="tcard"><img src="{img('tamm_capcard', 900)}" alt="Tamm"><figcaption>Tamm, our character. He says it; the team Tamms it.</figcaption></figure>''', 'Who we are')
FACTS = [('2021', 'Founded'), ('30', 'People on the team'), ('15+', 'Years of founder-led digital marketing leadership'),
         ('200+', 'Brands in the founder’s track record'), ('20+', 'Industries'), ('5', 'Markets: Saudi Arabia, UAE, Kuwait, Oman, Egypt')]
page('glance', '<p class="kick">At a glance</p>' + skyline() + '<div class="facts">' + ''.join(f'<div class="fact"><b>{v}</b><span>{esc(k)}</span></div>' for v, k in FACTS) +
     '</div><p class="note">Markets are where the team has delivered work, not office locations.</p>', 'At a glance')
VALUES = [('Clarity', 'Plain plans, plain reports, one message per piece.'), ('Ownership', 'We own the outcome we agreed, not just the task.'),
          ('Speed', 'Short loops from idea to test to decision.'), ('Precision', 'Numbers read correctly: ROAS is a ratio, a lead is not a sale.'),
          ('Impact', 'Work judged by what it moves for the business.')]
page('philo', '<p class="kick">What we believe</p><h2 class="xl">Marketing should move business forward.</h2><div class="vals">' +
     ''.join(f'<div><b>{a}</b><span>{esc(b)}</span></div>' for a, b in VALUES) + '</div>', 'Philosophy and values')

# Q2 — what do you do
divider(1, ['sp_009', 'cp_siyaq', 'sp_021', 'cp_electra2', 'sp_024'])
cards = ''.join(f'<div class="sv"><span class="dn">{d["n"]}</span><b>{esc(s["name"])}</b><span>{esc(s["summary"])}</span></div>' for d in SVC for s in d['s'])
page('nine', f'<p class="kick">What we do</p><h2>Nine services. <em>One objective.</em></h2><div class="svgrid">{cards}</div>', 'Services')
for pair in (SVC[:2], SVC[2:]):
    cols = ''
    for d in pair:
        items = ''.join(f'<li><b>{esc(s["name"])}</b>{"".join(f"<span>{esc(i)}</span>" for i in s["inc"][:3])}</li>' for s in d['s'])
        cols += f'<div class="dcol"><span class="dbig">{d["n"]}</span><h3>{esc(d["name"])}</h3><p class="dval">{esc(d["value"])}</p><ul>{items}</ul></div>'
    page('discs', f'<p class="kick">Inside each discipline</p><div class="dcols">{cols}</div>', 'Disciplines')

# Q3 — how do you work
divider(2, ['cp_purchazy', 'sp_016', 'cp_tecspro', 'sp_030', 'cp_metro'])
STEPS = [('Strategy', 'Where growth will come from, and the number each channel must deliver.'), ('Creative', 'Brand, content and production made for the platform it runs on.'),
         ('Media', 'Paid media bought and optimised against sales, leads and revenue.'), ('Performance', 'Measured against the agreed number, feeding the next round of planning.')]
page('how', '<p class="kick">How we work</p><h2 class="xl">Four disciplines.<br>One connected plan.</h2><ol class="chain">' +
     ''.join(f'<li><b>{a}</b><span>{esc(b)}</span></li>' for a, b in STEPS) +
     '</ol><p class="lead small">Every campaign starts with a clear direction and ends with measurable learning — judged on the same business number, not activity for its own sake.</p>', 'How we work')
JIMG = ['stk_brief', 'stk_prep', 'stk_idea', 'stk_production', 'stk_content', 'stk_media', 'stk_seo', 'stk_reporting']
J = [('Brief', 'The goal in one sentence, and the questions behind it.'), ('Preparation', 'Market and competitors, the audience, positioning, the plan.'),
     ('Idea', 'One idea strong enough to carry the whole campaign.'), ('Production', 'Shot and built for the platform it will run on.'),
     ('Content', 'A language for every platform, in Arabic and English.'), ('Media', 'Hooks tested, budget moved toward what is working.'),
     ('SEO', 'Found by the people already searching.'), ('Reporting', 'Reports that end with the next decision.')]
page('journey', '<p class="kick">Working with us</p><h2>From the brief to the next decision.</h2><ol class="jr">' +
     ''.join(f'<li><figure><img src="{img(JIMG[i], 700)}" alt=""><span class="jn">{i + 1}</span></figure><b>{a}</b><span>{esc(b)}</span></li>' for i, (a, b) in enumerate(J)) + '</ol>', 'Client journey')

# Q4 — show me the work
divider(3, ['sp_014', 'cp_gig', 'sp_018', 'cp_music', 'sp_029'])
WORK = [   # (industry, what we made, description, brands, images, layout)
    ('Automotive', 'Model posts and launch teasers', 'Posts for three SUV and sedan models, each built on one short Arabic line, plus a “coming soon” teaser set against the Riyadh skyline.', 'Chery Saudi', ['sp_012', 'sp_013', 'sp_014'], 'tri'),
    ('Consumer electronics', 'Product launches and social', 'Launch posts for tablets, phones and wearables, written for Arabic feeds and built around one benefit each.', 'Xiaomi · POCO', ['post_xiaomi1_1', 'post_xiaomi1_0', 'post_xiaomi2_0', 'post_poco_1', 'post_xiaomi2_1', 'post_xiaomi2_2', 'post_poco_0', 'post_xiaomi1_2', 'post_poco_2'], 'ge'),
    ('Home appliances', 'Locally made appliances, in real homes', 'Washing machines, refrigerators and freezers placed in real Saudi rooms, with “made in Saudi” at the centre of every line.', 'Zahid Electra', ['sp_015', 'sp_016', 'sp_017'], 'tri'),
    ('Food & hospitality', 'Restaurant and hotel content', 'Day and night moods for an Italian restaurant, street-food photography and branding for a burger concept, and a Chinese restaurant’s opening season.', 'Altopiano · JORA · Havenue', ['alto4k_d', 'alto4k_a', 'post_havenue_0', 'post_jora1_1', 'post_alto1_5', 'post_jora2_4', 'post_alto2_2', 'post_jora1_0', 'post_havenue_1', 'post_jora2_2', 'post_alto1_4', 'post_jora2_5', 'post_alto2_3', 'post_jora1_2'], 'gf'),
    ('Fashion & beauty', 'Campaigns, labels and product photography', 'A one-promise campaign look — your size, your style — plus labels, product photography and a fashion identity.', 'niimee · Beauty Lab · Somavie · Alia', ['sp_018', 'sp_019', 'sp_025'], 'tri'),
    ('Technology & software', 'Platform-native social for business', 'Gaming-PC posts in Saudi dialect, and clear, product-led social for software, content and IT services brands.', 'Tech Hive · Siyaq · Fatora Plus · TECSPRO', ['sp_027', 'cp_siyaq', 'cp_fatora'], 'mix'),
    ('Construction & industry', 'Building materials and equipment', 'Industrial products shown at the scale of the sites they are used on, with one technical benefit per post.', 'BITUMAT · DC BLOCK · SIEFCO · Alqimma', ['sp_003', 'cp_dcblock', 'cp_siefco'], 'mix'),
]
for n, (sector, title, desc, brand, ims, layout) in enumerate(WORK, 1):
    figs = ''.join(f'<figure><img src="{img(s, 1100 if s.startswith(("alto4k", "cp_", "sp_")) else 640, 88)}" alt="{esc(sector)}"></figure>' for s in ims)
    page('work ' + layout, f'''<div class="wtext"><p class="kick">Industry {n:02d} / {len(WORK):02d}</p><h2 class="brand">{esc(sector)}</h2><p class="wt">{esc(title)}</p>
<p class="wd">{esc(desc)}</p><p class="wb">{esc(brand)}</p></div><div class="wimgs">{figs}</div>''', 'Show me the work')

# case studies: their own separator inside question 4
divider(3, ['stk_cs_cart', 'stk_cs_parcel', 'stk_cs_calc', 'stk_cs_shop', 'stk_cs_pay'], 'Case studies', 'The work, measured.')
ks = CASES['ks-furniture']
page('case', f'''<div class="ctext"><p class="kick">Results · {esc(ks["sector"])}</p><h2 class="brand">{esc(ks["client"])}</h2><p class="wt">{esc(ks["headline"])}</p>
<dl class="cdl"><dt>Challenge</dt><dd>{esc(ks["challenge"])}</dd><dt>Strategy</dt><dd>{esc(ks["strategy"])}</dd><dt>How it was measured</dt><dd class="src">{esc(ks["note"])}</dd></dl></div>
<div class="kimgs"><img src="{img('stk_ks_cushion', 900)}" alt=""><img src="{img('stk_ks_lamp', 900)}" alt=""></div><div class="kpis">{''.join(f'<div class="kpi{" a" if k.get("accent") else ""}"><b>{esc(k["value"])}</b><span>{esc(k["label"])}</span></div>' for k in ks["kpis"])}</div>''', 'Results')
# owner, 2026-11-25: cases older than 2021 or sourced from another agency's published study are removed; figures approved for the profile
SHOW = [('fashion-beauty-scale', 'stk_cs_unbox'), ('electronics-q4', 'stk_cs_shop')]
cells = ''
for slug, pic in SHOW:
    c = CASES[slug]; k = c['kpis'][0]; rest = ' · '.join(f'{x["value"]} {x["label"][:1].lower() + x["label"][1:] if x["label"][1:2].islower() else x["label"]}' for x in c['kpis'][1:3])
    cells += (f'<div class="cc"><figure><img src="{img(pic, 1000)}" alt=""></figure><div class="ccb"><span class="cs">{esc(c["sector"])} · {esc(c["period"])}</span>'
              f'<b class="cv">{esc(k["value"])}</b><span class="cl">{esc(k["label"])}</span><h3>{esc(c["client"])}</h3><p>{esc(c["headline"])}</p><span class="cr">{esc(rest)}</span>'
              f'<span class="src">{esc(c["evidence"]["measured"]["en"])}</span></div></div>')
page('cases two', f'<p class="kick">More results</p><h2>Judged on the number that matters to each business.</h2><div class="cgrid">{cells}</div><p class="note">ROAS is revenue divided by ad spend, not profit. Photography: stock, for illustration.</p>', 'Results')

# Q5 — who trusts you
divider(4, ['sp_010', 'cp_sedra', 'sp_004', 'cp_yap', 'sp_006'])
page('clients', '<div class="chead"><p class="kick">Clients who trusted the SayTamm team</p><b class="count">' + str(len(DIRECT)) + '</b></div><div class="logos">' +
     ''.join(f'<div class="lg"{f" style=background:{t}" if t else ""}><img src="{s}" alt="{esc(n)}"></div>' for n, s, t in DIRECT) + '</div>', 'Clients')
page('wall', f'<div class="chead"><p class="kick">And many more</p><b class="count">+{len(WALL)}</b></div><div class="logos dark">' +
     ''.join(f'<div class="lg"><img src="{s}" alt="{esc(n)}"></div>' for n, s, t in WALL) + '</div>', 'Clients')
QUOTES = [
    ('SayTamm helped us build a real digital presence from scratch. Within a few months, our brand was visible across all platforms, and we started getting serious inquiries.', 'DC BLOCK'),
    ('From branding to performance campaigns, SayTamm handled everything with precision. The results exceeded our expectations in both reach and sales.', 'Musalli Jewelry'),
    ('SayTamm gave our marketing a clear direction and executed it with precision. We’ve seen stronger brand presence, better audience targeting, and a steady flow of high-quality leads.', 'Alqimma Equipment'),
    ('Working with SayTamm helped us transform our digital presence and generate qualified leads consistently. The team is proactive, creative, and truly understands business needs.', 'BITUMAT'),
    ('SayTamm elevated our brand positioning and delivered high-quality content that reflects our identity perfectly.', 'ALTOPIANO'),
    ('Professional team with strong execution. Our campaigns became more structured, and we started seeing measurable ROI within a short time.', 'K.S Furniture'),
]
page('quotes', '<p class="kick">In their words</p><div class="qs">' + ''.join(f'<blockquote><p>“{esc(q)}”</p><cite>{esc(w)}</cite></blockquote>' for q, w in QUOTES) + '</div>', 'Testimonials')

# Q6 — what happens next
divider(5, ['sp_007', 'cp_sasec', 'sp_011', 'cp_somavie', 'sp_022'])
NEXT = [('Share the brief', 'Your goal, your market and your timeline, in your own words.'), ('Get our approach', 'How we would approach it, what we would measure and what we need from you.'),
        ('Agree the number', 'One business number that the plan, the work and every report answer to.')]
page('next', '<p class="kick">Start a project</p><h2 class="xl">Tell us the goal.<br><em>We take it from there.</em></h2><ol class="nx">' +
     ''.join(f'<li><span>{i + 1:02d}</span><b>{a}</b><p>{esc(b)}</p></li>' for i, (a, b) in enumerate(NEXT)) + f'</ol><figure class="tcard wel"><img src="{img("tamm_welcomecard", 900)}" alt="Tamm"></figure>', 'What happens next')
page('close', f'''<div class="mosaic faint" aria-hidden="true">{''.join(f'<img src="{img(m, 700)}" alt="">' for m in mosaic[::-1])}</div>
<div class="cov-text"><div class="cov-sym">{SYMBOL}</div><h1>You say it.<br><em>We Tamm it.</em></h1>
<div class="cont"><span>info@saytamm.com</span><span>www.saytamm.com</span></div></div>{skyline('sky faint')}''')

CSS = open(os.path.join(HERE, 'profile_v2.css'), encoding='utf-8').read()
doc = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SayTamm Company Profile</title><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700&display=swap">
<style>{CSS}</style></head><body><main class="deck">{"".join(pages)}</main></body></html>'''
open(OUT, 'w', encoding='utf-8').write(doc)
print('wrote', OUT, len(pages), 'pages', round(len(doc) / 1e6, 1), 'MB', len(DIRECT), 'direct', len(WALL), 'wall')
