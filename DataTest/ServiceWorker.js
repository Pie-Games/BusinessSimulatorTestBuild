const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/95d50cc486d5cf3eaa66633a4dc9a6b5.loader.js",
    "Build/e93a696e26e1ab2bc3a3f9a2345c5c12.framework.js.br",
    "Build/74f7d48d85d8fcf3faa17562d7960085.data.br",
    "Build/9adfcbf95fff59f9acf0a6fe36286ce2.wasm.br",
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
