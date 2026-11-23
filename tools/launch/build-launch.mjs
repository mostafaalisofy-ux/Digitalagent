// SayTamm launch — redesigned Launch Playbook (PDF), 14-Day Content Book (PDF) and interactive Content Book (HTML).
// Data: docs/launch/content/posts_v2.json (run docs/launch/content/build_posts.py first).
// Usage (repo root): node tools/launch/build-launch.mjs [outDir]   → handover/launch/ by default (not in Git).
// The PDFs and the HTML embed Satoshi (licence: not to be redistributed as font files) — internal use only.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PUB = path.join(ROOT, 'site', 'public');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'handover', 'launch'));
fs.mkdirSync(OUT, { recursive: true });
const POSTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/launch/content/posts_v2.json'), 'utf8'));
const SAT = path.join(PUB, 'fonts', 'satoshi');
const PLEX = path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files');
for (const f of [path.join(SAT, 'Satoshi-700.woff2'), path.join(PLEX, 'ibm-plex-sans-arabic-arabic-400-normal.woff2')]) if (!fs.existsSync(f)) throw new Error('missing font ' + f);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nl = (s) => esc(s).replace(/\n/g, '<br>');
const url = (p) => pathToFileURL(p).href;
const SYM_W = url(path.join(PUB, 'brand/SayTamm_Symbol_Signature_White-Purple.svg'));
const SYM_B = url(path.join(PUB, 'brand/SayTamm_Symbol_Signature_Black-Purple.svg'));
const VIS = (n) => url(path.join(PUB, 'visuals', n));
const PLATFORMS = ['Facebook', 'Instagram', 'LinkedIn', 'X', 'TikTok'];
const PL_ROLE = { Facebook: 'Conversation & community', Instagram: 'Discovery & saves', LinkedIn: 'Business perspective', X: 'One sharp thought', TikTok: 'Fast hook, native video' };
const REG = { msa: 'Arabic: MSA', conv: 'Arabic: conversational' };
const dd = (n) => String(n).padStart(2, '0');
const VERSION = 'Version 2.0 · 23 November 2026';

const fontFaces = (embed = false) => {
  const src = (file, fmt = 'woff2') => (embed ? `url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')})` : `url(${url(file)})`) + ` format('${fmt}')`;
  return [
    [400, 'Satoshi-400.woff2'], [500, 'Satoshi-500.woff2'], [700, 'Satoshi-700.woff2'],
  ].map(([w, f]) => `@font-face{font-family:Satoshi;src:${src(path.join(SAT, f))};font-weight:${w}}`).join('\n') + '\n' +
    [400, 500, 700].map((w) => `@font-face{font-family:Plex;src:${src(path.join(PLEX, `ibm-plex-sans-arabic-arabic-${w}-normal.woff2`))};font-weight:${w};unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200F,U+FB50-FDFF,U+FE70-FEFF}`).join('\n');
};

const BASE_CSS = `
@page{size:1920px 1080px;margin:0}
:root{--ob:#09090D;--gr:#17171E;--g2:#202029;--sw:#F5F3FA;--mu:#96939F;--ac:#6C35FF;--li:#B79CFF;--ln:rgba(245,243,250,.14);--tx:#CFCCD7}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Satoshi,Plex,sans-serif;background:var(--ob);color:var(--sw);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ar{font-family:Plex,Satoshi,sans-serif;direction:rtl;text-align:right}
.pg{position:relative;width:1920px;height:1080px;overflow:hidden;padding:120px 120px 120px;break-after:page}
.pg:last-child{break-after:auto}
.t-light{background:var(--sw);color:var(--ob)} .t-gr{background:var(--gr)} .t-ac{background:var(--ac)}
.p{color:var(--ac)} .t-ac .p{color:var(--ob)}
.bl{display:inline-block;width:40px;height:7px;background:var(--ac);transform:skewX(-45deg);margin-right:20px;vertical-align:middle;flex:none}
.kk{display:flex;align-items:center;font-size:20px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--mu);margin-bottom:28px}
.t-light .kk{color:#6b6775}
.h1{font-size:88px;line-height:.98;font-weight:700;letter-spacing:-.04em}
.h2{font-size:64px;line-height:1.02;font-weight:700;letter-spacing:-.035em}
.lead{font-size:30px;line-height:1.45;font-weight:500}
.tx{font-size:22px;line-height:1.6;color:var(--tx)} .t-light .tx{color:#45424e}
.mark{position:absolute;top:50px;left:120px;height:32px}
.run{position:absolute;left:120px;right:120px;bottom:46px;display:flex;justify-content:space-between;font-size:15px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--mu)}
.t-light .run{color:#8a8693}
.chk{list-style:none;display:grid;gap:12px}
.chk li{position:relative;padding-left:40px;font-size:21px;line-height:1.45;color:var(--tx)}
.chk li::before{content:'';position:absolute;left:0;top:4px;width:22px;height:22px;border:2px solid var(--ac)}
.t-light .chk li{color:#45424e}
.tag{display:inline-block;font-size:15px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:6px 12px;border:1px solid var(--ln);color:var(--tx)}
.tag.open{border-color:#E8A33D;color:#E8A33D}
`;

