/* ============ 存档模块：装扮/世界房间/角色/食物道具 自动保存 ============ */
(function () {
  'use strict';

  const KEY = 'magic-house-v1';

  /* 世界房间默认装饰（wall=墙纸索引 floor=地板索引，见 assets-room.js）。
   items 用 DEFAULT_LAYOUT（每房间 4-7 件样板家具），load() 第一次进游戏时
   自动按 DEFAULT_LAYOUT 摆好。 */
  const DEFAULT_ROOMS = () => {
    const layout = (window.RoomAssets && window.RoomAssets.DEFAULT_LAYOUT) || {};
    const clone = arr => JSON.parse(JSON.stringify(arr || []));
    return {
      balcony:  { wall: 1, floor: 3, items: clone(layout.balcony)  },   // 阳台：蓝天云朵墙+草地
      bedroom:  { wall: 0, floor: 0, items: clone(layout.bedroom)  },   // 卧室：粉条纹+木地板（含 wardrobe 合并）
      bathroom: { wall: 6, floor: 6, items: clone(layout.bathroom) },   // 卫生间：白瓷砖
      living:   { wall: 4, floor: 5, items: clone(layout.living)   },   // 客厅：蜜桃墙+蜂蜜黄
      kitchen:  { wall: 7, floor: 6, items: clone(layout.kitchen)  },   // 厨房：薄荷瓷砖+灰瓷砖
      study:    { wall: 4, floor: 0, items: clone(layout.study)    },   // 书房：蜜桃墙+木地板
      yard:     { wall: 1, floor: 3, items: clone(layout.yard)     },   // 院子：蓝天云朵+草地
      park:     { wall: 1, floor: 7, items: clone(layout.park)     },   // 公园：蓝天+石板路
      shop:     { wall: 8, floor: 5, items: clone(layout.shop)     }    // 商店：糖果条纹+格子地板
    };
  };

  /* 旧版屏幕 id → 世界房间 id（lastRoom 迁移用） */
  const OLD_ROOM_MAP = { room: 'bedroom', bedroom: 'bedroom', living: 'living', bathroom: 'bathroom', kitchen: 'kitchen', dressup: 'bedroom' };

  const DEFAULT_STATE = {
    doll: {
      hair: 'twin',
      hairColor: 0,
      dress: 'pinkpolka',
      shoes: 'mary',
      acc: 'crown',
      catAcc: 'bow'
    },
    rooms: {},     // 占位：load() 里首次调时，window.RoomAssets.DEFAULT_LAYOUT 才会被引用
    char: {                        // 角色：room=房间id，x/y=房间内相对坐标，face=朝向1/-1，holding=头顶携带物
      girl: { room: 'living', x: 0.45, y: 0.55, face: 1, holding: null },
      cat:  { room: 'balcony', x: 0.55, y: 0.62, face: 1, holding: null }
    },
    props: [],                     // 场景里的食物道具 [{uid, id, room, x, y}]
    lastRoom: 'living',            // 相机所在的房间
    hints: {},
    sound: true
  };

  let state = null;
  let saveTimer = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        /* v0.7 起：新游戏（localStorage 无数据）→ 用 DEFAULT_STATE（rooms 填 DEFAULT_LAYOUT） */
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        state.rooms = DEFAULT_ROOMS();
        saveNow();
      } else {
        /* 老存档：保留 items（女儿已经摆好的小家不丢） */
        state = JSON.parse(raw);
      }
    } catch (e) {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state.rooms = DEFAULT_ROOMS();
    }
    /* ---- 老存档迁移 ---- */
    if (state.room && !state.rooms) {          // v0.2 单房间
      state.rooms = DEFAULT_ROOMS();
      state.rooms.bedroom = state.room;
    }
    delete state.room;
    if (state.lastRoom && OLD_ROOM_MAP[state.lastRoom]) {
      state.lastRoom = OLD_ROOM_MAP[state.lastRoom];
    }
    /* v0.7 batch 7：wardrobe 房间合并到 bedroom，删除老存档残留 */
    if (state.rooms && state.rooms.wardrobe) delete state.rooms.wardrobe;
    /* ---- 补齐字段 ---- */
    for (const k of Object.keys(DEFAULT_STATE)) {
      if (state[k] === undefined) state[k] = JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
    }
    for (const k of Object.keys(DEFAULT_STATE.doll)) {
      if (state.doll[k] === undefined) state.doll[k] = DEFAULT_STATE.doll[k];
    }
    const defRooms = DEFAULT_ROOMS();
    for (const rk of Object.keys(defRooms)) {
      if (!state.rooms[rk]) state.rooms[rk] = JSON.parse(JSON.stringify(defRooms[rk]));
      for (const f of ['wall', 'floor', 'items']) {
        if (state.rooms[rk][f] === undefined) state.rooms[rk][f] = JSON.parse(JSON.stringify(defRooms[rk][f]));
      }
    }
    for (const who of ['girl', 'cat']) {
      if (!state.char[who]) state.char[who] = JSON.parse(JSON.stringify(DEFAULT_STATE.char[who]));
      for (const f of ['room', 'x', 'y', 'face']) {
        if (state.char[who][f] === undefined) state.char[who][f] = DEFAULT_STATE.char[who][f];
      }
      /* v0.7 起角色头顶可以顶物品；旧存档缺 holding 字段，默认 null（空着手） */
      if (state.char[who].holding === undefined) state.char[who].holding = null;
    }
    /* c.y 上限改小后的视觉无感迁移（v0.6 → v0.7）
       旧存档里 c.y 可能到 0.9，会被新 clamp [0.42, 0.72] 直接夹到 0.72，让娃娃瞬间
       跳到画面中段。按"超出部分以 0.5 倍回压"的方式保留相对位置，避免视觉跳变。
       多次执行幂等（第二次进入时 c.y ≤ 0.72，公式不动）。 */
    const Y_MAX_NEW = 0.72;
    for (const who of ['girl', 'cat']) {
      const y = state.char[who].y;
      if (y > Y_MAX_NEW) state.char[who].y = Y_MAX_NEW - (y - Y_MAX_NEW) * 0.5;
    }
    if (!Array.isArray(state.props)) state.props = [];
    /* 角色别丢在世界外 */
    if (!state.rooms[state.char.girl.room]) state.char.girl.room = 'living';
    if (!state.rooms[state.char.cat.room]) state.char.cat.room = 'balcony';
    if (!state.rooms[state.lastRoom]) state.lastRoom = 'living';
    return state;
  }

  function saveNow() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 静默 */ }
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 300);
  }

  window.Store = {
    get state() {
      if (!state) load();
      return state;
    },
    load,
    save,
    saveNow,
    reset() {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state.rooms = DEFAULT_ROOMS();   // 用当前 DEFAULT_LAYOUT（不是空数组）
      saveNow();
    },
    /* v0.7 起：ROOM_SETS 在 assets-room.js 加载之后才可用，由 world.js init() 调一次。
       对每个房间 items，过滤掉不在新 ROOM_SETS 里的旧 item（item.id 不再被该房间支持）。 */
    migrateRoomSets() {
      const R = window.RoomAssets;
      if (!R || !R.ROOM_SETS) return { migrated: 0, dropped: 0 };
      let migrated = 0, dropped = 0;
      for (const roomId in state.rooms) {
        const allowed = R.ROOM_SETS[roomId];
        if (!allowed) continue;
        const set = new Set(allowed);
        const before = state.rooms[roomId].items.length;
        state.rooms[roomId].items = state.rooms[roomId].items.filter(it => set.has(it.id));
        const after = state.rooms[roomId].items.length;
        if (after < before) {
          migrated++;
          dropped += (before - after);
        }
      }
      if (migrated > 0) saveNow();
      return { migrated, dropped };
    },
    /* v0.7 起：主屏"✨ 重新布置"按钮用 —— 清空所有房间 items + 按 DEFAULT_LAYOUT 重摆。
       幂等：用户多次按效果一致。 */
    relayout() {
      const layout = (window.RoomAssets && window.RoomAssets.DEFAULT_LAYOUT) || {};
      const clone = arr => JSON.parse(JSON.stringify(arr || []));
      for (const roomId in state.rooms) {
        state.rooms[roomId].items = clone(layout[roomId]);
      }
      saveNow();
      return true;
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) saveNow();
  });
  window.addEventListener('pagehide', saveNow);
})();
