/* 物品升级 第 2 批：浴室+阳台+换衣间 11 件（路线 A 全程序化 SVG）
   老吴 2026-09-23 拍板"继续做"。沿用第 1 批模板：defs + gradient + stroke + 多层高光 + 细节彩蛋。
   viewBox 保持原值，ITEMS[id].w 字段不变。defs id 加 item- 前缀避开 doll/cat。 */
import fs from 'node:fs';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_batch2_20260923_133400';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- 11 件新 SVG ---------- */

/* 1. bathtub (viewBox 0 0 210 150, w=0.20, act='bath')
   浴缸白渐变 + 描边 + 边沿高光、水浅蓝渐变、5 个气泡、鸭/鱼玩偶、彩蛋爱心 */
const bathtubSVG = `
      <svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bathtub-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e0d8ee"/>
          </linearGradient>
          <linearGradient id="item-bathtub-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dff3ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-bathtub-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fdfdff"/>
            <stop offset="100%" stop-color="#c9c2d8"/>
          </linearGradient>
          <linearGradient id="item-bathtub-duck" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="105" cy="138" rx="80" ry="6" fill="rgba(0,0,0,.12)"/>
        <!-- 浴缸主体（白渐变 + 描边） -->
        <path d="M22,52 L188,52 L176,116 Q105,132 34,116 Z" fill="url(#item-bathtub-body)" stroke="#c9c2d8" stroke-width="4"/>
        <!-- 浴缸边沿（紫粉描边） -->
        <rect x="16" y="44" width="178" height="14" rx="7" fill="url(#item-bathtub-rim)" stroke="#c9c2d8" stroke-width="2"/>
        <rect x="20" y="46" width="170" height="4" rx="2" fill="#fff" opacity=".7"/>
        <!-- 浴缸内部水面（蓝渐变） -->
        <ellipse cx="105" cy="56" rx="80" ry="10" fill="url(#item-bathtub-water)"/>
        <!-- 水波纹（彩蛋） -->
        <path d="M40,56 q4,-3 8,0 q4,3 8,0 M70,60 q4,-3 8,0 M100,58 q4,-3 8,0 M130,60 q4,-3 8,0" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>
        <!-- 水龙头（金属渐变） -->
        <path d="M186,58 Q204,58 202,38 L202,30" stroke="#bcc4cf" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="202" cy="26" r="7" fill="#bcc4cf" stroke="#7a8590" stroke-width="1.5"/>
        <circle cx="200" cy="24" r="2" fill="#fff" opacity=".85"/>
        <!-- 浴缸脚（2 个金黄） -->
        <path d="M40,116 L32,134 M170,116 L178,134" stroke="#f2b730" stroke-width="8" fill="none" stroke-linecap="round"/>
        <ellipse cx="32" cy="135" rx="6" ry="2" fill="rgba(0,0,0,.18)"/>
        <ellipse cx="178" cy="135" rx="6" ry="2" fill="rgba(0,0,0,.18)"/>
        <!-- 5 个气泡（动态模板） -->
        ${[[52, 40, 13], [76, 32, 9], [98, 42, 12], [122, 34, 9], [146, 41, 13]].map(([x, y, r]) =>
          '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" stroke="#9ad7f0" stroke-width="1" opacity=".85"/>').join('')}
        <!-- 鸭/鱼玩偶 -->
        <g transform="translate(150,30)">
          <ellipse cx="0" cy="8" rx="13" ry="9" fill="url(#item-bathtub-duck)" stroke="#c69418" stroke-width="1.5"/>
          <circle cx="-3" cy="-4" r="8.5" fill="url(#item-bathtub-duck)" stroke="#c69418" stroke-width="1.5"/>
          <polygon points="4,-5 13,-3 5,1" fill="#ff9f43" stroke="#c4631a" stroke-width="1"/>
          <circle cx="-6" cy="-6" r="2.5" fill="#fff" stroke="#5b3a29" stroke-width="1"/>
          <circle cx="-6" cy="-6" r="1.3" fill="#5b3a29"/>
          <circle cx="-6.5" cy="-6.5" r=".5" fill="#fff"/>
        </g>
      </svg>`;

/* 2. sink (viewBox 0 0 120 170, w=0.115)
   洗手盆白渐变 + 描边、水龙头金属渐变、立柱白渐变 + 描边、底座紫渐变、彩蛋水滴 */
const sinkSVG = `
      <svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-sink-bowl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8e0f2"/>
          </linearGradient>
          <linearGradient id="item-sink-pedestal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#d8d0e2"/>
          </linearGradient>
          <linearGradient id="item-sink-tap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#bcc4cf"/>
            <stop offset="50%" stop-color="#e8eaf0"/>
            <stop offset="100%" stop-color="#bcc4cf"/>
          </linearGradient>
          <radialGradient id="item-sink-water" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#bfe6ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="60" cy="158" rx="40" ry="6" fill="rgba(0,0,0,.12)"/>
        <!-- 洗手盆（白渐变 + 描边） -->
        <path d="M18,66 L102,66 L96,92 Q60,102 24,92 Z" fill="url(#item-sink-bowl)" stroke="#c9c2d8" stroke-width="4"/>
        <!-- 盆内水面（径向渐变） -->
        <ellipse cx="60" cy="66" rx="42" ry="9" fill="url(#item-sink-water)"/>
        <ellipse cx="50" cy="64" rx="14" ry="3" fill="#fff" opacity=".6"/>
        <!-- 盆沿高光 -->
        <path d="M22,68 Q60,72 98,68" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>
        <!-- 立柱（白渐变 + 描边） -->
        <path d="M60,70 L60,150" stroke="url(#item-sink-pedestal)" stroke-width="22" stroke-linecap="round"/>
        <line x1="50" y1="86" x2="50" y2="140" stroke="#fff" stroke-width="2" opacity=".5"/>
        <!-- 底座（紫渐变椭圆） -->
        <ellipse cx="60" cy="156" rx="26" ry="7" fill="url(#item-sink-pedestal)" stroke="#c9c2d8" stroke-width="2"/>
        <ellipse cx="50" cy="153" rx="14" ry="3" fill="#fff" opacity=".55"/>
        <!-- 水龙头（金属渐变） -->
        <path d="M44,60 Q44,50 54,50 M76,60 Q76,50 66,50" stroke="url(#item-sink-tap)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M60,50 L60,40 L74,40" stroke="url(#item-sink-tap)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="76" cy="40" r="5" fill="url(#item-sink-tap)" stroke="#7a8590" stroke-width="1.5"/>
        <circle cx="74" cy="38" r="1.5" fill="#fff" opacity=".85"/>
        <!-- 彩蛋：龙头下小水滴 -->
        <path d="M68,52 q-2,4 0,6 q2,-2 0,-6 z" fill="#bfe6ff" stroke="#7ec8e3" stroke-width=".8"/>
      </svg>`;