// =====================================================================
// 1. LAUNCH STRATEGY PLAYBOOK
// =====================================================================
function playbook() {
  const pages = [];
  const P = (cls, sec, body) => pages.push({ cls, sec, body });
  const kk = (s) => `<p class="kk"><span class="bl"></span>${esc(s)}</p>`;
  const cal = (from, to) => POSTS.filter((p) => p.day >= from && p.day <= to).map((p) => `
    <li><span class="cd">Day ${dd(p.day)}</span><div><b>${esc(p.title)}</b><span class="cf">${esc(p.format)} · ${esc(p.pillar)}</span></div><span class="ch">${esc(p.hook_en)}</span><span class="ch ar">${esc(p.hook_ar_conv)}</span></li>`).join('');

  P('cover', null, `
    <img class="bg" src="${VIS('approach-band.webp')}" alt=""><div class="shade"></div>
    <img class="cv-sym" src="${SYM_W}" alt="SayTamm">
    <div class="cv-meta"><span>Launch strategy &amp; production playbook</span><span>${VERSION}</span><span>Internal working document</span></div>
    <h1 class="cv-h">Less talk.<br><span class="p">More Tamm.</span></h1>
    <p class="cv-sub">14-day bilingual social launch · smart brand personality · AI-enabled production</p>`);

  P('', 'Contents', `${kk('How to use this playbook')}
    <div class="two"><div><h2 class="h2">One plan.<br><span class="p">Three tools.</span></h2>
      <p class="tx" style="margin-top:28px">This playbook is the reading and sign-off reference. The <b>14-Day Content Book</b> (PDF) holds every caption, brief and prompt, and the interactive HTML is the working version with copy buttons and status tracking. Approved company facts are kept separate from campaign recommendations.</p></div>
      <ol class="toc">${['Direction & approved facts', 'Audience & messages', 'Voice, language & identity', 'TAMM character', 'Content system & 14-day calendar', 'Channels & founder reels', 'AI production workflow', 'Measurement, governance & team', 'Launch gate'].map((t, i) => `<li><span>${dd(i + 1)}</span>${esc(t)}</li>`).join('')}</ol></div>`);

  P('t-light', 'Direction', `${kk('01 · Direction')}
    <h2 class="h1">A connected agency,<br><span class="p">not another list of services.</span></h2>
    <div class="grid3" style="margin-top:70px">
      <div class="box"><span class="bk">Positioning</span><p>A digital marketing &amp; performance agency built to move brands forward.</p></div>
      <div class="box"><span class="bk">Campaign platform</span><p>LESS TALK. MORE TAMM.<br><span class="ar" style="display:block;text-align:left;direction:rtl">كلام أقل. تنفيذ أذكى.</span></p><span class="tag open">To confirm · D-023</span></div>
      <div class="box"><span class="bk">Permanent tagline</span><p>Say it. Tamm it.<br><span class="ar" style="display:block;text-align:left">قول. تم.</span></p><span class="tag">Unchanged</span></div>
    </div>
    <p class="tx" style="margin-top:44px;max-width:1300px">The campaign line runs for the launch period only and never replaces the tagline. Show speed through clarity and execution, not superlatives.</p>`);

  P('', 'Approved facts', `${kk('02 · Approved facts')}
    <div class="two"><div><h2 class="h2">What is known —<br><span class="p">and what must not be invented.</span></h2>
      <ul class="facts">${[['2021', 'Founded'], ['30', 'People on the team'], ['15+', 'Years of founder leadership in digital marketing'], ['200+', 'Brands in the founder’s track record'], ['20+', 'Industries'], ['5', 'Markets in the team’s track record — experience, not offices']].map(([v, k]) => `<li><b>${v}</b><span>${esc(k)}</span></li>`).join('')}</ul></div>
      <div><p class="bk2">Never publish or invent</p><ul class="chk x">${['Pending case-study figures (7 cases await platform exports)', 'Government bodies — hidden until written permission', '“30+”, “since 2014”, offices, awards, certifications or partnerships', 'Market leadership, fastest delivery or guaranteed results', 'AI scenes presented as real staff, clients, offices or campaigns', 'Previous agencies by name'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></div>`);

  P('t-gr', 'Audience', `${kk('03 · Audience & messages')}
    <div class="two"><div><h2 class="h2">The gap the brand<br>is built <span class="p">to close.</span></h2>
      <ul class="gaps">${['Slow communication and unclear ownership.', 'Disconnected strategy, creative, media and technology.', 'Activity without a clear business objective.', 'Reporting that does not guide the next decision.'].map((t, i) => `<li><span>${dd(i + 1)}</span>${esc(t)}</li>`).join('')}</ul></div>
      <div><p class="bk2">Five ideas to repeat</p><ol class="msgs">${[['Clarity', 'Understand the business behind the brief.'], ['Connected thinking', 'Strategy → Creative → Media → Performance.'], ['Experience', 'Complementary capability in one team.'], ['Ownership', 'Every task has a next step and an owner.'], ['Impact', 'Measure what matters to the business.']].map(([k, d]) => `<li><b>${k}</b><span>${d}</span></li>`).join('')}</ol>
      <p class="tx" style="margin-top:26px">One audience tension and one single-minded proposition per asset. Every factual claim has a source.</p></div></div>`);

  P('', 'Voice', `${kk('04 · Voice & language')}
    <h2 class="h2">Smart. Direct. Composed. <span class="p">Practical. Human.</span></h2>
    <table class="reg"><thead><tr><th>Platform</th><th>Role</th><th>Arabic register</th><th>English</th><th>Length</th></tr></thead><tbody>
      ${[['Facebook', 'Conversation & community', 'Modern Standard Arabic', 'British, full argument', 'Full post'], ['LinkedIn', 'Business perspective', 'Modern Standard Arabic', 'British, professional', 'Full post + question'], ['Instagram', 'Discovery & saves', 'Light conversational', 'British, short lines', 'Hook + save'], ['X', 'One sharp thought', 'Light conversational', 'British', '≤ 280 characters'], ['TikTok', 'Fast hook, native video', 'Light conversational', 'British', 'One line + 2–3 tags']].map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="pl"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}
    </tbody></table>
    <p class="tx" style="margin-top:30px">Arabic is written natively, never translated line by line: «» quotes, the Arabic comma, «منشور» not «بوست», Western digits. English uses British spelling. No agency clichés. Owner decision on register: 23 Nov 2026.</p>`);

  P('t-light', 'Identity', `${kk('05 · Visual identity')}
    <div class="two"><div><h2 class="h2">Dark Editorial<br><span class="p">Performance.</span></h2>
      <ul class="chk" style="margin-top:36px">${['Supplied master logo files only — never redraw, distort, mirror or AI-generate', 'Purple is an accent: 10% of the frame or less', 'Satoshi for English · IBM Plex Sans Arabic for Arabic', 'Typography and logo added in post, never generated', 'No neon overload, particles, fake dashboards or stock people'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <div class="sw">${[['#09090D', 'Obsidian', '#09090D', '#F5F3FA'], ['#17171E', 'Graphite', '#17171E', '#F5F3FA'], ['#F5F3FA', 'Soft White', '#F5F3FA', '#09090D'], ['#96939F', 'Muted', '#96939F', '#09090D'], ['#6C35FF', 'Electric Purple · accent', '#6C35FF', '#F5F3FA']].map(([h, n, bg, fg]) => `<div style="background:${bg};color:${fg}"><b>${n}</b><span>${h}</span></div>`).join('')}</div></div>`);

  P('', 'TAMM', `${kk('06 · TAMM character')}
    <div class="two"><div><h2 class="h2">A character with<br><span class="p">a defined role.</span></h2>
      <div class="roles">${[['Smart Partner', 'Explains complex ideas simply.'], ['Execution Mindset', 'Represents thoughtful follow-through.'], ['Brand Signature', 'Creates recognition in selected moments.']].map(([k, d]) => `<div><b>${k}</b><span>${d}</span></div>`).join('')}</div>
      <p class="tx" style="margin-top:28px">TAMM is recurring, not compulsory. It appears on Days 2, 5, 7, 10, 13 and 14, and never replaces real expertise or makes promises.</p></div>
      <div><span class="tag open">Open · owner</span><p class="lead" style="margin:18px 0 22px">No approved TAMM reference is on file yet. Production of the six TAMM days needs it first.</p>
      <ul class="chk">${['Approve one master reference image and record it as a decision', 'Front, side and back views', 'Expression, pose and wardrobe sheets', 'Check proportions and logo placement in every output'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></div>`);

  const mix = [['AI visual / motion', 5], ['Founder-led tips & stories', 4], ['Editorial carousels', 3], ['Brand / team stories', 2]];
  P('t-gr', 'Content system', `${kk('07 · Content system')}
    <div class="two"><div><h2 class="h2">Five pillars.<br><span class="p">Fourteen pieces.</span></h2>
      <ol class="pillars">${[['Smart diagnosis', 'Reveal the real issue behind a marketing symptom.'], ['Practical intelligence', 'Concise tips with immediate application.'], ['Connected execution', 'Show the system from strategy to measurement.'], ['Experience & people', 'The value behind the team.'], ['Brand world', 'TAMM, the name and the launch.']].map(([k, d], i) => `<li><span>${dd(i + 1)}</span><div><b>${k}</b><em>${d}</em></div></li>`).join('')}</ol></div>
      <div><p class="bk2">Launch mix — production allocation, not a forecast</p>
      <div class="mix">${mix.map(([k, n]) => `<div><span class="mk">${esc(k)}</span><span class="mb" style="width:${n * 110}px">${n}</span></div>`).join('')}</div></div></div>`);

  P('', 'Calendar', `${kk('08 · 14-day calendar · days 01–07')}<h2 class="h2" style="margin-bottom:34px">Interrupt, introduce, <span class="p">diagnose.</span></h2><ol class="cal">${cal(1, 7)}</ol>`);
  P('', 'Calendar', `${kk('08 · 14-day calendar · days 08–14')}<h2 class="h2" style="margin-bottom:34px">Teach, prove, <span class="p">launch.</span></h2><ol class="cal">${cal(8, 14)}</ol>`);

  P('t-light', 'Channels', `${kk('09 · Channel strategy')}
    <h2 class="h2">One idea. <span class="p">Five native executions.</span></h2>
    <div class="chan">${PLATFORMS.map((p) => `<div><b>${p}</b><span>${PL_ROLE[p]}</span></div>`).join('')}</div>
    <ul class="chk two-col" style="margin-top:44px">${['Check access, bios and destination links (site not live yet: use info@saytamm.com)', 'Prepare covers and pinned-post order', 'Assign the community response owner', 'Route qualified enquiries to the agreed contact owner', 'Choose posting times from account analytics — do not invent optimal times', 'Log recurring audience questions for future content'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`);

  P('', 'Founder reels', `${kk('10 · Founder tips series')}
    <h2 class="h2">20–40 seconds. <span class="p">One idea.</span></h2>
    <div class="tl">${[['0–2s', 'Hook', 'Pattern-breaking line'], ['2–7s', 'Misconception', 'Name the common mistake'], ['7–24s', 'Insight', 'One practical explanation'], ['24–32s', 'Takeaway', 'What to do next'], ['Last 2s', 'Sign-off', 'Subtle brand end frame']].map(([t, k, d]) => `<div><span class="tt">${t}</span><b>${k}</b><em>${d}</em></div>`).join('')}</div>
    <ul class="chk two-col" style="margin-top:50px">${['Vertical 9:16, eye level, clean lens', 'Test audio; capture 2–3 takes', 'Remove dead air, keep natural delivery', 'Accurate captions on every reel', 'Educational heuristics — never universal guarantees', 'Days 04, 08, 11 and 13'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`);

  P('t-gr', 'AI workflow', `${kk('11 · AI production workflow')}
    <h2 class="h2">Prompt with control.<br><span class="p">Finish with real brand assets.</span></h2>
    <div class="flow">${['Brief', 'Message', 'Storyboard', 'Prompt', 'Generate', 'Edit', 'QA'].map((s, i) => `<div><span>${dd(i + 1)}</span>${s}</div>`).join('')}</div>
    <div class="two" style="margin-top:50px"><div><p class="bk2">Prompt formula</p><p class="tx">Subject · action · environment · camera/lens · lighting · composition · palette · motion · duration &amp; aspect ratio · continuity constraints · negative prompt.</p></div>
    <div><p class="bk2">Reject if</p><p class="tx">Logo recreation, pseudo-Arabic or garbled text, fake UI or data, extra limbs, inconsistent TAMM, watermark, neon overload, particles, fake offices or staff.</p></div></div>`);

  P('', 'Measurement', `${kk('12 · Measurement')}
    <h2 class="h2">Measure the <span class="p">audience journey.</span></h2>
    <div class="fun">${[['Awareness', 'Reach · impressions · profile visits'], ['Attention', 'Watch time · retention · completion'], ['Engagement', 'Shares · saves · substantive comments'], ['Consideration', 'Site visits · CTA clicks · enquiries'], ['Business', 'Qualified enquiries · meetings · proposals · wins']].map(([k, d], i) => `<div style="width:${1680 - i * 150}px"><b>${k}</b><span>${d}</span></div>`).join('')}</div>
    <p class="tx" style="margin-top:30px">Capture a baseline before Day 01. Define “qualified enquiry” and attribution first. No website conversions are reported until tracking and consent are live and validated.</p>`);

  P('t-light', 'Governance', `${kk('13 · Governance & team')}
    <div class="two"><div><h2 class="h2">Non-negotiable<br><span class="p">controls.</span></h2>
      <ul class="chk" style="margin-top:34px">${['Verify every public claim and its source', 'No pending case-study metrics', 'Client permissions checked; government bodies hidden', 'Approved attribution wording for team track record', 'Arabic, English, logo, TAMM, subtitles and CTA reviewed', 'Owner approval before anything is published'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <div><p class="bk2">Who owns what</p><table class="own">${[['Owner', 'Strategy, claims, final approval'], ['Strategy & copy', 'Audience insight, factual accuracy'], ['Creative direction', 'Concept, storyboard, consistency'], ['AI production', 'Prompts, generation archive'], ['Editor', 'Pacing, sound, captions, exports'], ['Publishing & community', 'Scheduling, replies, performance log']].map(([k, d]) => `<tr><td>${k}</td><td>${d}</td></tr>`).join('')}</table>
      <p class="tx" style="margin-top:22px">Status: not started → in progress → in review → approved → published → learnings captured.</p></div></div>`);

  const gate = [['Logo master files and variants', 'ready'], ['TAMM reference pack and prompt guide', 'open'], ['14 briefs, captions and prompts (v2)', 'review'], ['Campaign line LESS TALK. MORE TAMM. confirmed', 'open'], ['Founder footage and AI masters reviewed', 'open'], ['Platform access, bios, links, publishing owners', 'open'], ['Baseline metrics and qualification rules', 'open'], ['Tracking, privacy/legal, client permissions', 'open'], ['Owner’s explicit launch authorisation', 'open']];
  const lab = { ready: 'Ready', review: 'In review', open: 'Open' };
  P('', 'Launch gate', `${kk('14 · Launch gate')}
    <h2 class="h2">Ready means more than <span class="p">finished creative.</span></h2>
    <ul class="gate">${gate.map(([k, s]) => `<li><span>${esc(k)}</span><em class="st ${s}">${lab[s]}</em></li>`).join('')}</ul>`);

  P('t-ac close', null, `<img class="cv-sym" src="${url(path.join(PUB, 'brand/SayTamm_Symbol_White.svg'))}" alt="">
    <h2 class="close-h">Say it.<br><span>Tamm it.</span></h2><p class="close-s"><bdi dir="rtl">قول. تم.</bdi> &nbsp;·&nbsp; LESS TALK. MORE TAMM.</p>`);

  const css = BASE_CSS + `
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,9,13,.95),rgba(9,9,13,.55) 60%,rgba(9,9,13,.25))}
.cover{padding:0}.cv-sym{position:absolute;top:100px;left:120px;height:110px}
.cv-meta{position:absolute;top:108px;right:120px;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx)}
.cv-h{position:absolute;left:110px;bottom:230px;font-size:220px;line-height:.88;font-weight:700;letter-spacing:-.055em}
.cv-sub{position:absolute;left:122px;bottom:120px;font-size:28px;color:var(--tx)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:110px;align-items:start}
.two-col{grid-template-columns:1fr 1fr;column-gap:60px}
.toc{list-style:none;border-top:1px solid var(--ln)}.toc li{display:flex;gap:30px;align-items:baseline;font-size:34px;font-weight:700;letter-spacing:-.02em;padding:16px 0;border-bottom:1px solid var(--ln)}.toc span{font-size:18px;color:var(--ac)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.box{background:#fff;padding:36px;min-height:300px;display:flex;flex-direction:column;gap:18px;border-top:6px solid var(--ac)}
.bk{font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6b6775}.box p{font-size:36px;font-weight:700;line-height:1.15;letter-spacing:-.02em;flex:1}
.box .tag{align-self:flex-start;color:#45424e;border-color:rgba(9,9,13,.2)}.box .tag.open{color:#B8730F;border-color:#B8730F}
.bk2{font-size:18px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);margin-bottom:22px}
.facts{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:26px 40px;margin-top:44px}.facts b{display:block;font-size:84px;line-height:1;font-weight:700;letter-spacing:-.04em;color:var(--sw)}.facts li:first-child b{color:var(--ac)}.facts span{font-size:19px;color:var(--mu)}
.chk.x li::before{border-color:#E5484D;background:linear-gradient(45deg,transparent 45%,#E5484D 45%,#E5484D 55%,transparent 55%)}
.gaps{list-style:none;margin-top:40px;border-top:1px solid var(--ln)}.gaps li{display:flex;gap:26px;font-size:30px;font-weight:500;line-height:1.3;padding:22px 0;border-bottom:1px solid var(--ln)}.gaps span{font-size:18px;color:var(--ac);font-weight:700;padding-top:8px}
.msgs{list-style:none;display:grid;gap:14px}.msgs li{background:var(--ob);padding:20px 26px;display:flex;flex-direction:column;gap:4px}.msgs b{font-size:28px}.msgs span{font-size:19px;color:var(--mu)}
.reg{width:100%;border-collapse:collapse;margin-top:50px;font-size:22px}.reg th{text-align:left;font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);padding:0 16px 16px 0;border-bottom:2px solid var(--ac)}.reg td{padding:20px 16px 20px 0;border-bottom:1px solid var(--ln);color:var(--tx)}.reg td.pl{font-weight:700;color:var(--sw);font-size:26px}
.sw{display:grid;grid-template-columns:1fr 1fr;gap:14px}.sw div{height:190px;padding:24px;display:flex;flex-direction:column;justify-content:flex-end;border:1px solid rgba(9,9,13,.1)}.sw div:last-child{grid-column:span 2}.sw b{font-size:24px}.sw span{font-size:18px;opacity:.8}
.roles{display:grid;gap:14px;margin-top:36px}.roles div{border-left:6px solid var(--ac);background:var(--gr);padding:20px 26px;display:flex;flex-direction:column;gap:4px}.roles b{font-size:28px}.roles span{font-size:19px;color:var(--mu)}
.pillars{list-style:none;margin-top:36px;border-top:1px solid var(--ln)}.pillars li{display:flex;gap:24px;padding:16px 0;border-bottom:1px solid var(--ln)}.pillars span{color:var(--ac);font-weight:700;font-size:18px;padding-top:6px}.pillars b{display:block;font-size:28px}.pillars em{font-style:normal;font-size:19px;color:var(--mu)}
.mix{display:grid;gap:26px;margin-top:10px}.mix div{display:flex;flex-direction:column;gap:10px}.mk{font-size:22px;color:var(--tx)}.mb{display:block;height:64px;background:var(--ac);color:var(--sw);font-size:34px;font-weight:700;padding:10px 20px;transform:skewX(-20deg)}
.cal{list-style:none;border-top:2px solid var(--ac)}.cal li{display:grid;grid-template-columns:120px 470px 1fr 1fr;gap:30px;align-items:center;padding:17px 0;border-bottom:1px solid var(--ln)}
.cd{font-size:17px;font-weight:700;color:var(--ac);letter-spacing:.08em;text-transform:uppercase}.cal b{display:block;font-size:26px;letter-spacing:-.01em}.cf{font-size:16px;color:var(--mu)}.ch{font-size:20px;line-height:1.35;color:var(--tx)}.ch.ar{font-size:21px}
.chan{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:50px}.chan div{background:#fff;padding:30px 26px;min-height:200px;display:flex;flex-direction:column;justify-content:space-between;border-top:6px solid var(--ac)}.chan b{font-size:34px;letter-spacing:-.02em}.chan span{font-size:19px;color:#55525e}
.chk.two-col{display:grid}
.tl{display:grid;grid-template-columns:repeat(5,1fr);margin-top:56px;border-top:3px solid var(--ac)}.tl div{padding:26px 24px 0 0;display:flex;flex-direction:column;gap:8px;position:relative}.tl div::before{content:'';position:absolute;top:-12px;left:0;width:20px;height:20px;background:var(--ac);transform:skewX(-45deg)}
.tt{font-size:18px;color:var(--ac);font-weight:700}.tl b{font-size:34px;letter-spacing:-.02em}.tl em{font-style:normal;font-size:19px;color:var(--mu)}
.flow{display:flex;gap:10px;margin-top:50px}.flow div{flex:1;background:var(--ob);padding:24px 20px;font-size:26px;font-weight:700;display:flex;flex-direction:column;gap:8px;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 50%,calc(100% - 22px) 100%,0 100%)}.flow span{font-size:15px;color:var(--ac)}
.fun{display:grid;gap:10px;margin-top:44px}.fun div{background:var(--gr);padding:20px 30px;display:flex;justify-content:space-between;align-items:center;border-left:8px solid var(--ac)}.fun b{font-size:30px}.fun span{font-size:20px;color:var(--mu)}
.own{width:100%;border-collapse:collapse;font-size:20px}.own td{padding:13px 0;border-bottom:1px solid rgba(9,9,13,.12)}.own td:first-child{font-weight:700;width:300px}
.gate{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:14px 50px;margin-top:46px}.gate li{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:18px 0;border-bottom:1px solid var(--ln);font-size:23px}
.st{font-style:normal;font-size:15px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:6px 12px;white-space:nowrap}.st.ready{background:#1f6f4a}.st.review{background:var(--ac)}.st.open{border:1px solid #E8A33D;color:#E8A33D}
.close{padding:120px}.close-h{position:absolute;left:110px;top:270px;font-size:230px;line-height:.9;font-weight:700;letter-spacing:-.055em}.close-h span{color:var(--ob)}.close-s{position:absolute;left:122px;bottom:120px;font-size:30px;font-weight:700}
`;
  return render(pages, css, 'SayTamm — Launch Playbook', 'Launch playbook');
}

