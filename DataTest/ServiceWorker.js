const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/8689417d2348982b8781c9717a245bd1.loader.js",
    "Build/f080507530eb3eb964564b6ece0e9b6b.framework.js.br",
    "Build/21b4319278459aeb1e54a10205e6edaa.data.br",
    "Build/f5393f372acb5ce2dacc5ae076ab6a25.wasm.br",
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
