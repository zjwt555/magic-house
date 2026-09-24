    bedroom: ['bed', 'rug', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock', 'bmirror', 'towelrack',
      'st_star', 'st_flower', 'st_butterfly'],/* ============ 房间素材库：家具 / 贴纸 / 墙纸 / 地板 ============ */
(function () {
  'use strict';

  /* w = 占房间宽度比例；flat=true 铺在地面（垫子类，压在家具下面） */
  const ITEMS = {
    bed: { w: 0.24, svg: `
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
      </svg>` },
    sofa: { w: 0.20, svg: `
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
      </svg>` },
    rug: { w: 0.24, flat: true, svg: `
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
        <circle cx="230" cy="68" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="228.5" cy="66.5" r="2" fill="#fff"/><circle cx="197.78174593052023" cy="107.59797974644665" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="196.28174593052023" cy="106.09797974644665" r="2" fill="#fff"/><circle cx="120" cy="124" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="118.5" cy="122.5" r="2" fill="#fff"/><circle cx="42.218254069479784" cy="107.59797974644667" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="40.718254069479784" cy="106.09797974644667" r="2" fill="#fff"/><circle cx="10" cy="68" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="8.5" cy="66.5" r="2" fill="#fff"/><circle cx="42.218254069479755" cy="28.402020253553346" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="40.718254069479755" cy="26.902020253553346" r="2" fill="#fff"/><circle cx="119.99999999999999" cy="12" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="118.49999999999999" cy="10.5" r="2" fill="#fff"/><circle cx="197.7817459305202" cy="28.40202025355333" r="6" fill="#fff" stroke="#c4738a" stroke-width="1.5"/><circle cx="196.2817459305202" cy="26.90202025355333" r="2" fill="#fff"/>
        <!-- 彩蛋：中央 5 瓣花 -->
        <g transform="translate(120,68)">
          <ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff7fa9" stroke="#e05c86" stroke-width="1" transform="rotate(0)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff7fa9" stroke="#e05c86" stroke-width="1" transform="rotate(72)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff7fa9" stroke="#e05c86" stroke-width="1" transform="rotate(144)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff7fa9" stroke="#e05c86" stroke-width="1" transform="rotate(216)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff7fa9" stroke="#e05c86" stroke-width="1" transform="rotate(288)"/>
          <circle r="6" fill="url(#item-rug-center)" stroke="#c4738a" stroke-width="1"/>
          <circle r="2.5" fill="#fff" opacity=".9"/>
        </g>
      </svg>` },
    lamp: { w: 0.11, svg: `
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
      </svg>` },
    bookshelf: { w: 0.155, svg: `
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
        
          <!-- 隔板木纹 -->
          <rect x="20" y="62" width="130" height="8" fill="url(#item-bookshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="63" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <!-- 书本 -->
          <g>
            <rect x="30" y="36" width="12" height="26" rx="2" fill="#ff8f9e" stroke="#5a3a2a" stroke-width=".6"/><rect x="31" y="37" width="3" height="24" rx="1" fill="#fff" opacity=".5"/><rect x="47" y="28" width="12" height="34" rx="2" fill="#7ec8e3" stroke="#5a3a2a" stroke-width=".6"/><rect x="48" y="29" width="3" height="32" rx="1" fill="#fff" opacity=".5"/><rect x="64" y="20" width="12" height="42" rx="2" fill="#ffd166" stroke="#5a3a2a" stroke-width=".6"/><rect x="65" y="21" width="3" height="40" rx="1" fill="#fff" opacity=".5"/><rect x="81" y="36" width="12" height="26" rx="2" fill="#98d8a0" stroke="#5a3a2a" stroke-width=".6"/><rect x="82" y="37" width="3" height="24" rx="1" fill="#fff" opacity=".5"/><rect x="98" y="28" width="12" height="34" rx="2" fill="#b79ced" stroke="#5a3a2a" stroke-width=".6"/><rect x="99" y="29" width="3" height="32" rx="1" fill="#fff" opacity=".5"/><rect x="115" y="20" width="12" height="42" rx="2" fill="#ff9eb5" stroke="#5a3a2a" stroke-width=".6"/><rect x="116" y="21" width="3" height="40" rx="1" fill="#fff" opacity=".5"/><rect x="132" y="36" width="12" height="26" rx="2" fill="#9ad7f0" stroke="#5a3a2a" stroke-width=".6"/><rect x="133" y="37" width="3" height="24" rx="1" fill="#fff" opacity=".5"/>
          </g>
          <!-- 隔板木纹 -->
          <rect x="20" y="118" width="130" height="8" fill="url(#item-bookshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="119" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <!-- 书本 -->
          <g>
            <rect x="64" y="76" width="12" height="42" rx="2" fill="#ffd166" stroke="#5a3a2a" stroke-width=".6"/><rect x="65" y="77" width="3" height="40" rx="1" fill="#fff" opacity=".5"/><rect x="81" y="92" width="12" height="26" rx="2" fill="#98d8a0" stroke="#5a3a2a" stroke-width=".6"/><rect x="82" y="93" width="3" height="24" rx="1" fill="#fff" opacity=".5"/><rect x="98" y="84" width="12" height="34" rx="2" fill="#b79ced" stroke="#5a3a2a" stroke-width=".6"/><rect x="99" y="85" width="3" height="32" rx="1" fill="#fff" opacity=".5"/><rect x="115" y="76" width="12" height="42" rx="2" fill="#ff9eb5" stroke="#5a3a2a" stroke-width=".6"/><rect x="116" y="77" width="3" height="40" rx="1" fill="#fff" opacity=".5"/>
          </g>
          <!-- 隔板木纹 -->
          <rect x="20" y="174" width="130" height="8" fill="url(#item-bookshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="175" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <!-- 书本 -->
          <g>
            <rect x="30" y="148" width="12" height="26" rx="2" fill="#ff8f9e" stroke="#5a3a2a" stroke-width=".6"/><rect x="31" y="149" width="3" height="24" rx="1" fill="#fff" opacity=".5"/><rect x="47" y="140" width="12" height="34" rx="2" fill="#7ec8e3" stroke="#5a3a2a" stroke-width=".6"/><rect x="48" y="141" width="3" height="32" rx="1" fill="#fff" opacity=".5"/><rect x="64" y="132" width="12" height="42" rx="2" fill="#ffd166" stroke="#5a3a2a" stroke-width=".6"/><rect x="65" y="133" width="3" height="40" rx="1" fill="#fff" opacity=".5"/><rect x="81" y="148" width="12" height="26" rx="2" fill="#98d8a0" stroke="#5a3a2a" stroke-width=".6"/><rect x="82" y="149" width="3" height="24" rx="1" fill="#fff" opacity=".5"/><rect x="98" y="140" width="12" height="34" rx="2" fill="#b79ced" stroke="#5a3a2a" stroke-width=".6"/><rect x="99" y="141" width="3" height="32" rx="1" fill="#fff" opacity=".5"/><rect x="115" y="132" width="12" height="42" rx="2" fill="#ff9eb5" stroke="#5a3a2a" stroke-width=".6"/><rect x="116" y="133" width="3" height="40" rx="1" fill="#fff" opacity=".5"/><rect x="132" y="148" width="12" height="26" rx="2" fill="#9ad7f0" stroke="#5a3a2a" stroke-width=".6"/><rect x="133" y="149" width="3" height="24" rx="1" fill="#fff" opacity=".5"/>
          </g>
        <!-- 顶层装饰（小黄球摆件） -->
        <circle cx="85" cy="150" r="9" fill="#ffd34d" stroke="#c69418" stroke-width="1.2"/>
        <circle cx="82" cy="146" r="3" fill="#fff" opacity=".7"/>
        <circle cx="80" cy="144" r="5.5" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
        <circle cx="90" cy="144" r="5.5" fill="#ffd34d" stroke="#c69418" stroke-width="1"/>
        <!-- 彩蛋：最下层小足球 -->
        <circle cx="105" cy="178" r="6" fill="#fff" stroke="#5b3a29" stroke-width="1"/>
        <polygon points="105,172 110,178 105,184 100,178" fill="#5b3a29" opacity=".5"/>
      </svg>` },
    plant: { w: 0.12, svg: `
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
        <ellipse cx="0" cy="0" rx="14" ry="34" fill="url(#item-plant-leaf-dark)" stroke="#3a8a3a" stroke-width="1.2" transform="translate(27,110) rotate(60)"/><ellipse cx="0" cy="0" rx="14" ry="34" fill="url(#item-plant-leaf-dark)" stroke="#3a8a3a" stroke-width="1.2" transform="translate(45,92) rotate(26)"/><ellipse cx="0" cy="0" rx="14" ry="34" fill="url(#item-plant-leaf-dark)" stroke="#3a8a3a" stroke-width="1.2" transform="translate(65,84) rotate(0)"/><ellipse cx="0" cy="0" rx="14" ry="34" fill="url(#item-plant-leaf-dark)" stroke="#3a8a3a" stroke-width="1.2" transform="translate(85,92) rotate(-26)"/><ellipse cx="0" cy="0" rx="14" ry="34" fill="url(#item-plant-leaf-dark)" stroke="#3a8a3a" stroke-width="1.2" transform="translate(103,110) rotate(-60)"/>
        <!-- 2 片浅绿高光叶 -->
        <ellipse cx="0" cy="0" rx="10" ry="26" fill="url(#item-plant-leaf-light)" stroke="#5ba85b" stroke-width="1" transform="translate(43,116)"/><ellipse cx="0" cy="0" rx="10" ry="26" fill="url(#item-plant-leaf-light)" stroke="#5ba85b" stroke-width="1" transform="translate(87,116)"/>
        <!-- 6 片花瓣（粉红径向渐变 + 描边） -->
        <ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(0)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(60)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(120)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(180)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(240)"/><ellipse cx="0" cy="-9" rx="5" ry="9" fill="url(#item-plant-petal)" stroke="#e05c86" stroke-width="0.8" transform="translate(65,64) rotate(300)"/>
        <!-- 花心（黄渐变 + 中心高光） -->
        <circle cx="65" cy="64" r="6" fill="url(#item-plant-core)" stroke="#c69418" stroke-width="1"/>
        <circle cx="63" cy="62" r="2" fill="#fff" opacity=".85"/>
        <!-- 彩蛋：花粉小点 -->
        <circle cx="58" cy="58" r="0.8" fill="#c69418"/>
        <circle cx="71" cy="58" r="0.8" fill="#c69418"/>
        <circle cx="58" cy="70" r="0.8" fill="#c69418"/>
        <circle cx="71" cy="70" r="0.8" fill="#c69418"/>
      </svg>` },
    catbed: { w: 0.13, svg: `
      <svg viewBox="0 0 150 105" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="75" cy="58" rx="68" ry="40" fill="#b79ced"/>
        <ellipse cx="75" cy="58" rx="48" ry="27" fill="#e6dcfa"/>
        <path d="M38,58 Q38,30 62,32" stroke="#f7b967" stroke-width="16" fill="none" stroke-linecap="round"/>
        <circle cx="62" cy="52" r="17" fill="#f7b967"/>
        <polygon points="52,42 54,30 62,39" fill="#f7b967"/>
        <polygon points="72,42 70,30 62,39" fill="#f7b967"/>
        <path d="M56,52 Q59,54 62,52 M62,52 Q65,54 68,52" stroke="#7a4d1d" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M86,30 l6,-6 M88,38 l8,-3" stroke="#b79ced" stroke-width="3" stroke-linecap="round"/>
      </svg>` },
    teddy: { w: 0.105, svg: `
      <svg viewBox="0 0 120 155" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="24" r="12" fill="#c99b6a"/>
        <circle cx="84" cy="24" r="12" fill="#c99b6a"/>
        <circle cx="36" cy="24" r="6" fill="#ffb3c1"/>
        <circle cx="84" cy="24" r="6" fill="#ffb3c1"/>
        <ellipse cx="60" cy="110" rx="34" ry="36" fill="#c99b6a"/>
        <ellipse cx="60" cy="118" rx="20" ry="22" fill="#e8cf9f"/>
        <circle cx="60" cy="46" r="30" fill="#c99b6a"/>
        <ellipse cx="60" cy="56" rx="14" ry="11" fill="#e8cf9f"/>
        <circle cx="49" cy="42" r="3.6" fill="#5b3a29"/>
        <circle cx="71" cy="42" r="3.6" fill="#5b3a29"/>
        <ellipse cx="60" cy="52" rx="4.5" ry="3.5" fill="#7a4d1d"/>
        <path d="M56,58 Q60,62 64,58" stroke="#7a4d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <line x1="22" y1="96" x2="12" y2="118" stroke="#c99b6a" stroke-width="14" stroke-linecap="round"/>
        <line x1="98" y1="96" x2="108" y2="118" stroke="#c99b6a" stroke-width="14" stroke-linecap="round"/>
        <ellipse cx="38" cy="142" rx="10" ry="8" fill="#c99b6a"/>
        <ellipse cx="82" cy="142" rx="10" ry="8" fill="#c99b6a"/>
        <g transform="translate(60,76)">
          <path d="M0,0 C-12,-9 -18,1 -14,6 C-10,10 -3,4 0,0 Z" fill="#ff7fa9"/>
          <path d="M0,0 C12,-9 18,1 14,6 C10,10 3,4 0,0 Z" fill="#ff7fa9"/>
          <circle r="3.6" fill="#e05c86"/>
        </g>
      </svg>` },
    table: { w: 0.14, svg: `
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
      </svg>` },
    frame: { w: 0.10, svg: `
      <svg viewBox="0 0 110 135" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="12" width="90" height="102" rx="10" fill="#d98c5a"/>
        <rect x="22" y="24" width="66" height="78" rx="5" fill="#cdf0ff"/>
        <circle cx="39" cy="43" r="8" fill="#ffd34d"/>
        <path d="M22,88 Q40,66 55,80 Q70,92 88,78 L88,102 L22,102 Z" fill="#98d8a0"/>
        <path d="M34,92 Q55,72 76,92" stroke="#ff8f9e" stroke-width="7" fill="none" stroke-linecap="round"/>
        <g transform="translate(94,16)">
          <path d="M0,0 C-10,-8 -15,1 -11,5 C-8,9 -2,3 0,0 Z" fill="#ff7fa9"/>
          <path d="M0,0 C10,-8 15,1 11,5 C8,9 2,3 0,0 Z" fill="#ff7fa9"/>
          <circle r="3" fill="#e05c86"/>
        </g>
      </svg>` },
    piano: { w: 0.165, svg: `
      <svg viewBox="0 0 180 145" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="160" height="30" rx="10" fill="#e05c86"/>
        <rect x="10" y="40" width="160" height="72" rx="12" fill="#ff8fa0"/>
        <rect x="24" y="58" width="132" height="36" rx="7" fill="#fff"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i =>
          `<rect x="${34 + i * 16}" y="58" width="8" height="17" rx="2.5" fill="#5b3a29"/>`).join('')}
        <circle cx="30" cy="33" r="5" fill="#ffd34d"/>
        <circle cx="150" cy="33" r="5" fill="#7ecbff"/>
        <rect x="26" y="110" width="12" height="20" rx="5" fill="#e05c86"/>
        <rect x="142" y="110" width="12" height="20" rx="5" fill="#e05c86"/>
        <g transform="translate(158,8)">
          <circle cx="0" cy="0" r="5" fill="#7a4d1d"/>
          <path d="M0,0 L14,-6 L14,4 Q7,8 0,4 Z" fill="#7a4d1d"/>
        </g>
      </svg>` },
    clock: { w: 0.095, svg: `
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
        <line x1="87" y1="60" x2="91" y2="60" stroke="#7a4d1d" stroke-width="2.5" stroke-linecap="round"/><line x1="82.31088913245536" y1="77.5" x2="85.77499074759311" y2="79.5" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="69.5" y1="90.31088913245534" x2="71.5" y2="93.77499074759311" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="52" y1="95" x2="52" y2="99" stroke="#7a4d1d" stroke-width="2.5" stroke-linecap="round"/><line x1="34.50000000000001" y1="90.31088913245536" x2="32.50000000000001" y2="93.77499074759311" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="21.689110867544645" y1="77.5" x2="18.225009252406892" y2="79.5" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="17" y1="60.00000000000001" x2="13" y2="60.00000000000001" stroke="#7a4d1d" stroke-width="2.5" stroke-linecap="round"/><line x1="21.68911086754465" y1="42.5" x2="18.225009252406892" y2="40.5" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="34.499999999999986" y1="29.689110867544652" x2="32.499999999999986" y2="26.2250092524069" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="51.99999999999999" y1="25" x2="51.99999999999999" y2="21" stroke="#7a4d1d" stroke-width="2.5" stroke-linecap="round"/><line x1="69.5" y1="29.68911086754465" x2="71.5" y2="26.225009252406892" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/><line x1="82.31088913245534" y1="42.499999999999986" x2="85.7749907475931" y2="40.499999999999986" stroke="#7a4d1d" stroke-width="1.2" stroke-linecap="round"/>
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
      </svg>` },
    /* ---- 贴纸（可贴很多个） ---- */
    st_star: { sticker: true, w: 0.085, svg: `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 8l8.6 20.3 21.9 1.9-16.6 14.5 4.9 21.4L45 55l-18.8 11.1 4.9-21.4L14.5 30.2l21.9-1.9z"
          fill="#ffd34d" stroke="#f2a94f" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="70" cy="18" r="5" fill="#ffe9a8"/>
        <circle cx="20" cy="70" r="4" fill="#ffe9a8"/>
      </svg>` },
    st_flower: { sticker: true, w: 0.08, svg: `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        ${[0, 60, 120, 180, 240, 300].map(a =>
          `<ellipse cx="0" cy="-19" rx="11" ry="19" fill="#ff9eb5" transform="translate(45,42) rotate(${a})"/>`).join('')}
        <circle cx="45" cy="42" r="11" fill="#ffd34d"/>
        <circle cx="45" cy="42" r="5.5" fill="#ffe9a8"/>
      </svg>` },
    st_butterfly: { sticker: true, w: 0.085, svg: `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="26" cy="32" rx="17" ry="23" fill="#7ecbff" transform="rotate(-24 26 32)"/>
        <ellipse cx="64" cy="32" rx="17" ry="23" fill="#7ecbff" transform="rotate(24 64 32)"/>
        <ellipse cx="31" cy="62" rx="12" ry="16" fill="#9ad7f0" transform="rotate(-18 31 62)"/>
        <ellipse cx="59" cy="62" rx="12" ry="16" fill="#9ad7f0" transform="rotate(18 59 62)"/>
        <ellipse cx="45" cy="48" rx="5.5" ry="19" fill="#5a6b7a"/>
        <path d="M42,30 Q36,18 30,14 M48,30 Q54,18 60,14" stroke="#5a6b7a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="30" cy="14" r="3" fill="#ffd34d"/>
        <circle cx="60" cy="14" r="3" fill="#ffd34d"/>
      </svg>` },
    /* ---- 客厅专属 ---- */
    tv: { w: 0.185, act: 'tv', svg: `
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
      </svg>` },
    coffee: { w: 0.15, svg: `
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
      </svg>` },
    armchair: { w: 0.15, svg: `
      <svg viewBox="0 0 150 165" xmlns="http://www.w3.org/2000/svg">
        <path d="M22,132 Q75,158 128,132" stroke="#c98443" stroke-width="10" fill="none" stroke-linecap="round"/>
        <rect x="34" y="52" width="82" height="66" rx="18" fill="#ffb3c7"/>
        <rect x="24" y="74" width="102" height="46" rx="16" fill="#ff9eb5"/>
        <rect x="34" y="84" width="82" height="14" rx="7" fill="#ffc2d3"/>
        <line x1="30" y1="84" x2="30" y2="126" stroke="#c98443" stroke-width="10" stroke-linecap="round"/>
        <line x1="120" y1="84" x2="120" y2="126" stroke="#c98443" stroke-width="10" stroke-linecap="round"/>
        <circle cx="30" cy="126" r="7" fill="#c98443"/>
        <circle cx="120" cy="126" r="7" fill="#c98443"/>
      </svg>` },
    fishtank: { w: 0.13, act: 'fish', svg: `
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
      </svg>` },
    cushion: { w: 0.09, svg: `
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
      </svg>` },
    /* ---- 卫生间专属 ---- */
    bathtub: { w: 0.20, act: 'bath', svg: `
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
        <circle cx="52" cy="40" r="13" fill="#fff" stroke="#9ad7f0" stroke-width="1" opacity=".85"/><circle cx="76" cy="32" r="9" fill="#fff" stroke="#9ad7f0" stroke-width="1" opacity=".85"/><circle cx="98" cy="42" r="12" fill="#fff" stroke="#9ad7f0" stroke-width="1" opacity=".85"/><circle cx="122" cy="34" r="9" fill="#fff" stroke="#9ad7f0" stroke-width="1" opacity=".85"/><circle cx="146" cy="41" r="13" fill="#fff" stroke="#9ad7f0" stroke-width="1" opacity=".85"/>
        <!-- 鸭/鱼玩偶 -->
        <g transform="translate(150,30)">
          <ellipse cx="0" cy="8" rx="13" ry="9" fill="url(#item-bathtub-duck)" stroke="#c69418" stroke-width="1.5"/>
          <circle cx="-3" cy="-4" r="8.5" fill="url(#item-bathtub-duck)" stroke="#c69418" stroke-width="1.5"/>
          <polygon points="4,-5 13,-3 5,1" fill="#ff9f43" stroke="#c4631a" stroke-width="1"/>
          <circle cx="-6" cy="-6" r="2.5" fill="#fff" stroke="#5b3a29" stroke-width="1"/>
          <circle cx="-6" cy="-6" r="1.3" fill="#5b3a29"/>
          <circle cx="-6.5" cy="-6.5" r=".5" fill="#fff"/>
        </g>
      </svg>` },
    sink: { w: 0.115, svg: `
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
      </svg>` },
    toilet: { w: 0.10, svg: `
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
      </svg>` },
    towelrack: { w: 0.10, svg: `
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
      </svg>` },
    bmirror: { w: 0.09, svg: `
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
      </svg>` },
    bathmat: { w: 0.135, flat: true, svg: `
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
        <circle cx="45" cy="33" r="5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1.2"/><circle cx="44" cy="32" r="1.5" fill="#fff" opacity=".8"/><circle cx="65" cy="33" r="5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1.2"/><circle cx="64" cy="32" r="1.5" fill="#fff" opacity=".8"/><circle cx="85" cy="33" r="5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1.2"/><circle cx="84" cy="32" r="1.5" fill="#fff" opacity=".8"/><circle cx="105" cy="33" r="5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1.2"/><circle cx="104" cy="32" r="1.5" fill="#fff" opacity=".8"/>
        <!-- 彩蛋：中央小脚印 -->
        <g transform="translate(75,33)" opacity=".5">
          <ellipse cx="0" cy="0" rx="3" ry="4" fill="#7ec8e3"/>
          <circle cx="-2.5" cy="-3.5" r="1" fill="#7ec8e3"/>
          <circle cx="2.5" cy="-3.5" r="1" fill="#7ec8e3"/>
          <circle cx="0" cy="-5" r="1" fill="#7ec8e3"/>
        </g>
      </svg>` },
    st_duck: { sticker: true, w: 0.085, svg: `
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
      </svg>` },
    st_bubble: { sticker: true, w: 0.08, svg: `
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
      </svg>` },
    /* ---- 阳台专属 ---- */
    flowerstand: { w: 0.115, svg: `
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
        <circle cx="42" cy="24" r="8" fill="url(#item-flowerstand-petal)" stroke="#e05c86" stroke-width="1"/><circle cx="40" cy="22" r="3" fill="#fff" opacity=".7"/><circle cx="42" cy="24" r="3.5" fill="url(#item-flowerstand-core)" stroke="#c69418" stroke-width=".8"/><path d="M32,30 Q42,38 52,30" stroke="#6cc46a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="82" cy="24" r="8" fill="url(#item-flowerstand-petal)" stroke="#e05c86" stroke-width="1"/><circle cx="80" cy="22" r="3" fill="#fff" opacity=".7"/><circle cx="82" cy="24" r="3.5" fill="url(#item-flowerstand-core)" stroke="#c69418" stroke-width=".8"/><path d="M72,30 Q82,38 92,30" stroke="#6cc46a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- 下层 1 盆（紫渐变） -->
        <path d="M50,120 L70,120 L67,102 Q60,96 53,102 Z" fill="url(#item-flowerstand-pot2)" stroke="#5a3a87" stroke-width="1.5"/>
        <!-- 下层 5 瓣紫花（动态） -->
        <g transform="translate(60,92)">
          <ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="url(#item-flowerstand-petal-pur)" stroke="#5a3a87" stroke-width=".8" transform="rotate(0)"/><ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="url(#item-flowerstand-petal-pur)" stroke="#5a3a87" stroke-width=".8" transform="rotate(72)"/><ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="url(#item-flowerstand-petal-pur)" stroke="#5a3a87" stroke-width=".8" transform="rotate(144)"/><ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="url(#item-flowerstand-petal-pur)" stroke="#5a3a87" stroke-width=".8" transform="rotate(216)"/><ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="url(#item-flowerstand-petal-pur)" stroke="#5a3a87" stroke-width=".8" transform="rotate(288)"/>
          <circle r="3.5" fill="url(#item-flowerstand-core)" stroke="#c69418" stroke-width=".8"/>
        </g>
      </svg>` },
    clothline: { w: 0.22, svg: `
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
      </svg>` },
    deckchair: { w: 0.15, svg: `
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
      </svg>` },
    /* ---- 书房专属 ---- */
    desk: { w: 0.18, svg: `
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
      </svg>` },
    globe: { w: 0.095, svg: `
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
      </svg>` },
    dining: { w: 0.17, svg: `
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
      </svg>` },
    /* ---- 固定互动装置（不可拖不可收，fx=房间内水平位置） ---- */
    fridge: { fixture: true, w: 0.115, fx: 0.06, act: 'fridge', svg: `
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
      </svg>`,
      svgOpen: `
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
      </svg>` },
    stove: { fixture: true, w: 0.14, fx: 0.42, act: 'pot', svg: `
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
      </svg>` },
    wardrobecab: { fixture: true, w: 0.135, fx: 0.08, act: 'wardrobe', svg: `
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
      </svg>` },
    /* ---- 院子专属 ---- */
    swing: { w: 0.155, act: 'swing', svg: `
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
      </svg>` },
    sandbox: { w: 0.165, flat: true, svg: `
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
        <circle cx="45" cy="45" r="2.2" fill="#d9b87a" stroke="#a07242" stroke-width=".5"/><circle cx="75" cy="55" r="2.2" fill="#d9b87a" stroke="#a07242" stroke-width=".5"/><circle cx="105" cy="42" r="2.2" fill="#d9b87a" stroke="#a07242" stroke-width=".5"/><circle cx="130" cy="55" r="2.2" fill="#d9b87a" stroke="#a07242" stroke-width=".5"/><circle cx="60" cy="62" r="2.2" fill="#d9b87a" stroke="#a07242" stroke-width=".5"/>
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
      </svg>` },
    tent: { w: 0.145, svg: `
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
      </svg>` },
    fence: { w: 0.2, svg: `
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
        <path d="M9,88 L9,30 Q9,14 20,10 Q31,14 31,30 L31,88 Z" fill="url(#item-fence-picket)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/><path d="M49,88 L49,30 Q49,14 60,10 Q71,14 71,30 L71,88 Z" fill="url(#item-fence-picket)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/><path d="M89,88 L89,30 Q89,14 100,10 Q111,14 111,30 L111,88 Z" fill="url(#item-fence-picket)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/><path d="M129,88 L129,30 Q129,14 140,10 Q151,14 151,30 L151,88 Z" fill="url(#item-fence-picket)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/><path d="M169,88 L169,30 Q169,14 180,10 Q191,14 191,30 L191,88 Z" fill="url(#item-fence-picket)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
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
      </svg>` },
    mailbox: { w: 0.075, svg: `
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
      </svg>` },
    /* ---- 公园专属 ---- */
    slide: { w: 0.17, svg: `
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
        <line x1="30" y1="46" x2="58" y2="46" stroke="url(#item-slide-step)" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="74" x2="58" y2="74" stroke="url(#item-slide-step)" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="102" x2="58" y2="102" stroke="url(#item-slide-step)" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="130" x2="58" y2="130" stroke="url(#item-slide-step)" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="158" x2="58" y2="158" stroke="url(#item-slide-step)" stroke-width="6" stroke-linecap="round"/>
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
      </svg>` },
    pond: { w: 0.2, flat: true, svg: `
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
          <ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="url(#item-pond-petal)" stroke="#e05c86" stroke-width=".6" transform="rotate(0)"/><ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="url(#item-pond-petal)" stroke="#e05c86" stroke-width=".6" transform="rotate(72)"/><ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="url(#item-pond-petal)" stroke="#e05c86" stroke-width=".6" transform="rotate(144)"/><ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="url(#item-pond-petal)" stroke="#e05c86" stroke-width=".6" transform="rotate(216)"/><ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="url(#item-pond-petal)" stroke="#e05c86" stroke-width=".6" transform="rotate(288)"/>
          <circle r="2.8" fill="#ffd34d" stroke="#c69418" stroke-width=".5"/>
        </g>
        <!-- 4 颗卵石（动态） -->
        <ellipse cx="50" cy="30" rx="7" ry="5" fill="#b8b0a4" stroke="#7a6c5a" stroke-width="1"/><ellipse cx="48" cy="28" rx="3" ry="1.5" fill="#fff" opacity=".55"/><ellipse cx="160" cy="34" rx="7" ry="5" fill="#b8b0a4" stroke="#7a6c5a" stroke-width="1"/><ellipse cx="158" cy="32" rx="3" ry="1.5" fill="#fff" opacity=".55"/><ellipse cx="66" cy="70" rx="7" ry="5" fill="#b8b0a4" stroke="#7a6c5a" stroke-width="1"/><ellipse cx="64" cy="68" rx="3" ry="1.5" fill="#fff" opacity=".55"/><ellipse cx="148" cy="72" rx="7" ry="5" fill="#b8b0a4" stroke="#7a6c5a" stroke-width="1"/><ellipse cx="146" cy="70" rx="3" ry="1.5" fill="#fff" opacity=".55"/>
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
      </svg>` },
    bench: { w: 0.13, svg: `
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
      </svg>` },
    bigtree: { w: 0.17, svg: `
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
        <circle cx="70" cy="60" r="6" fill="url(#item-bigtree-apple)" stroke="#a8302a" stroke-width="1.2"/><circle cx="68" cy="58" r="2" fill="#fff" opacity=".7"/><line x1="70" y1="54" x2="70" y2="51" stroke="#7a4d1d" stroke-width="1"/><ellipse cx="71" cy="52" rx="2" ry="1" fill="#6cc46a"/><circle cx="104" cy="78" r="6" fill="url(#item-bigtree-apple)" stroke="#a8302a" stroke-width="1.2"/><circle cx="102" cy="76" r="2" fill="#fff" opacity=".7"/><line x1="104" y1="72" x2="104" y2="69" stroke="#7a4d1d" stroke-width="1"/><ellipse cx="105" cy="70" rx="2" ry="1" fill="#6cc46a"/><circle cx="88" cy="38" r="6" fill="url(#item-bigtree-apple)" stroke="#a8302a" stroke-width="1.2"/><circle cx="86" cy="36" r="2" fill="#fff" opacity=".7"/><line x1="88" y1="32" x2="88" y2="29" stroke="#7a4d1d" stroke-width="1"/><ellipse cx="89" cy="30" rx="2" ry="1" fill="#6cc46a"/><circle cx="124" cy="56" r="6" fill="url(#item-bigtree-apple)" stroke="#a8302a" stroke-width="1.2"/><circle cx="122" cy="54" r="2" fill="#fff" opacity=".7"/><line x1="124" y1="50" x2="124" y2="47" stroke="#7a4d1d" stroke-width="1"/><ellipse cx="125" cy="48" rx="2" ry="1" fill="#6cc46a"/>
        <!-- 彩蛋：树洞 -->
        <ellipse cx="86" cy="170" rx="8" ry="10" fill="#3a2418" stroke="#1a1208" stroke-width="1.5"/>
        <ellipse cx="83" cy="166" rx="2" ry="1" fill="#7a4d1d" opacity=".7"/>
        <!-- 树洞里探出的小松鼠眼睛 -->
        <circle cx="84" cy="172" r="1.5" fill="#fff"/>
        <circle cx="84" cy="172" r="1" fill="#5b3a29"/>
        <circle cx="88" cy="172" r="1.5" fill="#fff"/>
        <circle cx="88" cy="172" r="1" fill="#5b3a29"/>
      </svg>` },
    fountain: { w: 0.14, act: 'fountain', svg: `
      <svg viewBox="0 0 150 175" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="75" cy="150" rx="66" ry="20" fill="#c9c2b8"/>
        <ellipse cx="75" cy="146" rx="56" ry="15" fill="#9ad7f0"/>
        <rect x="66" y="80" width="18" height="66" rx="8" fill="#e8e2d8"/>
        <ellipse cx="75" cy="82" rx="38" ry="11" fill="#e8e2d8"/>
        <ellipse cx="75" cy="79" rx="30" ry="8" fill="#9ad7f0"/>
        <ellipse cx="75" cy="52" rx="12" ry="4.5" fill="#e8e2d8"/>
        <path d="M75,50 Q75,30 62,22 M75,50 Q75,30 88,22 M75,50 Q75,26 75,16" stroke="#7ec8e3" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="62" cy="20" r="4" fill="#bfe6ff"/><circle cx="88" cy="20" r="4" fill="#bfe6ff"/><circle cx="75" cy="14" r="4" fill="#bfe6ff"/>
        ${[[40, 140], [110, 138], [56, 150], [96, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#b8b0a4"/>`).join('')}
      </svg>` },
    picnicmat: { w: 0.135, flat: true, svg: `
      <svg viewBox="0 0 145 75" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="133" height="60" rx="10" fill="#ff8f8f"/>
        ${[0, 1, 2, 3, 4].map(c => [0, 1, 2].map(r => {
          const x = 12 + c * 26 + (r % 2) * 13, y = 13 + r * 18;
          return (x + 22 < 136) ? `<rect x="${x}" y="${y}" width="22" height="16" rx="4" fill="rgba(255,255,255,.55)"/>` : '';
        }).join('')).join('')}
        <g transform="translate(112,14)">
          <path d="M-12,10 L12,10 L9,22 Q0,26 -9,22 Z" fill="#d98c5a"/>
          <path d="M-12,10 Q0,-4 12,10" stroke="#c47a44" stroke-width="4" fill="none"/>
        </g>
      </svg>` },
    /* ---- 商店专属 ---- */
    shopshelf: { w: 0.16, svg: `
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
        
          <!-- 隔板木纹 -->
          <rect x="20" y="70" width="130" height="8" fill="url(#item-shopshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="71" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <g>
            <!-- 商品 1：粉方糖 -->
            <rect x="28" y="56" width="16" height="14" rx="3" fill="#ff8f9e" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="36" cy="63" r="2" fill="#fff" opacity=".7"/>
            <!-- 商品 2：蓝罐 -->
            <rect x="48" y="53" width="14" height="17" rx="3" fill="#7ec8e3" stroke="#3a7a9a" stroke-width=".8"/>
            <rect x="50" y="55" width="3" height="13" rx="1" fill="#fff" opacity=".55"/>
            <!-- 商品 3：黄瓶 -->
            <path d="M68,70 L68,50 L80,50 L80,70 Z" fill="#ffd166" stroke="#c69418" stroke-width=".8"/>
            <rect x="70" y="53" width="3" height="14" fill="#fff" opacity=".55"/>
            <!-- 商品 4：绿球 -->
            <circle cx="98" cy="62" r="8" fill="#98d8a0" stroke="#5a9e56" stroke-width=".8"/>
            <circle cx="95" cy="59" r="3" fill="#fff" opacity=".55"/>
            <!-- 商品 5：紫盒 -->
            <rect x="114" y="57" width="18" height="13" rx="3" fill="#b79ced" stroke="#7a4da8" stroke-width=".8"/>
            <rect x="116" y="59" width="4" height="9" fill="#fff" opacity=".55"/>
            <!-- 商品 6：橙球 -->
            <circle cx="140" cy="61" r="6.5" fill="#ff9f43" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="138" cy="59" r="2.5" fill="#fff" opacity=".7"/>
          </g>
          <!-- 隔板木纹 -->
          <rect x="20" y="126" width="130" height="8" fill="url(#item-shopshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="127" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <g>
            <!-- 商品 1：粉方糖 -->
            <rect x="28" y="112" width="16" height="14" rx="3" fill="#ff8f9e" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="36" cy="119" r="2" fill="#fff" opacity=".7"/>
            <!-- 商品 2：蓝罐 -->
            <rect x="48" y="109" width="14" height="17" rx="3" fill="#7ec8e3" stroke="#3a7a9a" stroke-width=".8"/>
            <rect x="50" y="111" width="3" height="13" rx="1" fill="#fff" opacity=".55"/>
            <!-- 商品 3：黄瓶 -->
            <path d="M68,126 L68,106 L80,106 L80,126 Z" fill="#ffd166" stroke="#c69418" stroke-width=".8"/>
            <rect x="70" y="109" width="3" height="14" fill="#fff" opacity=".55"/>
            <!-- 商品 4：绿球 -->
            <circle cx="98" cy="118" r="8" fill="#98d8a0" stroke="#5a9e56" stroke-width=".8"/>
            <circle cx="95" cy="115" r="3" fill="#fff" opacity=".55"/>
            <!-- 商品 5：紫盒 -->
            <rect x="114" y="113" width="18" height="13" rx="3" fill="#b79ced" stroke="#7a4da8" stroke-width=".8"/>
            <rect x="116" y="115" width="4" height="9" fill="#fff" opacity=".55"/>
            <!-- 商品 6：橙球 -->
            <circle cx="140" cy="117" r="6.5" fill="#ff9f43" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="138" cy="115" r="2.5" fill="#fff" opacity=".7"/>
          </g>
          <!-- 隔板木纹 -->
          <rect x="20" y="182" width="130" height="8" fill="url(#item-shopshelf-shelf)" stroke="#7a4d1d" stroke-width="1.2"/>
          <rect x="24" y="183" width="122" height="2" rx="1" fill="#fff" opacity=".55"/>
          <g>
            <!-- 商品 1：粉方糖 -->
            <rect x="28" y="168" width="16" height="14" rx="3" fill="#ff8f9e" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="36" cy="175" r="2" fill="#fff" opacity=".7"/>
            <!-- 商品 2：蓝罐 -->
            <rect x="48" y="165" width="14" height="17" rx="3" fill="#7ec8e3" stroke="#3a7a9a" stroke-width=".8"/>
            <rect x="50" y="167" width="3" height="13" rx="1" fill="#fff" opacity=".55"/>
            <!-- 商品 3：黄瓶 -->
            <path d="M68,182 L68,162 L80,162 L80,182 Z" fill="#ffd166" stroke="#c69418" stroke-width=".8"/>
            <rect x="70" y="165" width="3" height="14" fill="#fff" opacity=".55"/>
            <!-- 商品 4：绿球 -->
            <circle cx="98" cy="174" r="8" fill="#98d8a0" stroke="#5a9e56" stroke-width=".8"/>
            <circle cx="95" cy="171" r="3" fill="#fff" opacity=".55"/>
            <!-- 商品 5：紫盒 -->
            <rect x="114" y="169" width="18" height="13" rx="3" fill="#b79ced" stroke="#7a4da8" stroke-width=".8"/>
            <rect x="116" y="171" width="4" height="9" fill="#fff" opacity=".55"/>
            <!-- 商品 6：橙球 -->
            <circle cx="140" cy="173" r="6.5" fill="#ff9f43" stroke="#c4631a" stroke-width=".8"/>
            <circle cx="138" cy="171" r="2.5" fill="#fff" opacity=".7"/>
          </g>
        <!-- 彩蛋：货架顶的小吊牌 -->
        <g transform="translate(40,4)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#7a4d1d" stroke-width=".8"/>
          <rect x="-5" y="10" width="10" height="8" rx="1" fill="#ff9eb5" stroke="#e05c86" stroke-width=".8"/>
          <text x="0" y="16" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="6" font-weight="700" fill="#fff">★</text>
        </g>
      </svg>` },
    counter: { w: 0.175, act: 'register', svg: `
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
      </svg>` },
    freezer: { w: 0.115, act: 'freezer', svg: `
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
      </svg>` },
    toypile: { w: 0.12, svg: `
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
      </svg>` },
    /* ===== Phase 2 · 学校场景样品（中精致）=====
       三件样品已入库但未注册到 WORLD_ROOMS，让老吴先用 visual-page 看效果再上。
       风格：描边 + 多层高光 + 细节彩蛋 + 锐利几何。暖色调保持。 */
    chair: { w: 0.10, svg: `
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
      </svg>` },
    blackboard: { w: 0.22, svg: `
      <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
        <!-- 木边框底（深棕描边） -->
        <rect x="8" y="8" width="224" height="164" rx="6" fill="#8b6f47" stroke="#5a3f1f" stroke-width="2"/>
        <!-- 木纹（几道浅色 line） -->
        <line x1="12" y1="14" x2="20" y2="170" stroke="#a4845a" stroke-width="1" opacity=".7"/>
        <line x1="228" y1="14" x2="220" y2="170" stroke="#a4845a" stroke-width="1" opacity=".7"/>
        <line x1="10" y1="100" x2="230" y2="98" stroke="#6b4f2e" stroke-width="1" opacity=".5"/>
        <!-- 内边框（板面与外框之间留一道阴影） -->
        <rect x="20" y="20" width="200" height="120" rx="3" fill="#3a6a4d" stroke="#2a4f37" stroke-width="1.5"/>
        <!-- 板面高光层（左上方模拟反光） -->
        <ellipse cx="62" cy="40" rx="48" ry="14" fill="rgba(255,255,255,.14)"/>
        <ellipse cx="180" cy="130" rx="60" ry="10" fill="rgba(0,0,0,.10)"/>
        <!-- 粉笔字 "ABC"（白/黄/粉三色，歪歪扭扭手写感） -->
        <text x="40" y="68" font-family="Comic Sans MS, cursive" font-size="34" font-weight="800" fill="#fff" opacity=".95">A</text>
        <text x="84" y="74" font-family="Comic Sans MS, cursive" font-size="32" font-weight="800" fill="#ffd166">B</text>
        <text x="128" y="68" font-family="Comic Sans MS, cursive" font-size="32" font-weight="800" fill="#ff9eb5">C</text>
        <!-- 数学题 "1+1=?"（白粉笔） -->
        <text x="40" y="118" font-family="Comic Sans MS, cursive" font-size="22" font-weight="700" fill="#fff" opacity=".85">1 + 1 = ?</text>
        <!-- 磁铁字母（彩色小方块贴板面） -->
        <rect x="174" y="36" width="22" height="22" rx="3" fill="#ffd166" stroke="#c69418" stroke-width="1.5"/>
        <text x="185" y="52" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="800" fill="#7a4d1d">A</text>
        <rect x="196" y="44" width="20" height="20" rx="3" fill="#98d8a0" stroke="#5a9e56" stroke-width="1.5"/>
        <text x="206" y="58" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="800" fill="#2a6b2a">B</text>
        <!-- 粉笔托（板下方细木条 + 3 段粉笔头） -->
        <rect x="20" y="142" width="200" height="10" rx="2" fill="#a4845a" stroke="#5a3f1f" stroke-width="1"/>
        <rect x="38" y="144" width="22" height="6" rx="2" fill="#fff"/>
        <rect x="38" y="144" width="22" height="6" rx="2" fill="rgba(0,0,0,0)" stroke="#ddd" stroke-width=".5"/>
        <rect x="68" y="144" width="20" height="6" rx="2" fill="#ffd166"/>
        <rect x="68" y="144" width="20" height="6" rx="2" fill="rgba(0,0,0,0)" stroke="#c69418" stroke-width=".5"/>
        <rect x="96" y="144" width="18" height="6" rx="2" fill="#ff9eb5"/>
        <rect x="96" y="144" width="18" height="6" rx="2" fill="rgba(0,0,0,0)" stroke="#c4738a" stroke-width=".5"/>
        <!-- 板下悬挂的小黑板擦（带粉笔灰痕迹） -->
        <rect x="180" y="144" width="28" height="18" rx="3" fill="#3a3026" stroke="#1a1410" stroke-width="1.2"/>
        <rect x="180" y="144" width="28" height="4" rx="2" fill="#5a4a36"/>
        <!-- 整体下方阴影（贴墙效果） -->
        <rect x="10" y="172" width="220" height="6" rx="3" fill="rgba(0,0,0,.10)"/>
      </svg>` },
    ball: { w: 0.10, svg: `
      <svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
        <!-- 投影（球下方椭圆） -->
        <ellipse cx="65" cy="116" rx="40" ry="6" fill="rgba(0,0,0,.18)"/>
        <!-- 球右半（深色，让球有体积感） -->
        <circle cx="65" cy="62" r="50" fill="#e07a96"/>
        <!-- 球左半（主色） -->
        <path d="M65,12 A50,50 0 0,0 65,112 Z" fill="#ff9eb5"/>
        <!-- 锐利边缘描边 -->
        <circle cx="65" cy="62" r="50" fill="none" stroke="#c45875" stroke-width="2"/>
        <!-- 缝线（横向曲线 + 竖向曲线） -->
        <path d="M16,62 Q65,72 114,62" fill="none" stroke="#a83057" stroke-width="1.5" stroke-dasharray="4 3" opacity=".75"/>
        <path d="M65,12 Q75,62 65,112" fill="none" stroke="#a83057" stroke-width="1.5" stroke-dasharray="4 3" opacity=".75"/>
        <!-- 高光层（左上方大椭圆 + 小圆点） -->
        <ellipse cx="48" cy="44" rx="18" ry="10" fill="rgba(255,255,255,.55)" transform="rotate(-30 48 44)"/>
        <ellipse cx="42" cy="38" rx="6" ry="4" fill="rgba(255,255,255,.85)" transform="rotate(-30 42 38)"/>
        <!-- 右下半球暗部（让球更立体） -->
        <path d="M65,112 A50,50 0 0,0 114,62 Q90,90 65,112 Z" fill="rgba(0,0,0,.10)"/>
      </svg>` },
    pencilbox: { w: 0.16, svg: `
      <svg viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg">
        <!-- 盒底主体（金属蓝 + 描边） -->
        <rect x="14" y="44" width="152" height="54" rx="6" fill="#6c8ebf" stroke="#3a5a87" stroke-width="2"/>
        <!-- 盒盖（半开，浅蓝 + 描边，左侧稍微翘起） -->
        <path d="M16,44 L166,44 L160,14 Q90,8 20,14 Z" fill="#8aabe0" stroke="#3a5a87" stroke-width="2"/>
        <!-- 盒盖顶面高光 -->
        <rect x="28" y="18" width="124" height="4" rx="2" fill="rgba(255,255,255,.6)"/>
        <!-- 盒盖装饰花纹（几颗小星点） -->
        <circle cx="60" cy="30" r="2.5" fill="#ffd166"/>
        <circle cx="90" cy="26" r="2.5" fill="#ff9eb5"/>
        <circle cx="120" cy="30" r="2.5" fill="#98d8a0"/>
        <!-- 盒身花纹（一条装饰横线） -->
        <line x1="22" y1="78" x2="158" y2="78" stroke="rgba(255,255,255,.4)" stroke-width="2"/>
        <!-- 卡扣（中间金色方块） -->
        <rect x="80" y="40" width="20" height="14" rx="3" fill="#f7b967" stroke="#a06820" stroke-width="1.5"/>
        <rect x="84" y="44" width="12" height="6" rx="2" fill="rgba(255,255,255,.5)"/>
        <!-- 露出铅笔头部（盒盖内可见 3 根不同色铅笔） -->
        <rect x="40" y="38" width="6" height="20" rx="2" fill="#ffd166" stroke="#a06820" stroke-width="1"/>
        <polygon points="40,38 46,38 43,32" fill="#3a3026"/>
        <rect x="56" y="38" width="6" height="20" rx="2" fill="#ff9eb5" stroke="#c4738a" stroke-width="1"/>
        <polygon points="56,38 62,38 59,32" fill="#3a3026"/>
        <rect x="72" y="38" width="6" height="20" rx="2" fill="#98d8a0" stroke="#5a9e56" stroke-width="1"/>
        <polygon points="72,38 78,38 75,32" fill="#3a3026"/>
        <rect x="104" y="38" width="6" height="20" rx="2" fill="#7ec8e3" stroke="#3a6a8a" stroke-width="1"/>
        <polygon points="104,38 110,38 107,32" fill="#3a3026"/>
        <rect x="120" y="38" width="6" height="20" rx="2" fill="#b79ced" stroke="#5a3a87" stroke-width="1"/>
        <polygon points="120,38 126,38 123,32" fill="#3a3026"/>
        <rect x="136" y="38" width="6" height="20" rx="2" fill="#ffd166" stroke="#a06820" stroke-width="1"/>
        <polygon points="136,38 142,38 139,32" fill="#3a3026"/>
        <!-- 盒底下方投影 -->
        <ellipse cx="90" cy="104" rx="76" ry="4" fill="rgba(0,0,0,.15)"/>
      </svg>` }
  };

  /* 世界房间顺序（横向大房子从左到右，最右是室外） */
  const WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'school', 'yard', 'park', 'shop'];

  /* 各房间的家具清单顺序 */
  const ROOM_SETS = {
    balcony: ['clothline', 'deckchair', 'flowerstand', 'plant', 'catbed', 'st_flower', 'st_butterfly', 'st_bubble'],
    /* v0.7：卧室精简 —— 去掉 sofa/piano/table/bookshelf（太挤，piano 不属卧室）。
       留 bed + 7 件卧室主题：地毯/灯/绿植/猫床/熊玩偶/相框/钟 + 3 贴纸。 */
    bedroom: ['bed', 'rug', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock',
      'st_star', 'st_flower', 'st_butterfly'],
    /* v0.7：浴室不动 —— 主题本就很完整（卫浴 4 件 + 镜 + 架 + 垫 + 绿植 + 3 贴纸） */
    bathroom: ['bathtub', 'sink', 'toilet', 'bmirror', 'towelrack', 'bathmat', 'plant',
      'st_duck', 'st_bubble', 'st_star', 'st_flower'],
    /* v0.7：客厅精简 —— 去掉 bookshelf/piano（避免和 bedroom 重复）。 */
    living: ['tv', 'sofa', 'coffee', 'armchair', 'fishtank', 'cushion', 'rug', 'plant', 'frame', 'clock',
      'st_star', 'st_flower', 'st_butterfly'],
    /* v0.7：厨房扩展 —— 6 → 8 件。加 cushion（餐椅坐垫）、frame（墙上菜谱）、rug（地垫） */
    kitchen: ['dining', 'table', 'plant', 'clock', 'cushion', 'frame', 'rug',
      'st_flower', 'st_star'],
    /* v0.7：书房不动 —— 主题本就很合理 */
    study: ['desk', 'globe', 'bookshelf', 'armchair', 'lamp', 'plant', 'frame', 'clock',
      'rug', 'st_star', 'st_flower'],
    /* v0.8：学校房间（仅地图入口） */
    school: ['blackboard', 'ball', 'pencilbox', 'chair', 'desk', 'lamp', 'plant', 'st_star', 'st_flower', 'st_butterfly'],

    yard: ['swing', 'sandbox', 'tent', 'fence', 'mailbox', 'bigtree', 'plant', 'catbed',
      'st_flower', 'st_butterfly', 'st_duck', 'st_star'],
    park: ['slide', 'fountain', 'pond', 'bench', 'bigtree', 'tent', 'picnicmat', 'swing', 'mailbox',
      'st_butterfly', 'st_flower', 'st_star'],
    /* v0.7：商店扩展 —— 8 → 10 件。加 cushion（购物篮）、frame（海报） */
    shop: ['shopshelf', 'counter', 'freezer', 'toypile', 'rug', 'cushion', 'frame',
      'st_star', 'st_flower']
  };

  /* v0.7：每个房间的初始样板间布置（item 必在对应 ROOM_SETS 中）
     孩子进游戏时（和"全部还原"）已经摆好一组物品，不必从抽屉里拖。
     物品 id 来自 ROOM_SETS（用抽屉可拖拽的物品），不是 fixture（背景层）。 */
  const DEFAULT_LAYOUT = {
    balcony: [                              // 8 件抽屉，摆 4 件
      { id: 'clothline',    x: 0.50, y: 0.40 },
      { id: 'deckchair',    x: 0.28, y: 0.85 },
      { id: 'flowerstand',  x: 0.75, y: 0.78 },
      { id: 'plant',        x: 0.15, y: 0.70 }
    ],
    bedroom: [                              // 13 件抽屉（含 wardrobe 合并），摆 8 件
      { id: 'bed',       x: 0.50, y: 0.85 },
      { id: 'rug',       x: 0.50, y: 0.92 },
      { id: 'lamp',      x: 0.22, y: 0.80 },
      { id: 'catbed',    x: 0.78, y: 0.85 },
      { id: 'teddy',     x: 0.18, y: 0.92 },
      { id: 'frame',     x: 0.85, y: 0.30 },
      { id: 'bmirror',   x: 0.50, y: 0.42 },
      { id: 'towelrack', x: 0.15, y: 0.55 }
    ],
    bathroom: [                              // 11 件抽屉，摆 5 件
      { id: 'bathtub',   x: 0.30, y: 0.78 },
      { id: 'sink',      x: 0.72, y: 0.72 },
      { id: 'toilet',    x: 0.88, y: 0.85 },
      { id: 'bmirror',   x: 0.50, y: 0.42 },
      { id: 'towelrack', x: 0.18, y: 0.45 }
    ],
    living: [                                // 13 件抽屉，摆 7 件
      { id: 'tv',       x: 0.50, y: 0.55 },
      { id: 'sofa',     x: 0.50, y: 0.78 },
      { id: 'coffee',   x: 0.50, y: 0.86 },
      { id: 'armchair', x: 0.18, y: 0.78 },
      { id: 'fishtank', x: 0.82, y: 0.72 },
      { id: 'cushion',  x: 0.32, y: 0.84 },
      { id: 'rug',      x: 0.50, y: 0.94 }
    ],
    kitchen: [                               // 9 件抽屉，摆 4 件
      { id: 'dining',  x: 0.50, y: 0.78 },
      { id: 'table',   x: 0.50, y: 0.86 },
      { id: 'frame',   x: 0.85, y: 0.45 },
      { id: 'rug',     x: 0.50, y: 0.95 }
    ],
    study: [                                 // 11 件抽屉，摆 6 件
      { id: 'desk',      x: 0.50, y: 0.75 },
      { id: 'globe',     x: 0.25, y: 0.82 },
      { id: 'armchair',  x: 0.80, y: 0.82 },
      { id: 'bookshelf', x: 0.18, y: 0.45 },
      { id: 'frame',     x: 0.85, y: 0.45 },
      { id: 'rug',       x: 0.50, y: 0.93 }
    ],
    school: [                                 // 10 件抽屉，摆 5 件
      { id: 'blackboard', x: 0.50, y: 0.30 },
      { id: 'desk',       x: 0.18, y: 0.50 },
      { id: 'ball',       x: 0.30, y: 0.85 },
      { id: 'pencilbox',  x: 0.75, y: 0.85 },
      { id: 'lamp',       x: 0.82, y: 0.45 }
    ],

    yard: [                                  // 12 件抽屉，摆 5 件
      { id: 'swing',   x: 0.30, y: 0.70 },
      { id: 'sandbox', x: 0.70, y: 0.90 },
      { id: 'tent',    x: 0.50, y: 0.70 },
      { id: 'bigtree', x: 0.15, y: 0.65 },
      { id: 'fence',   x: 0.85, y: 0.50 }
    ],
    park: [                                  // 12 件抽屉，摆 6 件
      { id: 'slide',     x: 0.20, y: 0.65 },
      { id: 'fountain',  x: 0.50, y: 0.85 },
      { id: 'pond',      x: 0.80, y: 0.90 },
      { id: 'bench',     x: 0.50, y: 0.70 },
      { id: 'bigtree',   x: 0.15, y: 0.55 },
      { id: 'picnicmat', x: 0.80, y: 0.65 }
    ],
    shop: [                                  // 9 件抽屉，摆 4 件
      { id: 'shopshelf', x: 0.25, y: 0.45 },
      { id: 'counter',   x: 0.70, y: 0.80 },
      { id: 'toypile',   x: 0.30, y: 0.80 },
      { id: 'frame',     x: 0.85, y: 0.45 }
    ]
  };

  /* 固定装置归属（渲染在房间背景层，不可拖不可收） */
  const FIXTURES = { kitchen: ['fridge', 'stove'], bedroom: ['wardrobecab'] };

  /* 厨房冰箱里的食物（复用厨房素材库的食材 SVG） */
  const FOODS = ['apple', 'strawberry', 'banana', 'grape', 'orange', 'watermelon', 'milk',
    'egg', 'tomato', 'carrot', 'chocolate', 'corn', 'pineapple', 'bread', 'peach'];

  /* 顺序即抽屉里的顺序（见 ROOM_SETS 各房间清单） */
  const ORDER = ROOM_SETS.bedroom;

  /* ---------- 墙纸 / 地板（CSS 背景） ---------- */
  const WALLS = [
    { bg: 'repeating-linear-gradient(90deg,#ffe9f2 0 42px,#ffd9ea 42px 84px)', bgColor: '#ffe9f2' },                     // 粉条纹
    { bg: 'radial-gradient(circle at 25% 30%,#fff 12px,transparent 13px),radial-gradient(circle at 72% 62%,#fff 16px,transparent 17px),linear-gradient(#d8f1ff,#eef9ff)', bgColor: '#e3f4ff', bgSize: '90px 90px' }, // 蓝天云朵
    { bg: 'radial-gradient(circle,#cdecc9 9px,transparent 10px)', bgColor: '#e8f8e8', bgSize: '38px 38px' },   // 薄荷圆点
    { bg: 'repeating-linear-gradient(45deg,#f3ecfb 0 30px,#e6d9f5 30px 60px)', bgColor: '#eedaf0' },                     // 薰衣草斜纹
    { bg: 'linear-gradient(#fff2e3,#ffe3c7)', bgColor: '#ffe5cf' },                                                      // 蜜桃渐变
    { bg: 'repeating-linear-gradient(0deg,rgba(255,255,255,.45) 0 24px,transparent 24px 48px),repeating-linear-gradient(90deg,rgba(255,255,255,.45) 0 24px,transparent 24px 48px),#ffd9ea', bgColor: '#ffd9ea' }, // 粉格棋盘
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#d8ecf5 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#d8ecf5 34px 38px)', bgColor: '#f4fbff' }, // 白瓷砖
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#a8d8d0 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#a8d8d0 34px 38px)', bgColor: '#e4f5f2' }, // 薄荷瓷砖
    { bg: 'repeating-linear-gradient(90deg,#fff0f6 0 28px,#ffd9ea 28px 56px),radial-gradient(circle at 50% 40%,#fff 6px,transparent 7px)', bgColor: '#ffd9ea', bgSize: '56px 72px' } // 糖果条纹+圆点
  ];

  const FLOORS = [
    { bg: 'repeating-linear-gradient(0deg,#e8b97e 0 30px,#dca96b 30px 34px)' },                      // 木地板
    { bg: 'radial-gradient(circle,#ffc3d8 8px,transparent 9px)', bgColor: '#ffd9ea', bgSize: '44px 44px' },   // 粉地毯
    { bg: 'repeating-linear-gradient(90deg,#bfe0f5 0 34px,#aed4f0 34px 68px)' },                     // 蓝条纹
    { bg: 'radial-gradient(circle at 50% 50%,#a8dfa0 6px,transparent 7px)', bgColor: '#b8e6a8', bgSize: '30px 30px' }, // 草地
    { bg: 'radial-gradient(circle,#fff 4px,transparent 5px)', bgColor: '#ded0f2', bgSize: '34px 34px' },     // 紫星星
    { bg: 'repeating-linear-gradient(-45deg,#f2d9a0 0 22px,#e8c983 22px 44px)' },                     // 蜂蜜黄
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#b8ccd8 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#b8ccd8 34px 38px)', bgColor: '#e8eff4' }, // 灰瓷砖
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#a3c8dd 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#a3c8dd 34px 38px)', bgColor: '#d9ecf5' },  // 蓝瓷砖
    { bg: 'repeating-linear-gradient(0deg,transparent 0 32px,#c9c2b8 32px 36px),repeating-linear-gradient(90deg,transparent 0 32px,#c9c2b8 32px 36px)', bgColor: '#e8e2d8' }  // 石板路
  ];

  function applyBg(elm, def) {
    elm.style.background = def.bgColor ? def.bgColor : '';
    elm.style.backgroundImage = def.bg || 'none';
    if (def.bgSize) {
      elm.style.backgroundSize = def.bgSize;
      elm.style.backgroundRepeat = 'repeat';
    } else {
      elm.style.backgroundSize = '';
    }
  }

  window.RoomAssets = { ITEMS, ORDER, ROOM_SETS, DEFAULT_LAYOUT, WORLD_ROOMS, FIXTURES, FOODS, WALLS, FLOORS, applyBg };
})();
