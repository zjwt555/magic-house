/* 物品升级 第 3 批：户外 9 件（路线 A 全程序化 SVG）
   老吴 2026-09-23 13:37 拍板"继续"。沿用前两批模板：defs + gradient + stroke + 多层高光 + 细节彩蛋。
   viewBox 保持原值，ITEMS[id].w 字段不变。defs id 加 item- 前缀避开 doll/cat。 */
import fs from 'node:fs';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_batch3_20260923_133800';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- 9 件新 SVG ---------- */

/* 1. swing (viewBox 0 0 170 200, w=0.155, act='swing')
   4 根木柱（A 字形）木纹渐变 + 描边、横梁木纹渐变、2 根绳索灰渐变、座椅粉渐变 + 高光、彩蛋小铃铛 */
const swingSVG = `
      <svg viewBox="0 0 170 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-swing-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-swing-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-swing-rope" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9a8a72"/>
            <stop offset="100%" stop-color="#5a4d3a"/>
          </linearGradient>
          <linearGradient id="item-swing-seat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="85" cy="194" rx="72" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 4 根木柱（A 字形） -->
        <line x1="30" y1="30" x2="12" y2="192" stroke="url(#item-swing-pole)" stroke-width="10" stroke-linecap="round"/>
        <line x1="140" y1="30" x2="158" y2="192" stroke="url(#item-swing-pole)" stroke-width="10" stroke-linecap="round"/>
        <line x1="30" y1="30" x2="52" y2="192" stroke="#c47a44" stroke-width="9" stroke-linecap="round"/>
        <line x1="140" y1="30" x2="118" y2="192" stroke="#c47a44" stroke-width="9" stroke-linecap="round"/>
        <!-- 横梁（木纹渐变 + 描边） -->
        <rect x="18" y="22" width="134" height="14" rx="6" fill="url(#item-swing-beam)" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="22" y="24" width="126" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 2 根绳索（灰渐变） -->
        <line x1="66" y1="34" x2="66" y2="116" stroke="url(#item-swing-rope)" stroke-width="5" stroke-linecap="round"/>
        <line x1="104" y1="34" x2="104" y2="116" stroke="url(#item-swing-rope)" stroke-width="5" stroke-linecap="round"/>
        <!-- 座椅（粉渐变 + 描边 + 高光） -->
        <rect x="54" y="112" width="62" height="16" rx="8" fill="url(#item-swing-seat)" stroke="#c4738a" stroke-width="2"/>
        <rect x="58" y="114" width="54" height="4" rx="2" fill="#fff" opacity=".55"/>
        <!-- 座椅上的小装饰条 -->
        <rect x="54" y="112" width="62" height="5" rx="2.5" fill="#ffc2d3" opacity=".75"/>
        <!-- 彩蛋：横梁上的小铃铛 -->
        <g transform="translate(85,30)">
          <ellipse cx="0" cy="-4" rx="3" ry="2.5" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
          <rect x="-1" y="-2" width="2" height="6" fill="#c69418"/>
          <circle cx="0" cy="5" r="1.5" fill="#c69418"/>
        </g>
      </svg>`;

/* 2. sandbox (viewBox 0 0 175 95, w=0.165, flat)
   木框橙粉渐变 + 描边 + 4 角立柱、黄沙渐变 + 描边 + 5 沙粒（动态）、小铲子（橙）+ 小桶（蓝）、彩蛋小骨头 */
const sandboxSVG = `
      <svg viewBox="0 0 175 95" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-sandbox-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-sandbox-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff2c0"/>
            <stop offset="100%" stop-color="#d9b87a"/>
          </linearGradient>
          <linearGradient id="item-sandbox-shovel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffb75a"/>
            <stop offset="100%" stop-color="#ff7f2a"/>
          </linearGradient>
          <linearGradient id="item-sandbox-bucket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="87" cy="86" rx="80" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 木框主体（橙粉渐变 + 描边） -->
        <rect x="10" y="18" width="155" height="60" rx="10" fill="url(#item-sandbox-wood)" stroke="#7a4d1d" stroke-width="2.5"/>
        <rect x="14" y="22" width="147" height="4" rx="2" fill="#fff" opacity=".5"/>
        <!-- 黄沙（黄渐变 + 描边） -->
        <rect x="20" y="26" width="135" height="44" rx="7" fill="url(#item-sandbox-sand)" stroke="#a07242" stroke-width="1.5"/>
        <ellipse cx="80" cy="30" rx="50" ry="3" fill="#fff" opacity=".55"/>
        <!-- 5 个沙粒（动态） -->
        ${[[45, 45], [75, 55], [105, 42], [130, 55], [60, 62]].map(([x, y]) =>
          '<circle cx="' + x + '" cy="' + y + '" r="2.2" fill="#d9b87a" stroke="#a07242" stroke-width=".5"/>').join('')}
        <!-- 4 角立柱 -->
        <rect x="10" y="8" width="12" height="22" rx="5" fill="url(#item-sandbox-wood)" stroke="#7a4d1d" stroke-width="1.5"/>
        <rect x="153" y="8" width="12" height="22" rx="5" fill="url(#item-sandbox-wood)" stroke="#7a4d1d" stroke-width="1.5"/>
        <rect x="10" y="64" width="12" height="22" rx="5" fill="url(#item-sandbox-wood)" stroke="#7a4d1d" stroke-width="1.5"/>
        <rect x="153" y="64" width="12" height="22" rx="5" fill="url(#item-sandbox-wood)" stroke="#7a4d1d" stroke-width="1.5"/>
        <!-- 小铲子（橙渐变 + 描边） -->
        <rect x="42" y="30" width="4" height="9" rx="2" fill="#ff6b6b" stroke="#c4631a" stroke-width=".8"/>
        <path d="M36,38 L52,38 L49,52 Q44,56 39,52 Z" fill="url(#item-sandbox-shovel)" stroke="#c4631a" stroke-width="1.2"/>
        <!-- 小铲子高光 -->
        <ellipse cx="42" cy="42" rx="3" ry="2" fill="#fff" opacity=".55"/>
        <!-- 小铲子（蓝渐变 + 描边） -->
        <line x1="112" y1="62" x2="122" y2="42" stroke="#4f9cc0" stroke-width="6" stroke-linecap="round"/>
        <path d="M118,44 L130,46 L122,54 Z" fill="url(#item-sandbox-bucket)" stroke="#4f9cc0" stroke-width="1.2"/>
        <!-- 彩蛋：沙里藏的小骨头 -->
        <g transform="translate(85,48)" opacity=".7">
          <ellipse cx="-3" cy="0" rx="3" ry="1.5" fill="#fff" stroke="#c9c2b8" stroke-width=".5"/>
          <ellipse cx="3" cy="0" rx="3" ry="1.5" fill="#fff" stroke="#c9c2b8" stroke-width=".5"/>
          <rect x="-2" y="-1" width="4" height="2" fill="#fff" stroke="#c9c2b8" stroke-width=".5"/>
        </g>
      </svg>`;

