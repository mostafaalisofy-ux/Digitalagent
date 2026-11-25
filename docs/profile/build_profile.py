#!/usr/bin/env python3
"""SayTamm company profile (English), as 16:9 HTML pages, ready to become a PDF or PPTX after review.
Content comes only from approved sources: site/src/data/services.ts (via the JSON dump passed in), site/src/data/clients.ts,
CLAUDE.md facts and the approved brand copy. The founder is not named (owner instruction, 2026-11-25).
Satoshi is loaded from Fontshare at view time and never embedded (licence rule).
Usage (repo root): python3 docs/profile/build_profile.py <services_en.json> <out.html>"""
import base64, html, io, json, os, re, sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
SVC = json.load(open(sys.argv[1], encoding='utf-8'))
OUT = sys.argv[2]
esc = html.escape

def b64(path, mime): return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()
def still(path, w=900, q=72):
    im = Image.open(path).convert('RGB'); im.thumbnail((w, w * 2)); bio = io.BytesIO(); im.save(bio, 'JPEG', quality=q)
    return 'data:image/jpeg;base64,' + base64.b64encode(bio.getvalue()).decode()

SYMBOL = open(os.path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), encoding='utf-8').read()
SYMBOL = re.sub(r'<title>.*?</title>', '', SYMBOL).replace('width="600" height="721"', 'class="sym" aria-label="SayTamm symbol" role="img"')

# direct clients with an official logo (clients.ts → CLIENTS)
src = open(os.path.join(ROOT, 'site/src/data/clients.ts'), encoding='utf-8').read()
blk = src[src.index('export const CLIENTS'):]; blk = blk[:blk.index('];')]
logos = []
for m in re.finditer(r"name: \{ en: '([^']+)', ar: '([^']+)' \}(.*)", blk):
    lg = re.search(r"logo: \{ src: '([^']+)'", m.group(3)); tile = re.search(r"tile: '([^']+)'", m.group(3))
    if not lg: continue
    p = os.path.join(ROOT, 'site/public', lg.group(1).lstrip('/'))
    mime = 'image/svg+xml' if p.endswith('.svg') else 'image/webp'
    logos.append((m.group(1), b64(p, mime), tile.group(1) if tile else '#F5F3FA'))

H = os.path.join(ROOT, 'handover/launch-film')
WORK = [
    (still(f'{H}/journey/seq/t_done/045.jpg'), 'Tech Hive', 'Campaign idea and content', 'A character-led White Friday campaign: one idea carried across short-form ads, hooks for testing and a season of content.'),
    (still(f'{H}/journey/seq/a_table/020.jpg'), 'Altopiano', 'Media production', 'Day and night shot as two moods of one place, and the kitchen filmed from dough to table for the feed it runs in.'),
    (still(f'{H}/journey/seq/n_feed/060.jpg'), 'niimee', 'Motion and design', 'A three-word idea — every body, every style, every day — turned into a motion piece for the feed.'),
]
QUOTES = [
    ('Professional team with strong execution.', 'K.S Furniture'),
    ('…handled everything with precision.', 'Musalli Jewelry'),
    ('…a steady flow of high-quality leads.', 'Alqimma Equipment'),
    ('…truly understands business needs.', 'BITUMAT'),
]
TRACK = 'Includes projects led by members of the SayTamm team, including work delivered at other agencies.'

pages = []
def page(cls, inner, n=None, label=''):
    foot = '' if n is None else f'<footer class="pf"><span>{esc(label)}</span><span class="pn">{n:02d}</span></footer>'
    pages.append(f'<section class="pg {cls}">{inner}{foot}</section>')

# 1 · cover
page('cover', f'''<div class="cov-sym">{SYMBOL}</div>
<div class="cov-main"><p class="kick">Company profile · 2026</p>
<h1 class="tag">Say it.<br><em>Tamm it.</em></h1>
<p class="cov-line">A digital marketing &amp; performance agency built to move brands forward.</p></div>
<div class="cov-blade" aria-hidden="true"></div>''')

