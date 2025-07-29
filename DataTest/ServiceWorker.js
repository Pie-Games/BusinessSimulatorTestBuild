const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/6cfa1f9205e17bd6ce6fa96d85086b89.loader.js",
    "Build/31fbb62d8a4f4bb1c4968db5809862f7.framework.js.br",
    "Build/9410a6fd7c2a913655475886aea9b158.data.br",
    "Build/05aad9262215329a644269710e2214b0.wasm.br",
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
