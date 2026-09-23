/* 物品升级 第 5 批：食材 15 款（路线 A 全程序化 SVG）
   老吴 2026-09-23 13:58 拍板"继续"。这批针对 `js/assets-kitchen.js` 的 ING 对象（FOODS 数组里的 15 款）。
   沿用前 4 批模板：defs + gradient + stroke + 多层高光 + 细节彩蛋。
   viewBox 全部 0 0 80 80 保持不变，键名 w 字段保持。
   defs id 加 item- 前缀避开 doll/cat。 */
import fs from 'node:fs';

const FILE = 'js/assets-kitchen.js';
const BAK_SUFFIX = '.bak_batch5_20260923_140000';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- 15 件新 SVG（FOODS 数组的 15 款） ---------- */

/* 1. strawberry (心形红渐变 + 描边、6 颗黄籽、绿叶 + 柄、彩蛋高光) */
const strawberrySVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-strawberry-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ff8f7a"/>
            <stop offset="60%" stop-color="#ff6b6b"/>
            <stop offset="100%" stop-color="#c4631a"/>
          </radialGradient>
          <radialGradient id="item-strawberry-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 果身（红渐变 + 描边） -->
        <path d="M40,24 C56,24 64,36 60,49 C56,62 48,72 40,74 C32,72 24,62 20,49 C16,36 24,24 40,24 Z" fill="url(#item-strawberry-body)" stroke="#a8302a" stroke-width="2"/>
        <!-- 6 颗黄籽（动态） -->
        ${[[32, 38], [46, 36], [28, 50], [44, 50], [36, 60], [50, 60]].map(([x, y]) =>
          '<ellipse cx="' + x + '" cy="' + y + '" rx="2" ry="3" fill="#ffe9a8" stroke="#c69418" stroke-width=".5"/>').join('')}
        <!-- 顶部绿叶（绿渐变 + 描边） -->
        <path d="M26,24 Q33,15 40,22 Q47,15 54,24 Q47,28 40,27 Q33,28 26,24 Z" fill="url(#item-strawberry-leaf)" stroke="#5a9e56" stroke-width="1.2"/>
        <!-- 绿叶高光 -->
        <path d="M32,18 Q35,16 38,18" stroke="#fff" stroke-width="1.2" fill="none" opacity=".6"/>
        <!-- 叶柄 -->
        <rect x="38" y="10" width="4" height="9" rx="2" fill="#5a9e56" stroke="#3a8a3a" stroke-width="1"/>
        <!-- 彩蛋：左上方高光 -->
        <ellipse cx="30" cy="34" rx="6" ry="10" fill="#fff" opacity=".35" transform="rotate(-18 30 34)"/>
      </svg>`;

/* 2. banana (弧形黄渐变 + 描边、顶部棕色小圆、彩蛋弯曲处阴影) */
const bananaSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-banana-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="60%" stop-color="#ffd166"/>
            <stop offset="100%" stop-color="#d9a83e"/>
          </linearGradient>
        </defs>
        <!-- 香蕉弧形（黄渐变 + 描边） -->
        <path d="M12,28 Q16,62 44,66 Q64,68 69,52 Q71,47 66,50 Q58,59 43,55 Q25,50 21,29 Q20,24 15,25 Q11,26 12,28 Z" fill="url(#item-banana-body)" stroke="#a06820" stroke-width="2"/>
        <!-- 香蕉内层高光 -->
        <path d="M22,32 Q26,52 44,52" stroke="#fff" stroke-width="1.5" fill="none" opacity=".5" stroke-linecap="round"/>
        <!-- 香蕉尾尖（描边） -->
        <path d="M66,50 Q70,48 69,53" stroke="#a06820" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- 顶部棕色蒂 -->
        <circle cx="14" cy="26" r="3.5" fill="#8a5a3a" stroke="#5a3a1d" stroke-width="1"/>
        <circle cx="13" cy="25" r="1" fill="#fff" opacity=".6"/>
        <!-- 彩蛋：底部香蕉弯曲阴影 -->
        <ellipse cx="40" cy="72" rx="20" ry="3" fill="rgba(0,0,0,.12)"/>
      </svg>`;

