// V192 intentionally does not cache app assets. This prevents stale GitHub Pages test builds.
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request, {cache:'no-store'}).catch(() => caches.match(event.request)));
});
