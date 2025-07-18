const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/bfefeb488a403f8eb9c026c072845712.loader.js",
    "Build/818db55c0ee70376354143b12c1caa36.framework.js.br",
    "Build/c1c88ee14b40b6f82ae7df6939ddb744.data.br",
    "Build/d020ea751bdfe5a8df30a72f386b42d5.wasm.br",
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