/* 3. apple (圆形红渐变 + 描边、木色果柄、绿叶渐变、彩蛋左侧高光) */
const appleSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-apple-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ff8f7a"/>
            <stop offset="60%" stop-color="#ff6b6b"/>
            <stop offset="100%" stop-color="#c4631a"/>
          </radialGradient>
          <radialGradient id="item-apple-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 苹果（红渐变 + 描边） -->
        <circle cx="40" cy="46" r="24" fill="url(#item-apple-body)" stroke="#a8302a" stroke-width="2"/>
        <!-- 苹果顶部凹陷 -->
        <ellipse cx="40" cy="24" rx="6" ry="3" fill="#a8302a"/>
        <!-- 果柄（木色描边） -->
        <rect x="38" y="14" width="4" height="12" rx="2" fill="#8a5a3a" stroke="#5a3a1d" stroke-width="1"/>
        <!-- 顶部绿叶（绿渐变 + 描边） -->
        <ellipse cx="49" cy="20" rx="10" ry="5.5" fill="url(#item-apple-leaf)" stroke="#5a9e56" stroke-width="1.2" transform="rotate(-24 49 20)"/>
        <!-- 叶脉 -->
        <path d="M49,16 Q51,20 49,24" stroke="#5a9e56" stroke-width=".8" fill="none" transform="rotate(-24 49 20)"/>
        <!-- 彩蛋：左侧高光 -->
        <ellipse cx="31" cy="38" rx="7" ry="11" fill="#fff" opacity=".4" transform="rotate(-16 31 38)"/>
      </svg>`;

/* 4. grape (8 颗紫圆 + 描边 + 高光、顶部绿叶、木柄、彩蛋叶脉) */
const grapeSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-grape-body" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#c5a8ff"/>
            <stop offset="60%" stop-color="#9f7edb"/>
            <stop offset="100%" stop-color="#5a3a87"/>
          </radialGradient>
          <radialGradient id="item-grape-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 8 颗葡萄（紫渐变 + 描边 + 高光，动态） -->
        ${[[36, 26], [48, 30], [28, 38], [41, 40], [54, 42], [33, 52], [47, 53], [40, 64]].map(([x, y]) =>
          '<circle cx="' + x + '" cy="' + y + '" r="9.5" fill="url(#item-grape-body)" stroke="#5a3a87" stroke-width="1.2"/>'
          + '<circle cx="' + (x - 2) + '" cy="' + (y - 2) + '" r="3" fill="#fff" opacity=".5"/>').join('')}
        <!-- 顶部绿叶（绿渐变 + 描边） -->
        <ellipse cx="40" cy="20" rx="10" ry="5" fill="url(#item-grape-leaf)" stroke="#5a9e56" stroke-width="1.2" transform="rotate(-18 40 20)"/>
        <!-- 叶脉（彩蛋） -->
        <path d="M30,20 Q40,22 50,20" stroke="#5a9e56" stroke-width=".8" fill="none" transform="rotate(-18 40 20)"/>
        <!-- 果柄 -->
        <rect x="39" y="8" width="3.5" height="10" rx="1.75" fill="#8a5a3a" stroke="#5a3a1d" stroke-width="1"/>
      </svg>`;

/* 5. orange (圆形橙渐变 + 描边 + 果皮纹理、绿叶、彩蛋左上高光) */
const orangeSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-orange-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ffbe6b"/>
            <stop offset="60%" stop-color="#ff9f43"/>
            <stop offset="100%" stop-color="#c4631a"/>
          </radialGradient>
          <radialGradient id="item-orange-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 橙子（橙渐变 + 描边） -->
        <circle cx="40" cy="46" r="25" fill="url(#item-orange-body)" stroke="#a06820" stroke-width="2"/>
        <!-- 顶部凹陷 -->
        <ellipse cx="40" cy="24" rx="5" ry="2" fill="#a06820"/>
        <!-- 果皮纹理（小圆点 + 短线） -->
        <circle cx="32" cy="38" r=".8" fill="#c4631a" opacity=".7"/>
        <circle cx="48" cy="42" r=".8" fill="#c4631a" opacity=".7"/>
        <circle cx="36" cy="56" r=".8" fill="#c4631a" opacity=".7"/>
        <circle cx="52" cy="58" r=".8" fill="#c4631a" opacity=".7"/>
        <circle cx="44" cy="50" r=".8" fill="#c4631a" opacity=".7"/>
        <path d="M30,46 L32,47 M48,46 L50,47 M36,62 L38,63 M44,32 L46,33" stroke="#a06820" stroke-width=".6" fill="none" opacity=".7"/>
        <!-- 顶部绿叶 -->
        <ellipse cx="48" cy="18" rx="9" ry="5" fill="url(#item-orange-leaf)" stroke="#5a9e56" stroke-width="1.2" transform="rotate(-22 48 18)"/>
        <!-- 彩蛋：左侧高光 -->
        <ellipse cx="31" cy="38" rx="7" ry="10" fill="#fff" opacity=".4" transform="rotate(-16 31 38)"/>
      </svg>`;

/* 6. watermelon (半圆红渐变、绿皮渐变、5 黑籽、果肉纹理、彩蛋绿皮纹理) */
const watermelonSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-watermelon-flesh" cx="35%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#ffb3c7"/>
            <stop offset="60%" stop-color="#ff8f8f"/>
            <stop offset="100%" stop-color="#d63a3a"/>
          </radialGradient>
          <linearGradient id="item-watermelon-rind" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#b8e0b0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </linearGradient>
        </defs>
        <!-- 半圆红果肉（红渐变 + 描边） -->
        <path d="M10,44 A30,30 0 0 1 70,44 Z" fill="url(#item-watermelon-flesh)" stroke="#a8302a" stroke-width="2" transform="translate(0,4)"/>
        <!-- 绿皮（绿渐变 + 描边） -->
        <path d="M10,44 A30,30 0 0 1 70,44 L66,48 A26,26 0 0 0 14,48 Z" fill="url(#item-watermelon-rind)" stroke="#3a8a3a" stroke-width="1.5" transform="translate(0,4)"/>
        <!-- 绿皮纹理（彩蛋：浅色弧线） -->
        <path d="M14,46 A26,26 0 0 1 66,46" stroke="#7ed47b" stroke-width="1" fill="none" opacity=".6" transform="translate(0,4)"/>
        <!-- 果肉底部弧线 -->
        <path d="M12,48 Q12,54 18,58" stroke="#5a9e56" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- 5 颗黑籽（动态） -->
        ${[[28, 30], [40, 24], [52, 30], [34, 38], [46, 38]].map(([x, y]) =>
          '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="2" ry="3.2" fill="#5b3a29" stroke="#3a2a1a" stroke-width=".5"/>').join('')}
        <!-- 果肉纹理（小白点） -->
        <circle cx="22" cy="44" r="1" fill="#fff" opacity=".6"/>
        <circle cx="58" cy="44" r="1" fill="#fff" opacity=".6"/>
      </svg>`;