/* 3. tent (viewBox 0 0 160 155, w=0.145)
   3 层帐篷（蓝渐变 + 描边 + 高光）、旗杆 + 红旗、帐篷底绿椭圆阴影、彩蛋小灯笼 */
const tentSVG = `
      <svg viewBox="0 0 160 155" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-tent-out" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8e0ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-tent-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7ec8e3"/>
            <stop offset="100%" stop-color="#5aa8cc"/>
          </linearGradient>
          <linearGradient id="item-tent-in" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5aa8cc"/>
            <stop offset="100%" stop-color="#4f9cc0"/>
          </linearGradient>
          <linearGradient id="item-tent-flag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff8f7a"/>
            <stop offset="100%" stop-color="#ff6b6b"/>
          </linearGradient>
        </defs>
        <!-- 帐篷底阴影（绿椭圆） -->
        <ellipse cx="80" cy="148" rx="68" ry="6" fill="rgba(90,140,90,.35)"/>
        <!-- 外层帐篷（蓝渐变 + 描边） -->
        <polygon points="15,145 80,18 145,145" fill="url(#item-tent-out)" stroke="#4f9cc0" stroke-width="2.5" stroke-linejoin="round"/>
        <!-- 外层帐篷高光（左半） -->
        <polygon points="15,145 80,18 75,145" fill="#fff" opacity=".25"/>
        <!-- 中层帐篷 -->
        <polygon points="38,145 80,72 122,145" fill="url(#item-tent-mid)" stroke="#4a8db0" stroke-width="2" stroke-linejoin="round"/>
        <!-- 内层帐篷 -->
        <polygon points="60,145 80,100 100,145" fill="url(#item-tent-in)" stroke="#3a7a9a" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- 内层帐篷门洞 -->
        <ellipse cx="80" cy="135" rx="12" ry="10" fill="#3a6a8a"/>
        <!-- 旗杆 -->
        <line x1="80" y1="18" x2="80" y2="2" stroke="#7a4d1d" stroke-width="4" stroke-linecap="round"/>
        <!-- 红旗（红渐变 + 描边） -->
        <path d="M80,4 L102,10 L84,18 Z" fill="url(#item-tent-flag)" stroke="#c4631a" stroke-width="1.2" stroke-linejoin="round"/>
        <!-- 彩蛋：帐篷前的地面上小灯笼 -->
        <g transform="translate(135,140)">
          <line x1="0" y1="-15" x2="0" y2="-5" stroke="#7a4d1d" stroke-width="1"/>
          <ellipse cx="0" cy="-2" rx="4" ry="5" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
          <line x1="-3" y1="-3" x2="-3" y2="0" stroke="#fff" stroke-width=".5" opacity=".6"/>
          <line x1="0" y1="-3" x2="0" y2="0" stroke="#fff" stroke-width=".5" opacity=".6"/>
        </g>
      </svg>`;

/* 4. fence (viewBox 0 0 210 115, w=0.2)
   2 根横木 + 5 根尖头栅栏米色渐变（动态）、2 朵花（粉 + 紫）、彩蛋小鸟 */
