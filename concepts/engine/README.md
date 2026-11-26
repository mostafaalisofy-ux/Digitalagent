# Option E, «Tamm Engine» (owner 2026-11-26: «modern, AI, creative, amazing animation»)

- **Hero:** a live field of 45° strokes (the blade, repeated) that bend toward the pointer. Lines only, no particles or glow.
  The headline rises line by line; Arabic rises as whole words so the letters stay joined.
- **The engine (v2, owner 2026-11-26: «give digital-marketing advice and rich solutions, then a call to contact us»):**
  the visitor asks any marketing question (or taps one of six sample questions) and gets an answer in six fixed parts:
  in short · what to do now (numbered steps) · what to measure (with how to calculate it) · mistakes to avoid ·
  where the SayTamm team comes in (real service names only) · follow-up questions as buttons. Every answer ends with a
  call-to-action card: «Send it to the team» opens an email to info@saytamm.com pre-filled with the question and a summary,
  plus «Copy the answer».
  - **Live mode:** the page declares the artifact `sample` capability and sends the question to Claude on the viewer's own
    Claude account (asked once). The prompt carries the service list and the approved facts only, and forbids invented
    figures, guarantees, «first/leading», naming agencies, prices and contact details; ROAS = revenue ÷ spend, never profit.
    The header badge reads «Claude · live».
  - **Library mode:** where Claude is not available (a viewer outside claude.ai, consent declined, busy), the answer comes
    from a built-in bilingual library of 14 topics (sales, ROAS/profit, leads, creative, budget, platforms, seasons, SEO,
    CRO, tracking, social, brand launch, retention, apps) matched by keywords, with a general framework for anything else.
    Written natively in Arabic and English; no benchmarks, only formulas and practice. The badge reads «SayTamm library».
  - The footer says which mode answered and that it is general guidance, not a promise of results.
  - On the real website, live answers would need a small server endpoint (the artifact capability exists only inside claude.ai).
- **How we work:** the four disciplines as nodes wired into one target, «sales · leads · revenue», with the wires flowing.
- **Studio:** the nine films on a 3D ring that you drag and that drifts; a tap opens the film with sound. Below it, the
  «قولها… تمّت» showreel zooms as it scrolls in.
- **Numbers:** the three approved cases. The figures count up; spend and result bars grow from the approved `bar` data
  (fashion & beauty, K.S Furniture). How each figure was measured is shown verbatim.
- **Clients:** the logo wall on a tilted 3D plane that lands flat as you scroll.
- **End:** «قولها. ونحن نُتمّها.».

Arabic first with an English switch. One dark look. IBM Plex Sans Arabic, with IBM Plex Mono for the engine's output.
Reduced motion turns everything static. No libraries. Separate from the Astro site.

Publish like `concepts/chat`: the same `data.json`, now with `bar` per case, goes in at `__DATA__`, beside the same `media/` folder.
