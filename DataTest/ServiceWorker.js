const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5c4572bc079e8d561b2d7714c3c9bfda.loader.js",
    "Build/b905f02badb8cc53f0c9c9338b70cdf8.framework.js.br",
    "Build/0b3401d04bfe043c9c74b84932857f7a.data.br",
    "Build/9a55cb42255b1b0134badd205e34cd8c.wasm.br",
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
