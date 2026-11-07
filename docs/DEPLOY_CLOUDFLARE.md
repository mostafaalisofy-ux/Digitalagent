# Deploying to Cloudflare Pages

Date: 2026-11-07. **Prepared, not deployed.** Nothing has been published and no DNS has been changed. Follow these steps only after the owner's launch instruction and the release gate in `PRODUCTION_RELEASE_CHECKLIST.md`.

## Files in the repository (tested)

| File | What it does |
|---|---|
| `site/public/_redirects` | `/` and `/index.html` → `/en/` (301); `/en` → `/en/`, `/ar` → `/ar/` |
| `site/public/_headers` | Security headers on every page (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP); `X-Robots-Tag: noindex` on every `*.pages.dev` address; long caching for `/_astro/*` and fonts, one week for images |
| `site/.nvmrc` | Node 22.23.4 (Cloudflare reads it) |

Both files are copied into `dist/` by the build. **Tested locally with Cloudflare's own server** (`wrangler pages dev`, v4.158): all redirects return 301 to the right page; unknown pages return 404 with the site's 404 page; every header is served; all 26 pages load in Chromium with the policy active, with no console errors, no blocked scripts, fonts or images, the project viewer works, and structured data is present. The first test found the policy blocked the Arabic font (embedded as `data:`); `font-src` was fixed before this guide was written.

## 1. Cloudflare Pages project (one time)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → choose `mostafaalisofy-ux/Digitalagent`.
2. **Production branch:** `main`. The work is currently on `claude/saytamm-brand-strategy-d2shzo`; merge it into `main` first (a pull request), so production builds only from reviewed code.
3. Build settings:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |

4. **Environment variables → Production only:** `PUBLIC_STAGE` = `production`.
   Leave it **unset for Preview**. Result: production builds are indexable with pending figures hidden; every preview build stays staging (noindex, preview bar).
5. Save and deploy. The first build downloads the Satoshi font from Fontshare (allowed by its licence for self-hosting; the files are not in Git).

## 2. Check the `pages.dev` address

Open `https://<project>.pages.dev/` and check: redirects to `/en/`, both languages, the form opens the email app, `/robots.txt` says `Allow: /` with the sitemap, response headers include `x-robots-tag: noindex` (so this address never competes with the real domain in search).

## 3. Domain (needs the owner, changes DNS)

1. **Before moving DNS to Cloudflare:** copy every existing DNS record from the current provider, especially **MX, SPF (TXT), DKIM and DMARC** for `info@` and `tamm@saytamm.com`. Missing them breaks email.
2. Add `saytamm.com` to Cloudflare (Add a site, Free plan) and change the nameservers at the registrar.
3. Pages project → **Custom domains** → add `www.saytamm.com`.
4. **Apex → www:** Cloudflare → **Rules → Redirect Rules** (or Bulk Redirects): `saytamm.com/*` → `https://www.saytamm.com/${1}`, 301, preserve query string. Add a proxied DNS record for the apex (e.g. `A @ 192.0.2.1`, orange cloud) so the rule can run.
5. SSL/TLS → **Full (strict)**; **Always Use HTTPS** on. Turn on HSTS only after the site has run correctly on HTTPS for a few days.

## 4. After launch

- Smoke test every page in both languages; submit the form; check `https://www.saytamm.com/robots.txt` and `/sitemap.xml`.
- Google Search Console: add the domain property, submit the sitemap.
- Analytics: nothing is installed. Adding GA4/GTM needs a consent banner and an update to the privacy notice first, then a `connect-src`/`script-src` change in `_headers` for the tag's domains.

## Rollback

Pages keeps every deployment: **Deployments → choose a previous one → Rollback**. DNS does not need to change.

## Alternative: upload without Git

```bash
cd site
```

```bash
PUBLIC_STAGE=production npm run build
```

```bash
npx wrangler pages deploy dist --project-name saytamm --branch main
```

Needs a Cloudflare login (`npx wrangler login`). The production build must always be made with `PUBLIC_STAGE=production`, and never deploy a staging build to the real domain.