/* 3. toilet (viewBox 0 0 105 145, w=0.10)
   水箱白渐变 + 描边 + 按钮黄渐变、坐便圈白渐变 + 描边、底座紫渐变、水面径向、彩蛋贴纸 */
const toiletSVG = `
      <svg viewBox="0 0 105 145" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-toilet-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8e0f2"/>
          </linearGradient>
          <linearGradient id="item-toilet-button" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
          <radialGradient id="item-toilet-water" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#bfe6ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="53" cy="138" rx="35" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 水箱（白渐变 + 描边） -->
        <rect x="22" y="16" width="62" height="52" rx="12" fill="url(#item-toilet-body)" stroke="#c9c2d8" stroke-width="3"/>
        <rect x="26" y="20" width="54" height="6" rx="3" fill="#fff" opacity=".7"/>
        <!-- 按钮（黄渐变） -->
        <circle cx="53" cy="30" r="6" fill="url(#item-toilet-button)" stroke="#c69418" stroke-width="1.5"/>
        <circle cx="51" cy="28" r="2" fill="#fff" opacity=".85"/>
        <!-- 彩蛋：水箱右侧小贴纸 -->
        <rect x="68" y="22" width="10" height="10" rx="2" fill="#ff9eb5" stroke="#e05c86" stroke-width="1"/>
        <text x="73" y="30" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="6" font-weight="700" fill="#fff">♥</text>
        <!-- 坐便圈（白渐变 + 描边） -->
        <ellipse cx="53" cy="78" rx="42" ry="16" fill="url(#item-toilet-body)" stroke="#c9c2d8" stroke-width="3"/>
        <!-- 坐便主体（弧形 + 描边） -->
        <path d="M38,90 L38,124 Q53,134 68,124 L68,90" fill="url(#item-toilet-body)" stroke="#c9c2d8" stroke-width="3"/>
        <!-- 底座（紫渐变椭圆） -->
        <ellipse cx="53" cy="130" rx="24" ry="6" fill="#d8d0e2" stroke="#c9c2d8" stroke-width="2"/>
        <!-- 坐便水面（径向蓝） -->
        <ellipse cx="53" cy="78" rx="30" ry="9" fill="url(#item-toilet-water)"/>
        <ellipse cx="45" cy="76" rx="10" ry="2" fill="#fff" opacity=".7"/>
      </svg>`;

/* 4. towelrack (viewBox 0 0 110 150, w=0.10)
   2 立柱木纹 + 描边、1 横杆黄渐变、毛巾1 粉渐变 + 描边 + 高光、毛巾2 蓝渐变 + 描边 + 高光、彩蛋小夹子 */
const towelrackSVG = `
      <svg viewBox="0 0 110 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-towelrack-pole" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="50%" stop-color="#a07242"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-towelrack-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
          <linearGradient id="item-towelrack-pink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-towelrack-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="60%" stop-color="#7ec8e3"/>
            <stop offset="100%" stop-color="#5ba8c8"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="55" cy="144" rx="50" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 左立柱（木纹 + 描边） -->
        <line x1="16" y1="20" x2="16" y2="140" stroke="url(#item-towelrack-pole)" stroke-width="8" stroke-linecap="round"/>
        <line x1="14" y1="30" x2="14" y2="130" stroke="#fff" stroke-width="1" opacity=".4"/>
        <!-- 右立柱 -->
        <line x1="94" y1="20" x2="94" y2="140" stroke="url(#item-towelrack-pole)" stroke-width="8" stroke-linecap="round"/>
        <line x1="92" y1="30" x2="92" y2="130" stroke="#fff" stroke-width="1" opacity=".4"/>
        <!-- 横杆（黄渐变 + 描边） -->
        <line x1="12" y1="36" x2="98" y2="36" stroke="url(#item-towelrack-bar)" stroke-width="7" stroke-linecap="round"/>
        <line x1="14" y1="33" x2="96" y2="33" stroke="#fff" stroke-width="1" opacity=".6"/>
        <!-- 粉毛巾（粉渐变 + 描边 + 高光） -->
        <rect x="24" y="40" width="26" height="62" rx="8" fill="url(#item-towelrack-pink)" stroke="#c4738a" stroke-width="2"/>
        <rect x="28" y="42" width="18" height="6" rx="2" fill="#fff" opacity=".55"/>
        <!-- 粉毛巾条纹 -->
        <line x1="24" y1="56" x2="50" y2="56" stroke="#e05c86" stroke-width="3"/>
        <line x1="24" y1="72" x2="50" y2="72" stroke="#e05c86" stroke-width="3"/>
        <!-- 蓝毛巾（蓝渐变 + 描边 + 高光） -->
        <rect x="58" y="40" width="26" height="50" rx="8" fill="url(#item-towelrack-blue)" stroke="#4a98b8" stroke-width="2"/>
        <rect x="62" y="42" width="18" height="6" rx="2" fill="#fff" opacity=".55"/>
        <!-- 蓝毛巾条纹 -->
        <line x1="58" y1="56" x2="84" y2="56" stroke="#4f9cc0" stroke-width="3"/>
        <!-- 彩蛋：横杆上的小夹子 -->
        <circle cx="40" cy="36" r="3" fill="#ffe9a8" stroke="#c69418" stroke-width=".8"/>
        <circle cx="70" cy="36" r="3" fill="#ffe9a8" stroke="#c69418" stroke-width=".8"/>
      </svg>`;