const fenceSVG = `
      <svg viewBox="0 0 210 115" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-fence-board" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8f0"/>
            <stop offset="100%" stop-color="#f5e8d0"/>
          </linearGradient>
          <linearGradient id="item-fence-picket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8f0"/>
            <stop offset="100%" stop-color="#ecd9c3"/>
          </linearGradient>
          <radialGradient id="item-fence-petal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </radialGradient>
          <radialGradient id="item-fence-petal-pur" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e0d0f0"/>
            <stop offset="60%" stop-color="#b79ced"/>
            <stop offset="100%" stop-color="#7a4da8"/>
          </radialGradient>
          <linearGradient id="item-fence-bird" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7ecbff"/>
            <stop offset="100%" stop-color="#4f9cc0"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="105" cy="108" rx="100" ry="4" fill="rgba(0,0,0,.1)"/>
        <!-- 2 根横木（米色渐变 + 描边） -->
        <rect x="6" y="38" width="198" height="14" rx="6" fill="url(#item-fence-board)" stroke="#c9a878" stroke-width="1.5"/>
        <rect x="10" y="40" width="190" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="6" y="66" width="198" height="14" rx="6" fill="url(#item-fence-board)" stroke="#c9a878" stroke-width="1.5"/>
        <rect x="10" y="68" width="190" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 5 根尖头栅栏（动态） -->
        ${[20, 60, 100, 140, 180].map(x =>
          '<path d="M' + (x - 11) + ',88 L' + (x - 11) + ',30 Q' + (x - 11) + ',14 ' + x + ',10 Q' + (x + 11) + ',14 ' + (x + 11) + ',30 L' + (x + 11) + ',88 Z" fill="url(#item-fence-picket)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>').join('')}
        <!-- 栅栏高光（中部一道浅线） -->
        <line x1="6" y1="55" x2="204" y2="55" stroke="#fff" stroke-width="1" opacity=".55"/>
        <!-- 2 朵花 -->
        <g transform="translate(60,34)">
          <circle cx="0" cy="-7" r="4" fill="url(#item-fence-petal)" stroke="#e05c86" stroke-width=".8"/>
          <circle cx="7" cy="0" r="4" fill="url(#item-fence-petal)" stroke="#e05c86" stroke-width=".8"/>
          <circle cx="-7" cy="0" r="4" fill="url(#item-fence-petal)" stroke="#e05c86" stroke-width=".8"/>
          <circle cx="0" cy="7" r="4" fill="url(#item-fence-petal)" stroke="#e05c86" stroke-width=".8"/>
          <circle r="6" fill="url(#item-fence-petal)" stroke="#e05c86" stroke-width=".8"/>
          <circle r="2.5" fill="#ffd34d" stroke="#c69418" stroke-width=".5"/>
        </g>
        <g transform="translate(150,32)">
          <circle cx="0" cy="-6.5" r="3.8" fill="url(#item-fence-petal-pur)" stroke="#5a3a87" stroke-width=".8"/>
          <circle cx="6.5" cy="0" r="3.8" fill="url(#item-fence-petal-pur)" stroke="#5a3a87" stroke-width=".8"/>
          <circle cx="-6.5" cy="0" r="3.8" fill="url(#item-fence-petal-pur)" stroke="#5a3a87" stroke-width=".8"/>
          <circle cx="0" cy="6.5" r="3.8" fill="url(#item-fence-petal-pur)" stroke="#5a3a87" stroke-width=".8"/>
          <circle r="5.5" fill="url(#item-fence-petal-pur)" stroke="#5a3a87" stroke-width=".8"/>
          <circle r="2.2" fill="#ffd34d" stroke="#c69418" stroke-width=".5"/>
        </g>
        <!-- 彩蛋：栅栏顶横木上停的小鸟 -->
        <g transform="translate(40,32)">
          <ellipse cx="0" cy="0" rx="8" ry="6" fill="url(#item-fence-bird)" stroke="#3a7a9a" stroke-width="1"/>
          <circle cx="-6" cy="-3" r="4" fill="url(#item-fence-bird)" stroke="#3a7a9a" stroke-width="1"/>
          <circle cx="-7" cy="-4" r="2" fill="#fff" stroke="#5b3a29" stroke-width=".6"/>
          <circle cx="-7" cy="-4" r="1" fill="#5b3a29"/>
          <polygon points="-10,-1 -12,0 -10,1" fill="#ff9f43" stroke="#c4631a" stroke-width=".5"/>
          <path d="M-2,-1 Q4,-4 8,0 Q4,2 -2,1" fill="#4f9cc0" stroke="#3a7a9a" stroke-width=".8"/>
          <line x1="-3" y1="6" x2="-3" y2="10" stroke="#3a7a9a" stroke-width="1"/>
          <line x1="3" y1="6" x2="3" y2="10" stroke="#3a7a9a" stroke-width="1"/>
        </g>
      </svg>`;

/* 5. mailbox (viewBox 0 0 80 150, w=0.075)
   木杆木纹渐变、信箱蓝渐变 + 描边 + 高光、信箱门蓝渐变、红旗描边、彩蛋信箱里露出的信纸 */
