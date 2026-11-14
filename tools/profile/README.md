# Company profile generator

Builds the SayTamm company profile (PDF, 16:9, 20 pages) in Arabic and English from the website's own data in `site/src`, with the production view forced: no pending case figures, no government logos, no preview labels.

```bash
node tools/profile/build-profile.mjs
```

Output: `handover/company-profile/` (not in Git): `SayTamm_Company_Profile_AR.pdf`, `SayTamm_Company_Profile_EN.pdf`, the source HTML and one PNG per page for review.

Needs `site/node_modules` (`npm ci`), Satoshi fetched into `site/public/fonts/satoshi`, Playwright with Chromium, and Python 3 with Pillow (work photos are re-encoded as JPEG to keep each PDF near 6 MB).

When the site content changes (a client, a project, a service), run it again: the profile follows the site. The PDF embeds Satoshi as a subset, which the licence allows for documents; never share the font files themselves.

## Global edition (English, creative)

```bash
node tools/profile/build-profile-global.mjs
```

"The Tamm Edition": 30 pages in four chapters built on the tagline (Say it. → Plan it. → Make it. → Tamm it.), using the brand visuals, six featured projects with individual layouts, the client grids and five commitments. No founder page. Output: `handover/company-profile-global/SayTamm_Company_Profile_2026.pdf` (~7 MB). Same data rules as above: production view, no pending figures, no government logos.
