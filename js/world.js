/* ============ 世界模块：横向大房子（米加小镇式） ============
   相机拖动吸附 | 家具/角色/食物三套拖拽 | 点地走路 | 喂食 | 冰箱/衣柜/灶台互动 */
(function () {
  'use strict';

  const R = () => window.RoomAssets;
  const K = () => window.KitchenAssets;

  const PRAISE_MOVE = ['我们出发喽！', '去别的房间看看！', '咚咚咚，走路啦！'];
  const PRAISE_EAT = ['真好吃！', '太好吃了！', '啊呜——吃掉啦！', 'yum yum 真香！'];
  const PRAISE_DRINK = ['咕咚咕咚，真解渴！', '喝水身体好！'];

  let el = null;            // screen-world
  let stage = null, track = null;
  let cam = 0;              // 当前相机房间索引
  let roomW = 0;            // 单房间像素宽
  let cleanMode = false;
  let palettePop = null;
  let foodDrawer = false;   // 冰箱食物抽屉开着
  let drag = null;          // 统一拖拽状态 {kind:'item'|'char'|'prop'|'pan', ...}

  const roomState = id => Store.state.rooms[id];
  const roomIdx = id => R().WORLD_ROOMS.indexOf(id);
  const roomAt = i => R().WORLD_ROOMS[i] || 'living';

  /* ---------- 相机 ---------- */
  function applyCam(animate) {
    track.style.transition = animate === false ? 'none' : 'transform .45s cubic-bezier(.22,.61,.36,1)';
    track.style.transform = `translateX(${-cam * roomW}px)`;
    el && el.querySelectorAll('.world-dot').forEach((d, i) =>
      d.classList.toggle('active', i === cam));
    const left = el && el.querySelector('.world-arrow.left');
    const right = el && el.querySelector('.world-arrow.right');
    if (left) left.classList.toggle('hidden', cam <= 0);
    if (right) right.classList.toggle('hidden', cam >= R().WORLD_ROOMS.length - 1);
    Store.state.lastRoom = roomAt(cam);
    Store.save();
    /* 让世界屏外框跟随当前房间墙色：safe-area padding 让 toolbar 两侧露出一条边，
       之前是 `#app` 浅蓝；现在统一为墙色，肉眼看不到"露蓝"。无 bgColor 时兜底肉色。 */
    if (el) {
      const wallDef = R().WALLS[roomState(roomAt(cam)).wall % R().WALLS.length];
      el.style.background = wallDef.bgColor || '#f4e7d7';
    }
  }

  function measure() {
    roomW = stage.getBoundingClientRect().width;
    applyCam(false);
    refreshCharacters();
  }

  function jumpTo(roomId) {
    const i = roomIdx(roomId);
    if (i >= 0) { cam = i; applyCam(); renderToolbar(); }
  }

  /* ---------- 房间渲染 ---------- */
  function applyDecor(roomId) {
    const sec = track.querySelector(`.world-room[data-room="${roomId}"]`);
    const r = roomState(roomId);
    R().applyBg(sec.querySelector('.room-wall'), R().WALLS[r.wall % R().WALLS.length]);
    R().applyBg(sec.querySelector('.room-floor'), R().FLOORS[r.floor % R().FLOORS.length]);
  }

  function makeItemEl(it, i, roomId) {
    const def = R().ITEMS[it.id];
    const vb = def.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const div = document.createElement('div');
    div.className = 'room-item' + (def.flat ? ' flat' : '') + (cleanMode ? ' removable' : '');
    div.dataset.i = i;
    div.dataset.room = roomId;
    div.style.left = (it.x * 100) + '%';
    div.style.top = (it.y * 100) + '%';
    div.style.width = (def.w * 100) + '%';
    if (vb) div.style.aspectRatio = vb[1] + ' / ' + vb[2];
    div.style.zIndex = def.flat ? 1 : 10;
    div.innerHTML = def.svg;
    return div;
  }

  function renderRoom(roomId) {
    const sec = track.querySelector(`.world-room[data-room="${roomId}"]`);
    const layer = sec.querySelector('.room-layer');
    layer.innerHTML = '';
    roomState(roomId).items.forEach((it, i) => layer.appendChild(makeItemEl(it, i, roomId)));
    /* 固定装置 */
    (R().FIXTURES[roomId] || []).forEach(id => {
      const def = R().ITEMS[id];
      const vb = def.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
      const f = document.createElement('div');
      f.className = 'world-fixture';
      f.dataset.act = def.act;
      f.style.left = (def.fx * 100) + '%';
      f.style.width = (def.w * 100) + '%';
      if (vb) f.style.aspectRatio = vb[1] + ' / ' + vb[2];
      f.style.zIndex = 250;
      f.innerHTML = def.svg;
      layer.appendChild(f);
    });
    /* 食物道具（只画本房间的） */
    Store.state.props.forEach(p => {
      if (p.room === roomId) layer.appendChild(makePropEl(p));
    });
  }

  /* ---------- 角色 ---------- */
  function charEl(who) { return track.querySelector('#char-' + who); }

  /* 动态算最大 y：根据 stage 实际高度和 character 实际尺寸，
     保证 character bottom ≤ toolbar top - 4。capMaxY=0.65 是大屏兜底。 */
  function maxCharY() {
    const stageRect = stage.getBoundingClientRect();
    const tbRect = document.querySelector('#screen-world .game-toolbar').getBoundingClientRect();
    const charElNode = charEl('girl') || charEl('cat');
    const charHeight = charElNode.offsetHeight || 100;
    /* stage.bottom = toolbar.top；character top = stage.top + c.y * stage.height
       要 character bottom ≤ toolbar.top - 4，即 top + charHeight ≤ toolbar.top - 4
       即 stage.top + c.y * stage.height ≤ toolbar.top - 4 - charHeight
       即 c.y ≤ (toolbar.top - 4 - charHeight - stage.top) / stage.height
       大屏时结果 > 0.65，用 capMaxY=0.65 兜底。 */
    const usableY = (tbRect.top - 4 - charHeight - stageRect.top) / stageRect.height;
    return Math.max(0.42, Math.min(0.65, usableY));
  }

  function renderChar(who) {
    const c = Store.state.char[who];
    /* clamp y on render too — 用 maxCharY() 动态算（防止 headless 小视口下 character 溢出 toolbar） */
    c.y = Math.min(maxCharY(), Math.max(0.42, c.y));
    const node = charEl(who);
    /* 关键 — 防止 CSS transition 把人留在动画中间态（refreshCharacters 在 .map-leave 切屏时调，
       测试 sleep(300) 只跑了 ~80ms，0.5s transition 还在中间，画面看着还在 0.72） */
    node.style.transitionDuration = '0s';
    node.style.left = (roomIdx(c.room) * roomW + c.x * roomW) + 'px';
    node.style.top = (c.y * 100) + '%';
    node.querySelector('.char-inner').style.transform = `scaleX(${c.face})`;
    if (who === 'girl') {
      const d = Store.state.doll;
      node.style.color = window.DollAssets.HAIR_COLORS[d.hairColor % window.DollAssets.HAIR_COLORS.length];
      node.querySelector('.char-body').innerHTML = window.dollHTML(d);
    } else {
      node.querySelector('.char-body').innerHTML = window.catHTML(Store.state.doll.catAcc);
    }
    /* 头顶携带物：null 时整块隐藏；非 null 时渲染对应 SVG 缩略图 */
    const h = node.querySelector('.char-holding');
    if (h) {
      if (c.holding && c.holding.id) {
        h.innerHTML = holdingSVG(c.holding.id);
        h.classList.remove('hidden');
      } else {
        h.innerHTML = '';
        h.classList.add('hidden');
      }
    }
  }

  /* 头顶携带物的 SVG 缩略图：从 K().ING（食物）或 R().ITEMS（道具）里取，再用 fixed 50px 缩放。
     找不到时退到通用灰色圆，避免空白。 */
  function holdingSVG(id) {
    const ing = K() && K().ING && K().ING[id];
    const itm = R() && R().ITEMS && R().ITEMS[id];
    const src = ing || itm;
    const svg = src ? (src.svgOpen || src.svg) : '';
    if (!svg) return '<circle cx="25" cy="25" r="22" fill="#ccc"/>';
    /* 简化 SVG：去掉 viewBox 自带的 width/height，避免在 50px 容器里失控 */
    const trimmed = svg.replace(/\swidth="[^"]*"/g, '').replace(/\sheight="[^"]*"/g, '');
    /* SVG 里填 fixed 50x50 viewBox；保留 fill/stroke */
    return trimmed.replace(/<svg([^>]*)>/, '<svg$1 width="50" height="50" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">');
  }

  /* 角色手部 hitbox：覆盖角色右半 + 中段（高度 25%~80%）+ 周围一圈。
     "手里拿"应该比"头顶放"更直观：孩子拖到角色身体右侧（手伸出的位置）即可触发。
     同时也覆盖角色上方 60px 的空中区，方便孩子手抖也能拿到。 */
  function charHoldHitbox(who) {
    const nr = charEl(who).getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    if (nr.left === 0 && nr.top === 0) return null;        // 角色不在可见区域
    const padX = Math.max(30, nr.width * 0.35);
    return {
      left: nr.left + nr.width * 0.25,
      right: nr.right + padX,
      top: Math.max(sr.top, nr.top + nr.height * 0.20),
      bottom: nr.top + nr.height * 0.80
    };
  }
  function overHold(who, px, py) {
    const b = charHoldHitbox(who);
    return b && px >= b.left && px <= b.right && py >= b.top && py <= b.bottom;
  }

  function refreshCharacters() { renderChar('girl'); renderChar('cat'); }

  /* 角色走路（同房间内） */
  function walkTo(who, x, y) {
    const c = Store.state.char[who];
    const node = charEl(who);
    const dx = x - c.x;
    if (Math.abs(dx) > 0.02) c.face = dx > 0 ? 1 : -1;
    c.x = Math.min(0.94, Math.max(0.06, x));
    c.y = Math.min(maxCharY(), Math.max(0.42, y));
    Store.save();
    const dist = Math.abs(dx);
    node.style.transitionDuration = Math.min(1.1, 0.35 + dist * 1.4) + 's';
    renderChar(who);
    node.classList.add('walking');
    clearTimeout(node._walkT);
    node._walkT = setTimeout(() => node.classList.remove('walking'), 900);
    if (Math.random() < 0.4) Sound.praiseRandom(PRAISE_MOVE);
  }

  /* 跨房间瞬移（拖拽放下时） */
  function placeChar(who, roomId, x, y) {
    const c = Store.state.char[who];
    c.room = roomId;
    c.x = Math.min(0.94, Math.max(0.06, x));
    c.y = Math.min(maxCharY(), Math.max(0.42, y));
    Store.save();
    const node = charEl(who);
    node.style.transitionDuration = '0s';
    renderChar(who);
    FX.sparkles(el, node.getBoundingClientRect().left + node.offsetWidth / 2, node.getBoundingClientRect().top + node.offsetHeight * 0.4, 7);
    Sound.thud();
  }

  /* ---------- 食物道具 ---------- */
  let propUid = 1;

  function makePropEl(p) {
    const svg = (K().ING[p.id] || R().ITEMS[p.id].svg);
    const vb = svg.match(/viewBox="([^"]*)"/)[1];
    const inner = svg.replace(/<svg[^>]*>|<\/svg>/g, '');
    const div = document.createElement('div');
    div.className = 'world-prop';
    div.dataset.uid = p.uid;
    div.dataset.food = p.id;
    div.style.left = (p.x * 100) + '%';
    div.style.top = (p.y * 100) + '%';
    div.innerHTML = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
    return div;
  }

  function renderProps(roomId) { renderRoom(roomId); }

  /* 食物道具上限：超过就收走最早的一个，免得一直点冰箱把场景和存档撑爆 */
  const MAX_PROPS = 30;

  function spawnFood(id) {
    if (Store.state.props.length >= MAX_PROPS) {
      const oldest = Store.state.props.shift();
      if (oldest) renderRoom(oldest.room);
    }
    const p = {
      uid: 'p' + (propUid++) + '_' + Date.now() % 100000,
      id, room: roomAt(cam),
      x: 0.68 + (Math.random() - 0.5) * 0.1,
      y: 0.8 + Math.random() * 0.06
    };
    Store.state.props.push(p);
    Store.save();
    const layer = track.querySelector(`.world-room[data-room="${p.room}"] .room-layer`);
    const node = makePropEl(p);
    node.classList.add('pop-in');
    layer.appendChild(node);
    Sound.pop();
    const rect = node.getBoundingClientRect();
    FX.sparkles(el, rect.left + rect.width / 2, rect.top + rect.height / 2, 5);
    Sound.praise('拿上' + (id === 'milk' ? '牛奶' : '水果') + '，喂给娃娃吃吧');
  }

  function eat(who, foodId) {
    const node = charEl(who);
    node.classList.remove('happy-jump');
    void node.offsetWidth;
    node.classList.add('happy-jump');
    const nr = node.getBoundingClientRect();
    if (foodId === 'milk') {
      Sound.blub();
      Sound.praiseRandom(PRAISE_DRINK);
      FX.bubbles(el, nr.left + nr.width / 2, nr.top + nr.height * 0.25, 6);
    } else {
      Sound.munch();
      Sound.praiseRandom(PRAISE_EAT);
      FX.sparkles(el, nr.left + nr.width / 2, nr.top + nr.height * 0.25, 9);
    }
  }

  /* 厨房 overlay 喂食入口：菜做好了直接端到角色面前 */
  function feedCharacter(who) {
    const c = Store.state.char[who];
    if (!c) return;
    const node = charEl(who);
    cam = roomIdx(c.room);
    applyCam();
    setTimeout(() => {
      eat(who);
      const nr = node.getBoundingClientRect();
      FX.confetti(el.closest('.screen'), 18);
      FX.sparkles(el, nr.left + nr.width / 2, nr.top + nr.height * 0.3, 12);
    }, 500);
  }

  /* ---------- 抽屉 ---------- */
  function renderToolbar() {
    const drawer = el.querySelector('.item-drawer');
    const roomId = roomAt(cam);
    if (foodDrawer && roomId === 'kitchen') {
      drawer.innerHTML = R().FOODS.map(id => {
        const svg = K().ING[id];
        const vb = svg.match(/viewBox="([^"]*)"/)[1];
        const inner = svg.replace(/<svg[^>]*>|<\/svg>/g, '');
        return `<div class="item-card" data-food="${id}">
          <svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>
        </div>`;
      }).join('');
      return;
    }
    foodDrawer = false;
    drawer.innerHTML = R().ROOM_SETS[roomId].map(id => {
      const def = R().ITEMS[id];
      const vb = def.svg.match(/viewBox="([^"]*)"/)[1];
      const inner = def.svg.replace(/<svg[^>]*>|<\/svg>/g, '');
      return `<div class="item-card" data-id="${id}">
        <svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>
      </div>`;
    }).join('');
  }

  /* ---------- 增删家具 ---------- */
  function addItem(id) {
    const def = R().ITEMS[id];
    const r = roomState(roomAt(cam));
    const it = {
      id,
      x: 0.5 + (Math.random() - 0.5) * 0.14,
      y: def.flat || !['frame', 'clock', 'bmirror', 'towelrack', 'clothline'].includes(id)
        ? 0.55 + Math.random() * 0.2 : 0.22 + Math.random() * 0.14,
    };
    r.items.push(it);
    Store.save();
    const layer = track.querySelector(`.world-room[data-room="${roomAt(cam)}"] .room-layer`);
    const node = makeItemEl(it, r.items.length - 1, roomAt(cam));
    node.classList.add('pop-in');
    layer.appendChild(node);
    Sound.thud();
    const rect = node.getBoundingClientRect();
    FX.sparkles(el, rect.left + rect.width / 2, rect.top + rect.height / 2, 7);
  }

  function removeItem(node) {
    const roomId = node.dataset.room;
    const items = roomState(roomId).items;
    /* 用对象引用定位而不是渲染时下标：清理模式下连点两件家具时，两个延时器
       都持旧下标会删错项（数组已 splice 过，下标全偏了） */
    const it = items[+node.dataset.i];
    const rect = node.getBoundingClientRect();
    FX.poof(el, rect.left + rect.width / 2, rect.top + rect.height / 2);
    Sound.poof();
    node.style.transition = 'transform .28s ease-in, opacity .28s';
    node.style.transform += ' scale(0)';
    node.style.opacity = '0';
    setTimeout(() => {
      const i = it ? items.indexOf(it) : -1;
      if (i >= 0) items.splice(i, 1);
      Store.save();
      renderRoom(roomId);
    }, 260);
  }

  /* ---------- 轻点互动（浴缸/电视/鱼缸） ---------- */
  function playInteract(node, act) {
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    if (act === 'bath') {
      FX.bubbles(el, cx, rect.top + rect.height * 0.3, 10);
      Sound.blub();
      if (Math.random() < 0.5) setTimeout(() => Sound.squeak(), 350);
      Sound.praiseRandom(['哗啦啦，洗泡泡澡！', '好多泡泡呀！', '小鸭子嘎嘎叫！']);
    } else if (act === 'tv') {
      node.animate([
        { transform: node.style.transform + ' scale(1)' },
        { transform: node.style.transform + ' scale(1.06) rotate(-1.5deg)' },
        { transform: node.style.transform + ' scale(1)' }
      ], { duration: 450, easing: 'ease-in-out' });
      FX.sparkles(el, cx, rect.top + rect.height * 0.35, 9);
      Sound.sparkle();
      Sound.praiseRandom(['动画片开始啦！', '电视亮啦！']);
    } else if (act === 'fish') {
      FX.bubbles(el, cx, rect.top + rect.height * 0.35, 6);
      Sound.blub();
      Sound.praiseRandom(['小鱼游游～', '咕噜咕噜～']);
    } else if (act === 'swing') {
      node.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-7deg)' },
        { transform: 'rotate(6deg)' },
        { transform: 'rotate(-4deg)' },
        { transform: 'rotate(0deg)' }
      ], { duration: 1100, easing: 'ease-in-out' });
      Sound.sparkle();
      Sound.praiseRandom(['荡秋千喽！飞起来啦！', '再高一点！']);
    } else if (act === 'fountain') {
      FX.bubbles(el, cx, rect.top + rect.height * 0.2, 9);
      Sound.blub();
      Sound.praiseRandom(['喷泉水花哗啦啦！', '小水珠跳起舞啦！']);
    } else if (act === 'freezer') {
      FX.sparkles(el, cx, rect.top + rect.height * 0.4, 8);
      Sound.squeak();
      Sound.praiseRandom(['冰淇淋凉凉的！', '想吃哪个口味的呀？']);
    } else if (act === 'register') {
      Sound.chime();
      FX.sparkles(el, cx, rect.top + rect.height * 0.3, 7);
      Sound.praiseRandom(['叮！谢谢惠顾！', '欢迎光临小商店！', '叮——买好啦！']);
    }
  }

  /* ---------- 指针总控：pan / 家具 / 角色 / 食物 / 点地走路 / 装置互动 ---------- */
  let basket = null;

  function overBasket(x, y) {
    if (!basket) return false;
    const r = basket.getBoundingClientRect();
    return x > r.left - 36 && x < r.right + 36 && y > r.top - 48 && y < r.bottom + 36;
  }

  function hitRoom(clientX) {
    const sr = stage.getBoundingClientRect();
    const wx = clientX - sr.left + cam * roomW;
    return { idx: Math.min(R().WORLD_ROOMS.length - 1, Math.max(0, Math.floor(wx / roomW))), wx };
  }

  /* ---------- 固定装置互动（冰箱/灶台/衣柜），带 click 兜底 ---------- */
  let lastFixAt = 0;

  function activateFixture(node) {
    const act = node.dataset.act;
    Sound.pop();
    if (act === 'wardrobe') { Sound.chime(); window.showScreen('dressup'); }
    else if (act === 'pot') { Sound.chime(); window.showScreen('kitchen'); }
    else if (act === 'fridge') {
      foodDrawer = !foodDrawer;
      /* 开门视觉：关门图 ↔ 开门图 */
      const def = R().ITEMS.fridge;
      if (def.svgOpen) {
        node.innerHTML = foodDrawer ? def.svgOpen : def.svg;
        const vb = (foodDrawer ? def.svgOpen : def.svg).match(/viewBox="0 0 ([\d.]+) ([\d.]+)/);
        if (vb) node.style.aspectRatio = vb[1] + ' / ' + vb[2];
        node.classList.toggle('open', foodDrawer);
      }
      renderToolbar();
      Sound.praise(foodDrawer ? '冰箱开门啦，想吃点什么？' : '把冰箱关好啦');
    }
  }

  function onDown(e) {
    if (drag) { el.dataset.branch = 'blocked'; return; }
    const fixNode = e.target.closest('.world-fixture');
    const charNode = e.target.closest('.world-char');
    const itemNode = e.target.closest('.room-item');
    const propNode = e.target.closest('.world-prop');
    el.dataset.branch = charNode ? 'char' : propNode ? 'prop' : itemNode ? 'item' : fixNode ? 'fix' : 'pan';

    if (fixNode) {
      lastFixAt = Date.now();
      activateFixture(fixNode);
      return;
    }

    if (charNode) {
      const who = charNode.id === 'char-girl' ? 'girl' : 'cat';
      drag = { kind: 'char', who, node: charNode, nearWho: null, startX: e.clientX, startY: e.clientY, moved: false, lastX: e.clientX, lastY: e.clientY };
      charNode.classList.add('lifted');
    } else if (propNode) {
      const uid = propNode.dataset.uid;
      const p = Store.state.props.find(q => q.uid === uid);
      if (!p) {
        /* 幽灵节点：DOM 里有但存档里没有（渲染与存档不同步）。
           以前这里是"就地重建"一个条目，结果是道具越拖越多、uid 重复；
           直接清掉节点更正确，也能自愈。 */
        propNode.remove();
        return;
      }
      drag = { kind: 'prop', node: propNode, p, origRoom: p.room, feedWho: null, feedTarget: null, startX: e.clientX, startY: e.clientY, moved: false, lastX: e.clientX, lastY: e.clientY };
      propNode.classList.add('lifted');
      try { document.body.appendChild(propNode); } catch (err) { /* 忽略 */ }
      propNode.style.position = 'fixed';
      propNode.style.width = '54px';
      propNode.style.height = '54px';
      propNode.style.zIndex = 900;
      propNode.style.pointerEvents = 'none';
    } else if (itemNode) {
      if (cleanMode) { removeItem(itemNode); return; }
      const roomId = itemNode.dataset.room;
      const sec = track.querySelector(`.world-room[data-room="${roomId}"]`).getBoundingClientRect();
      const it = roomState(roomId).items[+itemNode.dataset.i];
      drag = {
        kind: 'item', node: itemNode, roomId, it, sec,
        offX: (e.clientX - sec.left) / sec.width - it.x,
        offY: (e.clientY - sec.top) / sec.height - it.y,
        moved: false, lastX: e.clientX, lastY: e.clientY
      };
      itemNode.classList.add('dragging');
    } else {
      /* 空白处：拖动 = 平移相机；轻点地板 = 走路 */
      drag = { kind: 'pan', startX: e.clientX, moved: false, lastX: e.clientX, startCam: cam, startY: e.clientY };
      track.style.transition = 'none';
    }
    try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
    e.preventDefault();
  }

  function onMove(e) {
    if (!drag) return;
    drag.lastX = e.clientX; drag.lastY = e.clientY;

    if (drag.kind === 'pan') {
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > 8) drag.moved = true;
      if (drag.moved) {
        const min = -(R().WORLD_ROOMS.length - 1) * roomW;
        let off = -drag.startCam * roomW + dx;
        off = Math.max(min - roomW * 0.25, Math.min(roomW * 0.25, off));
        track.style.transform = `translateX(${off}px)`;
      }
      return;
    }

    if (drag.kind === 'char') {
      if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 10) {
        drag.moved = true;
        Sound.pop();
      }
      if (!drag.moved) return;
      const sr = stage.getBoundingClientRect();
      const c = Store.state.char[drag.who];
      const wx = e.clientX - sr.left + cam * roomW;
      const idx = Math.min(R().WORLD_ROOMS.length - 1, Math.max(0, Math.floor(wx / roomW)));
      const roomX = (wx - idx * roomW) / roomW;
      const y = (e.clientY - sr.top) / sr.height;
      c.room = roomAt(idx);
      c.x = Math.min(0.94, Math.max(0.06, roomX));
      c.y = Math.min(maxCharY(), Math.max(0.42, y));
      const node = drag.node;
      node.style.transitionDuration = '0s';
      node.style.left = (idx * roomW + c.x * roomW) + 'px';
      node.style.top = (c.y * 100) + '%';
      /* 角色不能被收纳筐收走，拖角色时别亮筐（免得小朋友以为能丢进去） */
      if (basket) basket.classList.remove('show', 'hover');

      /* Phase 1.3：拖着自己靠近另一个角色 → 高亮对方（松手把手里的食物喂过去）。
         只在"自己手里有东西"时才高亮，免得空手靠近也闪。 */
      const otherWho = drag.who === 'girl' ? 'cat' : 'girl';
      const otherNode = charEl(otherWho);
      drag.nearWho = null;
      if (otherNode && c.holding && c.holding.id) {
        const selfRect = node.getBoundingClientRect();
        const otherRect = otherNode.getBoundingClientRect();
        const dist = Math.hypot(
          (selfRect.left + selfRect.width / 2) - (otherRect.left + otherRect.width / 2),
          (selfRect.top + selfRect.height / 2) - (otherRect.top + otherRect.height / 2)
        );
        if (dist < Math.max(140, selfRect.width * 1.5)) drag.nearWho = otherWho;
      }
      for (const w of ['girl', 'cat']) {
        charEl(w).classList.toggle('feed-target', w === drag.nearWho);
      }
      return;
    }

    if (drag.kind === 'prop') {
      if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 10) {
        drag.moved = true;
        Sound.pop();
      }
      if (!drag.moved) return;
      drag.node.style.left = (e.clientX - 27) + 'px';
      drag.node.style.top = (e.clientY - 27) + 'px';
      const overBox = overBasket(e.clientX, e.clientY);
      /* 食物也能拖进收纳筐收走：拖动时亮筐并高亮 */
      if (basket) {
        basket.classList.add('show');
        basket.classList.toggle('hover', overBox);
      }
      /* 持续检测是否悬在角色头顶（松手即拿）或嘴边（松手即喂）。
         手部优先于嘴边 —— 拖到角色身体右侧（手伸出位置）就锁定为手部，
         松手时把物品放到手里而非喂掉。onUp 的优先级：筐 > 手部 > 嘴边 > 地板 */
      drag.feedWho = null;
      drag.feedTarget = null;
      const ohGirl = overHold('girl', e.clientX, e.clientY);
      const ohCat = overHold('cat', e.clientX, e.clientY);
      for (const who of ['girl', 'cat']) {
        if (overHold(who, e.clientX, e.clientY)) {
          drag.feedWho = who;
          drag.feedTarget = 'hand';
          break;
        }
        if (canFeed(who, e.clientX, e.clientY)) {
          drag.feedWho = who;
          drag.feedTarget = 'mouth';
          break;
        }
      }
      for (const who of ['girl', 'cat']) {
        charEl(who).classList.toggle('feed-hint', drag.feedWho === who && drag.feedTarget === 'mouth' && !overBox);
        charEl(who).classList.toggle('hold-hint', drag.feedWho === who && drag.feedTarget === 'hand');
      }
      return;
    }

    if (drag.kind === 'item') {
      const nx = (e.clientX - drag.sec.left) / drag.sec.width - drag.offX;
      const ny = (e.clientY - drag.sec.top) / drag.sec.height - drag.offY;
      if (!drag.moved && (Math.abs(nx - drag.it.x) > 0.008 || Math.abs(ny - drag.it.y) > 0.008)) {
        drag.moved = true;
        Sound.pop();
        if (basket) basket.classList.add('show');
      }
      if (!drag.moved) return;
      drag.it.x = Math.min(0.98, Math.max(0.02, nx));
      drag.it.y = Math.min(0.97, Math.max(0.04, ny));
      drag.node.style.left = (drag.it.x * 100) + '%';
      drag.node.style.top = (drag.it.y * 100) + '%';
      basket && basket.classList.toggle('hover', overBasket(e.clientX, e.clientY));
    }
  }

  function canFeed(who, px, py) {
    const c = Store.state.char[who];
    const srLeft = stage.getBoundingClientRect().left;
    const roomNow = Math.floor((px - srLeft + cam * roomW) / roomW);
    if (roomIdx(c.room) !== roomNow) return false;
    const nr = charEl(who).getBoundingClientRect();
    const mouthY = nr.top + nr.height * (who === 'girl' ? 0.22 : 0.35);
    return Math.hypot(px - (nr.left + nr.width / 2), py - mouthY) < Math.max(110, nr.height * 0.35);
  }

  function onUp(e) {
    if (!drag) return;
    const d = drag;
    drag = null;
    if (basket) basket.classList.remove('show', 'hover');

    if (d.kind === 'pan') {
      if (d.moved) {
        const dx = e.clientX - d.startX;
        let target = Math.round(d.startCam - dx / roomW);
        target = Math.min(R().WORLD_ROOMS.length - 1, Math.max(0, target));
        cam = target;
        applyCam();
        renderToolbar();
      } else {
        track.style.transition = '';
        /* 轻点：地板区域让娃娃走过去 */
        const sr = stage.getBoundingClientRect();
        const y = (e.clientY - sr.top) / sr.height;
        if (y > 0.58) {
          const { idx } = hitRoom(e.clientX);
          const roomId = roomAt(idx);
          const roomX = (e.clientX - sr.left + cam * roomW - idx * roomW) / roomW;
          const g = Store.state.char.girl;
          if (g.room === roomId) walkTo('girl', roomX, y);
          else { g.room = roomId; walkTo('girl', roomX, y); }
        }
        applyCam(false);
      }
      return;
    }

    if (d.kind === 'char') {
      d.node.classList.remove('lifted');
      el.querySelectorAll('.feed-hint').forEach(n => n.classList.remove('feed-hint'));
      el.querySelectorAll('.hold-hint').forEach(n => n.classList.remove('hold-hint'));
      el.querySelectorAll('.feed-target').forEach(n => n.classList.remove('feed-target'));
      if (d.moved) {
        /* Phase 1.3：松手时若靠近另一个角色、且手里有食物 → 喂给对方 */
        const self = Store.state.char[d.who];
        const otherWho = d.who === 'girl' ? 'cat' : 'girl';
        const giveFood = d.nearWho === otherWho && self.holding && self.holding.id;
        const foodId = giveFood ? self.holding.id : null;
        if (giveFood) self.holding = null;
        placeChar(d.who, self.room, self.x, self.y);
        if (giveFood) {
          Store.save();
          eat(otherWho, foodId);        // 对方吃 + happy-jump + 火花 + 语音
          Sound.praise('给' + (otherWho === 'cat' ? '小猫' : '娃娃') + '吃啦');
        }
      } else {
        /* 轻点角色：手持物品 → 落回地板；空着手 → 开心跳 */
        const c = Store.state.char[d.who];
        if (c.holding && c.holding.id) {
          const dropX = Math.min(0.95, Math.max(0.05, c.x));
          const dropY = Math.min(0.92, Math.max(0.40, c.y - 0.12));
          Store.state.props.push({
            uid: c.holding.uid, id: c.holding.id, room: c.room, x: dropX, y: dropY
          });
          c.holding = null;
          Store.save();
          renderChar(d.who);
          Sound.poof();
          /* 物品落回位置生成可视化节点（renderRoom 自动渲染） */
          renderRoom(c.room);
          const nr = d.node.getBoundingClientRect();
          FX.sparkles(el, nr.left + nr.width / 2, nr.top + nr.height * 0.2, 5);
          Sound.praise('放下来啦');
        } else {
          d.node.classList.remove('happy-jump');
          void d.node.offsetWidth;
          d.node.classList.add('happy-jump');
          Sound.sparkle();
          Sound.praiseRandom(d.who === 'cat' ? ['喵～', '喵呜！'] : ['咯咯咯～', '抱抱！']);
          const nr = d.node.getBoundingClientRect();
          FX.sparkles(el, nr.left + nr.width / 2, nr.top + nr.height * 0.4, 7);
        }
      }
      return;
    }

    if (d.kind === 'prop') {
      el.querySelectorAll('.feed-hint').forEach(n => n.classList.remove('feed-hint'));
      el.dataset.upDbg = `moved=${d.moved} feedWho=${d.feedWho || 'none'} p=${!!d.p} girlTop=${Math.round(charEl('girl').getBoundingClientRect().top)} girlH=${Math.round(charEl('girl').getBoundingClientRect().height)} lastY=${Math.round(d.lastY)}`;
      if (d.moved && overBasket(e.clientX, e.clientY)) {
        /* 拖到收纳筐：收走这个食物（在这之前食物只能喂掉，没有任何清理手段） */
        if (d.p) {
          const i = Store.state.props.indexOf(d.p);
          if (i >= 0) Store.state.props.splice(i, 1);
          Store.save();
        }
        d.node.remove();
        FX.poof(el, e.clientX, e.clientY);
        Sound.poof();
      } else if (d.moved && d.feedWho && d.feedTarget === 'mouth') {
        /* 优先检查手部：松手时若悬在手部 hitbox 上，物品落到角色手里；
           没在手里、且在嘴边时再喂。feedTarget 在 onMove 里设 */
      } else if (d.moved && d.feedWho && d.feedTarget === 'hand') {
        /* 落到角色手里：从 props 删，加入该角色的 holding */
        const who = d.feedWho;
        if (Store.state.char[who].holding) {
          /* 头顶已有东西，摇头拒绝（不再 fallthrough 到下方喂食路径） */
          const node = charEl(who);
          node.classList.remove('shake');
          void node.offsetWidth;
          node.classList.add('shake');
          Sound.blub();
          return;
        } else if (d.p) {
          const i = Store.state.props.indexOf(d.p);
          if (i >= 0) Store.state.props.splice(i, 1);
          Store.state.char[who].holding = { uid: d.p.uid, id: d.p.id };
          Store.save();
          d.node.remove();
          const hr = charEl(who).getBoundingClientRect();
          FX.sparkles(el, hr.left + hr.width / 2, hr.top, 6);
          Sound.praise('拿上啦');
          renderChar(who);
          return;
        }
      } else if (d.moved && d.feedWho) {
        /* 松手即喂：move 过程中已确认悬在嘴边 */
        const i = Store.state.props.indexOf(d.p);
        if (i >= 0) Store.state.props.splice(i, 1);
        Store.save();
        d.node.remove();
        eat(d.feedWho, d.node.dataset.food);
      } else if (d.moved && d.p) {
        /* 松手即喂：move 过程中已确认悬在嘴边 */
        const i = Store.state.props.indexOf(d.p);
        if (i >= 0) Store.state.props.splice(i, 1);
        Store.save();
        d.node.remove();
        eat(d.feedWho, d.node.dataset.food);
      } else if (d.moved && d.p) {
        const sr = stage.getBoundingClientRect();
        const { idx } = hitRoom(d.lastX);
        const roomId = roomAt(idx);
        const roomX = (d.lastX - sr.left + cam * roomW - idx * roomW) / roomW;
        const y = (d.lastY - sr.top) / sr.height;
        const p = d.p;
        const oldRoom = p.room;
        p.room = roomId;
        p.x = Math.min(0.97, Math.max(0.03, roomX));
        p.y = Math.min(0.95, Math.max(0.3, y));
        Store.save();
        if (oldRoom !== roomId) renderRoom(oldRoom);
        renderRoom(roomId);
        Sound.thud();
      } else {
        d.node.remove();
        if (d.origRoom) renderRoom(d.origRoom);
      }
      return;
    }

    if (d.kind === 'item') {
      d.node.classList.remove('dragging');
      if (d.moved) {
        if (overBasket(e.clientX, e.clientY)) removeItem(d.node);
        else Store.save();
      } else {
        const def = R().ITEMS[d.it.id];
        if (def.act) playInteract(d.node, def.act);
      }
    }
  }

  /* ---------- 调色板 ---------- */
  function togglePalette(kind) {
    if (palettePop) { palettePop.remove(); palettePop = null; }
    const defs = kind === 'wall' ? R().WALLS : R().FLOORS;
    const r = roomState(roomAt(cam));
    const pop = document.createElement('div');
    pop.className = 'palette-pop';
    defs.forEach((def, i) => {
      const s = document.createElement('div');
      s.className = 'swatch';
      R().applyBg(s, def);
      if (i === r[kind === 'wall' ? 'wall' : 'floor'] % defs.length)
        s.style.boxShadow = '0 0 0 4px #ffd34d, 0 3px 6px rgba(0,0,0,.15)';
      s.addEventListener('click', () => {
        if (kind === 'wall') r.wall = i; else r.floor = i;
        Store.save();
        applyDecor(roomAt(cam));
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
  window.World = {
    init(root) {
      el = root;
      /* v0.7：第一次进入世界时跑一次 ROOM_SETS 迁移，把不在新分配里的旧 item 清掉。
         比如 wardrobe 不再有 piano，女儿摆的 piano 自动消失。幂等：旧存档没变化时无影响。 */
      Store.migrateRoomSets();
      const N = R().WORLD_ROOMS.length;
      el.innerHTML = `
        <div class="game-top">${window.homeButtonHTML}${window.roomsButtonHTML}</div>
        <div class="game-stage world-stage">
          <div class="world-track">
            ${R().WORLD_ROOMS.map(id => `
              <section class="world-room" data-room="${id}">
                <div class="room-wall"></div>
                <div class="room-floor"></div>
                <div class="room-layer"></div>
              </section>`).join('')}
            <div class="world-char" id="char-girl" style="width:11%"><div class="char-inner"><div class="char-body"></div></div><div class="char-holding hidden"></div></div>
            <div class="world-char" id="char-cat" style="width:8.2%"><div class="char-inner"><div class="char-body"></div></div><div class="char-holding hidden"></div></div>
          </div>
          <button class="world-arrow left">←</button>
          <button class="world-arrow right">→</button>
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

      stage = el.querySelector('.world-stage');
      track = el.querySelector('.world-track');
      basket = el.querySelector('.drop-basket');   // 缓存一次，拖动时不再每个 move 事件查 DOM

      /* 箭头 */
      el.querySelector('.world-arrow.left').addEventListener('click', () => {
        if (cam > 0) { cam--; applyCam(); renderToolbar(); Sound.door(); }
      });
      el.querySelector('.world-arrow.right').addEventListener('click', () => {
        if (cam < N - 1) { cam++; applyCam(); renderToolbar(); Sound.door(); }
      });

      /* 指针：down 在舞台，move/up 挂 window（手指滑出舞台也能跟踪） */
      stage.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      stage.style.touchAction = 'none';
      window.addEventListener('resize', measure);

      /* click 兜底：个别环境下 pointerdown 被吞掉时仍能开冰箱/灶台/衣柜 */
      stage.addEventListener('click', e => {
        const fixNode = e.target.closest('.world-fixture');
        if (fixNode && Date.now() - lastFixAt > 600) activateFixture(fixNode);
      });

      /* 调色板 / 收起模式 */
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

      /* 抽屉点击：家具 或 食物 */
      el.querySelector('.item-drawer').addEventListener('click', e => {
        const foodCard = e.target.closest('[data-food]');
        if (foodCard) { spawnFood(foodCard.dataset.food); return; }
        const card = e.target.closest('.item-card');
        if (card && card.dataset.id) addItem(card.dataset.id);
      });

      /* 首帧 */
      measure();
      cam = Math.max(0, roomIdx(Store.state.lastRoom));
      R().WORLD_ROOMS.forEach(id => { applyDecor(id); renderRoom(id); });
      refreshCharacters();
      renderToolbar();
      applyCam(false);
    },
    onEnter() {
      measure();
      applyCam(false);
      renderToolbar();
      window.hintOnce('world', '左右拖一拖看大房子！点地板娃娃就走过去，点冰箱拿好吃的');
    },
    onLeave() {
      cleanMode = false;
      const b = el && el.querySelector('.btn-clean');
      if (b) b.classList.remove('on');
      const banner = el && el.querySelector('.clean-banner');
      if (banner) banner.classList.add('hidden');
      if (palettePop) { palettePop.remove(); palettePop = null; }
      foodDrawer = false;
    },
    jumpTo,
    refreshCharacters,
    feedCharacter,
    walkTo,
    renderRoom,
    placeChar,
    get currentRoomId() { return roomAt(cam); },
    /* 测试后门：模拟把某个食物喂给角色（与拖拽 up 走同一套 eat 链路） */
    debugFeed(who, uid) {
      const i = Store.state.props.findIndex(q => q.uid === uid);
      if (i < 0) return false;
      const foodId = Store.state.props[i].id;
      Store.state.props.splice(i, 1);
      Store.save();
      /* 必须同时移除 DOM 节点，否则场景里会留下一个"幽灵食物"：
         拖它时 onDown 在 state 里找不到该 uid，会兜底重建出一个重复道具 */
      const node = track.querySelector('.world-prop[data-uid="' + uid + '"]');
      if (node) node.remove();
      eat(who, foodId);
      return true;
    }
  };
})();