/* 5. bmirror (viewBox 0 0 100 125, w=0.09)
   镜面浅蓝玻璃 + 描边 + 左上高光、镜框粉渐变、镜下架子 + 瓶子、镜中反射星、彩蛋水滴 */
const bmirrorSVG = `
      <svg viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-bmirror-glass" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="60%" stop-color="#dff3ff"/>
            <stop offset="100%" stop-color="#9ad7f0"/>
          </radialGradient>
          <linearGradient id="item-bmirror-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffc9d8"/>
            <stop offset="100%" stop-color="#e8a3bd"/>
          </linearGradient>
          <linearGradient id="item-bmirror-bottle1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-bmirror-bottle2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#ff9eb5"/>
          </linearGradient>
          <linearGradient id="item-bmirror-bottle3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#9ad7f0"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="50" cy="118" rx="42" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 镜框（粉渐变 + 描边） -->
        <circle cx="50" cy="44" r="38" fill="url(#item-bmirror-frame)" stroke="#c4738a" stroke-width="3"/>
        <!-- 镜面玻璃（径向渐变 + 描边） -->
        <circle cx="50" cy="44" r="32" fill="url(#item-bmirror-glass)" stroke="#9ad7f0" stroke-width="2"/>
        <!-- 镜面左上方高光弧 -->
        <path d="M30,30 Q40,22 52,26" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>
        <ellipse cx="36" cy="34" rx="6" ry="3" fill="#fff" opacity=".7" transform="rotate(-30 36 34)"/>
        <!-- 镜中反射星（彩蛋） -->
        <path d="M62,58 l3,7 7,0.6 -5,4.5 1.5,7 -6.5,-4 -6.5,4 1.5,-7 -5,-4.5 7,-0.6z" fill="#ffd34d" stroke="#c69418" stroke-width=".8"/>
        <!-- 镜下架子（粉渐变 + 描边） -->
        <rect x="14" y="86" width="72" height="12" rx="6" fill="url(#item-bmirror-frame)" stroke="#c4738a" stroke-width="2"/>
        <rect x="16" y="88" width="68" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <!-- 架上 3 瓶 -->
        <rect x="26" y="74" width="10" height="14" rx="4" fill="url(#item-bmirror-bottle1)" stroke="#4f9cc0" stroke-width="1.2"/>
        <rect x="27" y="75" width="8" height="3" rx="1" fill="#fff" opacity=".6"/>
        <rect x="42" y="70" width="10" height="18" rx="4" fill="url(#item-bmirror-bottle2)" stroke="#e05c86" stroke-width="1.2"/>
        <rect x="43" y="71" width="8" height="3" rx="1" fill="#fff" opacity=".6"/>
        <rect x="58" y="76" width="10" height="12" rx="4" fill="url(#item-bmirror-bottle3)" stroke="#4f9cc0" stroke-width="1.2"/>
        <rect x="59" y="77" width="8" height="3" rx="1" fill="#fff" opacity=".6"/>
      </svg>`;

/* 6. bathmat (viewBox 0 0 150 65, w=0.135, flat)
   椭圆渐变 + 描边 + 边沿、4 个装饰圆点（动态）、彩蛋小脚印 */
const bathmatSVG = `
      <svg viewBox="0 0 150 65" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bathmat-out" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bfe6ff"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-bathmat-in" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8f7ff"/>
            <stop offset="100%" stop-color="#c4e7f5"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="75" cy="60" rx="68" ry="4" fill="rgba(0,0,0,.1)"/>
        <!-- 外圈（深蓝渐变 + 描边） -->
        <ellipse cx="75" cy="33" rx="71" ry="27" fill="url(#item-bathmat-out)" stroke="#4f9cc0" stroke-width="2"/>
        <!-- 内圈（浅蓝渐变 + 描边） -->
        <ellipse cx="75" cy="33" rx="52" ry="19" fill="url(#item-bathmat-in)" stroke="#7ec8e3" stroke-width="1.5"/>
        <!-- 4 个装饰圆点（动态） -->
        ${[-30, -10, 10, 30].map(dx =>
          '<circle cx="' + (75 + dx) + '" cy="33" r="5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1.2"/>'
          + '<circle cx="' + (74 + dx) + '" cy="32" r="1.5" fill="#fff" opacity=".8"/>').join('')}
        <!-- 彩蛋：中央小脚印 -->
        <g transform="translate(75,33)" opacity=".5">
          <ellipse cx="0" cy="0" rx="3" ry="4" fill="#7ec8e3"/>
          <circle cx="-2.5" cy="-3.5" r="1" fill="#7ec8e3"/>
          <circle cx="2.5" cy="-3.5" r="1" fill="#7ec8e3"/>
          <circle cx="0" cy="-5" r="1" fill="#7ec8e3"/>
        </g>
      </svg>`;

/* 7. st_duck (viewBox 0 0 90 90, w=0.085, sticker)
   鸭身体黄渐变 + 描边 + 翅膀、鸭头、鸭嘴橙渐变、彩蛋水波 */
