/* 物品升级 第 1 批：卧室+客厅高频 10 件（路线 A 全程序化 SVG）
   老吴 2026-09-23 拍板"就用 SVG 吧"。
   - 沿用 doll 精致化方案：defs + linearGradient/radialGradient + stroke 描边 + 多层高光 + 阴影 + 细节彩蛋
   - defs id 加 item- 前缀避开 doll/cat 已用的 skinGrad/blushGrad/catBodyGrad/catHeadGrad/catNoseGrad
   - viewBox 保持原值（aspectRatio 锚定）
   - ITEMS[id].w 字段保持原值
   - 模板字符串 ${[...].map(...)} 保留（rug/plant 在 JS 加载时自动展开为静态 SVG）
   - 中文/非 ASCII 不进 SVG 字符串（避免 PS 5.0 编码坑；本批纯英文/数字，安全）
   - 写完用 new Function(code) 验证语法 + 10 个 id + 10 个 viewBox 都在 */
import fs from 'node:fs';
import path from 'node:path';

const FILE = 'js/assets-room.js';
const BAK_SUFFIX = '.bak_batch1_20260923_131626';

const orig = fs.readFileSync(FILE, 'utf8');
const bak = FILE + BAK_SUFFIX;
fs.writeFileSync(bak, orig, 'utf8');
console.log('backup written:', bak, '(' + orig.length + ' bytes)');

/* ---------- 10 件新 SVG ---------- */

/* 1. bed (viewBox 0 0 260 175, w=0.24)
   床头白渐变 + 描边、被子粉渐变 + 褶皱阴影 + 爱心缝线、枕头白渐变 + 羽绒折痕、4 床腿、阴影 */
const bedSVG = `
      <svg viewBox="0 0 260 175" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bed-pillow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f7e8e0"/>
          </linearGradient>
          <linearGradient id="item-bed-quilt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffb3c7"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-bed-board" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5d8e2"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="130" cy="160" rx="105" ry="9" fill="rgba(0,0,0,.12)"/>
        <!-- 床头板（白渐变 + 描边） -->
        <rect x="28" y="22" width="204" height="60" rx="14" fill="url(#item-bed-board)" stroke="#e8a3bd" stroke-width="2.5"/>
        <rect x="36" y="30" width="188" height="14" rx="7" fill="#fff" opacity=".55"/>
        <!-- 床柱（粉） -->
        <rect x="16" y="78" width="14" height="78" rx="6" fill="#e8a3bd" stroke="#c4738a" stroke-width="1.5"/>
        <rect x="230" y="78" width="14" height="78" rx="6" fill="#e8a3bd" stroke="#c4738a" stroke-width="1.5"/>
        <rect x="18" y="80" width="3" height="74" fill="#fff" opacity=".5"/>
        <rect x="232" y="80" width="3" height="74" fill="#fff" opacity=".5"/>
        <!-- 被子主体（粉渐变 + 描边） -->
        <rect x="30" y="78" width="200" height="46" rx="14" fill="url(#item-bed-quilt)" stroke="#c4738a" stroke-width="2"/>
        <!-- 被子褶皱阴影 -->
        <path d="M60,82 Q60,120 60,124 M110,82 Q110,120 110,124 M160,82 Q160,120 160,124 M210,82 Q210,120 210,124" stroke="#c4738a" stroke-width="1.5" fill="none" opacity=".5"/>
        <!-- 被子高光层（顶部） -->
        <rect x="36" y="82" width="188" height="6" rx="3" fill="#fff" opacity=".55"/>
        <!-- 爱心缝线（彩蛋） -->
        <path d="M150,96 q-4,-5 -8,0 q-4,5 -8,0 q4,5 8,10 q4,-5 8,-10 z" fill="#e05c86" opacity=".75"/>
        <circle cx="146" cy="93" r="1.5" fill="#fff" opacity=".9"/>
        <!-- 枕头（白渐变 + 描边） -->
        <rect x="38" y="56" width="62" height="32" rx="14" fill="url(#item-bed-pillow)" stroke="#e8a3bd" stroke-width="2"/>
        <path d="M48,72 q6,-8 12,0 q6,-8 12,0" stroke="#ffd9ea" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="48" cy="62" rx="10" ry="4" fill="#fff" opacity=".7"/>
        <!-- 床腿（4 根小柱 + 阴影） -->
        <rect x="34" y="124" width="10" height="22" rx="4" fill="#d98cb0" stroke="#a85676" stroke-width="1.5"/>
        <rect x="216" y="124" width="10" height="22" rx="4" fill="#d98cb0" stroke="#a85676" stroke-width="1.5"/>
        <ellipse cx="39" cy="148" rx="9" ry="3" fill="rgba(0,0,0,.15)"/>
        <ellipse cx="221" cy="148" rx="9" ry="3" fill="rgba(0,0,0,.15)"/>
      </svg>`;

/* 2. sofa (viewBox 0 0 220 145, w=0.20)
   三段坐垫浅蓝渐变 + 压痕、扶手深蓝 + 描边、底部裙边深色 + 木脚、抱枕小蝴蝶结 */