# 2 · about
page('about', '''<p class="kick">Who we are</p>
<h2 class="xl">A digital marketing &amp; performance agency built to move brands forward.</h2>
<div class="two"><p class="lead">SayTamm brings strategy, creative, media and technology together under one connected approach to growth.</p>
<p class="body">We start with the business goal, build the marketing plan around it, and turn the plan into clear execution and results that can be measured. Our name is the promise: you say it, we see it through.</p></div>''', 2, 'About SayTamm')

# 3 · at a glance (approved facts only)
FACTS = [('2021', 'Founded'), ('30', 'People on the team'), ('15+', 'Years of founder-led digital marketing leadership'),
         ('200+', 'Brands in the founder’s track record'), ('20+', 'Industries'), ('5', 'Markets in the team’s track record')]
page('glance', '<p class="kick">At a glance</p><h2>The team behind the name.</h2><div class="facts">' +
     ''.join(f'<div class="fact"><b>{esc(v)}</b><span>{esc(k)}</span></div>' for v, k in FACTS) +
     '</div><p class="note">Markets: Saudi Arabia, the UAE, Kuwait, Oman and Egypt — experience across these markets, not offices.</p>', 3, 'At a glance')

# 4 · how we work
STEPS = [('Strategy', 'Where growth will come from, and the number each channel must deliver.'),
         ('Creative', 'Brand, content and production made for the platforms your customers use.'),
         ('Media', 'Paid media planned, bought and optimised against sales, leads and revenue.'),
         ('Performance', 'Tracking you can trust, and reports that end with the next decision.')]
page('how', '<p class="kick">How we work</p><h2>One connected team. One business number.</h2><ol class="chain">' +
     ''.join(f'<li><b>{esc(a)}</b><span>{esc(b)}</span></li>' for a, b in STEPS) +
     '</ol><p class="lead small">Every piece of work is judged against the same number — sales, qualified leads or revenue — not activity for its own sake.</p>', 4, 'How we work')

# 5 · values
VALUES = [('Clarity', 'Plain plans, plain reports, one clear message per piece.'), ('Ownership', 'We own the outcome we agreed, not just the task.'),
          ('Speed', 'Short loops from idea to test to decision.'), ('Precision', 'Numbers read correctly: ROAS is not profit, a lead is not a sale.'),
          ('Impact', 'Work measured by what it moves for the business.')]
page('values', '<p class="kick">What we hold to</p><h2>Five values.</h2><div class="vals">' +
     ''.join(f'<div class="val"><b>{esc(a)}</b><span>{esc(b)}</span></div>' for a, b in VALUES) + '</div>', 5, 'Values')

# 6 · services overview
cols = ''.join(f'<div class="disc"><span class="dn">{d["n"]}</span><b>{esc(d["name"])}</b><ul>' + ''.join(f'<li>{esc(s["name"])}</li>' for s in d['s']) + '</ul></div>' for d in SVC)
page('svc', f'<p class="kick">What we do</p><h2>Nine services in four disciplines.</h2><div class="discs">{cols}</div>', 6, 'Services')

# 7–10 · one page per discipline
pn = 7
for d in SVC:
    many = len(d['s']) > 2
    items = ''.join(f'<div class="svcx"><b>{esc(s["name"])}</b><p class="sum">{esc(s["summary"])}</p><ul>' +
                    ''.join(f'<li>{esc(i)}</li>' for i in (s['inc'][:4] if many else s['inc'])) + '</ul></div>' for s in d['s'])
    page('dpage' + (' dense' if many else ''), f'''<div class="dhead"><span class="dbig">{d["n"]}</span><div><p class="kick">{esc(d["name"])}</p>
<h2 class="md">{esc(d["value"])}</h2></div></div><div class="svcs n{len(d["s"])}">{items}</div>''', pn, d['name']); pn += 1

# 11 · the client journey
J = [('Brief', 'The goal in one sentence, and the questions behind it.'), ('Preparation', 'Market and competitors, the audience, positioning, the plan.'),
     ('Idea', 'One idea strong enough to carry the whole campaign.'), ('Production', 'Shot and built for the platform it will run on.'),
     ('Content', 'A language for every platform, in Arabic and English.'), ('Media & performance', 'Hooks tested, budget moved toward what is working.'),
     ('SEO', 'Found by the people already searching.'), ('Reporting', 'Reports that end with the next decision.')]
