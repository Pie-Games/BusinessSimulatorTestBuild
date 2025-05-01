const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a34300787036aaa988bd6aa9fb9c9d74.loader.js",
    "Build/31bec9f4907d93f20a63a794c28f3391.framework.js.br",
    "Build/50ba5fda65a2fddd15bdd0dfd19efdc4.data.br",
    "Build/32f28956a8b4f65934e47113f1720125.wasm.br",
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
