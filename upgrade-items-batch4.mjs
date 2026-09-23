/* 物品升级 第 4 批：厨房+书房+商店 11 件（路线 A 全程序化 SVG）
   老吴 2026-09-23 13:49 拍板"继续"。沿用前 3 批模板：defs + gradient + stroke + 多层高光 + 细节彩蛋。
   viewBox 保持原值，ITEMS[id].w 字段不变。defs id 加 item- 前缀避开 doll/cat。
   fridge.svg + fridge.svgOpen 两个字段都升级（关门/开门状态）。 */
import fs from 'node:fs';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_batch4_20260923_135000';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- 11 件新 SVG ---------- */

/* 1. bookshelf (viewBox 0 0 170 205, w=0.155)
   书架木纹渐变 + 描边、3 层隔板木纹 + 描边、每层 5-6 本书（动态）、顶层装饰、彩蛋小足球 */
const bookshelfSVG = `
      <svg viewBox="0 0 170 205" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bookshelf-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-bookshelf-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8e8"/>
            <stop offset="100%" stop-color="#f5e8d2"/>
          </linearGradient>
          <linearGradient id="item-bookshelf-shelf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c47a44"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="85" cy="198" rx="78" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 书架木框（渐变 + 描边） -->
        <rect x="10" y="8" width="150" height="184" rx="12" fill="url(#item-bookshelf-frame)" stroke="#7a4d1d" stroke-width="2.5"/>
        <rect x="14" y="12" width="142" height="6" rx="3" fill="#fff" opacity=".55"/>
        <!-- 书架内侧米色背景 -->
        <rect x="20" y="18" width="130" height="164" rx="6" fill="url(#item-bookshelf-back)" stroke="#c9a878" stroke-width="1"/>
        <!-- 3 层隔板 + 书本（动态模板） -->
        ${[0, 1, 2].map(r => `
          <!-- 隔板木纹 -->
          <rect x="20" y="${70 + r * 56 - 8}" width="130" height="8" fill="url(#item-bookshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="${70 + r * 56 - 7}" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <!-- 书本 -->
          <g>
            ${[['#ff8f9e', 0], ['#7ec8e3', 1], ['#ffd166', 2], ['#98d8a0', 3], ['#b79ced', 4], ['#ff9eb5', 5], ['#9ad7f0', 6]].slice(r === 1 ? 2 : 0, r === 1 ? 6 : 7).map(([c, i]) => {
              const bx = 30 + i * 17, bh = 26 + (i % 3) * 8, by = 70 + r * 56 - 8 - bh;
              return '<rect x="' + bx + '" y="' + by + '" width="12" height="' + bh + '" rx="2" fill="' + c + '" stroke="#5a3a2a" stroke-width=".6"/>'
                + '<rect x="' + (bx + 1) + '" y="' + (by + 1) + '" width="3" height="' + (bh - 2) + '" rx="1" fill="#fff" opacity=".5"/>';
            }).join('')}
          </g>`).join('')}
        <!-- 顶层装饰（小黄球摆件） -->
        <circle cx="85" cy="150" r="9" fill="#ffd34d" stroke="#c69418" stroke-width="1.2"/>
        <circle cx="82" cy="146" r="3" fill="#fff" opacity=".7"/>
        <circle cx="80" cy="144" r="5.5" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
        <circle cx="90" cy="144" r="5.5" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
        <!-- 彩蛋：最下层小足球 -->
        <circle cx="105" cy="178" r="6" fill="#fff" stroke="#5b3a29" stroke-width="1"/>
        <polygon points="105,172 110,178 105,184 100,178" fill="#5b3a29" opacity=".5"/>
      </svg>`;

/* 2. table (viewBox 0 0 150 135, w=0.14)
   2 桌腿木纹、桌面椭圆木纹渐变 + 描边、桌上茶杯白渐变 + 描边 + 高光、彩蛋小书本 */
const tableSVG = `
      <svg viewBox="0 0 150 135" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-table-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f7e3b8"/>
            <stop offset="100%" stop-color="#d9b87a"/>
          </linearGradient>
          <linearGradient id="item-table-leg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-table-cup" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5d8d8"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="75" cy="126" rx="58" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 2 桌腿（木纹渐变 + 描边） -->
        <line x1="44" y1="70" x2="34" y2="122" stroke="url(#item-table-leg)" stroke-width="10" stroke-linecap="round"/>
        <line x1="106" y1="70" x2="116" y2="122" stroke="url(#item-table-leg)" stroke-width="10" stroke-linecap="round"/>
        <!-- 桌面下底（深色描边） -->
        <ellipse cx="75" cy="66" rx="62" ry="22" fill="#a07242"/>
        <!-- 桌面（木纹椭圆渐变 + 描边） -->
        <ellipse cx="75" cy="56" rx="62" ry="22" fill="url(#item-table-top)" stroke="#a07242" stroke-width="2.5"/>
        <!-- 木纹 -->
        <path d="M20,56 Q75,62 130,56" stroke="#c49858" stroke-width="1" fill="none" opacity=".5"/>
        <!-- 桌面高光 -->
        <ellipse cx="75" cy="50" rx="40" ry="13" fill="#fff" opacity=".55"/>
        <!-- 桌上茶杯（白渐变 + 描边 + 杯耳 + 高光） -->
        <g transform="translate(75,42)">
          <ellipse cx="0" cy="6" rx="15" ry="5" fill="url(#item-table-cup)" stroke="#e8a3bd" stroke-width="1.5"/>
          <path d="M-9,-6 L9,-6 L7,6 Q0,9 -7,6 Z" fill="url(#item-table-cup)" stroke="#e8a3bd" stroke-width="1.5"/>
          <!-- 杯耳 -->
          <path d="M9,-3 Q14,-3 14,2 Q14,6 9,6" stroke="#e8a3bd" stroke-width="1.5" fill="none"/>
          <!-- 茶色 -->
          <ellipse cx="-2" cy="-3" rx="5" ry="2" fill="#a07242"/>
          <!-- 杯左侧高光 -->
          <path d="M-7,-3 Q-8,2 -6,5" stroke="#fff" stroke-width="1.5" fill="none" opacity=".85"/>
          <!-- 蒸汽（彩蛋） -->
          <path d="M-3,-9 q-2,-5 2,-8 M21,-2 q-2,-5 2,-8" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
        </g>
      </svg>`;

/* 3. desk (viewBox 0 0 190 155, w=0.18)
   桌面木纹渐变 + 描边、2 桌腿木纹、抽屉木纹、显示器深灰描边、屏幕蓝渐变 + 太阳 + 山、彩蛋小台灯 */