const sofaSVG = `
      <svg viewBox="0 0 220 145" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-sofa-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9ad7f0"/>
            <stop offset="100%" stop-color="#7ec8e3"/>
          </linearGradient>
          <linearGradient id="item-sofa-arm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7ec8e3"/>
            <stop offset="100%" stop-color="#5ba8c8"/>
          </linearGradient>
          <linearGradient id="item-sofa-cushion" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7f5"/>
            <stop offset="100%" stop-color="#9ad7f0"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="110" cy="135" rx="100" ry="8" fill="rgba(0,0,0,.12)"/>
        <!-- 靠背（浅蓝渐变 + 描边） -->
        <rect x="40" y="18" width="140" height="60" rx="22" fill="url(#item-sofa-back)" stroke="#5ba8c8" stroke-width="2.5"/>
        <rect x="44" y="22" width="132" height="10" rx="5" fill="#fff" opacity=".5"/>
        <!-- 左扶手（深蓝渐变 + 描边） -->
        <rect x="6" y="48" width="36" height="68" rx="18" fill="url(#item-sofa-arm)" stroke="#4a98b8" stroke-width="2"/>
        <rect x="10" y="52" width="28" height="8" rx="4" fill="#fff" opacity=".5"/>
        <!-- 右扶手 -->
        <rect x="178" y="48" width="36" height="68" rx="18" fill="url(#item-sofa-arm)" stroke="#4a98b8" stroke-width="2"/>
        <rect x="182" y="52" width="28" height="8" rx="4" fill="#fff" opacity=".5"/>
        <!-- 3 段坐垫（浅蓝渐变 + 描边 + 压痕） -->
        <rect x="42" y="86" width="44" height="26" rx="10" fill="url(#item-sofa-cushion)" stroke="#5ba8c8" stroke-width="1.5"/>
        <rect x="88" y="86" width="44" height="26" rx="10" fill="url(#item-sofa-cushion)" stroke="#5ba8c8" stroke-width="1.5"/>
        <rect x="134" y="86" width="44" height="26" rx="10" fill="url(#item-sofa-cushion)" stroke="#5ba8c8" stroke-width="1.5"/>
        <line x1="88" y1="88" x2="88" y2="110" stroke="#5ba8c8" stroke-width="2" opacity=".5"/>
        <line x1="134" y1="88" x2="134" y2="110" stroke="#5ba8c8" stroke-width="2" opacity=".5"/>
        <!-- 坐垫高光（顶部） -->
        <rect x="46" y="88" width="36" height="4" rx="2" fill="#fff" opacity=".55"/>
        <rect x="92" y="88" width="36" height="4" rx="2" fill="#fff" opacity=".55"/>
        <rect x="138" y="88" width="36" height="4" rx="2" fill="#fff" opacity=".55"/>
        <!-- 底部裙边 -->
        <rect x="32" y="112" width="156" height="14" rx="7" fill="#5ba8c8"/>
        <rect x="36" y="114" width="148" height="3" rx="1.5" fill="#fff" opacity=".4"/>
        <!-- 木脚（4 根） -->
        <rect x="36" y="124" width="8" height="14" rx="3" fill="#a07242" stroke="#7a4d1d" stroke-width="1"/>
        <rect x="176" y="124" width="8" height="14" rx="3" fill="#a07242" stroke="#7a4d1d" stroke-width="1"/>
        <!-- 抱枕（彩蛋 + 小蝴蝶结） -->
        <g transform="translate(60,58)">
          <ellipse cx="0" cy="0" rx="14" ry="11" fill="#ff9eb5" stroke="#e05c86" stroke-width="1.5"/>
          <ellipse cx="-3" cy="-3" rx="5" ry="3" fill="#fff" opacity=".7"/>
          <path d="M-5,2 C-7,-1 -10,2 -7,4 C-5,5 -3,3 0,4 M5,2 C7,-1 10,2 7,4 C5,5 3,3 0,4" fill="#e05c86"/>
        </g>
      </svg>`;

/* 3. rug (viewBox 0 0 240 135, w=0.24, flat)
   三层椭圆渐变 + 描边 + 周圈 8 流苏球 + 中央菱形花纹 + 5 瓣花彩蛋 */
const rugSVG = `
      <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-rug-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="55%" stop-color="#ffd9ea"/>
            <stop offset="100%" stop-color="#ff9eb5"/>
          </radialGradient>
          <radialGradient id="item-rug-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e05c86"/>
          </radialGradient>
        </defs>
        <!-- 最外圈（深粉） -->
        <ellipse cx="120" cy="68" rx="116" ry="60" fill="#ff9eb5" stroke="#c4738a" stroke-width="2.5"/>
        <!-- 中圈（浅粉） -->
        <ellipse cx="120" cy="68" rx="98" ry="48" fill="#ffd9ea" stroke="#ff9eb5" stroke-width="1.5"/>
        <!-- 内圈（白渐变） -->
        <ellipse cx="120" cy="68" rx="78" ry="36" fill="url(#item-rug-grad)"/>
        <!-- 中央菱形花纹 -->
        <ellipse cx="120" cy="68" rx="38" ry="18" fill="none" stroke="#ff9eb5" stroke-width="2" stroke-dasharray="4 3"/>
        <!-- 8 流苏球（周圈） -->
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
          const x = 120 + 110 * Math.cos(a * Math.PI / 180);
          const y = 68 + 56 * Math.sin(a * Math.PI / 180);
          return '<circle cx="' + x + '" cy="' + y + '" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/>'
            + '<circle cx="' + (x - 1.5) + '" cy="' + (y - 1.5) + '" r="2" fill="#fff"/>';
        }).join('')}
        <!-- 彩蛋：中央 5 瓣花 -->
        <g transform="translate(120,68)">
          ${[0, 72, 144, 216, 288].map(a => '<ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff7fa9" stroke="#e05c86" stroke-width="1" transform="rotate(' + a + ')"/>').join('')}
          <circle r="6" fill="url(#item-rug-center)" stroke="#c4738a" stroke-width="1"/>
          <circle r="2.5" fill="#fff" opacity=".9"/>
        </g>
      </svg>`;

/* 4. lamp (viewBox 0 0 110 195, w=0.11)
   底座粉椭圆渐变 + 描边 + 阴影、灯杆粉木纹、灯罩黄渐变 + 描边 + 顶部高光、灯罩下沿穗子 */
const lampSVG = `
      <svg viewBox="0 0 110 195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-lamp-shade" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#fff3c0"/>
            <stop offset="60%" stop-color="#ffcf6b"/>
            <stop offset="100%" stop-color="#e0a93c"/>
          </radialGradient>
          <linearGradient id="item-lamp-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f4b8cd"/>
            <stop offset="100%" stop-color="#d98cb0"/>
          </linearGradient>
          <linearGradient id="item-lamp-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#c4738a"/>
            <stop offset="50%" stop-color="#e8a3bd"/>
            <stop offset="100%" stop-color="#c4738a"/>
          </linearGradient>
          <radialGradient id="item-lamp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,230,140,.65)"/>
            <stop offset="100%" stop-color="rgba(255,230,140,0)"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="55" cy="188" rx="40" ry="6" fill="rgba(0,0,0,.15)"/>
        <!-- 底座（粉椭圆渐变 + 描边） -->
        <ellipse cx="55" cy="182" rx="36" ry="12" fill="url(#item-lamp-base)" stroke="#a85676" stroke-width="2"/>
        <ellipse cx="50" cy="178" rx="14" ry="4" fill="#fff" opacity=".5"/>
        <!-- 灯杆（粉木纹 3 道浅线） -->
        <rect x="50" y="66" width="10" height="114" rx="5" fill="url(#item-lamp-pole)" stroke="#a85676" stroke-width="1.5"/>
        <line x1="52" y1="76" x2="52" y2="178" stroke="#fff" stroke-width="1" opacity=".5"/>
        <line x1="58" y1="76" x2="58" y2="178" stroke="#a85676" stroke-width="1" opacity=".5"/>
        <!-- 灯罩（黄渐变 + 描边） -->
        <path d="M26,74 L84,74 L69,20 Q55,10 41,20 Z" fill="url(#item-lamp-shade)" stroke="#a06820" stroke-width="2"/>
        <!-- 灯罩顶部高光 -->
        <path d="M44,18 Q55,12 66,18 L60,40 L50,40 Z" fill="#fff" opacity=".5"/>
        <!-- 灯罩条纹 -->
        <path d="M38,68 L47,28 M72,68 L63,28" stroke="#f2b730" stroke-width="3" fill="none" opacity=".7"/>
        <!-- 灯罩下沿穗子（彩蛋） -->
        <g fill="#e0a93c" stroke="#a06820" stroke-width="0.8">
          <circle cx="32" cy="76" r="2.2"/>
          <circle cx="40" cy="78" r="2.2"/>
          <circle cx="48" cy="79" r="2.2"/>
          <circle cx="56" cy="79" r="2.2"/>
          <circle cx="64" cy="79" r="2.2"/>
          <circle cx="72" cy="78" r="2.2"/>
          <circle cx="78" cy="76" r="2.2"/>
        </g>
        <!-- 灯光辐射（径向渐变） -->
        <circle cx="55" cy="86" r="22" fill="url(#item-lamp-glow)"/>
      </svg>`;

