const CACHE="gs24-v159";
const APP=["./","./index.html","./manifest.webmanifest","./sources.json"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  if(u.pathname.endsWith("sources.json")) return e.respondWith(fetch(e.request,{cache:"no-store"}));
  if(e.request.method!=="GET") return;
  // Always prefer the newest HTML/app shell; only use cache when offline.
  if(e.request.mode==="navigate" || u.pathname.endsWith("index.html") || u.pathname.endsWith("manifest.webmanifest")) {
    return e.respondWith(fetch(e.request,{cache:"no-store"}).then(res=>{
      const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return res;
  })));
});