const deskSVG = `
      <svg viewBox="0 0 190 155" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-desk-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-desk-drawer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c47a44"/>
            <stop offset="100%" stop-color="#a06820"/>
          </linearGradient>
          <linearGradient id="item-desk-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-desk-lamp-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="95" cy="148" rx="84" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 桌面（木纹渐变 + 描边） -->
        <rect x="12" y="58" width="166" height="16" rx="7" fill="url(#item-desk-top)" stroke="#7a4d1d" stroke-width="2.5"/>
        <rect x="16" y="60" width="158" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 桌面木纹 -->
        <line x1="20" y1="68" x2="170" y2="68" stroke="#7a4d1d" stroke-width=".8" opacity=".5"/>
        <!-- 2 桌腿（木纹 + 描边） -->
        <rect x="22" y="72" width="20" height="76" rx="8" fill="url(#item-desk-drawer)" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="148" y="72" width="20" height="76" rx="8" fill="url(#item-desk-drawer)" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="26" y="76" width="12" height="68" fill="#fff" opacity=".4"/>
        <rect x="152" y="76" width="12" height="68" fill="#fff" opacity=".4"/>
        <!-- 抽屉 -->
        <rect x="56" y="88" width="78" height="52" rx="8" fill="#b06f3e" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="60" y="92" width="70" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <line x1="56" y1="114" x2="134" y2="114" stroke="#7a4d1d" stroke-width="1.5"/>
        <circle cx="95" cy="106" r="2.5" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
        <circle cx="95" cy="124" r="2.5" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
        <!-- 显示器（深灰 + 描边） -->
        <rect x="62" y="20" width="66" height="42" rx="6" fill="#4a4a55" stroke="#1a1a22" stroke-width="2"/>
        <!-- 屏幕（蓝渐变） -->
        <rect x="68" y="26" width="54" height="30" rx="3" fill="url(#item-desk-screen)" stroke="#1a1a22" stroke-width="1"/>
        <!-- 屏内太阳 + 山 -->
        <circle cx="95" cy="38" r="5" fill="#ffd34d" stroke="#f2a94f" stroke-width=".6"/>
        <line x1="95" y1="29" x2="95" y2="32" stroke="#ffd34d" stroke-width="1" stroke-linecap="round"/>
        <line x1="86" y1="38" x2="89" y2="38" stroke="#ffd34d" stroke-width="1" stroke-linecap="round"/>
        <line x1="104" y1="38" x2="101" y2="38" stroke="#ffd34d" stroke-width="1" stroke-linecap="round"/>
        <path d="M68,52 Q82,42 95,48 Q108,54 122,46 L122,56 L68,56 Z" fill="#7ec088" stroke="#4a9a4a" stroke-width=".6"/>
        <!-- 显示器底座 -->
        <path d="M68,50 L122,50 L132,56 L58,56 Z" fill="#3a3a44" stroke="#1a1a22" stroke-width="1.5"/>
        <rect x="88" y="62" width="14" height="8" fill="#3a3a44" stroke="#1a1a22" stroke-width="1"/>
        <!-- 彩蛋：桌上的小台灯 -->
        <g transform="translate(155,30)">
          <ellipse cx="0" cy="32" rx="8" ry="3" fill="#a07242" stroke="#7a4d1d" stroke-width=".8"/>
          <line x1="0" y1="32" x2="0" y2="14" stroke="#a07242" stroke-width="2" stroke-linecap="round"/>
          <path d="M-8,12 L8,12 L5,2 Q0,-2 -5,2 Z" fill="url(#item-desk-lamp-shade)" stroke="#a06820" stroke-width="1"/>
          <ellipse cx="-2" cy="6" rx="3" ry="1" fill="#fff" opacity=".5"/>
        </g>
        <!-- 书桌左侧的小红盒 -->
        <rect x="74" y="48" width="20" height="8" rx="2" fill="#ff8f9e" stroke="#e05c86" stroke-width="1"/>
        <circle cx="146" cy="52" r="6" fill="#98d8a0" stroke="#5a9e56" stroke-width="1"/>
        <circle cx="144" cy="50" r="2" fill="#fff" opacity=".7"/>
      </svg>`;

/* 4. globe (viewBox 0 0 100 150, w=0.095)
   球体径向蓝渐变 + 描边、大陆绿渐变、经线粉、木杆木纹 + 底座、彩蛋小书 */
const globeSVG = `
      <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-globe-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <radialGradient id="item-globe-ocean" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#5aa8cc"/>
          </radialGradient>
          <radialGradient id="item-globe-land" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#b8e0b0"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="50" cy="144" rx="30" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 木杆（木纹渐变） -->
        <line x1="50" y1="96" x2="50" y2="128" stroke="url(#item-globe-pole)" stroke-width="7" stroke-linecap="round"/>
        <!-- 木底座（椭圆渐变 + 描边） -->
        <ellipse cx="50" cy="132" rx="24" ry="7" fill="url(#item-globe-pole)" stroke="#7a4d1d" stroke-width="1.5"/>
        <ellipse cx="46" cy="129" rx="10" ry="2" fill="#fff" opacity=".55"/>
        <!-- 球体（径向蓝渐变 + 描边） -->
        <circle cx="50" cy="52" r="40" fill="url(#item-globe-ocean)" stroke="#3a7a9a" stroke-width="2"/>
        <!-- 球体左上方高光 -->
        <ellipse cx="35" cy="32" rx="12" ry="6" fill="#fff" opacity=".5" transform="rotate(-30 35 32)"/>
        <!-- 大陆 1（绿渐变） -->
        <path d="M28,36 Q42,26 54,34 Q66,42 60,54 Q52,64 40,58 Q26,50 28,36 Z" fill="url(#item-globe-land)" stroke="#3a8a3a" stroke-width="1"/>
        <!-- 大陆 2 -->
        <path d="M56,66 Q68,62 74,70 Q66,80 56,76 Z" fill="url(#item-globe-land)" stroke="#3a8a3a" stroke-width="1"/>
        <!-- 赤道线（粉描边） -->
        <ellipse cx="50" cy="52" rx="40" ry="12" fill="none" stroke="#ff9eb5" stroke-width="2.5" opacity=".75"/>
        <!-- 经线（粉描边） -->
        <line x1="50" y1="8" x2="50" y2="96" stroke="#ff9eb5" stroke-width="2.5" opacity=".75"/>
        <!-- 北极顶珠 -->
        <circle cx="50" cy="10" r="5" fill="#ff9eb5" stroke="#e05c86" stroke-width="1.2"/>
        <circle cx="48" cy="8" r="1.5" fill="#fff" opacity=".7"/>
        <!-- 彩蛋：底座上的小书 -->
        <rect x="62" y="124" width="14" height="8" rx="1" fill="#ff9eb5" stroke="#e05c86" stroke-width=".8"/>
        <line x1="62" y1="128" x2="76" y2="128" stroke="#fff" stroke-width=".6"/>
      </svg>`;

/* 5. dining (viewBox 0 0 180 130, w=0.17)
   餐桌椭圆木纹 + 描边、2 桌腿木纹、桌面物品（碗+盘+杯）、彩蛋小红心 */
const diningSVG = `
      <svg viewBox="0 0 180 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-dining-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f7e3b8"/>
            <stop offset="100%" stop-color="#d9b87a"/>
          </linearGradient>
          <linearGradient id="item-dining-leg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="90" cy="120" rx="78" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 2 桌腿（木纹渐变 + 描边） -->
        <line x1="42" y1="62" x2="34" y2="118" stroke="url(#item-dining-leg)" stroke-width="10" stroke-linecap="round"/>
        <line x1="138" y1="62" x2="146" y2="118" stroke="url(#item-dining-leg)" stroke-width="10" stroke-linecap="round"/>
        <!-- 桌面下底（深色描边） -->
        <ellipse cx="90" cy="56" rx="78" ry="18" fill="#a07242"/>
        <!-- 桌面（木纹椭圆渐变 + 描边） -->
        <ellipse cx="90" cy="48" rx="78" ry="18" fill="url(#item-dining-top)" stroke="#a07242" stroke-width="2.5"/>
        <!-- 木纹 -->
        <path d="M20,46 Q90,52 160,46" stroke="#c49858" stroke-width="1" fill="none" opacity=".5"/>
        <!-- 桌面高光 -->
        <ellipse cx="90" cy="42" rx="56" ry="6" fill="#fff" opacity=".55"/>
        <!-- 碗（白色椭圆） -->
        <ellipse cx="60" cy="44" rx="16" ry="6" fill="#fff" stroke="#e8e0f2" stroke-width="1.5"/>
        <path d="M48,42 Q60,52 72,42" stroke="#e8e0f2" stroke-width="2" fill="none"/>
        <!-- 碗内红色食物 -->
        <circle cx="60" cy="40" r="6" fill="#ff6b6b" stroke="#c4631a" stroke-width=".8"/>
        <circle cx="58" cy="38" r="2" fill="#fff" opacity=".7"/>
        <!-- 杯子（黄椭圆 + 矩形） -->
        <g transform="translate(118,36)">
          <rect x="-8" y="-4" width="16" height="11" rx="3" fill="#ffd166" stroke="#c69418" stroke-width="1.5"/>
          <ellipse cx="0" cy="-4" rx="8" ry="2" fill="#fff" stroke="#c69418" stroke-width="1"/>
          <path d="M8,-2 Q12,-2 12,2 Q12,5 8,5" stroke="#c69418" stroke-width="1.5" fill="none"/>
          <rect x="-7" y="-1" width="3" height="6" fill="#fff" opacity=".55"/>
        </g>
        <!-- 彩蛋：桌面上的小红心 -->
        <path d="M152,42 q-3,-3 -5,0 q-2,4 -3,4 q1,2 3,4 q1,1 3,-4 q2,4 3,4 q1,-2 3,-4 q-1,0 -3,-4 q-2,-3 -5,0 z" fill="#ff6b6b" stroke="#c4631a" stroke-width=".8"/>
      </svg>`;

