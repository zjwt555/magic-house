/* 物品升级 第 7 批·Step 1: wardrobecab 升级 + chair 新增（不动 WORLD_ROOMS/测试）
   老吴 2026-09-23 15:29 拍板"换衣柜移到卧室"——先做 wardrobecab 升级 + 新增 chair SVG（不删 wardrobe 也不加 school）。
   第 2 步再做合并 + school 上线 + 改 test-auto.html。 */
import fs from 'node:fs';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_wardrobecab_chair_20260923_154500';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- wardrobecab 精致化版 ---------- */
const wardrobecabSVG = `
      <svg viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-wardrobecab-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffc9d8"/>
            <stop offset="60%" stop-color="#f7b8cd"/>
            <stop offset="100%" stop-color="#d98cb0"/>
          </linearGradient>
          <linearGradient id="item-wardrobecab-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a3bd"/>
            <stop offset="100%" stop-color="#a85676"/>
          </linearGradient>
          <linearGradient id="item-wardrobecab-door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff5f8"/>
            <stop offset="60%" stop-color="#f7c6dd"/>
            <stop offset="100%" stop-color="#e8a3bd"/>
          </linearGradient>
          <linearGradient id="item-wardrobecab-handle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7ea9be"/>
            <stop offset="50%" stop-color="#bcc4cf"/>
            <stop offset="100%" stop-color="#7ea9be"/>
          </linearGradient>
        </defs>
        <ellipse cx="70" cy="195" rx="64" ry="4" fill="rgba(0,0,0,.12)"/>
        <rect x="8" y="10" width="124" height="184" rx="12" fill="url(#item-wardrobecab-body)" stroke="#a85676" stroke-width="2.5"/>
        <rect x="12" y="14" width="6" height="174" rx="3" fill="#fff" opacity=".55"/>
        <line x1="70" y1="14" x2="70" y2="190" stroke="#a85676" stroke-width="4"/>
        <rect x="8" y="0" width="124" height="14" rx="7" fill="url(#item-wardrobecab-frame)" stroke="#a85676" stroke-width="2"/>
        <rect x="12" y="2" width="116" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="18" y="20" width="46" height="164" rx="8" fill="url(#item-wardrobecab-door)" stroke="#a85676" stroke-width="1.5"/>
        <rect x="22" y="24" width="38" height="3" rx="1.5" fill="#fff" opacity=".7"/>
        <circle cx="60" cy="102" r="5" fill="url(#item-wardrobecab-handle)" stroke="#5a7a8a" stroke-width="1.2"/>
        <circle cx="58" cy="100" r="1.5" fill="#fff" opacity=".85"/>
        <g transform="translate(41,64) scale(.55)">
          <path d="M-9,-21 L-14,-4 L-23,15 Q0,25 23,15 L14,-4 L9,-21 Q0,-15 -9,-21 Z" fill="#e05c86" stroke="#a02a52" stroke-width="1"/>
          <path d="M-3,-3 L5,-3" stroke="#fff" stroke-width="1" fill="none"/>
          <circle cx="0" cy="-3" r="4.5" fill="#ffd0e0" stroke="#a02a52" stroke-width=".6"/>
        </g>
        <rect x="76" y="20" width="46" height="164" rx="8" fill="url(#item-wardrobecab-door)" stroke="#a85676" stroke-width="1.5"/>
        <rect x="80" y="24" width="38" height="3" rx="1.5" fill="#fff" opacity=".7"/>
        <circle cx="80" cy="102" r="5" fill="url(#item-wardrobecab-handle)" stroke="#5a7a8a" stroke-width="1.2"/>
        <circle cx="78" cy="100" r="1.5" fill="#fff" opacity=".85"/>
        <g transform="translate(99,60) scale(.5)">
          <path d="M0,-18 L5,-6 L18,-5 L8,4 L11,17 L0,10 L-11,17 L-8,4 L-18,-5 L-5,-6 Z" fill="#ffd34d" stroke="#c69418" stroke-width="1.5"/>
          <circle r="2" fill="#fff" opacity=".7"/>
        </g>
        <line x1="22" y1="138" x2="118" y2="138" stroke="#a85676" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M48,138 L48,160 L62,160 L62,138 Z" fill="#7ec8e3" stroke="#3a7a9a" stroke-width="1"/>
        <path d="M78,138 L78,160 L92,160 L92,138 Z" fill="#98d8a0" stroke="#5a9e56" stroke-width="1"/>
        <g transform="translate(70,182)">
          <path d="M0,0 C-6,-6 -10,2 -6,5 C-3,7 -2,4 0,4 C2,4 3,7 6,5 C10,2 6,-6 0,0 Z" fill="#ff9eb5" stroke="#e05c86" stroke-width="1"/>
          <circle r="2" fill="#e05c86"/>
        </g>
      </svg>`;