/* 5. clock (viewBox 0 0 105 115, w=0.095)
   耳朵白渐变 + 粉描边、表盘白渐变 + 描边 + 12 时位刻度 + 4 数字 + 指针 + 摆锤翅膀 */
const clockSVG = `
      <svg viewBox="0 0 105 115" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="item-clock-face" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5d8e2"/>
          </radialGradient>
          <linearGradient id="item-clock-ear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5d8e2"/>
          </linearGradient>
        </defs>
        <!-- 左耳朵 -->
        <polygon points="28,26 34,4 56,20" fill="url(#item-clock-ear)" stroke="#e8a3bd" stroke-width="6" stroke-linejoin="round"/>
        <polygon points="34,16 42,22 46,12" fill="#ff9eb5" opacity=".6"/>
        <!-- 右耳朵 -->
        <polygon points="77,26 71,4 49,20" fill="url(#item-clock-ear)" stroke="#e8a3bd" stroke-width="6" stroke-linejoin="round"/>
        <polygon points="71,16 63,22 59,12" fill="#ff9eb5" opacity=".6"/>
        <!-- 表盘（白渐变 + 描边） -->
        <circle cx="52" cy="60" r="42" fill="url(#item-clock-face)" stroke="#e8a3bd" stroke-width="8"/>
        <!-- 表盘左上方高光 -->
        <ellipse cx="38" cy="44" rx="14" ry="8" fill="#fff" opacity=".55"/>
        <!-- 12 时位刻度（12 短线，分布在 r=35 上） -->
        ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
          const rad = a * Math.PI / 180;
          const x1 = 52 + 35 * Math.cos(rad);
          const y1 = 60 + 35 * Math.sin(rad);
          const x2 = 52 + 39 * Math.cos(rad);
          const y2 = 60 + 39 * Math.sin(rad);
          const thick = (a % 90 === 0) ? 2.5 : 1.2;
          return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#7a4d1d" stroke-width="' + thick + '" stroke-linecap="round"/>';
        }).join('')}
        <!-- 4 个数字 12/3/6/9（cursive 字体） -->
        <text x="52" y="34" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="9" font-weight="700" fill="#7a4d1d">12</text>
        <text x="78" y="63" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="9" font-weight="700" fill="#7a4d1d">3</text>
        <text x="52" y="89" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="9" font-weight="700" fill="#7a4d1d">6</text>
        <text x="26" y="63" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="9" font-weight="700" fill="#7a4d1d">9</text>
        <!-- 表盘底部小翅膀（彩蛋） -->
        <ellipse cx="20" cy="98" rx="6" ry="3" fill="#ff9eb5" opacity=".7"/>
        <ellipse cx="84" cy="98" rx="6" ry="3" fill="#ff9eb5" opacity=".7"/>
        <!-- 时针 + 分针 -->
        <line x1="52" y1="60" x2="52" y2="34" stroke="#7a4d1d" stroke-width="5" stroke-linecap="round"/>
        <line x1="52" y1="60" x2="72" y2="68" stroke="#e05c86" stroke-width="5" stroke-linecap="round"/>
        <!-- 中心红圆 -->
        <circle cx="52" cy="60" r="5" fill="#ff9eb5" stroke="#e05c86" stroke-width="1.5"/>
        <circle cx="50" cy="58" r="1.5" fill="#fff" opacity=".9"/>
      </svg>`;

/* 6. plant (viewBox 0 0 130 195, w=0.12)
   陶瓷盆橙粉渐变 + 描边 + 边沿高光、叶子深绿+浅绿（每片两层）、花瓣粉渐变、花心黄渐变 + 花粉点、彩蛋蝴蝶 */
const plantSVG = `
      <svg viewBox="0 0 130 195" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-plant-pot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2a86e"/>
            <stop offset="100%" stop-color="#c47744"/>
          </linearGradient>
          <linearGradient id="item-plant-leaf-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6cc46a"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </linearGradient>
          <linearGradient id="item-plant-leaf-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8fe08a"/>
            <stop offset="100%" stop-color="#6cc46a"/>
          </linearGradient>
          <radialGradient id="item-plant-petal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </radialGradient>
          <radialGradient id="item-plant-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffe9a8"/>
            <stop offset="100%" stop-color="#ffd34d"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="65" cy="190" rx="40" ry="6" fill="rgba(0,0,0,.12)"/>
        <!-- 盆体（橙粉梯形渐变 + 描边） -->
        <path d="M34,132 L96,132 L87,186 Q65,194 43,186 Z" fill="url(#item-plant-pot)" stroke="#a8562e" stroke-width="2"/>
        <!-- 盆边沿（高光带） -->
        <rect x="29" y="122" width="72" height="17" rx="8.5" fill="#f2a86e" stroke="#a8562e" stroke-width="2"/>
        <rect x="33" y="125" width="64" height="4" rx="2" fill="#fff" opacity=".5"/>
        <!-- 5 片叶子（深绿渐变 + 描边） -->
        ${[[-38, -12, 60], [-20, -30, 26], [0, -38, 0], [20, -30, -26], [38, -12, -60]].map(([tx, ty, rot]) =>
          '<ellipse cx="0" cy="0" rx="14" ry="34" fill="url(#item-plant-leaf-dark)" stroke="#3a8a3a" stroke-width="1.2" transform="translate(' + (65 + tx) + ',' + (122 + ty) + ') rotate(' + rot + ')"/>').join('')}
        <!-- 2 片浅绿高光叶 -->
        ${[[-22, -6], [22, -6]].map(([tx, ty]) =>
          '<ellipse cx="0" cy="0" rx="10" ry="26" fill="url(#item-plant-leaf-light)" stroke="#5ba85b" stroke-width="1" transform="translate(' + (65 + tx) + ',' + (122 + ty) + ')"/>').join('')}
        <!-- 6 片花瓣（粉红径向渐变 + 描边） -->
        ${[0, 60, 120, 180, 240, 300].map(a =>
          '<ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(' + a + ')"/>').join('')}
        <!-- 花心（黄渐变 + 中心高光） -->
        <circle cx="65" cy="64" r="6" fill="url(#item-plant-core)" stroke="#c69418" stroke-width="1"/>
        <circle cx="63" cy="62" r="2" fill="#fff" opacity=".85"/>
        <!-- 彩蛋：花粉小点 -->
        <circle cx="58" cy="58" r="0.8" fill="#c69418"/>
        <circle cx="71" cy="58" r="0.8" fill="#c69418"/>
        <circle cx="58" cy="70" r="0.8" fill="#c69418"/>
        <circle cx="71" cy="70" r="0.8" fill="#c69418"/>
      </svg>`;