/* 6. fridge.svg + fridge.svgOpen（viewBox 0 0 115/150 210）
   冰箱体蓝渐变 + 描边 + 高光、上下门分隔 + 把手、门装饰、svgOpen 开门状态 */
const fridgeSVG = `
      <svg viewBox="0 0 115 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-fridge-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#dff3ff"/>
            <stop offset="50%" stop-color="#bfe0f0"/>
            <stop offset="100%" stop-color="#9cc9de"/>
          </linearGradient>
          <linearGradient id="item-fridge-handle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7ea9be"/>
            <stop offset="50%" stop-color="#bcc4cf"/>
            <stop offset="100%" stop-color="#7ea9be"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="57" cy="204" rx="50" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 冰箱体（蓝渐变 + 描边） -->
        <rect x="10" y="8" width="95" height="194" rx="14" fill="url(#item-fridge-body)" stroke="#5aa8cc" stroke-width="2.5"/>
        <!-- 冰箱体左上方高光 -->
        <rect x="14" y="12" width="6" height="186" rx="3" fill="#fff" opacity=".55"/>
        <!-- 上门（冷藏室，米色） -->
        <rect x="18" y="16" width="79" height="76" rx="9" fill="#e8f7ff" stroke="#5aa8cc" stroke-width="1.5"/>
        <rect x="22" y="20" width="71" height="6" rx="3" fill="#fff" opacity=".7"/>
        <!-- 下门（冷冻室，米色） -->
        <rect x="18" y="100" width="79" height="94" rx="9" fill="#e8f7ff" stroke="#5aa8cc" stroke-width="1.5"/>
        <rect x="22" y="104" width="71" height="6" rx="3" fill="#fff" opacity=".7"/>
        <!-- 上下门分隔 -->
        <line x1="10" y1="97" x2="105" y2="97" stroke="#5aa8cc" stroke-width="3"/>
        <!-- 上门把手（金属渐变） -->
        <rect x="86" y="30" width="7" height="34" rx="3.5" fill="url(#item-fridge-handle)" stroke="#5a7a8a" stroke-width="1"/>
        <!-- 下门把手 -->
        <rect x="86" y="112" width="7" height="40" rx="3.5" fill="url(#item-fridge-handle)" stroke="#5a7a8a" stroke-width="1"/>
        <!-- 上门装饰（红圆 + 黄圆） -->
        <circle cx="38" cy="46" r="8" fill="#ff6b6b" stroke="#c4631a" stroke-width="1.2"/>
        <circle cx="36" cy="44" r="3" fill="#fff" opacity=".55"/>
        <circle cx="58" cy="50" r="7" fill="#ffd34d" stroke="#c69418" stroke-width="1.2"/>
        <circle cx="56" cy="48" r="2.5" fill="#fff" opacity=".7"/>
        <!-- 下门装饰（彩蛋：波浪 + 粉心） -->
        <path d="M28,140 Q38,130 48,140 M56,146 Q66,136 76,146" stroke="#5aa8cc" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="38" cy="128" r="5" fill="#ff9eb5" stroke="#e05c86" stroke-width="1"/>
        <path d="M36,127 q-2,-2 -3,0 q-1,2 -2,2 q1,2 2,3 q1,1 2,-3 q2,3 3,3 q1,-2 2,-3 q-1,0 -2,-2 q-1,-2 -3,0 z" fill="#e05c86" opacity=".7"/>
      </svg>`;

const fridgeSVGOpen = `
      <svg viewBox="0 0 150 210" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-fridge-body-open" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#dff3ff"/>
            <stop offset="50%" stop-color="#bfe0f0"/>
            <stop offset="100%" stop-color="#9cc9de"/>
          </linearGradient>
          <linearGradient id="item-fridge-handle-open" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7ea9be"/>
            <stop offset="50%" stop-color="#bcc4cf"/>
            <stop offset="100%" stop-color="#7ea9be"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="75" cy="204" rx="60" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 打开的左门（深蓝渐变 + 描边） -->
        <path d="M30,24 L10,34 L10,86 L30,96 Z" fill="url(#item-fridge-body-open)" stroke="#5aa8cc" stroke-width="2.5"/>
        <rect x="14" y="48" width="12" height="5" rx="2.5" fill="url(#item-fridge-handle-open)" stroke="#5a7a8a" stroke-width=".8"/>
        <!-- 冰箱体（敞开露出食材） -->
        <rect x="30" y="8" width="95" height="194" rx="14" fill="url(#item-fridge-body-open)" stroke="#5aa8cc" stroke-width="2.5"/>
        <!-- 冷藏室（米色 + 高光） -->
        <rect x="38" y="16" width="79" height="76" rx="9" fill="#f2fbff" stroke="#5aa8cc" stroke-width="1.5"/>
        <rect x="42" y="20" width="71" height="4" rx="2" fill="#fff" opacity=".7"/>
        <!-- 冷藏室 2 隔板 -->
        <rect x="42" y="46" width="71" height="6" rx="3" fill="#cfe6f2" stroke="#9cc9de" stroke-width=".8"/>
        <rect x="42" y="70" width="71" height="6" rx="3" fill="#cfe6f2" stroke="#9cc9de" stroke-width=".8"/>
        <!-- 冷藏室食材 -->
        <g transform="translate(54,28)">
          <rect x="-7" y="-6" width="14" height="18" rx="3" fill="#fff" stroke="#9cc9de" stroke-width="1"/>
          <polygon points="-7,-6 0,-14 7,-6" fill="#9ad7f0" stroke="#5aa8cc" stroke-width=".8"/>
          <rect x="-5" y="-4" width="3" height="14" rx="1" fill="#fff" opacity=".6"/>
        </g>
        <circle cx="80" cy="34" r="8" fill="#ff6b6b" stroke="#c4631a" stroke-width="1"/>
        <circle cx="78" cy="32" r="3" fill="#fff" opacity=".55"/>
        <g transform="translate(98,32)">
          <circle r="7" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
          <circle cx="-2" cy="-2" r="2" fill="#fff" opacity=".55"/>
          <circle cx="0" cy="-9" r="3" fill="#7ec088" stroke="#5a9e56" stroke-width=".8"/>
        </g>
        <!-- 葡萄串 -->
        <circle cx="52" cy="60" r="5" fill="#9f7edb" stroke="#7a5da8" stroke-width=".8"/>
        <circle cx="62" cy="63" r="5" fill="#9f7edb" stroke="#7a5da8" stroke-width=".8"/>
        <circle cx="57" cy="70" r="5" fill="#9f7edb" stroke="#7a5da8" stroke-width=".8"/>
        <ellipse cx="88" cy="62" rx="7" ry="9" fill="#fff8ee" stroke="#c9a878" stroke-width="1"/>
        <ellipse cx="86" cy="60" rx="3" ry="4" fill="#fff" opacity=".7"/>
        <g transform="translate(103,62)">
          <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#8a5a3a" stroke="#5a3a1d" stroke-width="1"/>
          <rect x="-4" y="-4" width="3" height="8" rx="1" fill="#fff" opacity=".5"/>
        </g>
        <!-- 冷冻室（米色 + 高光） -->
        <rect x="38" y="100" width="79" height="94" rx="9" fill="#f2fbff" stroke="#5aa8cc" stroke-width="1.5"/>
        <rect x="42" y="104" width="71" height="4" rx="2" fill="#fff" opacity=".7"/>
        <!-- 冷冻室：3 个冰淇淋 -->
        <g transform="translate(56,128)">
          <rect x="-4" y="0" width="8" height="22" rx="4" fill="#ff8f9e" stroke="#c4631a" stroke-width="1"/>
          <rect x="-3" y="2" width="2" height="18" rx="1" fill="#fff" opacity=".5"/>
          <circle cy="-4" r="6" fill="#ffb3c7" stroke="#e05c86" stroke-width="1"/>
          <circle cx="-1" cy="-5" r="2" fill="#fff" opacity=".7"/>
        </g>
        <g transform="translate(76,126)">
          <rect x="-4" y="0" width="8" height="22" rx="4" fill="#7ec8e3" stroke="#3a7a9a" stroke-width="1"/>
          <rect x="-3" y="2" width="2" height="18" rx="1" fill="#fff" opacity=".5"/>
          <circle cy="-4" r="6" fill="#9ad7f0" stroke="#5aa8cc" stroke-width="1"/>
          <circle cx="-1" cy="-5" r="2" fill="#fff" opacity=".7"/>
        </g>
        <g transform="translate(96,128)">
          <rect x="-4" y="0" width="8" height="22" rx="4" fill="#98d8a0" stroke="#5a9e56" stroke-width="1"/>
          <rect x="-3" y="2" width="2" height="18" rx="1" fill="#fff" opacity=".5"/>
          <circle cy="-4" r="6" fill="#b8e6bd" stroke="#5a9e56" stroke-width="1"/>
          <circle cx="-1" cy="-5" r="2" fill="#fff" opacity=".7"/>
        </g>
        <!-- 冷气（白圆） -->
        <circle cx="36" cy="12" r="5" fill="#fff" opacity=".8"/>
        <circle cx="30" cy="26" r="4" fill="#fff" opacity=".6"/>
        <circle cx="34" cy="40" r="3" fill="#fff" opacity=".5"/>
      </svg>`;

