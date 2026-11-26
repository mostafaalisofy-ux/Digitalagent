# Option F, «Tamm Mix» (owner 2026-11-26: «a mix of the five versions, the best of each»)

One page that keeps the strongest idea from each earlier option:

| From | What it brings |
|---|---|
| **Tamm OS** (D) | The short start-up (symbol + purple load bar, once per visit), the **dock** at the bottom as navigation, and **Tamm in the corner** once the hero is behind you, with a tip for the section you are in (tap him to ask a question). |
| **Tamm Engine** (E) | The hero **field** of 45° strokes that bend toward the pointer, the **marketing adviser** (live through Claude where the viewer allows it, otherwise the built-in SayTamm library; six-part answer, follow-up questions), the four disciplines **wired** to one number, the **3D ring** of the nine films, the showreel that zooms, and the **clients plane** that lands flat. |
| **Site v1.1 / v1.2** | **Tamm's stage** in the hero (the blade cuts in, Tamm leans toward the pointer, the four disciplines pop in), the **kinetic band**, headings that rise **word by word**, the reel opening along the **diagonal**, **magnetic** buttons, and **both looks**: dark by default, light behind the sun/moon switch. |
| **The thread** (C) | Services answered as **replies** (tap a service; Tamm answers with its summary and can turn it into a question for the adviser), the cases as **receipts**, the **composer** that writes the brief, and the **blade on the page edge** that slides down as you read. |

New links between the parts:
- Tamm's speech bubble follows the adviser: «أسمعك…» while you type, «دعني أفكّر…» while it works, «تمّت. الإجابة أسفل.» when it is done.
- The adviser's call to action, «ابدأ مع الفريق», takes the visitor to the composer with the question already in «ما الذي تريد تحريكه؟».
- The composer prepares the message, opens it in the visitor's email app (to info@saytamm.com) or copies it.
- A «who we are» section the Engine lacked: approved headline and support line, the four approved facts, why we started, mission and vision, and the meaning of the name.

Rules kept: approved facts only, the three approved cases verbatim with their measurement notes, ROAS is revenue ÷ ad spend and
never profit, the track-record line under the cases, no founder details, no government names. IBM Plex Sans Arabic for both
scripts (no Satoshi), IBM Plex Mono for the machine voice. Purple only for the blade, actions and key data. Lines and solid shapes:
no glow, no particles. Reduced motion shows everything in its final state (no start-up).

The adviser's source of truth is `concepts/engine/index.html`; its block was copied here with four small changes (the CTA leads to
the composer, Tamm reacts to its state, a service can pass a topic hint to the library, `ask(q, hint)`).

Publish like the other concepts: inline `concepts/chat/data.json` at `__DATA__`, with the same `media/` folder beside it, and declare
the `sample` capability so live answers work inside claude.ai.
