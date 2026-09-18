/* ============ 存档模块：装扮/世界房间/角色/食物道具 自动保存 ============ */
(function () {
  'use strict';

  const KEY = 'magic-house-v1';

  /* 世界房间默认装饰（wall=墙纸索引 floor=地板索引，见 assets-room.js） */
  const DEFAULT_ROOMS = () => ({
    balcony:  { wall: 1, floor: 3, items: [] },   // 阳台：蓝天云朵墙+草地
    bedroom:  { wall: 0, floor: 0, items: [] },   // 卧室：粉条纹+木地板
    bathroom: { wall: 6, floor: 6, items: [] },   // 卫生间：白瓷砖
    living:   { wall: 4, floor: 5, items: [] },   // 客厅：蜜桃墙+蜂蜜黄
    kitchen:  { wall: 7, floor: 6, items: [] },   // 厨房：薄荷瓷砖+灰瓷砖
    study:    { wall: 4, floor: 0, items: [] },   // 书房：蜜桃墙+木地板
    wardrobe: { wall: 5, floor: 1, items: [] },   // 换衣间：粉格棋盘+粉地毯
    yard:     { wall: 1, floor: 3, items: [] },   // 院子：蓝天云朵+草地
    park:     { wall: 1, floor: 7, items: [] },   // 公园：蓝天+石板路
    shop:     { wall: 8, floor: 5, items: [] }    // 商店：糖果条纹+格子地板
  });

  /* 旧版屏幕 id → 世界房间 id（lastRoom 迁移用） */
  const OLD_ROOM_MAP = { room: 'bedroom', bedroom: 'bedroom', living: 'living', bathroom: 'bathroom', kitchen: 'kitchen', dressup: 'wardrobe' };

  const DEFAULT_STATE = {
    doll: {
      hair: 'twin',
      hairColor: 0,
      dress: 'pinkpolka',
      shoes: 'mary',
      acc: 'crown',
      catAcc: 'bow'
    },
    rooms: DEFAULT_ROOMS(),
    char: {                        // 角色：room=房间id，x/y=房间内相对坐标，face=朝向1/-1
      girl: { room: 'living', x: 0.45, y: 0.78, face: 1 },
      cat: { room: 'balcony', x: 0.55, y: 0.82, face: 1 }
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
      state = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_STATE));
    } catch (e) {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
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
      saveNow();
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) saveNow();
  });
  window.addEventListener('pagehide', saveNow);
})();
