const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/988e196b1a36e1a6496f1853c770c64e.loader.js",
    "Build/41d62ef8e53ed5089d49721ddaf79ce3.framework.js.br",
    "Build/36f4a9191af798ae3876eae2c3c7948c.data.br",
    "Build/09a1dd5648b19f31a088093c80039ca6.wasm.br",
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
