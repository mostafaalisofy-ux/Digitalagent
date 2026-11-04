#!/usr/bin/env python3
"""Turn dist-artifact/ into a self-contained bundle for a claude.ai preview link (preview-link/).

Why a separate bundle:
- The preview host only allows fonts from Google Fonts. IBM Plex Sans Arabic is on Google
  Fonts; Satoshi is not, and its licence (ITF FFL) does not allow uploading it to a third-party
  platform, so the preview uses a labelled Google Fonts stand-in. The real site keeps Satoshi.
- Pages are served from a sub-path, so every root-absolute URL is rewritten to a relative one.
- The entry page is wrapped by the host, so it ships without <!doctype>/<html>/<head>/<body>.
"""
import os, re, shutil, sys

SRC = 'dist-artifact'
OUT = 'preview-link'
STANDIN = 'Figtree'
FONTS_LINK = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
              '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
              '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700'
              f'&family={STANDIN.replace(" ", "+")}:wght@400;500;700&display=swap">')
OVERRIDE = ('<style>:root:root{color-scheme:dark;--font-en:"Satoshi","%s",ui-sans-serif,system-ui,sans-serif;'
            '--font-ar:"IBM Plex Sans Arabic","%s",ui-sans-serif,system-ui,sans-serif}</style>') % (STANDIN, STANDIN)
NOTE = {'en': ' · Typeface shown is a preview stand-in for Satoshi', 'ar': ' · الخط الإنجليزي هنا بديل مؤقت لخط Satoshi'}

if not os.path.isdir(SRC):
    sys.exit(f'{SRC}/ missing — run with PUBLIC_DEPLOY_TARGET=artifact first')
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT)

PAGES = ['en/index.html', 'ar/index.html', 'en/services/index.html', 'ar/services/index.html',
         'en/work/index.html', 'ar/work/index.html', 'en/contact/index.html', 'ar/contact/index.html']

def rel(target: str, depth: int) -> str:
    """Root-absolute URL → relative to a page `depth` folders deep; folders → index.html."""
    path, sep, frag = target.partition('#')
    path = path.lstrip('/')
    if path == '' or path.endswith('/'):
        path += 'index.html'
    return ('../' * depth) + path + (sep + frag if sep else '')

def rewrite(html: str, depth: int, lang: str) -> str:
    html = re.sub(r'(href|src)="(/[^"]*)"', lambda m: f'{m.group(1)}="{rel(m.group(2), depth)}"', html)
    html = html.replace('_astro/', 'assets/')
    html = re.sub(r'<link rel="preload"[^>]*satoshi[^>]*>', '', html)          # no Satoshi in the bundle
    html = re.sub(r'<link rel="icon"[^>]*>', '', html)                         # host provides the tab icon
    html = html.replace('</title>', '</title>' + FONTS_LINK + OVERRIDE, 1)
    html = re.sub(r'(<div class="preview-bar"[^>]*>.*?)(</div>)', lambda m: m.group(1) + NOTE[lang] + m.group(2), html, count=1, flags=re.S)
    return html

# CSS: drop every @font-face (Satoshi + bundled Plex files); fonts come from Google Fonts instead.
os.makedirs(f'{OUT}/assets')  # the host reserves names starting with '_'
for f in os.listdir(f'{SRC}/_astro'):
    if f.endswith('.css'):
        css = open(f'{SRC}/_astro/{f}', encoding='utf-8').read()
        css = re.sub(r'@font-face\{[^}]*\}', '', css)
        open(f'{OUT}/assets/{f}', 'w', encoding='utf-8').write(css)
    elif f.endswith('.js'):
        shutil.copy(f'{SRC}/_astro/{f}', f'{OUT}/assets/{f}')

for page in PAGES:
    depth = page.count('/')
    lang = page.split('/')[0]
    html = rewrite(open(f'{SRC}/{page}', encoding='utf-8').read(), depth, lang)
    os.makedirs(os.path.dirname(f'{OUT}/{page}'), exist_ok=True)
    open(f'{OUT}/{page}', 'w', encoding='utf-8').write(html)

# Entry page = English home at depth 0, without the document wrapper (the host adds it).
entry = rewrite(open(f'{SRC}/en/index.html', encoding='utf-8').read(), 0, 'en')
entry = re.sub(r'<title>[^<]*</title>', '<title>SayTamm Website</title>', entry, count=1)
entry = re.sub(r'<!doctype html>', '', entry, flags=re.I)
entry = re.sub(r'</?html[^>]*>|</?head>|</?body[^>]*>', '', entry)
entry = re.sub(r'<meta charset="[^"]*"\s*/?>|<meta name="viewport"[^>]*>', '', entry)
open(f'{OUT}/index.html', 'w', encoding='utf-8').write(entry)

files = sorted(os.path.relpath(os.path.join(r, f), OUT) for r, _, fs in os.walk(OUT) for f in fs)
print(f'[preview-link] {len(files)} files in {OUT}/')
for f in files: print('  ', f)
