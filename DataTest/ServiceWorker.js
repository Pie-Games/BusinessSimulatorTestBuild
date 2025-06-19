const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/882f5d9afc0cb89c6fe67f4e1734bb4b.loader.js",
    "Build/78187a0c4aa851ecd2c140b930089bfe.framework.js.br",
    "Build/313febae80dca252661f107613feebe0.data.br",
    "Build/8a4e655c26ea47f2237edab3e512198d.wasm.br",
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
