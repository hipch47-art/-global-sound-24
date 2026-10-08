const CACHE='gs24-v199';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.origin===location.origin && (u.pathname.endsWith('/index.html')||u.pathname.endsWith('/sources.json')||u.pathname.endsWith('/sw.js'))){
   e.respondWith(fetch(e.request,{cache:'no-store',headers:{'Cache-Control':'no-cache'}}).then(r=>{
     const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
   }).catch(()=>caches.match(e.request)));
 }
});