const mailboxSVG = `
      <svg viewBox="0 0 80 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-mailbox-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-mailbox-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8e0ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-mailbox-door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5aa8cc"/>
            <stop offset="100%" stop-color="#4f9cc0"/>
          </linearGradient>
          <linearGradient id="item-mailbox-flag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff8f7a"/>
            <stop offset="100%" stop-color="#ff6b6b"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="40" cy="144" rx="20" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 木杆（木纹渐变 + 描边） -->
        <line x1="40" y1="60" x2="40" y2="140" stroke="url(#item-mailbox-pole)" stroke-width="9" stroke-linecap="round"/>
        <line x1="38" y1="64" x2="38" y2="138" stroke="#fff" stroke-width="1" opacity=".4"/>
        <!-- 信箱主体（蓝渐变 + 描边） -->
        <path d="M12,58 L12,30 Q12,16 26,16 L62,16 L62,58 Q40,66 12,58 Z" fill="url(#item-mailbox-body)" stroke="#4f9cc0" stroke-width="2.5"/>
        <!-- 信箱高光（左上方） -->
        <ellipse cx="22" cy="26" rx="8" ry="3" fill="#fff" opacity=".7"/>
        <!-- 信箱门（深蓝渐变 + 描边） -->
        <rect x="56" y="26" width="14" height="24" rx="4" fill="url(#item-mailbox-door)" stroke="#3a7a9a" stroke-width="1.2"/>
        <!-- 门把手 -->
        <circle cx="63" cy="38" r="3" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
        <circle cx="62" cy="37" r="1" fill="#fff" opacity=".8"/>
        <!-- 信箱口（半圆） -->
        <path d="M20,46 Q34,52 46,46" stroke="#3a7a9a" stroke-width="2.5" fill="none"/>
        <!-- 彩蛋：信箱里露出的信纸 -->
        <rect x="22" y="46" width="14" height="6" rx="1" fill="#fff" stroke="#c9c2b8" stroke-width=".6"/>
        <line x1="24" y1="48" x2="33" y2="48" stroke="#a07242" stroke-width=".4"/>
        <line x1="24" y1="50" x2="32" y2="50" stroke="#a07242" stroke-width=".4"/>
        <!-- 红旗（红渐变 + 描边） -->
        <line x1="18" y1="14" x2="18" y2="2" stroke="#7a4d1d" stroke-width="3" stroke-linecap="round"/>
        <circle cx="18" cy="2" r="4" fill="url(#item-mailbox-flag)" stroke="#c4631a" stroke-width="1"/>
        <circle cx="17" cy="1" r="1.5" fill="#fff" opacity=".7"/>
      </svg>`;

/* 6. slide (viewBox 0 0 180 195, w=0.17)
   2 根支柱木纹 + 5 台阶木纹（动态）、滑梯黄渐变 + 描边、扶手粉、顶平台粉、彩蛋滑梯顶小星星 */
const slideSVG = `
      <svg viewBox="0 0 180 195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-slide-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-slide-step" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-slide-surface" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
          <linearGradient id="item-slide-inner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff3c0"/>
            <stop offset="100%" stop-color="#ffd166"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="90" cy="190" rx="80" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 2 根支柱（木纹渐变 + 描边） -->
        <line x1="30" y1="40" x2="30" y2="184" stroke="url(#item-slide-pole)" stroke-width="9" stroke-linecap="round"/>
        <line x1="58" y1="40" x2="58" y2="184" stroke="url(#item-slide-pole)" stroke-width="9" stroke-linecap="round"/>
        <!-- 5 台阶（木纹渐变 + 描边，动态） -->
        ${[64, 92, 120, 148, 176].map(y =>
          '<line x1="30" y1="' + (y - 18) + '" x2="58" y2="' + (y - 18) + '" stroke="url(#item-slide-step)" stroke-width="6" stroke-linecap="round"/>').join('')}
        <!-- 顶平台（粉渐变 + 描边） -->
        <rect x="24" y="30" width="70" height="14" rx="6" fill="#ff9eb5" stroke="#c4738a" stroke-width="2"/>
        <rect x="28" y="32" width="62" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 滑梯主体（黄渐变 + 描边） -->
        <path d="M88,36 L162,168 Q168,182 154,182 L142,182 Q150,170 96,44 Z" fill="url(#item-slide-surface)" stroke="#c69418" stroke-width="2.5" stroke-linejoin="round"/>
        <!-- 滑梯内层高光 -->
        <path d="M88,46 L148,166 L136,166 L84,50 Z" fill="url(#item-slide-inner)"/>
        <!-- 滑梯顶接头 -->
        <rect x="88" y="34" width="12" height="12" rx="4" fill="#e0a92c" stroke="#a06820" stroke-width="1.5"/>
        <circle cx="94" cy="40" r="2" fill="#fff" opacity=".7"/>
        <!-- 扶手（粉） -->
        <line x1="60" y1="40" x2="88" y2="40" stroke="#ff9eb5" stroke-width="10" stroke-linecap="round"/>
        <!-- 彩蛋：滑梯顶上的小星星 -->
        <path d="M70,18 l1.5,3 3.2,0.3 -2.3,2.2 0.7,3.2 -2.8,-1.5 -2.8,1.5 0.7,-3.2 -2.3,-2.2 3.2,-0.3 z" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
      </svg>`;

/* 7. pond (viewBox 0 0 210 105, w=0.2, flat)
   外圈灰石 + 内圈蓝渐变 + 描边、2 片荷叶绿渐变、1 朵 5 瓣粉荷花（动态）、4 颗卵石（动态）、彩蛋小金鱼 */
