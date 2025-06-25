const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/19ce74fc35b93f6e81046ea35e0f5764.loader.js",
    "Build/114b11a5ba3dba1e84f5854e608d91c4.framework.js.br",
    "Build/73fd041b40753e67ac53ac51099f542f.data.br",
    "Build/34b2a0b99be452137e32c0e9259365cc.wasm.br",
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
