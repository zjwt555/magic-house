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
      </svg>`,
      svgOpen: `
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
      </svg>` },
    stove: { fixture: true, w: 0.14, fx: 0.42, act: 'pot', svg: `
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
      </svg>` },
    /* ---- 院子专属 ---- */
    swing: { w: 0.155, act: 'swing', svg: `
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
      </svg>` },
    sandbox: { w: 0.165, flat: true, svg: `
      <svg viewBox="0 0 175 95" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="155" height="60" rx="10" fill="#d98c5a"/>
        <rect x="20" y="26" width="135" height="44" rx="7" fill="#f2d9a0"/>
        <rect x="10" y="8" width="12" height="22" rx="5" fill="#c47a44"/>
        <rect x="153" y="8" width="12" height="22" rx="5" fill="#c47a44"/>
        <rect x="10" y="64" width="12" height="22" rx="5" fill="#c47a44"/>
        <rect x="153" y="64" width="12" height="22" rx="5" fill="#c47a44"/>
        ${[[45, 45], [75, 55], [105, 42], [130, 55], [60, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#d9b87a"/>`).join('')}
        <path d="M36,38 L52,38 L49,52 Q44,56 39,52 Z" fill="#ff8f7a"/>
        <rect x="42" y="30" width="4" height="9" rx="2" fill="#ff6b6b"/>
        <line x1="112" y1="62" x2="122" y2="42" stroke="#7ec8e3" stroke-width="5" stroke-linecap="round"/>
        <path d="M118,44 L130,46 L122,54 Z" fill="#9ad7f0"/>
      </svg>` },
    tent: { w: 0.145, svg: `
      <svg viewBox="0 0 160 155" xmlns="http://www.w3.org/2000/svg">
        <polygon points="15,145 80,18 145,145" fill="#7ec8e3"/>
        <polygon points="38,145 80,72 122,145" fill="#5aa8cc"/>
        <polygon points="60,145 80,100 100,145" fill="#4f9cc0"/>
        <line x1="80" y1="18" x2="80" y2="2" stroke="#c98443" stroke-width="4"/>
        <path d="M80,4 L102,10 L84,18 Z" fill="#ff6b6b"/>
        <ellipse cx="80" cy="147" rx="66" ry="6" fill="rgba(90,140,90,.25)"/>
      </svg>` },
    fence: { w: 0.2, svg: `
      <svg viewBox="0 0 210 115" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="38" width="198" height="12" rx="6" fill="#fff0e0"/>
        <rect x="6" y="66" width="198" height="12" rx="6" fill="#fff0e0"/>
        ${[20, 60, 100, 140, 180].map(x => `
          <path d="M${x - 11},88 L${x - 11},30 Q${x - 11},14 ${x},10 Q${x + 11},14 ${x + 11},30 L${x + 11},88 Z" fill="#fff8f0" stroke="#ecd9c3" stroke-width="2"/>`).join('')}
        <g transform="translate(60,34)">
          <circle r="6" fill="#ff9eb5"/><circle cy="-7" r="4" fill="#ff9eb5"/><circle cx="7" r="4" fill="#ff9eb5"/><circle cx="-7" r="4" fill="#ff9eb5"/><circle r="2.5" fill="#ffd34d"/>
        </g>
        <g transform="translate(150,32)">
          <circle r="5.5" fill="#b79ced"/><circle cy="-6.5" r="3.8" fill="#b79ced"/><circle cx="6.5" r="3.8" fill="#b79ced"/><circle cx="-6.5" r="3.8" fill="#b79ced"/><circle r="2.2" fill="#ffd34d"/>
        </g>
      </svg>` },
    mailbox: { w: 0.075, svg: `
      <svg viewBox="0 0 80 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="60" x2="40" y2="140" stroke="#c98443" stroke-width="9" stroke-linecap="round"/>
        <path d="M12,58 L12,30 Q12,16 26,16 L62,16 L62,58 Q40,66 12,58 Z" fill="#7ec8e3"/>
        <rect x="56" y="26" width="12" height="22" rx="4" fill="#5aa8cc"/>
        <circle cx="62" cy="37" r="2.5" fill="#fff"/>
        <line x1="18" y1="14" x2="18" y2="2" stroke="#ff6b6b" stroke-width="4" stroke-linecap="round"/>
        <circle cx="18" cy="2" r="4" fill="#ff6b6b"/>
        <path d="M20,46 Q34,52 46,46" stroke="#5aa8cc" stroke-width="3" fill="none"/>
      </svg>` },
    /* ---- 公园专属 ---- */
    slide: { w: 0.17, svg: `
      <svg viewBox="0 0 180 195" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="40" x2="30" y2="184" stroke="#c98443" stroke-width="9" stroke-linecap="round"/>
        <line x1="58" y1="40" x2="58" y2="184" stroke="#c98443" stroke-width="9" stroke-linecap="round"/>
        ${[64, 92, 120, 148, 176].map(y => `<line x1="30" y1="${y - 18}" x2="58" y2="${y - 18}" stroke="#b07838" stroke-width="6" stroke-linecap="round"/>`).join('')}
        <rect x="24" y="30" width="70" height="12" rx="6" fill="#ff9eb5"/>
        <path d="M88,36 L162,168 Q168,182 154,182 L142,182 Q150,170 96,44 Z" fill="#ffd166"/>
        <path d="M88,46 L148,166 L136,166 L84,50 Z" fill="#ffe9a8"/>
        <rect x="88" y="34" width="10" height="10" rx="4" fill="#e0a92c"/>
        <line x1="60" y1="40" x2="88" y2="40" stroke="#ff9eb5" stroke-width="10" stroke-linecap="round"/>
      </svg>` },
    pond: { w: 0.2, flat: true, svg: `
      <svg viewBox="0 0 210 105" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="105" cy="54" rx="98" ry="46" fill="#c9c2b8"/>
        <ellipse cx="105" cy="52" rx="86" ry="38" fill="#9ad7f0"/>
        <ellipse cx="105" cy="52" rx="86" ry="38" fill="none" stroke="#7ec8e3" stroke-width="4"/>
        <ellipse cx="80" cy="44" rx="16" ry="8" fill="#6cc46a"/>
        <ellipse cx="126" cy="62" rx="13" ry="6.5" fill="#7ed47b"/>
        <g transform="translate(126,44)">
          ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-6" rx="3" ry="5.5" fill="#ff9eb5" transform="rotate(${a})"/>`).join('')}
          <circle r="2.8" fill="#ffd34d"/>
        </g>
        ${[[50, 30], [160, 34], [66, 70], [148, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#b8b0a4"/>`).join('')}
        <path d="M92,56 q4,3 8,0 M96,50 q4,3 8,0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
      </svg>` },
    bench: { w: 0.13, svg: `
      <svg viewBox="0 0 140 125" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="120" height="12" rx="6" fill="#98d8a0"/>
        <rect x="10" y="38" width="120" height="12" rx="6" fill="#98d8a0"/>
        <rect x="8" y="58" width="124" height="16" rx="8" fill="#7ec088"/>
        <line x1="22" y1="30" x2="22" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="30" x2="118" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
        <line x1="22" y1="66" x2="22" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="66" x2="118" y2="112" stroke="#5a6b7a" stroke-width="8" stroke-linecap="round"/>
      </svg>` },
    bigtree: { w: 0.17, svg: `
      <svg viewBox="0 0 180 215" xmlns="http://www.w3.org/2000/svg">
        <path d="M82,210 L84,130 Q85,120 78,112 M98,210 L96,130 Q95,120 104,110" stroke="#a9784a" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M90,130 Q70,110 52,104 M90,124 Q110,102 128,100" stroke="#a9784a" stroke-width="10" fill="none" stroke-linecap="round"/>
        <circle cx="90" cy="72" r="52" fill="#6cc46a"/>
        <circle cx="46" cy="96" r="34" fill="#7ed47b"/>
        <circle cx="136" cy="92" r="34" fill="#7ed47b"/>
        <circle cx="64" cy="44" r="28" fill="#8fe08a"/>
        <circle cx="118" cy="42" r="26" fill="#8fe08a"/>
        ${[[70, 60], [104, 78], [88, 38], [124, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#ff6b6b"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#fff" opacity=".6"/>`).join('')}
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
        <rect x="10" y="8" width="150" height="190" rx="12" fill="#d98c5a"/>
        <rect x="20" y="18" width="130" height="170" rx="6" fill="#fff6e8"/>
        ${[0, 1, 2].map(r => `
          <rect x="20" y="${78 + r * 56 - 8}" width="130" height="8" fill="#c47a44"/>
          <g>
            <rect x="28" y="${70 + r * 56 - 14}" width="16" height="14" rx="3" fill="#ff8f9e"/>
            <rect x="48" y="${70 + r * 56 - 17}" width="14" height="17" rx="3" fill="#7ec8e3"/>
            <path d="M68,${70 + r * 56} L68,${70 + r * 56 - 20} L80,${70 + r * 56 - 20} L80,${70 + r * 56} Z" fill="#ffd166"/>
            <circle cx="98" cy="${70 + r * 56 - 8}" r="8" fill="#98d8a0"/>
            <rect x="114" y="${70 + r * 56 - 13}" width="18" height="13" rx="3" fill="#b79ced"/>
            <circle cx="140" cy="${70 + r * 56 - 9}" r="6.5" fill="#ff9f43"/>
          </g>`).join('')}
      </svg>` },
    counter: { w: 0.175, act: 'register', svg: `
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
      </svg>` },
    freezer: { w: 0.115, act: 'freezer', svg: `
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
      </svg>` },
    toypile: { w: 0.12, svg: `
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
      </svg>` }
  };

  /* 世界房间顺序（横向大房子从左到右，最右是室外） */
  const WORLD_ROOMS = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'wardrobe', 'yard', 'park', 'shop'];

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
    /* v0.7：换衣间改造 —— 删 piano（错位），加 bmirror（试衣镜）、towelrack（挂衣杆） */
    wardrobe: ['rug', 'lamp', 'plant', 'frame', 'clock', 'bmirror', 'towelrack', 'teddy',
      'st_star', 'st_flower', 'st_butterfly'],
    yard: ['swing', 'sandbox', 'tent', 'fence', 'mailbox', 'bigtree', 'plant', 'catbed',
      'st_flower', 'st_butterfly', 'st_duck', 'st_star'],
    park: ['slide', 'fountain', 'pond', 'bench', 'bigtree', 'tent', 'picnicmat', 'swing', 'mailbox',
      'st_butterfly', 'st_flower', 'st_star'],
    /* v0.7：商店扩展 —— 8 → 10 件。加 cushion（购物篮）、frame（海报） */
    shop: ['shopshelf', 'counter', 'freezer', 'toypile', 'rug', 'cushion', 'frame',
      'st_star', 'st_flower']
  };

  /* 固定装置归属（渲染在房间背景层，不可拖不可收） */
  const FIXTURES = { kitchen: ['fridge', 'stove'], wardrobe: ['wardrobecab'] };

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

  window.RoomAssets = { ITEMS, ORDER, ROOM_SETS, WORLD_ROOMS, FIXTURES, FOODS, WALLS, FLOORS, applyBg };
})();
