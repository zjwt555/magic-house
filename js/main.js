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

  /* ---------- 通用：换房间按钮（世界屏顶部左侧） + 回家按钮（保留兼容旧测试/dressup 等） ---------- */
  /* Phase 2 v4：homeButtonHTML 保留但功能 no-op（主屏已删）。showScreen('home') 早返回不报错。
     保留是为避免 world.js/dressup.js 的 .btn-home DOM 渲染 undefined 文本 + 旧测试 click(null) 报错 */
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
  /* Phase 2 v4：地图屏 1 大房子 + 室外 3 区（删 7 间室内）
     MAP_HOUSE：1 个大房子整体 iso cube；MAP_ROOM_POSITIONS 仅保留室外 3 区 */
  const MAP_HOUSE = { cx: 480, cy: 300, w: 180, h: 140, color: '#fff3f7', stroke: '#f0c4d4' };
  const MAP_ROOM_POSITIONS = {
    yard: { cx: 140, cy: 290, w: 60, h: 60,  color: '#a8e6a1', stroke: '#6cc46a', label: '院子', icon: ROOM_ICONS.yard.svg, outdoor: true },
    park: { cx: 140, cy: 470, w: 60, h: 60,  color: '#9ad7f0', stroke: '#7ec8e3', label: '公园', icon: ROOM_ICONS.park.svg, outdoor: true },
    shop: { cx: 820, cy: 470, w: 60, h: 60,  color: '#fff6e8', stroke: '#ff9eb5', label: '商店', icon: ROOM_ICONS.shop.svg, outdoor: true }
  };

  function _iconInner(svg) {
    return svg.replace(/<svg[^>]*>|<\/svg>/g, '');
  }

  /* 辅助：颜色加深（用于等距 3D 的侧面/描边） */
  function _darken(hex, amt) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const f = 1 - amt;
    return '#' + [r, g, b].map(v => Math.max(0, Math.round(v * f)).toString(16).padStart(2, '0')).join('');
  }

  /* 辅助：等距 3D cube（2:1 simplified isometric）的 3 个可见面 polygon */
  function _isoCube(cx, cy, w, h, baseColor, opts = {}) {
    const top    = baseColor;
    const left   = _darken(baseColor, opts.leftAmt   ?? 0.15);
    const right  = _darken(baseColor, opts.rightAmt  ?? 0.30);
    const stroke = _darken(baseColor, opts.strokeAmt ?? 0.40);
    const back   = `${cx},${cy}`;
    const rightV = `${cx + w},${cy + w * 0.5}`;
    const front  = `${cx},${cy + w}`;
    const leftV  = `${cx - w},${cy + w * 0.5}`;
    const backD  = `${cx},${cy + h}`;
    const rightD = `${cx + w},${cy + w * 0.5 + h}`;
    const leftD  = `${cx - w},${cy + w * 0.5 + h}`;
    return `
      <polygon points="${back} ${rightV} ${front} ${leftV}" fill="${top}"   stroke="${stroke}" stroke-width="2"/>
      <polygon points="${back} ${leftV} ${leftD} ${backD}"   fill="${left}"  stroke="${stroke}" stroke-width="2"/>
      <polygon points="${back} ${rightV} ${rightD} ${backD}" fill="${right}" stroke="${stroke}" stroke-width="2"/>`;
  }

  const MAP_SVG = `
    <svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- 草地底层 -->
      <rect x="0" y="520" width="900" height="120" fill="#a8e6a1"/>
      <rect x="0" y="514" width="900" height="12" fill="#8ed488" rx="6"/>
      <!-- 装饰小树 / 花 -->
      <g opacity=".9">
        <ellipse cx="240" cy="560" rx="22" ry="14" fill="#6cc46a"/>
        <rect x="234" y="558" width="12" height="14" fill="#a9784a"/>
        <ellipse cx="700" cy="560" rx="26" ry="16" fill="#7ed47b"/>
        <rect x="694" y="558" width="12" height="18" fill="#a9784a"/>
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
      <polygon points="450,520 510,520 540,640 420,640" fill="#f2d9a0"/>
      <!-- 大房子整体（等距 3D iso cube） -->
      <g class="map-house" data-room="house">
        ${(() => {
          const h = MAP_HOUSE;
          return _isoCube(h.cx, h.cy, h.w, h.h, h.color, { strokeAmt: 0.35 });
        })()}
        <!-- 顶面装饰：紫色小屋顶尖（菱形叠）+ 烟囱 -->
        <polygon points="${MAP_HOUSE.cx},${MAP_HOUSE.cy - 30}
          ${MAP_HOUSE.cx + 60},${MAP_HOUSE.cy - 12}
          ${MAP_HOUSE.cx},${MAP_HOUSE.cy + 6}
          ${MAP_HOUSE.cx - 60},${MAP_HOUSE.cy - 12}"
          fill="#b98cd9" stroke="#a06fc6" stroke-width="2" opacity=".95"/>
        <rect x="${MAP_HOUSE.cx + 30}" y="${MAP_HOUSE.cy - 38}" width="14" height="20" fill="#a06fc6" stroke="#7a4ec9" stroke-width="1.5"/>
        <!-- 顶面一扇门（房子正面朝前） -->
        <rect x="${MAP_HOUSE.cx - 14}" y="${MAP_HOUSE.cy + 80}" width="28" height="50" rx="3"
          fill="${_darken(MAP_HOUSE.color, 0.05)}" stroke="${_darken(MAP_HOUSE.color, 0.40)}" stroke-width="2"/>
        <circle cx="${MAP_HOUSE.cx + 8}" cy="${MAP_HOUSE.cy + 105}" r="2.5" fill="${_darken(MAP_HOUSE.color, 0.55)}"/>
      </g>
      <!-- 室外 3 区（iso cube） -->
      ${Object.entries(MAP_ROOM_POSITIONS).map(([id, p]) => `
        <g class="map-room map-outdoor" data-room="${id}">
          ${_isoCube(p.cx, p.cy, p.w, p.h, p.color, { leftAmt: 0.18, rightAmt: 0.36 })}
          <text x="${p.cx}" y="${p.cy + p.h + 24}" text-anchor="middle"
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
  /* Phase 2 v4：声音开关图标（被 Map 屏 .btn-sound 复用） */
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
  const HELP_ICON_SVG = `
    <svg viewBox="0 0 36 36">
      <text x="18" y="26" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">?</text>
    </svg>`;
  const RESET_ICON_SVG = `
    <svg viewBox="0 0 36 36">
      <path d="M29 18 a11 11 0 1 1 -3.3 -7.8" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <polygon points="21,5 32,9 25,17" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
  const RELAYOUT_ICON_SVG = `
    <svg viewBox="0 0 36 36">
      <text x="18" y="27" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">✨</text>
    </svg>`;
  const HELP_HTML = `
    <div class="help-overlay hidden">
      <div class="help-card">
        <h3>📖 给家长的小指南</h3>
        <ul>
          <li>🏠 <b>大世界</b>：默认是地图屏。点大房子轮廓进 7 间房列表，再选一个进世界；点室外 3 区直接跳</li>
          <li>🚶 <b>娃娃会走路</b>：在世界里点一下地板娃娃就走过去；<b>按住娃娃/小猫</b>可以拎到任何房间</li>
          <li>👗 <b>换装</b>：去换衣间点<b>大衣柜</b>，点分类标签再点衣服即可穿上</li>
          <li>🛏️ <b>布置房间</b>：在世界屏点下方家具放进房间，按住拖动换位置；卫生间里<b>点点浴缸</b>会冒泡泡</li>
          <li>🍎 <b>喂食</b>：去厨房点<b>冰箱</b>拿水果牛奶，拖到娃娃或小猫嘴边就吃掉；点<b>灶台</b>还能做饭</li>
          <li>🗑 <b>收走家具</b>：① 把家具<b>拖到屏幕下方的收纳筐</b>；② 或点左下角垃圾桶按钮，再点要收走的家具</li>
          <li>🍳 <b>做饭</b>：选菜谱 → 点食材放进锅 → 手指在锅里<b>画圈搅拌</b> → 点魔法按钮 → 喂给娃娃或小猫</li>
          <li>💾 装扮和房间<b>自动保存</b>，下次打开还是原样</li>
          <li>📱 <b>iPad/iPhone</b>：用 Safari 打开网址 → 分享 → <b>添加到主屏幕</b>，即可全屏离线玩</li>
        </ul>
        <button class="help-close">知道了</button>
      </div>
    </div>`;

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

  /* ---------- Phase 2 世界地图（拟物俯视图）---------- */
  const Map = {
    init(el) {
      /* Phase 2 v4：默认屏 = 地图屏，4 按钮（声音/帮助/还原/重新布置）+ 标题"魔法小屋"
         + 地图屏 SVG（1 大房子 + 室外 3 区 + 角色 marker） */
      el.innerHTML = `
        <div class="map-screen">
          <div class="map-top-bar">
            <div class="map-buttons">
              <button class="map-btn btn-sound" aria-label="声音开关"></button>
              <button class="map-btn btn-help" aria-label="玩法说明">${HELP_ICON_SVG}</button>
              <button class="map-btn btn-reset" aria-label="重置样板间">${RESET_ICON_SVG}</button>
              <button class="map-btn btn-relayout" aria-label="重新布置所有房间">${RELAYOUT_ICON_SVG}</button>
            </div>
            <div class="map-title">🏠魔法小屋</div>
          </div>
          <div class="map-canvas-wrap">
            <div class="map-canvas">${MAP_SVG}</div>
            <div class="map-marker map-marker-girl" data-for="girl"></div>
            <div class="map-marker map-marker-cat" data-for="cat"></div>
          </div>
          <div class="map-hint">点大房子进房间 · 点院子去室外</div>
          ${HELP_HTML}
          ${RESET_CONFIRM_HTML}
        </div>`;

      /* 4 按钮：从原 Home 模块迁移到 Map 屏 */
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

      el.querySelector('.btn-help').addEventListener('click', () => {
        Sound.pop();
        el.querySelector('.help-overlay').classList.remove('hidden');
      });
      const helpOverlay = el.querySelector('.help-overlay');
      helpOverlay.querySelector('.help-close').addEventListener('click', () => {
        Sound.pop();
        helpOverlay.classList.add('hidden');
      });
      helpOverlay.addEventListener('click', e => {
        if (e.target === helpOverlay) helpOverlay.classList.add('hidden');
      });

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
      el.querySelector('.btn-reset').addEventListener('click', () => {}, { once: false }); /* 占位 */
      el.querySelector('.reset-yes').addEventListener('click', () => {
        Store.reset();
        if (window.World && window.World.refreshCharacters) {
          window.World.refreshCharacters();
        }
        Sound.fanfare();
        Sound.praise('房间已经全部还原啦');
        FX.confetti(el, 28);
        closeReset();
      });

      el.querySelector('.btn-relayout').addEventListener('click', () => {
        Sound.pop();
        Store.relayout();
        Sound.praise('全部房间已重新摆好');
        FX.sparkles(el, window.innerWidth / 2, window.innerHeight / 2, 14);
        setTimeout(() => { Sound.door(); showScreen('world'); }, 600);
      });

      /* 大房子轮廓点击 → 进房子内部屏（interior） */
      const houseEl = el.querySelector('.map-house');
      if (houseEl) {
        houseEl.addEventListener('click', () => {
          Sound.door();
          const canvas = el.querySelector('.map-canvas');
          canvas.classList.add('map-leave');
          setTimeout(() => {
            canvas.classList.remove('map-leave');
            showScreen('interior');
          }, 220);
        });
      }

      /* 室外 3 区点击 → 直接跳世界屏（地图 → 世界，跳过 interior） */
      el.querySelectorAll('.map-room.map-outdoor').forEach(room => {
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

      /* Phase 2 v4：默认屏=map，Map.init 也跑一次 marker 定位（onEnter 在 showScreen 才调，
         但 register 时 init 已跑，默认屏情况下 onEnter 不会自动触发） */
      const placeInitMap = () => {
        this._placeMarker('girl', Store.state.char.girl.room);
        this._placeMarker('cat', Store.state.char.cat.room);
      };
      const placeMap = placeInitMap.bind(this);
      setTimeout(placeMap, 16);
      setTimeout(placeMap, 140);
    },
    onEnter() {
      /* iPad 兼容性：setTimeout 双轨（不用 requestAnimationFrame） */
      const place = () => {
        this._placeMarker('girl', Store.state.char.girl.room);
        this._placeMarker('cat', Store.state.char.cat.room);
      };
      setTimeout(place, 16);
      setTimeout(place, 140);
    },
    onLeave() {},
    _placeMarker(who, roomId) {
      /* Phase 2 v4：地图屏 marker 叠在大房子整体轮廓中心（不区分具体房间） */
      const screen = document.getElementById('screen-map');
      if (!screen) return;
      const marker = screen.querySelector('.map-marker-' + who);
      if (!marker) return;
      marker.dataset.targetRoom = roomId;
      const canvas = screen.querySelector('.map-canvas');
      const houseEl = screen.querySelector('.map-house');
      if (!canvas || !houseEl) return;
      const cRect = canvas.getBoundingClientRect();
      const hRect = houseEl.getBoundingClientRect();
      const left = hRect.left - cRect.left + hRect.width / 2;
      const top  = hRect.top  - cRect.top  + hRect.height * 0.35;
      marker.style.left = left + 'px';
      marker.style.top  = top + 'px';
      /* 触发 1.5s 脉动 */
      marker.classList.remove('pulse');
      void marker.offsetWidth;
      marker.classList.add('pulse');
    }
  };

  /* ---------- Phase 2 v4：房子内部屏（interior，7 个房间 iso cube 平铺）---------- */
  const INTERIOR_ROOMS = {
    balcony:  { cx: 220, cy: 200, w: 70, h: 90, color: '#dff3ff', stroke: '#9ad7f0', label: '阳台', icon: ROOM_ICONS.balcony.svg },
    bedroom:  { cx: 360, cy: 200, w: 70, h: 90, color: '#ffd9ea', stroke: '#e8a3bd', label: '卧室', icon: ROOM_ICONS.bedroom.svg },
    bathroom: { cx: 500, cy: 200, w: 70, h: 90, color: '#e8eff4', stroke: '#b8ccd8', label: '浴室', icon: ROOM_ICONS.bathroom.svg },
    living:   { cx: 640, cy: 200, w: 75, h: 90, color: '#d8f1ff', stroke: '#6bb8d8', label: '客厅', icon: ROOM_ICONS.living.svg },
    kitchen:  { cx: 250, cy: 420, w: 90, h: 90, color: '#ffe3c7', stroke: '#d98324', label: '厨房', icon: ROOM_ICONS.kitchen.svg },
    study:    { cx: 420, cy: 420, w: 90, h: 90, color: '#f7e8d2', stroke: '#d98c5a', label: '书房', icon: ROOM_ICONS.study.svg },
    wardrobe: { cx: 600, cy: 420, w: 90, h: 90, color: '#ffd9ea', stroke: '#e05c86', label: '换衣', icon: ROOM_ICONS.dressup.svg }
  };

  const INTERIOR_SVG = `
    <svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- 草地底层（与地图屏风格一致） -->
      <rect x="0" y="520" width="900" height="120" fill="#a8e6a1"/>
      <rect x="0" y="514" width="900" height="12" fill="#8ed488" rx="6"/>
      <!-- 太阳 -->
      <g transform="translate(840,60)">
        <circle r="22" fill="#ffd34d" stroke="#ffb830" stroke-width="3"/>
        ${Array.from({length: 8}, (_, i) => {
          const a = i * 45;
          return `<line x1="0" y1="-30" x2="0" y2="-38" stroke="#ffcf4d" stroke-width="4" stroke-linecap="round" transform="rotate(${a})"/>`;
        }).join('')}
      </g>
      <!-- 7 个房间 iso cube（上排 4 + 下排 3） -->
      ${Object.entries(INTERIOR_ROOMS).map(([id, p]) => `
        <g class="interior-room" data-room="${id}">
          ${_isoCube(p.cx, p.cy, p.w, p.h, p.color, { leftAmt: 0.18, rightAmt: 0.36 })}
          <!-- 顶面房间图标（小图） -->
          <g transform="translate(${p.cx - 16},${p.cy + p.w * 0.5 - 22}) scale(0.65)">
            ${_iconInner(p.icon)}
          </g>
          <!-- 顶面房间标签 -->
          <text x="${p.cx}" y="${p.cy + p.w + 32}" text-anchor="middle"
            font-size="15" font-weight="800" fill="${p.stroke}">${p.label}</text>
        </g>`).join('')}
    </svg>`;

  const Interior = {
    init(el) {
      el.innerHTML = `
        <div class="interior-screen">
          <div class="interior-top-bar">
            <button class="interior-back" aria-label="返回地图">
              <svg viewBox="0 0 36 36">
                <path d="M22 6 L10 18 L22 30 M10 18 L32 18" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="interior-title">挑一个房间吧</div>
          </div>
          <div class="interior-canvas-wrap">
            <div class="interior-canvas">${INTERIOR_SVG}</div>
            <div class="map-marker map-marker-girl" data-for="girl"></div>
            <div class="map-marker map-marker-cat" data-for="cat"></div>
          </div>
          <div class="interior-hint">点房间进世界</div>
        </div>`;

      /* 返回地图按钮 */
      el.querySelector('.interior-back').addEventListener('click', () => {
        Sound.pop();
        showScreen('map');
      });

      /* Phase 2 v4：默认屏 = map，Map.init 调一次后 map 屏立即显示 marker */
      const placeInit = () => {
        this._placeMarker('girl', Store.state.char.girl.room);
        this._placeMarker('cat', Store.state.char.cat.room);
      };
      /* 强制绑定 this，避免 setTimeout 后 this 变 window */
      const placeGirl = placeInit.bind(this);
      setTimeout(placeGirl, 0);
      setTimeout(placeGirl, 140);

      /* 房间点击 → 跳世界屏 + jumpTo */
      el.querySelectorAll('.interior-room').forEach(room => {
        room.addEventListener('click', () => {
          const roomId = room.dataset.room;
          if (!roomId || !window.World) return;
          Sound.door();
          const canvas = el.querySelector('.interior-canvas');
          canvas.classList.add('interior-leave');
          setTimeout(() => {
            canvas.classList.remove('interior-leave');
            showScreen('world');
            window.World.jumpTo(roomId);
            if (window.World.refreshCharacters) window.World.refreshCharacters();
          }, 220);
        });
      });
    },
    onEnter() {
      const place = () => {
        this._placeMarker('girl', Store.state.char.girl.room);
        this._placeMarker('cat', Store.state.char.cat.room);
      };
      setTimeout(place, 16);
      setTimeout(place, 140);
    },
    onLeave() {},
    _placeMarker(who, roomId) {
      const screen = document.getElementById('screen-interior');
      if (!screen) return;
      const marker = screen.querySelector('.map-marker-' + who);
      if (!marker) return;
      marker.dataset.targetRoom = roomId;
      const canvas = screen.querySelector('.interior-canvas');
      const roomEl = screen.querySelector(`.interior-room[data-room="${roomId}"]`);
      if (!canvas || !roomEl) return;
      const cRect = canvas.getBoundingClientRect();
      const rRect = roomEl.getBoundingClientRect();
      const left = rRect.left - cRect.left + rRect.width / 2;
      const top  = rRect.top  - cRect.top  + rRect.height * 0.4;
      marker.style.left = left + 'px';
      marker.style.top  = top + 'px';
      marker.classList.remove('pulse');
      void marker.offsetWidth;
      marker.classList.add('pulse');
    }
  };

  /* ---------- 启动 ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    Store.load();
    /* Phase 2 v4：默认屏 = map（不再 home）；interior 是新增屏 */
    register('map', Map);
    register('world', window.World);
    register('interior', Interior);
    register('dressup', window.DressUp);
    register('kitchen', window.Kitchen);
    currentId = 'map';
    // 调试/测试直达：?screen=map|world|interior|dressup|kitchen，?room=yard|park|shop|...
    const m = location.search.match(/[?&]screen=(\w+)/);
    if (m && screens[m[1]]) showScreen(m[1]);
    const rm = location.search.match(/[?&]room=(\w+)/);
    if (rm && window.World) {
      if (currentId !== 'world') showScreen('world');
      window.World.jumpTo(rm[1]);
    }
    /* 首次进游戏提示（家长指南） */
    window.hintOnce('map', '欢迎来到魔法小屋！点大房子进房间，点院子去外面玩');
  });
})();
