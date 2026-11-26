# Option C, «the thread» (owner 2026-11-26: «a completely different option, your taste»)

The whole site is one conversation. The visitor types a goal (or taps one), Tamm answers «تم», and the thread below answers six
questions with the real material: who we are (approved headline and facts), what we do (the nine services, by discipline), the work
(«قولها… تمّت» showreel and the nine studio films), the numbers (the three approved cases as receipts, figures and measurement notes
verbatim from `site/src/data/cases.ts`), who we worked with (the home page's direct-client logos), and how to start (a message composer
that writes the brief for the visitor to copy and send to info@saytamm.com). Arabic first, English toggle; light and dark follow the viewer.
IBM Plex Sans Arabic for both scripts (no Satoshi). Separate from the Astro site: nothing in `site/` changes.

`index.html` is the page source; `data.json` is extracted from `site/src/data` (services, cases) and the built home page (client logos).
To publish: inline `data.json` at `__DATA__`, and copy beside it `media/` = `site/public/media/showreel-*`, `site/public/media/studio/*`,
`site/public/media/tamm-cut.webp`, the client logos under `media/clients/…`, and the two symbol SVGs from `brand/production/logo/`.