/* ---------- chair 新增（学校场景用，预留）---------- */
const chairSVG = `
      <svg viewBox="0 0 110 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-chair-leg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-chair-seat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-chair-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffc9d8"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
        </defs>
        <ellipse cx="55" cy="142" rx="40" ry="4" fill="rgba(0,0,0,.12)"/>
        <line x1="22" y1="68" x2="18" y2="138" stroke="url(#item-chair-leg)" stroke-width="6" stroke-linecap="round"/>
        <line x1="88" y1="68" x2="92" y2="138" stroke="url(#item-chair-leg)" stroke-width="6" stroke-linecap="round"/>
        <rect x="14" y="58" width="82" height="20" rx="6" fill="url(#item-chair-seat)" stroke="#c4738a" stroke-width="2"/>
        <rect x="18" y="60" width="74" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="20" y="14" width="70" height="46" rx="14" fill="url(#item-chair-back)" stroke="#c4738a" stroke-width="2"/>
        <ellipse cx="55" cy="22" rx="20" ry="5" fill="#fff" opacity=".55"/>
        <ellipse cx="35" cy="50" rx="6" ry="2" fill="#fff" opacity=".7"/>
        <ellipse cx="75" cy="50" rx="6" ry="2" fill="#fff" opacity=".7"/>
      </svg>`;

/* ---------- 替换：从 orig 中直接切出老段做 old ---------- */

const wardrobecabStart = orig.indexOf("    wardrobecab: { fixture: true, w: 0.135, fx: 0.08, act: 'wardrobe', svg: `");
if (wardrobecabStart < 0) { console.error('wardrobecab start not found'); process.exit(1); }
const wardrobecabEndIdx = orig.indexOf('</svg>`', wardrobecabStart);
if (wardrobecabEndIdx < 0) { console.error('wardrobecab end not found'); process.exit(1); }
const wardrobecabClose = orig.indexOf(' },', wardrobecabEndIdx);
if (wardrobecabClose < 0) { console.error('wardrobecab close not found'); process.exit(1); }
const wardrobecabOld = orig.slice(wardrobecabStart, wardrobecabClose + 3);
console.log('wardrobecabOld len=' + wardrobecabOld.length);

const blackboardStart = orig.indexOf("    blackboard: { w: 0.22, svg: `");
if (blackboardStart < 0) { console.error('blackboard start not found'); process.exit(1); }
const chairOld = "    blackboard: { w: 0.22, svg: `";

const replacements = [
  { label: 'wardrobecab SVG', old: wardrobecabOld, new: "    wardrobecab: { fixture: true, w: 0.135, fx: 0.08, act: 'wardrobe', svg: `" + wardrobecabSVG + "` }," },
  { label: 'chair insert (before blackboard)', old: chairOld, new: "    chair: { w: 0.10, svg: `" + chairSVG + "` },\n    blackboard: { w: 0.22, svg: `" },
];

const positions = replacements.map(r => {
  const sIdx = orig.indexOf(r.old);
  if (sIdx < 0) {
    console.error('NOT FOUND:', r.label);
    process.exit(1);
  }
  return { label: r.label, sIdx, endIdx: sIdx + r.old.length, newStr: r.new };
}).sort((a, b) => b.sIdx - a.sIdx);

let out = orig;
for (const p of positions) {
  out = out.slice(0, p.sIdx) + p.newStr + out.slice(p.endIdx);
}

fs.writeFileSync(FILE, out, 'utf8');
console.log('written:', FILE, '(' + out.length + ' bytes, +' + (out.length - orig.length) + ')');

try { new Function(out); console.log('syntax OK'); }
catch (e) { console.error('SYNTAX:', e.message); process.exit(1); }

if (!out.includes('chair: { w: 0.10')) { console.error('chair missing'); process.exit(1); }
if (!out.includes('item-wardrobecab-body')) { console.error('wardrobecab upgrade missing'); process.exit(1); }
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');