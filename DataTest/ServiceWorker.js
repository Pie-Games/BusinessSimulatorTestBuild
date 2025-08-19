const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a02256148340487e19882de33c0b180e.loader.js",
    "Build/c26f8b8f19af973a2b423e8bb8349909.framework.js.br",
    "Build/db23e7db81b9d2cce62a4cc68173e197.data.br",
    "Build/78925d82f2c458f19fa25dfd795e699a.wasm.br",
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
