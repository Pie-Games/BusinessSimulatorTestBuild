const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c2e851c51ee54c639bcf9fe54804fdc9.loader.js",
    "Build/54a021edf864859ac16f5543c99a048e.framework.js.br",
    "Build/359165116f2c9af0710e7d271d980356.data.br",
    "Build/3e5ade6388dc178abfeec1be48389746.wasm.br",
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
