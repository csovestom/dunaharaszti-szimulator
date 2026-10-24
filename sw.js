// Dunaharaszti Szimulátor – service worker.
// After the first visit the game also starts without a connection. index.html always comes fresh from the
// network when there is one, so a new version only has to be uploaded: the installed app picks it up on its
// next start. Change VERSION only when the icons or the manifest change.
const VERSION = 'v1';
const APP = 'dhsim-app-' + VERSION, FONTS = 'dhsim-fonts';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('dhsim-app-') && k !== APP).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // the game page: network first (revalidated, never a stale HTTP-cache copy), the saved copy when offline
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('/index.html'))) {
    e.respondWith(fetch(url.href, { cache: 'no-cache', credentials: 'same-origin' })
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(APP).then(c => c.put('index.html', copy)); }
        return res.redirected ? new Response(res.body, { status: res.status, statusText: res.statusText, headers: res.headers }) : res;
      })
      .catch(() => caches.match('index.html', { cacheName: APP })));
    return;
  }
  // Google Fonts: straight from the cache, refreshed in the background
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  // icons and the manifest: cache first
  if (url.origin === location.origin) e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
