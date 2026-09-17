/* ============ 存档模块：装扮/多房间布局/引导记录 自动保存 ============ */
(function () {
  'use strict';

  const KEY = 'magic-house-v1';

  const DEFAULT_ROOM = () => ({ wall: 0, floor: 0, items: [] });

  const DEFAULT_STATE = {
    doll: {
      hair: 'twin',      // 发型 id
      hairColor: 0,      // 发色索引
      dress: 'pinkpolka',// 连衣裙 id
      shoes: 'mary',     // 鞋子 id
      acc: 'crown',      // 配件 id
      catAcc: 'bow'      // 小猫配件 id
    },
    rooms: {                          // 各装饰房间的独立布局
      bedroom: DEFAULT_ROOM(),        // 卧室（迁移自旧版单房间存档）
      living: { wall: 4, floor: 5, items: [] },   // 客厅（默认蜜桃墙+蜂蜜地板）
      bathroom: { wall: 6, floor: 6, items: [] }  // 卫生间（默认白瓷砖）
    },
    lastRoom: 'room',      // 上次玩的房间（存屏幕 id：room/living/bathroom/kitchen/dressup）
    hints: {},            // 已播过的首次引导 { screenId: true }
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
    /* 老存档迁移：v0.2 的单 room → rooms.bedroom */
    if (state.room && !state.rooms) {
      state.rooms = JSON.parse(JSON.stringify(DEFAULT_STATE.rooms));
      state.rooms.bedroom = state.room;
    }
    delete state.room;
    /* 补齐新增字段 */
    for (const k of Object.keys(DEFAULT_STATE)) {
      if (state[k] === undefined) state[k] = JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
    }
    for (const k of Object.keys(DEFAULT_STATE.doll)) {
      if (state.doll[k] === undefined) state.doll[k] = DEFAULT_STATE.doll[k];
    }
    for (const rk of Object.keys(DEFAULT_STATE.rooms)) {
      if (!state.rooms[rk]) state.rooms[rk] = DEFAULT_ROOM();
      for (const f of ['wall', 'floor', 'items']) {
        if (state.rooms[rk][f] === undefined) state.rooms[rk][f] = JSON.parse(JSON.stringify(DEFAULT_STATE.rooms[rk][f]));
      }
    }
    return state;
  }

  function saveNow() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 存储满等异常静默 */ }
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

  // 切后台/关闭页面前确保落盘
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) saveNow();
  });
  window.addEventListener('pagehide', saveNow);
})();