/* 7. milk (瓶身白渐变 + 描边、蓝色盖子、蓝标签 + 小牛头彩蛋) */
const milkSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-milk-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8e0f2"/>
          </linearGradient>
          <linearGradient id="item-milk-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#5aa8cc"/>
          </linearGradient>
          <linearGradient id="item-milk-label" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dff3ff"/>
            <stop offset="100%" stop-color="#9ad7f0"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="40" cy="76" rx="22" ry="3" fill="rgba(0,0,0,.12)"/>
        <!-- 瓶盖（蓝渐变 + 描边） -->
        <polygon points="22,26 58,26 54,14 26,14" fill="url(#item-milk-cap)" stroke="#3a7a9a" stroke-width="2"/>
        <rect x="26" y="14" width="28" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 瓶身（白渐变 + 描边） -->
        <rect x="22" y="26" width="36" height="44" rx="4" fill="url(#item-milk-body)" stroke="#a8a0b8" stroke-width="2"/>
        <!-- 瓶身左侧高光 -->
        <rect x="26" y="30" width="4" height="36" rx="2" fill="#fff" opacity=".7"/>
        <!-- 蓝标签（蓝渐变 + 描边） -->
        <rect x="26" y="36" width="28" height="18" rx="3" fill="url(#item-milk-label)" stroke="#3a7a9a" stroke-width="1.5"/>
        <!-- 标签上的小白圆（彩蛋：奶滴） -->
        <circle cx="40" cy="45" r="5" fill="#fff" stroke="#3a7a9a" stroke-width="1.2"/>
        <text x="40" y="48" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="6" font-weight="700" fill="#3a7a9a">M</text>
      </svg>`;

/* 8. egg (椭圆白渐变 + 描边、左侧高光、彩蛋阴影) */
const eggSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-egg-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="60%" stop-color="#fff8ee"/>
            <stop offset="100%" stop-color="#e8d8c0"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="40" cy="74" rx="18" ry="3" fill="rgba(0,0,0,.12)"/>
        <!-- 鸡蛋（椭圆白渐变 + 描边） -->
        <ellipse cx="40" cy="46" rx="19" ry="24" fill="url(#item-egg-body)" stroke="#c9a878" stroke-width="2"/>
        <!-- 左侧高光 -->
        <ellipse cx="33" cy="36" rx="6" ry="10" fill="#fff" opacity=".7" transform="rotate(-12 33 36)"/>
        <!-- 彩蛋：顶部小气孔 -->
        <circle cx="48" cy="30" r=".8" fill="#c9a878" opacity=".5"/>
        <circle cx="50" cy="34" r=".8" fill="#c9a878" opacity=".5"/>
        <circle cx="44" cy="26" r=".8" fill="#c9a878" opacity=".5"/>
      </svg>`;