const st_duckSVG = `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-stduck-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
          <linearGradient id="item-stduck-beak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffb75a"/>
            <stop offset="100%" stop-color="#ff7f2a"/>
          </linearGradient>
          <radialGradient id="item-stduck-eye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#dff3ff"/>
          </radialGradient>
        </defs>
        <!-- 鸭身体（黄渐变 + 描边） -->
        <ellipse cx="45" cy="56" rx="26" ry="18" fill="url(#item-stduck-body)" stroke="#c69418" stroke-width="2"/>
        <!-- 翅膀（彩蛋） -->
        <path d="M28,52 Q35,46 44,52 Q35,58 28,52 Z" fill="#fff" stroke="#c69418" stroke-width="1.2" opacity=".85"/>
        <!-- 鸭肚子高光 -->
        <ellipse cx="38" cy="58" rx="10" ry="6" fill="#fff" opacity=".55"/>
        <!-- 身体底部 -->
        <path d="M24,60 Q45,74 66,60" stroke="#c69418" stroke-width="2" fill="none"/>
        <!-- 鸭头（黄渐变 + 描边） -->
        <circle cx="36" cy="32" r="15" fill="url(#item-stduck-body)" stroke="#c69418" stroke-width="2"/>
        <circle cx="32" cy="26" r="5" fill="#fff" opacity=".55"/>
        <!-- 鸭嘴（橙渐变 + 描边） -->
        <polygon points="48,30 64,34 49,40" fill="url(#item-stduck-beak)" stroke="#c4631a" stroke-width="1.2"/>
        <!-- 眼睛（白描边 + 黑瞳 + 高光） -->
        <circle cx="32" cy="29" r="3.5" fill="url(#item-stduck-eye)" stroke="#5b3a29" stroke-width="1"/>
        <circle cx="32" cy="29" r="1.8" fill="#5b3a29"/>
        <circle cx="32.5" cy="28.5" r=".8" fill="#fff"/>
        <!-- 翅膀扇动弧线 -->
        <path d="M50,52 Q58,48 62,54" stroke="#c69418" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`;

/* 8. st_bubble (viewBox 0 0 90 90, w=0.08, sticker)
   3 个气泡蓝径向 + 白描边 + 高光、彩蛋大泡里的爱心 */
const st_bubbleSVG = `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-stbubble-1" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".95"/>
            <stop offset="100%" stop-color="#7ec8e3" stop-opacity=".55"/>
          </radialGradient>
          <radialGradient id="item-stbubble-2" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".85"/>
            <stop offset="100%" stop-color="#7ec8e3" stop-opacity=".45"/>
          </radialGradient>
          <radialGradient id="item-stbubble-3" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".9"/>
            <stop offset="100%" stop-color="#7ec8e3" stop-opacity=".5"/>
          </radialGradient>
        </defs>
        <!-- 大气泡（蓝径向 + 白描边 + 高光） -->
        <circle cx="34" cy="38" r="20" fill="url(#item-stbubble-1)" stroke="#fff" stroke-width="3"/>
        <ellipse cx="27" cy="31" rx="6" ry="4" fill="#fff" opacity=".85" transform="rotate(-24 27 31)"/>
        <!-- 中气泡 -->
        <circle cx="62" cy="58" r="14" fill="url(#item-stbubble-2)" stroke="#fff" stroke-width="3"/>
        <ellipse cx="57" cy="53" rx="4" ry="3" fill="#fff" opacity=".85"/>
        <!-- 小气泡 -->
        <circle cx="56" cy="20" r="9" fill="url(#item-stbubble-3)" stroke="#fff" stroke-width="2.5"/>
        <ellipse cx="52" cy="17" rx="2.5" ry="1.8" fill="#fff" opacity=".85"/>
        <!-- 彩蛋：大气泡里小爱心 -->
        <path d="M34,40 q-3,-3 -5,0 q-2,3 -5,0 q2,4 5,6 q4,-3 5,-6 z" fill="#ff9eb5" stroke="#e05c86" stroke-width=".6" opacity=".7"/>
      </svg>`;

/* 9. flowerstand (viewBox 0 0 120 190, w=0.115)
   双层架木纹 + 描边、立柱 2 根木纹、上层 2 盆橙粉渐变 + 花、下层 1 盆紫渐变 + 5 瓣花（动态）、彩蛋蝴蝶 */