// =====================================================================
// 2. 14-DAY CONTENT BOOK (PDF)
// =====================================================================
function contentBook() {
  const pages = [];
  const P = (cls, sec, body) => pages.push({ cls, sec, body });
  const kk = (s) => `<p class="kk"><span class="bl"></span>${esc(s)}</p>`;
  P('cover', null, `<img class="bg" src="${VIS('services-creative.webp')}" alt=""><div class="shade"></div>
    <img class="cv-sym" src="${SYM_W}" alt="SayTamm"><div class="cv-meta"><span>14-day social content production book</span><span>${VERSION}</span><span>Internal · for review and production</span></div>
    <h1 class="cv-h">14 days.<br><span class="p">140 captions.</span></h1>
    <p class="cv-sub">Facebook · Instagram · LinkedIn · X · TikTok &nbsp;—&nbsp; Arabic &amp; English &nbsp;—&nbsp; 14 production briefs and prompts</p>`);
  P('', 'System', `${kk('Campaign system')}
    <div class="two"><div><h2 class="h2">Less talk.<br><span class="p">More Tamm.</span></h2><p class="tx" style="margin-top:26px">Campaign platform for the launch — not a replacement for the permanent tagline <b>Say it. Tamm it. / <bdi dir="rtl">قول. تم.</bdi></b> Every post teaches, demonstrates or reveals one thing. One objective. One connected system.</p></div>
    <div><p class="bk2">How each platform is written</p><table class="reg">${PLATFORMS.map((p) => `<tr><td class="pl">${p}</td><td>${PL_ROLE[p]}</td><td>${p === 'Facebook' || p === 'LinkedIn' ? 'Arabic: MSA' : 'Arabic: conversational'}</td></tr>`).join('')}</table>
    <p class="tx" style="margin-top:20px">X ≤ 280 characters · TikTok: one line, the video carries the message · hashtags 1–3.</p></div></div>`);
  P('', 'Calendar', `${kk('Calendar')}<ol class="ov">${POSTS.map((p) => `<li><span class="od">${dd(p.day)}</span><b>${esc(p.title)}</b><em>${esc(p.format)}</em><span class="op">${esc(p.pillar)}</span></li>`).join('')}</ol>`);

  for (const p of POSTS) {
    const sec = `Day ${dd(p.day)} · ${p.title}`;
    P('t-gr', sec, `<div class="dh"><span class="dn">${dd(p.day)}</span><div><p class="kk" style="margin:0 0 10px">${esc(p.pillar)} · ${esc(p.format)}</p><h2 class="h2">${esc(p.title)}</h2></div></div>
      <div class="hooks"><div><span class="bk2">Hook · EN</span><p>${esc(p.hook_en)}</p></div><div class="ar"><span class="bk2">الافتتاحية · عامية</span><p>${esc(p.hook_ar_conv)}</p></div><div class="ar"><span class="bk2">الافتتاحية · فصحى</span><p>${esc(p.hook_ar_msa)}</p></div></div>
      <p class="purp ar">${esc(p.purpose)}</p>
      <div class="brief">${[['Visual', p.visual], ['Motion & edit', p.motion], ['TAMM', p.tamm], ['Sound', p.sound]].map(([k, v]) => `<div><span class="bk2">${k}</span><p>${esc(v)}</p></div>`).join('')}</div>`);
    for (const lang of ['ar', 'en']) {
      const isAr = lang === 'ar';
      P(isAr ? 'cap' : 'cap t-light', sec, `<div class="ch-h"><span class="dn sm">${dd(p.day)}</span><h3>${isAr ? 'Arabic captions' : 'English captions'}</h3><span class="tag">${esc(p.title)}</span></div>
        <div class="caps${isAr ? ' rtl' : ''}">${(() => {
          const art = (pl) => { const c = p.captions[pl]; return `<article class="c-${pl}"><header><b>${pl}</b><span>${isAr ? REG[c.register_ar] : 'English · British'}</span></header><div class="${isAr ? 'ar' : ''}">${nl(c[lang])}</div></article>`; };
          return art('Facebook') + art('LinkedIn') + `<div class="col3">${art('Instagram')}${art('X')}${art('TikTok')}</div>`;
        })()}</div>`);
    }
    P('pr', sec, `<div class="ch-h"><span class="dn sm">${dd(p.day)}</span><h3>Production prompt</h3><span class="tag">${esc(p.format)}</span></div><div class="prompt">${nl(p.prompt.replace(/\n\nMULTIDISCIPLINARY[\s\S]*?\n\nPRODUCTION PLAN/, '\n\nPRODUCTION PLAN'))}</div>`);
  }
  P('t-light', 'QA', `${kk('Before publishing')}<h2 class="h2">Final QA, <span class="p">every post.</span></h2>
    <ul class="chk two-col" style="margin-top:44px;display:grid">${['Claims match the approved facts; no pending figures', 'Arabic read by a fluent reviewer; register matches the platform', 'English in British spelling', 'Logo from master files; diagonal never mirrored', 'TAMM matches the approved reference', 'Text and CTA inside safe zones, legible on a phone', 'X ≤ 280 characters; one CTA per post', 'Owner approval recorded before scheduling'].map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`);

  const css = BASE_CSS + `
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,9,13,.95),rgba(9,9,13,.55) 60%,rgba(9,9,13,.2))}
.cover{padding:0}.cv-sym{position:absolute;top:100px;left:120px;height:110px}.cv-meta{position:absolute;top:108px;right:120px;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx)}
.cv-h{position:absolute;left:110px;bottom:230px;font-size:210px;line-height:.88;font-weight:700;letter-spacing:-.055em}.cv-sub{position:absolute;left:122px;bottom:120px;font-size:26px;color:var(--tx)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:110px}.bk2{display:block;font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);margin-bottom:14px}
.reg{width:100%;border-collapse:collapse;font-size:21px}.reg td{padding:16px 12px 16px 0;border-bottom:1px solid var(--ln);color:var(--tx)}.reg td.pl{font-weight:700;color:var(--sw);font-size:25px}
.ov{list-style:none;display:grid;grid-template-columns:1fr 1fr;column-gap:60px;border-top:2px solid var(--ac)}.ov li{display:grid;grid-template-columns:60px 1fr;grid-template-rows:auto auto;column-gap:16px;padding:14px 0;border-bottom:1px solid var(--ln)}
.od{grid-row:span 2;font-size:30px;font-weight:700;color:var(--ac)}.ov b{font-size:24px}.ov em{font-style:normal;font-size:16px;color:var(--mu)}.op{display:none}
.dh{display:flex;gap:40px;align-items:center}.dn{font-size:170px;line-height:.8;font-weight:700;letter-spacing:-.06em;color:var(--ac)}.dn.sm{font-size:64px}
.hooks{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:40px}.hooks div{background:var(--ob);padding:22px 26px}.hooks p{font-size:30px;font-weight:700;line-height:1.3}.hooks .ar .bk2{text-align:right}
.purp{margin-top:26px;font-size:25px;color:var(--li);border-right:4px solid var(--ac);padding-right:18px}
.brief{display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;margin-top:26px}.brief p{font-size:21px;line-height:1.5;color:var(--tx)}
.cap,.pr{padding-top:92px}
.ch-h{display:flex;align-items:center;gap:26px;margin-bottom:26px}.ch-h h3{font-size:40px;letter-spacing:-.02em;flex:1}
.caps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;height:820px}.col3{display:flex;flex-direction:column;gap:14px;min-height:0}.col3 article{flex:none}.col3 article:last-child{flex:1}
.caps article{background:var(--gr);padding:18px 22px;overflow:hidden;display:flex;flex-direction:column}.t-light .caps article{background:#fff}
.caps header{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid var(--ac);padding-bottom:8px;margin-bottom:10px}.caps header b{font-size:21px}.caps header span{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--mu)}
.caps article>div{font-size:16.5px;line-height:1.5;color:var(--tx)}.t-light .caps article>div{color:#2c2a33}
.caps .ar{font-size:17.5px;line-height:1.55}

.rtl{direction:rtl}.rtl header{direction:ltr}
.prompt{columns:2;column-gap:60px;font-size:14.2px;line-height:1.48;color:var(--tx);height:770px;column-fill:auto}
`;
  return render(pages, css, 'SayTamm — 14-Day Content Book', '14-day content book');
}

