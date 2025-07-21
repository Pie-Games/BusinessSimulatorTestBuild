const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/8ee18199a9b8e999d63d9c945e69ed61.loader.js",
    "Build/4e69ac218a6080295ef5053375b22056.framework.js.br",
    "Build/5e9ff930596e9d42a680b8f91e82c9c2.data.br",
    "Build/6d7c687bfddcb52ab1d7f5bc3295a07c.wasm.br",
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