/* 7. tv (viewBox 0 0 190 165, w=0.185)
   屏幕深蓝渐变 + 玻璃高光、屏内画面（太阳 + 山）、台柜木纹 + 描边、旋钮渐变 + 高光、底座阴影、屏幕左下小图标 */
const tvSVG = `
      <svg viewBox="0 0 190 165" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-tv-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5a5a68"/>
            <stop offset="100%" stop-color="#2a2a35"/>
          </linearGradient>
          <linearGradient id="item-tv-stand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#c47a44"/>
          </linearGradient>
          <radialGradient id="item-tv-draw" cx="30%" cy="25%" r="55%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".75"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="item-tv-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff5b0"/>
            <stop offset="100%" stop-color="#ffd34d"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="95" cy="158" rx="84" ry="6" fill="rgba(0,0,0,.15)"/>
        <!-- 台柜（梯形木纹 + 描边） -->
        <rect x="12" y="100" width="166" height="52" rx="10" fill="url(#item-tv-stand)" stroke="#7a4d1d" stroke-width="2.5"/>
        <line x1="20" y1="118" x2="170" y2="118" stroke="#7a4d1d" stroke-width="1" opacity=".5"/>
        <line x1="20" y1="130" x2="170" y2="130" stroke="#7a4d1d" stroke-width="1" opacity=".4"/>
        <line x1="20" y1="142" x2="170" y2="142" stroke="#7a4d1d" stroke-width="1" opacity=".4"/>
        <!-- 抽屉分隔 -->
        <line x1="95" y1="102" x2="95" y2="150" stroke="#7a4d1d" stroke-width="3"/>
        <!-- 旋钮（左蓝右黄） -->
        <circle cx="40" cy="126" r="6" fill="#7ec8e3" stroke="#4a98b8" stroke-width="1.5"/>
        <circle cx="38" cy="124" r="2" fill="#fff" opacity=".85"/>
        <circle cx="150" cy="126" r="6" fill="#ffd34d" stroke="#a06820" stroke-width="1.5"/>
        <circle cx="148" cy="124" r="2" fill="#fff" opacity=".85"/>
        <!-- 台柜腿 -->
        <rect x="22" y="152" width="10" height="10" rx="4" fill="#a06820" stroke="#7a4d1d" stroke-width="1"/>
        <rect x="158" y="152" width="10" height="10" rx="4" fill="#a06820" stroke="#7a4d1d" stroke-width="1"/>
        <!-- 屏幕外壳（深灰 + 描边） -->
        <rect x="35" y="18" width="120" height="86" rx="10" fill="url(#item-tv-screen)" stroke="#1a1a22" stroke-width="2.5"/>
        <!-- 屏内画面（彩色） -->
        <rect x="45" y="28" width="100" height="66" rx="5" fill="#9ad7f0"/>
        <!-- 太阳 -->
        <circle cx="72" cy="48" r="10" fill="url(#item-tv-sun)" stroke="#f2a94f" stroke-width="1"/>
        <!-- 太阳光芒（彩蛋） -->
        <line x1="72" y1="34" x2="72" y2="38" stroke="#ffd34d" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="60" y1="48" x2="64" y2="48" stroke="#ffd34d" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="84" y1="48" x2="80" y2="48" stroke="#ffd34d" stroke-width="1.5" stroke-linecap="round"/>
        <!-- 山丘 -->
        <path d="M45,86 Q65,66 82,78 Q100,90 120,74 L145,86 L145,94 L45,94 Z" fill="#7ec088" stroke="#4a9a4a" stroke-width="1"/>
        <path d="M50,90 L100,90" stroke="#fff" stroke-width="1" opacity=".5"/>
        <!-- 玻璃反光（左上） -->
        <ellipse cx="60" cy="38" rx="32" ry="10" fill="url(#item-tv-draw)" transform="rotate(-20 60 38)"/>
        <!-- 屏幕左下小图标（彩蛋：静音符号） -->
        <g transform="translate(54,88)">
          <rect x="-5" y="-2" width="6" height="4" rx="1" fill="#fff" opacity=".7"/>
          <line x1="-7" y1="0" x2="-9" y2="-3" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>
          <line x1="-7" y1="0" x2="-9" y2="3" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>
        </g>
        <!-- 顶置小天线 -->
        <rect x="86" y="4" width="18" height="10" rx="5" fill="#4a4a55" stroke="#1a1a22" stroke-width="1"/>
        <line x1="89" y1="4" x2="89" y2="0" stroke="#4a4a55" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="101" y1="4" x2="101" y2="0" stroke="#4a4a55" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`;

/* 8. coffee (viewBox 0 0 160 125, w=0.15)
   桌面木纹椭圆 + 描边 + 边缘高光、茶杯白渐变 + 描边 + 杯耳 + 杯内茶色 + 蒸汽、杯垫粉红渐变、木脚、彩蛋爱心 */