/* 7. stove (viewBox 0 0 150 170, w=0.14, fixture, fx=0.42, act='pot')
   灶台金属渐变 + 描边、旋钮金属渐变、锅粉渐变 + 描边 + 高光、蒸汽白渐变、彩蛋小火星 */
const stoveSVG = `
      <svg viewBox="0 0 150 170" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-stove-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dde3ea"/>
            <stop offset="100%" stop-color="#aeb8c0"/>
          </linearGradient>
          <linearGradient id="item-stove-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bcc4cf"/>
            <stop offset="100%" stop-color="#7f8a93"/>
          </linearGradient>
          <linearGradient id="item-stove-knob" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bcc4cf"/>
            <stop offset="100%" stop-color="#5a6b7a"/>
          </linearGradient>
          <linearGradient id="item-stove-pot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff8fa0"/>
            <stop offset="100%" stop-color="#c74a72"/>
          </linearGradient>
          <radialGradient id="item-stove-steam" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".95"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="75" cy="162" rx="68" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 灶台主体（金属渐变 + 描边） -->
        <rect x="8" y="96" width="134" height="66" rx="10" fill="url(#item-stove-body)" stroke="#5a6b7a" stroke-width="2.5"/>
        <rect x="12" y="100" width="126" height="6" rx="3" fill="#fff" opacity=".55"/>
        <!-- 灶台上面（深色描边） -->
        <rect x="16" y="86" width="118" height="18" rx="9" fill="url(#item-stove-top)" stroke="#3a4a5a" stroke-width="2"/>
        <!-- 灶台左上方高光 -->
        <ellipse cx="40" cy="93" rx="14" ry="2" fill="#fff" opacity=".55"/>
        <!-- 灶眼（2 个黑圆） -->
        <circle cx="40" cy="95" r="5" fill="#3a4a5a" stroke="#1a2a3a" stroke-width="1"/>
        <circle cx="70" cy="95" r="5" fill="#3a4a5a" stroke="#1a2a3a" stroke-width="1"/>
        <!-- 旋钮（金属渐变 + 描边） -->
        <rect x="118" y="104" width="16" height="12" rx="3" fill="#ff8f7a" stroke="#c4631a" stroke-width="1.5"/>
        <circle cx="126" cy="110" r="2" fill="#fff" opacity=".7"/>
        <rect x="118" y="124" width="16" height="12" rx="3" fill="#ffd166" stroke="#c69418" stroke-width="1.5"/>
        <circle cx="126" cy="130" r="2" fill="#fff" opacity=".7"/>
        <!-- 锅（粉渐变 + 描边） -->
        <path d="M48,90 L48,60 Q48,50 60,50 L90,50 Q102,50 102,60 L102,90 Z" fill="url(#item-stove-pot)" stroke="#a02a52" stroke-width="2"/>
        <!-- 锅左侧高光 -->
        <path d="M52,60 L52,86 Q52,56 60,52" stroke="#fff" stroke-width="2" fill="none" opacity=".55"/>
        <!-- 锅沿（粉椭圆 + 高光） -->
        <ellipse cx="75" cy="50" rx="28" ry="8" fill="#c74a72" stroke="#a02a52" stroke-width="1.5"/>
        <ellipse cx="75" cy="48" rx="21" ry="5" fill="#f2a94f" stroke="#c69418" stroke-width="1.2"/>
        <ellipse cx="70" cy="46" rx="8" ry="2" fill="#fff" opacity=".55"/>
        <!-- 锅内食物（彩蛋：橙色 + 红圆） -->
        <path d="M64,48 Q75,52 86,48" stroke="#ffbe6b" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- 锅耳（2 个） -->
        <path d="M48,62 L36,54" stroke="#a02a52" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M102,62 L114,54" stroke="#a02a52" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- 蒸汽（径向渐变） -->
        <path d="M64,40 Q60,30 66,20 M76,38 Q72,28 78,16 M88,40 Q84,30 90,22" stroke="url(#item-stove-steam)" stroke-width="4" fill="none" stroke-linecap="round"/>
      </svg>`;

/* 8. shopshelf (viewBox 0 0 170 205, w=0.16)
   木框橙粉渐变 + 描边、3 层隔板木纹 + 描边、每层 6 件商品（动态）、彩蛋小吊牌 */