const flowerstandSVG = `
      <svg viewBox="0 0 120 190" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-flowerstand-shelf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-flowerstand-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#a07242"/>
            <stop offset="50%" stop-color="#c47a44"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-flowerstand-pot1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2a86e"/>
            <stop offset="100%" stop-color="#c47744"/>
          </linearGradient>
          <linearGradient id="item-flowerstand-pot2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#b79ced"/>
            <stop offset="100%" stop-color="#7a4da8"/>
          </linearGradient>
          <radialGradient id="item-flowerstand-petal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </radialGradient>
          <radialGradient id="item-flowerstand-petal-pur" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e0d0f0"/>
            <stop offset="60%" stop-color="#b79ced"/>
            <stop offset="100%" stop-color="#7a4da8"/>
          </radialGradient>
          <radialGradient id="item-flowerstand-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#ffd34d"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="60" cy="184" rx="40" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 上层架（木纹 + 描边） -->
        <rect x="18" y="60" width="84" height="9" rx="4.5" fill="url(#item-flowerstand-shelf)" stroke="#7a4d1d" stroke-width="1.5"/>
        <rect x="22" y="62" width="76" height="2" rx="1" fill="#fff" opacity=".5"/>
        <!-- 下层架 -->
        <rect x="18" y="120" width="84" height="9" rx="4.5" fill="url(#item-flowerstand-shelf)" stroke="#7a4d1d" stroke-width="1.5"/>
        <rect x="22" y="122" width="76" height="2" rx="1" fill="#fff" opacity=".5"/>
        <!-- 立柱 2 根（木纹 + 描边） -->
        <line x1="26" y1="69" x2="26" y2="182" stroke="url(#item-flowerstand-pole)" stroke-width="9" stroke-linecap="round"/>
        <line x1="94" y1="69" x2="94" y2="182" stroke="url(#item-flowerstand-pole)" stroke-width="9" stroke-linecap="round"/>
        <!-- 上层左盆（橙粉渐变） -->
        <path d="M34,60 L50,60 L46,34 Q42,28 38,34 Z" fill="url(#item-flowerstand-pot1)" stroke="#a8562e" stroke-width="1.5"/>
        <!-- 上层右盆 -->
        <path d="M74,60 L90,60 L86,34 Q82,28 78,34 Z" fill="url(#item-flowerstand-pot1)" stroke="#a8562e" stroke-width="1.5"/>
        <!-- 上层 2 朵花（动态） -->
        ${[[42, 24], [82, 24]].map(([x, y]) =>
          '<circle cx="' + x + '" cy="' + y + '" r="8" fill="url(#item-flowerstand-petal)" stroke="#e05c86" stroke-width="1"/>'
          + '<circle cx="' + (x - 2) + '" cy="' + (y - 2) + '" r="3" fill="#fff" opacity=".7"/>'
          + '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="url(#item-flowerstand-core)" stroke="#c69418" stroke-width=".8"/>'
          + '<path d="M' + (x - 10) + ',' + (y + 6) + ' Q' + x + ',' + (y + 14) + ' ' + (x + 10) + ',' + (y + 6) + '" stroke="#6cc46a" stroke-width="3" fill="none" stroke-linecap="round"/>').join('')}
        <!-- 下层 1 盆（紫渐变） -->
        <path d="M50,120 L70,120 L67,102 Q60,96 53,102 Z" fill="url(#item-flowerstand-pot2)" stroke="#5a3a87" stroke-width="1.5"/>
        <!-- 下层 5 瓣紫花（动态） -->
        <g transform="translate(60,92)">
          ${[0, 72, 144, 216, 288].map(a =>
            '<ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="url(#item-flowerstand-petal-pur)" stroke="#5a3a87" stroke-width=".8" transform="rotate(' + a + ')"/>').join('')}
          <circle r="3.5" fill="url(#item-flowerstand-core)" stroke="#c69418" stroke-width=".8"/>
        </g>
      </svg>`;

/* 10. clothline (viewBox 0 0 240 160, w=0.22)
   2 立柱木纹、1 弯绳白描边、衣物 1（粉裙子）渐变 + 描边 + 褶皱、衣物 2（蓝衬衫）渐变 + 描边 + 纽扣、彩蛋袜子 */
const clothlineSVG = `
      <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-clothline-pole" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#7a4d1d"/>
          </linearGradient>
          <linearGradient id="item-clothline-dress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-clothline-shirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="60%" stop-color="#7ec8e3"/>
            <stop offset="100%" stop-color="#5ba8c8"/>
          </linearGradient>
          <linearGradient id="item-clothline-sock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd34d"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="120" cy="155" rx="115" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 左立柱（木纹 + 描边） -->
        <line x1="20" y1="10" x2="20" y2="150" stroke="url(#item-clothline-pole)" stroke-width="10" stroke-linecap="round"/>
        <line x1="18" y1="20" x2="18" y2="140" stroke="#fff" stroke-width="1" opacity=".4"/>
        <!-- 右立柱 -->
        <line x1="220" y1="10" x2="220" y2="150" stroke="url(#item-clothline-pole)" stroke-width="10" stroke-linecap="round"/>
        <line x1="218" y1="20" x2="218" y2="140" stroke="#fff" stroke-width="1" opacity=".4"/>
        <!-- 弯绳（白描边） -->
        <path d="M20,26 Q120,44 220,26" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M20,26 Q120,44 220,26" stroke="#b0a08a" stroke-width="1" fill="none" stroke-linecap="round" opacity=".5"/>
        <!-- 衣物 1（粉裙子，渐变 + 描边 + 褶皱） -->
        <g transform="rotate(-3 62 30)">
          <rect x="46" y="32" width="32" height="40" rx="6" fill="url(#item-clothline-dress)" stroke="#e05c86" stroke-width="1.5"/>
          <!-- 裙子褶皱 -->
          <path d="M52,38 L52,68 M58,38 L58,68 M64,38 L64,68 M70,38 L70,68" stroke="#e05c86" stroke-width=".8" fill="none" opacity=".5"/>
          <!-- 裙子领口蕾丝 -->
          <path d="M52,32 L58,24 L62,30 L66,24 L72,32" fill="none" stroke="#e05c86" stroke-width="2"/>
          <!-- 裙子腰带 -->
          <rect x="46" y="60" width="32" height="8" rx="4" fill="#e05c86" stroke="#c4738a" stroke-width="1"/>
          <!-- 裙子高光 -->
          <rect x="50" y="34" width="6" height="36" rx="3" fill="#fff" opacity=".5"/>
        </g>
        <!-- 衣物 2（蓝衬衫，渐变 + 描边 + 纽扣） -->
        <g transform="rotate(2 150 32)">
          <rect x="132" y="34" width="36" height="30" rx="5" fill="url(#item-clothline-shirt)" stroke="#4f9cc0" stroke-width="1.5"/>
          <!-- 衬衫条纹 -->
          <line x1="140" y1="34" x2="140" y2="64" stroke="#fff" stroke-width="2" opacity=".5"/>
          <line x1="160" y1="34" x2="160" y2="64" stroke="#fff" stroke-width="2" opacity=".5"/>
          <!-- 衬衫领口 -->
          <path d="M132,34 L138,42 L150,42 L156,42 L162,42 L168,34" fill="#fff" stroke="#4f9cc0" stroke-width="1.2"/>
          <!-- 衬衫纽扣（2 个） -->
          <circle cx="150" cy="40" r="1.5" fill="#4f9cc0"/>
          <circle cx="150" cy="50" r="1.5" fill="#4f9cc0"/>
          <circle cx="150" cy="60" r="1.5" fill="#4f9cc0"/>
          <!-- 衬衫高光 -->
          <rect x="136" y="36" width="6" height="26" rx="2" fill="#fff" opacity=".55"/>
        </g>
        <!-- 彩蛋：绳上挂的小袜子（黄渐变） -->
        <g transform="translate(205,30)">
          <rect x="-5" y="0" width="10" height="14" rx="2" fill="url(#item-clothline-sock)" stroke="#c69418" stroke-width="1"/>
          <circle cx="-3" cy="-2" r="2" fill="#ff9eb5"/>
          <circle cx="3" cy="-2" r="2" fill="#ff9eb5"/>
          <ellipse cx="-1" cy="2" rx="4" ry="3" fill="#fff" opacity=".6"/>
        </g>
      </svg>`;

