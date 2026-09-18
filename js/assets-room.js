/* ============ 房间素材库：家具 / 贴纸 / 墙纸 / 地板 ============ */
(function () {
  'use strict';

  /* w = 占房间宽度比例；flat=true 铺在地面（垫子类，压在家具下面） */
  const ITEMS = {
    bed: { w: 0.24, svg: `
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
      </svg>` },
    sofa: { w: 0.20, svg: `
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
      </svg>` },
    rug: { w: 0.24, flat: true, svg: `
      <svg viewBox="0 0 240 135" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="120" cy="68" rx="114" ry="58" fill="#ffd9ea"/>
        <ellipse cx="120" cy="68" rx="86" ry="42" fill="#fff"/>
        <ellipse cx="120" cy="68" rx="54" ry="26" fill="#ffdee9"/>
        <circle cx="120" cy="68" r="9" fill="#ff9eb5"/>
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(a =>
          `<circle cx="0" cy="0" r="5" fill="#ff9eb5" transform="translate(${120 + 100 * Math.cos(a * Math.PI / 180)},${68 + 46 * Math.sin(a * Math.PI / 180)})"/>`).join('')}
      </svg>` },
    lamp: { w: 0.11, svg: `
      <svg viewBox="0 0 110 195" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="55" cy="182" rx="36" ry="12" fill="#e8a3bd"/>
        <rect x="50" y="66" width="10" height="114" rx="5" fill="#d98cb0"/>
        <path d="M26,74 L84,74 L69,20 Q55,10 41,20 Z" fill="#ffcf6b"/>
        <path d="M38,68 L47,28 M72,68 L63,28" stroke="#f2b730" stroke-width="4" stroke-linecap="round"/>
        <circle cx="55" cy="86" r="16" fill="rgba(255,230,140,.55)"/>
      </svg>` },
    bookshelf: { w: 0.155, svg: `
      <svg viewBox="0 0 170 205" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="150" height="184" rx="12" fill="#d98c5a"/>
        <rect x="20" y="18" width="130" height="164" rx="6" fill="#f7e8d2"/>
        ${[0, 1, 2].map(r => `
          <rect x="20" y="${70 + r * 56 - 8}" width="130" height="8" fill="#c47a44"/>
          <g>
            ${[['#ff8f9e', 0], ['#7ec8e3', 1], ['#ffd166', 2], ['#98d8a0', 3], ['#b79ced', 4], ['#ff9eb5', 5], ['#9ad7f0', 6]].slice(r === 1 ? 2 : 0, r === 1 ? 6 : 7).map(([c, i]) => {
              const bx = 30 + i * 17, bh = 26 + (i % 3) * 8, by = 70 + r * 56 - 8 - bh;
              return `<rect x="${bx}" y="${by}" width="12" height="${bh}" rx="3" fill="${c}"/>`;
            }).join('')}
          </g>`).join('')}
        <circle cx="85" cy="150" r="9" fill="#f7b967"/>
        <circle cx="80" cy="144" r="5.5" fill="#f7b967"/>
        <circle cx="90" cy="144" r="5.5" fill="#f7b967"/>
      </svg>` },
    plant: { w: 0.12, svg: `
      <svg viewBox="0 0 130 195" xmlns="http://www.w3.org/2000/svg">
        <path d="M34,132 L96,132 L87,186 Q65,194 43,186 Z" fill="#e8975e"/>
        <rect x="29" y="122" width="72" height="17" rx="8.5" fill="#f2a86e"/>
        ${[[-38, -12, 60], [-20, -30, 26], [0, -38, 0], [20, -30, -26], [38, -12, -60]].map(([tx, ty, rot]) =>
          `<ellipse cx="0" cy="0" rx="14" ry="34" fill="#6cc46a" transform="translate(${65 + tx},${122 + ty}) rotate(${rot})"/>`).join('')}
        ${[[-22, -6], [22, -6]].map(([tx, ty]) =>
          `<ellipse cx="0" cy="0" rx="10" ry="26" fill="#7ed47b" transform="translate(${65 + tx},${122 + ty})"/>`).join('')}
        ${[0, 60, 120, 180, 240, 300].map(a =>
          `<ellipse cx="0" cy="-9" rx="5" ry="9" fill="#ff9eb5" transform="translate(65,64) rotate(${a})"/>`).join('')}
        <circle cx="65" cy="64" r="6" fill="#ffd34d"/>
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
      </svg>` },
    coffee: { w: 0.15, svg: `
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
      </svg>` },
    cushion: { w: 0.09, svg: `
      <svg viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="12" width="88" height="52" rx="26" fill="#ffb3c7"/>
        <rect x="14" y="18" width="72" height="40" rx="20" fill="#ffc9d8"/>
        <circle cx="50" cy="38" r="6" fill="#ff8faa"/>
        <path d="M50,38 Q68,30 78,38 M50,38 Q32,30 22,38" stroke="#ff8faa" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>` },
    /* ---- 卫生间专属 ---- */
    bathtub: { w: 0.20, act: 'bath', svg: `
      <svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M22,52 L188,52 L176,116 Q105,132 34,116 Z" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <ellipse cx="105" cy="52" rx="83" ry="12" fill="#bfe6ff"/>
        <rect x="16" y="44" width="178" height="14" rx="7" fill="#e8e0f2"/>
        <path d="M186,58 Q204,58 202,38 L202,30" stroke="#c9d2da" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="202" cy="26" r="7" fill="#c9d2da"/>
        <path d="M40,116 L32,134 M170,116 L178,134" stroke="#ffd34d" stroke-width="8" stroke-linecap="round"/>
        ${[[52, 40, 13], [76, 32, 9], [98, 42, 12], [122, 34, 9], [146, 41, 13]].map(([x, y, r]) =>
          `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".95"/>`).join('')}
        <g transform="translate(150,30)">
          <ellipse cx="0" cy="8" rx="13" ry="9" fill="#ffd34d"/>
          <circle cx="-3" cy="-4" r="8.5" fill="#ffd34d"/>
          <polygon points="4,-5 13,-3 5,1" fill="#ff9f43"/>
          <circle cx="-6" cy="-6" r="1.8" fill="#5b3a29"/>
        </g>
      </svg>` },
    sink: { w: 0.115, svg: `
      <svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
        <path d="M18,66 L102,66 L96,92 Q60,102 24,92 Z" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <ellipse cx="60" cy="66" rx="42" ry="9" fill="#dff3ff"/>
        <path d="M60,70 L60,150" stroke="#e8e0f2" stroke-width="22" stroke-linecap="round"/>
        <path d="M60,86 L60,140" stroke="#fdfdff" stroke-width="14" stroke-linecap="round"/>
        <path d="M44,60 Q44,50 54,50 M76,60 Q76,50 66,50" stroke="#c9d2da" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M60,50 L60,40 L74,40" stroke="#c9d2da" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="76" cy="40" r="5" fill="#c9d2da"/>
        <ellipse cx="60" cy="156" rx="26" ry="7" fill="#e8e0f2"/>
      </svg>` },
    toilet: { w: 0.10, svg: `
      <svg viewBox="0 0 105 145" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="16" width="62" height="52" rx="12" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <circle cx="53" cy="30" r="6" fill="#ffd34d"/>
        <ellipse cx="53" cy="78" rx="42" ry="16" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <path d="M38,90 L38,124 Q53,134 68,124 L68,90" fill="#fdfdff" stroke="#e8e0f2" stroke-width="4"/>
        <ellipse cx="53" cy="130" rx="24" ry="6" fill="#e8e0f2"/>
        <ellipse cx="53" cy="78" rx="30" ry="9" fill="#dff3ff"/>
      </svg>` },
    towelrack: { w: 0.10, svg: `
      <svg viewBox="0 0 110 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="20" x2="16" y2="140" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="94" y1="20" x2="94" y2="140" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="12" y1="36" x2="98" y2="36" stroke="#ffd34d" stroke-width="7" stroke-linecap="round"/>
        <rect x="24" y="40" width="26" height="62" rx="8" fill="#ff9eb5"/>
        <line x1="24" y1="56" x2="50" y2="56" stroke="#e05c86" stroke-width="4"/>
        <line x1="24" y1="72" x2="50" y2="72" stroke="#e05c86" stroke-width="4"/>
        <rect x="58" y="40" width="26" height="50" rx="8" fill="#7ec8e3"/>
        <line x1="58" y1="56" x2="84" y2="56" stroke="#4f9cc0" stroke-width="4"/>
      </svg>` },
    bmirror: { w: 0.09, svg: `
      <svg viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="44" r="34" fill="#dff3ff" stroke="#e8a3bd" stroke-width="8"/>
        <path d="M34,28 Q40,20 48,24" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M62,58 l3,7 7,0.6 -5,4.5 1.5,7 -6.5,-4 -6.5,4 1.5,-7 -5,-4.5 7,-0.6z" fill="#ffd34d"/>
        <rect x="14" y="86" width="72" height="12" rx="6" fill="#e8a3bd"/>
        <rect x="26" y="74" width="10" height="14" rx="4" fill="#b79ced"/>
        <rect x="42" y="70" width="10" height="18" rx="4" fill="#ff9eb5"/>
        <rect x="58" y="76" width="10" height="12" rx="4" fill="#7ec8e3"/>
      </svg>` },
    bathmat: { w: 0.135, flat: true, svg: `
      <svg viewBox="0 0 150 65" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="75" cy="33" rx="71" ry="27" fill="#9ad7f0"/>
        <ellipse cx="75" cy="33" rx="52" ry="19" fill="#bfe6ff"/>
        ${[-30, -10, 10, 30].map(dx => `<circle cx="${75 + dx}" cy="33" r="5" fill="#7ec8e3"/>`).join('')}
      </svg>` },
    st_duck: { sticker: true, w: 0.085, svg: `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="45" cy="56" rx="26" ry="18" fill="#ffd34d"/>
        <path d="M24,60 Q45,74 66,60" stroke="#f2b730" stroke-width="3" fill="none"/>
        <circle cx="36" cy="32" r="15" fill="#ffd34d"/>
        <polygon points="48,30 64,34 49,40" fill="#ff9f43"/>
        <circle cx="32" cy="29" r="3" fill="#5b3a29"/>
        <path d="M50,52 Q58,48 62,54" stroke="#f2b730" stroke-width="4" fill="none" stroke-linecap="round"/>
      </svg>` },
    st_bubble: { sticker: true, w: 0.08, svg: `
      <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <circle cx="34" cy="38" r="20" fill="rgba(160,220,250,.55)" stroke="rgba(255,255,255,.9)" stroke-width="3"/>
        <circle cx="62" cy="58" r="14" fill="rgba(160,220,250,.45)" stroke="rgba(255,255,255,.9)" stroke-width="3"/>
        <circle cx="56" cy="20" r="9" fill="rgba(160,220,250,.5)" stroke="rgba(255,255,255,.9)" stroke-width="2.5"/>
        <ellipse cx="27" cy="31" rx="6" ry="4" fill="#fff" opacity=".8" transform="rotate(-24 27 31)"/>
        <ellipse cx="57" cy="53" rx="4" ry="3" fill="#fff" opacity=".8"/>
      </svg>` },
    /* ---- 阳台专属 ---- */
    flowerstand: { w: 0.115, svg: `
      <svg viewBox="0 0 120 190" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="60" width="84" height="9" rx="4.5" fill="#d98c5a"/>
        <rect x="18" y="120" width="84" height="9" rx="4.5" fill="#d98c5a"/>
        <line x1="26" y1="69" x2="26" y2="182" stroke="#c47a44" stroke-width="9" stroke-linecap="round"/>
        <line x1="94" y1="69" x2="94" y2="182" stroke="#c47a44" stroke-width="9" stroke-linecap="round"/>
        <path d="M34,60 L50,60 L46,34 Q42,28 38,34 Z" fill="#e8975e"/>
        <path d="M74,60 L90,60 L86,34 Q82,28 78,34 Z" fill="#e8975e"/>
        ${[[42, 24], [82, 24]].map(([x, y]) =>
          `<circle cx="${x}" cy="${y}" r="8" fill="#ff9eb5"/>
           <circle cx="${x}" cy="${y}" r="3.5" fill="#ffd34d"/>
           <path d="M${x - 10},${y + 6} Q${x},${y + 14} ${x + 10},${y + 6}" stroke="#6cc46a" stroke-width="3" fill="none"/>`).join('')}
        <path d="M50,120 L70,120 L67,102 Q60,96 53,102 Z" fill="#e8975e"/>
        <g transform="translate(60,92)">
          ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-8" rx="4" ry="7.5" fill="#b79ced" transform="rotate(${a})"/>`).join('')}
          <circle r="3.5" fill="#ffd34d"/>
        </g>
      </svg>` },
    clothline: { w: 0.22, svg: `
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
      </svg>` },
    deckchair: { w: 0.15, svg: `
      <svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="26" y1="118" x2="120" y2="46" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="14" y1="132" x2="134" y2="132" stroke="#c98443" stroke-width="8" stroke-linecap="round"/>
        <line x1="40" y1="132" x2="104" y2="70" stroke="#b07838" stroke-width="7" stroke-linecap="round"/>
        <path d="M22,120 L118,50 L134,64 L38,134 Z" fill="#ffb3c7"/>
        <path d="M28,124 L112,58 L120,65 L36,131 Z" fill="#ff9eb5"/>
        <rect x="108" y="38" width="30" height="22" rx="6" fill="#ff9eb5" transform="rotate(12 108 38)"/>
        <circle cx="64" cy="96" r="4" fill="#fff" opacity=".7"/>
        <circle cx="84" cy="80" r="4" fill="#fff" opacity=".7"/>
      </svg>` },
    /* ---- 书房专属 ---- */
    desk: { w: 0.18, svg: `
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
      </svg>` },
    globe: { w: 0.095, svg: `
      <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,96 L50,128" stroke="#c98443" stroke-width="7" stroke-linecap="round"/>
        <ellipse cx="50" cy="132" rx="24" ry="7" fill="#c98443"/>
        <circle cx="50" cy="52" r="40" fill="#9ad7f0"/>
        <path d="M28,36 Q42,26 54,34 Q66,42 60,54 Q52,64 40,58 Q26,50 28,36 Z" fill="#98d8a0"/>
        <path d="M56,66 Q68,62 74,70 Q66,80 56,76 Z" fill="#98d8a0"/>
        <ellipse cx="50" cy="52" rx="40" ry="12" fill="none" stroke="#7ec8e3" stroke-width="3"/>
        <line x1="50" y1="8" x2="50" y2="96" stroke="#e8a3bd" stroke-width="3.5"/>
        <circle cx="50" cy="10" r="5" fill="#e8a3bd"/>
      </svg>` },
    dining: { w: 0.17, svg: `
      <svg viewBox="0 0 180 130" xmlns="http://www.w3.org/2000/svg">
        <line x1="42" y1="62" x2="34" y2="118" stroke="#d98c5a" stroke-width="10" stroke-linecap="round"/>
        <line x1="138" y1="62" x2="146" y2="118" stroke="#d98c5a" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="90" cy="56" rx="78" ry="18" fill="#e8cf9f"/>
        <ellipse cx="90" cy="48" rx="78" ry="18" fill="#f7e3b8"/>
        <ellipse cx="60" cy="44" rx="16" ry="6" fill="#fff"/>
        <ellipse cx="118" cy="42" rx="13" ry="5.5" fill="#fff"/>
        <circle cx="60" cy="40" r="6" fill="#ff6b6b"/>
        <g transform="translate(118,36)"><rect x="-8" y="-4" width="16" height="9" rx="3" fill="#ffd166"/></g>
      </svg>` },
    /* ---- 固定互动装置（不可拖不可收，fx=房间内水平位置） ---- */
    fridge: { fixture: true, w: 0.115, fx: 0.06, act: 'fridge', svg: `
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
      </svg>` },
    stove: { fixture: true, w: 0.14, fx: 0.42, act: 'pot', svg: `
      <svg viewBox="0 0 150 170" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="96" width="134" height="66" rx="10" fill="#cfd8de"/>
        <rect x="16" y="86" width="118" height="18" rx="9" fill="#aeb8c0"/>
        <circle cx="40" cy="95" r="5" fill="#7f8a93"/><circle cx="70" cy="95" r="5" fill="#7f8a93"/>
        <rect x="118" y="104" width="16" height="12" rx="3" fill="#ff8f7a"/>
        <rect x="118" y="124" width="16" height="12" rx="3" fill="#ffd166"/>
        <path d="M46,86 L46,58 Q46,44 62,44 L88,44 Q104,44 104,58 L104,86" fill="#e05c86"/>
        <ellipse cx="75" cy="86" rx="29" ry="8" fill="#c74a72"/>
        <ellipse cx="75" cy="84" rx="22" ry="5" fill="#f2a94f"/>
        <path d="M46,60 L34,52 M104,60 L116,52" stroke="#c74a72" stroke-width="7" stroke-linecap="round"/>
        <path d="M64,36 Q66,26 60,18 M86,36 Q88,26 82,18" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85"/>
      </svg>` },
    wardrobecab: { fixture: true, w: 0.135, fx: 0.08, act: 'wardrobe', svg: `
      <svg viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="124" height="184" rx="12" fill="#e8a3bd"/>
        <line x1="70" y1="14" x2="70" y2="190" stroke="#d98cb0" stroke-width="5"/>
        <rect x="18" y="20" width="46" height="164" rx="8" fill="#f7c6dd"/>
        <rect x="76" y="20" width="46" height="164" rx="8" fill="#f7c6dd"/>
        <circle cx="60" cy="102" r="5" fill="#b34a75"/>
        <circle cx="80" cy="102" r="5" fill="#b34a75"/>
        <g transform="translate(41,64) scale(.55)">
          <path d="M-9,-21 L-14,-4 L-23,15 Q0,25 23,15 L14,-4 L9,-21 Q0,-15 -9,-21 Z" fill="#e05c86"/>
          <circle cx="0" cy="-3" r="4.5" fill="#ffd0e0"/>
        </g>
        <g transform="translate(99,60) scale(.5)">
          <path d="M0,-18 L5,-6 L18,-5 L8,4 L11,17 L0,10 L-11,17 L-8,4 L-18,-5 L-5,-6 Z" fill="#ffd34d"/>
        </g>
        <rect x="8" y="0" width="124" height="14" rx="7" fill="#d98cb0"/>
      </svg>` }
  };

  /* 世界房间顺序（横向大房子从左到右） */
  const WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'wardrobe'];

  /* 各房间的家具清单顺序 */
  const ROOM_SETS = {
    balcony: ['clothline', 'deckchair', 'flowerstand', 'plant', 'catbed', 'st_flower', 'st_butterfly', 'st_bubble'],
    bedroom: ['bed', 'sofa', 'rug', 'table', 'bookshelf', 'piano', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock',
      'st_star', 'st_flower', 'st_butterfly'],
    bathroom: ['bathtub', 'sink', 'toilet', 'bmirror', 'towelrack', 'bathmat', 'plant',
      'st_duck', 'st_bubble', 'st_star', 'st_flower'],
    living: ['tv', 'sofa', 'coffee', 'armchair', 'fishtank', 'cushion', 'rug', 'bookshelf', 'piano', 'lamp', 'plant', 'frame', 'clock',
      'st_star', 'st_flower', 'st_butterfly'],
    kitchen: ['dining', 'table', 'plant', 'clock', 'st_flower', 'st_star'],
    study: ['desk', 'globe', 'bookshelf', 'armchair', 'lamp', 'plant', 'frame', 'clock', 'st_star', 'st_flower'],
    wardrobe: ['rug', 'piano', 'lamp', 'plant', 'teddy', 'frame', 'clock', 'st_star', 'st_flower', 'st_butterfly']
  };

  /* 固定装置归属（渲染在房间背景层，不可拖不可收） */
  const FIXTURES = { kitchen: ['fridge', 'stove'], wardrobe: ['wardrobecab'] };

  /* 厨房冰箱里的食物（复用厨房素材库的食材 SVG） */
  const FOODS = ['apple', 'strawberry', 'banana', 'grape', 'orange', 'watermelon', 'milk'];

  /* 顺序即抽屉里的顺序（见 ROOM_SETS 各房间清单） */
  const ORDER = ROOM_SETS.bedroom;

  /* ---------- 墙纸 / 地板（CSS 背景） ---------- */
  const WALLS = [
    { bg: 'repeating-linear-gradient(90deg,#ffe9f2 0 42px,#ffd9ea 42px 84px)' },                     // 粉条纹
    { bg: 'radial-gradient(circle at 25% 30%,#fff 12px,transparent 13px),radial-gradient(circle at 72% 62%,#fff 16px,transparent 17px),linear-gradient(#d8f1ff,#eef9ff)', bgSize: '90px 90px' }, // 蓝天云朵
    { bg: 'radial-gradient(circle,#cdecc9 9px,transparent 10px)', bgColor: '#e8f8e8', bgSize: '38px 38px' },   // 薄荷圆点
    { bg: 'repeating-linear-gradient(45deg,#f3ecfb 0 30px,#e6d9f5 30px 60px)' },                     // 薰衣草斜纹
    { bg: 'linear-gradient(#fff2e3,#ffe3c7)' },                                                      // 蜜桃渐变
    { bg: 'repeating-linear-gradient(0deg,rgba(255,255,255,.45) 0 24px,transparent 24px 48px),repeating-linear-gradient(90deg,rgba(255,255,255,.45) 0 24px,transparent 24px 48px),#ffd9ea' }, // 粉格棋盘
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#d8ecf5 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#d8ecf5 34px 38px)', bgColor: '#f4fbff' }, // 白瓷砖
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#a8d8d0 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#a8d8d0 34px 38px)', bgColor: '#e4f5f2' }  // 薄荷瓷砖
  ];

  const FLOORS = [
    { bg: 'repeating-linear-gradient(0deg,#e8b97e 0 30px,#dca96b 30px 34px)' },                      // 木地板
    { bg: 'radial-gradient(circle,#ffc3d8 8px,transparent 9px)', bgColor: '#ffd9ea', bgSize: '44px 44px' },   // 粉地毯
    { bg: 'repeating-linear-gradient(90deg,#bfe0f5 0 34px,#aed4f0 34px 68px)' },                     // 蓝条纹
    { bg: 'radial-gradient(circle at 50% 50%,#a8dfa0 6px,transparent 7px)', bgColor: '#b8e6a8', bgSize: '30px 30px' }, // 草地
    { bg: 'radial-gradient(circle,#fff 4px,transparent 5px)', bgColor: '#ded0f2', bgSize: '34px 34px' },     // 紫星星
    { bg: 'repeating-linear-gradient(-45deg,#f2d9a0 0 22px,#e8c983 22px 44px)' },                     // 蜂蜜黄
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#b8ccd8 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#b8ccd8 34px 38px)', bgColor: '#e8eff4' }, // 灰瓷砖
    { bg: 'repeating-linear-gradient(0deg,transparent 0 34px,#a3c8dd 34px 38px),repeating-linear-gradient(90deg,transparent 0 34px,#a3c8dd 34px 38px)', bgColor: '#d9ecf5' }  // 蓝瓷砖
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

  window.RoomAssets = { ITEMS, ORDER, ROOM_SETS, WORLD_ROOMS, FIXTURES, FOODS, WALLS, FLOORS, applyBg };
})();