page('journey', '<p class="kick">Working with us</p><h2>From the brief to the next decision.</h2><ol class="jr">' +
     ''.join(f'<li><span class="jn">{i + 1}</span><b>{esc(a)}</b><span>{esc(b)}</span></li>' for i, (a, b) in enumerate(J)) + '</ol>', pn, 'Client journey'); pn += 1

# 12 · platforms
PL = ['Google', 'Meta', 'Snapchat', 'TikTok', 'LinkedIn']
page('plat', '<p class="kick">Where we run media</p><h2>Planned, tested and scaled against revenue — not reach.</h2><div class="plats">' +
     ''.join(f'<span>{p}</span>' for p in PL) + '</div><p class="body">Search, display, shopping and YouTube on Google; Facebook and Instagram on Meta; Snapchat and TikTok for reach with intent; LinkedIn for B2B lead generation. Copy, creative and landing pages are A/B tested before budgets scale.</p>', pn, 'Platforms'); pn += 1

# 13 · selected work
page('work', '<p class="kick">Selected work</p><h2>Ideas, made for the feed.</h2><div class="works">' +
     ''.join(f'<figure><img src="{img}" alt="{esc(c)} — {esc(t)}"><figcaption><b>{esc(c)}</b><i>{esc(t)}</i><span>{esc(dsc)}</span></figcaption></figure>' for img, c, t, dsc in WORK) +
     f'</div><p class="note">{esc(TRACK)}</p>', pn, 'Selected work'); pn += 1

# 14 · clients
page('clients', '<p class="kick">Clients who trusted the SayTamm team</p><h2>Across retail, food, industry, hospitality and technology.</h2><div class="logos">' +
     ''.join(f'<div class="lg" style="background:{bg}"><img src="{im}" alt="{esc(n)}"></div>' for n, im, bg in logos) +
     f'</div><p class="note">{esc(TRACK)} Logos are the clients’ official files, shown in their own colours.</p>', pn, 'Clients'); pn += 1

# 15 · in their words
page('quotes', '<p class="kick">In their words</p><div class="qs">' +
     ''.join(f'<blockquote><p>“{esc(q)}”</p><cite>{esc(w)}</cite></blockquote>' for q, w in QUOTES) +
     '</div><p class="note">Verbatim excerpts from published client testimonials about projects led by members of the SayTamm team, including work delivered at other agencies.</p>', pn, 'Testimonials'); pn += 1

# 16 · why SayTamm
WHY = [('One team, one number', 'Strategy, creative, media and technology work as one team and answer to the same business number.'),
       ('Arabic and English, natively', 'Every plan, page and post is written in each language on its own terms — never translated line by line.'),
       ('Built to be tested', 'Creative is made to be tested against results, and budget follows what works.'),
       ('Reports that end with a decision', 'Platform-attributed results are kept apart from total business results, and every review ends with the next budget decision.')]
page('why', '<p class="kick">Why SayTamm</p><h2>Less noise. More movement from brief to measurable outcome.</h2><div class="whys">' +
     ''.join(f'<div><b>{esc(a)}</b><span>{esc(b)}</span></div>' for a, b in WHY) + '</div>', pn, 'Why SayTamm'); pn += 1

# 17 · contact
page('contact', f'''<div class="cov-sym small">{SYMBOL}</div><h2 class="tag2">Say it.<br><em>Tamm it.</em></h2>
<div class="cont"><span>saytamm.com</span><span>info@saytamm.com</span></div>
<p class="cov-line">A digital marketing &amp; performance agency.</p>''')

CSS = open(os.path.join(os.path.dirname(__file__), 'profile.css'), encoding='utf-8').read()
doc = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SayTamm Company Profile</title>
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap">
<style>{CSS}</style></head><body><main class="deck">{"".join(pages)}</main></body></html>'''
open(OUT, 'w', encoding='utf-8').write(doc)
print('wrote', OUT, len(pages), 'pages', round(len(doc) / 1e6, 2), 'MB', len(logos), 'logos')