const coffeeSVG = `
      <svg viewBox="0 0 160 125" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-coffee-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2d9a0"/>
            <stop offset="100%" stop-color="#d9b87a"/>
          </linearGradient>
          <linearGradient id="item-coffee-cup" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5d8d8"/>
          </linearGradient>
          <linearGradient id="item-coffee-tea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d9b87a"/>
            <stop offset="100%" stop-color="#a07242"/>
          </linearGradient>
          <radialGradient id="item-coffee-steam" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".85"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="80" cy="116" rx="68" ry="6" fill="rgba(0,0,0,.12)"/>
        <!-- 木脚（4 根） -->
        <line x1="38" y1="58" x2="30" y2="112" stroke="#a07242" stroke-width="9" stroke-linecap="round"/>
        <line x1="122" y1="58" x2="130" y2="112" stroke="#a07242" stroke-width="9" stroke-linecap="round"/>
        <ellipse cx="30" cy="114" rx="6" ry="2" fill="rgba(0,0,0,.15)"/>
        <ellipse cx="130" cy="114" rx="6" ry="2" fill="rgba(0,0,0,.15)"/>
        <!-- 桌面下底（深色描边） -->
        <ellipse cx="80" cy="98" rx="52" ry="12" fill="#a07242"/>
        <!-- 桌面（椭圆木纹渐变 + 描边） -->
        <ellipse cx="80" cy="48" rx="70" ry="20" fill="url(#item-coffee-top)" stroke="#a07242" stroke-width="3"/>
        <!-- 木纹（2 道浅弧线） -->
        <path d="M20,46 Q80,52 140,46" stroke="#c49858" stroke-width="1" fill="none" opacity=".5"/>
        <path d="M30,52 Q80,58 130,52" stroke="#c49858" stroke-width="1" fill="none" opacity=".5"/>
        <!-- 桌面边缘高光 -->
        <ellipse cx="80" cy="40" rx="50" ry="5" fill="#fff" opacity=".5"/>
        <!-- 茶杯垫（粉红椭圆） -->
        <ellipse cx="56" cy="44" rx="18" ry="6" fill="#ff9eb5" stroke="#e05c86" stroke-width="1.5"/>
        <!-- 茶杯（白渐变 + 描边 + 杯耳） -->
        <g transform="translate(56,38)">
          <ellipse cx="0" cy="6" rx="13" ry="4.5" fill="url(#item-coffee-tea)" stroke="#a07242" stroke-width="1"/>
          <path d="M-8,-5 L8,-5 L6,6 Q0,9 -6,6 Z" fill="url(#item-coffee-cup)" stroke="#e8a3bd" stroke-width="1.5"/>
          <!-- 杯耳 -->
          <path d="M8,-2 Q14,-2 14,3 Q14,7 8,7" stroke="#e8a3bd" stroke-width="2" fill="none"/>
          <!-- 杯左侧高光 -->
          <path d="M-6,-3 Q-7,2 -5,5" stroke="#fff" stroke-width="1.5" fill="none" opacity=".85"/>
          <!-- 杯上小爱心（彩蛋） -->
          <path d="M-2,-2 q-2,-2 -3,0 q-1,3 -2,3 q1,2 2,3 q1,0 3,-3 q2,3 3,3 q1,-2 2,-3 q-1,0 -2,-3 q-1,-2 -3,0 z" fill="#e05c86" opacity=".85"/>
        </g>
        <!-- 蒸汽（3 道白曲线 + 径向渐变） -->
        <path d="M48,28 Q44,18 50,8 M60,30 Q56,20 62,10 M72,28 Q68,18 74,8" stroke="url(#item-coffee-steam)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- 茶色书本（彩蛋） -->
        <rect x="88" y="32" width="26" height="18" rx="3" fill="#ff9eb5" stroke="#e05c86" stroke-width="1.5"/>
        <line x1="92" y1="41" x2="110" y2="41" stroke="#fff" stroke-width="2.5"/>
        <line x1="94" y1="36" x2="108" y2="36" stroke="#fff" stroke-width="1" opacity=".6"/>
      </svg>`;

/* 9. fishtank (viewBox 0 0 140 165, w=0.13, act='fish')
   缸壁浅蓝玻璃 + 描边 + 左上玻璃高光、水渐变 + 气泡、水草深绿+浅绿、橙鱼/蓝鱼加渐变 + 鳞片、底砂 + 贝壳、彩蛋气泡 */
const fishtankSVG = `
      <svg viewBox="0 0 140 165" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-fishtank-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8f7ff"/>
            <stop offset="100%" stop-color="#9ad7f0"/>
          </linearGradient>
          <linearGradient id="item-fishtank-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#bfe6ff" stop-opacity=".55"/>
            <stop offset="100%" stop-color="#7ec8e3" stop-opacity=".9"/>
          </linearGradient>
          <linearGradient id="item-fishtank-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8a878"/>
            <stop offset="100%" stop-color="#c47a44"/>
          </linearGradient>
          <linearGradient id="item-fishtank-orange-fish" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffb75a"/>
            <stop offset="100%" stop-color="#ff7f2a"/>
          </linearGradient>
          <linearGradient id="item-fishtank-blue-fish" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8e0ff"/>
            <stop offset="100%" stop-color="#4fa0c8"/>
          </linearGradient>
          <linearGradient id="item-fishtank-grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7ed47b"/>
            <stop offset="100%" stop-color="#3a8a3a"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="70" cy="158" rx="58" ry="5" fill="rgba(0,0,0,.15)"/>
        <!-- 木底座（梯形 + 描边） -->
        <rect x="30" y="112" width="80" height="16" rx="6" fill="url(#item-fishtank-base)" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="38" y="128" width="64" height="26" rx="8" fill="#c47a44" stroke="#7a4d1d" stroke-width="2"/>
        <line x1="42" y1="138" x2="98" y2="138" stroke="#7a4d1d" stroke-width="1" opacity=".5"/>
        <!-- 缸体外壳（玻璃渐变 + 描边） -->
        <rect x="16" y="14" width="108" height="100" rx="10" fill="url(#item-fishtank-glass)" stroke="#7ec8e3" stroke-width="5"/>
        <!-- 水（半透明蓝色渐变） -->
        <path d="M20,52 L120,52 L120,100 Q70,112 20,100 Z" fill="url(#item-fishtank-water)"/>
        <!-- 沙底（黄渐变） -->
        <path d="M20,86 Q50,78 70,88 Q95,96 120,86 L120,100 Q70,112 20,100 Z" fill="#f2d9a0" stroke="#d9b87a" stroke-width="1"/>
        <!-- 沙底小卵石 -->
        <circle cx="40" cy="104" r="4" fill="#b0a08a" stroke="#7a6c5a" stroke-width=".8"/>
        <circle cx="54" cy="107" r="3" fill="#b0a08a" stroke="#7a6c5a" stroke-width=".8"/>
        <circle cx="100" cy="105" r="4" fill="#b0a08a" stroke="#7a6c5a" stroke-width=".8"/>
        <circle cx="68" cy="108" r="2.5" fill="#c0b09a" stroke="#7a6c5a" stroke-width=".8"/>
        <!-- 水草（左 + 右，渐变 + 描边） -->
        <path d="M34,84 Q30,64 40,50" stroke="url(#item-fishtank-grass)" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M38,82 Q34,66 44,52" stroke="#a8e0a0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
        <path d="M106,88 Q110,68 100,56" stroke="url(#item-fishtank-grass)" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M102,86 Q106,70 96,58" stroke="#a8e0a0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
        <!-- 橙鱼（渐变 + 描边 + 鳞片 + 鳍） -->
        <g transform="translate(70,68)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="url(#item-fishtank-orange-fish)" stroke="#c4631a" stroke-width="1.2"/>
          <polygon points="-10,0 -22,-7 -22,7" fill="#ff9f43" stroke="#c4631a" stroke-width="1"/>
          <polygon points="-10,0 -22,-7 -22,-3" fill="#ffd34d" opacity=".4"/>
          <!-- 鳞片 -->
          <ellipse cx="-3" cy="-3" rx="2" ry="1.2" fill="#fff" opacity=".6"/>
          <ellipse cx="3" cy="-2" rx="2" ry="1.2" fill="#fff" opacity=".5"/>
          <ellipse cx="-3" cy="3" rx="2" ry="1.2" fill="#fff" opacity=".4"/>
          <!-- 眼睛 -->
          <circle cx="7" cy="-2" r="2.2" fill="#fff" stroke="#5b3a29" stroke-width=".8"/>
          <circle cx="7" cy="-2" r="1.2" fill="#5b3a29"/>
          <circle cx="7.5" cy="-2.5" r=".5" fill="#fff"/>
        </g>
        <!-- 蓝鱼（小，朝右游） -->
        <g transform="translate(48,44) scale(.7)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="url(#item-fishtank-blue-fish)" stroke="#3a7a9a" stroke-width="1.2"/>
          <polygon points="10,0 22,-7 22,7" fill="#7ecbff" stroke="#3a7a9a" stroke-width="1"/>
          <ellipse cx="-3" cy="-3" rx="2" ry="1.2" fill="#fff" opacity=".6"/>
          <circle cx="-7" cy="-2" r="2.5" fill="#fff" stroke="#5b3a29" stroke-width=".8"/>
          <circle cx="-7" cy="-2" r="1.3" fill="#5b3a29"/>
        </g>
        <!-- 鱼吐气泡（彩蛋：橙鱼右上方 2 个泡） -->
        <circle cx="86" cy="56" r="3" fill="#fff" opacity=".8" stroke="#7ec8e3" stroke-width=".8"/>
        <circle cx="92" cy="48" r="2" fill="#fff" opacity=".7" stroke="#7ec8e3" stroke-width=".8"/>
        <!-- 玻璃高光（左上弧） -->
        <path d="M22,20 Q40,18 50,30" stroke="#fff" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>
        <ellipse cx="30" cy="26" rx="6" ry="2" fill="#fff" opacity=".55" transform="rotate(-30 30 26)"/>
        <!-- 缸底贝壳（彩蛋） -->
        <g transform="translate(82,108)">
          <path d="M0,0 Q-4,-4 -2,-7 Q0,-9 2,-7 Q4,-4 0,0 Z" fill="#ffc9d8" stroke="#e05c86" stroke-width=".8"/>
          <line x1="0" y1="-7" x2="0" y2="0" stroke="#e05c86" stroke-width=".5"/>
        </g>
      </svg>`;