const pondSVG = `
      <svg viewBox="0 0 210 105" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-pond-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d8d0c4"/>
            <stop offset="100%" stop-color="#a8a090"/>
          </linearGradient>
          <linearGradient id="item-pond-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-pond-lily1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8fe08a"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </linearGradient>
          <linearGradient id="item-pond-lily2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8e0a8"/>
            <stop offset="100%" stop-color="#6cc46a"/>
          </linearGradient>
          <radialGradient id="item-pond-petal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </radialGradient>
          <linearGradient id="item-pond-fish" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd34d"/>
            <stop offset="100%" stop-color="#ff9f43"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="105" cy="98" rx="100" ry="4" fill="rgba(0,0,0,.1)"/>
        <!-- 外圈（灰石渐变 + 描边） -->
        <ellipse cx="105" cy="54" rx="98" ry="46" fill="url(#item-pond-stone)" stroke="#7a6c5a" stroke-width="3"/>
        <!-- 内圈水（蓝渐变 + 描边） -->
        <ellipse cx="105" cy="52" rx="86" ry="38" fill="url(#item-pond-water)" stroke="#4f9cc0" stroke-width="3"/>
        <!-- 水面高光 -->
        <ellipse cx="80" cy="42" rx="30" ry="6" fill="#fff" opacity=".5"/>
        <!-- 2 片荷叶 -->
        <ellipse cx="80" cy="44" rx="16" ry="8" fill="url(#item-pond-lily1)" stroke="#3a8a3a" stroke-width="1.2"/>
        <path d="M65,44 L78,42 M70,46 L82,44" stroke="#3a8a3a" stroke-width=".8" opacity=".5"/>
        <ellipse cx="126" cy="62" rx="13" ry="6.5" fill="url(#item-pond-lily2)" stroke="#3a8a3a" stroke-width="1.2"/>
        <!-- 5 瓣粉荷花（动态） -->
        <g transform="translate(126,44)">
          ${[0, 72, 144, 216, 288].map(a =>
            '<ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="url(#item-pond-petal)" stroke="#e05c86" stroke-width=".6" transform="rotate(' + a + ')"/>').join('')}
          <circle r="2.8" fill="#ffd34d" stroke="#c69418" stroke-width=".5"/>
        </g>
        <!-- 4 颗卵石（动态） -->
        ${[[50, 30], [160, 34], [66, 70], [148, 72]].map(([x, y]) =>
          '<ellipse cx="' + x + '" cy="' + y + '" rx="7" ry="5" fill="#b8b0a4" stroke="#7a6c5a" stroke-width="1"/>'
          + '<ellipse cx="' + (x - 2) + '" cy="' + (y - 2) + '" rx="3" ry="1.5" fill="#fff" opacity=".55"/>').join('')}
        <!-- 水波 -->
        <path d="M92,56 q4,3 8,0 M96,50 q4,3 8,0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
        <!-- 彩蛋：池塘里的小金鱼 -->
        <g transform="translate(70,72)">
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="url(#item-pond-fish)" stroke="#c4631a" stroke-width="1"/>
          <polygon points="-8,0 -14,-4 -14,4" fill="#ff9f43" stroke="#c4631a" stroke-width=".8"/>
          <circle cx="3" cy="-1" r="1.5" fill="#fff" stroke="#5b3a29" stroke-width=".5"/>
          <circle cx="3" cy="-1" r=".8" fill="#5b3a29"/>
          <ellipse cx="-2" cy="-2" rx="2" ry="1" fill="#fff" opacity=".6"/>
        </g>
      </svg>`;

/* 8. bench (viewBox 0 0 140 125, w=0.13)
   3 块木板绿渐变 + 描边、4 根铁脚灰渐变 + 描边、彩蛋长椅上小面包 */
const benchSVG = `
      <svg viewBox="0 0 140 125" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bench-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#b8e0b0"/>
            <stop offset="60%" stop-color="#98d8a0"/>
            <stop offset="100%" stop-color="#6cc46a"/>
          </linearGradient>
          <linearGradient id="item-bench-iron" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7a8590"/>
            <stop offset="50%" stop-color="#a8b0bc"/>
            <stop offset="100%" stop-color="#7a8590"/>
          </linearGradient>
          <linearGradient id="item-bench-bread" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#e0a93c"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="70" cy="118" rx="62" ry="4" fill="rgba(0,0,0,.12)"/>
        <!-- 3 块木板（绿渐变 + 描边） -->
        <rect x="10" y="18" width="120" height="13" rx="6" fill="url(#item-bench-wood)" stroke="#4a9a4a" stroke-width="2"/>
        <rect x="14" y="20" width="112" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="10" y="38" width="120" height="13" rx="6" fill="url(#item-bench-wood)" stroke="#4a9a4a" stroke-width="2"/>
        <rect x="14" y="40" width="112" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="8" y="58" width="124" height="17" rx="8" fill="#7ec088" stroke="#4a9a4a" stroke-width="2"/>
        <rect x="12" y="60" width="116" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 4 根铁脚（金属渐变 + 描边） -->
        <line x1="22" y1="30" x2="22" y2="112" stroke="url(#item-bench-iron)" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="30" x2="118" y2="112" stroke="url(#item-bench-iron)" stroke-width="8" stroke-linecap="round"/>
        <line x1="22" y1="66" x2="22" y2="112" stroke="url(#item-bench-iron)" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="66" x2="118" y2="112" stroke="url(#item-bench-iron)" stroke-width="8" stroke-linecap="round"/>
        <!-- 铁脚高光 -->
        <line x1="20" y1="40" x2="20" y2="100" stroke="#fff" stroke-width="1" opacity=".4"/>
        <line x1="116" y1="40" x2="116" y2="100" stroke="#fff" stroke-width="1" opacity=".4"/>
        <!-- 彩蛋：长椅上放着的小面包 -->
        <g transform="translate(70,52)">
          <ellipse cx="0" cy="0" rx="12" ry="6" fill="url(#item-bench-bread)" stroke="#c69418" stroke-width="1.2"/>
          <path d="M-10,-1 q2,-3 4,0 M-4,-1 q2,-3 4,0 M2,-1 q2,-3 4,0" stroke="#a06820" stroke-width=".8" fill="none"/>
          <ellipse cx="-3" cy="-3" rx="6" ry="2" fill="#fff" opacity=".55"/>
        </g>
      </svg>`;