/* 9. tomato (圆形红渐变 + 描边、5 瓣绿叶 + 高光、彩蛋左高光) */
const tomatoSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-tomato-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ff8f7a"/>
            <stop offset="60%" stop-color="#ff6b6b"/>
            <stop offset="100%" stop-color="#c4631a"/>
          </radialGradient>
          <radialGradient id="item-tomato-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 番茄（红渐变 + 描边） -->
        <circle cx="40" cy="46" r="24" fill="url(#item-tomato-body)" stroke="#a8302a" stroke-width="2"/>
        <!-- 顶部凹陷（5 瓣） -->
        <g transform="translate(40,22)">
          <path d="M0,0 Q-8,-4 -12,2 Q-6,4 0,0 Z" fill="url(#item-tomato-leaf)" stroke="#5a9e56" stroke-width="1.2"/>
          <path d="M0,0 Q-3,-6 0,-10 Q3,-6 0,0 Z" fill="url(#item-tomato-leaf)" stroke="#5a9e56" stroke-width="1.2"/>
          <path d="M0,0 Q3,-6 8,-4 Q4,2 0,0 Z" fill="url(#item-tomato-leaf)" stroke="#5a9e56" stroke-width="1.2"/>
          <path d="M0,0 Q8,2 12,2 Q8,6 0,0 Z" fill="url(#item-tomato-leaf)" stroke="#5a9e56" stroke-width="1.2"/>
          <path d="M0,0 Q-3,4 -8,2 Q-4,-2 0,0 Z" fill="url(#item-tomato-leaf)" stroke="#5a9e56" stroke-width="1.2"/>
        </g>
        <!-- 5 叶柄描边（原 line） -->
        <path d="M40,22 L36,14 M40,22 L44,14 M40,22 L40,12" stroke="#5a9e56" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85"/>
        <!-- 彩蛋：左侧高光 -->
        <ellipse cx="31" cy="38" rx="7" ry="10" fill="#fff" opacity=".4" transform="rotate(-16 31 38)"/>
      </svg>`;

/* 10. carrot (三角橙渐变 + 描边、2 横纹、3 片绿叶 + 高光、彩蛋叶高光) */
const carrotSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-carrot-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffbe6b"/>
            <stop offset="60%" stop-color="#ff9f43"/>
            <stop offset="100%" stop-color="#c4631a"/>
          </linearGradient>
          <radialGradient id="item-carrot-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="40" cy="74" rx="12" ry="3" fill="rgba(0,0,0,.12)"/>
        <!-- 胡萝卜（橙渐变 + 描边） -->
        <path d="M30,26 Q40,20 50,26 L45,68 Q40,74 35,68 Z" fill="url(#item-carrot-body)" stroke="#a06820" stroke-width="2"/>
        <!-- 胡萝卜左侧高光 -->
        <path d="M33,30 L34,66" stroke="#fff" stroke-width="1.5" opacity=".5"/>
        <!-- 2 道横纹 -->
        <line x1="33" y1="38" x2="47" y2="38" stroke="#a06820" stroke-width="3" stroke-linecap="round"/>
        <line x1="34" y1="50" x2="46" y2="50" stroke="#a06820" stroke-width="3" stroke-linecap="round"/>
        <line x1="35" y1="60" x2="45" y2="60" stroke="#a06820" stroke-width="2.5" stroke-linecap="round"/>
        <!-- 3 片绿叶（绿渐变 + 描边，动态） -->
        ${[[-10, -14], [0, -18], [10, -14]].map(([tx, ty]) =>
          '<ellipse cx="' + (40 + tx) + '" cy="' + (24 + ty) + '" rx="5" ry="10" fill="url(#item-carrot-leaf)" stroke="#5a9e56" stroke-width="1.2" transform="rotate(' + tx + ' ' + (40 + tx) + ' ' + (24 + ty) + ')"/>'
          + '<ellipse cx="' + (40 + tx) + '" cy="' + (24 + ty - 3) + '" rx="2" ry="5" fill="#fff" opacity=".5"/>').join('')}
      </svg>`;

