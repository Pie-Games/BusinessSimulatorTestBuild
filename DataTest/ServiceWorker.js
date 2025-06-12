const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5baedbe3448c4bc0052ab9d4c7b5d3a3.loader.js",
    "Build/54a021edf864859ac16f5543c99a048e.framework.js.br",
    "Build/119b3799003c655051d5f5f4d5f2ef04.data.br",
    "Build/ff66754d95e181fe852e20fbf51b9a5b.wasm.br",
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
