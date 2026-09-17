/* ============ 存档模块：装扮/房间布局自动保存 ============ */
(function () {
  'use strict';

  const KEY = 'magic-house-v1';

  const DEFAULT_STATE = {
    doll: {
      hair: 'twin',      // 发型 id
      hairColor: 0,      // 发色索引
      dress: 'pinkpolka',// 连衣裙 id
      shoes: 'mary',     // 鞋子 id
      acc: 'crown',      // 配件 id
      catAcc: 'bow'      // 小猫配件 id
    },
    room: {
      wall: 0,           // 墙纸索引
      floor: 0,          // 地板索引
      items: []          // [{ id, x, y, size }] x/y 为 0~1 相对坐标
    },
    hints: {},           // 已播过的首次引导 { screenId: true }
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
    // 补齐新增字段（老存档升级）
    for (const k of Object.keys(DEFAULT_STATE)) {
      if (state[k] === undefined) state[k] = JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
    }
    for (const k of Object.keys(DEFAULT_STATE.doll)) {
      if (state.doll[k] === undefined) state.doll[k] = DEFAULT_STATE.doll[k];
    }
    for (const k of Object.keys(DEFAULT_STATE.room)) {
      if (state.room[k] === undefined) state.room[k] = DEFAULT_STATE.room[k];
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