/* 11. chocolate (矩形棕渐变 + 描边、3 竖纹 + 1 横纹、彩蛋左高光) */
const chocolateSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-chocolate-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="60%" stop-color="#8a5a3a"/>
            <stop offset="100%" stop-color="#5a3a1d"/>
          </linearGradient>
        </defs>
        <!-- 巧克力（棕渐变 + 描边） -->
        <rect x="18" y="22" width="44" height="40" rx="7" fill="url(#item-chocolate-body)" stroke="#5a3a1d" stroke-width="2"/>
        <!-- 巧克力顶部高光 -->
        <rect x="20" y="24" width="40" height="3" rx="1.5" fill="#fff" opacity=".4"/>
        <!-- 3 条竖纹（巧克力块分隔） -->
        ${[0, 1, 2].map(i => '<line x1="' + (18 + (i + 1) * 11) + '" y1="24" x2="' + (18 + (i + 1) * 11) + '" y2="60" stroke="#5a3a1d" stroke-width="3"/>').join('')}
        <!-- 1 条横纹 -->
        <line x1="19" y1="42" x2="61" y2="42" stroke="#5a3a1d" stroke-width="3"/>
        <!-- 彩蛋：左上角小高光 -->
        <ellipse cx="24" cy="30" rx="3" ry="2" fill="#fff" opacity=".4"/>
        <ellipse cx="36" cy="32" rx="2" ry="1.5" fill="#fff" opacity=".3"/>
      </svg>`;

/* 12. corn (椭圆黄渐变 + 描边、4x3 排玉米粒、顶部穗、彩蛋叶弧线) */
const cornSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-corn-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="60%" stop-color="#ffd166"/>
            <stop offset="100%" stop-color="#d9a83e"/>
          </linearGradient>
        </defs>
        <!-- 玉米椭圆（黄渐变 + 描边） -->
        <ellipse cx="40" cy="38" rx="15" ry="26" fill="url(#item-corn-body)" stroke="#a06820" stroke-width="2"/>
        <!-- 玉米左侧高光 -->
        <ellipse cx="34" cy="36" rx="3" ry="14" fill="#fff" opacity=".5"/>
        <!-- 4x3 排玉米粒（动态） -->
        ${[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c =>
          '<rect x="' + (30 + c * 8) + '" y="' + (18 + r * 9) + '" width="5" height="5" rx="1.5" fill="#f2b730" stroke="#a06820" stroke-width=".6"/>').join('')).join('')}
        <!-- 彩蛋：底部叶子弧线 -->
        <path d="M28,54 Q22,64 30,72" stroke="#7ec088" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M52,54 Q58,64 50,72" stroke="#7ec088" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M36,60 Q32,70 38,76" stroke="#98d8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M44,60 Q48,70 42,76" stroke="#98d8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- 顶部穗（深绿描边） -->
        <path d="M32,16 Q40,8 48,16" stroke="#5a9e56" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M34,14 Q40,8 46,14" stroke="#7ec088" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>`;

/* 13. pineapple (椭圆橙渐变 + 描边、7 道横纹 + 3 道反向、3 片绿叶、彩蛋叶高光) */
const pineappleSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-pineapple-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ffc987"/>
            <stop offset="60%" stop-color="#f2a94f"/>
            <stop offset="100%" stop-color="#a06820"/>
          </radialGradient>
          <radialGradient id="item-pineapple-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 菠萝（橙渐变 + 描边） -->
        <ellipse cx="40" cy="50" rx="20" ry="24" fill="url(#item-pineapple-body)" stroke="#a06820" stroke-width="2"/>
        <!-- 菠萝左侧高光 -->
        <ellipse cx="32" cy="46" rx="4" ry="12" fill="#fff" opacity=".45"/>
        <!-- 4 道横纹（动态） -->
        ${[0, 1, 2, 3].map(i => '<path d="M22,' + (38 + i * 8) + ' Q40,' + (44 + i * 8) + ' 58,' + (38 + i * 8) + '" stroke="#a06820" stroke-width="2.6" fill="none"/>').join('')}
        <!-- 3 道反向横纹（动态） -->
        ${[0, 1, 2].map(i => '<path d="M26,' + (34 + i * 10) + ' Q40,' + (28 + i * 10) + ' 54,' + (34 + i * 10) + '" stroke="#a06820" stroke-width="2.2" fill="none"/>').join('')}
        <!-- 3 片顶部绿叶（动态） -->
        ${[[-14, -4], [0, -8], [14, -4]].map(([tx, ty]) =>
          '<path d="M' + (40 + tx * 0.4) + ',' + (28 + ty) + ' Q' + (40 + tx) + ',' + (28 + ty - 12) + ' ' + (40 + tx * 0.9) + ',' + (28 + ty - 16) + ' Q' + (40 + tx * 0.3) + ',' + (28 + ty - 8) + ' ' + (40) + ',' + tx + ' Z" fill="url(#item-pineapple-leaf)" stroke="#5a9e56" stroke-width="1.2"/>'
          + '<path d="M' + (40 + tx * 0.6) + ',' + (28 + ty - 6) + ' Q' + (40 + tx * 0.7) + ',' + (28 + ty - 12) + ' ' + (40 + tx * 0.7) + ',' + (28 + ty - 14) + '" stroke="#fff" stroke-width="1" fill="none" opacity=".6"/>').join('')}
      </svg>`;

/* 14. bread (椭圆棕渐变 + 描边、2 道面包纹 + 顶部高光、彩蛋底部小圆屑) */
const breadSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-bread-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#f7cba0"/>
            <stop offset="60%" stop-color="#e8a86b"/>
            <stop offset="100%" stop-color="#a06820"/>
          </radialGradient>
          <linearGradient id="item-bread-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f7cba0"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="40" cy="68" rx="26" ry="3" fill="rgba(0,0,0,.12)"/>
        <!-- 面包椭圆（棕渐变 + 描边） -->
        <path d="M14,34 Q14,20 40,20 Q66,20 66,34 L64,56 Q40,64 16,56 Z" fill="url(#item-bread-body)" stroke="#a06820" stroke-width="2"/>
        <!-- 面包顶部白渐变 -->
        <ellipse cx="40" cy="24" rx="18" ry="5" fill="url(#item-bread-top)" opacity=".7"/>
        <!-- 2 道面包纹（曲线） -->
        <path d="M16,40 Q28,34 40,40" stroke="#a06820" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M30,48 Q40,44 50,48" stroke="#a06820" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- 面包纹描边高光 -->
        <path d="M16,40 Q28,34 40,40" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".5"/>
        <!-- 彩蛋：底部小圆屑 -->
        <circle cx="22" cy="62" r="1.5" fill="#c9a878" opacity=".6"/>
        <circle cx="58" cy="62" r="1.5" fill="#c9a878" opacity=".6"/>
        <circle cx="30" cy="64" r="1" fill="#c9a878" opacity=".5"/>
        <circle cx="50" cy="64" r="1" fill="#c9a878" opacity=".5"/>
      </svg>`;

