/* ============ 厨房素材库：食材 / 容器 / 成品菜 / 食谱 ============ */
(function () {
  'use strict';

  /* ---------- 食材（viewBox 0 0 80 80） ---------- */
  const ING = {
    strawberry: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40,24 C56,24 64,36 60,49 C56,62 48,72 40,74 C32,72 24,62 20,49 C16,36 24,24 40,24 Z" fill="#ff6b6b"/>
        ${[[32, 38], [46, 36], [28, 50], [44, 50], [36, 60], [50, 60]].map(([x, y]) =>
          `<ellipse cx="${x}" cy="${y}" rx="2" ry="3" fill="#ffe9a8"/>`).join('')}
        <path d="M26,24 Q33,15 40,22 Q47,15 54,24 Q47,28 40,27 Q33,28 26,24 Z" fill="#7ec088"/>
        <rect x="38" y="10" width="4" height="9" rx="2" fill="#5a9e56"/>
        <ellipse cx="30" cy="34" rx="6" ry="10" fill="#fff" opacity=".22" transform="rotate(-18 30 34)"/>
      </svg>`,
    banana: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,28 Q16,62 44,66 Q64,68 69,52 Q71,47 66,50 Q58,59 43,55 Q25,50 21,29 Q20,24 15,25 Q11,26 12,28 Z" fill="#ffd166"/>
        <path d="M66,50 Q70,48 69,53" stroke="#d9a83e" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="14" cy="26" r="3.5" fill="#b98a2e"/>
      </svg>`,
    apple: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="46" r="24" fill="#ff6b6b"/>
        <rect x="38" y="14" width="4" height="12" rx="2" fill="#8a5a3a"/>
        <ellipse cx="49" cy="20" rx="10" ry="5.5" fill="#7ec088" transform="rotate(-24 49 20)"/>
        <ellipse cx="31" cy="38" rx="7" ry="11" fill="#fff" opacity=".25" transform="rotate(-16 31 38)"/>
      </svg>`,
    grape: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        ${[[36, 26], [48, 30], [28, 38], [41, 40], [54, 42], [33, 52], [47, 53], [40, 64]].map(([x, y]) =>
          `<circle cx="${x}" cy="${y}" r="9.5" fill="#9f7edb"/>`).join('')}
        <ellipse cx="40" cy="20" rx="10" ry="5" fill="#7ec088" transform="rotate(-18 40 20)"/>
        <rect x="39" y="8" width="3.5" height="10" rx="1.75" fill="#8a5a3a"/>
      </svg>`,
    orange: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="46" r="25" fill="#ff9f43"/>
        <ellipse cx="48" cy="18" rx="9" ry="5" fill="#7ec088" transform="rotate(-22 48 18)"/>
        <ellipse cx="31" cy="38" rx="7" ry="10" fill="#fff" opacity=".22" transform="rotate(-16 31 38)"/>
      </svg>`,
    watermelon: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,44 A30,30 0 0 1 70,44 Z" fill="#ff8f8f" transform="translate(0,4)"/>
        <path d="M10,44 A30,30 0 0 1 70,44 L66,48 A26,26 0 0 0 14,48 Z" fill="#98d8a0" transform="translate(0,4)"/>
        <path d="M12,48 Q12,54 18,58" stroke="#5a9e56" stroke-width="4" fill="none"/>
        ${[[28, 30], [40, 24], [52, 30], [34, 38], [46, 38]].map(([x, y]) =>
          `<ellipse cx="${x}" cy="${y + 4}" rx="2" ry="3.2" fill="#5b3a29"/>`).join('')}
      </svg>`,
    honey: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-honey-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd34d"/>
            <stop offset="60%" stop-color="#f2b730"/>
            <stop offset="100%" stop-color="#d98324"/>
          </linearGradient>
          <linearGradient id="item-honey-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e0a93c"/>
            <stop offset="100%" stop-color="#a06820"/>
          </linearGradient>
          <linearGradient id="item-honey-label" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5e8d0"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="72" rx="24" ry="3" fill="rgba(0,0,0,.12)"/>
        <rect x="20" y="26" width="40" height="42" rx="12" fill="url(#item-honey-body)" stroke="#a06820" stroke-width="2.5"/>
        <rect x="24" y="30" width="4" height="34" rx="2" fill="#fff" opacity=".55"/>
        <rect x="16" y="16" width="48" height="13" rx="6.5" fill="url(#item-honey-cap)" stroke="#7a4d1d" stroke-width="2"/>
        <rect x="20" y="18" width="40" height="3" rx="1.5" fill="#fff" opacity=".55"/>
        <rect x="20" y="22" width="40" height="2" fill="#fff" opacity=".4"/>
        <rect x="26" y="38" width="28" height="18" rx="5" fill="url(#item-honey-label)" stroke="#c9a878" stroke-width="1.5"/>
        <path d="M34,48 Q40,42 46,48" stroke="#d98324" stroke-width="3" fill="none" stroke-linecap="round"/>
        <ellipse cx="40" cy="46" rx="2.5" ry="1.5" fill="#d98324" opacity=".7"/>
        <g transform="translate(56,52)">
          <ellipse cx="0" cy="0" rx="4" ry="3" fill="#ffd34d" stroke="#a06820" stroke-width=".8"/>
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#5a3a1d" stroke-width=".8"/>
          <ellipse cx="-3" cy="-2" rx="2.5" ry="1.5" fill="#fff" opacity=".6" transform="rotate(-30 -3 -2)"/>
          <ellipse cx="3" cy="-2" rx="2.5" ry="1.5" fill="#fff" opacity=".6" transform="rotate(30 3 -2)"/>
        </g>
      </svg>`,
    noodles: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-noodles-bowl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </linearGradient>
          <linearGradient id="item-noodles-strand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff5b8"/>
            <stop offset="100%" stop-color="#d9b87a"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="56" rx="28" ry="3" fill="rgba(0,0,0,.12)"/>
        <path d="M18,20 Q26,42 22,62" stroke="url(#item-noodles-strand)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M27,20 Q35,42 31,62" stroke="url(#item-noodles-strand)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M36,20 Q44,42 40,62" stroke="url(#item-noodles-strand)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M45,20 Q53,42 49,62" stroke="url(#item-noodles-strand)" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M54,20 Q62,42 58,62" stroke="url(#item-noodles-strand)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M22,28 Q26,42 24,58" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".55"/>
        <rect x="16" y="34" width="46" height="14" rx="4" fill="url(#item-noodles-bowl)" stroke="#c4738a" stroke-width="2"/>
        <rect x="20" y="36" width="38" height="2" rx="1" fill="#fff" opacity=".55"/>
        <ellipse cx="40" cy="48" rx="22" ry="2" fill="#c4738a" opacity=".7"/>
        <circle cx="39" cy="41" r="4" fill="#fff" stroke="#c4738a" stroke-width="1.2"/>
        <circle cx="37" cy="39" r="1.2" fill="#fff" opacity=".8"/>
        <g transform="translate(64,32) rotate(20)">
          <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#bcc4cf" stroke="#7a8590" stroke-width="1"/>
          <rect x="-1" y="1" width="2" height="14" fill="#bcc4cf" stroke="#7a8590" stroke-width="1"/>
        </g>
      </svg>`,
    egg: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="46" rx="19" ry="24" fill="#fff8ee"/>
        <ellipse cx="33" cy="36" rx="6" ry="10" fill="#fff" opacity=".8" transform="rotate(-12 33 36)"/>
      </svg>`,
    tomato: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="46" r="24" fill="#ff6b6b"/>
        <path d="M40,22 L36,14 M40,22 L44,14 M40,22 L40,12" stroke="#5a9e56" stroke-width="3.5" stroke-linecap="round"/>
        <ellipse cx="31" cy="38" rx="7" ry="10" fill="#fff" opacity=".22" transform="rotate(-16 31 38)"/>
      </svg>`,
    scallion: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-scallion-white" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8f0dc"/>
          </linearGradient>
          <linearGradient id="item-scallion-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8fe08a"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </linearGradient>
          <radialGradient id="item-scallion-bg" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#d8e4c0"/>
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="76" rx="16" ry="3" fill="rgba(0,0,0,.12)"/>
        <ellipse cx="40" cy="62" rx="10" ry="13" fill="url(#item-scallion-bg)" stroke="#a8c090" stroke-width="2"/>
        <ellipse cx="36" cy="58" rx="3" ry="6" fill="#fff" opacity=".7"/>
        <line x1="36" y1="54" x2="33" y2="22" stroke="url(#item-scallion-green)" stroke-width="6" stroke-linecap="round"/>
        <line x1="44" y1="54" x2="47" y2="22" stroke="url(#item-scallion-green)" stroke-width="6" stroke-linecap="round"/>
        <line x1="40" y1="52" x2="40" y2="16" stroke="#7ed47b" stroke-width="6" stroke-linecap="round"/>
        <line x1="35" y1="50" x2="33" y2="24" stroke="#fff" stroke-width="1.2" opacity=".55"/>
        <line x1="39" y1="48" x2="40" y2="20" stroke="#fff" stroke-width="1.2" opacity=".55"/>
        <path d="M36,74 L34,79 M44,74 L46,79 M40,74 L40,79" stroke="#a8c090" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,
    carrot: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,26 Q40,20 50,26 L45,68 Q40,74 35,68 Z" fill="#ff9f43"/>
        <line x1="33" y1="38" x2="47" y2="38" stroke="#e8872e" stroke-width="3" stroke-linecap="round"/>
        <line x1="34" y1="50" x2="46" y2="50" stroke="#e8872e" stroke-width="3" stroke-linecap="round"/>
        ${[[-10, -14], [0, -18], [10, -14]].map(([tx, ty]) =>
          `<ellipse cx="${40 + tx}" cy="${24 + ty}" rx="5" ry="10" fill="#6cc46a" transform="rotate(${tx} ${40 + tx} ${24 + ty})"/>`).join('')}
      </svg>`,
    bokchoy: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-bokchoy-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8e0a0"/>
            <stop offset="100%" stop-color="#4a9a4a"/>
          </linearGradient>
          <linearGradient id="item-bokchoy-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c4e7b8"/>
            <stop offset="100%" stop-color="#7ec088"/>
          </linearGradient>
          <linearGradient id="item-bokchoy-white" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8f0dc"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="76" rx="18" ry="3" fill="rgba(0,0,0,.12)"/>
        <ellipse cx="40" cy="60" rx="13" ry="15" fill="url(#item-bokchoy-white)" stroke="#a8c090" stroke-width="2"/>
        <ellipse cx="28" cy="54" rx="7" ry="14" fill="#e8f0dc" stroke="#a8c090" stroke-width="1.5" transform="rotate(-16 28 54)"/>
        <ellipse cx="52" cy="54" rx="7" ry="14" fill="#e8f0dc" stroke="#a8c090" stroke-width="1.5" transform="rotate(16 52 54)"/>
        <path d="M40,52 L40,70" stroke="#a8c090" stroke-width=".8" fill="none" opacity=".7"/>
        <path d="M28,46 L28,62" stroke="#a8c090" stroke-width=".8" fill="none" opacity=".7" transform="rotate(-16 28 54)"/>
        <path d="M52,46 L52,62" stroke="#a8c090" stroke-width=".8" fill="none" opacity=".7" transform="rotate(16 52 54)"/>
        <ellipse cx="40" cy="34" rx="17" ry="17" fill="url(#item-bokchoy-top)" stroke="#3a8a3a" stroke-width="2"/>
        <ellipse cx="34" cy="28" rx="6" ry="4" fill="#fff" opacity=".55"/>
        <path d="M40,18 Q40,34 40,50" stroke="#3a8a3a" stroke-width="1" fill="none" opacity=".7"/>
        <path d="M28,26 Q34,32 40,34" stroke="#3a8a3a" stroke-width=".8" fill="none" opacity=".7"/>
        <path d="M52,26 Q46,32 40,34" stroke="#3a8a3a" stroke-width=".8" fill="none" opacity=".7"/>
        <ellipse cx="27" cy="40" rx="11" ry="14" fill="url(#item-bokchoy-side)" stroke="#4a9a4a" stroke-width="1.5" transform="rotate(-28 27 40)"/>
        <ellipse cx="53" cy="40" rx="11" ry="14" fill="url(#item-bokchoy-side)" stroke="#4a9a4a" stroke-width="1.5" transform="rotate(28 53 40)"/>
        <path d="M20,30 Q26,40 30,52" stroke="#4a9a4a" stroke-width=".8" fill="none" opacity=".7" transform="rotate(-28 27 40)"/>
        <path d="M60,30 Q54,40 50,52" stroke="#4a9a4a" stroke-width=".8" fill="none" opacity=".7" transform="rotate(28 53 40)"/>
      </svg>`,
    flour: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-flour-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff8e8"/>
            <stop offset="60%" stop-color="#f2e0c8"/>
            <stop offset="100%" stop-color="#d9c4a8"/>
          </linearGradient>
          <linearGradient id="item-flour-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e8d8b8"/>
            <stop offset="100%" stop-color="#a89070"/>
          </linearGradient>
          <radialGradient id="item-flour-circle" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#f5e8d0"/>
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="74" rx="22" ry="3" fill="rgba(0,0,0,.12)"/>
        <path d="M22,26 L58,26 L62,68 Q40,74 18,68 Z" fill="url(#item-flour-body)" stroke="#a89070" stroke-width="2"/>
        <path d="M26,30 Q24,50 24,68" stroke="#fff" stroke-width="1.5" fill="none" opacity=".5"/>
        <rect x="22" y="16" width="36" height="12" rx="4" fill="url(#item-flour-top)" stroke="#7a6c5a" stroke-width="2"/>
        <rect x="26" y="18" width="28" height="2" rx="1" fill="#fff" opacity=".55"/>
        <circle cx="40" cy="48" r="12" fill="url(#item-flour-circle)" stroke="#c9a878" stroke-width="1.5"/>
        <text x="40" y="53" text-anchor="middle" font-family="Comic Sans MS, cursive" font-size="14" font-weight="800" fill="#d9a83e">F</text>
        <g transform="translate(60,64)" opacity=".55">
          <ellipse cx="0" cy="0" rx="4" ry="2" fill="#e8a86b" stroke="#a06820" stroke-width=".6"/>
          <path d="M-3,-1 q2,-2 3,0" stroke="#a06820" stroke-width=".4" fill="none"/>
        </g>
      </svg>`,
    milk: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <polygon points="22,26 58,26 54,14 26,14" fill="#9ad7f0"/>
        <rect x="22" y="26" width="36" height="44" rx="4" fill="#fffdf5"/>
        <rect x="26" y="36" width="28" height="18" rx="4" fill="#bfe6ff"/>
        <circle cx="40" cy="45" r="5" fill="#fff"/>
      </svg>`,
    sugar: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-sugar-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff"/>
            <stop offset="100%" stop-color="#e8e0f2"/>
          </linearGradient>
          <linearGradient id="item-sugar-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dde3ea"/>
            <stop offset="100%" stop-color="#9aa3b0"/>
          </linearGradient>
          <radialGradient id="item-sugar-heart" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#ffd0e0"/>
            <stop offset="60%" stop-color="#ff9eb5"/>
            <stop offset="100%" stop-color="#e87aa0"/>
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="72" rx="22" ry="3" fill="rgba(0,0,0,.12)"/>
        <rect x="18" y="14" width="44" height="12" rx="6" fill="url(#item-sugar-cap)" stroke="#5a6b7a" stroke-width="2"/>
        <rect x="22" y="16" width="36" height="2" rx="1" fill="#fff" opacity=".55"/>
        <rect x="18" y="18" width="44" height="2" fill="#fff" opacity=".4"/>
        <rect x="22" y="24" width="36" height="44" rx="10" fill="url(#item-sugar-body)" stroke="#a8a0b8" stroke-width="2"/>
        <rect x="26" y="28" width="4" height="36" rx="2" fill="#fff" opacity=".7"/>
        <rect x="50" y="28" width="6" height="36" rx="3" fill="rgba(0,0,0,.05)"/>
        <path d="M40,54 C34,54 32,48 36,45 C38,43.5 40,45 40,46 C40,45 42,43.5 44,45 C48,48 46,54 40,54 Z" fill="url(#item-sugar-heart)" stroke="#c4738a" stroke-width="1.5"/>
        <ellipse cx="37" cy="47" rx="1.5" ry="1" fill="#fff" opacity=".7"/>
      </svg>`,
    butter: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="item-butter-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff5b0"/>
            <stop offset="100%" stop-color="#f2c94c"/>
          </linearGradient>
          <linearGradient id="item-butter-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd166"/>
            <stop offset="100%" stop-color="#d9a83e"/>
          </linearGradient>
          <linearGradient id="item-butter-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2c94c"/>
            <stop offset="100%" stop-color="#a06820"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="68" rx="28" ry="3" fill="rgba(0,0,0,.12)"/>
        <ellipse cx="40" cy="60" rx="26" ry="8" fill="#fff" stroke="#c9a878" stroke-width="2"/>
        <ellipse cx="34" cy="58" rx="10" ry="3" fill="#fff" opacity=".7"/>
        <path d="M20,42 L48,42 L56,50 L28,50 Z" fill="url(#item-butter-top)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
        <rect x="20" y="42" width="28" height="14" fill="url(#item-butter-front)" stroke="#c9a878" stroke-width="2"/>
        <rect x="22" y="44" width="24" height="2" rx="1" fill="#fff" opacity=".55"/>
        <path d="M48,42 L56,50 L56,64 L48,56 Z" fill="url(#item-butter-side)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
        <rect x="20" y="56" width="28" height="14" fill="url(#item-butter-front)" stroke="#c9a878" stroke-width="2"/>
        <rect x="22" y="58" width="24" height="2" rx="1" fill="#fff" opacity=".55"/>
        <path d="M48,56 L56,64 L28,64 L20,56 Z" fill="url(#item-butter-top)" stroke="#c9a878" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="32" cy="58" r=".8" fill="#fff" stroke="#c9a878" stroke-width=".4"/>
        <circle cx="38" cy="59" r=".8" fill="#fff" stroke="#c9a878" stroke-width=".4"/>
        <circle cx="44" cy="58" r=".8" fill="#fff" stroke="#c9a878" stroke-width=".4"/>
      </svg>`,
    chocolate: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="22" width="44" height="40" rx="7" fill="#8a5a3a"/>
        ${[0, 1, 2].map(i => `<line x1="${18 + (i + 1) * 11}" y1="24" x2="${18 + (i + 1) * 11}" y2="60" stroke="#6f4630" stroke-width="3"/>`).join('')}
        <line x1="19" y1="42" x2="61" y2="42" stroke="#6f4630" stroke-width="3"/>
      </svg>`,
    corn: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="38" rx="15" ry="26" fill="#ffd166"/>
        ${[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c =>
          `<rect x="${30 + c * 8}" y="${18 + r * 9}" width="5" height="5" rx="1.5" fill="#f2b730"/>`).join('')).join('')}
        <path d="M28,54 Q22,64 30,72 M52,54 Q58,64 50,72" stroke="#7ec088" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M36,60 Q32,70 38,76 M44,60 Q48,70 42,76" stroke="#98d8a0" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M32,16 Q40,8 48,16" stroke="#7ec088" stroke-width="6" fill="none" stroke-linecap="round"/>
      </svg>`,
    pineapple: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="50" rx="20" ry="24" fill="#f2a94f"/>
        ${[0, 1, 2, 3].map(i => `<path d="M22,${38 + i * 8} Q40,${44 + i * 8} 58,${38 + i * 8}" stroke="#d98c3a" stroke-width="2.6" fill="none"/>`).join('')}
        ${[0, 1, 2].map(i => `<path d="M26,${34 + i * 10} Q40,${28 + i * 10} 54,${34 + i * 10}" stroke="#d98c3a" stroke-width="2.2" fill="none"/>`).join('')}
        ${[[-14, -4], [0, -8], [14, -4]].map(([tx, ty]) =>
          `<path d="M${40 + tx * 0.4},${28 + ty} Q${40 + tx},${28 + ty - 12} ${40 + tx * 0.9},${28 + ty - 16} Q${40 + tx * 0.3},${28 + ty - 8} ${40},${28 + ty}" fill="#6cc46a"/>`).join('')}
      </svg>`,
    bread: `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M14,34 Q14,20 40,20 Q66,20 66,34 L64,56 Q40,64 16,56 Z" fill="#e8a86b"/>
        <path d="M16,40 Q28,34 40,40 M30,48 Q40,44 50,48" stroke="#d98c5a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="40" cy="24" rx="18" ry="5" fill="#f7cba0"/>
      </svg>`,
    peach: `
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
      </svg>`,  };

  /* ---------- 容器（viewBox 0 0 320 300） ---------- */
  const CONTAINERS = {
    bowl: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="118" rx="118" ry="30" fill="#cdeefc"/>
        <ellipse cx="160" cy="114" rx="104" ry="23" fill="#eaf8ff"/>
        <path d="M42,118 Q42,224 96,254 Q160,278 224,254 Q278,224 278,118 Z" fill="#dff3ff" opacity=".92"/>
        <path d="M42,118 Q42,224 96,254 Q160,278 224,254 Q278,224 278,118" fill="none" stroke="#bfe0f5" stroke-width="6"/>
        <ellipse cx="160" cy="118" rx="118" ry="30" fill="none" stroke="#bfe0f5" stroke-width="7"/>
        <ellipse cx="118" cy="170" rx="14" ry="38" fill="#fff" opacity=".5" transform="rotate(8 118 170)"/>
      </svg>`,
    pot: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M64,110 Q64,238 160,238 Q256,238 256,110 Z" fill="#a8b4bd"/>
        <ellipse cx="160" cy="110" rx="96" ry="26" fill="#8d99a3"/>
        <ellipse cx="160" cy="108" rx="82" ry="20" fill="#9ad7f0"/>
        <rect x="24" y="112" width="34" height="14" rx="7" fill="#8d99a3"/>
        <rect x="262" y="112" width="34" height="14" rx="7" fill="#8d99a3"/>
        <ellipse cx="160" cy="244" rx="70" ry="12" fill="#7f8a93" opacity=".35"/>
        <ellipse cx="122" cy="150" rx="12" ry="30" fill="#fff" opacity=".3" transform="rotate(6 122 150)"/>
      </svg>`
  };

  /* ---------- 成品菜（viewBox 0 0 320 300） ---------- */
  const DISHES = {
    salad: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="252" rx="112" ry="16" fill="rgba(120,90,60,.12)"/>
        <path d="M48,120 Q48,224 100,252 Q160,276 220,252 Q272,224 272,120 Z" fill="#dff3ff" opacity=".9"/>
        <ellipse cx="160" cy="120" rx="112" ry="28" fill="#cdeefc"/>
        ${[[110, 118, '#ff6b6b'], [140, 108, '#ff9f43'], [172, 116, '#9f7edb'], [200, 122, '#98d8a0'], [128, 132, '#ffd166'], [186, 136, '#ff8f8f'], [156, 128, '#f2d9a0'], [216, 108, '#ff6b6b']].map(([x, y, c]) =>
          `<circle cx="${x}" cy="${y}" r="15" fill="${c}"/>`).join('')}
        ${[[110, 118], [140, 108], [172, 116], [200, 122]].map(([x, y]) =>
          `<circle cx="${x - 4}" cy="${y - 4}" r="4" fill="#fff" opacity=".5"/>`).join('')}
        <ellipse cx="150" cy="96" rx="16" ry="7" fill="#7ed47b" transform="rotate(-16 150 96)"/>
        <ellipse cx="182" cy="92" rx="14" ry="6" fill="#6cc46a" transform="rotate(14 182 92)"/>
        <line x1="160" y1="86" x2="164" y2="70" stroke="#5a9e56" stroke-width="3" stroke-linecap="round"/>
        <circle cx="165" cy="66" r="10" fill="#e05555"/>
        <path d="M48,120 Q48,224 100,252 Q160,276 220,252 Q272,224 272,120" fill="none" stroke="#bfe0f5" stroke-width="6"/>
        <ellipse cx="160" cy="120" rx="112" ry="28" fill="none" stroke="#bfe0f5" stroke-width="6"/>
        <g fill="#fff"><circle cx="86" cy="86" r="4"/><circle cx="242" cy="98" r="5"/><circle cx="220" cy="60" r="3.5"/></g>
      </svg>`,
    noodles: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="252" rx="112" ry="16" fill="rgba(120,90,60,.12)"/>
        <path d="M52,118 Q52,222 102,250 Q160,272 218,250 Q268,222 268,118 Z" fill="#ff9eb5"/>
        <path d="M52,118 Q52,222 102,250 Q160,272 218,250 Q268,222 268,118" fill="none" stroke="#e05c86" stroke-width="6"/>
        <ellipse cx="160" cy="118" rx="108" ry="26" fill="#fffdf5"/>
        <ellipse cx="160" cy="118" rx="108" ry="26" fill="none" stroke="#e0cba8" stroke-width="5"/>
        ${[0, 1, 2, 3, 4, 5].map(i =>
          `<path d="M${86 + i * 18},104 Q${96 + i * 18},118 ${86 + i * 18},132" stroke="#f2d9a0" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}
        <ellipse cx="128" cy="106" rx="17" ry="12" fill="#fff"/>
        <circle cx="128" cy="106" r="7" fill="#ffd166"/>
        <circle cx="196" cy="102" r="12" fill="#ff6b6b"/>
        <circle cx="196" cy="102" r="6" fill="#ff9494"/>
        <circle cx="172" cy="128" r="4.5" fill="#7ed47b"/>
        <circle cx="204" cy="126" r="4.5" fill="#7ed47b"/>
        <circle cx="150" cy="132" r="4" fill="#7ed47b"/>
        <line x1="216" y1="58" x2="286" y2="20" stroke="#b98a5a" stroke-width="7" stroke-linecap="round"/>
        <line x1="228" y1="70" x2="298" y2="32" stroke="#a9784a" stroke-width="7" stroke-linecap="round"/>
        <path d="M96,64 Q92,50 100,38 M136,58 Q132,44 140,32" stroke="#c9d2da" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
      </svg>`,
    cake: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="256" rx="118" ry="18" fill="#fff"/>
        <ellipse cx="160" cy="252" rx="104" ry="14" fill="#f2ecf7"/>
        <rect x="76" y="176" width="168" height="72" rx="10" fill="#f7d9a8"/>
        <rect x="76" y="176" width="168" height="20" rx="10" fill="#efc98e"/>
        <rect x="92" y="120" width="136" height="64" rx="10" fill="#ffb3c7"/>
        <path d="M92,128 Q104,150 116,132 Q128,152 140,132 Q152,152 164,132 Q176,152 188,132 Q200,152 212,132 Q220,146 228,128 L228,120 L92,120 Z" fill="#ff9eb5"/>
        <path d="M76,184 Q88,206 100,188 Q112,208 124,188 Q136,208 148,188 Q160,208 172,188 Q184,208 196,188 Q208,208 220,188 Q232,206 244,184 L244,176 L76,176 Z" fill="#ff9eb5"/>
        ${[[96, 220], [116, 226], [140, 218], [166, 226], [190, 218], [214, 224], [232, 214]].map(([x, y], i) =>
          `<rect x="${x}" y="${y}" width="5" height="9" rx="2.5" fill="${['#7ecbff', '#ffd166', '#98d8a0', '#ff8f9e', '#b79ced'][i % 5]}" transform="rotate(${i * 24 - 30} ${x} ${y})"/>`).join('')}
        <path d="M40,206 C58,196 54,222 40,214 Z" fill="#ffb3c1"/>
        <path d="M280,208 C262,198 266,224 280,216 Z" fill="#ffb3c1"/>
        <g transform="translate(160,108)">
          <path d="M0,-26 C14,-26 22,-14 18,0 L-18,0 C-22,-14 -14,-26 0,-26 Z" fill="#ff6b6b"/>
          <path d="M-8,-22 Q-5,-18 -8,-14" stroke="#ffe9a8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M26,-30 L34,-46" stroke="#5a9e56" stroke-width="3.5" stroke-linecap="round"/>
          <ellipse cx="37" cy="-48" rx="7" ry="4" fill="#7ec088" transform="rotate(-30 37 -48)"/>
        </g>
        <g fill="#fff"><circle cx="60" cy="150" r="4"/><circle cx="262" cy="162" r="5"/><circle cx="246" cy="120" r="3.5"/></g>
      </svg>`,
    juice: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="262" rx="80" ry="14" fill="rgba(120,90,60,.12)"/>
        <path d="M110,80 L210,80 L196,240 Q160,254 124,240 Z" fill="rgba(223,243,255,.65)" stroke="#bfe0f5" stroke-width="6"/>
        <path d="M118,120 L202,120 L194,236 Q160,248 126,236 Z" fill="#ffb347"/>
        <ellipse cx="160" cy="118" rx="43" ry="10" fill="#ffd07a"/>
        <ellipse cx="160" cy="118" rx="43" ry="10" fill="none" stroke="#f2a23e" stroke-width="3"/>
        <circle cx="140" cy="160" r="5" fill="#ffd07a" opacity=".8"/>
        <circle cx="176" cy="188" r="4" fill="#ffd07a" opacity=".8"/>
        <circle cx="150" cy="205" r="4" fill="#ffd07a" opacity=".8"/>
        <line x1="186" y1="104" x2="228" y2="30" stroke="#ff8f9e" stroke-width="10" stroke-linecap="round"/>
        <line x1="186" y1="104" x2="228" y2="30" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-dasharray="6 14"/>
        <g transform="translate(110,78)">
          <circle r="20" fill="#ff9f43"/>
          <path d="M0,-20 A20,20 0 0 1 0,20 Z" fill="#ffbe6b"/>
          <circle r="16" fill="none" stroke="#e8872e" stroke-width="2.5"/>
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#e8872e" stroke-width="2"/>
        </g>
        <g fill="#fff"><circle cx="236" cy="140" r="4"/><circle cx="90" cy="150" r="5"/><circle cx="250" cy="190" r="3.5"/></g>
      </svg>`,
    icecream: `
      <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="262" rx="86" ry="14" fill="rgba(120,90,60,.12)"/>
        <path d="M104,138 L216,138 L160,252 Z" fill="#e8a86b"/>
        <path d="M118,160 L206,160 M124,184 L198,184 M132,208 L190,208" stroke="#d1924f" stroke-width="4" stroke-linecap="round"/>
        <circle cx="126" cy="112" r="32" fill="#ff9eb5"/>
        <circle cx="194" cy="112" r="32" fill="#98d8a0"/>
        <circle cx="160" cy="86" r="34" fill="#fff5e6"/>
        <circle cx="116" cy="102" r="7" fill="#fff" opacity=".6"/>
        <circle cx="184" cy="100" r="7" fill="#fff" opacity=".6"/>
        <line x1="160" y1="52" x2="160" y2="38" stroke="#5a9e56" stroke-width="3.5"/>
        <circle cx="160" cy="32" r="10" fill="#e05555"/>
        <circle cx="156" cy="28" r="3" fill="#fff" opacity=".7"/>
        ${[[126, 100], [140, 118], [160, 74], [178, 96], [196, 118], [150, 100]].map(([x, y], i) =>
          `<rect x="${x}" y="${y}" width="4" height="9" rx="2" fill="${['#7ecbff', '#ffd166', '#b79ced'][i % 3]}" transform="rotate(${i * 50} ${x} ${y})"/>`).join('')}
      </svg>`
  };

  /* ---------- 食谱卡片图标（viewBox 0 0 120 120） ---------- */
  const ICONS = {
    salad: `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,48 Q20,92 60,92 Q100,92 100,48 Z" fill="#dff3ff"/>
        <ellipse cx="60" cy="48" rx="40" ry="11" fill="#cdeefc"/>
        <circle cx="44" cy="46" r="9" fill="#ff6b6b"/>
        <circle cx="62" cy="42" r="9" fill="#ff9f43"/>
        <circle cx="78" cy="47" r="9" fill="#9f7edb"/>
        <circle cx="56" cy="34" r="6" fill="#e05555"/>
        <ellipse cx="52" cy="28" rx="8" ry="4" fill="#7ed47b" transform="rotate(-14 52 28)"/>
      </svg>`,
    noodles: `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M22,50 Q22,92 60,92 Q98,92 98,50 Z" fill="#ff9eb5"/>
        <ellipse cx="60" cy="50" rx="38" ry="10" fill="#fffdf5"/>
        ${[0, 1, 2, 3].map(i => `<path d="M${40 + i * 12},45 Q${47 + i * 12},50 ${40 + i * 12},55" stroke="#f2d9a0" stroke-width="4.5" fill="none" stroke-linecap="round"/>`).join('')}
        <circle cx="72" cy="42" r="5" fill="#ff6b6b"/>
        <line x1="80" y1="30" x2="106" y2="12" stroke="#b98a5a" stroke-width="5" stroke-linecap="round"/>
        <line x1="88" y1="38" x2="114" y2="20" stroke="#a9784a" stroke-width="5" stroke-linecap="round"/>
      </svg>`,
    cake: `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="98" rx="46" ry="8" fill="#fff"/>
        <rect x="26" y="68" width="68" height="30" rx="6" fill="#f7d9a8"/>
        <rect x="32" y="42" width="56" height="28" rx="6" fill="#ffb3c7"/>
        <path d="M32,46 Q39,56 46,47 Q53,57 60,47 Q67,57 74,47 Q81,56 88,46 L88,42 L32,42 Z" fill="#ff9eb5"/>
        <g transform="translate(60,36)">
          <path d="M0,-14 C8,-14 12,-6 9,2 L-9,2 C-12,-6 -8,-14 0,-14 Z" fill="#ff6b6b"/>
          <rect x="-1.5" y="-26" width="3" height="12" rx="1.5" fill="#e05c86"/>
          <ellipse cy="-29" rx="4" ry="5.5" fill="#ffd34d"/>
        </g>
      </svg>`,
    juice: `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M38,34 L82,34 L74,94 Q60,100 46,94 Z" fill="rgba(223,243,255,.7)" stroke="#bfe0f5" stroke-width="4"/>
        <path d="M42,48 L78,48 L72,92 Q60,97 48,92 Z" fill="#ffb347"/>
        <ellipse cx="60" cy="47" rx="19" ry="5" fill="#ffd07a"/>
        <line x1="74" y1="40" x2="92" y2="12" stroke="#ff8f9e" stroke-width="6" stroke-linecap="round"/>
        <circle cx="38" cy="32" r="9" fill="#ff9f43"/>
        <path d="M38,24 A9,9 0 0 1 38,40 Z" fill="#ffbe6b"/>
      </svg>`,
    icecream: `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M36,54 L84,54 L60,104 Z" fill="#e8a86b"/>
        <path d="M42,66 L78,66 M46,78 L74,78" stroke="#d1924f" stroke-width="3" stroke-linecap="round"/>
        <circle cx="47" cy="44" r="14" fill="#ff9eb5"/>
        <circle cx="73" cy="44" r="14" fill="#98d8a0"/>
        <circle cx="60" cy="32" r="15" fill="#fff5e6"/>
        <circle cx="60" cy="14" r="5" fill="#e05555"/>
        <line x1="60" y1="17" x2="60" y2="12" stroke="#5a9e56" stroke-width="2.5"/>
      </svg>`
  };

  /* ---------- 食谱定义 ---------- */
  const RECIPES = [
    {
      id: 'salad', name: '水果沙拉', container: 'bowl', dish: 'salad',
      ingredients: ['strawberry', 'banana', 'apple', 'grape', 'orange', 'watermelon', 'honey'],
      praise: '水果沙拉做好啦！'
    },
    {
      id: 'noodles', name: '煮面条', container: 'pot', dish: 'noodles',
      ingredients: ['noodles', 'egg', 'tomato', 'scallion', 'carrot', 'bokchoy'],
      praise: '香喷喷的面条煮好啦！'
    },
    {
      id: 'cake', name: '小蛋糕', container: 'bowl', dish: 'cake',
      ingredients: ['flour', 'egg', 'milk', 'sugar', 'butter', 'chocolate', 'strawberry'],
      praise: '小蛋糕烤好啦！'
    },
    {
      id: 'juice', name: '鲜榨果汁', container: 'bowl', dish: 'juice',
      ingredients: ['orange', 'apple', 'strawberry', 'grape', 'carrot', 'honey', 'peach'],
      praise: '鲜榨果汁做好啦！'
    },
    {
      id: 'icecream', name: '冰淇淋', container: 'bowl', dish: 'icecream',
      ingredients: ['milk', 'sugar', 'strawberry', 'chocolate', 'banana', 'peach', 'corn'],
      praise: '冰淇淋做好啦，凉丝丝！'
    }
  ];

  window.KitchenAssets = { ING, CONTAINERS, DISHES, ICONS, RECIPES };
})();