const shopshelfSVG = `
      <svg viewBox="0 0 170 205" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-shopshelf-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-shopshelf-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8e8"/>
            <stop offset="100%" stop-color="#fff0d8"/>
          </linearGradient>
          <linearGradient id="item-shopshelf-shelf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c47a44"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="85" cy="198" rx="78" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 木框（橙粉渐变 + 描边） -->
        <rect x="10" y="8" width="150" height="190" rx="12" fill="url(#item-shopshelf-frame)" stroke="#7a4d1d" stroke-width="2.5"/>
        <rect x="14" y="12" width="142" height="6" rx="3" fill="#fff" opacity=".55"/>
        <!-- 货架内侧米色背景 -->
        <rect x="20" y="18" width="130" height="170" rx="6" fill="url(#item-shopshelf-back)" stroke="#c9a878" stroke-width="1"/>
        <!-- 3 层隔板 + 商品（动态模板） -->
        ${[0, 1, 2].map(r => `
          <!-- 隔板木纹 -->
          <rect x="20" y="${78 + r * 56 - 8}" width="130" height="8" fill="url(#item-shopshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="${78 + r * 56 - 7}" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <g>
            <!-- 商品 1：粉方糖 -->
            <rect x="28" y="${70 + r * 56 - 14}" width="16" height="14" rx="3" fill="#ff8f9e" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="36" cy="${70 + r * 56 - 7}" r="2" fill="#fff" opacity=".7"/>
            <!-- 商品 2：蓝罐 -->
            <rect x="48" y="${70 + r * 56 - 17}" width="14" height="17" rx="3" fill="#7ec8e3" stroke="#3a7a9a" stroke-width=".8"/>
            <rect x="50" y="${70 + r * 56 - 15}" width="3" height="13" rx="1" fill="#fff" opacity=".55"/>
            <!-- 商品 3：黄瓶 -->
            <path d="M68,${70 + r * 56} L68,${70 + r * 56 - 20} L80,${70 + r * 56 - 20} L80,${70 + r * 56} Z" fill="#ffd166" stroke="#c69418" stroke-width=".8"/>
            <rect x="70" y="${70 + r * 56 - 17}" width="3" height="14" fill="#fff" opacity=".55"/>
            <!-- 商品 4：绿球 -->
            <circle cx="98" cy="${70 + r * 56 - 8}" r="8" fill="#98d8a0" stroke="#5a9e56" stroke-width=".8"/>
            <circle cx="95" cy="${70 + r * 56 - 11}" r="3" fill="#fff" opacity=".55"/>
            <!-- 商品 5：紫盒 -->
            <rect x="114" y="${70 + r * 56 - 13}" width="18" height="13" rx="3" fill="#b79ced" stroke="#7a4da8" stroke-width=".8"/>
            <rect x="116" y="${70 + r * 56 - 11}" width="4" height="9" fill="#fff" opacity=".55"/>
            <!-- 商品 6：橙球 -->
            <circle cx="140" cy="${70 + r * 56 - 9}" r="6.5" fill="#ff9f43" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="138" cy="${70 + r * 56 - 11}" r="2.5" fill="#fff" opacity=".7"/>
          </g>`).join('')}
        <!-- 彩蛋：货架顶的小吊牌 -->
        <g transform="translate(40,4)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#7a4d1d" stroke-width=".8"/>
          <rect x="-5" y="10" width="10" height="8" rx="1" fill="#ff9eb5" stroke="#e05c86" stroke-width=".8"/>
          <text x="0" y="16" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="6" font-weight="700" fill="#fff">★</text>
        </g>
      </svg>`;

/* 9. counter (viewBox 0 0 185 155, w=0.175, act='register')
   收银台粉渐变 + 描边、台面红渐变、抽屉木纹、收银机金属渐变 + 屏幕蓝、彩蛋糖果 */
const counterSVG = `
      <svg viewBox="0 0 185 155" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-counter-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#ff9eb5"/>
          </linearGradient>
          <linearGradient id="item-counter-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e05c86"/>
          </linearGradient>
          <linearGradient id="item-counter-machine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bcc4cf"/>
            <stop offset="100%" stop-color="#7a8590"/>
          </linearGradient>
          <linearGradient id="item-counter-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="92" cy="148" rx="84" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 收银台体（粉渐变 + 描边） -->
        <rect x="8" y="62" width="169" height="66" rx="12" fill="url(#item-counter-body)" stroke="#c4738a" stroke-width="2.5"/>
        <!-- 台面（红渐变 + 描边） -->
        <rect x="8" y="62" width="169" height="16" rx="8" fill="url(#item-counter-top)" stroke="#a02a52" stroke-width="2"/>
        <rect x="12" y="64" width="161" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 抽屉（米色描边） -->
        <rect x="20" y="96" width="60" height="22" rx="6" fill="#ffd0dd" stroke="#c4738a" stroke-width="1.5"/>
        <rect x="24" y="100" width="52" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <circle cx="50" cy="108" r="3" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
        <!-- 2 桌腿（深红描边） -->
        <rect x="8" y="126" width="12" height="20" rx="5" fill="#e05c86" stroke="#a02a52" stroke-width="1.5"/>
        <rect x="165" y="126" width="12" height="20" rx="5" fill="#e05c86" stroke="#a02a52" stroke-width="1.5"/>
        <!-- 收银机（金属 + 描边） -->
        <g transform="translate(128,40)">
          <rect x="-24" y="0" width="48" height="26" rx="6" fill="url(#item-counter-machine)" stroke="#3a4a5a" stroke-width="2"/>
          <rect x="-20" y="3" width="40" height="3" rx="1.5" fill="#fff" opacity=".5"/>
          <!-- 屏幕（蓝渐变 + 描边） -->
          <rect x="-18" y="-14" width="36" height="16" rx="4" fill="url(#item-counter-screen)" stroke="#3a7a9a" stroke-width="1.5"/>
          <rect x="-15" y="-12" width="3" height="12" rx="1" fill="#fff" opacity=".5"/>
          <text x="0" y="-3" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="10" font-weight="700" fill="#3a7a9a">$</text>
          <!-- 收银机顶按钮 -->
          <rect x="-6" y="-24" width="12" height="12" rx="3" fill="#3a4a5a" stroke="#1a2a3a" stroke-width="1"/>
          <circle cx="0" cy="-18" r="2.5" fill="#ff6b6b" stroke="#c4631a" stroke-width=".5"/>
          <!-- 收银机键盘 3 键 -->
          <rect x="-14" y="6" width="8" height="6" rx="2" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
          <rect x="-2" y="6" width="8" height="6" rx="2" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
          <rect x="10" y="6" width="8" height="6" rx="2" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
        </g>
        <!-- 彩蛋：糖果和爆米花 -->
        <circle cx="42" cy="52" r="9" fill="#ff6b6b" stroke="#c4631a" stroke-width="1.2"/>
        <circle cx="40" cy="50" r="3" fill="#fff" opacity=".55"/>
        <circle cx="62" cy="50" r="8" fill="#ffd166" stroke="#c69418" stroke-width="1.2"/>
        <circle cx="60" cy="48" r="3" fill="#fff" opacity=".55"/>
        <!-- 小爆米花（白色小团） -->
        <circle cx="48" cy="40" r="3" fill="#fff" stroke="#e8e0f2" stroke-width=".8"/>
        <circle cx="56" cy="36" r="2.5" fill="#fff" stroke="#e8e0f2" stroke-width=".8"/>
      </svg>`;

/* 10. freezer (viewBox 0 0 120 130, w=0.115, act='freezer')
   冰柜蓝渐变 + 描边、玻璃门蓝渐变、3 个冰淇淋（粉/蓝/绿）、顶部盖子、彩蛋冷气 */