/* 15. peach (圆形粉红渐变 + 描边 + 中线、粉红高光、果柄 + 绿叶、彩蛋叶高光) */
const peachSVG = `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-peach-body" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ffd0dd"/>
            <stop offset="60%" stop-color="#ffb3c7"/>
            <stop offset="100%" stop-color="#d63a6a"/>
          </radialGradient>
          <radialGradient id="item-peach-leaf" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#5a9e56"/>
          </radialGradient>
        </defs>
        <!-- 桃子（粉红渐变 + 描边） -->
        <circle cx="40" cy="48" r="22" fill="url(#item-peach-body)" stroke="#a8306a" stroke-width="2"/>
        <!-- 中间分割线（红描边） -->
        <path d="M40,28 Q34,42 40,68" stroke="#ff8faa" stroke-width="3" fill="none"/>
        <!-- 桃尖（顶部小尖） -->
        <circle cx="40" cy="26" r="2" fill="#5a9e56"/>
        <!-- 粉红高光（左侧） -->
        <circle cx="31" cy="42" r="7" fill="#ffd0dd" opacity=".8"/>
        <!-- 果柄（木色描边） -->
        <line x1="40" y1="26" x2="40" y2="16" stroke="#8a5a3a" stroke-width="3.5" stroke-linecap="round"/>
        <!-- 顶部绿叶（绿渐变 + 描边） -->
        <ellipse cx="49" cy="18" rx="10" ry="5" fill="url(#item-peach-leaf)" stroke="#5a9e56" stroke-width="1.2" transform="rotate(-22 49 18)"/>
        <!-- 彩蛋：叶高光 -->
        <path d="M44,16 Q49,18 54,18" stroke="#fff" stroke-width="1" fill="none" opacity=".6" transform="rotate(-22 49 18)"/>
      </svg>`;

/* ---------- 替换 ---------- */

