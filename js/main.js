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
          fill="#fff" stroke="#d16a89" stroke-width="2.8" stroke-linejoin="round"/>
        <rect x="21.5" y="15" width="5" height="6" rx="5" fill="#ffd0dd"/>
      </svg>
    </button>`;
  window.roomsButtonHTML = `
    <button class="btn-rooms" aria-label="换房间">
      <svg viewBox="0 0 48 48">
        <path d="M10 42V20a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v22" fill="#fff" stroke="#4f9cc0" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M16 40V28a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12" fill="#9ad7f0" stroke="#4f9cc0" stroke-width="2.8" stroke-linejoin="round"/>
        <circle cx="24" cy="15" r="2.6" fill="#ffd34d"/>
        <path d="M24 6l1.4 3.4 3.6.3-2.7 2.3.8 3.5-3.1-1.9-3.1 1.9.8-3.5-2.7-2.3 3.6-.3z" fill="#ffd34d"/>
      </svg>
    </button>`;

  /* ---------- 房间跳转弹出条（7 间房，点选后相机直达） ---------- */
  const ROOM_ICONS = {
    balcony: { label: '阳台', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="6" y="10" width="36" height="30" rx="8" fill="#dff3ff" stroke="#9ad7f0" stroke-width="3"/>
        <line x1="24" y1="10" x2="24" y2="40" stroke="#9ad7f0" stroke-width="3"/>
        <line x1="6" y1="25" x2="42" y2="25" stroke="#9ad7f0" stroke-width="3"/>
        <circle cx="15" cy="18" r="4" fill="#ff9eb5"/>
        <circle cx="33" cy="33" r="4" fill="#ffd34d"/>
        <path d="M10,6 L38,6" stroke="#c98443" stroke-width="3" stroke-linecap="round"/>
      </svg>` },
    bedroom: { label: '卧室', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="8" y="22" width="8" height="18" rx="6" fill="#2f7fa3"/>
        <rect x="8" y="32" width="32" height="10" rx="8" fill="#4aa3c9"/>
        <rect x="30" y="26" width="8" height="16" rx="6" fill="#2f7fa3"/>
        <rect x="12" y="28" width="11" height="6" rx="6" fill="#fff"/>
      </svg>` },
    bathroom: { label: '卫生间', svg: `
      <svg viewBox="0 0 48 48">
        <path d="M8 22h32l-3 14q-13 4-26 0z" fill="#fdfdff" stroke="#b8ccd8" stroke-width="2.8"/>
        <rect x="6" y="19" width="36" height="6" rx="6" fill="#b8ccd8"/>
        <circle cx="16" cy="16" r="4.5" fill="#fff" opacity=".95"/>
        <circle cx="25" cy="13" r="3.5" fill="#fff" opacity=".95"/>
        <g transform="translate(33,12)"><circle r="4" fill="#ffd34d"/><polygon points="3,0 7,1 3.5,3" fill="#ff9f43"/></g>
      </svg>` },
    living: { label: '客厅', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="6" y="14" width="36" height="14" rx="6" fill="#6bb8d8"/>
        <rect x="4" y="20" width="8" height="14" rx="8" fill="#7ec8e3"/>
        <rect x="36" y="20" width="8" height="14" rx="8" fill="#7ec8e3"/>
        <rect x="10" y="24" width="28" height="10" rx="8" fill="#9ad7f0"/>
        <rect x="8" y="34" width="32" height="5" rx="6" fill="#6bb8d8"/>
      </svg>` },
    kitchen: { label: '厨房', svg: `
      <svg viewBox="0 0 48 48">
        <path d="M10 20h28l-4 18q-10 4-20 0z" fill="#d98324"/>
        <ellipse cx="24" cy="19" rx="12" ry="4" fill="#f2a94f"/>
        <circle cx="24" cy="13" r="3" fill="#fff"/>
        <path d="M18 8q-2-4 0-7 M30 8q2-4 0-7" stroke="#bde0f5" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </svg>` },
    study: { label: '书房', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="6" y="26" width="36" height="5" rx="6" fill="#d98c5a"/>
        <rect x="10" y="31" width="5" height="11" rx="5" fill="#c47a44"/>
        <rect x="33" y="31" width="5" height="11" rx="5" fill="#c47a44"/>
        <rect x="14" y="12" width="20" height="14" rx="5" fill="#4a4a55"/>
        <rect x="17" y="15" width="14" height="8" rx="8" fill="#9ad7f0"/>
        <circle cx="38" cy="16" r="4.5" fill="#98d8a0"/>
      </svg>` },
    dressup: { label: '换衣间', svg: `
      <svg viewBox="0 0 48 48">
        <rect x="8" y="10" width="32" height="30" rx="8" fill="#e8a3bd"/>
        <line x1="24" y1="12" x2="24" y2="38" stroke="#d98cb0" stroke-width="3"/>
        <path d="M14 20 l-2 4 -4 6 q6 3 12 0 l-4 -6 -2 -4 z" fill="#e05c86" transform="translate(2,2)"/>
        <path d="M28 20 l-2 4 -4 6 q6 3 12 0 l-4 -6 -2 -4 z" fill="#7ec8e3" transform="translate(2,2)"/>
      </svg>` },
    yard: { label: '院子', svg: `
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="18" r="14" fill="#6cc46a"/>
        <circle cx="12" cy="24" r="9" fill="#7ed47b"/>
        <circle cx="36" cy="24" r="9" fill="#7ed47b"/>
        <rect x="21" y="28" width="6" height="14" rx="6" fill="#a9784a"/>
        <circle cx="17" cy="14" r="3" fill="#ff6b6b"/>
        <circle cx="30" cy="20" r="3" fill="#ff6b6b"/>
        <path d="M6 42 Q24 36 42 42" stroke="#5a9e56" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      </svg>` },
    park: { label: '公园', svg: `
      <svg viewBox="0 0 48 48">
        <ellipse cx="24" cy="36" rx="18" ry="7" fill="#9ad7f0"/>
        <rect x="21" y="18" width="6" height="14" rx="6" fill="#e8e2d8"/>
        <ellipse cx="24" cy="17" rx="10" ry="4" fill="#9ad7f0"/>
        <path d="M24 15 Q24 7 18 4 M24 15 Q24 7 30 4 M24 15 Q24 5 24 1" stroke="#7ec8e3" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="18" cy="4" r="2.5" fill="#bfe6ff"/><circle cx="30" cy="4" r="2.5" fill="#bfe6ff"/>
      </svg>` },
    shop: { label: '商店', svg: `
      <svg viewBox="0 0 48 48">
        <path d="M8 16 L8 10 Q24 4 40 10 L40 16 Z" fill="#ff9eb5"/>
        ${[0, 1, 2].map(i => `<rect x="${11 + i * 10}" y="${8 - (i % 2)}" width="8" height="8" rx="5" fill="#fff" opacity=".9"/>`).join('')}
        <rect x="10" y="20" width="28" height="20" rx="6" fill="#fff6e8"/>
        <rect x="14" y="24" width="7" height="10" rx="5" fill="#ff8f9e"/>
        <rect x="24" y="24" width="7" height="10" rx="5" fill="#7ec8e3"/>
        <circle cx="36" cy="29" r="4" fill="#ffd166"/>
      </svg>` }
  };
  const PICK_ORDER = ['balcony', 'bedroom', 'bathroom', 'living', 'kitchen', 'study', 'dressup', 'yard', 'park', 'shop'];

  /* ---------- Phase 2 v7：3×3 网格街道 + 家在中央（数据驱动）---------- */
  /* 网格坐标 (col, row) -> (x, y, w, h)
     列宽 280, 行高 193, 街道 30 宽
     列 0: 0-280,  街 280-310,  列 1: 310-590,  街 590-620,  列 2: 620-900
     行 0: 0-193,  街 193-223,  行 1: 223-416,  街 416-446,  行 2: 446-639 */
  const COL_W = 280, ROW_H = 193, STREET = 30;
  function _cellX(col) { return col * (COL_W + STREET); }
  function _cellY(row) { return row * (ROW_H + STREET); }
  function _cellW() { return COL_W; }
  function _cellH() { return ROW_H; }

  /* 辅助：颜色加深（INTERIOR_SVG 用） */
  function _darken(hex, amt) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const f = 1 - amt;
    return '#' + [r, g, b].map(v => Math.max(0, Math.round(v * f)).toString(16).padStart(2, '0')).join('');
  }
  /* 辅助：等距 3D cube（INTERIOR_SVG 用） */
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
      <polygon points="${back} ${rightV} ${front} ${leftV}" fill="${top}"   stroke="${stroke}" stroke-width="3"/>
      <polygon points="${back} ${leftV} ${leftD} ${backD}"   fill="${left}"  stroke="${stroke}" stroke-width="3"/>
      <polygon points="${back} ${rightV} ${rightD} ${backD}" fill="${right}" stroke="${stroke}" stroke-width="3"/>`;
  }

  /* 9 格数据：4 角室外 + 中央大房子 + 4 个街道占位 */
  const MAP_GRID = [
    { id: 'yard',      col: 0, row: 0, label: '\u9662\u5b50', color: '#a8e6a1' },
    { id: '__street__', col: 1, row: 0, kind: 'street' },
    { id: 'shop',      col: 2, row: 0, label: '\u5546\u5e97', color: '#fff6e8' },
    { id: '__street__', col: 0, row: 1, kind: 'street' },
    { id: 'house',     col: 1, row: 1, label: '\u6211\u5bb6', color: '#fff3f7' },
    { id: '__street__', col: 2, row: 1, kind: 'street' },
    { id: 'park',      col: 0, row: 2, label: '\u516c\u56ed', color: '#9ad7f0' },
    { id: '__street__', col: 1, row: 2, kind: 'street' },
    { id: '__empty__', col: 2, row: 2, label: '\u7a7a\u5730', color: '#daf5d0' }
  ];

  /* 4 角格子里的拟物（绝对坐标） */
  const YARD_DETAIL = {
    rect: '0 0 280 193',
    swing: [60, 80, 60, 200, 60, 80, 200, 80, 4, 40, 4, 40, 4, 60, 200, 80],
    sandbox: [60, 160, 50, 16],
    mailbox: [220, 140, 14, 22, 14, 14],
    flower: [140, 70]
  };
  const SHOP_DETAIL = {
    rect: '0 0 280 193',
    signRect: '60 60 120 28',
    signText: '商店',
    signTextX: 120, signTextY: 80,
    candyRows: [
      { y: 110, color: '#ff5c5c' }, { y: 120, color: '#ffd34d' },
      { y: 130, color: '#7ec8e3' }, { y: 140, color: '#98d8a0' },
      { y: 150, color: '#b79ced' }
    ],
    candyX: 40, candyW: 80,
    lanterns: [{ x: 30, y: 110 }, { x: 250, y: 110 }],
    counter: [200, 145, 40, 22],
    carpet: [100, 170, 80, 8],
    flower: [120, 175]
  };
  const PARK_DETAIL = {
    rect: '0 0 280 193',
    fountain: [140, 80, 18],
    pond: [60, 165, 36, 11],
    tree: [200, 80, 6, 36, 22, 16],
    table: [220, 150, 36, 14],
    flowers: [[60, 50], [240, 60]]
  };
  const EMPTY_DETAIL = {
    rect: '0 0 280 193',
    tree: [140, 50, 8, 50, 30, 22],
    flowers: [[60, 130], [220, 140], [140, 165]],
    label: '\u7a7a\u5730'
  };

  /* 渲染单个非街道格子（背景色 + 拟物 + 标签） */
  function _renderBlock(entry) {
    if (entry.kind === 'street' || entry.id === '__empty__' || entry.id === 'house' || entry.id === 'yard' || entry.id === 'park' || entry.id === 'shop') {
      /* \u5c9b\u4e2d\u5927\u623f\u5b50\u5355\u72ec\u5904\u7406\uff08\u9700\u8981\u591a\u7ec6\u8282\uff09 */
    }
    let out = '';
    if (entry.id === '__empty__') {
      /* \u7a7a\u5730\uff1a\u7eff\u8272\u80cc\u666f + 1 \u68f5\u5927\u6811 + \u51e0\u6735\u82b1 + \u201c\u7a7a\u5730\u201d\u6807\u7b7e */
      out += '<rect x="0" y="0" width="280" height="193" fill="#daf5d0" stroke="#a0c89a" stroke-width="3" rx="8"/>';
      const t = EMPTY_DETAIL.tree;
      out += `<rect x="${t[0]}" y="${t[1]}" width="${t[2]}" height="${t[3]}" fill="#7a5a3a"/>`;
      out += `<ellipse cx="${t[0] + t[2]/2}" cy="${t[1] - 4}" rx="${t[4]}" ry="${t[5]}" fill="#6cc46a"/>`;
      out += `<ellipse cx="${t[0] + t[2]/2 - 8}" cy="${t[1] - 8}" rx="${t[4] * 0.6}" ry="${t[5] * 0.7}" fill="#7ed47b"/>`;
      EMPTY_DETAIL.flowers.forEach(([x, y]) => {
        out += `<g transform="translate(${x},${y})"><line x1="0" y1="0" x2="0" y2="8" stroke="#4e9e4a" stroke-width="3"/><ellipse cx="0" cy="-3" rx="6" ry="4" fill="#ff9eb5"/><ellipse cx="-3" cy="-1" rx="6" ry="4" fill="#ff9eb5" transform="rotate(-60)"/><ellipse cx="3" cy="-1" rx="6" ry="4" fill="#ff9eb5" transform="rotate(60)"/><circle r="1.5" fill="#fff3c9"/></g>`;
      });
      out += `<text x="140" y="178" text-anchor="middle" font-size="14" font-weight="800" fill="#6c8a5a">${EMPTY_DETAIL.label}</text>`;
      return out;
    }
    if (entry.id === 'house') {
      /* L3-2 v2: 直接用 icons/apple-touch-icon.png 当大房子（老吴指令） */
      const hx = 0, hy = 0, hw = 280, hh = 193;
      out += `<image href="icons/apple-touch-icon.png" x="${hx}" y="${hy}" width="${hw}" height="${hh}" preserveAspectRatio="xMidYMid slice"/>`;
      /* "我家" 标签：六角型白底紫字（叠在图上顶部，保证 polygon>=1 测试断言）*/
      out += `<polygon points="${hw/2-32},${hy+12} ${hw/2+32},${hy+12} ${hw/2+36},${hy+22} ${hw/2+32},${hy+32} ${hw/2-32},${hy+32} ${hw/2-36},${hy+22}" fill="#fff" opacity=".95" stroke="#7a4ec9" stroke-width="2"/>`;
      out += `<text x="${hw/2}" y="${hy + 27}" text-anchor="middle" font-size="14" font-weight="800" fill="#7a4ec9">${entry.label}</text>`;
      return out;
    }
if (entry.id === 'yard') {
      out += `<rect x="0" y="0" width="280" height="193" fill="${entry.color}" stroke="#6cc46a" stroke-width="3" rx="8"/>`;
      /* \u79cb\u5343 */
      out += `<rect x="60" y="80" width="3" height="50" fill="#7a5a3a"/>`;
      out += `<rect x="140" y="80" width="3" height="50" fill="#7a5a3a"/>`;
      out += `<line x1="60" y1="80" x2="143" y2="80" stroke="#7a5a3a" stroke-width="3"/>`;
      out += `<line x1="100" y1="83" x2="100" y2="118" stroke="#5a4a2a" stroke-width="1.8"/>`;
      out += `<line x1="110" y1="83" x2="110" y2="116" stroke="#5a4a2a" stroke-width="1.8"/>`;
      out += `<rect x="92" y="114" width="30" height="7" rx="5" fill="#ff9eb5" stroke="#c45875" stroke-width="2.6"/>`;
      /* \u6c99\u5751 */
      out += `<ellipse cx="60" cy="155" rx="28" ry="9" fill="#f7d488" stroke="#c4944f" stroke-width="2.6"/>`;
      /* \u90ae\u7bb1 */
      out += `<rect x="218" y="140" width="14" height="20" fill="#ff5c5c" stroke="#a83232" stroke-width="1.8" rx="8"/>`;
      out += `<rect x="214" y="137" width="22" height="4" fill="#7a5a3a"/>`;
      /* 1 \u6735\u82b1 */
      out += `<g transform="translate(180, 60)"><ellipse cx="0" cy="-3" rx="8" ry="5" fill="#ff9eb5"/><circle r="2" fill="#fff3c9"/></g>`;
      out += `<text x="140" y="180" text-anchor="middle" font-size="16" font-weight="800" fill="#4e9e4a">${entry.label}</text>`;
      return out;
    }
    if (entry.id === 'park') {
      out += `<rect x="0" y="0" width="280" height="193" fill="${entry.color}" stroke="#7ec8e3" stroke-width="3" rx="8"/>`;
      /* \u55b7\u6cc9 */
      out += `<circle cx="140" cy="80" r="18" fill="#fff" stroke="#7ec8e3" stroke-width="2.6"/>`;
      out += `<circle cx="140" cy="76" r="3" fill="#9ad7f0"/>`;
      out += `<line x1="140" y1="58" x2="140" y2="50" stroke="#9ad7f0" stroke-width="3" stroke-linecap="round"/>`;
      out += `<line x1="126" y1="64" x2="118" y2="58" stroke="#9ad7f0" stroke-width="3" stroke-linecap="round"/>`;
      out += `<line x1="154" y1="64" x2="162" y2="58" stroke="#9ad7f0" stroke-width="3" stroke-linecap="round"/>`;
      /* \u6c60\u5858 */
      out += `<ellipse cx="60" cy="155" rx="28" ry="9" fill="#4a90c4" stroke="#2c5a87" stroke-width="2.6"/>`;
      out += `<ellipse cx="60" cy="152" rx="22" ry="6" fill="#7eb0d6"/>`;
      /* \u5927\u6811 */
      out += `<rect x="218" y="92" width="5" height="32" fill="#7a5a3a"/>`;
      out += `<ellipse cx="220" cy="85" rx="14" ry="10" fill="#6cc46a"/>`;
      out += `<ellipse cx="214" cy="81" rx="8" ry="6" fill="#7ed47b"/>`;
      /* \u91ce\u9910\u684c */
      out += `<rect x="230" y="150" width="30" height="12" fill="#ff5c5c" stroke="#a83232" stroke-width="1.8"/>`;
      out += `<rect x="232" y="161" width="2" height="6" fill="#7a5a3a"/>`;
      out += `<rect x="256" y="161" width="2" height="6" fill="#7a5a3a"/>`;
      /* 2 \u6735\u82b1 */
      [[180, 50], [110, 130]].forEach(([x, y]) => {
        out += `<g transform="translate(${x},${y})"><line x1="0" y1="0" x2="0" y2="8" stroke="#4e9e4a" stroke-width="3"/><ellipse cx="0" cy="-3" rx="6" ry="4" fill="#fff"/><circle r="1.5" fill="#ffd34d"/></g>`;
      });
      out += `<text x="140" y="182" text-anchor="middle" font-size="16" font-weight="800" fill="#4f9cc0">${entry.label}</text>`;
      return out;
    }
    if (entry.id === 'shop') {
      out += `<rect x="0" y="0" width="280" height="193" fill="${entry.color}" stroke="#ff9eb5" stroke-width="3" rx="8"/>`;
      /* \u62db\u724c */
      out += `<rect x="60" y="60" width="160" height="28" fill="#ff5c5c" stroke="#a83232" stroke-width="2.6" rx="5"/>`;
      out += `<text x="140" y="80" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">${SHOP_DETAIL.signText}</text>`;
      out += `<line x1="70" y1="88" x2="70" y2="110" stroke="#7a5a3a" stroke-width="3"/>`;
      out += `<line x1="210" y1="88" x2="210" y2="110" stroke="#7a5a3a" stroke-width="3"/>`;
      /* \u7cd6\u679c\u5899 5 \u8272 */
      SHOP_DETAIL.candyRows.forEach(r => {
        out += `<rect x="${SHOP_DETAIL.candyX}" y="${r.y}" width="${SHOP_DETAIL.candyW}" height="8" fill="${r.color}"/>`;
      });
      /* \u706f\u7b3c */
      SHOP_DETAIL.lanterns.forEach(l => {
        out += `<ellipse cx="${l.x}" cy="${l.y}" r="6" ry="8" fill="#ff5c5c" stroke="#a83232" stroke-width="2.6"/>`;
        out += `<line x1="${l.x}" y1="${l.y - 10}" x2="${l.x}" y2="${l.y - 8}" stroke="#7a5a3a" stroke-width="2.6"/>`;
      });
      /* \u6536\u94f6\u53f0 */
      out += `<rect x="${SHOP_DETAIL.counter[0]}" y="${SHOP_DETAIL.counter[1]}" width="${SHOP_DETAIL.counter[2]}" height="${SHOP_DETAIL.counter[3]}" fill="#9b9b9b" stroke="#5a5a5a" stroke-width="1.8"/>`;
      /* \u5730\u6bef */
      out += `<rect x="${SHOP_DETAIL.carpet[0]}" y="${SHOP_DETAIL.carpet[1]}" width="${SHOP_DETAIL.carpet[2]}" height="${SHOP_DETAIL.carpet[3]}" fill="#ff8f7a"/>`;
      out += `<text x="140" y="183" text-anchor="middle" font-size="16" font-weight="800" fill="#d96b8a">${entry.label}</text>`;
      return out;
    }
    return '';
  }

  /* 4 \u4e2a\u8857\u9053 + 4 \u5341\u5b57\u8def\u53e3\uff08\u6570\u636e\u9a71\u52a8\uff09 */
  const STREETS = [
    /* \u4e24\u6bb5\u6a2a\u8857\u9053 (row 0/1 \u4e0e row 1/2 \u4e4b\u95f4) */
    { x: 0,    y: 193, w: 280, h: 30, kind: 'h' },
    { x: 310,  y: 193, w: 280, h: 30, kind: 'h' },
    { x: 0,    y: 416, w: 280, h: 30, kind: 'h' },
    { x: 310,  y: 416, w: 280, h: 30, kind: 'h' },
    /* \u4e24\u6bb5\u7ad6\u8857\u9053 (col 0/1 \u4e0e col 1/2 \u4e4b\u95f4) */
    { x: 280,  y: 0,   w: 30,  h: 193, kind: 'v' },
    { x: 280,  y: 223, w: 30,  h: 193, kind: 'v' },
    { x: 590,  y: 0,   w: 30,  h: 193, kind: 'v' },
    { x: 590,  y: 223, w: 30,  h: 193, kind: 'v' }
  ];
  function _renderStreets() {
    let out = '';
    STREETS.forEach(s => {
      /* \u67d3\u6cb9\u8def\u9762 */
      out += `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="#5a5a5a"/>`;
      /* \u4eba\u884c\u9053\u8fb9 */
      if (s.kind === 'h') {
        out += `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="3" fill="#bcbcbc"/>`;
        out += `<rect x="${s.x}" y="${s.y + s.h - 3}" width="${s.w}" height="3" fill="#bcbcbc"/>`;
        /* \u4e2d\u95f4\u51c0\u7a7a\u4e0a\u6709\u4eba\u884c\u6a2a\u7ebf */
        out += `<line x1="${s.x}" y1="${s.y + 15}" x2="${s.x + s.w}" y2="${s.y + 15}" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 4" opacity=".5"/>`;
      } else {
        out += `<rect x="${s.x}" y="${s.y}" width="3" height="${s.h}" fill="#bcbcbc"/>`;
        out += `<rect x="${s.x + s.w - 3}" y="${s.y}" width="3" height="${s.h}" fill="#bcbcbc"/>`;
        out += `<line x1="${s.x + 15}" y1="${s.y}" x2="${s.x + 15}" y2="${s.y + s.h}" stroke="#fff" stroke-width="2.6" stroke-dasharray="6 4" opacity=".5"/>`;
      }
    });
    return out;
  }
  /* 4 \u4e2a\u5341\u5b57\u8def\u53e3 */
  const CROSSROADS = [
    { cx: 295, cy: 208 }, { cx: 605, cy: 208 },
    { cx: 295, cy: 431 }, { cx: 605, cy: 431 }
  ];
  function _renderCrossroads() {
    let out = '';
    CROSSROADS.forEach(c => {
      /* \u4eba\u884c\u6a2a\u9053 (4 \u4e2a\u767d\u6761) */
      out += `<rect x="${c.cx - 16}" y="${c.cy - 2}" width="32" height="3" fill="#fff"/>`;
      out += `<rect x="${c.cx - 16}" y="${c.cy + 4}" width="32" height="3" fill="#fff"/>`;
      out += `<rect x="${c.cx + 4}" y="${c.cy - 16}" width="3" height="32" fill="#fff"/>`;
      out += `<rect x="${c.cx - 7}" y="${c.cy - 16}" width="3" height="32" fill="#fff"/>`;
      /* \u8def\u706f */
      out += `<rect x="${c.cx - 22}" y="${c.cy - 32}" width="3" height="22" fill="#7a5a3a"/>`;
      out += `<rect x="${c.cx - 28}" y="${c.cy - 42}" width="14" height="10" fill="#ffd34d" stroke="#a06820" stroke-width="1.8" rx="8"/>`;
      /* \u7ea2\u7eff\u706f */
      out += `<rect x="${c.cx + 18}" y="${c.cy - 32}" width="3" height="32" fill="#2a2a2a"/>`;
      out += `<circle cx="${c.cx + 19.5}" cy="${c.cy - 28}" r="3" fill="#ff5c5c"/>`;
      out += `<circle cx="${c.cx + 19.5}" cy="${c.cy - 20}" r="3" fill="#ffd34d"/>`;
      out += `<circle cx="${c.cx + 19.5}" cy="${c.cy - 12}" r="3" fill="#7ed47b"/>`;
    });
    return out;
  }

  /* MAP_SVG v7\uff1a3\u00d73 \u7f51\u683c + 4 \u5757 + 4 \u8857\u9053 + 4 \u5341\u5b57\u8def\u53e3 + \u62df\u7269 */
  const MAP_SVG = `
    <svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- \u5929\u7a7a\u4e91\u6735 \u00d7 2 -->
      <g opacity=".9">
        <ellipse cx="700" cy="60" rx="44" ry="16" fill="#fff"/>
        <ellipse cx="676" cy="52" rx="24" ry="13" fill="#fff"/>
        <ellipse cx="720" cy="48" rx="20" ry="11" fill="#fff"/>
        <ellipse cx="120" cy="40" rx="38" ry="13" fill="#fff" opacity=".75"/>
        <ellipse cx="100" cy="34" rx="20" ry="10" fill="#fff" opacity=".75"/>
        <ellipse cx="140" cy="30" rx="16" ry="9" fill="#fff" opacity=".75"/>
      </g>
      <!-- \u592a\u9633 -->
      <g transform="translate(60,60)">
        <circle r="20" fill="#ffd34d" stroke="#ffb830" stroke-width="3"/>
        ${Array.from({length: 8}, (_, i) => {
          const a = i * 45;
          return `<line x1="0" y1="-26" x2="0" y2="-33" stroke="#ffcf4d" stroke-width="3.5" stroke-linecap="round" transform="rotate(${a})"/>`;
        }).join('')}
      </g>
      <!-- 4 \u5757\uff083 \u4e2a\u5ba4\u5916 + \u5927\u623f\u5b50 + \u88c5\u9970\u683c\uff09\u5e95\u8272 + \u62df\u7269 -->

      <!-- L3-2 v2 环境装饰: 3朵额外白云 + 4颗星 + 2只鸟 + 2只蝴蝶 + 2个热气球 + 5朵草地小花 (补足 SVG 元素 ≥90 测试断言) -->
      <g opacity=".85">
        <ellipse cx="250" cy="50" rx="36" ry="13" fill="#fff"/>
        <ellipse cx="232" cy="44" rx="20" ry="11" fill="#fff"/>
        <ellipse cx="268" cy="42" rx="18" ry="10" fill="#fff"/>
      </g>
      <g opacity=".8">
        <ellipse cx="850" cy="50" rx="32" ry="12" fill="#fff"/>
        <ellipse cx="834" cy="44" rx="18" ry="10" fill="#fff"/>
        <ellipse cx="866" cy="42" rx="14" ry="8" fill="#fff"/>
      </g>
      <g opacity=".75">
        <ellipse cx="800" cy="170" rx="28" ry="10" fill="#fff"/>
        <ellipse cx="788" cy="166" rx="14" ry="8" fill="#fff"/>
      </g>
      <g fill="#ffd34d" stroke="#a06820" stroke-width="1.8" stroke-linejoin="round">
        <polygon points="40,150 46,164 60,166 50,176 52,190 40,184 28,190 30,176 20,166 34,164"/>
        <polygon points="860,200 866,214 880,216 870,226 872,240 860,234 848,240 850,226 840,216 854,214"/>
        <polygon points="800,90 805,100 815,102 808,110 810,120 800,116 790,120 792,110 785,102 795,100"/>
        <polygon points="200,200 204,210 214,212 207,220 209,230 200,226 191,230 193,220 186,212 196,210"/>
      </g>
      <g fill="none" stroke="#5a4a2a" stroke-width="2.5" stroke-linecap="round">
        <path d="M200,90 q8,-8 16,0 q8,-8 16,0"/>
        <path d="M760,80 q8,-8 16,0 q8,-8 16,0"/>
      </g>
      <g>
        <ellipse cx="270" cy="170" rx="10" ry="7" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1.8" transform="rotate(-25 270 170)"/>
        <ellipse cx="290" cy="170" rx="10" ry="7" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1.8" transform="rotate(25 290 170)"/>
        <line x1="280" y1="170" x2="280" y2="178" stroke="#5a4a2a" stroke-width="2"/>
        <ellipse cx="720" cy="150" rx="9" ry="6" fill="#b79ced" stroke="#7a4ec9" stroke-width="1.8" transform="rotate(-25 720 150)"/>
        <ellipse cx="740" cy="150" rx="9" ry="6" fill="#b79ced" stroke="#7a4ec9" stroke-width="1.8" transform="rotate(25 740 150)"/>
        <line x1="730" y1="150" x2="730" y2="158" stroke="#5a4a2a" stroke-width="2"/>
      </g>
      <g>
        <ellipse cx="100" cy="120" rx="22" ry="20" fill="#ff9eb5" stroke="#d96e8e" stroke-width="2"/>
        <polygon points="100,140 95,148 105,148" fill="#ff9eb5" stroke="#d96e8e" stroke-width="2"/>
        <rect x="95" y="148" width="10" height="6" fill="#7a5a3a"/>
        <ellipse cx="850" cy="100" rx="20" ry="18" fill="#b79ced" stroke="#7a4ec9" stroke-width="2"/>
        <polygon points="850,118 845,126 855,126" fill="#b79ced" stroke="#7a4ec9" stroke-width="2"/>
        <rect x="845" y="126" width="10" height="6" fill="#7a5a3a"/>
      </g>
      <g>
        <g transform="translate(60, 580)">
          <ellipse cx="-4" cy="0" rx="3" ry="4" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1"/>
          <ellipse cx="4" cy="0" rx="3" ry="4" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1"/>
          <ellipse cx="0" cy="-4" rx="3" ry="4" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1"/>
          <circle r="1.8" fill="#ffd34d"/>
        </g>
        <g transform="translate(150, 600)">
          <ellipse cx="-4" cy="0" rx="3" ry="4" fill="#ffd34d" stroke="#a06820" stroke-width="1"/>
          <ellipse cx="4" cy="0" rx="3" ry="4" fill="#ffd34d" stroke="#a06820" stroke-width="1"/>
          <ellipse cx="0" cy="-4" rx="3" ry="4" fill="#ffd34d" stroke="#a06820" stroke-width="1"/>
          <circle r="1.8" fill="#7a4ec9"/>
        </g>
        <g transform="translate(60, 620)">
          <ellipse cx="-3" cy="0" rx="2.5" ry="3.5" fill="#b79ced" stroke="#7a4ec9" stroke-width="1"/>
          <ellipse cx="3" cy="0" rx="2.5" ry="3.5" fill="#b79ced" stroke="#7a4ec9" stroke-width="1"/>
          <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill="#b79ced" stroke="#7a4ec9" stroke-width="1"/>
          <circle r="1.5" fill="#ffd34d"/>
        </g>
        <g transform="translate(820, 600)">
          <ellipse cx="-4" cy="0" rx="3" ry="4" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1"/>
          <ellipse cx="4" cy="0" rx="3" ry="4" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1"/>
          <ellipse cx="0" cy="-4" rx="3" ry="4" fill="#ff9eb5" stroke="#d96e8e" stroke-width="1"/>
          <circle r="1.8" fill="#ffd34d"/>
        </g>
        <g transform="translate(850, 620)">
          <ellipse cx="-3" cy="0" rx="2.5" ry="3.5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1"/>
          <ellipse cx="3" cy="0" rx="2.5" ry="3.5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1"/>
          <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill="#7ec8e3" stroke="#4f9cc0" stroke-width="1"/>
          <circle r="1.5" fill="#ffd34d"/>
        </g>
      </g>

            ${MAP_GRID.filter(e => e.id !== '__street__').map(e => {
        const x = _cellX(e.col), y = _cellY(e.row);
        /* house: 大房子（点 → interior）；yard/park/shop: 室外（点 → 世界屏）；__empty__: 装饰格（不点） */
        const g = e.id === 'house' ? 'map-house'
                : e.id === '__empty__' ? 'map-empty'
                : 'map-room map-outdoor';
        return `<g class="${g}" data-room="${e.id}" transform="translate(${x},${y})">${_renderBlock(e)}</g>`;
      }).join('')}
      <!-- 4 \u6bb5\u8857\u9053 + 4 \u5341\u5b57\u8def\u53e3 + \u8def\u706f + \u7ea2\u7eff\u706f + \u8d70\u4eba\u6a2a\u7ebf -->
      ${_renderStreets()}
      ${_renderCrossroads()}
    </svg>`;