const freezerSVG = `
      <svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-freezer-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dff3ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-freezer-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#eaf8ff"/>
            <stop offset="100%" stop-color="#bfe6ff"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="60" cy="124" rx="54" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 冰柜体（蓝渐变 + 描边） -->
        <rect x="8" y="34" width="104" height="88" rx="12" fill="url(#item-freezer-body)" stroke="#3a7a9a" stroke-width="2.5"/>
        <rect x="12" y="38" width="96" height="4" rx="2" fill="#fff" opacity=".55"/>
        <!-- 玻璃门（浅蓝渐变 + 描边） -->
        <rect x="16" y="42" width="88" height="72" rx="8" fill="url(#item-freezer-glass)" stroke="#3a7a9a" stroke-width="2.5"/>
        <!-- 玻璃反光（左上） -->
        <path d="M22,46 Q34,42 44,52" stroke="#fff" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>
        <ellipse cx="26" cy="50" rx="5" ry="2" fill="#fff" opacity=".6"/>
        <!-- 3 个冰淇淋（粉/蓝/绿） -->
        <g transform="translate(38,66)">
          <rect x="-5" y="0" width="10" height="26" rx="5" fill="#ff8f9e" stroke="#c4631a" stroke-width="1.2"/>
          <rect x="-4" y="2" width="2" height="22" rx="1" fill="#fff" opacity=".55"/>
          <circle cy="-6" r="7" fill="#ffb3c7" stroke="#e05c86" stroke-width="1.2"/>
          <circle cx="-2" cy="-8" r="2.5" fill="#fff" opacity=".7"/>
        </g>
        <g transform="translate(60,60)">
          <rect x="-5" y="6" width="10" height="26" rx="5" fill="#7ec8e3" stroke="#3a7a9a" stroke-width="1.2"/>
          <rect x="-4" y="8" width="2" height="22" rx="1" fill="#fff" opacity=".55"/>
          <circle cy="0" r="7" fill="#9ad7f0" stroke="#5aa8cc" stroke-width="1.2"/>
          <circle cx="-2" cy="-2" r="2.5" fill="#fff" opacity=".7"/>
        </g>
        <g transform="translate(82,66)">
          <rect x="-5" y="0" width="10" height="26" rx="5" fill="#98d8a0" stroke="#5a9e56" stroke-width="1.2"/>
          <rect x="-4" y="2" width="2" height="22" rx="1" fill="#fff" opacity=".55"/>
          <circle cy="-6" r="7" fill="#b8e6bd" stroke="#5a9e56" stroke-width="1.2"/>
          <circle cx="-2" cy="-8" r="2.5" fill="#fff" opacity=".7"/>
        </g>
        <!-- 顶部盖子（描边） -->
        <path d="M20,20 L100,20" stroke="#3a7a9a" stroke-width="6" stroke-linecap="round"/>
        <circle cx="60" cy="20" r="8" fill="#7ea9be" stroke="#3a7a9a" stroke-width="1.5"/>
        <circle cx="58" cy="18" r="2.5" fill="#fff" opacity=".7"/>
        <!-- 彩蛋：冰柜上冒出的冷气 -->
        <circle cx="20" cy="14" r="3" fill="#fff" opacity=".7"/>
        <circle cx="100" cy="14" r="3" fill="#fff" opacity=".7"/>
        <circle cx="40" cy="10" r="2.5" fill="#fff" opacity=".6"/>
        <circle cx="80" cy="10" r="2.5" fill="#fff" opacity=".6"/>
      </svg>`;

/* 11. toypile (viewBox 0 0 130 105, w=0.12)
   2 球（粉大+蓝小）、2 积木块（A字+ B字）、阴影椭圆、彩蛋小星星 */
const toypileSVG = `
      <svg viewBox="0 0 130 105" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-toypile-pink" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#e05c86"/>
          </radialGradient>
          <radialGradient id="item-toypile-blue" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#3a7a9a"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="24" cy="84" rx="16" ry="6" fill="rgba(0,0,0,.18)"/>
        <ellipse cx="66" cy="88" rx="26" ry="6" fill="rgba(0,0,0,.18)"/>
        <!-- 粉球（大，径向渐变 + 描边） -->
        <circle cx="34" cy="58" r="24" fill="url(#item-toypile-pink)" stroke="#a02a52" stroke-width="1.5"/>
        <!-- 粉球高光 + 接缝 -->
        <path d="M14,50 A24,24 0 0 1 54,42" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
        <ellipse cx="24" cy="46" rx="6" ry="3" fill="#fff" opacity=".7" transform="rotate(-30 24 46)"/>
        <!-- 蓝球（小） -->
        <circle cx="58" cy="40" r="14" fill="url(#item-toypile-blue)" stroke="#1a4a6a" stroke-width="1.2"/>
        <path d="M50,32 A14,14 0 0 1 66,28" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
        <ellipse cx="52" cy="34" rx="4" ry="2" fill="#fff" opacity=".7" transform="rotate(-30 52 34)"/>
        <!-- 积木 A（黄渐变 + 描边） -->
        <rect x="76" y="46" width="22" height="22" rx="3" fill="#ffd166" stroke="#c69418" stroke-width="1.5"/>
        <rect x="78" y="48" width="18" height="3" rx="1" fill="#fff" opacity=".55"/>
        <text x="87" y="62" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="14" font-weight="800" fill="#a06820">A</text>
        <!-- 积木 B（绿渐变 + 描边） -->
        <rect x="98" y="52" width="20" height="20" rx="3" fill="#98d8a0" stroke="#5a9e56" stroke-width="1.5"/>
        <rect x="100" y="54" width="16" height="3" rx="1" fill="#fff" opacity=".55"/>
        <text x="108" y="67" text-anchor="middle" font-family="Comic Sans, cursive" font-size="13" font-weight="800" fill="#3a8a3a">B</text>
        <!-- 彩蛋：堆顶的小星星 -->
        <path d="M58,16 l1.5,3 3.2,0.3 -2.3,2.2 0.7,3.2 -2.8,-1.5 -2.8,1.5 0.7,-3.2 -2.3,-2.2 3.2,-0.3 z" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
      </svg>`;

/* ---------- 替换 ---------- */