const replacements = [
  { label: 'strawberry', old:
`    strawberry: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40,24 C56,24 64,36 60,49 C56,62 48,72 40,74 C32,72 24,62 20,49 C16,36 24,24 40,24 Z" fill="#ff6b6b"/>
        \${[[32, 38], [46, 36], [28, 50], [44, 50], [36, 60], [50, 60]].map(([x, y]) =>
          \`<ellipse cx="\${x}" cy="\${y}" rx="2" ry="3" fill="#ffe9a8"/>\`).join('')}
        <path d="M26,24 Q33,15 40,22 Q47,15 54,24 Q47,28 40,27 Q33,28 26,24 Z" fill="#7ec088"/>
        <rect x="38" y="10" width="4" height="9" rx="2" fill="#5a9e56"/>
        <ellipse cx="30" cy="34" rx="6" ry="10" fill="#fff" opacity=".22" transform="rotate(-18 30 34)"/>
      </svg>\`,`,
    new: `    strawberry: \`${strawberrySVG}\`,`,
  },
  { label: 'banana', old:
`    banana: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,28 Q16,62 44,66 Q64,68 69,52 Q71,47 66,50 Q58,59 43,55 Q25,50 21,29 Q20,24 15,25 Q11,26 12,28 Z" fill="#ffd166"/>
        <path d="M66,50 Q70,48 69,53" stroke="#d9a83e" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="14" cy="26" r="3.5" fill="#b98a2e"/>
      </svg>\`,`,
    new: `    banana: \`${bananaSVG}\`,`,
  },
  { label: 'apple', old:
`    apple: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="46" r="24" fill="#ff6b6b"/>
        <rect x="38" y="14" width="4" height="12" rx="2" fill="#8a5a3a"/>
        <ellipse cx="49" cy="20" rx="10" ry="5.5" fill="#7ec088" transform="rotate(-24 49 20)"/>
        <ellipse cx="31" cy="38" rx="7" ry="11" fill="#fff" opacity=".25" transform="rotate(-16 31 38)"/>
      </svg>\`,`,
    new: `    apple: \`${appleSVG}\`,`,
  },
  { label: 'grape', old:
`    grape: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        \${[[36, 26], [48, 30], [28, 38], [41, 40], [54, 42], [33, 52], [47, 53], [40, 64]].map(([x, y]) =>
          \`<circle cx="\${x}" cy="\${y}" r="9.5" fill="#9f7edb"/>\`).join('')}
        <ellipse cx="40" cy="20" rx="10" ry="5" fill="#7ec088" transform="rotate(-18 40 20)"/>
        <rect x="39" y="8" width="3.5" height="10" rx="1.75" fill="#8a5a3a"/>
      </svg>\`,`,
    new: `    grape: \`${grapeSVG}\`,`,
  },
  { label: 'orange', old:
`    orange: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="46" r="25" fill="#ff9f43"/>
        <ellipse cx="48" cy="18" rx="9" ry="5" fill="#7ec088" transform="rotate(-22 48 18)"/>
        <ellipse cx="31" cy="38" rx="7" ry="10" fill="#fff" opacity=".22" transform="rotate(-16 31 38)"/>
      </svg>\`,`,
    new: `    orange: \`${orangeSVG}\`,`,
  },
  { label: 'watermelon', old:
`    watermelon: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,44 A30,30 0 0 1 70,44 Z" fill="#ff8f8f" transform="translate(0,4)"/>
        <path d="M10,44 A30,30 0 0 1 70,44 L66,48 A26,26 0 0 0 14,48 Z" fill="#98d8a0" transform="translate(0,4)"/>
        <path d="M12,48 Q12,54 18,58" stroke="#5a9e56" stroke-width="4" fill="none"/>
        \${[[28, 30], [40, 24], [52, 30], [34, 38], [46, 38]].map(([x, y]) =>
          \`<ellipse cx="\${x}" cy="\${y + 4}" rx="2" ry="3.2" fill="#5b3a29"/>\`).join('')}
      </svg>\`,`,
    new: `    watermelon: \`${watermelonSVG}\`,`,
  },
  { label: 'milk', old:
`    milk: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <polygon points="22,26 58,26 54,14 26,14" fill="#9ad7f0"/>
        <rect x="22" y="26" width="36" height="44" rx="4" fill="#fffdf5"/>
        <rect x="26" y="36" width="28" height="18" rx="4" fill="#bfe6ff"/>
        <circle cx="40" cy="45" r="5" fill="#fff"/>
      </svg>\`,`,
    new: `    milk: \`${milkSVG}\`,`,
  },
  { label: 'egg', old:
`    egg: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="46" rx="19" ry="24" fill="#fff8ee"/>
        <ellipse cx="33" cy="36" rx="6" ry="10" fill="#fff" opacity=".8" transform="rotate(-12 33 36)"/>
      </svg>\`,`,
    new: `    egg: \`${eggSVG}\`,`,
  },
  { label: 'tomato', old:
`    tomato: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="46" r="24" fill="#ff6b6b"/>
        <path d="M40,22 L36,14 M40,22 L44,14 M40,22 L40,12" stroke="#5a9e56" stroke-width="3.5" stroke-linecap="round"/>
        <ellipse cx="31" cy="38" rx="7" ry="10" fill="#fff" opacity=".22" transform="rotate(-16 31 38)"/>
      </svg>\`,`,
    new: `    tomato: \`${tomatoSVG}\`,`,
  },
  { label: 'carrot', old:
`    carrot: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,26 Q40,20 50,26 L45,68 Q40,74 35,68 Z" fill="#ff9f43"/>
        <line x1="33" y1="38" x2="47" y2="38" stroke="#e8872e" stroke-width="3" stroke-linecap="round"/>
        <line x1="34" y1="50" x2="46" y2="50" stroke="#e8872e" stroke-width="3" stroke-linecap="round"/>
        \${[[-10, -14], [0, -18], [10, -14]].map(([tx, ty]) =>
          \`<ellipse cx="\${40 + tx}" cy="\${24 + ty}" rx="5" ry="10" fill="#6cc46a" transform="rotate(\${tx} \${40 + tx} \${24 + ty})"/>\`).join('')}
      </svg>\`,`,
    new: `    carrot: \`${carrotSVG}\`,`,
  },
  { label: 'chocolate', old:
`    chocolate: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="22" width="44" height="40" rx="7" fill="#8a5a3a"/>
        \${[0, 1, 2].map(i => \`<line x1="\${18 + (i + 1) * 11}" y1="24" x2="\${18 + (i + 1) * 11}" y2="60" stroke="#6f4630" stroke-width="3"/>\`).join('')}
        <line x1="19" y1="42" x2="61" y2="42" stroke="#6f4630" stroke-width="3"/>
      </svg>\`,`,
    new: `    chocolate: \`${chocolateSVG}\`,`,
  },
  { label: 'corn', old:
`    corn: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="38" rx="15" ry="26" fill="#ffd166"/>
        \${[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c =>
          \`<rect x="\${30 + c * 8}" y="\${18 + r * 9}" width="5" height="5" rx="1.5" fill="#f2b730"/>\`).join('')).join('')}
        <path d="M28,54 Q22,64 30,72 M52,54 Q58,64 50,72" stroke="#7ec088" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M36,60 Q32,70 38,76 M44,60 Q48,70 42,76" stroke="#98d8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M32,16 Q40,8 48,16" stroke="#7ec088" stroke-width="6" fill="none" stroke-linecap="round"/>
      </svg>\`,`,
    new: `    corn: \`${cornSVG}\`,`,
  },
  { label: 'pineapple', old:
`    pineapple: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="50" rx="20" ry="24" fill="#f2a94f"/>
        \${[0, 1, 2, 3].map(i => \`<path d="M22,\${38 + i * 8} Q40,\${44 + i * 8} 58,\${38 + i * 8}" stroke="#d98c3a" stroke-width="2.6" fill="none"/>\`).join('')}
        \${[0, 1, 2].map(i => \`<path d="M26,\${34 + i * 10} Q40,\${28 + i * 10} 54,\${34 + i * 10}" stroke="#d98c3a" stroke-width="2.2" fill="none"/>\`).join('')}
        \${[[-14, -4], [0, -8], [14, -4]].map(([tx, ty]) =>
          \`<path d="M\${40 + tx * 0.4},\${28 + ty} Q\${40 + tx},\${28 + ty - 12} \${40 + tx * 0.9},\${28 + ty - 16} Q\${40 + tx * 0.3},\${28 + ty - 8} \${40},\${28 + ty}" fill="#6cc46a"/>\`).join('')}
      </svg>\`,`,
    new: `    pineapple: \`${pineappleSVG}\`,`,
  },
  { label: 'bread', old:
`    bread: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M14,34 Q14,20 40,20 Q66,20 66,34 L64,56 Q40,64 16,56 Z" fill="#e8a86b"/>
        <path d="M16,40 Q28,34 40,40 M30,48 Q40,44 50,48" stroke="#d98c5a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="40" cy="24" rx="18" ry="5" fill="#f7cba0"/>
      </svg>\`,`,
    new: `    bread: \`${breadSVG}\`,`,
  },
  { label: 'peach', old:
`    peach: \`
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="48" r="22" fill="#ffb3c7"/>
        <path d="M40,28 Q34,42 40,68" stroke="#ff8faa" stroke-width="4" fill="none"/>
        <circle cx="31" cy="42" r="7" fill="#ffd0dd" opacity=".8"/>
        <line x1="40" y1="26" x2="40" y2="16" stroke="#8a5a3a" stroke-width="3.5" stroke-linecap="round"/>
        <ellipse cx="49" cy="18" rx="10" ry="5" fill="#7ec088" transform="rotate(-22 49 18)"/>
      </svg>\`,`,
    new: `    peach: \`${peachSVG}\`,`,
  },
];

let cur = orig;
for (const r of replacements) {
  if (!cur.includes(r.old)) {
    console.error('NOT FOUND:', r.label);
    console.error('old (head 200):', r.old.slice(0, 200));
    process.exit(1);
  }
  cur = cur.replace(r.old, r.new);
  console.log('replaced:', r.label, 'len(old)=' + r.old.length, 'len(new)=' + r.new.length);
}

fs.writeFileSync(FILE, cur, 'utf8');
console.log('written:', FILE, '(' + cur.length + ' bytes, +' + (cur.length - orig.length) + ')');

try {
  new Function(cur);
  console.log('syntax OK');
} catch (e) {
  console.error('SYNTAX ERROR:', e.message);
  process.exit(1);
}

const ids = ['strawberry', 'banana', 'apple', 'grape', 'orange', 'watermelon', 'milk', 'egg', 'tomato', 'carrot', 'chocolate', 'corn', 'pineapple', 'bread', 'peach'];
for (const id of ids) {
  if (!cur.includes(id + ':')) { console.error('id missing:', id); process.exit(1); }
  console.log('  ' + id + ' OK');
}
console.log('all 15 ids verified');
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');