/* 9. bigtree (viewBox 0 0 180 215, w=0.17)
   树干木纹渐变 + 描边、5 圆树叶深浅绿渐变、4 红苹果（动态）、彩蛋树洞 */
const bigtreeSVG = `
      <svg viewBox="0 0 180 215" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bigtree-trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7a4d1d"/>
            <stop offset="50%" stop-color="#a9784a"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-bigtree-branch" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a9784a"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <radialGradient id="item-bigtree-leaves-dark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#8fe08a"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </radialGradient>
          <radialGradient id="item-bigtree-leaves-light" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#b8e0b0"/>
            <stop offset="100%" stop-color="#6cc46a"/>
          </radialGradient>
          <radialGradient id="item-bigtree-leaves-top" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#d0e8c8"/>
            <stop offset="100%" stop-color="#7ed47b"/>
          </radialGradient>
          <radialGradient id="item-bigtree-apple" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#ff8f7a"/>
            <stop offset="100%" stop-color="#d63a3a"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="90" cy="208" rx="50" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 树干（木纹渐变 + 描边） -->
        <path d="M82,210 L84,130 Q85,120 78,112 M98,210 L96,130 Q95,120 104,110" stroke="url(#item-bigtree-trunk)" stroke-width="16" fill="none" stroke-linecap="round"/>
        <!-- 树干高光（中央一道浅线） -->
        <path d="M90,200 L90,130" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>
        <!-- 分支（木纹） -->
        <path d="M90,130 Q70,110 52,104 M90,124 Q110,102 128,100" stroke="url(#item-bigtree-branch)" stroke-width="10" fill="none" stroke-linecap="round"/>
        <!-- 5 圆树叶（深浅绿渐变叠加） -->
        <circle cx="90" cy="72" r="52" fill="url(#item-bigtree-leaves-dark)" stroke="#3a8a3a" stroke-width="1.5"/>
        <circle cx="70" cy="58" r="40" fill="url(#item-bigtree-leaves-light)" stroke="#4a9a4a" stroke-width="1" opacity=".85"/>
        <circle cx="46" cy="96" r="34" fill="url(#item-bigtree-leaves-dark)" stroke="#3a8a3a" stroke-width="1.5"/>
        <circle cx="36" cy="86" r="20" fill="url(#item-bigtree-leaves-light)" opacity=".75"/>
        <circle cx="136" cy="92" r="34" fill="url(#item-bigtree-leaves-dark)" stroke="#3a8a3a" stroke-width="1.5"/>
        <circle cx="146" cy="82" r="20" fill="url(#item-bigtree-leaves-light)" opacity=".75"/>
        <circle cx="64" cy="44" r="28" fill="url(#item-bigtree-leaves-top)" stroke="#5ba85b" stroke-width="1.2"/>
        <circle cx="118" cy="42" r="26" fill="url(#item-bigtree-leaves-top)" stroke="#5ba85b" stroke-width="1.2"/>
        <!-- 4 红苹果（动态） -->
        ${[[70, 60], [104, 78], [88, 38], [124, 56]].map(([x, y]) =>
          '<circle cx="' + x + '" cy="' + y + '" r="6" fill="url(#item-bigtree-apple)" stroke="#a8302a" stroke-width="1.2"/>'
          + '<circle cx="' + (x - 2) + '" cy="' + (y - 2) + '" r="2" fill="#fff" opacity=".7"/>'
          + '<line x1="' + x + '" y1="' + (y - 6) + '" x2="' + x + '" y2="' + (y - 9) + '" stroke="#7a4d1d" stroke-width="1"/>'
          + '<ellipse cx="' + (x + 1) + '" cy="' + (y - 8) + '" rx="2" ry="1" fill="#6cc46a"/>').join('')}
        <!-- 彩蛋：树洞 -->
        <ellipse cx="86" cy="170" rx="8" ry="10" fill="#3a2418" stroke="#1a1208" stroke-width="1.5"/>
        <ellipse cx="83" cy="166" rx="2" ry="1" fill="#7a4d1d" opacity=".7"/>
        <!-- 树洞里探出的小松鼠眼睛 -->
        <circle cx="84" cy="172" r="1.5" fill="#fff"/>
        <circle cx="84" cy="172" r="1" fill="#5b3a29"/>
        <circle cx="88" cy="172" r="1.5" fill="#fff"/>
        <circle cx="88" cy="172" r="1" fill="#5b3a29"/>
      </svg>`;

/* ---------- 替换 ---------- */

