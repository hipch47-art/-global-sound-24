// V193 no-cache service worker for GitHub Pages test builds.
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request, {cache:'no-store'}).catch(() => caches.match(event.request)));
});
