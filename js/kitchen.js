/* ============ 厨房：做饭 ============ */
(function () {
  'use strict';

  const K = () => window.KitchenAssets;
  const STAR_STEPS = 3;          // 需要搅拌点亮的三颗星
  const HALF_TURN = Math.PI;     // 每半圈点亮一颗

  const FEED_PRAISE = ['真好吃！', '太好吃了！', '好吃好吃！', '还要再来一口！'];

  /* 食材落进锅里的散落位置（相对 pot-zone 的百分比） */
  const SPOTS = [
    [30, 26], [55, 18], [72, 34], [38, 42], [62, 48],
    [22, 50], [50, 62], [78, 55], [45, 30], [68, 22], [28, 66], [58, 70]
  ];

  let el = null;
  let curRecipe = null;
  let dropped = [];       // 食材 id 列表
  let progress = 0;       // 已点亮星星数
  let lastAngle = null, acc = 0;
  let busy = false;       // 烹饪动画进行中

  /* ---------- 子视图切换 ---------- */
  function showRecipeSelect() {
    curRecipe = null;
    resetCook();
    el.querySelector('.recipe-stage').classList.remove('hidden');
    el.querySelector('.cook-stage').classList.add('hidden');
    el.querySelector('.item-drawer').innerHTML =
      '<div class="drawer-hint">👆 先选一个想做的菜吧</div>';
  }

  function showCook(recipe) {
    curRecipe = recipe;
    resetCook();
    el.querySelector('.recipe-stage').classList.add('hidden');
    el.querySelector('.cook-stage').classList.remove('hidden');
    el.querySelector('.pot-container').innerHTML = K().CONTAINERS[recipe.container];
    renderDropped();
    renderToolbar();
    Sound.praise('一起来做' + recipe.name + '吧');
  }

  function resetCook() {
    dropped = [];
    progress = 0;
    lastAngle = null; acc = 0;
    busy = false;
    el && el.querySelectorAll('.stir-star').forEach(s => s.classList.remove('lit'));
    el && el.querySelector('.btn-magic') && el.querySelector('.btn-magic').classList.add('dim');
    el && el.querySelector('.dish-result') && el.querySelector('.dish-result').classList.add('hidden');
  }

  /* ---------- 工具栏（当前食谱的食材） ---------- */
  function renderToolbar() {
    const drawer = el.querySelector('.item-drawer');
    drawer.innerHTML = curRecipe.ingredients.map(id => {
      const vb = K().ING[id].match(/viewBox="([^"]*)"/)[1];
      const inner = K().ING[id].replace(/<svg[^>]*>|<\/svg>/g, '');
      return `<div class="item-card" data-ing="${id}">
        <svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>
      </div>`;
    }).join('');
  }

  /* ---------- 锅里已放的食材 ---------- */
  function renderDropped() {
    const potContent = el.querySelector('.pot-content');
    potContent.innerHTML = dropped.map((id, i) => {
      const [x, y] = SPOTS[i % SPOTS.length];
      return `<div class="ingredient-drop" style="left:${x}%;top:${y}%;position:absolute;">${K().ING[id]}</div>`;
    }).join('');
  }

  /* ---------- 放食材（带飞行动画） ---------- */
  function dropIngredient(card, ingId) {
    if (busy) return;
    dropped.push(ingId);
    const potRect = el.querySelector('.pot-zone').getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const stage = el.querySelector('.cook-stage');
    const stageRect = stage.getBoundingClientRect();
    const spot = SPOTS[(dropped.length - 1) % SPOTS.length];

    const fly = document.createElement('div');
    fly.className = 'ingredient-drop';
    fly.innerHTML = K().ING[ingId];
    fly.style.left = (cardRect.left - stageRect.left) + 'px';
    fly.style.top = (cardRect.top - stageRect.top) + 'px';
    stage.appendChild(fly);
    Sound.pop();
    fly.animate([
      { transform: 'translate(0,0) scale(1)' },
      { transform: `translate(${potRect.left - cardRect.left + potRect.width * (spot[0] / 100 - 0.5)}px,${potRect.top - cardRect.top + potRect.height * (spot[1] / 100 - 0.5)}px) scale(.8) rotate(180deg)` }
    ], { duration: 420, easing: 'cubic-bezier(.3,.7,.4,1)' }).onfinish = () => {
      fly.remove();
      renderDropped();
      FX.sparkles(stage, potRect.left + potRect.width / 2, potRect.top + potRect.height * 0.35, 6);
      Sound.stir();
    };
  }

  /* ---------- 搅拌检测 ---------- */
  function onStirMove(e) {
    if (busy || !curRecipe) return;
    const zone = el.querySelector('.pot-zone');
    const r = zone.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.38;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx);
    if (lastAngle !== null) {
      let d = a - lastAngle;
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      if (Math.abs(d) < 0.55) acc += Math.abs(d);
    }
    lastAngle = a;
    while (acc >= HALF_TURN && progress < STAR_STEPS) {
      acc -= HALF_TURN;
      progress++;
      const star = el.querySelectorAll('.stir-star')[progress - 1];
      star && star.classList.add('lit');
      Sound.stir();
      FX.sparkles(el, e.clientX, e.clientY, 6);
      if (progress >= STAR_STEPS) {
        if (dropped.length >= 2) {
          el.querySelector('.btn-magic').classList.remove('dim');
          Sound.sparkle();
          Sound.praise('搅好啦！按魔法按钮！');
        }
      }
    }
  }

  /* ---------- 魔法烹饪 ---------- */
  function cook() {
    if (busy) return;
    if (progress < STAR_STEPS || dropped.length < 2) {
      Sound.pop();
      Sound.praise('先搅一搅，再放点东西吧');
      const btn = el.querySelector('.btn-magic');
      btn.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' }, { transform: 'rotate(0)' }], { duration: 260 });
      return;
    }
    busy = true;
    const zone = el.querySelector('.pot-zone');
    const stage = el.querySelector('.cook-stage');
    zone.classList.add('stir-ring');
    Sound.sparkle();
    let flashes = 0;
    const iv = setInterval(() => {
      const r = zone.getBoundingClientRect();
      FX.sparkles(stage, r.left + Math.random() * r.width, r.top + Math.random() * r.height * 0.5, 7);
      Sound.stir();
      if (++flashes >= 6) {
        clearInterval(iv);
        zone.classList.remove('stir-ring');
        Sound.fanfare();
        FX.confetti(stage, 40);
        showDish();
      }
    }, 220);
  }

  /* ---------- 成品 + 喂食 ---------- */
  function showDish() {
    const overlay = el.querySelector('.dish-result');
    overlay.querySelector('.dish-svg').innerHTML = K().DISHES[curRecipe.dish];
    overlay.classList.remove('hidden');
    Sound.praise(curRecipe.praise);
    overlay.querySelector('.dish-svg').animate([
      { transform: 'scale(0) rotate(-20deg)' },
      { transform: 'scale(1.08) rotate(3deg)' },
      { transform: 'scale(1) rotate(0)' }
    ], { duration: 650, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  }

  function feed(who, btn) {
    Sound.munch();
    btn.classList.remove('eat-done');
    void btn.offsetWidth;
    btn.classList.add('eat-done');
    const r = btn.getBoundingClientRect();
    FX.sparkles(el, r.left + r.width / 2, r.top, 10);
    setTimeout(() => Sound.praiseRandom(FEED_PRAISE), 350);
  }

  /* ---------- 模块定义 ---------- */
  window.Kitchen = {
    init(root) {
      el = root;
      el.innerHTML = `
        <div class="game-top">${window.homeButtonHTML}</div>
        <div class="game-stage">
          <div class="recipe-stage"></div>
          <div class="cook-stage hidden">
            <div class="cook-counter"></div>
            <div class="stir-progress">
              ${[0, 1, 2].map(() => `<div class="stir-star">${FX.starSVG('#ffd34d', 44)}</div>`).join('')}
            </div>
            <div class="pot-zone">
              <div class="pot-container"></div>
              <div class="pot-content" style="position:absolute;inset:0;"></div>
            </div>
            <button class="btn-magic dim" aria-label="魔法烹饪">
              <svg viewBox="0 0 48 48">
                <path d="M24 4l3 8.5L36 10l-5 7.5L40 24l-9 3 5 8.5-9-2.5L24 42l-3-9-9 2.5L17 27l-9-3 9-6.5L12 10l9 2.5z"
                  fill="#fff" stroke="#ff9f43" stroke-width="2.4" stroke-linejoin="round"/>
              </svg>
              <span>魔法</span>
            </button>
            <div class="dish-result hidden">
              <div class="dish-svg"></div>
              <div class="feed-row">
                <button class="btn-feed" data-who="doll">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="32" r="20" fill="#ffe0c7"/>
                    <path d="M10,30 Q10,10 30,10 Q50,10 50,30 Q44,22 36,24 Q30,18 24,24 Q16,22 10,30 Z" fill="#8b5e3c"/>
                    <circle cx="23" cy="34" r="3" fill="#5b3a29"/>
                    <circle cx="37" cy="34" r="3" fill="#5b3a29"/>
                    <path d="M25,42 Q30,46 35,42" stroke="#e2756f" stroke-width="2.6" fill="none" stroke-linecap="round"/>
                    <circle cx="17" cy="39" r="3.4" fill="#ffb3c1" opacity=".7"/>
                    <circle cx="43" cy="39" r="3.4" fill="#ffb3c1" opacity=".7"/>
                  </svg>
                  <span>喂娃娃</span>
                </button>
                <button class="btn-feed" data-who="cat">
                  <svg viewBox="0 0 60 60">
                    <polygon points="14,20 16,6 26,15" fill="#f7b967"/>
                    <polygon points="46,20 44,6 34,15" fill="#f7b967"/>
                    <circle cx="30" cy="32" r="19" fill="#f7b967"/>
                    <circle cx="23" cy="30" r="2.8" fill="#5b3a29"/>
                    <circle cx="37" cy="30" r="2.8" fill="#5b3a29"/>
                    <polygon points="30,35 27,38 33,38" fill="#ff8fa0"/>
                    <path d="M30,38 Q27,42 24,40 M30,38 Q33,42 36,40" stroke="#7a4d1d" stroke-width="2" fill="none" stroke-linecap="round"/>
                  </svg>
                  <span>喂小猫</span>
                </button>
              </div>
              <button class="btn-home" aria-label="再做一次" style="position:static;width:96px;height:96px;background:#a8e6a1;box-shadow:0 5px 0 #7ec088;">
                <svg viewBox="0 0 48 48">
                  <path d="M24 14a10 10 0 1 0 10 10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
                  <polygon points="24,4 33,12 20,15" fill="#ffd34d" stroke="#f2a94f" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="game-toolbar">
          <div class="item-drawer"></div>
        </div>`;

      /* 食谱选择页 */
      el.querySelector('.recipe-stage').innerHTML = K().RECIPES.map(r => `
        <div class="recipe-card" data-recipe="${r.id}">${K().ICONS[r.id]}<span>${r.name}</span></div>`).join('');
      el.querySelector('.recipe-stage').addEventListener('click', e => {
        const card = e.target.closest('.recipe-card');
        if (!card) return;
        const recipe = K().RECIPES.find(r => r.id === card.dataset.recipe);
        Sound.chime();
        showCook(recipe);
      });

      /* 食材抽屉 */
      el.querySelector('.item-drawer').addEventListener('click', e => {
        const card = e.target.closest('.item-card');
        if (!card || !curRecipe) return;
        dropIngredient(card, card.dataset.ing);
      });

      /* 搅拌 */
      el.querySelector('.pot-zone').addEventListener('pointermove', onStirMove);
      el.querySelector('.pot-zone').style.touchAction = 'none';

      /* 魔法按钮 */
      el.querySelector('.btn-magic').addEventListener('click', cook);

      /* 喂食 / 再做一次 */
      el.querySelectorAll('.btn-feed').forEach(b =>
        b.addEventListener('click', () => feed(b.dataset.who, b)));
      el.querySelector('.dish-result .btn-home').addEventListener('click', e => {
        e.stopPropagation();
        Sound.pop();
        showRecipeSelect();
      });

      showRecipeSelect();
    },
    onEnter() {
      window.hintOnce('kitchen', '想做什么菜呀？点一张卡片开始吧');
    },
    onLeave() { }
  };
})();