/* 10. cushion (viewBox 0 0 100 75, w=0.09)
   主体粉红渐变 + 描边 + 丝绸高光、4 角纽扣、中央 X 压痕 + 4 流苏边、彩蛋蝴蝶绣花 */
const cushionSVG = `
      <svg viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-cushion-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0dd"/>
            <stop offset="50%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <radialGradient id="item-cushion-sheen" cx="30%" cy="30%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity=".75"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="item-cushion-button" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0dd"/>
            <stop offset="100%" stop-color="#e05c86"/>
          </linearGradient>
        </defs>
        <!-- 贴地阴影 -->
        <ellipse cx="50" cy="68" rx="42" ry="5" fill="rgba(0,0,0,.12)"/>
        <!-- 主体（粉红渐变 + 描边） -->
        <rect x="6" y="12" width="88" height="52" rx="26" fill="url(#item-cushion-body)" stroke="#c4738a" stroke-width="2.5"/>
        <!-- 内层（更浅色） -->
        <rect x="14" y="18" width="72" height="40" rx="20" fill="#ffc9d8" stroke="#ff9eb5" stroke-width="1"/>
        <!-- 丝绸高光（左上椭圆径向渐变） -->
        <ellipse cx="32" cy="26" rx="22" ry="10" fill="url(#item-cushion-sheen)"/>
        <!-- 中央压痕缝线（X 形） -->
        <path d="M30,38 L70,38" stroke="#e05c86" stroke-width="1.5" fill="none" stroke-dasharray="3 2" opacity=".7"/>
        <path d="M50,24 L50,52" stroke="#e05c86" stroke-width="1.5" fill="none" stroke-dasharray="3 2" opacity=".7"/>
        <!-- 4 角纽扣 -->
        <circle cx="20" cy="24" r="3" fill="url(#item-cushion-button)" stroke="#a85676" stroke-width="1"/>
        <circle cx="19.5" cy="23" r="1" fill="#fff" opacity=".9"/>
        <circle cx="80" cy="24" r="3" fill="url(#item-cushion-button)" stroke="#a85676" stroke-width="1"/>
        <circle cx="79.5" cy="23" r="1" fill="#fff" opacity=".9"/>
        <circle cx="20" cy="52" r="3" fill="url(#item-cushion-button)" stroke="#a85676" stroke-width="1"/>
        <circle cx="19.5" cy="51" r="1" fill="#fff" opacity=".9"/>
        <circle cx="80" cy="52" r="3" fill="url(#item-cushion-button)" stroke="#a85676" stroke-width="1"/>
        <circle cx="79.5" cy="51" r="1" fill="#fff" opacity=".9"/>
        <!-- 流苏边（4 根短金线，底部） -->
        <line x1="32" y1="62" x2="32" y2="70" stroke="#ffd34d" stroke-width="2" stroke-linecap="round"/>
        <line x1="44" y1="64" x2="44" y2="72" stroke="#ffd34d" stroke-width="2" stroke-linecap="round"/>
        <line x1="56" y1="64" x2="56" y2="72" stroke="#ffd34d" stroke-width="2" stroke-linecap="round"/>
        <line x1="68" y1="62" x2="68" y2="70" stroke="#ffd34d" stroke-width="2" stroke-linecap="round"/>
        <!-- 彩蛋：中央小绣花蝴蝶 -->
        <g transform="translate(50,38)">
          <ellipse cx="-5" cy="-1" rx="6" ry="4" fill="#b79ced" stroke="#7a4da8" stroke-width=".8"/>
          <ellipse cx="5" cy="-1" rx="6" ry="4" fill="#b79ced" stroke="#7a4da8" stroke-width=".8"/>
          <ellipse cx="0" cy="0" rx="1.2" ry="4" fill="#7a4da8"/>
          <circle cx="-8" cy="-4" r=".8" fill="#ffd34d"/>
          <circle cx="8" cy="-4" r=".8" fill="#ffd34d"/>
        </g>
      </svg>`;

/* ---------- 替换：每件用精确 old_string/new_string 一次替换 ---------- */

