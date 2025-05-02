const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9ae06524617e017721696ff95a6d9357.loader.js",
    "Build/31bec9f4907d93f20a63a794c28f3391.framework.js.br",
    "Build/d6dc62137c77119d45b559bad34a907e.data.br",
    "Build/13d22b0db88221d04998007a07ade42c.wasm.br",
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