const replacements = [
  // 1. swing
  {
    label: 'swing',
    old: `    swing: { w: 0.155, act: 'swing', svg: \`
      <svg viewBox="0 0 170 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="30" x2="12" y2="192" stroke="#c98443" stroke-width="10" stroke-linecap="round"/>
        <line x1="140" y1="30" x2="158" y2="192" stroke="#c98443" stroke-width="10" stroke-linecap="round"/>
        <line x1="30" y1="30" x2="52" y2="192" stroke="#b07838" stroke-width="9" stroke-linecap="round"/>
        <line x1="140" y1="30" x2="118" y2="192" stroke="#b07838" stroke-width="9" stroke-linecap="round"/>
        <rect x="18" y="22" width="134" height="12" rx="6" fill="#c98443"/>
        <line x1="66" y1="34" x2="66" y2="116" stroke="#b0a08a" stroke-width="4.5"/>
        <line x1="104" y1="34" x2="104" y2="116" stroke="#b0a08a" stroke-width="4.5"/>
        <rect x="54" y="112" width="62" height="14" rx="7" fill="#ff9eb5"/>
        <rect x="54" y="112" width="62" height="6" rx="3" fill="#ffc2d3"/>
      </svg>\` },`,
    new: `    swing: { w: 0.155, act: 'swing', svg: \`${swingSVG}\` },`,
  },
  // 2. sandbox
  {
    label: 'sandbox',
    old: `    sandbox: { w: 0.165, flat: true, svg: \`
      <svg viewBox="0 0 175 95" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="155" height="60" rx="10" fill="#d98c5a"/>
        <rect x="20" y="26" width="135" height="44" rx="7" fill="#f2d9a0"/>
        <rect x="10" y="8" width="12" height="22" rx="5" fill="#c47a44"/>
        <rect x="153" y="8" width="12" height="22" rx="5" fill="#c47a44"/>
        <rect x="10" y="64" width="12" height="22" rx="5" fill="#c47a44"/>
        <rect x="153" y="64" width="12" height="22" rx="5" fill="#c47a44"/>
        \${[[45, 45], [75, 55], [105, 42], [130, 55], [60, 62]].map(([x, y]) => \`<circle cx="\${x}" cy="\${y}" r="2.2" fill="#d9b87a"/>\`).join('')}
        <path d="M36,38 L52,38 L49,52 Q44,56 39,52 Z" fill="#ff8f7a"/>
        <rect x="42" y="30" width="4" height="9" rx="2" fill="#ff6b6b"/>
        <line x1="112" y1="62" x2="122" y2="42" stroke="#7ec8e3" stroke-width="5" stroke-linecap="round"/>
        <path d="M118,44 L130,46 L122,54 Z" fill="#9ad7f0"/>
      </svg>\` },`,
    new: `    sandbox: { w: 0.165, flat: true, svg: \`${sandboxSVG}\` },`,
  },
  // 3. tent
  {
    label: 'tent',
    old: `    tent: { w: 0.145, svg: \`
      <svg viewBox="0 0 160 155" xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,145 80,18 145,145" fill="#7ec8e3"/>
        <polygon points="38,145 80,72 122,145" fill="#5aa8cc"/>
        <polygon points="60,145 80,100 100,145" fill="#4f9cc0"/>
        <line x1="80" y1="18" x2="80" y2="2" stroke="#c98443" stroke-width="4"/>
        <path d="M80,4 L102,10 L84,18 Z" fill="#ff6b6b"/>
        <ellipse cx="80" cy="147" rx="66" ry="6" fill="rgba(90,140,90,.25)"/>
      </svg>\` },`,
    new: `    tent: { w: 0.145, svg: \`${tentSVG}\` },`,
  },
  // 4. fence
  {
    label: 'fence',
    old: `    fence: { w: 0.2, svg: \`
      <svg viewBox="0 0 210 115" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="38" width="198" height="12" rx="6" fill="#fff0e0"/>
        <rect x="6" y="66" width="198" height="12" rx="6" fill="#fff0e0"/>
        \${[20, 60, 100, 140, 180].map(x => \`
          <path d="M\${x - 11},88 L\${x - 11},30 Q\${x - 11},14 \${x},10 Q\${x + 11},14 \${x + 11},30 L\${x + 11},88 Z" fill="#fff8f0" stroke="#ecd9c3" stroke-width="2"/>\`).join('')}
        <g transform="translate(60,34)">
          <circle r="6" fill="#ff9eb5"/><circle cy="-7" r="4" fill="#ff9eb5"/><circle cx="7" r="4" fill="#ff9eb5"/><circle cx="-7" r="4" fill="#ff9eb5"/><circle r="2.5" fill="#ffd34d"/>
        </g>
        <g transform="translate(150,32)">
          <circle r="5.5" fill="#b79ced"/><circle cy="-6.5" r="3.8" fill="#b79ced"/><circle cx="6.5" r="3.8" fill="#b79ced"/><circle cx="-6.5" r="3.8" fill="#b79ced"/><circle r="2.2" fill="#ffd34d"/>
        </g>
      </svg>\` },`,
    new: `    fence: { w: 0.2, svg: \`${fenceSVG}\` },`,
  },
  // 5. mailbox
  {
    label: 'mailbox',
    old: `    mailbox: { w: 0.075, svg: \`
      <svg viewBox="0 0 80 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="60" x2="40" y2="140" stroke="#c98443" stroke-width="9" stroke-linecap="round"/>
        <path d="M12,58 L12,30 Q12,16 26,16 L62,16 L62,58 Q40,66 12,58 Z" fill="#7ec8e3"/>
        <rect x="56" y="26" width="12" height="22" rx="4" fill="#5aa8cc"/>
        <circle cx="62" cy="37" r="2.5" fill="#fff"/>
        <line x1="18" y1="14" x2="18" y2="2" stroke="#ff6b6b" stroke-width="4" stroke-linecap="round"/>
        <circle cx="18" cy="2" r="4" fill="#ff6b6b"/>
        <path d="M20,46 Q34,52 46,46" stroke="#5aa8cc" stroke-width="3" fill="none"/>
      </svg>\` },`,
    new: `    mailbox: { w: 0.075, svg: \`${mailboxSVG}\` },`,
  },
  // 6. slide
  {
    label: 'slide',
    old: `    slide: { w: 0.17, svg: \`
      <svg viewBox="0 0 180 195" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="40" x2="30" y2="184" stroke="#c98443" stroke-width="9" stroke-linecap="round"/>
        <line x1="58" y1="40" x2="58" y2="184" stroke="#c98443" stroke-width="9" stroke-linecap="round"/>
        \${[64, 92, 120, 148, 176].map(y => \`<line x1="30" y1="\${y - 18}" x2="58" y2="\${y - 18}" stroke="#b07838" stroke-width="6" stroke-linecap="round"/>\`).join('')}
        <rect x="24" y="30" width="70" height="12" rx="6" fill="#ff9eb5"/>
        <path d="M88,36 L162,168 Q168,182 154,182 L142,182 Q150,170 96,44 Z" fill="#ffd166"/>
        <path d="M88,46 L148,166 L136,166 L84,50 Z" fill="#ffe9a8"/>
        <rect x="88" y="34" width="10" height="10" rx="4" fill="#e0a92c"/>
        <line x1="60" y1="40" x2="88" y2="40" stroke="#ff9eb5" stroke-width="10" stroke-linecap="round"/>
      </svg>\` },`,
    new: `    slide: { w: 0.17, svg: \`${slideSVG}\` },`,
  },
  // 7. pond
  {
    label: 'pond',
    old: `    pond: { w: 0.2, flat: true, svg: \`
      <svg viewBox="0 0 210 105" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="105" cy="54" rx="98" ry="46" fill="#c9c2b8"/>
        <ellipse cx="105" cy="52" rx="86" ry="38" fill="#9ad7f0"/>
        <ellipse cx="105" cy="52" rx="86" ry="38" fill="none" stroke="#7ec8e3" stroke-width="4"/>
        <ellipse cx="80" cy="44" rx="16" ry="8" fill="#6cc46a"/>
        <ellipse cx="126" cy="62" rx="13" ry="6.5" fill="#7ed47b"/>
        <g transform="translate(126,44)">
          \${[0, 72, 144, 216, 288].map(a => \`<ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="#ff9eb5" transform="rotate(\${a})"/>\`).join('')}
          <circle r="2.8" fill="#ffd34d"/>
        </g>
        \${[[50, 30], [160, 34], [66, 70], [148, 72]].map(([x, y]) => \`<circle cx="\${x}" cy="\${y}" r="7" fill="#b8b0a4"/>\`).join('')}
        <path d="M92,56 q4,3 8,0 M96,50 q4,3 8,0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
      </svg>\` },`,
    new: `    pond: { w: 0.2, flat: true, svg: \`${pondSVG}\` },`,
  },
  // 8. bench
  {
    label: 'bench',
    old: `    bench: { w: 0.13, svg: \`
      <svg viewBox="0 0 140 125" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="120" height="12" rx="6" fill="#98d8a0"/>
        <rect x="10" y="38" width="120" height="12" rx="6" fill="#98d8a0"/>
        <rect x="8" y="58" width="124" height="16" rx="8" fill="#7ec088"/>
        <line x1="22" y1="30" x2="22" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="30" x2="118" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
        <line x1="22" y1="66" x2="22" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="66" x2="118" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
      </svg>\` },`,
    new: `    bench: { w: 0.13, svg: \`${benchSVG}\` },`,
  },
  // 9. bigtree
  {
    label: 'bigtree',
    old: `    bigtree: { w: 0.17, svg: \`
      <svg viewBox="0 0 180 215" xmlns="http://www.w3.org/2000/svg">
        <path d="M82,210 L84,130 Q85,120 78,112 M98,210 L96,130 Q95,120 104,110" stroke="#a9784a" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M90,130 Q70,110 52,104 M90,124 Q110,102 128,100" stroke="#a9784a" stroke-width="10" fill="none" stroke-linecap="round"/>
        <circle cx="90" cy="72" r="52" fill="#6cc46a"/>
        <circle cx="46" cy="96" r="34" fill="#7ed47b"/>
        <circle cx="136" cy="92" r="34" fill="#7ed47b"/>
        <circle cx="64" cy="44" r="28" fill="#8fe08a"/>
        <circle cx="118" cy="42" r="26" fill="#8fe08a"/>
        \${[[70, 60], [104, 78], [88, 38], [124, 56]].map(([x, y]) => \`<circle cx="\${x}" cy="\${y}" r="6" fill="#ff6b6b"/><circle cx="\${x - 2}" cy="\${y - 2}" r="2" fill="#fff" opacity=".6"/>\`).join('')}
      </svg>\` },`,
    new: `    bigtree: { w: 0.17, svg: \`${bigtreeSVG}\` },`,
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

const ids = ['swing', 'sandbox', 'tent', 'fence', 'mailbox', 'slide', 'pond', 'bench', 'bigtree'];
for (const id of ids) {
  if (!cur.includes(id + ':')) { console.error('id missing:', id); process.exit(1); }
  const vbMatch = cur.match(new RegExp(id + ': \\{[^}]*viewBox="0 0 (\\d+) (\\d+)"'));
  if (!vbMatch) { console.error('viewBox missing for:', id); process.exit(1); }
  console.log('  ' + id + ' viewBox=' + vbMatch[1] + 'x' + vbMatch[2]);
}
console.log('all 9 ids + viewBoxes verified');
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');