/* 11. deckchair (viewBox 0 0 160 150, w=0.15)
   3 根木条木纹渐变 + 描边、椅面布粉渐变 + 描边、枕头粉渐变 + 描边、彩蛋小书 */
const deckchairSVG = `
      <svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-deckchair-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <linearGradient id="item-deckchair-fabric" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#ff9eb5"/>
          </linearGradient>
          <linearGradient id="item-deckchair-pillow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-deckchair-book" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#f2b730"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="80" cy="142" rx="62" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 3 根木条（椅子骨架） -->
        <line x1="26" y1="118" x2="120" y2="46" stroke="url(#item-deckchair-wood)" stroke-width="8" stroke-linecap="round"/>
        <line x1="14" y1="132" x2="134" y2="132" stroke="url(#item-deckchair-wood)" stroke-width="8" stroke-linecap="round"/>
        <line x1="40" y1="132" x2="104" y2="70" stroke="#c98443" stroke-width="7" stroke-linecap="round"/>
        <!-- 木条描边（深色细线） -->
        <line x1="14" y1="132" x2="134" y2="132" stroke="#7a4d1d" stroke-width="1" opacity=".5"/>
        <!-- 椅面布（粉渐变 + 描边） -->
        <path d="M22,120 L118,50 L134,64 L38,134 Z" fill="url(#item-deckchair-fabric)" stroke="#e05c86" stroke-width="2"/>
        <!-- 椅面布条纹 -->
        <line x1="40" y1="128" x2="124" y2="62" stroke="#fff" stroke-width="2" opacity=".55"/>
        <line x1="60" y1="126" x2="128" y2="76" stroke="#fff" stroke-width="2" opacity=".4"/>
        <!-- 内层布 -->
        <path d="M28,124 L112,58 L120,65 L36,131 Z" fill="#ff9eb5" opacity=".85"/>
        <!-- 椅子扶手/枕头（粉渐变 + 描边） -->
        <rect x="108" y="38" width="30" height="22" rx="6" fill="url(#item-deckchair-pillow)" stroke="#c4738a" stroke-width="1.5" transform="rotate(12 108 38)"/>
        <ellipse cx="116" cy="44" rx="6" ry="3" fill="#fff" opacity=".65" transform="rotate(12 116 44)"/>
        <!-- 椅子上的小装饰圆点（原 2 个白点改彩蛋：高光） -->
        <circle cx="64" cy="96" r="4" fill="#fff" opacity=".7"/>
        <circle cx="84" cy="80" r="4" fill="#fff" opacity=".7"/>
        <!-- 彩蛋：椅子上放着的小书 -->
        <g transform="translate(76,138)">
          <rect x="-12" y="-10" width="24" height="14" rx="2" fill="url(#item-deckchair-book)" stroke="#c69418" stroke-width="1"/>
          <line x1="0" y1="-10" x2="0" y2="4" stroke="#c69418" stroke-width="1"/>
          <line x1="-9" y1="-7" x2="-3" y2="-7" stroke="#fff" stroke-width="1" opacity=".7"/>
          <line x1="3" y1="-7" x2="9" y2="-7" stroke="#fff" stroke-width="1" opacity=".7"/>
        </g>
      </svg>`;

/* ---------- 替换 ---------- */

