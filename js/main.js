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
    bedroom: { label: '卧室', svg: `
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
      </svg>` },
    yard: { label: '院子', svg: `
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="18" r="14" fill="#6cc46a"/>
        <circle cx="12" cy="24" r="9" fill="#7ed47b"/>
        <circle cx="36" cy="24" r="9" fill="#7ed47b"/>
        <rect x="21" y="28" width="6" height="14" rx="2.5" fill="#a9784a"/>
        <circle cx="17" cy="14" r="3" fill="#ff6b6b"/>
        <circle cx="30" cy="20" r="3" fill="#ff6b6b"/>
        <path d="M6 42 Q24 36 42 42" stroke="#5a9e56" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      </svg>` },
    park: { label: '公园', svg: `
      <svg viewBox="0 0 48 48">
        <ellipse cx="24" cy="36" rx="18" ry="7" fill="#9ad7f0"/>
        <rect x="21" y="18" width="6" height="14" rx="2.5" fill="#e8e2d8"/>
        <ellipse cx="24" cy="17" rx="10" ry="4" fill="#9ad7f0"/>
        <path d="M24 15 Q24 7 18 4 M24 15 Q24 7 30 4 M24 15 Q24 5 24 1" stroke="#7ec8e3" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="18" cy="4" r="2.5" fill="#bfe6ff"/><circle cx="30" cy="4" r="2.5" fill="#bfe6ff"/>
      </svg>` },
    shop: { label: '商店', svg: `
      <svg viewBox="0 0 48 48">
        <path d="M8 16 L8 10 Q24 4 40 10 L40 16 Z" fill="#ff9eb5"/>
        ${[0, 1, 2].map(i => `<rect x="${11 + i * 10}" y="${8 - (i % 2)}" width="8" height="8" rx="2" fill="#fff" opacity=".9"/>`).join('')}
        <rect x="10" y="20" width="28" height="20" rx="3" fill="#fff6e8"/>
        <rect x="14" y="24" width="7" height="10" rx="2" fill="#ff8f9e"/>
        <rect x="24" y="24" width="7" height="10" rx="2" fill="#7ec8e3"/>
        <circle cx="36" cy="29" r="4" fill="#ffd166"/>
      </svg>` }
  };
  const PICK_ORDER = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'dressup', 'yard', 'park', 'shop'];

  /* ---------- Phase 2 世界地图：拟物俯视图 ---------- */
  const MAP_ROOM_POSITIONS = {
    /* 大房子内 7 间：上排 4 + 下排 3 */
    balcony:  { x: 150, y: 120, w: 145, h: 165, label: '阳台', color: '#dff3ff', stroke: '#9ad7f0', icon: ROOM_ICONS.balcony.svg,  indoor: true },
    bedroom:  { x: 295, y: 120, w: 145, h: 165, label: '卧室', color: '#ffd9ea', stroke: '#e8a3bd', icon: ROOM_ICONS.bedroom.svg,  indoor: true },
    bathroom: { x: 440, y: 120, w: 145, h: 165, label: '浴室', color: '#e8eff4', stroke: '#b8ccd8', icon: ROOM_ICONS.bathroom.svg, indoor: true },
    living:   { x: 585, y: 120, w: 165, h: 165, label: '客厅', color: '#d8f1ff', stroke: '#6bb8d8', icon: ROOM_ICONS.living.svg,   indoor: true },
    kitchen:  { x: 150, y: 285, w: 200, h: 195, label: '厨房', color: '#ffe3c7', stroke: '#d98324', icon: ROOM_ICONS.kitchen.svg,  indoor: true },
    study:    { x: 350, y: 285, w: 200, h: 195, label: '书房', color: '#f7e8d2', stroke: '#d98c5a', icon: ROOM_ICONS.study.svg,    indoor: true },
    wardrobe: { x: 550, y: 285, w: 200, h: 195, label: '换衣', color: '#ffd9ea', stroke: '#e05c86', icon: ROOM_ICONS.dressup.svg,  indoor: true },
    /* 室外 3 区：散落在大房子周围 */
    yard:     { x: 30,  y: 150, w: 100, h: 80,  label: '院子', color: '#a8e6a1', stroke: '#6cc46a', icon: ROOM_ICONS.yard.svg,     outdoor: true },
    park:     { x: 30,  y: 400, w: 100, h: 80,  label: '公园', color: '#9ad7f0', stroke: '#7ec8e3', icon: ROOM_ICONS.park.svg,     outdoor: true },
    shop:     { x: 770, y: 400, w: 100, h: 80,  label: '商店', color: '#fff6e8', stroke: '#ff9eb5', icon: ROOM_ICONS.shop.svg,     outdoor: true }
  };

  function _iconInner(svg) {
    return svg.replace(/<svg[^>]*>|<\/svg>/g, '');
  }

  const MAP_SVG = `
    <svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- 地面草地 -->
      <rect x="0" y="500" width="900" height="140" fill="#a8e6a1"/>
      <rect x="0" y="495" width="900" height="12" fill="#8ed488" rx="6"/>
      <!-- 装饰小树 / 花 -->
      <g opacity=".9">
        <ellipse cx="240" cy="530" rx="22" ry="14" fill="#6cc46a"/>
        <rect x="234" y="528" width="12" height="14" fill="#a9784a"/>
        <ellipse cx="660" cy="540" rx="26" ry="16" fill="#7ed47b"/>
        <rect x="654" y="538" width="12" height="18" fill="#a9784a"/>
        <ellipse cx="820" cy="320" rx="18" ry="11" fill="#6cc46a"/>
        <rect x="816" y="320" width="8" height="10" fill="#a9784a"/>
      </g>
      <!-- 太阳 -->
      <g transform="translate(60,60)">
        <circle r="22" fill="#ffd34d" stroke="#ffb830" stroke-width="3"/>
        ${Array.from({length: 8}, (_, i) => {
          const a = i * 45;
          return `<line x1="0" y1="-30" x2="0" y2="-38" stroke="#ffcf4d" stroke-width="4" stroke-linecap="round" transform="rotate(${a})"/>`;
        }).join('')}
      </g>
      <!-- 一条小路（门口） -->
      <polygon points="430,500 470,500 510,640 390,640" fill="#f2d9a0"/>
      <!-- 大房子外框（描边 + 屋顶紫三角） -->
      <polygon points="138,124 762,124 750,90 150,90" fill="#b98cd9" stroke="#a06fc6" stroke-width="3" stroke-linejoin="round"/>
      <rect x="150" y="120" width="600" height="360" fill="#fff3f7" stroke="#f0c4d4" stroke-width="3" rx="6"/>
      <!-- 大房子内部 7 间 -->
      ${Object.entries(MAP_ROOM_POSITIONS).filter(([, p]) => p.indoor).map(([id, p]) => `
        <g class="map-room" data-room="${id}">
          <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}"
            fill="${p.color}" stroke="${p.stroke}" stroke-width="2.5" rx="6"/>
          <text x="${p.x + p.w / 2}" y="${p.y + 22}" text-anchor="middle"
            font-size="15" font-weight="800" fill="${p.stroke}">${p.label}</text>
          <g transform="translate(${p.x + p.w / 2 - 22},${p.y + p.h / 2 - 6}) scale(0.92)">
            ${_iconInner(p.icon)}
          </g>
        </g>`).join('')}
      <!-- 室外 3 区 -->
      ${Object.entries(MAP_ROOM_POSITIONS).filter(([, p]) => p.outdoor).map(([id, p]) => `
        <g class="map-room map-outdoor" data-room="${id}">
          <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}"
            fill="${p.color}" stroke="${p.stroke}" stroke-width="2.5" rx="10"/>
          <g transform="translate(${p.x + p.w / 2 - 18},${p.y + p.h / 2 - 14}) scale(0.78)">
            ${_iconInner(p.icon)}
          </g>
          <text x="${p.x + p.w / 2}" y="${p.y + p.h + 18}" text-anchor="middle"
            font-size="14" font-weight="800" fill="${p.stroke}">${p.label}</text>
        </g>`).join('')}
    </svg>`;

  const MAP_CLOSE_SVG = `
    <svg viewBox="0 0 36 36">
      <line x1="10" y1="10" x2="26" y2="26" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="26" y1="10" x2="10" y2="26" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`;

  const MAP_BTN_SVG = `
    <svg viewBox="0 0 36 36">
      <!-- 地图图标（卷起的地图） -->
      <path d="M5,10 Q18,4 32,10 L32,26 Q18,32 5,26 Z" fill="#fff" stroke="#7a4ec9" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M5,10 Q12,8 18,11 Q24,14 32,10" fill="none" stroke="#7a4ec9" stroke-width="1.4" opacity=".55"/>
      <path d="M5,26 Q12,28 18,25 Q24,22 32,26" fill="none" stroke="#7a4ec9" stroke-width="1.4" opacity=".55"/>
      <line x1="18" y1="11" x2="18" y2="25" stroke="#7a4ec9" stroke-width="1.4" opacity=".55"/>
      <!-- 定位点（小红点） -->
      <circle cx="14" cy="17" r="2.4" fill="#ff5c8a"/>
      <circle cx="22" cy="20" r="2.4" fill="#f7b967"/>
    </svg>`;

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
          /* 从 overlay 跳房间：先回世界再平移相机 */
          showScreen('world');
          window.World.jumpTo(pick.dataset.room);
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
    /* Phase 2 世界地图：主屏右上角"看全景"按钮 */
    if (e.target.closest('.btn-map')) { Sound.door(); showScreen('map'); }
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
          <li>🏠 <b>大世界</b>：进门后是 10 个场景的横向大世界（房子 7 间房 + <b>院子、公园、商店</b>三个室外），<b>手指左右拖动</b>看世界；点左上角小门按钮可直达任意场景</li>
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

  const RESET_ICON_SVG = `
    <svg viewBox="0 0 36 36">
      <path d="M29 18 a11 11 0 1 1 -3.3 -7.8" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <polygon points="21,5 32,9 25,17" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
  const RESET_CONFIRM_HTML = `
    <div class="reset-confirm hidden">
      <div class="reset-card">
        <h3>🧹 全部还原？</h3>
        <p>房间布置、娃娃装扮、玩具食物都会回到刚下载的样子。<br><b>这个操作不能撤销</b>，确认要做吗？</p>
        <div class="reset-buttons">
          <button class="reset-no">再想想</button>
          <button class="reset-yes">确定还原</button>
        </div>
      </div>
    </div>`;

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
          <button class="btn-corner btn-reset" aria-label="重置样板间">
            ${RESET_ICON_SVG}
          </button>
          <button class="btn-corner btn-relayout" aria-label="重新布置所有房间">
            <svg viewBox="0 0 36 36">
              <text x="18" y="27" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">✨</text>
            </svg>
          </button>
          <button class="btn-corner btn-map" aria-label="看全景地图">${MAP_BTN_SVG}</button>
        </div>` + HOME_SVG + HELP_HTML + RESET_CONFIRM_HTML;

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

      /* 全部还原（带二次确认，避免娃误点） */
      const confirmEl = el.querySelector('.reset-confirm');
      el.querySelector('.btn-reset').addEventListener('click', () => {
        Sound.pop();
        confirmEl.classList.remove('hidden');
      });
      const closeReset = () => { Sound.pop(); confirmEl.classList.add('hidden'); };
      el.querySelector('.reset-no').addEventListener('click', closeReset);
      el.querySelector('.reset-confirm').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeReset();
      });
      el.querySelector('.reset-yes').addEventListener('click', () => {
        Store.reset();
        /* 娃娃要"拎回"原位，否则重置后 state 在 living 但 DOM 节点还在原房间 */
        if (window.World && window.World.refreshCharacters) {
          window.World.refreshCharacters();
          /* 重置后 lastRoom 回到 living，但相机此刻在 home 上 — 不必切；下次进世界才生效 */
        }
        Sound.fanfare();
        Sound.praise('房间已经全部还原啦');
        FX.confetti(el, 28);
        closeReset();
      });

      /* v0.7：✨ 重新布置 —— 只重摆所有房间 items（不动娃娃/食物/换装）。
         适合"女儿自己摆的有点乱，想一键按新样板间摆好"。 */
      el.querySelector('.btn-relayout').addEventListener('click', () => {
        Sound.pop();
        Store.relayout();
        /* 主屏上看不到效果（要进世界才看得到）—— 但 reload 后就生效 */
        Sound.praise('全部房间已重新摆好');
        FX.sparkles(el, window.innerWidth / 2, window.innerHeight / 2, 14);
        /* 自动跳到世界让娃立刻看到新布置 */
        setTimeout(() => { Sound.door(); window.showScreen('world'); }, 600);
      });
    },
    onEnter() {
      window.hintOnce('home', '欢迎来到魔法小屋！推开大门进去玩吧');
    }
  };

  /* ---------- Phase 2 世界地图（拟物俯视图）---------- */
  const Map = {
    init(el) {
      el.innerHTML = `
        <div class="map-screen">
          <div class="map-top">
            <div class="map-title">魔法小屋全景图</div>
            <button class="map-close" aria-label="关闭">${MAP_CLOSE_SVG}</button>
          </div>
          <div class="map-canvas-wrap">
            <div class="map-canvas">${MAP_SVG}</div>
            <div class="map-marker map-marker-girl" data-for="girl"></div>
            <div class="map-marker map-marker-cat" data-for="cat"></div>
          </div>
          <div class="map-hint">点房间带你直接过去</div>
        </div>`;

      /* 关闭按钮：回主屏 */
      el.querySelector('.map-close').addEventListener('click', () => {
        Sound.pop();
        showScreen('home');
      });

      /* 房间块点击：200ms 缩放淡出 + 跳世界 */
      el.querySelectorAll('.map-room').forEach(room => {
        room.addEventListener('click', () => {
          const roomId = room.dataset.room;
          if (!roomId || !window.World) return;
          Sound.door();
          const canvas = el.querySelector('.map-canvas');
          canvas.classList.add('map-leave');
          setTimeout(() => {
            canvas.classList.remove('map-leave');
            showScreen('world');
            window.World.jumpTo(roomId);
            if (window.World.refreshCharacters) window.World.refreshCharacters();
          }, 220);
        });
      });
    },
    onEnter() {
      /* iPad 兼容性：用 setTimeout 双轨（不用 requestAnimationFrame，
         headless Chrome 虚拟时间下 rAF 可能不被触发）。
         第一次立即定位（数据先到位），第二次覆盖布局稳定后的位置。 */
      const place = () => {
        this._placeMarker('girl', Store.state.char.girl.room);
        this._placeMarker('cat', Store.state.char.cat.room);
      };
      setTimeout(place, 16);
      setTimeout(place, 140);
    },
    onLeave() {},
    _placeMarker(who, roomId) {
      const screen = document.getElementById('screen-map');
      if (!screen) return;
      const marker = screen.querySelector('.map-marker-' + who);
      if (!marker) return;
      marker.dataset.targetRoom = roomId;
      const canvas = screen.querySelector('.map-canvas');
      const roomEl = screen.querySelector(`.map-room[data-room="${roomId}"]`);
      if (!canvas || !roomEl) return;
      const cRect = canvas.getBoundingClientRect();
      const rRect = roomEl.getBoundingClientRect();
      const left = rRect.left - cRect.left + rRect.width / 2;
      const top = rRect.top - cRect.top + rRect.height / 2;
      marker.style.left = left + 'px';
      marker.style.top = top + 'px';
      /* 触发 1.5s 脉动（重置再启动） */
      marker.classList.remove('pulse');
      void marker.offsetWidth;
      marker.classList.add('pulse');
    }
  };

  /* ---------- 启动 ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    Store.load();
    register('home', Home);
    register('world', window.World);
    register('map', Map);
    register('dressup', window.DressUp);
    register('kitchen', window.Kitchen);
    currentId = 'home';
    // 调试/测试直达：?screen=world|dressup|kitchen，?room=yard|park|shop|...
    const m = location.search.match(/[?&]screen=(\w+)/);
    if (m && screens[m[1]]) showScreen(m[1]);
    const rm = location.search.match(/[?&]room=(\w+)/);
    if (rm && window.World) {
      if (currentId !== 'world') showScreen('world');
      window.World.jumpTo(rm[1]);
    }
  });
})();