const replacements = [
  // 1. bed
  {
    label: 'bed',
    old: `    bed: { w: 0.24, svg: \`
      <svg viewBox="0 0 260 175" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="14" width="32" height="122" rx="14" fill="#e8a3bd"/>
        <rect x="212" y="52" width="32" height="84" rx="14" fill="#e8a3bd"/>
        <rect x="30" y="74" width="200" height="44" rx="18" fill="#fffdf5"/>
        <rect x="92" y="70" width="138" height="48" rx="18" fill="#ff9eb5"/>
        <circle cx="150" cy="94" r="7" fill="#fff" opacity=".8"/>
        <circle cx="185" cy="94" r="7" fill="#fff" opacity=".8"/>
        <rect x="38" y="60" width="56" height="28" rx="13" fill="#fff"/>
        <path d="M42,74 q6,-8 12,0 q6,-8 12,0" stroke="#ffd9ea" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="34" y="112" width="10" height="22" rx="4" fill="#d98cb0"/>
        <rect x="216" y="128" width="10" height="12" rx="4" fill="#d98cb0"/>
      </svg>\` },`,
    new: `    bed: { w: 0.24, svg: \`${bedSVG}\` },`,
  },
  // 2. sofa
  {
    label: 'sofa',
    old: `    sofa: { w: 0.20, svg: \`
      <svg viewBox="0 0 220 145" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="12" width="196" height="72" rx="30" fill="#7ec8e3"/>
        <rect x="4" y="44" width="40" height="62" rx="20" fill="#6bb8d8"/>
        <rect x="176" y="44" width="40" height="62" rx="20" fill="#6bb8d8"/>
        <rect x="42" y="66" width="68" height="36" rx="14" fill="#9ad7f0"/>
        <rect x="110" y="66" width="68" height="36" rx="14" fill="#9ad7f0"/>
        <rect x="28" y="98" width="164" height="18" rx="9" fill="#6bb8d8"/>
        <rect x="36" y="116" width="12" height="18" rx="5" fill="#e8a3bd"/>
        <rect x="172" y="116" width="12" height="18" rx="5" fill="#e8a3bd"/>
        <path d="M60,58 C56,46 68,42 72,50 C76,42 88,46 84,58 Q72,64 60,58 Z" fill="#ff9eb5"/>
      </svg>\` },`,
    new: `    sofa: { w: 0.20, svg: \`${sofaSVG}\` },`,
  },
  // 3. rug
  {
    label: 'rug',
    old: `    rug: { w: 0.24, flat: true, svg: \`
      <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="120" cy="68" rx="114" ry="58" fill="#ffd9ea"/>
        <ellipse cx="120" cy="68" rx="86" ry="42" fill="#fff"/>
        <ellipse cx="120" cy="68" rx="54" ry="26" fill="#ffdee9"/>
        <circle cx="120" cy="68" r="9" fill="#ff9eb5"/>
        \${[0, 45, 90, 135, 180, 225, 270, 315].map(a =>
          \`<circle cx="0" cy="0" r="5" fill="#ff9eb5" transform="translate(\${120 + 100 * Math.cos(a * Math.PI / 180)},\${68 + 46 * Math.sin(a * Math.PI / 180)})"/>\`).join('')}
      </svg>\` },`,
    new: `    rug: { w: 0.24, flat: true, svg: \`${rugSVG}\` },`,
  },
  // 4. lamp
  {
    label: 'lamp',
    old: `    lamp: { w: 0.11, svg: \`
      <svg viewBox="0 0 110 195" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="55" cy="182" rx="36" ry="12" fill="#e8a3bd"/>
        <rect x="50" y="66" width="10" height="114" rx="5" fill="#d98cb0"/>
        <path d="M26,74 L84,74 L69,20 Q55,10 41,20 Z" fill="#ffcf6b"/>
        <path d="M38,68 L47,28 M72,68 L63,28" stroke="#f2b730" stroke-width="4" stroke-linecap="round"/>
        <circle cx="55" cy="86" r="16" fill="rgba(255,230,140,.55)"/>
      </svg>\` },`,
    new: `    lamp: { w: 0.11, svg: \`${lampSVG}\` },`,
  },
  // 5. plant
  {
    label: 'plant',
    old: `    plant: { w: 0.12, svg: \`
      <svg viewBox="0 0 130 195" xmlns="http://www.w3.org/2000/svg">
        <path d="M34,132 L96,132 L87,186 Q65,194 43,186 Z" fill="#e8975e"/>
        <rect x="29" y="122" width="72" height="17" rx="8.5" fill="#f2a86e"/>
        \${[[-38, -12, 60], [-20, -30, 26], [0, -38, 0], [20, -30, -26], [38, -12, -60]].map(([tx, ty, rot]) =>
          \`<ellipse cx="0" cy="0" rx="14" ry="34" fill="#6cc46a" transform="translate(\${65 + tx},\${122 + ty}) rotate(\${rot})"/>\`).join('')}
        \${[[-22, -6], [22, -6]].map(([tx, ty]) =>
          \`<ellipse cx="0" cy="0" rx="10" ry="26" fill="#7ed47b" transform="translate(\${65 + tx},\${122 + ty})"/>\`).join('')}
        \${[0, 60, 120, 180, 240, 300].map(a =>
          \`<ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff9eb5" transform="translate(65,64) rotate(\${a})"/>\`).join('')}
        <circle cx="65" cy="64" r="6" fill="#ffd34d"/>
      </svg>\` },`,
    new: `    plant: { w: 0.12, svg: \`${plantSVG}\` },`,
  },
  // 6. clock
  {
    label: 'clock',
    old: `    clock: { w: 0.095, svg: \`
      <svg viewBox="0 0 105 115" xmlns="http://www.w3.org/2000/svg">
        <polygon points="28,26 34,4 56,20" fill="#fff" stroke="#e8a3bd" stroke-width="6"/>
        <polygon points="77,26 71,4 49,20" fill="#fff" stroke="#e8a3bd" stroke-width="6"/>
        <circle cx="52" cy="60" r="42" fill="#fffdf5" stroke="#e8a3bd" stroke-width="8"/>
        <circle cx="52" cy="26" r="5" fill="#5b3a29"/>
        <circle cx="52" cy="94" r="5" fill="#5b3a29"/>
        <circle cx="18" cy="60" r="5" fill="#5b3a29"/>
        <circle cx="86" cy="60" r="5" fill="#5b3a29"/>
        <line x1="52" y1="60" x2="52" y2="34" stroke="#7a4d1d" stroke-width="5" stroke-linecap="round"/>
        <line x1="52" y1="60" x2="72" y2="68" stroke="#e05c86" stroke-width="5" stroke-linecap="round"/>
        <circle cx="52" cy="60" r="5" fill="#ff9eb5"/>
      </svg>\` },`,
    new: `    clock: { w: 0.095, svg: \`${clockSVG}\` },`,
  },
  // 7. tv
  {
    label: 'tv',
    old: `    tv: { w: 0.185, act: 'tv', svg: \`
      <svg viewBox="0 0 190 165" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="100" width="166" height="52" rx="10" fill="#d98c5a"/>
        <line x1="95" y1="102" x2="95" y2="150" stroke="#c47a44" stroke-width="3"/>
        <circle cx="150" cy="126" r="5" fill="#ffd34d"/>
        <circle cx="132" cy="126" r="5" fill="#7ec8e3"/>
        <rect x="22" y="152" width="10" height="10" rx="4" fill="#c47a44"/>
        <rect x="158" y="152" width="10" height="10" rx="4" fill="#c47a44"/>
        <rect x="35" y="18" width="120" height="86" rx="10" fill="#4a4a55"/>
        <rect x="45" y="28" width="100" height="66" rx="5" fill="#9ad7f0"/>
        <circle cx="72" cy="48" r="9" fill="#ffd34d"/>
        <path d="M45,86 Q65,66 82,78 Q100,90 120,74 L145,86 L145,94 L45,94 Z" fill="#98d8a0"/>
        <rect x="86" y="4" width="18" height="10" rx="5" fill="#4a4a55"/>
      </svg>\` },`,
    new: `    tv: { w: 0.185, act: 'tv', svg: \`${tvSVG}\` },`,
  },
  // 8. coffee
  {
    label: 'coffee',
    old: `    coffee: { w: 0.15, svg: \`
      <svg viewBox="0 0 160 125" xmlns="http://www.w3.org/2000/svg">
        <line x1="38" y1="58" x2="30" y2="112" stroke="#d98c5a" stroke-width="9" stroke-linecap="round"/>
        <line x1="122" y1="58" x2="130" y2="112" stroke="#d98c5a" stroke-width="9" stroke-linecap="round"/>
        <ellipse cx="80" cy="98" rx="52" ry="12" fill="#e8cf9f"/>
        <ellipse cx="80" cy="52" rx="70" ry="20" fill="#9ad7f0" opacity=".45"/>
        <ellipse cx="80" cy="48" rx="70" ry="20" fill="#d9f2fc" stroke="#9ad7f0" stroke-width="4"/>
        <g transform="translate(56,38)">
          <ellipse cx="0" cy="6" rx="13" ry="4.5" fill="#fff"/>
          <path d="M-8,-5 L8,-5 L6,6 Q0,9 -6,6 Z" fill="#fff"/>
          <path d="M-2,-5 Q0,-11 2,-5" stroke="#ff9eb5" stroke-width="2.2" fill="none"/>
        </g>
        <rect x="88" y="32" width="26" height="18" rx="3" fill="#ff8f9e"/>
        <line x1="92" y1="41" x2="110" y2="41" stroke="#fff" stroke-width="2.5"/>
      </svg>\` },`,
    new: `    coffee: { w: 0.15, svg: \`${coffeeSVG}\` },`,
  },
  // 9. fishtank
  {
    label: 'fishtank',
    old: `    fishtank: { w: 0.13, act: 'fish', svg: \`
      <svg viewBox="0 0 140 165" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="112" width="80" height="16" rx="6" fill="#d98c5a"/>
        <rect x="38" y="128" width="64" height="26" rx="8" fill="#c47a44"/>
        <rect x="16" y="14" width="108" height="100" rx="10" fill="#dff3ff" stroke="#9ad7f0" stroke-width="5"/>
        <path d="M20,52 L120,52 L120,100 Q70,112 20,100 Z" fill="#9ad7f0" opacity=".85"/>
        <path d="M20,86 Q50,78 70,88 Q95,96 120,86 L120,100 Q70,112 20,100 Z" fill="#f2d9a0"/>
        <circle cx="40" cy="104" r="4" fill="#b0a08a"/><circle cx="54" cy="107" r="3" fill="#b0a08a"/><circle cx="100" cy="105" r="4" fill="#b0a08a"/>
        <path d="M34,84 Q30,64 40,50" stroke="#6cc46a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M106,88 Q110,68 100,56" stroke="#6cc46a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <g transform="translate(70,68)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#ff9f43"/>
          <polygon points="-10,0 -22,-7 -22,7" fill="#ff9f43"/>
          <circle cx="7" cy="-2" r="2" fill="#5b3a29"/>
        </g>
        <g transform="translate(48,44) scale(.7)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#7ecbff"/>
          <polygon points="10,0 22,-7 22,7" fill="#7ecbff"/>
          <circle cx="-7" cy="-2" r="2" fill="#5b3a29"/>
        </g>
        <circle cx="88" cy="40" r="3" fill="#fff" opacity=".8"/>
        <circle cx="95" cy="32" r="2" fill="#fff" opacity=".7"/>
      </svg>\` },`,
    new: `    fishtank: { w: 0.13, act: 'fish', svg: \`${fishtankSVG}\` },`,
  },
  // 10. cushion
  {
    label: 'cushion',
    old: `    cushion: { w: 0.09, svg: \`
      <svg viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="12" width="88" height="52" rx="26" fill="#ffb3c7"/>
        <rect x="14" y="18" width="72" height="40" rx="20" fill="#ffc9d8"/>
        <circle cx="50" cy="38" r="6" fill="#ff8faa"/>
        <path d="M50,38 Q68,30 78,38 M50,38 Q32,30 22,38" stroke="#ff8faa" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>\` },`,
    new: `    cushion: { w: 0.09, svg: \`${cushionSVG}\` },`,
  },
];

