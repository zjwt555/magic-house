/* ============ 特效模块：星星闪光 / 彩带 / 烟雾 ============ */
(function () {
  'use strict';

  const STAR_COLORS = ['#ffd34d', '#ff9eb5', '#7ecbff', '#b79ced', '#7fe3a1'];

  function starSVG(color, size) {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
      <path d="M12 1.8l2.7 6.4 6.9.6-5.2 4.6 1.5 6.8L12 16.6l-5.9 3.6 1.5-6.8L2.4 8.8l6.9-.6z"
        fill="${color}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>`;
  }

  /* 在容器内 (x, y) 位置炸开一圈小星星 */
  function sparkles(container, x, y, count = 8) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'fx-sparkle';
      const size = 14 + Math.random() * 16;
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      el.innerHTML = starSVG(color, size);
      const sx = x - rect.left + (Math.random() - 0.5) * 30;
      const sy = y - rect.top + (Math.random() - 0.5) * 30;
      el.style.left = sx + 'px';
      el.style.top = sy + 'px';
      container.appendChild(el);
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 70;
      el.animate([
        { transform: 'translate(-50%,-50%) scale(0.2) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist - 24}px)) scale(1) rotate(${180 + Math.random() * 180}deg)`, opacity: 1, offset: 0.6 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist * 1.25}px), calc(-50% + ${Math.sin(angle) * dist - 44}px)) scale(0.1) rotate(360deg)`, opacity: 0 }
      ], { duration: 650 + Math.random() * 350, easing: 'cubic-bezier(.22,.61,.36,1)' })
        .onfinish = () => el.remove();
    }
  }

  /* 元素被收走时的小烟雾圈 */
  function poof(container, x, y) {
    sparkles(container, x, y, 5);
  }

  /* 全屏庆祝彩带（从顶上飘落） */
  function confetti(container, count = 36) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'fx-confetti';
      el.style.left = Math.random() * rect.width + 'px';
      el.style.background = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '4px';
      container.appendChild(el);
      const drift = (Math.random() - 0.5) * 160;
      const dur = 1600 + Math.random() * 1400;
      el.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${drift}px, ${rect.height + 40}px) rotate(${540 + Math.random() * 540}deg)`, opacity: 0.9 }
      ], { duration: dur, easing: 'cubic-bezier(.3,.4,.6,1)', delay: Math.random() * 500 })
        .onfinish = () => el.remove();
    }
  }

  window.FX = { sparkles, poof, confetti, starSVG };
})();
