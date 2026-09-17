/* ============ 卧室：装饰房间 ============ */
(function () {
  'use strict';

  const R = () => window.RoomAssets;

  let el = null;
  let cleanMode = false;
  let palettePop = null;   // 当前打开的调色板
  let drag = null;

  const PRAISE = ['好漂亮呀！', '房间真好看！', '你真棒！', '布置得真好！'];

  /* ---------- 渲染 ---------- */
  function applyDecor() {
    const r = Store.state.room;
    R().applyBg(el.querySelector('.room-wall'), R().WALLS[r.wall % R().WALLS.length]);
    R().applyBg(el.querySelector('.room-floor'), R().FLOORS[r.floor % R().FLOORS.length]);
  }

  function renderItems() {
    const area = el.querySelector('.room-area');
    area.querySelectorAll('.room-item').forEach(n => n.remove());
    Store.state.room.items.forEach((it, i) => area.appendChild(makeItemEl(it, i)));
  }

  function makeItemEl(it, i) {
    const def = R().ITEMS[it.id];
    const vb = def.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const div = document.createElement('div');
    div.className = 'room-item' + (def.flat ? ' flat' : '') + (cleanMode ? ' removable' : '');
    div.dataset.i = i;
    div.style.left = (it.x * 100) + '%';
    div.style.top = (it.y * 100) + '%';
    div.style.width = (def.w * 100) + '%';
    if (vb) div.style.aspectRatio = vb[1] + ' / ' + vb[2];
    div.style.zIndex = def.flat ? 1 : 10;
    div.innerHTML = def.svg;
    return div;
  }

  function renderDollAndCat() {
    const d = Store.state.doll;
    const doll = el.querySelector('.room-doll');
    doll.style.color = window.DollAssets.HAIR_COLORS[d.hairColor % window.DollAssets.HAIR_COLORS.length];
    doll.innerHTML = window.dollHTML(d);
    el.querySelector('.room-cat').innerHTML = window.catHTML(d.catAcc);
  }

  function renderAll() { applyDecor(); renderItems(); renderDollAndCat(); }

  /* ---------- 增删物品 ---------- */
  function addItem(id) {
    const def = R().ITEMS[id];
    const it = {
      id,
      x: 0.5 + (Math.random() - 0.5) * 0.14,
      y: def.flat || !['frame', 'clock'].includes(id) ? 0.55 + Math.random() * 0.2 : 0.22 + Math.random() * 0.14,
    };
    Store.state.room.items.push(it);
    Store.save();
    const node = makeItemEl(it, Store.state.room.items.length - 1);
    node.classList.add('pop-in');
    el.querySelector('.room-area').appendChild(node);
    Sound.thud();
    const rect = node.getBoundingClientRect();
    FX.sparkles(el, rect.left + rect.width / 2, rect.top + rect.height / 2, 7);
  }

  function removeItem(node) {
    const idx = +node.dataset.i;
    const rect = node.getBoundingClientRect();
    FX.poof(el, rect.left + rect.width / 2, rect.top + rect.height / 2);
    Sound.poof();
    node.style.transition = 'transform .28s ease-in, opacity .28s';
    node.style.transform += ' scale(0)';
    node.style.opacity = '0';
    setTimeout(() => {
      Store.state.room.items.splice(idx, 1);
      Store.save();
      renderItems();
    }, 260);
  }

  /* ---------- 拖动 ---------- */
  let basket = null;

  function overBasket(x, y) {
    if (!basket) return false;
    const r = basket.getBoundingClientRect();
    return x > r.left - 36 && x < r.right + 36 && y > r.top - 48 && y < r.bottom + 36;
  }

  function onPointerDown(e) {
    if (drag) return;
    const node = e.target.closest('.room-item');
    if (!node) return;
    if (cleanMode) { removeItem(node); return; }
    const area = el.querySelector('.room-area');
    const rect = area.getBoundingClientRect();
    const it = Store.state.room.items[+node.dataset.i];
    drag = {
      node, area, rect, it,
      offX: (e.clientX - rect.left) / rect.width - it.x,
      offY: (e.clientY - rect.top) / rect.height - it.y,
      lastX: e.clientX, lastY: e.clientY,
      moved: false
    };
    node.classList.add('dragging');
    try { node.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!drag) return;
    drag.lastX = e.clientX; drag.lastY = e.clientY;
    const nx = (e.clientX - drag.rect.left) / drag.rect.width - drag.offX;
    const ny = (e.clientY - drag.rect.top) / drag.rect.height - drag.offY;
    if (!drag.moved && (Math.abs(nx - drag.it.x) > 0.008 || Math.abs(ny - drag.it.y) > 0.008)) {
      drag.moved = true;
      Sound.pop();
      basket = el.querySelector('.drop-basket');
      basket && basket.classList.add('show');
    }
    if (!drag.moved) return;
    drag.it.x = Math.min(0.98, Math.max(0.02, nx));
    drag.it.y = Math.min(0.97, Math.max(0.04, ny));
    drag.node.style.left = (drag.it.x * 100) + '%';
    drag.node.style.top = (drag.it.y * 100) + '%';
    basket && basket.classList.toggle('hover', overBasket(e.clientX, e.clientY));
    e.preventDefault();
  }

  function onPointerUp(e) {
    if (!drag) return;
    const x = drag.lastX !== undefined ? drag.lastX : (e && e.clientX);
    const y = drag.lastY !== undefined ? drag.lastY : (e && e.clientY);
    drag.node.classList.remove('dragging');
    basket && basket.classList.remove('show', 'hover');
    if (drag.moved) {
      if (overBasket(x, y)) {
        removeItem(drag.node);          // 拖进收纳筐 = 收走
      } else {
        Store.save();
      }
    }
    drag = null;
    basket = null;
  }

  /* ---------- 调色板 ---------- */
  function togglePalette(kind) {
    if (palettePop) { palettePop.remove(); palettePop = null; }
    const defs = kind === 'wall' ? R().WALLS : R().FLOORS;
    const cur = kind === 'wall' ? Store.state.room.wall : Store.state.room.floor;
    const pop = document.createElement('div');
    pop.className = 'palette-pop';
    defs.forEach((def, i) => {
      const s = document.createElement('div');
      s.className = 'swatch';
      R().applyBg(s, def);
      if (i === cur % defs.length) s.style.boxShadow = '0 0 0 4px #ffd34d, 0 3px 6px rgba(0,0,0,.15)';
      s.addEventListener('click', () => {
        if (kind === 'wall') Store.state.room.wall = i;
        else Store.state.room.floor = i;
        Store.save();
        applyDecor();
        Sound.chime();
        Sound.praiseRandom(['换个新样子！', '真好看！']);
        pop.remove(); palettePop = null;
      });
      pop.appendChild(s);
    });
    el.querySelector('.game-stage').appendChild(pop);
    palettePop = pop;
  }

  /* ---------- 模块定义 ---------- */
  window.Room = {
    init(root) {
      el = root;
      el.innerHTML = `
        <div class="game-top">${window.homeButtonHTML}</div>
        <div class="game-stage">
          <div class="room-area">
            <div class="room-wall"></div>
            <div class="room-floor"></div>
            <div class="room-doll"></div>
            <div class="room-cat"></div>
          </div>
        </div>
        <div class="game-toolbar">
          <div class="tab-row">
            <button class="btn-palette" data-kind="wall" aria-label="换墙纸">
              <svg viewBox="0 0 36 36">
                <rect x="4" y="4" width="28" height="28" rx="7" fill="#ffb3c7"/>
                <rect x="4" y="4" width="28" height="10" rx="5" fill="#9ad7f0"/>
                <circle cx="25" cy="23" r="5" fill="#ffd34d"/>
              </svg>
            </button>
            <button class="btn-palette" data-kind="floor" aria-label="换地板">
              <svg viewBox="0 0 36 36">
                <rect x="4" y="4" width="28" height="28" rx="7" fill="#e8b97e"/>
                <line x1="4" y1="15" x2="32" y2="15" stroke="#dca96b" stroke-width="3"/>
                <line x1="4" y1="26" x2="32" y2="26" stroke="#dca96b" stroke-width="3"/>
                <line x1="15" y1="4" x2="15" y2="15" stroke="#dca96b" stroke-width="3"/>
                <line x1="24" y1="15" x2="24" y2="26" stroke="#dca96b" stroke-width="3"/>
              </svg>
            </button>
            <button class="btn-clean" aria-label="收起东西">
              <svg viewBox="0 0 36 36">
                <rect x="14" y="5" width="8" height="4" rx="2" fill="#fff"/>
                <rect x="7" y="9" width="22" height="5" rx="2.5" fill="#fff"/>
                <path d="M9,14 L27,14 L25,31 Q18,33 11,31 Z" fill="#fff"/>
                <line x1="14" y1="18" x2="15" y2="28" stroke="#ff8f8f" stroke-width="2.4" stroke-linecap="round"/>
                <line x1="18" y1="18" x2="18" y2="28" stroke="#ff8f8f" stroke-width="2.4" stroke-linecap="round"/>
                <line x1="22" y1="18" x2="21" y2="28" stroke="#ff8f8f" stroke-width="2.4" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="item-drawer"></div>
        </div>
        <div class="clean-banner hidden">🗑 点一下，收走不想要的东西</div>
        <div class="drop-basket">
          <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg">
            <path d="M35,34 Q60,6 85,34" stroke="#c98443" stroke-width="8" fill="none" stroke-linecap="round"/>
            <path d="M20,38 L100,38 L88,96 Q60,106 32,96 Z" fill="#e8a86b"/>
            <path d="M30,48 L90,48 M28,60 L92,60 M31,72 L89,72 M35,84 L85,84" stroke="#d1924f" stroke-width="3" stroke-linecap="round"/>
            <rect x="14" y="30" width="92" height="14" rx="7" fill="#c98443"/>
            <path d="M60,44 l3,7 8,0.7 -6,5.4 1.8,7.7 -6.8,-4.2 -6.8,4.2 1.8,-7.7 -6,-5.4 8,-0.7z" fill="#ffd34d"/>
          </svg>
        </div>`;

      /* 抽屉 */
      const drawer = el.querySelector('.item-drawer');
      drawer.innerHTML = R().ORDER.map(id => {
        const def = R().ITEMS[id];
        const vb = def.svg.match(/viewBox="([^"]*)"/)[1];
        const inner = def.svg.replace(/<svg[^>]*>|<\/svg>/g, '');
        return `<div class="item-card" data-id="${id}">
          <svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>
        </div>`;
      }).join('');
      drawer.addEventListener('click', e => {
        const card = e.target.closest('.item-card');
        if (!card) return;
        addItem(card.dataset.id);
      });

      /* 墙纸 / 地板 / 收起模式 */
      el.querySelectorAll('.btn-palette').forEach(b =>
        b.addEventListener('click', () => { Sound.pop(); togglePalette(b.dataset.kind); }));
      el.querySelector('.btn-clean').addEventListener('click', function () {
        cleanMode = !cleanMode;
        this.classList.toggle('on', cleanMode);
        el.querySelector('.clean-banner').classList.toggle('hidden', !cleanMode);
        el.querySelectorAll('.room-item').forEach(n => n.classList.toggle('removable', cleanMode));
        Sound.pop();
        Sound.praise(cleanMode ? '点一点，收走不想要的东西' : '继续布置吧');
      });

      /* 娃娃/小猫点一点互动 */
      const wiggle = (wrap, cls) => {
        wrap.classList.remove(cls);
        void wrap.offsetWidth;
        wrap.classList.add(cls);
        const r = wrap.getBoundingClientRect();
        FX.sparkles(el, r.left + r.width / 2, r.top + r.height * 0.4, 7);
      };
      el.querySelector('.room-doll').addEventListener('pointerdown', function () {
        if (drag) return;
        wiggle(this, 'happy-jump');
        Sound.sparkle();
        Sound.praiseRandom(['咯咯咯～', '我最喜欢这个房间啦！', '抱抱！']);
      });
      el.querySelector('.room-cat').addEventListener('pointerdown', function () {
        if (drag) return;
        wiggle(this, 'happy-jump');
        Sound.munch();
        Sound.praiseRandom(['喵～', '喵呜！']);
      });

      /* 拖动 */
      const area = el.querySelector('.room-area');
      area.addEventListener('pointerdown', onPointerDown);
      area.addEventListener('pointermove', onPointerMove);
      area.addEventListener('pointerup', onPointerUp);
      area.addEventListener('pointercancel', onPointerUp);

      renderAll();
    },
    onEnter() {
      renderAll();
      window.hintOnce('room', '点下面的家具放进房间，用手指拖一拖，不想要的拖到小筐里');
    },
    onLeave() {
      cleanMode = false;
      const b = el && el.querySelector('.btn-clean');
      if (b) b.classList.remove('on');
      const banner = el && el.querySelector('.clean-banner');
      if (banner) banner.classList.add('hidden');
      if (palettePop) { palettePop.remove(); palettePop = null; }
    }
  };
})();
