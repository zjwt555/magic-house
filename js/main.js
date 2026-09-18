/* ============ 主入口：屏幕管理 + 主界面大房子 ============ */
(function () {
  'use strict';

  /* ---------- 屏幕管理（world 常驻 + overlay 悬浮） ---------- */
  const screens = {};   // id -> { el, module }
  let currentId = null;
  const OVERLAYS = ['dressup', 'kitchen'];   // 悬浮在世界之上的面板

  function showScreen(id) {
    if (currentId === id && id !== 'home') return;
    const next = screens[id];
    if (!next) return;
    const prev = currentId ? screens[currentId] : null;

    if (OVERLAYS.includes(id)) {
      /* overlay：world 保持激活，面板盖在上面 */
      if (prev && prev.module && prev.module.onLeave && currentId !== 'world') prev.module.onLeave();
      OVERLAYS.forEach(o => screens[o] && screens[o].el.classList.remove('active'));
      next.el.classList.add('active');
      currentId = id;
    } else {
      /* home / world：收掉所有 overlay */
      OVERLAYS.forEach(o => {
        const s = screens[o];
        if (s && s.el.classList.contains('active')) {
          s.el.classList.remove('active');
          if (s.module && s.module.onLeave) s.module.onLeave();
        }
      });
      if (prev && prev.el !== next.el) {
        prev.el.classList.remove('active');
        if (prev.module && prev.module.onLeave) prev.module.onLeave();
      }
      next.el.classList.add('active');
      currentId = id;
      if (id === 'world') {
        Store.state.lastRoom = window.World.currentRoomId;
        Store.save();
      }
    }
    if (next.module && next.module.onEnter) next.module.onEnter();
  }
  window.showScreen = showScreen;

  function register(id, module) {
    const el = document.getElementById('screen-' + id);
    screens[id] = { el, module };
    if (module && module.init) module.init(el);
  }

  /* ---------- 禁长按菜单 / 禁拖拽 ---------- */
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  /* ---------- 通用：左上角回家按钮 + 换房间按钮 ---------- */
  window.homeButtonHTML = `
    <button class="btn-home" aria-label="回家">
      <svg viewBox="0 0 48 48">
        <path d="M24 6L5 22h6v18a2 2 0 0 0 2 2h8V30h6v12h8a2 2 0 0 0 2-2V22h6z"
          fill="#fff" stroke="#d16a89" stroke-width="2.4" stroke-linejoin="round"/>
        <rect x="21.5" y="15" width="5" height="6" rx="2" fill="#ffd0dd"/>
      </svg>
    </button>`;
  window.roomsButtonHTML = `
    <button class="btn-rooms" aria-label="换房间">
      <svg viewBox="0 0 48 48">
        <path d="M10 42V20a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v22" fill="#fff" stroke="#4f9cc0" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M16 40V28a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12" fill="#9ad7f0" stroke="#4f9cc0" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="24" cy="15" r="2.6" fill="#ffd34d"/>
        <path d="M24 6l1.4 3.4 3.6.3-2.7 2.3.8 3.5-3.1-1.9-3.1 1.9.8-3.5-2.7-2.3 3.6-.3z" fill="#ffd34d"/>
      </svg>
    </button>`;
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-home');
    if (btn) { Sound.door(); showScreen('home'); }
  });

  /* ---------- 房间跳转弹出条（7 间房，点选后相机直达） ---------- */
  const ROOM_ICONS = {
    balcony: { label: '阳台', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="6" y="10" width="36" height="30" rx="4" fill="#dff3ff" stroke="#9ad7f0" stroke-width="2.5"/>
        <line x1="24" y1="10" x2="24" y2="40" stroke="#9ad7f0" stroke-width="2.5"/>
        <line x1="6" y1="25" x2="42" y2="25" stroke="#9ad7f0" stroke-width="2.5"/>
        <circle cx="15" cy="18" r="4" fill="#ff9eb5"/>
        <circle cx="33" cy="33" r="4" fill="#ffd34d"/>
        <path d="M10,6 L38,6" stroke="#c98443" stroke-width="3" stroke-linecap="round"/>
      </svg>` },
    room: { label: '卧室', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="8" y="22" width="8" height="18" rx="3" fill="#2f7fa3"/>
        <rect x="8" y="32" width="32" height="10" rx="4" fill="#4aa3c9"/>
        <rect x="30" y="26" width="8" height="16" rx="3" fill="#2f7fa3"/>
        <rect x="12" y="28" width="11" height="6" rx="3" fill="#fff"/>
      </svg>` },
    bathroom: { label: '卫生间', svg: `
      <svg viewBox="0 0 48 48">
        <path d="M8 22h32l-3 14q-13 4-26 0z" fill="#fdfdff" stroke="#b8ccd8" stroke-width="2.4"/>
        <rect x="6" y="19" width="36" height="6" rx="3" fill="#b8ccd8"/>
        <circle cx="16" cy="16" r="4.5" fill="#fff" opacity=".95"/>
        <circle cx="25" cy="13" r="3.5" fill="#fff" opacity=".95"/>
        <g transform="translate(33,12)"><circle r="4" fill="#ffd34d"/><polygon points="3,0 7,1 3.5,3" fill="#ff9f43"/></g>
      </svg>` },
    living: { label: '客厅', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="6" y="14" width="36" height="14" rx="6" fill="#6bb8d8"/>
        <rect x="4" y="20" width="8" height="14" rx="4" fill="#7ec8e3"/>
        <rect x="36" y="20" width="8" height="14" rx="4" fill="#7ec8e3"/>
        <rect x="10" y="24" width="28" height="10" rx="4" fill="#9ad7f0"/>
        <rect x="8" y="34" width="32" height="5" rx="2.5" fill="#6bb8d8"/>
      </svg>` },
    kitchen: { label: '厨房', svg: `
      <svg viewBox="0 0 48 48">
        <path d="M10 20h28l-4 18q-10 4-20 0z" fill="#d98324"/>
        <ellipse cx="24" cy="19" rx="12" ry="4" fill="#f2a94f"/>
        <circle cx="24" cy="13" r="3" fill="#fff"/>
        <path d="M18 8q-2-4 0-7 M30 8q2-4 0-7" stroke="#bde0f5" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      </svg>` },
    study: { label: '书房', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="6" y="26" width="36" height="5" rx="2.5" fill="#d98c5a"/>
        <rect x="10" y="31" width="5" height="11" rx="2" fill="#c47a44"/>
        <rect x="33" y="31" width="5" height="11" rx="2" fill="#c47a44"/>
        <rect x="14" y="12" width="20" height="14" rx="2" fill="#4a4a55"/>
        <rect x="17" y="15" width="14" height="8" rx="1.5" fill="#9ad7f0"/>
        <circle cx="38" cy="16" r="4.5" fill="#98d8a0"/>
      </svg>` },
    dressup: { label: '换衣间', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="8" y="10" width="32" height="30" rx="4" fill="#e8a3bd"/>
        <line x1="24" y1="12" x2="24" y2="38" stroke="#d98cb0" stroke-width="2.5"/>
        <path d="M14 20 l-2 4 -4 6 q6 3 12 0 l-4 -6 -2 -4 z" fill="#e05c86" transform="translate(2,2)"/>
        <path d="M28 20 l-2 4 -4 6 q6 3 12 0 l-4 -6 -2 -4 z" fill="#7ec8e3" transform="translate(2,2)"/>
      </svg>` }
  };
  const PICK_ORDER = ['balcony', 'room', 'bathroom', 'living', 'kitchen', 'study', 'dressup'];

  let roomPickerEl = null;

  function toggleRoomPicker(forceClose) {
    if (!roomPickerEl) {
      roomPickerEl = document.createElement('div');
      roomPickerEl.className = 'room-picker hidden';
      roomPickerEl.innerHTML = `<div class="room-picker-row">${
        PICK_ORDER.map(id => `
          <button class="room-pick" data-room="${id}">
            ${ROOM_ICONS[id].svg}<span>${ROOM_ICONS[id].label}</span>
          </button>`).join('')
      }<button class="room-pick-close" aria-label="关闭">✕</button></div>`;
      roomPickerEl.addEventListener('click', e => {
        if (e.target === roomPickerEl) { roomPickerEl.classList.add('hidden'); return; }
        const close = e.target.closest('.room-pick-close');
        if (close) { Sound.pop(); roomPickerEl.classList.add('hidden'); return; }
        const pick = e.target.closest('.room-pick');
        if (pick) {
          Sound.door();
          roomPickerEl.classList.add('hidden');
          const target = pick.dataset.room === 'room' ? 'room' : pick.dataset.room;
          /* 从 overlay 跳房间：先回世界再平移相机 */
          showScreen('world');
          window.World.jumpTo(target);
        }
      });
      document.getElementById('app').appendChild(roomPickerEl);
    }
    if (forceClose) {
      roomPickerEl.classList.add('hidden');
    } else {
      roomPickerEl.classList.toggle('hidden');
      Sound.pop();
    }
  }
  document.addEventListener('click', e => {
    if (e.target.closest('.btn-rooms')) toggleRoomPicker();
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
          <li>🏠 <b>大世界</b>：进门后是 7 间房的横向大房子，<b>手指左右拖动</b>看世界；点左上角小门按钮可直达任意房间</li>
          <li>🚶 <b>娃娃会走路</b>：点一下地板娃娃就走过去；<b>按住娃娃/小猫</b>可以拎到任何房间</li>
          <li>👗 <b>换装</b>：去换衣间点<b>大衣柜</b>，点分类标签再点衣服即可穿上</li>
          <li>🛏️ <b>布置房间</b>：点下方家具放进房间，按住拖动换位置；卫生间里<b>点点浴缸</b>会冒泡泡</li>
          <li>🍎 <b>喂食</b>：去厨房点<b>冰箱</b>拿水果牛奶，拖到娃娃或小猫嘴边就吃掉；点<b>灶台</b>还能做饭</li>
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
      <!-- 一扇大门 -->
      <g class="door-group door-big" data-target="lastRoom">
        <path d="M338,530 V372 Q338,336 450,336 Q562,336 562,372 V530 Z" fill="#fff"/>
        <path d="M348,530 V376 Q348,344 450,344 Q552,344 552,376 V530 Z" fill="#ff9eb5"/>
        <path d="M348,530 V376 Q348,344 450,344 Q552,344 552,376 V530" fill="none" stroke="#e05c86" stroke-width="0"/>
        <rect x="348" y="380" width="204" height="8" fill="rgba(255,255,255,.35)"/>
        <!-- 门上的小窗户 -->
        <circle cx="450" cy="396" r="24" fill="#cdf0ff" stroke="#fff" stroke-width="6"/>
        <path d="M432,404 C438,396 444,400 450,404 C456,400 462,396 468,404" stroke="#ff8faa" stroke-width="6" fill="none" stroke-linecap="round" transform="translate(0,-2)"/>
        <path d="M438,392 C444,384 456,384 462,392 C456,394 444,394 438,392 Z" fill="#ff8faa"/>
        <!-- 星星牌匾 -->
        <circle cx="450" cy="462" r="34" fill="#ffffff" opacity=".96"/>
        <g transform="translate(450,462)">
          <path d="M0,-18 L5,-6 L18,-5 L8,4 L11,17 L0,10 L-11,17 L-8,4 L-18,-5 L-5,-6 Z" fill="#ffd34d" stroke="#f2a94f" stroke-width="2"/>
        </g>
        <circle cx="416" cy="472" r="7" fill="#fff" opacity=".9"/>
        <circle cx="484" cy="472" r="7" fill="#fff" opacity=".9"/>
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
          setTimeout(() => showScreen('world'), 260);
        });
      });
    },
    onEnter() {
      window.hintOnce('home', '欢迎来到魔法小屋！推开大门进去玩吧');
    }
  };

  /* ---------- 启动 ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    Store.load();
    register('home', Home);
    register('world', window.World);
    register('dressup', window.DressUp);
    register('kitchen', window.Kitchen);
    currentId = 'home';
    // 调试/测试直达：?screen=world|dressup|kitchen
    const m = location.search.match(/[?&]screen=(\w+)/);
    if (m && screens[m[1]]) showScreen(m[1]);
  });
})();
