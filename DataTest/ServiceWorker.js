const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/c0ab63e73cf762c0b260ef95b49020a6.loader.js",
    "Build/b96f3ad6362ad906e7bf9e7870138aad.framework.js.br",
    "Build/2822aedf9800de8c304d9f6636dad268.data.br",
    "Build/11ee704e5505d359aa8eb2b4bfb057ce.wasm.br",
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
