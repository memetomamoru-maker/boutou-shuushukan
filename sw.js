// sw.js — 冒頭収集館 Service Worker v1
const CACHE = 'boutou-v1';

const STATIC = [
  '/',
  '/index.html',
  '/booklist.json',
  '/site.webmanifest',
  '/icon-512.png',
  '/bg-silhouette.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