let cur = orig;
for (const r of replacements) {
  if (!cur.includes(r.old)) {
    console.error('NOT FOUND:', r.label);
    console.error('old (head 200):', r.old.slice(0, 200));
    console.error('cur (head 200):', cur.slice(cur.indexOf(r.label + ':') , cur.indexOf(r.label + ':') + 200));
    process.exit(1);
  }
  cur = cur.replace(r.old, r.new);
  console.log('replaced:', r.label, 'len(old)=' + r.old.length, 'len(new)=' + r.new.length);
}

fs.writeFileSync(FILE, cur, 'utf8');
console.log('written:', FILE, '(' + cur.length + ' bytes, +' + (cur.length - orig.length) + ')');

/* ---------- 验证 ---------- */
try {
  new Function(cur);
  console.log('syntax OK');
} catch (e) {
  console.error('SYNTAX ERROR:', e.message);
  process.exit(1);
}

const ids = ['bed', 'sofa', 'rug', 'lamp', 'plant', 'clock', 'tv', 'coffee', 'fishtank', 'cushion'];
for (const id of ids) {
  if (!cur.includes(id + ':')) { console.error('id missing:', id); process.exit(1); }
  const vbMatch = cur.match(new RegExp(id + ': \\{[^}]*viewBox="0 0 (\\d+) (\\d+)"'));
  if (!vbMatch) { console.error('viewBox missing for:', id); process.exit(1); }
  console.log('  ' + id + ' viewBox=' + vbMatch[1] + 'x' + vbMatch[2]);
}
console.log('all 10 ids + viewBoxes verified');

/* ---------- 自动恢复（如果用户撤销） ---------- */
console.log('--- DONE ---');
console.log('to rollback: cp "' + bak + '" "' + FILE + '"');