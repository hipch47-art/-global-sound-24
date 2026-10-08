const CACHE='gs24-v201';
const CORE=['./','./index.html','./sources.json','./instrumental.jpg','./piano.jpg','./jazz.jpg','./classical.jpg','./rnb.jpg','./rock.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url); if(e.request.method!=='GET')return; if(u.pathname.endsWith('/index.html')||u.pathname.endsWith('/sources.json')||u.pathname.endsWith('/sw.js')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));return;} e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match(e.request))));});
