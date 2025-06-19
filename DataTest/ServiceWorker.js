const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/37f5fc1e34bc1ecd663f5d0948e654fc.loader.js",
    "Build/25982e0030f6185804c04b58e92dbe1e.framework.js.br",
    "Build/894efe5c09503f2e48b873a154576181.data.br",
    "Build/4df67b5fd37d0981ead8975378ed5da8.wasm.br",
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