const replacements = [
  // 1. bookshelf
  {
    label: 'bookshelf',
    old: `    bookshelf: { w: 0.155, svg: \`
      <svg viewBox="0 0 170 205" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="150" height="184" rx="12" fill="#d98c5a"/>
        <rect x="20" y="18" width="130" height="164" rx="6" fill="#f7e8d2"/>
        \${[0, 1, 2].map(r => \`
          <rect x="20" y="\${70 + r * 56 - 8}" width="130" height="8" fill="#c47a44"/>
          <g>
            \${[['#ff8f9e', 0], ['#7ec8e3', 1], ['#ffd166', 2], ['#98d8a0', 3], ['#b79ced', 4], ['#ff9eb5', 5], ['#9ad7f0', 6]].slice(r === 1 ? 2 : 0, r === 1 ? 6 : 7).map(([c, i]) => {
              const bx = 30 + i * 17, bh = 26 + (i % 3) * 8, by = 70 + r * 56 - 8 - bh;
              return \`<rect x="\${bx}" y="\${by}" width="12" height="\${bh}" rx="3" fill="\${c}"/>\`;
            }).join('')}
          </g>\`).join('')}
        <circle cx="85" cy="150" r="9" fill="#f7b967"/>
        <circle cx="80" cy="144" r="5.5" fill="#f7b967"/>
        <circle cx="90" cy="144" r="5.5" fill="#f7b967"/>
      </svg>\` },`,
    new: `    bookshelf: { w: 0.155, svg: \`${bookshelfSVG}\` },`,
  },
  // 2. table
  {
    label: 'table',
    old: `    table: { w: 0.14, svg: \`
      <svg viewBox="0 0 150 135" xmlns="http://www.w3.org/2000/svg">
        <line x1="44" y1="70" x2="34" y2="122" stroke="#d98c5a" stroke-width="10" stroke-linecap="round"/>
        <line x1="106" y1="70" x2="116" y2="122" stroke="#d98c5a" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="75" cy="66" rx="62" ry="22" fill="#d9b87a"/>
        <ellipse cx="75" cy="56" rx="62" ry="22" fill="#f2d9a0"/>
        <ellipse cx="75" cy="50" rx="40" ry="13" fill="#e8cf9f" opacity=".6"/>
        <g transform="translate(75,42)">
          <ellipse cx="0" cy="6" rx="15" ry="5" fill="#fff"/>
          <path d="M-9,-6 L9,-6 L7,6 Q0,9 -7,6 Z" fill="#fff"/>
          <path d="M9,-4 Q16,-2 9,3" stroke="#fff" stroke-width="2.5" fill="none"/>
          <path d="M-3,-6 Q0,-12 3,-6" stroke="#ff9eb5" stroke-width="2.5" fill="none"/>
        </g>
      </svg>\` },`,
    new: `    table: { w: 0.14, svg: \`${tableSVG}\` },`,
  },
  // 3. desk
  {
    label: 'desk',
    old: `    desk: { w: 0.18, svg: \`
      <svg viewBox="0 0 190 155" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="58" width="166" height="14" rx="7" fill="#d98c5a"/>
        <rect x="22" y="72" width="20" height="76" rx="8" fill="#c47a44"/>
        <rect x="148" y="72" width="20" height="76" rx="8" fill="#c47a44"/>
        <rect x="56" y="88" width="78" height="52" rx="8" fill="#b06f3e"/>
        <rect x="62" y="20" width="66" height="42" rx="6" fill="#4a4a55"/>
        <rect x="68" y="26" width="54" height="30" rx="3" fill="#9ad7f0"/>
        <circle cx="95" cy="41" r="6" fill="#ffd34d"/>
        <path d="M68,50 L122,50 L132,56 L58,56 Z" fill="#3a3a44"/>
        <rect x="88" y="62" width="14" height="8" fill="#3a3a44"/>
        <rect x="74" y="48" width="20" height="8" rx="2" fill="#ff8f9e"/>
        <circle cx="146" cy="52" r="6" fill="#98d8a0"/>
      </svg>\` },`,
    new: `    desk: { w: 0.18, svg: \`${deskSVG}\` },`,
  },
  // 4. globe
  {
    label: 'globe',
    old: `    globe: { w: 0.095, svg: \`
      <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,96 L50,128" stroke="#c98443" stroke-width="7" stroke-linecap="round"/>
        <ellipse cx="50" cy="132" rx="24" ry="7" fill="#c98443"/>
        <circle cx="50" cy="52" r="40" fill="#9ad7f0"/>
        <path d="M28,36 Q42,26 54,34 Q66,42 60,54 Q52,64 40,58 Q26,50 28,36 Z" fill="#98d8a0"/>
        <path d="M56,66 Q68,62 74,70 Q66,80 56,76 Z" fill="#98d8a0"/>
        <ellipse cx="50" cy="52" rx="40" ry="12" fill="none" stroke="#7ec8e3" stroke-width="3"/>
        <line x1="50" y1="8" x2="50" y2="96" stroke="#e8a3bd" stroke-width="3.5"/>
        <circle cx="50" cy="10" r="5" fill="#e8a3bd"/>
      </svg>\` },`,
    new: `    globe: { w: 0.095, svg: \`${globeSVG}\` },`,
  },
  // 5. dining
  {
    label: 'dining',
    old: `    dining: { w: 0.17, svg: \`
      <svg viewBox="0 0 180 130" xmlns="http://www.w3.org/2000/svg">
        <line x1="42" y1="62" x2="34" y2="118" stroke="#d98c5a" stroke-width="10" stroke-linecap="round"/>
        <line x1="138" y1="62" x2="146" y2="118" stroke="#d98c5a" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="90" cy="56" rx="78" ry="18" fill="#e8cf9f"/>
        <ellipse cx="90" cy="48" rx="78" ry="18" fill="#f7e3b8"/>
        <ellipse cx="60" cy="44" rx="16" ry="6" fill="#fff"/>
        <ellipse cx="118" cy="42" rx="13" ry="5.5" fill="#fff"/>
        <circle cx="60" cy="40" r="6" fill="#ff6b6b"/>
        <g transform="translate(118,36)"><rect x="-8" y="-4" width="16" height="9" rx="3" fill="#ffd166"/></g>
      </svg>\` },`,
    new: `    dining: { w: 0.17, svg: \`${diningSVG}\` },`,
  },
  // 6. fridge (svg + svgOpen 两个字段)
  {
    label: 'fridge',
    old: `    fridge: { fixture: true, w: 0.115, fx: 0.06, act: 'fridge', svg: \`
      <svg viewBox="0 0 115 210" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="95" height="194" rx="14" fill="#bfe0f0"/>
        <rect x="18" y="16" width="79" height="76" rx="9" fill="#dff3ff"/>
        <rect x="18" y="100" width="79" height="94" rx="9" fill="#dff3ff"/>
        <line x1="10" y1="97" x2="105" y2="97" stroke="#9cc9de" stroke-width="4"/>
        <rect x="86" y="30" width="7" height="34" rx="3.5" fill="#7ea9be"/>
        <rect x="86" y="112" width="7" height="40" rx="3.5" fill="#7ea9be"/>
        <circle cx="38" cy="46" r="8" fill="#ff6b6b"/>
        <circle cx="58" cy="50" r="7" fill="#ffd166"/>
        <path d="M28,140 Q38,130 48,140 M56,146 Q66,136 76,146" stroke="#9cc9de" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <circle cx="38" cy="128" r="5" fill="#ff9eb5"/>
      </svg>\`,
      svgOpen: \`
      <svg viewBox="0 0 150 210" xmlns="http://www.w3.org/2000/svg">
        <!-- 打开的左门 -->
        <path d="M30,24 L10,34 L10,86 L30,96 Z" fill="#a8d0e0" stroke="#9cc9de" stroke-width="3"/>
        <rect x="14" y="48" width="12" height="5" rx="2.5" fill="#7ea9be"/>
        <!-- 冰箱体：敞开露出食材 -->
        <rect x="30" y="8" width="95" height="194" rx="14" fill="#bfe0f0"/>
        <rect x="38" y="16" width="79" height="76" rx="9" fill="#f2fbff"/>
        <rect x="38" y="100" width="79" height="94" rx="9" fill="#f2fbff"/>
        <rect x="42" y="46" width="71" height="6" rx="3" fill="#cfe6f2"/>
        <rect x="42" y="70" width="71" height="6" rx="3" fill="#cfe6f2"/>
        <!-- 冷藏室食材 -->
        <g transform="translate(54,28)"><rect x="-7" y="-6" width="14" height="18" rx="3" fill="#fff"/><polygon points="-7,-6 0,-14 7,-6" fill="#9ad7f0"/></g>
        <circle cx="80" cy="34" r="8" fill="#ff6b6b"/>
        <g transform="translate(98,32)"><circle r="7" fill="#ffd166"/><circle cx="0" cy="-9" r="3" fill="#7ec088"/></g>
        <circle cx="52" cy="60" r="5" fill="#9f7edb"/><circle cx="62" cy="63" r="5" fill="#9f7edb"/><circle cx="57" cy="70" r="5" fill="#9f7edb"/>
        <ellipse cx="88" cy="62" rx="7" ry="9" fill="#fff8ee"/>
        <g transform="translate(103,62)"><rect x="-6" y="-6" width="12" height="12" rx="2" fill="#8a5a3a"/></g>
        <!-- 冷冻室：冰淇淋 -->
        <g transform="translate(56,128)"><rect x="-4" y="0" width="8" height="22" rx="4" fill="#ff8f9e"/><circle cy="-4" r="6" fill="#ffb3c7"/></g>
        <g transform="translate(76,126)"><rect x="-4" y="0" width="8" height="22" rx="4" fill="#7ec8e3"/><circle cy="-4" r="6" fill="#9ad7f0"/></g>
        <g transform="translate(96,128)"><rect x="-4" y="0" width="8" height="22" rx="4" fill="#98d8a0"/><circle cy="-4" r="6" fill="#b8e6bd"/></g>
        <!-- 冷气 -->
        <circle cx="36" cy="12" r="5" fill="#fff" opacity=".8"/>
        <circle cx="30" cy="26" r="4" fill="#fff" opacity=".6"/>
        <circle cx="34" cy="40" r="3" fill="#fff" opacity=".5"/>
      </svg>\` },`,
    new: `    fridge: { fixture: true, w: 0.115, fx: 0.06, act: 'fridge', svg: \`${fridgeSVG}\`,
      svgOpen: \`${fridgeSVGOpen}\` },`,
  },
  // 7. stove
  {
    label: 'stove',
    old: `    stove: { fixture: true, w: 0.14, fx: 0.42, act: 'pot', svg: \`
      <svg viewBox="0 0 150 170" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="96" width="134" height="66" rx="10" fill="#cfd8de"/>
        <rect x="16" y="86" width="118" height="18" rx="9" fill="#aeb8c0"/>
        <circle cx="40" cy="95" r="5" fill="#7f8a93"/><circle cx="70" cy="95" r="5" fill="#7f8a93"/>
        <rect x="118" y="104" width="16" height="12" rx="3" fill="#ff8f7a"/>
        <rect x="118" y="124" width="16" height="12" rx="3" fill="#ffd166"/>
        <!-- 锅：口朝上坐在灶台上 -->
        <path d="M48,90 L48,60 Q48,50 60,50 L90,50 Q102,50 102,60 L102,90 Z" fill="#e05c86"/>
        <ellipse cx="75" cy="50" rx="28" ry="8" fill="#c74a72"/>
        <ellipse cx="75" cy="48" rx="21" ry="5" fill="#f2a94f"/>
        <path d="M64,48 Q75,52 86,48" stroke="#ffbe6b" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M48,62 L36,54 M102,62 L114,54" stroke="#c74a72" stroke-width="7" stroke-linecap="round"/>
        <!-- 蒸汽从锅里往上冒 -->
        <path d="M64,40 Q60,30 66,20 M76,38 Q72,28 78,16 M88,40 Q84,30 90,22" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>
      </svg>\` },`,
    new: `    stove: { fixture: true, w: 0.14, fx: 0.42, act: 'pot', svg: \`${stoveSVG}\` },`,
  },
  // 8. shopshelf
  {
    label: 'shopshelf',
    old: `    shopshelf: { w: 0.16, svg: \`
      <svg viewBox="0 0 170 205" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="150" height="190" rx="12" fill="#d98c5a"/>
        <rect x="20" y="18" width="130" height="170" rx="6" fill="#fff6e8"/>
        \${[0, 1, 2].map(r => \`
          <rect x="20" y="\${78 + r * 56 - 8}" width="130" height="8" fill="#c47a44"/>
          <g>
            <rect x="28" y="\${70 + r * 56 - 14}" width="16" height="14" rx="3" fill="#ff8f9e"/>
            <rect x="48" y="\${70 + r * 56 - 17}" width="14" height="17" rx="3" fill="#7ec8e3"/>
            <path d="M68,\${70 + r * 56} L68,\${70 + r * 56 - 20} L80,\${70 + r * 56 - 20} L80,\${70 + r * 56} Z" fill="#ffd166"/>
            <circle cx="98" cy="\${70 + r * 56 - 8}" r="8" fill="#98d8a0"/>
            <rect x="114" y="\${70 + r * 56 - 13}" width="18" height="13" rx="3" fill="#b79ced"/>
            <circle cx="140" cy="\${70 + r * 56 - 9}" r="6.5" fill="#ff9f43"/>
          </g>\`).join('')}
      </svg>\` },`,
    new: `    shopshelf: { w: 0.16, svg: \`${shopshelfSVG}\` },`,
  },
  // 9. counter
  {
    label: 'counter',
    old: `    counter: { w: 0.175, act: 'register', svg: \`
      <svg viewBox="0 0 185 155" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="62" width="169" height="66" rx="12" fill="#ff9eb5"/>
        <rect x="8" y="62" width="169" height="16" rx="8" fill="#e05c86"/>
        <rect x="20" y="96" width="60" height="22" rx="6" fill="#ffd0dd"/>
        <rect x="8" y="126" width="12" height="20" rx="5" fill="#e05c86"/>
        <rect x="165" y="126" width="12" height="20" rx="5" fill="#e05c86"/>
        <g transform="translate(128,40)">
          <rect x="-24" y="0" width="48" height="26" rx="6" fill="#7a6355"/>
          <rect x="-18" y="-14" width="36" height="16" rx="4" fill="#9ad7f0"/>
          <rect x="-6" y="-24" width="12" height="12" rx="3" fill="#5a6b7a"/>
          <rect x="-14" y="6" width="8" height="6" rx="2" fill="#ffd34d"/>
          <rect x="-2" y="6" width="8" height="6" rx="2" fill="#ffd34d"/>
          <rect x="10" y="6" width="8" height="6" rx="2" fill="#ffd34d"/>
        </g>
        <circle cx="42" cy="52" r="9" fill="#ff6b6b"/>
        <circle cx="62" cy="50" r="8" fill="#ffd166"/>
      </svg>\` },`,
    new: `    counter: { w: 0.175, act: 'register', svg: \`${counterSVG}\` },`,
  },
  // 10. freezer
  {
    label: 'freezer',
    old: `    freezer: { w: 0.115, act: 'freezer', svg: \`
      <svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="34" width="104" height="88" rx="12" fill="#bfe0f0"/>
        <rect x="16" y="42" width="88" height="72" rx="8" fill="#eaf8ff"/>
        <rect x="16" y="42" width="88" height="72" rx="8" fill="none" stroke="#9cc9de" stroke-width="3"/>
        <g transform="translate(38,66)">
          <rect x="-5" y="0" width="10" height="26" rx="5" fill="#ff8f9e"/>
          <circle cy="-6" r="7" fill="#ffb3c7"/>
        </g>
        <g transform="translate(60,60)">
          <rect x="-5" y="6" width="10" height="26" rx="5" fill="#7ec8e3"/>
          <circle cy="0" r="7" fill="#9ad7f0"/>
        </g>
        <g transform="translate(82,66)">
          <rect x="-5" y="0" width="10" height="26" rx="5" fill="#98d8a0"/>
          <circle cy="-6" r="7" fill="#b8e6bd"/>
        </g>
        <path d="M20,20 L100,20" stroke="#9cc9de" stroke-width="6" stroke-linecap="round"/>
        <circle cx="60" cy="20" r="8" fill="#7ea9be"/>
      </svg>\` },`,
    new: `    freezer: { w: 0.115, act: 'freezer', svg: \`${freezerSVG}\` },`,
  },
  // 11. toypile
  {
    label: 'toypile',
    old: `    toypile: { w: 0.12, svg: \`
      <svg viewBox="0 0 130 105" xmlns="http://www.w3.org/2000/svg">
        <circle cx="34" cy="58" r="24" fill="#ff8f9e"/>
        <path d="M14,50 A24,24 0 0 1 54,42" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="58" cy="40" r="14" fill="#7ec8e3"/>
        <path d="M50,32 A14,14 0 0 1 66,28" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="76" y="46" width="22" height="22" rx="4" fill="#ffd166"/>
        <text x="87" y="62" text-anchor="middle" font-size="14" font-weight="800" fill="#e0a92c">A</text>
        <rect x="98" y="52" width="20" height="20" rx="4" fill="#98d8a0"/>
        <text x="108" y="67" text-anchor="middle" font-size="13" font-weight="800" fill="#5a9e56">B</text>
        <ellipse cx="24" cy="84" rx="16" ry="6" fill="rgba(90,140,90,.3)"/>
        <ellipse cx="66" cy="88" rx="26" ry="6" fill="rgba(90,140,90,.3)"/>
      </svg>\` },`,
    new: `    toypile: { w: 0.12, svg: \`${toypileSVG}\` },`,
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

const ids = ['bookshelf', 'table', 'desk', 'globe', 'dining', 'fridge', 'stove', 'shopshelf', 'counter', 'freezer', 'toypile'];
for (const id of ids) {
  if (!cur.includes(id + ':')) { console.error('id missing:', id); process.exit(1); }
  const vbMatch = cur.match(new RegExp(id + ': \\{[^}]*viewBox="0 0 (\\d+) (\\d+)"'));
  if (!vbMatch) { console.error('viewBox missing for:', id); process.exit(1); }
  console.log('  ' + id + ' viewBox=' + vbMatch[1] + 'x' + vbMatch[2]);
}
console.log('all 11 ids + viewBoxes verified');
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');