function render(pages, css, title, label) {
  const n = pages.length;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${fontFaces()}${css}</style></head><body>
${pages.map((p, i) => {
  const light = /t-light/.test(p.cls);
  const chrome = p.sec ? `<img class="mark" src="${light ? SYM_B : SYM_W}" alt=""><div class="run"><span>SayTamm — ${esc(label)}</span><span>${esc(p.sec)}</span><span>${dd(i + 1)} / ${n}</span></div>` : '';
  return `<section class="pg ${p.cls}">${p.body}${chrome}</section>`;
}).join('\n')}</body></html>`;
  return { html, n };
}

// =====================================================================
// 3. INTERACTIVE CONTENT BOOK (self-contained HTML)
// =====================================================================
function interactive() {
  const data = POSTS.map((p) => ({ day: p.day, title: p.title, format: p.format, pillar: p.pillar, purpose: p.purpose, hook_en: p.hook_en, hook_ar_conv: p.hook_ar_conv, hook_ar_msa: p.hook_ar_msa, visual: p.visual, motion: p.motion, tamm: p.tamm, sound: p.sound, prompt: p.prompt, captions: p.captions }));
  const svg = (f) => 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(PUB, 'brand', f)).toString('base64');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SayTamm — 14-Day Content Book</title>
<style>${fontFaces(true)}
:root{--ob:#09090D;--gr:#17171E;--g2:#202029;--sw:#F5F3FA;--mu:#96939F;--ac:#6C35FF;--ln:rgba(245,243,250,.12);--tx:#CFCCD7}
*{box-sizing:border-box}body{margin:0;background:var(--ob);color:var(--sw);font-family:Satoshi,Plex,sans-serif;line-height:1.5}
.ar{font-family:Plex,Satoshi,sans-serif;direction:rtl;text-align:right}
header.top{display:flex;align-items:center;gap:18px;padding:18px 28px;border-bottom:1px solid var(--ln);position:sticky;top:0;background:rgba(9,9,13,.96);z-index:5}
header.top img{height:28px}header.top b{font-size:17px}header.top span{color:var(--mu);font-size:14px}
.prog{margin-left:auto;font-size:14px;color:var(--mu)}.prog i{display:inline-block;width:160px;height:6px;background:var(--g2);vertical-align:middle;margin-left:10px}.prog i b{display:block;height:100%;background:var(--ac);width:0}
.shell{display:grid;grid-template-columns:280px minmax(0,1fr)}
nav{border-right:1px solid var(--ln);height:calc(100vh - 65px);position:sticky;top:65px;overflow:auto;padding:14px}
nav button{display:flex;gap:12px;align-items:center;width:100%;background:none;border:0;color:var(--tx);font:inherit;font-size:14px;text-align:left;padding:10px 12px;cursor:pointer}
nav button.on{background:var(--gr);color:var(--sw)}nav button em{font-style:normal;color:var(--ac);font-weight:700;width:24px}nav button i{margin-left:auto;width:9px;height:9px;border-radius:50%;background:var(--g2)}
nav button i.s1{background:#E8A33D}nav button i.s2{background:var(--ac)}nav button i.s3{background:#2BB673}
main{padding:30px clamp(16px,3vw,48px) 80px;max-width:1300px}
.kick{color:var(--mu);font-size:13px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
h1{font-size:clamp(32px,4vw,54px);line-height:1;letter-spacing:-.03em;margin:8px 0 18px}
.hooks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.hooks div{background:var(--gr);padding:14px 16px}.hooks small{display:block;color:var(--mu);font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}.hooks p{margin:0;font-size:19px;font-weight:700}
.purp{color:#B79CFF;margin:14px 0}
select,.tabs button{font:inherit}
.status{display:flex;gap:10px;align-items:center;margin:10px 0 22px;font-size:14px;color:var(--mu)}.status select{background:var(--gr);color:var(--sw);border:1px solid var(--ln);padding:6px 10px}
.tabs{display:flex;gap:6px;flex-wrap:wrap;border-bottom:1px solid var(--ln);margin-bottom:16px}.tabs button{background:none;border:0;border-bottom:3px solid transparent;color:var(--tx);padding:10px 14px;cursor:pointer;font-size:15px}.tabs button.on{border-color:var(--ac);color:var(--sw)}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:14px}.card{background:var(--gr);padding:18px 20px;position:relative}
.card h4{margin:0 0 4px;font-size:15px}.card .meta{color:var(--mu);font-size:12px;margin-bottom:10px}.card pre{white-space:pre-wrap;font:inherit;font-size:15.5px;margin:0;color:var(--tx)}
.card .ar pre,.card pre.ar{font-family:Plex,sans-serif}
.copy{position:absolute;top:14px;right:14px;background:var(--ac);color:var(--sw);border:0;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer}.ar .copy,.card.ar .copy{right:auto;left:14px}
.count{font-size:12px;color:var(--mu);margin-top:8px;direction:ltr;text-align:left}.count.bad{color:#E5484D}
details{background:var(--gr);margin-top:12px;padding:14px 18px}summary{cursor:pointer;font-weight:700}details pre{white-space:pre-wrap;font:inherit;font-size:14px;color:var(--tx)}
.brief{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.brief div{background:var(--gr);padding:14px 16px;font-size:14.5px;color:var(--tx)}.brief b{display:block;color:var(--sw);margin-bottom:4px}
@media(max-width:860px){.shell{grid-template-columns:1fr}nav{position:static;height:auto;display:flex;overflow-x:auto;border-right:0;border-bottom:1px solid var(--ln)}nav button{white-space:nowrap;width:auto}.pair,.hooks,.brief{grid-template-columns:1fr}.prog{display:none}}
</style></head><body>
<header class="top"><img src="${svg('SayTamm_Symbol_Signature_White-Purple.svg')}" alt="SayTamm"><b>14-Day Content Book</b><span>${VERSION} · internal</span><div class="prog">Approved <span id="pc">0</span>/14<i><b id="pb"></b></i></div></header>
<div class="shell"><nav id="nav"></nav><main id="main"></main></div>
<script>
const POSTS=${JSON.stringify(data)};
const PL=${JSON.stringify(PLATFORMS)};
const ST=['Not started','In progress','In review','Approved','Published'];
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let cur=1,tab='Facebook';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function st(d){return +(store.get('st-'+d)||0)}
function nav(){document.getElementById('nav').innerHTML=POSTS.map(p=>'<button class="'+(p.day===cur?'on':'')+'" onclick="go('+p.day+')"><em>'+String(p.day).padStart(2,'0')+'</em>'+esc(p.title)+'<i class="s'+Math.min(st(p.day),3)+'"></i></button>').join('');
 const a=POSTS.filter(p=>st(p.day)>=3).length;document.getElementById('pc').textContent=a;document.getElementById('pb').style.width=(a/14*100)+'%'}
function card(txt,lang,title,meta,limit){const n=[...txt].length;return '<div class="card '+(lang==='ar'?'ar':'')+'"><button class="copy" onclick="cp(this)">'+(lang==='ar'?'نسخ':'Copy')+'</button><h4>'+title+'</h4><div class="meta">'+meta+'</div><pre class="'+(lang==='ar'?'ar':'')+'">'+esc(txt)+'</pre><div class="count'+(limit&&n>limit?' bad':'')+'">'+n+' characters'+(limit?' / '+limit:'')+'</div></div>'}
function render(){const p=POSTS.find(x=>x.day===cur),c=p.captions[tab],lim=tab==='X'?280:null;
 document.getElementById('main').innerHTML='<div class="kick">Day '+String(p.day).padStart(2,'0')+' · '+esc(p.pillar)+' · '+esc(p.format)+'</div><h1>'+esc(p.title)+'</h1>'+
 '<div class="hooks"><div><small>Hook · EN</small><p>'+esc(p.hook_en)+'</p></div><div class="ar"><small>عامية</small><p>'+esc(p.hook_ar_conv)+'</p></div><div class="ar"><small>فصحى</small><p>'+esc(p.hook_ar_msa)+'</p></div></div>'+
 '<p class="purp ar">'+esc(p.purpose)+'</p><div class="status">Status <select onchange="setSt(this.value)">'+ST.map((s,i)=>'<option value="'+i+'"'+(st(p.day)===i?' selected':'')+'>'+s+'</option>').join('')+'</select></div>'+
 '<div class="tabs">'+PL.map(x=>'<button class="'+(x===tab?'on':'')+'" onclick="tb(\\''+x+'\\')">'+x+'</button>').join('')+'</div>'+
 '<div class="pair">'+card(c.ar,'ar',tab+' · العربية',c.register_ar==='msa'?'فصحى':'عامية',lim)+card(c.en,'en',tab+' · English','British English',lim)+'</div>'+
 '<div class="brief"><div><b>Visual</b>'+esc(p.visual)+'</div><div><b>Motion &amp; edit</b>'+esc(p.motion)+'</div><div><b>TAMM</b>'+esc(p.tamm)+'</div><div><b>Sound</b>'+esc(p.sound)+'</div></div>'+
 '<details><summary>Production prompt</summary><button class="copy" style="position:static;margin:10px 0" onclick="cpP()">Copy prompt</button><pre>'+esc(p.prompt)+'</pre></details>'}
function go(d){cur=d;render();nav();window.scrollTo(0,0)}
function tb(t){tab=t;render()}
function setSt(v){store.set('st-'+cur,v);nav()}
function cp(b){const t=b.parentElement.querySelector('pre').innerText;navigator.clipboard&&navigator.clipboard.writeText(t);const o=b.textContent;b.textContent='✓';setTimeout(()=>b.textContent=o,1200)}
function cpP(){navigator.clipboard&&navigator.clipboard.writeText(POSTS.find(x=>x.day===cur).prompt)}
nav();render();
</script></body></html>`;
}

