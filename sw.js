/* ============ 魔法小屋 Service Worker：离线可玩 ============ */
const VERSION = 'magic-house-v0.5.1';
const CORE = [
  './',
  './index.html',
  './css/style.css',
  './js/store.js',
  './js/audio.js',
  './js/fx.js',
  './js/assets-doll.js',
  './js/assets-room.js',
  './js/assets-kitchen.js',
  './js/dressup.js',
  './js/world.js',
  './js/kitchen.js',
  './js/main.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
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
