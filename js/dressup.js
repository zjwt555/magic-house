/* ============ 衣帽间：换装 ============ */
(function () {
  'use strict';

  const A = () => window.DollAssets;

  const CATS = [
    { id: 'hair', icon: '💇', label: '发型' },
    { id: 'color', icon: '🎨', label: '发色' },
    { id: 'dress', icon: '👗', label: '裙子' },
    { id: 'shoes', icon: '👟', label: '鞋子' },
    { id: 'acc', icon: '👑', label: '配饰' },
    { id: 'cat', icon: '🐱', label: '小猫' }
  ];

  const PRAISE = ['真漂亮呀！', '太好看了！', '美美的！', '你真会搭配！', '哇，好美呀！'];

  let el = null;
  let curCat = 'dress';

  /* ---------- 各分类的物品卡片 ---------- */
  function cardHTML(cat, key, inner, color) {
    return `<div class="item-card" data-cat="${cat}" data-key="${key}" ${color ? `style="color:${color}"` : ''}>${inner}</div>`;
  }

  function drawerHTML() {
    const d = Store.state.doll;
    const DA = A();
    const hairColor = DA.HAIR_COLORS[d.hairColor % DA.HAIR_COLORS.length];

    switch (curCat) {
      case 'hair':
        return Object.keys(DA.HAIRS).map(key => {
          const h = DA.HAIRS[key];
          return cardHTML('hair', key,
            `<svg viewBox="60 36 180 168" xmlns="http://www.w3.org/2000/svg">${h.back}${DA.BODY}${h.front}</svg>`,
            hairColor);
        }).join('');
      case 'color':
        return DA.HAIR_COLORS.map((c, i) =>
          cardHTML('color', i,
            `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
               <circle cx="36" cy="36" r="26" fill="${c}" stroke="rgba(0,0,0,.08)" stroke-width="3"/>
               <ellipse cx="27" cy="26" rx="10" ry="5" fill="#fff" opacity=".35" transform="rotate(-20 27 26)"/>
             </svg>`)).join('');
      case 'dress':
        return Object.keys(DA.DRESSES).map(key =>
          cardHTML('dress', key,
            `<svg viewBox="80 160 140 200" xmlns="http://www.w3.org/2000/svg">${DA.BODY}${DA.DRESSES[key]}</svg>`,
            hairColor)).join('');
      case 'shoes':
        return Object.keys(DA.SHOES).map(key =>
          cardHTML('shoes', key,
            `<svg viewBox="100 330 100 100" xmlns="http://www.w3.org/2000/svg">${DA.BODY}${DA.SHOES[key]}</svg>`,
            hairColor)).join('');
      case 'acc':
        return Object.keys(DA.ACCS).map(key =>
          cardHTML('acc', key,
            `<svg viewBox="0 0 300 460" xmlns="http://www.w3.org/2000/svg">${window.dollHTML(Object.assign({}, d, { acc: key }))}</svg>`,
            hairColor)).join('');
      case 'cat':
        return Object.keys(DA.CAT_ACCS).map(key =>
          cardHTML('cat', key,
            `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">${DA.CAT_BASE}${DA.CAT_ACCS[key]}</svg>`)).join('');
    }
    return '';
  }

  /* ---------- 高亮当前选中 ---------- */
  function markSelected() {
    const d = Store.state.doll;
    const cur = {
      hair: d.hair,
      color: String(d.hairColor % A().HAIR_COLORS.length),
      dress: d.dress,
      shoes: d.shoes,
      acc: d.acc,
      cat: d.catAcc
    }[curCat];
    el.querySelectorAll('.item-card').forEach(c =>
      c.classList.toggle('selected', c.dataset.key === cur));
  }

  /* ---------- 渲染娃娃 + 小猫 ---------- */
  function renderDoll() {
    const d = Store.state.doll;
    const wrap = el.querySelector('.doll-wrap');
    wrap.style.color = A().HAIR_COLORS[d.hairColor % A().HAIR_COLORS.length];
    wrap.innerHTML = window.dollHTML(d);
    el.querySelector('.cat-wrap').innerHTML = window.catHTML(d.catAcc);
  }

  function renderDrawer() {
    el.querySelector('.item-drawer').innerHTML = drawerHTML();
    markSelected();
  }

  function openCat(id) {
    curCat = id;
    el.querySelectorAll('.tab-btn').forEach(t =>
      t.classList.toggle('selected', t.dataset.cat === id));
    renderDrawer();
  }

  /* ---------- 模块定义 ---------- */
  window.DressUp = {
    init(root) {
      el = root;
      el.innerHTML = `
        <div class="game-top">${window.homeButtonHTML}</div>
        <div class="game-stage">
          <div class="dressup-stage">
            <div class="doll-wrap"></div>
            <div class="cat-wrap"></div>
          </div>
          <button class="btn-mirror" aria-label="照镜子">
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="17" fill="#fff" stroke="#e8a3bd" stroke-width="4"/>
              <path d="M18 20 Q18 16 22 16" stroke="#ffb3c7" stroke-width="3" fill="none" stroke-linecap="round"/>
              <path d="M18 26 Q18 34 25 36 Q19 30 20 26 Z" fill="#ffd0dd"/>
            </svg>
            <span>转一圈</span>
          </button>
        </div>
        <div class="game-toolbar">
          <div class="tab-row">
            ${CATS.map(c => `
              <button class="tab-btn${c.id === curCat ? ' selected' : ''}" data-cat="${c.id}">
                <span class="emoji">${c.icon}</span><span>${c.label}</span>
              </button>`).join('')}
          </div>
          <div class="item-drawer"></div>
        </div>`;

      el.querySelectorAll('.tab-btn').forEach(t =>
        t.addEventListener('click', () => { Sound.pop(); openCat(t.dataset.cat); }));

      el.querySelector('.item-drawer').addEventListener('click', e => {
        const card = e.target.closest('.item-card');
        if (!card) return;
        const { cat, key } = card.dataset;
        const d = Store.state.doll;
        if (cat === 'hair') d.hair = key;
        else if (cat === 'color') d.hairColor = parseInt(key, 10);
        else if (cat === 'dress') d.dress = key;
        else if (cat === 'shoes') d.shoes = key;
        else if (cat === 'acc') d.acc = key;
        else if (cat === 'cat') d.catAcc = key;
        Store.save();
        renderDoll();
        renderDrawer();
        Sound.chime();
        const wrap = el.querySelector('.doll-wrap');
        const r = wrap.getBoundingClientRect();
        FX.sparkles(el, r.left + r.width / 2, r.top + r.height * 0.4, 9);
        Sound.praiseRandom(PRAISE);
      });

      el.querySelector('.btn-mirror').addEventListener('click', () => {
        const wrap = el.querySelector('.doll-wrap');
        wrap.classList.remove('twirl');
        void wrap.offsetWidth;
        wrap.classList.add('twirl');
        el.querySelector('.cat-wrap').classList.remove('happy');
        void el.querySelector('.cat-wrap').offsetWidth;
        el.querySelector('.cat-wrap').classList.add('happy');
        Sound.sparkle();
        Sound.praiseRandom(['太好看了！', '转圈圈喽！', '像小公主一样！']);
        const r = wrap.getBoundingClientRect();
        setTimeout(() => FX.sparkles(el, r.left + r.width / 2, r.top + r.height * 0.45, 14), 350);
      });

      /* 点一点娃娃：蹦蹦跳跳 */
      el.querySelector('.doll-wrap').addEventListener('pointerdown', function () {
        this.classList.remove('happy-jump');
        void this.offsetWidth;
        this.classList.add('happy-jump');
        Sound.sparkle();
        Sound.praiseRandom(['咯咯咯～', '今天穿什么好呢？', '抱抱！']);
        const r = this.getBoundingClientRect();
        FX.sparkles(el, r.left + r.width / 2, r.top + r.height * 0.3, 8);
      });

      renderDoll();
      renderDrawer();
    },
    onEnter() {
      renderDoll();
      renderDrawer();
      window.hintOnce('dressup', '点下面的衣服和裙子，给娃娃穿上吧');
    }
  };
})();
