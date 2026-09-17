/* ============ 主入口：屏幕管理 + 主界面大房子 ============ */
(function () {
  'use strict';

  /* ---------- 屏幕管理 ---------- */
  const screens = {};   // id -> { el, module }
  let currentId = null;

  function showScreen(id) {
    if (currentId === id) return;
    const prev = currentId ? screens[currentId] : null;
    const next = screens[id];
    if (!next) return;
    if (prev && prev.module && prev.module.onLeave) prev.module.onLeave();
    prev && prev.el.classList.remove('active');
    next.el.classList.add('active');
    currentId = id;
    if (next.module && next.module.onEnter) next.module.onEnter();
  }

  function register(id, module) {
    const el = document.getElementById('screen-' + id);
    screens[id] = { el, module };
    if (module && module.init) module.init(el);
  }

  /* ---------- 禁长按菜单 / 禁拖拽 ---------- */
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  /* ---------- 通用：左上角回家按钮 ---------- */
  window.homeButtonHTML = `
    <button class="btn-home" aria-label="回家">
      <svg viewBox="0 0 48 48">
        <path d="M24 6L5 22h6v18a2 2 0 0 0 2 2h8V30h6v12h8a2 2 0 0 0 2-2V22h6z"
          fill="#fff" stroke="#d16a89" stroke-width="2.4" stroke-linejoin="round"/>
        <rect x="21.5" y="15" width="5" height="6" rx="2" fill="#ffd0dd"/>
      </svg>
    </button>`;
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-home');
    if (btn) { Sound.door(); showScreen('home'); }
  });

  /* 通用：首次进入某界面时语音引导一次 */
  window.hintOnce = function (id, text) {
    const s = Store.state;
    if (s.hints[id]) return;
    s.hints[id] = true;
    Store.save();
    setTimeout(() => Sound.praise(text), 700);
  };

  /* ---------- 主界面：房子场景 ---------- */
  const HELP_HTML = `
    <div class="help-overlay hidden">
      <div class="help-card">
        <h3>📖 给家长的小指南</h3>
        <ul>
          <li>👗 <b>换装</b>：点下方分类标签（发型/发色/裙子/鞋子/配饰/小猫），再点物品即可穿上</li>
          <li>🛏️ <b>布置房间</b>：点下方家具放进房间；<b>按住家具拖动</b>可以换位置</li>
          <li>🗑 <b>收走家具</b>：① 把家具<b>拖到屏幕下方的收纳筐</b>；② 或点左下角垃圾桶按钮，再点要收走的家具</li>
          <li>🍳 <b>做饭</b>：选菜谱 → 点食材放进锅 → 手指在锅里<b>画圈搅拌</b> → 点魔法按钮 → 喂给娃娃或小猫</li>
          <li>💾 装扮和房间<b>自动保存</b>，下次打开还是原样</li>
          <li>📱 <b>iPad/iPhone</b>：用 Safari 打开网址 → 分享 → <b>添加到主屏幕</b>，即可全屏离线玩</li>
        </ul>
        <button class="help-close">知道了</button>
      </div>
    </div>`;

  const SOUND_ON_SVG = `
    <svg viewBox="0 0 36 36">
      <path d="M6,14 L12,14 L20,7 L20,29 L12,22 L6,22 Z" fill="#fff"/>
      <path d="M25,12 Q29,18 25,24 M28,8 Q34,18 28,28" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;
  const SOUND_OFF_SVG = `
    <svg viewBox="0 0 36 36">
      <path d="M6,14 L12,14 L20,7 L20,29 L12,22 L6,22 Z" fill="#fff"/>
      <line x1="24" y1="13" x2="33" y2="23" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="33" y1="13" x2="24" y2="23" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`;
  const HOME_SVG = `
  <svg class="home-scene" viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg">
    <!-- 太阳 -->
    <g transform="translate(96,96)">
      <g class="sun-rays">
        ${Array.from({ length: 8 }, (_, i) => {
          const a = i * 45;
          return `<line x1="0" y1="-52" x2="0" y2="-66" stroke="#ffcf4d" stroke-width="7" stroke-linecap="round" transform="rotate(${a})"/>`;
        }).join('')}
      </g>
      <circle r="40" fill="#ffd34d" stroke="#ffb830" stroke-width="5"/>
      <circle cx="-12" cy="-4" r="4" fill="#8a5a12"/>
      <circle cx="12" cy="-4" r="4" fill="#8a5a12"/>
      <path d="M-12 8 Q0 18 12 8" stroke="#8a5a12" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
    <!-- 云朵（飘动） -->
    <g class="home-cloud" transform="translate(60,70)">
      <ellipse cx="0" cy="16" rx="52" ry="20" fill="#fff"/>
      <ellipse cx="-26" cy="8" rx="26" ry="16" fill="#fff"/>
      <ellipse cx="24" cy="6" rx="30" ry="18" fill="#fff"/>
    </g>
    <g class="home-cloud c2" transform="translate(-80,150)" opacity=".85">
      <ellipse cx="0" cy="12" rx="42" ry="16" fill="#fff"/>
      <ellipse cx="28" cy="4" rx="24" ry="14" fill="#fff"/>
    </g>
    <!-- 草地 -->
    <rect x="0" y="520" width="900" height="120" fill="#a8e6a1"/>
    <rect x="0" y="516" width="900" height="12" fill="#8ed488" rx="6"/>
    <!-- 小路 -->
    <polygon points="408,528 492,528 560,640 340,640" fill="#f2d9a0"/>
    <line x1="400" y1="560" x2="500" y2="560" stroke="#dcbf85" stroke-width="4"/>
    <line x1="385" y1="596" x2="515" y2="596" stroke="#dcbf85" stroke-width="4"/>
    <!-- 灌木 -->
    <g>
      <ellipse cx="90" cy="528" rx="46" ry="26" fill="#6cc46a"/>
      <ellipse cx="62" cy="536" rx="30" ry="20" fill="#7ed47b"/>
      <ellipse cx="812" cy="530" rx="42" ry="24" fill="#6cc46a"/>
      <ellipse cx="842" cy="538" rx="28" ry="18" fill="#7ed47b"/>
    </g>
    <!-- 花 -->
    ${[[170, 556, '#ff9eb5'], [250, 580, '#ffd34d'], [700, 566, '#b79ced'], [770, 590, '#ff9eb5'], [620, 596, '#ff8f7a']].map(([x, y, c]) => `
      <g transform="translate(${x},${y})">
        <line x1="0" y1="0" x2="0" y2="16" stroke="#4e9e4a" stroke-width="3.5" stroke-linecap="round"/>
        ${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-8" rx="4.5" ry="7" fill="${c}" transform="rotate(${a})"/>`).join('')}
        <circle r="4" fill="#fff3c9"/>
      </g>`).join('')}
    <!-- 小猫 -->
    <g transform="translate(772,468)">
      <path d="M-24 18 Q-52 12 -48 -14" stroke="#f2a65a" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="8" rx="26" ry="30" fill="#f7b967"/>
      <circle cx="0" cy="-32" r="21" fill="#f7b967"/>
      <polygon points="-19,-44 -15,-62 -4,-48" fill="#f7b967"/>
      <polygon points="19,-44 15,-62 4,-48" fill="#f7b967"/>
      <polygon points="-16.5,-47 -14,-57 -8,-49" fill="#ffb3c1"/>
      <polygon points="16.5,-47 14,-57 8,-49" fill="#ffb3c1"/>
      <path d="M-8 -34 Q-5 -31 -2 -34" stroke="#7a4d1d" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M2 -34 Q5 -31 8 -34" stroke="#7a4d1d" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M-5 -25 Q0 -21 5 -25" stroke="#7a4d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <circle cx="-13" cy="-27" r="3.4" fill="#ff9eb5" opacity=".7"/>
      <circle cx="13" cy="-27" r="3.4" fill="#ff9eb5" opacity=".7"/>
      <line x1="-18" y1="-24" x2="-34" y2="-27" stroke="#d98c4a" stroke-width="2"/>
      <line x1="-18" y1="-21" x2="-33" y2="-18" stroke="#d98c4a" stroke-width="2"/>
      <line x1="18" y1="-24" x2="34" y2="-27" stroke="#d98c4a" stroke-width="2"/>
      <line x1="18" y1="-21" x2="33" y2="-18" stroke="#d98c4a" stroke-width="2"/>
    </g>
    <!-- 蝴蝶 -->
    <g class="door-hint" transform="translate(300,590)">
      <ellipse cx="-9" cy="-4" rx="9" ry="12" fill="#7ecbff" transform="rotate(-24 -9 -4)"/>
      <ellipse cx="9" cy="-4" rx="9" ry="12" fill="#7ecbff" transform="rotate(24 9 -4)"/>
      <ellipse cx="0" cy="2" rx="3.4" ry="9" fill="#5a6b7a"/>
    </g>
    <!-- 房子 -->
    <g>
      <rect x="585" y="118" width="46" height="96" rx="6" fill="#e8a0bf"/>
      <rect x="576" y="104" width="64" height="20" rx="10" fill="#fff"/>
      <circle class="door-hint" cx="608" cy="86" r="8" fill="#e9e4ef"/>
      <circle class="door-hint" cx="622" cy="70" r="6" fill="#e9e4ef"/>
      <polygon points="135,240 450,72 765,240" fill="#b98cd9" stroke="#a06fc6" stroke-width="3" stroke-linejoin="round"/>
      <rect x="126" y="228" width="648" height="20" rx="10" fill="#fff" stroke="#ecd9ee" stroke-width="2"/>
      <circle cx="450" cy="170" r="26" fill="#cdf0ff" stroke="#fff" stroke-width="5"/>
      <line x1="424" y1="170" x2="476" y2="170" stroke="#fff" stroke-width="4"/>
      <line x1="450" y1="144" x2="450" y2="196" stroke="#fff" stroke-width="4"/>
      <rect x="170" y="240" width="560" height="290" rx="12" fill="#fff3f7" stroke="#f0c4d4" stroke-width="3"/>
      <rect x="170" y="514" width="560" height="16" rx="8" fill="#f5dbe7"/>
      <!-- 两扇圆窗 -->
      ${[[230, 310], [670, 310]].map(([x, y]) => `
        <g>
          <circle cx="${x}" cy="${y}" r="32" fill="#cdf0ff" stroke="#fff" stroke-width="6"/>
          <line x1="${x - 32}" y1="${y}" x2="${x + 32}" y2="${y}" stroke="#fff" stroke-width="4.5"/>
          <line x1="${x}" y1="${y - 32}" x2="${x}" y2="${y + 32}" stroke="#fff" stroke-width="4.5"/>
          <rect x="${x - 27}" y="${y + 30}" width="54" height="11" rx="5" fill="#b97f4e"/>
          <circle cx="${x - 14}" cy="${y + 30}" r="4.5" fill="#ff9eb5"/>
          <circle cx="${x}" cy="${y + 29}" r="4.5" fill="#ffd34d"/>
          <circle cx="${x + 14}" cy="${y + 30}" r="4.5" fill="#ff9eb5"/>
        </g>`).join('')}
      <!-- 三扇门：卧室 / 衣帽间 / 厨房 -->
      <g class="door-group" data-target="room">
        <path d="M237,530 V393 Q237,362 300,362 Q363,362 363,393 V530 Z" fill="#fff"/>
        <path d="M245,530 V396 Q245,368 300,368 Q355,368 355,396 V530 Z" fill="#7ec8e3"/>
        <circle cx="300" cy="428" r="33" fill="#ffffff" opacity=".96"/>
        <g transform="translate(300,428)">
          <rect x="-24" y="-13" width="9" height="27" rx="4" fill="#2f7fa3"/>
          <rect x="-24" y="1" width="48" height="13" rx="6" fill="#4aa3c9"/>
          <rect x="16" y="-8" width="8" height="22" rx="4" fill="#2f7fa3"/>
          <rect x="-19" y="-8" width="12" height="7" rx="3.5" fill="#fff"/>
          <rect x="-21" y="14" width="5" height="7" fill="#2f7fa3"/>
          <rect x="17" y="14" width="5" height="7" fill="#2f7fa3"/>
        </g>
        <circle cx="343" cy="468" r="6" fill="#fff" opacity=".85"/>
      </g>
      <g class="door-group" data-target="dressup">
        <path d="M387,530 V393 Q387,362 450,362 Q513,362 513,393 V530 Z" fill="#fff"/>
        <path d="M395,530 V396 Q395,368 450,368 Q505,368 505,396 V530 Z" fill="#ff9eb5"/>
        <circle cx="450" cy="428" r="33" fill="#ffffff" opacity=".96"/>
        <g transform="translate(450,428)">
          <path d="M-9,-21 L-14,-4 L-23,15 Q0,25 23,15 L14,-4 L9,-21 Q0,-15 -9,-21 Z" fill="#e05c86"/>
          <circle cx="0" cy="-3" r="4.5" fill="#ffd0e0"/>
          <path d="M-9,-21 Q0,-26 9,-21" stroke="#e05c86" stroke-width="4" fill="none" stroke-linecap="round"/>
        </g>
        <circle cx="493" cy="468" r="6" fill="#fff" opacity=".85"/>
      </g>
      <g class="door-group" data-target="kitchen">
        <path d="M537,530 V393 Q537,362 600,362 Q663,362 663,393 V530 Z" fill="#fff"/>
        <path d="M545,530 V396 Q545,368 600,368 Q655,368 655,396 V530 Z" fill="#ffcf4d"/>
        <circle cx="600" cy="428" r="33" fill="#ffffff" opacity=".96"/>
        <g transform="translate(600,428)">
          <path d="M-19,-11 L19,-11 L15,14 Q0,18 -15,14 Z" fill="#d98324"/>
          <ellipse cx="0" cy="-12" rx="16" ry="5.5" fill="#f2a94f"/>
          <circle cx="0" cy="-18" r="4" fill="#fff"/>
          <circle cx="-23" cy="0" r="4" fill="#d98324"/>
          <circle cx="23" cy="0" r="4" fill="#d98324"/>
          <path d="M-8,-26 Q-6,-31 -8,-35" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9"/>
          <path d="M4,-26 Q6,-31 4,-35" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9"/>
        </g>
        <circle cx="643" cy="468" r="6" fill="#fff" opacity=".85"/>
      </g>
    </g>
  </svg>`;

  const Home = {
    init(el) {
      el.innerHTML = `
        <div class="home-title">魔法小屋</div>
        <div class="home-corner">
          <button class="btn-corner btn-sound" aria-label="声音开关"></button>
          <button class="btn-corner btn-help" aria-label="玩法说明">
            <svg viewBox="0 0 36 36">
              <text x="18" y="26" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">?</text>
            </svg>
          </button>
        </div>` + HOME_SVG + HELP_HTML;

      /* 声音开关 */
      const soundBtn = el.querySelector('.btn-sound');
      const syncSoundIcon = () => {
        soundBtn.innerHTML = Store.state.sound ? SOUND_ON_SVG : SOUND_OFF_SVG;
        soundBtn.classList.toggle('off', !Store.state.sound);
      };
      syncSoundIcon();
      soundBtn.addEventListener('click', () => {
        Store.state.sound = !Store.state.sound;
        Store.save();
        syncSoundIcon();
        if (Store.state.sound) { Sound.chime(); Sound.praise('声音开啦'); }
      });

      /* 家长指南 */
      const overlay = el.querySelector('.help-overlay');
      el.querySelector('.btn-help').addEventListener('click', () => { Sound.pop(); overlay.classList.remove('hidden'); });
      overlay.querySelector('.help-close').addEventListener('click', () => { Sound.pop(); overlay.classList.add('hidden'); });
      overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('hidden'); });

      el.querySelectorAll('.door-group').forEach(door => {
        door.addEventListener('click', e => {
          Sound.door();
          FX.sparkles(el, e.clientX, e.clientY, 10);
          const target = door.getAttribute('data-target');
          setTimeout(() => showScreen(target), 260);
        });
      });
    },
    onEnter() {
      window.hintOnce('home', '欢迎来到魔法小屋！推开一扇门进去玩吧');
    }
  };

  /* ---------- 启动 ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    Store.load();
    register('home', Home);
    register('dressup', window.DressUp);
    register('room', window.Room);
    register('kitchen', window.Kitchen);
    currentId = 'home';
    // 调试/测试直达：?screen=dressup|room|kitchen
    const m = location.search.match(/[?&]screen=(\w+)/);
    if (m && screens[m[1]]) showScreen(m[1]);
  });
})();
