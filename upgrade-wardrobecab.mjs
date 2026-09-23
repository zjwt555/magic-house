/* 物品升级 第 7 批·Step 1: wardrobecab 升级
   沿用前 6 批模板：defs + gradient + stroke + 高光 + 细节彩蛋。
   viewBox 0 0 140 200 保持，w=0.135/fixture/fx/act 字段保持。defs id 加 item- 前缀。 */
import fs from 'node:fs';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_wardrobecab_20260923_152500';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* wardrobecab 精致化版（粉柜身 + 双门米白 + 把手金属 + 顶冠 + 衣架 + 蝴蝶结彩蛋） */
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
        <!-- 贴地阴影 -->
        <ellipse cx="70" cy="195" rx="64" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 柜身（粉渐变 + 描边） -->
        <rect x="8" y="10" width="124" height="184" rx="12" fill="url(#item-wardrobecab-body)" stroke="#a85676" stroke-width="2.5"/>
        <!-- 柜身左高光 -->
        <rect x="12" y="14" width="6" height="174" rx="3" fill="#fff" opacity=".55"/>
        <!-- 中线分隔（双门框） -->
        <line x1="70" y1="14" x2="70" y2="190" stroke="#a85676" stroke-width="4"/>
        <!-- 顶冠（深粉渐变 + 描边） -->
        <rect x="8" y="0" width="124" height="14" rx="7" fill="url(#item-wardrobecab-frame)" stroke="#a85676" stroke-width="2"/>
        <rect x="12" y="2" width="116" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 左门（米白渐变 + 描边） -->
        <rect x="18" y="20" width="46" height="164" rx="8" fill="url(#item-wardrobecab-door)" stroke="#a85676" stroke-width="1.5"/>
        <rect x="22" y="24" width="38" height="3" rx="1.5" fill="#fff" opacity=".7"/>
        <!-- 左门把手（金属渐变） -->
        <circle cx="60" cy="102" r="5" fill="url(#item-wardrobecab-handle)" stroke="#5a7a8a" stroke-width="1.2"/>
        <circle cx="58" cy="100" r="1.5" fill="#fff" opacity=".85"/>
        <!-- 左门衣架图案（彩蛋：红裙子） -->
        <g transform="translate(41,64) scale(.55)">
          <path d="M-9,-21 L-14,-4 L-23,15 Q0,25 23,15 L14,-4 L9,-21 Q0,-15 -9,-21 Z" fill="#e05c86" stroke="#a02a52" stroke-width="1"/>
          <path d="M-3,-3 L5,-3" stroke="#fff" stroke-width="1" fill="none"/>
          <circle cx="0" cy="-3" r="4.5" fill="#ffd0e0" stroke="#a02a52" stroke-width=".6"/>
        </g>
        <!-- 右门（米白渐变 + 描边） -->
        <rect x="76" y="20" width="46" height="164" rx="8" fill="url(#item-wardrobecab-door)" stroke="#a85676" stroke-width="1.5"/>
        <rect x="80" y="24" width="38" height="3" rx="1.5" fill="#fff" opacity=".7"/>
        <!-- 右门把手 -->
        <circle cx="80" cy="102" r="5" fill="url(#item-wardrobecab-handle)" stroke="#5a7a8a" stroke-width="1.2"/>
        <circle cx="78" cy="100" r="1.5" fill="#fff" opacity=".85"/>
        <!-- 右门装饰（彩蛋：金星） -->
        <g transform="translate(99,60) scale(.5)">
          <path d="M0,-18 L5,-6 L18,-5 L8,4 L11,17 L0,10 L-11,17 L-8,4 L-18,-5 L-5,-6 Z" fill="#ffd34d" stroke="#c69418" stroke-width="1.5"/>
          <circle r="2" fill="#fff" opacity=".7"/>
        </g>
        <!-- 内部挂杆（彩蛋：横杆） -->
        <line x1="22" y1="138" x2="118" y2="138" stroke="#a85676" stroke-width="2.5" stroke-linecap="round"/>
        <!-- 挂着的 2 件小衣 -->
        <path d="M48,138 L48,160 L62,160 L62,138 Z" fill="#7ec8e3" stroke="#3a7a9a" stroke-width="1"/>
        <path d="M78,138 L78,160 L92,160 L92,138 Z" fill="#98d8a0" stroke="#5a9e56" stroke-width="1"/>
        <!-- 彩蛋：柜底小蝴蝶结 -->
        <g transform="translate(70,182)">
          <path d="M0,0 C-6,-6 -10,2 -6,5 C-3,7 -2,4 0,4 C2,4 3,7 6,5 C10,2 6,-6 0,0 Z" fill="#ff9eb5" stroke="#e05c86" stroke-width="1"/>
          <circle r="2" fill="#e05c86"/>
        </g>
      </svg>`;

const startAnchor = '    wardrobecab: { fixture: true, w: 0.135, fx: 0.08, act: \'wardrobe\', svg: `';
const endAnchor = '</svg>`';
const sIdx = orig.indexOf(startAnchor);
if (sIdx < 0) { console.error('wardrobecab start not found'); process.exit(1); }
const contentStart = sIdx + startAnchor.length;
// 找 wardrobecab 段后的 ` },` 模式（原文件: `</svg>\` },`）
const closeIdx = orig.indexOf('\` },', contentStart);
if (closeIdx < 0) { console.error('wardrobecab end ` },` not found'); process.exit(1); }
const endIdx = closeIdx + '\` },'.length;
console.log('wardrobecab found at', sIdx, '-', endIdx, '(', endIdx - sIdx, 'bytes)');

// startAnchor 不含反引号，wardrobecabSVG 不含反引号，endAnchor `\`,` 也不含反引号
// 但模板字符串需要 ` 来闭合。所以拼接时需要手动加 `
const cur = orig.slice(0, sIdx) + '    wardrobecab: { fixture: true, w: 0.135, fx: 0.08, act: \'wardrobe\', svg: `' + wardrobecabSVG + '` },' + orig.slice(endIdx);

fs.writeFileSync(FILE, cur, 'utf8');
console.log('written:', FILE, '(' + cur.length + ' bytes, +' + (cur.length - orig.length) + ')');

try { new Function(cur); console.log('syntax OK'); }
catch (e) { console.error('SYNTAX:', e.message); process.exit(1); }

if (!cur.includes('wardrobecab:')) { console.error('id missing'); process.exit(1); }
const vbMatch = cur.match(/wardrobecab: \{[^}]*viewBox="0 0 (\d+) (\d+)"/);
if (!vbMatch) { console.error('viewBox missing'); process.exit(1); }
console.log('  wardrobecab viewBox=' + vbMatch[1] + 'x' + vbMatch[2]);
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');