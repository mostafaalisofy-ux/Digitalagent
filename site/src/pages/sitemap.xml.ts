import { SITE, LOCALES } from '../config/site';
import { href, type PageKey } from '../i18n/paths';
const PAGES: PageKey[] = ['home', 'services', 'work', 'contact'];
export function GET() {
  const url = (l: (typeof LOCALES)[number], p: PageKey) => new URL(href(l, p), SITE.url).href;
  const body = PAGES.flatMap((p) => LOCALES.map((l) => `  <url><loc>${url(l, p)}</loc>${LOCALES.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${url(a, p)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${url('en', p)}"/></url>`)).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