const replacements = [
  // 1. bathtub
  {
    label: 'bathtub',
    old: `    bathtub: { w: 0.20, act: 'bath', svg: \`
      <svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M22,52 L188,52 L176,116 Q105,132 34,116 Z" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <ellipse cx="105" cy="52" rx="83" ry="12" fill="#bfe6ff"/>
        <rect x="16" y="44" width="178" height="14" rx="7" fill="#e8e0f2"/>
        <path d="M186,58 Q204,58 202,38 L202,30" stroke="#c9d2da" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="202" cy="26" r="7" fill="#c9d2da"/>
        <path d="M40,116 L32,134 M170,116 L178,134" stroke="#ffd34d" stroke-width="8" stroke-linecap="round"/>
        \${[[52, 40, 13], [76, 32, 9], [98, 42, 12], [122, 34, 9], [146, 41, 13]].map(([x, y, r]) =>
          \`<circle cx="\${x}" cy="\${y}" r="\${r}" fill="#fff" opacity=".95"/>\`).join('')}
        <g transform="translate(150,30)">
          <ellipse cx="0" cy="8" rx="13" ry="9" fill="#ffd34d"/>
          <circle cx="-3" cy="-4" r="8.5" fill="#ffd34d"/>
          <polygon points="4,-5 13,-3 5,1" fill="#ff9f43"/>
          <circle cx="-6" cy="-6" r="1.8" fill="#5b3a29"/>
        </g>
      </svg>\` },`,
    new: `    bathtub: { w: 0.20, act: 'bath', svg: \`${bathtubSVG}\` },`,
  },
  // 2. sink
  {
    label: 'sink',
    old: `    sink: { w: 0.115, svg: \`
      <svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
        <path d="M18,66 L102,66 L96,92 Q60,102 24,92 Z" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <ellipse cx="60" cy="66" rx="42" ry="9" fill="#dff3ff"/>
        <path d="M60,70 L60,150" stroke="#e8e0f2" stroke-width="22" stroke-linecap="round"/>
        <path d="M60,86 L60,140" stroke="#fdfdff" stroke-width="14" stroke-linecap="round"/>
        <path d="M44,60 Q44,50 54,50 M76,60 Q76,50 66,50" stroke="#c9d2da" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M60,50 L60,40 L74,40" stroke="#c9d2da" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="76" cy="40" r="5" fill="#c9d2da"/>
        <ellipse cx="60" cy="156" rx="26" ry="7" fill="#e8e0f2"/>
      </svg>\` },`,
    new: `    sink: { w: 0.115, svg: \`${sinkSVG}\` },`,
  },
  // 3. toilet
  {
    label: 'toilet',
    old: `    toilet: { w: 0.10, svg: \`
      <svg viewBox="0 0 105 145" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="16" width="62" height="52" rx="12" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <circle cx="53" cy="30" r="6" fill="#ffd34d"/>
        <ellipse cx="53" cy="78" rx="42" ry="16" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <path d="M38,90 L38,124 Q53,134 68,124 L68,90" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <ellipse cx="53" cy="130" rx="24" ry="6" fill="#e8e0f2"/>
        <ellipse cx="53" cy="78" rx="30" ry="9" fill="#dff3ff"/>
      </svg>\` },`,
    new: `    toilet: { w: 0.10, svg: \`${toiletSVG}\` },`,
  },
  // 4. towelrack
  {
    label: 'towelrack',
    old: `    towelrack: { w: 0.10, svg: \`
      <svg viewBox="0 0 110 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="20" x2="16" y2="140" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="94" y1="20" x2="94" y2="140" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="12" y1="36" x2="98" y2="36" stroke="#ffd34d" stroke-width="7" stroke-linecap="round"/>
        <rect x="24" y="40" width="26" height="62" rx="8" fill="#ff9eb5"/>
        <line x1="24" y1="56" x2="50" y2="56" stroke="#e05c86" stroke-width="4"/>
        <line x1="24" y1="72" x2="50" y2="72" stroke="#e05c86" stroke-width="4"/>
        <rect x="58" y="40" width="26" height="50" rx="8" fill="#7ec8e3"/>
        <line x1="58" y1="56" x2="84" y2="56" stroke="#4f9cc0" stroke-width="4"/>
      </svg>\` },`,
    new: `    towelrack: { w: 0.10, svg: \`${towelrackSVG}\` },`,
  },
  // 5. bmirror
  {
    label: 'bmirror',
    old: `    bmirror: { w: 0.09, svg: \`
      <svg viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="44" r="34" fill="#dff3ff" stroke="#e8a3bd" stroke-width="8"/>
        <path d="M34,28 Q40,20 48,24" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M62,58 l3,7 7,0.6 -5,4.5 1.5,7 -6.5,-4 -6.5,4 1.5,-7 -5,-4.5 7,-0.6z" fill="#ffd34d"/>
        <rect x="14" y="86" width="72" height="12" rx="6" fill="#e8a3bd"/>
        <rect x="26" y="74" width="10" height="14" rx="4" fill="#b79ced"/>
        <rect x="42" y="70" width="10" height="18" rx="4" fill="#ff9eb5"/>
        <rect x="58" y="76" width="10" height="12" rx="4" fill="#7ec8e3"/>
      </svg>\` },`,
    new: `    bmirror: { w: 0.09, svg: \`${bmirrorSVG}\` },`,
  },
  // 6. bathmat
  {
    label: 'bathmat',
    old: `    bathmat: { w: 0.135, flat: true, svg: \`
      <svg viewBox="0 0 150 65" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="75" cy="33" rx="71" ry="27" fill="#9ad7f0"/>
        <ellipse cx="75" cy="33" rx="52" ry="19" fill="#bfe6ff"/>
        \${[-30, -10, 10, 30].map(dx => \`<circle cx="\${75 + dx}" cy="33" r="5" fill="#7ec8e3"/>\`).join('')}
      </svg>\` },`,
    new: `    bathmat: { w: 0.135, flat: true, svg: \`${bathmatSVG}\` },`,
  },
  // 7. st_duck
  {
    label: 'st_duck',
    old: `    st_duck: { sticker: true, w: 0.085, svg: \`
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="56" rx="26" ry="18" fill="#ffd34d"/>
        <path d="M24,60 Q45,74 66,60" stroke="#f2b730" stroke-width="3" fill="none"/>
        <circle cx="36" cy="32" r="15" fill="#ffd34d"/>
        <polygon points="48,30 64,34 49,40" fill="#ff9f43"/>
        <circle cx="32" cy="29" r="3" fill="#5b3a29"/>
        <path d="M50,52 Q58,48 62,54" stroke="#f2b730" stroke-width="4" fill="none" stroke-linecap="round"/>
      </svg>\` },`,
    new: `    st_duck: { sticker: true, w: 0.085, svg: \`${st_duckSVG}\` },`,
  },
  // 8. st_bubble
  {
    label: 'st_bubble',
    old: `    st_bubble: { sticker: true, w: 0.08, svg: \`
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <circle cx="34" cy="38" r="20" fill="rgba(160,220,250,.55)" stroke="rgba(255,255,255,.9)" stroke-width="3"/>
        <circle cx="62" cy="58" r="14" fill="rgba(160,220,250,.45)" stroke="rgba(255,255,255,.9)" stroke-width="3"/>
        <circle cx="56" cy="20" r="9" fill="rgba(160,220,250,.5)" stroke="rgba(255,255,255,.9)" stroke-width="2.5"/>
        <ellipse cx="27" cy="31" rx="6" ry="4" fill="#fff" opacity=".8" transform="rotate(-24 27 31)"/>
        <ellipse cx="57" cy="53" rx="4" ry="3" fill="#fff" opacity=".8"/>
      </svg>\` },`,
    new: `    st_bubble: { sticker: true, w: 0.08, svg: \`${st_bubbleSVG}\` },`,
  },
  // 9. flowerstand
  {
    label: 'flowerstand',
    old: `    flowerstand: { w: 0.115, svg: \`
      <svg viewBox="0 0 120 190" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="60" width="84" height="9" rx="4.5" fill="#d98c5a"/>
        <rect x="18" y="120" width="84" height="9" rx="4.5" fill="#d98c5a"/>
        <line x1="26" y1="69" x2="26" y2="182" stroke="#c47a44" stroke-width="9" stroke-linecap="round"/>
        <line x1="94" y1="69" x2="94" y2="182" stroke="#c47a44" stroke-width="9" stroke-linecap="round"/>
        <path d="M34,60 L50,60 L46,34 Q42,28 38,34 Z" fill="#e8975e"/>
        <path d="M74,60 L90,60 L86,34 Q82,28 78,34 Z" fill="#e8975e"/>
        \${[[42, 24], [82, 24]].map(([x, y]) =>
          \`<circle cx="\${x}" cy="\${y}" r="8" fill="#ff9eb5"/>
           <circle cx="\${x}" cy="\${y}" r="3.5" fill="#ffd34d"/>
           <path d="M\${x - 10},\${y + 6} Q\${x},\${y + 14} \${x + 10},\${y + 6}" stroke="#6cc46a" stroke-width="3" fill="none"/>\`).join('')}
        <path d="M50,120 L70,120 L67,102 Q60,96 53,102 Z" fill="#e8975e"/>
        <g transform="translate(60,92)">
          \${[0, 72, 144, 216, 288].map(a => \`<ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="#b79ced" transform="rotate(\${a})"/>\`).join('')}
          <circle r="3.5" fill="#ffd34d"/>
        </g>
      </svg>\` },`,
    new: `    flowerstand: { w: 0.115, svg: \`${flowerstandSVG}\` },`,
  },
  // 10. clothline
  {
    label: 'clothline',
    old: `    clothline: { w: 0.22, svg: \`
      <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="10" x2="20" y2="150" stroke="#c98443" stroke-width="10" stroke-linecap="round"/>
        <line x1="220" y1="10" x2="220" y2="150" stroke="#c98443" stroke-width="10" stroke-linecap="round"/>
        <path d="M20,26 Q120,44 220,26" stroke="#b0a08a" stroke-width="4" fill="none"/>
        <g transform="rotate(-3 62 30)">
          <rect x="46" y="32" width="32" height="40" rx="6" fill="#ff9eb5"/>
          <path d="M52,32 L58,24 L62,30 L66,24 L72,32" fill="none" stroke="#e05c86" stroke-width="3"/>
          <rect x="46" y="60" width="32" height="8" rx="4" fill="#e05c86"/>
        </g>
        <g transform="rotate(2 150 32)">
          <rect x="132" y="34" width="36" height="30" rx="5" fill="#7ec8e3"/>
          <line x1="140" y1="34" x2="140" y2="64" stroke="#4f9cc0" stroke-width="3"/>
          <line x1="160" y1="34" x2="160" y2="64" stroke="#4f9cc0" stroke-width="3"/>
        </g>
        <circle cx="205" cy="40" r="7" fill="#ffd34d"/>
      </svg>\` },`,
    new: `    clothline: { w: 0.22, svg: \`${clothlineSVG}\` },`,
  },
  // 11. deckchair
  {
    label: 'deckchair',
    old: `    deckchair: { w: 0.15, svg: \`
      <svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="26" y1="118" x2="120" y2="46" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="14" y1="132" x2="134" y2="132" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="40" y1="132" x2="104" y2="70" stroke="#b07838" stroke-width="7" stroke-linecap="round"/>
        <path d="M22,120 L118,50 L134,64 L38,134 Z" fill="#ffb3c7"/>
        <path d="M28,124 L112,58 L120,65 L36,131 Z" fill="#ff9eb5"/>
        <rect x="108" y="38" width="30" height="22" rx="6" fill="#ff9eb5" transform="rotate(12 108 38)"/>
        <circle cx="64" cy="96" r="4" fill="#fff" opacity=".7"/>
        <circle cx="84" cy="80" r="4" fill="#fff" opacity=".7"/>
      </svg>\` },`,
    new: `    deckchair: { w: 0.15, svg: \`${deckchairSVG}\` },`,
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

const ids = ['bathtub', 'sink', 'toilet', 'towelrack', 'bmirror', 'bathmat', 'st_duck', 'st_bubble', 'flowerstand', 'clothline', 'deckchair'];
for (const id of ids) {
  if (!cur.includes(id + ':')) { console.error('id missing:', id); process.exit(1); }
  const vbMatch = cur.match(new RegExp(id + ': \\{[^}]*viewBox="0 0 (\\d+) (\\d+)"'));
  if (!vbMatch) { console.error('viewBox missing for:', id); process.exit(1); }
  console.log('  ' + id + ' viewBox=' + vbMatch[1] + 'x' + vbMatch[2]);
}
console.log('all 11 ids + viewBoxes verified');
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');