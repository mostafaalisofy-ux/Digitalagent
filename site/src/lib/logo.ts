// The approved SayTamm symbol (D-011), read verbatim from the production SVG.
// Every logo, sculpture and pattern on the site uses these exact paths — nothing is redrawn.
import raw from '../assets/logo/symbol.svg?raw';

const viewBox = raw.match(/viewBox="([^"]+)"/)![1];
const paths = [...raw.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
if (paths.length !== 2) throw new Error('symbol.svg must contain exactly two paths (T-form, blade)');

export const SYMBOL = {
  viewBox,                       // "0 0 600 721"
  width: 600,
  height: 721,
  ratio: 600 / 721,              // ≈ 0.832 (W:H)
  t: paths[0],                   // T-form
  blade: paths[1],               // diagonal completion element
  /** Tight box around the blade alone (from the path's own coordinates). */
  bladeBox: { x: 211.5, y: 250.6, w: 382.8, h: 463.9 },
};