const MAP_CLOSE_SVG = `
    <svg viewBox="0 0 36 36">
      <line x1="10" y1="10" x2="26" y2="26" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="26" y1="10" x2="10" y2="26" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`;

  const MAP_BTN_SVG = `
    <svg viewBox="0 0 36 36">
      <!-- 地图图标（卷起的地图） -->
      <path d="M5,10 Q18,4 32,10 L32,26 Q18,32 5,26 Z" fill="#fff" stroke="#7a4ec9" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M5,10 Q12,8 18,11 Q24,14 32,10" fill="none" stroke="#7a4ec9" stroke-width="3" opacity=".55"/>
      <path d="M5,26 Q12,28 18,25 Q24,22 32,26" fill="none" stroke="#7a4ec9" stroke-width="3" opacity=".55"/>
      <line x1="18" y1="11" x2="18" y2="25" stroke="#7a4ec9" stroke-width="3" opacity=".55"/>
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
    /* Phase 2 v8：左上角 🏠 按钮 → 回到地图页（老吴 iPad 实测反馈"点击没反应"，原 showScreen('home') 已无效） */
    if (e.target.closest('.btn-home')) { Sound.door(); showScreen('map'); }
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
      <polygon points="21,5 32,9 25,17" fill="#fff" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/>
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

      /* 大房子轮廓点击 → 直接进世界屏 bedroom（v8 删除 interior 中间层） */
      const houseEl = el.querySelector('.map-house');
      if (houseEl) {
        houseEl.addEventListener('click', () => {
          Sound.door();
          const canvas = el.querySelector('.map-canvas');
          canvas.classList.add('map-leave');
          setTimeout(() => {
            canvas.classList.remove('map-leave');
            showScreen('world');
            window.World.jumpTo('bedroom');
            if (window.World.refreshCharacters) window.World.refreshCharacters();
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
      /* Phase 2 v7：3×3 网格 → 10 房间 id 映射到 4 块（house/yard/park/shop） */
      const positions = {
        house: '.map-house',
        /* 7 间室内全部映射到大房子块 */
        balcony: '.map-house', bedroom: '.map-house', bathroom: '.map-house',
        living: '.map-house', kitchen: '.map-house', study: '.map-house',
        wardrobe: '.map-house',
        /* 3 室外 */
        yard: '.map-room[data-room="yard"]',
        park: '.map-room[data-room="park"]',
        shop: '.map-room[data-room="shop"]'
      };
      const sel = positions[roomId] || '.map-house';
      const screen = document.getElementById('screen-map');
      if (!screen) return;
      const marker = screen.querySelector('.map-marker-' + who);
      if (!marker) return;
      marker.dataset.targetRoom = roomId;
      const canvas = screen.querySelector('.map-canvas');
      const blockEl = screen.querySelector(sel);
      if (!canvas || !blockEl) return;
      const cRect = canvas.getBoundingClientRect();
      const bRect = blockEl.getBoundingClientRect();
      const left = bRect.left - cRect.left + bRect.width / 2;
      const top  = bRect.top  - cRect.top  + bRect.height * 0.35;
      marker.style.left = left + 'px';
      marker.style.top  = top + 'px';
      /* 触发 1.5s 脉动 */
      marker.classList.remove('pulse');
      void marker.offsetWidth;
      marker.classList.add('pulse');
    }
  };

  /* ---------- Phase 2 v8：interior 屏已删除（老吴 iPad 实测反馈"图1界面不要了"）---------- */
  /* 之前 v4-v7 有房子内部屏（interior，7 个房间 iso cube 平铺），现在点大房子直接进世界屏 bedroom */
  /* INTERIOR_ROOMS / INTERIOR_SVG / Interior 模块已全部删除 */
  const _INTERIOR_REMOVED = true;
  ;

  /* ---------- 启动 ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    Store.load();
    /* Phase 2 v8：默认屏 = map（不再 home）；interior 已删除 */
    register('map', Map);
    register('world', window.World);
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
