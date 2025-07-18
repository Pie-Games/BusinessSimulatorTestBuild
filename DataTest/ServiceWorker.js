const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/656f481c689b5574a03429c2ca0b625e.loader.js",
    "Build/818db55c0ee70376354143b12c1caa36.framework.js.br",
    "Build/ea5083f8c1c06a607f2a3ad321bcab19.data.br",
    "Build/f7a4323600dbd5d79b48086ae94fcea6.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
