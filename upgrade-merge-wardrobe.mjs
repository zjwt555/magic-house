/* 优化 第 7 批·Step 2: 合并 wardrobe 房间到 bedroom
   所有 old 都从 orig 切出（避免转义坑）。 */
import fs from 'node:fs';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_merge_wardrobe_20260923_161200';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* 工具：从 orig 切出 old 段（精确定位） */
function slice(start, end) {
  return orig.slice(start, end);
}

/* 1. WORLD_ROOMS 删 wardrobe */
const wrStart = orig.indexOf("  const WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'wardrobe', 'yard', 'park', 'shop'];");
const wrOld = slice(wrStart, wrStart + "  const WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'wardrobe', 'yard', 'park', 'shop'];".length);
const wrNew = "  const WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'yard', 'park', 'shop'];";

/* 2. ROOM_SETS.bedroom 加 bmirror + towelrack */
const bdOldStart = orig.indexOf("    bedroom: ['bed', 'rug', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock',\n      'st_star', 'st_flower', 'st_butterfly'],");
/* 精确切到下一行 room 前的换行（找 'st_butterfly'],\n    yard/park/...） */
const bdOldEnd = orig.indexOf("\n    yard: ", bdOldStart);
if (bdOldEnd < 0) { console.error('bedroom end not found'); process.exit(1); }
const bdOld = slice(bdOldStart, bdOldEnd);
const bdNew = "    bedroom: ['bed', 'rug', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock', 'bmirror', 'towelrack',\n      'st_star', 'st_flower', 'st_butterfly'],";

/* 3. ROOM_SETS 删 wardrobe 块（含前导注释） */
const wdOldStart = orig.indexOf("    /* v0.7：换衣间改造");
const wdOldEnd = orig.indexOf("\n    yard: ", wdOldStart);
if (wdOldEnd < 0) { console.error('wardrobe end not found'); process.exit(1); }
const wdOld = slice(wdOldStart, wdOldEnd);
const wdNew = '';

/* 4. DEFAULT_LAYOUT.bedroom 6 → 8 件 */
const dlbdStart = orig.indexOf("    bedroom: [                              // 11 件抽屉，摆 6 件");
const dlbdEnd = orig.indexOf("\n    bathroom: [", dlbdStart);
if (dlbdEnd < 0) { console.error('bedroom layout end not found'); process.exit(1); }
const dlbdOld = slice(dlbdStart, dlbdEnd);
const dlbdNew =
  "    bedroom: [                              // 13 件抽屉（含 wardrobe 合并），摆 8 件" +
  "\n      { id: 'bed',       x: 0.50, y: 0.85 }," +
  "\n      { id: 'rug',       x: 0.50, y: 0.92 }," +
  "\n      { id: 'lamp',      x: 0.22, y: 0.80 }," +
  "\n      { id: 'catbed',    x: 0.78, y: 0.85 }," +
  "\n      { id: 'teddy',     x: 0.18, y: 0.92 }," +
  "\n      { id: 'frame',     x: 0.85, y: 0.30 }," +
  "\n      { id: 'bmirror',   x: 0.50, y: 0.42 }," +
  "\n      { id: 'towelrack', x: 0.15, y: 0.55 }" +
  "\n    ],";

/* 5. DEFAULT_LAYOUT 删 wardrobe 块 */
const dlwdStart = orig.indexOf("    wardrobe: [                              // 11 件抽屉，摆 4 件");
const dlwdEnd = orig.indexOf("\n    yard: [", dlwdStart);
if (dlwdEnd < 0) { console.error('wardrobe layout end not found'); process.exit(1); }
const dlwdOld = slice(dlwdStart, dlwdEnd);
const dlwdNew = '';

/* 6. FIXTURES wardrobe → bedroom */
const fxStart = orig.indexOf("  const FIXTURES = { kitchen: ['fridge', 'stove'], wardrobe: ['wardrobecab'] };");
const fxOld = slice(fxStart, fxStart + "  const FIXTURES = { kitchen: ['fridge', 'stove'], wardrobe: ['wardrobecab'] };".length);
const fxNew = "  const FIXTURES = { kitchen: ['fridge', 'stove'], bedroom: ['wardrobecab'] };";

/* 汇总 */
const replacements = [
  { label: 'WORLD_ROOMS delete wardrobe', old: wrOld, new: wrNew },
  { label: 'ROOM_SETS.bedroom add bmirror+towelrack', old: bdOld, new: bdNew },
  { label: 'ROOM_SETS delete wardrobe block', old: wdOld, new: wdNew },
  { label: 'DEFAULT_LAYOUT.bedroom 6→8', old: dlbdOld, new: dlbdNew },
  { label: 'DEFAULT_LAYOUT delete wardrobe block', old: dlwdOld, new: dlwdNew },
  { label: 'FIXTURES wardrobe→bedroom', old: fxOld, new: fxNew },
];

const positions = replacements.map(r => {
  const sIdx = orig.indexOf(r.old);
  if (sIdx < 0) {
    console.error('NOT FOUND:', r.label);
    console.error('old (head 200):', r.old.slice(0, 200));
    process.exit(1);
  }
  return { label: r.label, sIdx, endIdx: sIdx + r.old.length, newStr: r.new };
}).sort((a, b) => b.sIdx - a.sIdx);

console.log('positions (sorted big→small):');
for (const p of positions) {
  console.log('  ' + p.label + ' at ' + p.sIdx + ' (len ' + (p.endIdx - p.sIdx) + ' → ' + p.newStr.length + ')');
}

let out = orig;
for (const p of positions) {
  out = out.slice(0, p.sIdx) + p.newStr + out.slice(p.endIdx);
}

fs.writeFileSync(FILE, out, 'utf8');
console.log('written:', FILE, '(' + out.length + ' bytes, +' + (out.length - orig.length) + ')');

try { new Function(out); console.log('syntax OK'); }
catch (e) { console.error('SYNTAX:', e.message); process.exit(1); }

const checks = [
  { label: "WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'yard', 'park', 'shop']", should: true },
  { label: "bedroom: ['bed', 'rug', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock', 'bmirror', 'towelrack',", should: true },
  { label: "wardrobe: ['rug', 'lamp', 'plant', 'frame', 'clock', 'bmirror', 'towelrack', 'teddy',", should: false },
  { label: "FIXTURES = { kitchen: ['fridge', 'stove'], bedroom: ['wardrobecab'] }", should: true },
  { label: "FIXTURES = { kitchen: ['fridge', 'stove'], wardrobe: ['wardrobecab'] }", should: false },
  { label: 'wardrobe: [', should: false },
];
for (const c of checks) {
  const ok = out.includes(c.label) === c.should;
  console.log('  ' + (ok ? 'OK' : 'FAIL') + ': ' + c.label);
  if (!ok) process.exit(1);
}
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');