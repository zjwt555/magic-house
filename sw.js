/* ============ 魔法小屋 Service Worker:离线可玩 ============
   路线 B(整房间图 + 物品可拖)主代码整合后版本(2026-09-25) */
const VERSION = 'magic-house-2110e7c067';
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './js/store.js',
  './js/audio.js',
  './js/fx.js',
  // 房间 + 主角 + 物品(Sticker 风格去白底版)
  './assets-gen/rooms/bedroom-empty-nobg.png',
  './assets-gen/chars/char-base-nobg.png',
  './assets-gen/chars/char-style-sport-nobg.png',
  './assets-gen/chars/char-style-princess-nobg.png',
  './assets-gen/chars/char-style-school-nobg.png',
  './assets-gen/chars/char-style-pajamas-nobg.png',
  './assets-gen/chars/char-style-summer-nobg.png',
  './assets-gen/items/item-bed-nobg.png',
  './assets-gen/items/item-nightstand-on-nobg.png',
  './assets-gen/items/item-nightstand-off-nobg.png',
  './assets-gen/items/item-teddy-nobg.png',
  './assets-gen/items/item-curtain-closed-nobg.png',
  './assets-gen/items/item-curtain-open-nobg.png',
  './assets-gen/items/item-bookshelf-nobg.png',
  './assets-gen/items/item-rug-nobg.png',
  './assets-gen/items/item-mirror-nobg.png',
  './assets-gen/items/item-stringlights-nobg.png',
  // 图标
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/house.png',
  './icons/yard.png',
  './icons/park.png',
  './icons/shop.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        if (res.ok && new URL(e.request.url).origin === self.location.origin) {
          const clone = res.clone();
          caches.open(VERSION).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
