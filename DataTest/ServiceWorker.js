const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c348369c4a5e7915e5f74b5c3114fbc2.loader.js",
    "Build/757023d57ff654fbec58846abfd79722.framework.js.br",
    "Build/33bc1d6e261b62efa22d4fcaddfcba2f.data.br",
    "Build/5c9b42b79ab72a0068a57da87fdf12aa.wasm.br",
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
