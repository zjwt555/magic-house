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
      </svg>` }
  };

  /* 顺序即抽屉里的顺序：先大件后贴纸 */
  const ORDER = ['bed', 'sofa', 'rug', 'table', 'bookshelf', 'piano', 'lamp', 'plant', 'catbed', 'teddy', 'frame', 'clock',
    'st_star', 'st_flower', 'st_butterfly'];

  /* ---------- 墙纸 / 地板（CSS 背景） ---------- */
  const WALLS = [
    { bg: 'repeating-linear-gradient(90deg,#ffe9f2 0 42px,#ffd9ea 42px 84px)' },                     // 粉条纹
    { bg: 'radial-gradient(circle at 25% 30%,#fff 12px,transparent 13px),radial-gradient(circle at 72% 62%,#fff 16px,transparent 17px),linear-gradient(#d8f1ff,#eef9ff)', bgSize: '90px 90px' }, // 蓝天云朵
    { bg: 'radial-gradient(circle,#cdecc9 9px,transparent 10px)', bgColor: '#e8f8e8', bgSize: '38px 38px' },   // 薄荷圆点
    { bg: 'repeating-linear-gradient(45deg,#f3ecfb 0 30px,#e6d9f5 30px 60px)' },                     // 薰衣草斜纹
    { bg: 'linear-gradient(#fff2e3,#ffe3c7)' },                                                      // 蜜桃渐变
    { bg: 'repeating-linear-gradient(0deg,rgba(255,255,255,.45) 0 24px,transparent 24px 48px),repeating-linear-gradient(90deg,rgba(255,255,255,.45) 0 24px,transparent 24px 48px),#ffd9ea' } // 粉格棋盘
  ];

  const FLOORS = [
    { bg: 'repeating-linear-gradient(0deg,#e8b97e 0 30px,#dca96b 30px 34px)' },                      // 木地板
    { bg: 'radial-gradient(circle,#ffc3d8 8px,transparent 9px)', bgColor: '#ffd9ea', bgSize: '44px 44px' },   // 粉地毯
    { bg: 'repeating-linear-gradient(90deg,#bfe0f5 0 34px,#aed4f0 34px 68px)' },                     // 蓝条纹
    { bg: 'radial-gradient(circle at 50% 50%,#a8dfa0 6px,transparent 7px)', bgColor: '#b8e6a8', bgSize: '30px 30px' }, // 草地
    { bg: 'radial-gradient(circle,#fff 4px,transparent 5px)', bgColor: '#ded0f2', bgSize: '34px 34px' },     // 紫星星
    { bg: 'repeating-linear-gradient(-45deg,#f2d9a0 0 22px,#e8c983 22px 44px)' }                     // 蜂蜜黄
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

  window.RoomAssets = { ITEMS, ORDER, WALLS, FLOORS, applyBg };
})();