// =====================================================================
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
async function pdf(name, { html, n }, shots) {
  const f = path.join(OUT, name + '.html');
  fs.writeFileSync(f, html);
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(pathToFileURL(f).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
  if (broken.length) throw new Error('broken images ' + broken);
  // overflow check: any text element whose box spills outside its page or whose scroll height exceeds its box
  const spill = await page.evaluate(() => [...document.querySelectorAll('.pg')].flatMap((pg, i) => {
    const r = pg.getBoundingClientRect();
    const out = [...pg.querySelectorAll('*')].filter((e) => { if (e.matches('.bg,.shade')) return false; const b = e.getBoundingClientRect(); return b.width && (b.bottom > r.bottom - 40 && !e.closest('.run') || b.right > r.right + 1); }).slice(0, 2).map((e) => `p${i + 1}:${e.tagName}.${e.className}`);
    const clip = [...pg.querySelectorAll('.caps article>div,.prompt')].filter((e) => e.scrollHeight > e.clientHeight + 2 || e.parentElement.scrollHeight > e.parentElement.clientHeight + 2).slice(0, 2).map((e) => `p${i + 1}:clipped ${e.parentElement.className || e.className}`);
    const pcol = [...pg.querySelectorAll('.prompt')].filter((e) => e.scrollWidth > e.clientWidth + 2).map(() => `p${i + 1}:prompt overflows columns`);
    return [...out, ...clip, ...pcol];
  }));
  if (spill.length) console.warn(`[${name}] layout:`, spill.join(' | '));
  await page.pdf({ path: path.join(OUT, name + '.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
  const sd = path.join(OUT, 'shots', name); fs.mkdirSync(sd, { recursive: true });
  for (let i = 0; i < n; i++) if (!shots || shots.includes(i + 1)) await page.screenshot({ path: path.join(sd, `p-${dd(i + 1)}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 }, fullPage: true });
  await page.close();
  console.log(`${name}.pdf: ${n} pages`);
}
await pdf('SayTamm_Launch_Playbook_v2', playbook());
await pdf('SayTamm_14Day_Content_Book_v2', contentBook());
fs.writeFileSync(path.join(OUT, 'SayTamm_14Day_Content_Book_v2_interactive.html'), interactive());
// smoke-test the interactive file
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(pathToFileURL(path.join(OUT, 'SayTamm_14Day_Content_Book_v2_interactive.html')).href);
  await page.click('nav button:nth-child(4)'); await page.click('.tabs button:nth-child(4)');
  await page.selectOption('.status select', '3');
  const t = await page.textContent('main h1');
  await page.screenshot({ path: path.join(OUT, 'shots', 'interactive.png') });
  if (errs.length) throw new Error('interactive errors ' + errs.join(';'));
  console.log('interactive OK, day 4 =', t, '·', (await page.textContent('#pc')), 'approved');
  await page.close();
}
await browser.close();
