/* 物品升级 第 6 批：辅料 7 款（路线 A 全程序化 SVG） */
import fs from 'node:fs';

const FILE = 'js/assets-kitchen.js';
const BAK_SUFFIX = '.bak_batch6_20260923_141200';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- 7 件新 SVG（简版）---------- */

const honeySVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-honey-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd34d"/>
            <stop offset="60%" stop-color="#f2b730"/>
            <stop offset="100%" stop-color="#d98324"/>
          </linearGradient>
          <linearGradient id="item-honey-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e0a93c"/>
            <stop offset="100%" stop-color="#a06820"/>
          </linearGradient>
          <linearGradient id="item-honey-label" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5e8d0"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="72" rx="24" ry="3" fill="rgba(0,0,0,.12)"/>
        <rect x="20" y="26" width="40" height="42" rx="12" fill="url(#item-honey-body)" stroke="#a06820" stroke-width="2.5"/>
        <rect x="24" y="30" width="4" height="34" rx="2" fill="#fff" opacity=".55"/>
        <rect x="16" y="16" width="48" height="13" rx="6.5" fill="url(#item-honey-cap)" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="20" y="18" width="40" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="20" y="22" width="40" height="2" fill="#fff" opacity=".4"/>
        <rect x="26" y="38" width="28" height="18" rx="5" fill="url(#item-honey-label)" stroke="#c9a878" stroke-width="1.5"/>
        <path d="M34,48 Q40,42 46,48" stroke="#d98324" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="40" cy="46" rx="2.5" ry="1.5" fill="#d98324" opacity=".7"/>
        <g transform="translate(56,52)">
          <ellipse cx="0" cy="0" rx="4" ry="3" fill="#ffd34d" stroke="#a06820" stroke-width=".8"/>
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#5a3a1d" stroke-width=".8"/>
          <ellipse cx="-3" cy="-2" rx="2.5" ry="1.5" fill="#fff" opacity=".6" transform="rotate(-30 -3 -2)"/>
          <ellipse cx="3" cy="-2" rx="2.5" ry="1.5" fill="#fff" opacity=".6" transform="rotate(30 3 -2)"/>
        </g>
      </svg>`;

const noodlesSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-noodles-bowl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-noodles-strand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff5b8"/>
            <stop offset="100%" stop-color="#d9b87a"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="56" rx="28" ry="3" fill="rgba(0,0,0,.12)"/>
        ${[0, 1, 2, 3, 4].map(i =>
          '<path d="M' + (18 + i * 9) + ',20 Q' + (26 + i * 9) + ',42 ' + (22 + i * 9) + ',62" stroke="url(#item-noodles-strand)" stroke-width="6" fill="none" stroke-linecap="round"/>').join('')}
        <path d="M22,28 Q26,42 24,58" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".55"/>
        <rect x="16" y="34" width="46" height="14" rx="4" fill="url(#item-noodles-bowl)" stroke="#c4738a" stroke-width="2"/>
        <rect x="20" y="36" width="38" height="2" rx="1" fill="#fff" opacity=".55"/>
        <ellipse cx="40" cy="48" rx="22" ry="2" fill="#c4738a" opacity=".7"/>
        <circle cx="39" cy="41" r="4" fill="#fff" stroke="#c4738a" stroke-width="1.2"/>
        <circle cx="37" cy="39" r="1.2" fill="#fff" opacity=".8"/>
        <g transform="translate(64,32) rotate(20)">
          <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#bcc4cf" stroke="#7a8590" stroke-width="1"/>
          <rect x="-1" y="1" width="2" height="14" fill="#bcc4cf" stroke="#7a8590" stroke-width="1"/>
        </g>
      </svg>`;

const scallionSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-scallion-white" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8f0dc"/>
          </linearGradient>
          <linearGradient id="item-scallion-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8fe08a"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </linearGradient>
          <radialGradient id="item-scallion-bg" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#d8e4c0"/>
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="76" rx="16" ry="3" fill="rgba(0,0,0,.12)"/>
        <ellipse cx="40" cy="62" rx="10" ry="13" fill="url(#item-scallion-bg)" stroke="#a8c090" stroke-width="2"/>
        <ellipse cx="36" cy="58" rx="3" ry="6" fill="#fff" opacity=".7"/>
        <line x1="36" y1="54" x2="33" y2="22" stroke="url(#item-scallion-green)" stroke-width="6" stroke-linecap="round"/>
        <line x1="44" y1="54" x2="47" y2="22" stroke="url(#item-scallion-green)" stroke-width="6" stroke-linecap="round"/>
        <line x1="40" y1="52" x2="40" y2="16" stroke="#7ed47b" stroke-width="6" stroke-linecap="round"/>
        <line x1="35" y1="50" x2="33" y2="24" stroke="#fff" stroke-width="1.2" opacity=".55"/>
        <line x1="39" y1="48" x2="40" y2="20" stroke="#fff" stroke-width="1.2" opacity=".55"/>
        <path d="M36,74 L34,79 M44,74 L46,79 M40,74 L40,79" stroke="#a8c090" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`;

const bokchoySVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bokchoy-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </linearGradient>
          <linearGradient id="item-bokchoy-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7b8"/>
            <stop offset="100%" stop-color="#7ec088"/>
          </linearGradient>
          <linearGradient id="item-bokchoy-white" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8f0dc"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="76" rx="18" ry="3" fill="rgba(0,0,0,.12)"/>
        <ellipse cx="40" cy="60" rx="13" ry="15" fill="url(#item-bokchoy-white)" stroke="#a8c090" stroke-width="2"/>
        <ellipse cx="28" cy="54" rx="7" ry="14" fill="#e8f0dc" stroke="#a8c090" stroke-width="1.5" transform="rotate(-16 28 54)"/>
        <ellipse cx="52" cy="54" rx="7" ry="14" fill="#e8f0dc" stroke="#a8c090" stroke-width="1.5" transform="rotate(16 52 54)"/>
        <path d="M40,52 L40,70" stroke="#a8c090" stroke-width=".8" fill="none" opacity=".7"/>
        <path d="M28,46 L28,62" stroke="#a8c090" stroke-width=".8" fill="none" opacity=".7" transform="rotate(-16 28 54)"/>
        <path d="M52,46 L52,62" stroke="#a8c090" stroke-width=".8" fill="none" opacity=".7" transform="rotate(16 52 54)"/>
        <ellipse cx="40" cy="34" rx="17" ry="17" fill="url(#item-bokchoy-top)" stroke="#3a8a3a" stroke-width="2"/>
        <ellipse cx="34" cy="28" rx="6" ry="4" fill="#fff" opacity=".55"/>
        <path d="M40,18 Q40,34 40,50" stroke="#3a8a3a" stroke-width="1" fill="none" opacity=".7"/>
        <path d="M28,26 Q34,32 40,34" stroke="#3a8a3a" stroke-width=".8" fill="none" opacity=".7"/>
        <path d="M52,26 Q46,32 40,34" stroke="#3a8a3a" stroke-width=".8" fill="none" opacity=".7"/>
        <ellipse cx="27" cy="40" rx="11" ry="14" fill="url(#item-bokchoy-side)" stroke="#4a9a4a" stroke-width="1.5" transform="rotate(-28 27 40)"/>
        <ellipse cx="53" cy="40" rx="11" ry="14" fill="url(#item-bokchoy-side)" stroke="#4a9a4a" stroke-width="1.5" transform="rotate(28 53 40)"/>
        <path d="M20,30 Q26,40 30,52" stroke="#4a9a4a" stroke-width=".8" fill="none" opacity=".7" transform="rotate(-28 27 40)"/>
        <path d="M60,30 Q54,40 50,52" stroke="#4a9a4a" stroke-width=".8" fill="none" opacity=".7" transform="rotate(28 53 40)"/>
      </svg>`;

const flourSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-flour-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8e8"/>
            <stop offset="60%" stop-color="#f2e0c8"/>
            <stop offset="100%" stop-color="#d9c4a8"/>
          </linearGradient>
          <linearGradient id="item-flour-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8d8b8"/>
            <stop offset="100%" stop-color="#a89070"/>
          </linearGradient>
          <radialGradient id="item-flour-circle" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5e8d0"/>
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="74" rx="22" ry="3" fill="rgba(0,0,0,.12)"/>
        <path d="M22,26 L58,26 L62,68 Q40,74 18,68 Z" fill="url(#item-flour-body)" stroke="#a89070" stroke-width="2"/>
        <path d="M26,30 Q24,50 24,68" stroke="#fff" stroke-width="1.5" fill="none" opacity=".5"/>
        <rect x="22" y="16" width="36" height="12" rx="4" fill="url(#item-flour-top)" stroke="#7a6c5a" stroke-width="2"/>
        <rect x="26" y="18" width="28" height="2" rx="1" fill="#fff" opacity=".55"/>
        <circle cx="40" cy="48" r="12" fill="url(#item-flour-circle)" stroke="#c9a878" stroke-width="1.5"/>
        <text x="40" y="53" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="14" font-weight="800" fill="#d9a83e">F</text>
        <g transform="translate(60,64)" opacity=".55">
          <ellipse cx="0" cy="0" rx="4" ry="2" fill="#e8a86b" stroke="#a06820" stroke-width=".6"/>
          <path d="M-3,-1 q2,-2 3,0" stroke="#a06820" stroke-width=".4" fill="none"/>
        </g>
      </svg>`;

const sugarSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-sugar-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8e0f2"/>
          </linearGradient>
          <linearGradient id="item-sugar-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dde3ea"/>
            <stop offset="100%" stop-color="#9aa3b0"/>
          </linearGradient>
          <radialGradient id="item-sugar-heart" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="72" rx="22" ry="3" fill="rgba(0,0,0,.12)"/>
        <rect x="18" y="14" width="44" height="12" rx="6" fill="url(#item-sugar-cap)" stroke="#5a6b7a" stroke-width="2"/>
        <rect x="22" y="16" width="36" height="2" rx="1" fill="#fff" opacity=".55"/>
        <rect x="18" y="18" width="44" height="2" fill="#fff" opacity=".4"/>
        <rect x="22" y="24" width="36" height="44" rx="10" fill="url(#item-sugar-body)" stroke="#a8a0b8" stroke-width="2"/>
        <rect x="26" y="28" width="4" height="36" rx="2" fill="#fff" opacity=".7"/>
        <rect x="50" y="28" width="6" height="36" rx="3" fill="rgba(0,0,0,.05)"/>
        <path d="M40,54 C34,54 32,48 36,45 C38,43.5 40,45 40,46 C40,45 42,43.5 44,45 C48,48 46,54 40,54 Z" fill="url(#item-sugar-heart)" stroke="#c4738a" stroke-width="1.5"/>
        <ellipse cx="37" cy="47" rx="1.5" ry="1" fill="#fff" opacity=".7"/>
      </svg>`;

const butterSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-butter-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff5b0"/>
            <stop offset="100%" stop-color="#f2c94c"/>
          </linearGradient>
          <linearGradient id="item-butter-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd166"/>
            <stop offset="100%" stop-color="#d9a83e"/>
          </linearGradient>
          <linearGradient id="item-butter-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2c94c"/>
            <stop offset="100%" stop-color="#a06820"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="68" rx="28" ry="3" fill="rgba(0,0,0,.12)"/>
        <ellipse cx="40" cy="60" rx="26" ry="8" fill="#fff" stroke="#c9a878" stroke-width="2"/>
        <ellipse cx="34" cy="58" rx="10" ry="3" fill="#fff" opacity=".7"/>
        <path d="M20,42 L48,42 L56,50 L28,50 Z" fill="url(#item-butter-top)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
        <rect x="20" y="42" width="28" height="14" fill="url(#item-butter-front)" stroke="#c9a878" stroke-width="2"/>
        <rect x="22" y="44" width="24" height="2" rx="1" fill="#fff" opacity=".55"/>
        <path d="M48,42 L56,50 L56,64 L48,56 Z" fill="url(#item-butter-side)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
        <rect x="20" y="56" width="28" height="14" fill="url(#item-butter-front)" stroke="#c9a878" stroke-width="2"/>
        <rect x="22" y="58" width="24" height="2" rx="1" fill="#fff" opacity=".55"/>
        <path d="M48,56 L56,64 L28,64 L20,56 Z" fill="url(#item-butter-top)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="32" cy="58" r=".8" fill="#fff" stroke="#c9a878" stroke-width=".4"/>
        <circle cx="38" cy="59" r=".8" fill="#fff" stroke="#c9a878" stroke-width=".4"/>
        <circle cx="44" cy="58" r=".8" fill="#fff" stroke="#c9a878" stroke-width=".4"/>
      </svg>`;

/* ---------- 按位置从小到大定位 + 替换（用 orig 索引，不累加）---------- */
const segs = [
  { label: 'honey', newSVG: honeySVG },
  { label: 'noodles', newSVG: noodlesSVG },
  { label: 'scallion', newSVG: scallionSVG },
  { label: 'bokchoy', newSVG: bokchoySVG },
  { label: 'flour', newSVG: flourSVG },
  { label: 'sugar', newSVG: sugarSVG },
  { label: 'butter', newSVG: butterSVG },
];

const positions = segs.map(r => {
  const startAnchor = '    ' + r.label + ': `\n      <svg viewBox="0 0 80 80"';
  const endAnchor = '</svg>`';
  const sIdx = orig.indexOf(startAnchor);
  if (sIdx < 0) { console.error('NOT FOUND start:', r.label); process.exit(1); }
  const eIdx = orig.indexOf(endAnchor, sIdx);
  if (eIdx < 0) { console.error('NOT FOUND end:', r.label); process.exit(1); }
  return { label: r.label, sIdx, endIdx: eIdx + endAnchor.length, newSVG: r.newSVG };
}).sort((a, b) => a.sIdx - b.sIdx);

for (let i = 0; i < positions.length - 1; i++) {
  if (positions[i].endIdx > positions[i + 1].sIdx) {
    console.error('OVERLAP:', positions[i].label, '->', positions[i + 1].label);
    process.exit(1);
  }
}

let out = '';
let last = 0;
for (const p of positions) {
  out += orig.slice(last, p.sIdx);
  out += '    ' + p.label + ': `' + p.newSVG + '`';
  last = p.endIdx;
}
out += orig.slice(last);

fs.writeFileSync(FILE, out, 'utf8');
console.log('written:', FILE, '(' + out.length + ' bytes, +' + (out.length - orig.length) + ')');

try {
  new Function(out);
  console.log('syntax OK');
} catch (e) {
  console.error('SYNTAX ERROR:', e.message);
  process.exit(1);
}

for (const label of segs.map(s => s.label)) {
  if (!out.includes(label + ':')) { console.error('id missing:', label); process.exit(1); }
  console.log('  ' + label + ' OK');
}
console.log('all 7 ids verified');
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');