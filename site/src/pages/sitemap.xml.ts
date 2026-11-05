import { SITE, LOCALES } from '../config/site';
import { href, caseHref, type PageKey } from '../i18n/paths';
import { CASES } from '../data/cases';
const PAGES: PageKey[] = ['home', 'about', 'services', 'work', 'contact', 'privacy'];
export function GET() {
  type L = (typeof LOCALES)[number];
  const abs = (path: string) => new URL(path, SITE.url).href;
  const routes: ((l: L) => string)[] = [...PAGES.map((p) => (l: L) => href(l, p)), ...CASES.map((c) => (l: L) => caseHref(l, c.slug))];
  const body = routes.flatMap((r) => LOCALES.map((l) => `  <url><loc>${abs(r(l))}</loc>${LOCALES.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${abs(r(a))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${abs(r('en'))}"/></url>`)).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
