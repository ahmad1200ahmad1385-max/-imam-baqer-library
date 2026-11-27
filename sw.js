const CACHE_NAME="imam-baqer-library-app-v1";
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon-192.svg","./icons/icon-512.svg"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET" || new URL(req.url).origin!==location.origin)return;
 event.respondWith(fetch(req).then(response=>{
  if(response && response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}
  return response;
 }).catch(()=>caches.match(req).then(hit=>hit||caches.match("./index.html"))));
});