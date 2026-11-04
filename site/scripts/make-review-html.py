#!/usr/bin/env python3
"""Export dist/ as standalone, self-contained HTML files for offline review (review-html/).

Each page becomes one .html file with its CSS, fonts (WOFF2 as data: URIs) and JS inlined, so it
opens by double-click (file://) with no server and no internet. Links between pages point to the
sibling files, so navigation works when the files sit in the same folder.

Fonts: the real brand fonts are embedded. These files are for the owner's internal review only —
Satoshi's licence (ITF FFL) allows internal sharing within the licensee's organisation but not
public redistribution, so do not publish these files or put them in a public repository.
"""
import base64, os, re, shutil, zipfile

SRC, OUT = 'dist', 'review-html'
PAGES = {  # dist path → output filename
    'en/index.html': 'saytamm-en-home.html', 'ar/index.html': 'saytamm-ar-home.html',
    'en/about/index.html': 'saytamm-en-about.html', 'ar/about/index.html': 'saytamm-ar-about.html',
    'en/services/index.html': 'saytamm-en-services.html', 'ar/services/index.html': 'saytamm-ar-services.html',
    'en/work/index.html': 'saytamm-en-work.html', 'ar/work/index.html': 'saytamm-ar-work.html',
    'en/contact/index.html': 'saytamm-en-contact.html', 'ar/contact/index.html': 'saytamm-ar-contact.html',
}
ROUTE = {'/' + k.replace('index.html', ''): v for k, v in PAGES.items()}  # "/en/about/" → file

def b64(path: str, mime: str) -> str:
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()

def inline_css(css: str) -> str:
    # drop .woff fallbacks (every target browser supports woff2), embed woff2 files
    css = re.sub(r",\s*url\(/[^)]+\.woff\)\s*format\(['\"]?woff['\"]?\)", '', css)
    css = re.sub(r"url\(data:font/woff;base64,[^)]+\)\s*format\(['\"]?woff['\"]?\)\s*,?", '', css)
    def font(m):
        p = SRC + m.group(1)
        return f'url({b64(p, "font/woff2")})' if os.path.exists(p) else m.group(0)
    return re.sub(r'url\((/[^)]+\.woff2)\)', font, css)

css_cache = {}
def css_file(href: str) -> str:
    if href not in css_cache:
        css_cache[href] = inline_css(open(SRC + href, encoding='utf-8').read())
    return css_cache[href]

def link(m):
    attr, url = m.group(1), m.group(2)
    path, sep, frag = url.partition('#')
    path, qsep, query = path.partition('?')
    if path in ROUTE:
        return f'{attr}="{ROUTE[path]}{qsep}{query}{sep}{frag}"'
    if path == '/':
        return f'{attr}="saytamm-en-home.html"'
    return m.group(0)

shutil.rmtree(OUT, ignore_errors=True); os.makedirs(OUT)
for src, out in PAGES.items():
    html = open(f'{SRC}/{src}', encoding='utf-8').read()
    html = re.sub(r'<link rel="stylesheet" href="(/_astro/[^"]+\.css)">', lambda m: f'<style>{css_file(m.group(1))}</style>', html)
    html = re.sub(r'<script type="module" src="(/_astro/[^"]+\.js)"></script>',
                  lambda m: '<script type="module">' + open(SRC + m.group(1), encoding='utf-8').read() + '</script>', html)
    html = re.sub(r'<link rel="preload"[^>]*>', '', html)
    html = re.sub(r'<link rel="icon"[^>]*href="(/brand/[^"]+\.svg)"[^>]*>', lambda m: f'<link rel="icon" type="image/svg+xml" href="{b64(SRC + m.group(1), "image/svg+xml")}">', html)
    html = re.sub(r'(href)="(/[^"]*)"', link, html)
    open(f'{OUT}/{out}', 'w', encoding='utf-8').write(html)
    leftovers = re.findall(r'(?:href|src)="/(?!/)[^"]*"', html)
    print(f'  {out:32s} {os.path.getsize(f"{OUT}/{out}")//1024:4d} KB' + (f'  ⚠ unresolved: {leftovers[:3]}' if leftovers else ''))

zpath = f'{OUT}/SayTamm_Website_v0.2_review.zip'
with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
    for out in PAGES.values():
        z.write(f'{OUT}/{out}', f'SayTamm_Website_v0.2/{out}')
print(f'[review-html] {len(PAGES)} pages + {zpath} ({os.path.getsize(zpath)//1024} KB)')
