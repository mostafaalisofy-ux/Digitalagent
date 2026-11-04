// Staging (default): block all crawling. Production (PUBLIC_STAGE=production): allow + sitemap.
import { SITE } from '../config/site';
export function GET() {
  const body = SITE.preview
    ? '# Staging build: not for search engines.\nUser-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', SITE.url).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
