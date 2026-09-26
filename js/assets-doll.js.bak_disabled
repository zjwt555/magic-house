/* ============ 娃娃素材库：分层 SVG（同一坐标系 300x460） ============
   层序：hairBack(1) → 背饰(2) → 身体(3) → 裙子(4) → 鞋(5) → hairFront(6) → 正面配饰(7)
   发型用 fill:currentColor，由容器统一设发色。 */
(function () {
  'use strict';

  const SKIN = '#ffe0c7';
  const SKIN_LINE = '#f5c9a8';

  /* ---------- 身体 + 脸（永远在最底层的固定部分）v2 精致化 ---------- */
  const BODY = `
    <defs>
      <!-- 皮肤渐变：上亮下暗（模拟立体） -->
      <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffeacc"/>
        <stop offset="60%" stop-color="${SKIN}"/>
        <stop offset="100%" stop-color="${SKIN_LINE}"/>
      </linearGradient>
      <!-- 腮红径向渐变：中心深，外圈淡 -->
      <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff95a8" stop-opacity=".55"/>
        <stop offset="60%" stop-color="#ffb3c1" stop-opacity=".3"/>
        <stop offset="100%" stop-color="#ffb3c1" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- 腿 -->
    <rect x="127" y="282" width="21" height="118" rx="10.5" fill="url(#skinGrad)"/>
    <rect x="152" y="282" width="21" height="118" rx="10.5" fill="url(#skinGrad)"/>
    <ellipse cx="137.5" cy="404" rx="16" ry="11" fill="url(#skinGrad)"/>
    <ellipse cx="162.5" cy="404" rx="16" ry="11" fill="url(#skinGrad)"/>
    <!-- 膝盖阴影（立体感） -->
    <ellipse cx="137.5" cy="332" rx="8" ry="4" fill="${SKIN_LINE}" opacity=".35"/>
    <ellipse cx="162.5" cy="332" rx="8" ry="4" fill="${SKIN_LINE}" opacity=".35"/>
    <!-- 手臂（手张开，方便拿星星棒） -->
    <line x1="122" y1="206" x2="102" y2="264" stroke="url(#skinGrad)" stroke-width="20" stroke-linecap="round"/>
    <line x1="178" y1="206" x2="198" y2="264" stroke="url(#skinGrad)" stroke-width="20" stroke-linecap="round"/>
    <!-- 手：加手指分缝 -->
    <circle cx="101" cy="268" r="10.5" fill="url(#skinGrad)"/>
    <circle cx="199" cy="268" r="10.5" fill="url(#skinGrad)"/>
    <line x1="101" y1="258" x2="101" y2="278" stroke="${SKIN_LINE}" stroke-width="1.2" opacity=".5"/>
    <line x1="199" y1="258" x2="199" y2="278" stroke="${SKIN_LINE}" stroke-width="1.2" opacity=".5"/>
    <!-- 脖子 + 身体 -->
    <rect x="141" y="162" width="18" height="26" rx="6" fill="${SKIN_LINE}"/>
    <rect x="114" y="182" width="72" height="108" rx="26" fill="url(#skinGrad)"/>
    <!-- 锁骨阴影 -->
    <path d="M120,194 Q150,200 180,194" stroke="${SKIN_LINE}" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
    <!-- 耳朵 -->
    <circle cx="89" cy="124" r="10" fill="url(#skinGrad)"/>
    <circle cx="211" cy="124" r="10" fill="url(#skinGrad)"/>
    <!-- 耳朵内侧粉色 -->
    <ellipse cx="89" cy="126" rx="5" ry="6" fill="#ffb3c1" opacity=".55"/>
    <ellipse cx="211" cy="126" rx="5" ry="6" fill="#ffb3c1" opacity=".55"/>
    <!-- 头 -->
    <ellipse cx="150" cy="118" rx="60" ry="56" fill="url(#skinGrad)"/>
    <!-- 前额发际线阴影（强化发型边缘） -->
    <path d="M104,108 Q120,90 150,86 Q180,90 196,108" stroke="${SKIN_LINE}" stroke-width="2.5" fill="none" opacity=".35" stroke-linecap="round"/>
    <!-- 下颌阴影（圆脸立体感） -->
    <ellipse cx="150" cy="158" rx="40" ry="10" fill="${SKIN_LINE}" opacity=".18"/>
    <!-- 眉毛（更细 + 倾斜更有表情） -->
    <path d="M114,98 Q126,91 140,98" stroke="#a87a55" stroke-width="3.8" fill="none" stroke-linecap="round"/>
    <path d="M160,98 Q174,91 186,98" stroke="#a87a55" stroke-width="3.8" fill="none" stroke-linecap="round"/>
    <!-- 大眼睛：上眼睑弧线 + 睫毛 -->
    <path d="M117,108 Q128,103 139,108" stroke="#3d2a1c" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M161,108 Q172,103 183,108" stroke="#3d2a1c" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <!-- 睫毛（上 + 下） -->
    <line x1="118" y1="105" x2="116" y2="100" stroke="#3d2a1c" stroke-width="2" stroke-linecap="round"/>
    <line x1="124" y1="103" x2="123" y2="98" stroke="#3d2a1c" stroke-width="2" stroke-linecap="round"/>
    <line x1="130" y1="103" x2="130" y2="97" stroke="#3d2a1c" stroke-width="2" stroke-linecap="round"/>
    <line x1="162" y1="103" x2="162" y2="97" stroke="#3d2a1c" stroke-width="2" stroke-linecap="round"/>
    <line x1="168" y1="103" x2="167" y2="98" stroke="#3d2a1c" stroke-width="2" stroke-linecap="round"/>
    <line x1="174" y1="105" x2="172" y2="100" stroke="#3d2a1c" stroke-width="2" stroke-linecap="round"/>
    <!-- 眼球 + 大高光 + 小高光 + 底部小反光 -->
    <ellipse cx="128" cy="118" rx="10" ry="13" fill="#4a2f22"/>
    <ellipse cx="172" cy="118" rx="10" ry="13" fill="#4a2f22"/>
    <circle cx="124" cy="113" r="4.5" fill="#fff"/>
    <circle cx="168" cy="113" r="4.5" fill="#fff"/>
    <circle cx="132" cy="124" r="2.2" fill="#fff" opacity=".9"/>
    <circle cx="176" cy="124" r="2.2" fill="#fff" opacity=".9"/>
    <circle cx="129" cy="120" r="1" fill="#fff" opacity=".6"/>
    <circle cx="173" cy="120" r="1" fill="#fff" opacity=".6"/>
    <!-- 小鼻子（高光） -->
    <ellipse cx="150" cy="132" rx="2.6" ry="1.8" fill="#ee9b80"/>
    <ellipse cx="150" cy="131.5" rx="1.5" ry="0.7" fill="#ffc8a8" opacity=".7"/>
    <!-- 微笑（上唇 + 下唇） -->
    <path d="M139,144 Q144.5,148 150,147" stroke="#c66560" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M150,147 Q155.5,148 161,144" stroke="#c66560" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M141,144 Q150,153 159,144 Q155,151 150,151 Q145,151 141,144 Z" fill="#e2756f" opacity=".9"/>
    <ellipse cx="150" cy="149" rx="3" ry="1.2" fill="#ff8a8a" opacity=".5"/>
    <!-- 腮红（径向渐变） -->
    <circle cx="106" cy="140" r="14" fill="url(#blushGrad)"/>
    <circle cx="194" cy="140" r="14" fill="url(#blushGrad)"/>
    <!-- 鼻尖小腮红（更可爱） -->
    <circle cx="150" cy="135" r="3.5" fill="#ffb3c1" opacity=".4"/>`;

  /* ---------- 发型（back + front 两片，currentColor） ---------- */
  const HAIR_BACK_BASE = `<ellipse cx="150" cy="112" rx="66" ry="62" fill="currentColor"/>`;

  const HAIRS = {
    twin: {
      back: HAIR_BACK_BASE + `
        <line x1="84" y1="122" x2="62" y2="258" stroke="currentColor" stroke-width="38" stroke-linecap="round"/>
        <line x1="216" y1="122" x2="238" y2="258" stroke="currentColor" stroke-width="38" stroke-linecap="round"/>
        <ellipse cx="62" cy="258" rx="24" ry="18" fill="currentColor" opacity=".85"/>
        <ellipse cx="238" cy="258" rx="24" ry="18" fill="currentColor" opacity=".85"/>`,
      front: `
        <circle cx="96" cy="98" r="19" fill="currentColor"/>
        <circle cx="120" cy="84" r="20" fill="currentColor"/>
        <circle cx="150" cy="78" r="21" fill="currentColor"/>
        <circle cx="180" cy="84" r="20" fill="currentColor"/>
        <circle cx="204" cy="98" r="19" fill="currentColor"/>
        <circle cx="92" cy="122" r="15" fill="currentColor"/>
        <circle cx="208" cy="122" r="15" fill="currentColor"/>
        <ellipse cx="130" cy="70" rx="20" ry="8" fill="#fff" opacity=".3" transform="rotate(-14 130 70)"/>
        <g transform="translate(78,108)">
          <path d="M0,0 C-20,-16 -30,0 -24,8 C-18,15 -5,8 0,0 Z" fill="#ff7fa9"/>
          <path d="M0,0 C20,-16 30,0 24,8 C18,15 5,8 0,0 Z" fill="#ff7fa9"/>
          <circle r="6.5" fill="#e05c86"/>
        </g>
        <g transform="translate(222,108)">
          <path d="M0,0 C-20,-16 -30,0 -24,8 C-18,15 -5,8 0,0 Z" fill="#ff7fa9"/>
          <path d="M0,0 C20,-16 30,0 24,8 C18,15 5,8 0,0 Z" fill="#ff7fa9"/>
          <circle r="6.5" fill="#e05c86"/>
        </g>`
    },
    bob: {
      back: HAIR_BACK_BASE + `
        <rect x="82" y="96" width="26" height="86" rx="13" fill="currentColor"/>
        <rect x="192" y="96" width="26" height="86" rx="13" fill="currentColor"/>
        <rect x="96" y="96" width="108" height="60" rx="26" fill="currentColor"/>`,
      front: `
        <circle cx="98" cy="96" r="19" fill="currentColor"/>
        <circle cx="124" cy="82" r="21" fill="currentColor"/>
        <circle cx="150" cy="76" r="22" fill="currentColor"/>
        <circle cx="176" cy="82" r="21" fill="currentColor"/>
        <circle cx="202" cy="96" r="19" fill="currentColor"/>
        <circle cx="93" cy="120" r="14" fill="currentColor"/>
        <circle cx="207" cy="120" r="14" fill="currentColor"/>
        <ellipse cx="128" cy="68" rx="20" ry="8" fill="#fff" opacity=".3" transform="rotate(-14 128 68)"/>`
    },
    long: {
      back: HAIR_BACK_BASE + `
        <rect x="80" y="92" width="30" height="228" rx="15" fill="currentColor"/>
        <rect x="190" y="92" width="30" height="228" rx="15" fill="currentColor"/>
        <rect x="96" y="92" width="108" height="210" rx="30" fill="currentColor" opacity=".92"/>`,
      front: `
        <circle cx="95" cy="100" r="20" fill="currentColor"/>
        <circle cx="114" cy="86" r="19" fill="currentColor"/>
        <circle cx="186" cy="86" r="19" fill="currentColor"/>
        <circle cx="205" cy="100" r="20" fill="currentColor"/>
        <circle cx="150" cy="70" r="18" fill="currentColor"/>
        <ellipse cx="112" cy="74" rx="18" ry="7" fill="#fff" opacity=".3" transform="rotate(-20 112 74)"/>
        <ellipse cx="188" cy="74" rx="18" ry="7" fill="#fff" opacity=".3" transform="rotate(20 188 74)"/>`
    },
    buns: {
      back: HAIR_BACK_BASE + `
        <circle cx="86" cy="60" r="26" fill="currentColor"/>
        <circle cx="214" cy="60" r="26" fill="currentColor"/>
        <circle cx="86" cy="60" r="15" fill="rgba(0,0,0,.12)"/>
        <circle cx="214" cy="60" r="15" fill="rgba(0,0,0,.12)"/>
        <rect x="96" y="96" width="108" height="52" rx="24" fill="currentColor"/>`,
      front: `
        <circle cx="98" cy="96" r="19" fill="currentColor"/>
        <circle cx="124" cy="84" r="20" fill="currentColor"/>
        <circle cx="150" cy="80" r="21" fill="currentColor"/>
        <circle cx="176" cy="84" r="20" fill="currentColor"/>
        <circle cx="202" cy="96" r="19" fill="currentColor"/>
        <circle cx="86" cy="60" r="7" fill="#ff7fa9"/>
        <circle cx="214" cy="60" r="7" fill="#ff7fa9"/>
        <ellipse cx="132" cy="72" rx="18" ry="7" fill="#fff" opacity=".3" transform="rotate(-12 132 72)"/>`
    },
    curly: {
      back: HAIR_BACK_BASE + `
        <circle cx="78" cy="130" r="24" fill="currentColor"/>
        <circle cx="222" cy="130" r="24" fill="currentColor"/>
        <circle cx="86" cy="176" r="22" fill="currentColor"/>
        <circle cx="214" cy="176" r="22" fill="currentColor"/>
        <circle cx="104" cy="204" r="20" fill="currentColor"/>
        <circle cx="196" cy="204" r="20" fill="currentColor"/>`,
      front: `
        <circle cx="94" cy="100" r="21" fill="currentColor"/>
        <circle cx="118" cy="80" r="23" fill="currentColor"/>
        <circle cx="150" cy="72" r="24" fill="currentColor"/>
        <circle cx="182" cy="80" r="23" fill="currentColor"/>
        <circle cx="206" cy="100" r="21" fill="currentColor"/>
        <circle cx="86" cy="130" r="17" fill="currentColor"/>
        <circle cx="214" cy="130" r="17" fill="currentColor"/>
        <ellipse cx="130" cy="64" rx="20" ry="9" fill="#fff" opacity=".28" transform="rotate(-10 130 64)"/>`
    },
    side: {
      back: HAIR_BACK_BASE + `
        <line x1="218" y1="120" x2="244" y2="250" stroke="currentColor" stroke-width="44" stroke-linecap="round"/>
        <ellipse cx="244" cy="252" rx="26" ry="20" fill="currentColor" opacity=".85"/>
        <rect x="192" y="96" width="26" height="120" rx="13" fill="currentColor"/>`,
      front: `
        <circle cx="96" cy="100" r="20" fill="currentColor"/>
        <circle cx="118" cy="84" r="21" fill="currentColor"/>
        <circle cx="146" cy="76" r="21" fill="currentColor"/>
        <circle cx="176" cy="82" r="20" fill="currentColor"/>
        <circle cx="200" cy="94" r="19" fill="currentColor"/>
        <circle cx="210" cy="118" r="15" fill="currentColor"/>
        <ellipse cx="126" cy="70" rx="18" ry="7" fill="#fff" opacity=".3" transform="rotate(-16 126 70)"/>
        <g transform="translate(212,104)">
          <path d="M0,0 C-18,-15 -28,0 -22,7 C-16,13 -4,7 0,0 Z" fill="#ffd34d"/>
          <path d="M0,0 C18,-15 28,0 22,7 C16,13 4,7 0,0 Z" fill="#ffd34d"/>
          <circle r="6" fill="#f2a94f"/>
        </g>`
    }
  };

  const HAIR_COLORS = ['#8b5e3c', '#3f3129', '#f5c542', '#ff9eb5', '#7ec8e3', '#b79ced'];

  /* ---------- 连衣裙（覆盖身体 182~332 区域） ---------- */
  const SKIRT = 'M110,254 Q150,266 190,254 L216,332 Q202,346 188,334 Q174,346 160,334 Q146,346 132,334 Q118,346 104,334 Q90,346 84,332 Z';
  const BODICE = 'M116,192 Q150,183 184,192 L190,254 Q150,266 110,254 Z';
  const DRESS_FULL = SKIRT + ' ' + BODICE;

  function dot(x, y, r, color) { return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`; }
  const STAR = 'M0,-8 L2.4,-2.4 L8,-2.4 L3.6,1.6 L5.2,7.2 L0,3.6 L-5.2,7.2 L-3.6,1.6 L-8,-2.4 L-2.4,-2.4 Z';

  const DRESSES = {
    pinkpolka: `
      <defs><clipPath id="dc-pinkpolka"><path d="${DRESS_FULL}"/></clipPath></defs>
      <path d="${DRESS_FULL}" fill="#ff9eb5"/>
      <g clip-path="url(#dc-pinkpolka)">
        ${[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3].map(c => {
          const x = 104 + c * 28 + (r % 2) * 14, y = 268 + r * 17;
          return x >= 96 && x <= 204 ? dot(x, y, 4.5, 'rgba(255,255,255,.85)') : '';
        }).join('')).join('')}
      </g>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#f77fa0"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#f77fa0"/>
      <circle cx="120" cy="206" r="13" fill="#f77fa0"/>
      <circle cx="180" cy="206" r="13" fill="#f77fa0"/>
      <circle cx="137" cy="193" r="9" fill="#fff"/>
      <circle cx="163" cy="193" r="9" fill="#fff"/>
      <rect x="126" y="246" width="48" height="9" rx="4.5" fill="#fff"/>
      <circle cx="150" cy="250" r="6" fill="#fff"/><circle cx="150" cy="250" r="3.6" fill="#f77fa0"/>`,
    sunflower: `
      <defs><clipPath id="dc-sunflower"><path d="${DRESS_FULL}"/></clipPath></defs>
      <path d="${DRESS_FULL}" fill="#ffd166"/>
      <g clip-path="url(#dc-sunflower)">
        ${[[128, 292], [178, 312], [104, 316]].map(([x, y]) => `
          ${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="0" cy="-8" rx="3.2" ry="6" fill="#f2a94f" transform="translate(${x},${y}) rotate(${a})"/>`).join('')}
          ${dot(x, y, 4, '#a86f3f')}`).join('')}
      </g>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#ff8f7a"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#ff8f7a"/>
      <circle cx="120" cy="206" r="13" fill="#ffbe6b"/>
      <circle cx="180" cy="206" r="13" fill="#ffbe6b"/>
      <circle cx="137" cy="193" r="9" fill="#98d8a0"/>
      <circle cx="163" cy="193" r="9" fill="#98d8a0"/>
      <rect x="126" y="246" width="48" height="9" rx="4.5" fill="#ff8f7a"/>`,
    ocean: `
      <defs><clipPath id="dc-ocean"><path d="${DRESS_FULL}"/></clipPath></defs>
      <path d="${DRESS_FULL}" fill="#7ec8e3"/>
      <g clip-path="url(#dc-ocean)">
        <path d="M84,318 Q104,306 122,318 Q140,330 158,318 Q176,306 196,318 Q208,326 216,318 L216,340 L84,340 Z" fill="rgba(255,255,255,.5)"/>
        <g transform="translate(124,290)"><path d="${STAR}" fill="#ffd34d" transform="scale(1.1)"/></g>
        <g transform="translate(184,268)"><path d="${STAR}" fill="#fff" transform="scale(.8)"/></g>
      </g>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#5aa8cc"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#5aa8cc"/>
      <circle cx="120" cy="206" r="13" fill="#bfe6ff"/>
      <circle cx="180" cy="206" r="13" fill="#bfe6ff"/>
      <circle cx="137" cy="193" r="9" fill="#fff"/>
      <circle cx="163" cy="193" r="9" fill="#fff"/>
      <rect x="126" y="246" width="48" height="9" rx="4.5" fill="#fff"/>`,
    fairy: `
      <path d="${SKIRT}" fill="#b79ced"/>
      ${[0, 1, 2, 3, 4].map(i => {
        const x = 96 + i * 27, len = i % 2 ? 296 : 310;
        return `<rect x="${x}" y="252" width="22" height="${len - 252}" rx="11" fill="#cdb9f2" opacity=".95"/>`;
      }).join('')}
      <path d="${BODICE}" fill="#b79ced"/>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#9f7edb"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#9f7edb"/>
      <circle cx="120" cy="206" r="13" fill="#cdb9f2"/>
      <circle cx="180" cy="206" r="13" fill="#cdb9f2"/>
      <circle cx="137" cy="193" r="9" fill="#e6dcfa"/>
      <circle cx="163" cy="193" r="9" fill="#e6dcfa"/>
      <g transform="translate(112,286)"><path d="${STAR}" fill="#fff"/></g>
      <g transform="translate(150,300)"><path d="${STAR}" fill="#ffd34d" transform="scale(.8)"/></g>
      <g transform="translate(190,286)"><path d="${STAR}" fill="#fff"/></g>
      <rect x="126" y="246" width="48" height="9" rx="4.5" fill="#e6dcfa"/>`,
    strawberry: `
      <defs><clipPath id="dc-strawberry"><path d="${DRESS_FULL}"/></clipPath></defs>
      <path d="${DRESS_FULL}" fill="#ff6b6b"/>
      <g clip-path="url(#dc-strawberry)">
        ${[[120, 280], [150, 296], [180, 280], [135, 316], [165, 316], [104, 262], [196, 262], [150, 262]].map(([x, y]) =>
          `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4" fill="#ffe9a8"/>`).join('')}
      </g>
      <path d="M84,332 Q98,346 112,334 Q126,346 140,334 Q154,346 168,334 Q182,346 196,334 Q210,346 216,332"
        stroke="#98d8a0" stroke-width="8" fill="none" stroke-linecap="round"/>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#e05555"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#e05555"/>
      <circle cx="120" cy="206" r="13" fill="#ff8f8f"/>
      <circle cx="180" cy="206" r="13" fill="#ff8f8f"/>
      <circle cx="137" cy="193" r="9" fill="#98d8a0"/>
      <circle cx="163" cy="193" r="9" fill="#98d8a0"/>`,
    mint: `
      <path d="${DRESS_FULL}" fill="#98d8a0"/>
      <path d="M132,222 L168,222 L180,318 Q150,330 120,318 Z" fill="#fffdf5"/>
      <rect x="136" y="214" width="28" height="12" rx="6" fill="#fffdf5"/>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#7ec088"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#7ec088"/>
      <circle cx="120" cy="206" r="13" fill="#b8e6bd"/>
      <circle cx="180" cy="206" r="13" fill="#b8e6bd"/>
      <circle cx="137" cy="193" r="9" fill="#fffdf5"/>
      <circle cx="163" cy="193" r="9" fill="#fffdf5"/>
      <g transform="translate(150,250)">
        <path d="M0,0 C-16,-12 -24,0 -19,6 C-14,12 -4,6 0,0 Z" fill="#ff9eb5"/>
        <path d="M0,0 C16,-12 24,0 19,6 C14,12 4,6 0,0 Z" fill="#ff9eb5"/>
        <circle r="5" fill="#e05c86"/>
      </g>`,
    rainbow: `
      <defs><clipPath id="dc-rainbow"><path d="${SKIRT}"/></clipPath></defs>
      <path d="${BODICE}" fill="#ff8f9e"/>
      <path d="${SKIRT}" fill="#ffcf6b"/>
      <g clip-path="url(#dc-rainbow)">
        <rect x="80" y="268" width="140" height="14" fill="#ff8f9e"/>
        <rect x="80" y="283" width="140" height="14" fill="#ffcf6b"/>
        <rect x="80" y="298" width="140" height="14" fill="#a8e6a1"/>
        <rect x="80" y="313" width="140" height="14" fill="#9ad7f0"/>
        <rect x="80" y="328" width="140" height="14" fill="#b79ced"/>
      </g>
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#e05c86"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#e05c86"/>
      <circle cx="120" cy="206" r="13" fill="#ffc2cc"/>
      <circle cx="180" cy="206" r="13" fill="#ffc2cc"/>
      <circle cx="137" cy="193" r="9" fill="#fff"/>
      <circle cx="163" cy="193" r="9" fill="#fff"/>
      <rect x="126" y="246" width="48" height="9" rx="4.5" fill="#fff"/>`,
    snow: `
      <path d="${DRESS_FULL}" fill="#fdfcff"/>
      <path d="${DRESS_FULL}" fill="none" stroke="#e8e0f2" stroke-width="3"/>
      ${[96, 122, 148, 174, 200].map((x, i) => dot(x, 328 + (i % 2) * 5, 8, '#f0e6f7')).join('')}
      ${[[118, 282], [158, 296], [138, 312]].map(([x, y]) => `
        <g transform="translate(${x},${y})" stroke="#bde0f5" stroke-width="2.2" stroke-linecap="round">
          <line y1="-6" y2="6"/><line x1="-6" x2="6"/>
          <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5"/><line x1="-4.5" y1="4.5" x2="4.5" y2="-4.5"/>
        </g>`).join('')}
      <rect x="127" y="186" width="14" height="24" rx="7" fill="#eef0f8"/>
      <rect x="159" y="186" width="14" height="24" rx="7" fill="#eef0f8"/>
      <circle cx="120" cy="206" r="13" fill="#fff"/>
      <circle cx="180" cy="206" r="13" fill="#fff"/>
      <circle cx="137" cy="193" r="9" fill="#7ec8e3"/>
      <circle cx="163" cy="193" r="9" fill="#7ec8e3"/>
      <rect x="126" y="246" width="48" height="9" rx="4.5" fill="#7ec8e3"/>`
  };

  /* ---------- 鞋子（左右脚镜像，脚心 137.5 / 162.5） ---------- */
  function shoePair(id, one) {
    return `<g id="sh-${id}">${one(137.5)}</g><use href="#sh-${id}" x="25"/>`;
  }
  const SHOES = {
    mary: shoePair('mary', x => `
      <rect x="${x - 11}" y="366" width="22" height="30" rx="8" fill="#fff"/>
      <ellipse cx="${x}" cy="404" rx="17" ry="12" fill="#ff7fa9"/>
      <rect x="${x - 14}" y="395" width="28" height="6" rx="3" fill="#e05c86"/>
      <circle cx="${x + 9}" cy="398" r="2.6" fill="#fff"/>`),
    boots: shoePair('boots', x => `
      <rect x="${x - 13}" y="354" width="26" height="54" rx="10" fill="#ff6b6b"/>
      <ellipse cx="${x}" cy="404" rx="18" ry="12" fill="#e05555"/>
      <rect x="${x - 15}" y="350" width="30" height="11" rx="5.5" fill="#ff9494"/>`),
    sneakers: shoePair('sneakers', x => `
      <ellipse cx="${x}" cy="403" rx="17.5" ry="12" fill="#4aa3c9"/>
      <rect x="${x - 18}" y="407" width="36" height="9" rx="4.5" fill="#fff"/>
      <line x1="${x - 7}" y1="394" x2="${x + 7}" y2="392" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="${x - 7}" y1="400" x2="${x + 7}" y2="398" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),
    rain: shoePair('rain', x => `
      <rect x="${x - 12}" y="360" width="24" height="48" rx="9" fill="#ffcf4d"/>
      <ellipse cx="${x}" cy="404" rx="18" ry="11.5" fill="#f2b730"/>
      <circle cx="${x - 5}" cy="374" r="2.4" fill="#fff" opacity=".8"/>
      <circle cx="${x + 4}" cy="384" r="2.4" fill="#fff" opacity=".8"/>`),
    flats: shoePair('flats', x => `
      <ellipse cx="${x}" cy="404" rx="17" ry="11.5" fill="#b79ced"/>
      <g transform="translate(${x},395)">
        <path d="M0,0 C-9,-7 -13,0 -11,3 C-9,6 -2,3 0,0 Z" fill="#e6dcfa"/>
        <path d="M0,0 C9,-7 13,0 11,3 C9,6 2,3 0,0 Z" fill="#e6dcfa"/>
      </g>`),
    sparkle: shoePair('sparkle', x => `
      <ellipse cx="${x}" cy="403" rx="17.5" ry="12" fill="#ffd34d"/>
      <rect x="${x - 2}" y="410" width="6" height="8" rx="2" fill="#f2a94f"/>
      <circle cx="${x - 6}" cy="399" r="2.8" fill="#ff9eb5"/>
      <circle cx="${x + 5}" cy="401" r="2.8" fill="#7ecbff"/>
      <circle cx="${x + 1}" cy="394" r="2.2" fill="#fff"/>`)
  };

  /* ---------- 配件（layer: front / back） ---------- */
  const ACCS = {
    crown: { layer: 'front', svg: `
      <g transform="translate(150,50)">
        <path d="M-26,10 L-31,-13 L-14,-1 L0,-19 L14,-1 L31,-13 L26,10 Z" fill="#ffd34d" stroke="#f2a94f" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="-27" y="8" width="54" height="9" rx="4.5" fill="#ffd34d" stroke="#f2a94f" stroke-width="2"/>
        <circle cx="0" cy="-2" r="3.4" fill="#ff9eb5"/>
        <circle cx="-17" cy="2" r="2.8" fill="#7ecbff"/>
        <circle cx="17" cy="2" r="2.8" fill="#98d8a0"/>
      </g>` },
    bow: { layer: 'front', svg: `
      <g transform="translate(196,64) rotate(12)">
        <path d="M0,0 C-30,-20 -42,4 -34,14 C-26,23 -7,11 0,0 Z" fill="#ff7fa9"/>
        <path d="M0,0 C30,-20 42,4 34,14 C26,23 7,11 0,0 Z" fill="#ff7fa9"/>
        <path d="M-4,16 L-12,38" stroke="#ff7fa9" stroke-width="8" stroke-linecap="round"/>
        <path d="M4,16 L14,36" stroke="#ff7fa9" stroke-width="8" stroke-linecap="round"/>
        <circle r="8" fill="#e05c86"/>
      </g>` },
    wings: { layer: 'back', svg: `
      <g transform="translate(150,214)">
        <path d="M-6,0 C-44,-74 -116,-64 -112,-8 C-109,42 -52,42 -6,8 Z" fill="rgba(255,170,215,.5)" stroke="#ff9eb5" stroke-width="3"/>
        <path d="M-6,4 C-46,-38 -96,-28 -88,6 C-82,34 -40,30 -6,10 Z" fill="rgba(255,220,240,.65)"/>
        <path d="M6,0 C44,-74 116,-64 112,-8 C109,42 52,42 6,8 Z" fill="rgba(255,170,215,.5)" stroke="#ff9eb5" stroke-width="3"/>
        <path d="M6,4 C46,-38 96,-28 88,6 C82,34 40,30 6,10 Z" fill="rgba(255,220,240,.65)"/>
        <circle r="10" fill="rgba(255,255,255,.5)"/>
      </g>` },
    glasses: { layer: 'front', svg: `
      <g>
        <circle cx="128" cy="118" r="17" fill="rgba(210,238,255,.3)" stroke="#7a5a3a" stroke-width="5"/>
        <circle cx="172" cy="118" r="17" fill="rgba(210,238,255,.3)" stroke="#7a5a3a" stroke-width="5"/>
        <line x1="145" y1="116" x2="155" y2="116" stroke="#7a5a3a" stroke-width="5" stroke-linecap="round"/>
        <line x1="111" y1="114" x2="92" y2="110" stroke="#7a5a3a" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="189" y1="114" x2="208" y2="110" stroke="#7a5a3a" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="122" cy="112" r="3" fill="#fff" opacity=".9"/>
        <circle cx="166" cy="112" r="3" fill="#fff" opacity=".9"/>
      </g>` },
    necklace: { layer: 'front', svg: `
      <circle cx="132" cy="190" r="5" fill="#fff" stroke="#e8e0f2" stroke-width="1.5"/>
      <circle cx="141" cy="197" r="5" fill="#fff" stroke="#e8e0f2" stroke-width="1.5"/>
      <circle cx="150" cy="200" r="5" fill="#fff" stroke="#e8e0f2" stroke-width="1.5"/>
      <circle cx="159" cy="197" r="5" fill="#fff" stroke="#e8e0f2" stroke-width="1.5"/>
      <circle cx="168" cy="190" r="5" fill="#fff" stroke="#e8e0f2" stroke-width="1.5"/>
      <g transform="translate(150,212)"><path d="${STAR}" fill="#ffd34d"/></g>` },
    wand: { layer: 'front', svg: `
      <g transform="translate(199,268) rotate(-18)">
        <rect x="-3" y="-52" width="6" height="56" rx="3" fill="#f2a94f"/>
        <g transform="translate(0,-60)">
          <path d="${STAR}" fill="#ffd34d" stroke="#f2a94f" stroke-width="1.6" transform="scale(2.1)"/>
          <circle cx="-13" cy="-4" r="2.6" fill="#fff"/>
          <circle cx="12" cy="6" r="2.2" fill="#ff9eb5"/>
          <circle cx="6" cy="-12" r="1.8" fill="#7ecbff"/>
        </g>
      </g>` }
  };

  /* ---------- 小猫（200x180 坐标系）v2 精致化 ---------- */
  const CAT_BASE = `
    <defs>
      <!-- 橘色身体渐变（上亮下暗） -->
      <radialGradient id="catBodyGrad" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#fbc97c"/>
        <stop offset="60%" stop-color="#f7b967"/>
        <stop offset="100%" stop-color="#e8974a"/>
      </radialGradient>
      <!-- 头部渐变 -->
      <radialGradient id="catHeadGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#fcc77a"/>
        <stop offset="100%" stop-color="#e8974a"/>
      </radialGradient>
      <!-- 鼻头渐变 -->
      <radialGradient id="catNoseGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#ff9bb0"/>
        <stop offset="100%" stop-color="#e27589"/>
      </radialGradient>
    </defs>
    <!-- 尾巴（带条纹） -->
    <path d="M138,132 Q172,128 168,96" stroke="url(#catBodyGrad)" stroke-width="13" fill="none" stroke-linecap="round"/>
    <!-- 尾巴条纹 -->
    <ellipse cx="156" cy="130" rx="5" ry="2.5" fill="#d88040" opacity=".55" transform="rotate(-15 156 130)"/>
    <ellipse cx="166" cy="116" rx="4" ry="2" fill="#d88040" opacity=".55" transform="rotate(-30 166 116)"/>
    <!-- 身体 -->
    <ellipse cx="100" cy="118" rx="44" ry="42" fill="url(#catBodyGrad)"/>
    <!-- 肚子（更亮 + 椭圆形） -->
    <ellipse cx="100" cy="134" rx="26" ry="27" fill="#fff6e8"/>
    <!-- 肚子光泽 -->
    <ellipse cx="92" cy="124" rx="10" ry="6" fill="#fff" opacity=".4"/>
    <!-- 耳朵（带渐变 + 内耳粉） -->
    <rect x="78" y="60" width="10" height="18" rx="5" fill="url(#catHeadGrad)"/>
    <rect x="112" y="60" width="10" height="18" rx="5" fill="url(#catHeadGrad)"/>
    <!-- 头 -->
    <circle cx="100" cy="62" r="35" fill="url(#catHeadGrad)"/>
    <!-- 头顶光泽 -->
    <ellipse cx="86" cy="44" rx="14" ry="6" fill="#fff" opacity=".35" transform="rotate(-20 86 44)"/>
    <!-- 耳朵外三角 -->
    <polygon points="76,42 80,18 98,36" fill="url(#catHeadGrad)"/>
    <polygon points="124,42 120,18 102,36" fill="url(#catHeadGrad)"/>
    <!-- 内耳粉（更鲜艳 + 高光） -->
    <polygon points="80,38 82,26 91,35" fill="#ff9bb5"/>
    <polygon points="120,38 118,26 109,35" fill="#ff9bb5"/>
    <ellipse cx="86" cy="33" rx="2" ry="3" fill="#ffd0dd" opacity=".7"/>
    <ellipse cx="115" cy="33" rx="2" ry="3" fill="#ffd0dd" opacity=".7"/>
    <!-- 上眼睑弧线（更可爱） -->
    <path d="M80,55 Q87,49 94,55" stroke="#3d2a1c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M106,55 Q113,49 120,55" stroke="#3d2a1c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- 睫毛 -->
    <line x1="80" y1="53" x2="78" y2="48" stroke="#3d2a1c" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="86" y1="51" x2="85" y2="46" stroke="#3d2a1c" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="114" y1="51" x2="115" y2="46" stroke="#3d2a1c" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="120" y1="53" x2="122" y2="48" stroke="#3d2a1c" stroke-width="1.8" stroke-linecap="round"/>
    <!-- 眼球（大 + 多重高光） -->
    <ellipse cx="87" cy="62" rx="6.5" ry="8" fill="#4a2f22"/>
    <ellipse cx="113" cy="62" rx="6.5" ry="8" fill="#4a2f22"/>
    <circle cx="84" cy="58" r="3.2" fill="#fff"/>
    <circle cx="110" cy="58" r="3.2" fill="#fff"/>
    <circle cx="89" cy="66" r="1.5" fill="#fff" opacity=".85"/>
    <circle cx="115" cy="66" r="1.5" fill="#fff" opacity=".85"/>
    <circle cx="86" cy="64" r="0.7" fill="#fff" opacity=".6"/>
    <circle cx="112" cy="64" r="0.7" fill="#fff" opacity=".6"/>
    <!-- 鼻头（渐变） -->
    <polygon points="100,68 96,73 104,73" fill="url(#catNoseGrad)"/>
    <!-- 鼻头高光 -->
    <ellipse cx="100" cy="69" rx="1.5" ry="0.8" fill="#fff" opacity=".6"/>
    <!-- 嘴（清晰 M 形） -->
    <path d="M100,73 Q95,79 90,77" stroke="#7a4d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M100,73 Q105,79 110,77" stroke="#7a4d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <!-- 嘴中心舌红点 -->
    <ellipse cx="100" cy="76" rx="2" ry="1.4" fill="#ff7a8a" opacity=".7"/>
    <!-- 胡须根（鼻两侧小白点） -->
    <circle cx="93" cy="74" r="0.8" fill="#5b3a29"/>
    <circle cx="107" cy="74" r="0.8" fill="#5b3a29"/>
    <!-- 腮红（径向） -->
    <circle cx="78" cy="70" r="6" fill="#ff95a8" opacity=".35"/>
    <circle cx="122" cy="70" r="6" fill="#ff95a8" opacity=".35"/>
    <!-- 爪子 -->
    <ellipse cx="76" cy="156" rx="12" ry="8" fill="url(#catBodyGrad)"/>
    <ellipse cx="124" cy="156" rx="12" ry="8" fill="url(#catBodyGrad)"/>
    <!-- 爪子肉垫 -->
    <ellipse cx="76" cy="158" rx="5" ry="3" fill="#ffb3c1" opacity=".7"/>
    <ellipse cx="124" cy="158" rx="5" ry="3" fill="#ffb3c1" opacity=".7"/>
    <!-- 脚趾线 -->
    <line x1="73" y1="153" x2="73" y2="159" stroke="#c47a3a" stroke-width="1.8"/>
    <line x1="79" y1="153" x2="79" y2="159" stroke="#c47a3a" stroke-width="1.8"/>
    <line x1="121" y1="153" x2="121" y2="159" stroke="#c47a3a" stroke-width="1.8"/>
    <line x1="127" y1="153" x2="127" y2="159" stroke="#c47a3a" stroke-width="1.8"/>`;

  const CAT_ACCS = {
    bow: `
      <g transform="translate(74,30) rotate(-10)">
        <path d="M0,0 C-16,-11 -23,2 -18,8 C-13,13 -4,6 0,0 Z" fill="#ff7fa9"/>
        <path d="M0,0 C16,-11 23,2 18,8 C13,13 4,6 0,0 Z" fill="#ff7fa9"/>
        <circle r="4.5" fill="#e05c86"/>
      </g>`,
    hat: `
      <g transform="translate(100,16) rotate(-8)">
        <polygon points="-16,22 0,-24 16,22" fill="#7ecbff"/>
        <polygon points="-9,4 0,-10 9,4" fill="#ffd34d"/>
        <polygon points="-12,14 0,2 12,14" fill="#ff9eb5"/>
        <circle cy="-26" r="6" fill="#ffd34d"/>
      </g>`,
    scarf: `
      <rect x="64" y="88" width="72" height="17" rx="8.5" fill="#ff6b6b"/>
      <rect x="116" y="96" width="16" height="36" rx="8" fill="#ff8f8f"/>
      <line x1="121" y1="128" x2="121" y2="134" stroke="#e05555" stroke-width="2.4" stroke-linecap="round"/>
      <line x1="127" y1="128" x2="127" y2="134" stroke="#e05555" stroke-width="2.4" stroke-linecap="round"/>`,
    glasses: `
      <circle cx="87" cy="60" r="13" fill="rgba(210,238,255,.3)" stroke="#7a5a3a" stroke-width="4"/>
      <circle cx="113" cy="60" r="13" fill="rgba(210,238,255,.3)" stroke="#7a5a3a" stroke-width="4"/>
      <line x1="100" y1="59" x2="100" y2="61" stroke="#7a5a3a" stroke-width="4"/>`
  };

  /* ---------- 渲染辅助（换装间/房间共用） ---------- */
  function layerDiv(markup, z) {
    return markup ? `<div class="doll-layer" style="z-index:${z}"><svg viewBox="0 0 300 460" xmlns="http://www.w3.org/2000/svg">${markup}</svg></div>` : '';
  }

  window.dollHTML = function (d) {
    const hair = HAIRS[d.hair] || HAIRS.twin;
    const acc = ACCS[d.acc];
    const backAcc = acc && acc.layer === 'back' ? acc.svg : '';
    const frontAcc = acc && acc.layer !== 'back' ? acc.svg : '';
    return layerDiv(hair.back, 1)
      + layerDiv(backAcc, 2)
      + layerDiv(BODY, 3)
      + layerDiv(DRESSES[d.dress] || DRESSES.pinkpolka, 4)
      + layerDiv(SHOES[d.shoes] || SHOES.mary, 5)
      + layerDiv(hair.front, 6)
      + layerDiv(frontAcc, 7);
  };

  window.catHTML = function (accId) {
    const acc = CAT_ACCS[accId] || '';
    return `<div class="cat-layer"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">${CAT_BASE}</svg></div>`
      + (acc ? `<div class="cat-layer" style="z-index:2"><svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">${acc}</svg></div>` : '');
  };

  window.DollAssets = { HAIRS, HAIR_COLORS, DRESSES, SHOES, ACCS, CAT_ACCS, BODY, CAT_BASE };
})();
