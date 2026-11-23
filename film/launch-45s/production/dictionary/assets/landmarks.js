// Fine-line landmark drawings for The SayTamm Dictionary (original line art, drawn for this film).
// Each skyline lives in a 1080 × 660 box with the ground at y = 620. Each entry: [d, kind], kind: 'l' line, 'a' accent (purple), 'h' hatching (fainter).
// eslint-disable-next-line no-unused-vars
const LANDMARKS = (() => {
  const P = [];
  const add = (set, d, k = 'l') => set.push([d, k]);
  const lerp = (a, b, q) => a + (b - a) * q;

  // ---------------------------------------------------------------- RIYADH + DIRIYAH
  const SA = [];
  add(SA, 'M0 620 H1080');
  // Kingdom Centre: tapering tower, the parabolic opening and the sky bridge
  const kL = (y) => lerp(498, 522, (620 - y) / 540), kR = (y) => lerp(622, 598, (620 - y) / 540);
  add(SA, 'M498 620 C503 430 513 230 522 80');
  add(SA, 'M622 620 C617 430 607 230 598 80');
  add(SA, 'M522 80 C532 150 546 204 560 216 C574 204 588 150 598 80');
  add(SA, 'M531 128 Q560 140 589 128', 'a');
  add(SA, 'M531 136 Q560 148 589 136', 'a');
  for (let y = 600; y > 250; y -= 22) add(SA, `M${kL(y).toFixed(1)} ${y} H${kR(y).toFixed(1)}`, 'h');
  [0.25, 0.5, 0.75].forEach((q) => add(SA, `M${lerp(498, 622, q).toFixed(1)} 620 L${lerp(522, 598, q).toFixed(1)} ${q === 0.5 ? 216 : 240}`, 'h'));
  // Al Faisaliah: the tapering frame and the sphere
  add(SA, 'M262 620 L298 118');
  add(SA, 'M338 620 L302 118');
  add(SA, 'M300 118 V36');
  add(SA, 'M270 232 A30 30 0 1 0 330 232 A30 30 0 1 0 270 232', 'a');
  for (let y = 590; y > 280; y -= 34) { const w = lerp(38, 6, (620 - y) / 500); add(SA, `M${300 - w} ${y} H${300 + w}`, 'h'); }
  add(SA, 'M272 520 L328 440 M328 520 L272 440', 'h');
  // Diriyah: mud-brick blocks and a watchtower with triangular crenellations
  const cren = (x0, x1, y, h = 16, w = 20) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += w) d += ` L${x + w / 2} ${y - h} L${Math.min(x + w, x1)} ${y}`; return d; };
  add(SA, 'M690 620 V486 H820 V620');
  add(SA, cren(690, 820, 486));
  add(SA, 'M836 620 L848 372 H904 L916 620');
  add(SA, cren(848, 904, 372, 18, 14));
  add(SA, 'M930 620 V506 H1070 V620');
  add(SA, cren(930, 1070, 506));
  [[716, 540], [756, 540], [796, 540], [956, 556], [996, 556], [1036, 556]].forEach(([x, y]) => add(SA, `M${x} ${y} l7 -14 l7 14 Z`, 'h'));
  [440, 500, 560].forEach((y) => add(SA, `M${870} ${y} v22 M${882} ${y} v22`, 'h'));
  // palms
  const palm = (set, x, h) => {
    add(set, `M${x} 620 C${x + 6} ${620 - h * 0.35} ${x - 4} ${620 - h * 0.7} ${x + 8} ${620 - h}`);
    const tx = x + 8, ty = 620 - h;
    [[-80, 10, -60, -16], [-60, -30, -30, -44], [10, -46, 34, -52], [70, -12, 82, 8], [52, 20, 60, 46], [-30, 22, -44, 44]].forEach(([cx, cy, ex, ey]) => add(set, `M${tx} ${ty} Q${tx + cx} ${ty + cy} ${tx + ex} ${ty + ey}`));
  };
  palm(SA, 110, 230); palm(SA, 650, 170);

  // ---------------------------------------------------------------- GIZA
  const EG = [];
  add(EG, 'M0 620 C200 604 400 630 620 614 S900 604 1080 618');
  // the Great Pyramid: lit face, shadow face with stone courses, the capstone
  add(EG, 'M420 618 L660 190 L900 616');
  add(EG, 'M660 190 L742 620');
  for (let y = 222; y < 610; y += 20) { const q = (y - 190) / 430; add(EG, `M${lerp(660, 742, q).toFixed(1)} ${y} L${lerp(660, 900, q).toFixed(1)} ${y}`, 'h'); }
  for (let y = 260; y < 610; y += 40) { const q = (y - 190) / 430; add(EG, `M${lerp(660, 420, q).toFixed(1)} ${y} L${lerp(660, 742, q).toFixed(1)} ${y}`, 'h'); }
  add(EG, 'M650 208 L660 190 L670 208', 'a');
  // Khafre and Menkaure
  add(EG, 'M842 612 L978 358 L1080 548');
  add(EG, 'M978 358 L1010 612');
  add(EG, 'M300 620 L384 496 L468 618');
  add(EG, 'M384 496 L404 620');
  // the Sphinx, couchant, facing right
  add(EG, 'M24 620 L30 594 C54 576 116 572 168 574 C196 574 214 566 222 546 L226 506 C228 490 236 480 250 476 L272 474 C284 476 290 486 290 500 L292 522 C292 530 286 534 280 536 L284 562 C302 572 330 582 352 592 L356 620');
  add(EG, 'M248 478 L240 540');
  add(EG, 'M262 478 L258 532', 'h');
  add(EG, 'M240 602 H354 M250 612 H356', 'h');
  add(EG, 'M60 596 C90 590 130 588 170 590', 'h');
  // a palm by the Nile edge
  palm(EG, 1030, 150);

  // ---------------------------------------------------------------- LONDON
  const EN = [];
  add(EN, 'M0 620 H1080');
  add(EN, 'M30 640 H280 M420 648 H720 M780 640 H1040', 'h');
  // the Elizabeth Tower (Big Ben)
  add(EN, 'M826 620 V252 M894 620 V252');
  [843, 860, 877].forEach((x) => add(EN, `M${x} 620 V262`, 'h'));
  [560, 500, 440, 380, 320].forEach((y) => add(EN, `M826 ${y} H894`, 'h'));
  add(EN, 'M814 252 H906 V160 H814 Z');
  add(EN, 'M828 206 A32 32 0 1 0 892 206 A32 32 0 1 0 828 206', 'a');
  add(EN, 'M860 206 V184 M860 206 L876 214', 'a');
  add(EN, 'M824 160 V118 H896 V160');
  [842, 860, 878].forEach((x) => add(EN, `M${x} 158 V126`, 'h'));
  add(EN, 'M818 118 L860 20 L902 118');
  add(EN, 'M840 118 L860 64 L880 118', 'h');
  add(EN, 'M822 118 V94 M898 118 V94');
  // the Palace of Westminster
  add(EN, 'M560 620 V542 H814');
  for (let x = 572; x < 814; x += 30) add(EN, `M${x} 542 V524`, 'h');
  for (let x = 586; x < 814; x += 30) add(EN, `M${x} 600 V560`, 'h');
  // the London Eye: rim, hub, spokes, capsules, A-frame
  add(EN, 'M40 330 A210 210 0 1 0 460 330 A210 210 0 1 0 40 330');
  add(EN, 'M236 330 A14 14 0 1 0 264 330 A14 14 0 1 0 236 330', 'a');
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; add(EN, `M${(250 + 14 * Math.cos(a)).toFixed(1)} ${(330 + 14 * Math.sin(a)).toFixed(1)} L${(250 + 206 * Math.cos(a)).toFixed(1)} ${(330 + 206 * Math.sin(a)).toFixed(1)}`, 'h'); }
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2, x = 250 + 222 * Math.cos(a), y = 330 + 222 * Math.sin(a); add(EN, `M${(x - 7).toFixed(1)} ${y.toFixed(1)} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0`); }
  add(EN, 'M250 330 L170 620 M250 330 L330 620');

  P.push(SA, EG, EN);
  return { SA, EG, EN };
})();
